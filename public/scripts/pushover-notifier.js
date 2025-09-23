// Get configuration from window object set by BaseLayout
const config = window.__lazyLoaderConfig || {};
const token = config.pushoverToken;
const user = config.pushoverUser;
const endpoint = 'https://api.pushover.net/1/messages.json';

if (!token || !user) {
  console.warn('Pushover notifier disabled: missing pushover token or user');
} else {
  const messageTemplate = config.pushoverMessage || 'New visitor on dynamics-tim.dev ({path})';
  const title = config.pushoverTitle;
  let lastNotifiedPath = null;

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
      .replace('{path}', path)
      .replace('{page}', path); // Support both {path} and {page} variables

    console.log('Sending Pushover notification:', { message, title, path });

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
    }).then(response => {
      if (response.ok) {
        console.log('Pushover notification sent successfully');
      } else {
        console.error('Pushover API error:', response.status, response.statusText);
      }
    }).catch((error) => {
      console.error('Failed to send Pushover notification:', error);
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