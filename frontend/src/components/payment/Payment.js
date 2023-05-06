import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function Payment(props) {
  const [totalValue, setTotalValue] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const currentAuth = useSelector((state) => state.auth);
  const currency = 'USD';
  const rateVND = 23812;
  const initialOptions = {
    'client-id': 'test',
  };

  useEffect(() => {
    const newValue = (parseInt(props.charged) / rateVND).toFixed(2);
    setTotalValue(newValue);
  }, [props.charged]);

  const createOrder = (data, actions) => {
    if (currentAuth.userLogin.sub === props.idOwner) {
      props.setOpenBill(false);
      setIsOpen(false);
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You can not order your own home!',
      });
    }
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
      {totalValue && isOpen && (
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
