const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const updateLastFedHandler = async (req, res) => {
  let client;

  try {
    client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const { id } = req.params;
    const { lastFed } = req.body;

    const result = await client
      .db("final-project")
      .collection("pets")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { lastFed: new Date(lastFed) } }
      );

    if (result.modifiedCount === 1) {
      res.json({
        success: true,
        message: "Last fed date updated successfully",
      });
    } else {
      res.status(404).json({ success: false, message: "Pet not found" });
    }
  } catch (error) {
    console.error("Error updating last fed date:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { updateLastFedHandler };
