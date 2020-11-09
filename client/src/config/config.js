
if (process.env.NODE_ENV === 'development') {
  window.ENV = {
    baseUrl: '',
    serverUrl: 'https://ais-code.ru/'
  }

} else if (process.env.NODE_ENV === 'production') {
  window.ENV = {
    baseUrl: 'water-meter-iot',
    serverUrl: 'https://ais-code.ru/'
  }
}
