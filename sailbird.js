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
            const target = document.querySelector(this.getAttribute('href').replace("#", "."));
	    console.log(target)
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





    setTimeout(() => {
	    const text = "Stay Cool & Safe. Activate Anytime, Anywhere. No Ice Packs.";
	    const words = text.split(".");
	    const container = document.getElementById("textContainer");
	    const cursor = document.getElementById("cursor");

	    let totalWidth = 0;

	    words.forEach((word, index) => {

	    if(index === words.length - 1) return
	    const span = document.createElement("span");
	    span.className = "word";
	    span.textContent = word + ".";
	    span.style.animationDelay = `${index * 0.5}s`;
	    container.appendChild(span);

	    // Calculate width for cursor positioning
	    const tempSpan = document.createElement("span");
	    tempSpan.style.visibility = "hidden";
	    tempSpan.style.display = "inline-block";
	    tempSpan.style.fontSize = "2.5em";
	    tempSpan.textContent = word;
	    container.appendChild(tempSpan);
	    totalWidth += tempSpan.offsetWidth + 20; // Add margin
	    tempSpan.remove();

	    // Show cursor before each word
	    setTimeout(() => {
		    cursor.style.display = "block";
		    cursor.style.left = `${totalWidth - 10}px`; // Adjust cursor position
	    }, index * 500);

	    // Hide cursor after last word
	    if (index === words.length - 1) {
		    setTimeout(() => {
		    cursor.style.display = "none";
		    }, (index + 1) * 500);
	    }
	    });
    }, 1000);


const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach(carousel => {
    const images = carousel.querySelectorAll("img");
    let currentIndex = 0;

    function showNextImage() {
	images[currentIndex].classList.remove("active");
	images[currentIndex].classList.add("prev");

	currentIndex = (currentIndex + 1) % images.length;

	images[currentIndex].classList.remove("prev");
	images[currentIndex].classList.add("active");
    }

    // Auto-slide every 3 seconds for each carousel
    setInterval(showNextImage, 3000);
});


// Reveal animation on scroll with staggered delay
    const cards = document.querySelectorAll('.feature-card');

    const observer1 = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('show');
          }, index * 200); // stagger delay
          observer1.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => {
      observer1.observe(card);
    });




    // Intersection Observer for reveal animations
    const observer3 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.card, .whatsapp-btn').forEach(el => observer3.observe(el));




const backToTopBtn = document.getElementById("backToTop");

// Show button when user scrolls down 100px
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

// Scroll to top smoothly when clicked
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
});