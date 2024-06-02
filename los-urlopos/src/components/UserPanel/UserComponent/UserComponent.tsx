import React, { useEffect, useState } from "react";
import pfp from "../../../images/Unknown_person.jpg";
import styles from "./userComponent.module.css";

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
          alt="Profile"
        />
      </div>
      <div className={styles.userDetails}>
        <span>Janusz Kukułka</span>
        <span>janusz.kukulka@urlopos.com</span>
        <span>Department</span>
      </div>
      <div className={styles.daysLeft}>
        U have <span>XX</span> days left
      </div>
    </div>
  );
}
