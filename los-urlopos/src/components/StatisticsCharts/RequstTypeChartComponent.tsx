import {
  ArcElement,
  Chart as ChartJS,
  Colors,
  Legend,
  Title,
  Tooltip,
  defaults,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import TYPE_OF_LEAVE from "../../enums/typeOfLeave";

defaults.maintainAspectRatio = false;

const RequestTypeChartComponent = ({ typeStatistics }) => {
  ChartJS.register(ArcElement, Tooltip, Legend, Title, Colors);

  const data = {
    labels: [
      `${TYPE_OF_LEAVE.AnnualLeave}: ${typeStatistics?.annualLeave ?? 0}`,
      `${TYPE_OF_LEAVE.OnDemandLeave}: ${typeStatistics?.onDemandLeave ?? 0}`,
      `${TYPE_OF_LEAVE.AdditionalLeave}: ${
        typeStatistics?.additionalLeave ?? 0
      }`,
      `${TYPE_OF_LEAVE.SpecialLeave}: ${typeStatistics?.specialLeave ?? 0}`,
      `${TYPE_OF_LEAVE.SickLeave}: ${typeStatistics?.sickLeave ?? 0}`,
      `${TYPE_OF_LEAVE.ChildLeave}: ${typeStatistics?.childLeave ?? 0}`,
      `${TYPE_OF_LEAVE.UnpaidLeave}: ${typeStatistics?.unpaidLeave ?? 0}`,
    ],
    datasets: [
      {
        data: [
          typeStatistics?.annualLeave,
          typeStatistics?.onDemandLeave,
          typeStatistics?.additionalLeave,
          typeStatistics?.specialLeave,
          typeStatistics?.sickLeave,
          typeStatistics?.childLeave,
          typeStatistics?.unpaidLeave,
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
      id="reqStatusStatsChart"
      datasetIdKey="reqStatusStats"
      data={data}
      options={options}
      plugins={[]}
    />
  );
};

export default RequestTypeChartComponent;
