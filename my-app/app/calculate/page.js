"use client";
import { Steps } from "antd";
import { useEffect, useState } from "react";
import Step1 from "../../components/Step1";
import Step2 from "../../components/Step2";
import Step3 from "../../components/Step3";
import Step4 from "../../components/Step4";
import Step5 from "../../components/Step5";
import Step6 from "../../components/Step6";
import Step7 from "../../components/Step7";
import Step8 from "../../components/Step8";
import Step9 from "../../components/Step9";
import Step10 from "../../components/Step10";
import Step0 from "../../components/Step0";

import Step4copy from "../../components/Step4 copy";
import Step5copy from "../../components/Step5 copy";
import Step6copy from "../../components/Step6 copy";
import Step7copy from "../../components/Step7 copy";
import axios from "axios";

import { useToast } from "@/components/ui/use-toast"


function generateUniqueSheetName() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
  const day = String(currentDate.getDate()).padStart(2, "0"); // Add leading zero if needed
  const hours = String(currentDate.getHours()).padStart(2, "0"); // Add leading zero if needed
  const minutes = String(currentDate.getMinutes()).padStart(2, "0"); // Add leading zero if needed
  const seconds = String(currentDate.getSeconds()).padStart(2, "0"); // Add leading zero if needed
  const milliseconds = String(currentDate.getMilliseconds()).padStart(3, "0"); // Add leading zeroes if needed

  // Combine date and time components to create a unique sheet name
  const uniqueSheetName = `${year}${month}${day}_${hours}${minutes}${seconds}_${milliseconds}`;

  return uniqueSheetName;
}

const page = () => {
  const { toast } = useToast()

  const [sheetName, setSheetName] = useState(generateUniqueSheetName());
  
  const [current, setCurrent] = useState(0);
  const [prs, setPrs] = useState([
    // { name: "a", weight: "1" },
    // { name: "b", weight: "2" },
  ]);
  const [subPrs, setSubPrs] = useState([]);

  const [sdrs1, setSdrs1] = useState([]);
  const [sdrs2, setSdrs2] = useState([]);
  const [ffns, setFFns] = useState({});
  const [scores, setScores] = useState({});

  const [pairwiseComparisons, setPairwiseComparisons] = useState();

  const [sdr1PrRelation, setSdr1PrRelation] = useState();
  const [sdr2PrRelation, setSdr2PrRelation] = useState();

  const [comparisonFFns, setComparisonFFns] = useState({});
  const [comparisonScores, setComparisonScores] = useState({});

  const [correlationFFns, setCorrelationFFns] = useState([]);
  const [correlationScores, setCorrelationScores] = useState([]);

  const [aggregatedPairwise, setAggregatedPairwise] = useState([]);

  const [aggregatedComparison, setAggregatedComparison] = useState([]);

  const [aggregatedCorrelation, setAggregatedCorrelation] = useState([]);

  const [FFNWeights, setFFNWeights] = useState([
    { key: "0.1,0.95", value: "" },
    { key: "0.1,0.8", value: "" },
    { key: "0.2,0.65", value: "" },
    { key: "0.3,0.5", value: "" },
    { key: "0.42,0.4", value: "" },
    { key: "0.5,0.3", value: "" },
    { key: "0.65,0.2", value: "" },
    { key: "0.8,0.1", value: "" },
    { key: "0.95,0.1", value: "" },
  ]);

  const [ris, setRis] = useState([]);
  const [scoreValues, setScoreValues] = useState([]);
  const [tableId, setTableId] = useState();
  const [saveToggle, setSaveToggle] = useState();

  const currentDate = new Date().toLocaleString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric', 
    hour12: true 
  });

  useEffect(() => {
    console.log("saved");
  }, [saveToggle]);

  const updateTable = (data, key) => {
    const payload = {
      [key]: data, // Dynamically set the key-value pair
      id: tableId,
    };
    axios.post("/api/sample", payload).then((res) => {
      toast({
        title: "Data has been saved successfully.",
        description: currentDate,
      })
      if (!tableId && res.data._id) {
        setTableId(res.data._id);
      }
    }).catch((err) => {
      console.error(err);
      toast({
        title: "An error occurred while saving data.",
        description: currentDate,
      })
    });
  };

  const steps = [
    {
      title: "Wts",
      content: (
        <Step0
          setCurrent={setCurrent}
          FFNWeights={FFNWeights}
          setFFNWeights={setFFNWeights}
          setPrs={setPrs}
          setSubPrs={setSubPrs}
          setPairwiseComparisons={setPairwiseComparisons}

          setSdrs1={setSdrs1}
          setSdrs2={setSdrs2}

          setSdr1PrRelation={setSdr1PrRelation}
          setSdr2PrRelation={setSdr2PrRelation}

          setTableId={setTableId}
          tableId={tableId}
          setSaveToggle={setSaveToggle}
          updateTable={updateTable}
        />
      ),
    },
    {
      title: "RDR",
      content: (
        <Step1
          setCurrent={setCurrent}
          prs={prs}
          setPrs={setPrs}
          subPrs={subPrs}
          setSubPrs={setSubPrs}
          updateTable={updateTable}
        />
      ),
    },
    {
      title: "matrix",
      content: (
        <Step2
          setCurrent={setCurrent}
          pairwiseComparisons={pairwiseComparisons}
          setFFns={setFFns}
          setScores={setScores}
          subPrs={subPrs}
          updateTable={updateTable}
        />
      ),
    },
    {
      title: "Agg",
      content: (
        <Step3
          setCurrent={setCurrent}
          ffns={ffns}
          subPrs={subPrs}
          setAggregatedPairwise={setAggregatedPairwise}
          aggregatedPairwise={aggregatedPairwise}
          FFNWeights={FFNWeights}
        />
      ),
    },
    {
      title: "PM",
      content: (
        <Step4
          setCurrent={setCurrent}
          sdrs1={sdrs1}
          setSdrs1={setSdrs1}
          updateTable={updateTable}
        />
      ),
    },
    {
      title: "matrix",
      content: (
        <Step5
          setCurrent={setCurrent}
          sdrs1={sdrs1}
          sdr1PrRelation={sdr1PrRelation}
          subPrs={subPrs}
          setComparisonFFns={setComparisonFFns}
          setComparisonScores={setComparisonScores}
          updateTable={updateTable}
        />
      ),
    },
    {
      title: "Agg",
      content: (
        <Step6
          setCurrent={setCurrent}
          comparisonFFns={comparisonFFns}
          sdrs1={sdrs1}
          subPrs={subPrs}
          setAggregatedComparison={setAggregatedComparison}
          aggregatedComparison={aggregatedComparison}
          FFNWeights={FFNWeights}
        />
      ),
    },
    {
      title: "RI",
      content: (
        <Step7
          setCurrent={setCurrent}
          aggregatedComparison={aggregatedComparison}
          subPrs={subPrs}
          setRis={setRis}
          ris={ris}
          sdrs1={sdrs1}
          sheetName={sheetName}
        />
      ),
    },
    {
      title: "SE",
      content: (
        <Step4copy
          setCurrent={setCurrent}
          sdrs2={sdrs2}
          setSdrs2={setSdrs2}
          updateTable={updateTable}
        />
      ),
    },
    {
      title: "matrix",
      content: (
        <Step5copy
          setCurrent={setCurrent}
          sdrs2={sdrs2}
          sdr2PrRelation={sdr2PrRelation}
          subPrs={subPrs}
          setComparisonFFns={setComparisonFFns}
          setComparisonScores={setComparisonScores}
          updateTable={updateTable}
        />
      ),
    },
    {
      title: "Agg",
      content: (
        <Step6copy
          setCurrent={setCurrent}
          comparisonFFns={comparisonFFns}
          sdrs2={sdrs2}
          subPrs={subPrs}
          setAggregatedComparison={setAggregatedComparison}
          aggregatedComparison={aggregatedComparison}
          FFNWeights={FFNWeights}
        />
      ),
    },
    {
      title: "RI",
      content: (
        <Step7copy
          setCurrent={setCurrent}
          aggregatedComparison={aggregatedComparison}
          subPrs={subPrs}
          setRis={setRis}
          ris={ris}
          sdrs2={sdrs2}
          sheetName={sheetName}
        />
      ),
    }
    
    // {
    //   title: "Step 8",
    //   content: (
    //     <Step8
    //       setCurrent={setCurrent}
    //       sdrs={sdrs}
    //       setCorrelationFFns={setCorrelationFFns}
    //       setCorrelationScores={setCorrelationScores}
    //     />
    //   ),
    // },
    // {
    //   title: "Step 9",
    //   content: (
    //     <Step9
    //       setCurrent={setCurrent}
    //       prs={subPrs}
    //       sdrs={sdrs}
    //       correlationFFns={correlationFFns}
    //       setAggregatedCorrelation={setAggregatedCorrelation}
    //       aggregatedCorrelation={aggregatedCorrelation}
    //       FFNWeights={FFNWeights}
    //     />
    //   ),
    // },
    // {
    //   title: "Step 10",
    //   content: (
    //     <Step10
    //       setCurrent={setCurrent}
    //       prs={subPrs}
    //       sdrs={sdrs}
    //       scoreValues={scoreValues}
    //       setScoreValues={setScoreValues}
    //       aggregatedCorrelation={aggregatedCorrelation}
    //     />
    //   ),
    // },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className=" py-12 px-24 mt-1">
      <Steps
        className="my-2.5 mx-auto"
        type="navigation"
        current={current}
        items={items}
      />
      {/* onChange={(value)=>setCurrent(value)} */}
      <div>
        <div className=" mt-10 ">{steps[current].content}</div>
      </div>
    </div>
  );
};

export default page;
