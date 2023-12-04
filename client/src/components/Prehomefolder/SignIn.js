import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext"
import styled from "styled-components";
import backgroundImage from '../assets/clark-young-QdRnZlzYJPA-unsplash.jpg'

const SignIn = () => {
    const { signIn } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Send sign-in request to the server
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/pets");
        console.log(data.message); // Success message
        signIn({ email: formData.email });
      } else {
        console.error(data.message); // Error message
      }
    } catch (error) {
      console.error("Error during signin:", error);
    }
  };
  return (
    <Wrapper>
      <FormContainer>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <label className="form-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
        <label className="form-label">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
        <button 
        type="submit"
        className="form-button"
        >Sign In</button>
      </form>
      </FormContainer>
    </Wrapper>
  );
};


const Wrapper = styled.div`
background: url(${backgroundImage});
background-size: cover;
background-position: center;
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`

const FormContainer = styled.div`
border: 2px solid #2B2A4C;
background-color: rgba(255, 255, 255, 0.7);
display: flex;
flex-direction: column;
align-items: center;
padding: 80px;

h2{
  font-size: 2.5em;
  color: #2B2A4C;
}

.signin-form{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-label{
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  font-weight: bold;
  color: #2B2A4C;
}

.form-input{
  width: 250px;
padding: 8px;
margin-top: 4px;
color: #2B2A4C;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
border: none;
border-radius: 4px;
}

.form-button{
  margin-top: 30px;
  width: 250px;
  padding: 10px;
  font-size: 1.2em;
  font-weight: bold;
  color: #2B2A4C;
  background-color: #557C55;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: white;
  transition: 0.1s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover{
    background-color: #A6CF98;
  }
}
`


export default SignIn;
