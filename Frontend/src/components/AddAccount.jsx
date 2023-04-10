import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { getAccountsByUser } from '../store/accountSlice';
import { useDispatch } from 'react-redux';

function AddAccount() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const [accountData, setAccountData] = useState({ name: '', currency: '', balance: '' })

    const handleInputChange = (e) => {
      setAccountData({
        ...accountData,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      const token = window.localStorage.getItem('authToken')
      try {
        const response = await fetch('https://budget-backend-railway-production.up.railway.app/add_account', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: accountData.name,
            balance: accountData.balance,
            currency: accountData.currency
            
          })
        });
  
        const responseJson = await response.json();
        console.log(responseJson);
  
        if (responseJson.success) {
          dispatch(getAccountsByUser(token))
            
        } 
      } catch (error) {
        console.log(error)
      }
  
  
  
      setAccountData({ name: '', currency: '', balance: '' })
  
    }

  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Add Account
        </Button>
  
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Create a new account</Modal.Title>
          </Modal.Header>
          <Modal.Body>

                <Form onSubmit={handleSubmit}>

                  <Form.Group className="mb-3">
                    <Form.Label>Name Account:</Form.Label>
                    <Form.Control required type='text' min={0} id='name' name='name' value={accountData.name} placeholder='Enter Account Name' onChange={handleInputChange}  />
                  </Form.Group>

                  <Form.Group className='mb-3'>

                    <Form.Label htmlFor="Currency">Currency:</Form.Label>
                    <Form.Select required name="currency" type='currency' value={accountData.currency} id="currency" onChange={handleInputChange} >
                      <option value=""></option>
                      <option value="USD">USD</option>
                      <option value="VEF">VEF</option>
                    </Form.Select>

                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Initial Balance:</Form.Label>
                    <Form.Control required type='number' min={0} id='balance' name='balance' value={accountData.balance} placeholder='Enter Initial Balance' onChange={handleInputChange}  />
                    <Form.Text className="text-muted">
                      This is just a demo balance.
                    </Form.Text>
                  </Form.Group>

                  <div className='d-flex justify-content-end'>
                    <Button className='mx-2' variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button className='mx-2' type='submit' variant="primary">
                      Add Account
                    </Button>
                  </div>

                </Form>

          </Modal.Body>
        </Modal>
      </>
    );
}

export default AddAccount