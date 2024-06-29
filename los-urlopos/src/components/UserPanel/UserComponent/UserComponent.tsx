import useUserData from "../../../contexts/ViewDataContext";
import pfp from "../../../images/Unknown_person.jpg";
import { toUserView } from "../../../mappers/ViewObjectsMapper";
import { UserView } from "../../../types-obj/objectViewTypes";
import styles from "./userComponent.module.css";
import { useState, useEffect } from "react";
import { emptyUser } from "../../../utils/DefaultObjects";
import { Departments, User } from "../../../types-obj/types-obj";
import { getReqStatisticForUser } from "../../../utils/StatisticActions";

interface UserComponentProps {
  onAddButtonClick: () => void;
}

export function UserComponent({ onAddButtonClick }: UserComponentProps) {
  const [profileImage, setProfileImage] = useState<string>(pfp);
  const [userView, setUserView] = useState<UserView>(emptyUser);
  const { userData, departmentsList } = useUserData();

  const toUserViewObject = (userData: User, departmentList: Departments[]) => {
    toUserView(userData, departmentList).then((userView) =>
      setUserView(userView)
    );

    return userView;
  };

  useEffect(() => {
    toUserViewObject(userData, departmentsList);
    getReqStatisticForUser(userData.userId);

    const savedImage = localStorage.getItem(
      `profileImage_${userView.email}_${userView.id}`
    );
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, [userData]);

  return (
    <div className={styles.userBusinessCard}>
      <div className={styles.profilePicture}>
        <img
          className={styles.profilePictureImg}
          src={profileImage}
          alt="User profile picture"
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
      <div className={styles.userStatistics}></div>
      <div className={styles.daysOff}>
        You have <span>{userView.daysOffLeft}</span> days left
      </div>
      {/* <div className={styles.addButtonContainer}>
        <button className={styles.addButton} onClick={onAddButtonClick}>
          ADD
        </button>
      </div> */}
    </div>
  );
}
