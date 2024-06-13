enum typeOfLeave {
  AnnualLeave = "Annual Leave",
  AdditionalLeave = "Additional Leave",
  SpecialLeave = "Special Leave",
  ChildLeave = "Child Leave",
  UnpaidLeave = "Unpaid Leave",
  OnDemandLeave = "On Demand Leave",
}

const TypeOfLeave = () => {
  return (
    <>
      <option value="AnnualLeave">{typeOfLeave.AnnualLeave}</option>
      <option value="AdditionalLeave">{typeOfLeave.AdditionalLeave}</option>
      <option value="SpecialLeave">{typeOfLeave.SpecialLeave}</option>
      <option value="ChildLeave">{typeOfLeave.ChildLeave}</option>
      <option value="UnpaidLeave">{typeOfLeave.UnpaidLeave}</option>
      <option value="On DemandLeave">{typeOfLeave.OnDemandLeave}</option>
    </>
  );
};

export default TypeOfLeave;
