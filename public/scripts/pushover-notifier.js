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

  const funnyMessages = [
    "🎉 Someone just discovered your digital masterpiece! Time to do a happy dance! 💃",
    "🚀 A wild visitor appeared! They're probably thinking 'Wow, this Tim guy knows his Dynamics!' ⚡",
    "🎯 Ding ding! Another curious soul has landed - your website magic is working! ✨",
    "🏆 Plot twist: Someone just visited and is now seriously considering hiring the Dynamics wizard (that's you!) 🧙‍♂️",
    "🎪 Ladies and gentlemen, we have a visitor! *dramatic trumpet sounds* 🎺",
    "🌟 Breaking news: Your awesome website just made someone's day brighter! (And yours too!) ☀️",
    "🎮 Achievement unlocked: New visitor! XP gained: +100 Visibility Points! 🏅",
    "🕵️ Detective report: Someone is investigating your brilliant work. Suspicious levels of awesomeness detected! 🔍",
    "🎨 An art connoisseur just appreciated your digital canvas! Your website is basically the Mona Lisa of Dynamics! 🖼️",
    "🎭 Plot development: A potential client just entered the Tim Friedrich story. Will they click 'Contact'? Stay tuned! 📺",
    "🎪 Step right up! Someone just visited the greatest Dynamics show on Earth! 🎠",
    "🚁 Helicopter view: Your website radar has detected incoming awesomeness! 📡",
    "🎯 Bullseye! Your magnetic personality just attracted another visitor! 🧲",
    "🎵 *Happy notification sounds* Someone's browsing your masterpiece and probably humming with joy! 🎶",
    "🔥 Your website is so hot right now! Someone just got warmed up by visiting! 🌡️"
  ];

  const sendNotification = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const path = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (path === lastNotifiedPath) {
      return;
    }

    lastNotifiedPath = path;
    
    // Pick a random funny message
    const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    const message = randomMessage
      .replace('{url}', window.location.href)
      .replace('{path}', path)
      .replace('{page}', path);

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
        console.log('🎉 Pushover notification sent successfully!');
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