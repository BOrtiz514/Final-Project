const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const handleGetPetById = async (req, res) => {
  const { id } = req.params;
  let client;

  try {
    client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const pet = await client
      .db("final-project")
      .collection("pets")
      .findOne({ _id: new ObjectId(id) });

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.json(pet);
  } catch (error) {
    console.error("Error retrieving individual pet data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) {
      await client.close();
    }
  }
};

module.exports = { handleGetPetById };