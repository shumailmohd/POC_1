import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";


function LoginForm(props) {
    const history = useHistory();
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    
    
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        // const payload={
        //     "email":state.email,
        //     "password":state.password,
        // }
        var params = new URLSearchParams();
        params.append('userid', null);
        params.append('UserName', null);
        params.append('UserEmail', state.email);
        //axios.post(API_BASE_URL+'/user/login', payload)
        
        axios.get(API_BASE_URL+'/api/user?userid=null&UserName=&UserEmail='+state.email+'&UserPassword='+state.password,
        {  headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          } }
        
        )
            .then(function (response) {
                console.log(response);
                if(response.status === 200){
                    const json = JSON.parse(response.data);
                    //setResponseData(response.data);
                    console.log(response.data);
                    console.log(json);
                    //debugger;
                    if(json.length>0)
                    {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Login successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME,response.data.id);
                        const token = localStorage.getItem('login_access_token');
  console.log('Token: '+token);
                        window.location.reload();
                        //history.push('/login');
                        //redirectToHome();
                        props.showError(null)
                    }
                    else
                    {
                        props.showError("Invalid user credential");
                    }

                }
                else if(response.code === 204){
                    props.showError("Username and password do not match");
                }
                else{
                    props.showError("Username does not exists");
                }
            })
            .catch(function (error) {
                console.log('API Error:'+error);
            });
    }
    const redirectToHome = () => {
       // props.updateTitle('Home')
        //props.history.push('/about');
    }
    const redirectToRegister = () => {
        props.history.push('/register'); 
        props.updateTitle('Register');
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Password"
                       value={state.password}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
            </div>
        </div>
    )
}

export default withRouter(LoginForm);