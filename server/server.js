const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

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


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});