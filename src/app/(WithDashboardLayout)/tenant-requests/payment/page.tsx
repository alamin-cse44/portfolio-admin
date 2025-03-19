import React from "react";

const PaymentError = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2>Your Payment is not successfull!</h2>
      <p className="text-red-400">Something went wrong!! Try again!!!</p>
    </div>
  );
};

export default PaymentError;
