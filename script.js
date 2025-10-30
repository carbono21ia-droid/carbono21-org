const navigation = document.querySelector('.navigation');
const toggle = document.querySelector('.menu-toggle');
const yearSpan = document.getElementById('year');

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const closeMenu = () => {
  navigation?.classList.remove('is-open');
  toggle?.setAttribute('aria-expanded', 'false');
};

if (toggle) {
  toggle.addEventListener('click', () => {
    const isOpen = navigation?.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(!!isOpen));
  });
}

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => closeMenu());
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches) {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href')?.substring(1);
      const section = targetId ? document.getElementById(targetId) : null;

      if (section) {
        event.preventDefault();
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

window.addEventListener('scroll', () => {
  document.querySelectorAll('.card').forEach((card) => {
    const rect = card.getBoundingClientRect();
    const visible = rect.top < window.innerHeight - 80;
    if (visible) {
      card.style.transform = 'translateY(0)';
      card.style.opacity = '1';
    }
  });
});

// Inicializa opacidade para animação de entrada
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 150 * index);
  });
});
