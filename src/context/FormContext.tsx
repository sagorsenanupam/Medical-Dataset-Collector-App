import {
    BehaviouralData,
    ClinicalData,
    FormContextType,
    IdentificationData,
    NutritionalData,
    QuestionnaireResponse,
    SociodemographicsData,
} from "@/types/questionnaire";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useState } from "react";

const defaultIdentification: IdentificationData = {
  studyId: "",
  respondentName: "",
  relationship: "Mother",
  contactNumber: "",
};

const defaultSociodemographics: SociodemographicsData = {
  childAge: "",
  childSex: "Male",
  monthlyIncome: "",
  monthlyExpenditure: "",
  maternalEducation: "None",
  motherOccupation: "Housewife",
  residence: "Urban",
  householdMembers: "",
  livingRooms: "",
  crowdingIndex: "",
  livingChildren: "",
  birthOrder: "1st",
};

const defaultBehavioural: BehaviouralData = {
  handwashBeforeFeeding: "Always",
  handwashAfterToilet: "Always",
  childHandwashBefore: "Always",
  soapAvailable: "Yes",
  waterSource: "Tube-well",
  waterDistance: "<50m",
  streetFood: "No",
  waterContainer: "Covered",
  waterTreatment: "None",
  exclusiveBreastfeeding: "Yes",
  formulaMilkAge: "",
  feedingPattern: "Breastfeeding only",
  bottleFeeding: "No",
  toiletShared: "No",
  toiletType: "Sanitary latrine",
  stoolDisposal: "Toilet",
};

const defaultClinical: ClinicalData = {
  symptomOnset: "",
  diarrheaDuration: "",
  stoolFrequency: "",
  stoolType: "Watery",
  vomiting: "No",
  fever: "No",
  generalCondition: "Active",
  sunkenEye: "No",
  skinPinch: "immediately",
  mucousMembrane: "Normal",
  capillaryRefill: "≤2sec",
  drinks: "thirsty/eagerly",
  dehydrationStatus: "No dehydration",
};

const defaultNutritional: NutritionalData = {
  weight: "",
  height: "",
  muac: "",
  whz: "",
  classification: "Normal",
  investigations: "",
  diagnosis: "",
  interviewerName: "",
};

export const FormContext = createContext<FormContextType | undefined>(
  undefined,
);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [identification, setIdentification] = useState<IdentificationData>(
    defaultIdentification,
  );
  const [sociodemographics, setSociodemographics] =
    useState<SociodemographicsData>(defaultSociodemographics);
  const [behavioural, setBehavioural] =
    useState<BehaviouralData>(defaultBehavioural);
  const [clinical, setClinical] = useState<ClinicalData>(defaultClinical);
  const [nutritional, setNutritional] =
    useState<NutritionalData>(defaultNutritional);

  const updateIdentification = useCallback(
    (data: Partial<IdentificationData>) => {
      setIdentification((prev) => ({ ...prev, ...data }));
    },
    [],
  );

  const updateSociodemographics = useCallback(
    (data: Partial<SociodemographicsData>) => {
      setSociodemographics((prev) => ({ ...prev, ...data }));
    },
    [],
  );

  const updateBehavioural = useCallback((data: Partial<BehaviouralData>) => {
    setBehavioural((prev) => ({ ...prev, ...data }));
  }, []);

  const updateClinical = useCallback((data: Partial<ClinicalData>) => {
    setClinical((prev) => ({ ...prev, ...data }));
  }, []);

  const updateNutritional = useCallback((data: Partial<NutritionalData>) => {
    setNutritional((prev) => ({ ...prev, ...data }));
  }, []);

  const saveResponse = useCallback(async (): Promise<string> => {
    try {
      const id = `response_${Date.now()}`;
      const response: QuestionnaireResponse = {
        id,
        timestamp: new Date().toISOString(),
        identification,
        sociodemographics,
        behavioural,
        clinical,
        nutritional,
      };

      // Save individual response
      await AsyncStorage.setItem(
        `questionnaire_${id}`,
        JSON.stringify(response),
      );

      // Add to responses list
      const allResponsesStr = await AsyncStorage.getItem(
        "questionnaire_responses",
      );
      const allResponses = allResponsesStr ? JSON.parse(allResponsesStr) : [];
      allResponses.push(id);
      await AsyncStorage.setItem(
        "questionnaire_responses",
        JSON.stringify(allResponses),
      );

      return id;
    } catch (error) {
      console.error("Error saving response:", error);
      throw error;
    }
  }, [identification, sociodemographics, behavioural, clinical, nutritional]);

  const resetForm = useCallback(() => {
    setIdentification(defaultIdentification);
    setSociodemographics(defaultSociodemographics);
    setBehavioural(defaultBehavioural);
    setClinical(defaultClinical);
    setNutritional(defaultNutritional);
  }, []);

  const loadResponse = useCallback(async (id: string) => {
    try {
      const data = await AsyncStorage.getItem(`questionnaire_${id}`);
      if (data) {
        const response: QuestionnaireResponse = JSON.parse(data);
        setIdentification(response.identification);
        setSociodemographics(response.sociodemographics);
        setBehavioural(response.behavioural);
        setClinical(response.clinical);
        setNutritional(response.nutritional);
      }
    } catch (error) {
      console.error("Error loading response:", error);
      throw error;
    }
  }, []);

  const getAllResponses = useCallback(async (): Promise<
    QuestionnaireResponse[]
  > => {
    try {
      const allResponsesStr = await AsyncStorage.getItem(
        "questionnaire_responses",
      );
      const allResponseIds = allResponsesStr ? JSON.parse(allResponsesStr) : [];

      const responses: QuestionnaireResponse[] = [];
      for (const id of allResponseIds) {
        const data = await AsyncStorage.getItem(`questionnaire_${id}`);
        if (data) {
          responses.push(JSON.parse(data));
        }
      }
      return responses;
    } catch (error) {
      console.error("Error getting all responses:", error);
      throw error;
    }
  }, []);

  const deleteResponse = useCallback(async (id: string) => {
    try {
      await AsyncStorage.removeItem(`questionnaire_${id}`);

      const allResponsesStr = await AsyncStorage.getItem(
        "questionnaire_responses",
      );
      let allResponses = allResponsesStr ? JSON.parse(allResponsesStr) : [];
      allResponses = allResponses.filter(
        (responseId: string) => responseId !== id,
      );
      await AsyncStorage.setItem(
        "questionnaire_responses",
        JSON.stringify(allResponses),
      );
    } catch (error) {
      console.error("Error deleting response:", error);
      throw error;
    }
  }, []);

  const value: FormContextType = {
    identification,
    sociodemographics,
    behavioural,
    clinical,
    nutritional,
    updateIdentification,
    updateSociodemographics,
    updateBehavioural,
    updateClinical,
    updateNutritional,
    saveResponse,
    resetForm,
    loadResponse,
    getAllResponses,
    deleteResponse,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
