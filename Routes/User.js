const express=require('express')
const Router=express.Router();
const UserData=require('../Models/User')
const Parse=require('../Cloudinary')

Router.get('/',(req,res)=>{
   
    res.render('Pages/User.ejs',{msg:req.flash('info')})
})
    

Router.post('/userdata',Parse.array('images', 12),async(req,res)=>{
    req.flash('info', 'Data Saved Succesfully')
    let arr=[];
    for (let i=0;i<req.files.length;i++){
        console.log(req.files[i].path)
        arr.push(req.files[i].path)
    }
    console.log(arr)
    console.log(req.body)
    let NewUser=new UserData({
name:req.body.name,
socialMedia:req.body.socialMedia,
images:arr

    })
    let result=await NewUser.save();
    console.log(result)
        res.redirect('/')
})

// app.post('/upload', parser.single('image'), function (req, res) {
//     res.json(req.file);
//   });
    module.exports=Router;
