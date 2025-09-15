// Shop.js

document.addEventListener('DOMContentLoaded', () => {
    const categoryFilter = document.querySelectorAll('#categoryFilter input[type="checkbox"]');
    const brandFilter = document.querySelectorAll('#brandFilter input[type="checkbox"]');
    const priceMinElem = document.getElementById('priceMin');
    const priceMaxElem = document.getElementById('priceMax');
    const priceMinValue = document.getElementById('priceMinValue');
    const priceMaxValue = document.getElementById('priceMaxValue');
    const productsGrid = document.getElementById('productsGrid');

    // Update price labels
    priceMinValue.textContent = priceMinElem.value;
    priceMaxValue.textContent = priceMaxElem.value;

    // Ensure min slider never goes above max slider and vice versa
    priceMinElem.addEventListener('input', () => {
        let min = parseInt(priceMinElem.value, 10);
        let max = parseInt(priceMaxElem.value, 10);
        if (min > max - 20) {
            priceMinElem.value = max - 20;
            min = max - 20;
        }
        priceMinValue.textContent = min;
        filterProducts();
    });

    priceMaxElem.addEventListener('input', () => {
        let min = parseInt(priceMinElem.value, 10);
        let max = parseInt(priceMaxElem.value, 10);
        if (max < min + 20) {
            priceMaxElem.value = min + 20;
            max = min + 20;
        }
        priceMaxValue.textContent = max;
        filterProducts();
    });

    // Add event listeners to checkbox filters
    categoryFilter.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    brandFilter.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    // Filter function
    function filterProducts() {
        let selectedCategories = Array.from(categoryFilter)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        let selectedBrands = Array.from(brandFilter)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        let minPrice = parseInt(priceMinElem.value, 10);
        let maxPrice = parseInt(priceMaxElem.value, 10);

        const products = productsGrid.querySelectorAll('.product-card');

        products.forEach(product => {
            const productCategory = product.getAttribute('data-category');
            const productBrand = product.getAttribute('data-brand');
            const productPrice = parseInt(product.getAttribute('data-price'), 10);

            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(productCategory);
            const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(productBrand);
            const priceMatch = productPrice >= minPrice && productPrice <= maxPrice;

            if (categoryMatch && brandMatch && priceMatch) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Add click listeners to Buy Now buttons
    productsGrid.addEventListener('click', e => {
        if (e.target.classList.contains('buy-btn')) {
            const productCode = e.target.getAttribute('data-product-code') || '';
            alert(`You clicked to buy product: ${productCode}`);
            // Here you can expand with add to cart logic, etc.
        }
    });

    // Initial filter to set products display correctly
    filterProducts();
});  
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
});
const filterToggle = document.getElementById('filterToggle');
const sidebar = document.querySelector('.sidebar');

// فتح/إغلاق عند الضغط على الزر
filterToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  sidebar.classList.toggle('active');
});

// إغلاق عند الضغط خارج الفلتر
document.addEventListener('click', (e) => {
  if (sidebar.classList.contains('active')) {
    if (!sidebar.contains(e.target) && e.target !== filterToggle) {
      sidebar.classList.remove('active');
    }
  }
});

// 🟢 دعم السحب (Swipe) لإغلاق الفلتر
let touchStartX = 0;
let touchEndX = 0;

sidebar.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

sidebar.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;

  // إذا السحب كان من اليسار لليمين وبمسافة كافية (> 70px مثلاً)
  if (touchEndX - touchStartX > 70) {
    sidebar.classList.remove('active');
  }
});
const closeBtn = document.querySelector('.close-filter');
if (closeBtn) {
  closeBtn.addEventListener('click', () => sidebar.classList.remove('active'));
}
