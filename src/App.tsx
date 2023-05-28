import React from 'react';
import { useState } from 'react';
import MessagesDisplay from './components/MessagesDisplay';
import CodeDisplay from './components/CodeDisplay';

interface ChatData {
  role: string,
  content: string,
}

const App = () => {
  const [value, setValue] = useState<string>("")
  const [code, setCode] = useState<string>("")
  const [chat, setChat] = useState<ChatData[]>([])
  const [index, setIndex] = useState('')

  const handleIndex = (val: string) => {
    setIndex(val)
    setValue(filteredUserMessages[parseInt(val,10)].content)
    setCode(filteredGPTMessages[parseInt(val,10)].content)
  }
    const loadText = () =>{
      console.log('item clicked!!')
    }


    const getQuery = async () =>{
      try{
        const options: RequestInit = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: value
          })
        }
       const response = await fetch("http://localhost:8000/completions", options)
       const data = await response.json()
       console.log('response',data)
       const userMessage = {
        role: "user",
        content: value
       }
       setChat(oldChat => [...oldChat, data, userMessage])
       setCode(data.content)
      }
      catch(error){
          console.error(error)
      }
    }

const filteredUserMessages = chat.filter(message => message.role==="user")
const filteredGPTMessages = chat.filter(message => message.role==="assistant")
const latest = filteredGPTMessages[filteredGPTMessages.length-1]

console.log('latest', latest?.content)
console.log(chat)
  return (
    <div>
      <div className='my-2'>
      <h1 className='w-100 flex items-center justify-center text-6xl font-bold '>Text to SQL Generator</h1>
      <p className='w-100 flex items-center justify-center text-lg font-bold my-4'>Translate your Text to SQL in seconds!</p>
      </div>
    <div className="app max-w-3xl flex flex-col justify-center bg-gray-100 rounded-xl drop-shadow-md">
      <input className="text-center text-md" placeholder='Enter text here' value={value} onChange={e => setValue(e.target.value)}/>
      <div className='button-container flex justify-center space-x-3 text-lg'>
        <button className="bg-sky-300 rounded-2xl font-bold px-3 py-1" id='get-query' onClick={getQuery}>Generate!</button>
        <button className="bg-gray-800 rounded-2xl text-white px-3 py-1" id='clear-query' onClick={() =>{
          setValue("")
          setChat([])
          setCode("")
        }}>Clear</button>
      </div>
      <CodeDisplay text={code || "-"}/>
      <MessagesDisplay userMessages={filteredUserMessages} loadUp={loadText} onIndex={handleIndex}/>
      
      
      
    </div>
    </div>
  );
}

export default App;
