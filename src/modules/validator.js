class Validator {
  constructor({selector, pattern = {}, method}) {
    this.form = document.querySelector(selector);
    this.button = this.form.querySelector('.form-btn');
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
    });
    this.error = new Set();
  }

  init() {
    this.button.classList.add('button-error');
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
    this.form.addEventListener('submit', e => {
      this.elementsForm.forEach(elem => this.checkIt({target: elem}));
      if(this.error.size) {
        e.preventDefault();
      }
    });
  }

  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if( elem.value.trim() === '' ) {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };
    if(this.method) {
      const method = this.method[elem.id];

      // console.log(method);
  
      if(method) {
        return method.every(item => {
          // console.log(this.pattern[item[1]]);
          // console.log(validatorMethod[item[0]](elem, this.pattern[item[1]]));
          return validatorMethod[item[0]](elem, this.pattern[item[1]]);
        });
      }
    } else {
      console.warn('необходимо передать id полей ввода и методы проверки этих полей!');
    }  

    return true;
  }

  checkIt(event) {
    const target = event.target;
    let arr = []

    if(this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }

    this.elementsForm.forEach((ite, i) => {
      if(ite.matches('.error') || ite.value === '' || ite.value === null) {
        arr[i] = 0;
      }
      if(!ite.matches('.error') && ite.value !== '' && ite.value !== null) {
        arr[i] = 1;
      }
    });

    if(arr.join('') === '111' || arr.join('') === '1111') {
      this.button.classList.remove('button-error');
      arr = [];
    } else {
      this.button.classList.add('button-error');
      arr = [];
    }
  }

  /* можно записать результаты в массив и если все будут единички, то активировать кнопку, иначе заблокировать */


  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');
    if( elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      return;
    }
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);
  }

  showSuccess(elem) {
    elem.classList.add('success');
    elem.classList.remove('error');

    if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      elem.nextElementSibling.remove();
    } else {
      return;
    }
  }

  applyStyle() {
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        border: 2px solid green !important;
      }
      input.error {
        border: 2px solid red !important;
      }
      .validator-error {
        font-size: 14px;
        color: red;
      }
      .button-error {
        background-color: red;
        opacity: 1;
        cursor: not-allowed;
        pointer-events: none;
      }
      .button-error:hover {
        background-color: red
      }
    `;
    document.head.appendChild(style);
  }

  setPattern() {

    if(!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }

    if(!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }

  }
}

export default Validator;