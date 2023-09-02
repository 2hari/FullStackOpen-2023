import { createContext, useState, useEffect, ReactElement,
 } from 'react';
import { Diagnosis } from '../types';
import diagnosisService from "../services/diagnosis"

export const DiagnosisContext = createContext<Diagnosis[]>([]);

export const DiagnosisProvider = ({ children }:{children: ReactElement | ReactElement[]}) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoseList = async () => {
      const allDiagnosis = await diagnosisService.getAll();
      setDiagnosis(allDiagnosis);
    };
    void fetchDiagnoseList();
  }, []);

  return (
    <DiagnosisContext.Provider value={diagnosis}>
      {children}
    </DiagnosisContext.Provider>
  );
};