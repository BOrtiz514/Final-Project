import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from './assets/bozhin-karaivanov-nuq6SLFWIL0-unsplash.jpg'

const NavBar = ({ user, onLogout }) => {

    return (
        <>
        {user && (
            <StyledNavBar>
                <Link to="/pets" className='NarBarButtons'>BESTIARY</Link>
                <Link to="/pets/add" className='NarBarButtons'>ADD CREATURE</Link>
                <button onClick={onLogout}>LOGOUT</button>
            </StyledNavBar>  
        )}  
        </>
    )
}

const StyledNavBar = styled.header`
background-image: url(${backgroundImage});
margin: 0;
padding-left: 3vw;
padding-right: 3vw;
padding-top: 2vh;
padding-bottom: 3vh;
display: flex;
justify-content: space-between;
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.9);


.NarBarButtons{
text-decoration: none;
color: white;
margin-top: 10px;
padding: 15px;
font-size: 1.5em;
border-radius: 5px;
font-weight: bold;
transition: 0.2s ease-in-out;
background-color: #706233;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

    &:hover{
        background-color: #706233;
        transform: scale(1.2);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.5);
    }
}

button{
    background-color: #706233;
    width: 130px;
    margin-top: 10px;
    font-size: 1.5em;
    padding: 15px;
    border-radius: 5px;
    border-style: none;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

    &:hover{
        transform: scale(1.2);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.5);
    }
}
`


export default NavBar