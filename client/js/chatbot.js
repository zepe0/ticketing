import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

(async () => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hola" }],
  });

  console.log("Tokens usados:");
  console.log("Prompt tokens:", response.data.usage.prompt_tokens);
  console.log("Completion tokens:", response.data.usage.completion_tokens);
  console.log("Total tokens:", response.data.usage.total_tokens);

  console.log("Respuesta:");
  console.log(response.data.choices[0].message.content);
})();
