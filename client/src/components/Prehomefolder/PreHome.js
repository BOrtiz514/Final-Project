import styled from "styled-components"
import { Link } from "react-router-dom"
import backgroundImage from '../assets/eric-dsk-7JWWKE7i4qo-unsplash.jpg'

const PreHome = () => {

    return(
        <BackgroundImage>
        <Border>
            <h1>Welcome to Your Compendium of Beasts </h1>
            <h2>To Start, Please Sign up. </h2>
            <Link to="/signup" className="LinkButtons">Sign Up</Link>
            <Link to="/signin" className="LinkButtons">Sign In</Link>
            <p>Already have an account? Please sign in.</p>
        </Border>
        </BackgroundImage>
    )
}

export default PreHome

const BackgroundImage = styled.div`
background: url(${backgroundImage});
background-size: cover;
background-position: center;
height: 100vh;
display: flex;
flex-direction: column;
align-items: flex-end;
`

const Border = styled.div`
background-color: rgba(255, 255, 255, 0.8);
width: 50%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px;
text-align: center;


h1{
position: absolute;
margin-bottom: 80vh;
color: #2B2A4C;
font-size: 3em;
}

h2{
    position: absolute;
    margin-bottom: 50vh;
    color: #2B2A4C;
    font-size: 1.2em;
    font-weight: lighter;
    text-decoration: underline;
}

.LinkButtons{
    padding: 20px 40px 20px 40px;
    border-radius: 5px;
    background-color: #557C55;
    text-decoration: none;
    margin-top: 20px;
    margin-bottom: 20px;
    transition: 0.2s ease-in-out;
    color: white;
    font-size: 1.5em;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

    &:hover{
        background-color: #A6CF98;
        transform: scale(1.2);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.5);
    }
}

p{
    position: absolute;
    margin-top: 50vh;
    color: #2B2A4C;
    font-size: 1.2em;
    font-weight: lighter;
    text-decoration: underline;
}

`
