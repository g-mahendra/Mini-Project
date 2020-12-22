import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [mess, setMess] = useState(null);
  const [canteen, setCanteen] = useState(null);
  const [grievance, setGrievance] = useState(null);

  useEffect(async () => {
    try {
      const messdata = await axios.get(`http://localhost:5000/getmess`);
      setMess(messdata.data);
    } catch (e) {
      console.log(e);
    }
    try {
      const canteenData = await axios.get(`http://localhost:5000/getcanteen`);
      setCanteen(canteenData.data);
    } catch (error) {
      console.log(error);
    }
    try {
      const grievanceData = await axios.get(
        `http://localhost:5000/getgrievance`
      );
      setGrievance(grievanceData.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const value = { mess, canteen, grievance };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
