require('./database/db');
const express = require('express');
const app = express();
const UserRouter = require('./routes/userRouter');
const ProductRouter = require('./routes/productRouter');
const error = require('./middleware/errorHadle');

app.use(express.json());

app.use('/user', UserRouter);
app.use('/product', ProductRouter);

app.use(error);

app.listen(3000, () => {
    console.log('Connect to http://localhost:3000');
});
