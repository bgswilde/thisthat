const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
const expresshb = require('express-handlebars');
const loop = require('./utils/loop')
const hbs = expresshb.create({ loop });
const path = require('path');

const sequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();
const s = {
    secret: process.env.DB_Secret,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(s));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening to PORT ${PORT}`))
});