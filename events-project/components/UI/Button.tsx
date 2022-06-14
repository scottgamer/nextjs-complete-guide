import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

const Button = ({
  children,
  link,
  onClick,
}: {
  children: React.ReactNode;
  link?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}): JSX.Element => {
  return link ? (
    <Link href={link}>
      <a className={styles.btn}>{children}</a>
    </Link>
  ) : (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
