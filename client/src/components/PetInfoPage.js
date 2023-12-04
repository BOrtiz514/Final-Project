import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import backgroundImage from "./assets/annie-spratt-njUFzc17ki8-unsplash.jpg";

const PetPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [lastFedDate, setLastFedDate] = useState("");
  const navigate = useNavigate();
  const [lastFeedAction, setLastFeedAction] = useState(null)

  useEffect(() => {
    fetch(`/api/pets/id/${id}`)
      .then((response) => response.json())
      .then((data) => setPet(data))
      .catch((error) =>
        console.error("Error retrieving individual pet data:", error)
      );
  }, [id]);

  const handleRemovePet = async () => {
    try {
      const response = await fetch(`/api/pets/id/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Success message
        // Redirect to the pets list page after removing the pet
        navigate("/pets");
      } else {
        console.error(data.message); // Error message
      }
    } catch (error) {
      console.error("Error removing pet:", error);
    }
    setLastFeedAction(null);
  };

  const handleLastFedChange = (event) => {
    setLastFedDate(event.target.value);
  };
  
  const handleFeedPet = () => {
    if (lastFedDate) {
      // Update the last fed date in the database
      fetch(`/api/pets/id/${id}/update-last-fed`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lastFed: lastFedDate }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Last fed date updated successfully");
          } else {
            console.error("Failed to update last fed date:", data.message);
          }
        })
        .catch((error) =>
          console.error("Error updating last fed date:", error)
        );
    } else {
      console.warn("Please select a valid last fed date");
    }
    setLastFeedAction(Date.now());
  };

  if (!pet) {
    return <div>Loading...</div>;
  }
  const convertFeedingFrequencyToMilliseconds = (feedingFrequency) => {
    const frequencyMap = {
      "Once a day": 1,
      "Once every other day": 2,
      "Once a week": 7,
      "Once every 2 weeks": 14,
      "Once a month": 30,
    };
  
    const days = frequencyMap[feedingFrequency];
    
    if (days !== undefined) {
      return days * 24 * 60 * 60 * 1000;
    } else {
      // Handle unknown feeding frequency
      console.error(`Unknown feeding frequency: ${feedingFrequency}`);
      return 0; // Return 0 or another default value
    }
  };
  const timeSinceLastFed = Date.now() - new Date(pet.lastFed || 0);
  const feedingFrequencyString = "Once every other day"; // Replace with pet.feedingFrequency
  const feedingFrequencyInMilliseconds = convertFeedingFrequencyToMilliseconds(feedingFrequencyString);
  const healthThreshold = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
  const healthBarColor = lastFeedAction ? (timeSinceLastFed > healthThreshold ? 'red' : 'green') : 'red';

  return (
    <Wrapper>
      <h1>{pet.name}</h1>
      <p><span>SPECIES: </span> {pet.species}</p>
      <p><span>FEEDING FREQUENCY:</span> {pet.feedingFrequency}</p>
      <p>
        <span>LAST FED:</span>{" "}
        {lastFeedAction ? new Date(lastFeedAction).toLocaleString() : "Not fed yet"}
      </p>
    <PageButtons>
      <button onClick={handleFeedPet}>Feed</button>
    <UpdatePet>
      <Link to={`/pets/${id}/update`} className="update-pet-button">Update Info</Link>
    </UpdatePet>
      <button onClick={handleRemovePet}>Release</button>
    </PageButtons>
      <div className="health-bar" style={{ backgroundColor: healthBarColor }}>HEALTH BAR</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: #2b2a4c;
    text-decoration: underline;
    padding: 20px;
    margin-top: 20px;
  }

  p {
    color: black;
    font-size: 1.4em;
  }

  span{
    font-weight: bold;
    color: #2b2a4c;
  }

  .html-label{
    font-weight: bold;
    color: #2b2a4c;
    margin-bottom: 10px;
    text-decoration: underline;
  }

  .date-input{
    font-size: 1.3em;
    border-radius: 5px;
    border: 1.5px solid black;
  }

  button {
    margin: 50px;
    padding: 10px;
    font-size: 1.4em;
    background-color: #706233;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #d32f2f; 
    }
  }

  .health-bar {
  height: 30px;
  width: 30%;
  border-radius: 10px;
  text-align: center;
  color: white;
  padding-top: 10px;
}
`;

const PageButtons = styled.div`
`

const UpdatePet = styled.button`

.update-pet-button{
  text-decoration: none;
  color: white;

}
`

export default PetPage;
