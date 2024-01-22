const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  let errorMsg =  "no worries";// error.details[0].message; 
  if (error) {
    return next(new ExpressError(400, errorMsg));
  } else {
    next();
  }
};

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create listing!");
    return res.redirect("/login");
  }
  next();
};

const saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

const isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "listing does not exists");
    return res.redirect(`/listings`);
  }
  if (!listing.owner) {
    req.flash("error", "listing owner does not exists");
    return res.redirect(`/listings`);
  }
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this listing!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

const isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "review does not exists");
    return res.redirect(`/listings`);
  }
  if (!review.author) {
    req.flash("error", "review author does not exists");
    return res.redirect(`/listings`);
  }
  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports = {
  isLoggedIn,
  saveRedirectUrl,
  isOwner,
  isReviewAuthor,
  validateListing,
};
