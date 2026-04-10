import React, { useState } from "react";
import styles from "./App.module.css";


import TenderIQ from "./pages/TenderIQ";
import TenderAnalysis from "./pages/TenderAnalysis";
import Chatbot from "./pages/Chatbot";

function App() {
  const [activePage, setActivePage] = useState("TenderAnalysis");

  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <div >Tender IQ</div>
        <div onClick={() => setActivePage("TenderAnalysis")}>Tender Analysis</div>
        <div onClick={() => setActivePage("Chatbot")}>Chatbot</div>
      </div>

      <div className={styles.main}>
        {activePage === "TenderIQ" && <TenderIQ />}
        {activePage === "TenderAnalysis" && <TenderAnalysis />}
        {activePage === "Chatbot" && <Chatbot />}
      </div>
    </div>
  );
}

export default App;   // ✅ CORRECT