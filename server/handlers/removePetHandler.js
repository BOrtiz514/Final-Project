const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const handleRemovePet = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const { id } = req.params;

    // Validate if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid pet ID format" });
    }

    const result = await client
      .db("final-project")
      .collection("pets")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return res.json({ message: "Pet removed successfully" });
    } else {
      return res.status(404).json({ message: "Pet not found" });
    }
  } catch (error) {
    console.error("Error removing pet:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.close();
  }
};

module.exports = { handleRemovePet };
