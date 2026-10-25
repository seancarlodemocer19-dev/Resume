(function(){
  const el=document.getElementById('role'), text='BSIT student · Seeking an internship';
  if(matchMedia('(prefers-reduced-motion:reduce)').matches){el.textContent=text;return}
  let i=0;(function t(){el.textContent=text.slice(0,i++);if(i<=text.length)setTimeout(t,45)})();
})();

const themeBtn=document.getElementById('theme');
function setTheme(t){document.documentElement.dataset.theme=t;themeBtn.setAttribute('aria-label',t==='dark'?'Switch to light mode':'Switch to dark mode');themeBtn.setAttribute('aria-pressed',t==='dark');try{localStorage.setItem('resume-theme',t)}catch(e){}}
let saved=null;try{saved=localStorage.getItem('resume-theme')}catch(e){}
setTheme(saved||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'));
themeBtn.onclick=()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark');

const chips=document.querySelectorAll('#filters .chip'),tags=document.querySelectorAll('.tag');
chips.forEach(c=>c.onclick=()=>{
  chips.forEach(x=>x.classList.toggle('on',x===c));
  const f=c.dataset.f;
  tags.forEach(t=>{const hit=f!=='all'&&t.dataset.g===f;t.classList.toggle('hit',hit);t.classList.toggle('dim',f!=='all'&&!hit)});
});

document.querySelectorAll('.cert button').forEach(b=>b.onclick=()=>{
  const c=b.parentElement,open=c.classList.toggle('open');b.setAttribute('aria-expanded',open);
});

const links=[...document.querySelectorAll('nav a')];
const sections=[...document.querySelectorAll('section')];
const navEl=document.querySelector('nav');
const mainEl=document.querySelector('main');
const last=sections[sections.length-1];
let current=null;

function pad(){
  const extra=Math.max(80,window.innerHeight-72-last.offsetHeight);
  mainEl.style.paddingBottom=extra+'px';
}

function spy(){
  let id=sections[0].id;
  sections.forEach(s=>{if(s.getBoundingClientRect().top<=100)id=s.id});
  if(id===current)return;
  current=id;
  links.forEach(l=>{
    const on=l.getAttribute('href')==='#'+id;
    l.classList.toggle('active',on);
    if(on){navEl.scrollTo({left:l.offsetLeft-16,behavior:'smooth'})}
  });
}

pad();
new ResizeObserver(pad).observe(last);
addEventListener('resize',()=>{pad();spy()});
addEventListener('scroll',spy,{passive:true});
spy();
