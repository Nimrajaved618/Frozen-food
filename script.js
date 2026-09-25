const products = [
  {name:'Crispy Chicken Strips', category:'Chicken', weight:'500g · 4.8 ★', price:8.99, old:'10.99', emoji:'🍗', bg:'blue', sale:'-18%'},
  {name:'Garden Vegetable Mix', category:'Vegetables', weight:'750g · 4.7 ★', price:4.49, old:'', emoji:'🥦', bg:'green'},
  {name:'Chicken Seekh Kebabs', category:'Meals', weight:'400g · 4.9 ★', price:9.99, old:'', emoji:'🍢', bg:'orange'},
  {name:'Golden Vegetable Samosas', category:'Snacks', weight:'600g · 4.8 ★', price:6.99, old:'8.49', emoji:'🥟', bg:'pink', sale:'-17%'},
  {name:'Flaky Family Paratha', category:'Meals', weight:'5 pack · 4.6 ★', price:5.49, old:'', emoji:'🫓', bg:'cream'},
  {name:'Atlantic Fish Fillets', category:'Seafood', weight:'400g · 4.8 ★', price:12.99, old:'', emoji:'🐟', bg:'aqua'},
  {name:'Chocolate Ice Cream', category:'Desserts', weight:'1L tub · 4.9 ★', price:7.49, old:'8.99', emoji:'🍨', bg:'pink', sale:'-16%'},
  {name:'Ready-to-Cook Nuggets', category:'Snacks', weight:'600g · 4.7 ★', price:7.99, old:'', emoji:'🍟', bg:'orange'}
];
const grid = document.querySelector('#product-grid'); const empty = document.querySelector('#empty-products'); let cart = Number(localStorage.getItem('frost-cart') || 0);
document.querySelector('#cart-count').textContent = cart;
function render(filter='All') { const list=filter==='All'?products:products.filter(p=>p.category===filter || (filter==='Chicken'&&p.category==='Chicken')); grid.innerHTML=list.map((p,i)=>`<article class="product-card"><div class="product-image ${p.bg}">${p.sale?`<span class="sale">${p.sale}</span>`:''}${p.emoji}</div><div class="product-info"><h3>${p.name}</h3><div class="product-meta">${p.weight}</div><div class="product-price"><span>$${p.price.toFixed(2)} ${p.old?`<s>$${p.old}</s>`:''}</span><button class="add-btn" data-product="${p.name}" data-price="${p.price}" aria-label="Add ${p.name} to cart">+</button></div></div></article>`).join(''); empty.hidden=!!list.length; bindAdd(); }
function bindAdd(){document.querySelectorAll('.add-btn,.mini-add').forEach(btn=>btn.addEventListener('click',()=>{cart++;localStorage.setItem('frost-cart',cart);document.querySelector('#cart-count').textContent=cart;showToast(`${btn.dataset.product} added to cart`)}));}
function showToast(message){const toast=document.querySelector('#toast');toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2500)}
render();
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render(btn.dataset.filter)}));
document.querySelectorAll('.category-card').forEach(card=>card.addEventListener('click',()=>{const filter=card.dataset.filter;const target=[...document.querySelectorAll('.filter')].find(b=>b.dataset.filter===filter);if(target){target.click()}}));
document.querySelector('.menu-toggle').addEventListener('click',e=>{const nav=document.querySelector('.main-nav');nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',nav.classList.contains('open'))});
document.querySelector('#newsletter-form').addEventListener('submit',e=>{e.preventDefault();document.querySelector('#newsletter-message').textContent='You’re on the list — welcome to the freezer files!';e.target.reset()});
document.querySelector('.cart-btn').addEventListener('click',()=>showToast(cart?`${cart} item${cart>1?'s':''} in your cart`:'Your cart is empty'));
