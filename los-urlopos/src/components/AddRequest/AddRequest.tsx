import { useState } from "react";
import useUserData from "../../contexts/ViewDataContext";
import REQUEST_STATUS from "../../enums/requestStatus";
import TYPE_OF_LEAVE, { GetTypeOfLeaveOptions } from "../../enums/typeOfLeave";
import { addNewLeaveRequest } from "../../services/LeaveRequestService";
import { Request } from "../../types-obj/types-obj";
import { daysCounter } from "../../utils/DaysCalculation";
import { requestValidation } from "../../utils/RequestValidation";
import { updateUserDaysOffLeft } from "../../utils/UserModification";
import { Toaster } from "react-hot-toast";
import styles from "./AddRequest.module.css";
interface AddRequestProps {
  onClose: () => void;
}

export function AddRequest({ onClose }: AddRequestProps) {
  const { userData, getUserData, bankHolidaysData, departmentsList } =
    useUserData();
  const [requestedDaysOffAmount, setRequestedDaysOffAmount] =
    useState<number>(0);

  const handleDatesChange = () => {
    const dayFrom = document.getElementById("dayFrom")?.value as string | null;
    const dayTo = document.getElementById("dayTo")?.value as string | null;

    if (dayFrom == null || dayTo == null) {
      setRequestedDaysOffAmount(0);

      return;
    }
    setRequestedDaysOffAmount(daysCounter(dayFrom, dayTo, bankHolidaysData));
  };

  const handleRequest = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const dayFrom = formData.get("dayFrom") as string;
    const dayTo = formData.get("dayTo") as string;
    const requestType = formData.get("typeOfLeave") as string;
    const comment = formData.get("comment") as string;

    const departmentId: string = departmentsList.filter(
      (department) => department.deptId === userData.deptId
    )[0].deptId;

    const daysOffLeft = userData.currentDays - requestedDaysOffAmount;
    const onDemandDaysOffLeft =
      requestType === TYPE_OF_LEAVE.OnDemandLeave
        ? userData.onDemand - requestedDaysOffAmount
        : userData.onDemand;

    const request: Request = {
      dayFrom: dayFrom,
      dayTo: dayTo,
      daysReq: requestedDaysOffAmount,
      daysLeft: userData.currentDays - requestedDaysOffAmount,
      deptId: departmentId,
      requestType: requestType,
      status: REQUEST_STATUS.Pending,
      userId: userData.userId,
      comment: comment,
      createdAt: Date.now(),
    };

    const requestValid = requestValidation(
      userData,
      daysRequested,
      formData.get("typeLeave")
    );

    await addNewLeaveRequest(request);
    await updateUserDaysOffLeft(
      userData.userId,
      daysOffLeft,
      onDemandDaysOffLeft
    );

    getUserData();
  };

  return (
    <div className={styles.requestWrapper}>
      <Toaster position="top-center" reverseOrder={false} />
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
              <select className={styles.inputField} name="typeOfLeave">
                <GetTypeOfLeaveOptions />
              </select>
            </div>

            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}> Beginning date </span>
              <input
                type="date"
                className={styles.inputField}
                name="dayFrom"
                id="dayFrom"
                onChange={handleDatesChange}
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
              />
            </div>

            <div className={styles.requestEntryLabel}>
              <span className={styles.fieldName}>
                Number of business days of leave
              </span>
              <p>{requestedDaysOffAmount}</p>
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
