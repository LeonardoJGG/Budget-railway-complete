import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ProtectorRoutes from './components/auth/ProtectorRouter';
import Overview from "./pages/Overview";
import Login from "./pages/Login";
import Register from './pages/Register';
import Summary from './pages/Summary';
import { useSelector } from 'react-redux';
import { signIn } from './store/authSlice';
import { useDispatch } from "react-redux";

function App() {

  const dispatch = useDispatch();

  const { token } = useSelector(state => state.auth);

  const checkToken = async () => {

    try {
      if(token){

        const res = await fetch('https://budget-backend-railway-production.up.railway.app/checkToken', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
    
          const responseJson = await res.json();
          console.log(responseJson);
    
          if(responseJson.success){
              console.log(responseJson)
              dispatch(signIn( { user: responseJson.user, token: token } ));
          } else {
              console.log('error 1');
          }
      }
      

    } catch (error) {
      console.log(`error: ${error}`)
    }
  }

  useEffect(() => {
    checkToken();
  }, [])

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/overview/' element={
          <ProtectorRoutes>
            <Overview />
          </ProtectorRoutes> 
        }/>

        <Route path='/summary' element={
          <ProtectorRoutes>
            <Summary />
          </ProtectorRoutes>
        } />

        <Route path='*' element={<Navigate to='/' />}/>
      </Routes>
    </div>
  )
}

export default App
