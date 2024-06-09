import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

function createArray(n) {
    return Array.from({ length: n }, (_, i) => i);
  }

const Step2 = ({
  setCurrent,
  sdrs,
  scoreValues,
  setScoreValues,
  aggregatedCorrelation
}) => {
  useEffect(() => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const dataArray = Object.values(aggregatedCorrelation);

    axios
      .post(`${baseURL}/score`, { dataArray })
      .then((res) => {
        console.log("res score ", res.data);
        console.log("res score ", res.data[0]);
        setScoreValues(res.data)
    
      });
  }, []);

  return (
    <div className="">
      <div className="font-bold text-3xl uppercase flex items-center gap-2">
        Score
        <span className="text-sm font-normal text-muted-foreground">
          ( Score Value )
        </span>
      </div>

      <div className="mt-5 border p-3 w-fit rounded">
          {scoreValues.map((score,index)=>(
              <div className="uppercase text-lg mt-2">
               <span className="font-bold"> Score {sdrs[index].name }</span> : {score}
              </div>
          ))}
      </div>

      <div className="flex gap-2 mt-5">
        <Button onClick={() => setCurrent(9)}>Prev</Button>
        <Button 
        // onClick={() => setCurrent(7)}
        >Continue</Button>
      </div>
    </div>
  );
};

export default Step2;
