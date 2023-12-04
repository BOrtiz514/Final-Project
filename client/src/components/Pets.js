import { useState, useEffect } from "react";
import styled from "styled-components";
import backgroundImage from "./assets/annie-spratt-njUFzc17ki8-unsplash.jpg";
import { useUser } from "./UserContext";
import { Link } from "react-router-dom";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // GET request to retrieve user-specific pet information
      fetch(`/api/pets/${user.email}`)
        .then((response) => response.json())
        .then((data) => {
          setPets(data);
        })
        .catch((error) =>
          console.error("Error retrieving user-specific pet data:", error)
        );
    }
  }, [user]);


  return (
    <Wrapper>
      <h1>YOUR LIST OF CREATURES</h1>
      <PetList>
        {pets.map((pet) => (
          <PetCard key={pet._id}>
            <Link to={`/pets/${pet._id}`} className="card-link">
              <h2>{pet.name}</h2>
            </Link>
            <p><span>Species: </span>{pet.species}</p>
            <p><span>Feeding Frequency:</span> {pet.feedingFrequency}</p>
          </PetCard>
        ))}
      </PetList>
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

  h1 {
    color: #2b2a4c;
    text-align: center;
    margin-top: 20px;
    text-decoration: underline;
    padding: 20px;
  }
`;

const PetList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PetCard = styled.div`
  border: 1px solid #ccc;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  max-width: 300px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

  h2 {
    color: #2b2a4c;
    margin-bottom: 10px;
    &:hover{
      color: lightblue;
    }
  }

  p {
    color: #2b2a4c;
  }

  .card-link{
    color: #2b2a4c;
    &:hover{
      color: lightblue;
    }
  }

  span{
    font-weight: bold;
  }
`;

export default Pets;