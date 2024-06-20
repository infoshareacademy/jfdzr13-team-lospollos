import React, { useEffect, useState } from "react";
import useUserData from "../../../contexts/ViewDataContext";
import useAuth from "../../../contexts/AuthContext";
import pfp from "../../../images/Unknown_person.jpg";
import styles from "./userComponent.module.css";

interface UserComponentProps {
  onAddButtonClick: () => void;
}

export function UserComponent({ onAddButtonClick }: UserComponentProps) {
  const [profileImage, setProfileImage] = useState<string>(pfp);
  const { userData, departmentData } = useUserData();
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const savedImage = localStorage.getItem(
        `profileImage_${authUser.email}_${authUser.uid}`
      );
      if (savedImage) {
        setProfileImage(savedImage);
      }
    }
  }, [authUser]);

  console.log("User data in component:", userData); // Debug log
  console.log("Department data in component:", departmentData); // Debug log

  return (
    <div className={styles.profilePictureWrapper}>
      <div className={styles.profilePictureCont}>
        <img
          className={styles.profilePicture}
          src={profileImage}
          alt="Profile Picture"
        />
      </div>
      <div className={styles.userDetails}>
        {userData ? (
          <>
            <span>
              {userData.firstName} {userData.surname}
            </span>
            <span>{userData.email}</span>
            <span>
              {departmentData ? departmentData.dept : "Loading department..."}
            </span>
          </>
        ) : (
          <span>Loading user data...</span>
        )}
      </div>
      <div className={styles.daysLeft}>
        You have <span>{userData.currentDays}</span> days left
      </div>
      <div className={styles.addButtonContainer}>
        <button className={styles.addButton} onClick={onAddButtonClick}>
          ADD
        </button>
      </div>
    </div>
  );
}
