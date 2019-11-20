'use strict';

window.addEventListener('DOMContentLoaded', () => {

  //таймер
  const timer = (deadline, hour, minute, second) => {
    const timerHours = document.querySelector(hour),
          timerMinutes = document.querySelector(minute),
          timerSeconds = document.querySelector(second);
    
    // while(new Date(deadline).getTime() <= new Date().getTime()) {
    //   deadline = new Date().getTime() + 86400000;
    // }

    const calcTime = () => {
      let currDate = new Date().getTime(),
          endTime = new Date(deadline).getTime(),
          timeRemaining = (endTime - currDate) / 1000,
          hours = Math.floor((timeRemaining / 60) / 60),
          minutes = Math.floor((timeRemaining / 60) % 60), 
          seconds = Math.floor(timeRemaining % 60);
      
      return {seconds, minutes, hours, timeRemaining};
    }

    const updateClock = () => {
      let timer = calcTime();
      
      timerHours.textContent = timer.hours;
      if( timer.hours < 10 ) {
        timerHours.textContent = '0' + timer.hours;
      }

      timerMinutes.textContent = timer.minutes;
      if( timer.minutes < 10 ) {
        timerMinutes.textContent = '0' + timer.minutes;
      } 

      timerSeconds.textContent = timer.seconds;
      if( timer.seconds < 10 ) {
        timerSeconds.textContent = '0' + timer.seconds;
      } 
      
      if( timer.timeRemaining <= 0 ) {
        deadline = new Date().getTime() + 86400000;
        intervalId = setInterval(updateClock(), 1000 );
        
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
      


    }
    
    let intervalId = setInterval(updateClock, 1000);

    intervalId;
  };

  timer('17 november 2019', '#timer-hours', '#timer-minutes', '#timer-seconds');

  // Меню
  const toggleMenu = () => {
    const menu = document.querySelector('menu');

    window.addEventListener('click', (e) => {
      let target = e.target;
          target = target.closest('.menu');

      if(target) {
        if( !menu.style.transform || menu.style.transform === 'translateX(-100%)' ) {
          menu.style.transform = `translateX(0)`;
        } else {
          menu.style.transform = `translateX(-100%)`;
        }
      } if(!target) {
        target = e.target;

        if(target.classList.contains('close-btn') && !target.matches('menu')) {
          menu.style.transform = `translateX(-100%)`;
        } else if(target.matches('a') && !target.matches('menu')) {
          menu.style.transform = `translateX(-100%)`;
        }
        else {
          target = target.closest('menu');

          if(!target) {
            menu.style.transform = `translateX(-100%)`;
          } 
        }
      }
    });
  };

  toggleMenu();

  // Попап
  const popupFunc = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn');

    const animatePopup = () => {
      let intervalId,
          counter = 0;

      intervalId = setInterval(() => {
        console.log('intervalId: ', intervalId);
        popup.style.opacity = counter;
        counter += 0.1;
        if (counter > 1 || screen.width < 768) {
          clearInterval(intervalId);
          popup.style.opacity = 1;
        }
      }, 20);
      
      popup.style.display = 'block';
    };
    
    popupBtn.forEach( (item) => {
      item.addEventListener('click', () => {
        popup.style.opacity = 0;
        animatePopup();
      });
    });

    popup.addEventListener('click', (e) => {
      let target = e.target;
      
      if( target.classList.contains('popup-close')) {
        popup.style.display = 'none'; 
      } else {
        target = target.closest('.popup-content');
    
        if(!target) {
          popup.style.display = 'none'; 
        }
      }
    });
  };

  popupFunc();

  //якорный скролл
  const anchorsScroll = () => {
    const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
          animationTime = 400,
          fps = 50;

    anchors.forEach((item) => {
      
      item.addEventListener('click', (e) => {
        e.preventDefault();
        let coordY;     

        if(item.matches('.close-btn, .portfolio-btn')) {
          return;
        } else {
          coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
        }

        const scrolling = setInterval( () => {
          let scrollBy = coordY / fps;
          if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
            window.scrollBy(0, scrollBy);
          } else {
            window.scrollTo(0, coordY);
            clearInterval(scrolling);
          }
        }, animationTime / fps);
      });
    }); 
  };

  anchorsScroll();

  //переключение табов
  const tabs = () => {

    const serviceHeader = document.querySelector('.service-header'),
          serviceTab = serviceHeader.querySelectorAll('.service-header-tab'),
          tab = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for(let i = 0; i < tab.length; i++) {
        if(index === i) {
          serviceTab[i].classList.add('active');
          tab[i].classList.remove('d-none');
        } else {
          serviceTab[i].classList.remove('active');
          tab[i].classList.add('d-none');
        }
      }
    };

    serviceHeader.addEventListener('click', (e) => {

      let target = e.target;
      target = target.closest('.service-header-tab');

      if(target) {
        serviceTab.forEach( (item, i) => {
          if(item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

  //слайдер
  const slider = () => {
    const portfolioContent = document.querySelector('.portfolio-content'),
          portfolioItem = document.querySelectorAll('.portfolio-item'),
          dotsWrap = document.querySelector('.portfolio-dots');

    let currSlide = 0,
        interval,
        dot = document.createElement('li');
    
    dot.classList.add('dot');

    for( let i = 0; i < portfolioItem.length; i++ ) {
      let clonedDot = dot.cloneNode();
      if( i === 0 ) {
        clonedDot.classList.add('dot-active');
      }
      dotsWrap.appendChild(clonedDot);
    }

    dot = document.querySelectorAll('.dot');

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoplaySlide = () => {
      prevSlide(portfolioItem, currSlide, 'portfolio-item-active');
      prevSlide(dot, currSlide, 'dot-active');
      currSlide++;
      if(currSlide >= portfolioItem.length) {
        currSlide = 0;
      } 
      nextSlide(portfolioItem, currSlide, 'portfolio-item-active');
      nextSlide(dot, currSlide, 'dot-active');
    };

    const startSlide = (time = 3500) => {
      interval = setInterval(autoplaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    portfolioContent.addEventListener('click', (e) => {
      
      e.preventDefault();
      let target = e.target;

      if(!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(portfolioItem, currSlide, 'portfolio-item-active');
      prevSlide(dot, currSlide, 'dot-active');

      if( target.matches('#arrow-left') ) {
        currSlide--;
      } else if( target.matches('#arrow-right') ) {
        currSlide++;
      } else if( target.matches('.dot')) {
        dot.forEach((item, i) => {
          if(target === item) {
            currSlide = i;
          }
        });
      }

      if(currSlide >= portfolioItem.length) {
        currSlide = 0;
      } else if(currSlide < 0 ) {
        currSlide = portfolioItem.length - 1;
      }

      nextSlide(portfolioItem, currSlide, 'portfolio-item-active');
      nextSlide(dot, currSlide, 'dot-active');
    });

    portfolioContent.addEventListener('mouseover', (e) => {
      if(e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
        stopSlide();
      }
    });

    portfolioContent.addEventListener('mouseout', (e) => {
      if(e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(1000);
  };

  slider();
  
  //интерактивное изменение фото
  const changePhotos = () => {
    const commandWrap = document.querySelector('#command');

    const changeDataImg = (target, def) => {
      if(target.attributes.src.value !== target.dataset.img) {
        target.src = target.dataset.img;
        target.dataset.img = def;
      } 
  
      if (target.attributes.src.value === target.dataset.img) {
        target.setAttribute('src', def);
      }
    };
  
    commandWrap.addEventListener('mouseover', (e) => {
      let target = e.target;
  
      if(target.matches('img')) {
        let targetDefaultImg = target.attributes.src.value;
        changeDataImg(target, targetDefaultImg);
      }
    });
  
    commandWrap.addEventListener('mouseout', (e) => {
      let target = e.target;
      
      if(target.matches('img')) {
        let targetDefaultImg = target.attributes.src.value;
        changeDataImg(target, targetDefaultImg);
      }
    });
  };

  changePhotos();
  
  //валидация калькулятора
  const calcValidation = () => { 
    const calcBlock = document.querySelector('.calc-block');

    calcBlock.addEventListener('input', (e) => {
      let target = e.target;

      if( target.matches('input') ) {
        target.value = target.value.replace(/\D/g, '');
      }
    });
  };

  calcValidation();

  //калькулятор
  const calculator = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = calcBlock.querySelector('.calc-type'),
        calcSquare = calcBlock.querySelector('.calc-square'),
        calcCount = calcBlock.querySelector('.calc-count'),
        calcDay = calcBlock.querySelector('.calc-day'),
        totalField = document.getElementById('total');
    let count = +totalField.textContent,
        timerIdAsc,
        timerIdDec,
        totalValue;

    const calc = () => {
      let calcTypeValue = calcType.value,
          calcSquareValue = calcSquare.value,
          calcCountValue = 1,
          calcDayValue = 1;

      totalValue = 0;
          
      if( calcCount.value > 1 ) {
        calcCountValue += ( calcCount.value - 1 ) / 10;
      }

      if( calcDay.value && calcDay.value < 5 ) {
        calcDayValue *= 2;
      } else if( calcDay.value && calcDay.value < 10 ) {
        calcDayValue *= 1.5;
      }

      if( calcTypeValue && calcSquareValue ) {
        totalValue = price * calcTypeValue * calcSquareValue * calcCountValue *  calcDayValue;
        timerIdAsc = setInterval(() => {
          if( count < totalValue && count !== totalValue ) {
            totalField.textContent = count;
            count += 50;
          } else {
            totalField.textContent = count;
            clearInterval(timerIdAsc);
          }
        }, 10);
  
        timerIdDec = setInterval(() => {
          if( count >= totalValue && count !== totalValue ) {
            totalField.textContent = count;
            count -= 50;
          } else {
            totalField.textContent = count;
            clearInterval(timerIdDec);
          }
        }, 10); 
      } else {
        totalValue = 0;
      }

      

      
    };

    calcBlock.addEventListener('input', (e) => {
      const target = e.target;

      clearInterval(timerIdAsc);
      clearInterval(timerIdDec);
      if( target === calcSquare || target === calcType || 
        target === calcCount || target === calcDay ) {
        calc();
      }
    });

    if ( count <= totalValue ) {
      clearInterval(timerIdDec);
      timerIdAsc;
    } else if ( count >= totalValue && count !== totalValue ) {
      clearInterval(timerIdAsc);
      timerIdDec;
    }
  };

  calculator();

  //send-ajax-form
  const sendForm = (selector) => {
    const errorMessage = 'Что-то пошло не так...',
          loadingMessage = 'Загрузка...',
          successMessage = 'Спасибо! Наш менеджер скоро с вами свяжется.',
          form = document.getElementById(selector),
          statusMessage = document.createElement('div');

    statusMessage.textContent = loadingMessage;
    statusMessage.style.cssText = `
      color: #fff;
      font-size: 2rem;
    `;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.appendChild(statusMessage);
      statusMessage.textContent = loadingMessage;
      
      const formData = new FormData(form),
            body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });

      postData(body, 
        () => {
          statusMessage.textContent = successMessage;
          [...form.elements].forEach((item) => {
            if(item.tagName === 'INPUT') {
              item.value = '';
              item.classList.remove('success');
            }
          });
        }, 
        (error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });
    });

    const postData = (body, callback, callbackError) => {
      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange', () => {

        if(request.readyState !== 4) {
          return;
        }

        if(request.status === 200) {
          callback();
        } else {
          callbackError(request.status);
        }
      });

      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/JSON');  

      request.send(JSON.stringify(body));
    }
  };

  sendForm('form1');
  sendForm('form2');
  sendForm('form3');

  //forms-validation
  const validationForm = () => {
    const allInputs = document.querySelectorAll('input');
    
    allInputs.forEach((item) => {
      item.addEventListener('input', () => {
        if( item.classList.contains('calc-item') || item.type === 'button' ) {
          return;
        } else {
          if( item.classList.contains('form-phone') ) {
            item.value = item.value.replace(/[^\d|\+]/, '');
          }

          if( item.name === 'user_name' || item.name === 'user_message') {
            item.value = item.value.replace(/[^а-я|А-Я| ]/, '');
          }
        }
      });
    });
  };

  validationForm();
});
