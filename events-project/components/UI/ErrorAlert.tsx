import { FC } from "react";
import styles from "./ErrorAlert.module.css";

const ErrorAlert: FC = ({ children }) => {
  return <div className={styles.alert}>{children}</div>;
};

export default ErrorAlert;
