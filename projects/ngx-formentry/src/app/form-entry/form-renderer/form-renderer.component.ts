import { Component, OnInit, Input } from '@angular/core';

import { GroupNode, LeafNode, ArrayNode, NodeBase } from '../form-factory/form-node';

import { AfeFormGroup } from '../../abstract-controls-extension/control-extensions';

@Component({
    selector: 'form-renderer',
    templateUrl: 'form-renderer.component.html'
})
export class FormRendererComponent implements OnInit {

    @Input() node: NodeBase;
    @Input() parentGroup: AfeFormGroup;
    constructor() {
        // console.log('Node', this.node);
    }

    ngOnInit() {
        // console.log('Node', this.node);
    }

}
