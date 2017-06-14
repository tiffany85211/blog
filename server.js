const express = require('express');
const api = require('./api');

const app = express();

app.use(express.static(`${__dirname}/build/`));
app.use('/api', api);

app.set('port', (process.env.PORT || 3001));
app.listen(app.get('port'), () => {
  console.log(`Server is running on ${app.get('port')}`);
});
