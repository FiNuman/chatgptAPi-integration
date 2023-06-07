
//========================================================================================
//                                Import File
//========================================================================================
const express = require("express");
const app = express();
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");

// const dotenv = require('dotenv');
// const path = require('path');
// const envPath = path.resolve(__dirname, '/etc/secrets/.env');
// dotenv.config({ path: envPath });



app.get('/', async (req, res) => {

   let fullname = req.query.fullname
   let question = req.query.query
   axios.get('https://script.google.com/macros/s/AKfycbz1Ggu7kyUmiGOwYjbwFQrJeFtXfmkETt0s_rfD278eLync2_sC071Eh6mN9_HpYMYeWw/exec?fullname=' + fullname)
      .then(async response => {
         let priviousQuery = response.data.data[0].reqandres;

         console.log(priviousQuery)
         let Reference_document =
            `Note that: that the reponse must be less then 200 character\n  personal info\nName- Angelica Palacio.\nGmail- angelicapalacioshomes@gmail.com.\nWork in- Real Estate Agent.\n\nBusiness Info\nPurpose: Helping people buy and sell houses\n\nRequirements\nDown Payment- The first-time home buyer program you mentioned requires a 3.5% down payment.\nCredit Score- A credit score of 580 or higher is required.\nEmployment History- A minimum of 2 years of employment is required.\n\nAvailable Area for buying and selling home:\n1-Riverside County\n2-San Diego County\n3-Los Angeles County\n4- San Bernardino County\n\nRequirementsDown Payment- The first-time home buyer program you mentioned requires a 3.5% down payment.\nCredit Score- A credit score of 580 or higher is required.\nEmployment History- A minimum of 2 years of employment is required.\n\nschedule a call with me. (please delivery this link as quickly as possible that important .)\nhttps://calendly.com/angelicapalacioshomes/15min \n\nconversation history [${priviousQuery}]\n\ncustomer query "${question}".  just gave the reply.`


         const configuration = new Configuration({
            apiKey: process.env.gptkey,
         });
         const openai = new OpenAIApi(configuration);

         const sda = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: Reference_document,
            temperature: 0.9,
            max_tokens: 50,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: [" Human:", " AI:"],
         });
         
         let text = sda.data.choices[0].text;
         const response1 = text.substr(0, 255);
         const response2 = text.substr(255, 255);
         const response3 = text.substr(510, 255);
         res.json({ response1: response1, response2: response2, response3: response3 })
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