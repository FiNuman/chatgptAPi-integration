
//========================================================================================
//                                Import File
//========================================================================================
const express = require("express");
const app = express();
const axios = require('axios');



app.get('/', (req, res) => {

   // let fullname = req.query.fullname
   // let question = req.query.query

   let fullname = 2071012037
   let question = 'tell me the price'

   axios.get('https://script.google.com/macros/s/AKfycbz-fHU8pU1KzqsiBpKR0phiMStEBecW3Evn4Rm-MxaPqxXbMIbsSPwUE9dit1PcIEZDjA/exec?fullname=' + fullname)
      .then(response => {
         let priviousQuery = response.data.data[0].reqandres;


         let Reference_document =
            `personal info
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
  
  conversation history [${priviousQuery}]
  
  customer query "${question}".  just gave the reply.`

         const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
         const accessToken = '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';

         const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
         };

         const requestData = {
            'prompt': Reference_document,
            'max_tokens': 50,
         };

         axios.post(apiUrl, requestData, { headers })
            .then(response => {
               console.log(response.data.choices[0].text);
               let Cresponse = response.data.choices[0].text
               res.json({ response: Cresponse })
            })
            .catch(error => {
               console.error('Error:', error.response.data);
            });

      })
      .catch(error => {
         console.error('Error fetching data:', error);
      });


   res.send('Nothing')
})







//========================================================================================
//                                Server Start
//========================================================================================
app.listen(process.env.PORT || 80, () => {
   console.log(`Running`);
})