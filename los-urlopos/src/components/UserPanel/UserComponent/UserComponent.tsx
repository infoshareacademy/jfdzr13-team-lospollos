import React, { useEffect, useState } from "react";
import pfp from "../../../images/Unknown_person.jpg";
import styles from "./userComponent.module.css";
import useUserData from "../../../contexts/UserDataContext";

interface UserComponentProps {
  onAddButtonClick: () => void;
}

export function UserComponent({ onAddButtonClick }: UserComponentProps) {
  const [profileImage, setProfileImage] = useState<string>(pfp);
  const { userData, departmentData } = useUserData();

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = document.getElementById("output") as HTMLImageElement;
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      image.src = imageUrl;
      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
    }
  };

  console.log("User data in component:", userData); // Debug log
  console.log("Department data in component:", departmentData); // Debug log

  return (
    <div className={styles.profilePictureWrapper}>
      <div className={styles.profilePictureCont}>
        <label className={styles.label} htmlFor="file">
          <span
            className={`${styles.glyphicon} ${styles.glyphiconCamera}`}
          ></span>
          <span>Change</span>
        </label>
        <input id="file" type="file" onChange={loadFile} />
        <img
          className={styles.profilePicture}
          src={profileImage}
          id="output"
          width="200"
          alt="Profile"
        />
      </div>
      <div className={styles.userDetails}>
        {userData ? (
          <>
            <span>{userData.name}</span>
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
        You have <span>XX</span> days left
      </div>
      <div className={styles.addButtonContainer}>
        <button className={styles.addButton} onClick={onAddButtonClick}>
          ADD
        </button>
      </div>
    </div>
  );
}
