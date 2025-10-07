/* script.js */

/* --- Simple slider for homepage --- */
(function(){
  try{
    const slides = document.querySelectorAll('.home-slider .slide');
    if(!slides || slides.length===0) return;
    const container = document.querySelector('.home-slider .slides');
    let idx=0;
    const total = slides.length;
    function show(i){
      idx=(i+total)%total;
      container.style.transform = `translateX(-${idx*100}%)`;
      // update dots if exist
      const dots = document.querySelectorAll('.slider-dots .dot');
      dots.forEach(d=>d.classList.remove('active'));
      if(dots[idx]) dots[idx].classList.add('active');
    }
    // create dots
    const dotsWrap = document.querySelector('.slider-dots');
    if(dotsWrap){
      for(let i=0;i<total;i++){
        const d = document.createElement('div'); d.className='dot'; if(i===0) d.classList.add('active');
        d.style.width='10px'; d.style.height='10px'; d.style.borderRadius='50%'; d.style.background='rgba(255,255,255,0.18)'; d.style.cursor='pointer';
        d.style.boxShadow='inset 0 0 0 3px rgba(0,0,0,0.25)';
        d.addEventListener('click', ()=>{ show(i); reset(); });
        dotsWrap.appendChild(d);
      }
    }
    function next(){ show(idx+1); }
    let timer = setInterval(next,4500);
    function reset(){ clearInterval(timer); timer = setInterval(next,4500); }
    // pause on hover
    const hero = document.querySelector('.home-slider');
    if(hero){
      hero.addEventListener('mouseenter', ()=>clearInterval(timer));
      hero.addEventListener('mouseleave', ()=>reset());
    }
    // initial
    show(0);
  }catch(e){ console.warn(e) }
})();

/* --- Lightbox for images with data-large attribute --- */
(function(){
  document.addEventListener('click', function(e){
    const el = e.target;
    if(el && el.tagName==='IMG' && el.dataset && el.dataset.large){
      // create overlay
      const overlay = document.createElement('div');
      overlay.style.position='fixed';overlay.style.left=0;overlay.style.top=0;overlay.style.right=0;overlay.style.bottom=0;
      overlay.style.background='rgba(0,0,0,0.85)';overlay.style.display='flex';overlay.style.alignItems='center';overlay.style.justifyContent='center';
      overlay.style.zIndex=9999;
      const img = document.createElement('img');
      img.src = el.dataset.large;
      img.style.maxWidth='92%'; img.style.maxHeight='86%'; img.style.borderRadius='8px';
      overlay.appendChild(img);
      overlay.addEventListener('click', ()=>document.body.removeChild(overlay));
      document.body.appendChild(overlay);
    }
  });
})();

/* --- Highlight current nav item based on URL --- */
(function(){
  const links = document.querySelectorAll('header a');
  links.forEach(a=>{
    if(a.getAttribute('href')===location.pathname.split('/').pop() || (a.getAttribute('href')==='index.html' && (location.pathname==="/"|| location.pathname.endsWith('index.html')))){
      a.style.color = 'var(--yellow)';
    }
  });
})();
