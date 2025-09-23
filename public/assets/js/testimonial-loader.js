(function() {
  // Get config from global scope
  const config = window.__testimonialConfig || {};
  const scriptSrc = config.scriptSrc || '/scripts/testimonial-rotator.js';

  const selector = '[data-testimonial-rotator]';
  let loadPromise = null;

  const loadRotator = () => {
    if (loadPromise) {
      return loadPromise;
    }

    loadPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-testimonial-rotator]');

      if (existing) {
        if (existing.dataset.loaded === 'true') {
          resolve();
          return;
        }

        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }

      const script = document.createElement('script');
      script.type = 'module';
      script.src = scriptSrc;
      script.defer = true;
      script.dataset.testimonialRotator = 'true';
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
    }).catch((error) => {
      loadPromise = null;
      throw error;
    });

    return loadPromise;
  };

  const scheduleLoad = () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(
        () => {
          loadRotator().catch((error) => console.error('[testimonial-rotator] failed to load', error));
        },
        { timeout: 1200 }
      );
      return;
    }

    setTimeout(() => {
      loadRotator().catch((error) => console.error('[testimonial-rotator] failed to load', error));
    }, 150);
  };

  const init = () => {
    const container = document.querySelector(selector);
    if (!container) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      scheduleLoad();
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          obs.disconnect();
          loadRotator().catch((error) => console.error('[testimonial-rotator] failed to load', error));
        });
      },
      {
        rootMargin: '0px 0px 160px 0px'
      }
    );

    observer.observe(container);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();