import styles from "./App.module.css";

import { UserPanel } from "./components/UserPanel/UserPanel";

function App() {
  return (
    <div className={styles.mainContainer}>
      <UserPanel />
    </div>
  );
}

export default App;
