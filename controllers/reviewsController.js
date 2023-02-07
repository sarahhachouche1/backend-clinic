const asyncHandler = require('express-async-handler');
const Reviews = require ('../model/reviewsModel');
const multer = require("multer");
const path = require('path');


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
        
          newReview.save();
          console.log("heyyyy",newReview)
          res.send(newReview)
         
        
          
 });



// @desc      read all reviews
// @route     GET /reviews/read/
// @access    Private/Admin
const getReviews = asyncHandler(async(req,res)=>{
    const reviews = await Reviews.find()
    res.status(200).json(reviews)
});

// @desc      update review
// @route     PUT /reviews/update/:id/
// @access    Private/Admin
const updateReview =  asyncHandler(async(req,res)=>{
    const review = await Reviews.findById(req.params.id)

    if(!review){
       res.status(400)
       throw new Error('Review not found')
    }
    const{
      name,
      message,
    }=req.body;
   const logo=req.file.path
   if(name) review.name=name;
   if(message) review.message=message;
   if(logo) review.logo=logo;
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
    res.json({ message: `Product removed successfully + ${req.params.id}`});
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