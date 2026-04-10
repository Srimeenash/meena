import React, { useState, useRef, useEffect } from "react";
import styles from "../App.module.css";


function TenderAnalysis() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showTimetable, setShowTimetable] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeBox, setActiveBox] = useState(-1);
  const [activeDoc, setActiveDoc] = useState(null);
  const itemRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeBidIndex, setActiveBidIndex] = useState(-1);
  const items = [
    { title: "Mandatory Eligibility Criteria", content: "Details about mandatory eligibility." },
    { title: "Financial Capability", content: "Details about financial capability." },
    { title: "Technical Experience", content: "Details about technical experience." },
    { title: "Registration & Compliance", content: "Details about registration & compliance." },
    { title: "Critical Risks & Showstopper", content: "Details about risks & showstoppers." },
  ];

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);

    // 👇 ADD THIS LINE
    setActiveIndex(index);

    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };


useEffect(() => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      setActiveBidIndex(i);
    }, 15000 + i * 500); // 👈 starts after 15 sec
  }
}, []);
useEffect(() => {
  const delays = [ 10500, 11000, 11500, 12000, 12500];

  delays.forEach((time, i) => {
    setTimeout(() => {
      setActiveIndex(i);
    }, time);
  });
}, []);

  // ActiveBox animation
useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setActiveBox(index);
      index++;
      if (index >= items.length) clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // ActiveStep animation
useEffect(() => {
  let step = 0;

  const startDelay = setTimeout(() => {
    const interval = setInterval(() => {
      step++;
      setActiveStep(step);

      if (step === 4) clearInterval(interval);
    }, 1000);

  }, 5000); // ⏱️ 5 seconds delay

  return () => clearTimeout(startDelay);
}, []);

  return (
    <div>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1 style={{ color: "#132A96" }}>Tender Analysis</h1>
          <span className={styles.tenderId}>GEM/2828/2025</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.uploadBtn}>Upload document</button>
        </div>
      </div>

      {/* Progress Row */}
      <div className={styles.progressRow}>
        {[
          { name: "Extract", icon: "/Vector (1).svg" },
          { name: "Eligibility", icon: "/Vector (5).svg" },
          { name: "Bid decision", icon: "/Vector (3).svg" },
          { name: "Process Done", icon: "/Vector (4).svg" },
        ].map((item, i) => (
          <div
            key={i}
            className={`${styles.progressBox} ${activeStep >= i + 1 ? styles.completed : ""}`}
          >
            <img src={item.icon} className={styles.icon} alt={item.name} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <div className={styles.droneBox}>DRONE RELATED</div>

      {/* Tender Timetable */}
      <div className={styles.timetableBox}>
        <div
          className={styles.sectionTitle}
          onClick={() => setShowTimetable(!showTimetable)}
        >
          Tender Timetable
        </div>
        {showTimetable && (
          <table className={styles.timetableTable}>
            <tbody>
              <tr>
                <td>Start Date</td>
                <td>12-04-2026</td>
              </tr>
              <tr>
                <td>End Date</td>
                <td>20-04-2026</td>
              </tr>
              <tr>
                <td>Pre-bid Date</td>
                <td>15-04-2026</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>


      <div className={styles.sectionHeader}>DOCUMENT INTELLIGENCE
      </div>

      {/* Document Row */}
      <div className={styles.docRow}>
        <div
          className={styles.docBox}
          onClick={() => setActiveDoc(activeDoc === "links" ? null : "links")}
        >
          <div>LINKS IN TENDER</div>
          <div className={styles.statNum}>8</div>
        </div>
        <div
          className={styles.docBox}
          onClick={() => setActiveDoc(activeDoc === "boqs" ? null : "boqs")}
        >
          <div>BOQS IN TENDER</div>
          <div className={styles.statNum}>5</div>
        </div>
        <div
          className={styles.docBox}
          onClick={() => setActiveDoc(activeDoc === "atc" ? null : "atc")}
        >
          <div>ATC DTCS</div>
          <div className={styles.statNum}>4</div>
        </div>
        <div
          className={styles.docBox}
          onClick={() => setActiveDoc(activeDoc === "policy" ? null : "policy")}
        >
          <div>POLICY DOC</div>
          <div className={styles.statNum}>0</div>
        </div>
      </div>

      {/* Scroll Boxes */}
      {activeDoc && (
        <div className={styles.scrollBox}>
          <h4>{activeDoc.toUpperCase()}</h4>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      )}

      {/* Eligibility Section */}
      <div className={styles.sectionHeader}>ELIGIBILITY</div>
      <div className={styles.eligibilityBoxes}>
        <div className={styles.eligibilityLabel}>Eligibility Rates</div>
        <div className={styles.eligibilityValue}>0%</div>
      </div>

      <div className={styles.eligibilityContainer}>
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`${styles.eligibilityBox} ${
              index === 0
                ? styles.boxBlue
                : index === 1
                ? styles.boxGreen
                : index === 2
                ? styles.boxYellow
                : index === 3
                ? styles.boxPink
                : styles.boxPurple
            } ${index <= activeIndex ? styles.showColor : ""}`}
          >
            <img
              src={`/Vector${index === 2 ? " (1)" : index > 0 ? ` (${index + 5})` : ""}.svg`}
              alt={item.title}
              className={styles.eligibilityIcon}
            />
            <div className={styles.eligibilityTitle}>{item.title}</div>
            <div className={styles.eligibilityPercent}>0%</div>
          </div>
        ))}
      </div>

      <div className={styles.customEligibilityList}>
        {items.map((item, index) => (
            <div
              key={index}
              className={`
                ${styles.customEligibilityItem}
                ${activeIndex === index ? styles.activeItem : ""}
                ${styles["color" + (index % 5)]}
              `}
              onClick={() => handleClick(index)}
            >
            <div className={styles.customEligibilityTitle}>&gt; {item.title}</div>
            <div
              className={`${styles.customEligibilityContent} ${
                openIndex === index ? styles.customVisible : ""
              }`}
            >
              {item.content}
            </div>
          </div>
        ))}
      </div><br></br>
<br></br>
      <div className={styles.sectionHeader}>BID DECISION</div>

<div className={styles.eligibilityContainers}>
  <div className={`${styles.boxEligibility} ${activeBidIndex>= 0 ? styles.showColor : ""}`}>
    <img src="/Vector.svg" alt="Eligibility" className={styles.eligibilityIcon} />
    <div className={styles.eligibilityTitle}>Eligibility</div>
    <div className={styles.eligibilityPercent}>80%</div>
  </div>

  <div className={`${styles.boxStrategic} ${activeBidIndex>= 1 ? styles.showColor : ""}`}>
    <img src="/Vector (8).svg" alt="Strategic" className={styles.eligibilityIcon} />
    <div className={styles.eligibilityTitle}>Strategic</div>
    <div className={styles.eligibilityPercent}>60%</div>
  </div>

  <div className={`${styles.boxProfitability} ${activeBidIndex >= 2 ? styles.showColor : ""}`}>
    <img src="/Vector (6).svg" alt="Profitability" className={styles.eligibilityIcon} />
    <div className={styles.eligibilityTitle}>Profitability</div>
    <div className={styles.eligibilityPercent}>0%</div>
  </div>

  <div className={`${styles.boxRisk} ${activeBidIndex >= 3 ? styles.showColor : ""}`}>
    <img src="/Mask group.svg" alt="RISK" className={styles.eligibilityIcon} />
    <div className={styles.eligibilityTitle}>RISK</div>
    <div className={styles.eligibilityPercent}>30%</div>
  </div>

  <div className={`${styles.boxCompetitive} ${activeBidIndex >= 4 ? styles.showColor : ""}`}>
    <img src="/Group (2).svg" alt="Competitive" className={styles.eligibilityIcon} />
    <div className={styles.eligibilityTitle}>Competitive</div>
    <div className={styles.eligibilityPercent}>100%</div>
  </div>
</div>
      <div className={styles.bidTitle}>BID STRATEGIC DECISION</div>

      <div className={styles.eligibilityBoxess}>
        <div className={styles.eligibilityLabel}>This BID eligibility to participate</div>
      </div>

      <div className={styles.bidTitles}>TOP REASONS</div>
      <div className={styles.bigBox}>
        <div className={styles.bigBoxContent}>
          <div>• Lorem ipsum dolor sit amet...</div>
          <div>• Lorem ipsum dolor sit amet...</div>
          <div>• Lorem ipsum dolor sit amet...</div>
          <div>• Lorem ipsum dolor sit amet...</div>
        </div>
      </div>

      <div className={styles.bidTitless}>RISK</div>
      <div className={styles.bigBoxes}>
        <div className={styles.bigBoxesContent}>
          <div>• Lorem ipsum dolor sit amet...</div>
          <div>• Lorem ipsum dolor sit amet...</div>
          <div>• Lorem ipsum dolor sit amet...</div>
          <div>• Lorem ipsum dolor sit amet...</div>
        </div>
      </div>

      <div className={styles.bidTitlesss}>NEXT STEP</div>
      <div className={styles.eligibilityBoxesss}>
        <div className={styles.eligibilityLabel}>
          Lorem ipsum dolor sit amet...orem ipsum dolor sit amet...
          orem ipsum dolor sit amet...orem ipsum dolor sit amet...orem ipsum dolor sit amet
        </div>
      </div>

      <div className={styles.tickWrapper}>
        <div className={styles.tickCircle}>✔</div>
      </div>

      <button className={styles.analyzeBtn}>Analysis completed</button>
    </div>
  );
}

// ================= MAIN APP =================


export default TenderAnalysis;