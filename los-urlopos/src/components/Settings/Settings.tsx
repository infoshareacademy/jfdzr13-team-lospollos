import React, { useEffect, useState } from "react";
import useAuth from "../../contexts/AuthContext";
import useUserData from "../../contexts/ViewDataContext";
import pfp from "../../images/Unknown_person.jpg";
import styles from "./Settings.module.css";

const Settings = () => {
  const { changePassword, authUser, login } = useAuth();
  const { userData } = useUserData();
  const [changePassResult, setChangePassResult] = useState<string | null>(null);
  const [panelClass, setPanelClass] = useState(styles.panelUser); // Default class

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

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

    try {
      if (!(await isCurrentPasswordValid(currentPassword))) {
        setChangePassResult("❌ Current password is not valid!");
        resetForm("changePasswordForm");
        return;
      }

      if (
        !isNewPasswordConfirmationValid(newPassword, newPasswordConfirmation)
      ) {
        setChangePassResult(
          "❌ New password and Confirm new password must be the same!"
        );
        resetForm("changePasswordForm");
        return;
      }

      changePassword(newPassword);
      setChangePassResult("✅ Password has been changed successfully!");
    } catch (err) {
      setChangePassResult("❌ Something went wrong!");
      resetForm("changePasswordForm");
    }
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setNewPasswordConfirmation("");
    setChangePassResult(null);
  };

  useEffect(() => {
    if (userData) {
      if (userData.roleAdmin && userData.roleSupervisor && userData.roleUser) {
        setPanelClass(styles.panelMulti);
      } else if (userData.roleAdmin) {
        setPanelClass(styles.panelAdmin);
      } else if (userData.roleSupervisor) {
        setPanelClass(styles.panelSupervisor);
      } else if (userData.roleUser) {
        setPanelClass(styles.panelUser);
      }
    }
  }, [userData]);

  const [profileImage, setProfileImage] = useState<string>(pfp);

  useEffect(() => {
    if (authUser) {
      const savedImage = localStorage.getItem(
        `profileImage_${authUser.email}_${authUser.uid}`
      );
      if (savedImage) {
        setProfileImage(savedImage);
      } else {
        setProfileImage(pfp); // Default image if no custom image is set
      }
    }
  }, [authUser]);

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = document.getElementById("output") as HTMLImageElement;
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      image.src = imageUrl;
      setProfileImage(imageUrl);
      if (authUser) {
        localStorage.setItem(
          `profileImage_${authUser.email}_${authUser.id}`,
          imageUrl
        );
      }
    }
  };

  const getResultMessageClass = () => {
    if (changePassResult?.includes("✅")) {
      return styles.successMessage;
    } else if (changePassResult?.includes("❌")) {
      return styles.errorMessage;
    } else {
      return "";
    }
  };

  return (
    <div className={`${styles.mainWrapper} ${panelClass}`}>
      <div className={styles.settingsCont}>
        <h1>Settings</h1>
        <div className={styles.formContainer}>
          <div className={styles.userInfoCont}>
            <div className={styles.userPfpCont}>
              <label className={styles.label} htmlFor="file">
                <span
                  className={`${styles.glyphicon} ${styles.glyphiconCamera}`}
                ></span>
                <span className={styles.change}>Change</span>
              </label>
              <input id="file" type="file" onChange={loadFile} />
              <img
                className={styles.userPfp}
                src={profileImage}
                id="output"
                width="200"
                alt="Profile Picture"
              />
            </div>
            <div className={styles.userNameCont}>
              <span className={styles.userName}>
                {userData.firstName} {userData.surname}{" "}
              </span>
              <span className={styles.userEmail}>{userData.email}</span>
            </div>
          </div>
          <div className={styles.changePswrdWrapper}>
            <h3>Change your password</h3>
            <div className={styles.formCont}>
              <form
                id="changePasswordForm"
                method="POST"
                onSubmit={handleChangePassword}
                className={styles.changePswrdCont}
              >
                {changePassResult != null && (
                  <h5 className={getResultMessageClass()}>
                    {changePassResult}
                  </h5>
                )}
                <label>
                  Current password:
                  <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    placeholder="Enter your current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </label>
                <label>
                  New password:
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </label>
                <label>
                  Confirm new password:
                  <input
                    type="password"
                    name="newPasswordConfirmation"
                    id="newPasswordConfirmation"
                    placeholder="Re-enter your new password"
                    value={newPasswordConfirmation}
                    onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                  />
                </label>
                <div className={styles.buttonsCont}>
                  <button className={styles.saveBtn} type="submit">
                    Save
                  </button>
                  <button
                    className={styles.cancelBtn}
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
