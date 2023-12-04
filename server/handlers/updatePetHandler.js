const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const handleUpdatePet = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { id } = req.params;
  const petData = req.body;

  try {
    await client.connect();
    // Update the pet document in the 'pets' collection
    const result = await client
      .db("final-project")
      .collection("pets")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name: petData.name,
            species: petData.species,
            feedingFrequency: petData.feedingFrequency,
          },
        }
      );

    if (result.matchedCount > 0) {
      res.status(200).json({ message: "Pet updated successfully." });
    } else {
      res.status(404).json({ message: "Pet not found." });
    }
  } catch (error) {
    console.error("Error updating pet:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { handleUpdatePet };
