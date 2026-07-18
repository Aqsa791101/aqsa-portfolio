document.addEventListener('DOMContentLoaded', () => {

    // 1. PRELOADER REMOVAL
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 500);
    });

    // Backup safety if loading event fires early
    setTimeout(() => {
        if(preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
    }, 2500);

    // 2. MOBILE NAVIGATION DRAWER
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if(navMenu.classList.contains('active')) {
            icon.classList.replace('fa-bars-staggered', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars-staggered');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars-staggered');
        });
    });

    // 3. HEADER SCROLL & BACK TO TOP VISIBILITY
    const header = document.getElementById('main-header');
    const backToTop = document.getElementById('back-to-top');
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Scroll Progress Bar calculation
        if (totalHeight > 0) {
            const progress = (scrollY / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Header Class Toggle
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top Button visibility
        if (scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. ANIMATE ELEMENTS ON SCROLL (INTERSECTION OBSERVER)
    const scrollElements = document.querySelectorAll('.scroll-trigger');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('animated');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => { 
        handleScrollAnimation();
    });
    // Trigger once on startup to reveal components currently in viewport
    setTimeout(handleScrollAnimation, 600);

    // 5. PROGRESS BARS INJECTION
    const skillSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress-bar');
    let progressAnimated = false;

    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    };

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !progressAnimated) {
                animateProgressBars();
                progressAnimated = true;
            }
        });
    }, { threshold: 0.15 });

    if(skillSection) {
        skillsObserver.observe(skillSection);
    }

    // 6. NUMERIC COUNTER MILESTONES
    const counters = document.querySelectorAll('.counter-number');
    let countersAnimated = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            const speed = target / 50; // Controls speed relation to number size

            const updateCount = () => {
                if (count < target) {
                    count = Math.ceil(count + speed);
                    if(count > target) count = target;
                    counter.innerText = count + (target > 100 ? '+' : '+');
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCount();
        });
    };

    const experienceSection = document.getElementById('experience');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !countersAnimated) {
                startCounters();
                countersAnimated = true;
            }
        });
    }, { threshold: 0.25 });

    if(experienceSection) {
        counterObserver.observe(experienceSection);
    }

    // 7. ACTIVE NAVIGATION MENU ITEM ON SCROLL
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 250)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 8. CONTACT FORM SUBMISSION MOCKUP
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Capture entries (Values ready to map to an active Email Server integration)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple visual simulation of delivery wait
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = 'Sending Message <i class="fa-solid fa-circle-notch fa-spin"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                formFeedback.textContent = `Thank you, ${name}! Your message was successfully sent to Aqsa.`;
                formFeedback.classList.add('success');
                
                // Resetting components
                contactForm.reset();
                submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
                submitBtn.disabled = false;

                // Clear feedback message after delay
                setTimeout(() => {
                    formFeedback.textContent = '';
                    formFeedback.classList.remove('success');
                }, 6000);

            }, 1800);
        });
    }
});