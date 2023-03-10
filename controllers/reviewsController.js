const asyncHandler = require('express-async-handler');
const Reviews = require ('../model/reviewsModel');
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  const uploadImage = multer({
    storage:storage
  })

// @desc      Create new review
// @route     POST /reviews/add/
// @access    Private/Admin
 const addReview = asyncHandler(async(req,res)=>{
       const newReview =  new Reviews({
               name: req.body.name,
               message:req.body.message,
               logo: req.file.path
         })
          console.log(newReview)
         newReview.save();
         res.send(newReview)
 });



// @desc      read all reviews
// @route     GET /reviews/read/
// @access    Private/Admin
const getReviews = asyncHandler(async(req,res)=>{
    const reviews = await Reviews.find()
    const newreviews = reviews.map(review => {
      const image = fs.readFileSync(review.logo)
      const batata= Buffer.from(image).toString('base64');
      return{
        _id:review._id,
        name:review.name,
        message:review.message,
        logo:batata
      } 
    });
   
    res.status(200).json(newreviews)
});


// @desc      update review
// @route     PATCH /reviews/update/:id/
// @access    Private/Admin
const updateReview =  asyncHandler(async(req,res)=>{
    const review = await Reviews.findById(req.params.id)
    if(!review){
       res.status(400)
       throw new Error('Review not found')
    }
     message = req.body.message;
    if(message) review.message=message;
    const updateReview = await review.save();
   res.json(updateReview)
});

// @desc      delete review
// @route     DELETE /reviews/delete/:id/
// @access    Private/Admin
const deleteReview = asyncHandler(async(req,res)=>{
  const review = await Reviews.findById(req.params.id);
  if (review) {
    await Reviews.deleteOne();
    console.log(review)
    res.json(review);
  } else {
    res.status(404);
    throw new Error('Review not found');
  }
});

module.exports={
    addReview,
    getReviews,
    updateReview,
    deleteReview,
    uploadImage
};