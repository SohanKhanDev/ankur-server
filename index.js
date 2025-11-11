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
    const interestCollection = db.collection("interest");
    const testimonialsCollection = db.collection("testimonials");

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

    /*** -------------*** INTEREST API :: [POST → INSERTONE] ***------------- ***/
    app.post("/interests/:id", async (req, res) => {
      try {
        const { id } = req.params;

        const interestId = new ObjectId();
        const interest = req.body;
        const newInterest = { _id: interestId, status: "Pending", ...interest };

        /*** -------------*** INSERT INTO INTEREST COLLECTION ***------------- ***/
        const interestInsert = await interestCollection.insertOne(newInterest); //inset in db

        /*** -------------*** ADD INTEREST INTO CROPS COLLECTION ***------------- ***/
        const objectId = new ObjectId(id);
        const filter = { _id: objectId };

        const updateDoc = { $push: { interests: newInterest } };

        const cropUpdate = await cropsCollection.updateOne(filter, updateDoc);

        res.send(cropUpdate, interestInsert.insertedId);
      } catch (error) {
        console.error("Error creating/checking user:", error);
        res.status(500).send({ message: "Internal server error." });
      }
    });

    /*** -------------*** INTEREST ADD INTO CROPS API :: [PATCH → UPDATEONE] ***------------- ***/
    app.patch("/interests/:id", async (req, res) => {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const filter = { _id: objectId };

      const result = await cropsCollection.findOne(filter);
      res.send(result);
    });

    /*** -------------*** INTEREST ACCPET API :: [PUT → UPDATEONE] ***------------- ***/
    app.put("/interests/accept", async (req, res) => {
      const interestId = req.query.interestId;
      const objectId = new ObjectId(interestId);
      const filter = { _id: objectId };

      /*** -------------*** GET INTEREST INFO FROM INTEREST COLLECTION ***------------- ***/
      const interest = await interestCollection.findOne(filter);
      const interestQty = interest.quantity;

      const updateDoc = { $set: { status: "Accepted" } };

      /*** -------------*** UPDATE INTEREST STATUS INTO INTEREST COLLECTION ***------------- ***/
      const interestUpdate = await interestCollection.updateOne(
        filter,
        updateDoc
      );

      /*** -------------*** UPDATE INTEREST STATUS INTO CROPS COLLECTION ***------------- ***/
      const cropUpdate = await cropsCollection.updateOne(
        { "interests._id": objectId },
        {
          $set: { "interests.$.status": "Accepted" },
          $inc: { quantity: -interestQty },
        }
      );

      res.send({ interestId, interestUpdate, cropUpdate });
    });

    /*** -------------*** INTEREST REJECT API :: [PUT → UPDATEONE] ***------------- ***/
    app.put("/interests/reject", async (req, res) => {
      const interestId = req.query.interestId;
      const objectId = new ObjectId(interestId);
      const filter = { _id: objectId };

      const updateDoc = { $set: { status: "Rejected" } };

      /*** -------------*** UPDATE INTEREST STATUS INTO INTEREST COLLECTION ***------------- ***/
      const interestUpdate = await interestCollection.updateOne(
        filter,
        updateDoc
      );

      /*** -------------*** UPDATE INTEREST STATUS INTO CROPS COLLECTION ***------------- ***/
      const cropUpdate = await cropsCollection.updateOne(
        { "interests._id": objectId },
        { $set: { "interests.$.status": "Rejected" } }
      );

      res.send({ interestId, interestUpdate, cropUpdate });
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

    /*** -------------*** INTEREST REJECT API :: [PUT → UPDATEONE] ***------------- ***/
    app.put("/users/edit", async (req, res) => {
      const email = req.query.email;
      const { name, image } = req.body;
      const filter = { email: email };

      const updateDoc = {
        $set: {
          name: name,
          image: image,
        },
      };

      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    /*** -------------*** TESTIMONIALS API :: [GET → FIND] ***------------- ***/
    app.get("/testimonials", async (req, res) => {
      const result = await testimonialsCollection.find().toArray();
      res.send(result);
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
