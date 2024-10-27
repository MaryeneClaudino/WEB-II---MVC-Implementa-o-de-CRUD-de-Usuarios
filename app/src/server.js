import express from 'express';
import { dir } from './dirroot.js';
import path from 'path';

const app = express();
const pathViews = path.join(dir, '/views');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.set('view engine', 'ejs');
app.set('views', pathViews);

app.get('/healthcheck', (req, res) => {
    res.send('OK');
});

app.get('/', (req, res) => res.redirect('/home'));

app.get('/home', (req, res) => {
    res.render('home');
});

import usersRouter from './routes/users-routes.js';
app.use('/users', usersRouter);

app.listen(3000, () => console.log("Server iniciou na porta 3000"));
