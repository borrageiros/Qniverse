import { useState } from "react";


// RESULTS
import victory from "../../images/victory.png";
import defeat from "../../images/defeat.png";

// PLANETS
import Mercury from "../../images/planets/Mercury.png";
import Venus from "../../images/planets/Venus.png";
import Earth from "../../images/planets/Earth.png";
import Mars from "../../images/planets/Mars.png";
import Jupiter from "../../images/planets/Jupiter.png";
import Saturn from "../../images/planets/Saturn.png";
import Uranus from "../../images/planets/Uranus.png";
import Neptune from "../../images/planets/Neptune.png";


import "./FinalResults.css"


const FinalResults = () => {

    const [result, setResult] = useState(
        {
            "player1": {
                "username": "OSKAR",
                "elo": 3000,
                "eloPlanet": "Mars",
                "win": true
            },
            "player2": {
                "username": "JUANCITO",
                "elo": 40,
                "eloPlanet": "Mercury",
                "win": false
            }
        }
    );

    function getPlanetImg(planet) {
        switch(planet){
            case "Mercury": return Mercury;
            case "Venus": return Venus;
            case "Earth": return Earth;
            case "Mars": return Mars;
            case "Jupiter": return Jupiter;
            case "Saturn": return Saturn;
            case "Uranus": return Uranus;
            case "Neptune": return Neptune;
        }
    };

    return (
        <div className="main-container-final-results">

            {result.player1.win ? <img className="result" src={victory} /> : <img className="result" src={defeat} />}

            <div className={result.player1.win ? "player1 winner" : "player1"}>
                <img src={require("../../images/basic_user_image.png")} alt="User image" />
                <div className="info">
                    <p>{result.player1.username}</p>
                    <p>{result.player1.elo}★</p>
                </div>
                <img src={getPlanetImg(result.player1.eloPlanet)} alt="Planet" />
                <p>{result.player1.eloPlanet}</p>
            </div>

            <div className={result.player2.win ? "player2 winner" : "player2"}>
            <img src={require("../../images/basic_user_image.png")} alt="User image" />
                <div className="info">
                    <p>{result.player2.username}</p>
                    <p>{result.player2.elo}★</p>
                </div>
                <img src={getPlanetImg(result.player2.eloPlanet)} alt="Planet" />
                <p>{result.player2.eloPlanet}</p>
            </div>
        </div>
    );
}

export default FinalResults;