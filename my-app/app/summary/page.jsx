'use client'
import React from "react";
import { Button, Result } from "antd";

const App = () => {
  const handleOpenGoogleSheet = () => {
    window.open('https://docs.google.com/spreadsheets/d/1KoZqDN7lw_7lXvfZf74vv3PAfaj5yxcUJnGV-F8AzhA/edit?usp=sharing', '_blank');
  };

  return (
    <div className="flex justify-center items-center h-full max-w-[800px] m-auto">
      <Result
        status="success"
        title="Thank you for using the platform!"
        subTitle="The results may be found consolidated in the File"
        extra={[
          <Button key="open" onClick={handleOpenGoogleSheet}>Open</Button>,
        ]}
      />
    </div>
  );
};

export default App;
