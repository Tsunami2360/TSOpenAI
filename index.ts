import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();
//import fetch from "node-fetch";
import fetch from "isomorphic-fetch";
import * as readline from "readline";

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function start(topic: string) {

  const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION_ID,
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.listEngines();
  //console.log(response);

  let amount: number = 3;

  console.group(topic, amount);

  const ares = await openai.createImage({
    prompt: topic,
    n: amount,
    size: "1024x1024",
  });
  ares.data.data.forEach(e => {
    console.log(e);
  });
  //console.log(ares.data.data[0].url);
}

rl.question("Topic? ", (topic: string) => {
  start(topic);
  rl.close();
});

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
