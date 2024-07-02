import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
  defaults,
} from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import useUserData from "../../../../contexts/ViewDataContext";
import REQUEST_STATUS from "../../../../enums/requestStatus";
import { LeaveRequestStatusStats } from "../../../../types-obj/statisticsTypes";
import { getReqStatisticForUser } from "../../../../utils/StatisticActions";

defaults.maintainAspectRatio = false;

const RequestStatusChartComponent = () => {
  ChartJS.register(ArcElement, Tooltip, Legend, Title);
  const [leaveRequestStats, setLeaveRequestStats] =
    useState<LeaveRequestStatusStats>();
  const { userData } = useUserData();

  const fetchUserLeaveRequestStats = async () => {
    const { statusStats } = await getReqStatisticForUser(userData.userId);
    setLeaveRequestStats(statusStats);
  };

  useEffect(() => {
    fetchUserLeaveRequestStats();
  }, [userData]);

  const data = {
    labels: [
      `${REQUEST_STATUS.Pending} [${leaveRequestStats?.pendingRequest ?? 0}]`,
      `${REQUEST_STATUS.Approved} [${leaveRequestStats?.approvedRequest ?? 0}]`,
      `${REQUEST_STATUS.Rejected} [${leaveRequestStats?.rejectedRequest ?? 0}]`,
      `${REQUEST_STATUS.Cancelled} [${
        leaveRequestStats?.cancelledRequest ?? 0
      }]`,
    ],
    datasets: [
      {
        data: [
          leaveRequestStats?.pendingRequest,
          leaveRequestStats?.approvedRequest,
          leaveRequestStats?.rejectedRequest,
          leaveRequestStats?.cancelledRequest,
        ],
        backgroundColor: [
          "rgba(3, 11, 252, 0.7)",
          "rgba(0, 175, 0, 1)",
          "rgba(213, 69, 69, 0.73)",
          "rgba(0, 0, 0, 0.3)",
          ,
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
        text: "Requests status:",
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
        align: "end",
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

export default RequestStatusChartComponent;
