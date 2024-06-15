export enum typeOfLeave {
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
      <option value="Annual Leave">{typeOfLeave.AnnualLeave}</option>
      <option value="Additional Leave">{typeOfLeave.AdditionalLeave}</option>
      <option value="Special Leave">{typeOfLeave.SpecialLeave}</option>
      <option value="Child Leave">{typeOfLeave.ChildLeave}</option>
      <option value="Unpaid Leave">{typeOfLeave.UnpaidLeave}</option>
      <option value="On Demand Leave">{typeOfLeave.OnDemandLeave}</option>
    </>
  );
};

export default TypeOfLeave;
