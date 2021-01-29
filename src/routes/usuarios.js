const express = require('express');
const router = express.Router();
const {isAuthenticated}=require('../helpers/auth')
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/login.hbs');
});
router.post('/users/signin', passport.authenticate('local',{ 
    successRedirect:'/users/invest',
    failureRedirect:'/users/signin',
    failureFlash:true
}));


/*Registro*/
router.get('/users/register', (req, res) => {
    res.render('users/register.hbs');
});
router.post('/users/register', async (req, res) => {
     const {name,email,password,confirmPassword} = req.body;
     const errors=[];
     console.log(req.body);
     if(name.length<=0){
         errors.push({text:'Por favor ingresa la contraseña'});
     }
     if (password !=confirmPassword) {
         errors.push({text:'Las contraseñas no coinciden'})
     }
     if(password.length<4){
         errors.push({text:'la contraseña debe tener al menos 4 caracteres'})
     }
     if(errors.length>0){
         res.render('users/register.hbs',{errors,name,email,password,confirmPassword});

     }else{
         /*Validar emai repetido*/
         const emailUser = await User.findOne({email:email});
         if (emailUser) {
             req.flash('error_msg','Este correo ya esta registrado');
             res.redirect('/users/register');
         }


         const newUser = new User({name,email,password});
         newUser.password = await newUser.encryptPassword(password);
         await newUser.save();
         req.flash('success_msg','Estas registrado');
         res.redirect('/users/signin');

         //res.send('OK');
     }
});

router.get('/users/recovery', (req, res) => {
    res.render('users/recuperar.hbs');
});
router.get('/users/passwdr', (req, res) => {
    res.render('users/contraseña.hbs');
});

//Editar informacion
router.get('/users/editinfo',isAuthenticated,async (req, res) => {
        res.render('users/editinfo.hbs');
});
router.get('/users/invest',isAuthenticated ,(req, res) => {
    res.render('users/investigador.hbs');
});
//Cerrar sesión
router.get('/users/logout',(req,res)=>{
req.logout();
res.redirect('/');
});
//Ruta subir datos remmaq
router.get('/users/datosremmaq',isAuthenticated,async (req, res) => {
    res.render('users/datosremmaq.hbs');
});
module.exports = router;