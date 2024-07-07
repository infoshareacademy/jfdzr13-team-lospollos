import React, { FC } from "react";
import styles from "./ConfirmAction.module.css";

interface ConfirmActionProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmAction: FC<ConfirmActionProps> = ({
  open,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className={styles.actionWrapper}>
      <div className={styles.overlay} />
      <dialog open className={styles.popup}>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button className={styles.yesBtn} onClick={onConfirm}>
            Yes
          </button>
          <button className={styles.noBtn} onClick={onCancel}>
            No
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ConfirmAction;
