const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

// Register a User   -- makes a user on mongodb

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: "this is a sample id",
            url: "profilepicUrl",
        }
    });

    const token = user.getJWTToken()

    res.status(201).json({
        success:true,
        token,
    })
})
 
// Login user funtion
exports.loginUser = catchAsyncErrors (async (req, res, next) =>{
    const {email, password} = req.body;

    // checking if user has given password and email both

    if(!email || !password) {
        return next(new ErrorHandler("Please Enter Email & password", 400));  // bad request
    }

    const user = await User.findOne({email: email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));  // unauthorized
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(newErrorHandler("Invalid email or password", 401))
    }

    const token = user.getJWTToken();

    res.status(200).json({
        success:true,
        token,
    })
})