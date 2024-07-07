import inactive from "../../images/rosol.jpg";
import styles from "./InactiveUserComponnt.module.css";

const InactiveUserComponent = () => {
  return (
    <div className={styles.inactiveUserCnt}>
      <h1>User is inactive!</h1>
      <div className={styles.withBackground}>
        <img src={inactive} />
      </div>
    </div>
  );
};

export default InactiveUserComponent;
