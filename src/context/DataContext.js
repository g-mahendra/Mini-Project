import React, { createContext, useContext, useEffect, useState } from "react";
import backend from "../api/backend";
const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [mess, setMess] = useState(null);
  const [canteen, setCanteen] = useState(null);
  const [grievance, setGrievance] = useState(null);
  const [change, setChange] = useState(0);
  var i = 0;
  const updateComponent = () => {
    setChange((i += 1));
  };

  useEffect(async () => {
    try {
      const messdata = await backend.get(`/getmess`);
      setMess(messdata.data);
    } catch (e) {
      console.log(e);
    }
    try {
      const canteenData = await backend.get(`/getcanteen`);
      setCanteen(canteenData.data);
    } catch (error) {
      console.log(error);
    }
    try {
      const grievanceData = await backend.get(`/getgrievance`);
      setGrievance(grievanceData.data);
    } catch (error) {
      console.log(error);
    }
  }, [change]);

  const value = { mess, canteen, grievance, updateComponent };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
