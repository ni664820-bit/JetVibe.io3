/* NAV SCROLL */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* MOBILE KEYBOARD FIX */
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--vk-h', `${window.visualViewport.height}px`);
  });
  document.documentElement.style.setProperty('--vk-h', `${window.visualViewport.height}px`);
}

/* HERO BG IMAGE LOAD */
const heroBgImg = document.querySelector('.hero__bg img');
if (heroBgImg) {
  if (heroBgImg.complete) {
    heroBgImg.style.opacity = '1';
  } else {
    heroBgImg.addEventListener('load', () => { heroBgImg.style.opacity = '1'; });
  }
}

/* BURGER */
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.querySelector('.mobile-menu');
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

/* HERO PLANE — starts at left edge, flies right on scroll */
const heroPlane = document.getElementById('heroPlane');
const heroSection = document.querySelector('.hero');
if (heroPlane && heroSection) {
  const heroImg = heroPlane.querySelector('img');

  function updatePlane() {
    const scrollY = window.scrollY;
    const heroH = heroSection.offsetHeight;
    const maxScroll = heroH * 1.2;
    const t = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    // Start at left edge, fly across screen to the right
    const startX = -50;
    const endX = window.innerWidth + 600;
    const x = startX + t * (endX - startX);
    const y = -t * 30;
    const rotate = -t * 8;
    const scale = 1 - t * 0.3;
    const opacity = t > 0.9 ? Math.max((1 - t) / 0.1, 0) : 1;

    heroPlane.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`;
    heroPlane.style.opacity = opacity;
    heroImg.style.animationPlayState = t < 0.1 ? 'running' : 'paused';
  }

  window.addEventListener('scroll', () => requestAnimationFrame(updatePlane));
  updatePlane();
}

/* REVEAL ON SCROLL */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(el => observer.observe(el));

/* PARALLAX HERO BG */
const heroBg = document.querySelector('.hero__bg img');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroBg.style.transform = `translateY(${y * 0.3}px) scale(1.1)`;
    }
  });
}

/* COUNTER ANIMATION */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased).toLocaleString('ru-RU') + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const statsSection = document.querySelector('.hero__stats');
if (statsSection) statsObserver.observe(statsSection);

/* FLIGHTS DATABASE */
const flightsDB = [
  { id:1,  from:'Москва', fromCode:'SVO', to:'Нью-Йорк', toCode:'JFK', depart:'08:30', arrive:'14:00', duration:'10ч 30м', stops:'Без пересадок', class:'Бизнес', price:185000 },
  { id:2,  from:'Москва', fromCode:'SVO', to:'Нью-Йорк', toCode:'JFK', depart:'14:15', arrive:'19:45', duration:'10ч 30м', stops:'Без пересадок', class:'Эконом', price:89000 },
  { id:3,  from:'Москва', fromCode:'SVO', to:'Нью-Йорк', toCode:'JFK', depart:'23:00', arrive:'09:30', duration:'13ч 30м', stops:'1 пересадка', class:'Эконом', price:67500 },
  { id:4,  from:'Москва', fromCode:'SVO', to:'Дубай', toCode:'DXB', depart:'07:00', arrive:'12:15', duration:'5ч 15м', stops:'Без пересадок', class:'Бизнес', price:95000 },
  { id:5,  from:'Москва', fromCode:'SVO', to:'Дубай', toCode:'DXB', depart:'10:30', arrive:'15:45', duration:'5ч 15м', stops:'Без пересадок', class:'Эконом', price:42000 },
  { id:6,  from:'Москва', fromCode:'SVO', to:'Дубай', toCode:'DXB', depart:'19:00', arrive:'01:30', duration:'7ч 30м', stops:'1 пересадка', class:'Эконом', price:35000 },
  { id:7,  from:'Москва', fromCode:'SVO', to:'Дубай', toCode:'DXB', depart:'12:00', arrive:'17:15', duration:'5ч 15м', stops:'Без пересадок', class:'Комфорт', price:62000 },
  { id:8,  from:'Москва', fromCode:'SVO', to:'Токио', toCode:'NRT', depart:'01:30', arrive:'11:15', duration:'9ч 45м', stops:'Без пересадок', class:'Бизнес', price:210000 },
  { id:9,  from:'Москва', fromCode:'SVO', to:'Токио', toCode:'NRT', depart:'09:00', arrive:'20:45', duration:'14ч 45м', stops:'1 пересадка', class:'Эконом', price:78000 },
  { id:10, from:'Москва', fromCode:'SVO', to:'Токио', toCode:'NRT', depart:'16:30', arrive:'02:15', duration:'14ч 45м', stops:'1 пересадка', class:'Эконом', price:72000 },
  { id:11, from:'Москва', fromCode:'SVO', to:'Лондон', toCode:'LHR', depart:'06:00', arrive:'08:30', duration:'4ч 30м', stops:'Без пересадок', class:'Бизнес', price:120000 },
  { id:12, from:'Москва', fromCode:'SVO', to:'Лондон', toCode:'LHR', depart:'11:45', arrive:'14:15', duration:'4ч 30м', stops:'Без пересадок', class:'Эконом', price:48000 },
  { id:13, from:'Москва', fromCode:'SVO', to:'Париж', toCode:'CDG', depart:'08:15', arrive:'11:00', duration:'4ч 45м', stops:'Без пересадок', class:'Бизнес', price:110000 },
  { id:14, from:'Москва', fromCode:'SVO', to:'Париж', toCode:'CDG', depart:'15:30', arrive:'18:15', duration:'4ч 45м', stops:'Без пересадок', class:'Эконом', price:45000 },
  { id:15, from:'Москва', fromCode:'SVO', to:'Стамбул', toCode:'IST', depart:'07:45', arrive:'10:00', duration:'3ч 15м', stops:'Без пересадок', class:'Эконом', price:28000 },
  { id:16, from:'Москва', fromCode:'SVO', to:'Стамбул', toCode:'IST', depart:'20:00', arrive:'22:15', duration:'3ч 15м', stops:'Без пересадок', class:'Бизнес', price:65000 },
  { id:17, from:'Москва', fromCode:'SVO', to:'Пхукет', toCode:'HKT', depart:'22:30', arrive:'11:00', duration:'11ч 30м', stops:'1 пересадка', class:'Бизнес', price:175000 },
  { id:18, from:'Москва', fromCode:'SVO', to:'Пхукет', toCode:'HKT', depart:'05:00', arrive:'17:30', duration:'11ч 30м', stops:'1 пересадка', class:'Эконом', price:68000 },
];

const pricesMultiplyer = { '1 взрослый':1, '2 взрослых':2, '3 взрослых':3, '1 + 1 ребёнок':1.55 };

/* BOOKING FORM → SEARCH */
const bookingForm = document.getElementById('bookingForm');
const flightResults = document.getElementById('flightResults');
const flightList = document.getElementById('flightList');
const resultsTitle = document.getElementById('resultsTitle');
const resultsClose = document.getElementById('resultsClose');

bookingForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  const from = document.getElementById('bookFrom').value.trim();
  const to = document.getElementById('bookTo').value.trim();
  const departDate = document.getElementById('bookDepart').value;
  const passengers = document.getElementById('bookPassengers').value;
  const paxMultiplier = pricesMultiplyer[passengers] || 1;

  let results = flightsDB.filter(f => {
    const matchFrom = !from || f.from.toLowerCase().includes(from.toLowerCase()) || f.fromCode.toLowerCase().includes(from.toLowerCase());
    const matchTo = !to || f.to.toLowerCase().includes(to.toLowerCase()) || f.toCode.toLowerCase().includes(to.toLowerCase());
    return matchFrom && matchTo;
  });

  if (results.length === 0) {
    flightList.innerHTML = `<div class="flight-results__empty"><strong>:(</strong>Подходящих рейсов не найдено.<br>Попробуйте изменить параметры поиска.</div>`;
  } else {
    flightList.innerHTML = results.map(f => {
      const finalPrice = Math.round(f.price * paxMultiplier);
      const dateLabel = departDate ? new Date(departDate).toLocaleDateString('ru-RU', {day:'numeric',month:'short'}) : 'Ближайшая дата';
      return `
        <div class="flight-card" data-flight-id="${f.id}">
          <div class="flight-card__from">
            <div class="flight-card__time">${f.depart}</div>
            <div class="flight-card__city">${f.from}</div>
            <div class="flight-card__code">${f.fromCode}</div>
          </div>
          <div class="flight-card__route">
            <div class="flight-card__duration">${f.duration}</div>
            <div class="flight-card__line"></div>
            <div class="flight-card__stops">${f.stops}</div>
          </div>
          <div class="flight-card__to">
            <div class="flight-card__time">${f.arrive}</div>
            <div class="flight-card__city">${f.to}</div>
            <div class="flight-card__code">${f.toCode}</div>
          </div>
          <div class="flight-card__right">
            <div class="flight-card__class">${f.class}</div>
            <div class="flight-card__price-label">за ${passengers}</div>
            <div class="flight-card__price">${finalPrice.toLocaleString('ru-RU')} ₽</div>
            <button class="flight-card__book" onclick="event.stopPropagation(); openModal('${f.to}')">Выбрать</button>
          </div>
        </div>`;
    }).join('');
  }

  const toLabel = to || 'все направления';
  resultsTitle.textContent = `Рейсы: ${from || 'Москва'} → ${toLabel}`;
  flightResults.classList.add('open');
  setTimeout(() => flightResults.scrollIntoView({ behavior:'smooth', block:'start' }), 100);
});

resultsClose?.addEventListener('click', () => {
  flightResults.classList.remove('open');
});

/* DIRECTION CARDS → OPEN BOOKING MODAL */
const directionsData = {
  'Нью-Йорк': { route: 'Москва → Нью-Йорк', flight: '10ч 30м', price: '185 000', code: 'JFK' },
  'Дубай':    { route: 'Москва → Дубай',    flight: '5ч 15м',  price: '95 000',  code: 'DXB' },
  'Токио':    { route: 'Москва → Токио',    flight: '9ч 45м',  price: '145 000', code: 'NRT' }
};

const modal = document.getElementById('bookingModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');
const modalDest = document.getElementById('modalDestination');
const modalRoute = document.getElementById('modalRoute');
const modalFlight = document.getElementById('modalFlight');
const modalPrice = document.getElementById('modalPrice');
const modalFrom = document.getElementById('modalFrom');
const modalTo = document.getElementById('modalTo');

function openModal(city) {
  const data = directionsData[city];
  if (!data || !modal) return;
  modalDest.textContent = city;
  modalRoute.textContent = data.route;
  modalFlight.textContent = data.flight;
  modalPrice.textContent = data.price + ' ₽';
  modalTo.value = city + ' (' + data.code + ')';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.direction-card').forEach(card => {
  card.addEventListener('click', () => {
    const city = card.querySelector('.direction-card__city')?.textContent;
    if (city) openModal(city);
  });
});

modalClose?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* MODAL BOOKING FORM */
document.getElementById('modalForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.modal__submit');
  btn.textContent = 'Оформление...';
  btn.style.opacity = '0.7';
  setTimeout(() => {
    btn.textContent = 'Билет забронирован!';
    btn.style.opacity = '1';
    btn.style.background = '#2a7a3a';
    setTimeout(() => {
      closeModal();
      btn.textContent = 'Забронировать билет';
      btn.style.background = '';
    }, 2000);
  }, 1500);
});

/* SMOOTH SCROLL FOR ANCHORS */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
