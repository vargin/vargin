System.register("src/compilers/angular/angular-css-compiler", [], function(exports_1) {
    var AngularCSSCompiler;
    return {
        setters:[],
        execute: function() {
            AngularCSSCompiler = (function () {
                function AngularCSSCompiler() {
                }
                AngularCSSCompiler.prototype.compile = function (control) {
                    var cssClasses = new Set();
                    var overridesToCompile = [control.overrides.getRoot()];
                    while (overridesToCompile.length) {
                        var override = overridesToCompile.pop();
                        var compiledOverride = this.compileOverrides(control, override);
                        if (compiledOverride) {
                            cssClasses.add(compiledOverride);
                        }
                        overridesToCompile.push.apply(overridesToCompile, override.children);
                    }
                    return Promise.resolve(cssClasses);
                };
                AngularCSSCompiler.prototype.decompile = function (compiledCSS) {
                    return Promise.resolve(null);
                };
                AngularCSSCompiler.prototype.compileOverrides = function (control, overrides) {
                    var cssClassName = overrides.name === '__predefined__' ?
                        "vargin-" + control.meta.type :
                        "vargin-" + control.id + "--" + overrides.name;
                    var text = '';
                    control.meta.styles.forEach(function (meta, key) {
                        var value = overrides.getValue('styles', key);
                        if (!overrides.parent ||
                            overrides.parent.getValue('styles', key) !== value) {
                            text += key + ": " + (value || meta.getValue()) + ";";
                        }
                    });
                    return text && "." + cssClassName + " { " + text + " }";
                };
                return AngularCSSCompiler;
            })();
            exports_1("AngularCSSCompiler", AngularCSSCompiler);
        }
    }
});

System.register("src/compilers/angular/angular-application-compiler", ["src/core/tools/promise-queue", "src/compilers/json/json-application-compiler", "src/compilers/angular/angular-css-compiler"], function(exports_1) {
    var promise_queue_1, json_application_compiler_1, angular_css_compiler_1;
    var AngularApplicationCompiler;
    return {
        setters:[
            function (promise_queue_1_1) {
                promise_queue_1 = promise_queue_1_1;
            },
            function (json_application_compiler_1_1) {
                json_application_compiler_1 = json_application_compiler_1_1;
            },
            function (angular_css_compiler_1_1) {
                angular_css_compiler_1 = angular_css_compiler_1_1;
            }],
        execute: function() {
            AngularApplicationCompiler = (function () {
                function AngularApplicationCompiler() {
                    this.cssCompiler = new angular_css_compiler_1.AngularCSSCompiler();
                    this.jsonCompiler = new json_application_compiler_1.JSONApplicationCompiler();
                }
                AngularApplicationCompiler.prototype.compile = function (application) {
                    var _this = this;
                    var queue = new promise_queue_1.PromiseQueue();
                    var compiledApplication = null;
                    queue.enqueue(function () {
                        return _this.jsonCompiler.compile(application).then(function (jsonApplication) { return compiledApplication = jsonApplication; });
                    });
                    var styles = new Set();
                    application.pages.forEach(function (page) {
                        queue.enqueue(function () {
                            return _this.compileCSS(page.root).then(function (css) { return css.forEach(function (style) { return styles.add(style); }); });
                        });
                    });
                    return queue.enqueue(function () {
                        var css = "\n        vargin-input {\n          display: inline-flex;\n        }\n\n        vargin-input > input {\n          flex: 1;\n\n          background: inherit;\n          color: inherit;\n          border: none;\n          font: inherit;\n          padding: 0;\n          margin: 0;\n        }\n      ";
                        styles.forEach(function (style) { return css += style.trim(); });
                        return { application: compiledApplication, css: css };
                    });
                };
                AngularApplicationCompiler.prototype.decompile = function (compiledApplication) {
                    return null;
                };
                AngularApplicationCompiler.prototype.compileCSS = function (control) {
                    var _this = this;
                    var cssPromise = control.meta.styles.size > 0 ?
                        this.cssCompiler.compile(control) :
                        Promise.resolve(new Set());
                    return cssPromise.then(function (css) {
                        return Promise.all(control.getChildren().map(function (child) { return _this.compileCSS(child); })).then(function (childrenCSS) {
                            childrenCSS.forEach(function (childCSS) { return childCSS.forEach(function (rule) { return css.add(rule); }); });
                            return css;
                        });
                    });
                };
                return AngularApplicationCompiler;
            })();
            exports_1("AngularApplicationCompiler", AngularApplicationCompiler);
        }
    }
});

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

System.register("src/compilers/angular/template/app-description", [], function(exports_1) {
    var application;
    return {
        setters:[],
        execute: function() {
            exports_1("application", application = '');
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
                    var cssClass = this.overridesToCssClass.get(this.internalControl.overrides.name);
                    if (!cssClass) {
                        var cssClasses = [("vargin-" + this.internalControl.meta.type)];
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

System.register("src/compilers/application-compiler", [], function(exports_1) {
    return {
        setters:[],
        execute: function() {
        }
    }
});

System.register("src/compilers/compiler", [], function(exports_1) {
    var AbstractCompiler;
    return {
        setters:[],
        execute: function() {
            AbstractCompiler = (function () {
                function AbstractCompiler() {
                }
                AbstractCompiler.prototype.compile = function (entity) {
                    return Promise.reject(new Error('Not implemented!'));
                };
                AbstractCompiler.prototype.decompile = function (compiledEntity) {
                    return Promise.reject(new Error('Not implemented!'));
                };
                return AbstractCompiler;
            })();
            exports_1("AbstractCompiler", AbstractCompiler);
        }
    }
});

System.register("src/compilers/control-compiler", [], function(exports_1) {
    return {
        setters:[],
        execute: function() {
        }
    }
});
