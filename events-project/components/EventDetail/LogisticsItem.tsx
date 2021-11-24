import { ElementType, ReactNode } from "react";
import classes from "./LogisticsItem.module.css";

interface LogisticsItemProps {
  Icon: ElementType;
  children: ReactNode;
}

const LogisticsItem = ({ Icon, children }: LogisticsItemProps) => {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
};

export default LogisticsItem;
