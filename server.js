require('./database/db');
const express = require('express');
const app = express();
const UserRouter = require('./routes/userRouter');
const ProductRouter = require('./routes/productRouter');
const error = require('./middleware/errorHadle');

app.use(express.json());

app.use('/user', UserRouter);
app.use('/product', ProductRouter);

app.all('*', (req, res, next) => {
    next(error({
        stateCode: 400,
        message: `Can not Find ${req.url} in the server`
      }))
});

app.use((err , req , res , next)=>{
    res.status(err.status).send({
        message: err.message,
        codee: err.code
    })
});

app.listen(3000, () => {
    console.log('Connect to http://localhost:3000');
});
