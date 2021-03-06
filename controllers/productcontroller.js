const Product = require("../models/productModel");    // immporting product module
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create Product  --   Admin 
exports.createProduct = catchAsyncErrors(async (req, res, next) =>{
    const product = await Product.create(req.body);

    res.status(201).json({          // here new product is getting added to mongodb
        success:true,
        product
    })
});

// Get All Products  --
exports.getAllProducts = catchAsyncErrors(async(req, res) => {
     const resultPerPage = 5;
     const productCount = await Product.countDocuments();
                                          // query       // queryStr
     const apiFeature =  new ApiFeatures(Product.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage)

    const products = await apiFeature.query; // it will bring all products

    res.status(200).json({       
       success:true,
       products,
       productCount,
   })
});

// Update Product   - Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) =>{
    let product = await Product.findById(req.params.id);   // find in mongodb collection
    if(!product){
         return next(new ErrorHandler("Product Not Found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) =>{
    const product = Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found", 404))
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product successfully Deleted"
    })
})

//GEt productDetails
exports.getProductDetails = catchAsyncErrors(async (req, res, next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
      return next(new ErrorHandler("Product not found", 404))
    }else{
    res.status(200).json({
        success:true,
        product
    })
  }
})

