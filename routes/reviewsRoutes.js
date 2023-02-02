const express = require('express')
const router = express.Router() 

const {
    uploadImage,
    getReviews,
    addReview,
    deleteReview,
    updateReview
}=require("../controllers/reviewsController.js")

const {
    protect,
    admin
}=require("../middleware/authMiddleware")

router.get('/read' ,getReviews)
router.post('/add' ,protect,admin, uploadImage.single('logo'), addReview)
router.put('/update/:id',protect,admin,uploadImage.single('logo') ,updateReview)
router.delete('/delete/:id',protect,admin,deleteReview )



module.exports = router