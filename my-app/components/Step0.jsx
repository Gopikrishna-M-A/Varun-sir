import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
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


const formatDate = (isoDate) => {
  const date = new Date(isoDate);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
};

const Step0 = ({
  setCurrent,
  setFFNWeights,
  FFNWeights,
  setPrs,
  setSubPrs,
  setPairwiseComparisons,
  setSdrs1,
  setSdrs2,
  setSdr1PrRelation,
  setSdr2PrRelation,
  setTableId,
  tableId,
  setSaveToggle,
  updateTable,
}) => {
  const [weights, setWeights] = useState(FFNWeights);
  const [dataTables, setDataTables] = useState();
  const [isSaved, setIsSaved] = useState(true); // Track whether the weights have been saved
  const [showDialog, setShowDialog] = useState(false); // Track whether to show the continue confirmation dialog
  const { toast } = useToast();


  useEffect(() => {
    if (FFNWeights) {
      setWeights(FFNWeights);
    }
  }, [FFNWeights]);



  const getTableData = () => {
    axios.get("/api/sample").then((res) => {
      console.log("res", res.data);
      setDataTables(res.data);
    });
  };

  useEffect(() => {
    getTableData();
  }, []);

  const deleteTableData = (id) => {
    axios.delete(`/api/sample?id=${id}`).then((res) => {
      getTableData();
    });
  };

  useEffect(() => {
    try {
      console.log(tableId);
      axios
        .get(`/api/sample?id=${tableId}`)
        .then((res) => {
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
          toast({
            title: "Data successfully loaded!",
            description: currentDate,
          });
          if (res.data.ffnWeights) {
            setFFNWeights(res.data.ffnWeights);
          }
          if (res.data.prs) {
            setPrs(res.data.prs);
          }
          if (res.data.subPrs) {
            setSubPrs(res.data.subPrs);
          }
          if (res.data.pairwiseComparisons) {
            setPairwiseComparisons(res.data.pairwiseComparisons);
          }
          if (res.data.sdrs1) {
            setSdrs1(res.data.sdrs1);
          }
          if (res.data.sdrs2) {
            setSdrs2(res.data.sdrs2);
          }
          if (res.data.sdr1PrRelation) {
            setSdr1PrRelation(res.data.sdr1PrRelation);
          }
          if (res.data.sdr2PrRelation) {
            setSdr2PrRelation(res.data.sdr2PrRelation);
          }
        })
        .catch((err) => {});
    } catch (error) {}
  }, [tableId]);

  const handleChange = (index, newValue) => {
    const newWeights = [...weights];
    newWeights[index].value = newValue;
    setWeights(newWeights);
    setIsSaved(false); // Mark as not saved when weights are changed
    // console.log("newWeights",newWeights);
  };

  const handleSave = () => {
    updateTable(weights, "ffnWeights");
    getTableData();
    setIsSaved(true); // Mark as saved when the save button is clicked
  };

  const continueToNextStep = () => {
    if (!isSaved) {
      setShowDialog(true);
    } else {
      setCurrent(1);
    }
  };

  const handleDialogContinue = () => {
    setShowDialog(false);
    setCurrent(1);
  };

  return (
    <div className="">
      <div className="font-bold text-3xl uppercase flex items-center gap-2">
        INPUT
        <span className="text-sm font-normal text-muted-foreground">
          ( Weights of FFN )
        </span>
        <Button onClick={handleSave}>Save</Button>
      </div>

      <div className="flex gap-10 ">
        <div className="mt-10 w-1/4 flex flex-wrap gap-2">
          {weights?.map((weight, index) => (
            <Input
              key={index}
              value={weight.value}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Value for [${weight.key}]`}
            />
          ))}
        </div>

        <div className="border px-5 py-2 w-96 rounded flex flex-col gap-1 mt-10">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">Load Stored Data</h2>
          </div>
          {dataTables?.map((table, index) => (
            <div className="flex justify-between items-center">
              <div className="bg-gray-200 px-2 py-1 rounded flex justify-center items-center">
                {formatDate(table.createdAt)}
              </div>
              <Button
                onClick={() => {
                  setTableId(table._id);
                  setIsSaved(true);
                }}
                variant="outline"
              >
                Load
              </Button>

              <AlertDialog>
                <AlertDialogTrigger className="text-red-600 hover:text-red-400 bg-red-100 rounded-full h-7 w-7 flex justify-center items-center">
                  <span className="material-symbols-outlined">remove</span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your entry and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteTableData(table._id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>

       
      </div>

      <Button onClick={continueToNextStep} className="mt-10">
        Continue
      </Button>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
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
  );
};

export default Step0;
