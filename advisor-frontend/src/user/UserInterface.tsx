import React from "react";
import {Link, useLocation} from "react-router-dom";

function UserInterface() {
    const location = useLocation();
    const data = location.state;
    
    return(
        <div>
            <h2> User Interface Here </h2>

            <Link to="/user/individual-evals" state={data}> Individual Evaluations </Link>
            <br/>
            <Link to="/teams" state={data}> Teams </Link>

            <h3>Progress</h3>

            <h3>Notifications</h3>
        </div>
    );
}

export default UserInterface;