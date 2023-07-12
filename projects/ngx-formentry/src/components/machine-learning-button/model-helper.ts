import { PredictionObject } from './types';

export function generatePredictionPayload(
  model: PredictionObject,
  pgender: string
) {
  const {
    pAge,
    latestMaritalStatus,
    populationType,
    keyPopulationVal,
    priPopulationVal,
    testHistory,
    testedAs,
    htsEntryPoint,
    htsDepartment,
    monthsSinceLastTestInt,
    testStrategy,
    selfTested,
    tbScreening,
    onPREP,
    hasSTI,
    activeSexually,
    newPartner,
    isHealthWorker,
    partnerHIVStatus,
    numberOfPartnersInt,
    alcoholicSex,
    moneySex,
    condomBurst,
    strangerSex,
    positiveSex,
    patientPregnant,
    patientBreastFeeding,
    GBVExperienced,
    sharedNeedle,
    needleStickInjuries,
    traditionalProcedures,
    mothersStatus,
    patientReferred,
    discordantCouple,
    sexualContactChecked,
    socialContactChecked,
    noneContactChecked,
    needleSharingContactChecked,
    prepServiceChecked,
    pepServiceChecked,
    tbServiceChecked,
    stiServiceChecked,
    GBVSexualChecked,
    GBVPhysicalChecked,
    GBVEmotionalChecked
  } = model;
  let predictionVariables = {
    Age: pAge,
    births: 0,
    pregnancies: 0,
    literacy: 0,
    poverty: 0,
    anc: 0,
    pnc: 0,
    sba: 0,
    hiv_prev: 0,
    hiv_count: 0,
    condom: 0,
    intercourse: 0,
    in_union: 0,
    circumcision: 0,
    partner_away: 0,
    partner_men: 0,
    partner_women: 0,
    sti: 0,
    fb: 0,
    PopulationTypeGP: 0,
    PopulationTypeKP: 0,
    PopulationTypePRIORITY: 0,
    KeyPopulationFSW: 0,
    KeyPopulationMSM: 0,
    KeyPopulationNR: 0,
    KeyPopulationOther: 0,
    KeyPopulationPWID: 0,
    PriorityPopulationAGYW: 0,
    PriorityPopulationFISHERMEN: 0,
    PriorityPopulationNR: 0,
    PriorityPopulationOTHER: 0,
    DepartmentEMERGENCY: 0,
    DepartmentIPD: 0,
    DepartmentOPD: 0,
    DepartmentPMTCT: 0,
    DepartmentVCT: 0,
    IsHealthWorkerNO: 0,
    IsHealthWorkerNR: 0,
    IsHealthWorkerYES: 0,
    SexuallyActiveNO: 0,
    SexuallyActiveNR: 0,
    SexuallyActiveYES: 0,
    NewPartnerNO: 0,
    NewPartnerNR: 0,
    NewPartnerYES: 0,
    PartnerHIVStatusNEGATIVE: 0,
    PartnerHIVStatusNR: 0,
    PartnerHIVStatusPOSITIVE: 0,
    PartnerHIVStatusUNKNOWN: 0,
    NumberOfPartnersMULTIPLE: 0,
    NumberOfPartnersNR: 0,
    NumberOfPartnersSINGLE: 0,
    AlcoholSexALWAYS: 0,
    AlcoholSexNEVER: 0,
    AlcoholSexNR: 0,
    AlcoholSexSOMETIMES: 0,
    MoneySexNO: 0,
    MoneySexNR: 0,
    MoneySexYES: 0,
    CondomBurstNO: 0,
    CondomBurstNR: 0,
    CondomBurstYES: 0,
    UnknownStatusPartnerNO: 0,
    UnknownStatusPartnerNR: 0,
    UnknownStatusPartnerYES: 0,
    KnownStatusPartnerNO: 0,
    KnownStatusPartnerNR: 0,
    KnownStatusPartnerYES: 0,
    PregnantNO: 0,
    PregnantNR: 0,
    PregnantYES: 0,
    BreastfeedingMotherNO: 0,
    BreastfeedingMotherNR: 0,
    BreastfeedingMotherYES: 0,
    ExperiencedGBVNO: 0,
    ExperiencedGBVYES: 0,
    CurrentlyOnPrepNO: 0,
    CurrentlyOnPrepNR: 0,
    CurrentlyOnPrepYES: 0,
    CurrentlyHasSTINO: 0,
    CurrentlyHasSTINR: 0,
    CurrentlyHasSTIYES: 0,
    SharedNeedleNO: 0,
    SharedNeedleNR: 0,
    SharedNeedleYES: 0,
    NeedleStickInjuriesNO: 0,
    NeedleStickInjuriesNR: 0,
    NeedleStickInjuriesYES: 0,
    TraditionalProceduresNO: 0,
    TraditionalProceduresNR: 0,
    TraditionalProceduresYES: 0,
    MothersStatusNEGATIVE: 0,
    MothersStatusNR: 0,
    MothersStatusPOSITIVE: 0,
    MothersStatusUNKNOWN: 0,
    ReferredForTestingNO: 0,
    ReferredForTestingYES: 0,
    GenderFEMALE: pgender == 'F' ? 1 : 0,
    GenderMALE: pgender == 'M' ? 1 : 0,
    MaritalStatusDIVORCED: 0,
    MaritalStatusMARRIED: 0,
    MaritalStatusMINOR: 0,
    MaritalStatusPOLYGAMOUS: 0,
    MaritalStatusSINGLE: 0,
    EverTestedForHivNO: 0,
    EverTestedForHivYES: 0,
    MonthsSinceLastTestLASTSIXMONTHS: 0,
    MonthsSinceLastTestMORETHANTWOYEARS: 0,
    MonthsSinceLastTestNR: 0,
    MonthsSinceLastTestONETOTWOYEARS: 0,
    MonthsSinceLastTestSEVENTOTWELVE: 0,
    ClientTestedAsCOUPLE: 0,
    ClientTestedAsINDIVIDUAL: 0,
    EntryPointIPD: 0,
    EntryPointOPD: 0,
    EntryPointOTHER: 0,
    EntryPointPEDIATRIC: 0,
    EntryPointPMTCT_ANC: 0,
    EntryPointPMTCT_MAT_PNC: 0,
    EntryPointTB: 0,
    EntryPointVCT: 0,
    EntryPointVMMC: 0,
    TestStrategyHB: 0,
    TestStrategyHP: 0,
    TestStrategyINDEX: 0,
    TestStrategyMO: 0,
    TestStrategyNP: 0,
    TestStrategyOTHER: 0,
    TestStrategySNS: 0,
    TestStrategyVI: 0,
    TestStrategyVS: 0,
    TbScreeningCONFIRMEDTB: 0,
    TbScreeningNOPRESUMEDTB: 0,
    TbScreeningPRESUMEDTB: 0,
    ClientSelfTestedNO: 0,
    ClientSelfTestedYES: 0,
    CoupleDiscordantNO: 0,
    CoupleDiscordantNR: 0,
    CoupleDiscordantYES: 0,
    SEXUALNO: 0,
    SEXUALYES: 0,
    SOCIALNO: 0,
    SOCIALYES: 0,
    NONENO: 0,
    NONEYES: 0,
    NEEDLE_SHARINGNO: 0,
    NEEDLE_SHARINGYES: 0,
    ReceivedPrEPNO: 0,
    ReceivedPrEPYES: 0,
    ReceivedPEPNO: 0,
    ReceivedPEPYES: 0,
    ReceivedTBNO: 0,
    ReceivedTBYES: 0,
    ReceivedSTINO: 0,
    ReceivedSTIYES: 0,
    GBVSexualNO: 0,
    GBVSexualYES: 0,
    GBVPhysicalNO: 0,
    GBVPhysicalYES: 0,
    GBVEmotionalNO: 0,
    GBVEmotionalYES: 0,
    dayofweekFRIDAY: 0,
    dayofweekMONDAY: 0,
    dayofweekSATURDAY: 0,
    dayofweekSUNDAY: 0,
    dayofweekTHURSDAY: 0,
    dayofweekTUESDAY: 0,
    dayofweekWEDNESDAY: 0
  };

  // convert marital status
  if (latestMaritalStatus == 5555) {
    // married monogamous
    predictionVariables.MaritalStatusMARRIED = 1;
  } else if (latestMaritalStatus == 159715) {
    // married polygamous
    predictionVariables.MaritalStatusPOLYGAMOUS = 1;
  } else if (latestMaritalStatus == 1058) {
    // divorced
    predictionVariables.MaritalStatusDIVORCED = 1;
  } else if (latestMaritalStatus == 1059 || latestMaritalStatus == 1057) {
    // widowed=single
    predictionVariables.MaritalStatusSINGLE = 1;
  }

  if (pAge <= 15) {
    predictionVariables.MaritalStatusMINOR = 1;
  }

  // convert population type
  if (populationType == 164928) {
    predictionVariables.PopulationTypeGP = 1;
  } else if (populationType == 164929) {
    predictionVariables.PopulationTypeKP = 1;
  } else if (populationType == 138643) {
    predictionVariables.PopulationTypePRIORITY = 1;
  }

  //Key Population

  if (keyPopulationVal == 105) {
    //INJECT DRUGS
    predictionVariables.KeyPopulationPWID = 1;
  } else if (keyPopulationVal == 160578) {
    // MEN WITH MEN
    predictionVariables.KeyPopulationMSM = 1;
  } else if (keyPopulationVal == 160579) {
    // FEMALE SEX WORKER
    predictionVariables.KeyPopulationFSW = 1;
  } else if (
    keyPopulationVal == 5622 ||
    keyPopulationVal == 162277 ||
    keyPopulationVal == 165100
  ) {
    // Other|PRISONER|TRANS
    predictionVariables.KeyPopulationOther = 1;
  } else {
    // Not relevant
    predictionVariables.KeyPopulationNR = 1;
  }

  //Priority Population

  if (priPopulationVal == 159674) {
    //FISHER
    predictionVariables.PriorityPopulationFISHERMEN = 1;
  } else if (priPopulationVal == 160549) {
    //ADOLESCENT
    predictionVariables.PriorityPopulationAGYW = 1;
  } else if (
    priPopulationVal == 165192 ||
    priPopulationVal == 162277 ||
    priPopulationVal == 162198
  ) {
    //MILITARY|PRISONER|TRUCK
    predictionVariables.PriorityPopulationOTHER = 1;
  } else {
    // Not relevant
    predictionVariables.PriorityPopulationNR = 1;
  }

  // convert ever tested (testHistory) for hiv status
  if (testHistory == 1065) {
    predictionVariables.EverTestedForHivYES = 1;
  } else if (testHistory == 1066) {
    predictionVariables.EverTestedForHivNO = 1;
  }

  // converter for tested as i.e. individual, couple:
  // TO-DO check field
  if (testedAs == 164957) {
    predictionVariables.ClientTestedAsINDIVIDUAL = 1;
  } else if (testedAs == 164958) {
    predictionVariables.ClientTestedAsCOUPLE = 1;
  }

  // convert entry point

  if (htsEntryPoint == 159940) {
    // VCT
    predictionVariables.EntryPointVCT = 1;
  } else if (htsEntryPoint == 160542) {
    // OPD
    predictionVariables.EntryPointOPD = 1;
  } else if (htsEntryPoint == 160456 || htsEntryPoint == 1623) {
    // Maternity
    predictionVariables.EntryPointPMTCT_MAT_PNC = 1;
  } else if (htsEntryPoint == 5485) {
    // IPD
    predictionVariables.EntryPointIPD = 1;
  } else if (htsEntryPoint == 162181) {
    // Paed
    predictionVariables.EntryPointPEDIATRIC = 1;
  } else if (
    htsEntryPoint == 5622 ||
    htsEntryPoint == 160552 ||
    htsEntryPoint == 162050 ||
    htsEntryPoint == 159938 ||
    htsEntryPoint == 159939 ||
    htsEntryPoint == 160546 ||
    htsEntryPoint == 160522 ||
    htsEntryPoint == 163096
  ) {
    // Other
    predictionVariables.EntryPointOTHER = 1;
  } else if (htsEntryPoint == 162223) {
    // vmmc
    predictionVariables.EntryPointVMMC = 1;
  } else if (htsEntryPoint == 160541) {
    // tb
    predictionVariables.EntryPointTB = 1;
  } else if (htsEntryPoint == 160538) {
    // ANC
    predictionVariables.EntryPointPMTCT_ANC = 1;
  }

  // convert department

  if (htsDepartment == 159940) {
    // VCT
    predictionVariables.DepartmentVCT = 1;
  } else if (htsDepartment == 160542) {
    // OPD
    predictionVariables.DepartmentOPD = 1;
  } else if (htsDepartment == 160456 || htsDepartment == 1623) {
    // Maternity
    predictionVariables.DepartmentPMTCT = 1;
  } else if (htsDepartment == 5485) {
    // IPD
    predictionVariables.DepartmentIPD = 1;
  } else if (htsDepartment == 160473) {
    // EMERGENCY
    predictionVariables.DepartmentEMERGENCY = 1;
  }

  // convert months since last test

  if (monthsSinceLastTestInt > 0) {
    if (monthsSinceLastTestInt <= 6) {
      predictionVariables.MonthsSinceLastTestLASTSIXMONTHS = 1;
    } else if (monthsSinceLastTestInt >= 24) {
      predictionVariables.MonthsSinceLastTestMORETHANTWOYEARS = 1;
    } else if (monthsSinceLastTestInt >= 7 && monthsSinceLastTestInt <= 12) {
      predictionVariables.MonthsSinceLastTestSEVENTOTWELVE = 1;
    } else if (monthsSinceLastTestInt >= 12 && monthsSinceLastTestInt <= 24) {
      predictionVariables.MonthsSinceLastTestONETOTWOYEARS = 1;
    }
  } else {
    predictionVariables.MonthsSinceLastTestNR = 1;
  }

  // convert testing strategy

  if (testStrategy == 159938) {
    // HB
    predictionVariables.TestStrategyHB = 1;
  } else if (testStrategy == 159939) {
    // Mobile
    predictionVariables.TestStrategyMO = 1;
  } else if (testStrategy == 164163) {
    // HP
    predictionVariables.TestStrategyHP = 1;
  } else if (testStrategy == 164953) {
    // NP
    predictionVariables.TestStrategyNP = 1;
  } else if (testStrategy == 164954) {
    // Integrated VCT sites
    predictionVariables.TestStrategyVI = 1;
  } else if (testStrategy == 164955) {
    // Stand Alone VCT center
    predictionVariables.TestStrategyVS = 1;
  } else if (testStrategy == 161557) {
    // INDEX
    predictionVariables.TestStrategyINDEX = 1;
  } else if (testStrategy == 5622) {
    // OTHER
    predictionVariables.TestStrategyOTHER = 1;
  } else if (testStrategy == 166606) {
    // SNS
    predictionVariables.TestStrategySNS = 1;
  }

  // convert HIV self test

  if (selfTested == 5619) {
    predictionVariables.ClientSelfTestedNO = 1;
  } else if (selfTested == 164952) {
    predictionVariables.ClientSelfTestedYES = 1;
  }

  // convert TB screening

  if (tbScreening == 1660 || tbScreening == 160737) {
    predictionVariables.TbScreeningNOPRESUMEDTB = 1;
  } else if (tbScreening == 142177 || tbScreening == 1111) {
    predictionVariables.TbScreeningPRESUMEDTB = 1;
  } else if (tbScreening == 1496 || tbScreening == 1662) {
    predictionVariables.TbScreeningCONFIRMEDTB = 1;
  }

  // convert currently on PREP

  if (onPREP == 1065) {
    predictionVariables.CurrentlyOnPrepYES = 1;
  } else if (onPREP == 1066) {
    predictionVariables.CurrentlyOnPrepNO = 1;
  }

  // convert has STI

  if (hasSTI == 1065) {
    predictionVariables.CurrentlyHasSTIYES = 1;
  } else if (hasSTI == 1066) {
    predictionVariables.CurrentlyHasSTINO = 1;
  }

  // convert Sexually Active

  if (activeSexually == 1065) {
    predictionVariables.SexuallyActiveYES = 1;
  } else if (activeSexually == 1066) {
    predictionVariables.SexuallyActiveNO = 1;
  } else {
    predictionVariables.SexuallyActiveNR = 1;
  }

  // convert New Partner

  if (newPartner == 1065) {
    predictionVariables.NewPartnerYES = 1;
  } else if (newPartner == 1066) {
    predictionVariables.NewPartnerNO = 1;
  } else {
    predictionVariables.NewPartnerNR = 1;
  }

  // convert Health Worker

  if (isHealthWorker == 1065) {
    predictionVariables.IsHealthWorkerYES = 1;
  } else if (isHealthWorker == 1066) {
    predictionVariables.IsHealthWorkerNO = 1;
  } else {
    predictionVariables.IsHealthWorkerNR = 1;
  }

  // Partner HIV Status

  if (partnerHIVStatus == 703) {
    predictionVariables.PartnerHIVStatusPOSITIVE = 1;
  } else if (partnerHIVStatus == 664) {
    predictionVariables.PartnerHIVStatusNEGATIVE = 1;
  } else if (partnerHIVStatus == 1067) {
    predictionVariables.PartnerHIVStatusUNKNOWN = 1;
  } else {
    predictionVariables.PartnerHIVStatusNR = 1;
  }

  // Number of Partners

  if (numberOfPartnersInt > 0) {
    if (numberOfPartnersInt > 1) {
      predictionVariables.NumberOfPartnersMULTIPLE = 1;
    } else if (numberOfPartnersInt == 1) {
      predictionVariables.NumberOfPartnersSINGLE = 1;
    }
  } else {
    predictionVariables.NumberOfPartnersNR = 1;
  }

  // Alcoholic Sex

  if (alcoholicSex == 1066) {
    predictionVariables.AlcoholSexNEVER = 1;
  } else if (alcoholicSex == 1385) {
    predictionVariables.AlcoholSexSOMETIMES = 1;
  } else if (alcoholicSex == 165027) {
    predictionVariables.AlcoholSexALWAYS = 1;
  } else {
    predictionVariables.AlcoholSexNR = 1;
  }

  // Money Sex

  if (moneySex == 1065) {
    predictionVariables.MoneySexYES = 1;
  } else if (moneySex == 1066) {
    predictionVariables.MoneySexNO = 1;
  } else {
    predictionVariables.MoneySexNR = 1;
  }

  //condom burst

  if (condomBurst == 1065) {
    predictionVariables.CondomBurstYES = 1;
  } else if (condomBurst == 1066) {
    predictionVariables.CondomBurstNO = 1;
  } else {
    predictionVariables.CondomBurstNR = 1;
  }

  // unknown status partner

  if (strangerSex == 1065) {
    predictionVariables.UnknownStatusPartnerYES = 1;
  } else if (strangerSex == 1066) {
    predictionVariables.UnknownStatusPartnerNO = 1;
  } else {
    predictionVariables.UnknownStatusPartnerNR = 1;
  }

  //known status partner

  if (positiveSex == 1065) {
    predictionVariables.KnownStatusPartnerYES = 1;
  } else if (positiveSex == 1066) {
    predictionVariables.KnownStatusPartnerNO = 1;
  } else {
    predictionVariables.KnownStatusPartnerNR = 1;
  }

  //pregnant

  if (patientPregnant == 1065) {
    predictionVariables.PregnantYES = 1;
  } else if (patientPregnant == 1066) {
    predictionVariables.PregnantNO = 1;
  } else {
    predictionVariables.PregnantNR = 1;
  }

  //breastfeeding

  if (patientBreastFeeding == 1065) {
    predictionVariables.BreastfeedingMotherYES = 1;
  } else if (patientBreastFeeding == 1066) {
    predictionVariables.BreastfeedingMotherNO = 1;
  } else {
    predictionVariables.BreastfeedingMotherNR = 1;
  }

  // GBV experienced

  if (GBVExperienced == 1065) {
    predictionVariables.ExperiencedGBVYES = 1;
  } else if (GBVExperienced == 1066) {
    predictionVariables.ExperiencedGBVNO = 1;
  }

  //shared needle

  if (sharedNeedle == 1065) {
    predictionVariables.SharedNeedleYES = 1;
  } else if (sharedNeedle == 1066) {
    predictionVariables.SharedNeedleNO = 1;
  } else {
    predictionVariables.SharedNeedleNR = 1;
  }

  //needle stick injuries

  if (needleStickInjuries == 153574) {
    predictionVariables.NeedleStickInjuriesYES = 1;
  } else if (needleStickInjuries == 1066) {
    predictionVariables.NeedleStickInjuriesNO = 1;
  } else {
    predictionVariables.NeedleStickInjuriesNR = 1;
  }

  //traditional procedures

  if (traditionalProcedures == 1065) {
    predictionVariables.TraditionalProceduresYES = 1;
  } else if (traditionalProcedures == 1066) {
    predictionVariables.TraditionalProceduresNO = 1;
  } else {
    predictionVariables.TraditionalProceduresNR = 1;
  }

  //mothers status

  if (mothersStatus == 703) {
    predictionVariables.MothersStatusPOSITIVE = 1;
  } else if (mothersStatus == 664) {
    predictionVariables.MothersStatusNEGATIVE = 1;
  } else if (mothersStatus == 1067) {
    predictionVariables.MothersStatusUNKNOWN = 1;
  } else {
    predictionVariables.MothersStatusNR = 1;
  }

  //referred for testing

  if (patientReferred == 1065) {
    predictionVariables.ReferredForTestingYES = 1;
  } else if (patientReferred == 1066) {
    predictionVariables.ReferredForTestingNO = 1;
  }

  // Discordant Couple

  if (discordantCouple == 1065) {
    predictionVariables.CoupleDiscordantYES = 1;
  } else if (discordantCouple == 1066) {
    predictionVariables.CoupleDiscordantNO = 1;
  } else {
    predictionVariables.CoupleDiscordantNR = 1;
  }

  // Relationship with Contact - Sexual

  if (sexualContactChecked) {
    predictionVariables.SEXUALYES = 1;
  } else {
    predictionVariables.SEXUALNO = 1;
  }

  // Relationship with Contact - Social

  if (socialContactChecked) {
    predictionVariables.SOCIALYES = 1;
  } else {
    predictionVariables.SOCIALNO = 1;
  }

  // Relationship with Contact - None

  if (noneContactChecked) {
    predictionVariables.NONEYES = 1;
  } else {
    predictionVariables.NONENO = 1;
  }

  // Relationship with Contact Needle sharing

  if (needleSharingContactChecked) {
    predictionVariables.NEEDLE_SHARINGYES = 1;
  } else {
    predictionVariables.NEEDLE_SHARINGNO = 1;
  }

  // Received Services - prep, pep, tb, sti
  // received prep

  if (prepServiceChecked) {
    predictionVariables.ReceivedPrEPYES = 1;
  } else {
    predictionVariables.ReceivedPrEPNO = 1;
  }

  // received pep

  if (pepServiceChecked) {
    predictionVariables.ReceivedPEPYES = 1;
  } else {
    predictionVariables.ReceivedPEPNO = 1;
  }

  // received TB

  if (tbServiceChecked) {
    predictionVariables.ReceivedTBYES = 1;
  } else {
    predictionVariables.ReceivedTBNO = 1;
  }

  // received STI

  if (stiServiceChecked) {
    predictionVariables.ReceivedSTIYES = 1;
  } else {
    predictionVariables.ReceivedSTINO = 1;
  }

  // GBV Sexual

  if (GBVSexualChecked) {
    predictionVariables.GBVSexualYES = 1;
  } else {
    predictionVariables.GBVSexualNO = 1;
  }

  // GBV Physical

  if (GBVPhysicalChecked) {
    predictionVariables.GBVPhysicalYES = 1;
  } else {
    predictionVariables.GBVPhysicalNO = 1;
  }

  // GBV Emotional

  if (GBVEmotionalChecked) {
    predictionVariables.GBVEmotionalYES = 1;
  } else {
    predictionVariables.GBVEmotionalNO = 1;
  }

  // Day of week

  const currentDate = new Date();
  let dayOfWeek = currentDate.getDay();
  if (dayOfWeek == 0) {
    // Sunday
    predictionVariables.dayofweekSUNDAY = 1;
  } else if (dayOfWeek == 1) {
    // Monday
    predictionVariables.dayofweekMONDAY = 1;
  } else if (dayOfWeek == 2) {
    // Tuesday
    predictionVariables.dayofweekTUESDAY = 1;
  } else if (dayOfWeek == 3) {
    // Wednesday
    predictionVariables.dayofweekWEDNESDAY = 1;
  } else if (dayOfWeek == 4) {
    // Thursday
    predictionVariables.dayofweekTHURSDAY = 1;
  } else if (dayOfWeek == 5) {
    // Friday
    predictionVariables.dayofweekFRIDAY = 1;
  } else if (dayOfWeek == 6) {
    // Saturday
    predictionVariables.dayofweekSATURDAY = 1;
  }

  return predictionVariables;
}
