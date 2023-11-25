const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const getDogs = require('../controllers/GetDogs');
const getTemperament = require('../controllers/getTemperaments')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/dogs', getDogs)
router.use('/temperaments', getTemperament)

module.exports = router;
