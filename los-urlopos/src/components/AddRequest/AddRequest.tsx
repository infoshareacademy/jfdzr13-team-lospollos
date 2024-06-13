import useUserData from "../../contexts/ViewDataContext";
import { daysCounter } from "../../utils/DaysCalculation";
import { Request } from "../../types-obj/types-obj";
import styles from "./AddRequest.module.css";
interface AddRequestProps {
  onClose: () => void;
}

export function AddRequest({ onClose }: AddRequestProps) {
  const { userData, getUserData, bankHolidaysData, departmentsList } =
    useUserData();

  const handleRequest = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const daysRequested = daysCounter(
      formData.get("dayFrom"),
      formData.get("dayTo"),
      bankHolidaysData
    );

    const departmentId = departmentsList.filter(
      (department) => department.deptId === userData.deptId
    );

    const request: Request = {
      dayFrom: formData.get("dayFrom") as string,
      dayTo: formData.get("dayTo") as string,
      daysReq: daysRequested,
      daysLeft: userData.currentDays - daysRequested,
      dept: departmentId[0].deptId,
      requestType: formData.get(""),
      status: formData.get(""),
      supervisor: departmentId[0].deptId,
      user: userData.userId,
      comment: formData.get("comment"),
      createdAt: Date.now(),
    };

    console.log(request);
    console.log(userData);
    getUserData();
  };

  return (
    <div className={styles.requestWrapper}>
      <h1 className={styles.requestH1}>Leave request</h1>
      <form onSubmit={handleRequest} className={styles.requestContentCont}>
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
              <span className={styles.fieldName}> Type of leave </span>
              <select className={styles.inputField} name="annualLeave">
                <option value="annualLeave">Annual leave</option>
                <option value="additionalLeave">Additional leave</option>
                <option value="specialLeave">Special leave</option>
                <option value="childLeave">Child leave</option>
                <option value="unpaidLeave">Unpaid leave</option>
              </select>
            </div>

            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}> Beginning date </span>
              <input type="date" className={styles.inputField} name="dayFrom" />
            </div>

            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}> End date </span>
              <input type="date" className={styles.inputField} name="dayTo" />
            </div>

            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}>
                Number of business days of leave
              </span>
              <input type="text" className={styles.inputField} />
            </div>

            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}> Comments </span>
              <input type="text" className={styles.inputField} name="comment" />
            </div>
          </div>
        </div>
        <div className={styles.requestButtons}>
          <button className={styles.cancelButton} onClick={onClose}>
            CANCEL
          </button>
          <button className={styles.saveButton} type="submit">
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
}
