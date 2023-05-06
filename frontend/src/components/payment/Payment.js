import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

function Payment(props) {
  const [totalValue, setTotalValue] = useState(0);
  const currency = 'USD';
  const rateVND = 23812;
  const initialOptions = {
    'client-id': 'test',
  };

  useEffect(() => {
    const newValue = (parseInt(props.charged) / rateVND).toFixed(2);
    console.log(newValue);
    setTotalValue(newValue);
  }, [props.charged]);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: totalValue,
              currency_code: currency,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      if (props.paymentType == 'checkout') {
        return props.handleSubmitCheckout();
      } else if (props.paymentType == 'book') {
        return props.handleBook();
      }
    });
  };

  return (
    <>
      {totalValue && (
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{ layout: 'horizontal' }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        </PayPalScriptProvider>
      )}
    </>
  );
}

export default Payment;
