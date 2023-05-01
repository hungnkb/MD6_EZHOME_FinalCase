import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

function Payment() {
//   const initialOptions = {
//     'client-id': `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
//     currency: 'VND',
//     intent: 'capture',
//     'data-client-token': `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
//   };

  return (
    <PayPalScriptProvider >
      <PayPalButtons style={{ layout: 'horizontal' }} />
    </PayPalScriptProvider>
  );
}

export default Payment;
