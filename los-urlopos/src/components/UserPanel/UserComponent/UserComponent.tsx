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
          <span className="glyphicon glyphicon-camera"></span>
          <span className="changeImage">Change Image</span>
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
    </div>
  );
}
