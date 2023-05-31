import express, {Application, Request, Response} from "express"
import cors from "cors"
import {Configuration, OpenAIApi} from 'openai'
import * as dotenv from "dotenv"
dotenv.config()
const PORT: number = 8000
const app: Application = express()


app.use(cors())
app.use(express.json())

const API_KEY: string = process.env.API_KEY as string

const configuration = new Configuration({
    apiKey:API_KEY
})

const openai = new OpenAIApi(configuration)

app.post("/completions", async (req: Request, res: Response) => {
    try{
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                            role: "user" , 
                            content: "Return ONLY SQL for" + req.body.message
                        }]
        })
        console.log(completion)
        res.send(completion.data.choices[0].message)
    }
    catch(error){
        console.error(error)
        res.status(500).send("Server Error")
    }
})

app.listen(PORT, () => console.log(`your server is running on PORT ${PORT}`))
