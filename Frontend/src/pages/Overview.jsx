import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import NavbarComponent from "../components/Navbar";
import Accounts from "../components/Accounts";
import History from "../components/History";
import Operations from "../components/Operations";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AddTransfer from "../components/AddTransfer";
import AddTransferVEF from "../components/AddTransferVEF"
import { UsdToVef, VefToUsd } from "../components/AddTransferExchange"

function Overview() {

  const { isAuth } = useSelector(state =>  state.auth );

  if(!isAuth){
    return <Navigate to='/login'/>
  }


  return (
    <div className="">
      <NavbarComponent />


      <Container className="wrapper">
 
        <Row className="d-flex justify-content-center">

          <Col className="h-25 mh-75" sm={2}>
            <h3 className="mb-3">Dashboard</h3>
            <Accounts />
          </Col>
          <Col className="h-25 mh-75 p-0" sm={9}>

            <div className=" d-flex align-items-center justify-content-between">

              <div className="d-flex justify-content-start mb-3">
                <AddTransfer />
                <AddTransferVEF />
                <UsdToVef />
                <VefToUsd />
              </div>

              <div className="d-flex  justify-content-end mb-3">
                <Operations />
              </div>

            </div>
            <div className=" bg-custom mx-0 rounded-3 my-2 ">
              <History />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Overview;
