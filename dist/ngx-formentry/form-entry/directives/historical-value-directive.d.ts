import { EventEmitter } from '@angular/core';
import { HistoricalFieldHelperService } from '../helpers/historical-field-helper-service';
import { NodeBase } from '../form-factory/form-node';
export declare class HistoricalValueDirective {
    private historicalFieldHelper;
    _node: NodeBase;
    _nodeChange: EventEmitter<Object>;
    historicalDisplay: string;
    constructor(historicalFieldHelper: HistoricalFieldHelperService);
    setValue(e: any): void;
    private compareString(a, b);
    node: NodeBase;
}
