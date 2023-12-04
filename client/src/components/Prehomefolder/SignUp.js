import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../assets/clark-young-QdRnZlzYJPA-unsplash.jpg'

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification("Successssfully signed up!")


        setTimeout(() => {
          navigate("/signin");
        }, 3000);
        console.log(data.message); // Success message
      } else {
        console.error(data.message); // Error message
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  useEffect(() => {
    // Clear the notification after 3 seconds
    const notificationTimer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => {
      clearTimeout(notificationTimer);
    };
  }, [notification]);

  return (
    <Wrapper>
      <FormContainer>
      <h2>Sign Up</h2>
      {notification && <Notification>{notification}</Notification>}
      <form onSubmit={handleSubmit} className="signup-form">
        <label className="form-label">
          Username: 
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
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
        <label className="form-label">
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
        <button 
          type="submit"
          className="form-button"
          >Sign Up</button>
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
border: 1px solid #2B2A4C;
background-color: rgba(255, 255, 255, 0.7);
display: flex;
flex-direction: column;
align-items: center;
padding: 80px;

h2{
  font-size: 2.5em;
  color: #2B2A4C;
}


.signup-form{
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

const Notification = styled.div`
  background-color: #557C55;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;


export default SignUp;
