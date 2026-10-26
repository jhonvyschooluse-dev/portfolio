/* PORTFOLIO INTERACTIONS
   1. Mobile menu              5. Project search
   2. Smooth section tracking  6. Project detail popup
   3. Scroll indicator         7. Copy email + helpful message
   4. Project filters         8. Quick navigation (Ctrl/Cmd+K)
   No frameworks, paid services, or secret keys are needed. */
'use strict';

// Mini helpers
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const year = new Date().getFullYear();
$('#current-year').textContent = String(year);
$('#hero-year').textContent = String(year);

// 1. Mobile navigation
const menuButton = $('#mobile-menu-btn');
const mainNav = $('#primary-nav');
function setMenu(open) {
  mainNav.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
$$('a[href^="#"]', mainNav).forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', e => {
  if (mainNav.classList.contains('is-open') && !mainNav.contains(e.target) && !menuButton.contains(e.target)) setMenu(false);
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// 2. Current section indicator
const navLinks = $$('[data-nav]');
const sections = $$('main section[id]');
const sectionObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
  if (!visible.length) return;
  const current = visible[0].target.id;
  navLinks.forEach(link => {
    const isActive = link.dataset.nav === current;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}, {rootMargin:'-22% 0px -55% 0px', threshold:[0,.1,.3]});
sections.forEach(section => sectionObserver.observe(section));

// 3. Scroll indicator, lightweight reveal effects
const progressBar = $('#scroll-progress-bar');
let scrollScheduled = false;
function updateScrollProgress(){
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (total > 0 ? Math.min(100, window.scrollY / total * 100) : 0) + '%';
  scrollScheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scrollScheduled) { window.requestAnimationFrame(updateScrollProgress); scrollScheduled = true; }
}, {passive:true});
updateScrollProgress();
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), {threshold:0.08, rootMargin:'0px 0px 10px 0px'});
  $$('.reveal').forEach(el => revealObserver.observe(el));
} else { $$('.reveal').forEach(el => el.classList.add('visible')); }

// 4 and 5. Working category filters + text search
const projectCards = $$('.project-card');
const filterButtons = $$('.filter-btn');
const search = $('#project-search');
const empty = $('#project-empty');
const resultsStatus = $('#results-status');
let currentFilter = 'all';
function filterProjects(){
  const term = search.value.toLowerCase().trim();
  let visibleCount = 0;
  projectCards.forEach(card => {
    const fitsCategory = currentFilter === 'all' || card.dataset.category === currentFilter;
    const searchable = (card.textContent + ' ' + (card.dataset.keywords || '')).toLowerCase();
    const fitsSearch = !term || searchable.includes(term);
    const show = fitsCategory && fitsSearch;
    card.hidden = !show;
    if (show) visibleCount++;
  });
  empty.hidden = visibleCount !== 0;
  resultsStatus.textContent = `Showing ${visibleCount} of ${projectCards.length} project${projectCards.length === 1 ? '' : 's'}.`;
  filterButtons.forEach(button => {
    const active = button.dataset.filter === currentFilter;
    button.classList.toggle('is-selected', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
filterButtons.forEach(button => button.addEventListener('click', () => {currentFilter = button.dataset.filter; filterProjects();}));
search.addEventListener('input', filterProjects);
$('#project-reset').addEventListener('click', () => {currentFilter = 'all'; search.value=''; filterProjects(); search.focus();});
filterProjects();

// 6. Real native <dialog> for project details; data is copied from each card.
const projectDialog = $('#project-dialog');
const dialogClose = $('#dialog-close');
let lastFocused = null;
function closeProjectDialog(){projectDialog.close();}
projectCards.forEach(card => {
  $('.project-open', card).addEventListener('click', () => {
    lastFocused = document.activeElement;
    $('#modal-title').textContent = $('h3', card).textContent;
    $('#modal-category').textContent = $('.project-type', card).textContent;
    $('#modal-description').textContent = $('.project-description', card).textContent;
    $('#modal-tech').textContent = $('.project-tech', card).textContent;
    $('#modal-contribution').textContent = $('.project-contribution span', card).textContent;
    const sourceImage = $('.project-photo img', card);
    const targetImage = $('#modal-img');
    targetImage.src = sourceImage.getAttribute('src');
    targetImage.alt = sourceImage.alt;
    const cardSource = $('.project-source', card);
    const modalSource = $('#modal-source');
    if (cardSource) {
      modalSource.href = cardSource.href;
      modalSource.hidden = false;
    } else {
      modalSource.hidden = true;
      modalSource.removeAttribute('href');
    }
    projectDialog.showModal();
    dialogClose.focus();
  });
});
dialogClose.addEventListener('click', closeProjectDialog);
projectDialog.addEventListener('click', e => {if(e.target === projectDialog)closeProjectDialog();});
projectDialog.addEventListener('close', () => lastFocused?.focus());

// 7. Email link and Copy Email button (check for sample address first).
const emailLink = $('#email-link');
const email = $('#contact-email');
const toast = $('#toast');
let toastTimer = 0;
function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}
function getEmail(){ return email.textContent.trim(); }
function isPlaceholderEmail(address){ return !address || address.includes('example.com') || address.includes('['); }
emailLink.addEventListener('click', e => {
  const address = getEmail();
  if(isPlaceholderEmail(address)){ e.preventDefault(); showToast('Replace the example email in index.html before publishing.'); }
  else { emailLink.href = 'mailto:' + address; }
});
$('#copy-email').addEventListener('click', async () => {
  const address = getEmail();
  if(isPlaceholderEmail(address)){showToast('Add your own email in index.html first.');return;}
  try {
    if(navigator.clipboard && window.isSecureContext){await navigator.clipboard.writeText(address);}
    else {
      const field=document.createElement('textarea');field.value=address;field.style.position='fixed';field.style.opacity='0';document.body.appendChild(field);field.select();const ok=document.execCommand('copy');field.remove();if(!ok)throw new Error('Copy not supported');
    }
    showToast('Email copied to clipboard!');
  } catch { showToast('Unable to copy automatically. Please select the displayed email.'); }
});

// 8. Quick-jump dialog — click the header or press Ctrl/Cmd + K.
const quickDialog = $('#quick-dialog');
function openQuick(){if(!projectDialog.open && !quickDialog.open){setMenu(false);quickDialog.showModal();}}
$('#quick-open').addEventListener('click', openQuick);
$('#quick-close').addEventListener('click', () => quickDialog.close());
quickDialog.addEventListener('click', e => {if(e.target === quickDialog)quickDialog.close();});
$$('[data-jump]').forEach(button => button.addEventListener('click', () => {
  const target = document.getElementById(button.dataset.jump);
  quickDialog.close();
  target?.scrollIntoView({behavior:prefersReducedMotion ? 'instant' : 'smooth'});
}));
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (quickDialog.open) quickDialog.close(); else openQuick();
  }
});
