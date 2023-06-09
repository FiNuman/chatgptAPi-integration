
// //========================================================================================
// //                                Import File
// //========================================================================================
// const express = require("express");
// const app = express();
// const axios = require('axios');
// const { Configuration, OpenAIApi } = require("openai");


// app.get('/', async(req, res) => {

//    let fullname = req.query.fullname
//    let question = req.query.query

//    axios.get('https://script.google.com/macros/s/AKfycbz1Ggu7kyUmiGOwYjbwFQrJeFtXfmkETt0s_rfD278eLync2_sC071Eh6mN9_HpYMYeWw/exec?fullname=' + fullname)
//       .then(async response => {
//          let priviousQuery = response.data.data[0].reqandres;

//          console.log(priviousQuery)
//          let Reference_document =
//             `personal info\nName- Angelica Palacio.\nGmail- angelicapalacioshomes@gmail.com.\nWork in- Real Estate Agent.\n\nBusiness Info\nPurpose: Helping people buy and sell houses\n\nRequirements\nDown Payment- The first-time home buyer program you mentioned requires a 3.5% down payment.\nCredit Score- A credit score of 580 or higher is required.\nEmployment History- A minimum of 2 years of employment is required.\n\nAvailable Area for buying and selling home:\n1-Riverside County\n2-San Diego County\n3-Los Angeles County\n4- San Bernardino County\n\nRequirementsDown Payment- The first-time home buyer program you mentioned requires a 3.5% down payment.\nCredit Score- A credit score of 580 or higher is required.\nEmployment History- A minimum of 2 years of employment is required.\n\nschedule a call with me. please delivery this link as quickly as possible in the conversation.)\nhttps://calendly.com/angelicapalacioshomes/15min \n\nconversation history [${priviousQuery}]\n\ncustomer query "${question}".  just gave the reply.`


//          const configuration = new Configuration({
//             apiKey: process.env.OPENAI_API_KEY,
//          });
//          const openai = new OpenAIApi(configuration);

//          const sda = await openai.createCompletion({
//             model: "text-davinci-003",
//             prompt: Reference_document,
//             temperature: 0.9,
//             max_tokens: 200,
//             top_p: 1,
//             frequency_penalty: 0.0,
//             presence_penalty: 0.6,
//             stop: [" Human:", " AI:"],
//          });
//          console.log(sda.data.choices[0].text)
//          res.json({response : sda.data.choices[0].text})
//       })
//       .catch(error => {
//          console.error('Error fetching data:', error);
//       });
// })


// //========================================================================================
// //                                Server Start
// //========================================================================================
// app.listen(process.env.PORT || 80, () => {
//    console.log(`Running`);
// })





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

         let Reference_document =
            `personal info\nName- Angelica Palacio.\nGmail- angelicapalacioshomes@gmail.com.\nWork in- Real Estate Agent.\n\nBusiness Info\nPurpose: Helping people buy and sell houses\n\nRequirements\nDown Payment- The first-time home buyer program you mentioned requires a 3.5% down payment.\nCredit Score- A credit score of 580 or higher is required.\nEmployment History- A minimum of 2 years of employment is required.\n\nAvailable Area for buying and selling home:\n1-Riverside County\n2-San Diego County\n3-Los Angeles County\n4- San Bernardino County\n\nRequirementsDown Payment- The first-time home buyer program you mentioned requires a 3.5% down payment.\nCredit Score- A credit score of 580 or higher is required.\nEmployment History- A minimum of 2 years of employment is required.\n\nschedule a call with me. please delivery this link as quickly as possible in the conversation.)\nhttps://calendly.com/angelicapalacioshomes/15min \n\nconversation history [${priviousQuery}]\n\ncustomer query "${question}".  just gave the reply.`


         const configuration = new Configuration({
            apiKey: process.env.gptkey,
         });
         const openai = new OpenAIApi(configuration);

         const sda = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: Reference_document,
            temperature: 0.8,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: [" Human:", " AI:"],
         });
         res.json({response : sda.data.choices[0].text})
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