import React, { createContext, useContext, useEffect, useState } from "react";
import pfp from "../images/Unknown_person.jpg";
import useAuth from "./AuthContext"; // Dostosuj ścieżkę, jeśli to konieczne

const ProfileImageContext = createContext();

export const ProfileImageProvider = ({ children }) => {
  const { authUser } = useAuth();
  const [profileImage, setProfileImage] = useState(pfp);

  useEffect(() => {
    if (authUser) {
      const savedImage = localStorage.getItem(
        `profileImage_${authUser.email}_${authUser.uid}`
      );
      if (savedImage) {
        setProfileImage(savedImage);
      }
    }
  }, [authUser]);

  const updateProfileImage = (newImage) => {
    if (authUser) {
      localStorage.setItem(
        `profileImage_${authUser.email}_${authUser.uid}`,
        newImage
      );
      setProfileImage(newImage);
    }
  };

  return (
    <ProfileImageContext.Provider value={{ profileImage, updateProfileImage }}>
      {children}
    </ProfileImageContext.Provider>
  );
};

export const useProfileImage = () => useContext(ProfileImageContext);
