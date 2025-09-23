const token = import.meta.env.PUBLIC_PUSHOVER_TOKEN;
const user = import.meta.env.PUBLIC_PUSHOVER_USER;
const endpoint = 'https://api.pushover.net/1/messages.json';

if (!token || !user) {
  if (import.meta.env.DEV) {
    console.warn('Pushover notifier disabled: missing PUBLIC_PUSHOVER_TOKEN or PUBLIC_PUSHOVER_USER');
  }
} else {
  const messageTemplate = import.meta.env.PUBLIC_PUSHOVER_MESSAGE ?? 'New visitor on dynamics-tim.dev ({path})';
  const title = import.meta.env.PUBLIC_PUSHOVER_TITLE;
  let lastNotifiedPath: string | null = null;

  const sendNotification = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const path = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (path === lastNotifiedPath) {
      return;
    }

    lastNotifiedPath = path;
    const message = messageTemplate
      .replace('{url}', window.location.href)
      .replace('{path}', path);

    const body = new URLSearchParams({
      token,
      user,
      message
    });

    if (title) {
      body.set('title', title);
    }

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body,
      keepalive: true
    }).catch((error) => {
      if (import.meta.env.DEV) {
        console.error('Failed to send Pushover notification', error);
      }
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
