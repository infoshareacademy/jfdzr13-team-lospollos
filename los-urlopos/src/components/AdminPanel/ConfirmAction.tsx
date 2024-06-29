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
    <dialog open className={styles.popup}>
      <p>{message}</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </dialog>
  );
};

export default ConfirmAction;
