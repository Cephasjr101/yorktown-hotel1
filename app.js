let BIZ = window.BIZDATA, CART=[];
function money(n){return n+" ETB"}
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}
function chgQty(id,d){
  const it=(BIZ.menu||[]).find(m=>m.id===id); if(!it)return;
  let e=CART.find(c=>c.id===id);
  if(!e){ if(d<1)return; e={id,name:it.name,price:it.price,qty:0}; CART.push(e); }
  e.qty+=d; if(e.qty<1) CART=CART.filter(c=>c.id!==id);
  document.getElementById('q'+id).textContent=e.qty; renderCart();
}
function renderCart(){
  const box=document.getElementById('cart'); const total=CART.reduce((s,i)=>s+i.qty*i.price,0);
  box.innerHTML=CART.length
    ? CART.map(i=>`<div>${i.qty}x ${esc(i.name)} - ${money(i.qty*i.price)}</div>`).join('')+`<p class="cart-total">Total: ${money(total)}</p>`
    : '<p class="muted">Your cart is empty - add items above.</p>';
  document.getElementById('wa-order-btn').disabled=!CART.length;
}
function waLink(msg){ return `https://wa.me/${BIZ.whatsapp}?text=${encodeURIComponent(msg)}`; }
function handoff(msg, okText){
  if(BIZ.whatsapp){ window.open(waLink(msg),'_blank'); return okText+' - your message is ready in WhatsApp.'; }
  return okText+' - the business will call you back to confirm. Save this page for reference.';
}
function sendOrder(){
  const f=document.getElementById('order-form'), err=document.getElementById('order-error');
  err.classList.add('hidden');
  const name=f.customer_name.value.trim(), phone=f.customer_phone.value.trim();
  if(!CART.length){err.textContent='Your cart is empty.';err.classList.remove('hidden');return}
  if(name.length<2){err.textContent='Please enter your name.';err.classList.remove('hidden');return}
  if(!/^\+?[0-9\s\-]{7,15}$/.test(phone)){err.textContent='Please enter a valid phone number.';err.classList.remove('hidden');return}
  if(f.website.value){return}
  const lines=CART.map(i=>`- ${i.qty}x ${i.name} (${money(i.qty*i.price)})`).join('\n');
  const total=CART.reduce((s,i)=>s+i.qty*i.price,0);
  const msg=`Hello ${BIZ.name}! I would like to order:\n${lines}\nTotal: ${money(total)}\nName: ${name}\nPhone: ${phone}${f.notes.value?'\nNotes: '+f.notes.value:''}`;
  document.getElementById('order-success').classList.remove('hidden');
  document.getElementById('order-summary').textContent=handoff(msg, `Total ${money(total)}`);
}
function sendReserve(){
  const f=document.getElementById('reserve-form'), err=document.getElementById('reserve-error');
  err.classList.add('hidden');
  const name=f.customer_name.value.trim(), phone=f.customer_phone.value.trim();
  const type=BIZ.type==='hotel'?'book a room':'reserve a table';
  if(name.length<2){err.textContent='Please enter your name.';err.classList.remove('hidden');return}
  if(!/^\+?[0-9\s\-]{7,15}$/.test(phone)){err.textContent='Please enter a valid phone number.';err.classList.remove('hidden');return}
  if(!f.date.value||f.date.value<new Date().toISOString().slice(0,10)){err.textContent='Please choose a valid date.';err.classList.remove('hidden');return}
  if(!f.time.value){err.textContent='Please choose a time.';err.classList.remove('hidden');return}
  if(f.website.value){return}
  const room=f.room_type?`\nRoom: ${f.room_type.value}`:'';
  const msg=`Hello ${BIZ.name}! I would like to ${type}:\nDate: ${f.date.value} ${f.time.value}\nGuests: ${f.party_size.value}${room}\nName: ${name}\nPhone: ${phone}`;
  document.getElementById('reserve-success').classList.remove('hidden');
  document.getElementById('reserve-summary').textContent=handoff(msg, `${f.date.value} at ${f.time.value}`);
}
function acceptCookies(){localStorage.setItem('consent','granted');document.getElementById('cookie-banner').remove();loadAnalytics()}
if(localStorage.getItem('consent')){document.getElementById('cookie-banner')?.remove();loadAnalytics()}
function loadAnalytics(){
  const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');
}
renderCart();
