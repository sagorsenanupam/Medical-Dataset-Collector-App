import { QuestionnaireResponse } from "@/types/questionnaire";

export const generateCSV = (responses: QuestionnaireResponse[]): string => {
  if (responses.length === 0) {
    return "";
  }

  // Flatten the nested data structure for CSV
  const flattenedData = responses.map((response) => ({
    // Identification
    ID: response.id,
    Timestamp: response.timestamp,
    StudyID: response.identification.studyId,
    RespondentName: response.identification.respondentName,
    Relationship: response.identification.relationship,
    OtherRelationship: response.identification.otherRelationship || "",
    ContactNumber: response.identification.contactNumber,
    Address: response.identification.address || "",
    District: response.identification.district || "",

    // Sociodemographics
    ChildAge: response.sociodemographics.childAge,
    ChildSex: response.sociodemographics.childSex,
    MonthlyIncome: response.sociodemographics.monthlyIncome,
    MonthlyExpenditure: response.sociodemographics.monthlyExpenditure,
    MaternalEducation: response.sociodemographics.maternalEducation,
    MotherOccupation: response.sociodemographics.motherOccupation,
    Residence: response.sociodemographics.residence,
    HouseholdMembers: response.sociodemographics.householdMembers,
    LivingRooms: response.sociodemographics.livingRooms,
    CrowdingIndex: response.sociodemographics.crowdingIndex,
    LivingChildren: response.sociodemographics.livingChildren,
    BirthOrder: response.sociodemographics.birthOrder,

    // Behavioural & Sanitation
    HandwashBeforeFeeding: response.behavioural.handwashBeforeFeeding,
    HandwashAfterToilet: response.behavioural.handwashAfterToilet,
    ChildHandwashBefore: response.behavioural.childHandwashBefore,
    SoapAvailable: response.behavioural.soapAvailable,
    WaterSource: response.behavioural.waterSource,
    WaterDistance: response.behavioural.waterDistance,
    StreetFood: response.behavioural.streetFood,
    WaterContainer: response.behavioural.waterContainer,
    WaterTreatment: response.behavioural.waterTreatment,
    ExclusiveBreastfeeding: response.behavioural.exclusiveBreastfeeding,
    FormulaMilkAge: response.behavioural.formulaMilkAge,
    FeedingPattern: response.behavioural.feedingPattern,
    BottleFeeding: response.behavioural.bottleFeeding,
    BottleCleaningMethod: response.behavioural.bottleCleaningMethod || "",
    ToiletShared: response.behavioural.toiletShared,
    ToiletType: response.behavioural.toiletType,
    StoolDisposal: response.behavioural.stoolDisposal,

    // Clinical
    SymptomOnset: response.clinical.symptomOnset,
    DiarrheaDuration: response.clinical.diarrheaDuration,
    StoolFrequency: response.clinical.stoolFrequency,
    StoolType: response.clinical.stoolType,
    Vomiting: response.clinical.vomiting,
    VomitingTimes: response.clinical.vomitingTimes || "",
    Fever: response.clinical.fever,
    GeneralCondition: response.clinical.generalCondition,
    SunkenEye: response.clinical.sunkenEye,
    SkinPinch: response.clinical.skinPinch,
    MucousMembrane: response.clinical.mucousMembrane,
    CapillaryRefill: response.clinical.capillaryRefill,
    Drinks: response.clinical.drinks,
    DehydrationStatus: response.clinical.dehydrationStatus,

    // Nutritional
    Weight: response.nutritional.weight,
    Height: response.nutritional.height,
    MUAC: response.nutritional.muac,
    WHZ: response.nutritional.whz,
    Classification: response.nutritional.classification,
    Investigations: response.nutritional.investigations,
    Diagnosis: response.nutritional.diagnosis,
    InterviewerName: response.nutritional.interviewerName,
  }));

  // Get all keys
  const keys = Object.keys(flattenedData[0]);

  // Create CSV header
  const header = keys.join(",");

  // Create CSV rows
  const rows = flattenedData.map((item) =>
    keys
      .map((key) => {
        const value = item[key as keyof typeof item];
        // Escape quotes and wrap in quotes if contains comma
        const stringValue = String(value || "");
        if (stringValue.includes(",") || stringValue.includes('"')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      })
      .join(","),
  );

  return [header, ...rows].join("\n");
};

export const downloadCSV = async (csv: string, filename: string) => {
  try {
    // For now, just return the CSV content
    // Local file storage will be implemented after OAuth configuration
    console.log("CSV generated:", filename);
    return csv;
  } catch (error) {
    console.error("Failed to process CSV:", error);
    throw error;
  }
};
