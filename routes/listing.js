const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

// const validateListing = (req, res, next) => {
//   let value = listingSchema.validate(req.body);
//   console.log(value);
// if (error) {
//   let errMsg = error.details.map((el) => el.message).join(",");
//   throw new ExpressError(400, errMsg);
// } else {
//   next();
// }
// };

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(wrapAsync(listingController.createListing));


//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);



router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.updateListing)
)
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);


//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);



module.exports = router;
