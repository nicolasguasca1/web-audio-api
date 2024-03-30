import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/ThresholdsCard.module.css"; // You can create a CSS module for styling

const ThresholdsCard = ({ hsResponse, revAssets }) => {
  return (
    <div className={styles.ThresholdsCard}>
      <h2>Terms</h2>
      <p>Your deal: {hsResponse.properties.dealname}</p>
      <p>Assets allowed : {hsResponse.properties.asset_limit}</p>
      <p>
        Monthly gross revenue reporting allowed ($USD):{" "}
        {hsResponse.properties.monthly_revenue_limit}
      </p>
      <p>Your custom terms : {hsResponse.properties.deal_terms__custom_}</p>

      <h2>Figures</h2>
      <p>Your current asset count: {revAssets.totalItemsCount}</p>
      <p>Revenue reported since last cutoff date : </p>

      {/* Add more information as needed */}
    </div>
  );
};

ThresholdsCard.propTypes = {
  customer: PropTypes.shape({
    email: PropTypes.string.isRequired,
    subscription: PropTypes.string.isRequired
    // Add more PropTypes for other customer properties
  }).isRequired
};

export default ThresholdsCard;
