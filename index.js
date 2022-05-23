const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.get('/',(req,res)=>{

    res.send('server response send');
})

app.listen(port,()=>{
    console.log('server running on 5000 page');
})
