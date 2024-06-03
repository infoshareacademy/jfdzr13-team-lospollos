import React from "react";
import styles from "./AddRequest.module.css";

interface AddRequestProps {
  onClose: () => void;
}

export function AddRequest({ onClose }: AddRequestProps) {
  return (
    <div className={styles.requestWrapper}>
      <h1 className={styles.requestH1}>Leave request</h1>
      <div className={styles.requestContentCont}>
        <div className={styles.requestInformationCont}>
          <div className={styles.requestInformation}>
            <p>
              Select the type of leave and then fill in the details for the
              application in accordance with the company rules for that type of
              leave.
            </p>
            <p>
              If the leave occurs at the turn of the year, divide it into two
              parts.
            </p>
            <p>
              Leave on demand can last for one day. For any additional day, a
              separate request must be made.
            </p>
            <p>
              Remember to enter the number of days and hours of leave taking
              into account your working hours and public holidays.
            </p>
          </div>
        </div>

        <div className={styles.requestDataCont}>
          <div className={styles.requestEntryContent}>
            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}>Application date </span>
              <input type="date" className={styles.inputField} />
            </div>

            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}> Type of leave </span>
              <select className={styles.inputField}>
                <option value="annualLeave">Annual leave</option>
                <option value="additionalLeave">Additional leave</option>
                <option value="specialLeave">Special leave</option>
                <option value="childLeave">Child leave</option>
                <option value="unpaidLeave">Unpaid leave</option>
              </select>
            </div>

            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}> Beginning date </span>
              <input type="date" className={styles.inputField} />
            </div>

            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}> End date </span>
              <input type="date" className={styles.inputField} />
            </div>

            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}>
                Number of business days of leave
              </span>
              <input type="text" className={styles.inputField} />
            </div>

            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}> Leave on demand </span>
              <div className={styles.ifDemandLeave}>
                <button className={styles.onDemandBtn}>YES</button>
                <button className={styles.notOnDemandBtn}>NO</button>
              </div>
            </div>

            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}> Comments </span>
              <input type="text" className={styles.inputField} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.requestButtons}>
        <button className={styles.cancelButton} onClick={onClose}>
          CANCEL
        </button>
        <button className={styles.saveButton}>SAVE</button>
      </div>
    </div>
  );
}
