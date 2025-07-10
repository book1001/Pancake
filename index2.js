const panel = document.querySelector('div.panel');
const temp = panel.querySelector('div.temp');
const weather = panel.querySelector('div.weather');
const body = document.querySelector('body');

function selectRandom(array) {
  // Return a random element from the array
  return array[Math.floor(Math.random() * array.length)];
}

const apiUrls = ['https://api.open-meteo.com/v1/forecast?latitude=41.824&longitude=-71.4128&current_weather=true&temperature_unit=fahrenheit', 'https://api.open-meteo.com/v1/forecast?latitude=41.824&longitude=-71.4128&current_weather=true&temperature_unit=fahrenheit', 'https://api.open-meteo.com/v1/forecast?latitude=41.824&longitude=-71.4128&current_weather=true&temperature_unit=fahrenheit'];

const getRandomApiUrl = () => {
  return selectRandom(apiUrls);
};

const codeToWeather = (code) => {
  switch (code) {
    case 0:
      return subject;
    case 1:
      return 'Mainly clear';
    case 2:
      return 'Cloudy';
    case 3:
      return 'Hi';
    default:
      return '?';
  }
};

const codeToClass = (code) => {
  switch (code) {
    case 0:
    case 1:
    case 2:
      return 'clear';
    case 3:
    case 45:
      return 'cloud';
    default:
      return '';
  }
};

const grab = async () => {
  const apiUrl = getRandomApiUrl();

  try {
    const request = await fetch(apiUrl);
    const response = await request.json();

    temp.innerHTML = `${Math.round(response.current_weather.temperature)}ºF`;
    weather.innerHTML = codeToWeather(response.current_weather.weathercode);
    body.classList.add(codeToClass(response.current_weather.weathercode));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

grab();
