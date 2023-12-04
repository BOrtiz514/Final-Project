import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Pets from "./Pets";
import SignUp from "./Prehomefolder/SignUp";
import SignIn from "./Prehomefolder/SignIn";
import { useUser } from "./UserContext"
import PreHome from "./Prehomefolder/PreHome";
import NavBar from "./NavBar";
import AddPetForm from "./AddPetForm";
import PetPage from "./PetInfoPage";
import UpdatePetForm from "./UpdatePetForm";

const App = () => {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<PreHome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/pets"
          element={user ? <Pets email={user.email}/> : <Navigate to="/" />}
        />
        <Route 
          path="/pets/:id" 
          element={user ? <PetPage email={user.email}/> : <Navigate to="/" />} />
        <Route 
        path="/pets/add" 
        element={user ? <AddPetForm email={user.email} /> : <Navigate to="/" />} 
        />
        <Route 
        path="/pets/:id/update" 
        element={user ? <UpdatePetForm email={user.email}/> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
};


export default App;
