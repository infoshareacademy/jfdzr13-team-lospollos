import { useState, useEffect } from "react";
import useAuth from "../../contexts/AuthContext";
import useUserData from "../../contexts/ViewDataContext";
import styles from "./Settings.module.css";

const Settings = () => {
  const { changePassword, authUser, login } = useAuth();
  const { userData } = useUserData();
  const [changePassResult, setChangePassResutl] = useState<string | null>(null);
  const [panelClass, setPanelClass] = useState(styles.panelUser); // Default class

  const isCurrentPasswordValid = async (currentPassword: string) => {
    try {
      await login(authUser!.email, currentPassword);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const isNewPasswordConfirmationValid = (
    newPassword: string,
    newPasswordConfirmation: string
  ) => {
    return newPassword === newPasswordConfirmation;
  };

  const resetForm = (formName: string) => {
    document.getElementById(formName)?.reset();
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const newPasswordConfirmation = formData.get(
      "newPasswordConfirmation"
    ) as string;

    try {
      if (!(await isCurrentPasswordValid(currentPassword))) {
        setChangePassResutl("❌ Current password is not valid!");
        resetForm("changePasswordForm");
        return;
      }

      if (
        !isNewPasswordConfirmationValid(newPassword, newPasswordConfirmation)
      ) {
        setChangePassResutl(
          "❌ New password and Confirm new password must be the same!"
        );
        resetForm("changePasswordForm");
        return;
      }

      changePassword(newPassword);
      setChangePassResutl("✅ Password has been changed successfully!");
    } catch (err) {
      setChangePassResutl("❌ Something went wrong!");
      resetForm("changePasswordForm");
    }
  };

  const handleCancel = (e) => {
    document.getElementById("changePasswordForm")?.reset();
  };

  useEffect(() => {
    if (userData) {
      if (userData.roleAdmin) {
        setPanelClass(styles.panelAdmin);
      } else if (userData.roleSupervisor) {
        setPanelClass(styles.panelSupervisor);
      } else if (userData.roleUser) {
        setPanelClass(styles.panelUser);
      }
    }
  }, [userData]);

  return (
    <div className={`${styles.mainContainer} ${panelClass}`}>
      <h1>Settings</h1>
      <div className={styles.formContainer}>
        <h2>User</h2>
        <h3>Change password</h3>
        <form
          id="changePasswordForm"
          method="POST"
          onSubmit={handleChangePassword}
        >
          {changePassResult != null && <h5>{changePassResult}</h5>}
          <label>
            Current password:
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
            />
          </label>
          <label>
            New password:
            <input type="password" name="newPassword" id="newPassword" />
          </label>
          <label>
            Confirm new password:
            <input
              type="password"
              name="newPasswordConfirmation"
              id="newPasswordConfirmation"
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
