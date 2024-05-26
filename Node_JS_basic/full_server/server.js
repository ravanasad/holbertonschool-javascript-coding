const express = require('express');

const app = express();
const PORT = 1245;

const indexRoute = require('./routes/index');

app.use('/', indexRoute);

app.listen(PORT, () => {
  console.log('Server running');
});
export default app;
