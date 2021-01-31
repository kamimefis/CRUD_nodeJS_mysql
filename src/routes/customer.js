const express= require('express');
const router= express.Router();  //método router devuelve un objeto javascript al cual se le puede agregar rutas, y así reutilizarlas

const customerController= require('../controllers/customerController');

router.get('/', customerController.list);

router.post('/add', customerController.save);

router.get('/delete/:id', customerController.delete); 

router.get('/update/:id', customerController.update);

router.post('/update/:id', customerController.updateButton); 

module.exports= router;