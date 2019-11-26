'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);


import timer from './modules/timer';
import toggleMenu from './modules/toggleMenu';
import popupFunc from './modules/popupFunc';
import anchorsScroll from './modules/anchorsScroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import SliderCarousel from './modules/sliderCarousel';
import changePhotos from './modules/changePhotos';
import calcValidation from './modules/calcValidation';
import calculator from './modules/calculator';
import sendForm from './modules/sendForm';
import validationForm from './modules/validationForm';

//таймер
timer('17 november 2019', '#timer-hours', '#timer-minutes', '#timer-seconds');
// Меню
toggleMenu();
// Попап
popupFunc();
//якорный скролл
anchorsScroll();
//переключение табов
tabs();
//слайдер
slider();
//интерактивное изменение фото
changePhotos();
//валидация калькулятора
calcValidation();
//калькулятор
calculator();
//send-ajax-form
sendForm('form1');
sendForm('form2');
sendForm('form3');
//forms-validation
validationForm();

const options = {
  main: '.companies-wrapper',
  wrap: '.companies-hor',
  slidesToShow: 4,
  infinity: true,
  responsive: [{
      breakpoint: 1024,
      slideToShow: 3
  },
  {
      breakpoint: 768,
      slideToShow: 2
  },
  {
      breakpoint: 576,
      slideToShow: 1
  }
  ]
};

const carousel = new SliderCarousel(options);

carousel.init();
