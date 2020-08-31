const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const path = require('path'); // path to connect style sheet

// to use Handlebars.js
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // connects stylesheets folder

// to use Handlebars.js
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => { // sequelize taking the models and connecting them to associated database tables
  app.listen(PORT, () => console.log('Now listening'));
});
// if force was set to true it would drop and re-create all the database tables on startup
// force true will make tables re-create in there are any association changes