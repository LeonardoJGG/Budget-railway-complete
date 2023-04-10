import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { useSelector, useDispatch } from 'react-redux'
import { getAccountsByUser } from "../store/accountSlice";
import { getHistoryByUser } from "../store/transactionSlice";

function VefToVef(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    
    const dispatch = useDispatch();
    const { accounts } = useSelector(state => state.accounts)

    const accounts_vef  = accounts ? accounts.filter(account => account.currency == 'VEF') : accounts;
  
    const [operationData, setOperationData] = useState({ currency: '', amount: '', account_id: '', to_account_id: '' })
  
    const handleInputChange = (e) => {
      setOperationData({
        ...operationData,
        [e.target.name]: e.target.value
      })
    }

  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      const token = window.localStorage.getItem('authToken')
      try {
        const response = await fetch('https://budget-backend-railway-production.up.railway.app/add_transfer', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currency: operationData.currency,
            amount: operationData.amount,
            account_id: operationData.account_id,
            to_account_id: operationData.to_account_id
            
          })
        });
  
        const responseJson = await response.json();
        console.log(responseJson);
  
        if (responseJson.success) {
            dispatch(getHistoryByUser(token));
            dispatch(getAccountsByUser(token));
            
        } else {
          console.log('error')
        }
      } catch (error) {
        console.log(error)
      }
  
      setOperationData({currency: '', amount: '', account_id: '', to_account_id: ''})
    }
  
    return (
      <>
        <Button className="transfer-btn mx-2" variant="primary" onClick={handleShow}>
          Transfer VEF
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new transfer (VEF TO VEF)</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="Currency">Currency:</Form.Label>
                <Form.Select
                  required
                  name="currency"
                  id="currency"
                  value={operationData.currency}
                  onChange={handleInputChange}
                >
                  <option value="VEF">VEF</option>

                </Form.Select>
  
                <Form.Label htmlFor="Amount">Amount:</Form.Label>
                <Form.Control
                  required
                  name="amount"
                  type="amount"
                  id="amount"
                  value={operationData.amount}
                  onChange={handleInputChange}
                />
  
                <Form.Label htmlFor="Account">From:</Form.Label>
                <Form.Select
                  required
                  name="account_id"
                  id="account_id"
                  type="account_id"
                  value={operationData.account_id}
                  onChange={handleInputChange}
                >
                  <option value=""></option>
                  {accounts_vef &&
                      accounts_vef.map((account) => (
                        <React.Fragment key={account.id}>
                          <option disabled>{account.name}</option>
                          <option >{account.id}</option>
                        </React.Fragment >
                      ))}
                </Form.Select>
  
                <Form.Label htmlFor="Account">To:</Form.Label>
                <Form.Select
                  required
                  name="to_account_id"
                  id="to_account_id"
                  type="to_account_id"
                  value={operationData.to_account_id}
                  onChange={handleInputChange}
                >
                  <option value=""></option>
                  {accounts_vef &&
                      accounts_vef.map((account) => (
                        <React.Fragment key={account.id}>
                          <option disabled>{account.name}</option>
                          <option >{account.id}</option>
                        </React.Fragment >
                      ))}
                </Form.Select>
  
              </Form.Group>
  
              <div className="d-flex justify-content-end">
                <Button
                  className="mx-2"
                  variant="secondary"
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button
                  className="mx-2"
                  type="submit"
                  variant="primary"
                >
                  Add Operation
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
export default VefToVef;