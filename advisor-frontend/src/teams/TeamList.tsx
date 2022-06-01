import React from "react";
import { Link, useLocation } from 'react-router-dom';
import Button from "../components/Button/Button";

function TeamList() {

    const location = useLocation();
    const data = location.state;

    return(
        <div>
            <p> {data} view </p>
            
            <Link to={`/${data}`} state={data}> Go back to {data} interface </Link>

            <h2> List of Teams </h2>

            {
                data === "assessor" && <Button name="Create New Team"/>
            }

            <br/>

            <Link to="/teams/a-team" state={data}> Go to Specific Team </Link>
        </div>
    );
}

export default TeamList;