import React from "react";
import Button from "react-bootstrap/Button";

import AddIncome from "./AddIncome";
import AddExpense from "./AddExpense";

function Operations() {
  return (
    <div>
      <AddExpense />
      <AddIncome />
    </div>
  );
}

export default Operations;
