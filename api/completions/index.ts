import express, { Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';
import serverless from 'serverless-http';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const API_KEY: string = process.env.API_KEY as string;

const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/completions', async (req: Request, res: Response) => {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Return ONLY SQL for ' + req.body.message,
        },
      ],
    });
    console.log(completion);
    res.send(completion.data.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

const handler = serverless(app);

export { handler };