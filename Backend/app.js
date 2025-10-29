const express = require('express')
const app = express()
const port = 3000 || process.env.PORT;
const dotenv = require('dotenv');
dotenv.config();
const db = require ('./config/db');
const passport = require('./config/passport');
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const expressSession = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cartRouter = require('./routes/CartRoutes')
const Razorpay = require('razorpay');
const paymentRouter = require('./routes/paymentRoutes')
const addressRouter = require('./routes/addressRoutes');


// middlewares
app.use (express.json());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());




//  Router
app.use('/api/auth',userRouter);
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/payment',paymentRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
