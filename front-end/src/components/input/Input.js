/*
Create a new Input. (REQUIRED INPUT)

    Props:
        - placeholder as text
        - type
        - id
        - name
        - minLength (optional)
        - maxLength (optional)
        - width (optional)
        - heigth (optional)
        - color (optional)

Example:
    <Input placeholder="Prueba" type="text" id="username" name="username" minlength="3" maxlength="10"/>
*/

const Input = (props) => {
    
    const style = {
        width: props.width ? props.width : "250px",
        border: "2px solid grey",
        borderRadius: "8px",
        padding: "12px 10px",
        heigth: props.heigth ? props.heigth : "30px",
        color: props.color ? props.color : "#000",
    }

    return (
        <input
            style={style}
            className={props.className ? props.className : null}
            type={props.type}
            id={props.id}
            name={props.name}
            required
            minLength={ props.minLength ? props.minLength : "3" }
            maxLength={ props.maxLength ? props.maxLength : "100" }
            placeholder={props.placeholder}
            onChange={props.onChange ? props.onChange : null}
            />
    );
}

export default Input;