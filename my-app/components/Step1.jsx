import React, { useEffect, useState } from "react";
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

const Step2 = ({ setCurrent, prs, setPrs, setSubPrs, subPrs, updateTable }) => {
  // State to manage sub PRs for each PR
  const [subPrsLocal, setSubPrsLocal] = useState(Array(prs?.length).fill([]));
  const [isSaved, setIsSaved] = useState(true); // Track whether the weights have been saved
  const [showDialog, setShowDialog] = useState(false); // Track whether to show the continue confirmation dialog
  console.log("subPrsLocal", subPrsLocal);

  useEffect(() => {
    if (subPrs) {
      const convertedData = subPrs.reduce((acc, obj) => {
        const key = obj.name.slice(2, -1); // Get the characters after "PR" and remove the last digit
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});

      const result = Object.values(convertedData);
      setSubPrsLocal(result);
      console.log("subPrs", result);
    }
  }, [subPrs]);

  // Function to add a new PR
  const addPR = () => {
    const prName = `RDR${prs.length + 1}`; // Generate PR name
    setPrs((prevPrs) => [...prevPrs, { name: prName, weight: "" }]);
    setSubPrsLocal((prevSubPrs) => [...prevSubPrs, []]); // Add an empty array for sub-PRs
  };

  // Function to remove a PR
  const removePR = (indexToRemove) => {
    setPrs((prevPrs) => prevPrs.filter((_, index) => index !== indexToRemove));
    setSubPrsLocal((prevSubPrs) =>
      prevSubPrs.filter((_, index) => index !== indexToRemove)
    );
  };

  // Function to add a new sub PR for a given PR
  const addSubPR = (index) => {
    const subPrName = `RDR${index + 1}${subPrsLocal[index].length + 1}`; // Generate sub PR name
    setSubPrsLocal((prevSubPrs) => {
      const newSubPrs = [...prevSubPrs];
      newSubPrs[index] = [...newSubPrs[index], { name: subPrName, weight: "" }];
      return newSubPrs;
    });
  };

  // Function to remove a sub PR for a given PR
  const removeSubPR = (prIndex, subPrIndex) => {
    setSubPrsLocal((prevSubPrs) => {
      const newSubPrs = [...prevSubPrs];
      newSubPrs[prIndex] = newSubPrs[prIndex].filter(
        (_, index) => index !== subPrIndex
      );
      return newSubPrs;
    });
  };

  // Function to handle input change for PRs and sub PRs
  const handleInputChange = (value, prIndex, subPrIndex, field) => {
    if (subPrIndex === undefined) {
      // If subPrIndex is undefined, it's a PR input change
      setPrs((prevPrs) =>
        prevPrs.map((pr, index) =>
          index === prIndex ? { ...pr, [field]: value } : pr
        )
      );
    } else {
      // If subPrIndex is defined, it's a sub PR input change
      setSubPrsLocal((prevSubPrs) => {
        const newSubPrs = [...prevSubPrs];
        newSubPrs[prIndex] = newSubPrs[prIndex].map((subPr, index) =>
          index === subPrIndex ? { ...subPr, [field]: value } : subPr
        );
        return newSubPrs;
      });
    }
    setIsSaved(false); // Mark as not saved when weights are changed
  };



  const handleSave = () => {
    updateTable(prs,"prs")
    const mergedArray = subPrsLocal.reduce(
      (accumulator, currentValue) => accumulator.concat(currentValue),
      []
    );
    updateTable(mergedArray,"subPrs")
    setIsSaved(true); // Mark as saved when the save button is clicked
  };


  const handleDialogContinue = () => {
    setShowDialog(false);
    setCurrent(2);
  };

  // Function to continue to the next step
  const continueToNextStep = () => {
    // Create an object with PRs and their corresponding sub PRs and weights
    const prsWithSubPrs = prs.map((pr, index) => ({
      ...pr,
      subPrs: subPrsLocal[index],
    }));

    // console.log("subPrsLocal",subPrsLocal);
    const mergedArray = subPrsLocal.reduce(
      (accumulator, currentValue) => accumulator.concat(currentValue),
      []
    );
    setSubPrs(mergedArray);
    console.log("prsWithSubPrs", prsWithSubPrs);
    setPrs(prsWithSubPrs);

    if (!isSaved) {
      setShowDialog(true);
    } else {
      setCurrent(2);
    }
  };

  return (
    <div className="">
      <div className="font-bold text-3xl uppercase flex items-center gap-2">
        INPUT
        <span className="text-sm font-normal text-muted-foreground">
          ( Provide Research and Development Project  Steps )
        </span>
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
      <Button className="mt-3 w-52" variant="outline" onClick={addPR}>
        Add RDR
      </Button>

      <div className="mt-10 flex flex-wrap gap-5">
        {prs?.map((pr, prIndex) => (
          <div
            key={prIndex}
            className="flex flex-col gap-3 w-96 border rounded p-2"
          >
            <Input
              placeholder="RDR Name"
              value={pr.name}
              onChange={(e) =>
                handleInputChange(e.target.value, prIndex, undefined, "name")
              }
            />
            <Input
              placeholder="RDR Weight"
              value={pr.weight}
              onChange={(e) =>
                handleInputChange(e.target.value, prIndex, undefined, "weight")
              }
            />
            <Button variant="destructive" onClick={() => removePR(prIndex)}>
              Remove
            </Button>
            <Button variant="outline" onClick={() => addSubPR(prIndex)}>
              Add Sub RDR
            </Button>
            {subPrsLocal[prIndex]?.map((subPr, subPrIndex) => (
              <div key={subPrIndex} className="flex gap-3">
                <Input
                  placeholder="Sub RDR Name"
                  value={subPr.name}
                  onChange={(e) =>
                    handleInputChange(
                      e.target.value,
                      prIndex,
                      subPrIndex,
                      "name"
                    )
                  }
                />
                <Input
                  placeholder="Sub RDR Weight"
                  value={subPr.weight}
                  onChange={(e) =>
                    handleInputChange(
                      e.target.value,
                      prIndex,
                      subPrIndex,
                      "weight"
                    )
                  }
                />
                <Button
                  variant="destructive"
                  onClick={() => removeSubPR(prIndex, subPrIndex)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-5 items-center mt-10">
        <Button onClick={() => setCurrent(0)}>Prev</Button>

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
