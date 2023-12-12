import { useState } from "react";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import Message from "../components/Message";
import Input from "../components/Input";
import History from "../components/History";
import Clear from "../components/Clear";

import dotenv from  'dotenv'
import path from 'path'

const Page = () => {
  let [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const handleSubmit = async () => {
    const prompt = {
      role: "user",
      content: input,
    };

    // messages = [{role: "user", content: "what's up"}]

    setMessages([...messages, prompt])
    console.log("posting ", JSON.stringify(messages));
    
    await fetch("http://localhost:8000/completion", {
      method: 'POST',
      body: JSON.stringify({...messages})
    })
    .then((data)=> data.json())
    .then((data) => {
      const res = data;
      console.log("data", res);
      // setMessages((messages) => [
      //   ...messages,
      //   {
      //     role: "assistant",
      //     content: res,
      //   },
      // ]);
      setHistory((history) => [...history, { question: input, answer: res }]);
      setInput("");
    }).catch((err) => {
      console.log(err);
    });
  }

  const clear = () => {
    setMessages([]);
    setHistory([]);
  };

  return (
    <div className="App">
      <div className="Column">
        <h3 className="Title">Chat Messages</h3>
        <div className="Content">
          {messages.map((el, i) => {
            return <Message key={i} role={el.role} content={el.content} />;
          })}
        </div>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onClick={input ? handleSubmit : undefined}
          buttonName={"Go"}
        />
      </div>
    </div>
  );
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;