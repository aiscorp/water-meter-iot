
if (process.env.NODE_ENV === 'development') {
  window.ENV = {
    baseUrl: '',
    serverUrl: 'http://192.168.0.159:5000/'
  }

} else if (process.env.NODE_ENV === 'production') {
  window.ENV = {
    baseUrl: 'water-meter-iot',
    serverUrl: 'https://ais-code.ru/'
  }
}
