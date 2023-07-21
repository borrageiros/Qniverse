/*
Loading Spinner.

    Props:
        - size (1 to 9)

Example:
    <LoadingSpinner size="4"/>

*/

import "./LoadingSpinner.scss"

const LoadingSpinner = (props) => {

    function calculateTranslate(size) {
        switch (size){
            case "1": return "-1350px, -1350px";
            case "2": return "-600px, -600px";
            case "3": return "-350px, -350px";
            case "4": return "-220px, -220px";
            case "5": return "-150px, -150px";
            case "6": return "-100px, -100px";
            case "7": return "-60px, -60px";
            case "8": return "-30px, -30px";
            case "9": return "-15px, -15px";
        }
    }

    const style = { // Scale to the size given by props and center it according to that size (Only if props.size is given)
        transform: props.size ? "scale(0."+props.size+") translate("+calculateTranslate(props.size)+")" : null
    }

    return (
        <div className="spinner" style={style}>
            <div className="planet">
                <div className="ring"></div>
                    <div className="cover-ring"></div>
                <div className="spots">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>

                </div>
            </div>
            {/* TEXT BENEATH THE PLANET */}
            <p>loading</p>
        </div>
    );
}

export default LoadingSpinner;