import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signIn } from '../store/authSlice';

export default function Login() {
  
  const { isAuth } = useSelector(state => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = () => {
    navigate('/overview');
  }

  const handleEmailChange = (event) => {
      setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
      setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

      try {
        
        const res = await fetch('https://budget-backend-railway-production.up.railway.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const responseJson = await res.json();

        if(responseJson.success){
          localStorage.setItem('authToken', responseJson.token);
          dispatch(signIn( { user: responseJson.user, token: responseJson.token } ));

        } else{
          console.log(`error: `, responseJson.message);
        }



      } catch (error) {
        console.log(`error: `, error)
      }

      
  }

  if(isAuth){
    return <Navigate to='/overview'/>
  }

    return (
      <div className="Auth-form-container">

        <form className="Auth-form" onSubmit={handleSubmit}>

          <div className="Auth-form-content">

            <h3 className="Auth-form-title">Sign In</h3>

            <div className="text-center">
              {`Not registered yet? `}
              <Link className="link-primary" to='/register'>
                Sign Up
              </Link>
            </div>

            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                id="email"
                onChange={handleEmailChange}
              />
            </div>

            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                id="password"
                onChange={handlePasswordChange}
              />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>

          </div>

        </form>

      </div>
    )
}
