const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const toast = document.querySelector('.toast');
const reservationForm = document.querySelector('#reservationForm');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4000);
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    toggle.textContent = open ? '×' : '☰';
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    toggle.textContent = '☰';
  }));
}

document.querySelectorAll('.dish-card').forEach(card => card.addEventListener('click', event => {
  event.preventDefault();
  showToast(`${card.dataset.category}: menu details should be confirmed with Mapacha.`);
}));

if (reservationForm) {
  reservationForm.addEventListener('submit', event => {
    event.preventDefault();
    showToast('Thanks for your interest. This preview form does not send a booking yet.');
  });
}
