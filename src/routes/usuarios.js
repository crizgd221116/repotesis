const express = require('express');
const router = express.Router();

//------------ Importing Controllers ------------//
const authController = require('../controllers/authController')

//------------ Login Route ------------//
router.get('/users/login', (req, res) => res.render('users/login.hbs'));

//------------ Forgot Password Route ------------//
router.get('/users/recuperar', (req, res) => res.render('users/recuperar.hbs'));

//------------ Reset Password Route ------------//
router.get('/users/contrasena/:id', (req, res) => {
    res.render('users/contrasena.hbs', { id: req.params.id });
});

//------------ Register Route ------------//
router.get('/users/register', (req, res) => res.render('users/register.hbs'));

//------------ Register POST Handle ------------//
router.post('/users/register', authController.registerHandle);

//------------ Email ACTIVATE Handle ------------//
//router.get('users/activate/:token', authController.activateHandle);

router.get('/activate/:token', authController.activateHandle);

//------------ Forgot Password Handle ------------//
router.post('/users/recuperar', authController.forgotPassword);

//------------ Reset Password Handle ------------//
router.post('/users/contrasena/:id', authController.resetPassword);

//------------ Reset Password Handle ------------//
router.get('/users/recuperar/:token', authController.gotoReset);

//------------ Login POST Handle ------------//
router.post('/users/login', authController.loginHandle);

//------------ Logout GET Handle ------------//
router.get('/users/logout', authController.logoutHandle);

router.get('/users/editinfo/:id', isAuthenticated, (req, res) => {
    res.render('users/editinfo.hbs');
});
router.get('/users/invest', isAuthenticated, (req, res) => {
    res.render('users/investigador.hbs');
});
router.get('/users/uploadrem', isAuthenticated, (req, res) => {
    res.render('users/datosremmaq.hbs');
});
router.get('/users/uploadin', isAuthenticated, (req, res) => {
    res.render('users/datosinamhi.hbs');
});
router.get('/users/hist', isAuthenticated, (req, res) => {
    res.render('users/historial.hbs');
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = router;