const express=require('express')
const Router=express.Router();
const UserData=require('../Models/User')
let RegisterAdmin=require('../Models/Admin');
const passport = require('passport');
let WrapAsync=require('../WrapAsync')
let  ensureAuthenticated=(req, res, next)=> {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware or route.
    }
    res.redirect('/admin/login'); // Redirect unauthenticated users to the login page.
  }





Router.get('/',ensureAuthenticated,WrapAsync(async(req,res)=>{
    let data=await UserData.find({})
    console.log(data)
    res.render('Pages/Admin.ejs',{data:data})
}))
Router.get('/login',(req,res)=>{

    res.render('Pages/LoginAdmin.ejs')
})
// 
Router.post('/login',passport.authenticate('local',{failureRedirect:'/admin/login',failureFlash:true}),(req,res)=>{
  req.flash('info', 'User Logged in')

    res.redirect('/admin')
})
Router.get('/logout',async(req,res)=>{
    await req.logOut((err)=>{
        if(err){
            return next(err)
        }
    })
    req.flash('info', 'User Logged Out')

    res.redirect('/admin/login')
})
Router.get('/signup',(req,res)=>{
    res.render('Pages/RegisterAdmin.ejs')
})
Router.post('/signup', async (req, res, next) => {
   
      console.log(req.body);
      const { username, password } = req.body;
  
      // Create a new admin user
      const newAdmin = new RegisterAdmin({ username });
      const registeredAdmin = await RegisterAdmin.register(newAdmin, password);
  
      // Automatically log the user in after registration
      req.login(registeredAdmin, (err) => {
        if (err) {
          return next(err); // Pass the error to error-handling middleware
        }
        // Redirect to the admin page upon successful login
        req.flash('info', 'User Registered')
        return res.redirect('/admin');
      });
  
  });
  
Router.get('/:id',ensureAuthenticated,WrapAsync(async(req,res,next)=>{
  
    let {id}=req.params;
    let data=await UserData.findById(id)
    console.log('indivisual user data'+data)
    console.log(id)
  res.render('Pages/UserDetail',{data})
  
}))

Router.delete('/delete/:id',ensureAuthenticated,WrapAsync(async (req,res)=>{
    let {id}=req.params;
    let data =await UserData.findByIdAndDelete(id)
    console.log(data)
    req.flash('info', 'Data Deleted Succesfully')
    res.redirect('/admin')

}))



module.exports=Router;