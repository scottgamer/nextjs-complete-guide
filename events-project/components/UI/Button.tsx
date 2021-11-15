import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

const Button = ({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}): JSX.Element => {
  return (
    <Link href={link}>
      <a className={styles.btn}>{children}</a>
    </Link>
  );
};

export default Button;
