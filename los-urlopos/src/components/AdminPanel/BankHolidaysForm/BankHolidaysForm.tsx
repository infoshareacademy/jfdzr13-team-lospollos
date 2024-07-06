import React, { FC, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./BankHoliday.module.css";
import { addDayToBankHolidayList } from "../../../utils/AddBankholidays";
import { addAnnualDaysLeave } from "../../../utils/AddAnnualDaysLeave";

interface BankHolidayProps {
  onClose: () => void;
}

const BankHolidaysForm = ({ onClose }: BankHolidayProps) => {
  function addHoliday() {
    let dayToAdd: string = (
      document.getElementById("day_to_add") as HTMLInputElement
    ).value;

    dayToAdd === ""
      ? toast.error("Date field cannot be empty")
      : addDayToBankHolidayList(dayToAdd);
  }

  function addAnnualDays() {
    addAnnualDaysLeave();
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.popupWrapper}>
        <div className={styles.popupContent}>
          <div className={styles.adminActionsContent}>
            <h2 className={styles.adminActionsH2}>Admin Actions</h2>
            <div className={styles.addHolidayWrap}>
              <label className={styles.adminActionsLabel}>
                Add Bank Holiday:
                <input
                  className={styles.adminActionsInput}
                  id="day_to_add"
                  type="date"
                  name="holiday"
                />
              </label>
              <button
                className={styles.addButton}
                type="button"
                onClick={addHoliday}
              >
                Add
              </button>
            </div>
            <button
              className={styles.addAnnualDayButton}
              type="button"
              onClick={addAnnualDays}
            >
              Click to add annual leave days for each user
            </button>
            <button
              className={styles.closePopup}
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankHolidaysForm;
