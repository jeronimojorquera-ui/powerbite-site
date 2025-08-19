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