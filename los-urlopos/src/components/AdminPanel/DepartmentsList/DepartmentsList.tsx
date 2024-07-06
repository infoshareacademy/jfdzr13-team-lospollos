import React, { FC, useEffect, useState } from "react";
import { Departments } from "../../../types-obj/types-obj";
import {
  deleteDepartment,
  subscribeToDepartments,
} from "../../../services/DepartmentService";
import { getUserById } from "../../../services/UserService";
import ConfirmAction from "../ConfirmAction";
import AddOrEditDepartment from "./AddOrEditDepartment";

type DepartmentsListProps = {
  openAddDepartmentModal: () => void;
};

const DepartmentsList: FC<DepartmentsListProps> = ({}) => {
  const [departments, setDepartments] = useState<Departments[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedDeptId, setExpandedDeptId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deptToEdit, setDeptToEdit] = useState<Departments | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [deptIdToDelete, setDeptIdToDelete] = useState<string | null>(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchHeadData = async () => {
      if (expandedDeptId) {
        const department = departments.find(
          (dept) => dept.deptId === expandedDeptId
        );
        if (department && department.head && !users[department.head]) {
          try {
            const user = await getUserById(department.head);
            if (user) {
              setUsers((prevUsers) => ({
                ...prevUsers,
                [department.head]: {
                  firstName: user.firstName,
                  surname: user.surname,
                },
              }));
            }
          } catch (error) {
            console.error("Error fetching user data: ", error);
          }
        }
      }
    };

    fetchHeadData();
  }, [expandedDeptId, departments, users]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setDeptToEdit(null);
  };

  const handleDepartmentAddedOrEdited = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const unsub = subscribeToDepartments(
      (departmentsData) => {
        setDepartments(departmentsData);
        setIsLoading(false);
      },
      (errorMessage) => {
        setError(errorMessage);
        setIsLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const handleDeleteDepartment = async (departmentId: string) => {
    try {
      await deleteDepartment(departmentId);
      setError(null);
    } catch (error) {
      console.error("Error deleting department: ", error);
      setError("Error deleting department.");
    }
  };

  const confirmDeleteDepartment = (id: string) => {
    setDeptIdToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deptIdToDelete) {
      handleDeleteDepartment(deptIdToDelete);
    }
    setConfirmDialogOpen(false);
    setDeptIdToDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
    setDeptIdToDelete(null);
  };

  const toggleDepartmentDetails = (id: string) => {
    setExpandedDeptId(expandedDeptId === id ? null : id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <button onClick={handleOpenDialog}>Add Department</button>
      <dialog open={isDialogOpen}>
        <AddOrEditDepartment
          onDepartmentAddedOrEdited={handleDepartmentAddedOrEdited}
          onClose={handleCloseDialog}
          departmentToEdit={deptToEdit}
        />
      </dialog>
      <ul>
        {departments.map((dept) => (
          <li key={dept.deptId}>
            <div>
              <span>Name: {dept.dept}</span>
              <button onClick={() => toggleDepartmentDetails(dept.deptId!)}>
                {expandedDeptId === dept.deptId
                  ? "Hide details"
                  : "Show details"}
              </button>
            </div>
            {expandedDeptId === dept.deptId && (
              <div>
                <span>
                  Head:{" "}
                  {users[dept.head]
                    ? `${users[dept.head].firstName} ${
                        users[dept.head].surname
                      }`
                    : "Loading..."}
                </span>
                <button
                  onClick={() => {
                    setDeptToEdit(dept);
                    handleOpenDialog();
                  }}
                >
                  Edit
                </button>
                <button onClick={() => confirmDeleteDepartment(dept.deptId)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <ConfirmAction
        open={confirmDialogOpen}
        message="Are you sure you want to delete this department?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default DepartmentsList;
