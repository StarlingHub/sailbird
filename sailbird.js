document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                navLinks.classList.remove('active');
                hamburger.classList.remove('open');
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });




    // Animate on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.id === 'features') {
                    // Stagger feature cards
                    const cards = entry.target.querySelectorAll('.feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 200);
                    });
                }
                if (entry.target.id === 'signup') {
                    entry.target.classList.add('visible');
                }
            }
        });

	// entries.forEach(entry => {
        //     if (entry.isIntersecting) {
        //         entry.target.classList.add('visible');
        //         if (entry.target.id === 'features' || entry.target.id === 'products') {
        //             // Stagger cards
        //             const cards = entry.target.querySelectorAll('.feature-card, .product-card');
        //             cards.forEach((card, index) => {
        //                 setTimeout(() => {
        //                     card.classList.add('visible');
        //                 }, index * 200);
        //             });
        //         }
        //         if (entry.target.id === 'signup') {
        //             entry.target.classList.add('visible');
        //         }
        //     }
        // });

    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    observer.observe(document.querySelector('.about-content'));
    observer.observe(document.querySelector('#features'));
    observer.observe(document.querySelector('#signup'));
//     observer.observe(document.querySelector('#products'));

    // Hero text animation
    const animatedText = document.querySelector('.animated-text');
    const animatedText2 = document.querySelector('.animated-text2');
    if (animatedText || animatedText2) {
        const text = animatedText.textContent.trim();
        animatedText.innerHTML = '';
        text.split('').forEach((char, index) => {
		var span;
            	span = document.createElement('span');
            
            

	//     if(index === text.split('').length-1){
	// 	span = document.createElement('sup');
	// 	span.classList = "last";
	//     }

	    span.innerHTML = char === ' ' ? '&nbsp;' : char;
            span.style.transitionDelay = `${index * 0.05}s`;
            animatedText.appendChild(span);
        });

        // Trigger animation after a short delay
        setTimeout(() => {
            animatedText.querySelectorAll('span').forEach(span => span.classList.add('visible'));
            animatedText.querySelectorAll('sup').forEach(span => span.classList.add('visible'));
        }, 500);

	const text2 = animatedText2.textContent.trim();
        animatedText2.innerHTML = '';
        text2.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.innerHTML = char === ' ' ? '&nbsp;' : char;
            span.style.transitionDelay = `${index * 0.05}s`;
            animatedText2.appendChild(span);
        });

        // Trigger animation after a short delay
        setTimeout(() => {
            animatedText2.querySelectorAll('span').forEach(span => span.classList.add('visible'));
        }, 500);

        // Animate paragraph and button
        setTimeout(() => {
		console.log(document.querySelector('.hero .p'))
            document.querySelector('.hero .p').classList.add('visible');
            document.querySelector('.cta-button').classList.add('visible');
        }, 1000);
    }

    // Enhanced parallax for about section
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    }
});