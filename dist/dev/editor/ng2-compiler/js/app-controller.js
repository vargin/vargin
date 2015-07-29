System.register("src/compilers/angular/template/components/container-component", ["angular2/core", "src/compilers/angular/template/services/application-service", "src/core/controls/control", "src/compilers/angular/template/components/base-component"], function(exports_1) {
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
    var core_1, application_service_1, control_1, base_component_1;
    var ContainerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (application_service_1_1) {
                application_service_1 = application_service_1_1;
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
                function ContainerComponent(viewContainer, iterableDiffers, changeDetector, loader, applicationService, control) {
                    _super.call(this, viewContainer, iterableDiffers, changeDetector, loader, applicationService, control);
                }
                ContainerComponent = __decorate([
                    core_1.Component({
                        selector: 'div[vargin-type=container]',
                        properties: ['control'],
                        inputs: ['control'],
                        host: {
                            '[class]': 'cssClass'
                        }
                    }),
                    core_1.View({
                        template: "<div class=\"vargin-dynamic-anchor\" #container hidden></div>"
                    }),
                    __param(0, core_1.Inject(core_1.ViewContainerRef)),
                    __param(1, core_1.Inject(core_1.IterableDiffers)),
                    __param(2, core_1.Inject(core_1.ChangeDetectorRef)),
                    __param(3, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(4, core_1.Inject(application_service_1.ApplicationService)),
                    __param(5, core_1.Optional()),
                    __param(5, core_1.Inject(control_1.Control))
                ], ContainerComponent);
                return ContainerComponent;
            })(base_component_1.BaseComponent);
            exports_1("ContainerComponent", ContainerComponent);
        }
    }
});

System.register("src/compilers/angular/template/page-controller", ["angular2/core", "angular2/router", "src/compilers/angular/template/services/application-service", "src/compilers/angular/template/components/container-component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, router_1, application_service_1, container_component_1;
    var PageController;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (application_service_1_1) {
                application_service_1 = application_service_1_1;
            },
            function (container_component_1_1) {
                container_component_1 = container_component_1_1;
            }],
        execute: function() {
            PageController = (function () {
                function PageController(params, applicationService) {
                    this.applicationService = applicationService;
                    var pageId = params && params.get('id');
                    this.page = pageId ? applicationService.application.pages.find(function (page) { return page.id === pageId; }) : applicationService.application.pages[0];
                }
                PageController.prototype.getControl = function (controlId) {
                    return this.page.root.find(controlId);
                };
                ;
                PageController.prototype.ngDoCheck = function () {
                    var _this = this;
                    this.controlsWithTriggers = [];
                    this.findControlsWithTriggers(this.page.root);
                    for (var _i = 0, _a = this.controlsWithTriggers; _i < _a.length; _i++) {
                        var control = _a[_i];
                        for (var _b = 0, _c = control.triggers; _b < _c.length; _b++) {
                            var trigger = _c[_b];
                            var isTriggerApplicable = trigger.isApplicable(function (type, value) {
                                if (type === 'control-binding') {
                                    return control.getProperty(value).getValue();
                                }
                                else if (type === 'data-binding') {
                                    var dataItem = _this.getDataItem(control);
                                    return dataItem ? dataItem.get(value) : '';
                                }
                                throw new Error('Not supported');
                            });
                            if (isTriggerApplicable) {
                                trigger.actions.forEach(function (action) {
                                    action.perform(_this.applicationService.application, control);
                                });
                            }
                        }
                    }
                };
                PageController.prototype.findControlsWithTriggers = function (control) {
                    if (control.isTemplate) {
                        return;
                    }
                    if (control.triggers.length) {
                        this.controlsWithTriggers.push(control);
                    }
                    for (var _i = 0, _a = control.getChildren(); _i < _a.length; _i++) {
                        var child = _a[_i];
                        this.findControlsWithTriggers(child);
                    }
                };
                PageController.prototype.getDataItem = function (control) {
                    while (control.parent) {
                        var datasourceProperty = control.parent.getProperty('datasource');
                        if (datasourceProperty) {
                            return this.applicationService.datasources.get(datasourceProperty.getValue()).items[control.parent.getChildren().indexOf(control)];
                        }
                        control = control.parent;
                    }
                    return null;
                };
                PageController = __decorate([
                    core_1.Component({
                        selector: 'page'
                    }),
                    core_1.View({
                        template: "\n    <div vargin-type=\"container\" [control]=\"page?.root\"></div>\n  ",
                        directives: [container_component_1.ContainerComponent]
                    }),
                    __param(0, core_1.Inject(router_1.RouteParams)),
                    __param(1, core_1.Inject(application_service_1.ApplicationService))
                ], PageController);
                return PageController;
            })();
            exports_1("PageController", PageController);
        }
    }
});

System.register("src/compilers/angular/template/app-controller", ["angular2/platform/browser", "angular2/core", "angular2/router", "src/compilers/angular/template/services/application-service", "src/compilers/angular/template/page-controller"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var browser_1, core_1, router_1, application_service_1, page_controller_1;
    var AppController;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (application_service_1_1) {
                application_service_1 = application_service_1_1;
            },
            function (page_controller_1_1) {
                page_controller_1 = page_controller_1_1;
            }],
        execute: function() {
            AppController = (function () {
                function AppController() {
                }
                AppController = __decorate([
                    core_1.Component({
                        selector: 'angular-app'
                    }),
                    core_1.View({
                        template: '<router-outlet></router-outlet>',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([{
                            as: 'Default',
                            path: '/',
                            component: page_controller_1.PageController
                        }, {
                            as: 'Page',
                            path: '/page/:id',
                            component: page_controller_1.PageController
                        }])
                ], AppController);
                return AppController;
            })();
            application_service_1.ApplicationService.initialize().then(function (service) {
                browser_1.bootstrap(AppController, [
                    router_1.ROUTER_PROVIDERS,
                    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
                    core_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, { useValue: AppController }),
                    core_1.provide(application_service_1.ApplicationService, { useValue: service })
                ]);
            });
        }
    }
});

System.register("src/compilers/angular/template/components/button-component", ["angular2/core", "src/compilers/angular/template/services/application-service", "src/core/controls/control", "src/compilers/angular/template/components/base-component"], function(exports_1) {
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
    var core_1, application_service_1, control_1, base_component_1;
    var ButtonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (application_service_1_1) {
                application_service_1 = application_service_1_1;
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
                function ButtonComponent(viewContainer, iterableDiffers, changeDetector, loader, applicationService, control) {
                    _super.call(this, viewContainer, iterableDiffers, changeDetector, loader, applicationService, control);
                }
                ButtonComponent = __decorate([
                    core_1.Component({
                        selector: 'button[vargin-type=button]',
                        properties: ['control'],
                        host: {
                            '[title]': 'control?.getProperty("title").getValue()',
                            '[type]': 'control?.getProperty("type").getValue()',
                            '[class]': 'cssClass',
                            '(click)': 'onControlAction("click")'
                        }
                    }),
                    core_1.View({
                        template: '{{ control?.getProperty("text").getValue() }}'
                    }),
                    __param(0, core_1.Inject(core_1.ViewContainerRef)),
                    __param(1, core_1.Inject(core_1.IterableDiffers)),
                    __param(2, core_1.Inject(core_1.ChangeDetectorRef)),
                    __param(3, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(4, core_1.Inject(application_service_1.ApplicationService)),
                    __param(5, core_1.Inject(control_1.Control))
                ], ButtonComponent);
                return ButtonComponent;
            })(base_component_1.BaseComponent);
            exports_1("ButtonComponent", ButtonComponent);
        }
    }
});

System.register("src/compilers/angular/template/pipes/string-format", ["angular2/core", "src/core/tools/string-formatter"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1, string_formatter_1;
    var StringFormatPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (string_formatter_1_1) {
                string_formatter_1 = string_formatter_1_1;
            }],
        execute: function() {
            StringFormatPipe = (function () {
                function StringFormatPipe() {
                }
                StringFormatPipe.prototype.transform = function (value, args) {
                    if (!args || args.length != 1) {
                        throw new Error('StringFormat pipe requires one argument');
                    }
                    return string_formatter_1.StringFormatter.format(value.toString(), +args[0]);
                };
                StringFormatPipe = __decorate([
                    core_1.Injectable(),
                    core_1.Pipe({ name: 'stringformat' })
                ], StringFormatPipe);
                return StringFormatPipe;
            })();
            exports_1("StringFormatPipe", StringFormatPipe);
        }
    }
});

System.register("src/compilers/angular/template/components/label-component", ["angular2/core", "src/compilers/angular/template/services/application-service", "src/core/controls/control", "src/compilers/angular/template/components/base-component", "src/compilers/angular/template/pipes/string-format"], function(exports_1) {
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
    var core_1, application_service_1, control_1, base_component_1, string_format_1;
    var LabelComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (application_service_1_1) {
                application_service_1 = application_service_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            },
            function (string_format_1_1) {
                string_format_1 = string_format_1_1;
            }],
        execute: function() {
            LabelComponent = (function (_super) {
                __extends(LabelComponent, _super);
                function LabelComponent(viewContainer, iterableDiffers, changeDetector, loader, applicationService, control) {
                    _super.call(this, viewContainer, iterableDiffers, changeDetector, loader, applicationService, control);
                }
                Object.defineProperty(LabelComponent.prototype, "value", {
                    get: function () {
                        return this.control.getProperty('text').getValue();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LabelComponent.prototype, "title", {
                    get: function () {
                        return this.control.getProperty('title').getValue();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LabelComponent.prototype, "format", {
                    get: function () {
                        return this.control.getProperty('format').getValue();
                    },
                    enumerable: true,
                    configurable: true
                });
                LabelComponent = __decorate([
                    core_1.Component({
                        selector: 'span[vargin-type=label]',
                        properties: ['control'],
                        host: {
                            '[class]': 'cssClass',
                            '[title]': 'title',
                            '(click)': 'onControlAction("click")'
                        }
                    }),
                    core_1.View({
                        template: '{{ value | stringformat: format }}',
                        pipes: [string_format_1.StringFormatPipe]
                    }),
                    __param(0, core_1.Inject(core_1.ViewContainerRef)),
                    __param(1, core_1.Inject(core_1.IterableDiffers)),
                    __param(2, core_1.Inject(core_1.ChangeDetectorRef)),
                    __param(3, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(4, core_1.Inject(application_service_1.ApplicationService)),
                    __param(5, core_1.Inject(control_1.Control))
                ], LabelComponent);
                return LabelComponent;
            })(base_component_1.BaseComponent);
            exports_1("LabelComponent", LabelComponent);
        }
    }
});

System.register("src/core/data/address", [], function(exports_1) {
    var AddressType, Address;
    return {
        setters:[],
        execute: function() {
            (function (AddressType) {
                AddressType[AddressType["URL"] = 0] = "URL";
                AddressType[AddressType["APP_PAGE"] = 1] = "APP_PAGE";
                AddressType[AddressType["EMAIL"] = 2] = "EMAIL";
                AddressType[AddressType["PHONE"] = 3] = "PHONE";
            })(AddressType || (AddressType = {}));
            exports_1("AddressType", AddressType);
            Address = (function () {
                function Address(type, value) {
                    if (type === void 0) { type = AddressType.URL; }
                    if (value === void 0) { value = ''; }
                    this.type = type;
                    this.value = value;
                }
                Address.serialize = function (address) {
                    return address.type + ":" + address.value;
                };
                Address.deserialize = function (addressString) {
                    // Schema is {type}:{value}
                    return new Address(+addressString[0], addressString.substring(2));
                };
                return Address;
            })();
            exports_1("Address", Address);
        }
    }
});

System.register("src/compilers/angular/template/components/link-component", ["angular2/core", "angular2/router", "src/compilers/angular/template/services/application-service", "src/core/controls/control", "src/compilers/angular/template/components/base-component", "src/core/data/address"], function(exports_1) {
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
    var core_1, router_1, application_service_1, control_1, base_component_1, address_1;
    var LinkComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (application_service_1_1) {
                application_service_1 = application_service_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            }],
        execute: function() {
            LinkComponent = (function (_super) {
                __extends(LinkComponent, _super);
                function LinkComponent(router, viewContainer, iterableDiffers, changeDetector, loader, applicationService, control) {
                    _super.call(this, viewContainer, iterableDiffers, changeDetector, loader, applicationService, control);
                    this.router = router;
                }
                LinkComponent.prototype.ngDoCheck = function () {
                    _super.prototype.ngDoCheck.call(this);
                    var addressString = this.control.getProperty('address').getValue();
                    if (!this.address || addressString !== address_1.Address.serialize(this.address)) {
                        this.address = addressString ?
                            address_1.Address.deserialize(addressString) : new address_1.Address();
                        this.href = this.address.type !== address_1.AddressType.APP_PAGE ?
                            this.address.value : 'javascript:void(0)';
                    }
                };
                LinkComponent.prototype.onClick = function () {
                    if (this.address.type === address_1.AddressType.APP_PAGE) {
                        this.router.navigate(['Page', { id: this.address.value }]);
                    }
                };
                LinkComponent = __decorate([
                    core_1.Component({
                        selector: 'a[vargin-type=link]',
                        properties: ['control'],
                        host: {
                            '(click)': 'onClick($event)',
                            'href': 'javascript:void(0)',
                            '[class]': 'cssClass',
                            '[title]': 'control?.getProperty("title").getValue()',
                            '[target]': 'control?.getProperty("target").getValue()',
                            '[href]': 'href'
                        }
                    }),
                    core_1.View({
                        template: '{{ control?.getProperty("text").getValue() }}'
                    }),
                    __param(0, core_1.Inject(router_1.Router)),
                    __param(1, core_1.Inject(core_1.ViewContainerRef)),
                    __param(2, core_1.Inject(core_1.IterableDiffers)),
                    __param(3, core_1.Inject(core_1.ChangeDetectorRef)),
                    __param(4, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(5, core_1.Inject(application_service_1.ApplicationService)),
                    __param(6, core_1.Inject(control_1.Control))
                ], LinkComponent);
                return LinkComponent;
            })(base_component_1.BaseComponent);
            exports_1("LinkComponent", LinkComponent);
        }
    }
});

System.register("src/compilers/angular/template/components/list-component", ["angular2/core", "src/core/controls/control", "src/compilers/angular/template/components/base-component", "src/compilers/angular/template/services/application-service"], function(exports_1) {
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
    var core_1, control_1, base_component_1, application_service_1;
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
            },
            function (application_service_1_1) {
                application_service_1 = application_service_1_1;
            }],
        execute: function() {
            ListComponent = (function (_super) {
                __extends(ListComponent, _super);
                function ListComponent(viewContainer, iterableDiffers, changeDetector, loader, applicationService, control) {
                    _super.call(this, viewContainer, iterableDiffers, changeDetector, loader, applicationService, control);
                    this.template = this.control.getTemplate();
                    this.control.removeChild(this.template);
                    this.datasource = this.applicationService.datasources.get(this.control.getProperty('datasource').getValue());
                    this.bind();
                }
                ListComponent.prototype.ngOnDestroy = function () {
                    var _this = this;
                    this.control.getChildren().forEach(function (clone) { return _this.applicationService.destroyClone(clone); });
                    this.control.setTemplate(this.template);
                };
                ListComponent.prototype.bind = function () {
                    var _this = this;
                    this.datasource.items.forEach(function (item) {
                        var control = _this.bindControl(_this.applicationService.cloneControl(_this.template), item);
                        control.isTemplate = false;
                        _this.control.addChild(control);
                    });
                };
                ListComponent.prototype.bindControl = function (control, item) {
                    var _this = this;
                    control.meta.properties.forEach(function (property, propertyKey) {
                        var rawProperty = control.getProperty(propertyKey);
                        var rawValue = rawProperty.getValue();
                        if (rawValue.startsWith('bind:')) {
                            rawProperty.setValue(item.get(rawValue.split(':')[1]));
                        }
                    });
                    control.getChildren().forEach(function (child) { return _this.bindControl(child, item); });
                    return control;
                };
                ListComponent = __decorate([
                    core_1.Component({
                        selector: 'div[vargin-type=list]',
                        properties: ['control'],
                        inputs: ['control'],
                        host: {
                            '[class]': 'cssClass'
                        }
                    }),
                    core_1.View({
                        template: "<div class=\"vargin-dynamic-anchor\" #container hidden></div>"
                    }),
                    __param(0, core_1.Inject(core_1.ViewContainerRef)),
                    __param(1, core_1.Inject(core_1.IterableDiffers)),
                    __param(2, core_1.Inject(core_1.ChangeDetectorRef)),
                    __param(3, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(4, core_1.Inject(application_service_1.ApplicationService)),
                    __param(5, core_1.Inject(control_1.Control))
                ], ListComponent);
                return ListComponent;
            })(base_component_1.BaseComponent);
            exports_1("ListComponent", ListComponent);
        }
    }
});

System.register("src/core/application", ["src/core/controls/visual/container-control", "src/core/application-page", "src/core/services/utils-service"], function(exports_1) {
    var container_control_1, application_page_1, utils_service_1;
    var Application;
    return {
        setters:[
            function (container_control_1_1) {
                container_control_1 = container_control_1_1;
            },
            function (application_page_1_1) {
                application_page_1 = application_page_1_1;
            },
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            }],
        execute: function() {
            Application = (function () {
                function Application(id, name, description, serviceRoot, pages) {
                    if (pages === void 0) { pages = []; }
                    this._id = id;
                    this._name = name;
                    this._description = description;
                    this._serviceRoot = serviceRoot;
                    this._pages = pages;
                }
                Object.defineProperty(Application.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Application.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Application.prototype, "description", {
                    get: function () {
                        return this._description;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Application.prototype, "serviceRoot", {
                    get: function () {
                        return this._serviceRoot;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Application.prototype, "pages", {
                    get: function () {
                        return this._pages;
                    },
                    enumerable: true,
                    configurable: true
                });
                Application.prototype.addPage = function (name) {
                    this.pages.push(new application_page_1.ApplicationPage(utils_service_1.UtilsService.uuid(), name || "Page #" + this.pages.length, new container_control_1.ContainerControl(utils_service_1.UtilsService.uuid())));
                };
                Application.prototype.removePage = function (id) {
                    this.pages.splice(this.pages.findIndex(function (page) { return page.id === id; }), 1);
                };
                /**
                 * Finds control inside application tree.
                 * @param {string} controlId Id of the control to find.
                 * @returns {Control} Found control.
                 */
                Application.prototype.findControl = function (controlId) {
                    for (var _i = 0, _a = this._pages; _i < _a.length; _i++) {
                        var page = _a[_i];
                        var control = page.root.find(controlId);
                        if (control) {
                            return control;
                        }
                    }
                    return null;
                };
                return Application;
            })();
            exports_1("Application", Application);
        }
    }
});

System.register("src/core/application-page", [], function(exports_1) {
    var ApplicationPage;
    return {
        setters:[],
        execute: function() {
            ApplicationPage = (function () {
                function ApplicationPage(id, name, root) {
                    this._id = id;
                    this._name = name;
                    this._root = root;
                }
                Object.defineProperty(ApplicationPage.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ApplicationPage.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ApplicationPage.prototype, "root", {
                    get: function () {
                        return this._root;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ApplicationPage;
            })();
            exports_1("ApplicationPage", ApplicationPage);
        }
    }
});

System.register("src/core/controls/visual/button-control", ["src/core/controls/control", "src/core/controls/control-metadata", "src/core/property", "src/core/services/style-service", "src/core/services/event-service"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var control_1, control_metadata_1, property_1, style_service_1, event_service_1;
    var SUPPORTED_PROPERTIES, SUPPORTED_STYLES, SUPPORTED_EVENTS, METADATA, ButtonControl;
    return {
        setters:[
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (control_metadata_1_1) {
                control_metadata_1 = control_metadata_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (style_service_1_1) {
                style_service_1 = style_service_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            }],
        execute: function() {
            SUPPORTED_PROPERTIES = new Map([
                ['text', new property_1.Property('Text', '[Button]')],
                ['title', new property_1.Property('Title', '[Button Title]')],
                ['type', new property_1.PropertyWithOptions('Type', [
                        new property_1.Property('Submit', 'submit'),
                        new property_1.Property('Reset', 'reset'),
                        new property_1.Property('Button', 'button')
                    ])]
            ]);
            SUPPORTED_STYLES = new Map([
                ['background-color', style_service_1.StyleService.getDescriptor('background-color')],
                ['background-image', style_service_1.StyleService.getDescriptor('background-image')],
                ['background-position', style_service_1.StyleService.getDescriptor('background-position')],
                ['background-repeat', style_service_1.StyleService.getDescriptor('background-repeat')],
                ['background-size', style_service_1.StyleService.getDescriptor('background-size')],
                ['border', style_service_1.StyleService.getDescriptor('border')],
                ['border-radius', style_service_1.StyleService.getDescriptor('border-radius')],
                ['color', style_service_1.StyleService.getDescriptor('color')],
                ['flex-basis', style_service_1.StyleService.getDescriptor('flex-basis')],
                ['flex-grow', style_service_1.StyleService.getDescriptor('flex-grow')],
                ['flex-shrink', style_service_1.StyleService.getDescriptor('flex-shrink')],
                ['font-size', style_service_1.StyleService.getDescriptor('font-size')],
                ['font-weight', style_service_1.StyleService.getDescriptor('font-weight')],
                ['height', style_service_1.StyleService.getDescriptor('height')],
                ['line-height', style_service_1.StyleService.getDescriptor('line-height')],
                ['padding', style_service_1.StyleService.getDescriptor('padding')]
            ]);
            SUPPORTED_EVENTS = new Map([
                ['click', event_service_1.EventService.getDescriptor('click')],
                ['hover', event_service_1.EventService.getDescriptor('hover')]
            ]);
            METADATA = Object.freeze(new control_metadata_1.ControlMetadata('button', 'Button', 'HTML Button', SUPPORTED_EVENTS, SUPPORTED_PROPERTIES, SUPPORTED_STYLES));
            ButtonControl = (function (_super) {
                __extends(ButtonControl, _super);
                function ButtonControl(id, overrides, triggers) {
                    _super.call(this, id, ButtonControl.getMeta(), overrides, triggers);
                }
                ButtonControl.getMeta = function () {
                    return METADATA;
                };
                return ButtonControl;
            })(control_1.Control);
            exports_1("ButtonControl", ButtonControl);
        }
    }
});

System.register("src/core/tools/string-formatter", [], function(exports_1) {
    var StringFormatType, StringFormatter;
    return {
        setters:[],
        execute: function() {
            (function (StringFormatType) {
                StringFormatType[StringFormatType["PlainText"] = 0] = "PlainText";
                StringFormatType[StringFormatType["Number"] = 1] = "Number";
                StringFormatType[StringFormatType["Percent"] = 2] = "Percent";
                StringFormatType[StringFormatType["Currency"] = 3] = "Currency";
                StringFormatType[StringFormatType["ShortTime"] = 4] = "ShortTime";
                StringFormatType[StringFormatType["ShortDate"] = 5] = "ShortDate";
            })(StringFormatType || (StringFormatType = {}));
            exports_1("StringFormatType", StringFormatType);
            StringFormatter = (function () {
                function StringFormatter() {
                }
                StringFormatter.format = function (stringToFormat, type) {
                    if (type === void 0) { type = StringFormatType.PlainText; }
                    if (typeof stringToFormat !== 'string') {
                        throw new Error('Formatter supports only "string" type. "' +
                            typeof stringToFormat +
                            '" type is not supported!');
                    }
                    if (!stringToFormat) {
                        return stringToFormat;
                    }
                    if (type === StringFormatType.Number) {
                        return (new Intl.NumberFormat('en-US')).format(+stringToFormat);
                    }
                    if (type === StringFormatType.Percent) {
                        return (new Intl.NumberFormat('en-US', { style: 'percent' })).format(+stringToFormat);
                    }
                    if (type === StringFormatType.Currency) {
                        var currencyOptions = { style: 'currency', currency: 'EUR' };
                        return (new Intl.NumberFormat('en-US', currencyOptions)).format(+stringToFormat);
                    }
                    if (type === StringFormatType.ShortTime) {
                        var timeOptions = { hour: 'numeric', minute: 'numeric' };
                        return (new Intl.DateTimeFormat('en-US', timeOptions)).format(+stringToFormat);
                    }
                    if (type === StringFormatType.ShortDate) {
                        return (new Intl.DateTimeFormat('en-US')).format(+stringToFormat);
                    }
                    return stringToFormat;
                };
                /**
                 * Provides Angular Pipe expression for the specified string type.
                 * @param {StringFormatType} format Format to find angular type for.
                 * @returns {string} Angular Pipe expression.
                 */
                StringFormatter.toPipe = function (format) {
                    switch (format) {
                        case StringFormatType.Number:
                            return 'number';
                        case StringFormatType.Currency:
                            return 'currency:\'EUR\':true';
                        case StringFormatType.Percent:
                            return 'percent';
                        case StringFormatType.ShortTime:
                            return 'date:\'shortTime\'';
                        case StringFormatType.ShortDate:
                            return 'date:\'shortDate\'';
                        default:
                            return null;
                    }
                };
                return StringFormatter;
            })();
            exports_1("StringFormatter", StringFormatter);
        }
    }
});

System.register("src/core/controls/visual/label-control", ["src/core/controls/control", "src/core/controls/control-metadata", "src/core/property", "src/core/services/style-service", "src/core/services/event-service", "src/core/tools/string-formatter", "src/core/overrides/overrides"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var control_1, control_metadata_1, property_1, style_service_1, event_service_1, string_formatter_1, overrides_1;
    var PREDEFINED_OVERRIDES, SUPPORTED_PROPERTIES, SUPPORTED_STYLES, SUPPORTED_EVENTS, METADATA, LabelControl;
    return {
        setters:[
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (control_metadata_1_1) {
                control_metadata_1 = control_metadata_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (style_service_1_1) {
                style_service_1 = style_service_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            },
            function (string_formatter_1_1) {
                string_formatter_1 = string_formatter_1_1;
            },
            function (overrides_1_1) {
                overrides_1 = overrides_1_1;
            }],
        execute: function() {
            PREDEFINED_OVERRIDES = new Map([
                ['styles', new Map([
                        ['align-items', 'center'],
                        ['display', 'inline']
                    ])]
            ]);
            SUPPORTED_PROPERTIES = new Map([
                ['text', new property_1.Property('Text', '[Label]')],
                ['title', new property_1.Property('Title', '[Label Title]')],
                ['format', new property_1.PropertyWithOptions('Format', [
                        new property_1.Property('Plain Text', string_formatter_1.StringFormatType.PlainText.toString()),
                        new property_1.Property('Number', string_formatter_1.StringFormatType.Number.toString()),
                        new property_1.Property('Percent', string_formatter_1.StringFormatType.Percent.toString()),
                        new property_1.Property('Currency', string_formatter_1.StringFormatType.Currency.toString()),
                        new property_1.Property('Short Time', string_formatter_1.StringFormatType.ShortTime.toString()),
                        new property_1.Property('Short Date', string_formatter_1.StringFormatType.ShortDate.toString())
                    ])]
            ]);
            SUPPORTED_STYLES = new Map([
                ['align-items', style_service_1.StyleService.getDescriptor('align-items')],
                ['background-color', style_service_1.StyleService.getDescriptor('background-color')],
                ['color', style_service_1.StyleService.getDescriptor('color')],
                ['display', style_service_1.StyleService.getDescriptor('display')],
                ['flex-basis', style_service_1.StyleService.getDescriptor('flex-basis')],
                ['flex-grow', style_service_1.StyleService.getDescriptor('flex-grow')],
                ['flex-shrink', style_service_1.StyleService.getDescriptor('flex-shrink')],
                ['font-size', style_service_1.StyleService.getDescriptor('font-size')],
                ['font-weight', style_service_1.StyleService.getDescriptor('font-weight')],
                ['justify-content', style_service_1.StyleService.getDescriptor('justify-content')],
                ['margin', style_service_1.StyleService.getDescriptor('margin')],
                ['opacity', style_service_1.StyleService.getDescriptor('opacity')],
                ['padding', style_service_1.StyleService.getDescriptor('padding')],
                ['text-decoration', style_service_1.StyleService.getDescriptor('text-decoration')]
            ]);
            SUPPORTED_EVENTS = new Map([
                ['click', event_service_1.EventService.getDescriptor('click')],
                ['hover', event_service_1.EventService.getDescriptor('hover')]
            ]);
            METADATA = Object.freeze(new control_metadata_1.ControlMetadata('label', 'Label', 'HTML Label', SUPPORTED_EVENTS, SUPPORTED_PROPERTIES, SUPPORTED_STYLES));
            LabelControl = (function (_super) {
                __extends(LabelControl, _super);
                function LabelControl(id, overrides, triggers) {
                    this.predefinedOverrides = new overrides_1.Overrides('__predefined__', PREDEFINED_OVERRIDES, true, false);
                    _super.call(this, id, LabelControl.getMeta(), overrides, triggers);
                }
                LabelControl.getMeta = function () {
                    return METADATA;
                };
                return LabelControl;
            })(control_1.Control);
            exports_1("LabelControl", LabelControl);
        }
    }
});

System.register("src/core/controls/visual/link-control", ["src/core/controls/control", "src/core/controls/control-metadata", "src/core/property", "src/core/services/style-service", "src/core/services/event-service", "src/core/overrides/overrides"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var control_1, control_metadata_1, property_1, style_service_1, event_service_1, overrides_1;
    var PREDEFINED_OVERRIDES, SUPPORTED_PROPERTIES, SUPPORTED_STYLES, SUPPORTED_EVENTS, METADATA, LinkControl;
    return {
        setters:[
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (control_metadata_1_1) {
                control_metadata_1 = control_metadata_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (style_service_1_1) {
                style_service_1 = style_service_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            },
            function (overrides_1_1) {
                overrides_1 = overrides_1_1;
            }],
        execute: function() {
            PREDEFINED_OVERRIDES = new Map([
                ['styles', new Map([
                        ['align-items', 'center'],
                        ['color', '#0000ee'],
                        ['display', 'inline'],
                        ['text-decoration', 'underline']
                    ])]
            ]);
            SUPPORTED_PROPERTIES = new Map([
                ['text', new property_1.Property('Text', '[Link]')],
                ['title', new property_1.Property('Title', '[Link Title]')],
                ['address', new property_1.Property('Address', '', 'url')],
                ['target', new property_1.PropertyWithOptions('Target', [
                        new property_1.Property('Same Tab', '_self'),
                        new property_1.Property('New Tab', '_blank')
                    ])]
            ]);
            SUPPORTED_STYLES = new Map([
                ['align-items', style_service_1.StyleService.getDescriptor('align-items')],
                ['background-color', style_service_1.StyleService.getDescriptor('background-color')],
                ['border', style_service_1.StyleService.getDescriptor('border')],
                ['border-radius', style_service_1.StyleService.getDescriptor('border-radius')],
                ['color', style_service_1.StyleService.getDescriptor('color')],
                ['display', style_service_1.StyleService.getDescriptor('display')],
                ['flex-basis', style_service_1.StyleService.getDescriptor('flex-basis')],
                ['flex-grow', style_service_1.StyleService.getDescriptor('flex-grow')],
                ['flex-shrink', style_service_1.StyleService.getDescriptor('flex-shrink')],
                ['font-size', style_service_1.StyleService.getDescriptor('font-size')],
                ['font-weight', style_service_1.StyleService.getDescriptor('font-weight')],
                ['height', style_service_1.StyleService.getDescriptor('height')],
                ['justify-content', style_service_1.StyleService.getDescriptor('justify-content')],
                ['line-height', style_service_1.StyleService.getDescriptor('line-height')],
                ['padding', style_service_1.StyleService.getDescriptor('padding')],
                ['text-decoration', style_service_1.StyleService.getDescriptor('text-decoration')]
            ]);
            SUPPORTED_EVENTS = new Map([
                ['click', event_service_1.EventService.getDescriptor('click')],
                ['hover', event_service_1.EventService.getDescriptor('hover')]
            ]);
            METADATA = Object.freeze(new control_metadata_1.ControlMetadata('link', 'Link', 'Link to another Web Page', SUPPORTED_EVENTS, SUPPORTED_PROPERTIES, SUPPORTED_STYLES));
            LinkControl = (function (_super) {
                __extends(LinkControl, _super);
                function LinkControl(id, overrides, triggers) {
                    this.predefinedOverrides = new overrides_1.Overrides('__predefined__', PREDEFINED_OVERRIDES, true, false);
                    _super.call(this, id, LinkControl.getMeta(), overrides, triggers);
                }
                LinkControl.getMeta = function () {
                    return METADATA;
                };
                return LinkControl;
            })(control_1.Control);
            exports_1("LinkControl", LinkControl);
        }
    }
});

System.register("src/core/controls/visual/container-control", ["src/core/controls/control", "src/core/controls/control-metadata", "src/core/services/style-service", "src/core/services/event-service", "src/core/overrides/overrides"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var control_1, control_metadata_1, style_service_1, event_service_1, overrides_1;
    var PREDEFINED_OVERRIDES, SUPPORTED_STYLES, SUPPORTED_EVENTS, METADATA, ContainerControl;
    return {
        setters:[
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (control_metadata_1_1) {
                control_metadata_1 = control_metadata_1_1;
            },
            function (style_service_1_1) {
                style_service_1 = style_service_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            },
            function (overrides_1_1) {
                overrides_1 = overrides_1_1;
            }],
        execute: function() {
            PREDEFINED_OVERRIDES = new Map([
                ['styles', new Map([
                        ['display', 'block'],
                        ['min-height', '5rem'],
                        ['min-width', '5rem']
                    ])]
            ]);
            SUPPORTED_STYLES = new Map([
                ['align-items', style_service_1.StyleService.getDescriptor('align-items')],
                ['background-color', style_service_1.StyleService.getDescriptor('background-color')],
                ['border', style_service_1.StyleService.getDescriptor('border')],
                ['color', style_service_1.StyleService.getDescriptor('color')],
                ['display', style_service_1.StyleService.getDescriptor('display')],
                ['flex-basis', style_service_1.StyleService.getDescriptor('flex-basis')],
                ['flex-direction', style_service_1.StyleService.getDescriptor('flex-direction')],
                ['flex-grow', style_service_1.StyleService.getDescriptor('flex-grow')],
                ['flex-shrink', style_service_1.StyleService.getDescriptor('flex-shrink')],
                ['font-size', style_service_1.StyleService.getDescriptor('font-size')],
                ['font-weight', style_service_1.StyleService.getDescriptor('font-weight')],
                ['justify-content', style_service_1.StyleService.getDescriptor('justify-content')],
                ['margin', style_service_1.StyleService.getDescriptor('margin')],
                ['min-height', style_service_1.StyleService.getDescriptor('min-height')],
                ['min-width', style_service_1.StyleService.getDescriptor('min-width')],
                ['padding', style_service_1.StyleService.getDescriptor('padding')]
            ]);
            SUPPORTED_EVENTS = new Map([
                ['click', event_service_1.EventService.getDescriptor('click')],
                ['hover', event_service_1.EventService.getDescriptor('hover')]
            ]);
            METADATA = Object.freeze(new control_metadata_1.ControlMetadata('container', 'Container', 'Container', SUPPORTED_EVENTS, null, SUPPORTED_STYLES));
            ContainerControl = (function (_super) {
                __extends(ContainerControl, _super);
                function ContainerControl(id, overrides, triggers) {
                    this.predefinedOverrides = new overrides_1.Overrides('__predefined__', PREDEFINED_OVERRIDES, true, false);
                    _super.call(this, id, ContainerControl.getMeta(), overrides, triggers);
                }
                ContainerControl.prototype.canHaveChildren = function () {
                    return true;
                };
                ContainerControl.getMeta = function () {
                    return METADATA;
                };
                return ContainerControl;
            })(control_1.Control);
            exports_1("ContainerControl", ContainerControl);
        }
    }
});

System.register("src/core/controls/visual/list-control", ["src/core/controls/control", "src/core/controls/control-metadata", "src/core/controls/visual/container-control", "src/core/property", "src/core/services/style-service", "src/core/services/event-service", "src/core/services/utils-service", "src/core/overrides/overrides"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var control_1, control_metadata_1, container_control_1, property_1, style_service_1, event_service_1, utils_service_1, overrides_1;
    var LIST_ITEM_PREDEFINED_OVERRIDES, PREDEFINED_OVERRIDES, LIST_ITEM_METADATA, ListItemControl, SUPPORTED_PROPERTIES, SUPPORTED_STYLES, SUPPORTED_EVENTS, METADATA, ListControl;
    return {
        setters:[
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (control_metadata_1_1) {
                control_metadata_1 = control_metadata_1_1;
            },
            function (container_control_1_1) {
                container_control_1 = container_control_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (style_service_1_1) {
                style_service_1 = style_service_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            },
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            },
            function (overrides_1_1) {
                overrides_1 = overrides_1_1;
            }],
        execute: function() {
            LIST_ITEM_PREDEFINED_OVERRIDES = new Map([
                ['styles', new Map([
                        ['border', '0.1rem dashed #cccccc'],
                        ['display', 'block'],
                        ['min-height', '5rem'],
                        ['min-width', '5rem'],
                    ])]
            ]);
            PREDEFINED_OVERRIDES = new Map([
                ['styles', new Map([
                        ['display', 'flex'],
                        ['flex-direction', 'column'],
                        ['justify-content', 'space-between'],
                        ['min-height', '5rem'],
                        ['min-width', '5rem'],
                        ['padding', '1rem']
                    ])]
            ]);
            LIST_ITEM_METADATA = Object.freeze(new control_metadata_1.ControlMetadata('list-item', 'List Item', 'List item', container_control_1.ContainerControl.getMeta().events, null, container_control_1.ContainerControl.getMeta().styles));
            ListItemControl = (function (_super) {
                __extends(ListItemControl, _super);
                function ListItemControl(id, overrides) {
                    this.predefinedOverrides = new overrides_1.Overrides('__predefined__', LIST_ITEM_PREDEFINED_OVERRIDES, true, false);
                    _super.call(this, id, LIST_ITEM_METADATA, overrides);
                    this.isTemplate = true;
                }
                ListItemControl.prototype.canHaveChildren = function () {
                    return true;
                };
                ListItemControl.getMeta = function () {
                    return LIST_ITEM_METADATA;
                };
                return ListItemControl;
            })(control_1.Control);
            exports_1("ListItemControl", ListItemControl);
            SUPPORTED_PROPERTIES = new Map([
                ['datasource', new property_1.Property('Datasource', '', 'datasource')]
            ]);
            SUPPORTED_STYLES = new Map([
                ['align-items', style_service_1.StyleService.getDescriptor('align-items')],
                ['background-color', style_service_1.StyleService.getDescriptor('background-color')],
                ['border', style_service_1.StyleService.getDescriptor('border')],
                ['color', style_service_1.StyleService.getDescriptor('color')],
                ['display', style_service_1.StyleService.getDescriptor('display')],
                ['flex-basis', style_service_1.StyleService.getDescriptor('flex-basis')],
                ['flex-direction', style_service_1.StyleService.getDescriptor('flex-direction')],
                ['flex-grow', style_service_1.StyleService.getDescriptor('flex-grow')],
                ['flex-shrink', style_service_1.StyleService.getDescriptor('flex-shrink')],
                ['font-size', style_service_1.StyleService.getDescriptor('font-size')],
                ['font-weight', style_service_1.StyleService.getDescriptor('font-weight')],
                ['justify-content', style_service_1.StyleService.getDescriptor('justify-content')],
                ['min-height', style_service_1.StyleService.getDescriptor('min-height')],
                ['min-width', style_service_1.StyleService.getDescriptor('min-width')],
                ['padding', style_service_1.StyleService.getDescriptor('padding')]
            ]);
            SUPPORTED_EVENTS = new Map([
                ['click', event_service_1.EventService.getDescriptor('click')],
                ['hover', event_service_1.EventService.getDescriptor('hover')]
            ]);
            METADATA = Object.freeze(new control_metadata_1.ControlMetadata('list', 'List', 'List of the items', SUPPORTED_EVENTS, SUPPORTED_PROPERTIES, SUPPORTED_STYLES));
            ListControl = (function (_super) {
                __extends(ListControl, _super);
                function ListControl(id, overrides, triggers) {
                    this.predefinedOverrides = new overrides_1.Overrides('__predefined__', PREDEFINED_OVERRIDES, true, false);
                    _super.call(this, id, ListControl.getMeta(), overrides, triggers);
                }
                ListControl.prototype.getTemplate = function () {
                    var template = this.getChildren()[0];
                    if (!template) {
                        template = new ListItemControl(utils_service_1.UtilsService.uuid());
                        this.setTemplate(template);
                    }
                    return template;
                };
                ListControl.prototype.setTemplate = function (template) {
                    var _this = this;
                    if (!template) {
                        return;
                    }
                    this.getChildren().forEach(function (child) { return _this.removeChild(child); });
                    this.addChild(template);
                };
                ListControl.prototype.canHaveChildren = function () {
                    return true;
                };
                ListControl.getMeta = function () {
                    return METADATA;
                };
                return ListControl;
            })(control_1.Control);
            exports_1("ListControl", ListControl);
        }
    }
});

System.register("src/core/controls/visual/range-control", ["src/core/controls/control", "src/core/controls/control-metadata", "src/core/property", "src/core/services/style-service", "src/core/services/event-service", "src/core/overrides/overrides"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var control_1, control_metadata_1, property_1, style_service_1, event_service_1, overrides_1;
    var PREDEFINED_OVERRIDES, SUPPORTED_PROPERTIES, SUPPORTED_STYLES, SUPPORTED_EVENTS, METADATA, RangeControl;
    return {
        setters:[
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (control_metadata_1_1) {
                control_metadata_1 = control_metadata_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (style_service_1_1) {
                style_service_1 = style_service_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            },
            function (overrides_1_1) {
                overrides_1 = overrides_1_1;
            }],
        execute: function() {
            PREDEFINED_OVERRIDES = new Map([
                ['styles', new Map([
                        ['align-items', 'center']
                    ])]
            ]);
            SUPPORTED_PROPERTIES = new Map([
                ['min', new property_1.Property('Minimum', '0')],
                ['max', new property_1.Property('Maximum', '100')],
                ['step', new property_1.Property('Step', '1')],
                ['value', new property_1.Property('Value', '0')],
            ]);
            SUPPORTED_STYLES = new Map([
                ['align-items', style_service_1.StyleService.getDescriptor('align-items')],
                ['justify-content', style_service_1.StyleService.getDescriptor('justify-content')],
                ['opacity', style_service_1.StyleService.getDescriptor('opacity')],
                ['padding', style_service_1.StyleService.getDescriptor('padding')]
            ]);
            SUPPORTED_EVENTS = new Map([
                ['change', event_service_1.EventService.getDescriptor('change')]
            ]);
            METADATA = Object.freeze(new control_metadata_1.ControlMetadata('range', 'Number Range', 'Number Range', SUPPORTED_EVENTS, SUPPORTED_PROPERTIES, SUPPORTED_STYLES));
            RangeControl = (function (_super) {
                __extends(RangeControl, _super);
                function RangeControl(id, overrides, triggers) {
                    this.predefinedOverrides = new overrides_1.Overrides('__predefined__', PREDEFINED_OVERRIDES, true, false);
                    _super.call(this, id, RangeControl.getMeta(), overrides, triggers);
                }
                RangeControl.getMeta = function () {
                    return METADATA;
                };
                return RangeControl;
            })(control_1.Control);
            exports_1("RangeControl", RangeControl);
        }
    }
});

System.register("src/core/services/style-service", ["src/core/property"], function(exports_1) {
    var property_1;
    var STYLES, StyleService;
    return {
        setters:[
            function (property_1_1) {
                property_1 = property_1_1;
            }],
        execute: function() {
            STYLES = new Map([
                [
                    'align-items', new property_1.PropertyWithOptions('Align items', [
                        new property_1.Property('Start', 'flex-start'),
                        new property_1.Property('End', 'flex-end'),
                        new property_1.Property('Center', 'center'),
                        new property_1.Property('Baseline', 'baseline'),
                        new property_1.Property('Stretch', 'stretch'),
                        new property_1.Property('Inherit', 'inherit')
                    ], 'stretch', 'align-items')
                ],
                [
                    'background-color',
                    new property_1.Property('Background color', 'transparent', 'background-color')
                ],
                ['background-image', new property_1.Property('Background image', '', 'image')],
                [
                    'background-position',
                    new property_1.PropertyWithOptions('Background position', [
                        new property_1.Property('Top', 'top'),
                        new property_1.Property('Left', 'Left'),
                        new property_1.Property('Right', 'right'),
                        new property_1.Property('Bottom', 'bottom'),
                        new property_1.Property('Center', 'center')
                    ], 'center')
                ],
                [
                    'background-repeat',
                    new property_1.PropertyWithOptions('Background repeat', [
                        new property_1.Property('Repeat', 'repeat'),
                        new property_1.Property('Repeat-X', 'repeat-x'),
                        new property_1.Property('Repeat-Y', 'repeat-y'),
                        new property_1.Property('Space', 'space'),
                        new property_1.Property('Round', 'round'),
                        new property_1.Property('No-Repeat', 'no-repeat'),
                        new property_1.Property('Inherit', 'inherit')
                    ], 'repeat')
                ],
                [
                    'background-size',
                    new property_1.PropertyWithOptions('Background size', [
                        new property_1.Property('Auto', 'auto'),
                        new property_1.Property('Cover', 'cover'),
                        new property_1.Property('Contain', 'contain'),
                        new property_1.Property('50% Auto', '50% auto'),
                        new property_1.Property('Auto 50%', 'auto 50%'),
                        new property_1.Property('Inherit', 'inherit')
                    ], 'auto')
                ],
                ['border', new property_1.Property('Border', 'none', 'border')],
                ['border-radius', new property_1.Property('Border radius', '0')],
                ['color', new property_1.Property('Text color', 'inherit', 'color')],
                [
                    'display',
                    new property_1.PropertyWithOptions('Display', [
                        new property_1.Property('None', 'none'),
                        new property_1.Property('Inline', 'inline'),
                        new property_1.Property('Block', 'block'),
                        new property_1.Property('Inline-Block', 'inline-block'),
                        new property_1.Property('Flex', 'flex'),
                        new property_1.Property('Inherit', 'inherit'),
                        new property_1.Property('Unset', 'unset')
                    ], 'inline', 'display')
                ],
                ['height', new property_1.Property('Height', 'auto')],
                ['flex-basis', new property_1.Property('Flex basis', 'auto')],
                [
                    'flex-direction',
                    new property_1.PropertyWithOptions('Flex direction', [
                        new property_1.Property('Row', 'row'),
                        new property_1.Property('Row Reverse', 'row-reverse'),
                        new property_1.Property('Column', 'column'),
                        new property_1.Property('Column Reverse', 'column-reverse'),
                        new property_1.Property('Inherit', 'inherit'),
                        new property_1.Property('Initial', 'initial'),
                        new property_1.Property('Unset', 'unset')
                    ], 'row', 'flex-direction')
                ],
                ['flex-grow', new property_1.Property('Flex grow', '0')],
                ['flex-shrink', new property_1.Property('Flex shrink', '1')],
                ['font-size', new property_1.Property('Font size', 'inherit')],
                [
                    'font-weight',
                    new property_1.PropertyWithOptions('Font weight', [
                        new property_1.Property('Normal', 'normal'),
                        new property_1.Property('Bold', 'bold'),
                        new property_1.Property('Lighter', 'lighter'),
                        new property_1.Property('Bolder', 'bolder'),
                        new property_1.Property('100', '100'),
                        new property_1.Property('200', '200'),
                        new property_1.Property('300', '300'),
                        new property_1.Property('400', '400'),
                        new property_1.Property('500', '500'),
                        new property_1.Property('600', '600'),
                        new property_1.Property('700', '700'),
                        new property_1.Property('800', '800'),
                        new property_1.Property('900', '900'),
                        new property_1.Property('Inherit', 'inherit'),
                        new property_1.Property('Initial', 'initial'),
                        new property_1.Property('Unset', 'unset')
                    ], 'normal', 'font-weight')
                ],
                [
                    'justify-content',
                    new property_1.PropertyWithOptions('Justify content', [
                        new property_1.Property('Start', 'flex-start'),
                        new property_1.Property('End', 'flex-end'),
                        new property_1.Property('Center', 'center'),
                        new property_1.Property('Space between', 'space-between'),
                        new property_1.Property('Space around', 'space-around'),
                        new property_1.Property('Inherit', 'inherit'),
                        new property_1.Property('Initial', 'initial'),
                        new property_1.Property('Unset', 'unset')
                    ], 'flex-start', 'justify-content')
                ],
                ['line-height', new property_1.Property('Line height', 'auto')],
                ['margin', new property_1.Property('Margin', '0', 'margin')],
                ['min-height', new property_1.Property('Min height', '0')],
                ['min-width', new property_1.Property('Min width', '0')],
                ['opacity', new property_1.Property('Opacity', '1', 'opacity')],
                ['padding', new property_1.Property('Padding', '0', 'padding')],
                [
                    'text-decoration',
                    new property_1.PropertyWithOptions('Text decoration', [
                        new property_1.Property('None', 'none'),
                        new property_1.Property('Underline', 'underline'),
                        new property_1.Property('Overline', 'overline'),
                        new property_1.Property('Line-through', 'line-through')
                    ], 'none', 'text-decoration'),
                ]
            ]);
            StyleService = (function () {
                function StyleService() {
                }
                StyleService.getDescriptor = function (type) {
                    if (!STYLES.has(type)) {
                        throw new Error('Type is not supported: ' + type);
                    }
                    return STYLES.get(type);
                };
                return StyleService;
            })();
            exports_1("StyleService", StyleService);
        }
    }
});

System.register("src/core/services/event-service", ["src/core/property"], function(exports_1) {
    var property_1;
    var EVENTS, EventService;
    return {
        setters:[
            function (property_1_1) {
                property_1 = property_1_1;
            }],
        execute: function() {
            EVENTS = new Map([
                ['change', new property_1.Property('Change', null, 'event')],
                ['click', new property_1.Property('Click', null, 'event')],
                ['item-click', new property_1.Property('Item click', null, 'event')],
                ['hover', new property_1.Property('Hover', null, 'event')]
            ]);
            EventService = (function () {
                function EventService() {
                }
                EventService.getDescriptor = function (type) {
                    if (!EVENTS.has(type)) {
                        throw new Error('Type is not supported: ' + type);
                    }
                    return EVENTS.get(type);
                };
                return EventService;
            })();
            exports_1("EventService", EventService);
        }
    }
});

System.register("src/core/controls/visual/text-input-control", ["src/core/controls/control", "src/core/controls/control-metadata", "src/core/property", "src/core/services/style-service", "src/core/services/event-service", "src/core/overrides/overrides"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var control_1, control_metadata_1, property_1, style_service_1, event_service_1, overrides_1;
    var PREDEFINED_OVERRIDES, SUPPORTED_PROPERTIES, SUPPORTED_STYLES, SUPPORTED_EVENTS, METADATA, TextInputControl;
    return {
        setters:[
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (control_metadata_1_1) {
                control_metadata_1 = control_metadata_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (style_service_1_1) {
                style_service_1 = style_service_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            },
            function (overrides_1_1) {
                overrides_1 = overrides_1_1;
            }],
        execute: function() {
            PREDEFINED_OVERRIDES = new Map([
                ['styles', new Map([
                        ['border', '0.1rem solid #c7c7c7']
                    ])]
            ]);
            SUPPORTED_PROPERTIES = new Map([
                ['placeholder', new property_1.Property('Placeholder', '[Placeholder]')],
                ['value', new property_1.Property('Value', '')],
            ]);
            SUPPORTED_STYLES = new Map([
                ['align-items', style_service_1.StyleService.getDescriptor('align-items')],
                ['background-color', style_service_1.StyleService.getDescriptor('background-color')],
                ['border', style_service_1.StyleService.getDescriptor('border')],
                ['color', style_service_1.StyleService.getDescriptor('color')],
                ['flex-basis', style_service_1.StyleService.getDescriptor('flex-basis')],
                ['flex-grow', style_service_1.StyleService.getDescriptor('flex-grow')],
                ['flex-shrink', style_service_1.StyleService.getDescriptor('flex-shrink')],
                ['font-size', style_service_1.StyleService.getDescriptor('font-size')],
                ['font-weight', style_service_1.StyleService.getDescriptor('font-weight')],
                ['justify-content', style_service_1.StyleService.getDescriptor('justify-content')],
                ['padding', style_service_1.StyleService.getDescriptor('padding')]
            ]);
            SUPPORTED_EVENTS = new Map([
                ['change', event_service_1.EventService.getDescriptor('change')]
            ]);
            METADATA = Object.freeze(new control_metadata_1.ControlMetadata('text-input', 'Text Input', 'Text Input', SUPPORTED_EVENTS, SUPPORTED_PROPERTIES, SUPPORTED_STYLES));
            TextInputControl = (function (_super) {
                __extends(TextInputControl, _super);
                function TextInputControl(id, overrides, triggers) {
                    this.predefinedOverrides = new overrides_1.Overrides('__predefined__', PREDEFINED_OVERRIDES, true, false);
                    _super.call(this, id, TextInputControl.getMeta(), overrides, triggers);
                }
                TextInputControl.getMeta = function () {
                    return METADATA;
                };
                return TextInputControl;
            })(control_1.Control);
            exports_1("TextInputControl", TextInputControl);
        }
    }
});

System.register("src/core/controls/control-metadata", [], function(exports_1) {
    var ControlMetadata;
    return {
        setters:[],
        execute: function() {
            ControlMetadata = (function () {
                function ControlMetadata(type, name, description, events, properties, styles) {
                    this.type = type;
                    this.name = name;
                    this.description = description;
                    this.events = events || new Map();
                    this.properties = properties || new Map();
                    this.styles = styles || new Map();
                }
                return ControlMetadata;
            })();
            exports_1("ControlMetadata", ControlMetadata);
        }
    }
});

System.register("src/core/controls/service/datasource-control", ["src/core/property", "src/core/controls/control", "src/core/controls/control-metadata"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var property_1, control_1, control_metadata_1;
    var SUPPORTED_PROPERTIES, SUPPORTED_EVENTS, METADATA, DatasourceControl;
    return {
        setters:[
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (control_metadata_1_1) {
                control_metadata_1 = control_metadata_1_1;
            }],
        execute: function() {
            SUPPORTED_PROPERTIES = new Map([
                ['name', new property_1.Property('Name', '[DataSource]')],
                ['schema', new property_1.Property('Schema', null, 'schema')],
                ['items', new property_1.Property('Items', null, 'items')]
            ]);
            SUPPORTED_EVENTS = new Map([
                ['item-added', new property_1.Property('Item added', null, 'item-added')]
            ]);
            METADATA = Object.freeze(new control_metadata_1.ControlMetadata('datasource', 'Data Source', 'Custom Data Source', SUPPORTED_EVENTS, SUPPORTED_PROPERTIES));
            DatasourceControl = (function (_super) {
                __extends(DatasourceControl, _super);
                function DatasourceControl(id, overrides, triggers) {
                    _super.call(this, id, DatasourceControl.getMeta(), overrides, triggers);
                }
                DatasourceControl.getMeta = function () {
                    return METADATA;
                };
                return DatasourceControl;
            })(control_1.Control);
            exports_1("DatasourceControl", DatasourceControl);
        }
    }
});

System.register("src/core/services/utils-service", [], function(exports_1) {
    var l, i, Deferred, UtilsService;
    return {
        setters:[],
        execute: function() {
            l = [];
            for (i = 0; i < 256; i++) {
                l[i] = (i < 16 ? '0' : '') + (i).toString(16);
            }
            Deferred = (function () {
                function Deferred() {
                    var _this = this;
                    this.internalPromise = new Promise(function (resolve, reject) {
                        _this.internalResolve = resolve;
                        _this.internalReject = reject;
                    });
                }
                Deferred.prototype.resolve = function (value) {
                    this.internalResolve(value);
                };
                Deferred.prototype.reject = function (value) {
                    this.internalReject(value);
                };
                Object.defineProperty(Deferred.prototype, "promise", {
                    get: function () {
                        return this.internalPromise;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Deferred;
            })();
            exports_1("Deferred", Deferred);
            UtilsService = (function () {
                function UtilsService() {
                }
                UtilsService.uuid = function () {
                    var d0 = Math.random() * 0xffffffff | 0;
                    var d1 = Math.random() * 0xffffffff | 0;
                    var d2 = Math.random() * 0xffffffff | 0;
                    var d3 = Math.random() * 0xffffffff | 0;
                    return l[d0 & 0xff] + l[d0 >> 8 & 0xff] + l[d0 >> 16 & 0xff] +
                        l[d0 >> 24 & 0xff] + '-' + l[d1 & 0xff] + l[d1 >> 8 & 0xff] + '-' +
                        l[d1 >> 16 & 0x0f | 0x40] + l[d1 >> 24 & 0xff] + '-' +
                        l[d2 & 0x3f | 0x80] + l[d2 >> 8 & 0xff] + '-' + l[d2 >> 16 & 0xff] +
                        l[d2 >> 24 & 0xff] + l[d3 & 0xff] + l[d3 >> 8 & 0xff] +
                        l[d3 >> 16 & 0xff] + l[d3 >> 24 & 0xff];
                };
                return UtilsService;
            })();
            exports_1("UtilsService", UtilsService);
            exports_1("default",UtilsService);
        }
    }
});

System.register("src/core/services/control-service", ["src/core/controls/visual/button-control", "src/core/controls/visual/container-control", "src/core/controls/visual/label-control", "src/core/controls/visual/link-control", "src/core/controls/visual/list-control", "src/core/controls/visual/range-control", "src/core/controls/visual/text-input-control", "src/core/controls/service/datasource-control", "src/core/services/utils-service"], function(exports_1) {
    var button_control_1, container_control_1, label_control_1, link_control_1, list_control_1, range_control_1, text_input_control_1, datasource_control_1, utils_service_1;
    var CONTROL_CONFIG, ControlService;
    return {
        setters:[
            function (button_control_1_1) {
                button_control_1 = button_control_1_1;
            },
            function (container_control_1_1) {
                container_control_1 = container_control_1_1;
            },
            function (label_control_1_1) {
                label_control_1 = label_control_1_1;
            },
            function (link_control_1_1) {
                link_control_1 = link_control_1_1;
            },
            function (list_control_1_1) {
                list_control_1 = list_control_1_1;
            },
            function (range_control_1_1) {
                range_control_1 = range_control_1_1;
            },
            function (text_input_control_1_1) {
                text_input_control_1 = text_input_control_1_1;
            },
            function (datasource_control_1_1) {
                datasource_control_1 = datasource_control_1_1;
            },
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            }],
        execute: function() {
            CONTROL_CONFIG = new Map([
                ['button', button_control_1.ButtonControl],
                ['container', container_control_1.ContainerControl],
                ['datasource', datasource_control_1.DatasourceControl],
                ['label', label_control_1.LabelControl],
                ['link', link_control_1.LinkControl],
                ['list', list_control_1.ListControl],
                ['list-item', list_control_1.ListItemControl],
                ['range', range_control_1.RangeControl],
                ['text-input', text_input_control_1.TextInputControl]
            ]);
            ControlService = (function () {
                function ControlService() {
                }
                ControlService.getMetadata = function (type) {
                    return CONTROL_CONFIG.get(type).getMeta();
                };
                ControlService.createByType = function (type, overrides, triggers, id) {
                    if (!CONTROL_CONFIG.has(type)) {
                        throw new Error('Not supported control type: ' + type);
                    }
                    var ControlType = CONTROL_CONFIG.get(type);
                    return new ControlType(id || utils_service_1.UtilsService.uuid(), overrides, triggers);
                };
                return ControlService;
            })();
            exports_1("ControlService", ControlService);
        }
    }
});

System.register("src/core/triggers/trigger", ["vargin/condition-parser"], function(exports_1) {
    var condition_parser_1;
    var Trigger;
    return {
        setters:[
            function (condition_parser_1_1) {
                condition_parser_1 = condition_parser_1_1;
            }],
        execute: function() {
            Trigger = (function () {
                function Trigger(name, rawCondition, actions) {
                    if (rawCondition === void 0) { rawCondition = ''; }
                    if (actions === void 0) { actions = []; }
                    this.name = name;
                    this.actions = actions;
                    this._rawCondition = rawCondition;
                    this._parsedCondition = [];
                }
                Object.defineProperty(Trigger.prototype, "condition", {
                    get: function () {
                        return this._rawCondition;
                    },
                    set: function (value) {
                        if (value !== this._rawCondition) {
                            this._rawCondition = value;
                            this._parsedCondition = [];
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Trigger.prototype.isApplicable = function (binder) {
                    if (this._parsedCondition.length === 0) {
                        try {
                            this._parsedCondition = condition_parser_1.parse(this._rawCondition);
                        }
                        catch (e) {
                            console.log('Invalid condition: %s', this.condition);
                            return false;
                        }
                    }
                    var conditionResult = false;
                    for (var _i = 0, _a = this._parsedCondition; _i < _a.length; _i++) {
                        var parsedCondition = _a[_i];
                        var currentConditionResult = this.checkCondition(parsedCondition, binder);
                        if (parsedCondition.anchor) {
                            if (parsedCondition.anchor.value === '&&') {
                                conditionResult = conditionResult && currentConditionResult;
                            }
                            else if (parsedCondition.anchor.value === '||') {
                                conditionResult = conditionResult || currentConditionResult;
                            }
                        }
                        conditionResult = currentConditionResult;
                    }
                    return conditionResult;
                };
                Trigger.prototype.checkCondition = function (parsedCondition, binder) {
                    try {
                        var leftValue = this.getValue(parsedCondition.left, binder);
                        var rightValue = this.getValue(parsedCondition.right, binder);
                        return leftValue === rightValue;
                    }
                    catch (e) {
                        console.log('Values can not be parsed: ', e);
                        return false;
                    }
                };
                Trigger.prototype.getValue = function (conditionLeaf, binder) {
                    if (conditionLeaf.type === 'control-binding' ||
                        conditionLeaf.type === 'data-binding' ||
                        conditionLeaf.type === 'foreign-control-binding') {
                        if (!binder) {
                            throw new Error('Not supported');
                        }
                        return binder(conditionLeaf.type, conditionLeaf.value);
                    }
                    else if (conditionLeaf.type === 'boolean') {
                        return Boolean(conditionLeaf.value);
                    }
                    else if (conditionLeaf.type === 'number') {
                        return +conditionLeaf.value;
                    }
                    return conditionLeaf.value.toString();
                };
                return Trigger;
            })();
            exports_1("Trigger", Trigger);
        }
    }
});

System.register("src/compilers/json/json-triggers-compiler", ["src/core/triggers/trigger", "src/compilers/json/json-action-compiler"], function(exports_1) {
    var trigger_1, json_action_compiler_1;
    var JSONTriggerCompiler;
    return {
        setters:[
            function (trigger_1_1) {
                trigger_1 = trigger_1_1;
            },
            function (json_action_compiler_1_1) {
                json_action_compiler_1 = json_action_compiler_1_1;
            }],
        execute: function() {
            JSONTriggerCompiler = (function () {
                function JSONTriggerCompiler() {
                    this.actionCompiler = new json_action_compiler_1.JSONActionCompiler();
                }
                JSONTriggerCompiler.prototype.compile = function (trigger) {
                    var _this = this;
                    return Promise.all(trigger.actions.map(function (action) { return _this.actionCompiler.compile(action); })).then(function (compiledActions) {
                        return {
                            name: trigger.name,
                            condition: trigger.condition,
                            actions: compiledActions
                        };
                    });
                };
                JSONTriggerCompiler.prototype.decompile = function (compiledTrigger) {
                    var _this = this;
                    return Promise.all(compiledTrigger.actions.map(function (action) { return _this.actionCompiler.decompile(action); })).then(function (actions) {
                        return new trigger_1.Trigger(compiledTrigger.name, compiledTrigger.condition, actions);
                    });
                };
                return JSONTriggerCompiler;
            })();
            exports_1("JSONTriggerCompiler", JSONTriggerCompiler);
        }
    }
});

System.register("src/compilers/json/json-control-compiler", ["src/core/services/control-service", "src/compilers/json/json-overrides-compiler", "src/compilers/json/json-triggers-compiler"], function(exports_1) {
    var control_service_1, JSONOverrides, JSONTrigger;
    var JSONControlCompiler;
    return {
        setters:[
            function (control_service_1_1) {
                control_service_1 = control_service_1_1;
            },
            function (JSONOverrides_1) {
                JSONOverrides = JSONOverrides_1;
            },
            function (JSONTrigger_1) {
                JSONTrigger = JSONTrigger_1;
            }],
        execute: function() {
            JSONControlCompiler = (function () {
                function JSONControlCompiler() {
                    this.overridesCompiler = new JSONOverrides.JSONOverridesCompiler();
                    this.triggerCompiler = new JSONTrigger.JSONTriggerCompiler();
                }
                JSONControlCompiler.prototype.compile = function (control) {
                    var _this = this;
                    var overridesPromise = control.overrides ?
                        this.overridesCompiler.compile(control.overrides) :
                        Promise.resolve(null);
                    var triggersPromise;
                    if (control.triggers.length) {
                        triggersPromise = Promise.all(control.triggers.map(function (trigger) {
                            return _this.triggerCompiler.compile(trigger);
                        }));
                    }
                    else {
                        triggersPromise = Promise.resolve(null);
                    }
                    var childrenPromise = Promise.all(control.getChildren().map(function (child) { return _this.compile(child); }));
                    return Promise.all([overridesPromise, triggersPromise, childrenPromise]).then(function (_a) {
                        var overrides = _a[0], triggers = _a[1], children = _a[2];
                        return {
                            id: control.id,
                            type: control.meta.type,
                            children: children,
                            overrides: overrides,
                            triggers: triggers
                        };
                    });
                };
                JSONControlCompiler.prototype.decompile = function (compiledControl) {
                    var _this = this;
                    var overridesPromise = compiledControl.overrides ?
                        this.overridesCompiler.decompile(compiledControl.overrides) :
                        Promise.resolve(null);
                    var triggersPromise;
                    if (compiledControl.triggers) {
                        triggersPromise = Promise.all(compiledControl.triggers.map(function (trigger) {
                            return _this.triggerCompiler.decompile(trigger);
                        }));
                    }
                    else {
                        triggersPromise = Promise.resolve([]);
                    }
                    return Promise.all([overridesPromise, triggersPromise]).then(function (_a) {
                        var overrides = _a[0], triggers = _a[1];
                        var control = control_service_1.ControlService.createByType(compiledControl.type, overrides, triggers, compiledControl.id);
                        if (compiledControl.children && compiledControl.children.length) {
                            return Promise.all(compiledControl.children.map(function (child) { return _this.decompile(child); })).then(function (children) {
                                children.forEach(function (child) { return control.addChild(child); });
                                return control;
                            });
                        }
                        return Promise.resolve(control);
                    });
                };
                return JSONControlCompiler;
            })();
            exports_1("JSONControlCompiler", JSONControlCompiler);
        }
    }
});

System.register("src/compilers/json/json-application-compiler", ["src/core/application", "src/core/application-page", "src/compilers/json/json-control-compiler"], function(exports_1) {
    var application_1, application_page_1, json_control_compiler_1;
    var JSONApplicationCompiler;
    return {
        setters:[
            function (application_1_1) {
                application_1 = application_1_1;
            },
            function (application_page_1_1) {
                application_page_1 = application_page_1_1;
            },
            function (json_control_compiler_1_1) {
                json_control_compiler_1 = json_control_compiler_1_1;
            }],
        execute: function() {
            JSONApplicationCompiler = (function () {
                function JSONApplicationCompiler() {
                    this._controlCompiler = new json_control_compiler_1.JSONControlCompiler();
                }
                JSONApplicationCompiler.prototype.compile = function (application) {
                    var _this = this;
                    return this._controlCompiler.compile(application.serviceRoot).then(function (compiledServiceRoot) {
                        return Promise.all(application.pages.map(function (page) {
                            return _this._controlCompiler.compile(page.root).then(function (compiledRoot) {
                                return { id: page.id, name: page.name, root: compiledRoot };
                            });
                        })).then(function (compiledPages) {
                            return JSON.stringify({
                                id: application.id,
                                name: application.name,
                                description: application.description,
                                serviceRoot: compiledServiceRoot,
                                pages: compiledPages
                            });
                        });
                    });
                };
                JSONApplicationCompiler.prototype.decompile = function (compiledApplication) {
                    var _this = this;
                    var plainApplicationObject = JSON.parse(compiledApplication);
                    return this._controlCompiler.decompile(plainApplicationObject.serviceRoot).then(function (decompiledServiceRoot) {
                        var pagePromises = plainApplicationObject.pages.map(function (plainApplicationPage) {
                            return _this._controlCompiler.decompile(plainApplicationPage.root).then(function (decompiledPageRoot) {
                                return new application_page_1.ApplicationPage(plainApplicationPage.id, plainApplicationPage.name, decompiledPageRoot);
                            });
                        });
                        return Promise.all(pagePromises).then(function (decompiledPages) {
                            return new application_1.Application(plainApplicationObject.id, plainApplicationObject.name, plainApplicationObject.description, decompiledServiceRoot, decompiledPages);
                        });
                    });
                };
                return JSONApplicationCompiler;
            })();
            exports_1("JSONApplicationCompiler", JSONApplicationCompiler);
        }
    }
});

System.register("src/core/actions/alert-action", ["src/core/property", "src/core/actions/action", "src/core/actions/action-metadata"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var property_1, action_1, action_metadata_1;
    var SUPPORTED_PROPERTIES, METADATA, AlertAction;
    return {
        setters:[
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (action_1_1) {
                action_1 = action_1_1;
            },
            function (action_metadata_1_1) {
                action_metadata_1 = action_metadata_1_1;
            }],
        execute: function() {
            SUPPORTED_PROPERTIES = new Map([
                ['alert-message', new property_1.Property('Alert message', '')]
            ]);
            METADATA = Object.freeze(new action_metadata_1.ActionMetadata('alert-action', 'Alert', 'Action that allows to alert any message', SUPPORTED_PROPERTIES));
            AlertAction = (function (_super) {
                __extends(AlertAction, _super);
                function AlertAction(overrides) {
                    _super.call(this, METADATA, overrides);
                }
                AlertAction.prototype.perform = function () {
                    try {
                        alert(this.getProperty('alert-message').getValue());
                        return Promise.resolve(true);
                    }
                    catch (e) {
                        return Promise.reject(e);
                    }
                };
                return AlertAction;
            })(action_1.Action);
            exports_1("AlertAction", AlertAction);
        }
    }
});

System.register("src/core/events/message", [], function(exports_1) {
    var Message;
    return {
        setters:[],
        execute: function() {
            Message = (function () {
                function Message(name, data) {
                    if (data === void 0) { data = null; }
                    this._name = name;
                    this._data = data;
                }
                Object.defineProperty(Message.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Message.prototype, "data", {
                    get: function () {
                        return this._data;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Message;
            })();
            exports_1("Message", Message);
        }
    }
});

System.register("src/core/events/message-channel", [], function(exports_1) {
    var MessageChannel;
    return {
        setters:[],
        execute: function() {
            MessageChannel = (function () {
                function MessageChannel(name) {
                    this._name = name;
                }
                Object.defineProperty(MessageChannel.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    enumerable: true,
                    configurable: true
                });
                MessageChannel.prototype.send = function (message) {
                    throw new Error('Not implemented!');
                };
                return MessageChannel;
            })();
            exports_1("MessageChannel", MessageChannel);
        }
    }
});

System.register("src/core/services/channel-service", ["src/core/events/message-channel"], function(exports_1) {
    var message_channel_1;
    var ChannelService;
    return {
        setters:[
            function (message_channel_1_1) {
                message_channel_1 = message_channel_1_1;
            }],
        execute: function() {
            ChannelService = (function () {
                function ChannelService() {
                }
                ChannelService.getChannel = function (channelName) {
                    return ChannelService._channels.get(channelName);
                };
                ChannelService.create = function (channelName) {
                    if (ChannelService._channels.has(channelName)) {
                        throw new Error('Channel "' + channelName + '" already exists.');
                    }
                    var channel = new message_channel_1.MessageChannel(channelName);
                    ChannelService._channels.set(channelName, channel);
                    return channel;
                };
                return ChannelService;
            })();
            exports_1("ChannelService", ChannelService);
        }
    }
});

System.register("src/core/actions/broadcast-action", ["src/core/property", "src/core/actions/action", "src/core/actions/action-metadata", "src/core/events/message", "src/core/services/channel-service"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var property_1, action_1, action_metadata_1, message_1, channel_service_1;
    var SUPPORTED_PROPERTIES, METADATA, BroadcastAction;
    return {
        setters:[
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (action_1_1) {
                action_1 = action_1_1;
            },
            function (action_metadata_1_1) {
                action_metadata_1 = action_metadata_1_1;
            },
            function (message_1_1) {
                message_1 = message_1_1;
            },
            function (channel_service_1_1) {
                channel_service_1 = channel_service_1_1;
            }],
        execute: function() {
            SUPPORTED_PROPERTIES = new Map([
                ['channel', new property_1.Property('Channel Name', '')],
                ['message-name', new property_1.Property('Message Name', '')],
                ['message-data', new property_1.Property('Message Data', '')],
            ]);
            METADATA = Object.freeze(new action_metadata_1.ActionMetadata('broadcast-action', 'Broadcast', 'Action that allows to broadcast arbitrary data to any message channel', SUPPORTED_PROPERTIES));
            BroadcastAction = (function (_super) {
                __extends(BroadcastAction, _super);
                function BroadcastAction(overrides) {
                    _super.call(this, METADATA, overrides);
                }
                BroadcastAction.prototype.perform = function () {
                    try {
                        channel_service_1.ChannelService.getChannel(this.getProperty('channel').getValue()).send(new message_1.Message(this.getProperty('message-name').getValue(), this.getProperty('message-data').getValue()));
                        return Promise.resolve(true);
                    }
                    catch (e) {
                        return Promise.reject(e);
                    }
                };
                return BroadcastAction;
            })(action_1.Action);
            exports_1("BroadcastAction", BroadcastAction);
        }
    }
});

System.register("src/core/actions/change-property-action", ["src/core/property", "src/core/actions/action", "src/core/actions/action-metadata"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var property_1, action_1, action_metadata_1;
    var SUPPORTED_PROPERTIES, METADATA, ChangePropertyAction;
    return {
        setters:[
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (action_1_1) {
                action_1 = action_1_1;
            },
            function (action_metadata_1_1) {
                action_metadata_1 = action_metadata_1_1;
            }],
        execute: function() {
            SUPPORTED_PROPERTIES = new Map([
                ['control-id', new property_1.Property('Control', '', 'control')],
                ['property-name', new property_1.Property('Property Name', '')],
                ['property-value', new property_1.Property('Property Value', '')]
            ]);
            METADATA = Object.freeze(new action_metadata_1.ActionMetadata('change-property-action', 'Change Property', 'Action that allows to change any property of any control', SUPPORTED_PROPERTIES));
            ChangePropertyAction = (function (_super) {
                __extends(ChangePropertyAction, _super);
                function ChangePropertyAction(overrides) {
                    _super.call(this, METADATA, overrides);
                }
                ChangePropertyAction.prototype.perform = function (application) {
                    try {
                        var control = application.findControl(this.getProperty('control-id').getValue());
                        control.getProperty(this.getProperty('property-name').getValue()).setValue(this.getProperty('property-value').getValue());
                        return Promise.resolve(true);
                    }
                    catch (e) {
                        return Promise.reject(e);
                    }
                };
                return ChangePropertyAction;
            })(action_1.Action);
            exports_1("ChangePropertyAction", ChangePropertyAction);
        }
    }
});

System.register("src/core/actions/change-overrides-action", ["src/core/property", "src/core/actions/action", "src/core/actions/action-metadata"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var property_1, action_1, action_metadata_1;
    var SUPPORTED_PROPERTIES, METADATA, ChangeOverridesAction;
    return {
        setters:[
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (action_1_1) {
                action_1 = action_1_1;
            },
            function (action_metadata_1_1) {
                action_metadata_1 = action_metadata_1_1;
            }],
        execute: function() {
            SUPPORTED_PROPERTIES = new Map([
                ['control-id', new property_1.Property('Control', '', 'control')],
                ['overrides-name', new property_1.Property('State', '')]
            ]);
            METADATA = Object.freeze(new action_metadata_1.ActionMetadata('change-overrides-action', 'Change State', 'Action that allows to change property state', SUPPORTED_PROPERTIES));
            ChangeOverridesAction = (function (_super) {
                __extends(ChangeOverridesAction, _super);
                function ChangeOverridesAction(overrides) {
                    _super.call(this, METADATA, overrides);
                }
                ChangeOverridesAction.prototype.perform = function (application) {
                    try {
                        var control = application.findControl(this.getProperty('control-id').getValue());
                        var rootOverrides = control.overrides.getRoot();
                        var targetOverridesName = this.getProperty('overrides-name').getValue();
                        var targetOverrides = rootOverrides.name === targetOverridesName ?
                            rootOverrides : rootOverrides.find(targetOverridesName);
                        if (targetOverrides) {
                            control.overrides = targetOverrides;
                        }
                        return Promise.resolve(true);
                    }
                    catch (e) {
                        return Promise.reject(e);
                    }
                };
                return ChangeOverridesAction;
            })(action_1.Action);
            exports_1("ChangeOverridesAction", ChangeOverridesAction);
        }
    }
});

System.register("src/core/actions/change-own-overrides-action", ["src/core/property", "src/core/actions/action", "src/core/actions/action-metadata"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var property_1, action_1, action_metadata_1;
    var SUPPORTED_PROPERTIES, METADATA, ChangeOwnOverridesAction;
    return {
        setters:[
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (action_1_1) {
                action_1 = action_1_1;
            },
            function (action_metadata_1_1) {
                action_metadata_1 = action_metadata_1_1;
            }],
        execute: function() {
            SUPPORTED_PROPERTIES = new Map([
                ['overrides-name', new property_1.Property('State', '')]
            ]);
            METADATA = Object.freeze(new action_metadata_1.ActionMetadata('change-own-overrides-action', 'Change Own State', 'Action that allows to change own control state', SUPPORTED_PROPERTIES));
            ChangeOwnOverridesAction = (function (_super) {
                __extends(ChangeOwnOverridesAction, _super);
                function ChangeOwnOverridesAction(overrides) {
                    _super.call(this, METADATA, overrides);
                }
                ChangeOwnOverridesAction.prototype.perform = function (application, control) {
                    try {
                        var rootOverrides = control.overrides.getRoot();
                        var targetOverridesName = this.getProperty('overrides-name').getValue();
                        var targetOverrides = rootOverrides.name === targetOverridesName ?
                            rootOverrides : rootOverrides.find(targetOverridesName);
                        if (targetOverrides) {
                            control.overrides = targetOverrides;
                        }
                        return Promise.resolve(true);
                    }
                    catch (e) {
                        return Promise.reject(e);
                    }
                };
                return ChangeOwnOverridesAction;
            })(action_1.Action);
            exports_1("ChangeOwnOverridesAction", ChangeOwnOverridesAction);
        }
    }
});

System.register("src/core/property", [], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Property, PropertyWithOptions;
    return {
        setters:[],
        execute: function() {
            Property = (function () {
                function Property(name, value, type, isEditorVisible) {
                    this._name = name;
                    this._type = type;
                    this._value = value !== undefined ? value : null;
                    this._isEditorVisible = typeof isEditorVisible !== 'undefined' ?
                        isEditorVisible : true;
                }
                Property.prototype.getName = function () {
                    return this._name;
                };
                Property.prototype.getType = function () {
                    return this._type || typeof this._value;
                };
                Property.prototype.getValue = function () {
                    return this._value;
                };
                Property.prototype.setValue = function (value) {
                    this._value = value;
                };
                Property.prototype.isEditorVisible = function () {
                    return this._isEditorVisible;
                };
                return Property;
            })();
            exports_1("Property", Property);
            PropertyWithOptions = (function (_super) {
                __extends(PropertyWithOptions, _super);
                function PropertyWithOptions(name, options, value, type, isEditorVisible) {
                    _super.call(this, name, value !== undefined ? value : options[0].getValue(), type, isEditorVisible);
                    this._options = options;
                }
                PropertyWithOptions.prototype.getOptions = function () {
                    return this._options;
                };
                return PropertyWithOptions;
            })(Property);
            exports_1("PropertyWithOptions", PropertyWithOptions);
        }
    }
});

System.register("src/core/actions/action", ["src/core/overrides/overrides", "src/core/overrides/override-property"], function(exports_1) {
    var overrides_1, override_property_1;
    var Action;
    return {
        setters:[
            function (overrides_1_1) {
                overrides_1 = overrides_1_1;
            },
            function (override_property_1_1) {
                override_property_1 = override_property_1_1;
            }],
        execute: function() {
            Action = (function () {
                function Action(meta, overrides) {
                    this._meta = meta;
                    this._overrides = overrides || new overrides_1.Overrides('default');
                    this._properties = new Map();
                }
                Object.defineProperty(Action.prototype, "overrides", {
                    get: function () {
                        return this._overrides;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Action.prototype, "meta", {
                    get: function () {
                        return this._meta;
                    },
                    enumerable: true,
                    configurable: true
                });
                Action.prototype.perform = function (application, control) {
                    return Promise.reject(new Error('Not Implemented!'));
                };
                Action.prototype.getProperty = function (key) {
                    var property = this._properties.get(key);
                    if (!property) {
                        var metaProperty = this._meta.properties.get(key);
                        if (!metaProperty) {
                            return null;
                        }
                        var MetaPropertyType = 'getOptions' in metaProperty ?
                            override_property_1.OverridePropertyWithOptions :
                            override_property_1.OverrideProperty;
                        property = new MetaPropertyType(metaProperty, this, this._overrides.forKey('properties', key));
                        this._properties.set(key, property);
                    }
                    return property;
                };
                return Action;
            })();
            exports_1("Action", Action);
        }
    }
});

System.register("src/core/actions/action-metadata", [], function(exports_1) {
    var ActionMetadata;
    return {
        setters:[],
        execute: function() {
            ActionMetadata = (function () {
                function ActionMetadata(type, name, description, properties) {
                    this.type = type;
                    this.name = name;
                    this.description = description;
                    this.properties = properties || new Map();
                }
                return ActionMetadata;
            })();
            exports_1("ActionMetadata", ActionMetadata);
        }
    }
});

System.register("src/core/actions/navigate-action", ["src/core/property", "src/core/actions/action", "src/core/actions/action-metadata"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var property_1, action_1, action_metadata_1;
    var SUPPORTED_PROPERTIES, METADATA, NavigateAction;
    return {
        setters:[
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (action_1_1) {
                action_1 = action_1_1;
            },
            function (action_metadata_1_1) {
                action_metadata_1 = action_metadata_1_1;
            }],
        execute: function() {
            SUPPORTED_PROPERTIES = new Map([
                ['address', new property_1.Property('Address', '', 'url')],
                ['target', new property_1.PropertyWithOptions('Target', [
                        new property_1.Property('Same Tab', '_self'),
                        new property_1.Property('New Tab', '_blank')
                    ])]
            ]);
            METADATA = Object.freeze(new action_metadata_1.ActionMetadata('navigate-action', 'Navigate', 'Action that allows to navigate to another page', SUPPORTED_PROPERTIES));
            NavigateAction = (function (_super) {
                __extends(NavigateAction, _super);
                function NavigateAction(overrides) {
                    _super.call(this, METADATA, overrides);
                }
                NavigateAction.prototype.perform = function () {
                    try {
                        var target = this.getProperty('target').getValue();
                        var address = this.getProperty('address').getValue();
                        if (target === '_self') {
                            location.href = address;
                        }
                        else {
                            window.open(address, target);
                        }
                        return Promise.resolve(true);
                    }
                    catch (e) {
                        return Promise.reject(e);
                    }
                };
                return NavigateAction;
            })(action_1.Action);
            exports_1("NavigateAction", NavigateAction);
        }
    }
});

System.register("src/core/services/action-service", ["src/core/actions/alert-action", "src/core/actions/broadcast-action", "src/core/actions/change-property-action", "src/core/actions/change-overrides-action", "src/core/actions/change-own-overrides-action", "src/core/actions/navigate-action"], function(exports_1) {
    var alert_action_1, broadcast_action_1, change_property_action_1, change_overrides_action_1, change_own_overrides_action_1, navigate_action_1;
    var ActionService;
    return {
        setters:[
            function (alert_action_1_1) {
                alert_action_1 = alert_action_1_1;
            },
            function (broadcast_action_1_1) {
                broadcast_action_1 = broadcast_action_1_1;
            },
            function (change_property_action_1_1) {
                change_property_action_1 = change_property_action_1_1;
            },
            function (change_overrides_action_1_1) {
                change_overrides_action_1 = change_overrides_action_1_1;
            },
            function (change_own_overrides_action_1_1) {
                change_own_overrides_action_1 = change_own_overrides_action_1_1;
            },
            function (navigate_action_1_1) {
                navigate_action_1 = navigate_action_1_1;
            }],
        execute: function() {
            ActionService = (function () {
                function ActionService() {
                }
                ActionService.createByType = function (type, overrides) {
                    if (!ActionService.ACTIONS.has(type)) {
                        throw new Error('Not supported action type: ' + type);
                    }
                    var ActionClass = ActionService.ACTIONS.get(type);
                    return new ActionClass(overrides);
                };
                ActionService.clone = function (action) {
                    return ActionService.createByType(action.meta.type, action.overrides.clone());
                };
                ActionService.ACTIONS = new Map([
                    ['alert-action', alert_action_1.AlertAction],
                    ['broadcast-action', broadcast_action_1.BroadcastAction],
                    ['change-property-action', change_property_action_1.ChangePropertyAction],
                    ['change-overrides-action', change_overrides_action_1.ChangeOverridesAction],
                    ['change-own-overrides-action', change_own_overrides_action_1.ChangeOwnOverridesAction],
                    ['navigate-action', navigate_action_1.NavigateAction]
                ]);
                return ActionService;
            })();
            exports_1("ActionService", ActionService);
        }
    }
});

System.register("src/compilers/json/json-overrides-compiler", ["src/core/overrides/overrides"], function(exports_1) {
    var overrides_1;
    var JSONOverridesCompiler;
    return {
        setters:[
            function (overrides_1_1) {
                overrides_1 = overrides_1_1;
            }],
        execute: function() {
            JSONOverridesCompiler = (function () {
                function JSONOverridesCompiler() {
                }
                JSONOverridesCompiler.prototype.compile = function (overrides) {
                    return Promise.resolve({
                        current: overrides.name,
                        root: this.compileOverrides(overrides.getRoot())
                    });
                };
                JSONOverridesCompiler.prototype.decompile = function (compiledOverrides) {
                    var decompiledOverridesRoot = this.decompileOverrides(compiledOverrides.root);
                    // If we have non-default current and it differs from the root one, let's
                    // find and replace.
                    if (compiledOverrides.current ||
                        compiledOverrides.current !== decompiledOverridesRoot.name) {
                        decompiledOverridesRoot = decompiledOverridesRoot.find(compiledOverrides.current) || decompiledOverridesRoot;
                    }
                    return Promise.resolve(decompiledOverridesRoot);
                };
                JSONOverridesCompiler.prototype.compileOverrides = function (overrides) {
                    var jsonOverrides = {
                        name: overrides.name,
                        isEnabled: overrides.isEnabled,
                        isEditorVisible: overrides.isEditorVisible,
                        groups: []
                    };
                    overrides.groups.forEach(function (group, groupKey) {
                        var jsonGroup = [groupKey, []];
                        group.forEach(function (value, valueKey) {
                            jsonGroup[1].push([valueKey, value]);
                        });
                        jsonOverrides.groups.push(jsonGroup);
                    });
                    if (overrides.children.length) {
                        jsonOverrides.children = [];
                        for (var _i = 0, _a = overrides.children; _i < _a.length; _i++) {
                            var child = _a[_i];
                            jsonOverrides.children.push(this.compileOverrides(child));
                        }
                    }
                    return jsonOverrides;
                };
                JSONOverridesCompiler.prototype.decompileOverrides = function (jsonOverrides) {
                    var _this = this;
                    var overrides = new overrides_1.Overrides(jsonOverrides.name, new Map(jsonOverrides.groups.map(function (groupKeyValue) {
                        return [groupKeyValue[0], new Map(groupKeyValue[1])];
                    })), jsonOverrides.isEnabled, jsonOverrides.isEditorVisible);
                    if (jsonOverrides.children) {
                        jsonOverrides.children.forEach(function (child) {
                            overrides.add(_this.decompileOverrides(child));
                        });
                    }
                    return overrides;
                };
                return JSONOverridesCompiler;
            })();
            exports_1("JSONOverridesCompiler", JSONOverridesCompiler);
        }
    }
});

System.register("src/compilers/json/json-action-compiler", ["src/core/services/action-service", "src/compilers/json/json-overrides-compiler"], function(exports_1) {
    var action_service_1, JSONOverrides;
    var JSONActionCompiler;
    return {
        setters:[
            function (action_service_1_1) {
                action_service_1 = action_service_1_1;
            },
            function (JSONOverrides_1) {
                JSONOverrides = JSONOverrides_1;
            }],
        execute: function() {
            JSONActionCompiler = (function () {
                function JSONActionCompiler() {
                    this._overridesCompiler = new JSONOverrides.JSONOverridesCompiler();
                }
                JSONActionCompiler.prototype.compile = function (action) {
                    return this._overridesCompiler.compile(action.overrides).then(function (jsonOverrides) {
                        return { type: action.meta.type, overrides: jsonOverrides };
                    });
                };
                JSONActionCompiler.prototype.decompile = function (compiledAction) {
                    return this._overridesCompiler.decompile(compiledAction.overrides).then(function (overrides) {
                        return action_service_1.ActionService.createByType(compiledAction.type, overrides);
                    });
                };
                return JSONActionCompiler;
            })();
            exports_1("JSONActionCompiler", JSONActionCompiler);
        }
    }
});

System.register("src/compilers/angular/template/services/application-service", ["src/core/triggers/trigger", "src/core/services/action-service", "src/core/services/control-service", "src/compilers/json/json-application-compiler", "src/compilers/json/json-action-compiler", "src/compilers/angular/template/app-description"], function(exports_1) {
    var trigger_1, action_service_1, control_service_1, json_application_compiler_1, json_action_compiler_1, app_description_1;
    var ApplicationDatasource, Initializer, ApplicationService;
    return {
        setters:[
            function (trigger_1_1) {
                trigger_1 = trigger_1_1;
            },
            function (action_service_1_1) {
                action_service_1 = action_service_1_1;
            },
            function (control_service_1_1) {
                control_service_1 = control_service_1_1;
            },
            function (json_application_compiler_1_1) {
                json_application_compiler_1 = json_application_compiler_1_1;
            },
            function (json_action_compiler_1_1) {
                json_action_compiler_1 = json_action_compiler_1_1;
            },
            function (app_description_1_1) {
                app_description_1 = app_description_1_1;
            }],
        execute: function() {
            ApplicationDatasource = (function () {
                function ApplicationDatasource(items) {
                    this.items = items;
                }
                return ApplicationDatasource;
            })();
            exports_1("ApplicationDatasource", ApplicationDatasource);
            Initializer = (function () {
                function Initializer() {
                }
                Initializer.deserializeApplication = function () {
                    return (new json_application_compiler_1.JSONApplicationCompiler()).decompile(app_description_1.application);
                };
                Initializer.deserializeDatasources = function (application) {
                    var datasourceControls = application.serviceRoot.getChildren().filter(function (service) { return service.meta.type === 'datasource'; });
                    return new Map(datasourceControls.map(function (datasource) {
                        var itemsJSON = datasource.getProperty('items').getValue();
                        var items = itemsJSON ? JSON.parse(itemsJSON).map(function (propertyMap) { return new Map(propertyMap); }) : [];
                        return [datasource.id, new ApplicationDatasource(items)];
                    }));
                };
                return Initializer;
            })();
            ApplicationService = (function () {
                function ApplicationService(application, datasources) {
                    this.cloneOriginals = new Map();
                    this.actionCompiler = new json_action_compiler_1.JSONActionCompiler();
                    this.internalApplication = application;
                    this.internalDatasources = datasources;
                }
                Object.defineProperty(ApplicationService.prototype, "application", {
                    get: function () {
                        return this.internalApplication;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ApplicationService.prototype, "datasources", {
                    get: function () {
                        return this.internalDatasources;
                    },
                    enumerable: true,
                    configurable: true
                });
                ApplicationService.prototype.cloneControl = function (control) {
                    var _this = this;
                    var clonedTriggers = control.triggers.map(function (trigger) {
                        return new trigger_1.Trigger(trigger.name, trigger.condition, trigger.actions.map(function (action) { return action_service_1.ActionService.clone(action); }));
                    });
                    var clonedControl = control_service_1.ControlService.createByType(control.meta.type, control.overrides.getRoot().clone(), clonedTriggers);
                    if (clonedControl.overrides.name !== control.overrides.name) {
                        clonedControl.overrides = clonedControl.overrides.find(control.overrides.name);
                    }
                    control.getChildren().forEach(function (child) { return clonedControl.addChild(_this.cloneControl(child)); });
                    this.cloneOriginals.set(clonedControl.id, control);
                    return clonedControl;
                };
                ApplicationService.prototype.destroyClone = function (clonedControl) {
                    if (!this.cloneOriginals.has(clonedControl.id)) {
                        throw new Error('Control is not a clone!');
                    }
                    this.cloneOriginals.delete(clonedControl.id);
                };
                ApplicationService.prototype.getSource = function (clonedControl) {
                    return this.cloneOriginals.get(clonedControl.id);
                };
                ApplicationService.prototype.performActions = function (control, eventName) {
                    var _this = this;
                    var eventProperty = control.getEvent(eventName);
                    var propertyValue = eventProperty && eventProperty.getValue();
                    if (propertyValue) {
                        JSON.parse(propertyValue).forEach(function (jsonAction) {
                            _this.actionCompiler.decompile(jsonAction).then(function (action) {
                                action.perform(_this.application, control);
                            });
                        });
                    }
                };
                ApplicationService.initialize = function () {
                    if (!Initializer.initialization) {
                        Initializer.initialization = Initializer.deserializeApplication().then(function (application) {
                            return new ApplicationService(application, Initializer.deserializeDatasources(application));
                        });
                    }
                    return Initializer.initialization;
                };
                return ApplicationService;
            })();
            exports_1("ApplicationService", ApplicationService);
        }
    }
});

System.register("src/core/overrides/overrides", [], function(exports_1) {
    var Overrides;
    return {
        setters:[],
        execute: function() {
            Overrides = (function () {
                function Overrides(name, groups, isEnabled, isEditorVisible) {
                    if (groups === void 0) { groups = new Map(); }
                    if (isEnabled === void 0) { isEnabled = true; }
                    if (isEditorVisible === void 0) { isEditorVisible = true; }
                    this.name = name;
                    this.groups = groups;
                    this.isEnabled = isEnabled;
                    this.isEditorVisible = isEditorVisible;
                    this.parent = null;
                    this.children = [];
                    this.name = name;
                    this.groups = groups;
                    this.isEnabled = isEnabled;
                    this.isEditorVisible = isEditorVisible;
                }
                Overrides.prototype.getValue = function (groupKey, valueKey) {
                    var overrideValues = this.groups.get(groupKey);
                    if (overrideValues && overrideValues.has(valueKey)) {
                        return overrideValues.get(valueKey);
                    }
                    if (this.parent) {
                        return this.parent.getValue(groupKey, valueKey);
                    }
                };
                Overrides.prototype.setValue = function (groupKey, valueKey, value) {
                    var group = this.groups.get(groupKey);
                    if (!group) {
                        group = new Map();
                        this.groups.set(groupKey, group);
                    }
                    group.set(valueKey, value);
                };
                Overrides.prototype.add = function (overrides) {
                    overrides.parent = this;
                    this.children.push(overrides);
                };
                Overrides.prototype.remove = function (overrides) {
                    var childIndex = this.children.findIndex(function (child) { return child === overrides; });
                    if (childIndex >= 0) {
                        overrides.parent = null;
                        this.children.splice(childIndex, 1);
                    }
                };
                Overrides.prototype.find = function (name) {
                    for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                        var child = _a[_i];
                        if (child.name === name) {
                            return child;
                        }
                        var foundChild = child.find(name);
                        if (foundChild) {
                            return foundChild;
                        }
                    }
                    return null;
                };
                Overrides.prototype.getRoot = function () {
                    var root = this;
                    while (root.parent) {
                        root = root.parent;
                    }
                    return root;
                };
                Overrides.prototype.forKey = function (groupKey, key) {
                    var overrides = this;
                    return {
                        get: function () {
                            return overrides.getValue(groupKey, key);
                        },
                        set: function (value) {
                            overrides.setValue(groupKey, key, value);
                        }
                    };
                };
                Overrides.prototype.merge = function (overrides) {
                    var _this = this;
                    overrides.groups.forEach(function (group, groupKey) {
                        _this.groups.set(groupKey, group);
                    });
                };
                Overrides.prototype.clone = function () {
                    var clonedGroups = new Map();
                    this.groups.forEach(function (group, key) {
                        var clonedItems = new Map();
                        group.forEach(function (items, itemsKey) {
                            clonedItems.set(itemsKey, items);
                        });
                        clonedGroups.set(key, clonedItems);
                    });
                    var clonedOverrides = new Overrides(this.name, clonedGroups, this.isEnabled, this.isEditorVisible);
                    this.children.forEach(function (child) {
                        clonedOverrides.add(child.clone());
                    });
                    return clonedOverrides;
                };
                return Overrides;
            })();
            exports_1("Overrides", Overrides);
        }
    }
});

System.register("src/core/overrides/override-property", [], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var OverrideProperty, OverridePropertyWithOptions;
    return {
        setters:[],
        execute: function() {
            OverrideProperty = (function () {
                function OverrideProperty(property, owner, override) {
                    this._owner = owner;
                    this._property = property;
                    this._override = override;
                }
                Object.defineProperty(OverrideProperty.prototype, "owner", {
                    get: function () {
                        return this._owner;
                    },
                    enumerable: true,
                    configurable: true
                });
                OverrideProperty.prototype.getName = function () {
                    return this._property.getName();
                };
                OverrideProperty.prototype.getType = function () {
                    return this._property.getType();
                };
                OverrideProperty.prototype.getValue = function () {
                    var value = this._override.get();
                    return value !== undefined ? value : this._property.getValue();
                };
                OverrideProperty.prototype.setValue = function (value) {
                    this._override.set(value);
                };
                OverrideProperty.prototype.setOverride = function (override) {
                    this._override = override;
                };
                OverrideProperty.prototype.isEditorVisible = function () {
                    return this._property.isEditorVisible();
                };
                return OverrideProperty;
            })();
            exports_1("OverrideProperty", OverrideProperty);
            OverridePropertyWithOptions = (function (_super) {
                __extends(OverridePropertyWithOptions, _super);
                function OverridePropertyWithOptions(property, owner, override) {
                    _super.call(this, property, owner, override);
                }
                OverridePropertyWithOptions.prototype.getOptions = function () {
                    return this._property.getOptions();
                };
                return OverridePropertyWithOptions;
            })(OverrideProperty);
            exports_1("OverridePropertyWithOptions", OverridePropertyWithOptions);
        }
    }
});

System.register("src/core/controls/control", ["src/core/overrides/overrides", "src/core/overrides/override-property"], function(exports_1) {
    var overrides_1, override_property_1;
    var Control;
    return {
        setters:[
            function (overrides_1_1) {
                overrides_1 = overrides_1_1;
            },
            function (override_property_1_1) {
                override_property_1 = override_property_1_1;
            }],
        execute: function() {
            Control = (function () {
                function Control(id, meta, overrides, triggers) {
                    var _this = this;
                    this._propertyCache = new Map();
                    this.isTemplate = false;
                    this._id = id;
                    this._meta = meta;
                    this._parent = null;
                    this._children = [];
                    this._triggers = triggers || [];
                    overrides = overrides || new overrides_1.Overrides('default');
                    this._overrides = this.predefinedOverrides || overrides;
                    // If we have predefined overrides then:
                    // 1. If input overrides root is predefined as well - we should replace with
                    //    the current predefined overrides, and make the rest as children.
                    // 2. If input overrides don't contain predefined root or input overrides
                    //    are not provided and we use default overrides layer - we'll have to
                    //    make it as child of predefined overrides.
                    if (this.predefinedOverrides) {
                        var rootOverrides = overrides.getRoot();
                        (this.predefinedOverrides.name === rootOverrides.name ?
                            rootOverrides.children : [rootOverrides]).forEach(function (child) { return _this._overrides.add(child); });
                    }
                    if (this._overrides.name !== overrides.name) {
                        this._overrides = this._overrides.find(overrides.name);
                    }
                }
                Object.defineProperty(Control.prototype, "id", {
                    /**
                     * Unique id of the control.
                     * @returns {string}
                     */
                    get: function () {
                        return this._id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Control.prototype, "meta", {
                    /**
                     * Metadata that describes type of the control.
                     * @returns {ControlMetadata}
                     */
                    get: function () {
                        return this._meta;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Control.prototype, "overrides", {
                    /**
                     * States that current control has.
                     * @returns {IOverrides}
                     */
                    get: function () {
                        return this._overrides;
                    },
                    /**
                     * Sets control overrides.
                     * @param {IOverrides} value
                     */
                    set: function (value) {
                        var _this = this;
                        this._overrides = value;
                        this._propertyCache.forEach(function (group, groupKey) {
                            group.forEach(function (property, valueKey) {
                                property.setOverride(_this._overrides.forKey(groupKey, valueKey));
                            });
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Control.prototype, "triggers", {
                    /**
                     * List of triggers associated with the control.
                     * @returns {Array.<Trigger>}
                     */
                    get: function () {
                        return this._triggers;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Control.prototype, "parent", {
                    /**
                     * Gets control parent if any.
                     * @returns {Control}
                     */
                    get: function () {
                        return this._parent;
                    },
                    /**
                     * Sets parent for the current control.
                     * @param {Control} parent Parent control;
                     */
                    set: function (parent) {
                        this._parent = parent;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Finds child control by id, traverses through entire child tree.
                 * @param {string} id Id of the control to find.
                 * @returns {Control} Found child control.
                 */
                Control.prototype.find = function (id) {
                    if (this.id === id) {
                        return this;
                    }
                    for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
                        var control = _a[_i];
                        var child = control.find(id);
                        if (child) {
                            return child;
                        }
                    }
                    return null;
                };
                /**
                 * Adds child to the children collection.
                 * @param {Control} child Control to add as child.
                 */
                Control.prototype.addChild = function (child) {
                    child.parent = this;
                    this._children.push(child);
                };
                /**
                 * Removes child control from the children list.
                 * @param {Control} control Child control to remove.
                 */
                Control.prototype.removeChild = function (control) {
                    var childIndex = this._children.indexOf(control);
                    if (childIndex >= 0) {
                        control.parent = null;
                        this._children.splice(childIndex, 1);
                    }
                };
                /**
                 * List of controls children if any.
                 * @returns {Array.<Control>}
                 */
                Control.prototype.getChildren = function () {
                    return this._children.slice();
                };
                /**
                 * Indicates whether control can host other controls.
                 * @returns {boolean}
                 */
                Control.prototype.canHaveChildren = function () {
                    return false;
                };
                /**
                 * Removes itself from the parent children list.
                 */
                Control.prototype.remove = function () {
                    if (this._parent) {
                        this._parent.removeChild(this);
                    }
                };
                Control.prototype.getProperty = function (key) {
                    return this.getPropertyView('properties', key);
                };
                Control.prototype.getStyle = function (key) {
                    return this.getPropertyView('styles', key);
                };
                Control.prototype.getEvent = function (key) {
                    return this.getPropertyView('events', key);
                };
                Control.prototype.getPropertyView = function (groupKey, valueKey) {
                    var cacheGroup = this._propertyCache.get(groupKey);
                    if (!cacheGroup) {
                        cacheGroup = new Map();
                        this._propertyCache.set(groupKey, cacheGroup);
                    }
                    var property = cacheGroup.get(valueKey);
                    if (!property) {
                        var metaProperty = this._meta[groupKey].get(valueKey);
                        if (!metaProperty) {
                            return null;
                        }
                        var MetaPropertyType = 'getOptions' in metaProperty ?
                            override_property_1.OverridePropertyWithOptions :
                            override_property_1.OverrideProperty;
                        property = new MetaPropertyType(metaProperty, this, this._overrides.forKey(groupKey, valueKey));
                        cacheGroup.set(valueKey, property);
                    }
                    return property;
                };
                Control.getMeta = function () {
                    throw new Error('Not Implemented!');
                };
                return Control;
            })();
            exports_1("Control", Control);
        }
    }
});

System.register("src/core/tools/promise-queue", [], function(exports_1) {
    var PromiseQueue;
    return {
        setters:[],
        execute: function() {
            PromiseQueue = (function () {
                function PromiseQueue() {
                }
                PromiseQueue.prototype.enqueue = function (callback) {
                    if (!this.queue) {
                        this.queue = Promise.resolve();
                    }
                    return this.queue = this.queue.then(callback);
                };
                return PromiseQueue;
            })();
            exports_1("PromiseQueue", PromiseQueue);
        }
    }
});

System.register("src/compilers/angular/template/services/component-service", [], function(exports_1) {
    var COMPONENT_CONFIG, ComponentService;
    return {
        setters:[],
        execute: function() {
            COMPONENT_CONFIG = new Map([
                ['button', {
                        name: 'ButtonComponent',
                        path: 'src/compilers/angular/template/components/button-component'
                    }],
                ['container', {
                        name: 'ContainerComponent',
                        path: 'src/compilers/angular/template/components/container-component'
                    }],
                ['label', {
                        name: 'LabelComponent',
                        path: 'src/compilers/angular/template/components/label-component'
                    }],
                ['link', {
                        name: 'LinkComponent',
                        path: 'src/compilers/angular/template/components/link-component'
                    }],
                ['list', {
                        name: 'ListComponent',
                        path: 'src/compilers/angular/template/components/list-component'
                    }],
                ['list-item', {
                        name: 'ContainerComponent',
                        path: 'src/compilers/angular/template/components/container-component'
                    }],
                ['range', {
                        name: 'RangeComponent',
                        path: 'src/compilers/angular/template/components/range-component'
                    }],
                ['text-input', {
                        name: 'TextInputComponent',
                        path: 'src/compilers/angular/template/components/text-input-component'
                    }]
            ]);
            ComponentService = (function () {
                function ComponentService() {
                }
                ComponentService.loadComponentType = function (controlType) {
                    var classDescription = COMPONENT_CONFIG.get(controlType);
                    return System.import(classDescription.path).then(function (module) { return module[classDescription.name]; });
                };
                return ComponentService;
            })();
            exports_1("ComponentService", ComponentService);
        }
    }
});

System.register("src/compilers/angular/template/components/base-component", ["angular2/core", "src/core/controls/control", "src/core/tools/promise-queue", "src/compilers/angular/template/services/component-service"], function(exports_1) {
    var core_1, control_1, promise_queue_1, component_service_1;
    var BaseComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (promise_queue_1_1) {
                promise_queue_1 = promise_queue_1_1;
            },
            function (component_service_1_1) {
                component_service_1 = component_service_1_1;
            }],
        execute: function() {
            BaseComponent = (function () {
                function BaseComponent(viewContainer, iterableDiffers, changeDetector, loader, applicationService, control) {
                    this.overridesToCssClass = new Map();
                    this.viewContainer = viewContainer;
                    this.iterableDiffers = iterableDiffers;
                    this.changeDetector = changeDetector;
                    this.loader = loader;
                    this.applicationService = applicationService;
                    this.control = control;
                }
                Object.defineProperty(BaseComponent.prototype, "control", {
                    get: function () {
                        return this.internalControl;
                    },
                    set: function (control) {
                        this.internalControl = control;
                        if (control && control.canHaveChildren()) {
                            this.nestedComponents = {
                                differ: this.iterableDiffers.find(control.getChildren()).create(this.changeDetector),
                                components: new Map()
                            };
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                BaseComponent.prototype.onControlAction = function (eventName) {
                    this.applicationService.performActions(this.internalControl, eventName);
                };
                BaseComponent.prototype.ngDoCheck = function () {
                    if (!this.internalControl) {
                        return;
                    }
                    this.checkChildren();
                    this.checkCssClass();
                };
                BaseComponent.prototype.checkChildren = function () {
                    var _this = this;
                    if (!this.internalControl.canHaveChildren()) {
                        return;
                    }
                    var changes = this.nestedComponents.differ.diff(this.internalControl.getChildren());
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
                BaseComponent.prototype.checkCssClass = function () {
                    // Current override name we should read for the current control.
                    var cssClass = this.overridesToCssClass.get(this.internalControl.overrides.name);
                    if (!cssClass) {
                        var cssClasses = [("vargin-" + this.internalControl.meta.type)];
                        // CSS classes are generated only for the source control (in case of lists,
                        // tables and etc - template control), so we should get source control and
                        // use its ID in CSS class mapping.
                        var sourceControl = this.applicationService.getSource(this.internalControl) || this.internalControl;
                        var overrides = this.internalControl.overrides;
                        while (overrides && overrides.name !== '__predefined__') {
                            cssClasses.push("vargin-" + sourceControl.id + "--" + overrides.name);
                            overrides = overrides.parent;
                        }
                        cssClass = cssClasses.join(' ');
                        this.overridesToCssClass.set(this.internalControl.overrides.name, cssClass);
                    }
                    this.cssClass = cssClass;
                };
                return BaseComponent;
            })();
            exports_1("BaseComponent", BaseComponent);
        }
    }
});

System.register("src/compilers/angular/template/components/text-input-component", ["angular2/core", "src/compilers/angular/template/services/application-service", "src/core/controls/control", "src/compilers/angular/template/components/base-component"], function(exports_1) {
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
    var core_1, application_service_1, control_1, base_component_1;
    var TextInputComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (application_service_1_1) {
                application_service_1 = application_service_1_1;
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
                function TextInputComponent(viewContainer, iterableDiffers, changeDetector, loader, applicationService, control) {
                    _super.call(this, viewContainer, iterableDiffers, changeDetector, loader, applicationService, control);
                }
                TextInputComponent = __decorate([
                    core_1.Component({
                        selector: 'vargin-input[vargin-type=text-input]',
                        properties: ['control'],
                        host: {
                            '[class]': 'cssClass'
                        }
                    }),
                    core_1.View({
                        template: "\n    <input\n      type=\"text\"\n      [placeholder]=\"control?.getProperty('placeholder').getValue()\"\n      [value]=\"control?.getProperty('value').getValue()\"\n    />\n  "
                    }),
                    __param(0, core_1.Inject(core_1.ViewContainerRef)),
                    __param(1, core_1.Inject(core_1.IterableDiffers)),
                    __param(2, core_1.Inject(core_1.ChangeDetectorRef)),
                    __param(3, core_1.Inject(core_1.DynamicComponentLoader)),
                    __param(4, core_1.Inject(application_service_1.ApplicationService)),
                    __param(5, core_1.Inject(control_1.Control))
                ], TextInputComponent);
                return TextInputComponent;
            })(base_component_1.BaseComponent);
            exports_1("TextInputComponent", TextInputComponent);
        }
    }
});
