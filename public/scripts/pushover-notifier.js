// Get configuration from window object set by BaseLayout
const config = window.__lazyLoaderConfig || {};
const endpoint = typeof config.pushoverEndpoint === 'string' ? config.pushoverEndpoint : null;

if (!endpoint) {
  console.warn('[pushover] notifier disabled: missing endpoint');
} else {
  const debounceMs = Number.isFinite(config.pushoverDebounceMs)
    ? Math.max(0, config.pushoverDebounceMs)
    : 30_000;

  let lastNotifiedPath = null;
  let lastAttemptAt = 0;
  let disabled = false;

  const disable = (reason) => {
    disabled = true;
    console.warn('[pushover] notifier disabled:', reason);
  };

  const sendNotification = () => {
    if (disabled || typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const path = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (path === lastNotifiedPath) {
      return;
    }

    const now = Date.now();
    if (now - lastAttemptAt < debounceMs) {
      return;
    }

    lastNotifiedPath = path;
    lastAttemptAt = now;

    const payload = {
      path,
      url: window.location.href
    };

    if (document.referrer) {
      payload.referrer = document.referrer;
    }

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      credentials: 'same-origin',
      keepalive: true
    })
      .then((response) => {
        if (response.ok) {
          return;
        }

        if (response.status === 404 || response.status === 405 || response.status === 503) {
          disable(`server returned ${response.status}`);
        } else if (response.status === 429) {
          console.warn('[pushover] rate limited by server');
        } else {
          console.warn('[pushover] server responded with', response.status);
        }
      })
      .catch((error) => {
        console.warn('[pushover] failed to send notification', error);
      });
  };

  if (document.readyState === 'complete') {
    sendNotification();
  } else {
    window.addEventListener(
      'load',
      () => {
        sendNotification();
      },
      { once: true }
    );
  }

  window.addEventListener('astro:page-load', sendNotification);
}