// product.js
document.addEventListener('DOMContentLoaded', () => {

  const products = {
    product1: {
      title: "Acer Predator X38 37.5\u201D UWQHD+",
      price: 1199,
      oldPrice: 1400,
      image: "image/Acer Predator X38 37.5″ UWQHD+.jpg",
      description: "37.5 UWQHD+ G-SYNC Gaming Monitor"
    },
    product2: {
      title: "ASUS ROG Swift PG259QN 24.5\u201D FHD",
      price: 599,
      oldPrice: 800,
      image: "image/ASUS ROG Swift PG259QN 24.5222.jpg",
      description: "FHD gaming monitor with 360Hz refresh rate for ultra-fast performance.."
    },
    product3: {
      title: "ASUS ROG Strix X670E-F Gaming WiFi (AMD AM5)",
      price: 189,
      oldPrice: 210,
      image: "image/ASUS ROG Strix X670E-F Gaming WiFi (AMD AM5).jpg",
      description: "Motherboard that supports AMD AM5 processors with advanced features."
    },
    product4: {
      title: "Corsair K100 RGB",
      price: 189,
      oldPrice: 210,
      image: "image/Corsair K100 RGB2.jpg",
      description: "Advanced RGB lighting mechanical keyboard."
    },
    product5: {
      title: "G.SKILL Trident Z5 RGB (DDR5-6000، 32GB)",
      price: 249,
      oldPrice: 280,
      image: "image/G.SKILL Trident Z5 RGB (DDR5-6000، 32GB).webp",
      description: "Fast DDR5 RAM with RGB lighting."
    },
    product6: {
      title: "Logitech G915 TKL",
      price: 249,
      oldPrice: 280,
      image: "image/KEYBOARD GAMING MECHANICAL LOGITECH G813 LIGHTSYNC RGB.jpeg",
      description: "High performance slim keyboard."
    },
    product7: {
      title: "MSI MEG Z790 ACE (Intel LGA1700)",
      price: 249,
      oldPrice: 280,
      image: "image/MSI MEG Z790 ACE (Intel LGA1700.webp",
      description: "Powerful motherboard for Intel LGA1700 processors."
    },
    product8: {
      title: "Razer DeathAdder V3 Pro",
      price: 249,
      oldPrice: 280,
      image: "image/Razer DeathAdder V3 Pro.jpg",
      description: "Lightweight, high-precision wireless gaming mouse."
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const container = document.getElementById('productDetail');

  function renderNotFound() {
    container.innerHTML = `
      <div class="product-detail-container" style="justify-items:center; text-align:center;">
        <h2>Product not found</h2>
        <p>المنتج الذي طلبته غير متوفر أو الرابط غير صحيح.</p>
        <a class="buy-btn" href="shop.html">Back to Shop</a>
      </div>
    `;
  }

  function renderProduct(id) {
    const p = products[id];
    if (!p) return renderNotFound();

    container.innerHTML = `
      <div class="product-detail-container" role="region" aria-labelledby="productTitle">
        <div class="product-detail-image">
          <img src="${p.image}" alt="${escapeHtml(p.title)}" />
        </div>
        <div class="product-detail-info">
          <h2 id="productTitle">${escapeHtml(p.title)}</h2>
          <p class="product-description">${escapeHtml(p.description)}</p>
          <div class="product-price">
            <span class="price-new">$${formatNumber(p.price)}</span>
            <span class="price-old">$${formatNumber(p.oldPrice || p.price)}</span>
          </div>
         
          <div style="margin-top:1rem;">
            <button id="orderNowBtn" class="buy-btn">Order Now</button>
            <a href="shop.html" class="buy-btn" style="background:linear-gradient(160deg,#666,#444);margin-left:0.1rem;">Back to Shop</a>
          </div>
        </div>
      </div>
    `;

    const orderNowBtn = document.getElementById('orderNowBtn');
    if (orderNowBtn) orderNowBtn.addEventListener('click', () => openModal(id, p));
  }

  const modal = document.getElementById('orderModal');
  const modalBody = document.getElementById('modalBody');
  let originalModalBodyHTML = modalBody.innerHTML;

  function openModal(id, product) {
    const pid = modal.querySelector('#productIdInput');
    if (pid) pid.value = id;
    const q = modal.querySelector('#quantity');
    if (q) q.value = 1;

    // فرض إعادة رسم قبل الإظهار (لمنع بقاءه بعد الفتح)
    modal.style.visibility = 'hidden';
    modal.style.display = 'flex';
    modal.offsetHeight;
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    modal.setAttribute('aria-hidden', 'false');

    attachFormHandler(product);
    attachCloseHandlers(); // تأكد من إعادة ربط أزرار الإغلاق
  }

  function closeModal() {
    modal.style.opacity = '0';
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      modal.style.display = 'none';
      modalBody.innerHTML = originalModalBodyHTML;
      attachCloseHandlers(); // ربط أحداث الإغلاق من جديد بعد استرجاع المحتوى
    }, 200);
  }

  function attachCloseHandlers() {
    const closeX = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelOrderBtn');
    if (closeX) {
      closeX.onclick = closeModal;
    }
    if (cancelBtn) {
      cancelBtn.onclick = closeModal;
    }
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function attachFormHandler(product) {
    const form = modalBody.querySelector('#orderForm');
    if (!form) return;

    const pidField = form.querySelector('#productIdInput');
    if (pidField) pidField.value = (product ? getKeyByValue(product) : '');

    function handleSubmit(e) {
      e.preventDefault();

      const data = {
        orderId: 'ORD-' + Date.now(),
        productId: form.querySelector('#productIdInput')?.value || productId || '',
        productTitle: (product && product.title) ? product.title : '',
        quantity: parseInt(form.querySelector('#quantity')?.value || 1, 10),
        fullName: form.querySelector('#fullName')?.value.trim(),
        email: form.querySelector('#email')?.value.trim(),
        phone: form.querySelector('#phone')?.value.trim(),
        address: form.querySelector('#address')?.value.trim(),
        date: new Date().toISOString()
      };

      if (!data.fullName || !data.email || !data.phone || !data.address) {
        alert('Please fill all required fields.');
        return;
      }

      try {
        const existing = JSON.parse(localStorage.getItem('orders') || '[]');
        existing.push(data);
        localStorage.setItem('orders', JSON.stringify(existing));
      } catch (err) {
        console.warn('Could not save order to localStorage', err);
      }

      modalBody.innerHTML = `
        <div class="order-success">
          <h3>Order placed ✅</h3>
          <p>Thank you, <strong>${escapeHtml(data.fullName)}</strong>!<br>
             Your order <strong>${data.orderId}</strong> for 
             <strong>${escapeHtml(data.productTitle)}</strong> (x${data.quantity}) has been received.</p>
          <p>We will contact you at <strong>${escapeHtml(data.phone)}</strong>.</p>
          <button class="close-success" id="closeSuccessBtn">Close</button>
        </div>
      `;

      modalBody.querySelector('#closeSuccessBtn').addEventListener('click', closeModal);
    }

    form.onsubmit = handleSubmit;
  }

  function formatNumber(n) {
    return Number(n).toLocaleString();
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getKeyByValue(value) {
    for (const k in products) {
      if (products[k] === value) return k;
    }
    return null;
  }

  if (!productId) renderNotFound(); else renderProduct(productId);
});

// زر الهامبرغر
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('open');
});
