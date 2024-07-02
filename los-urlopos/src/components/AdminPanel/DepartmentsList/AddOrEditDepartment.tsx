import React, { FC, useState, useEffect } from "react";
import { Departments } from "../../../types-obj/types-obj";
import {
  createDepartment,
  updateDepartment,
} from "../../../services/DepartmentService";
import { fetchSupervisors } from "../../../services/UserService";

type AddOrEditDepartmentProps = {
  onDepartmentAddedOrEdited: () => void;
  onClose: () => void;
  departmentToEdit?: Departments | null;
};

const AddOrEditDepartment: FC<AddOrEditDepartmentProps> = ({
  onDepartmentAddedOrEdited,
  onClose,
  departmentToEdit = null,
}) => {
  const [departmentName, setDepartmentName] = useState<string>("");
  const [departmentHead, setDepartmentHead] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [supervisors, setSupervisors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (departmentToEdit) {
      setDepartmentName(departmentToEdit.dept);
      setDepartmentHead(departmentToEdit.head);
    }
  }, [departmentToEdit]);

  useEffect(() => {
    const fetchSupervisorsList = async () => {
      setLoading(true);
      try {
        const supervisorList = await fetchSupervisors();
        setSupervisors(supervisorList);
      } catch (error) {
        console.error("Error fetching supervisors: ", error);
        setError("Error fetching supervisors.");
      } finally {
        setLoading(false);
      }
    };

    fetchSupervisorsList();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (departmentToEdit) {
        await updateDepartment(departmentToEdit.deptId!, {
          dept: departmentName,
          head: departmentHead,
          deptId: "",
        });
      } else {
        await createDepartment({
          dept: departmentName,
          head: departmentHead,
          deptId: "",
        });
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
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </label>
        <label>
          Department Head:
          <select
            value={departmentHead}
            onChange={(e) => setDepartmentHead(e.target.value)}
            required
          >
            <option></option>
            {loading ? (
              <option disabled>Loading...</option>
            ) : (
              supervisors.map((supervisor) => (
                <option key={supervisor.id} value={supervisor.id}>
                  {`${supervisor.firstName} ${supervisor.surname}`}
                </option>
              ))
            )}
          </select>
        </label>
        <button type="submit">
          {departmentToEdit ? "Save Changes" : "Create"}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default AddOrEditDepartment;
