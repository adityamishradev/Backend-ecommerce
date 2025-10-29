const express = require('express');
const router = express.Router();
const{register,login,getprofile,getAllUsers}=require('../controllers/AuthController')
const { Authenticated } = require('../middleware/authMiddleware');

const passport = require("passport");


 router.post('/register',register )
 router.post('/login',login )
router.get('/profile',Authenticated,getprofile)
router.get('/all',getAllUsers)

// for testing
 router.get('/',(req,res)=>{
    res.send('Auth route working')
 });

//  google auth
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",// yeha page add krna jo login k bad open hoga
    failureRedirect: "/",// yeha page add krna jo login fail hoga
  })
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
