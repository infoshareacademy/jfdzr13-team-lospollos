export function deptFinder(deptList: any[], user: string): any {
  let i: number;
  let departmentAndSupervisor = { head: "", dept: "" };

  for (i = 0; i < deptList.length; i++) {
    if (deptList[i].deptId === user) {
      departmentAndSupervisor.head = deptList[i].head;
      departmentAndSupervisor.dept = deptList[i].dept;
    }
  }

  return departmentAndSupervisor;
}
