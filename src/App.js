import "./App.css";
import { useEffect, useState } from "react";
import { tenureData } from "./utils/constants";
import TextInput from "./components/TextInput";

function App() {
  const [cost, setCost] = useState(5000000);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);
  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }

    const emi = calculateEMI(downPayment);
    setEmi(emi);
  }, [tenure]);
  const calculateEMI = (downPayment) => {
    if (!cost) return;
    const loanAmount = cost - downPayment;
    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;

    const EMI =
      (loanAmount * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
      ((1 + rateOfInterest) ** numOfYears - 1);
    return Number(EMI / 12).toFixed(0);
  };
  const updateEMI = (e) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));
    const emi = calculateEMI(dp);
    setEmi(emi);
  };
  const updateDownPayment = (e) => {
    if (!cost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));
    const dp = calculateDp(emi);
    setDownPayment(dp);
  };
  const calculateDp = (emi) => {
    if (!cost) {
      return;
    }
    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  return (
    <div className="App">
      <span className="title" style={{ fontSize: 30, marginTop: 10 }}>
        EMI Calculator
      </span>
      <TextInput title="Total cost of Asset" state={cost} setState={setCost}/>
      <TextInput title="Processing Fee in %" state={fee} setState={setFee}/>
      <span className="title">Down Payment</span>
      <span className="title" style={{textDecoration:"underline"}}>
        Total Down Payment-{""} {(Number(downPayment)+(cost-downPayment) * (fee/100)).toFixed(0)}
      </span>

      <div>
        <input
          type="range"
          min="0"
          max={cost}
          className="slider"
          value={downPayment}
          onChange={updateEMI}
        />
        <div className="labels">
          <label>0%</label>
          <b>{downPayment}</b>
          <label>100%</label>
        </div>
      </div>
      <span className="title">Loan per month</span>
      <span className="title" style={{textDecoration:"underline"}}>
        Total Loan Amount-{""} {(emi*tenure).toFixed(0)}
      </span>
      <div>
        <input
          type="range"
          min={calculateEMI(cost)}
          max={calculateEMI(0)}
          className="slider"
          value={emi}
          onChange={updateDownPayment}
        />
        <div className="labels">
          <label>{calculateEMI(cost)}</label>
          <b>{emi}</b>
          <label>{calculateEMI(0)}</label>
        </div>
      </div>
      <span className="title">Tenure</span>
      <div className="tenureContainer">
        {tenureData.map((t) => {
          console.log(tenure);
          console.log(t);
          return (
            <button
              className={`tenure ${t === tenure ? "selected" : ""}`}
              onClick={() => setTenure(t)}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
