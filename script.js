const track=document.getElementById('track'),secs=[...track.children],nav=document.getElementById('nav'),dots=document.getElementById('dots');
let cur=0;
secs.forEach((s,i)=>{
  const b=document.createElement('button');b.textContent=s.dataset.name;b.onclick=()=>go(i);nav.appendChild(b);
  const d=document.createElement('span');dots.appendChild(d);
});
function go(i){i=Math.max(0,Math.min(secs.length-1,i));track.scrollTo({left:i*track.clientWidth});}
function mark(){
  cur=Math.round(track.scrollLeft/track.clientWidth);
  [...nav.children].forEach((b,i)=>b.classList.toggle('on',i===cur));
  [...dots.children].forEach((d,i)=>d.classList.toggle('on',i===cur));
  secs[cur].querySelectorAll('.bar b').forEach(b=>b.style.width=b.dataset.w);
}
track.addEventListener('scroll',mark,{passive:true});
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(+b.dataset.go));
// rueda del mouse: desplazamiento horizontal
let lock=false;
track.addEventListener('wheel',e=>{
  if(Math.abs(e.deltaY)<Math.abs(e.deltaX)||e.target.closest('textarea'))return;
  const sc=e.target.closest('section');
  if(sc&&sc.scrollHeight>sc.clientHeight+4)return;
  e.preventDefault();if(lock)return;lock=true;go(cur+(e.deltaY>0?1:-1));setTimeout(()=>lock=false,600);
},{passive:false});
addEventListener('keydown',e=>{
  if(/INPUT|TEXTAREA/.test(document.activeElement.tagName))return;
  if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1);
});
addEventListener('resize',()=>go(cur));
// efecto de terminal
const txt='whoami  →  desarrolladora@linux';let k=0;
(function t(){document.getElementById('typed').textContent='$ '+txt.slice(0,k++);if(k<=txt.length)setTimeout(t,70);})();
// tema
const root=document.documentElement;
document.getElementById('theme').onclick=()=>{
  const dark=root.dataset.theme==='dark'||(!root.dataset.theme&&matchMedia('(prefers-color-scheme:dark)').matches);
  root.dataset.theme=dark?'light':'dark';
};
// formulario
document.getElementById('f').addEventListener('submit',e=>{
  e.preventDefault();
  const n=document.getElementById('n').value.trim(),em=document.getElementById('e').value.trim(),m=document.getElementById('m').value.trim(),out=document.getElementById('msg');
  if(!n||!/^\S+@\S+\.\S+$/.test(em)||!m){out.style.color='var(--coral)';out.textContent='Completa tu nombre, un correo válido y el mensaje.';return;}
  out.style.color='var(--teal)';out.textContent='Mensaje enviado. Gracias, '+n+'.';e.target.reset();
});
mark();
