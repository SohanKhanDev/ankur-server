/*** -------------*** EXPRESS ***------------- ***/
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

/*** -------------*** CORS ***------------- ***/
const cors = require("cors");
app.use(cors());

/*** -------------*** EVN ***------------- ***/
require("dotenv").config();

/*** -------------*** MONGODB :: CONNECTION SETUP ***------------- ***/
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ydd3oa0.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    /*** -------------*** MONGODB :: DATABASE & COLLECTION SETUP ***------------- ***/
    const db = client.db("ankur_DB");
    const usersCollection = db.collection("users");

    /*** -------------*** MONGODB :: API ***------------- ***/

    /*** -------------*** USERS API :: [POST → FINDONE] ***------------- ***/
    app.post("/users", async (req, res) => {
      try {
        const newUser = req.body;
        const filter = { email: newUser.email };

        const existingUser = await usersCollection.findOne(filter); //check in db

        if (existingUser) {
          return res.send({ message: "exists" });
        }

        const result = await usersCollection.insertOne(newUser); //inset in db
        res.send(result);
      } catch (error) {
        console.error("Error creating/checking user:", error);
        res.status(500).send({ message: "Internal server error." });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
