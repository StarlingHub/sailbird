// Responsive navbar toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        if(nav.classList.contains('nav-active')){
            nav.classList.remove('nav-active');
        }
    });
});

// Contact form simple message
const form = document.getElementById('contact-form');
const msg = document.getElementById('form-msg');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    msg.textContent = "Thank you! Your message has been sent.";
    form.reset();
});
