import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddRequest } from "./components/AddRequest/AddRequest";
import { UserPanel } from "./components/UserPanel/UserPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPanel />} />
        <Route path="/addRequest" element={<AddRequest />} />
      </Routes>
    </Router>
  );
}

export default App;
