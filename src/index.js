const express = require('express');

const app = express();

const { config } = require('./config/index');
const usersApi = require('./routes/users');

usersApi(app);

app.listen(config.port, () => {
  console.log(`server running on http://localhost:${config.port}`);
});
