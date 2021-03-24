import React from 'react'
import ReactDom from "react-dom"
import './index.css'

const ProgressBar = (props) => { 
// function ProgressBar(props){
    const [style, setStyle] = React.useState({});
    
    setTimeout(() => {
        const newStyle = {
            opacity: 1,
            color: '#fff',
            width: `${props.value}%`,
        }
        
        setStyle(newStyle);
    }, 200);

    return(
        <div className="progress">
            <div className="ProgressBar" style={style}>
                {props.value}%
            </div>
        </div>
    )
}

          
class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            percentage: 0,
            firstName: null,
            lastName: null, 
            email: null,
            password: null,
            errors: {
                firstName: '', 
                lastName: '', 
                email: '',
                password: '',
            },
            isValid: {
                firstName: false,
                lastName: false, 
                email: false,
                password: false,
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        const validEmailRegex = RegExp(
          /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        );
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        const { name, value } = event.target;
        let errors = this.state.errors;
        let isValid = this.state.isValid;
        var percentage= this.state.percentage

        switch (name) {
            case 'firstName':
                isValid.firstName= value.length < 1? false : true;
                break;
            case 'lastName':
                isValid.lastName= value.length < 1? false : true;
                break;
            case 'email':
                isValid.email= !pattern.test(value)? false : true;
                errors.email= !pattern.test(value)? 'Please enter valid email address!' : '';
                // errors.email= validEmailRegex.test(value)? '' : 'Please enter valid email address!';
                break;
            case 'password':
                isValid.password= value.length < 4? false : true;
                errors.password= value.length < 4? 'Password must be at least 4 characters long!' : '';
                break;

        }
        this.setState({errors, [name]: value});
        this.setState({isValid});
        var validNum = Number(isValid.firstName) + Number(isValid.lastName) + Number(isValid.email) + Number(isValid.password); 
        if (validNum === 4) {
            percentage= 100; 
        } else if (validNum ===3) {
            percentage= 75;
        } else if (validNum ===2) {
            percentage= 50;
        } else if (validNum ===1) {
            percentage= 25;
        } else {
            percentage= 0;
        }
        this.setState({percentage: percentage});
    }

    render() {
        const {errors} = this.state;
        const {isValid} = this.state;
        var percentage = this.state.percentage;
        return (
            <div className="App">               
                <h1 style={{color: '#F2709C'}}>Sign Up</h1>
                <ProgressBar value={this.state.percentage}/>
                <form className="form">
                    <label>
                        First Name:
                        <input type="text" class="form_input" placeholder="Enter your first name" name="firstName" value={this.state.firstName} onChange={this.handleChange} />                     
                    </label>

                    <label>
                        Last Name:
                        <input type="text" class="form_input" placeholder="Enter your last name" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                    </label>

                    <label>
                        Email:
                        <input type="email" class="form_input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <div className='error'> {errors.email}</div>

                    <label>
                        Password:
                        <input type="password" class="form_input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <div className='error'> {errors.password}</div>

                    <input type="submit" class="button" value="Sign Up" />
                    <p className="signin">Already registered <a href="#">sign in?</a></p>
                </form>
            </div>
        );
    }
}

ReactDom.render(
    <App />,
    document.getElementById('root')
);
