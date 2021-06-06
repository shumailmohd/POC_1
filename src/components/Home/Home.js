import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios'
function Home(props) {
    useEffect(() => {
      //const params = new URLSearchParams([['answer', localStorage.getItem(ACCESS_TOKEN_NAME)]]);

        axios.get(API_BASE_URL+'/api/user/', 
        { 
          headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) },
          params: {userid: localStorage.getItem(ACCESS_TOKEN_NAME),UserName:'',UserEmail:''}
        }
        )
        .then(function (response) {
            if(response.status !== 200){
              console.log(response.data);
              redirectToLogin()
            }
        })
        .catch(function (error) {
          redirectToLogin()
        });
      })
    function redirectToLogin() {
    props.history.push('/login');
    }
    return(
        <div className="mt-2">
            Home page content
        </div>
    )
}

export default withRouter(Home);