let lastScrollTop = 0;
let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    let width = document.body.clientWidth;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (width < 1001) {
        if (lastScrollTop >= 30) {
            if (scrollTop > lastScrollTop) header.style.top = '-70px';
            else  header.style.top = '0';
        }
    } else {
        if (lastScrollTop >= 60) {
            if (scrollTop > lastScrollTop) header.style.top = '-80px';
            else  header.style.top = '0';
        }
    }
    
    lastScrollTop = scrollTop;
});

// Menu

let menuButton = document.querySelector('.menu');
let menuIcon = menuButton.children[0];
let navHeader = document.querySelector('header');
let unList = document.querySelector('.h-container nav');

menuButton.addEventListener('click', () => {
    let logo = document.querySelector('.h-container a img');
    let expanded = menuButton.getAttribute('aria-expanded') === 'true';
    if (!expanded) {
        logo.src = 'Images/Logo-white-small.png';
        logo.srcset = '';
        menuIcon.src = 'Images/icon_dismiss.png';
        navHeader.style.backgroundColor = '#185CFF';
        unList.style.backgroundColor = '#185CFF';
        unList.style.opacity = '1';
        unList.style.transform = 'scaleY(1)';
        unList.style.transition = 'transform 200ms ease-in';
    } else {
        logo.src = 'Images/logo_blue-small.png';
        logo.srcset = 'Images/logo_blue-small.png 92w, Images/logo_blue-large.png 165w';
        menuIcon.src = 'Images/Menu_button.png';
        navHeader.style.backgroundColor = '#FFF';
        unList.style.backgroundColor = '#FFF';
        unList.style.opacity = '0';
        unList.style.transform = 'scaleY(0)';
    }

    menuButton.setAttribute('aria-expanded', String(!expanded));
});

// Carousel

let track = document.querySelector('.carousel-track');
let slides = [...track.children];

let prevButton = document.querySelector('.previous');
let nextButton = document.querySelector('.next');
let prevButtonIcon = prevButton.children[0];
let nextButtonIcon = nextButton.children[0];

let slidesWidth = slides[0].getBoundingClientRect().width;
slides.forEach((slide, i) => {
    if (i === 0) return;
    else slide.style.left = String((i * slidesWidth) + 32 * i + 'px');
});

let i = 0;

nextButton.addEventListener('click', () => {
    let width = document.body.clientWidth;
    if (width < 670) {
        if (i < slides.length-1) {
            let currentSlide = slides[i];
            let nextSlide = currentSlide.nextElementSibling;
            let distance = nextSlide.style.left;
            track.style.transform = `translateX(-${distance})`;
            i += 1;
            if (i === slides.length-1) {
                nextButtonIcon.style.filter = 'invert(47%) sepia(0%) saturate(9%) hue-rotate(188deg) brightness(107%) contrast(73%)';
            }
        }  else return;
    } else {
        if (i * 2 < slides.length - 3) {
            let currentSlide = slides[i];
            let nextSlide = currentSlide.nextElementSibling;
            let distance = nextSlide.style.left;
            distance = Number(distance.slice(0, -2)) * 2;
            track.style.transform = `translateX(-${distance}px)`;
            i += 1;
            if (i * 2 > slides.length - 3) {
                nextButtonIcon.style.filter = 'invert(47%) sepia(0%) saturate(9%) hue-rotate(188deg) brightness(107%) contrast(73%)';
            }
        } else return;
    }

    prevButtonIcon.style.filter = 'invert(0%) sepia(0%) saturate(7500%) hue-rotate(327deg) brightness(96%) contrast(104%)'
    
});

prevButton.addEventListener('click', () => {
    let width = document.body.clientWidth;
    if (width < 670) {
        if (i === 1) {
            track.style.transform = `translateX(-0px)`;
            i -= 1;
        }
        if (i > 1) {
            let currentSlide = slides[i];
            let prevSlide = currentSlide.previousElementSibling;
            let distance = prevSlide.style.left;
            track.style.transform = `translateX(-${distance})`;
            i -= 1;
        } else {
            prevButtonIcon.style.filter = 'invert(44%) sepia(0%) saturate(656%) hue-rotate(215deg) brightness(89%) contrast(83%)';
        };
    } else {
        if (i >= 1) {
            let currentSlide = slides[i];
            let prevSlide = currentSlide.previousElementSibling;
            let distance = prevSlide.style.left;
            distance = Number(distance.slice(0, -2)) * 2;
            track.style.transform = `translateX(-${distance}px)`;
            i -= 1;
        } else return;
    }
    
    if (i === 0) {
        prevButtonIcon.style.filter = 'invert(44%) sepia(0%) saturate(656%) hue-rotate(215deg) brightness(89%) contrast(83%)';
    } else {
        prevButtonIcon.style.filter = 'invert(0%) sepia(0%) saturate(7500%) hue-rotate(327deg) brightness(96%) contrast(104%)'
    }

    nextButtonIcon.style.filter = 'invert(0%) sepia(1%) saturate(7482%) hue-rotate(60deg) brightness(108%) contrast(97%)';
});

// Secondary nav

let navButtons = document.querySelectorAll('.menu-secondary button');
navButtons.forEach(btn => {
    let width = document.body.clientWidth;
    if (width > 767) {
        btn.setAttribute('aria-expanded', 'true');
    } else {
        btn.setAttribute('aria-expanded', 'false');
    }
    btn.addEventListener('click', () => {
        let state = btn.getAttribute('aria-expanded');
        if(state === 'false') {
            btn.setAttribute('aria-expanded', 'true');
            btn.children[0].src = 'Images/icon_chevron_up.svg';
        } else {
            btn.setAttribute('aria-expanded', 'false');
            btn.children[0].src = 'Images/icon_chevron_down_20.svg';
        }
    })
});

// Copyright

let copy = document.querySelector('.copyright-two');
let today = new Date();
let year = today.getFullYear();

copy.innerHTML = `<p>&copy ${year} Ensome. All rights reserved</p>`