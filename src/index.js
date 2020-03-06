const express = require('express');
const cors = require('cors');
const { config } = require('./config/index');
const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const usersApi = require('./routes/users');
const beepersApi = require('./routes/beepers');
const coordinatesApi = require('./routes/coordinates');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
usersApi(app);
beepersApi(app);
coordinatesApi(app);

// 404
app.use(notFoundHandler);

// Errors handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`server running on http://localhost:${config.port}`);
});
