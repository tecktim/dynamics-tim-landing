const ROTATION_INTERVAL_MS = 8000;
const CONTAINER_SELECTOR = '[data-testimonial-rotator]';

const parseTestimonials = (raw) => {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      return parsed.filter(Boolean);
    }
  } catch (error) {
    console.error('Failed to parse testimonials payload', error);
  }

  return [];
};

const getElements = (container) => ({
  card: container.querySelector('[data-testimonial-card]'),
  titleEl: container.querySelector('[data-testimonial-title]'),
  quoteEl: container.querySelector('[data-testimonial-quote]'),
  sourceEl: container.querySelector('[data-testimonial-source]'),
  liveRegion: container.querySelector('[data-testimonial-announcer]')
});

const setContent = (elements, item) => {
  const { titleEl, quoteEl, sourceEl, liveRegion } = elements;

  if (!titleEl || !quoteEl || !sourceEl) {
    return;
  }

  titleEl.textContent = item.title;
  quoteEl.textContent = `"${item.quote}"`;
  sourceEl.textContent = item.attribution;

  if (liveRegion) {
    liveRegion.textContent = `${item.title} - ${item.attribution}`;
  }
};

const initRotator = () => {
  const container = document.querySelector(CONTAINER_SELECTOR);

  if (!container) {
    return;
  }

  const testimonials = parseTestimonials(container.getAttribute('data-testimonial-items'));

  if (testimonials.length <= 1) {
    return;
  }

  const elements = getElements(container);

  if (!elements.card || !elements.titleEl || !elements.quoteEl || !elements.sourceEl) {
    return;
  }

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let allowFade = !motionQuery.matches;
  let index = 0;

  const update = (nextIndex) => {
    const item = testimonials[nextIndex];

    if (!item) {
      return;
    }

    if (!allowFade) {
      setContent(elements, item);
      return;
    }

    elements.card.classList.add('opacity-0');

    window.setTimeout(() => {
      setContent(elements, item);
      elements.card.classList.remove('opacity-0');
    }, 250);
  };

  const handleMotionChange = (event) => {
    allowFade = !event.matches;

    if (!allowFade) {
      elements.card.classList.remove('opacity-0');
    }
  };

  if (typeof motionQuery.addEventListener === 'function') {
    motionQuery.addEventListener('change', handleMotionChange);
  } else if (typeof motionQuery.addListener === 'function') {
    motionQuery.addListener(handleMotionChange);
  }

  const intervalId = window.setInterval(() => {
    index = (index + 1) % testimonials.length;
    update(index);
  }, ROTATION_INTERVAL_MS);

  const destroy = () => {
    window.clearInterval(intervalId);

    if (typeof motionQuery.removeEventListener === 'function') {
      motionQuery.removeEventListener('change', handleMotionChange);
    } else if (typeof motionQuery.removeListener === 'function') {
      motionQuery.removeListener(handleMotionChange);
    }

    document.removeEventListener('astro:before-swap', destroy);
    document.removeEventListener('astro:page-hidden', destroy);
  };

  document.addEventListener('astro:before-swap', destroy);
  document.addEventListener('astro:page-hidden', destroy);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRotator, { once: true });
} else {
  initRotator();
}
