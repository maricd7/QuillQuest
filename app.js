const express = require('express'); 

//express app 
const app = express();


//listen for req
app.listen(3000); 


app.get('/', (req,res)=>{
    res.send('<p>Home page</p>')
})