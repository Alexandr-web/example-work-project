import { Valval } from 'valval';

const validationForm = () => {
  const options = {
    firstName: {
      required: true,
      name: true,
      minLength: 3,
      maxLength: 16,
      onlyRu: true,
      bigFirstSymbol: true
    },
    lastName: {
      required: true,
      name: true,
      minLength: 3,
      maxLength: 16,
      onlyRu: true,
      bigFirstSymbol: true
    },
    password: {
      required: true,
      password: true,
      minLength: 6
    },
    repeatPassword: {
      required: true,
      repeatPassword: true,
      repeatAt: 'password'
    },
    email: {
      required: true,
      mail: true
    }
  }

  for (let item in options) {
    const el = document.querySelector(`.form__input[data-valval="${item}"] + .form__svg > .form__svg-line`);

    options[item].handlerWhenValidElement = function() {
      el.classList.add('anim-valid-line');
    }
    options[item].handlerWhenInvalidElement = function() {
      el.classList.remove('anim-valid-line');
    }
  }

  new Valval().start(options);

  const focusInput = () => {
    const form = document.querySelector('.form');
    const inputs = [...form.elements].filter(el => el.nodeName === 'INPUT' && el.classList.contains('form__input'));
    const titleInputs = document.querySelectorAll('.form__label-title');

    inputs.forEach((input, index) => {
      input.addEventListener('focus', () => {
        checkContentInInput(input, index);

        titleInputs[index].classList.add('top-title');
      });

      input.addEventListener('blur', () => {
        checkContentInInput(input, index);
      });

      function checkContentInInput(el, num) {
        if (el.value.length) {
          titleInputs[num].classList.add('top-title');
        } else {
          titleInputs[num].classList.remove('top-title');
        }
      }
    });
  }

  focusInput();
}

validationForm();