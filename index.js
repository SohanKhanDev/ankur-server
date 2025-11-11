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
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const cropsCollection = db.collection("crops");

    /*** -------------*** MONGODB :: API ***------------- ***/

    /*** -------------*** CROPS API :: [GET → FIND] ***------------- ***/
    app.get("/allCrops", async (req, res) => {
      const result = await cropsCollection.find().toArray();
      res.send(result);
    });

    /*** -------------*** CROPS SEARCH API :: [GET → FIND] ***------------- ***/
    app.get("/cropsSearch", async (req, res) => {
      const searchText = req.query.search;
      console.log(searchText);
      const result = await cropsCollection
        .find({ name: { $regex: searchText, $options: "i" } })
        .toArray();
      res.send(result);
    });

    /*** -------------*** CROPS DETAILS API :: [GET → FINDONE] ***------------- ***/
    app.get("/crops/:id", async (req, res) => {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const filter = { _id: objectId };

      const result = await cropsCollection.findOne(filter);
      res.send(result);
    });

    /*** -------------*** USERS API :: [POST → FINDONE → INSERTONE] ***------------- ***/
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
