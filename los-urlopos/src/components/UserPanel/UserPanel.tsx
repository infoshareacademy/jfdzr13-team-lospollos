import { CalendarComponent } from "./CalendarComponent/CalendarComponent";
import ListComponent from "./ListComponent/ListComponent";
import { UserComponent } from "./UserComponent/UserComponent";
import styles from "./userPanel.module.css";

export function UserPanel() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.devNavbar}>
        NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR
        NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR
        NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR
        NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR
        NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR
        NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR
      </div>
      <div className={styles.userAndListContainer}>
        <div className={styles.userAndCallendarContainer}>
          <UserComponent />
          <CalendarComponent />
        </div>
        <ListComponent />
      </div>
    </div>
  );
}
