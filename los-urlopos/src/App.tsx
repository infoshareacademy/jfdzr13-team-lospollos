import "./App.css";
import { daysCounter } from "./utils/days-counter";

function App() {
  return <>{daysCounter("2024-12-01", "2024-12-31")}</>;
}

export default App;
