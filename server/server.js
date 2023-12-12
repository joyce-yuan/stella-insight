const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
const dotenv = require("dotenv")
dotenv.config()

app.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  

// google sheets api

const {google} = require('googleapis');
const keys = require('./key.json')

//initialize express
app.use(express.urlencoded({ extended: true }));

//set up template engine to render html files
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

// // index route
// app.get('/', (request, response) =>{
// response.render('index')
// })

app.get('/read',  async (request, response) =>{
    const auth = new google.auth.GoogleAuth({
        keyFile: "key.json", //the key file
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets", 
});

//Auth client Object
const authClientObject = await auth.getClient();

//Google sheets instance
const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

// spreadsheet id
const spreadsheetId = "1AnaEwL5IJB9q4zBn2c3wgwFkobVV1dWiG8SAsiHt2uc";

// Get metadata about spreadsheet
const sheetInfo = await googleSheetsInstance.spreadsheets.get({
    auth,
    spreadsheetId,
});

//Read from the spreadsheet
const readData = await googleSheetsInstance.spreadsheets.values.get({
    auth, //auth object
    spreadsheetId, // spreadsheet id
    range: "Sheet1!A:A", //range of cells to read from.
})


//write data into the google sheets
// await googleSheetsInstance.spreadsheets.values.append({
//     auth, //auth object
//     spreadsheetId, //spreadsheet id
//     range: "Sheet1!A:B", //sheet name and range of cells
//     valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
//     resource: {
//         values: [[article, author]]
//     },
// });

response.send(readData.data);
});

app.get('/misconceptions',  async (req, res) =>{
    // auth client object
    const auth = new google.auth.GoogleAuth({
        keyFile: "key.json", //the key file
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets", 
    });

    //Auth client Object
    const authClientObject = await auth.getClient();

    //Google sheets instance
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

    // spreadsheet id
    const spreadsheetId = "1AnaEwL5IJB9q4zBn2c3wgwFkobVV1dWiG8SAsiHt2uc";

    //Read from the spreadsheet
    const readData = await googleSheetsInstance.spreadsheets.values.get({
        auth, //auth object
        spreadsheetId, // spreadsheet id
        range: "StudentConversation!B2:B", //range of cells to read from.
    })

    const systemPrompt = "You are Stella, a helpful assistant that helps students identify misconceptions in their understanding of the solar system. You are talking to a teacher who is trying to identify student misconceptions.";
    const conversations = readData.data.values;
    const convoPrompt = "Hi Stella! I'm going to feed you some student conversations and I want you to list out what the students' top 5 misconception are. Please respond in a parsable python comma separated list format like so: '['misconception1', 'misconception2', 'misconception3', 'misconception4', 'misconception5'], starting with the top most common misconception. Here are the conversations I want you to analyze: " + conversations.toString();
    console.log("hi");
    console.log("hey!" + process.env.REACT_APP_OPENAI_API_KEY);
    // make chatGPT call
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
            {"role": "system", "content": systemPrompt},
            {"role": "user", "content": convoPrompt},
        ]
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data.choices[0].message.content);
        let misconceptions = data.choices[0].message.content;
        misconceptions = misconceptions.replace(/'/g, '"') //replacing all ' with "
        misconceptions = JSON.parse(misconceptions)
        console.log(misconceptions);
        googleSheetsInstance.spreadsheets.values.update({
            auth, //auth object
            spreadsheetId, //spreadsheet id
            range: "Misconceptions!A:A", //sheet name and range of cells
            valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
            requestBody: {
                values: [misconceptions],
                majorDimension: "COLUMNS",
            },
        });
        res.send(data.choices[0].message.content);
      })
      .catch((err) => {res.send(err)});
    // res.json({ message: "done" });
});
// const handleSubmit = async () => {
//     const prompt = {
//       role: "user",
//       content: input + " Please respond in under 100 words, and only give me hints if I am on the wrong track.",
//     };

//     // setMessages([...messages, prompt]);
//     setMessages([...messages, {role: "user", content: input}]);

//     await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [...messages, prompt],
//       }),
//     })
//       .then((data) => data.json())
//       .then((data) => {
//         console.log(data);
//         const res = data.choices[0].message.content;
//         setMessages((messages) => [
//           ...messages,
//           {
//             role: "assistant",
//             content: res,
//           },
//         ]);
//         setHistory((history) => [...history, { question: input, answer: res }]);
//         setInput("");
//       });
//   };

// gets the list of student names from the google sheet
app.get('/student-list',  async (request, response) =>{
  const auth = new google.auth.GoogleAuth({
      keyFile: "key.json", //the key file
      //url to spreadsheets API
      scopes: "https://www.googleapis.com/auth/spreadsheets", 
});

  //Auth client Object
  const authClientObject = await auth.getClient();

  //Google sheets instance
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

  // spreadsheet id
  const spreadsheetId = "1AnaEwL5IJB9q4zBn2c3wgwFkobVV1dWiG8SAsiHt2uc";

  //Read from the spreadsheet
  const readData = await googleSheetsInstance.spreadsheets.values.get({
    auth, //auth object
    spreadsheetId, // spreadsheet id
    range: "StudentConversation!A2:A", //range of cells to read from.
  })

  response.send(readData.data.values);
});

app.post('/completion',  async (req, res) =>{
  const {messages} = req.body;
  console.log("we here: ", req);
  // make chatGPT call
  await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages
    }),
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data.choices[0].message.content);
      res.send(data.choices[0].message.content);
    })
    .catch((err) => {res.send(err)});
})

app.get('/student-chat',  async (request, response) =>{

  const id = request.query.id;
  console.log("entered student chat with id: ", id);

  const auth = new google.auth.GoogleAuth({
      keyFile: "key.json", //the key file
      //url to spreadsheets API
      scopes: "https://www.googleapis.com/auth/spreadsheets", 
});

  //Auth client Object
  const authClientObject = await auth.getClient();

  //Google sheets instance
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

  // spreadsheet id
  const spreadsheetId = "1AnaEwL5IJB9q4zBn2c3wgwFkobVV1dWiG8SAsiHt2uc";

  //Read from the spreadsheet
  const row = Number(id) + 2;
  const readData = await googleSheetsInstance.spreadsheets.values.get({
    auth, //auth object
    spreadsheetId, // spreadsheet id
    range: 'StudentConversation!B'+row+':B'+row, //range of cells to read from.
  })
  console.log(readData.data.values);
  response.send(readData.data.values);
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});