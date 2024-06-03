import React, { useEffect, useState } from "react";
import styles from "./userComponent.module.css";
import pfp from "../../../images/Unknown_person.jpg";
import { useNavigate } from "react-router-dom";

interface UserComponentProps {
  onAddButtonClick: () => void;
}

export function UserComponent({ onAddButtonClick }: UserComponentProps) {
  const [profileImage, setProfileImage] = useState<string>(pfp);

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
        <span>Janusz Kukułka</span>
        <span>janusz.kukulka@urlopos.com</span>
        <span>Department</span>
      </div>
      <div className={styles.daysLeft}>
        U have <span>XX</span> days left
      </div>
      <div className={styles.addButtonContainer}>
        <button className={styles.addButton} onClick={onAddButtonClick}>
          ADD
        </button>
      </div>
    </div>
  );
}
