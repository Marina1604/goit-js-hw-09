// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const dateInputEl = document.querySelector('#datetime-picker');
const startButtonEl = document.querySelector('[data-start]');
const daysFieldEl = document.querySelector('[data-days]');
const hoursFieldEl = document.querySelector('[data-hours]');
const minutesFieldEl = document.querySelector('[data-minutes]');
const secondsFieldEl = document.querySelector('[data-seconds]');
let selectedDate;
let timerId;

startButtonEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedDate = selectedDates[0];
      if (selectedDate.getTime() > options.defaultDate.getTime()) {
        startButtonEl.disabled = false;
      } else {
        startButtonEl.disabled = true;
        Notiflix.Notify.failure("Please choose a date in the future");
      }
    },
  };

const fp = flatpickr(dateInputEl, options);

const handleOnStartClick = () => {
    timerId = setInterval(() => {
    const currentDate = new Date();
    const ms = selectedDate.getTime() - currentDate.getTime();
    if (selectedDate.getTime() <= currentDate.getTime()) {
        clearInterval(timerId);
        return;
    }
    const timeLeft = convertMs(ms);
    daysFieldEl.textContent = addLeadingZero(timeLeft.days);
    hoursFieldEl.textContent = addLeadingZero(timeLeft.hours); 
    minutesFieldEl.textContent = addLeadingZero(timeLeft.minutes);
    secondsFieldEl.textContent = addLeadingZero(timeLeft.seconds);   
    }, 1000)
    startButtonEl.setAttribute("disabled","");
}

startButtonEl.addEventListener('click', handleOnStartClick);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

//   Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0')
  }