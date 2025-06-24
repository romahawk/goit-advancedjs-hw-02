import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartEvent);
  
let selectedNewDates = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);

    if (selectedDates[0] <= new Date()) {
      iziToast.show({
        position: 'center',
        title: 'Sorry !',
        message: 'Please choose a date in the future',
      });
    } else {
        selectedNewDates = selectedDates[0].getTime();
      refs.startBtn.disabled = false;
      refs.input.disabled = false;
      }
  },
};

flatpickr('input#datetime-picker', options);

function onStartEvent() {
    const timer = setInterval(() => {
        const currentDate = new Date().getTime();
        const eventDate = selectedNewDates - currentDate;
        startPromoTimer(convertMs(eventDate));
      refs.startBtn.disabled = true;
      refs.input.disabled = true;
        
        if (selectedNewDates - currentDate < 1000) {
          clearInterval(timer);
           iziToast.show({
             position: 'center',
             message: 'Event in the End',
           });
          refs.startBtn.disabled = false;
          refs.input.disabled = false;
        }
    }, 1000)
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor(
    (((ms % day) % hour) % minute) / second
  ));

  return { days, hours, minutes, seconds };
}

function startPromoTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
