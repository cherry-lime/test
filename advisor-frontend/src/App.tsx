import { Routes, Route, Link} from "react-router-dom";
import AdminInterface from "./admin/AdminInterface";
import AssessorInterface from "./assessor/AssessorInterface";
import Home from "./Home";
import UserInterface from "./user/UserInterface";

function App() {
  return (
    <div className="App">
      <Link to="/"> Home </Link>
      <Link to="/user"> User </Link>
      <Link to="/assessor"> Assessor </Link>
      <Link to="/admin"> Admin </Link>

      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/user" element={ <UserInterface/> } />
        <Route path="/assessor" element={ <AssessorInterface/> } />
        <Route path="/admin" element={ <AdminInterface/> } />
      </Routes>
    </div>
  )
}

export default App;
