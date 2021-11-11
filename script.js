'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const feat = document.querySelectorAll('.nav__link')[0];
const oper = document.querySelectorAll('.nav__link')[1];
const test = document.querySelectorAll('.nav__link')[2];
const learn_more = document.querySelector('.btn--text');
const sectionAll = document.querySelectorAll('.section');
const footer = document.querySelector('.footer');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const section1_imgs = sectionAll[0].querySelectorAll('img');
const slidesAll = document.querySelectorAll('.slider .slide');
const btn = document.querySelectorAll('.slider__btn');
const slider = document.querySelectorAll('.slider');
const dot = document.querySelector('.dots');
// console.log(slidesAll);
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach((btn) => btn.addEventListener('click',openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth scrolling using event delegation

document.querySelector('.nav__links').addEventListener('click',function(e)
{
  e.preventDefault();
  // console.log(e.target);
  if(e.target.classList.contains('nav__link'))
  {
    // console.log(1)
    let obj = e.target;
    let attr = obj.getAttribute('href');
    // console.log(attr);
    document.querySelector(attr).scrollIntoView({behavior:"smooth"});
  }
});

learn_more.addEventListener('click',(e)=>{
  e.preventDefault();
  window.scrollTo({
    top: document.getElementById('section--1').offsetTop,
    left: 0,behavior:'smooth'},);
});


document.querySelector('.operations__tab-container').addEventListener('click',function(e)
{
  e.preventDefault();
  if(e.target.classList.contains('operations__tab'))
  {
    document.querySelectorAll('.operations__tab').forEach((obj)=>obj.classList.remove('operations__tab--active'));
    e.target.classList.add('operations__tab--active');
    document.querySelectorAll('.operations__content').forEach((obj)=>obj.classList.remove('operations__content--active'));
    let sr_no = e.target.getAttribute('data-tab');
    // console.log(document.querySelector(`.operations__content--${sr_no}`));
    document.querySelector(`.operations__content--${sr_no}`).classList.add('operations__content--active');
  }
});

// navBar opacity

const eventHandler = function(e)
{
 // console.log(this);
  if(e.target.classList.contains('nav__link'))
  {
    let link = e.target;
    let num = this;
    let siblings = link.closest('nav').querySelectorAll('.nav__link');
    let logo = link.closest('nav').querySelector('img');
    siblings.forEach(function(obj)
    {
      if(link !== obj)
      {
        //here this keyword will not refer to bind's this keyword
        obj.style.opacity = num;
      }
    });
    logo.style.opacity = num;
  }
}
nav.addEventListener('mouseover',eventHandler.bind(0.5));
nav.addEventListener('mouseout',eventHandler.bind(1));

// sticky navBar using intersection observer API
const navHght = nav.getBoundingClientRect().height;
console.log(navHght);
const options = 
{
  root: null, //iske reference mei target ki visibility dekhengay, 
  //agar root null hai iska matlab root viewport hai aur iske refernce mei hum dekhengay target element ko 
  threshold: 0,  //target ki visibility
  rootMargin: `-${navHght}px`, 
};
//const callback = function(entries,observer) entries are array of thresholds
// whenever this threshold value will be met the function will be called, in this case when either scrolling up or down 
// whenever the visibility increases above 10% while scrolling down or decreases below 10% while scrolling up 
//the function is shot.
const callback = function(entries)
{
  entries.forEach(entry=>
  {
    if(!entry.isIntersecting)
    {
      nav.classList.add('sticky');
    }
    else{
      nav.classList.remove('sticky');      
    }
  });
}
let observer = new IntersectionObserver(callback, options);
observer.observe(header);


//////// upsliding appearance of sections using IntersectionObserverAPI

let callback__1 = function(entries,observ)
{
    // console.log(entry.target);
    entries.forEach(entry=>
    {
      console.log(entry.isIntersecting);
      if(!entry.isIntersecting) return;
      if(entry.isIntersecting){
        entry.target.classList.remove('section--hidden');
        // entry.target.classList.add('slide');
      }
      //because this function keeps on getting called every time screen is scrolled that's why we 
      //unobserve the observer
      observ.unobserve(entry.target);
    });
}
let newOptions = {
  root: null,
  threshold: 0.2
}
observer = new IntersectionObserver(callback__1,newOptions);
sectionAll.forEach(function(section)
{
  section.classList.add('section--hidden');
  observer.observe(section);
});

//Lazy-loading images using IntersectionObserverAPI
const callback__2 = function(entries,observer)
{
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  if(entry.isIntersecting)
  {
    entry.target.classList.remove('lazy-img');
    entry.target.removeAttribute('data-src');
  }
  observer.unobserve(entry.target);
};
const newOptions_1 = {
  root: null,
  threshold: 1
};
observer = new IntersectionObserver(callback__2,newOptions_1);
section1_imgs.forEach(function(img)
{
  observer.observe(img);
});

/////// sliding div components
let slidesA = [...slidesAll]
let traVal = 0;
let currSlide = 0;
slidesAll.forEach(function(obj)
{
  obj.style.transform = `translateX(${traVal}%)`;
  traVal = traVal + 100;
});
const goToSlide = function(currSlide)
{
  document.querySelectorAll('.dots .dots__dot').forEach(obj=>obj.classList.remove('dots__dot--active'));
  document.querySelectorAll('.dots__dot')[currSlide].classList.add('dots__dot--active');
  slidesAll.forEach(function(obj,i){
    obj.style.transform = `translateX(${(i-currSlide)*100}%)`;
 });
}

const prevSlide = function(slideNo,i=1)
{
  if(slideNo===0)
    currSlide = slidesA.length-1;
  else
    currSlide = slideNo-i;
    goToSlide(currSlide);
}
const nextSlide = function(slideNo,i=1)
{
  if(slideNo===slidesA.length-1)
    currSlide = 0;
  else
    currSlide = slideNo+i;
  goToSlide(currSlide);
}
const callBackSlide = function(e)
{
  let index = this;
  switch(index)
  {
    case 0:
         prevSlide(currSlide);
         break;
         //here I didn't put break earlier so the control of the program automatically went to the case 1.
    case 1:    
         nextSlide(currSlide);
         break;
  }
}
btn.forEach(function(obj,i)
{
  obj.addEventListener('click',callBackSlide.bind(i));
});
document.addEventListener('keydown',function(e)
{
  if(e.key=='ArrowRight')
    callBackSlide.call(1);
  else if(e.key=='ArrowLeft')
    callBackSlide.call(0);
});

//// dots buttons 
function createDotElement(i)
{
  let div;
  div = document.createElement('button');
  div.className = 'dots__dot';
  div.setAttribute('data-slide',`${i+1}`)
  if(i==0)
  div.classList.add('dots__dot--active');
  div.addEventListener('click',function()
  {
    // document.querySelectorAll('.dots .dots__dot').forEach(obj=>obj.classList.remove('dots__dot--active'));
    //this.classList.add('dots__dot--active');
    console.log(currSlide);
    // if(currSlide > this.getAttribute('data-slide')-1)
    //   prevSlide(currSlide,this.getAttribute('data-slide')-1);
    // else if(currSlide < this.getAttribute('data-slide')-1)
    //   nextSlide(currSlide,this.getAttribute('data-slide')-1);
    currSlide = this.getAttribute('data-slide')-1;
    goToSlide(currSlide);       
  });
  return div;
}
for(let i=0; i<3; i++)
{
  dot.append(createDotElement(i));
}
// window.addEventListener('beforeunload',function(e)
// {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// })