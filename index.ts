import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();
//import fetch from "node-fetch";
import fetch from 'isomorphic-fetch';

async function start() {
  const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION_KEY,
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.listEngines();
  //console.log(response);

  const ares = await openai.createImage({
    prompt: "futuristic champignon",
    n: 1,
    size: "1024x1024",
  });
  console.log(ares.data.data[0].url);
}
start();

async function post() {
  try {
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        temperature: 0,
        max_tokens: 7
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.log(err);
    });

  } catch(err) {
    console.log(err);
  }
}
//post();
