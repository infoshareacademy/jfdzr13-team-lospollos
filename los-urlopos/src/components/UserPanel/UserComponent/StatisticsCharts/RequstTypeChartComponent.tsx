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
import { getReqStatisticForUser } from "../../../../utils/StatisticActions";

defaults.maintainAspectRatio = false;

const RequestTypeChartComponent = () => {
  ChartJS.register(ArcElement, Tooltip, Legend, Title, Colors);
  const [leaveRequestStats, setLeaveRequestStats] =
    useState<LeaveRequestTypeStats>();
  const { userData } = useUserData();

  const fetchUserLeaveRequestStats = async () => {
    const { typeStats } = await getReqStatisticForUser(userData.userId);
    setLeaveRequestStats(typeStats);
  };

  useEffect(() => {
    fetchUserLeaveRequestStats();
  }, [userData]);

  const data = {
    labels: [
      `${TYPE_OF_LEAVE.AnnualLeave} [${leaveRequestStats?.annualLeave ?? 0}]`,
      `${TYPE_OF_LEAVE.OnDemandLeave} [${
        leaveRequestStats?.onDemandLeave ?? 0
      }]`,
      `${TYPE_OF_LEAVE.AdditionalLeave} [${
        leaveRequestStats?.additionalLeave ?? 0
      }]`,
      `${TYPE_OF_LEAVE.SpecialLeave} [${leaveRequestStats?.specialLeave ?? 0}]`,
      `${TYPE_OF_LEAVE.SickLeave} [${leaveRequestStats?.sickLeave ?? 0}]`,
      `${TYPE_OF_LEAVE.ChildLeave} [${leaveRequestStats?.childLeave ?? 0}]`,
      `${TYPE_OF_LEAVE.UnpaidLeave} [${leaveRequestStats?.unpaidLeave ?? 0}]`,
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
        text: "Leave Requests types:",
        display: true,
        align: "center",
        fullSize: false,
        color: "black",
        font: {
          size: 14,
        },
      },
      legend: {
        display: true,
        position: "right",
        align: "center",
        labels: {
          boxWidth: 14,
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

export default RequestTypeChartComponent;
