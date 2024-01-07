const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());

const PORT = 9000;
app.use(cors(
    {   credentials: true,
        origin: "http://localhost:4200"
    }
))

app.use(cookieParser())

const UserRoute = require('./router/user.router');

app.use('/user',UserRoute);
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})
