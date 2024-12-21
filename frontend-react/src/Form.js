import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function MyForm() {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        setErrors(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    const emailPattern = new RegExp(
        '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    

    return (
        <form onSubmit={handleSubmit}>
            <label>Enter your name:
                <input 
                    type="text" 
                    name="username" 
                    value={inputs.username || ""} 
                    onChange={handleChange}
                />
            </label>
            <label>Enter your emailllll:
                <input 
                    type="text" 
                    name="email" 
                    value={inputs.email || ""} 
                    onChange={handleChange}
                />
                {errors.email && <p>Your email is invalid</p>}
            </label>
            <input type="submit" />
        </form>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);

export default MyForm;