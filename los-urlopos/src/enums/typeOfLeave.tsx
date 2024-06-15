enum TYPE_OF_LEAVE {
  AnnualLeave = "Annual Leave",
  AdditionalLeave = "Additional Leave",
  SpecialLeave = "Special Leave",
  ChildLeave = "Child Leave",
  UnpaidLeave = "Unpaid Leave",
  OnDemandLeave = "On Demand Leave",
}

export const GetTypeOfLeaveOptions = () => {
  return (
    <>
      <option value={TYPE_OF_LEAVE.AnnualLeave}>
        {TYPE_OF_LEAVE.AnnualLeave}
      </option>
      <option value={TYPE_OF_LEAVE.AdditionalLeave}>
        {TYPE_OF_LEAVE.AdditionalLeave}
      </option>
      <option value={TYPE_OF_LEAVE.SpecialLeave}>
        {TYPE_OF_LEAVE.SpecialLeave}
      </option>
      <option value={TYPE_OF_LEAVE.ChildLeave}>
        {TYPE_OF_LEAVE.ChildLeave}
      </option>
      <option value={TYPE_OF_LEAVE.UnpaidLeave}>
        {TYPE_OF_LEAVE.UnpaidLeave}
      </option>
      <option value={TYPE_OF_LEAVE.OnDemandLeave}>
        {TYPE_OF_LEAVE.OnDemandLeave}
      </option>
    </>
  );
};

export default TYPE_OF_LEAVE;
