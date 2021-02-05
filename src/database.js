const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://striker19:vmnGW4al2a0j55ah@repositorio.7ffg8.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true })
.then(db=>console.log('DB is connected'))
.catch(err=> console.error(err));
