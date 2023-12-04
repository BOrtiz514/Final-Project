const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const handleGetPets = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const userEmail = req.params.email;

    const user = await client
      .db("final-project")
      .collection("users")
      .findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userPets = await client
      .db("final-project")
      .collection("pets")
      .find({ _id: { $in: user.pets } })
      .toArray();

    res.json(userPets);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    client.close();
  }
};

module.exports = { handleGetPets };
