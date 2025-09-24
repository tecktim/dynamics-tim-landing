import type { APIRoute } from 'astro';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load environment variables from .env file if not already loaded
if (!process.env.PUSHOVER_TOKEN || !process.env.PUSHOVER_USER) {
  try {
    const envPath = resolve(process.cwd(), '.env');
    const envContent = readFileSync(envPath, 'utf-8');
    const envVars = envContent
      .split('\n')
      .filter(line => line && !line.startsWith('#'))
      .reduce((acc, line) => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length) {
          const value = valueParts.join('=').trim();
          acc[key.trim()] = value.replace(/^["']|["']$/g, ''); // Remove quotes
        }
        return acc;
      }, {} as Record<string, string>);
    
    // Set environment variables if they don't exist
    Object.entries(envVars).forEach(([key, value]) => {
      if (!process.env[key]) {
        process.env[key] = value;
      }
    });
  } catch (error) {
    console.warn('Could not load .env file:', error);
  }
}

const PUSHOVER_ENDPOINT = 'https://api.pushover.net/1/messages.json';
const { PUSHOVER_TOKEN, PUSHOVER_USER } = process.env;
const MESSAGE_TEMPLATE = process.env.PUSHOVER_MESSAGE ?? 'New visitor on dynamics-tim.dev ({path})';
const TITLE_TEMPLATE = process.env.PUSHOVER_TITLE ?? '';
const RATE_LIMIT_WINDOW = normalizePositiveInteger(process.env.PUSHOVER_RATE_LIMIT_MS, 60_000);
const REQUEST_TIMEOUT = normalizePositiveInteger(process.env.PUSHOVER_TIMEOUT_MS, 8_000);
const MAX_CONTENT_LENGTH = normalizePositiveInteger(process.env.PUSHOVER_MAX_BYTES, 1_024);

const rateLimitMap = new Map<string, number>();

export const prerender = false;

const jsonHeaders: Record<string, string> = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store'
};

export const POST: APIRoute = async ({ request }) => {
  if (!PUSHOVER_TOKEN || !PUSHOVER_USER) {
    return new Response(JSON.stringify({ error: 'not_configured' }), {
      status: 503,
      headers: jsonHeaders
    });
  }

  const contentLengthHeader = request.headers.get('content-length');
  if (contentLengthHeader && Number(contentLengthHeader) > MAX_CONTENT_LENGTH) {
    return new Response(JSON.stringify({ error: 'payload_too_large' }), {
      status: 413,
      headers: jsonHeaders
    });
  }

  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return new Response(JSON.stringify({ error: 'unsupported_media_type' }), {
      status: 415,
      headers: jsonHeaders
    });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: jsonHeaders
    });
  }

  const data = normalizePayload(payload);
  if (!data) {
    return new Response(JSON.stringify({ error: 'invalid_payload' }), {
      status: 400,
      headers: jsonHeaders
    });
  }

  const clientId = getClientIdentifier(request);
  if (isRateLimited(clientId)) {
    return new Response(JSON.stringify({ error: 'rate_limited' }), {
      status: 429,
      headers: jsonHeaders
    });
  }

  markAttempt(clientId);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  const params = new URLSearchParams({
    token: PUSHOVER_TOKEN,
    user: PUSHOVER_USER,
    message: renderTemplate(MESSAGE_TEMPLATE, data)
  });

  if (TITLE_TEMPLATE) {
    params.set('title', renderTemplate(TITLE_TEMPLATE, data));
  }

  if (data.url) {
    params.set('url', data.url);
  }

  try {
    const response = await fetch(PUSHOVER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params,
      signal: controller.signal
    });

    if (!response.ok) {
      const errorPayload = await readSafeBody(response);
      return new Response(
        JSON.stringify({
          error: 'pushover_error',
          status: response.status,
          detail: errorPayload
        }),
        {
          status: 502,
          headers: jsonHeaders
        }
      );
    }
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      return new Response(JSON.stringify({ error: 'timeout' }), {
        status: 504,
        headers: jsonHeaders
      });
    }

    return new Response(JSON.stringify({ error: 'network_error' }), {
      status: 502,
      headers: jsonHeaders
    });
  } finally {
    clearTimeout(timeout);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: jsonHeaders
  });
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ error: 'method_not_allowed' }), {
    status: 405,
    headers: jsonHeaders
  });

function normalizePositiveInteger(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

type Payload = {
  path: string;
  url?: string;
  referrer?: string;
};

function normalizePayload(input: unknown): Payload | null {
  if (!input || typeof input !== 'object') {
    return null;
  }

  const raw = input as Record<string, unknown>;
  const path = sanitize(raw.path, 512);
  if (!path) {
    return null;
  }

  const url = sanitizeOptional(raw.url, 1_024);
  const referrer = sanitizeOptional(raw.referrer, 1_024);

  return {
    path,
    ...(url ? { url } : {}),
    ...(referrer ? { referrer } : {})
  };
}

function sanitize(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  return trimmed.slice(0, maxLength);
}

function sanitizeOptional(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  return value.trim().slice(0, maxLength);
}

function renderTemplate(template: string, data: Payload): string {
  return template.replace(/\{(path|url|referrer)\}/g, (_, key: keyof Payload) => data[key] ?? '');
}

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const firstForwarded = forwardedFor ? forwardedFor.split(',')[0].trim() : null;

  return (
    request.headers.get('cf-connecting-ip') ??
    (firstForwarded && firstForwarded.length > 0 ? firstForwarded : null) ??
    request.headers.get('x-real-ip') ??
    request.headers.get('fly-client-ip') ??
    'anonymous'
  );
}

function isRateLimited(clientId: string): boolean {
  if (RATE_LIMIT_WINDOW <= 0) {
    return false;
  }

  const now = Date.now();
  const last = rateLimitMap.get(clientId);
  if (last && now - last < RATE_LIMIT_WINDOW) {
    return true;
  }

  return false;
}

function markAttempt(clientId: string): void {
  if (RATE_LIMIT_WINDOW <= 0) {
    return;
  }

  rateLimitMap.set(clientId, Date.now());
}

async function readSafeBody(response: Response): Promise<unknown> {
  try {
    const text = await response.text();
    return text.slice(0, 2_048);
  } catch {
    return null;
  }
}
