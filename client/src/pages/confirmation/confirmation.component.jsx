import React from "react";
import { withRouter } from "react-router-dom";
import "./confirmation.styles.scss";

const Confirmation = (data) => {
  console.log("CONFIRMATION", data);
  const { paymentData, totals } = data.location;
  const { amount, payment_method_details, created } = paymentData;
  const { discount, tax, shipping, total } = totals;
  const orderDate = new Date(created * 1000); // convert timestamp into date
  const { card } = payment_method_details;

  const getDeliveryDate = () => {
    const days = 10;
    const deliveryDate = new Date(
      orderDate.getTime() + days * 24 * 60 * 60 * 1000
    );
    return deliveryDate.toDateString();
  };

  return (
    <div className="confirmation-page">
      <h1>Thanks for shopping with us!</h1>
      <p>Your payment was processed successfully.</p>
      <div className="order-details">
        <span className="label">Order Number</span>
        <span className="details">
          {Math.round(Math.random() * 10000000000)}
        </span>
        <span className="label">Order Date</span>
        <span className="details">{orderDate.toLocaleString()}</span>
        <span className="label">Payment Method</span>
        <span className="details">
          {card.brand} xxxx xxxx xxxx {card.last4}
        </span>
        <span className="label">Delivery Details</span>
        <span className="details">
          Standard - Estimated delivery date:{" "}
          <span className="bold">{getDeliveryDate()}</span>
        </span>
        <span className="label">Summary</span>
        <div className="order-details-inner">
          <span className="label">Subtotal</span>
          <span className="details">${(amount / 100).toFixed(2)}</span>
          {discount && (
            <>
              <span className="label">Promo</span>
              <span className="details">-${discount.toFixed(2)}</span>
            </>
          )}
          <span className="label hr-above">Sales Tax</span>
          <span className="details hr-above">${tax.toFixed(2)}</span>
          <span className="label">Shipping</span>
          <span className="details">${shipping.toFixed(2)}</span>
          <span className="label hr-above">Total</span>
          <span className="details hr-above">${(amount / 100).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
