(function() {
  // Get config from global scope
  const config = window.__lazyLoaderConfig || {};
  const assetBase = config.assetBase || '/';
  const pushoverConfigured = config.pushoverConfigured || false;

  const scriptCache = new Map();

  const loadScript = (key, src) => {
    if (scriptCache.has(key)) {
      return scriptCache.get(key);
    }

    const existing = document.querySelector(`script[data-inline-loader="${key}"]`);
    if (existing) {
      const existingPromise = existing.dataset.loaded === 'true'
        ? Promise.resolve()
        : new Promise((resolve, reject) => {
            existing.addEventListener('load', resolve, { once: true });
            existing.addEventListener('error', reject, { once: true });
          });
      scriptCache.set(key, existingPromise);
      return existingPromise;
    }

    const promise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.dataset.inlineLoader = key;
      script.addEventListener(
        'load',
        () => {
          script.dataset.loaded = 'true';
          resolve();
        },
        { once: true }
      );
      script.addEventListener('error', reject, { once: true });
      document.head.appendChild(script);
    });

    scriptCache.set(key, promise);
    return promise;
  };

  const schedule = (callback) => {
    const run = () => {
      try {
        callback();
      } catch (error) {
        console.error('[lazy-loader] callback failed', error);
      }
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(run, { timeout: 1500 });
    } else if (document.readyState === 'complete') {
      setTimeout(run, 200);
    } else {
      window.addEventListener('load', run, { once: true });
    }
  };

  const hasRevealTargets = () => document.querySelector('[data-reveal]');
  const hasConsentTargets = () =>
    document.querySelector('[data-consent],[data-consent-manage],[data-consent-placeholder]');

  schedule(() => {
    if (hasRevealTargets()) {
      loadScript('reveal', `${assetBase}assets/js/reveal.js`).catch((error) => {
        console.error('[reveal] failed to load', error);
      });
    }
  });

  const ensureConsent = (force = false) => {
    if (window.__consentReady) {
      return Promise.resolve();
    }

    if (!force && !hasConsentTargets()) {
      return Promise.resolve();
    }

    return loadScript('consent', `${assetBase}assets/js/consent.js`).catch((error) => {
      console.error('[consent] failed to load', error);
      throw error;
    });
  };

  schedule(() => {
    ensureConsent(false).catch(() => {
      /* handled above */
    });
  });

  const manageSelector = '[data-consent-manage]';

  document.addEventListener(
    'pointerdown',
    (event) => {
      const trigger = event.target instanceof Element ? event.target.closest(manageSelector) : null;
      if (!trigger) {
        return;
      }

      ensureConsent(true).catch(() => {
        /* handled */
      });
    },
    { passive: true }
  );

  let consentTriggering = false;

  document.addEventListener(
    'click',
    (event) => {
      const trigger = event.target instanceof Element ? event.target.closest(manageSelector) : null;

      if (!trigger || window.__consentReady || consentTriggering) {
        return;
      }

      event.preventDefault();

      ensureConsent(true)
        .then(() => {
          consentTriggering = true;
          requestAnimationFrame(() => {
            trigger.dispatchEvent(
              new MouseEvent('click', {
                bubbles: true,
                cancelable: true
              })
            );
            setTimeout(() => {
              consentTriggering = false;
            }, 0);
          });
        })
        .catch(() => {
          consentTriggering = false;
        });
    },
    true
  );

  // Load pushover notifier if configured
  if (pushoverConfigured) {
    schedule(() => {
      loadScript('pushover', `${assetBase}scripts/pushover-notifier.ts`).catch((error) => {
        console.error('[pushover] failed to load', error);
      });
    });
  }
})();