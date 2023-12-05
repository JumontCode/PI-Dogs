const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const getDogs = require('../controllers/GetDogs');
const createDog = require('../controllers/createDog')
const findDogById = require('../controllers/findDogsById')
const findDogByName = require('../controllers/findDogsById')

const getTemperament = require('../controllers/getTemperaments')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', getDogs) //* SUCCES
router.post('/dogs', createDog)  //* SUCCES
router.get('/dogs/:id', findDogById) //* SUCCES
router.get('/dogs/', findDogByName) //* SUCCES

router.get('/temperaments', getTemperament) //* SUCCES

module.exports = router;
