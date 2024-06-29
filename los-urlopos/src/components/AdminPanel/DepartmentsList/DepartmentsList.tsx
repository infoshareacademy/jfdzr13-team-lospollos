import React, { FC, useEffect, useState } from "react";
import { Departments } from "../../../types-obj/types-obj";
import {
  deleteDepartment,
  subscribeToDepartments,
} from "../../../services/DepartmentService";
import Modal from "react-modal";
import ConfirmAction from "../ConfirmAction";
import AddOrEditDepartment from "./AddOrEditDepartment";

interface DepartmentsListProps {
  openAddDepartmentModal: () => void;
}

const DepartmentsList: FC<DepartmentsListProps> = ({}) => {
  const [departments, setDepartments] = useState<Departments[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [expandedDeptId, setExpandedDeptId] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deptToEdit, setDeptToEdit] = useState<Departments | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [deptIdToDelete, setDeptIdToDelete] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (dept: Departments) => {
    setDeptToEdit(dept);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setDeptToEdit(null);
    setEditModalOpen(false);
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
    <div>
      <h1>Departments</h1>
      <button onClick={openModal}>Add Department</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel={deptToEdit ? "Edit Department" : "Add Department"}
      >
        <button onClick={closeModal}>Close</button>
        <AddOrEditDepartment
          onDepartmentAddedOrEdited={closeModal}
          onClose={closeModal}
          departmentToEdit={deptToEdit}
        />
      </Modal>
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
                <span>Head: {dept.head}</span>
                <button
                  onClick={() => {
                    setDeptToEdit(dept);
                    openModal();
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
