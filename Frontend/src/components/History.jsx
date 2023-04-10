import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import moment from 'moment/moment';

import { useDispatch, useSelector } from 'react-redux'
import { getHistoryByUser } from '../store/transactionSlice'

function History() { 

  const dispatch = useDispatch();
  const { operations } = useSelector(state => state.operations);
  const { token } = useSelector(state => state.auth);

  const { accounts } = useSelector(state => state.accounts)

  const reversed = Object.values(operations || {}).reverse();


  // FILTER LOGIC ---------------------------------------------------------------------------------

  const [items, setItems] = useState(reversed);
  const [search, setSearch] = useState('');
  const [account, setAccount] = useState('');
  const [date, setDate] = useState(moment());

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleAccount = (e) => {
    setAccount(e.target.value)
  }

  const handleDate = (e) => {
    setDate(e.target.value)
  }

  useEffect(() => {
      dispatch(getHistoryByUser(token));
  },[])

  useEffect(() => {
    setItems(reversed);
  },[operations])

  useEffect(() => {
    if(search === ''){
      setItems(reversed);
    } else{
      setItems(reversed.filter(operation => operation.category == search));
    }
  },[search])

  useEffect(() => {
    if(account === ''){
      setItems(reversed);
    } else{
      setItems(reversed.filter(operation => operation.account_id == account));
    }
  },[account])

  useEffect(() => {
    if(date === ''){
      setItems(reversed);
    } else{
      setItems(reversed.filter(operation => operation.date.substr(0, 10) == date));

    }
  },[date])


  return (
    <div className="mh-50">
      <div className="d-flex justify-content-around align-items-center space-between py-3">
        <div>
          <label htmlFor="">Date</label>
          <input className="custom-input" type="date" value={date} onChange={handleDate}  />
        </div>

        <div>
          <label htmlFor="">Account</label>

          <select
                required
                className="custom-input"
                name="currency"
                id="currency"
                value={account} 
                onChange={handleAccount}
              >
              
              <option value=""></option>
              {accounts &&
                accounts.map((account) => (
                  <React.Fragment key={account.id}>
                      <option disabled>{account.name}</option>
                      <option >{account.id}</option>
                  </React.Fragment >
              ))}

            </select>
        </div>

        <div>
          <label htmlFor="">Category</label>
          <input className="custom-input" type="search" value={search} onChange={handleSearch} />

        </div>

      </div>

      <div className="scrollable">
        <Table striped>
          <thead className="head-table">
            <tr>
              <th className="text-center">Date</th>
              <th className="text-center">Account</th>
              <th className="text-center">Category</th>
              <th className="text-center">Type</th>
              <th className="text-center">Amount</th>
            </tr>
          </thead>
          <tbody>

            { operations <= 0 ? 
              <tr >
                
              </tr> : items &&
                items.map((operation) => {

                  return (
                  <tr key={operation.id} >
                    
                      <td className="text-center">{operation.date.substr(0, 10)}</td>
                   
                      <td className="text-center">{operation.account_id}</td>
                      <td className="text-center">{operation.category}</td>
                      <td className={`text-center ${operation.type === 'income' ? 'income' : 'expense'}`}>{operation.type}</td>
                      <td className="text-center">{operation.amount}</td>
                  </tr>
                  )
            })}
        
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default History