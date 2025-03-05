import { Component, OnInit } from '@angular/core';
import { Form, FormFactory, EncounterAdapter } from '@openmrs/ngx-formentry';

// Import the sample subform JSON
const sampleSubformSchema = require('./mock/sample-subform.json');

@Component({
  selector: 'app-subform-demo',
  template: `
    <div *ngIf="form && form.rootNode">
      <h2>Subform Demo - Obs Separation Test</h2>
      <form [formGroup]="form.rootNode.control">
        <ofe-form-renderer
          [node]="form.rootNode"
          [labelMap]="labelMap"
        >
        </ofe-form-renderer>
      </form>
      
      <div class="button-container">
        <button 
          (click)="generatePayloads()" 
          class="cds--btn cds--btn--primary"
          [disabled]="!form.valid"
        >
          Generate Encounter Payloads
        </button>
        
        <button 
          (click)="resetForm()" 
          class="cds--btn cds--btn--secondary"
        >
          Reset Form
        </button>
      </div>
      
      <div *ngIf="generatedPayloads.length > 0" class="payload-display">
        <h3>Generated Encounter Payloads ({{ generatedPayloads.length }})</h3>
        <div *ngFor="let payload of generatedPayloads; let i = index" class="payload-item">
          <h4>Encounter {{ i + 1 }} - {{ getEncounterTypeName(payload.encounterType) }}</h4>
          <div class="payload-details">
            <p><strong>Encounter Type:</strong> {{ payload.encounterType }}</p>
            <p><strong>Form UUID:</strong> {{ payload.form }}</p>
            <p><strong>Patient:</strong> {{ payload.patient }}</p>
            <p><strong>Visit:</strong> {{ payload.visit }}</p>
            <p><strong>Encounter Date:</strong> {{ payload.encounterDatetime }}</p>
            <p><strong>Observations:</strong> {{ payload.obs?.length || 0 }}</p>
            <p><strong>Orders:</strong> {{ payload.orders?.length || 0 }}</p>
            <p><strong>Diagnoses:</strong> {{ payload.diagnoses?.length || 0 }}</p>
          </div>
          
          <div *ngIf="payload.obs && payload.obs.length > 0" class="obs-details">
            <h5>Observations ({{ payload.obs.length }})</h5>
            <ul>
              <li *ngFor="let obs of payload.obs">
                <strong>Concept:</strong> {{ obs.concept }} | 
                <strong>Value:</strong> {{ obs.value }} | 
                <strong>Path:</strong> {{ obs.formFieldPath }}
              </li>
            </ul>
          </div>
          
          <div *ngIf="payload.orders && payload.orders.length > 0" class="orders-details">
            <h5>Orders ({{ payload.orders.length }})</h5>
            <ul>
              <li *ngFor="let order of payload.orders">
                <strong>UUID:</strong> {{ order.uuid }} | 
                <strong>Path:</strong> {{ order.formFieldPath }}
              </li>
            </ul>
          </div>
          
          <details>
            <summary>View Full Payload</summary>
            <pre>{{ JSON.stringify(payload, null, 2) }}</pre>
          </details>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .button-container {
      margin: 20px 0;
      display: flex;
      gap: 10px;
    }
    
    .payload-display {
      margin-top: 20px;
      padding: 20px;
      background-color: #f4f4f4;
      border-radius: 4px;
    }
    
    .payload-item {
      margin-bottom: 20px;
      padding: 15px;
      background-color: white;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    
    .payload-details {
      margin: 10px 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
    }
    
    .payload-details p {
      margin: 5px 0;
      padding: 5px;
      background-color: #f8f8f8;
      border-radius: 3px;
    }
    
    .obs-details, .orders-details {
      margin: 15px 0;
      padding: 10px;
      background-color: #f0f8ff;
      border-radius: 4px;
      border-left: 4px solid #0066cc;
    }
    
    .obs-details h5, .orders-details h5 {
      margin: 0 0 10px 0;
      color: #0066cc;
    }
    
    .obs-details ul, .orders-details ul {
      margin: 0;
      padding-left: 20px;
    }
    
    .obs-details li, .orders-details li {
      margin: 5px 0;
      padding: 5px;
      background-color: white;
      border-radius: 3px;
      font-family: monospace;
      font-size: 12px;
    }
    
    pre {
      background-color: #f8f8f8;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 12px;
      border: 1px solid #ddd;
    }
    
    details {
      margin-top: 10px;
    }
    
    summary {
      cursor: pointer;
      font-weight: bold;
      color: #0066cc;
      padding: 5px;
      background-color: #f0f8ff;
      border-radius: 3px;
    }
    
    summary:hover {
      background-color: #e6f3ff;
    }
    
    h2 {
      color: #333;
      border-bottom: 2px solid #0066cc;
      padding-bottom: 10px;
    }
    
    h4 {
      color: #0066cc;
      margin-bottom: 10px;
    }
  `]
})
export class SubformDemoComponent implements OnInit {
  form: Form;
  labelMap = {};
  generatedPayloads: any[] = [];

  constructor(
    private formFactory: FormFactory,
    private encAdapter: EncounterAdapter
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    // Create form with the sample subform schema
    this.form = this.formFactory.createForm(sampleSubformSchema);
    
    // Set value processing info
    this.form.valueProcessingInfo = {
      patientUuid: 'patient-uuid-123',
      visitUuid: 'visit-uuid-456',
      encounterTypeUuid: 'dd528487-82a5-4082-9c72-ed246bd49591',
      formUuid: '43a294fc-8524-48af-bdbd-c940eac4388c',
      encounterUuid: 'encounter-uuid-789',
      providerUuid: 'provider-uuid-101',
      utcOffset: '+0300',
      locationUuid: 'location-uuid-202'
    };

    // Populate form with sample data to test obs separation
    this.populateSampleData();
  }

  populateSampleData() {
    // Set main form data
    const mainFormControls = this.form.rootNode.control;
    
    // Set visit date
    const visitDateControl = mainFormControls.get('Visit Information.Visit Details.visit_date');
    if (visitDateControl) {
      visitDateControl.setValue(new Date('2016-12-01'));
    }

    // Set chief complaint
    const chiefComplaintControl = mainFormControls.get('Visit Information.Visit Details.chief_complaint');
    if (chiefComplaintControl) {
      chiefComplaintControl.setValue('Patient reports chest pain and shortness of breath');
    }

    // Set subform data - Vital Signs Assessment
    const vitalsSystolicControl = mainFormControls.get('Vital Signs Assessment.Vital Signs.Basic Measurements.vitals_bp_group.vitals_systolic');
    if (vitalsSystolicControl) {
      vitalsSystolicControl.setValue(140);
    }

    const vitalsDiastolicControl = mainFormControls.get('Vital Signs Assessment.Vital Signs.Basic Measurements.vitals_bp_group.vitals_diastolic');
    if (vitalsDiastolicControl) {
      vitalsDiastolicControl.setValue(90);
    }

    const heartRateControl = mainFormControls.get('Vital Signs Assessment.Vital Signs.Basic Measurements.vitals_heart_rate');
    if (heartRateControl) {
      heartRateControl.setValue(85);
    }

    const temperatureControl = mainFormControls.get('Vital Signs Assessment.Vital Signs.Basic Measurements.vitals_temperature');
    if (temperatureControl) {
      temperatureControl.setValue(37.2);
    }

    // Set subform data - Laboratory Tests
    const hivTestControl = mainFormControls.get('Laboratory Tests.Lab Orders.Test Orders.hiv_test');
    if (hivTestControl) {
      hivTestControl.setValue('a8982474-1350-11df-a1f1-0026b9348838');
    }

    const cd4TestControl = mainFormControls.get('Laboratory Tests.Lab Orders.Test Orders.cd4_test');
    if (cd4TestControl) {
      cd4TestControl.setValue('a89dda72-1350-11df-a1f1-0026b9348838');
    }

    // Set subform data - Medication Review
    const medicationListControl = mainFormControls.get('Medication Review.Medications.Current Medications.medication_list');
    if (medicationListControl) {
      medicationListControl.setValue('Aspirin 81mg daily, Lisinopril 10mg daily');
    }
  }

  generatePayloads() {
    if (this.form.valid) {
      this.form.showErrors = false;
      
      // Generate multiple encounter payloads based on subforms
      this.generatedPayloads = this.encAdapter.generateFormPayloadWithSubforms(this.form);
      
      console.log('Generated encounter payloads:', this.generatedPayloads);
    } else {
      this.form.showErrors = true;
      this.form.markInvalidControls(this.form.rootNode);
    }
  }

  resetForm() {
    this.form.rootNode.control.reset();
    this.generatedPayloads = [];
  }

  getEncounterTypeName(encounterTypeUuid: string): string {
    const encounterTypes = {
      'dd528487-82a5-4082-9c72-ed246bd49591': 'Consultation',
      '67a71486-1a54-468f-ac3e-7091a9a79584': 'Vital Signs',
      '8d5b2be0-c2cc-11de-8d13-0010c6dffd0f': 'Medication Review'
    };
    return encounterTypes[encounterTypeUuid] || 'Unknown';
  }

  get JSON() {
    return JSON;
  }
} 