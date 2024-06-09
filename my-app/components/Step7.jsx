import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Button as AntButton } from 'antd';

const Step2 = ({
  setCurrent,
  subPrs,
  aggregatedComparison,
  ris,
  setRis,
  sdrs1,
  sheetName
}) => {
  const [loading,setLoading] = useState(false)
  const { toast } = useToast();


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

  const submitToForm = async () => {
    setLoading(true);
    console.log("loading", loading);
    const currentDate = new Date().toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    try {
      await axios.post('api/sheets', { ris, "version": 1, sheetName });
      toast({
        title: "Data Added to Google Sheets!",
        description: currentDate,
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error Occurred in Google Sheets!",
        description: currentDate,
      });
    } finally {
      setLoading(false);
    }
  };

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
        <AntButton loading={loading} size="large" onClick={submitToForm}>Google Sheet</AntButton>
      </div>
    </div>
  );
};

export default Step2;
