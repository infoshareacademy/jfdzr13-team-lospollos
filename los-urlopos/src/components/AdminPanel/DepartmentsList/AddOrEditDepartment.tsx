import React, { FC, useState, useEffect } from "react";
import { Departments } from "../../../types-obj/types-obj";
import {
  createDepartment,
  updateDepartment,
} from "../../../services/DepartmentService";

interface AddOrEditDepartmentProps {
  onDepartmentAddedOrEdited: () => void;
  onClose: () => void;
  departmentToEdit?: Departments | null;
}

const AddOrEditDepartment: FC<AddOrEditDepartmentProps> = ({
  onDepartmentAddedOrEdited,
  onClose,
  departmentToEdit = null,
}) => {
  const [department, setDepartment] = useState<string>("");
  const [head, setHead] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (departmentToEdit) {
      setDepartment(departmentToEdit.dept);
      setHead(departmentToEdit.head);
    }
  }, [departmentToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (departmentToEdit) {
        await updateDepartment(departmentToEdit.deptId, {
          dept: department,
          head,
        });
      } else {
        await createDepartment({ dept: department, head });
      }
      onDepartmentAddedOrEdited();
      onClose();
    } catch (error) {
      console.error("Error creating/updating department: ", error);
      setError("Error creating/updating department.");
    }
  };

  return (
    <>
      <h2>{departmentToEdit ? "Edit Department" : "Add Department"}</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Department Name:
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </label>
        <label>
          Department Head:
          <input
            type="text"
            value={head}
            onChange={(e) => setHead(e.target.value)}
            required
          />
        </label>
        <button type="submit">
          {departmentToEdit ? "Save Changes" : "Create"}
        </button>
      </form>
    </>
  );
};

export default AddOrEditDepartment;
