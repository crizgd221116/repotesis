const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.render('users/login.hbs');
});
router.get('/users/register', (req, res) => {
    res.render('users/registro.hbs');
});
router.get('/users/recovery', (req, res) => {
    res.render('users/recuperar.hbs');
});
router.get('/users/passwdr', (req, res) => {
    res.render('users/contraseña.hbs');
});
module.exports = router;