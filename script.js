/* =========================
   1. HOME PAGE TYPING EFFECT
========================= */

const typingText = document.getElementById('typing-text');

if (typingText) {
    const roles = [
        'Java Developer',
        'Software Developer',
        'Problem Solver'
    ];

    let role = 0;
    let char = 0;
    let deleting = false;

    function typeRole() {
        const current = roles[role];

        typingText.textContent = current.slice(0, char);

        if (!deleting && char < current.length) {
            char++;
        } else if (deleting && char > 0) {
            char--;
        } else if (!deleting) {
            deleting = true;
            setTimeout(typeRole, 950);
            return;
        } else {
            deleting = false;
            role = (role + 1) % roles.length;
        }

        setTimeout(typeRole, deleting ? 55 : 95);
    }

    typeRole();
}

/* =========================
   2. PROJECT TECHNOLOGY BUTTONS
========================= */

document.querySelectorAll('.tech-btn').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const box = card.querySelector('.tech-description');

        box.textContent = button.dataset.info || button.textContent;
        box.hidden = false;
    });
});

/* =========================
   3. EMAILJS CONTACT FORM
========================= */

const contactForm = document.getElementById('contactForm');

if (contactForm && window.emailjs) {
    emailjs.init({
        publicKey: 'HT1nSTs6qBvhRehpI'
    });

    contactForm.addEventListener('submit', async event => {
        event.preventDefault();

        const status = document.getElementById('contactStatus');
        const button = contactForm.querySelector('button[type="submit"]');

        button.disabled = true;
        status.textContent = 'Sending message…';

        try {
            const name = contactForm.contactName.value.trim();
            const email = contactForm.contactEmail.value.trim();
            const subject = contactForm.contactSubject.value.trim();
            const message = contactForm.contactMessage.value.trim();

            await emailjs.send(
                'service_pp626xh',
                'template_t56u5pp',
                {
                    name: name,
                    email: email,
                    from_name: name,
                    reply_to: email,
                    subject: subject,
                    title: subject,
                    message: message,
                    to_email: 'knivetha822008@gmail.com'
                }
            );

            status.textContent = 'Message sent successfully!';
            contactForm.reset();

        } catch (error) {
            console.error(error);
            status.textContent =
                'Message could not be sent. Please try again.';

        } finally {
            button.disabled = false;
        }
    });
}

/* ===== SCROLL REVEAL EFFECT ===== */

const revealItems = document.querySelectorAll(
    '.section, .card, .about-panel, .list-item, .contact-box, .contact-form'
);

revealItems.forEach(item => {
    item.classList.add('reveal-item');
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealItems.forEach(item => {
    revealObserver.observe(item);
});
