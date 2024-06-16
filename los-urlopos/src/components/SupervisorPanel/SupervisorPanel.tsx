import React from "react";
import ListComponent from "../UserPanel/ListComponent/ListComponent";
import { getDepartment } from "../../services/DepartmentService";

const SupervisorPanel = () => {
  getDepartment().then((deptList) => {});

  return (
    <div>
      SupervisorPanel
      <ListComponent />
    </div>
  );
};

export default SupervisorPanel;