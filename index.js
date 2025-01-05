const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config()
 


// middleWare....
app.use(cors({
    origin: ['http://localhost:5173', 'https://bangla-logic.vercel.app'],
    credentials: true
}))
app.use(express.json());




app.get('/', (req, res) => {
    res.send("Bangla Logic Server is Running")

})

app.listen(port, () => {
    console.log(`Bangla Logic Server is Running is on port :${port}`)

})