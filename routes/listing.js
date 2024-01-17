const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/ " });

// const validateListing = (req, res, next) => {
//   let error = listingSchema.validate(req.body);
//   if (error) {
   // let errMsg = error.details[0].message;
//     return next(new ExpressError(400, error));
//   } else {
//     next();
//   }
// };

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post( wrapAsync(listingController.createListing));
// .post( upload.single('listing[image]'), (req, res) => {
//   res.send(req.file);
// });

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
