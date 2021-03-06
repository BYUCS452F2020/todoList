const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');

const userRoutes = require("./routes/users.js");
const todosRoutes = require("./routes/todos");
const todoStatesRoutes = require("./routes/todoStates");
const cors = require('cors');

const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

// This sets us up to use cookie sessions
app.use(cookieSession({
  name: 'session',
  keys: ['secretValue'],
  cookie: {
    maxAge: 60 * 60 * 1000 // 1 Hour expiration.
  }
}));

app.use(cors({ credentials: true, origin: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the todo-list API!')
});

app.use('/user', userRoutes.routes);
app.use('/todos', todosRoutes.routes);
app.use('/todo-states', todoStatesRoutes.routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
