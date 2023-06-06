
//========================================================================================
//                                Import File
//========================================================================================
const express = require("express");
const app = express();
const axios = require('axios');



app.get('/', (req, res) => {

   let fullname = req.query.fullname
   let question = req.query.query

   axios.get('https://script.google.com/macros/s/AKfycbz-fHU8pU1KzqsiBpKR0phiMStEBecW3Evn4Rm-MxaPqxXbMIbsSPwUE9dit1PcIEZDjA/exec?fullname='+fullname)
      .then(response => {
         let priviousQuery = response.data.data;
         console.log(response.data)
      })
      .catch(error => {
         console.error('Error fetching data:', error);
      });


   let Reference_document = `personal info 
   Name- Angelica Palacio.
   Gmail- angelicapalacioshomes@gmail.com.
   Work in- Real Estate Agent.
  
  Business Info
  Purpose: Helping people buy and sell houses
  
  Requirements
  Down Payment- The first-time home buyer program you mentioned requires a 3.5% down payment.
  Credit Score- A credit score of 580 or higher is required.
  Employment History- A minimum of 2 years of employment is required.
  
  Available Area for buying and selling home:
   1-Riverside County
   2-San Diego County
   3-Los Angeles County
   4- San Bernardino County
  
  Requirements
  Down Payment- The first-time home buyer program you mentioned requires a 3.5% down payment.
  Credit Score- A credit score of 580 or higher is required.
  Employment History- A minimum of 2 years of employment is required.
  
  schedule a call with me. (please delivery this link as quickly as possible that important .)
  https://calendly.com/angelicapalacioshomes/15min 
  
  conversation history [{{cuf_9391027}}]
  
  customer query "{{cuf_9387773|fallback:""}}".  just gave the reply.`


   res.send('Nothing')
})
// axios.get
// axios.get('https://script.google.com/macros/s/AKfycbwIganxO-yArrUU26QWs7iGhPqRpLkgnS4sUewVuWUMQLOXpp5CgPcdtRvpZZ00ZlvLHg/exec?update=2071012037&value=newdata')
//    .then(response => {
//       let priviousQuery = response.data.data;
//       console.log(response.data)

//    })
//    .catch(error => {
//       console.error('Error fetching data:', error);
//    });


//========================================================================================
//                                Server Start
//========================================================================================
app.listen(process.env.PORT || 80, () => {
   console.log(`Running`);
})