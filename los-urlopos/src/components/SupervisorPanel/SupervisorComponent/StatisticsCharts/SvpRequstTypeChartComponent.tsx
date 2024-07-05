import {
  ArcElement,
  Chart as ChartJS,
  Colors,
  Legend,
  Title,
  Tooltip,
  defaults,
} from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import useUserData from "../../../../contexts/ViewDataContext";
import TYPE_OF_LEAVE from "../../../../enums/typeOfLeave";
import { LeaveRequestTypeStats } from "../../../../types-obj/statisticsTypes";
import { getReqStatisticForSupervisor } from "../../../../utils/StatisticActions";

defaults.maintainAspectRatio = false;

const SvpRequestTypeChartComponent = ({ departmentId }) => {
  ChartJS.register(ArcElement, Tooltip, Legend, Title, Colors);
  const [leaveRequestStats, setLeaveRequestStats] =
    useState<LeaveRequestTypeStats>();
  const { userData } = useUserData();

  const fetchSvpLeaveRequestStats = async () => {
    const { leaveRequestsStat } = await getReqStatisticForSupervisor(
      departmentId
    );
    setLeaveRequestStats(leaveRequestsStat.typeStats);
  };

  useEffect(() => {
    fetchSvpLeaveRequestStats();
  }, [userData, departmentId]);

  const data = {
    labels: [
      `${TYPE_OF_LEAVE.AnnualLeave}: ${leaveRequestStats?.annualLeave ?? 0}`,
      `${TYPE_OF_LEAVE.OnDemandLeave}: ${
        leaveRequestStats?.onDemandLeave ?? 0
      }`,
      `${TYPE_OF_LEAVE.AdditionalLeave}: ${
        leaveRequestStats?.additionalLeave ?? 0
      }`,
      `${TYPE_OF_LEAVE.SpecialLeave}: ${leaveRequestStats?.specialLeave ?? 0}`,
      `${TYPE_OF_LEAVE.SickLeave}: ${leaveRequestStats?.sickLeave ?? 0}`,
      `${TYPE_OF_LEAVE.ChildLeave}: ${leaveRequestStats?.childLeave ?? 0}`,
      `${TYPE_OF_LEAVE.UnpaidLeave}: ${leaveRequestStats?.unpaidLeave ?? 0}`,
    ],
    datasets: [
      {
        data: [
          leaveRequestStats?.annualLeave,
          leaveRequestStats?.onDemandLeave,
          leaveRequestStats?.additionalLeave,
          leaveRequestStats?.specialLeave,
          leaveRequestStats?.sickLeave,
          leaveRequestStats?.childLeave,
          leaveRequestStats?.unpaidLeave,
        ],
        hoverOffset: 10,
      },
    ],
  };
  const labelTooltip = () => {
    return "";
  };

  const options = {
    plugins: {
      title: {
        text: "Requests type:",
        display: true,
        align: "center",
        fullSize: false,
        color: "black",
        font: {
          size: 16,
          family: "Phudu",
        },
      },
      legend: {
        display: true,
        position: "right",
        align: "center",
        labels: {
          boxWidth: 16,
          font: {
            size: 16,
            family: "Phudu",
          },
        },
      },
      tooltip: {
        titleMarginBottom: 0,
        callbacks: {
          label: labelTooltip,
        },
      },
    },
    colors: {
      enabled: false,
    },
  };

  return (
    <Doughnut
      // className={styles.reqStatusStatsChart}
      id="reqStatusStatsChart"
      datasetIdKey="reqStatusStats"
      data={data}
      options={options}
      plugins={[]}
    />
  );
};

export default SvpRequestTypeChartComponent;
