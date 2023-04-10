import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAccountsByUser } from "../store/accountSlice";
import AddAccount from "../components/AddAccount";

function Accounts() {
  const dispatch = useDispatch();
  const { accounts } = useSelector(state => state.accounts)
  const { token } = useSelector(state => state.auth)

  useEffect(() => {
      dispatch(getAccountsByUser(token))
  }, []);

  const reversed = Object.values(accounts || {}).reverse();

  return (
    <div>
      <div className="py-3 px-2 bg-custom rounded-3 h-25 mh-75">
        <div className="text-center ">
          <h5>My Accounts</h5>
        </div>

        {reversed &&
          reversed.map((account) => (

            <div key={account.id} className="my-3">
              <div>
                <strong className="d-inline">Account name:</strong>{" "}
                <p className="d-inline">{account.name}</p>
              </div>

              <div>
                <strong className="d-inline">Balance:</strong>{" "}
                <p className="d-inline">
                  {account.balance} {account.currency}
                </p>
              </div>
            </div>
          ))}

        <div className="d-flex justify-content-center">

          <AddAccount />
        </div>
      </div>

    </div>
  );
}

export default Accounts;
