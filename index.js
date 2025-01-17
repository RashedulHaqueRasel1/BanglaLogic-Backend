const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
// const cors = require("cors");


// middleWare....
app.use(cors({
    origin: ['http://localhost:5173', 'https://bangla-logic.vercel.app'],
    credentials: true
}))
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6r4rx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});






async function run() {
    try {
        const blogsCollection = client.db('BanglaLogic').collection('Blogs')
        const usersCollection = client.db('BanglaLogic').collection('Users')


        // Blog add in mongoDB APi
        app.post('/addBlog', async (req, res) => {
            const addBlog = req.body;
            const result = await blogsCollection.insertOne(addBlog);
            res.send(result);
        })



        // Blogs Read & Show Data Clint Side .
        app.get('/blogs', async (req, res) => {
            // sort({ _id: -1 }).
            const result = await blogsCollection.find().toArray();
            // const result = await cursor.toArray();
            res.send(result)
        })



        //  Blog Details Show .......
        app.get('/blogs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await blogsCollection.findOne(query);
            res.send(result);


        });



        // Dashboard Blog Delete API
        app.delete('/blog/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await blogsCollection.deleteOne(query);
            res.send(result);
        })




        // Admin Login API
        app.post('/login', async (req, res) => {
            const { email, password } = req.body;

            // Admin Checking in MongoDB 
            const user = await usersCollection.findOne({ email, role: 'admin' });
            if (!user) return res.status(401).send('Unauthorized');

            // Password Matching
            if (user.password !== password) return res.status(401).send('Invalid credentials');

            // JWT Token Generate
            const token = jwt.sign({ email: user.email, role: user.role }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
            res.status(200).send({ token });
        });





        console.log("Pinged your deployment. Bangla Logic successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("Bangla Logic Server is Running")

})

app.listen(port, () => {
    console.log(`Bangla Logic Server is Running is on port :${port}`)

})