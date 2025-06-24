import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.js-form'),
  submitBtn: document.querySelector('button'),
  amount: document.querySelector('[name="amount"]'),
  step: document.querySelector('[name="step"]'),
  delay: document.querySelector('[name="delay"]'),
};

refs.submitBtn.addEventListener('click', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
  });
};

function onFormSubmit(event) {
  event.preventDefault();

  let newDelay = +refs.delay.value;
  let amount = +refs.amount.value;
  let step = +refs.step.value;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        iziToast.show({
          position: 'topRight',
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.show({
          position: 'topRight',
          message: `❌ Rejected promise ${position} in ${delay}ms`,
        });
      });
    newDelay += step;
  }
  refs.form.reset();
};
