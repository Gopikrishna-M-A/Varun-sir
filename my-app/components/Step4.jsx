import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const Step2 = ({ setCurrent, sdrs1, setSdrs1, updateTable }) => {

  const [isSaved, setIsSaved] = useState(true); // Track whether the weights have been saved
  const [showDialog, setShowDialog] = useState(false); // Track whether to show the continue confirmation dialog
  
  const addSDR = () => {
    setSdrs1([...sdrs1, { name: "" }]);
  };

  const removeSDR = (indexToRemove) => {
    setSdrs1(sdrs1.filter((_, index) => index !== indexToRemove));
  };

  const handleSDRChange = (index, newName) => {
    const updatedSDRs = [...sdrs1];
    updatedSDRs[index] = { name: newName };
    setSdrs1(updatedSDRs);
    console.log("updatedSDRs",updatedSDRs);
    setIsSaved(false); // Mark as not saved when weights are changed
  };


  const handleSave = () => {
    updateTable(sdrs1,"sdrs1")
    setIsSaved(true); // Mark as saved when the save button is clicked
  };

  const continueToNextStep = () => {
    if (!isSaved) {
      setShowDialog(true);
    } else {
      setCurrent(5);
    }
  };

  const handleDialogContinue = () => {
    setShowDialog(false);
    setCurrent(5);
  };


  return (
    <div className="">
      <div className="font-bold text-3xl uppercase flex items-center gap-2">
        INPUT
        <span className="text-sm font-normal text-muted-foreground">
          ( Project Management Steps )
        </span>
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
      <Button className="mt-3 w-52" variant="outline" onClick={addSDR}>
        Add PM
      </Button>

      <div className="mt-10 flex flex-col gap-3">
        {sdrs1.map((sdr, index) => (
          <div key={index} className="flex gap-3 w-96">
            <Input
              className='uppercase'
              placeholder="PM name"
              value={sdr.name}
              onChange={(e) => handleSDRChange(index, e.target.value)}
            />
            <Button variant="destructive" onClick={() => removeSDR(index)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-5">
        <Button onClick={() => setCurrent(3)} >
          Prev
        </Button>
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
};

export default Step2;
