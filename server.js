const express = require('express');
const app = express();
const cors = require('cors');

const userRouter = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use('/api/users', userRouter); 

require('dotenv').config();
const PORT = process.env.PORT || 3000;

require('./database/connect')();

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
})