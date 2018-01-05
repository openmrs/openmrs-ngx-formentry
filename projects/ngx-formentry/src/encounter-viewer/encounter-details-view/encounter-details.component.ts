import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'encounter-details',
    templateUrl: './encounter-details.component.html',
    styleUrls: ['./encounter-details.component.css']
})
export class EncounterDetailsComponent implements OnInit {

    public enc: any;
    @Input() set encounter(encounterObject: any) {
        this.enc = encounterObject;
    }

    constructor() {}

    ngOnInit() {}
}
