import React, { FC, useEffect, useState } from "react";
import { Departments } from "../../../types-obj/types-obj";
import {
  deleteDepartment,
  subscribeToDepartments,
} from "../../../services/DepartmentService";

import ConfirmAction from "../ConfirmAction";
import AddOrEditDepartment from "./AddOrEditDepartment";
import styles from "./DepartmentsList.module.css";

type DepartmentsListProps = {
  openAddDepartmentModal: () => void;
};

const DepartmentsList: FC<DepartmentsListProps> = ({}) => {
  const [departments, setDepartments] = useState<Departments[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedDeptId, setExpandedDeptId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deptToEdit, setDeptToEdit] = useState<Departments | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [deptIdToDelete, setDeptIdToDelete] = useState<string | null>(null);

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
        setLoading(false);
      },
      (errorMessage) => {
        setError(errorMessage);
        setLoading(false);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className={styles.departmentsListWrapper}>
      {/* <button onClick={handleOpenDialog}>Add Department</button> */}
      <dialog open={isDialogOpen}>
        <AddOrEditDepartment
          onDepartmentAddedOrEdited={handleDepartmentAddedOrEdited}
          onClose={handleCloseDialog}
          departmentToEdit={deptToEdit}
        />
      </dialog>

      <ul className={styles.departmentsList}>
        {departments.map((dept) => (
          <li className={styles.listLi} key={dept.deptId}>
            <div className={styles.liContent}>
              <span className={styles.label}>
                Name: <span className={styles.dept}>{dept.dept}</span>
              </span>
              <button
                className={styles.showDetailsBtn}
                onClick={() => toggleDepartmentDetails(dept.deptId!)}
              >
                {expandedDeptId === dept.deptId
                  ? "Hide details"
                  : "Show details"}
              </button>
            </div>
            {expandedDeptId === dept.deptId && (
              <div className={styles.liContent}>
                <span className={styles.insideLabel}>Head: {dept.head}</span>
                <div className={styles.listBtns}>
                  <button
                    className={styles.editBtn}
                    onClick={() => {
                      setDeptToEdit(dept);
                      handleOpenDialog();
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => confirmDeleteDepartment(dept.deptId)}
                  >
                    Delete
                  </button>
                </div>
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
      <button className={styles.addDeptBtn} onClick={handleOpenDialog}>
        Add Department
      </button>
    </div>
  );
};

export default DepartmentsList;
