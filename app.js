
//========================================================================================
//                                Import File
//========================================================================================
const express = require("express");
const app = express();

fetch('https://script.google.com/macros/s/AKfycbx4PnSnZC4Q5AdRBbDOuda8Yzb2672jPI2KlYybFWuRlKp9tasmUt5Z2nT9XqecGPMlqg/exec?fullname=numan&value=newdata', {
   method: 'get',
})
   .then(response => { return response.json() })
   .then(data => { console.log(data) })
   .catch(err => { console.error(err) })
 
app.get('/',(req,res)=>{
   res.render('')
})
 
 

//========================================================================================
//                                Server Start
//========================================================================================
app.listen(process.env.PORT || 80, () => {
    console.log(`Running`);
})