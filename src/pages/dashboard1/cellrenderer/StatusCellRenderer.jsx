
import styles from "./StatusCellRenderer.module.css";
export const StatusCellRenderer = ({
  value,
  valueFormatted,
}) => (
  <div className={`${styles.tag} ${styles[value + "Tag"]}`}>
    <div className={`${styles.circle} ${styles[value + "Circle"]}`}></div>
    <span>{valueFormatted}</span>
  </div>
);