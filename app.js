if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

<<<<<<< HEAD
//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";x
=======
//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
>>>>>>> a3b43e837f37d6c6de7b8f8cbe5b0446cdd72cb9
const dbUrl = process.env.ATLASDB_URL;

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
<<<<<<< HEAD
const Listing = require("./models/listing.js");
=======

// const listings = require("./routes/listing.js");
// const reviews = require("./routes/review.js");
>>>>>>> a3b43e837f37d6c6de7b8f8cbe5b0446cdd72cb9

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR in MONGO SESSion STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; 
  next();
});

<<<<<<< HEAD
app.get("/search", async(req, res) => {
  try {
    const query = req.query.query;
    const listing = await Listing.find({
      $or: [
          { title: new RegExp(query, "i") },
          { country: new RegExp(query, "i") },
          { location: new RegExp(query, "i") }
      ]
  });
    // await Listing.find({ title: new RegExp(query, "i") || country: new RegExp(query, "i") || location: new RegExp(query, "i")});
  console.log(listing);
    res.render("listings/search.ejs", {
    query, listing, Listing,
  
  });
} catch {
console.error(error);
res.status(500).send("An error occurred while searching. ");
}
=======
app.get("/search", (req, res) => {
  res.send("Search");
>>>>>>> a3b43e837f37d6c6de7b8f8cbe5b0446cdd72cb9
});

app.get("/", (req, res) => {
  res.render("listings/home.ejs");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
});
<<<<<<< HEAD
 
=======

>>>>>>> a3b43e837f37d6c6de7b8f8cbe5b0446cdd72cb9
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
