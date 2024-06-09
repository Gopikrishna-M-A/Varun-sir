import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Step2 = ({
  setCurrent,
  ffns,
  subPrs,
  setAggregatedPairwise,
  aggregatedPairwise,
  FFNWeights
}) => {
  useEffect(() => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    let dataArray = Object.values(ffns)
    dataArray = dataArray.slice(0, -1);
    // const weights = subPrs.map((pr) => pr.weight);
    const extractedWeights = FFNWeights.map(({ key, value }) => ({
      [key]: parseFloat(value),
    }));
    const weights = extractedWeights
    // const weights =  [
    //   { "0.1,0.95": 7 },
    //   { "0.1,0.8": 5 },
    //   { "0.2,0.65": 9 },
    //   { "0.3,0.5": 8 },
    //   { "0.42,0.4": 3 },
    //   { "0.5,0.3": 6 },
    //   { "0.65,0.2": 4 },
    //   { "0.8,0.1": 2 },
    //   { "0.95,0.1": 1 }
    // ]
    console.log("dataArray",dataArray);
    console.log("weights",weights);
    axios
      .post(`${baseURL}/aggregateprs`, { dataArray, weights })
      .then((res) => {
        console.log("res", res.data);
        setAggregatedPairwise(res.data);
      });
  }, []);

  return (
    <div className="">
      <div className="font-bold text-3xl uppercase flex items-center gap-2">
        Aggregate
        <span className="text-sm font-normal text-muted-foreground">
        ( Pairwise comparison matrix Fuzzy Analytical Hierarchy Method )
        </span>
      </div>

      <div className="mt-5">
        <table className="border border-gray-300 p-2 uppercase">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2"></th>
              {subPrs.map((col, colIdx) => (
                <th className="border border-gray-300 p-2" key={colIdx}>
                  {subPrs[colIdx].name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {aggregatedPairwise.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th className="border border-gray-300 p-2">
                  {subPrs[rowIndex].name}
                </th>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border border-gray-300 p-2 ">
                    {cell[0]} , {cell[1]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 mt-5">
        <Button onClick={() => setCurrent(2)}>Prev</Button>
        <Button onClick={() => setCurrent(4)}>Continue</Button>
      </div>
    </div>
  );
};

export default Step2;
