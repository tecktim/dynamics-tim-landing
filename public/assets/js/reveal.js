(function () {
  if (typeof document === 'undefined') {
    return;
  }

  var elements = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (!elements.length) {
    return;
  }

  var reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (reduceMotionQuery.matches || !('IntersectionObserver' in window)) {
    elements.forEach(function (el) {
      el.classList.add('is-revealed');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }
      var target = entry.target;
      target.classList.add('is-revealed');
      target.classList.remove('reveal-ready');
      observer.unobserve(target);
    });
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.15
  });

  elements.forEach(function (el) {
    el.classList.add('reveal-ready');
    var delay = el.getAttribute('data-reveal-delay');
    if (delay) {
      var delayValue = Number(delay);
      if (!Number.isNaN(delayValue)) {
        el.style.setProperty('--reveal-delay', delayValue + 'ms');
      }
    }
    observer.observe(el);
  });

  var handleReduceMotionChange = function (event) {
    if (!event.matches) {
      return;
    }
    observer.disconnect();
    elements.forEach(function (el) {
      el.classList.add('is-revealed');
      el.classList.remove('reveal-ready');
      el.style.removeProperty('--reveal-delay');
    });
  };

  if (typeof reduceMotionQuery.addEventListener === 'function') {
    reduceMotionQuery.addEventListener('change', handleReduceMotionChange);
  } else if (typeof reduceMotionQuery.addListener === 'function') {
    reduceMotionQuery.addListener(handleReduceMotionChange);
  }
})();
