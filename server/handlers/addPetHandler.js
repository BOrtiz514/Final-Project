const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const handleAddPet = async (req, res) => {
  let client;

  try {
    client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const { name, species, feedingFrequency, email } = req.body;

    // Create a new ObjectId for the pet
    const petId = new ObjectId();

    // Insert the pet document into the 'pets' collection
    await client.db("final-project").collection("pets").insertOne({
      _id: petId,
      name,
      species,
      lastFed: null,
      feedingFrequency,
    });

    // Update the user document with the new pet's _id
    await client
      .db("final-project")
      .collection("users")
      .updateOne({ email }, { $push: { pets: petId } });

    res.json({ message: "Pet added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      await client.close();
    }
  }
};

module.exports = { handleAddPet };
