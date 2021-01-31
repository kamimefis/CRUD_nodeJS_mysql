const { request } = require("express");

const controller= {};

controller.list= (req, res) => {
    req.getConnection( (err, conn)=> {
        conn.query('SELECT * FROM customer', (err, results) => {
            if (err) {
                res.json(err);
            }
            console.log(results);
            res.render('customers', {
                data: results
            });
        });
    } ); 
};

controller.save= (req, res) =>{
    const data= req.body; //contiene los datos del formulario

    req.getConnection( (err,conn) =>{
        conn.query('INSERT INTO customer set ?', [data], (err, results)=> {
            console.log(results);
            //res.send('works');
            res.redirect('/'); 
        });
    });
};

controller.delete= (req,res) =>{
    const {id}= req.params;

    req.getConnection( (err, conn)=> {
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, results)=> {
            res.redirect('/');
        })
    });
};


controller.update= (req,res) =>{
    const {id} =req.params;

    req.getConnection((err, conn)=> {
        conn.query('SELECT * FROM customer WHERE id= ?', [id], (err, results) =>{
            console.log(results)
            res.render('customer_edit', {
                data: results[0]
            });
        })
    })
};

controller.updateButton= (req,res)=>{
    const {id}= req.params;
    const editedCostumer= req.body;

    req.getConnection((err,conn)=> {
        conn.query('UPDATE customer set ? WHERE id= ?', [editedCostumer, id], (err, results)=> {
            res.redirect('/');
        })
    })
};

module.exports= controller;