import { updateUser } from "../services/UserService";

export const updateUserDaysOffLeft = async (
  userId: string,
  leftDaysCount: number,
  leftOnDemandCount: number
) => {
  await updateUser(userId, {
    currentDays: leftDaysCount,
    onDemand: leftOnDemandCount,
  });
};
