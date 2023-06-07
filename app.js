
//========================================================================================
//                                Import File
//========================================================================================
const express = require("express");
const app = express();
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");

app.get('/', async (req, res) => {

   let fullname = req.query.fullname
   let question = req.query.query
   axios.get('https://script.google.com/macros/s/AKfycbz1Ggu7kyUmiGOwYjbwFQrJeFtXfmkETt0s_rfD278eLync2_sC071Eh6mN9_HpYMYeWw/exec?fullname=' + fullname)
      .then(async response => {
         let priviousQuery = response.data.data[0].reqandres;

         // let Reference_document =
         //    `personal info:
         //    Name Angelica Palacio.
         //    Gmail angelicapalacioshomes@gmail.com.
         //    Work in Real Estate Agent.
            
         //    Business Info:
         //    Purpose Helping people buy and sell houses
            
         //    Requirements:
         //    The first-time home buyer program you mentioned requires a 3.5% down payment.
         //    A credit score of 580 or higher is required.
         //    A minimum of 2 years of employment is required.
            
            
         //    Available Area for buying and selling home:
         //    1 Riverside County
         //    2 San Diego County
         //    3 Los Angeles County
         //    4 San Bernardino County
            
         //   schedule a call with me.
         //   https://calendly.com/angelicapalacioshomes/15min
           
         //   conversation history: [${priviousQuery}]
           
         //   customer query: "${question}".  just gave the reply.`


         let Reference_document = 
         `Category: Personal Info
         Name: Angelica Palacio
         Gmail: angelicapalacioshomes@gmail.com
         Work: Real Estate Agent
         
         Category: Business Info
         Purpose: Helping people buy and sell houses
         
         Category: Requirements
         
         3.5% down payment is required for the first-time home buyer program.
         A credit score of 580 or higher is required.
         A minimum of 2 years of employment is required.
         Category: Available Area for Buying and Selling Homes
         
         Riverside County
         San Diego County
         Los Angeles County
         San Bernardino County
         Schedule a call with me:
         
         Link: [https://calendly.com/angelicapalacioshomes/15min]
         Conversation History:
         [${priviousQuery}]
         
         Customer Query: "${question}" (just gave the reply)`


         const configuration = new Configuration({
            apiKey: process.env.gptkey,
         });
         const openai = new OpenAIApi(configuration);

         const sda = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: Reference_document,
            temperature: 0.5,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: [" Human:", " AI:"],
         });

         let text = sda.data.choices[0].text;

         const chunkSize = 255;
         const chunks = [];
         for (let i = 0; i < text.length; i += chunkSize) {
            chunks.push(text.substr(i, chunkSize));
         }
         let response1, response2, response3
         if (chunks.length == 1) {
            response1 = text.substr(0, 255);
            response2 = ''
            response3 = ''
         } if (chunks.length == 2) {
            response1 = text.substr(0, 255);
            response2 = text.substr(255, 255);
            response3 = ''
         } if (chunks.length == 3) {
            response1 = text.substr(0, 255);
            response2 = text.substr(255, 255);
            response3 = text.substr(510, 255);
         }
         res.json({ response1: response1, response2: response2, response3: response3 })
      })
      .catch(error => {
         console.error('Error fetching data:', error);
      });
})

// res.json({ response1: response1, response2: response2, response3: response3 })

//========================================================================================
//                                Server Start
//========================================================================================
app.listen(process.env.PORT || 80, () => {
   console.log(`Running`);
})