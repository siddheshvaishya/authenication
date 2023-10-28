const { log } = require('console');
const express=require('express');
const path=require('path');
const app=express();
require("./db/conn");
const Registration=require("./models/registrations");


  
const port=process.env.PORT || 3000;
const static_path=path.join(__dirname,'../public')
const views_path=path.join(__dirname,"../views");


app.use(express.static(static_path));
app.set('view engine','ejs');
app.set("views",views_path);
app.use(express.json());
app.use(express.urlencoded({extended:false}));








app.get("/",(req,resp)=>{
  resp.render('index')
});
app.get("/registration",(req,resp)=>{
    resp.render('registration')
});
app.post("/registration",async (req,resp)=>{
    try {
        const password=req.body.password;
        const cpassword=req.body.confirm_password;
        if(password === cpassword){
            const registrationEmp=new Registration({
                full_name:req.body.full_name,
                email: req.body.email,
                phone_no:req.body.phone_no,
                age: req.body.age,
                gender:req.body.gender,
                password: req.body.password,
                confirm_password:req.body.confirm_password,
                country:req.body.country,
                city:req.body.city,
                region:req.body.region,
                postal_code:req.body.postal_code 
            })
             const registered =await registrationEmp.save(); 
             resp.status(201).render('index');
            
        }else{
            resp.send("password not matching");
          
        }
    } catch (error) {
        resp.status(400).send(error)
    }
});

app.listen(port,()=>{
    console.log('server is runing at '+port);
});