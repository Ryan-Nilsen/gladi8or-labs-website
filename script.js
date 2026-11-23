const contactDialog = document.getElementById('contact-dialog');
const contactButton = document.getElementById('contact-button');
const closeContactButton = document.getElementById('close-contact');
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

if (
  !(contactDialog instanceof HTMLDialogElement) ||
  !(contactButton instanceof HTMLButtonElement) ||
  !(closeContactButton instanceof HTMLButtonElement) ||
  !(contactForm instanceof HTMLFormElement) ||
  !(contactStatus instanceof HTMLParagraphElement)
) {
  throw new Error('Contact form elements are missing from the page.');
}

contactButton.addEventListener('click', () => contactDialog.showModal());
closeContactButton.addEventListener('click', () => contactDialog.close());

contactDialog.addEventListener('click', (event) => {
  if (event.target === contactDialog) {
    contactDialog.close();
  }
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  const formData = new FormData(contactForm);
  const name = String(formData.get('name')).trim();
  const email = String(formData.get('email')).trim();
  const message = String(formData.get('message')).trim();
  const subject = 'Website contact form';
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailtoUrl =
    `mailto:admin@gladi8orlabs.app?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  contactStatus.textContent = 'Opening your email app…';
  window.location.href = mailtoUrl;
});
