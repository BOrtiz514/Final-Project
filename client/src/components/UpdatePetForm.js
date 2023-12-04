import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import backgroundImage from "./assets/loren-biser-irDMyeyV4QE-unsplash.jpg";

const UpdatePetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    feedingFrequency: "",
  });

  useEffect(() => {
    // Fetch the current pet information and set it in the form data state
    fetch(`/api/pets/id/${id}`)
      .then((response) => response.json())
      .then((data) => setFormData({ ...data }))
      .catch((error) => console.error("Error retrieving pet data:", error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send update request to the server
      const response = await fetch(`/api/pets/id/${id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Success message
        navigate(`/pets/${id}`); // Redirect to the pet info page after update
      } else {
        console.error(data.message); // Error message
      }
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  return (
    <Wrapper>
      <FormContainer>
        <h1>UPDATE CREATURE INFO</h1>
        <form onSubmit={handleSubmit} className="update-form">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />

          <label htmlFor="species" className="form-label">
            Species:
          </label>
          <input
            type="text"
            id="species"
            name="species"
            value={formData.species}
            onChange={handleChange}
            className="form-input"
            required
          />

          <label htmlFor="feedingFrequency" className="form-label">
            Feeding Frequency:
          </label>
          <input
            type="text"
            id="feedingFrequency"
            name="feedingFrequency"
            value={formData.feedingFrequency}
            onChange={handleChange}
            className="form-input"
            required
          />
          <button type="submit" className="form-button">
            Update Pet
          </button>
        </form>
      </FormContainer>
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
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  border: 2px solid #2b2a4c;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px;

  h1 {
    font-size: 2.5em;
    color: #2b2a4c;
  }

  .update-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-label {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    font-weight: bold;
    color: #2b2a4c;
  }

  .form-input {
    width: 250px;
    padding: 8px;
    color: #2b2a4c;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border: none;
    border-radius: 4px;
  }

  .form-button {
    margin-top: 30px;
    width: 250px;
    padding: 10px;
    font-size: 1.2em;
    font-weight: bold;
    color: #2b2a4c;
    background-color: #557c55;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    color: white;
    transition: 0.1s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

    &:hover {
      background-color: #a6cf98;
    }
  }
`;
export default UpdatePetForm;
