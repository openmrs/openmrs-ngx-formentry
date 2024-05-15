export interface PredictionObject {
  pAge: number;
  latestMaritalStatus: string | number | '';
  populationType: string | number | '';
  keyPopulationVal: string | number | '';
  priPopulationVal: string | number | '';
  testHistory: string | number | '';
  testedAs: number | string | '';
  htsEntryPoint: number | string | '';
  htsDepartment: number | string | '';
  monthsSinceLastTestInt: number;
  testStrategy: number | string | '';
  selfTested: number | string | '';
  tbScreening: number | string | '';
  tbFever: number | string | '';
  tbNightSweats: number | string | '';
  tbCough: number | string | '';
  tbScreeningStatus: number | string | '';
  everHadSex: number | string | '';
  multipleSexPartners: number | string | '';
  patientType: number | string | '';
  onPREP: number | string | '';
  hasSTI: number | string | '';
  activeSexually: number | string | '';
  newPartner: number | string | '';
  isHealthWorker: number | string | '';
  partnerHIVStatus: number | string | '';
  numberOfPartnersInt: number;
  alcoholicSex: number | string | '';
  moneySex: number | string | '';
  condomBurst: number | string | '';
  strangerSex: number | string | '';
  positiveSex: number | string | '';
  patientPregnant: number | string | '';
  patientBreastFeeding: number | string | '';
  GBVExperienced: number | string | '';
  sharedNeedle: number | string | '';
  needleStickInjuries: number | string | '';
  traditionalProcedures: number | string | '';
  mothersStatus: number | string | '';
  patientReferred: number | string | '';
  discordantCouple: number | string | '';
  sexualContactChecked: boolean;
  socialContactChecked: boolean;
  noneContactChecked: boolean;
  needleSharingContactChecked: boolean;
  prepServiceChecked: boolean;
  pepServiceChecked: boolean;
  tbServiceChecked: boolean;
  stiServiceChecked: boolean;
  GBVSexualChecked: boolean;
  GBVPhysicalChecked: boolean;
  GBVEmotionalChecked: boolean;
}

export interface MachineResponsePayload {
  result: {
    ModelInputs: PredictionObject;
    predictions: {
      'probability(Negative)': number;
      'probability(Positive)': number;
    };
  };
}
