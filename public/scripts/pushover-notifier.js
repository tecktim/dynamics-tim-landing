// Get configuration from window object set by BaseLayout
const config = window.__lazyLoaderConfig || {};
const token = config.pushoverToken;
const user = config.pushoverUser;
const endpoint = 'https://api.pushover.net/1/messages.json';

if (!token || !user) {
  console.warn('Pushover notifier disabled: missing pushover token or user');
} else {
  const messageTemplate = config.pushoverMessage || 'New visitor on dynamics-tim.dev ({path})';
  const title = config.pushoverTitle+"🔥";
  
  // Use a global flag to prevent multiple notifications across page navigations
  if (!window.__pushoverNotificationSent) {
    window.__pushoverNotificationSent = false;
  }
  
  // Also check sessionStorage for extra safety across script reloads
  const sessionKey = 'pushover_notification_sent';
  const sessionSent = sessionStorage.getItem(sessionKey) === 'true';

  const funnyMessages = [
    "� Jemand hat sich verirrt. Dynamics-Experte gesucht? 🤷‍♂️",
    "🚀 Besucher! Wahrscheinlich vom CV beeindruckt... oder verwirrt 😏",
    "🕵️ Verdächtiger klickt rum. Hoffentlich nicht die Konkurrenz 👀",
    "🎪 Schaulustiger detektiert! Zeit für den Verkaufsmodus? 💸",
    "� +1 Webseitenbesucher. Noch 999.999 bis zum Durchbruch 📈",
    "� Website glüht vor Aktivität! (OK, war nur ein Klick) 🌡️",
    "� Plot Twist: Jemand surft tatsächlich hier rum 🤯",
    "🚁 Radar meldet: Potenzieller Kunde in Sichtweite! �",
    "� Treffer! Entweder Interesse oder falscher Tab �",
    "🎵 Ding! Jemand scrollt durch dein Lebenswerk �",
    "� Breaking: Mensch besucht Website. Sensation! 📰",
    "� Achievement: Wieder jemand überzeugt... oder gelangweilt 😴",
    "🎪 Manege frei! Der nächste Kunde... äh, Besucher! �"
  ];

  const sendNotification = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    if (window.__pushoverNotificationSent || sessionSent) {
      return;
    }
    
    const path = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    window.__pushoverNotificationSent = true;
    sessionStorage.setItem(sessionKey, 'true');
    
    // Pick a random funny message
    const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    const message = randomMessage
      .replace('{url}', window.location.href)
      .replace('{path}', path)
      .replace('{page}', path);

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
        // console.log('🎉 Pushover notification sent successfully!');
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
}
