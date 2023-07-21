import { Link } from "react-router-dom";

import "./NotFound.css"

const NotFound = (props) => {
    return (
        <div className="container-notFound">
            <div class="mars-notFound"></div>
            <img src="https://assets.codepen.io/1538474/404.svg" class="logo-404-notFound" />
            <img src="https://assets.codepen.io/1538474/meteor.svg" class="meteor-notFound" />
            <p class="title-notFound">Oh no!!</p>
            <p class="subtitle-notFound">
                You’re either misspelling the URL <br /> or requesting a page that's no longer here.
            </p>
            <div align="center">
                <Link class="btn-back-notFound" to={"/login"}>Back to previous page</Link>
            </div>
        </div>
    );
}

export default NotFound;