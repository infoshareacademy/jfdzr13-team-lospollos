import useUserData from "../../../contexts/ViewDataContext";
import pfp from "../../../images/Unknown_person.jpg";
import {
  toUserView,
} from "../../../mappers/ViewObjectsMapper";
import { UserView } from "../../../types-obj/objectViewTypes";
import styles from "./userComponent.module.css";
import { useState, useEffect } from "react";
import { emptyUser } from "../../../utils/DefaultObjects";
import { Departments, User } from "../../../types-obj/types-obj";

interface UserComponentProps {
  onAddButtonClick: () => void;
}

export function UserComponent({ onAddButtonClick }: UserComponentProps) {
  const [profileImage, setProfileImage] = useState<string>(pfp);
  const [userView, setUserView] = useState<UserView>(emptyUser);
  const { userData, departmentsList } = useUserData();

 const toUserViewObject = (
    userData: User,
    departmentList: Departments[]
  ) => {
    toUserView(userData, departmentList).then((userView) =>
      setUserView(userView)
    );
  
    return userView;
  };

  useEffect(() => {
    toUserViewObject(userData, departmentsList);

    const savedImage = localStorage.getItem(
      `profileImage_${userView.email}_${userView.id}`
    );
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, [userData]);

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
        <span>
          {userView.firstName} {userView.lastName}
        </span>
        <span>{userView.email}</span>
        <span>{userView.department.name}</span>
        <span>{userView.department.leader.name}</span>
      </div>
      <div className={styles.daysLeft}>
        You have <span>{userView.daysOffLeft}</span> days left
      </div>
      <div className={styles.addButtonContainer}>
        <button className={styles.addButton} onClick={onAddButtonClick}>
          ADD
        </button>
      </div>
    </div>
  );
}
