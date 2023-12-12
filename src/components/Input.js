import styles from "./Input.module.css";

export default function Input({ value, onChange, onClick, buttonName, placeholder="Your prompt here..." }) {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.text}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button className={styles.btn} onClick={onClick}>
        {buttonName}
      </button>
    </div>
  );
}