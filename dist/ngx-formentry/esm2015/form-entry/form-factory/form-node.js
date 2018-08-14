/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function ChildNodeCreatedListener() { }
function ChildNodeCreatedListener_tsickle_Closure_declarations() {
    /** @type {?} */
    ChildNodeCreatedListener.prototype.addChildNodeCreatedListener;
    /** @type {?} */
    ChildNodeCreatedListener.prototype.fireChildNodeCreatedListener;
}
/**
 * @record
 */
export function RemoveArrayChildNodeFunction() { }
function RemoveArrayChildNodeFunction_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    (index: number, node: ArrayNode);
    */
}
export class NodeBase {
    /**
     * @param {?} question
     * @param {?=} control
     * @param {?=} form
     * @param {?=} parentPath
     */
    constructor(question, control, form, parentPath) {
        this._control = control;
        this._questionModel = question;
        this._form = form;
        this._path = parentPath ? parentPath + '.' + question.key : question.key;
    }
    /**
     * @return {?}
     */
    get question() {
        return this._questionModel;
    }
    /**
     * @return {?}
     */
    get control() {
        return this._control;
    }
    /**
     * @return {?}
     */
    get form() {
        return this._form;
    }
    /**
     * @return {?}
     */
    get path() {
        return this._path;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeAt(index) { }
    /**
     * @return {?}
     */
    createChildNode() { }
    /**
     * @return {?}
     */
    removeChildNode() { }
}
function NodeBase_tsickle_Closure_declarations() {
    /** @type {?} */
    NodeBase.prototype.children;
    /** @type {?} */
    NodeBase.prototype._control;
    /** @type {?} */
    NodeBase.prototype._questionModel;
    /** @type {?} */
    NodeBase.prototype._form;
    /** @type {?} */
    NodeBase.prototype._path;
    /** @type {?} */
    NodeBase.prototype.initialValue;
}
export class LeafNode extends NodeBase {
    /**
     * @param {?} question
     * @param {?=} control
     * @param {?=} parentControl
     * @param {?=} form
     * @param {?=} parentPath
     */
    constructor(question, control, parentControl, form, parentPath) {
        super(question, control, form, parentPath);
    }
}
export class GroupNode extends NodeBase {
    /**
     * @param {?} question
     * @param {?=} control
     * @param {?=} parentControl
     * @param {?=} form
     * @param {?=} parentPath
     */
    constructor(question, control, parentControl, form, parentPath) {
        super(question, control, form, parentPath);
        this._children = {};
    }
    /**
     * @return {?}
     */
    get children() {
        return this._children;
    }
    /**
     * @param {?} key
     * @param {?} node
     * @return {?}
     */
    setChild(key, node) {
        this.children[key] = node;
    }
}
function GroupNode_tsickle_Closure_declarations() {
    /** @type {?} */
    GroupNode.prototype._children;
}
export class ArrayNode extends NodeBase {
    /**
     * @param {?} question
     * @param {?=} control
     * @param {?=} parentControl
     * @param {?=} formFactory
     * @param {?=} form
     * @param {?=} parentPath
     */
    constructor(question, control, parentControl, formFactory, form, parentPath) {
        super(question, control, form, parentPath);
        this.formFactory = formFactory;
        this.childNodeCreatedEvents = [];
        this._children = [];
        this.childNodeCreatedEvents = [];
    }
    /**
     * @return {?}
     */
    get children() {
        return this._children;
    }
    /**
     * @return {?}
     */
    createChildNode() {
        if (this.createChildFunc) {
            const /** @type {?} */ g = this.createChildFunc(/** @type {?} */ (this.question), this, this.formFactory);
            this.fireChildNodeCreatedListener(g);
            return g;
        }
        return null;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeAt(index) {
        if (this.removeChildFunc) {
            this.removeChildFunc(index, this);
        }
    }
    /**
     * @param {?} func
     * @return {?}
     */
    addChildNodeCreatedListener(func) {
        this.childNodeCreatedEvents.push(func);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    fireChildNodeCreatedListener(node) {
        for (let /** @type {?} */ i = 0; i < this.childNodeCreatedEvents.length; i++) {
            const /** @type {?} */ func = this.childNodeCreatedEvents[i];
            func(node);
        }
    }
}
function ArrayNode_tsickle_Closure_declarations() {
    /** @type {?} */
    ArrayNode.prototype.childNodeCreatedEvents;
    /** @type {?} */
    ArrayNode.prototype._children;
    /** @type {?} */
    ArrayNode.prototype.createChildFunc;
    /** @type {?} */
    ArrayNode.prototype.removeChildFunc;
    /** @type {?} */
    ArrayNode.prototype.formFactory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU07Ozs7Ozs7SUFTRixZQUFZLFFBQXNCLEVBQUUsT0FBc0QsRUFBRSxJQUFXLEVBQUUsVUFBbUI7UUFDeEgsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztLQUM1RTs7OztRQUVVLFFBQVE7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQzs7Ozs7UUFHcEIsT0FBTztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOzs7OztRQUdkLElBQUk7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzs7Ozs7UUFHWCxJQUFJO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Ozs7OztJQUV0QixRQUFRLENBQUMsS0FBYSxLQUFJOzs7O0lBRTFCLGVBQWUsTUFBSzs7OztJQUNwQixlQUFlLE1BQUs7Q0FFdkI7Ozs7Ozs7Ozs7Ozs7OztBQUVELE1BQU0sZUFBZ0IsU0FBUSxRQUFROzs7Ozs7OztJQUNsQyxZQUFZLFFBQXNCLEVBQUUsT0FBc0QsRUFDckYsYUFBNEQsRUFBRSxJQUFXLEVBQUUsVUFBbUI7UUFDL0YsS0FBSyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQzlDO0NBQ0o7QUFFRCxNQUFNLGdCQUFpQixTQUFRLFFBQVE7Ozs7Ozs7O0lBRW5DLFlBQVksUUFBc0IsRUFBRSxPQUFzRCxFQUN0RixhQUE0RCxFQUFFLElBQVcsRUFBRSxVQUFtQjtRQUM5RixLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7S0FDdkI7Ozs7UUFFVSxRQUFRO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Ozs7Ozs7SUFHbkIsUUFBUSxDQUFDLEdBQVcsRUFBRSxJQUFjO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDOztDQUdqQzs7Ozs7QUFFRCxNQUFNLGdCQUFpQixTQUFRLFFBQVE7Ozs7Ozs7OztJQU9uQyxZQUFZLFFBQXNCLEVBQUUsT0FBc0QsRUFDdEYsYUFBNEQsRUFBVSxXQUF5QixFQUMvRixJQUFXLEVBQUUsVUFBbUI7UUFDaEMsS0FBSyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRjJCLGdCQUFXLEdBQVgsV0FBVyxDQUFjO3NDQU4zRCxFQUFFO1FBU3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxFQUFFLENBQUM7S0FDcEM7Ozs7UUFFVSxRQUFRO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Ozs7O0lBR25CLGVBQWU7UUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdkIsdUJBQU0sQ0FBQyxHQUFjLElBQUksQ0FBQyxlQUFlLG1CQUFDLElBQUksQ0FBQyxRQUE2QixHQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDWjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7OztJQUdULFFBQVEsQ0FBQyxLQUFhO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3JDOzs7Ozs7SUFHTCwyQkFBMkIsQ0FBQyxJQUFTO1FBQ2pDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUM7Ozs7O0lBRUQsNEJBQTRCLENBQUMsSUFBZTtRQUN4QyxHQUFHLENBQUMsQ0FBQyxxQkFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFFMUQsdUJBQU0sSUFBSSxHQUFRLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDZDtLQUNKO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEZvcm1GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLmZhY3RvcnknO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XG5cbi8vIGltcG9ydCB7IEFmZUNvbnRyb2xUeXBlLCBBZmVGb3JtQXJyYXksIEFmZUZvcm1Hcm91cCwgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlLCBSZXBlYXRpbmdRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tb2RlbHMnO1xuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wsIEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcbmV4cG9ydCBpbnRlcmZhY2UgQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyIHtcblxuICAgIGFkZENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihmdW5jOiBhbnkpO1xuXG4gICAgZmlyZUNoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihub2RlOiBHcm91cE5vZGUpO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVBcnJheUNoaWxkTm9kZUZ1bmN0aW9uID0gKHF1ZXN0aW9uOiBSZXBlYXRpbmdRdWVzdGlvbiwgbm9kZTogQXJyYXlOb2RlLCBmYWN0b3J5PzogRm9ybUZhY3RvcnkpID0+IEdyb3VwTm9kZTtcblxuZXhwb3J0IGludGVyZmFjZSBSZW1vdmVBcnJheUNoaWxkTm9kZUZ1bmN0aW9uIHtcbiAgICAoaW5kZXg6IG51bWJlciwgbm9kZTogQXJyYXlOb2RlKTtcbn1cblxuZXhwb3J0IGNsYXNzIE5vZGVCYXNlIHtcbiAgICBwdWJsaWMgY2hpbGRyZW4/OiBhbnk7XG4gICAgcHJpdmF0ZSBfY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXA7XG4gICAgcHJpdmF0ZSBfcXVlc3Rpb25Nb2RlbDogUXVlc3Rpb25CYXNlO1xuICAgIHByaXZhdGUgX2Zvcm06IEZvcm07XG4gICAgcHJpdmF0ZSBfcGF0aDogc3RyaW5nO1xuXG4gICAgcHVibGljIGluaXRpYWxWYWx1ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgY29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSwgcGFyZW50UGF0aD86IHN0cmluZykge1xuICAgICAgICB0aGlzLl9jb250cm9sID0gY29udHJvbDtcbiAgICAgICAgdGhpcy5fcXVlc3Rpb25Nb2RlbCA9IHF1ZXN0aW9uO1xuICAgICAgICB0aGlzLl9mb3JtID0gZm9ybTtcbiAgICAgICAgdGhpcy5fcGF0aCA9IHBhcmVudFBhdGggPyBwYXJlbnRQYXRoICsgJy4nICsgcXVlc3Rpb24ua2V5IDogcXVlc3Rpb24ua2V5O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcXVlc3Rpb24oKTogUXVlc3Rpb25CYXNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXN0aW9uTW9kZWw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjb250cm9sKCk6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2w7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBmb3JtKCk6IEZvcm0ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGg7XG4gICAgfVxuICAgIHJlbW92ZUF0KGluZGV4OiBudW1iZXIpIHt9XG5cbiAgICBjcmVhdGVDaGlsZE5vZGUoKSB7fVxuICAgIHJlbW92ZUNoaWxkTm9kZSgpIHt9XG5cbn1cblxuZXhwb3J0IGNsYXNzIExlYWZOb2RlIGV4dGVuZHMgTm9kZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICAgICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0sIHBhcmVudFBhdGg/OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIocXVlc3Rpb24sIGNvbnRyb2wsIGZvcm0sIHBhcmVudFBhdGgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyb3VwTm9kZSBleHRlbmRzIE5vZGVCYXNlIHtcbiAgICBwcml2YXRlIF9jaGlsZHJlbjogYW55O1xuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSwgcGFyZW50UGF0aD86IHN0cmluZykge1xuICAgICAgICBzdXBlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSwgcGFyZW50UGF0aCk7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0ge307XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjaGlsZHJlbigpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gICAgfVxuXG4gICAgcHVibGljIHNldENoaWxkKGtleTogc3RyaW5nLCBub2RlOiBOb2RlQmFzZSkge1xuICAgICAgICB0aGlzLmNoaWxkcmVuW2tleV0gPSBub2RlO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgQXJyYXlOb2RlIGV4dGVuZHMgTm9kZUJhc2UgaW1wbGVtZW50cyBDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIge1xuXG4gICAgcHJpdmF0ZSBjaGlsZE5vZGVDcmVhdGVkRXZlbnRzOiBhbnlbXSA9IFtdO1xuICAgIHByaXZhdGUgX2NoaWxkcmVuOiBHcm91cE5vZGVbXTtcbiAgICBwdWJsaWMgY3JlYXRlQ2hpbGRGdW5jOiBDcmVhdGVBcnJheUNoaWxkTm9kZUZ1bmN0aW9uO1xuICAgIHB1YmxpYyByZW1vdmVDaGlsZEZ1bmM6IFJlbW92ZUFycmF5Q2hpbGROb2RlRnVuY3Rpb247XG5cbiAgICBjb25zdHJ1Y3RvcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCwgcHJpdmF0ZSBmb3JtRmFjdG9yeT86IEZvcm1GYWN0b3J5LFxuICAgICAgICBmb3JtPzogRm9ybSwgcGFyZW50UGF0aD86IHN0cmluZykge1xuICAgICAgICBzdXBlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSwgcGFyZW50UGF0aCk7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XG4gICAgICAgIHRoaXMuY2hpbGROb2RlQ3JlYXRlZEV2ZW50cyA9IFtdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY2hpbGRyZW4oKTogR3JvdXBOb2RlW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZUNoaWxkTm9kZSgpOiBHcm91cE5vZGUge1xuICAgICAgICBpZiAodGhpcy5jcmVhdGVDaGlsZEZ1bmMpIHtcbiAgICAgICAgICAgIGNvbnN0IGc6IEdyb3VwTm9kZSA9IHRoaXMuY3JlYXRlQ2hpbGRGdW5jKHRoaXMucXVlc3Rpb24gYXMgUmVwZWF0aW5nUXVlc3Rpb24sIHRoaXMsIHRoaXMuZm9ybUZhY3RvcnkpO1xuICAgICAgICAgICAgdGhpcy5maXJlQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKGcpO1xuICAgICAgICAgICAgcmV0dXJuIGc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUF0KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3ZlQ2hpbGRGdW5jKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkRnVuYyhpbmRleCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIoZnVuYzogYW55KSB7XG4gICAgICAgIHRoaXMuY2hpbGROb2RlQ3JlYXRlZEV2ZW50cy5wdXNoKGZ1bmMpO1xuICAgIH1cblxuICAgIGZpcmVDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIobm9kZTogR3JvdXBOb2RlKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZE5vZGVDcmVhdGVkRXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGZ1bmM6IGFueSA9IHRoaXMuY2hpbGROb2RlQ3JlYXRlZEV2ZW50c1tpXTtcbiAgICAgICAgICAgIGZ1bmMobm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuIl19