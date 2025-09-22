(function () {
  var doc = document.documentElement;
  if (!doc || !doc.classList || !doc.classList.contains('has-page-transition')) {
    return;
  }

  var reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var transitionsDisabled = reduceMotionQuery.matches;

  var markReady = function () {
    doc.classList.remove('is-preload');
    if (!doc.classList.contains('is-page-ready')) {
      doc.classList.add('is-page-ready');
    }
  };

  var whenReady = function () {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', markReady, { once: true });
    } else {
      window.requestAnimationFrame(markReady);
    }
  };

  whenReady();

  var handleReduceMotionChange = function (event) {
    transitionsDisabled = event.matches;
    if (transitionsDisabled) {
      doc.classList.remove('is-transitioning');
      markReady();
    }
  };

  if (typeof reduceMotionQuery.addEventListener === 'function') {
    reduceMotionQuery.addEventListener('change', handleReduceMotionChange);
  } else if (typeof reduceMotionQuery.addListener === 'function') {
    reduceMotionQuery.addListener(handleReduceMotionChange);
  }

  window.addEventListener('pageshow', function (event) {
    doc.classList.remove('is-transitioning');
    if (event.persisted) {
      markReady();
    }
  });

  var getDuration = function () {
    var value = getComputedStyle(doc).getPropertyValue('--page-transition-duration');
    var parsed = parseFloat(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 420;
  };

  var shouldSkip = function (anchor) {
    if (anchor.target && anchor.target !== '_self') {
      return true;
    }
    if (anchor.hasAttribute('download')) {
      return true;
    }
    if (anchor.dataset && anchor.dataset.transition === 'false') {
      return true;
    }
    var href = anchor.getAttribute('href');
    if (!href || href.indexOf('#') === 0 || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) {
      return true;
    }
    if (anchor.origin !== window.location.origin) {
      return true;
    }
    var url = new URL(anchor.href);
    var current = window.location;
    if (url.pathname === current.pathname && url.search === current.search) {
      return url.hash.length > 0;
    }
    return false;
  };

  document.addEventListener('click', function (event) {
    if (transitionsDisabled) {
      return;
    }
    if (event.defaultPrevented) {
      return;
    }
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    var target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    var anchor = target.closest('a');
    if (!anchor) {
      return;
    }
    if (shouldSkip(anchor)) {
      return;
    }
    event.preventDefault();
    if (doc.classList.contains('is-transitioning')) {
      return;
    }
    doc.classList.add('is-transitioning');
    var delay = getDuration();
    window.setTimeout(function () {
      window.location.assign(anchor.href);
    }, delay);
  });
})();
