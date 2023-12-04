const express = require("express");
const { handleTest } = require("./handlers/testHandler");
const { handleSignUp, handleSignIn } = require("./handlers/authHandler");
const { handleAddPet } = require("./handlers/addPetHandler");
const { handleGetPetById } = require("./handlers/getPetInfoHandler")
const { handleGetPets } = require("./handlers/handleGetPet")
const { handleRemovePet } = require("./handlers/removePetHandler")
const { handleUpdatePet } = require('./handlers/updatePetHandler');
const { updateLastFedHandler } = require('./handlers/updateLastFedHandler');

const app = express();
app.use(express.json());

const PORT = 8000;

app.get("/api/test", handleTest);
app.get("/api/pets/:email", handleGetPets);
app.get("/api/pets/id/:id", handleGetPetById);
app.post("/api/signup", handleSignUp);
app.post("/api/signin", handleSignIn);
app.post("/api/addpet", handleAddPet);
app.delete("/api/pets/id/:id", handleRemovePet);
app.put('/api/pets/id/:id/update', handleUpdatePet)
app.put('/api/pets/id/:id/update-last-fed', updateLastFedHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


