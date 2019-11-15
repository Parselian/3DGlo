const container = document.querySelector('.container'),
      list = document.querySelector('ol'),
      listItem = document.querySelector('li'),
      input = document.querySelector('input');
      
const manageToDo = () =>{
  container.addEventListener('click', (e) => {
    let target = e.target,
        cloneListItem = listItem.cloneNode();
  
    cloneListItem.classList.remove('task-done');

    if( target.matches('li') ) {
      target.classList.toggle('task-done');
    } else if( target.matches('button') ) {

      if(!input.value) {
        alert('Введите вашу задачу!');
        return;
      } else {
        cloneListItem.textContent = input.value;
      }

      list.appendChild(cloneListItem);
      input.value = '';
    }
    
  });
};

manageToDo();