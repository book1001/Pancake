const panel = document.querySelector('div.panel')
const temp = panel.querySelector('div.temp')
const weather = panel.querySelector('div.weather')
const body = document.querySelector('body')

function selectRandom(array) {
  // Return a random element from the array
  return array[Math.floor(Math.random() * array.length)];
}

let subjects = ["kni\r\ght", "mo\r\nk", "k\n\ing"];

let subject = selectRandom(subjects);

const codeToWeather = (code) => {
  switch (code) {
    case 0:
      return subject
    case 1:
      return 'Mainly clear'
    case 2:
      return 'Cloudy'
    case 3:
      return 'Hi'
    default:
      return '?'
  }
}

const codeToClass = (code) => {
  switch (code) {
    case 0:
      return 'clear'
    case 1:
      return 'clear'
    case 2:
      return 'clear'
    case 3:
      return 'cloud'
    case 45:
      return 'cloud'
    default:
      return ''
  }
}

const grab = async () => {
  const request = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=41.824&longitude=-71.4128&current_weather=true&temperature_unit=fahrenheit',
  )

  const response = await request.json()

  temp.innerHTML = `${Math.round(response.current_weather.temperature)}ºF`
  weather.innerHTML = codeToWeather(response.current_weather.weathercode)
  body.classList.add(codeToClass(response.current_weather.weathercode))
}

grab()
