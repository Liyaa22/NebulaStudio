document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(section);
    });

    // Custom animation for sections that are observed
    const style = document.createElement('style');
    style.innerHTML = `
        section.fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;

            btn.innerHTML = 'Enviando <span class="loading-dots">...</span>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '¡Mensaje Enviado!';
                btn.style.background = '#28a745';
                contactForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    // Careers / CV Upload handling
    const cvInput = document.getElementById('cv-upload');
    const cvBtn = document.getElementById('send-cv-btn');

    if (cvBtn && cvInput) {
        cvBtn.addEventListener('click', () => {
            cvInput.click();
        });

        cvInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const fileName = e.target.files[0].name;
                const originalText = cvBtn.textContent;

                cvBtn.innerHTML = `Subiendo: ${fileName.split('\\').pop()}...`;
                cvBtn.disabled = true;

                // Simulate upload process
                setTimeout(() => {
                    cvBtn.innerHTML = '¡Currículum Recibido!';
                    cvBtn.style.borderColor = '#28a745';
                    cvBtn.style.color = '#28a745';

                    setTimeout(() => {
                        cvBtn.textContent = originalText;
                        cvBtn.disabled = false;
                        cvBtn.style.borderColor = '';
                        cvBtn.style.color = '';
                        cvInput.value = ''; // Reset input
                    }, 4000);
                }, 2000);
            }
        });
    }

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 0';
            navbar.style.background = 'rgba(2, 2, 3, 0.85)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.background = 'transparent';
        }
    });
});
