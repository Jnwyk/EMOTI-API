require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome, everything is working well'})
});

app.use('/questions', require('./routes/questions.routes.js'));
app.use('/games', require('./routes/games.routes.js'));
app.use('/tutors', require('./routes/tutors.routes.js'));
app.use('/psychologists', require('./routes/psychologists.routes.js'));
app.use('/children', require('./routes/children.routes.js'));
app.use('/emotions', require('./routes/emotions.routes'));
app.use('/login', require('./routes/login.routes.js'));

app.get('*', (req, res) =>{
    res.status(404).json({ message: 'Couldn\'t find a page'})
});

app.listen(port, host, () => console.log(`App listening at http://${host}:${port}/`));