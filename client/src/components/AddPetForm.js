import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import backgroundImage from "./assets/loren-biser-irDMyeyV4QE-unsplash.jpg";


const AddPetForm = ( {email}) => {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    feedingFrequency: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/addpet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Success message
        navigate("/pets");
      } else {
        console.error(data.message); // Error message
      }
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  return (
    <Wrapper>
      <FormContainer>
        <h1>REGISTER A CREATURE</h1>
        <form onSubmit={handleSubmit} className="signin-form">
          <label className="form-label">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="form-label">
            Species:
            <input
              type="text"
              name="species"
              value={formData.species}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="form-label">
            Feeding Frequency:
            <select
              name="feedingFrequency"
              value={formData.feedingFrequency}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="Once a day">Once a day</option>
              <option value="Once every other day">Once every other day</option>
              <option value="Once a week">Once a week</option>
              <option value="Once every 2 weeks">Once every 2 weeks</option>
              <option value="Once a month">Once a month</option>
            </select>
          </label>
          <button type="submit" className="form-button">
            Add Creature
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

  .signin-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    font-weight: bold;
    color: #2b2a4c;
  }

  .form-input {
    width: 250px;
    padding: 8px;
    margin-top: 4px;
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
export default AddPetForm;
