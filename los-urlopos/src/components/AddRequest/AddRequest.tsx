import { useState } from "react";
import { Toaster } from "react-hot-toast";
import useUserData from "../../contexts/ViewDataContext";
import REQUEST_STATUS from "../../enums/requestStatus";
import { GetTypeOfLeaveOptions } from "../../enums/typeOfLeave";
import { addNewLeaveRequest } from "../../services/LeaveRequestService";
import { Request } from "../../types-obj/types-obj";
import {
  calculateBusinessDaysOff,
  calculateDaysOffLeft,
  calculateOnDemandLeft,
} from "../../utils/DaysCalculation";
import { updateUserDaysOffLeft } from "../../utils/UserModification";
import { ValidateLeaveRequest } from "../../validators/LeaveRequestValidator";
import styles from "./AddRequest.module.css";
interface AddRequestProps {
  onClose: () => void;
}

export function AddRequest({ onClose }: AddRequestProps) {
  const { userData, refreshUserViewData, bankHolidaysData, departmentsList } =
    useUserData();
  const [requestedDaysOff, setRequestedDaysOff] = useState<number>(0);

  const handlePastDates = () => {
    const dayFromElement = document.getElementById("dayFrom");
    const dayToElement = document.getElementById("dayTo");

    const dayFrom = dayFromElement!.value as string;
    const dayTo = dayToElement!.value as string;

    const currentDay = new Date().toISOString().split("T")[0];

    dayFromElement?.setAttribute("min", currentDay);
    if (dayTo) {
      dayFromElement?.setAttribute("max", dayTo);
    }

    if (dayFrom) {
      dayToElement?.setAttribute("min", dayFrom);
    }
  };

  const handleDatesChange = () => {
    const dayFrom = document.getElementById("dayFrom")?.value as string | null;
    const dayTo = document.getElementById("dayTo")?.value as string | null;

    if (dayFrom == null || dayTo == null) {
      setRequestedDaysOff(0);
    } else {
      setRequestedDaysOff(
        calculateBusinessDaysOff(dayFrom, dayTo, bankHolidaysData)
      );
    }
  };

  const handleRequestSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const dayFrom = formData.get("dayFrom") as string;
    const dayTo = formData.get("dayTo") as string;
    const requestType = formData.get("typeOfLeave") as string;
    const comment = formData.get("comment") as string;

    const departmentId: string = departmentsList.filter(
      (department) => department.deptId === userData.deptId
    )[0].deptId;

    const daysOffLeft = calculateDaysOffLeft(
      userData.currentDays,
      requestedDaysOff,
      requestType
    );
    const onDemandDaysOffLeft = calculateOnDemandLeft(
      userData.onDemand,
      requestedDaysOff,
      requestType
    );

    const request: Request = {
      dayFrom: dayFrom,
      dayTo: dayTo,
      daysReq: requestedDaysOff,
      daysLeft: daysOffLeft,
      deptId: departmentId,
      requestType: requestType,
      status: REQUEST_STATUS.Pending,
      userId: userData.userId,
      comment: comment,
      createdAt: Date.now(),
    };

    const isRequestValid = ValidateLeaveRequest(
      userData,
      requestedDaysOff,
      requestType
    );

    if (isRequestValid) {
      await addNewLeaveRequest(request);
      await updateUserDaysOffLeft(
        userData.userId,
        daysOffLeft,
        onDemandDaysOffLeft
      );

      await refreshUserViewData();
      onClose();
    }
  };

  return (
    <div className={styles.requestWrapper}>
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className={styles.requestH1}>Leave request</h1>
      <form
        onSubmit={handleRequestSubmit}
        className={styles.requestContentCont}
      >
        <div className={styles.requestDataCont}>
          <div className={styles.requestEntryContent}>
            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}> Type of leave </span>
              <select className={styles.inputField} name="typeOfLeave" required>
                <GetTypeOfLeaveOptions />
              </select>
            </div>

            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}> Start date </span>
              <input
                type="date"
                className={styles.inputField}
                name="dayFrom"
                id="dayFrom"
                onChange={handleDatesChange}
                onFocus={handlePastDates}
                required
              />
            </div>

            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}> End date </span>
              <input
                type="date"
                className={styles.inputField}
                name="dayTo"
                id="dayTo"
                onChange={handleDatesChange}
                onFocus={handlePastDates}
                required
              />
            </div>

            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}>Business days off</span>
              <p>{requestedDaysOff}</p>
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
