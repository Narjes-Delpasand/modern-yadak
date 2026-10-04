let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = cart.length;
  }
}

function addToCart(name, price) {
  cart.push({ name: name, price: price });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function renderCartPage() {
  const container = document.getElementById('cart-items');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<p class="cart-empty">سبد خرید شما خالیه</p>';
  } else {
    container.innerHTML = cart.map(function (item, index) {
      return `
        <div class="cart-row">
          <span class="cart-row-name">${item.name}</span>
          <span class="cart-row-price">${Number(item.price).toLocaleString()} تومان</span>
          <button class="cart-remove" data-index="${index}">حذف</button>
        </div>
      `;
    }).join('');
  }

  const total = cart.reduce(function (sum, item) {
    return sum + Number(item.price);
  }, 0);
  document.getElementById('cart-total').textContent = total.toLocaleString();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCartPage();
}

fetch('header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-placeholder').innerHTML = data;
    updateCartCount();
    renderCartPage();
  });

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-small')) {
    const name = event.target.dataset.name;
    const price = event.target.dataset.price;
    addToCart(name, price);
  }

  if (event.target.classList.contains('cart-remove')) {
    const index = event.target.dataset.index;
    removeFromCart(index);
  }

  if (event.target.id === 'checkout-btn') {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartPage();
    alert('سفارش شما با موفقیت ثبت شد! به‌زودی با شما تماس می‌گیریم.');
  }
});