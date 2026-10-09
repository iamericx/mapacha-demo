const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const toast = document.querySelector('.toast');
const reservationForm = document.querySelector('#reservationForm');
const menuSearch = document.querySelector('#menuSearch');
const menuCount = document.querySelector('#menuCount');
const menuEmpty = document.querySelector('#menuEmpty');
const menuCards = [...document.querySelectorAll('.menu-item')];
const filterButtons = [...document.querySelectorAll('.filter-button')];
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

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      toggle.textContent = '☰';
      toggle.focus();
    }
  });
}

let activeCategory = 'all';

function updateMenu() {
  const query = (menuSearch?.value || '').trim().toLocaleLowerCase();
  let visibleCount = 0;

  menuCards.forEach(card => {
    const matchesCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
    const searchableText = `${card.dataset.search} ${card.textContent}`.toLocaleLowerCase();
    const matchesSearch = !query || searchableText.includes(query);
    const visible = matchesCategory && matchesSearch;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  if (menuCount) menuCount.textContent = `Showing ${visibleCount} of ${menuCards.length} sample ${menuCards.length === 1 ? 'dish' : 'dishes'}`;
  if (menuEmpty) menuEmpty.hidden = visibleCount !== 0;
}

filterButtons.forEach(button => button.addEventListener('click', () => {
  activeCategory = button.dataset.filter;
  filterButtons.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('is-active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  updateMenu();
}));

menuSearch?.addEventListener('input', updateMenu);

document.querySelectorAll('.enquiry-button').forEach(button => button.addEventListener('click', () => {
  showToast(`${button.dataset.dish} is a sample dish. Please confirm menu details with Mapacha.`);
}));

document.querySelector('.clear-menu-search')?.addEventListener('click', () => {
  if (menuSearch) menuSearch.value = '';
  activeCategory = 'all';
  filterButtons.forEach(button => {
    const selected = button.dataset.filter === 'all';
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  updateMenu();
  menuSearch?.focus();
});

updateMenu();

if (reservationForm) {
  reservationForm.addEventListener('submit', event => {
    event.preventDefault();
    showToast('Thanks for your interest. This preview form does not send a booking yet.');
  });
}
