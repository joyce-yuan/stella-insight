import styles from "./Clear.module.css";

export default function Clear({ onClick, buttonName="Clear" }) {
  return (
    <button className={styles.wrapper} onClick={onClick}>
      {buttonName}
    </button>
  );
}