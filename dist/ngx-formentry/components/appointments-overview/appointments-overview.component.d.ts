import { OnInit, OnChanges } from '@angular/core';
import { LeafNode } from '../../form-entry/form-factory/form-node';
export declare class AppointmentsOverviewComponent implements OnInit, OnChanges {
    node: LeafNode;
    showAppointments: boolean;
    loadingAppointments: boolean;
    errorLoadingAppointments: boolean;
    appointmentsLoaded: boolean;
    appointments: Array<any>;
    today: string;
    constructor();
    ngOnInit(): void;
    ngOnChanges(): void;
    resetProperties(): void;
}
