const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const flash = require('connect-flash');
const methodOverride = require("method-override");
const session = require("express-session");
var { min_index } = require("./utils/backend");
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');
const passport = require('passport');
const LocalStrategy = require('passport-local')

const app = express();


const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/gdsc-hackathon')
    .then(() => {
        console.log("Database Connected!!!");
    })
    .catch(err => {
        console.log("OH NO ERROR!")
        console.log(err);
    });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


const sessionConfig = {
  // store,
  // name: 'session',
  secret: 'thisisasecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      // secure: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }

}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  // console.log(req.session)
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})



app.get('/', (req, res) => {
  res.render("homePage", { min_index });
});


app.get('/login', (req, res) => {
  res.render('users/login');
})


app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
  req.flash('success', 'welcome back!');
  const redirectUrl = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
})

app.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'GoodBye!');
  res.redirect('/');
});

app.get('/register', (req, res) => {
  res.render('users/register');
})

app.post('/register', catchAsync(async (req, res, next) => {
  try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, err => {
          if (err) return next(err);
          req.flash('success', 'Welcome to IIITDM Mess!');
          res.redirect('/');
      })
  } catch (e) {
      req.flash('error', e.message);
      res.redirect('register');
  }
}));


app.all("*", (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
  // res.send(`Page not found`);
});


app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).render('error', { err })
})



app.listen(3000, () => {
  console.log(`Serving on port 3000`);
});
