import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAccountsByUser } from "../store/accountSlice";
import { Navigate } from 'react-router-dom';
import NavbarComponent from '../components/Navbar';

import AddAccount from '../components/AddAccount';

const Summary = () => {

    const { isAuth } = useSelector(state =>  state.auth );

    if(!isAuth){
      return <Navigate to='/login'/>
    }

    const dispatch = useDispatch();
    const { accounts } = useSelector(state => state.accounts)
    const { token } = useSelector(state => state.auth)

  useEffect(() => {
      dispatch(getAccountsByUser(token))
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="text-center p-3">
        <h4>My Accounts</h4>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center">

          {accounts &&
            accounts.map((account) => (
                <div key={account.id} className="my-3 p-3 w-75 d-block bg-custom rounded-3">
                    <div>
                    <strong className="d-inline">Account name:</strong>{" "}
                    <p className="d-inline">{account.name}</p>
                    </div>
                    <div>
                    <strong className="d-inline">Account ID:</strong>{" "}
                    <p className="d-inline">{account.id}</p>
                </div>
                    <div>
                    <strong className="d-inline">Balance:</strong>{" "}
                    <p className="d-inline">
                        {account.balance} {account.currency}
                    </p>
                    </div>
                </div>
            ))}
        
        <AddAccount />
      </div>
    </>
  );
}

export default Summary