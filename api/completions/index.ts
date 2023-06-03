import express, { Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';




const API_KEY: string = process.env.API_KEY as string;

const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);


export async function POST(req :Request, res: Response) {
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
    res.send(JSON.stringify(completion.data.choices[0].message));
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
}