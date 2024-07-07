import { useEffect, useState } from "react";
import { useProfileImage } from "../../../contexts/ProfileImageContext"; // Import the context
import useUserData from "../../../contexts/ViewDataContext";
import pfp from "../../../images/Unknown_person.jpg"; // Default profile picture
import {
  toDepartmentViewById,
  toUserView,
} from "../../../mappers/ViewObjectsMapper";
import { DepartmentView, UserView } from "../../../types-obj/objectViewTypes";
import { SupervisorStatistics } from "../../../types-obj/statisticsTypes";
import {
  emptyDepartment,
  emptySupervisorStatistics,
  emptyUser,
} from "../../../utils/DefaultObjects";
import { getReqStatisticForSupervisor } from "../../../utils/StatisticActions";
import RequestStatusChartComponent from "../../StatisticsCharts/RequestStatusChartComponent";
import RequestTypeChartComponent from "../../StatisticsCharts/RequstTypeChartComponent";
import styles from "./spvComponent.module.css";

export function SpvComponent({ departmentId }) {
  const [profileImage, setProfileImage] = useState<string>(pfp);
  const [userView, setUserView] = useState<UserView>(emptyUser);
  const [deptView, setDeptView] = useState<DepartmentView>(emptyDepartment);
  const [spvStats, setSpvStats] = useState<SupervisorStatistics>(
    emptySupervisorStatistics
  );
  const { userData, departmentsList } = useUserData();
  const { updateProfileImage } = useProfileImage(); // Use the context hook

  const toUserViewObject = async () => {
    const userView = await toUserView(userData, departmentsList);
    setUserView(userView);
  };

  const toDeptViewObject = async () => {
    const deptView = await toDepartmentViewById(departmentsList, departmentId);
    setDeptView(deptView);
  };

  const fetchSvpLeaveRequestStats = async () => {
    const svpStats = await getReqStatisticForSupervisor(
      departmentId,
      userData.userId
    );
    setSpvStats(svpStats);
  };

  useEffect(() => {
    toUserViewObject();
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const savedImage = localStorage.getItem(
        `profileImage_${userData.email}_${userData.userId}`
      );
      if (savedImage) {
        setProfileImage(savedImage);
      } else {
        setProfileImage(pfp); // Default image if no custom image is set
      }
    }
  }, [userData]);

  useEffect(() => {
    fetchSvpLeaveRequestStats();
    toDeptViewObject();
  }, [userData, departmentId]);

  return (
    <div className={styles.spvBusinessCard}>
      <div className={styles.profilePicture}>
        <img
          className={styles.profilePictureImg}
          src={profileImage}
          alt="User profile picture"
        />
      </div>

      <div className={styles.spvDetails}>
        <div>
          <h2>
            {userView.firstName} {userView.lastName}
          </h2>
          <h4>{userView.email}</h4>
        </div>
        <div>
          <h3>{deptView.name === "" ? "All departments" : deptView.name} </h3>
        </div>
      </div>

      <div className={styles.importantSpvInfo}>
        <label className={styles.expiredTitle}>Expired requests:</label>
        <span className={styles.expired}>
          {spvStats.expiredRequests} / {spvStats.allRequests}
        </span>
        <label className={styles.onLeaveTitle}>Employees on leave:</label>
        <span className={styles.onLeave}>
          {spvStats.employeesOnLeave} / {spvStats.totalEmployees}
        </span>
      </div>

      <div className={styles.reqStatusStats}>
        <div className={styles.reqStatusStatsChart}>
          <RequestStatusChartComponent
            statusStatistics={spvStats.leaveRequestsStat.statusStats}
          />
        </div>
      </div>

      <div className={styles.reqTypeStats}>
        <div className={styles.reqTypeStatsChart}>
          <RequestTypeChartComponent
            typeStatistics={spvStats.leaveRequestsStat.typeStats}
          />
        </div>
      </div>
    </div>
  );
}
