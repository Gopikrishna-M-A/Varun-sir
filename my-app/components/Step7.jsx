import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Step2 = ({
  setCurrent,
  subPrs,
  aggregatedComparison,
  ris,
  setRis,
  sdrs1,
  sheetName
}) => {
  useEffect(() => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const dataArray = Object.values(aggregatedComparison);
    const weights = subPrs.map((pr) => pr.weight);

    axios
      .post(`${baseURL}/ri`, { dataArray, weights })
      .then((res) => {
        console.log("res ri ", res.data);
        setRis(res.data)
      });
  }, []);

  const submitToForm = () => {
      // const data = [
      //   [0.9841862818154274, 0.9999479139537576],
      //   [0.9235212251992672, 0.9999754891908919]
      // ]
      axios.post('api/sheets',{ris,"version":1,sheetName})
  }

  return (
    <div className="">
      <div className="font-bold text-3xl uppercase flex items-center gap-2">
        RI
        <span className="text-sm font-normal text-muted-foreground">
          ( Relative Importance )
        </span>
      </div>

      <div className="mt-5 border p-3 w-fit rounded">
          {ris.map((ri,index)=>(
              <div className="uppercase text-lg mt-2">
               <span className="font-bold"> RI {sdrs1[index].name }</span> : {ris[index][0]}, {ris[index][1]}
              </div>
          ))}
      </div>

      <div className="flex gap-2 mt-5">
        <Button onClick={() => setCurrent(6)}>Prev</Button>
        <Button onClick={() => setCurrent(8)}>Continue</Button>
        <Button variant='outline' onClick={submitToForm}>Google Sheet</Button>
      </div>
    </div>
  );
};

export default Step2;
