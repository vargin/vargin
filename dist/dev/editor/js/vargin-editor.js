System.register("src/editor/ts/control-components/service/datasource-component", ["angular2/core", "src/core/controls/control", "src/editor/ts/control-components/base-component"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, control_1, base_component_1;
    var DatasourceComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            }],
        execute: function() {
            DatasourceComponent = (function (_super) {
                __extends(DatasourceComponent, _super);
                function DatasourceComponent(renderer, viewContainer, iterableDiffers, changeDetector, loader, control) {
                    _super.call(this, renderer, viewContainer, iterableDiffers, changeDetector, loader, control);
                }
                DatasourceComponent = __decorate([
                    core_1.Component({
                        selector: 'div[vargin-type=datasource]',
                        properties: ['control'],
                        host: {
                            '(click)': 'onClick($event)'
                        }
                    }),
                    core_1.View({
                        template: "<div class=\"vargin-service-component vargin-service-component__datasource\"></div>"
                    }),
                    __param(0, core_1.Inject(core_1.Renderer)),
                    __param(1, core_1.Inject(core_1.ViewContainerRef)),
                    __param(2, core_1.Inject(core_1.IterableDiffers)),
                    __param(3, core_1.Inject(core_1.ChangeDetectorRef)),
                    __param(4, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(5, core_1.Optional()),
                    __param(5, core_1.Inject(control_1.Control))
                ], DatasourceComponent);
                return DatasourceComponent;
            })(base_component_1.BaseComponent);
            exports_1("DatasourceComponent", DatasourceComponent);
        }
    }
});

System.register("src/editor/ts/control-components/visual/button-component", ["angular2/core", "src/core/controls/control", "src/editor/ts/control-components/base-component"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, control_1, base_component_1;
    var ButtonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            }],
        execute: function() {
            ButtonComponent = (function (_super) {
                __extends(ButtonComponent, _super);
                function ButtonComponent(renderer, viewContainer, iterableDiffers, changeDetector, loader, control) {
                    _super.call(this, renderer, viewContainer, iterableDiffers, changeDetector, loader, control);
                }
                ButtonComponent = __decorate([
                    core_1.Component({
                        selector: 'button[vargin-type=button]',
                        properties: ['control'],
                        host: {
                            '(click)': 'onClick($event)',
                            '[title]': 'getPropertyValue("title")',
                            '[type]': 'getPropertyValue("type")',
                            '[style]': 'controlStyle'
                        }
                    }),
                    core_1.View({
                        template: '{{ getPropertyValue("text") }}'
                    }),
                    __param(0, core_1.Inject(core_1.Renderer)),
                    __param(1, core_1.Inject(core_1.ViewContainerRef)),
                    __param(2, core_1.Inject(core_1.IterableDiffers)),
                    __param(3, core_1.Inject(core_1.ChangeDetectorRef)),
                    __param(4, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(5, core_1.Optional()),
                    __param(5, core_1.Inject(control_1.Control))
                ], ButtonComponent);
                return ButtonComponent;
            })(base_component_1.BaseComponent);
            exports_1("ButtonComponent", ButtonComponent);
        }
    }
});

System.register("src/editor/ts/control-components/visual/label-component", ["angular2/core", "angular2/common", "src/core/controls/control", "src/core/tools/string-formatter", "src/editor/ts/control-components/base-component"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, control_1, string_formatter_1, base_component_1;
    var LabelComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (string_formatter_1_1) {
                string_formatter_1 = string_formatter_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            }],
        execute: function() {
            LabelComponent = (function (_super) {
                __extends(LabelComponent, _super);
                function LabelComponent(renderer, viewContainer, iterableDiffers, changeDetector, loader, control) {
                    _super.call(this, renderer, viewContainer, iterableDiffers, changeDetector, loader, control);
                }
                LabelComponent.prototype.getFormattedValue = function () {
                    var value = this.control.getProperty('text').getValue();
                    if (value.startsWith('bind:')) {
                        return value;
                    }
                    try {
                        return string_formatter_1.StringFormatter.format(value, +this.control.getProperty('format').getValue());
                    }
                    catch (e) {
                        return '[Format Error]';
                    }
                };
                LabelComponent = __decorate([
                    core_1.Component({
                        selector: 'span[vargin-type=label]',
                        properties: ['control'],
                        host: {
                            '(click)': 'onClick($event)',
                            '[style]': 'controlStyle'
                        }
                    }),
                    core_1.View({
                        template: '{{ getFormattedValue() }}',
                        directives: [common_1.NgStyle]
                    }),
                    __param(0, core_1.Inject(core_1.Renderer)),
                    __param(1, core_1.Inject(core_1.ViewContainerRef)),
                    __param(2, core_1.Inject(core_1.IterableDiffers)),
                    __param(3, core_1.Inject(core_1.ChangeDetectorRef)),
                    __param(4, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(5, core_1.Optional()),
                    __param(5, core_1.Inject(control_1.Control))
                ], LabelComponent);
                return LabelComponent;
            })(base_component_1.BaseComponent);
            exports_1("LabelComponent", LabelComponent);
        }
    }
});

System.register("src/editor/ts/control-components/visual/link-component", ["angular2/core", "src/core/controls/control", "src/editor/ts/control-components/base-component"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, control_1, base_component_1;
    var LinkComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            }],
        execute: function() {
            LinkComponent = (function (_super) {
                __extends(LinkComponent, _super);
                function LinkComponent(renderer, viewContainer, iterableDiffers, changeDetector, loader, control) {
                    _super.call(this, renderer, viewContainer, iterableDiffers, changeDetector, loader, control);
                }
                LinkComponent = __decorate([
                    core_1.Component({
                        selector: 'a[vargin-type=link]',
                        properties: ['control'],
                        host: {
                            '(click)': 'onClick($event)',
                            '[title]': 'getPropertyValue("title")',
                            '[target]': 'getPropertyValue("target")',
                            'href': 'javascript:void(0)',
                            '[style]': 'controlStyle'
                        }
                    }),
                    core_1.View({
                        template: '{{ getPropertyValue("text") }}'
                    }),
                    __param(0, core_1.Inject(core_1.Renderer)),
                    __param(1, core_1.Inject(core_1.ViewContainerRef)),
                    __param(2, core_1.Inject(core_1.IterableDiffers)),
                    __param(3, core_1.Inject(core_1.ChangeDetectorRef)),
                    __param(4, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(5, core_1.Optional()),
                    __param(5, core_1.Inject(control_1.Control))
                ], LinkComponent);
                return LinkComponent;
            })(base_component_1.BaseComponent);
            exports_1("LinkComponent", LinkComponent);
        }
    }
});

System.register("src/editor/ts/control-components/visual/list-component", ["angular2/core", "src/core/controls/control", "src/editor/ts/control-components/base-component"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, control_1, base_component_1;
    var ListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            }],
        execute: function() {
            ListComponent = (function (_super) {
                __extends(ListComponent, _super);
                function ListComponent(renderer, viewContainer, iterableDiffers, changeDetector, loader, control) {
                    _super.call(this, renderer, viewContainer, iterableDiffers, changeDetector, loader, control);
                    var template = this.control.getTemplate();
                    this.templates = [template, template, template];
                }
                ListComponent.prototype.getChildren = function () {
                    return this.templates;
                };
                ListComponent = __decorate([
                    core_1.Component({
                        selector: 'div[vargin-type=list]',
                        properties: ['control'],
                        host: {
                            '(click)': 'onClick($event)',
                            '[style]': 'controlStyle'
                        }
                    }),
                    core_1.View({
                        template: '<div class="vargin-dynamic-anchor" #container hidden></div>'
                    }),
                    __param(0, core_1.Inject(core_1.Renderer)),
                    __param(1, core_1.Inject(core_1.ViewContainerRef)),
                    __param(2, core_1.Inject(core_1.IterableDiffers)),
                    __param(3, core_1.Inject(core_1.ChangeDetectorRef)),
                    __param(4, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(5, core_1.Optional()),
                    __param(5, core_1.Inject(control_1.Control))
                ], ListComponent);
                return ListComponent;
            })(base_component_1.BaseComponent);
            exports_1("ListComponent", ListComponent);
        }
    }
});

System.register("src/editor/ts/control-components/visual/range-component", ["angular2/core", "src/core/controls/control", "src/editor/ts/control-components/base-component"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, control_1, base_component_1;
    var RangeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            }],
        execute: function() {
            RangeComponent = (function (_super) {
                __extends(RangeComponent, _super);
                function RangeComponent(renderer, viewContainer, iterableDiffers, changeDetector, loader, control) {
                    _super.call(this, renderer, viewContainer, iterableDiffers, changeDetector, loader, control);
                }
                RangeComponent = __decorate([
                    core_1.Component({
                        selector: 'vargin-input[vargin-type=range]',
                        properties: ['control'],
                        host: {
                            '(click)': 'onClick($event)',
                            '[style]': 'controlStyle'
                        }
                    }),
                    core_1.View({
                        template: "\n    <input\n      type=\"range\"\n      [min]=\"getPropertyValue('min')\"\n      [max]=\"getPropertyValue('max')\"\n      [step]=\"getPropertyValue('step')\"\n      [value]=\"getPropertyValue('value')\"\n    />\n  "
                    }),
                    __param(0, core_1.Inject(core_1.Renderer)),
                    __param(1, core_1.Inject(core_1.ViewContainerRef)),
                    __param(2, core_1.Inject(core_1.IterableDiffers)),
                    __param(3, core_1.Inject(core_1.ChangeDetectorRef)),
                    __param(4, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(5, core_1.Optional()),
                    __param(5, core_1.Inject(control_1.Control))
                ], RangeComponent);
                return RangeComponent;
            })(base_component_1.BaseComponent);
            exports_1("RangeComponent", RangeComponent);
        }
    }
});

System.register("src/editor/ts/control-components/visual/text-input-component", ["angular2/core", "src/core/controls/control", "src/editor/ts/control-components/base-component"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, control_1, base_component_1;
    var TextInputComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            }],
        execute: function() {
            TextInputComponent = (function (_super) {
                __extends(TextInputComponent, _super);
                function TextInputComponent(renderer, viewContainer, iterableDiffers, changeDetector, loader, control) {
                    _super.call(this, renderer, viewContainer, iterableDiffers, changeDetector, loader, control);
                }
                TextInputComponent = __decorate([
                    core_1.Component({
                        selector: 'vargin-input[vargin-type=text-input]',
                        properties: ['control'],
                        host: {
                            '(click)': 'onClick($event)',
                            '[style]': 'controlStyle'
                        }
                    }),
                    core_1.View({
                        template: "\n    <input\n      type=\"text\"\n      [placeholder]=\"getPropertyValue('placeholder')\"\n      [value]=\"getPropertyValue('value')\"\n    />\n  "
                    }),
                    __param(0, core_1.Inject(core_1.Renderer)),
                    __param(1, core_1.Inject(core_1.ViewContainerRef)),
                    __param(2, core_1.Inject(core_1.IterableDiffers)),
                    __param(3, core_1.Inject(core_1.ChangeDetectorRef)),
                    __param(4, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(5, core_1.Optional()),
                    __param(5, core_1.Inject(control_1.Control))
                ], TextInputComponent);
                return TextInputComponent;
            })(base_component_1.BaseComponent);
            exports_1("TextInputComponent", TextInputComponent);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/color-property-editor", ["angular2/core", "src/core/property"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, property_1;
    var PropertyEditor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            }],
        execute: function() {
            PropertyEditor = (function () {
                function PropertyEditor(property) {
                    this.property = property || new property_1.Property('[Color]', '');
                }
                PropertyEditor.prototype.onChange = function (value) {
                    this.property.setValue(value);
                };
                PropertyEditor = __decorate([
                    core_1.Component({
                        selector: 'color-property-editor',
                        properties: ['property']
                    }),
                    core_1.View({
                        template: "\n    <label class=\"vargin-property-editor\">\n      <span class=\"vargin-property-editor__label\">{{property.getName()}}</span>\n      <input class=\"vargin-property-editor__input\" type=\"color\"\n             [value]=\"property.getValue()\"\n             (change)=\"onChange($event.target.value)\"/>\n    </label>"
                    }),
                    __param(0, core_1.Optional()),
                    __param(0, core_1.Inject(property_1.Property))
                ], PropertyEditor);
                return PropertyEditor;
            })();
            exports_1("PropertyEditor", PropertyEditor);
        }
    }
});

System.register("src/editor/ts/shared-components/editable-label", ["angular2/core", "angular2/common"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1;
    var EditableLabel;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            EditableLabel = (function () {
                function EditableLabel(editors) {
                    this.allowEditing = false;
                    this.valueChange = new core_1.EventEmitter();
                    this.writeMode = false;
                    this.editors = editors;
                }
                EditableLabel.prototype.onDoubleClick = function (e) {
                    var _this = this;
                    e.stopPropagation();
                    if (!this.allowEditing || this.writeMode) {
                        return;
                    }
                    this.writeMode = true;
                    this.subscription = this.editors.changes.subscribe(function () {
                        if (_this.editors.length) {
                            _this.editors.first.nativeElement.focus();
                        }
                    });
                };
                EditableLabel.prototype.onInputChange = function (inputValue) {
                    if (inputValue === this.value) {
                        return;
                    }
                    this.value = inputValue;
                    this.valueChange.next(this.value);
                };
                EditableLabel.prototype.onInputBlur = function (inputValue) {
                    this.writeMode = false;
                    this.subscription.unsubscribe();
                    this.subscription = null;
                    this.onInputChange(inputValue);
                };
                __decorate([
                    core_1.Input()
                ], EditableLabel.prototype, "value", void 0);
                __decorate([
                    core_1.Input()
                ], EditableLabel.prototype, "allowEditing", void 0);
                __decorate([
                    core_1.Output()
                ], EditableLabel.prototype, "valueChange", void 0);
                EditableLabel = __decorate([
                    core_1.Component({
                        selector: 'vargin-editable-label'
                    }),
                    core_1.View({
                        template: "<div class=\"vargin-editable-label\"\n                  [class.vargin-editable-label--write-mode]=\"writeMode\">\n               <span *ngIf=\"!writeMode\"\n                     class=\"vargin-editable-label__label\"\n                     (dblclick)=\"onDoubleClick($event, editor)\">{{ value }}</span>\n               <input #editor *ngIf=\"writeMode\"\n                      class=\"vargin-editable-label__editor\"\n                      (change)=\"onInputChange(editor.value)\"\n                      (blur)=\"onInputBlur(editor.value)\"\n                      [value]=\"value\"\n                      type=\"text\" />\n             </div>",
                        directives: [common_1.NgClass, common_1.NgIf]
                    }),
                    __param(0, core_1.Inject(core_1.QueryList)),
                    __param(0, core_1.ViewQuery('editor'))
                ], EditableLabel);
                return EditableLabel;
            })();
            exports_1("EditableLabel", EditableLabel);
        }
    }
});

System.register("src/editor/ts/shared-components/tree-view", ["angular2/core", "src/editor/ts/shared-components/editable-label"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, editable_label_1;
    var TreeView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (editable_label_1_1) {
                editable_label_1 = editable_label_1_1;
            }],
        execute: function() {
            TreeView = (function () {
                function TreeView(children) {
                    var _this = this;
                    this.editable = false;
                    this.itemSelected = new core_1.EventEmitter();
                    this.itemNameChanged = new core_1.EventEmitter();
                    children.changes.subscribe(function () {
                        children.toArray().forEach(function (child) { return child.parent = _this; });
                    });
                }
                TreeView.prototype.onItemClicked = function (e, item) {
                    e.stopPropagation();
                    if (item.selected) {
                        return;
                    }
                    this.selectItem(this.getRoot().items, item);
                    this.propagateItemSelected(item);
                };
                TreeView.prototype.onItemNameChange = function (item, newName) {
                    item.name = newName;
                    this.propagateItemNameChanged(item);
                };
                TreeView.prototype.propagateItemSelected = function (item) {
                    this.itemSelected.next(item);
                };
                TreeView.prototype.propagateItemNameChanged = function (item) {
                    this.itemNameChanged.next(item);
                };
                TreeView.prototype.getRoot = function () {
                    var root = this;
                    while (root.parent) {
                        root = root.parent;
                    }
                    return root;
                };
                TreeView.prototype.selectItem = function (items, itemToSelect) {
                    var _this = this;
                    items.forEach(function (item) {
                        item.selected = item === itemToSelect;
                        if (item.children.length) {
                            _this.selectItem(item.children, itemToSelect);
                        }
                    });
                };
                __decorate([
                    core_1.Input()
                ], TreeView.prototype, "items", void 0);
                __decorate([
                    core_1.Input()
                ], TreeView.prototype, "editable", void 0);
                __decorate([
                    core_1.Output()
                ], TreeView.prototype, "itemSelected", void 0);
                __decorate([
                    core_1.Output()
                ], TreeView.prototype, "itemNameChanged", void 0);
                TreeView = __decorate([
                    core_1.Component({
                        selector: 'tree-view'
                    }),
                    core_1.View({
                        template: "\n    <ul class=\"tree-view-list\">\n        <li class=\"tree-view-list__item\"\n            [class.tree-view-list__item--selected]=\"item.selected\"\n          *ngFor=\"#item of items\"\n          (click)=\"onItemClicked($event, item)\">\n        <vargin-editable-label class=\"tree-view-list__item-label\"\n          [value]=\"item.name\"\n          [allowEditing]=\"editable\"\n          (valueChange)=\"onItemNameChange(item, $event)\">\n        </vargin-editable-label>\n        <tree-view [items]=\"item.children\" [editable]=\"editable\"\n                   (itemNameChanged)=\"propagateItemNameChanged($event)\"\n                   (itemSelected)=\"propagateItemSelected($event)\">\n        </tree-view>\n      </li>\n    </ul>\n  ",
                        directives: [editable_label_1.EditableLabel, TreeView]
                    }),
                    __param(0, core_1.Inject(core_1.QueryList)),
                    __param(0, core_1.ViewQuery(TreeView))
                ], TreeView);
                return TreeView;
            })();
            exports_1("TreeView", TreeView);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/control-overrides/tree-dialog", ["angular2/core", "src/core/controls/control", "src/core/overrides/overrides", "src/editor/ts/shared-components/tree-view"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, control_1, overrides_1, tree_view_1;
    var PropertyTreeDialog;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (overrides_1_1) {
                overrides_1 = overrides_1_1;
            },
            function (tree_view_1_1) {
                tree_view_1 = tree_view_1_1;
            }],
        execute: function() {
            PropertyTreeDialog = (function () {
                function PropertyTreeDialog(control) {
                    this.control = control;
                    this.tree = [
                        this.overridesToTreeViewItem(this.control.overrides.getRoot())
                    ];
                }
                PropertyTreeDialog.prototype.add = function () {
                    this.control.overrides.add(new overrides_1.Overrides(this.control.overrides.name + "-child"));
                    this.tree = [
                        this.overridesToTreeViewItem(this.control.overrides.getRoot())
                    ];
                };
                PropertyTreeDialog.prototype.remove = function () {
                    if (!this.control.overrides.parent) {
                        return;
                    }
                    var overridesToRemove = this.control.overrides;
                    this.control.overrides = overridesToRemove.parent;
                    this.control.overrides.remove(overridesToRemove);
                    this.tree = [
                        this.overridesToTreeViewItem(this.control.overrides.getRoot())
                    ];
                };
                PropertyTreeDialog.prototype.onItemSelected = function (item) {
                    this.control.overrides = item.data;
                };
                PropertyTreeDialog.prototype.onItemNameChanged = function (item) {
                    item.data.name = item.name;
                };
                PropertyTreeDialog.prototype.overridesToTreeViewItem = function (overrides, parent) {
                    var _this = this;
                    var treeViewItem = {
                        name: overrides.name,
                        selected: overrides === this.control.overrides,
                        parent: parent,
                        children: [],
                        data: overrides
                    };
                    overrides.children.forEach(function (child) {
                        treeViewItem.children.push(_this.overridesToTreeViewItem(child, treeViewItem));
                    });
                    return treeViewItem;
                };
                PropertyTreeDialog = __decorate([
                    core_1.Component({
                        selector: 'control-overrides-tree-dialog'
                    }),
                    core_1.View({
                        template: "\n    <header class=\"property-list-dialog__header\">Control states</header>\n    <tree-view [items]=\"tree\"\n               [editable]=\"true\"\n               (itemSelected)=\"onItemSelected($event)\"\n               (itemNameChanged)=\"onItemNameChanged($event)\" >\n    </tree-view>\n    <section class=\"control-overrides-manage-buttons\">\n      <button (click)=\"add()\">Add child state</button>\n      <button (click)=\"remove()\">Remove state</button>\n    </section>\n  ",
                        directives: [tree_view_1.TreeView]
                    }),
                    __param(0, core_1.Inject(control_1.Control))
                ], PropertyTreeDialog);
                return PropertyTreeDialog;
            })();
            exports_1("PropertyTreeDialog", PropertyTreeDialog);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/control-overrides/editor", ["angular2/core", "src/core/property", "src/core/controls/control", "src/editor/ts/services/dialog-service", "src/editor/ts/properties/property-editors/control-overrides/tree-dialog"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, property_1, control_1, dialog_service_1, tree_dialog_1;
    var PropertyEditor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (dialog_service_1_1) {
                dialog_service_1 = dialog_service_1_1;
            },
            function (tree_dialog_1_1) {
                tree_dialog_1 = tree_dialog_1_1;
            }],
        execute: function() {
            PropertyEditor = (function () {
                function PropertyEditor(property) {
                    this.property = property;
                }
                PropertyEditor.prototype.getValue = function () {
                    return this.property.getValue().overrides.name;
                };
                PropertyEditor.prototype.change = function () {
                    dialog_service_1.DialogService.show(tree_dialog_1.PropertyTreeDialog, [core_1.provide(control_1.Control, { useValue: this.property.getValue() })]);
                };
                PropertyEditor = __decorate([
                    core_1.Component({
                        selector: 'control-overrides-property-editor',
                        properties: ['property']
                    }),
                    core_1.View({
                        template: "\n    <label class=\"vargin-property-editor\">\n      <span class=\"vargin-property-editor__label\">{{property.getName()}}</span>\n      <div class=\"vargin-property-editor__input flex-editor__input\">\n        <span class=\"flex-editor__input-value\">{{getValue()}}</span>\n        <button type=\"button\" (click)=\"change()\">...</button>\n      </div>\n    </label>"
                    }),
                    __param(0, core_1.Inject(property_1.Property))
                ], PropertyEditor);
                return PropertyEditor;
            })();
            exports_1("PropertyEditor", PropertyEditor);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/datasource-property-editor", ["angular2/core", "angular2/common", "src/core/application", "src/core/property"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, application_1, property_1;
    var PropertyEditor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (application_1_1) {
                application_1 = application_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            }],
        execute: function() {
            PropertyEditor = (function () {
                function PropertyEditor(application, property) {
                    this.application = application;
                    this.property = property;
                    this.datasources = this.application.serviceRoot.getChildren().reduce(function (datasources, control) {
                        if (control.meta.type === 'datasource') {
                            datasources.push(control);
                        }
                        return datasources;
                    }, []);
                }
                PropertyEditor.prototype.onChange = function (value) {
                    this.property.setValue(value);
                };
                PropertyEditor = __decorate([
                    core_1.Component({
                        selector: 'datasource-property-editor',
                        properties: ['property']
                    }),
                    core_1.View({
                        template: "\n    <label class=\"vargin-property-editor\">\n      <span class=\"vargin-property-editor__label\">{{property.getName()}}</span>\n      <select class=\"vargin-property-editor__input\"\n              (change)=\"onChange($event.target.value)\">\n        <option>[Not Defined]</option>\n        <option\n          *ngFor=\"#datasource of datasources\"\n          [value]=\"datasource.id\"\n          [selected]=\"property.getValue() === datasource.id\">\n          {{ datasource.getProperty('name').getValue() }}\n          </option>\n      </select>\n    </label>\n  ",
                        directives: [common_1.NgFor]
                    }),
                    __param(0, core_1.Inject(application_1.Application)),
                    __param(1, core_1.Inject(property_1.Property))
                ], PropertyEditor);
                return PropertyEditor;
            })();
            exports_1("PropertyEditor", PropertyEditor);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/event/list-dialog", ["angular2/core", "angular2/common", "src/editor/ts/services/dialog-service", "src/core/actions/action", "src/editor/ts/properties/property-editors/event/editor-dialog"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, dialog_service_1, action_1, editor_dialog_1;
    var PropertyListDialog;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (dialog_service_1_1) {
                dialog_service_1 = dialog_service_1_1;
            },
            function (action_1_1) {
                action_1 = action_1_1;
            },
            function (editor_dialog_1_1) {
                editor_dialog_1 = editor_dialog_1_1;
            }],
        execute: function() {
            PropertyListDialog = (function () {
                function PropertyListDialog(actions) {
                    this.actions = actions;
                }
                PropertyListDialog.prototype.add = function () {
                    var _this = this;
                    dialog_service_1.DialogService.show(editor_dialog_1.PropertyEditorDialog).then(function (action) {
                        if (action) {
                            _this.actions.push(action);
                        }
                    });
                };
                PropertyListDialog.prototype.edit = function (action) {
                    dialog_service_1.DialogService.show(editor_dialog_1.PropertyEditorDialog, [core_1.provide(action_1.Action, { useValue: action })]);
                };
                PropertyListDialog.prototype.remove = function (index) {
                    this.actions.splice(index, 1);
                };
                PropertyListDialog = __decorate([
                    core_1.Component({
                        selector: 'event-property-list-dialog'
                    }),
                    core_1.View({
                        template: "\n    <header class=\"property-list-dialog__header\">Edit Actions</header>\n    <table class=\"vargin-table\">\n      <tfoot>\n        <tr class=\"vargin-table__footer-row\">\n          <td><button (click)=\"add()\">+ Add action</button></td>\n        </tr>\n      </tfoot>\n      <tbody>\n        <tr class=\"vargin-table__data-row\" *ngFor=\"#action of actions; #i = index\">\n          <td class=\"vargin-table__data-cell\" (click)=\"edit(action)\">\n            {{ action.meta.name }}\n          </td>\n          <td class=\"vargin-table__data-cell\">\n            <button class=\"vargin-list__remove-item\" (click)=\"remove(i)\">\n              &#x274c;\n            </button>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  ",
                        directives: [common_1.NgFor]
                    }),
                    __param(0, core_1.Inject(Array))
                ], PropertyListDialog);
                return PropertyListDialog;
            })();
            exports_1("PropertyListDialog", PropertyListDialog);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/event/editor", ["angular2/core", "src/core/property", "src/compilers/json/json-action-compiler", "src/editor/ts/services/dialog-service", "src/editor/ts/properties/property-editors/event/list-dialog"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, property_1, JSONAction, dialog_service_1, list_dialog_1;
    var PropertyEditor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (JSONAction_1) {
                JSONAction = JSONAction_1;
            },
            function (dialog_service_1_1) {
                dialog_service_1 = dialog_service_1_1;
            },
            function (list_dialog_1_1) {
                list_dialog_1 = list_dialog_1_1;
            }],
        execute: function() {
            PropertyEditor = (function () {
                function PropertyEditor(property) {
                    this.actionCompiler = new JSONAction.JSONActionCompiler();
                    this.property = property;
                }
                PropertyEditor.prototype.getValue = function () {
                    return this.property.getValue() ? '[Handled]' : '[Not handled]';
                };
                PropertyEditor.prototype.change = function () {
                    var _this = this;
                    this.deserialize().then(function (actions) {
                        return dialog_service_1.DialogService.show(list_dialog_1.PropertyListDialog, [core_1.provide(Array, { useValue: actions })]).then(function () {
                            if (actions.length) {
                                Promise.all(actions.map(function (action) { return _this.actionCompiler.compile(action); })).then(function (actions) {
                                    _this.property.setValue(JSON.stringify(actions));
                                });
                            }
                            else {
                                _this.property.setValue('');
                            }
                        });
                    });
                };
                PropertyEditor.prototype.deserialize = function () {
                    var _this = this;
                    var propertyValue = this.property.getValue();
                    if (propertyValue) {
                        return Promise.all(JSON.parse(propertyValue).map(function (action) {
                            return _this.actionCompiler.decompile(action);
                        }));
                    }
                    return Promise.resolve([]);
                };
                PropertyEditor = __decorate([
                    core_1.Component({
                        selector: 'event-property-editor',
                        properties: ['property']
                    }),
                    core_1.View({
                        template: "\n    <label class=\"vargin-property-editor\">\n      <span class=\"vargin-property-editor__label\">{{property.getName()}}</span>\n      <div class=\"vargin-property-editor__input flex-editor__input\">\n        <span class=\"flex-editor__input-value\">{{getValue()}}</span>\n        <button type=\"button\" (click)=\"change()\">...</button>\n      </div>\n    </label>"
                    }),
                    __param(0, core_1.Inject(property_1.Property))
                ], PropertyEditor);
                return PropertyEditor;
            })();
            exports_1("PropertyEditor", PropertyEditor);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/image-property-editor", ["angular2/core", "src/core/property"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, property_1;
    var PropertyEditor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            }],
        execute: function() {
            PropertyEditor = (function () {
                function PropertyEditor(property) {
                    this.property = property;
                }
                PropertyEditor.prototype.onChange = function (value) {
                    var _this = this;
                    var reader = new FileReader();
                    reader.onloadend = function () { return _this.property.setValue("url(" + reader.result + ")"); };
                    reader.readAsDataURL(value);
                };
                PropertyEditor = __decorate([
                    core_1.Component({
                        selector: 'image-property-editor',
                        properties: ['property']
                    }),
                    core_1.View({
                        template: "\n    <label class=\"vargin-property-editor\">\n      <span class=\"vargin-property-editor__label\">{{property.getName()}}</span>\n      <input #picker type=\"file\" accept=\"image/*\"\n             (change)=\"onChange($event.target.files[0])\"/>\n      <button class=\"vargin-property-editor__input\"\n              (click)=\"picker.click()\">\n        Browse...\n      </button>\n    </label>"
                    }),
                    __param(0, core_1.Inject(property_1.Property))
                ], PropertyEditor);
                return PropertyEditor;
            })();
            exports_1("PropertyEditor", PropertyEditor);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/items/editor-dialog", ["angular2/core", "angular2/common", "src/core/data/schema"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, schema_1;
    var PropertyEditorDialog;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (schema_1_1) {
                schema_1 = schema_1_1;
            }],
        execute: function() {
            PropertyEditorDialog = (function () {
                function PropertyEditorDialog(schema, properties, dispose) {
                    this.schema = schema;
                    this.properties = properties;
                    this.dispose = dispose;
                }
                PropertyEditorDialog.prototype.onChange = function (index, value) {
                    var field = this.schema.fields[index];
                    var typedValue;
                    switch (field.type) {
                        case schema_1.SchemaFieldType.NUMBER:
                            typedValue = +value;
                            break;
                        case schema_1.SchemaFieldType.BOOLEAN:
                            typedValue = value.toLowerCase() === 'true';
                            break;
                        default:
                            typedValue = value;
                    }
                    this.properties[index][1] = typedValue;
                };
                PropertyEditorDialog = __decorate([
                    core_1.Component({
                        selector: 'items-property-editor-dialog'
                    }),
                    core_1.View({
                        template: "\n    <header class=\"property-editor-dialog__header\">Add Item</header>\n    <ul class=\"vargin-list\">\n      <li class=\"vargin-list__item\" *ngFor=\"#property of properties; #i = index\">\n        <label class=\"vargin-property-editor\">\n          <span class=\"vargin-property-editor__label\">{{property[0]}}</span>\n          <input class=\"vargin-property-editor__input\" type=\"text\"\n                 [value]=\"property[1]\"\n                 (change)=\"onChange(i, $event.target.value)\" />\n        </label>\n      </li>\n    </ul>\n    <button class=\"property-editor-dialog__save-button\" (click)=\"dispose()\">Save</button>\n  ",
                        directives: [common_1.NgFor]
                    }),
                    __param(0, core_1.Inject(schema_1.Schema)),
                    __param(1, core_1.Inject(Array)),
                    __param(2, core_1.Inject('dispose'))
                ], PropertyEditorDialog);
                return PropertyEditorDialog;
            })();
            exports_1("PropertyEditorDialog", PropertyEditorDialog);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/items/list-dialog", ["angular2/core", "angular2/common", "src/editor/ts/services/dialog-service", "src/editor/ts/properties/property-editors/items/editor-dialog", "src/core/data/schema"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, dialog_service_1, editor_dialog_1, schema_1;
    var PropertyListDialog;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (dialog_service_1_1) {
                dialog_service_1 = dialog_service_1_1;
            },
            function (editor_dialog_1_1) {
                editor_dialog_1 = editor_dialog_1_1;
            },
            function (schema_1_1) {
                schema_1 = schema_1_1;
            }],
        execute: function() {
            PropertyListDialog = (function () {
                function PropertyListDialog(schema, items) {
                    this.schema = schema;
                    this.items = items;
                }
                PropertyListDialog.prototype.add = function () {
                    var _this = this;
                    var properties = this.schema.fields.map(function (field) { return [field.name, '']; });
                    dialog_service_1.DialogService.show(editor_dialog_1.PropertyEditorDialog, [
                        core_1.provide(schema_1.Schema, { useValue: this.schema }),
                        core_1.provide(Array, { useValue: properties })
                    ]).then(function () {
                        if (properties.some(function (_a) {
                            var key = _a[0], value = _a[1];
                            return !!value;
                        })) {
                            _this.items.push(new Map(properties));
                        }
                    });
                };
                PropertyListDialog.prototype.change = function (index, item) {
                    var _this = this;
                    var properties = [];
                    item.forEach(function (value, key) {
                        properties.push([key, value]);
                    });
                    dialog_service_1.DialogService.show(editor_dialog_1.PropertyEditorDialog, [
                        core_1.provide(schema_1.Schema, { useValue: this.schema }),
                        core_1.provide(Array, { useValue: properties })
                    ]).then(function () {
                        if (properties.some(function (_a) {
                            var key = _a[0], value = _a[1];
                            return !!value;
                        })) {
                            properties.forEach(function (_a) {
                                var key = _a[0], value = _a[1];
                                item.set(key, value);
                            });
                        }
                        else {
                            _this.items.splice(index, 1);
                        }
                    });
                };
                PropertyListDialog.prototype.remove = function (index) {
                    this.items.splice(index, 1);
                };
                PropertyListDialog = __decorate([
                    core_1.Component({
                        selector: 'items-property-list-dialog'
                    }),
                    core_1.View({
                        template: "\n    <header class=\"property-list-dialog__header\">Edit Items</header>\n    <table class=\"vargin-table\">\n      <thead>\n        <tr class=\"vargin-table__header-row\">\n          <th class=\"vargin-table__header-cell\" *ngFor=\"#field of schema.fields\">\n            {{field.name}}\n          </th>\n          <th></th>\n        </tr>\n      </thead>\n      <tfoot>\n        <tr class=\"vargin-table__footer-row\">\n          <td><button (click)=\"add()\">+ Add item</button></td>\n        </tr>\n      </tfoot>\n      <tbody>\n        <tr class=\"vargin-table__data-row\" *ngFor=\"#item of items; #i = index\">\n          <td class=\"vargin-table__data-cell\" *ngFor=\"#field of schema.fields;\" (click)=\"change(i, item)\">\n            {{item.get(field.name)}}\n          </td>\n          <td class=\"vargin-table__data-cell\">\n            <button class=\"vargin-list__remove-item\" (click)=\"remove(i)\">\n              &#x274c;\n            </button>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  ",
                        directives: [common_1.NgFor]
                    }),
                    __param(0, core_1.Inject(schema_1.Schema)),
                    __param(1, core_1.Inject(Array))
                ], PropertyListDialog);
                return PropertyListDialog;
            })();
            exports_1("PropertyListDialog", PropertyListDialog);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/items/editor", ["angular2/core", "src/core/property", "src/editor/ts/services/dialog-service", "src/editor/ts/properties/property-editors/items/list-dialog", "src/core/data/schema"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, property_1, dialog_service_1, list_dialog_1, schema_1;
    var PropertyEditor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (dialog_service_1_1) {
                dialog_service_1 = dialog_service_1_1;
            },
            function (list_dialog_1_1) {
                list_dialog_1 = list_dialog_1_1;
            },
            function (schema_1_1) {
                schema_1 = schema_1_1;
            }],
        execute: function() {
            PropertyEditor = (function () {
                function PropertyEditor(property) {
                    this.property = property;
                }
                PropertyEditor.prototype.getValue = function () {
                    if (!this.getSchema()) {
                        return '[No schema]';
                    }
                    return this.property.getValue() ? '[Defined]' : '[Not Defined]';
                };
                PropertyEditor.prototype.change = function () {
                    var _this = this;
                    var serializedSchema = this.getSchema();
                    if (!serializedSchema) {
                        return;
                    }
                    var itemsJSON = this.property.getValue();
                    var items = itemsJSON ? JSON.parse(itemsJSON).map(function (propertyMap) { return new Map(propertyMap); }) : [];
                    dialog_service_1.DialogService.show(list_dialog_1.PropertyListDialog, [
                        core_1.provide(schema_1.Schema, { useValue: schema_1.Schema.deserialize(serializedSchema) }),
                        core_1.provide(Array, { useValue: items })
                    ]).then(function () {
                        if (items.length) {
                            _this.property.setValue(JSON.stringify(items.map(function (map) {
                                var itemProperties = [];
                                map.forEach(function (value, key) { return itemProperties.push([key, value]); });
                                return itemProperties;
                            })));
                        }
                        else {
                            _this.property.setValue('');
                        }
                    });
                };
                PropertyEditor.prototype.getSchema = function () {
                    return this.property.owner.getProperty('schema').getValue();
                };
                PropertyEditor = __decorate([
                    core_1.Component({
                        selector: 'items-property-editor',
                        properties: ['property']
                    }),
                    core_1.View({
                        template: "\n    <label class=\"vargin-property-editor\">\n      <span class=\"vargin-property-editor__label\">{{property.getName()}}</span>\n      <div class=\"vargin-property-editor__input flex-editor__input\">\n        <span class=\"flex-editor__input-value\">{{getValue()}}</span>\n        <button type=\"button\" (click)=\"change()\">...</button>\n      </div>\n    </label>"
                    }),
                    __param(0, core_1.Inject(property_1.Property))
                ], PropertyEditor);
                return PropertyEditor;
            })();
            exports_1("PropertyEditor", PropertyEditor);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/number-property-editor", ["angular2/core", "src/core/property"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, property_1;
    var PropertyEditor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            }],
        execute: function() {
            PropertyEditor = (function () {
                function PropertyEditor(property) {
                    this.property = property || new property_1.Property('[Number]', 0);
                }
                PropertyEditor.prototype.onChange = function (value) {
                    this.property.setValue(+value);
                };
                PropertyEditor = __decorate([
                    core_1.Component({
                        selector: 'number-property-editor',
                        properties: ['property']
                    }),
                    core_1.View({
                        template: "\n    <label class=\"vargin-property-editor\">\n      <span class=\"vargin-property-editor__label\">{{property.getName()}}</span>\n      <input class=\"vargin-property-editor__input\"\n             type=\"number\"\n             [value]=\"property.getValue()\"\n             (change)=\"onChange($event.target.value)\" />\n    </label>"
                    }),
                    __param(0, core_1.Optional()),
                    __param(0, core_1.Inject(property_1.Property))
                ], PropertyEditor);
                return PropertyEditor;
            })();
            exports_1("PropertyEditor", PropertyEditor);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/property-with-options-editor", ["angular2/core", "angular2/common", "src/core/property"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, property_1;
    var PropertyEditor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            }],
        execute: function() {
            PropertyEditor = (function () {
                function PropertyEditor(property) {
                    this.property = property || new property_1.PropertyWithOptions('[Name]', []);
                }
                PropertyEditor.prototype.onChange = function (value) {
                    this.property.setValue(value);
                };
                PropertyEditor = __decorate([
                    core_1.Component({
                        selector: 'property-with-options-editor',
                        properties: ['property']
                    }),
                    core_1.View({
                        template: "\n    <label class=\"vargin-property-editor\">\n      <span class=\"vargin-property-editor__label\">{{property.getName()}}</span>\n      <select class=\"vargin-property-editor__input\"\n              (change)=\"onChange($event.target.value)\">\n        <option\n          *ngFor=\"#option of property.getOptions()\"\n          [value]=\"option.getValue()\"\n          [selected]=\"property.getValue() === option.getValue()\">\n          {{ option.getName() }}\n          </option>\n      </select>\n    </label>\n  ",
                        directives: [common_1.NgFor]
                    }),
                    __param(0, core_1.Optional()),
                    __param(0, core_1.Inject(property_1.Property))
                ], PropertyEditor);
                return PropertyEditor;
            })();
            exports_1("PropertyEditor", PropertyEditor);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/read-only-string-property-editor", ["angular2/core", "src/core/property"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, property_1;
    var PropertyEditor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            }],
        execute: function() {
            PropertyEditor = (function () {
                function PropertyEditor(property) {
                    this.property = property || new property_1.Property('[String]', '');
                }
                PropertyEditor = __decorate([
                    core_1.Component({
                        selector: 'read-only-string-property-editor',
                        properties: ['property']
                    }),
                    core_1.View({
                        template: "\n    <label class=\"vargin-property-editor\">\n      <span class=\"vargin-property-editor__label\">{{property.getName()}}</span>\n      <input class=\"vargin-property-editor__input vargin-property-editor__input-read-only\"\n             type=\"text\" readonly\n             [value]=\"property.getValue()\" />\n    </label>"
                    }),
                    __param(0, core_1.Optional()),
                    __param(0, core_1.Inject(property_1.Property))
                ], PropertyEditor);
                return PropertyEditor;
            })();
            exports_1("PropertyEditor", PropertyEditor);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/schema/editor-dialog", ["angular2/core", "angular2/common", "src/core/data/schema"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, schema_1;
    var PropertyEditorDialog;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (schema_1_1) {
                schema_1 = schema_1_1;
            }],
        execute: function() {
            PropertyEditorDialog = (function () {
                function PropertyEditorDialog(schema) {
                    this.schema = schema;
                    if (!this.schema.fields.length) {
                        this.add();
                    }
                }
                PropertyEditorDialog.prototype.remove = function (index) {
                    this.schema.fields.splice(index, 1);
                };
                PropertyEditorDialog.prototype.add = function () {
                    this.schema.fields.push({
                        name: '',
                        type: schema_1.SchemaFieldType.STRING
                    });
                };
                PropertyEditorDialog.prototype.onFieldTypeChange = function (index, type) {
                    this.schema.fields[index].type = +type;
                };
                PropertyEditorDialog.prototype.onFieldNameChange = function (index, name) {
                    this.schema.fields[index].name = name;
                };
                PropertyEditorDialog = __decorate([
                    core_1.Component({
                        selector: 'schema-property-editor-dialog'
                    }),
                    core_1.View({
                        template: "\n    <header class=\"property-editor-dialog__header\">Define Schema</header>\n    <ul class=\"vargin-list\">\n      <li class=\"vargin-list__item\" *ngFor=\"#field of schema.fields; #i = index\">\n        <input #fieldname\n               type=\"text\"\n               placeholder=\"Define field name\"\n               [value]=\"field.name\"\n               (keyup)=\"onFieldNameChange(i, fieldname.value)\" />\n        <select #fieldtype\n                [value]=\"field.type\"\n                (change)=\"onFieldTypeChange(i, fieldtype.value)\" >\n          <option value=\"0\">String</option>\n          <option value=\"1\">Number</option>\n          <option value=\"2\">Date</option>\n          <option value=\"3\">Binary</option>\n          <option value=\"4\">Boolean</option>\n        </select>\n        <button *ngIf=\"schema.fields.length > 1\"\n                class=\"vargin-list__remove-item\"\n                (click)=\"remove(i)\">\n          &#x274c;\n        </button>\n      </li>\n    </ul>\n    <button class=\"schema-field__add\" (click)=\"add()\">+ Add field</button>\n  ",
                        directives: [common_1.NgFor, common_1.NgIf]
                    }),
                    __param(0, core_1.Inject(schema_1.Schema))
                ], PropertyEditorDialog);
                return PropertyEditorDialog;
            })();
            exports_1("PropertyEditorDialog", PropertyEditorDialog);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/schema/editor", ["angular2/core", "src/core/property", "src/editor/ts/services/dialog-service", "src/editor/ts/properties/property-editors/schema/editor-dialog", "src/core/data/schema"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, property_1, dialog_service_1, editor_dialog_1, schema_1;
    var PropertyEditor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (dialog_service_1_1) {
                dialog_service_1 = dialog_service_1_1;
            },
            function (editor_dialog_1_1) {
                editor_dialog_1 = editor_dialog_1_1;
            },
            function (schema_1_1) {
                schema_1 = schema_1_1;
            }],
        execute: function() {
            PropertyEditor = (function () {
                function PropertyEditor(property) {
                    this.property = property;
                }
                PropertyEditor.prototype.getValue = function () {
                    return this.property.getValue() ? '[Defined]' : '[Not defined]';
                };
                PropertyEditor.prototype.change = function () {
                    var _this = this;
                    var propertyValue = this.property.getValue();
                    var schema = propertyValue ?
                        schema_1.Schema.deserialize(propertyValue) : new schema_1.Schema();
                    dialog_service_1.DialogService.show(editor_dialog_1.PropertyEditorDialog, [core_1.provide(schema_1.Schema, { useValue: schema })]).then(function () {
                        schema.fields = schema.fields.filter(function (field) { return !!field.name; });
                        _this.property.setValue(schema.fields.length ? schema_1.Schema.serialize(schema) : '');
                    });
                };
                PropertyEditor = __decorate([
                    core_1.Component({
                        selector: 'schema-property-editor',
                        properties: ['property']
                    }),
                    core_1.View({
                        template: "\n    <label class=\"vargin-property-editor\">\n      <span class=\"vargin-property-editor__label\">{{property.getName()}}</span>\n      <div class=\"vargin-property-editor__input flex-editor__input\">\n        <span class=\"flex-editor__input-value\">{{getValue()}}</span>\n        <button type=\"button\" (click)=\"change()\">...</button>\n      </div>\n    </label>"
                    }),
                    __param(0, core_1.Inject(property_1.Property))
                ], PropertyEditor);
                return PropertyEditor;
            })();
            exports_1("PropertyEditor", PropertyEditor);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/string-property-editor", ["angular2/core", "src/core/property"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, property_1;
    var PropertyEditor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            }],
        execute: function() {
            PropertyEditor = (function () {
                function PropertyEditor(property) {
                    this.property = property || new property_1.Property('[String]', '');
                }
                PropertyEditor.prototype.onChange = function (value) {
                    this.property.setValue(value);
                };
                PropertyEditor = __decorate([
                    core_1.Component({
                        selector: 'string-property-editor',
                        properties: ['property']
                    }),
                    core_1.View({
                        template: "\n    <label class=\"vargin-property-editor\">\n      <span class=\"vargin-property-editor__label\">{{property.getName()}}</span>\n      <input class=\"vargin-property-editor__input\" type=\"text\"\n             [value]=\"property.getValue()\"\n             (change)=\"onChange($event.target.value)\" />\n    </label>"
                    }),
                    __param(0, core_1.Optional()),
                    __param(0, core_1.Inject(property_1.Property))
                ], PropertyEditor);
                return PropertyEditor;
            })();
            exports_1("PropertyEditor", PropertyEditor);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/url/editor-dialog", ["angular2/core", "angular2/common", "src/core/data/address", "src/core/application"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, address_1, application_1;
    var PropertyEditorDialog;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            },
            function (application_1_1) {
                application_1 = application_1_1;
            }],
        execute: function() {
            PropertyEditorDialog = (function () {
                function PropertyEditorDialog(application, address) {
                    this.pages = [];
                    this.address = address;
                    this.pages = application.pages;
                }
                PropertyEditorDialog.prototype.onTypeChange = function (type) {
                    var addressType = +type;
                    this.address.type = addressType;
                    this.address.value = addressType === address_1.AddressType.APP_PAGE ?
                        this.pages[0].id : '';
                };
                PropertyEditorDialog.prototype.onValueChange = function (value) {
                    this.address.value = value;
                };
                PropertyEditorDialog.prototype.isPageAddress = function () {
                    return this.address.type === address_1.AddressType.APP_PAGE;
                };
                PropertyEditorDialog.prototype.getEditorType = function () {
                    switch (this.address.type) {
                        case address_1.AddressType.URL:
                            return 'url';
                        case address_1.AddressType.EMAIL:
                            return 'email';
                        case address_1.AddressType.PHONE:
                            return 'tel';
                        default:
                            return 'text';
                    }
                };
                PropertyEditorDialog = __decorate([
                    core_1.Component({
                        selector: 'url-property-editor-dialog'
                    }),
                    core_1.View({
                        template: "\n    <header class=\"property-editor-dialog__header\">Choose Address</header>\n    <select #type [value]=\"address.type\"\n            (change)=\"onTypeChange(type.value)\">\n      <option value=\"0\">URL</option>\n      <option value=\"1\">App Page</option>\n      <option value=\"2\">E-Mail</option>\n      <option value=\"3\">Telephone</option>\n    </select>\n    <input #value\n           *ngIf=\"!isPageAddress()\"\n           [type]=\"getEditorType()\"\n           (change)=\"onValueChange(value.value)\"\n           [value]=\"address.value\" />\n    <select #pagevalue\n            *ngIf=\"isPageAddress()\"\n            (change)=\"onValueChange(pagevalue.value)\">\n      <option *ngFor=\"#page of pages\" [value]=\"page.id\" [selected]=\"address.value === page.id\">\n        {{page.name}}\n      </option>\n    </select>\n  ",
                        directives: [common_1.NgFor, common_1.NgIf]
                    }),
                    __param(0, core_1.Inject(application_1.Application)),
                    __param(1, core_1.Inject(address_1.Address))
                ], PropertyEditorDialog);
                return PropertyEditorDialog;
            })();
            exports_1("PropertyEditorDialog", PropertyEditorDialog);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/url/editor", ["angular2/core", "src/core/property", "src/core/application", "src/core/data/address", "src/editor/ts/services/dialog-service", "src/editor/ts/properties/property-editors/url/editor-dialog"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, property_1, application_1, address_1, dialog_service_1, editor_dialog_1;
    var PropertyEditor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (application_1_1) {
                application_1 = application_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            },
            function (dialog_service_1_1) {
                dialog_service_1 = dialog_service_1_1;
            },
            function (editor_dialog_1_1) {
                editor_dialog_1 = editor_dialog_1_1;
            }],
        execute: function() {
            PropertyEditor = (function () {
                function PropertyEditor(application, property) {
                    this.application = application;
                    this.property = property;
                }
                PropertyEditor.prototype.getValue = function () {
                    var urlString = this.property.getValue();
                    if (!urlString) {
                        return '[Not defined]';
                    }
                    var address = address_1.Address.deserialize(urlString);
                    if (address.type === address_1.AddressType.APP_PAGE) {
                        var page = this.application.pages.find(function (page) { return page.id === address.value; });
                        if (page) {
                            return page.name;
                        }
                        this.property.setValue('');
                        return '[Not defined]';
                    }
                    return address.value;
                };
                PropertyEditor.prototype.change = function () {
                    var _this = this;
                    var urlString = this.property.getValue();
                    var address = urlString ? address_1.Address.deserialize(urlString) : new address_1.Address();
                    dialog_service_1.DialogService.show(editor_dialog_1.PropertyEditorDialog, [core_1.provide(address_1.Address, { useValue: address })]).then(function () {
                        _this.property.setValue(address.value ? address_1.Address.serialize(address) : '');
                    });
                };
                PropertyEditor = __decorate([
                    core_1.Component({
                        selector: 'url-property-editor',
                        properties: ['property']
                    }),
                    core_1.View({
                        template: "\n    <label class=\"vargin-property-editor\">\n      <span class=\"vargin-property-editor__label\">{{property.getName()}}</span>\n      <div class=\"vargin-property-editor__input flex-editor__input\">\n        <span class=\"flex-editor__input-value\" [title]=\"getValue()\">\n          {{getValue()}}\n        </span>\n        <button type=\"button\" (click)=\"change()\">...</button>\n      </div>\n    </label>"
                    }),
                    __param(0, core_1.Inject(application_1.Application)),
                    __param(1, core_1.Inject(property_1.Property))
                ], PropertyEditor);
                return PropertyEditor;
            })();
            exports_1("PropertyEditor", PropertyEditor);
        }
    }
});

System.register("src/editor/ts/expandable-groups/expandable-groups", ["angular2/core", "angular2/common"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1, common_1;
    var VarginExpandableGroups;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            VarginExpandableGroups = (function () {
                function VarginExpandableGroups() {
                    this.groups = [];
                }
                VarginExpandableGroups.prototype.toggleGroupState = function (group) {
                    group.expanded = !group.expanded;
                };
                VarginExpandableGroups.prototype.onDragStart = function (e, group, item) {
                    e.dataTransfer.setData("text/" + group.type, item.type);
                };
                VarginExpandableGroups = __decorate([
                    core_1.Component({
                        selector: 'expandable-groups',
                        properties: ['groups']
                    }),
                    core_1.View({
                        templateUrl: 'ts/expandable-groups/expandable-groups.html',
                        directives: [common_1.NgFor]
                    })
                ], VarginExpandableGroups);
                return VarginExpandableGroups;
            })();
            exports_1("VarginExpandableGroups", VarginExpandableGroups);
            exports_1("default",VarginExpandableGroups);
        }
    }
});

System.register("src/editor/ts/control-components/visual/container-component", ["angular2/core", "src/core/controls/control", "src/editor/ts/control-components/base-component"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, control_1, base_component_1;
    var ContainerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            }],
        execute: function() {
            ContainerComponent = (function (_super) {
                __extends(ContainerComponent, _super);
                function ContainerComponent(renderer, viewContainer, iterableDiffers, changeDetector, loader, control) {
                    _super.call(this, renderer, viewContainer, iterableDiffers, changeDetector, loader, control);
                }
                ContainerComponent.prototype.acceptDrop = function (typesToDrop) {
                    return typesToDrop.indexOf('text/visual') >= 0;
                };
                ContainerComponent = __decorate([
                    core_1.Component({
                        selector: 'div[vargin-type=container]',
                        properties: ['control'],
                        host: {
                            '(click)': 'onClick($event)',
                            '[class.vargin-component_drop-target]': 'dragEnterCounter > 0',
                            '[style]': 'controlStyle',
                            '(dragleave)': 'onDragLeave($event)',
                            '(dragover)': 'onDragOver($event)',
                            '(dragenter)': 'onDragEnter($event)',
                            '(drop)': 'onDrop($event)'
                        }
                    }),
                    core_1.View({
                        template: "<div class=\"vargin-dynamic-anchor\" #container hidden></div>"
                    }),
                    __param(0, core_1.Inject(core_1.Renderer)),
                    __param(1, core_1.Inject(core_1.ViewContainerRef)),
                    __param(2, core_1.Inject(core_1.IterableDiffers)),
                    __param(3, core_1.Inject(core_1.ChangeDetectorRef)),
                    __param(4, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(5, core_1.Optional()),
                    __param(5, core_1.Inject(control_1.Control))
                ], ContainerComponent);
                return ContainerComponent;
            })(base_component_1.BaseComponent);
            exports_1("ContainerComponent", ContainerComponent);
        }
    }
});

System.register("src/editor/ts/control-components/base-component", ["angular2/core", "src/core/controls/control", "src/core/services/control-service", "src/editor/ts/services/component-service", "src/core/tools/promise-queue"], function(exports_1) {
    var core_1, control_1, control_service_1, component_service_1, promise_queue_1;
    var BaseComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (control_service_1_1) {
                control_service_1 = control_service_1_1;
            },
            function (component_service_1_1) {
                component_service_1 = component_service_1_1;
            },
            function (promise_queue_1_1) {
                promise_queue_1 = promise_queue_1_1;
            }],
        execute: function() {
            BaseComponent = (function () {
                function BaseComponent(renderer, viewContainer, iterableDiffers, changeDetector, loader, control) {
                    this.dragEnterCounter = 0;
                    this.control = control;
                    this.renderer = renderer;
                    this.viewContainer = viewContainer;
                    this.iterableDiffers = iterableDiffers;
                    this.changeDetector = changeDetector;
                    this.loader = loader;
                }
                BaseComponent.prototype.onClick = function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    component_service_1.ComponentService.selectComponent(this);
                };
                BaseComponent.prototype.onDragOver = function (e) {
                    if (this.acceptDrop(this.domStringListToArray(e.dataTransfer.types))) {
                        e.preventDefault();
                    }
                };
                BaseComponent.prototype.onDragEnter = function (e) {
                    if (this.acceptDrop(this.domStringListToArray(e.dataTransfer.types))) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.dragEnterCounter++;
                    }
                };
                BaseComponent.prototype.onDragLeave = function (e) {
                    if (this.acceptDrop(this.domStringListToArray(e.dataTransfer.types))) {
                        e.stopPropagation();
                        this.dragEnterCounter--;
                    }
                };
                BaseComponent.prototype.onDrop = function (e) {
                    if (this.acceptDrop(this.domStringListToArray(e.dataTransfer.types))) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.control.addChild(control_service_1.ControlService.createByType(e.dataTransfer.getData(e.dataTransfer.types[0])));
                        this.dragEnterCounter = 0;
                    }
                };
                BaseComponent.prototype.acceptDrop = function (typesToDrop) {
                    return false;
                };
                BaseComponent.prototype.getPropertyValue = function (key) {
                    return this.control.getProperty(key).getValue();
                };
                BaseComponent.prototype.ngDoCheck = function () {
                    if (!this.control) {
                        return;
                    }
                    this.checkChildren();
                    this.checkStyles();
                };
                BaseComponent.prototype.select = function () {
                    this.renderer.setElementClass(this.viewContainer.element.nativeElement, 'vargin-component_active', true);
                };
                BaseComponent.prototype.unselect = function () {
                    this.renderer.setElementClass(this.viewContainer.element.nativeElement, 'vargin-component_active', false);
                };
                BaseComponent.prototype.getChildren = function () {
                    return this.control.getChildren();
                };
                BaseComponent.prototype.checkChildren = function () {
                    var _this = this;
                    if (!this.control.canHaveChildren()) {
                        return;
                    }
                    if (!this.nestedComponents) {
                        this.nestedComponents = {
                            differ: this.iterableDiffers.find(this.getChildren()).create(this.changeDetector),
                            components: new Map()
                        };
                        return;
                    }
                    var changes = this.nestedComponents.differ.diff(this.getChildren());
                    var childrenToRemove;
                    var childrenToInsert;
                    if (changes) {
                        changes.forEachRemovedItem(function (removedRecord) {
                            if (!childrenToRemove) {
                                childrenToRemove = [];
                            }
                            childrenToRemove.push(removedRecord.item);
                        });
                        changes.forEachAddedItem(function (addedRecord) {
                            if (!childrenToInsert) {
                                childrenToInsert = [];
                            }
                            childrenToInsert.push(addedRecord.item);
                        });
                    }
                    if (childrenToRemove) {
                        childrenToRemove.forEach(function (control) {
                            _this.nestedComponents.components.get(control).dispose();
                            _this.nestedComponents.components.delete(control);
                        });
                    }
                    if (childrenToInsert) {
                        var promiseQueue = new promise_queue_1.PromiseQueue();
                        childrenToInsert.forEach(function (control) {
                            promiseQueue.enqueue(function () {
                                return component_service_1.ComponentService.loadComponentType(control.meta.type).then(function (type) {
                                    return _this.loader.loadIntoLocation(type, _this.viewContainer.element, 'container', core_1.Injector.resolve([core_1.provide(control_1.Control, { useValue: control })]));
                                }).then(function (component) {
                                    _this.nestedComponents.components.set(control, component);
                                });
                            });
                        });
                    }
                };
                BaseComponent.prototype.checkStyles = function () {
                    var _this = this;
                    this.controlStyle = '';
                    this.control.meta.styles.forEach(function (meta, key) {
                        var value = _this.control.getStyle(key).getValue();
                        _this.controlStyle += key + ": " + value + ";";
                    });
                };
                BaseComponent.prototype.domStringListToArray = function (list) {
                    var stringArray = [];
                    for (var i = 0; i < list.length; i++) {
                        stringArray[i] = list[i];
                    }
                    return stringArray;
                };
                return BaseComponent;
            })();
            exports_1("BaseComponent", BaseComponent);
        }
    }
});

System.register("src/editor/ts/control-components/service/service-container-component", ["angular2/core", "src/core/controls/control", "src/editor/ts/control-components/base-component"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, control_1, base_component_1;
    var ServiceContainerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            }],
        execute: function() {
            ServiceContainerComponent = (function (_super) {
                __extends(ServiceContainerComponent, _super);
                function ServiceContainerComponent(renderer, viewContainer, iterableDiffers, changeDetector, loader, control) {
                    _super.call(this, renderer, viewContainer, iterableDiffers, changeDetector, loader, control);
                }
                ServiceContainerComponent.prototype.acceptDrop = function (typesToDrop) {
                    return typesToDrop.indexOf('text/service') >= 0;
                };
                ServiceContainerComponent.prototype.ngOnChanges = function () {
                    if (this.control) {
                        this.setupStyles();
                    }
                };
                ServiceContainerComponent.prototype.setupStyles = function () {
                    this.control.getStyle('align-items').setValue('stretch');
                    this.control.getStyle('display').setValue('flex');
                    this.control.getStyle('min-height').setValue('0');
                    this.control.getStyle('min-width').setValue('100%');
                };
                ServiceContainerComponent = __decorate([
                    core_1.Component({
                        selector: 'div[vargin-type=service-container]',
                        properties: ['control'],
                        host: {
                            '[class.vargin-component_drop-target]': 'dragEnterCounter > 0',
                            '[style]': 'controlStyle',
                            '(dragleave)': 'onDragLeave($event)',
                            '(dragover)': 'onDragOver($event)',
                            '(dragenter)': 'onDragEnter($event)',
                            '(drop)': 'onDrop($event)'
                        }
                    }),
                    core_1.View({
                        template: '<div class="vargin-dynamic-anchor" #container hidden></div>'
                    }),
                    __param(0, core_1.Inject(core_1.Renderer)),
                    __param(1, core_1.Inject(core_1.ViewContainerRef)),
                    __param(2, core_1.Inject(core_1.IterableDiffers)),
                    __param(3, core_1.Inject(core_1.ChangeDetectorRef)),
                    __param(4, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(5, core_1.Optional()),
                    __param(5, core_1.Inject(control_1.Control))
                ], ServiceContainerComponent);
                return ServiceContainerComponent;
            })(base_component_1.BaseComponent);
            exports_1("ServiceContainerComponent", ServiceContainerComponent);
        }
    }
});

System.register("src/editor/ts/workspace/workspace", ["angular2/core", "angular2/common", "src/editor/ts/control-components/visual/container-component", "src/editor/ts/control-components/service/service-container-component", "src/editor/ts/services/workspace-service", "src/editor/ts/services/component-service", "src/compilers/json/json-application-compiler", "src/compilers/angular/angular-application-compiler"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, container_component_1, service_container_component_1, workspace_service_1, component_service_1, json_application_compiler_1, angular_application_compiler_1;
    var VarginWorkspace;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (container_component_1_1) {
                container_component_1 = container_component_1_1;
            },
            function (service_container_component_1_1) {
                service_container_component_1 = service_container_component_1_1;
            },
            function (workspace_service_1_1) {
                workspace_service_1 = workspace_service_1_1;
            },
            function (component_service_1_1) {
                component_service_1 = component_service_1_1;
            },
            function (json_application_compiler_1_1) {
                json_application_compiler_1 = json_application_compiler_1_1;
            },
            function (angular_application_compiler_1_1) {
                angular_application_compiler_1 = angular_application_compiler_1_1;
            }],
        execute: function() {
            VarginWorkspace = (function () {
                function VarginWorkspace(workspace) {
                    this.activePageIndex = 0;
                    this.jsonCompiler = new json_application_compiler_1.JSONApplicationCompiler();
                    this.angularCompiler = new angular_application_compiler_1.AngularApplicationCompiler();
                    this.workspace = workspace;
                }
                VarginWorkspace.prototype.addPage = function () {
                    this.workspace.application.addPage();
                };
                VarginWorkspace.prototype.removePage = function (pageId) {
                    this.workspace.application.removePage(pageId);
                    component_service_1.ComponentService.unselectCurrentComponent();
                    if (this.activePageIndex >= this.workspace.application.pages.length) {
                        this.activePageIndex = this.workspace.application.pages.length - 1;
                    }
                };
                VarginWorkspace.prototype.goToPage = function (pageIndex) {
                    if (pageIndex !== this.activePageIndex) {
                        component_service_1.ComponentService.unselectCurrentComponent();
                        this.activePageIndex = pageIndex;
                    }
                };
                VarginWorkspace.prototype.getActivePage = function () {
                    if (!this.workspace) {
                        return null;
                    }
                    return this.workspace.application.pages[this.activePageIndex];
                };
                VarginWorkspace.prototype.getPages = function () {
                    return this.workspace ? this.workspace.application.pages : [];
                };
                VarginWorkspace.prototype.toJSON = function () {
                    this.jsonCompiler.compile(this.workspace.application).then(function (compiledApplication) {
                        window.open('data:application/json,' + encodeURIComponent(compiledApplication));
                    });
                };
                VarginWorkspace.prototype.toAngularApp = function () {
                    this.angularCompiler.compile(this.workspace.application).then(function (application) {
                        window['application'] = application;
                        window.open('ng2-compiler/index.html?ts=' + Date.now());
                    });
                };
                VarginWorkspace.prototype.toStaticHTML = function () {
                    var _this = this;
                    this.angularCompiler.compile(this.workspace.application).then(function (application) {
                        window['application'] = application;
                        var activePage = _this.getActivePage();
                        var applicationName = _this.workspace.application.name;
                        var iframe = document.createElement('iframe');
                        iframe.hidden = true;
                        iframe.src = "ng2-compiler/?ts=" + Date.now() + "#/page/" + activePage.id;
                        iframe.addEventListener('load', function onLoad() {
                            this.removeEventListener('load', onLoad);
                            var pageNode = this.contentDocument.body.querySelector('page');
                            window.open('data:text/html;charset=UTF-8,' + encodeURIComponent("\n              <!DOCTYPE html>\n               <html lang=\"en\">\n                 <head>\n                   <meta charset=\"utf-8\" />\n                   <title>" + applicationName + "</title>\n                   <style type=\"text/css\">" + application.css + "</style>\n                 </head>\n                 <body>" + pageNode.innerHTML + "</body>\n               </html>\n            "));
                            this.remove();
                            iframe = null;
                        });
                        document.body.appendChild(iframe);
                    });
                };
                VarginWorkspace.prototype.startFromScratch = function () {
                    var _this = this;
                    component_service_1.ComponentService.unselectCurrentComponent();
                    this.activePageIndex = 0;
                    workspace_service_1.WorkspaceService.reset().then(function (workspace) {
                        _this.workspace = workspace;
                    });
                };
                VarginWorkspace = __decorate([
                    core_1.Component({
                        selector: 'vargin-workspace'
                    }),
                    core_1.View({
                        template: "\n    <ul class=\"workspace-pager\">\n      <li class=\"workspace-pager__page\"\n          [class.workspace-pager__page_active]=\"activePageIndex === i\"\n          *ngFor=\"#page of getPages(); #i = index\"\n          (click)=\"goToPage(i)\">\n        {{page.name}}\n        <button class=\"workspace-pager__page__remove\"\n                title=\"Remove page\"\n                *ngIf=\"getPages().length > 1\"\n                (click)=\"removePage(page.id)\">&#x274c;</button>\n      </li>\n      <li class=\"workspace-pager__add-new\">\n        <button (click)=\"addPage()\">+ Add page</button>\n      </li>\n    </ul>\n    <section class=\"workspace-editor\">\n      <div class=\"workspace-editor__visual\">\n        <div vargin-type=\"container\" [control]=\"getActivePage()?.root\"></div>\n      </div>\n      <div class=\"workspace-editor__service\">\n        <div vargin-type=\"service-container\" [control]=\"workspace?.application?.serviceRoot\">\n        </div>\n      </div>\n    </section>\n    <footer class=\"workspace-toolbar\">\n      <button (click)=\"startFromScratch()\">Start from scratch</button>\n      <button (click)=\"toJSON()\">Get JSON</button>\n      <button (click)=\"toAngularApp()\">Compile and Run</button>\n      <button (click)=\"toStaticHTML()\">Get static HTML page</button>\n    </footer>\n  ",
                        directives: [container_component_1.ContainerComponent, common_1.NgFor, common_1.NgIf, service_container_component_1.ServiceContainerComponent]
                    }),
                    __param(0, core_1.Inject(workspace_service_1.Workspace))
                ], VarginWorkspace);
                return VarginWorkspace;
            })();
            exports_1("default",VarginWorkspace);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/property-editor", ["angular2/core", "src/core/property"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, property_1;
    var CONFIG, PropertyEditor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            }],
        execute: function() {
            CONFIG = new Map([
                ['background-color', 'color-property-editor'],
                ['color', 'color-property-editor'],
                ['event', 'event/editor'],
                ['number', 'number-property-editor'],
                ['opacity', 'number-property-editor'],
                ['image', 'image-property-editor'],
                ['string', 'string-property-editor'],
                ['read-only-string', 'read-only-string-property-editor'],
                ['options', 'property-with-options-editor'],
                ['datasource', 'datasource-property-editor'],
                ['items', 'items/editor'],
                ['schema', 'schema/editor'],
                ['trigger', 'trigger/editor'],
                ['url', 'url/editor'],
                ['control-overrides', 'control-overrides/editor']
            ]);
            PropertyEditor = (function () {
                function PropertyEditor(loader, viewContainer) {
                    this.loader = loader;
                    this.viewContainer = viewContainer;
                }
                PropertyEditor.prototype.ngOnChanges = function () {
                    var _this = this;
                    if (!this.property) {
                        return;
                    }
                    PropertyEditor.getEditorType(this.property).then(function (PropertyEditorType) {
                        return _this.loader.loadIntoLocation(PropertyEditorType, _this.viewContainer.element, 'container', core_1.Injector.resolve([core_1.provide(property_1.Property, { useValue: _this.property })]));
                    });
                };
                PropertyEditor.getEditorType = function (property) {
                    var propertyType = 'getOptions' in property ?
                        'options' : property.getType();
                    var editorPath = CONFIG.get(propertyType) || CONFIG.get('string');
                    return System.import("src/editor/ts/properties/property-editors/" + editorPath).then(function (module) { return module.PropertyEditor; });
                };
                PropertyEditor = __decorate([
                    core_1.Component({
                        selector: 'property-editor',
                        properties: ['property']
                    }),
                    core_1.View({
                        template: "<div #container hidden></div>"
                    }),
                    __param(0, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(1, core_1.Inject(core_1.ViewContainerRef))
                ], PropertyEditor);
                return PropertyEditor;
            })();
            exports_1("PropertyEditor", PropertyEditor);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/event/editor-dialog", ["angular2/core", "angular2/common", "src/core/actions/action", "src/core/services/action-service", "src/editor/ts/properties/property-editors/property-editor"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, action_1, action_service_1, property_editor_1;
    var PropertyEditorDialog;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (action_1_1) {
                action_1 = action_1_1;
            },
            function (action_service_1_1) {
                action_service_1 = action_service_1_1;
            },
            function (property_editor_1_1) {
                property_editor_1 = property_editor_1_1;
            }],
        execute: function() {
            PropertyEditorDialog = (function () {
                function PropertyEditorDialog(dispose, action) {
                    this.actionProperties = [];
                    this.dispose = dispose;
                    this.action = action;
                    this.actualizeAction();
                }
                PropertyEditorDialog.prototype.typeChanged = function (actionType) {
                    if (actionType !== 'default') {
                        this.action = action_service_1.ActionService.createByType(actionType);
                    }
                    else {
                        this.action = null;
                    }
                    this.actualizeAction();
                };
                PropertyEditorDialog.prototype.actualizeAction = function () {
                    var _this = this;
                    this.actionProperties = [];
                    if (this.action) {
                        this.actionType = this.action.meta.type;
                        this.action.meta.properties.forEach(function (property, key) {
                            _this.actionProperties.push(_this.action.getProperty(key));
                        });
                    }
                    else {
                        this.actionType = 'default';
                    }
                };
                PropertyEditorDialog = __decorate([
                    core_1.Component({
                        selector: 'event-property-editor-dialog'
                    }),
                    core_1.View({
                        template: "\n    <header class=\"property-editor-dialog__header\">Setup action</header>\n    <ul class=\"vargin-list\">\n      <li class=\"vargin-list__item\">\n        <label class=\"vargin-property-editor\">\n          <span class=\"vargin-property-editor__label\">Type</span>\n          <select #newaction class=\"vargin-property-editor__input\"\n                  (change)=\"typeChanged(newaction.value)\"\n                  [value]=\"actionType\">\n            <option value=\"default\">Choose ...</option>\n            <option value=\"alert-action\">Alert</option>\n            <option value=\"change-property-action\">Change property</option>\n            <option value=\"change-own-overrides-action\">Change own state</option>\n            <option value=\"change-overrides-action\">Change state</option>\n            <option value=\"navigate-action\">Navigate</option>\n          </select>\n        </label>\n      </li>\n      <li class=\"vargin-list__item\" *ngFor=\"#property of actionProperties\">\n        <property-editor [property]=\"property\"></property-editor>\n      </li>\n    </ul>\n    <button class=\"property-editor-dialog__save-button\" (click)=\"dispose(action)\">Save</button>\n  ",
                        directives: [common_1.NgFor, property_editor_1.PropertyEditor]
                    }),
                    __param(0, core_1.Inject('dispose')),
                    __param(1, core_1.Optional()),
                    __param(1, core_1.Inject(action_1.Action))
                ], PropertyEditorDialog);
                return PropertyEditorDialog;
            })();
            exports_1("PropertyEditorDialog", PropertyEditorDialog);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/trigger/list-dialog", ["angular2/core", "angular2/common", "src/editor/ts/services/dialog-service", "src/core/actions/action", "src/core/triggers/trigger", "src/editor/ts/properties/property-editors/event/editor-dialog"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, dialog_service_1, action_1, trigger_1, editor_dialog_1;
    var PropertyListDialog;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (dialog_service_1_1) {
                dialog_service_1 = dialog_service_1_1;
            },
            function (action_1_1) {
                action_1 = action_1_1;
            },
            function (trigger_1_1) {
                trigger_1 = trigger_1_1;
            },
            function (editor_dialog_1_1) {
                editor_dialog_1 = editor_dialog_1_1;
            }],
        execute: function() {
            PropertyListDialog = (function () {
                function PropertyListDialog(trigger, dispose) {
                    this.trigger = trigger;
                    this.dispose = dispose;
                }
                PropertyListDialog.prototype.addAction = function () {
                    var _this = this;
                    dialog_service_1.DialogService.show(editor_dialog_1.PropertyEditorDialog).then(function (action) {
                        if (action) {
                            _this.trigger.actions.push(action);
                        }
                    });
                };
                PropertyListDialog.prototype.editAction = function (action) {
                    dialog_service_1.DialogService.show(editor_dialog_1.PropertyEditorDialog, [core_1.provide(action_1.Action, { useValue: action })]);
                };
                PropertyListDialog.prototype.removeAction = function (index) {
                    this.trigger.actions.splice(index, 1);
                };
                PropertyListDialog.prototype.remove = function () {
                    this.dispose({ remove: true });
                };
                PropertyListDialog.prototype.onNameChange = function (newName) {
                    this.trigger.name = newName;
                };
                PropertyListDialog.prototype.onConditionChange = function (newCondition) {
                    this.trigger.condition = newCondition;
                };
                PropertyListDialog = __decorate([
                    core_1.Component({
                        selector: 'trigger-property-list-dialog'
                    }),
                    core_1.View({
                        template: "\n    <header class=\"property-list-dialog__header\">Edit Trigger</header>\n    <ul class=\"vargin-list\">\n      <li class=\"vargin-list__item\">\n        <label class=\"vargin-property-editor\">\n          <span class=\"vargin-property-editor__label\">Name</span>\n          <input #name class=\"vargin-property-editor__input\" type=\"text\"\n                 [value]=\"trigger.name\" (keyup)=\"onNameChange(name.value)\" />\n        </label>\n      </li>\n      <li class=\"vargin-list__item\">\n        <label class=\"vargin-property-editor\">\n          <span class=\"vargin-property-editor__label\">Condition</span>\n          <input #condition class=\"vargin-property-editor__input\" type=\"text\"\n                 [value]=\"trigger.condition\"\n                 (keyup)=\"onConditionChange(condition.value)\" />\n        </label>\n      </li>\n    </ul>\n    <table class=\"vargin-table\">\n      <tbody>\n        <tr class=\"vargin-table__data-row\" *ngFor=\"#action of trigger.actions; #i = index\">\n          <td class=\"vargin-table__data-cell\" (click)=\"editAction(action)\">\n            {{ action.meta.name }}\n          </td>\n          <td class=\"vargin-table__data-cell\">\n            <button class=\"vargin-list__remove-item\" (click)=\"removeAction(i)\">\n              &#x274c;\n            </button>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n    <button class=\"vargin-button-link\" (click)=\"addAction()\">+ Add action</button>\n    <br />\n    <button class=\"vargin-button-link remove-trigger-button\"\n            (click)=\"remove()\">Remove trigger</button>\n  ",
                        directives: [common_1.NgFor]
                    }),
                    __param(0, core_1.Inject(trigger_1.Trigger)),
                    __param(1, core_1.Inject('dispose'))
                ], PropertyListDialog);
                return PropertyListDialog;
            })();
            exports_1("PropertyListDialog", PropertyListDialog);
        }
    }
});

System.register("src/editor/ts/properties/property-editors/trigger/editor", ["angular2/core", "src/core/property", "src/core/triggers/trigger", "src/editor/ts/services/dialog-service", "src/editor/ts/properties/property-editors/trigger/list-dialog"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, property_1, trigger_1, dialog_service_1, list_dialog_1;
    var TriggerPropertyEditor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (trigger_1_1) {
                trigger_1 = trigger_1_1;
            },
            function (dialog_service_1_1) {
                dialog_service_1 = dialog_service_1_1;
            },
            function (list_dialog_1_1) {
                list_dialog_1 = list_dialog_1_1;
            }],
        execute: function() {
            TriggerPropertyEditor = (function () {
                function TriggerPropertyEditor(property) {
                    this.remove = new core_1.EventEmitter();
                    this.property = property;
                }
                TriggerPropertyEditor.prototype.change = function () {
                    var _this = this;
                    return dialog_service_1.DialogService.show(list_dialog_1.PropertyListDialog, [core_1.provide(trigger_1.Trigger, { useValue: this.property.getValue() })]).then(function (dialogResult) {
                        if (dialogResult === void 0) { dialogResult = {}; }
                        if (dialogResult.remove) {
                            _this.remove.next(null);
                        }
                    });
                };
                __decorate([
                    core_1.Output()
                ], TriggerPropertyEditor.prototype, "remove", void 0);
                __decorate([
                    core_1.Input()
                ], TriggerPropertyEditor.prototype, "property", void 0);
                TriggerPropertyEditor = __decorate([
                    core_1.Component({
                        selector: 'trigger-property-editor',
                        properties: ['property']
                    }),
                    core_1.View({
                        template: "\n    <label class=\"vargin-property-editor\">\n      <span class=\"vargin-property-editor__label\">{{property.getValue().name}}</span>\n      <div class=\"vargin-property-editor__input flex-editor__input\">\n        <button type=\"button\" (click)=\"change()\">...</button>\n      </div>\n    </label>"
                    }),
                    __param(0, core_1.Optional()),
                    __param(0, core_1.Inject(property_1.Property))
                ], TriggerPropertyEditor);
                return TriggerPropertyEditor;
            })();
            exports_1("TriggerPropertyEditor", TriggerPropertyEditor);
        }
    }
});

System.register("src/editor/ts/services/component-service", ["angular2/core"], function(exports_1) {
    var core_1;
    var COMPONENT_CONFIG, ComponentService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            COMPONENT_CONFIG = new Map([
                ['button', {
                        name: 'ButtonComponent',
                        path: 'src/editor/ts/control-components/visual/button-component'
                    }],
                ['container', {
                        name: 'ContainerComponent',
                        path: 'src/editor/ts/control-components/visual/container-component'
                    }],
                ['datasource', {
                        name: 'DatasourceComponent',
                        path: 'src/editor/ts/control-components/service/datasource-component'
                    }],
                ['label', {
                        name: 'LabelComponent',
                        path: 'src/editor/ts/control-components/visual/label-component'
                    }],
                ['link', {
                        name: 'LinkComponent',
                        path: 'src/editor/ts/control-components/visual/link-component'
                    }],
                ['list', {
                        name: 'ListComponent',
                        path: 'src/editor/ts/control-components/visual/list-component'
                    }],
                ['list-item', {
                        name: 'ContainerComponent',
                        path: 'src/editor/ts/control-components/visual/container-component'
                    }],
                ['range', {
                        name: 'RangeComponent',
                        path: 'src/editor/ts/control-components/visual/range-component'
                    }],
                ['text-input', {
                        name: 'TextInputComponent',
                        path: 'src/editor/ts/control-components/visual/text-input-component'
                    }]
            ]);
            ComponentService = (function () {
                function ComponentService() {
                }
                ComponentService.selectComponent = function (component) {
                    var isSilent = this._activeComponent &&
                        this._activeComponent.control === component.control;
                    if (this._activeComponent !== component) {
                        this.unselectCurrentComponent(isSilent);
                    }
                    if (!this._activeComponent || this._activeComponent !== component) {
                        ComponentService._activeComponent = component;
                        component.select();
                        if (!isSilent) {
                            ComponentService.controlSelected.next(component.control);
                        }
                    }
                };
                ComponentService.unselectCurrentComponent = function (isSilent) {
                    if (isSilent === void 0) { isSilent = false; }
                    if (!this._activeComponent) {
                        return;
                    }
                    if (!isSilent) {
                        ComponentService.controlUnselected.next(this._activeComponent.control);
                    }
                    this._activeComponent.unselect();
                    this._activeComponent = null;
                };
                ComponentService.loadComponentType = function (controlType) {
                    var classDescription = COMPONENT_CONFIG.get(controlType);
                    return System.import(classDescription.path).then(function (module) { return module[classDescription.name]; });
                };
                ComponentService.controlSelected = new core_1.EventEmitter();
                ComponentService.controlUnselected = new core_1.EventEmitter();
                return ComponentService;
            })();
            exports_1("ComponentService", ComponentService);
        }
    }
});

System.register("src/editor/ts/properties/properties", ["angular2/core", "angular2/common", "src/core/property", "src/core/triggers/trigger", "src/editor/ts/properties/property-editors/property-editor", "src/editor/ts/properties/property-editors/trigger/editor", "src/editor/ts/services/component-service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1, common_1, property_1, trigger_1, property_editor_1, editor_1, component_service_1;
    var VarginProperties;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (trigger_1_1) {
                trigger_1 = trigger_1_1;
            },
            function (property_editor_1_1) {
                property_editor_1 = property_editor_1_1;
            },
            function (editor_1_1) {
                editor_1 = editor_1_1;
            },
            function (component_service_1_1) {
                component_service_1 = component_service_1_1;
            }],
        execute: function() {
            VarginProperties = (function () {
                function VarginProperties() {
                    this.groups = {
                        info: null,
                        properties: null,
                        styles: null,
                        events: null,
                        triggers: null
                    };
                    component_service_1.ComponentService.controlSelected.subscribe(this.onControlSelected.bind(this));
                    component_service_1.ComponentService.controlUnselected.subscribe(this.onControlUnselected.bind(this));
                    this.groups.info = {
                        name: 'Info',
                        expanded: false,
                        items: []
                    };
                    this.groups.properties = {
                        name: 'Common Properties',
                        expanded: false,
                        items: []
                    };
                    this.groups.styles = {
                        name: 'Appearance',
                        expanded: false,
                        items: []
                    };
                    this.groups.events = {
                        name: 'Actions',
                        expanded: false,
                        items: []
                    };
                    this.groups.triggers = {
                        name: 'Triggers',
                        expanded: false,
                        items: []
                    };
                }
                VarginProperties.prototype.onControlSelected = function (control) {
                    var _this = this;
                    this.reset();
                    this.activeControl = control;
                    this.groups.info.items.push(new property_1.Property('Id', control.id, 'read-only-string'), new property_1.Property('States', control, 'control-overrides'));
                    control.meta.properties.forEach(function (property, propertyKey) {
                        _this.groups.properties.items.push(control.getProperty(propertyKey));
                    });
                    control.meta.styles.forEach(function (style, styleKey) {
                        _this.groups.styles.items.push(control.getStyle(styleKey));
                    });
                    control.meta.events.forEach(function (property, eventKey) {
                        _this.groups.events.items.push(control.getEvent(eventKey));
                    });
                    this.groups.triggers.items = control.triggers.map(function (trigger) { return _this.triggerToProperty(trigger); });
                };
                VarginProperties.prototype.onControlUnselected = function () {
                    this.reset();
                };
                VarginProperties.prototype.removeControl = function () {
                    if (!this.activeControl) {
                        return;
                    }
                    this.activeControl.remove();
                    component_service_1.ComponentService.unselectCurrentComponent();
                };
                VarginProperties.prototype.reset = function () {
                    var _this = this;
                    this.activeControl = null;
                    Object.keys(this.groups).forEach(function (groupKey) {
                        _this.groups[groupKey].items = [];
                    });
                };
                VarginProperties.prototype.addTrigger = function () {
                    var trigger = new trigger_1.Trigger('New Trigger');
                    this.activeControl.triggers.push(trigger);
                    this.groups.triggers.items.push(this.triggerToProperty(trigger));
                };
                VarginProperties.prototype.triggerToProperty = function (trigger) {
                    return new property_1.Property(trigger.name, trigger, 'trigger');
                };
                VarginProperties.prototype.removeTrigger = function (property) {
                    this.groups.triggers.items.splice(this.groups.triggers.items.indexOf(property), 1);
                    this.activeControl.triggers.splice(this.activeControl.triggers.indexOf(property.getValue()), 1);
                };
                VarginProperties = __decorate([
                    core_1.Component({
                        selector: 'vargin-properties'
                    }),
                    core_1.View({
                        template: "\n    <section>\n      <section class=\"expandable-group\"\n               *ngIf=\"!!groups.info.items.length\"\n               [attr.aria-expanded]=\"groups.info.expanded\">\n        <header class=\"expandable-group__header\"\n                (click)=\"groups.info.expanded = !groups.info.expanded\">\n          {{ groups.info.name }}\n        </header>\n        <ul class=\"expandable-group__list\">\n          <li class=\"expandable-group__item\" *ngFor=\"#property of groups.info.items\">\n            <property-editor [property]=\"property\"></property-editor>\n          </li>\n        </ul>\n      </section>\n      <section class=\"expandable-group\"\n               *ngIf=\"!!groups.properties.items.length\"\n               [attr.aria-expanded]=\"groups.properties.expanded\">\n        <header class=\"expandable-group__header\"\n                (click)=\"groups.properties.expanded = !groups.properties.expanded\">\n          {{ groups.properties.name }}\n        </header>\n        <ul class=\"expandable-group__list\">\n          <li class=\"expandable-group__item\" *ngFor=\"#property of groups.properties.items\">\n            <property-editor [property]=\"property\"></property-editor>\n          </li>\n        </ul>\n      </section>\n      <section class=\"expandable-group\"\n               *ngIf=\"!!groups.styles.items.length\"\n               [attr.aria-expanded]=\"groups.styles.expanded\">\n        <header class=\"expandable-group__header\"\n                (click)=\"groups.styles.expanded = !groups.styles.expanded\">\n          {{ groups.styles.name }}\n        </header>\n        <ul class=\"expandable-group__list\">\n          <li class=\"expandable-group__item\" *ngFor=\"#property of groups.styles.items\">\n            <property-editor [property]=\"property\"></property-editor>\n          </li>\n        </ul>\n      </section>\n      <section class=\"expandable-group\"\n               *ngIf=\"!!groups.events.items.length\"\n               [attr.aria-expanded]=\"groups.events.expanded\">\n        <header class=\"expandable-group__header\"\n                (click)=\"groups.events.expanded = !groups.events.expanded\">\n          {{ groups.events.name }}\n        </header>\n        <ul class=\"expandable-group__list\">\n          <li class=\"expandable-group__item\" *ngFor=\"#property of groups.events.items\">\n            <property-editor [property]=\"property\"></property-editor>\n          </li>\n        </ul>\n      </section>\n      <section class=\"expandable-group\"\n               *ngIf=\"!!activeControl\"\n               [attr.aria-expanded]=\"groups.triggers.expanded\">\n        <header class=\"expandable-group__header\"\n                (click)=\"groups.triggers.expanded = !groups.triggers.expanded\">\n          {{ groups.triggers.name }}\n        </header>\n        <ul class=\"expandable-group__list\">\n          <li class=\"expandable-group__item\" *ngFor=\"#property of groups.triggers.items\">\n            <trigger-property-editor [property]=\"property\" (remove)=\"removeTrigger(property)\"></trigger-property-editor>\n          </li>\n          <li class=\"expandable-group__item\">\n            <div class=\"vargin-editor__triggers\">\n              <div *ngIf=\"!groups.triggers.items.length\">(No triggers defined...)</div>\n              <button (click)=\"addTrigger()\" class=\"vargin-button-link\">\n                + Add new trigger\n              </button>\n            </div>\n          </li>\n        </ul>\n      </section>\n      <button class=\"vargin-properties__remove-control\" *ngIf=\"!!activeControl\"\n              (click)=\"removeControl()\">\n        Remove control\n      </button>\n      <div class=\"vargin-properties_empty\" *ngIf=\"!activeControl\">\n        (Select control...)\n      </div>\n    </section>\n  ",
                        directives: [common_1.NgFor, common_1.NgIf, property_editor_1.PropertyEditor, editor_1.TriggerPropertyEditor]
                    })
                ], VarginProperties);
                return VarginProperties;
            })();
            exports_1("default",VarginProperties);
        }
    }
});

System.register("src/editor/ts/services/workspace-service", ["src/core/services/utils-service", "src/compilers/json/json-application-compiler"], function(exports_1) {
    var utils_service_1, json_application_compiler_1;
    var DEFAULT_SERIALIZED_APPLICATION, EMPTY_SERIALIZED_APPLICATION, Workspace, WorkspaceService;
    return {
        setters:[
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            },
            function (json_application_compiler_1_1) {
                json_application_compiler_1 = json_application_compiler_1_1;
            }],
        execute: function() {
            DEFAULT_SERIALIZED_APPLICATION = {
                id: '4013f806-000b-4a91-b2ca-2f19c9138734',
                name: 'Messages App',
                description: 'Messages App Description',
                serviceRoot: {
                    id: 'bc5bcb33-f73b-440a-b72a-6596caed8b2e',
                    type: 'container',
                    children: [{
                            id: '2688dc02-9682-433f-aec5-06c6dcf67d63',
                            type: 'datasource',
                            overrides: {
                                root: {
                                    name: 'default',
                                    groups: [
                                        ['properties', [
                                                ['name', 'Messages DB'],
                                                ['schema', "[\n                {\"name\": \"Id\", \"type\": 1},\n                {\"name\": \"Sender\", \"type\": 0},\n                {\"name\": \"Body\", \"type\": 0},\n                {\"name\": \"Timestamp\", \"type\": 2},\n                {\"name\": \"HasUnread\", \"type\": 4},\n                {\"name\": \"HasDraft\", \"type\": 4}\n              ]"],
                                                ['items', ("[\n              [\n                [\"Id\", 1],\n                [\"Sender\", \"BIG-THREAD-MIXED\"],\n                [\"Body\", \"Hey Big Thread\"],\n                [\"Timestamp\", " + Date.UTC(2015, 1, 10, 10, 20) + "],\n                [\"HasUnread\", false],\n                [\"HasDraft\", true]\n              ], [\n                [\"Id\", 2],\n                [\"Sender\", \"BIG-THREAD-SMS\"],\n                [\"Body\", \"message sms message\"],\n                [\"Timestamp\", " + Date.UTC(2015, 1, 10, 10, 15) + "],\n                [\"HasUnread\", false],\n                [\"HasDraft\", false]\n              ], [\n                [\"Id\", 3],\n                [\"Sender\", \"+123456789\"],\n                [\"Body\", \"message from unknown\"],\n                [\"Timestamp\", " + Date.UTC(2015, 1, 5, 14, 17) + "],\n                [\"HasUnread\", false],\n                [\"HasDraft\", false]\n              ], [\n                [\"Id\", 4],\n                [\"Sender\", \"+987654321\"],\n                [\"Body\", \"your balance is xxx\"],\n                [\"Timestamp\", " + Date.UTC(2015, 1, 3, 17, 18) + "],\n                [\"HasUnread\", true],\n                [\"HasDraft\", false]\n              ], [\n                [\"Id\", 5],\n                [\"Sender\", \"+978563412\"],\n                [\"Body\", \"call me back\"],\n                [\"Timestamp\", " + Date.UTC(2015, 1, 3, 15, 20) + "],\n                [\"HasUnread\", false],\n                [\"HasDraft\", false]\n              ], [\n                [\"Id\", 6],\n                [\"Sender\", \"Friend\"],\n                [\"Body\", \"How are you?\"],\n                [\"Timestamp\", " + Date.UTC(2015, 1, 2, 10, 10) + "],\n                [\"HasUnread\", true],\n                [\"HasDraft\", false]\n              ], [\n                [\"Id\", 7],\n                [\"Sender\", \"Operator\"],\n                [\"Body\", \"New service is added!\"],\n                [\"Timestamp\", " + Date.UTC(2015, 1, 2, 5, 30) + "],\n                [\"HasUnread\", false],\n                [\"HasDraft\", false]\n              ], [\n                [\"Id\", 8],\n                [\"Sender\", \"Bina Laikova\"],\n                [\"Body\", \"Are you sure?\"],\n                [\"Timestamp\", " + Date.UTC(2015, 1, 1, 20, 45) + "],\n                [\"HasUnread\", false],\n                [\"HasDraft\", false]\n              ], [\n                [\"Id\", 9],\n                [\"Sender\", \"Zona Lamber\"],\n                [\"Body\", \"....waiting.... for you!\"],\n                [\"Timestamp\", " + Date.UTC(2015, 1, 1, 19, 5) + "],\n                [\"HasUnread\", true],\n                [\"HasDraft\", false]\n              ], [\n                [\"Id\", 10],\n                [\"Sender\", \"+101010101\"],\n                [\"Body\", \"Welcome in ONetwork\"],\n                [\"Timestamp\", " + Date.UTC(2015, 1, 1, 10, 10) + "],\n                [\"HasUnread\", false],\n                [\"HasDraft\", true]\n              ]\n            ]")]
                                            ]]
                                    ]
                                }
                            }
                        }]
                },
                pages: [{
                        id: '29280d16-6d39-42fb-9a0e-b51a49cb266a',
                        name: 'Inbox',
                        root: {
                            id: '29280d16-6d39-42fb-9a0e-b51a49cb266b',
                            type: 'container',
                            overrides: {
                                root: {
                                    name: 'default',
                                    groups: [
                                        ['styles', [
                                                ['background-color', '#ffffff'],
                                                ['display', 'flex'],
                                                ['flex-direction', 'column'],
                                                ['min-height', '30rem']
                                            ]]
                                    ]
                                }
                            },
                            children: [{
                                    id: '832cfe61-346e-4666-b918-eb3581dfe95b',
                                    type: 'container',
                                    overrides: {
                                        root: {
                                            name: 'default',
                                            groups: [
                                                ['styles', [
                                                        ['color', '#ffffff'],
                                                        ['background-color', '#27c8c2'],
                                                        ['border', 'none'],
                                                        ['display', 'flex'],
                                                        ['font-size', '1.5rem'],
                                                        ['justify-content', 'space-between'],
                                                        ['min-height', '0'],
                                                        ['padding', '0.4rem 0.3rem']
                                                    ]]
                                            ]
                                        }
                                    },
                                    children: [{
                                            id: '949d4260-dec6-487c-af3d-cfe18f83dfe8',
                                            type: 'label',
                                            overrides: {
                                                root: {
                                                    name: 'default',
                                                    groups: [
                                                        ['properties', [
                                                                ['text', 'Messages'],
                                                                ['title', '']
                                                            ]],
                                                        ['styles', [
                                                                ['display', 'flex'],
                                                                ['flex-grow', '1'],
                                                                ['justify-content', 'center']
                                                            ]]
                                                    ]
                                                }
                                            }
                                        }, {
                                            id: '3688dc02-9682-433f-aec5-06c6dcf37d63',
                                            type: 'link',
                                            overrides: {
                                                root: {
                                                    name: 'default',
                                                    groups: [
                                                        ['properties', [
                                                                ['address', '1:7544cda3-62a4-49f6-9a7f-a7b7370823e3'],
                                                                ['text', '\uD83D\uDD89'],
                                                                ['title', 'New Message'],
                                                                ['target', '_self']
                                                            ]],
                                                        ['styles', [
                                                                ['color', '#ffffff'],
                                                                ['font-weight', 'bold'],
                                                                ['padding', '0 1rem'],
                                                                ['text-decoration', 'none']
                                                            ]]
                                                    ]
                                                }
                                            }
                                        }, {
                                            id: 'f8655539-b9a4-42f4-879a-a915496b899a',
                                            type: 'button',
                                            overrides: {
                                                root: {
                                                    name: 'default',
                                                    groups: [
                                                        ['properties', [
                                                                ['text', '…'],
                                                                ['title', 'Show Options'],
                                                                ['type', 'button']
                                                            ]],
                                                        ['styles', [
                                                                ['font-weight', 'bold']
                                                            ]],
                                                        ['events', [
                                                                ['click', "[{\n                    \"type\": \"alert-action\",\n                    \"overrides\": {\n                      \"root\": {\n                        \"name\": \"default\",\n                        \"groups\": [[\n                          \"properties\",\n                          [[\"alert-message\", \"Show options (not implemented)\"]]\n                        ]]\n                      }\n                    }\n                  }]"]
                                                            ]]
                                                    ]
                                                }
                                            }
                                        }]
                                }, {
                                    id: 'fa852827-5ca9-49fd-8b7b-c59e93bad795',
                                    type: 'container',
                                    overrides: {
                                        root: {
                                            name: 'default',
                                            groups: [
                                                ['styles', [
                                                        ['border', 'none'],
                                                        ['display', 'flex'],
                                                        ['flex-grow', '1'],
                                                        ['justify-content', 'center']
                                                    ]]
                                            ]
                                        }
                                    },
                                    children: [{
                                            id: 'fa852827-5ca9-49fd-8b7b-c59e93bad895',
                                            type: 'list',
                                            overrides: {
                                                root: {
                                                    name: 'default',
                                                    groups: [
                                                        ['properties', [
                                                                ['datasource', '2688dc02-9682-433f-aec5-06c6dcf67d63']
                                                            ]],
                                                        ['styles', [
                                                                ['flex-grow', '1'],
                                                                ['min-width', '10rem']
                                                            ]]
                                                    ]
                                                }
                                            },
                                            children: [{
                                                    id: '3788dc02-9682-433f-aec5-06c6dcf67d63',
                                                    type: 'list-item',
                                                    overrides: {
                                                        root: {
                                                            name: 'default',
                                                            groups: [
                                                                ['styles', [
                                                                        ['border', 'none'],
                                                                        ['display', 'flex'],
                                                                        ['margin', '0 0 0.5rem'],
                                                                        ['min-height', 'auto'],
                                                                        ['padding', '0.5rem 0']
                                                                    ]]
                                                            ]
                                                        }
                                                    },
                                                    children: [{
                                                            id: '4788dc02-9782-443f-aec5-06c6dcf67d63',
                                                            type: 'container',
                                                            overrides: {
                                                                root: {
                                                                    name: 'default',
                                                                    groups: [
                                                                        ['styles', [
                                                                                ['align-items', 'center'],
                                                                                ['display', 'flex'],
                                                                                ['justify-content', 'center'],
                                                                                ['min-height', 'auto'],
                                                                                ['min-width', '1rem']
                                                                            ]]
                                                                    ]
                                                                }
                                                            },
                                                            children: [{
                                                                    id: '4788dc02-9883-453f-aec5-07c7dcf67d63',
                                                                    type: 'label',
                                                                    overrides: {
                                                                        root: {
                                                                            name: 'default',
                                                                            groups: [
                                                                                ['properties', [
                                                                                        ['text', '\u25CF']
                                                                                    ]],
                                                                                ['styles', [
                                                                                        ['font-size', '0.5rem'],
                                                                                        ['margin', '0 0.5rem 0 0'],
                                                                                        ['opacity', '0']
                                                                                    ]]
                                                                            ],
                                                                            children: [{
                                                                                    name: 'HasUnread',
                                                                                    groups: [
                                                                                        ['styles', [
                                                                                                ['color', '#52B6CC'],
                                                                                                ['opacity', '1']
                                                                                            ]]
                                                                                    ]
                                                                                }, {
                                                                                    name: 'HasDraft',
                                                                                    groups: [
                                                                                        ['properties', [
                                                                                                ['text', '\u270E']
                                                                                            ]],
                                                                                        ['styles', [
                                                                                                ['color', '#52B6CC'],
                                                                                                ['font-size', '1rem'],
                                                                                                ['margin', '0 0.5rem 0 -0.5rem'],
                                                                                                ['opacity', '1']
                                                                                            ]]
                                                                                    ]
                                                                                }]
                                                                        }
                                                                    },
                                                                    triggers: [{
                                                                            name: 'HasUnread',
                                                                            condition: '{{HasUnread}} = true',
                                                                            actions: [{
                                                                                    type: 'change-own-overrides-action',
                                                                                    overrides: {
                                                                                        root: {
                                                                                            name: 'default',
                                                                                            groups: [[
                                                                                                    'properties', [['overrides-name', 'HasUnread']]
                                                                                                ]]
                                                                                        }
                                                                                    }
                                                                                }]
                                                                        }, {
                                                                            name: 'HasDraft',
                                                                            condition: '{{HasDraft}} = true',
                                                                            actions: [{
                                                                                    type: 'change-own-overrides-action',
                                                                                    overrides: {
                                                                                        root: {
                                                                                            name: 'default',
                                                                                            groups: [[
                                                                                                    'properties', [['overrides-name', 'HasDraft']]
                                                                                                ]]
                                                                                        }
                                                                                    }
                                                                                }]
                                                                        }]
                                                                }]
                                                        }, {
                                                            id: '4788dc02-9782-453f-aec5-06c6dcf67d63',
                                                            type: 'container',
                                                            overrides: {
                                                                root: {
                                                                    name: 'default',
                                                                    groups: [
                                                                        ['styles', [
                                                                                ['flex-grow', '1'],
                                                                                ['min-height', 'auto'],
                                                                                ['min-width', '2rem']
                                                                            ]]
                                                                    ]
                                                                }
                                                            },
                                                            children: [{
                                                                    id: '4788dc02-9782-453f-aec5-07c7dcf67d63',
                                                                    type: 'label',
                                                                    overrides: {
                                                                        root: {
                                                                            name: 'default',
                                                                            groups: [
                                                                                ['properties', [
                                                                                        ['text', 'bind:Sender']
                                                                                    ]],
                                                                                ['styles', [
                                                                                        ['display', 'block'],
                                                                                        ['margin', '0 0 0.5rem']
                                                                                    ]]
                                                                            ]
                                                                        }
                                                                    }
                                                                }, {
                                                                    id: '5788dc06-9782-453f-aec5-07c7dcf67d63',
                                                                    type: 'container',
                                                                    overrides: {
                                                                        root: {
                                                                            name: 'default',
                                                                            groups: [
                                                                                ['styles', [
                                                                                        ['color', '#868686'],
                                                                                        ['min-height', 'auto']
                                                                                    ]]
                                                                            ]
                                                                        }
                                                                    },
                                                                    children: [{
                                                                            id: '4788dc05-9791-453a-aec5-07c7dcf67d63',
                                                                            type: 'label',
                                                                            overrides: {
                                                                                root: {
                                                                                    name: 'default',
                                                                                    groups: [
                                                                                        ['properties', [
                                                                                                ['text', 'bind:Timestamp'],
                                                                                                ['format', '4']
                                                                                            ]],
                                                                                        ['styles', [
                                                                                                ['margin', '0 0.5rem 0 0'],
                                                                                                ['min-height', 'auto']
                                                                                            ]]
                                                                                    ]
                                                                                }
                                                                            }
                                                                        }, {
                                                                            id: '4788dc15-9795-453a-aec5-07c7dcf67d63',
                                                                            type: 'label',
                                                                            overrides: {
                                                                                root: {
                                                                                    name: 'default',
                                                                                    groups: [
                                                                                        ['properties', [
                                                                                                ['text', 'bind:Body']
                                                                                            ]]
                                                                                    ]
                                                                                }
                                                                            }
                                                                        }]
                                                                }]
                                                        }]
                                                }]
                                        }]
                                }]
                        }
                    }, {
                        id: '7544cda3-62a4-49f6-9a7f-a7b7370823e3',
                        name: 'New Message',
                        root: {
                            id: 'bc5bcb33-f72b-440a-b72a-6596caed8b2e',
                            type: 'container',
                            overrides: {
                                root: {
                                    name: 'default',
                                    groups: [
                                        ['styles', [
                                                ['background-color', '#ffffff'],
                                                ['display', 'flex'],
                                                ['flex-direction', 'column'],
                                                ['min-height', '30rem']
                                            ]]
                                    ]
                                }
                            },
                            children: [{
                                    id: '732cfe61-346e-4666-b918-eb3581dfe95b',
                                    type: 'container',
                                    overrides: {
                                        root: {
                                            name: 'default',
                                            groups: [
                                                ['styles', [
                                                        ['color', '#ffffff'],
                                                        ['background-color', '#27c8c2'],
                                                        ['border', 'none'],
                                                        ['display', 'flex'],
                                                        ['font-size', '1.5rem'],
                                                        ['justify-content', 'space-between'],
                                                        ['min-height', '0'],
                                                        ['padding', '0.4rem 0.3rem']
                                                    ]
                                                ]]
                                        }
                                    },
                                    children: [{
                                            id: '2688dc02-9682-433f-aec5-06c6dcf37d63',
                                            type: 'link',
                                            overrides: {
                                                root: {
                                                    name: 'default',
                                                    groups: [
                                                        ['properties', [
                                                                ['address', '1:29280d16-6d39-42fb-9a0e-b51a49cb266a'],
                                                                ['text', '\u3008'],
                                                                ['title', 'Go to Inbox'],
                                                                ['target', '_self']
                                                            ]],
                                                        ['styles', [
                                                                ['color', '#ffffff'],
                                                                ['font-weight', 'bold'],
                                                                ['text-decoration', 'none']
                                                            ]]
                                                    ]
                                                }
                                            }
                                        }, {
                                            id: '939d4260-dec6-487c-af3d-cfe18f83dfe8',
                                            type: 'label',
                                            overrides: {
                                                root: {
                                                    name: 'default',
                                                    groups: [
                                                        ['properties', [
                                                                ['text', 'New Message'],
                                                                ['title', '']
                                                            ]]
                                                    ]
                                                }
                                            }
                                        }, {
                                            id: 'e8655539-b9a4-42f4-879a-a915496b899a',
                                            type: 'button',
                                            overrides: {
                                                root: {
                                                    name: 'default',
                                                    groups: [
                                                        ['properties', [
                                                                ['text', '…'],
                                                                ['title', 'Show Options'],
                                                                ['type', 'button']
                                                            ]],
                                                        ['styles', [
                                                                ['font-weight', 'bold']
                                                            ]],
                                                        ['events', [
                                                                ['click', "[{\n                    \"type\": \"alert-action\",\n                    \"overrides\": {\n                      \"root\": {\n                        \"name\": \"default\",\n                        \"groups\": [[\n                          \"properties\",\n                          [[\"alert-message\", \"Show options (not implemented)\"]]\n                        ]]\n                      }\n                    }\n                  }]"]
                                                            ]]
                                                    ]
                                                }
                                            }
                                        }]
                                }, {
                                    id: '764d7257-de9c-4ced-ae34-b2e8d47b1768',
                                    type: 'container',
                                    overrides: {
                                        root: {
                                            name: 'default',
                                            groups: [
                                                ['styles', [
                                                        ['align-items', 'center'],
                                                        ['background-color', '#f2f2f2'],
                                                        ['border', 'none'],
                                                        ['display', 'flex'],
                                                        ['min-height', '0'],
                                                        ['padding', '0.5rem']
                                                    ]]
                                            ]
                                        }
                                    },
                                    children: [{
                                            id: '033f8633-a495-4d48-8bd9-69721031499a',
                                            type: 'label',
                                            overrides: {
                                                root: {
                                                    name: 'default',
                                                    groups: [
                                                        ['properties', [
                                                                ['text', 'To:'],
                                                                ['title', '']
                                                            ]],
                                                        ['styles', [
                                                                ['padding', '0 0.4rem 0 0.2rem']
                                                            ]]
                                                    ]
                                                }
                                            }
                                        }, {
                                            id: '387f4b5a-d879-4ff3-9cc6-e6048fb7347b',
                                            type: 'text-input',
                                            overrides: {
                                                root: {
                                                    name: 'default',
                                                    groups: [
                                                        ['properties', [
                                                                ['placeholder', 'Type contact name or number...'],
                                                                ['value', '']
                                                            ]],
                                                        ['styles', [
                                                                ['flex-grow', '1'],
                                                                ['border', 'none']
                                                            ]]
                                                    ]
                                                }
                                            }
                                        }, {
                                            id: 'cc5478d7-6c26-4ca9-9381-336a40446426',
                                            type: 'button',
                                            overrides: {
                                                root: {
                                                    name: 'default',
                                                    groups: [
                                                        ['properties', [
                                                                ['text', '+'],
                                                                ['title', 'Add contact'],
                                                                ['type', 'button']
                                                            ]],
                                                        ['styles', [
                                                                ['background-color', '#ffffff'],
                                                                ['border', '0.1rem solid transparent'],
                                                                ['border-radius', '3rem'],
                                                                ['font-size', '0.8rem'],
                                                                ['height', '1.5rem'],
                                                                ['padding', '0 0.25rem']
                                                            ]]
                                                    ]
                                                }
                                            }
                                        }]
                                }, {
                                    id: 'ea852827-5ca9-49fd-8b7b-c59e93bad795',
                                    type: 'container',
                                    overrides: {
                                        root: {
                                            name: 'default',
                                            groups: [
                                                ['styles', [
                                                        ['background-color', '#e1f0ec'],
                                                        ['border', 'none'],
                                                        ['display', 'flex'],
                                                        ['flex-grow', '1'],
                                                        ['justify-content', 'center']
                                                    ]]
                                            ]
                                        }
                                    },
                                    children: [{
                                            id: '1d6e60c0-7ee7-4d4f-b666-3086d0885617',
                                            type: 'label',
                                            overrides: {
                                                root: {
                                                    name: 'default',
                                                    groups: [
                                                        ['properties', [
                                                                ['text', '[Message Status]'],
                                                                ['title', '']
                                                            ]],
                                                        ['styles', [
                                                                ['font-size', '2rem'],
                                                                ['display', 'flex']
                                                            ]]
                                                    ]
                                                }
                                            }
                                        }],
                                }, {
                                    id: 'c69f0b0c-c7d0-4ff9-927f-358677a224e6',
                                    type: 'container',
                                    overrides: {
                                        root: {
                                            name: 'default',
                                            groups: [
                                                ['styles', [
                                                        ['display', 'flex'],
                                                        ['border', 'none'],
                                                        ['justify-content', 'space-between'],
                                                        ['min-height', '2rem'],
                                                        ['min-width', '5rem']
                                                    ]]
                                            ]
                                        }
                                    },
                                    children: [{
                                            id: '96132230-2b08-4159-a4f5-a3d2b86e2e19',
                                            type: 'button',
                                            overrides: {
                                                root: {
                                                    name: 'default',
                                                    groups: [
                                                        ['properties', [
                                                                ['text', ''],
                                                                ['title', 'Add attachment'],
                                                                ['type', 'button']
                                                            ]],
                                                        ['styles', [
                                                                ['background-image', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAByElEQVR4Ae3XvUvUcRzA8V8JF4ggWXmYdCWFlUMPhg0lWA3hVlMt4dhW/0BEgVtDQVBBUENNBRJu0lCLNPRAmWFhaRZldXXyO1JROb1eg0Pc8IV7sCAbXtvny3u63+dzUT6f/yuWcTjq6flT/p3wAe6RIccol2hcqvAKLrDAK7o5zTViMnRUOlzFdfKcYyXRb+p5TEyqUuEqbrPAqcBckixXKxFOcJd5ThKFcJOxcsOr6CVHF1EQnGemnHA1fcxxLDC3gRNEi24xUmq4hofMciQw18Qo46wmxRQXSwnX0s80nYG5Zj7yia2s5SVpksWG63jKJAcDcy184T1NJBkkZm+xv+N6XhDTHojuJs0wKRp5ww9ai/1yNTDEBG2BaBsTDNHAJkb4yo5iv9Up3pJmVyDaTpbn1LOFD3xmW7FLYh2jjNMSiB5ikifUsZ1xxthcyna6QUxz4HEn0/RTy06+8Y6Npa7F71wOPDzKLA+oYQ8ZXrO+nH08RTcRhY4zRx/V7CNmgGS5h8B9hqkueNBFjl4SdPCTZ6ypxAXSygyDdHGYK8xzhwQRZ3hEbSVPn/0MkF+U5SxVhetxqW6uRlpI/L8yy7BM/8L8AiXgms8p1f8rAAAAAElFTkSuQmCC)'],
                                                                ['background-repeat', 'no-repeat'],
                                                                ['padding', '1rem']
                                                            ]]
                                                    ]
                                                }
                                            }
                                        }, {
                                            id: '8c1f13a5-3088-407f-b1f7-723ae1143154',
                                            type: 'text-input',
                                            overrides: {
                                                root: {
                                                    name: 'default',
                                                    groups: [
                                                        ['properties', [
                                                                ['placeholder', 'Type message...'],
                                                                ['value', '']
                                                            ]],
                                                        ['styles', [
                                                                ['border', 'none'],
                                                                ['flex-grow', '1']
                                                            ]]
                                                    ]
                                                }
                                            }
                                        }, {
                                            id: 'f5896530-2ed4-4fd7-a533-40236df217b3',
                                            type: 'button',
                                            overrides: {
                                                root: {
                                                    name: 'default',
                                                    groups: [
                                                        ['properties', [
                                                                ['text', ''],
                                                                ['title', 'Send message'],
                                                                ['type', 'submit']
                                                            ]],
                                                        ['styles', [
                                                                ['background-image', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAA60lEQVR42u3VPQtBURjAcbqU1SJWJTtfgGKSwcJm8hW8ZL3KJ8CK/Q7KXSzyGQwmi2RgtSCO/2CQxHVfjuU89Zv/ne655/GpUSN3DGOEMgKywy0IbNBAWFY4igvEwxE9JGXEJxAvrjCRg9+rcBHigyVqCLkdDmAH8cUeOqJuxrsQFp0wRsqNcAI3iB8tUILmJD6HsGmNjJO4hjiyqKKNAaZYfYmbdqMz+SfmlNK/8SPcsXGr005vtIatheABOmJu/cOFf71cxpvYDSby8HvxTkdwftlOfc+3E4H60z5uytzHQ1QQ9KlRo8bi3AEJOr0MDjN9yQAAAABJRU5ErkJggg==)'],
                                                                ['background-repeat', 'no-repeat'],
                                                                ['padding', '1rem']
                                                            ]],
                                                        ['events', [
                                                                ['click', "[{\n                    \"type\": \"change-property-action\",\n                    \"overrides\": {\n                      \"root\": {\n                        \"name\": \"default\",\n                        \"groups\": [[\n                          \"properties\",\n                          [\n                            [\"control-id\", \"1d6e60c0-7ee7-4d4f-b666-3086d0885617\"],\n                            [\"property-name\", \"text\"],\n                            [\"property-value\", \"[Message Sent!]\"]\n                          ]\n                        ]]\n                      }\n                    }\n                  }]"]
                                                            ]]
                                                    ]
                                                }
                                            }
                                        }]
                                }]
                        }
                    }]
            };
            EMPTY_SERIALIZED_APPLICATION = {
                id: '4013f806-000b-4a91-b2ca-2f19c9138734',
                name: '(Empty App)',
                description: 'Empty App Description',
                serviceRoot: {
                    id: 'bc5bcb33-f73b-440a-b72a-6596caed8b2e',
                    type: 'container'
                },
                pages: [{
                        id: '7544cda3-62a4-49f6-9a7f-a7b7370823e3',
                        name: '(Default Page)',
                        root: {
                            id: 'bc5bcb33-f72b-440a-b72a-6596caed8b2e',
                            type: 'container'
                        }
                    }]
            };
            Workspace = (function () {
                function Workspace(id, name, application) {
                    this._id = id;
                    this._name = name;
                    this._application = application;
                }
                Object.defineProperty(Workspace.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Workspace.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Workspace.prototype, "application", {
                    get: function () {
                        return this._application;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Workspace;
            })();
            exports_1("Workspace", Workspace);
            WorkspaceService = (function () {
                function WorkspaceService() {
                }
                WorkspaceService.init = function () {
                    return (new json_application_compiler_1.JSONApplicationCompiler()).decompile(JSON.stringify(DEFAULT_SERIALIZED_APPLICATION)).then(function (application) {
                        WorkspaceService.workspace = WorkspaceService.create(application);
                    });
                };
                WorkspaceService.create = function (application) {
                    return new Workspace(utils_service_1.UtilsService.uuid(), '(Default)', application);
                };
                WorkspaceService.reset = function () {
                    return (new json_application_compiler_1.JSONApplicationCompiler()).decompile(JSON.stringify(EMPTY_SERIALIZED_APPLICATION)).then(function (application) {
                        WorkspaceService.workspace = WorkspaceService.create(application);
                        return WorkspaceService.workspace;
                    });
                };
                return WorkspaceService;
            })();
            exports_1("WorkspaceService", WorkspaceService);
        }
    }
});

System.register("src/editor/ts/services/dialog-service", ["angular2/core", "src/core/services/utils-service"], function(exports_1) {
    var core_1, utils_service_1;
    var DialogService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            }],
        execute: function() {
            DialogService = (function () {
                function DialogService() {
                }
                DialogService.show = function (component, providers) {
                    if (providers === void 0) { providers = []; }
                    var dialogRequest = {
                        uuid: utils_service_1.UtilsService.uuid(),
                        component: component,
                        providers: providers
                    };
                    var dialogDeferred = new utils_service_1.Deferred();
                    this.dialogs.set(dialogRequest.uuid, dialogDeferred);
                    DialogService.onRequest.next(dialogRequest);
                    return dialogDeferred.promise;
                };
                DialogService.hide = function (uuid, value) {
                    var dialogDeferred = this.dialogs.get(uuid);
                    if (dialogDeferred) {
                        dialogDeferred.resolve(value);
                        this.dialogs.delete(uuid);
                    }
                };
                DialogService.onRequest = new core_1.EventEmitter();
                DialogService.dialogs = new Map();
                return DialogService;
            })();
            exports_1("DialogService", DialogService);
            exports_1("default",DialogService);
        }
    }
});

System.register("src/editor/ts/dialog-manager/dialog-manager", ["angular2/core", "src/editor/ts/services/dialog-service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, dialog_service_1;
    var DialogManager;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dialog_service_1_1) {
                dialog_service_1 = dialog_service_1_1;
            }],
        execute: function() {
            DialogManager = (function () {
                function DialogManager(renderer, componentLoader, viewContainer) {
                    this.instances = [];
                    this.renderer = renderer;
                    this.componentLoader = componentLoader;
                    this.viewContainer = viewContainer;
                    dialog_service_1.DialogService.onRequest.subscribe(this.onDialogRequested.bind(this));
                }
                DialogManager.prototype.close = function (value) {
                    if (this.instances.length) {
                        var instance = this.instances.pop();
                        instance.component.dispose();
                        dialog_service_1.DialogService.hide(instance.uuid, value);
                    }
                    if (this.instances.length === 0) {
                        this.renderer.setElementClass(this.viewContainer.element.nativeElement, 'dialog-manager_visible', false);
                    }
                };
                DialogManager.prototype.onDialogRequested = function (dialogRequest) {
                    var _this = this;
                    this.componentLoader.loadIntoLocation(dialogRequest.component, this.viewContainer.element, 'placeholder', core_1.Injector.resolve(dialogRequest.providers.concat([
                        core_1.provide('dispose', { useValue: function (value) { return _this.close(value); } })
                    ]))).then(function (component) {
                        _this.instances.push({ component: component, uuid: dialogRequest.uuid });
                        if (_this.instances.length === 1) {
                            _this.renderer.setElementClass(_this.viewContainer.element.nativeElement, 'dialog-manager_visible', true);
                        }
                    });
                };
                DialogManager = __decorate([
                    core_1.Component({
                        selector: 'dialog-manager'
                    }),
                    core_1.View({
                        template: "<section class=\"dialog-manager__container\" (click)=\"close()\">\n               <div class=\"dialog-manager__content\" (click)=\"$event.stopPropagation()\">\n                 <div #placeholder hidden></div>\n               </div>\n             </section>"
                    }),
                    __param(0, core_1.Inject(core_1.Renderer)),
                    __param(1, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(2, core_1.Inject(core_1.ViewContainerRef))
                ], DialogManager);
                return DialogManager;
            })();
            exports_1("DialogManager", DialogManager);
        }
    }
});

System.register("src/editor/ts/vargin-editor", ["angular2/platform/browser", "angular2/core", "src/editor/ts/expandable-groups/expandable-groups", "src/editor/ts/workspace/workspace", "src/editor/ts/properties/properties", "src/editor/ts/services/workspace-service", "src/editor/ts/dialog-manager/dialog-manager", "src/core/application", "src/core/controls/control-group", "src/core/services/control-service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var browser_1, core_1, expandable_groups_1, workspace_1, properties_1, workspace_service_1, dialog_manager_1, application_1, control_group_1, control_service_1;
    var Vargin;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (expandable_groups_1_1) {
                expandable_groups_1 = expandable_groups_1_1;
            },
            function (workspace_1_1) {
                workspace_1 = workspace_1_1;
            },
            function (properties_1_1) {
                properties_1 = properties_1_1;
            },
            function (workspace_service_1_1) {
                workspace_service_1 = workspace_service_1_1;
            },
            function (dialog_manager_1_1) {
                dialog_manager_1 = dialog_manager_1_1;
            },
            function (application_1_1) {
                application_1 = application_1_1;
            },
            function (control_group_1_1) {
                control_group_1 = control_group_1_1;
            },
            function (control_service_1_1) {
                control_service_1 = control_service_1_1;
            }],
        execute: function() {
            Vargin = (function () {
                function Vargin() {
                    this.controlGroups = [
                        this.controlGroupToExpandableGroup(control_group_1.ControlGroup.register('visual', 'Visual', 'Visual components', [
                            control_service_1.ControlService.getMetadata('label'),
                            control_service_1.ControlService.getMetadata('link'),
                            control_service_1.ControlService.getMetadata('list'),
                            control_service_1.ControlService.getMetadata('button'),
                            control_service_1.ControlService.getMetadata('container'),
                            control_service_1.ControlService.getMetadata('range'),
                            control_service_1.ControlService.getMetadata('text-input')
                        ])),
                        this.controlGroupToExpandableGroup(control_group_1.ControlGroup.register('service', 'Service', 'Service components', [control_service_1.ControlService.getMetadata('datasource')]))
                    ];
                }
                Vargin.prototype.controlGroupToExpandableGroup = function (controlGroup) {
                    return {
                        name: controlGroup.name,
                        type: controlGroup.type,
                        expanded: false,
                        items: controlGroup.items.map(function (control) {
                            return {
                                name: control.name,
                                type: control.type
                            };
                        })
                    };
                };
                Vargin = __decorate([
                    core_1.Component({
                        selector: 'vargin'
                    }),
                    core_1.View({
                        template: "\n    <article class=\"vargin-editor\">\n      <section class=\"vargin-editor__components\">\n        <expandable-groups [groups]=\"controlGroups\"></expandable-groups>\n      </section>\n      <section class=\"vargin-editor__workspace\">\n        <vargin-workspace></vargin-workspace>\n      </section>\n      <section class=\"vargin-editor__properties\">\n        <vargin-properties></vargin-properties>\n      </section>\n    </article>\n    <dialog-manager></dialog-manager>\n  ",
                        directives: [
                            dialog_manager_1.DialogManager, expandable_groups_1.VarginExpandableGroups, workspace_1.default, properties_1.default
                        ]
                    })
                ], Vargin);
                return Vargin;
            })();
            workspace_service_1.WorkspaceService.init().then(function () {
                browser_1.bootstrap(Vargin, [
                    core_1.provide(workspace_service_1.Workspace, { useFactory: function () { return workspace_service_1.WorkspaceService.workspace; } }),
                    core_1.provide(application_1.Application, {
                        useFactory: function () { return workspace_service_1.WorkspaceService.workspace.application; }
                    })
                ]);
            });
        }
    }
});
