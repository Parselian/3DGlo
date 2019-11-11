window.addEventListener('DOMContentLoaded', () => {

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
  const menuBtn = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn'),
        menuItems = menu.querySelectorAll('ul > li > a');

  const toggleMenu = () => {
    if( !menu.style.transform || menu.style.transform === 'translateX(-100%)' ) {
      menu.style.transform = `translateX(0)`;
    } else {
      menu.style.transform = `translateX(-100%)`;
    }
  };

  menuBtn.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click',toggleMenu);
  menuItems.forEach((item) => item.addEventListener('click', toggleMenu));



  // Попап
  const popup = document.querySelector('.popup'),
        popupClose = popup.querySelector('.popup-close'),
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
    }, 30);
    
    
    popup.style.display = 'block';
  };
  
  popupBtn.forEach( (item) => {
    item.addEventListener('click', () => {
      popup.style.opacity = 0;
      animatePopup();
    });
  });

  popupClose.addEventListener('click', () => {
    popup.style.display = 'none';
  });


  
  //якорный скролл
  const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
        animationTime = 400,
        fps = 50;

  anchors.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      let coordY;
      
      if(!item.classList.contains('close-btn')) {
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
});
