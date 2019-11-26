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
import Validator from './modules/validator';


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

const valid1 = new Validator({
  selector: '#form1',
  pattern: {
    phone: /^\+380\d{7}$/,
    text: /^[а-яА-Я]{1,}$/
  },
  method: {
    'form1-phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'form1-email': [
      ['notEmpty'],
      ['pattern', 'email']
    ],
    'form1-name': [
      ['notEmpty'],
      ['pattern', 'text']
    ]
  }
});

const valid2 = new Validator({
  selector: '#form2',
  pattern: {
    phone: /^\+380\d{7}$/,
    text: /^[а-яА-Я]{1,}$/
  },
  method: {
    'form2-phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'form2-email': [
      ['notEmpty'],
      ['pattern', 'email']
    ],
    'form2-name': [
      ['notEmpty'],
      ['pattern', 'text']
    ],
    'form2-message': [
      ['notEmpty'],
      ['pattern', 'text']
    ]
  }
});

const valid3 = new Validator({
  selector: '#form3',
  pattern: {
    phone: /^\+380\d{7}$/,
    text: /^[а-яА-Я]{1,}$/
  },
  method: {
    'form3-phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'form3-email': [
      ['notEmpty'],
      ['pattern', 'email']
    ],
    'form3-name': [
      ['notEmpty'],
      ['pattern', 'text']
    ]
  }
});

valid1.init();
valid2.init();
valid3.init();

