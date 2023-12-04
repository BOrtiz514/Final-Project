const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const handleSignUp = async (req, res) => {
  let client;

  try {
    client = new MongoClient(MONGO_URI, options);
    await client.connect();

    // Check if the user with the same email already exists
    const existingUser = await client
      .db("final-project")
      .collection("users")
      .findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Save the user to the database
    await client.db("final-project").collection("users").insertOne({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      pets: [],
    });

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      await client.close();
    }
  }
};

const handleSignIn = async (req, res) => {
  let client;

  try {
    client = new MongoClient(MONGO_URI, options);
    await client.connect();

    // Retrieve the user from the database
    const user = await client
      .db("final-project")
      .collection("users")
      .findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the given password with the hashed password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "User signed in successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      await client.close();
    }
  }
};

module.exports = { handleSignUp, handleSignIn };
