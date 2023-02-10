import { stringify } from "querystring";
import React from "react";

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
export const ProfileData = (props:any) => {
    // console.log(props.graphData);
    const data = props.graphData.text

    return (
        <div id="profile-div">
            {/* <p>
            <strong>出社管理表データ</strong><br />
            {JSON.stringify(data,null,2)}
            </p> */}
            <p><strong>First Name: </strong> {props.graphData.givenName}</p>
            <p><strong>Last Name: </strong> {props.graphData.surname}</p>
            <p><strong>Email: </strong> {props.graphData.userPrincipalName}</p>
            <p><strong>Id: </strong> {props.graphData.id}</p>
        </div>
    );
};