import { Component, Input, OnInit } from "@angular/core";

import { LeafNode } from "../../form-entry/form-factory/form-node";
import { getMLRiskScore } from "./machine-learning";


const machineLearningQuestions = ["populationType", "htsFacilityEntryPoint", "testHistory", "gender", "hasDisability", "selfTest", "birthDate", "screenedTB", "facilityHTStrategy", "maritalStatus", "kpTypeFemale", "kpTypeMale", "ppType", "department", "lastTestDate", "prep", "sti", "sexuallyActive", "newPartner", "partnerHivStatus", "noSexPartners", "alcoholicSex", "moneySex", "condomBurst", "strangerSex", "knownPositive", "pregnant", "breastfeeding", "gbvViolence", "sharedNeedle", "needleStickInjuries", "traditionalProcedures", "mothersHivstatus", "clientReferred", "coupleDiscordant", "pep", "age"]

@Component({
    selector: "machine-learning-risk-score",
    templateUrl: "./machine-learning.component.html",
    styleUrls: ["./machine-learning.component.scss"]
})
export class MachineLearningComponent implements OnInit {
    @Input() node: LeafNode;
    endPointParams = {};
    showMachineLearningButton = false;

    ngOnInit() {
        this.showMachineLearningButton = this.node.question.extras?.questionOptions["machineLearning"] || false;
    }

    getRiskScore() {
        machineLearningQuestions.forEach(question => {
            this.endPointParams = { ...this.endPointParams, [question]: this.node.form.searchNodeByQuestionId(question)[0]?.control.value ?? "" }
        })
        getMLRiskScore(this.endPointParams).then((res) => {console.log(res)})
    }

}