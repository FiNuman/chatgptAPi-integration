
//========================================================================================
//                                Import File
//========================================================================================
const express = require("express");
const app = express();
const axios = require('axios');



app.get('/', (req, res) => {
   console.log(req.url)
   axios.get('https://script.google.com/macros/s/AKfycbx4PnSnZC4Q5AdRBbDOuda8Yzb2672jPI2KlYybFWuRlKp9tasmUt5Z2nT9XqecGPMlqg/exec?fullname=numan&value=newdata')
      .then(response => {
         let priviousQuery = response.data.data[0].reqandres;

      })
      .catch(error => {
         console.error('Error fetching data:', error);
      });
})



//========================================================================================
//                                Server Start
//========================================================================================
app.listen(process.env.PORT || 80, () => {
   console.log(`Running`);
})