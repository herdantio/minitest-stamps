const https = require('http');
const url = 'http://api.openweathermap.org/data/2.5/forecast?q=Jakarta,id&units=metric&APPID=02239ff33bdeb947deae7e4f5263ddad'

function getDateFormat(key) {
  const currDate = new Date(key)
  const dateString = currDate.toDateString()
  return `${dateString.split(' ')[0]}, ${currDate.getDate()} ${dateString.split(' ')[1]} ${currDate.getFullYear()}`
}

function getTempFormat(arr) {
  return (arr.reduce((total, next) => total + next.temp, 0) / arr.length).toFixed(2)
}
https.get(url, res => {
  let data = [];

  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    const date = new Date()
    date.setDate(date.getDate()+1)
    const tommorow = new Date(date.toLocaleDateString())

    const weatherData = JSON.parse(Buffer.concat(data).toString());

    const mappedData = weatherData.list.filter(step=>{
      return new Date(step.dt_txt.split(' ')[0]) >= tommorow
    }).map(step => ({
      temp: step.main.temp,
      dt_txt: step.dt_txt.split(' ')[0]
    })).reduce((r, a) => {
      r[a.dt_txt] = [...r[a.dt_txt] || [], a];
      return r;
     }, {});

    console.log('Weather Forecast:')
    for (const key in mappedData) {
      console.log(`${getDateFormat(key)}: ${getTempFormat(mappedData[key])} °C`)
    }

  });
}).on('error', err => {
  console.log('Error: ', err.message);
});

