import toast, { Toaster } from "react-hot-toast";
import styles from "./BankHoliday.module.css";
import { addDayToBankHolidayList } from "../../../utils/AddBankholidays";
import { addAnnualDaysLeave } from "../../../utils/AddAnnualDaysLeave";

interface BankHolidayProps {
  onClose: () => void;
}

const currentYear = new Date().getFullYear();

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
            <div className={styles.addAnnualDaysWrap}>
              <label className={styles.adminActionsLabel}>
                add annual leave days for each user:
                <div className={styles.currentYearWrap}>
                  <p className={styles.currentYear}>{currentYear}</p>
                </div>
              </label>

              <button
                className={styles.addButton}
                type="button"
                onClick={addAnnualDays}
              >
                add
              </button>
            </div>
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
