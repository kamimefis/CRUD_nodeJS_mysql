const express= require('express');
const path= require('path'); 
const morgan= require('morgan');
const mysql= require('mysql');
const myConnection= require('express-myconnection');

const app= express(); 


//IMPORTING ROUTES
const customerRoutes= require('./routes/customer');

//SETTINGS
app.set('port', process.env.PORT || 3000);
app.set( 'view engine', 'ejs');
app.set('views', path.join(__dirname, 'views') );


//MIDDLEWARES
app.use(morgan('dev'));
//conexión a mysql
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'crudnodejsmysql'
}, 'single'));
app.use(express.urlencoded({extended: false})); 


//ROUTES
app.use('/', customerRoutes);

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));


//STARTING SERVER
app.listen(app.get('port'), ()=>{
    console.log('Servidor andando en puerto...') 
})