// Add smooth scroll behaviour for internal navigation links.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    // Only intercept if the link targets a section on this page.
    if (id.length > 1) {
      e.preventDefault();
      const target = document.querySelector(id);
      if (target) {
        target.scrollIntoView({ behaviour: 'smooth' });
      }
    }
  });
});

// Populate the current year in any element with class "year". Useful for
// automatically updating the copyright notice.
const yearSpans = document.querySelectorAll('.year');
const currentYear = new Date().getFullYear();
yearSpans.forEach(span => {
  span.textContent = currentYear;
});

// Override WhatsApp link if the user has saved a phone number in localStorage.
// This is purely optional: if you ever need to switch numbers on the fly,
// store a 'pb_phone' value and the script will update the href accordingly.
const storedPhone = localStorage.getItem('pb_phone');
if (storedPhone) {
  const waLinks = document.querySelectorAll('.whatsapp');
  waLinks.forEach(link => {
    link.setAttribute('href', `https://wa.me/${storedPhone}?text=Hola%20PowerBite!%20Quiero%20comprar%20bolsas%20de%20180g%20(%7E30g%20de%20prote%C3%ADna)`);
  });
}

// Gallery lightbox: permite ampliar las imágenes al hacer clic y cerrarlas al volver a hacer clic en la superposición.
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  });
});
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
}

// Toast notification helper.  Creates a toast element and handles
// automatic fade in/out.  Accepts a message string to display.
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  // Allow DOM update before applying show class
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    // Remove from DOM after transition ends
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Intercept WhatsApp buttons and floating button to show a toast
// notification before opening the link.  This improves user
// perception of responsiveness.  If the user has a custom phone
// number stored via localStorage, the href will already be updated
// above.
document.querySelectorAll('.btn.whatsapp, .floating-whatsapp').forEach(btn => {
  btn.addEventListener('click', function (e) {
    // Only intercept left click / tap
    e.preventDefault();
    const url = this.getAttribute('href');
    showToast('Abriendo WhatsApp…');
    setTimeout(() => {
      window.open(url, '_blank');
    }, 800);
  });
  // Record event using GA4/Plausible if available
  btn.addEventListener('click', function () {
    if (window.gtag) {
      gtag('event', 'click_whatsapp', {
        event_category: 'cta',
        event_label: btn.textContent.trim()
      });
    }
    if (window.plausible) {
      plausible('click_whatsapp', { props: { label: btn.textContent.trim() } });
    }
  });
});