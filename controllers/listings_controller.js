const ListingModel = require('../models/listing');

var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/farsbein01/upload'
var CLOUDINARY_UPLOAD_PRESET = 'nr78lqcf'

module.exports = {

  createListing(req, res, next) {
    var listing = new ListingModel(req.body);
    listing.save(function (err) {
      if (err) {
        next(err);
      } else {
        res.json(listing);
      }
    });
  },
    
  updateListing(req, res, next) {
    ListingModel.findOneAndUpdate({ _id: req.body.id }, req.body, {new: true}, (err, listing) => {
      if (err) {
        next(err);
      } else {
        res.json(listing);
      }
    });
  },
    
  getListingById(req, res, next) {
    ListingModel.findOne({ _id: req.params.id }, (err, listing) => {
      if (err) {
        next(err);
      } else {
        listing = {
          id: listing._id,
          userId: listing.userId,
          title: listing.title,
          description: listing.description,
          iconUrl: listing.iconUrl,
          username: listing.username,
          rating: listing.rating,
          distance: listing.distance
        }

        res.json(listing)
      }
    });
  },

  getAllListings(req, res, next) {
    ListingModel.find({ archived: { $ne: true } }, function (err, listings) {
      if (err) {
        next(err);
      } else {
        listings = listings.map(listing => ({ 
          id: listing._id,
          userId: listing.userId,
          title: listing.title,
          description: listing.description,
          iconUrl: listing.iconUrl,
          username: listing.username,
          rating: listing.rating,
          distance: listing.distance
         }))

        res.json(listings);
      }
    });
  },

  archiveListing(req, res, next) {
    ListingModel.findOne({ _id: req.params.id }, (err, listing) => {
      if (err) {
        next(err);
      } else {
        listing.archived = true;
        listing.save();
      }
    });
  },

  uploads(req, res, next) {
    ListingModel.find({ id: req.params.id }, (err, image) => {
      if (err) {
        next(err);
      } else {
        image.archived = true;
        image.save();
      }
    });
  }

  // uploads(req,res,next){
  //   const file = req.file.photo;
  //   console.log(file);
  //   CLOUDINARY_UPLOAD_PRESET.uploader.upload(file.tempFilePath, function(err, result){
  //     console.log(result, error);
  //   });
    // file.mv('./uploads/' + file.name, function (err,result){
    //   if (err)
    //     throw err;
    //   res.send({
    //     success:true,
    //     message: "File uploaded"
    //   })
    // })
  // }

  // uploads(req,res,next){
  //   cloudinary.v2.uploader.upload(image, 
  //   function(error, result) {console.log(result, error)});
  // }

}
