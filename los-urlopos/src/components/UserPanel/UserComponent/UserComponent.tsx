import { useEffect, useState } from "react";
import useUserData from "../../../contexts/ViewDataContext";
import pfp from "../../../images/Unknown_person.jpg";
import { toUserView } from "../../../mappers/ViewObjectsMapper";
import { UserView } from "../../../types-obj/objectViewTypes";
import { UserStatistics } from "../../../types-obj/statisticsTypes";
import { Departments, User } from "../../../types-obj/types-obj";
import { emptyUser, emptyUserStatistics } from "../../../utils/DefaultObjects";
import { getReqStatisticForUser } from "../../../utils/StatisticActions";
import RequestStatusChartComponent from "../../StatisticsCharts/RequestStatusChartComponent";
import RequestTypeChartComponent from "../../StatisticsCharts/RequstTypeChartComponent";
import styles from "./userComponent.module.css";

export function UserComponent() {
  const [profileImage, setProfileImage] = useState<string>(pfp);
  const [userView, setUserView] = useState<UserView>(emptyUser);
  const [userStats, setUserStats] =
    useState<UserStatistics>(emptyUserStatistics);
  const { userData, departmentsList } = useUserData();

  const toUserViewObject = async (
    userData: User,
    departmentList: Departments[]
  ) => {
    const userView = await toUserView(userData, departmentList);
    setUserView(userView);
  };

  const fetchUserLeaveRequestStats = async () => {
    const userStatistics = await getReqStatisticForUser(userData.userId);
    setUserStats(userStatistics);
  };

  useEffect(() => {
    toUserViewObject(userData, departmentsList);
    fetchUserLeaveRequestStats();

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
        <div>
          <h2>
            {userView.firstName} {userView.lastName}
          </h2>
          <h4>{userView.email}</h4>
        </div>
        <div>
          <h3>{userView.department.name}</h3>
          <h5>{userView.department.leader.name}</h5>
        </div>
      </div>

      <div className={styles.daysOffInventory}>
        <label className={styles.daysOffTitle}>Days off:</label>
        <span className={styles.daysOff}>
          {userView.daysOffLeft} / {userView.daysOffTotal}
        </span>
        <label className={styles.onDemandTitle}>On demand:</label>
        <span className={styles.onDemand}>
          {userView.onDemandLeft} / {userView.onDemandTotal}
        </span>
      </div>

      <div className={styles.reqStatusStats}>
        <div className={styles.reqStatusStatsChart}>
          <RequestStatusChartComponent
            statusStatistics={userStats.leaveRequestsStat.statusStats}
          />
        </div>
      </div>

      <div className={styles.reqTypeStats}>
        <div className={styles.reqTypeStatsChart}>
          <RequestTypeChartComponent
            typeStatistics={userStats.leaveRequestsStat.typeStats}
          />
        </div>
      </div>
    </div>
  );
}
