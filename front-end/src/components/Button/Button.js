/*
Create a new button.

    Props:
        - text
        - width (optional)
        - border (optional)
        - borderRadius (optional)
        - color (optional)
        - bgColor (optional)

Example:
    <Button text="Log In" width="300px" bgColor="pink"/>
*/

const Button = (props) => {

    const style = {
        width: props.width ? props.width : "250px",
        border: props.border ? props.border : "transparent",
        borderRadius: props.borderRadius ? props.borderRadius : "8px",
        color: props.color ? props.color : "#fff",
        backgroundColor: props.bgColor
    }

    return (
        <button
            className={props.className ? props.className : null}
            type="submit"
            style={style}>
                {props.text}
        </button>
    );
}

export default Button;