import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Swal from 'sweetalert2';

function Payment(props) {
  const [totalValue, setTotalValue] = useState(0);
  const currency = 'USD';
  const rateVND = 23812;
  const initialOptions = {
    'client-id': `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
  };
  useEffect(() => {
    const newValue = (parseInt(props.charged) / rateVND).toFixed(2);
    setTotalValue(newValue);
  }, [props.charged]);

  const createOrder = (data, actions) => {
    if (totalValue > 0) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: totalValue,
              currency_code: currency,
            },
          },
        ],
      });
    }
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      props.handleBook();
    });
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{ layout: 'horizontal' }}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
}

export default Payment;
