import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
  defaults,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import REQUEST_STATUS from "../../enums/requestStatus";

defaults.maintainAspectRatio = false;

const RequestStatusChartComponent = ({ statusStatistics }) => {
  ChartJS.register(ArcElement, Tooltip, Legend, Title);

  const data = {
    labels: [
      `${REQUEST_STATUS.Pending}: ${statusStatistics?.pendingRequest ?? 0}`,
      `${REQUEST_STATUS.Approved}: ${statusStatistics?.approvedRequest ?? 0}`,
      `${REQUEST_STATUS.Rejected}: ${statusStatistics?.rejectedRequest ?? 0}`,
      `${REQUEST_STATUS.Cancelled}: ${statusStatistics?.cancelledRequest ?? 0}`,
    ],
    datasets: [
      {
        data: [
          statusStatistics?.pendingRequest,
          statusStatistics?.approvedRequest,
          statusStatistics?.rejectedRequest,
          statusStatistics?.cancelledRequest,
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
