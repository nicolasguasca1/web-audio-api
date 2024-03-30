import React from "react";
import Link from "next/link";
import styles from "../styles/sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/assets">Assets Management</Link>
        <Link href="/billing">Billing</Link>
      </div>
    </div>
  );
};

export default Sidebar;
