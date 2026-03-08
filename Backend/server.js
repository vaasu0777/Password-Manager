import { MongoClient , ObjectId } from "mongodb"
import bodyParser from "body-parser"
import express from "express"
import dotenv from "dotenv"
dotenv.config({ path: "c:\\Users\\Ishika\\Coding-by-Vaasu\\password-manager\\Backend\\.env" })
import cors from "cors"

// Connection URL
const url = process.env.MONGO_URL;
const client = new MongoClient(url);

// Database Name
const dbName = process.env.DB_NAME;
const app = express();
const port = 3000;

try {
    client.connect();
    console.log("Successfully connected to Mongodb");
}
catch (err) {
    console.log(err);
}

app.use(cors());
app.use(bodyParser.json());

// Get all the passwords
app.get("/", async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection("passwords")
    const result = await collection.find({}).toArray();
    res.json(result);     
})

// Save a password
app.post("/", async (req, res) => {
    const password = req.body;
    const db = client.db(dbName)
    const collection = db.collection("passwords")
    await collection.insertOne(password)
    res.json({ message: "Mission acomplished 🗿🗿👍" })
})

// Delete a password
app.delete("/", async (req, res) => {
    const password = req.body;
    const db = client.db(dbName)
    const collection = db.collection("passwords")
    await collection.deleteOne(password)
    res.json({ message: "Mission acomplished 🗿🗿👍" })
})

//Edit a password
app.put("/", async (req, res) => {
    const passwordObj = req.body;
    const db = client.db(dbName);
    const collection = db.collection("passwords");

    await collection.updateOne(
        { _id: new ObjectId(passwordObj._id) },  // IMPORTANT
        {
            $set: {
                site: passwordObj.site,
                username: passwordObj.username,
                password: passwordObj.password
            }
        }
    );

    res.json({ message: "Mission acomplished 🗿🗿👍" });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})