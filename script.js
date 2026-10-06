
const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

const nav = $('.nav');
const progress = $('.progress');
window.addEventListener('scroll', ()=>{
  nav?.classList.toggle('scrolled', window.scrollY > 30);
  const h = document.documentElement.scrollHeight - innerHeight;
  if(progress) progress.style.width = `${h ? (scrollY/h)*100 : 0}%`;
},{passive:true});

$('.menu')?.addEventListener('click',()=>$('.nav-links')?.classList.toggle('open'));
$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>$('.nav-links')?.classList.remove('open')));

const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in');obs.unobserve(e.target)}})
},{threshold:.12});
$$('.reveal').forEach(el=>obs.observe(el));

if(window.matchMedia('(pointer:fine)').matches){
  const c=$('.cursor'), d=$('.cursor-dot');
  let mx=0,my=0,cx=0,cy=0;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;d&&(d.style.left=mx+'px',d.style.top=my+'px')});
  function loop(){cx+=(mx-cx)*.18;cy+=(my-cy)*.18;if(c){c.style.left=cx+'px';c.style.top=cy+'px'}requestAnimationFrame(loop)}
  loop();
  $$('a,button,.feature,.trip-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{if(c){c.style.width='38px';c.style.height='38px';c.style.background='rgba(255,255,255,.08)'}});
    el.addEventListener('mouseleave',()=>{if(c){c.style.width='18px';c.style.height='18px';c.style.background='transparent'}});
  });
}

$$('[data-counter]').forEach(el=>{
 const target=+el.dataset.counter; let started=false;
 const o=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting&&!started){started=true;let n=0;const step=Math.max(1,Math.ceil(target/50));const t=setInterval(()=>{n+=step;if(n>=target){n=target;clearInterval(t)}el.textContent=n+(el.dataset.suffix||'')},28)}
 }),{threshold:.6});o.observe(el)
});

function waMessage(form){
 const fd=new FormData(form), lines=[];
 for(const [k,v] of fd.entries()) if(v) lines.push(`${k.replaceAll('_',' ')}: ${v}`);
 const text=`*Safarnama Ventures — Custom Trip Request*%0A%0A${lines.join('%0A')}`;
 window.open(`https://wa.me/923336441204?text=${text}`,'_blank');
}
$('#customForm')?.addEventListener('submit',e=>{e.preventDefault();waMessage(e.target);const box=$('.success-box');if(box) box.style.display='block';});

$('#emailForm')?.addEventListener('submit',e=>{
 e.preventDefault();
 const fd=new FormData(e.target);
 const subject=encodeURIComponent('Safarnama Ventures — Trip Enquiry');
 const body=encodeURIComponent([...fd.entries()].map(([k,v])=>`${k.replaceAll('_',' ')}: ${v}`).join('\n'));
 location.href=`mailto:i.safarnamatrips@gmail.com?subject=${subject}&body=${body}`;
});

$$('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  const f=btn.dataset.filter;
  $$('[data-trip]').forEach(card=>card.style.display=(f==='all'||card.dataset.trip===f)?'block':'none');
  $$('[data-filter]').forEach(b=>b.classList.remove('active-filter'));btn.classList.add('active-filter');
}));

/* premium interaction layer */
document.documentElement.classList.add('js-ready');
document.body.classList.add('page-ready');

if(window.matchMedia('(pointer:fine)').matches){
  $$('.feature,.route-card,.trip-card,.dir-group').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${y*-2.2}deg) rotateY(${x*2.2}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
}
const heroMedia=$('.hero-media');
addEventListener('scroll',()=>{if(heroMedia && scrollY<innerHeight*1.2) heroMedia.style.transform=`scale(1.04) translateY(${scrollY*.08}px)`},{passive:true});
