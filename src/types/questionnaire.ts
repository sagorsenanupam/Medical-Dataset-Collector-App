// Questionnaire data types

export interface IdentificationData {
  studyId: string;
  respondentName: string;
  relationship: string;
  otherRelationship?: string;
  contactNumber: string;
  address?: string;
  district?: string;
}

export interface SociodemographicsData {
  childAge: string;
  childSex: string;
  monthlyIncome: string;
  monthlyExpenditure: string;
  maternalEducation: string;
  motherOccupation: string;
  residence: string;
  householdMembers: string;
  livingRooms: string;
  crowdingIndex: string;
  livingChildren: string;
  birthOrder: string;
}

export interface BehaviouralData {
  handwashBeforeFeeding: string;
  handwashAfterToilet: string;
  childHandwashBefore: string;
  soapAvailable: string;
  waterSource: string;
  waterDistance: string;
  streetFood: string;
  waterContainer: string;
  waterTreatment: string;
  exclusiveBreastfeeding: string;
  formulaMilkAge: string;
  feedingPattern: string;
  bottleFeeding: string;
  bottleCleaningMethod?: string;
  toiletShared: string;
  toiletType: string;
  stoolDisposal: string;
}

export interface ClinicalData {
  symptomOnset: string;
  diarrheaDuration: string;
  stoolFrequency: string;
  stoolType: string;
  vomiting: string;
  vomitingTimes?: string;
  fever: string;
  generalCondition: string;
  sunkenEye: string;
  skinPinch: string;
  mucousMembrane: string;
  capillaryRefill: string;
  drinks: string;
  dehydrationStatus: string;
}

export interface NutritionalData {
  weight: string;
  height: string;
  muac: string;
  whz: string;
  classification: string;
  investigations: string;
  diagnosis: string;
  interviewerName: string;
}

export interface QuestionnaireResponse {
  id: string;
  timestamp: string;
  identification: IdentificationData;
  sociodemographics: SociodemographicsData;
  behavioural: BehaviouralData;
  clinical: ClinicalData;
  nutritional: NutritionalData;
}

export interface FormContextType {
  // Current form data
  identification: IdentificationData;
  sociodemographics: SociodemographicsData;
  behavioural: BehaviouralData;
  clinical: ClinicalData;
  nutritional: NutritionalData;

  // Update functions
  updateIdentification: (data: Partial<IdentificationData>) => void;
  updateSociodemographics: (data: Partial<SociodemographicsData>) => void;
  updateBehavioural: (data: Partial<BehaviouralData>) => void;
  updateClinical: (data: Partial<ClinicalData>) => void;
  updateNutritional: (data: Partial<NutritionalData>) => void;

  // Persistence functions
  saveResponse: () => Promise<string>;
  resetForm: () => void;
  loadResponse: (id: string) => Promise<void>;
  getAllResponses: () => Promise<QuestionnaireResponse[]>;
  deleteResponse: (id: string) => Promise<void>;

  // Google Drive sync functions
  syncCSVToGoogleDrive: () => Promise<void>;
  isAutoSyncEnabled: boolean;
  toggleAutoSync: (enabled: boolean) => void;
}
