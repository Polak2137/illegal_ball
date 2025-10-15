/* script.js */

/* Uruchamiaj po załadowaniu DOM */
document.addEventListener('DOMContentLoaded', () => {

  /* --- Simple slider for homepage --- */
  (() => {
    try {
      const slides = document.querySelectorAll('.home-slider .slide');
      if (!slides.length) return;

      const container = document.querySelector('.home-slider .slides');
      const dotsWrap = document.querySelector('.slider-dots');
      const total = slides.length;
      let idx = 0;
      let timer;

      // Utwórz kropki
      if (dotsWrap) {
        for (let i = 0; i < total; i++) {
          const dot = document.createElement('div');
          dot.className = 'dot';
          if (i === 0) dot.classList.add('active');
          Object.assign(dot.style, {
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.18)',
            cursor: 'pointer',
            boxShadow: 'inset 0 0 0 3px rgba(0,0,0,0.25)',
          });
          dot.addEventListener('click', () => {
            show(i);
            resetTimer();
          });
          dotsWrap.appendChild(dot);
        }
      }

      function show(i) {
        idx = (i + total) % total;
        container.style.transform = `translateX(-${idx * 100}%)`;
        const dots = document.querySelectorAll('.slider-dots .dot');
        dots.forEach(d => d.classList.remove('active'));
        if (dots[idx]) dots[idx].classList.add('active');
      }

      function next() {
        show(idx + 1);
      }

      function resetTimer() {
        clearInterval(timer);
        timer = setInterval(next, 4500);
      }

      const hero = document.querySelector('.home-slider');
      if (hero) {
        hero.addEventListener('mouseenter', () => clearInterval(timer));
        hero.addEventListener('mouseleave', resetTimer);
      }

      show(0);
      resetTimer();

    } catch (e) {
      console.warn('Slider error:', e);
    }
  })();


  /* --- Lightbox for images with data-large attribute --- */
  (() => {
    document.addEventListener('click', e => {
      const el = e.target;
      if (el?.tagName === 'IMG' && el.dataset.large) {
        const overlay = document.createElement('div');
        overlay.classList.add('lightbox-overlay');
        Object.assign(overlay.style, {
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          opacity: 0,
          transition: 'opacity 0.3s ease'
        });

        const img = document.createElement('img');
        img.src = el.dataset.large;
        Object.assign(img.style, {
          maxWidth: '92%',
          maxHeight: '86%',
          borderRadius: '8px',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)'
        });

        overlay.appendChild(img);
        document.body.appendChild(overlay);
        requestAnimationFrame(() => overlay.style.opacity = 1);

        overlay.addEventListener('click', () => closeLightbox());
        document.addEventListener('keydown', escHandler);

        function closeLightbox() {
          overlay.style.opacity = 0;
          setTimeout(() => {
            overlay.remove();
            document.removeEventListener('keydown', escHandler);
          }, 300);
        }

        function escHandler(ev) {
          if (ev.key === 'Escape') closeLightbox();
        }
      }
    });
  })();


  /* --- Highlight current nav item based on URL --- */
  (() => {
    const links = document.querySelectorAll('header a');
    const current = location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
      const href = a.getAttribute('href');
      if (href === current || (href === 'index.html' && current === '')) {
        a.style.color = 'var(--yellow)';
      }
    });
  })();
});
/* --- Toggle price list visibility --- */
function showCennik(type) {
  const modal = document.getElementById('modalCennik');
  const content = document.getElementById('cennik-content');

  if (type === 'paintball') {
    content.innerHTML = `
      <h3>Cennik</h3>
      <ul>
        <li>Pakiet Startowy - sprzęt do gry + 200 kulek - 70 zł </li>
        <li>Pakiet Medium - sprzęt do gry + 300 kulek - 90 zł </li>
        <li>Pakiet Popular - sprzęt do gry + 500 kulek - 125 zł </li>
      </ul>`;
  } else if (type === 'dzieci') {
    content.innerHTML = `
      <h3>Cennik</h3>
      <ul>
        <li>Pakiet Startowy - sprzęt do gry + 200 kulek - 70 zł </li>
        <li>Pakiet Medium - sprzęt do gry + 300 kulek - 90 zł </li>
        <li>Pakiet Popular - sprzęt do gry + 500 kulek - 125 zł </li>
        <li><br></li>
        <li><b>Wymagana zgoda dla osób poniżej 18 roku życia.</b></li>
        <a href="files/zgoda.pdf" download>Pobierz dokument</a>
      </ul>`;
  } else if (type === 'szkola') {
    content.innerHTML = `
      <h3>Cennik</h3>
      <ul>
        <li>UWAGA! </li>
        <li>Pakiet obejmuje jedynie zapłatę za kulki, sprzęt oraz umundurowanie gratis!</li>

        <li><br></li>
        <li><b>Wymagana zgoda dla osób poniżej 18 roku życia.</b></li>
        <a href="files/zgoda.pdf" download>Pobierz dokument</a>
      </ul>`;
  } else if (type === 'voucher') {
    content.innerHTML = `
      <h3>Cennik</h3>
      <ul>
        <li>UWAGA! </li>
        <li>Pakiet obejmuje jedynie zapłatę za kulki, sprzęt oraz umundurowanie gratis!</li>
        <li><br></li>
        <li>100 kulek - 20 zł  </li>
        <li>500 kulek - 85 zł  </li>
      </ul>`;
  } else if (type === 'niemowlaki') {
    content.innerHTML = `
      <h3>Cennik</h3>
      <ul>
        <li>Pakiet Startowy - sprzęt do gry + 200 kulek - 70 zł </li>
        <li>Pakiet Medium - sprzęt do gry + 300 kulek - 90 zł </li>
        <li>Pakiet Popular - sprzęt do gry + 500 kulek - 125 zł </li>
        <li><br></li>
        <li><b>Wymagana zgoda dla osób poniżej 18 roku życia.</b></li>
        <a href="files/zgoda.pdf" download>Pobierz dokument</a>
      </ul>`;
  }

  modal.style.display = 'flex';
}
function closeCennik() {
  document.getElementById('modalCennik').style.display = 'none';
}
window.onclick = function(e) {
  const modal = document.getElementById('modalCennik');
  if (e.target === modal) modal.style.display = 'none';
};

function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("show");

  const hamburger = document.querySelector(".hamburger");
  hamburger.classList.toggle("open");
}



