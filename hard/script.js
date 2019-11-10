'use strict';

const wrap = document.querySelector('.wrap'),
      ball = document.querySelector('.ball'),
      btnWrap = document.querySelector('.btn-wrap');

let counter = 0,
    requestId,
    enabled = false;

function ballAnimate() {
  ball.style.cssText = `
    left: ${counter}px;
    transform: rotate(${counter}deg);
  `;
  
  counter += 2.5;
  if(counter <= 450) {
    requestId = requestAnimationFrame(ballAnimate);
  } else if(counter > 450) {
    cancelAnimationFrame(requestId);
    counter = 0;
  }
}

btnWrap.addEventListener('click', (e) => {
  e = e.target;

  if(e.classList.contains('start')) {
    requestId = requestAnimationFrame(ballAnimate);
    enabled = true;
  } else if(e.classList.contains('stop')) {
    cancelAnimationFrame(requestId);
    enabled = false;
  } else if(e.classList.contains('reset')) {
    cancelAnimationFrame(requestId);
    ball.style.cssText = `
    left: 0;
    transform: rotate(0);
    `;
    enabled = false;
    counter = 0;
  }
});



/* 
function ballAnimate({timing, duration, draw}) {
  let start = performance.now();

  requestId = requestAnimationFrame(function ballAnimate(time) {
    let timeFraction = (time - start) / duration;

    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    draw(progress);

    if(timeFraction < 1) {
      requestAnimationFrame(ballAnimate);
    }
  });
}

ballAnimate({
  duration: 2000,
  timing(timeFraction) {
    return timeFraction;
  },
  draw(progress) {
    let computedStyle = getComputedStyle(ball);
    ball.style.left = progress * 450 + 'px';
  } 
*/