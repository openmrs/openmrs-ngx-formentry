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
    htsEntryPoint,
    htsDepartment,
    monthsSinceLastTestInt,
    testStrategy,
    tbScreening,
    tbFever,
    tbNightSweats,
    tbCough,
    tbScreeningStatus,
    everHadSex,
    multipleSexPartners,
    patientType,
    activeSexually,
    newPartner,
    partnerHIVStatus,
    numberOfPartnersInt,
    alcoholicSex,
    moneySex,
    strangerSex,
    positiveSex,
    patientPregnant,
    patientBreastFeeding,
    discordantCouple,
    sexualContactChecked,
    noneContactChecked
  } = model;
  let predictionVariables = {
    Age: pAge,
    ScreenedTBDECLINE: 0,
    ScreenedTBNO: 0,
    ScreenedTBYES: 0,
    ScreenedTBNR: 0,
    HTSStrategyHB: 0,
    HTSStrategyHP: 0,
    HTSStrategyINDEX: 0,
    HTSStrategyMO: 0,
    HTSStrategyNP: 0,
    HTSStrategyOTHER: 0,
    HTSStrategySNS: 0,
    HTSStrategyVI: 0,
    HTSStrategyVS: 0,
    GenderFEMALE: pgender == 'F' ? 1 : 0,
    GenderMALE: pgender == 'M' ? 1 : 0,
    MaritalStatusDIVORCED: 0,
    MaritalStatusMARRIED: 0,
    MaritalStatusMINOR: 0,
    MaritalStatusOTHER: 0,
    MaritalStatusPOLYGAMOUS: 0,
    MaritalStatusSINGLE: 0,
    HTSEntryPointHOMEBASED: 0,
    HTSEntryPointIPD: 0,
    HTSEntryPointOPD: 0,
    HTSEntryPointOTHER: 0,
    HTSEntryPointPEDIATRIC: 0,
    HTSEntryPointPMTCT_ANC: 0,
    HTSEntryPointPMTCT_MAT_PNC: 0,
    HTSEntryPointTB: 0,
    HTSEntryPointVCT: 0,
    HTSEntryPointVMMC: 0,
    CoupleDiscordantNO: 0,
    CoupleDiscordantNR: 0,
    CoupleDiscordantYES: 0,
    KnownStatusPartnerDECLINE: 0,
    KnownStatusPartnerNO: 0,
    KnownStatusPartnerNR: 0,
    KnownStatusPartnerYES: 0,
    PregnantDECLINE: 0,
    PregnantNO: 0,
    PregnantNR: 0,
    PregnantYES: 0,
    MultiplePartnersNO: 0,
    MultiplePartnersNR: 0,
    MultiplePartnersYES: 0,
    TBStatusNO_TBSIGNS: 0,
    TBStatusNR: 0,
    TBStatusTBCONFIRMED: 0,
    TBStatusTBPRESUMED: 0,
    SEXUALNO: 0,
    SEXUALNR: 0,
    SEXUALYES: 0,
    NONENO: 0,
    NONEYES: 0,
    DepartmentEMERGENCY: 0,
    DepartmentIPD: 0,
    DepartmentOPD: 0,
    DepartmentPMTCT: 0,
    DepartmentVCT: 0,
    PatientTypeHP: 0,
    PatientTypeNon_HP: 0,
    PopulationTypeGP: 0,
    PopulationTypeKP: 0,
    PopulationTypePRIORITY: 0,
    FeverNO: 0,
    FeverNR: 0,
    FeverYES: 0,
    MonthsSinceLastTestLASTSIXMONTHS: 0,
    MonthsSinceLastTestMORETHANTWOYEARS: 0,
    MonthsSinceLastTestNR: 0,
    MonthsSinceLastTestONETOTWOYEARS: 0,
    MonthsSinceLastTestSEVENTOTWELVE: 0,
    NightSweatsNO: 0,
    NightSweatsNR: 0,
    NightSweatsYES: 0,
    CoughNO: 0,
    CoughNR: 0,
    CoughYES: 0,
    PartnerHIVStatusDECLINE: 0,
    PartnerHIVStatusNEGATIVE: 0,
    PartnerHIVStatusNR: 0,
    PartnerHIVStatusPOSITIVE: 0,
    PartnerHIVStatusUNKNOWN: 0,
    BreastfeedingMotherDECLINE: 0,
    BreastfeedingMotherNO: 0,
    BreastfeedingMotherNR: 0,
    BreastfeedingMotherYES: 0,
    UnknownStatusPartnerDECLINE: 0,
    UnknownStatusPartnerNO: 0,
    UnknownStatusPartnerNR: 0,
    UnknownStatusPartnerYES: 0,
    PriorityPopulationAGYW: 0,
    PriorityPopulationFISHERMEN: 0,
    PriorityPopulationNR: 0,
    PriorityPopulationOTHER: 0,
    MoneySexDECLINE: 0,
    MoneySexNO: 0,
    MoneySexNR: 0,
    MoneySexYES: 0,
    AlcoholSexALWAYS: 0,
    AlcoholSexNEVER: 0,
    AlcoholSexNR: 0,
    AlcoholSexSOMETIMES: 0,
    NewPartnerDECLINE: 0,
    NewPartnerNO: 0,
    NewPartnerNR: 0,
    NewPartnerYES: 0,
    TestedHIVBeforeNo: 0,
    TestedHIVBeforeYes: 0,
    NumberOfPartnersMULTIPLE: 0,
    NumberOfPartnersNR: 0,
    NumberOfPartnersSINGLE: 0,
    SexuallyActiveDECLINE: 0,
    SexuallyActiveNO: 0,
    SexuallyActiveNR: 0,
    SexuallyActiveYES: 0,
    KeyPopulationFSW: 0,
    KeyPopulationMSM: 0,
    KeyPopulationNR: 0,
    KeyPopulationOther: 0,
    KeyPopulationPWID: 0
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
  } else if (latestMaritalStatus == 5622) {
    // other
    predictionVariables.MaritalStatusOTHER = 1;
  }

  if (pAge <= 15) {
    predictionVariables.MaritalStatusMINOR = 1;
  }

  console.warn('Population Type: ', populationType);
  // convert population type
  if (populationType == 166430) {
    predictionVariables.PopulationTypeGP = 1;
  } else if (populationType === 'bf850dd4-309b-4cbd-9470-9d8110ea5550') {
    predictionVariables.PopulationTypeKP = 1;
  } else if (populationType == 138643) {
    predictionVariables.PopulationTypePRIORITY = 1;
  }

  //Key Population
  if (populationType == 164929) {
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
      predictionVariables.KeyPopulationPWID = -10000.0;
      predictionVariables.KeyPopulationMSM = -10000.0;
      predictionVariables.KeyPopulationFSW = -10000.0;
      predictionVariables.KeyPopulationOther = -10000.0;
      predictionVariables.KeyPopulationNR = -10000.0;
    }
  } else {
    // Not relevant
    predictionVariables.KeyPopulationNR = 1;
  }

  //Priority Population

  if (populationType == 138643) {
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
      predictionVariables.PriorityPopulationFISHERMEN = -10000.0;
      predictionVariables.PriorityPopulationAGYW = -10000.0;
      predictionVariables.PriorityPopulationOTHER = -10000.0;
      predictionVariables.PriorityPopulationNR = -10000.0;
    }
  } else {
    // Not relevant
    predictionVariables.PriorityPopulationNR = 1;
  }

  // convert ever tested (testHistory) for hiv status

  if (testHistory == 1065) {
    predictionVariables.TestedHIVBeforeYes = 1;
  } else if (testHistory == 1066) {
    predictionVariables.TestedHIVBeforeNo = 1;
  } else {
    predictionVariables.TestedHIVBeforeYes = -10000.0;
    predictionVariables.TestedHIVBeforeNo = -10000.0;
  }

  // convert entry point

  if (htsEntryPoint == 159940) {
    // VCT
    predictionVariables.HTSEntryPointVCT = 1;
  } else if (htsEntryPoint == 160542) {
    // OPD
    predictionVariables.HTSEntryPointOPD = 1;
  } else if (htsEntryPoint == 160456 || htsEntryPoint == 1623) {
    // Maternity
    predictionVariables.HTSEntryPointPMTCT_MAT_PNC = 1;
  } else if (htsEntryPoint == 5485) {
    // IPD
    predictionVariables.HTSEntryPointIPD = 1;
  } else if (htsEntryPoint == 162181) {
    // Paed
    predictionVariables.HTSEntryPointPEDIATRIC = 1;
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
    predictionVariables.HTSEntryPointOTHER = 1;
  } else if (htsEntryPoint == 162223) {
    // vmmc
    predictionVariables.HTSEntryPointVMMC = 1;
  } else if (htsEntryPoint == 160541) {
    // tb
    predictionVariables.HTSEntryPointTB = 1;
  } else if (htsEntryPoint == 160538) {
    // ANC
    predictionVariables.HTSEntryPointPMTCT_ANC = 1;
  } else if (htsEntryPoint == 161359) {
    // Home Based
    predictionVariables.HTSEntryPointHOMEBASED = 1;
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
    predictionVariables.HTSStrategyHB = 1;
  } else if (testStrategy == 159939) {
    // Mobile
    predictionVariables.HTSStrategyMO = 1;
  } else if (testStrategy == 164163) {
    // HP
    predictionVariables.HTSStrategyHP = 1;
  } else if (testStrategy == 164953) {
    // NP
    predictionVariables.HTSStrategyNP = 1;
  } else if (testStrategy == 164954) {
    // Integrated VCT sites
    predictionVariables.HTSStrategyVI = 1;
  } else if (testStrategy == 164955) {
    // Stand Alone VCT center
    predictionVariables.HTSStrategyVS = 1;
  } else if (testStrategy == 161557) {
    // INDEX
    predictionVariables.HTSStrategyINDEX = 1;
  } else if (testStrategy == 5622) {
    // OTHER
    predictionVariables.HTSStrategyOTHER = 1;
  } else if (testStrategy == 166606) {
    // SNS
    predictionVariables.HTSStrategySNS = 1;
  }

  // Screened For TB

  // (patient under or = 10 yrs && hivBefore == yes) || (patient over 10 yrs) else NR
  if ((pAge <= 10 && testHistory == 1065) || pAge > 10) {
    if (tbScreening == 1065) {
      // YES
      predictionVariables.ScreenedTBYES = 1;
    } else if (tbScreening == 1066) {
      // NO
      predictionVariables.ScreenedTBNO = 1;
    } else if (tbScreening == 162570) {
      // DECLINED
      predictionVariables.ScreenedTBDECLINE = 1;
    } else {
      predictionVariables.ScreenedTBYES = -10000.0;
      predictionVariables.ScreenedTBNO = -10000.0;
      predictionVariables.ScreenedTBDECLINE = -10000.0;
      predictionVariables.ScreenedTBNR = -10000.0;
    }
  } else {
    predictionVariables.ScreenedTBNR = 1;
  }

  // Has Fever
  if ((pAge <= 10 && testHistory == 1065) || pAge > 10) {
    if (tbScreening == 1065) {
      if (tbFever == 1066) {
        predictionVariables.FeverNO = 1;
      } else if (tbFever == 1494) {
        predictionVariables.FeverYES = 1;
      } else {
        predictionVariables.FeverNO = -10000.0;
        predictionVariables.FeverYES = -10000.0;
      }
    } else if (tbScreening == 1066) {
      predictionVariables.FeverNR = 1;
    } else {
      predictionVariables.FeverNO = -10000.0;
      predictionVariables.FeverYES = -10000.0;
    }
  } else {
    predictionVariables.FeverNR = 1;
  }

  // Has Night Sweats

  if ((pAge <= 10 && testHistory == 1065) || pAge > 10) {
    if (tbScreening == 1065) {
      if (tbNightSweats == 1066) {
        predictionVariables.NightSweatsNO = 1;
      } else if (tbNightSweats == 133027) {
        predictionVariables.NightSweatsYES = 1;
      } else {
        predictionVariables.NightSweatsNO = -10000.0;
        predictionVariables.NightSweatsYES = -10000.0;
      }
    } else if (tbScreening == 1066) {
      predictionVariables.NightSweatsNR = 1;
    } else {
      predictionVariables.NightSweatsNO = -10000.0;
      predictionVariables.NightSweatsYES = -10000.0;
    }
  } else {
    predictionVariables.NightSweatsNR = 1;
  }

  // Has Cough

  if ((pAge <= 10 && testHistory == 1065) || pAge > 10) {
    if (tbScreening == 1065) {
      if (tbCough == 1066) {
        predictionVariables.CoughNO = 1;
      } else if (tbCough == 159799) {
        predictionVariables.CoughYES = 1;
      } else {
        predictionVariables.CoughNO = -10000.0;
        predictionVariables.CoughYES = -10000.0;
      }
    } else if (tbScreening == 1066) {
      predictionVariables.CoughNR = 1;
    } else {
      predictionVariables.CoughNO = -10000.0;
      predictionVariables.CoughYES = -10000.0;
    }
  } else {
    predictionVariables.CoughNR = 1;
  }

  // TB Screening Results

  if ((pAge <= 10 && testHistory == 1065) || pAge > 10) {
    if (tbScreening == 1065) {
      if (tbScreeningStatus == 1660) {
        predictionVariables.TBStatusNO_TBSIGNS = 1;
      } else if (tbScreeningStatus == 1662) {
        predictionVariables.TBStatusTBCONFIRMED = 1;
      } else if (tbScreeningStatus == 142177) {
        predictionVariables.TBStatusTBPRESUMED = 1;
      } else {
        predictionVariables.TBStatusNO_TBSIGNS = -10000.0;
        predictionVariables.TBStatusTBCONFIRMED = -10000.0;
        predictionVariables.TBStatusTBPRESUMED = -10000.0;
        predictionVariables.TBStatusNR = -10000.0;
      }
    } else if (tbScreening == 1066) {
      predictionVariables.TBStatusNR = 1;
    } else {
      predictionVariables.TBStatusNO_TBSIGNS = -10000.0;
      predictionVariables.TBStatusTBCONFIRMED = -10000.0;
      predictionVariables.TBStatusTBPRESUMED = -10000.0;
      predictionVariables.TBStatusNR = -10000.0;
    }
  } else {
    predictionVariables.TBStatusNR = 1;
  }

  // convert Sexually Active

  if (pAge > 10) {
    if (everHadSex == 1) {
      if (activeSexually == 1065) {
        predictionVariables.SexuallyActiveYES = 1;
      } else if (activeSexually == 1066) {
        predictionVariables.SexuallyActiveNO = 1;
      } else if (activeSexually == 162570) {
        predictionVariables.SexuallyActiveDECLINE = 1;
      } else {
        predictionVariables.SexuallyActiveYES = -10000.0;
        predictionVariables.SexuallyActiveNO = -10000.0;
        predictionVariables.SexuallyActiveDECLINE = -10000.0;
        predictionVariables.SexuallyActiveNR = -10000.0;
      }
    } else if (everHadSex == 0) {
      predictionVariables.SexuallyActiveNR = 1;
    } else {
      predictionVariables.SexuallyActiveYES = -10000.0;
      predictionVariables.SexuallyActiveNO = -10000.0;
      predictionVariables.SexuallyActiveDECLINE = -10000.0;
      predictionVariables.SexuallyActiveNR = -10000.0;
    }
  } else {
    predictionVariables.SexuallyActiveNR = 1;
  }

  // Multiple Sexual Partners
  if (pAge > 10) {
    if (everHadSex == 1) {
      if (multipleSexPartners == 'true') {
        predictionVariables.MultiplePartnersYES = 1;
      } else if (multipleSexPartners == 'false') {
        predictionVariables.MultiplePartnersNO = 1;
      } else {
        predictionVariables.MultiplePartnersYES = -10000.0;
        predictionVariables.MultiplePartnersNO = -10000.0;
        predictionVariables.MultiplePartnersNR = -10000.0;
      }
    } else if (everHadSex == 0) {
      predictionVariables.MultiplePartnersNR = 1;
    } else {
      predictionVariables.MultiplePartnersYES = -10000.0;
      predictionVariables.MultiplePartnersNO = -10000.0;
      predictionVariables.MultiplePartnersNR = -10000.0;
    }
  } else {
    predictionVariables.MultiplePartnersNR = 1;
  }

  // Patient Type

  if (patientType == 164163) {
    predictionVariables.PatientTypeHP = 1;
  } else if (patientType == 164953) {
    predictionVariables.PatientTypeNon_HP = 1;
  }

  // convert New Partner

  if (pAge > 10) {
    if (everHadSex == 1) {
      if (newPartner == 1065) {
        predictionVariables.NewPartnerYES = 1;
      } else if (newPartner == 1066) {
        predictionVariables.NewPartnerNO = 1;
      } else if (newPartner == 162570) {
        predictionVariables.NewPartnerDECLINE = 1;
      } else {
        predictionVariables.NewPartnerYES = -10000.0;
        predictionVariables.NewPartnerNO = -10000.0;
        predictionVariables.NewPartnerDECLINE = -10000.0;
        predictionVariables.NewPartnerNR = -10000.0;
      }
    } else if (everHadSex == 0) {
      predictionVariables.NewPartnerNR = 1;
    } else {
      predictionVariables.NewPartnerYES = -10000.0;
      predictionVariables.NewPartnerNO = -10000.0;
      predictionVariables.NewPartnerDECLINE = -10000.0;
      predictionVariables.NewPartnerNR = -10000.0;
    }
  } else {
    predictionVariables.NewPartnerNR = 1;
  }

  // Partner HIV Status

  if (pAge > 10) {
    if (everHadSex == 1) {
      if (partnerHIVStatus == 703) {
        predictionVariables.PartnerHIVStatusPOSITIVE = 1;
      } else if (partnerHIVStatus == 664) {
        predictionVariables.PartnerHIVStatusNEGATIVE = 1;
      } else if (partnerHIVStatus == 1067) {
        predictionVariables.PartnerHIVStatusUNKNOWN = 1;
      } else if (partnerHIVStatus == 162570) {
        predictionVariables.PartnerHIVStatusDECLINE = 1;
      } else {
        predictionVariables.PartnerHIVStatusPOSITIVE = -10000.0;
        predictionVariables.PartnerHIVStatusNEGATIVE = -10000.0;
        predictionVariables.PartnerHIVStatusUNKNOWN = -10000.0;
        predictionVariables.PartnerHIVStatusDECLINE = -10000.0;
        predictionVariables.PartnerHIVStatusNR = -10000.0;
      }
    } else if (everHadSex == 0) {
      predictionVariables.PartnerHIVStatusNR = 1;
    } else {
      predictionVariables.PartnerHIVStatusPOSITIVE = -10000.0;
      predictionVariables.PartnerHIVStatusNEGATIVE = -10000.0;
      predictionVariables.PartnerHIVStatusUNKNOWN = -10000.0;
      predictionVariables.PartnerHIVStatusDECLINE = -10000.0;
      predictionVariables.PartnerHIVStatusNR = -10000.0;
    }
  } else {
    predictionVariables.PartnerHIVStatusNR = 1;
  }

  // Number of Partners

  if (pAge > 10) {
    if (everHadSex == 1) {
      if (numberOfPartnersInt > 1) {
        predictionVariables.NumberOfPartnersMULTIPLE = 1;
      } else if (numberOfPartnersInt == 1 || numberOfPartnersInt == 0) {
        predictionVariables.NumberOfPartnersSINGLE = 1;
      } else {
        predictionVariables.NumberOfPartnersMULTIPLE = -10000.0;
        predictionVariables.NumberOfPartnersSINGLE = -10000.0;
        predictionVariables.NumberOfPartnersNR = -10000.0;
      }
    } else if (everHadSex == 0) {
      predictionVariables.NumberOfPartnersNR = 1;
    } else {
      predictionVariables.NumberOfPartnersMULTIPLE = -10000.0;
      predictionVariables.NumberOfPartnersSINGLE = -10000.0;
      predictionVariables.NumberOfPartnersNR = -10000.0;
    }
  } else {
    predictionVariables.NumberOfPartnersNR = 1;
  }

  // Alcoholic Sex

  if (pAge > 10) {
    if (everHadSex == 1) {
      if (alcoholicSex == 1066) {
        predictionVariables.AlcoholSexNEVER = 1;
      } else if (alcoholicSex == 1385) {
        predictionVariables.AlcoholSexSOMETIMES = 1;
      } else if (alcoholicSex == 165027) {
        predictionVariables.AlcoholSexALWAYS = 1;
      } else {
        predictionVariables.AlcoholSexNEVER = -10000.0;
        predictionVariables.AlcoholSexSOMETIMES = -10000.0;
        predictionVariables.AlcoholSexALWAYS = -10000.0;
        predictionVariables.AlcoholSexNR = -10000.0;
      }
    } else if (everHadSex == 0) {
      predictionVariables.AlcoholSexNR = 1;
    } else {
      predictionVariables.AlcoholSexNEVER = -10000.0;
      predictionVariables.AlcoholSexSOMETIMES = -10000.0;
      predictionVariables.AlcoholSexALWAYS = -10000.0;
      predictionVariables.AlcoholSexNR = -10000.0;
    }
  } else {
    predictionVariables.AlcoholSexNR = 1;
  }

  // Money Sex

  if (pAge > 10) {
    if (everHadSex == 1) {
      if (moneySex == 1065) {
        predictionVariables.MoneySexYES = 1;
      } else if (moneySex == 1066) {
        predictionVariables.MoneySexNO = 1;
      } else if (moneySex == 162570) {
        predictionVariables.MoneySexDECLINE = 1;
      } else {
        predictionVariables.MoneySexYES = -10000.0;
        predictionVariables.MoneySexNO = -10000.0;
        predictionVariables.MoneySexDECLINE = -10000.0;
        predictionVariables.MoneySexNR = -10000.0;
      }
    } else if (everHadSex == 0) {
      predictionVariables.MoneySexNR = 1;
    } else {
      predictionVariables.MoneySexYES = -10000.0;
      predictionVariables.MoneySexNO = -10000.0;
      predictionVariables.MoneySexDECLINE = -10000.0;
      predictionVariables.MoneySexNR = -10000.0;
    }
  } else {
    predictionVariables.MoneySexNR = 1;
  }

  // unknown status partner

  if (pAge > 10) {
    if (everHadSex == 1) {
      if (strangerSex == 1065) {
        predictionVariables.UnknownStatusPartnerYES = 1;
      } else if (strangerSex == 1066) {
        predictionVariables.UnknownStatusPartnerNO = 1;
      } else if (positiveSex == 162570) {
        predictionVariables.UnknownStatusPartnerDECLINE = 1;
      } else {
        predictionVariables.UnknownStatusPartnerYES = -10000.0;
        predictionVariables.UnknownStatusPartnerNO = -10000.0;
        predictionVariables.UnknownStatusPartnerDECLINE = -10000.0;
        predictionVariables.UnknownStatusPartnerNR = -10000.0;
      }
    } else if (everHadSex == 0) {
      predictionVariables.UnknownStatusPartnerNR = 1;
    } else {
      predictionVariables.UnknownStatusPartnerYES = -10000.0;
      predictionVariables.UnknownStatusPartnerNO = -10000.0;
      predictionVariables.UnknownStatusPartnerDECLINE = -10000.0;
      predictionVariables.UnknownStatusPartnerNR = -10000.0;
    }
  } else {
    predictionVariables.UnknownStatusPartnerNR = 1;
  }

  //known status partner

  if (pAge > 10) {
    if (everHadSex == 1) {
      if (positiveSex == 163289) {
        predictionVariables.KnownStatusPartnerYES = 1;
      } else if (positiveSex == 1066) {
        predictionVariables.KnownStatusPartnerNO = 1;
      } else if (positiveSex == 162570) {
        predictionVariables.KnownStatusPartnerDECLINE = 1;
      } else {
        predictionVariables.KnownStatusPartnerYES = -10000.0;
        predictionVariables.KnownStatusPartnerNO = -10000.0;
        predictionVariables.KnownStatusPartnerDECLINE = -10000.0;
        predictionVariables.KnownStatusPartnerNR = -10000.0;
      }
    } else if (everHadSex == 0) {
      predictionVariables.KnownStatusPartnerNR = 1;
    } else {
      predictionVariables.KnownStatusPartnerYES = -10000.0;
      predictionVariables.KnownStatusPartnerNO = -10000.0;
      predictionVariables.KnownStatusPartnerDECLINE = -10000.0;
      predictionVariables.KnownStatusPartnerNR = -10000.0;
    }
  } else {
    predictionVariables.KnownStatusPartnerNR = 1;
  }

  //pregnant

  if (pgender == 'F' && pAge >= 10 && pAge <= 50) {
    if (patientPregnant == 1065) {
      predictionVariables.PregnantYES = 1;
    } else if (patientPregnant == 1066) {
      predictionVariables.PregnantNO = 1;
    } else if (patientPregnant == 162570) {
      predictionVariables.PregnantDECLINE = 1;
    } else {
      predictionVariables.PregnantYES = -10000.0;
      predictionVariables.PregnantNO = -10000.0;
      predictionVariables.PregnantDECLINE = -10000.0;
      predictionVariables.PregnantNR = -10000.0;
    }
  } else {
    predictionVariables.PregnantNR = 1;
  }

  //breastfeeding

  if (pgender == 'F' && pAge >= 10 && pAge <= 50) {
    if (patientBreastFeeding == 1065) {
      predictionVariables.BreastfeedingMotherYES = 1;
    } else if (patientBreastFeeding == 1066) {
      predictionVariables.BreastfeedingMotherNO = 1;
    } else if (patientBreastFeeding == 162570) {
      predictionVariables.BreastfeedingMotherDECLINE = 1;
    } else {
      predictionVariables.BreastfeedingMotherYES = -10000.0;
      predictionVariables.BreastfeedingMotherNO = -10000.0;
      predictionVariables.BreastfeedingMotherDECLINE = -10000.0;
      predictionVariables.BreastfeedingMotherNR = -10000.0;
    }
  } else {
    predictionVariables.BreastfeedingMotherNR = 1;
  }

  // Discordant Couple

  if (pAge > 10) {
    if (everHadSex == 1) {
      if (discordantCouple == 1065) {
        predictionVariables.CoupleDiscordantYES = 1;
      } else if (discordantCouple == 1066) {
        predictionVariables.CoupleDiscordantNO = 1;
      } else {
        predictionVariables.CoupleDiscordantYES = -10000.0;
        predictionVariables.CoupleDiscordantNO = -10000.0;
        predictionVariables.CoupleDiscordantNR = -10000.0;
      }
    } else if (everHadSex == 0) {
      predictionVariables.CoupleDiscordantNR = 1;
    } else {
      predictionVariables.CoupleDiscordantYES = -10000.0;
      predictionVariables.CoupleDiscordantNO = -10000.0;
      predictionVariables.CoupleDiscordantNR = -10000.0;
    }
  } else {
    predictionVariables.CoupleDiscordantNR = 1;
  }

  // Relationship with Contact - Sexual

  if (pAge < 10) {
    predictionVariables.SEXUALNR = 1;
  } else {
    if (sexualContactChecked) {
      predictionVariables.SEXUALYES = 1;
    } else {
      predictionVariables.SEXUALNO = 1;
    }
  }

  // Relationship with Contact - None

  if (noneContactChecked) {
    predictionVariables.NONEYES = 1;
  } else {
    predictionVariables.NONENO = 1;
  }

  return predictionVariables;
}
