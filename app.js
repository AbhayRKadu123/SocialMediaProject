const express=require('express');
const app=express();
const Router=express.Router();
let admin=require('./Routes/admin')
let user=require('./Routes/User')
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const passport=require('passport')
const LocalStrategy = require('passport-local').Strategy;
const RegisterAdmin=require('./Models/Admin')
// let WrapAsync=require('./WrapAsync')

app.use(methodOverride('_method'));
require('dotenv').config();

var session = require('express-session')
engine = require('ejs-mate'),
app.engine('ejs', engine);
app.set('view engine', 'ejs'); 

app.use(session({
    secret:  process.env.secret,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.mongourl, // MongoDB connection string from .env
        collectionName: 'sessions', // Optional: Customize the collection name
        ttl: 24 * 60 * 60 // Optional: Session expiration time (24 hours)
      }),
    cookie: { secure:false ,
        maxAge: 24 * 60 * 60 * 1000
    }
  }))
  var flash=require('connect-flash');
  app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(RegisterAdmin.authenticate()))
passport.serializeUser(RegisterAdmin.serializeUser())
passport.deserializeUser(RegisterAdmin.deserializeUser())
const { urlencoded } = require('body-parser');
const Admin = require('./Models/Admin');
const WrapAsync = require('./WrapAsync');
app.use(urlencoded({extended:true}))

app.use(flash())
app.listen(process.env.PORT,()=>{
    console.log('app is listening on port 8080')
})
app.use(async(req,res,next)=>{
    // console.log(req.flash('info'))
    res.locals.userName=req.user;
    res.locals.err=req.flash('err')

res.locals.RegisterAdminlength=await RegisterAdmin.find({});
    res.locals.info = req.flash('info');
    
    next()
})




app.use('/',user)

app.use('/admin',admin)

app.use((req,res,next)=>{
    req.flash('err', 'Page not found')

    res.redirect('/admin')
})

app.use((err,req,res,next)=>{
    console.log('err msg'+err)
    req.flash('err', err)

    res.redirect('/admin')
})




