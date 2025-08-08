const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
let Updated_at = new Date().toLocaleString();


let ListingSchemaDefinition =  ({
  title: {
    type: String,
    required: true,
  }, 
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  // geometry: {
  //   type: {
  //     type: String,
  //     enum: ["Point"],
  //     required: true,
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true,
  //   },
  // },

 
});

if(Updated_at.length > 0) {
  ListingSchemaDefinition.Updated_at = {
    type: String,
  }
}




const listingSchema = new Schema(ListingSchemaDefinition);
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing.reviews.length) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});