'use strict'
// Application Dependencies
const express = require('express');
const pg = require('pg');
const methodOverride = require('method-override');
const superagent = require('superagent');
const cors = require('cors');

// Environment variables
require('dotenv').config();

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware
// Utilize ExpressJS functionality to parse the body of the request
app.use(express.urlencoded({extended:true}));

// Specify a directory for static resources
app.use(express.static('./public'));

// define our method-override reference
app.use(methodOverride('_method'));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');
// Use app cors
app.use(cors());

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);

// app routes here
// -- WRITE YOUR ROUTES HERE --
app.get('/', getAllHome);
function getAllHome(req,res){
    const url='https://thesimpsonsquoteapi.glitch.me/quotes?count=10';
    superagent.get(url).set('User-Agent', '1.0').then(data=>{
        // console.log(data.body);
        res.render('home',{characters:data.body});
    })
}

app.post('/myfavorite',addmyfavorite);
function addmyfavorite (req, res){
    console.log(req.body);
    const{character,quote,image}=req.body;
    const sql=`INSERT INTO simpsons (namechar,qoute,imagechar)values($1, $2,$3)`;
    const values =[character,quote,image];
    client.query(sql,values).then( resut=>{
        console.log(resut.rows);
        res.redirect('/myfavorite');
      
    })
}
app.get('/myfavorite',rendermyfavorite);
function rendermyfavorite(req,res){
    const sql = `SELECT * FROM simpsons`;
    client.query(sql).then(result=>{
      res.render('favorites',{results:result.rows} );
    })
}
app.get('/character/:id',getcharacter)

function getcharacter (req,res){
    const id =[req.params.id];
    const sql = `SELECT * FROM simpsons where id=$1`;
    client.query(sql,id).then(result=>{
      res.render('favorites',{resultsid:result.rows[0]} );
    })
}
app.get('/character/:id',getcharacter)
// callback functions
// -- WRITE YOUR CALLBACK FUNCTIONS FOR THE ROUTES HERE --

// helper functions

// app start point
client.connect().then(() =>
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
);
