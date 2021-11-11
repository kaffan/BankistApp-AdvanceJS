'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var modal = document.querySelector('.modal');
var overlay = document.querySelector('.overlay');
var btnCloseModal = document.querySelector('.btn--close-modal');
var btnsOpenModal = document.querySelectorAll('.btn--show-modal');
var feat = document.querySelectorAll('.nav__link')[0];
var oper = document.querySelectorAll('.nav__link')[1];
var test = document.querySelectorAll('.nav__link')[2];
var learn_more = document.querySelector('.btn--text');
var sectionAll = document.querySelectorAll('.section');
var footer = document.querySelector('.footer');
var nav = document.querySelector('.nav');
var header = document.querySelector('.header');
var section1_imgs = sectionAll[0].querySelectorAll('img');
var slidesAll = document.querySelectorAll('.slider .slide');
var btn = document.querySelectorAll('.slider__btn');
var slider = document.querySelectorAll('.slider');
var dot = document.querySelector('.dots'); // console.log(slidesAll);
///////////////////////////////////////
// Modal window

var openModal = function openModal(e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

var closeModal = function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}; // for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);


btnsOpenModal.forEach(function (btn) {
  return btn.addEventListener('click', openModal);
});
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
}); // Smooth scrolling using event delegation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault(); // console.log(e.target);

  if (e.target.classList.contains('nav__link')) {
    // console.log(1)
    var obj = e.target;
    var attr = obj.getAttribute('href'); // console.log(attr);

    document.querySelector(attr).scrollIntoView({
      behavior: "smooth"
    });
  }
});
learn_more.addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({
    top: document.getElementById('section--1').offsetTop,
    left: 0,
    behavior: 'smooth'
  });
});
document.querySelector('.operations__tab-container').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('operations__tab')) {
    document.querySelectorAll('.operations__tab').forEach(function (obj) {
      return obj.classList.remove('operations__tab--active');
    });
    e.target.classList.add('operations__tab--active');
    document.querySelectorAll('.operations__content').forEach(function (obj) {
      return obj.classList.remove('operations__content--active');
    });
    var sr_no = e.target.getAttribute('data-tab'); // console.log(document.querySelector(`.operations__content--${sr_no}`));

    document.querySelector(".operations__content--".concat(sr_no)).classList.add('operations__content--active');
  }
}); // navBar opacity

var eventHandler = function eventHandler(e) {
  // console.log(this);
  if (e.target.classList.contains('nav__link')) {
    var link = e.target;
    var num = this;
    var siblings = link.closest('nav').querySelectorAll('.nav__link');
    var logo = link.closest('nav').querySelector('img');
    siblings.forEach(function (obj) {
      if (link !== obj) {
        //here this keyword will not refer to bind's this keyword
        obj.style.opacity = num;
      }
    });
    logo.style.opacity = num;
  }
};

nav.addEventListener('mouseover', eventHandler.bind(0.5));
nav.addEventListener('mouseout', eventHandler.bind(1)); // sticky navBar using intersection observer API

var navHght = nav.getBoundingClientRect().height;
console.log(navHght);
var options = {
  root: null,
  //iske reference mei target ki visibility dekhengay, 
  //agar root null hai iska matlab root viewport hai aur iske refernce mei hum dekhengay target element ko 
  threshold: 0,
  //target ki visibility
  rootMargin: "-".concat(navHght, "px")
}; //const callback = function(entries,observer) entries are array of thresholds
// whenever this threshold value will be met the function will be called, in this case when either scrolling up or down 
// whenever the visibility increases above 10% while scrolling down or decreases below 10% while scrolling up 
//the function is shot.

var callback = function callback(entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  });
};

var observer = new IntersectionObserver(callback, options);
observer.observe(header); //////// upsliding appearance of sections using IntersectionObserverAPI

var callback__1 = function callback__1(entries, observ) {
  // console.log(entry.target);
  entries.forEach(function (entry) {
    console.log(entry.isIntersecting);
    if (!entry.isIntersecting) return;

    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden'); // entry.target.classList.add('slide');
    } //because this function keeps on getting called every time screen is scrolled that's why we 
    //unobserve the observer


    observ.unobserve(entry.target);
  });
};

var newOptions = {
  root: null,
  threshold: 0.2
};
observer = new IntersectionObserver(callback__1, newOptions);
sectionAll.forEach(function (section) {
  section.classList.add('section--hidden');
  observer.observe(section);
}); //Lazy-loading images using IntersectionObserverAPI

var callback__2 = function callback__2(entries, observer) {
  var _entries = _slicedToArray(entries, 1),
      entry = _entries[0];

  if (!entry.isIntersecting) return;

  if (entry.isIntersecting) {
    entry.target.classList.remove('lazy-img');
    entry.target.removeAttribute('data-src');
  }

  observer.unobserve(entry.target);
};

var newOptions_1 = {
  root: null,
  threshold: 1
};
observer = new IntersectionObserver(callback__2, newOptions_1);
section1_imgs.forEach(function (img) {
  observer.observe(img);
}); /////// sliding div components

var slidesA = _toConsumableArray(slidesAll);

var traVal = 0;
var currSlide = 0;
slidesAll.forEach(function (obj) {
  obj.style.transform = "translateX(".concat(traVal, "%)");
  traVal = traVal + 100;
});

var goToSlide = function goToSlide(currSlide) {
  document.querySelectorAll('.dots .dots__dot').forEach(function (obj) {
    return obj.classList.remove('dots__dot--active');
  });
  document.querySelectorAll('.dots__dot')[currSlide].classList.add('dots__dot--active');
  slidesAll.forEach(function (obj, i) {
    obj.style.transform = "translateX(".concat((i - currSlide) * 100, "%)");
  });
};

var prevSlide = function prevSlide(slideNo) {
  var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  if (slideNo === 0) currSlide = slidesA.length - 1;else currSlide = slideNo - i;
  goToSlide(currSlide);
};

var nextSlide = function nextSlide(slideNo) {
  var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  if (slideNo === slidesA.length - 1) currSlide = 0;else currSlide = slideNo + i;
  goToSlide(currSlide);
};

var callBackSlide = function callBackSlide(e) {
  var index = this;

  switch (index) {
    case 0:
      prevSlide(currSlide);
      break;
    //here I didn't put break earlier so the control of the program automatically went to the case 1.

    case 1:
      nextSlide(currSlide);
      break;
  }
};

btn.forEach(function (obj, i) {
  obj.addEventListener('click', callBackSlide.bind(i));
});
document.addEventListener('keydown', function (e) {
  if (e.key == 'ArrowRight') callBackSlide.call(1);else if (e.key == 'ArrowLeft') callBackSlide.call(0);
}); //// dots buttons 

function createDotElement(i) {
  var div;
  div = document.createElement('button');
  div.className = 'dots__dot';
  div.setAttribute('data-slide', "".concat(i + 1));
  if (i == 0) div.classList.add('dots__dot--active');
  div.addEventListener('click', function () {
    // document.querySelectorAll('.dots .dots__dot').forEach(obj=>obj.classList.remove('dots__dot--active'));
    //this.classList.add('dots__dot--active');
    console.log(currSlide); // if(currSlide > this.getAttribute('data-slide')-1)
    //   prevSlide(currSlide,this.getAttribute('data-slide')-1);
    // else if(currSlide < this.getAttribute('data-slide')-1)
    //   nextSlide(currSlide,this.getAttribute('data-slide')-1);

    currSlide = this.getAttribute('data-slide') - 1;
    goToSlide(currSlide);
  });
  return div;
}

for (var i = 0; i < 3; i++) {
  dot.append(createDotElement(i));
} // window.addEventListener('beforeunload',function(e)
// {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// })