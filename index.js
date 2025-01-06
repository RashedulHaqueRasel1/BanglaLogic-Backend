const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



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


        // Blogs Read & Show Data Clint Side .
        app.get('/blogs', async (req, res) => {
            const cursor = blogsCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })


        // Push Data MongoDB
        // app.post('/blogs', async (req, res) => {
        //     const blogs = req.body;
        //     blogs.cost= parseInt(blogs.cost)
        //     // console.log(blogs)
        //     const result = await blogsCollection.insertOne(blogs);
        //     res.send(result)
        // })




         // Delete Single Data ..
        // app.delete('/blogs/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) };
        //     const result = await blogsCollection.deleteOne(query);
        //     res.send(result);
        // })


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