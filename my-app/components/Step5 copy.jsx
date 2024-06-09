"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Base from "antd/es/typography/Base";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function createArray(n) {
  return Array.from({ length: n }, (_, i) => i);
}

const options = [
  {
    value: "ALI_ALR_ALC",
    label:
      "Absolutely Low Important (ALI), Absolutely Low Related (ALR), Absolutely Low Correlation (ALC)",
  },
  {
    value: "VLI_VLR_VLC",
    label:
      "Very Low Important (VLI), Very Low Related (VLR), Very Low Correlation (VLC)",
  },
  {
    value: "LI_LR_LC",
    label: "Low Important (LI), Low Related (LR), Low Correlation (LC)",
  },
  {
    value: "MLI_MLR_MLC",
    label:
      "Medium Low Important (MLI), Medium Low Related (MLR), Medium Low Correlation (MLC)",
  },
  {
    value: "EEI_EER_EEC",
    label:
      "Exactly Equal Important (EEI), Exactly Equal Related (EER), Exactly Equal Correlation (EEC)",
  },
  {
    value: "MHI_MHR_MHC",
    label:
      "Medium High Important (MHI), Medium High Related (MHR), Medium High Correlation (MHC)",
  },
  {
    value: "HI_HR_HC",
    label: "High Important (HI), High Related (HR), High Correlation (HC)",
  },
  {
    value: "VHI_VHR_VHC",
    label:
      "Very High Important (VHI), Very High Related (VHR), Very High Correlation (VHC)",
  },
  {
    value: "AHI_AHR_AHC",
    label:
      "Absolutely High Important (AHI), Absolutely High Related (AHR), Absolutely High Correlation (AHC)",
  },
];

const linguisticTerms = {
  ALI_ALR_ALC: { FFN: [0.1, 0.95], ScoreIndex: "0.11111111111" }, // 1/9
  VLI_VLR_VLC: { FFN: [0.1, 0.8], ScoreIndex: "0.14285714285" }, // 1/7
  LI_LR_LC: { FFN: [0.2, 0.65], ScoreIndex: "0.2" }, // 1/5
  MLI_MLR_MLC: { FFN: [0.3, 0.5], ScoreIndex: "0.33333333333" }, // 1/3
  EEI_EER_EEC: { FFN: [0.42, 0.4], ScoreIndex: "1" },
  MHI_MHR_MHC: { FFN: [0.5, 0.3], ScoreIndex: "3" },
  HI_HR_HC: { FFN: [0.65, 0.2], ScoreIndex: "5" },
  VHI_VHR_VHC: { FFN: [0.8, 0.1], ScoreIndex: "7" },
  AHI_AHR_AHC: { FFN: [0.95, 0.1], ScoreIndex: "9" },
};

export default function Home({
  setCurrent,
  sdrs2,
  subPrs,
  setComparisonFFns,
  setComparisonScores,
  sdr2PrRelation,
  updateTable
}) {
  const [numberOfSdrs, setNumberOfSdrs] = useState(sdrs2.length);
  const [tableData, setTableData] = useState(sdr2PrRelation || {});
  const [consistentMatrices, setConsistentMatrices] = useState([]);
  const numberOfTables = 3
  const [numberOfPrs, setNumberOfPrs] = useState(subPrs.length);
  const [isSaved, setIsSaved] = useState(true); // Track whether the weights have been saved
  const [showDialog, setShowDialog] = useState(false); // Track whether to show the continue confirmation dialog


  console.log("step5 copy table",tableData);

  useEffect(() => {
    console.log("sdr2PrRelation",sdr2PrRelation);
    if (!sdr2PrRelation) { // Only create empty table data if sdr2PrRelation doesn't exist
      setTableData(createEmptyTableData(numberOfSdrs));
    } else {
      handleButtonClick(); // If sdr2PrRelation exists, trigger handleButtonClick to process it
    }
  }, [numberOfSdrs]);

  const createEmptyTableData = (n) => {
    const emptyTables = {};
    for (let i = 0; i < numberOfTables; i++) {
      emptyTables[`table_${i}`] = Array.from({ length: numberOfPrs }, () =>
        Array(n).fill("")
      );
    }
    return emptyTables;
  };

  const handleInputChange = (value, rowIdx, colIdx, tableIdx) => {
    setTableData((prevData) => {
      const newData = { ...prevData };
      newData[`table_${tableIdx}`][rowIdx][colIdx] = value;
      return newData;
    });
    handleButtonClick();
    setIsSaved(false); // Mark as not saved when weights are changed
  };

  const handleButtonClick = () => {
    setConsistentMatrices([]);
    const ffnValues = JSON.parse(JSON.stringify(tableData));
    const scoreIndexes = JSON.parse(JSON.stringify(tableData));

    for (let t = 0; t < numberOfTables; t++) {
      for (let i = 0; i < numberOfPrs; i++) {
        for (let j = 0; j < numberOfSdrs; j++) {
          let termInfo = linguisticTerms[ffnValues[`table_${t}`][i][j]];
          ffnValues[`table_${t}`][i][j] = termInfo?.FFN;
          scoreIndexes[`table_${t}`][i][j] = termInfo?.ScoreIndex;
        }
      }
    }

    setComparisonFFns(ffnValues);
    setComparisonScores(scoreIndexes);
    console.log("ffns", scoreIndexes);
  };

  const handleSave = () => {
    updateTable(tableData,"sdr2PrRelation")
    setIsSaved(true); // Mark as saved when the save button is clicked
  };

  const continueToNextStep = () => {
    if (!isSaved) {
      setShowDialog(true);
    } else {
      setCurrent(10);
    }
  };

  const handleDialogContinue = () => {
    setShowDialog(false);
    setCurrent(10);
  };

  return (
    <div className="">
      <div className="font-bold text-3xl uppercase flex items-center gap-2">
        Input{" "}
        <span className="text-sm font-normal text-muted-foreground">
          ( Relationship Between SE & sub RDRS )
        </span>
               <Button onClick={handleSave}>
          Save
        </Button>
      </div>

      <div className="overflow-x-auto flex flex-col w-full p-10 gap-5 my-10 border">
        {createArray(numberOfTables).map((row, tableIdx) => (
          <table key={tableIdx} className="uppercase">
            <thead>
              <tr>
                <th className={`border border-gray-300 p-2 `}></th>
                {createArray(numberOfSdrs).map((col, colIdx) => (
                  <th className={`border border-gray-300 p-2`} key={colIdx}>
                    {sdrs2[colIdx].name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {createArray(subPrs.length).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  <th className={`border border-gray-300 p-2 `}>
                    {subPrs[rowIdx].name}
                  </th>
                  {createArray(numberOfSdrs).map((_, colIdx) => (
                    <td
                      className={`border border-gray-300 p-2 text-center`}
                      key={colIdx}
                    >
                      <Select
                        onValueChange={(value) =>
                          handleInputChange(value, rowIdx, colIdx, tableIdx)
                        }
                        value={
                          tableData[`table_${tableIdx}`] &&
                          tableData[`table_${tableIdx}`][rowIdx] &&
                          tableData[`table_${tableIdx}`][rowIdx][colIdx]
                        }
                      >
                        <SelectTrigger className=" w-44 border-none shadow-none">
                          <SelectValue placeholder="FFN" />
                        </SelectTrigger>
                        <SelectContent>
                          {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>

      <div className="flex gap-2 mt-5">
        <Button onClick={() => setCurrent(8)}>Prev</Button>
        <Button onClick={continueToNextStep}>
        Continue
      </Button>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Unsaved Changes
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Do you want to continue without saving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDialogContinue}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
    </div>
  );
}
