import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/CustomerCard.module.css"; // You can create a CSS module for styling

const CustomerCard = ({ customer, paymentMethods }) => {
  const formattedNumber = (
    customer.subscriptions.data[0].plan.amount_decimal / 100
  ).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return (
    <div className={styles.customerCard}>
      <h2>{customer.name}</h2>
      <p>Billing email: {customer.email}</p>
      <p>Subscription Plan: {customer.subscriptions.data[0].plan.nickname}</p>

      <p>Charges: {formattedNumber}</p>
      <p>
        Billing frequency: Once every{" "}
        {customer.subscriptions.data[0].plan.interval}
      </p>
      <p>
        Recoupment method: {customer.subscriptions.data[0].collection_method}
      </p>

      <p>
        Preferred payment method: {paymentMethods.card.brand}{" "}
        {paymentMethods.card.last4}
      </p>
      {/* Add more information as needed */}
    </div>
  );
};

CustomerCard.propTypes = {
  customer: PropTypes.shape({
    email: PropTypes.string.isRequired,
    subscription: PropTypes.string.isRequired
    // Add more PropTypes for other customer properties
  }).isRequired
};

export default CustomerCard;
