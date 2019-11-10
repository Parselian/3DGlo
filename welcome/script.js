let currDate = new Date(),
    newYearDate = new Date(2020, 0, 1),
    day = currDate.getDay(),
    hours = currDate.getHours(),
    currTime = currDate.toLocaleTimeString('en');
    
function welcome() {
  let elem = document.createElement('div'),
      body = document.querySelector('body');

  if( hours >= 4 && hours < 12 ) {
    hours = 'Доброе утро';
  } else if( hours >= 12 && hours < 18 ) {
    hours = 'Добрый день';
  } else if( hours >= 18 && hours < 23 ) {
    hours = 'Добрый вечер';
  } else if( hours >= 23 && hours <= 24 || hours < 4 ) {
    hours = 'Доброй ночи';
  } else {
    hours = 'Здравствуйте';
  }

  switch(day) {
    case 0:
      day = 'воскресенье';
      break;
    case 1:
      day = 'Понедельник';
      break;
    case 2:
      day = 'Вторник';
      break;
    case 3:
      day = 'среда';
      break;
    case 4:
      day = 'Четверг';
      break;
    case 5:
      day = 'Пятница';
      break;
    case 6:
      day = 'Суббота';
      break;
  }

  let greetings = Math.floor((newYearDate.getTime() - currDate.getTime()) / 1000 /60 /60 /24);

  elem.innerHTML = `
    <div> ${hours} </div> 
    <div> Сегодня: ${day} </div>
    <div> Текущее время: ${currTime} </div>
    <div> До нового года осталось ${greetings} дней </div>
  `;

  body.appendChild(elem);
  console.log(greetings);
}

welcome();
console.log(hours);