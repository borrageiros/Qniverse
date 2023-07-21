/*
Create a new card for searched user.

    Props:
        - text : Name of the searched user
        - width (optional)
        - bgColor (optional)
        - onClick (optional)

Example:
    <div text="Juan" width="300px" bgColor="white" </div>
*/

import { useNavigate } from "react-router-dom";
import "./SearchedUser.css"

const SearchedUser = (props) => {

    const navigate = useNavigate();
    const style = {
        width: props.width,
        backgroundColor: props.bgColor
    }

    const onClickUserSearched = (e) => {
        e.preventDefault();
        navigate("/profile/" + props.text);
    }

    return (
        <div className="default-searchedUser bottom" type="submit" style={style} onClick={onClickUserSearched}>
            <img src={props.img}/>
            <p>{props.text}</p>
        </div>
    );
}

export default SearchedUser;