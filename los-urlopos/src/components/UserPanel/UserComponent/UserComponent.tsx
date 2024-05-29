import React, { useEffect, useState } from "react";
import styles from "./userComponent.module.css";
import pfp from "../../../images/Unknown_person.jpg";

export function UserComponent() {
  const [profileImage, setProfileImage] = useState<string>(pfp);

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const imageUrl = reader.result.toString();
          setProfileImage(imageUrl);
          localStorage.setItem("profileImage", imageUrl);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className={styles.profilePictureWrapper}>
      <div className={styles.profilePictureCont}>
        <label className={styles.label} htmlFor="file">
          <span className="glyphicon glyphicon-camera"></span>
          <span className={styles.changeImage}>Change Image</span>
        </label>
        <input id="file" type="file" onChange={loadFile} />
        <img
          className={styles.profilePicture}
          src={profileImage}
          id="output"
          alt="Profile"
        />
      </div>
      <h1 className={styles.userName}>Klaudia Gajewska</h1>
      <h2 className={styles.userDepartment}>Customer Service</h2>
      <h3 className={styles.userDays}>You've got ___ days left.</h3>
    </div>
  );
}
