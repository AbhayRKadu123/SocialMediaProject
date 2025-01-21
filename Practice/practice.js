// const express =require('express')
// const app= express();
// let ExpressError=require('./ExpressError')
// app.listen(8080,()=>{
// console.log('app is listening ')
// })
// let CheckForError=(fn)=>{
//     return (req,res,next)=>{
//         fn().catch((err)=>{
//              next(err)
//         })
//     }
// }
// app.get('/',(req,res)=>{
//     res.send('home route')
// })

// app.get('/err',CheckForError((req,res)=>{
//     abc=abc
// }))

// app.get('/admin',CheckForError(async(req,res)=>{
//     throw new ExpressError(404,'access denied')
// }))
// app.get('/isowner',CheckForError(async(req,res)=>{
//     console.log(req.query)
//     if(req.query.pin!='demo'){
//         throw new ExpressError(400,'wrong pin')
//     }
//     res.send('access')
 
// }))


// app.use((req,res,next)=>{
//    throw new Error('page not found')
// })

// app.use((err,req,res,next)=>{
// res.send('this is err'+err)
// })