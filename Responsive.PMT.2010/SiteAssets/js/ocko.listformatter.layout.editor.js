function $_global_splstlayouteditor() {
    var n, t, r;
    window.SP && (window.SPLST || (window.SPLST = {}), SPLST.ListTableLayoutEditor || (SPLST.ListTableLayoutEditor = {}), n = SPLST.ListTableLayoutEditor, n.__extends = function(n, t) {
        function r() {
            this.constructor = n
        }
        for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i]);
        n.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r)
    }, n.CFDisabled = !1, n.version = "2.3.2", n.rev = 636330434263221557, n.isTrial = !1, n.disableFeatures = !1, n.trialDaysCount = 0, n.trialLeftDays = null, n.isEnabled = !0, n.trace = !0, n.isExportEnabled = !0, n.licenseExpirationDate = null, n.customerTitle = null, n.spContext = null, n.spWeb = null, n.allProperties = {}, n.PROPERTY_BAG_PREFIX = "splst_layout_editor_", n.PROPERTY_BAG_EDIT_MODE_POSTFIX = "_edit", n.PROPERTY_BAG_GLOBAL_POSTFIX = "_global", n.PROPERTY_BAG_PLUGIN_SETTINGS_POSTFIX = "_plugin_settings", n.PROPERTY_BAG_WIDTH_POSTFIX = "_width", n.PROPERTY_BAG_STYLE_POSTFIX = "_style", n.PROPERTY_BAG_TABLE_STYLE_POSTFIX = "_table_style", n.PROPERTY_BAG_OPTIONS_POSTFIX = "_options", n.PROPERTY_BAG_PLUGIN_VISIBILITY = "plugin_visibility", n.PROPERTY_BAG_PLUGIN_MENU_VISIBILITY = "plugin_menu_visibility", n.PROPERTY_BAG_LIST_QUERY_ENABLED = "list_query_enabled", n.PROPERTY_BAG_VIEWS_MAPPING = "views_mapping", n.PROPERTY_BAG_EXPORT_ENABLED = "export_enabled", n.PROPERTY_BAG_VIEWS_SETTINGS = "views_settings", n.HEAD = "header", n.HEAD_DESCENDANTS = "header_descendants", n.HEAD_DESCENDANTS_SELECTORS = ["div[name]", 'div[colid="content"]'], n.COLUMN = "column", n.COLUMN_DESCENDANTS = "column_descendants", n.ALL_DESCENDANTS = "all_descendants", n.COLUMN_DESCENDANTS_SELECTORS = ["div[field]", "span:not(.ms-core-menu-title)", "div[align]", "a:not(.ms-core-menu-link)", ":not(.ms-core-menu-box)"], n.fieldBasedSelectors = {
        read: {
            LinkTitle: ["div[field]", "a:not(.ms-core-menu-link)"],
            LinkTitleNoMenu: ["a:not(.ms-core-menu-link)"],
            LinkFilename: ["a:not(.ms-core-menu-link)"],
            LinkFilenameNoMenu: ["a:not(.ms-core-menu-link)"],
            User: ["span:not(.ms-core-menu-title)"],
            Lookup: ["a:not(.ms-core-menu-link)"],
            Number: ["div[align]"],
            Currency: ["div[align]"],
            Boolean: [],
            Text: [],
            DateTime: ["span.ms-error"],
            Choice: [],
            URL: ["a:not(.ms-core-menu-link)"]
        },
        edit: {
            LinkTitle: ["div[field]", "a:not(.ms-core-menu-link)", ":not(.ms-core-menu-box)"],
            LinkTitleNoMenu: ["a:not(.ms-core-menu-link)"],
            LinkFilename: ["a:not(.ms-core-menu-link)", ":not(.ms-core-menu-box)"],
            LinkFilenameNoMenu: ["a:not(.ms-core-menu-link)"],
            User: ["span:not(.ms-core-menu-title)"],
            Lookup: ["a:not(.ms-core-menu-link)"],
            Number: ["div[align]"],
            Integer: ["div[align]"],
            Currency: ["div[align]"],
            Boolean: ["span:not(.ms-core-menu-title)"],
            Text: ["span:not(.ms-core-menu-title)"],
            DateTime: ["span:not(.ms-core-menu-title)"],
            Choice: ["span:not(.ms-core-menu-title)"],
            URL: ["a:not(.ms-core-menu-link)"]
        }
    }, n.DATA_COLUMN = "data_column", n.DATA_COLUMN_ALL_DESC = "dc_all_desc", n.SYS_COLUMN = "sys_col", n.SYS_COLUMN_ALL_DESC = "sc_all_desc", n.EDIT_MODE_COL_BG = "_bg", n.EVEN = "even", n.EVEN_DESCENDANTS = "even_descendants", n.ODD = "odd", n.ODD_DESCENDANTS = "odd_descendants", n.HOVER = "hovered", n.SELECTED = "selected", n.HEADER_HOVER = "header_hovered", n.CHANGED_CELL = "changed_cell", n.CHILD_STYLES = "child_styles", n.COMMON_QUERY_PARAMS = "common_params", n.contentPath = "/_catalogs/masterpage/splst/layouteditor/images/", n.cssPath = "/_catalogs/masterpage/splst/layouteditor/css/", n.scriptsPath = "/_catalogs/masterpage/splst/layouteditor/scripts/", n.isCssLoaded = !1, n.FONT_STYLE = {
        BOLD: 1,
        ITALIC: 2,
        UNDERLINE: 4,
        STRIKETHROUGH: 8
    }, n.FIELD_TYPES = {
        DateTime: "DateTime",
        Lookup: "Lookup",
        LookupMulti: "LookupMulti",
        Url: "URL",
        User: "User",
        Taxonomy: "TaxonomyFieldType"
    }, n.maxAdjustColumnWidth = 800, n.webRegionalSettings = null, n.webDateFormat = null, n.isMac = navigator.appVersion.indexOf("Mac") !== -1, n.scrollbarWidth = -1, n.minHeight = 210, n.isFF = typeof InstallTrigger != "undefined", n.FREEZE_STATES = {
        fixed: "fixed",
        unfreeze: "unfreeze",
        inherit: "inherit",
        auto: "auto"
    }, window.splst_layout_editor_ie || (window.splst_layout_editor_ie = function() {
        for (var i, n = 3, t = document.createElement("div"); t.innerHTML = "<!--[if gt IE " + ++n + "]><i><\/i><![endif]-->", t.getElementsByTagName("i")[0];);
        return n > 4 ? n : i
    }()), n.isIE = function() {
        var n = window.navigator,
            i = n.userAgent,
            t = !1;
        return n.appName === "Microsoft Internet Explorer" ? t = i.indexOf("MSIE ") > 0 : n.appName === "Netscape" && (t = i.indexOf("Trident/") > 0), t
    }, n.isEdge = function() {
        return navigator.appName == "Netscape" ? navigator.appVersion.indexOf("Edge") > -1 : !1
    }, n.isIE() && (document.msCSSOMElementFloatMetrics = !0), window.splst_booster_can_render || (window.splst_booster_can_render = !!(window.MSOWebPartPageFormName && (document.forms[MSOWebPartPageFormName]._wikiPageMode && document.forms[MSOWebPartPageFormName] && document.forms[MSOWebPartPageFormName]._wikiPageMode.value === "Edit" || document.forms[MSOWebPartPageFormName] && document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode && document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value === "1"))), n.cssRulesCount = 0, n._m = null, n.Modules = function() {
        return this._m ? this._m : (this._m = [this.ResizersControl], this.CFDisabled || this._m.push(this.ConditionalFormattingControl), this._m.push(this.AdvancedColumnSettingsModule), this._m)
    }, n.traceInfo = [], n.LBSTYLES_ELEMENT = "lbviewstyle", n.LBSTYLES_STYLES_ELEMENT = "styles", n.LBSTYLES_TABLE_STYLES_ELEMENT = "tablestyles", n.LBSTYLES_WIDTHS_ELEMENT = "widths", n.LBSTYLES_OPTIONS_ELEMENT = "options", n.LBSTYLES_PLUGIN_SETTINGS_ELEMENT = "pluginsettings", n.HIDDEN_VIEW_TITLE = "[[LB_SETTINGS_VIEW]]", n.LBLISTSTYLES_ELEMENT = "lbliststyle", n.LBLISTSTYLES_SETTINGS_ELEMENT = "settings", n.oneDay = 864e5, n.licenseLeftDays = null, n.licExpDaysCnt = 14, window.SPLST.ListTableLayoutEditor.locale || (window._spPageContextInfo && window.SPLST.ListTableLayoutEditor.loadResources ? window.SPLST.ListTableLayoutEditor.loadResources() : t = setInterval(function() {
        window._spPageContextInfo && window.SPLST.ListTableLayoutEditor.loadResources && (window.SPLST.ListTableLayoutEditor.loadResources(), clearInterval(t))
    }, 45)), n.threshold = 5e3, n.tbodySelector = '> tbody:not([groupstring]):not([id$=__page]):not([isloaded="false"])', n.PERSONAL_VIEWS_MODES = {
        "default": "default",
        hidden: "hidden",
        visible: "visible",
        menu: "menu"
    }, n.CELL_PROPERTIES = {
        valueVisible: "valueVisible"
    }, n.TableTemplates = {
        light: {
            light1: {
                header: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(119, 119, 119)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(217, 217, 217)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(255, 247, 156)"
                },
                selected: {
                    "background-color": "rgb(186, 186, 186)"
                },
                header_hovered: {
                    "background-color": "rgb(230, 230, 230)"
                },
                changed_cell: {
                    "background-color": "rgb(255, 247, 156)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 0,
                    rowIndex: 0
                }
            },
            light2: {
                header: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(119, 119, 119)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(221, 235, 247)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(200, 200, 200)"
                },
                selected: {
                    "background-color": "rgb(148, 194, 224)"
                },
                header_hovered: {
                    "background-color": "rgb(229, 242, 250)"
                },
                changed_cell: {
                    "background-color": "rgb(200, 200, 200)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 1,
                    rowIndex: 0
                }
            },
            light3: {
                header: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(119, 119, 119)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(252, 228, 214)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(200, 200, 200)"
                },
                selected: {
                    "background-color": "rgb(240, 183, 165)"
                },
                header_hovered: {
                    "background-color": "rgb(252, 235, 225)"
                },
                changed_cell: {
                    "background-color": "rgb(200, 200, 200)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 2,
                    rowIndex: 0
                }
            },
            light4: {
                header: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(119, 119, 119)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(237, 237, 237)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(255, 243, 115)"
                },
                selected: {
                    "background-color": "rgb(186, 186, 186)"
                },
                header_hovered: {
                    "background-color": "rgb(245, 245, 245)"
                },
                changed_cell: {
                    "background-color": "rgb(255, 243, 115)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 3,
                    rowIndex: 0
                }
            },
            light5: {
                header: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(119, 119, 119)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(255, 242, 204)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(188, 228, 174)"
                },
                selected: {
                    "background-color": "rgb(255, 192, 0)"
                },
                header_hovered: {
                    "background-color": "rgb(255, 230, 153)"
                },
                changed_cell: {
                    "background-color": "rgb(188, 228, 174)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 4,
                    rowIndex: 0
                }
            },
            light6: {
                header: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(119, 119, 119)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(217, 225, 242)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(200, 200, 200)"
                },
                selected: {
                    "background-color": "rgb(148, 194, 224)"
                },
                header_hovered: {
                    "background-color": "rgb(237, 244, 250)"
                },
                changed_cell: {
                    "background-color": "rgb(200, 200, 200)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 0,
                    rowIndex: 1
                }
            },
            light7: {
                header: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(119, 119, 119)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(226, 239, 218)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(200, 200, 200)"
                },
                selected: {
                    "background-color": "rgb(189, 211, 178)"
                },
                header_hovered: {
                    "background-color": "rgb(242, 249, 227)"
                },
                changed_cell: {
                    "background-color": "rgb(200, 200, 200)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 1,
                    rowIndex: 1
                }
            },
            light8: {
                header: {
                    "background-color": "rgb(0, 0, 0)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(255, 247, 156)"
                },
                selected: {
                    "background-color": "rgb(166, 166, 166)"
                },
                header_hovered: {
                    "background-color": "rgb(189, 189, 189)"
                },
                changed_cell: {
                    "background-color": "rgb(255, 247, 156)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 2,
                    rowIndex: 1
                }
            },
            light9: {
                header: {
                    "background-color": "rgb(91, 155, 213)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(237, 244, 250)"
                },
                selected: {
                    "background-color": "rgb(180, 218, 243)"
                },
                header_hovered: {
                    "background-color": "rgb(125, 199, 241)"
                },
                changed_cell: {
                    "background-color": "rgb(237, 244, 250)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 3,
                    rowIndex: 1
                }
            },
            light10: {
                header: {
                    "background-color": "rgb(237, 125, 49)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(252, 228, 214)"
                },
                selected: {
                    "background-color": "rgb(248, 203, 173)"
                },
                header_hovered: {
                    "background-color": "rgb(242, 164, 108)"
                },
                changed_cell: {
                    "background-color": "rgb(252, 228, 214)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 4,
                    rowIndex: 1
                }
            },
            light11: {
                header: {
                    "background-color": "rgb(165, 165, 165)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(215, 215, 215)"
                },
                selected: {
                    "background-color": "rgb(193, 193, 193)"
                },
                header_hovered: {
                    "background-color": "rgb(215, 215, 215)"
                },
                changed_cell: {
                    "background-color": "rgb(215, 215, 215)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 0,
                    rowIndex: 2
                }
            },
            light12: {
                header: {
                    "background-color": "rgb(255, 192, 0)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(255, 236, 179)"
                },
                selected: {
                    "background-color": "rgb(255, 220, 112)"
                },
                header_hovered: {
                    "background-color": "rgb(255, 220, 179)"
                },
                changed_cell: {
                    "background-color": "rgb(255, 236, 179)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 1,
                    rowIndex: 2
                }
            },
            light13: {
                header: {
                    "background-color": "rgb(68, 114, 196)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(217, 225, 242)"
                },
                selected: {
                    "background-color": "rgb(91, 155, 213)"
                },
                header_hovered: {
                    "background-color": "rgb(217, 225, 242)"
                },
                changed_cell: {
                    "background-color": "rgb(217, 225, 242)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 2,
                    rowIndex: 2
                }
            },
            light14: {
                header: {
                    "background-color": "rgb(112, 173, 71)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(226, 239, 218)"
                },
                selected: {
                    "background-color": "rgb(198, 224, 180)"
                },
                header_hovered: {
                    "background-color": "rgb(215, 231, 206)"
                },
                changed_cell: {
                    "background-color": "rgb(226, 239, 218)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 3,
                    rowIndex: 2
                }
            }
        },
        medium: {
            medium1: {
                header: {
                    "background-color": "rgb(0, 0, 0)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(217, 217, 217)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(255, 247, 156)"
                },
                selected: {
                    "background-color": "rgb(186, 186, 186)"
                },
                header_hovered: {
                    "background-color": "rgb(189, 189, 189)"
                },
                changed_cell: {
                    "background-color": "rgb(255, 247, 156)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 4,
                    rowIndex: 2
                }
            },
            medium2: {
                header: {
                    "background-color": "rgb(91, 155, 213)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(221, 235, 247)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(200, 200, 200)"
                },
                selected: {
                    "background-color": "rgb(148, 194, 224)"
                },
                header_hovered: {
                    "background-color": "rgb(125, 199, 241)"
                },
                changed_cell: {
                    "background-color": "rgb(200, 200, 200)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 0,
                    rowIndex: 3
                }
            },
            medium3: {
                header: {
                    "background-color": "rgb(237, 125, 49)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(252, 228, 214)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(200, 200, 200)"
                },
                selected: {
                    "background-color": "rgb(248, 203, 173)"
                },
                header_hovered: {
                    "background-color": "rgb(242, 164, 108)"
                },
                changed_cell: {
                    "background-color": "rgb(200, 200, 200)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 1,
                    rowIndex: 3
                }
            },
            medium4: {
                header: {
                    "background-color": "rgb(165, 165, 165)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(237, 237, 237)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(255, 247, 156)"
                },
                selected: {
                    "background-color": "rgb(193, 193, 193)"
                },
                header_hovered: {
                    "background-color": "rgb(215, 215, 215)"
                },
                changed_cell: {
                    "background-color": "rgb(255, 247, 156)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 2,
                    rowIndex: 3
                }
            },
            medium5: {
                header: {
                    "background-color": "rgb(255, 192, 0)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(255, 242, 204)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(215, 215, 215)"
                },
                selected: {
                    "background-color": "rgb(255, 220, 112)"
                },
                header_hovered: {
                    "background-color": "rgb(255, 220, 179)"
                },
                changed_cell: {
                    "background-color": "rgb(215, 215, 215)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 3,
                    rowIndex: 3
                }
            },
            medium6: {
                header: {
                    "background-color": "rgb(68, 114, 196)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(217, 225, 242)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(200, 200, 200)"
                },
                selected: {
                    "background-color": "rgb(148, 194, 224)"
                },
                header_hovered: {
                    "background-color": "rgb(190, 201, 227)"
                },
                changed_cell: {
                    "background-color": "rgb(200, 200, 200)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 4,
                    rowIndex: 3
                }
            },
            medium7: {
                header: {
                    "background-color": "rgb(112, 173, 71)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(255, 255, 255)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(226, 239, 218)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(215, 215, 215)"
                },
                selected: {
                    "background-color": "rgb(163, 191, 147)"
                },
                header_hovered: {
                    "background-color": "rgb(207, 218, 199)"
                },
                changed_cell: {
                    "background-color": "rgb(215, 215, 215)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 1,
                    rowIndex: 5
                }
            },
            medium8: {
                header: {
                    "background-color": "rgb(91, 155, 213)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(221, 235, 247)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(189, 215, 238)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(200, 200, 200)"
                },
                selected: {
                    "background-color": "rgb(117, 171, 220)"
                },
                header_hovered: {
                    "background-color": "rgb(190, 201, 227)"
                },
                changed_cell: {
                    "background-color": "rgb(200, 200, 200)"
                },
                child_styles: {
                    a: {
                        color: "rgb(0, 0, 200)"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 1,
                    rowIndex: 4
                }
            },
            medium9: {
                header: {
                    "background-color": "rgb(237, 125, 49)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(252, 228, 214)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(248, 203, 173)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(215, 215, 215)"
                },
                selected: {
                    "background-color": "rgb(191, 136, 109)"
                },
                header_hovered: {
                    "background-color": "rgb(233, 94, 0)"
                },
                changed_cell: {
                    "background-color": "rgb(215, 215, 215)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 2,
                    rowIndex: 4
                }
            },
            medium10: {
                header: {
                    "background-color": "rgb(165, 165, 165)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(237, 237, 237)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(219, 219, 219)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(255, 247, 156)"
                },
                selected: {
                    "background-color": "rgb(186, 186, 186)"
                },
                header_hovered: {
                    "background-color": "rgb(203, 203, 203)"
                },
                changed_cell: {
                    "background-color": "rgb(255, 247, 156)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 3,
                    rowIndex: 4
                }
            },
            medium11: {
                header: {
                    "background-color": "rgb(255, 192, 0)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(255, 242, 204)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(255, 230, 153)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(215, 215, 215)"
                },
                selected: {
                    "background-color": "rgb(238, 194, 100)"
                },
                header_hovered: {
                    "background-color": "rgb(255, 167, 0)"
                },
                changed_cell: {
                    "background-color": "rgb(215, 215, 215)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 4,
                    rowIndex: 4
                }
            },
            medium12: {
                header: {
                    "background-color": "rgb(68, 114, 196)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(217, 225, 242)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(180, 198, 231)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(186, 186, 186)"
                },
                selected: {
                    "background-color": "rgb(117, 171, 220)"
                },
                header_hovered: {
                    "background-color": "rgb(190, 201, 227)"
                },
                changed_cell: {
                    "background-color": "rgb(186, 186, 186)"
                },
                child_styles: {
                    a: {
                        color: "rgb(0, 0, 200)"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 0,
                    rowIndex: 5
                }
            },
            medium13: {
                header: {
                    "background-color": "rgb(112, 173, 71)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(226, 239, 218)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(198, 224, 180)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(186, 186, 186)"
                },
                selected: {
                    "background-color": "rgb(163, 191, 147)"
                },
                header_hovered: {
                    "background-color": "rgb(207, 218, 199)"
                },
                changed_cell: {
                    "background-color": "rgb(186, 186, 186)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 2,
                    rowIndex: 5
                }
            },
            medium14: {
                header: {
                    "background-color": "rgb(217, 217, 217)",
                    color: "rgb(119, 119, 119)"
                },
                even: {
                    "background-color": "rgb(217, 217, 217)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(166, 166, 166)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(255, 247, 156)"
                },
                selected: {
                    "background-color": "rgb(145, 153, 184)"
                },
                header_hovered: {
                    "background-color": "rgb(235, 235, 235)"
                },
                changed_cell: {
                    "background-color": "rgb(255, 247, 156)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 3,
                    rowIndex: 5
                }
            },
            medium15: {
                header: {
                    "background-color": "rgb(221, 235, 247)",
                    color: "rgb(119, 119, 119)"
                },
                even: {
                    "background-color": "rgb(221, 235, 247)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(189, 215, 238)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(200, 200, 200)"
                },
                selected: {
                    "background-color": "rgb(148, 194, 224)"
                },
                header_hovered: {
                    "background-color": "rgb(190, 201, 227)"
                },
                changed_cell: {
                    "background-color": "rgb(200, 200, 200)"
                },
                child_styles: {
                    a: {
                        color: "rgb(0, 0, 200)"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 4,
                    rowIndex: 5
                }
            },
            medium16: {
                header: {
                    "background-color": "rgb(252, 228, 214)",
                    color: "rgb(119, 119, 119)"
                },
                even: {
                    "background-color": "rgb(252, 228, 214)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(248, 203, 173)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(255, 224, 142)"
                },
                selected: {
                    "background-color": "rgb(191, 136, 109)"
                },
                header_hovered: {
                    "background-color": "rgb(255, 155, 105)"
                },
                changed_cell: {
                    "background-color": "rgb(255, 224, 142)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 0,
                    rowIndex: 6
                }
            },
            medium17: {
                header: {
                    "background-color": "rgb(237, 237, 237)",
                    color: "rgb(119, 119, 119)"
                },
                even: {
                    "background-color": "rgb(237, 237, 237)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(219, 219, 219)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(255, 247, 156)"
                },
                selected: {
                    "background-color": "rgb(186, 186, 186)"
                },
                header_hovered: {
                    "background-color": "rgb(203, 203, 203)"
                },
                changed_cell: {
                    "background-color": "rgb(255, 247, 156)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 1,
                    rowIndex: 6
                }
            },
            medium18: {
                header: {
                    "background-color": "rgb(255, 242, 204)",
                    color: "rgb(119, 119, 119)"
                },
                even: {
                    "background-color": "rgb(255, 242, 204)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(255, 230, 153)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(255, 200, 129)"
                },
                selected: {
                    "background-color": "rgb(202, 174, 92)"
                },
                header_hovered: {
                    "background-color": "rgb(255, 200, 129)"
                },
                changed_cell: {
                    "background-color": "rgb(255, 200, 129)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 2,
                    rowIndex: 6
                }
            },
            medium19: {
                header: {
                    "background-color": "rgb(217, 225, 242)",
                    color: "rgb(119, 119, 119)"
                },
                even: {
                    "background-color": "rgb(217, 225, 242)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(180, 198, 231)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(186, 186, 186)"
                },
                selected: {
                    "background-color": "rgb(117, 171, 220)"
                },
                header_hovered: {
                    "background-color": "rgb(190, 201, 227)"
                },
                changed_cell: {
                    "background-color": "rgb(186, 186, 186)"
                },
                child_styles: {
                    a: {
                        color: "rgb(0, 0, 200)"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 3,
                    rowIndex: 6
                }
            },
            medium20: {
                header: {
                    "background-color": "rgb(226, 239, 218)",
                    color: "rgb(119, 119, 119)"
                },
                even: {
                    "background-color": "rgb(226, 239, 218)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(198, 224, 180)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(186, 186, 186)"
                },
                selected: {
                    "background-color": "rgb(163, 191, 147)"
                },
                header_hovered: {
                    "background-color": "rgb(207, 218, 199)"
                },
                changed_cell: {
                    "background-color": "rgb(186, 186, 186)"
                },
                child_styles: {
                    a: {
                        color: "#0072c6"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 4,
                    rowIndex: 6
                }
            }
        },
        dark: {
            dark1: {
                header: {
                    "background-color": "rgb(0, 0, 0)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(217, 217, 217)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(166, 166, 166)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(255, 247, 156)"
                },
                selected: {
                    "background-color": "rgb(145, 153, 184)"
                },
                header_hovered: {
                    "background-color": "rgb(189, 189, 189)"
                },
                changed_cell: {
                    "background-color": "rgb(255, 247, 156)"
                },
                child_styles: {
                    a: {
                        color: "rgb(0, 0, 200)"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 0,
                    rowIndex: 4
                }
            },
            dark2: {
                header: {
                    "background-color": "rgb(0, 0, 0)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(91, 155, 213)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(47, 117, 181)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(180, 218, 243)"
                },
                selected: {
                    "background-color": "rgb(186, 186, 186)"
                },
                header_hovered: {
                    "background-color": "rgb(189, 189, 189)"
                },
                changed_cell: {
                    "background-color": "rgb(180, 218, 243)"
                },
                child_styles: {
                    a: {
                        color: "rgb(0, 0, 200)"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 0,
                    rowIndex: 7
                }
            },
            dark3: {
                header: {
                    "background-color": "rgb(0, 0, 0)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(237, 125, 49)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(198, 89, 17)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(255, 177, 138)"
                },
                selected: {
                    "background-color": "rgb(150, 150, 150)"
                },
                header_hovered: {
                    "background-color": "rgb(189, 189, 189)"
                },
                changed_cell: {
                    "background-color": "rgb(255, 177, 138)"
                },
                child_styles: {
                    a: {
                        color: "rgb(0, 0, 200)"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 1,
                    rowIndex: 7
                }
            },
            dark4: {
                header: {
                    "background-color": "rgb(0, 0, 0)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(165, 165, 165)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(123, 123, 123)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(235, 235, 235)"
                },
                selected: {
                    "background-color": "rgb(124, 179, 210)"
                },
                header_hovered: {
                    "background-color": "rgb(189, 189, 189)"
                },
                changed_cell: {
                    "background-color": "rgb(235, 235, 235)"
                },
                child_styles: {
                    a: {
                        color: "rgb(0, 0, 200)"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 2,
                    rowIndex: 7
                }
            },
            dark5: {
                header: {
                    "background-color": "rgb(0, 0, 0)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(255, 192, 0)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(191, 143, 0)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(255, 247, 156)"
                },
                selected: {
                    "background-color": "rgb(206, 228, 162)"
                },
                header_hovered: {
                    "background-color": "rgb(189, 189, 189)"
                },
                changed_cell: {
                    "background-color": "rgb(255, 247, 156)"
                },
                child_styles: {
                    a: {
                        color: "rgb(0, 0, 200)"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 3,
                    rowIndex: 7
                }
            },
            dark6: {
                header: {
                    "background-color": "rgb(0, 0, 0)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(112, 173, 71)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(84, 130, 53)",
                    color: "rgb(68, 68, 68)"
                },
                selected: {
                    "background-color": "rgb(4, 151, 154)"
                },
                hovered: {
                    "background-color": "rgb(122, 201, 132)"
                },
                header_hovered: {
                    "background-color": "rgb(189, 189, 189)"
                },
                changed_cell: {
                    "background-color": "rgb(122, 201, 132)"
                },
                child_styles: {
                    a: {
                        color: "rgb(0, 0, 200)"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 4,
                    rowIndex: 7
                }
            },
            dark7: {
                header: {
                    "background-color": "rgb(237, 125, 49)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(221, 235, 247)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(189, 215, 238)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(200, 200, 200)"
                },
                selected: {
                    "background-color": "rgb(117, 171, 220)"
                },
                header_hovered: {
                    "background-color": "rgb(242, 164, 108)"
                },
                changed_cell: {
                    "background-color": "rgb(200, 200, 200)"
                },
                child_styles: {
                    a: {
                        color: "rgb(0, 0, 200)"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 0,
                    rowIndex: 8
                }
            },
            dark8: {
                header: {
                    "background-color": "rgb(255, 192, 0)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(237, 237, 237)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(219, 219, 219)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(255, 247, 156)"
                },
                selected: {
                    "background-color": "rgb(186, 186, 186)"
                },
                header_hovered: {
                    "background-color": "rgb(255, 167, 0)"
                },
                changed_cell: {
                    "background-color": "rgb(255, 247, 156)"
                },
                child_styles: {
                    a: {
                        color: "rgb(0, 0, 200)"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 1,
                    rowIndex: 8
                }
            },
            dark9: {
                header: {
                    "background-color": "rgb(112, 173, 71)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(221, 235, 247)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(189, 215, 238)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(200, 200, 200)"
                },
                selected: {
                    "background-color": "rgb(117, 171, 220)"
                },
                header_hovered: {
                    "background-color": "rgb(207, 218, 199)"
                },
                changed_cell: {
                    "background-color": "rgb(200, 200, 200)"
                },
                child_styles: {
                    a: {
                        color: "rgb(0, 0, 200)"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 2,
                    rowIndex: 8
                }
            },
            dark10: {
                header: {
                    "background-color": "rgb(216, 65, 44)",
                    color: "rgb(255, 255, 255)"
                },
                even: {
                    "background-color": "rgb(196, 194, 195)",
                    color: "rgb(68, 68, 68)"
                },
                odd: {
                    "background-color": "rgb(219, 219, 221)",
                    color: "rgb(68, 68, 68)"
                },
                hovered: {
                    "background-color": "rgb(255, 247, 156)"
                },
                selected: {
                    "background-color": "rgb(145, 153, 184)"
                },
                header_hovered: {
                    "background-color": "rgb(242, 164, 108)"
                },
                changed_cell: {
                    "background-color": "rgb(200, 200, 200)"
                },
                child_styles: {
                    a: {
                        color: "rgb(0, 0, 200)"
                    },
                    "a:hover": {
                        "text-decoration": "underline"
                    }
                },
                img: {
                    colIndex: 3,
                    rowIndex: 8
                }
            }
        }
    }, n.defaultLocale = {
        styles: {
            staticTab: {
                width: "650"
            },
            cfTab: {
                width: "768"
            },
            advancedTab: {
                width: "508"
            },
            rulesContainer: {
                style: "width: 750px;"
            },
            cfRulesOrder: {
                style: "width: 4%;"
            },
            cfRuleType: {
                style: "width: 28%;"
            },
            cfRuleTypeSelect: {
                style: "width: 185px;"
            },
            cfFormula: {
                style: "width: 28%;"
            },
            cfExactDateSelect: {
                width: "85px"
            },
            cfRuleFormat: {
                style: "width: 38%;"
            },
            cfRuleAction: {
                style: "width: 2%;"
            },
            pbTypeItemContainer: {
                style: "margin-right: 25px; width: 236px;"
            },
            pbTypeItemContainerLast: {
                style: "width: 236px;"
            },
            pbTypeItem: {
                style: "left: 40px;"
            },
            pbScaleTooltip: {
                style: "width: 193px; margin-left: -97px;"
            },
            pbScaleEditor: {
                style: "width: 229px; margin-left: -115px;"
            },
            aboutDlg: {
                width: "710",
                height: "340",
                ff: {
                    height: "325"
                }
            },
            aboutCol: {
                style: "width: 320px;"
            },
            enableDlg: {
                width: "250"
            }
        },
        messages: {
            menuArrow: "&#9660;",
            clearAllQuestion: "Are you sure you want to clear all personalized stylings (page refresh may require)?",
            clearAllOptionsHeader: "Please choose the following options:",
            clearAllLocal: "Clear local style settings. The styles that were published by lists owners will still be applied.",
            clearAllGlobal: "Clear published style settings. This will impact other users. Only individual local styling will still be applied (if personalized styling is enabled).",
            clearAllWarning: "Warning: Page refresh may require.",
            clearAllTitle: "Clear All",
            pluginSettingsTitle: "List Booster User Experience Settings",
            columnSettingsTitle: "Column Settings",
            pluginName: "List<b>Booster<\/b>",
            pluginNamePlain: "List Booster",
            pluginDeactivatedArrow: "&nbsp;&#9658;",
            pluginActivatedArrow: "&nbsp;&#9668;",
            clearAllChangesLinkText: "Clear All Styling",
            clearChangesFailMessage: "Something went wrong. Changes are not deleted.",
            headerSettings: "Header",
            columnSettings: "Column",
            backgroundSettings: "Background:",
            fontColorSettings: "Font color:",
            sample: "Preview",
            globalChanges: "Change list table layout for all users",
            widthPermissions: "Viewers can change columns widths",
            columnPermissions: "Viewers can change columns visual styles",
            tablePermissions: "Viewers can change table styles",
            freezePanePermissions: "Viewers can freeze panes",
            configurePrintPermissions: "Viewer can configure print options",
            customPaging: 'Use "Booster" paging. Makes it easy to navigate between pages.',
            settingsInCookiesWarning: "Warning: personalized styling for users who have no \"manage\" permissions (viewers) for this list will be stored in the browser's cookies. This means that viewers may see different styling on each browser or device. Styling may be lost if the browser's cookies are deleted.",
            viewerSettingsTitle: "Viewers Personalization Settings",
            pluginVisibilityText: "Enable styling",
            pluginVisibilityTooltipText: "Change this option to enabledisable List Booster functionality for the list",
            pluginMenuVisibilityText: "Show Booster menu",
            pluginMenuVisibilityTooltipText: "Change this option to show/hide List Booster menu for the list (applied styling will remain)",
            listQueryEnabledText: "Enable Cross Page Queries",
            listQueryEnabledTooltipTextStatic: "Required for pagination",
            listQueryEnabledTooltipText: 'Required for pagination and conditional formatting "Process values from all pages" option',
            exportEnanbledText: "Enable styles export",
            exportEnabledTooltipText: "Change this option to enable/disable ability to save List Booster styles with list template",
            pluginVisibilityLoading: "Loading List Booster settings...",
            lbSettingsApplying: "Applying List Booster settings...",
            pluginVisibilityCaption: "List Booster",
            textAlign: "Text align:",
            fontStyle: "Font style:",
            poweredBy: "Powered by",
            sharepointalistUrl: "http://www.sharepointalist.com",
            headerSampleText: "Header",
            cellSampleText: ["First", "Second", "Third", "Fourth", "Fifth"],
            formatAsTable: "Table Styles",
            tableSettings: "Table Styles",
            light: "Light",
            medium: "Medium",
            dark: "Dark",
            clearStyles: "Clear table style",
            trialVersion: "You are using trial version.",
            trialLeft: "{0} days left.",
            trialExpired: "Your trial version has expired.",
            trialExpiredExtended: "Your trial version has expired and functionality is partially disabled. Please, update your license.",
            editLibraryWithComma: ", edit this library",
            editLibrary: "Edit this library",
            showQuickEditLink: 'Show "Quick Edit" link',
            collapseTasks: "Collapse tasks' hierarchy by default (will take effect after page refresh)",
            editLibraryHint: "Edit this library using Quick Edit mode.",
            staticColumnSettingsTabTitle: "Static formatting",
            conditionalFormatting: {
                addRule: "+ Add new rule",
                removeRules: "- Remove all rules",
                columnSettingsTabTitle: "Conditional formatting",
                rulesEmptyList: "There are no applied rules yet",
                rulesDelimiter: "──────────────────",
                and: "and",
                ignoreCase: "Ignore case",
                stopIfTrue: "Stop if true",
                hideText: "Hide cell value",
                processAllPages: "Process values from all pages",
                styleRow: "Apply styling to the whole row",
                styleRowInfo: "This option could be selected for one column only. Enabling it will override any previous selection.",
                indicator: "Indicator:",
                color: "Color:",
                align: "Align:",
                digitFormatError: 'Number format is incorrect - result of rule applying may be unexpected. Use "{0}" as decimal separator and "{1}" as thousand separator.',
                none: "None",
                noneDescription: "Please, select the type of conditional formatting you want to apply to this column",
                applyRules: "Apply rules",
                showProgressBar: "Show progress bar",
                pb: {
                    selectPBType: "Select progress bar style",
                    setupColor: "Set up color conditions",
                    setupRange: "Set up ranges",
                    linear: "Linear indicator",
                    radial: "Radial indicator",
                    startValue: "Minimum value, equals to 0%",
                    goalValue: "Maximum value, equals to 100%",
                    colorScale: {
                        showFromTo: "Show from {0} to",
                        pbColor: "Progress bar color",
                        removeColorCondition: "- Remove color condition",
                        addColorCondition: "Add color condition at ",
                        colorConditionTooltip: "Click here to edit color condition settings"
                    }
                },
                rules: {
                    text: {
                        contains: "Text contains",
                        notContains: "Text doesn't contain",
                        equal: "Text is equal",
                        startsWith: "Text starts with",
                        endsWith: "Text ends with",
                        isEmpty: "Cell is empty",
                        isNotEmpty: "Cell is not empty"
                    },
                    date: {
                        is: "Date is",
                        isBefore: "Date is before",
                        isAfter: "Date is after"
                    },
                    logicalDigit: {
                        greater: "Greater than",
                        greaterEqual: "Greater than or equal to",
                        less: "Less than",
                        lessEqual: "Less than or equal to",
                        equal: "Is equal to",
                        notEqual: "Is not equal to",
                        isBetween: "Is between",
                        isNotBetween: "Is not between"
                    },
                    topBottomDigit: {
                        top: "Top",
                        bottom: "Bottom",
                        topPercent: "Top %",
                        bottomPercent: "Bottom %"
                    },
                    averageDigit: {
                        equal: "Equals average",
                        above: "Above average",
                        below: "Below average",
                        equalOrAbove: "Equals or above average",
                        equalOrBelow: "Equals or below average"
                    }
                },
                typeBasedRules: {
                    user: {
                        current: "Contains current user"
                    }
                },
                dateFormulas: {
                    today: "today",
                    yesterday: "yesterday",
                    tomorrow: "tomorrow",
                    pastWeek: "in the past week",
                    thisWeek: "in this week",
                    nextWeek: "in the next week",
                    pastMonth: "in the past month",
                    thisMonth: "in this month",
                    nextMonth: "in the next month",
                    pastYear: "in the past year",
                    thisYear: "in this year",
                    nextYear: "in the next year",
                    exactDate: "exact date"
                }
            },
            displayAsHTML: "Display cell content as HTML",
            eulaHref: "{0}/_catalogs/masterpage/splst/layouteditor/EULA.pdf",
            eulaHrefText: "End-User License Agreement (EULA)",
            eulaWarning: "By using this software, you acknowledge that you accept the following {0}.",
            displayAsHTML: "Display cell content as HTML",
            systemColumn: "This is a system column. You can't change styles of system columns",
            notSupportedList: "This list or document library doesn't support List Booster styling",
            colorpickerDefaultColor: "Default color",
            freezePane: {
                iconTextFreeze: "Freeze Header",
                iconTextUnfreeze: "Unfreeze Header",
                dialogTitle: "Freeze Header",
                unfreeze: "Unfreezed",
                inherit: "Use public settings",
                freezeAuto: "Autoheight",
                freezeFixed: "Fixed height",
                height: "Height:"
            },
            truncateLongText: "Truncate long text",
            truncateLongTextInfo: "This option is enabled for Plain multiline text column only",
            advancedColSettings: {
                columnSettingsTabTitle: "Advanced",
                visibilityHeader: "Column is visible by",
                selectUsers: "Please select the users\\groups who can view this column",
                allUsers: "All users",
                specificUsers: "Specific users only",
                tabTooltip: "Advanced settings are available in Public Mode only"
            },
            lbSettings: "List Booster Settings",
            lbSettingsDescription: "Specifiy List Booster settings for this list.",
            lbSettingsDescriptionListExperience: "Specifiy List Booster settings for this list. <b>Make sure you are using Classic List Experience.<\/b>",
            lbListExperienceDescription: "Select the experience you want to use for this list. <b>List Booster works in Classic Experience only.<\/b>",
            workingOnIt: "Working on it...",
            licenseExpiring: "Your license is expiring in {0} days. Please, contact us for further assistance.",
            licenseExpired: "Your license has expired. Please, contact us for further assistance.",
            licenseExpiredExtended: "Your license has expired and functionality is partially disabled. Please, contact us for further assistance.",
            customStyles: "Personal styles&nbsp;&ndash;&nbsp;",
            reset: "Reset",
            publishOrResetCustomStyles: "Publish or reset",
            publishDialog: {
                title: "Personal Styles",
                resetStyles: "Reset styles",
                publishStyles: "Publish styles",
                publishOrResetCustomStylesActions: "{0} or {1}",
                customStylesNoPermsInfo: "The styles you have set up differ from published style settings. Please not that you do note have sufficient access privileges for this list. Because of that we have to store your styling changes (Table styles, font styles, columns size and colors) in browser cookies. This means that you would not be able to see your styling when using different browser or different device. You will also loose your styling if you or your administrator removes cookies from your browser.",
                customStylesInfo: "The styles you have set up differ from published style settings.",
                columnsStyles: "Columns styles",
                columnsWidths: "Columns widths",
                tableStyles: "Table styles",
                freezeHeader: "Freezed header settings",
                print: "Print settings",
                resetSelected: "Reset selected"
            },
            published: "Published",
            aboutDialog: {
                title: "About SharePoint List Booster",
                product: "SharePoint List Booster&nbsp;&ndash;&nbsp;Version ",
                copyright: "&copy; 2014-{0} Sharepointalist Inc. All Rights Reserved.",
                copyrightWarning: "Warning: This computer program is protected by copyright law and international treaties.<br />Unauthorized reproduction or distribution of this program, or any portion of it, may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under the law.",
                clickHere: "Click here",
                appreciateFeedback: "{0} if you have any issues or notes regarding our products or to request a new feature. We appreciate your feedback!",
                mailtoHref: "mailto:support@sharepointalist.com?subject=SharePoint%20List%20Booster%20Support&body=App%20Name%3A%20SharePoint%20List%20Booster%0AVersion%3A%20{Version}%0ABrowser%3A%20{browser}%0APlease%20describe%20your%20issue%20%2F%20question%20below%20this%20line%3A%0A-----------------------------------------------------%0A",
                eulaHref: "{0}/_catalogs/masterpage/splst/layouteditor/EULA.pdf",
                eulaHrefText: "End-User License Agreement (EULA)",
                eulaWarning: "By using this software, you acknowledge that you accept the following {0}.",
                needHelp: "Need help?",
                haveFeedback: "Have feedback?",
                video: "Watch video trainings on YouTube",
                manual: "Find an answer in User Guide",
                manualHref: "{0}/_catalogs/masterpage/splst/layouteditor/Features.pdf?rev={1}",
                edition: "{0}{1}&nbsp;{2}",
                customer: "Customer: <b>{0}<\/b>",
                licenseInfo: "License: <b>{0} ({1})<\/b>",
                perpetual: "Perpetual",
                subscription: "Subscription"
            },
            pro: "PRO",
            edition: "edition",
            textCase: "Text case:",
            "default": "Default",
            uppercase: "UPPER CASE",
            lowercase: "lower case",
            capitalize: "Capitalize",
            allowTextWrap: "Allow text wrap",
            allowBreakWord: "Allow break word",
            printSetup: "Print...",
            printDialog: {
                title: "Print View",
                printBtn: "Print",
                printSystemColumns: "Print system columns (checkboxes, context menu, etc.)",
                selectColumns: "Select view columns that should be printed",
                columnName: "Column Name"
            },
            resizerTooltip: "<b>{0}px<\/b>",
            cellBorders: "Show borders",
            viewsSettingsDlg: {
                title: "Views Settings",
                visible: "Displayed as links",
                "default": "Default",
                hidden: "Completely hidden",
                specificUsers: "Specific users only",
                menu: "Displayed in menu",
                views: "Views",
                info: "You can drag'n'drop items to change order within the section or move from one section to another to toggle view's link display type",
                warning: "Warning: these settings will be applied if the view is in 'Client-side rendering' mode",
                reset: "Reset to defaults",
                personalViews: "Personal Views"
            },
            viewPermissionsError: "You do not have permissions to access current view. Please, contact list administrator to request permissions.",
            currentViewSettings: "Current View Settings",
            viewsSettings: "Views Settings"
        }
    }, n.StylesheetWrapper = function(n) {
        var t = {
            _styleEl: null,
            _stylesheet: null,
            _rules: null,
            getStylesheet: function() {
                if (!this._stylesheet) {
                    var n = document.createElement("style");
                    n.appendChild(document.createTextNode(""));
                    document.head.appendChild(n);
                    this._styleEl = n;
                    this._stylesheet = n.sheet
                }
                return this._stylesheet
            },
            removeStylesheet: function() {
                this._styleEl && (document.head.removeChild(this._styleEl), delete this._styleEl, delete this._stylesheet, delete this._rules)
            },
            addStylesheetRule: function(n, t) {
                var f, u, o, e, i, r;
                if (!this.convertObjectToCssString(t)) {
                    this.removeStylesheetRule(n);
                    return
                }
                if (this._rules || (this._rules = {}), n.indexOf(",") !== -1) {
                    for (f = n.split(","), u = 0, o = f.length; u < o; u++) e = f[u].trim(), e && this.addStylesheetRule(e, t);
                    return
                }
                i = this.getStylesheet();
                this._rules[n] !== undefined ? (r = this._rules[n], this.removeCssRule(i, r)) : (r = (i.rules || i.cssRules).length, this._rules[n] = r);
                this.insertCssRule(i, n, t, r)
            },
            shiftStylesheetRule: function(n, t) {
                var r, i, e, u, f, o;
                if (this.convertObjectToCssString(t)) {
                    if (this._rules || (this._rules = {}), n.indexOf(",") !== -1) {
                        for (r = n.split(","), i = 0, e = r.length; i < e; i++) u = r[i].trim(), u && this.shiftStylesheetRule(u, t);
                        return
                    }
                    f = this.getStylesheet();
                    this._rules[n] !== undefined && (o = this._rules[n], this.removeCssRule(f, o), delete this._rules[n]);
                    jQuerySplst.each(this._rules, jQuerySplst.proxy(function(n, t) {
                        this._rules[n] = t + 1
                    }, this));
                    this._rules[n] = 0;
                    this.insertCssRule(f, n, t, 0)
                }
            },
            insertCssRule: function(n, t, i, r) {
                var u = this.convertObjectToCssString(i);
                "addRule" in n ? n.addRule(t, u, r) : "insertRule" in n && n.insertRule(t + "{" + u + "}", r);
                SPLST.ListTableLayoutEditor.cssRulesCount++
            },
            removeStylesheetRule: function(n, t) {
                var r, i, e, u, f, o;
                if (this._rules) {
                    if (n.indexOf(",") !== -1) {
                        for (r = n.split(","), i = 0, e = r.length; i < e; i++) u = r[i].trim(), u && this.removeStylesheetRule(u, t);
                        return
                    }
                    this._rules[n] !== undefined && (f = this._rules[n], o = this.getStylesheet(), delete this._rules[n], this.removeCssRule(o, f), t || jQuerySplst.each(this._rules, jQuerySplst.proxy(function(n, t) {
                        t > f && (this._rules[n] = t - 1)
                    }, this)))
                }
            },
            removeStylesheetRulesBySelectorPrefix: function(n, t) {
                var i, u, r, f;
                if (this._rules)
                    for (i = [], u = "." + n, jQuerySplst.each(this._rules, function(n) {
                            n.startsWith(u) && i.push(n)
                        }), r = 0, f = i.length; r < f; r++) this.removeStylesheetRule(i[r], t)
            },
            removeCssRule: function(n, t) {
                "removeRule" in n ? n.removeRule(t) : "deleteRule" in n && n.deleteRule(t);
                SPLST.ListTableLayoutEditor.cssRulesCount--
            },
            hasCssProperty: function(n, t) {
                if (this._rules && this._rules[n] !== undefined) {
                    var r = this._rules[n],
                        i = this.getStylesheet();
                    return !!(i.rules || i.cssRules)[r].style[t]
                }
                return !1
            },
            convertObjectToCssString: function(n) {
                if (jQuerySplst.type(n) === "string") return n;
                if (jQuerySplst.type(n) === "object") {
                    var t = "";
                    return jQuerySplst.each(n, function(n, i) {
                        var r = i;
                        n === "content" && (r = '"' + r + '"');
                        t += n + ": " + r + ";"
                    }), t
                }
                return ""
            },
            containsSelector: function(n) {
                return !!(this._rules && this._rules[n])
            }
        };
        return n && t.getStylesheet(), t
    }, n.Helper = function() {
        var n = {
                basic: null,
                table: null,
                cf: null,
                size: null
            },
            i, t = {
                webPartViewMapping: {},
                fieldNamesMapping: {
                    Title: {
                        storedName: "Title"
                    },
                    LinkTitle: {
                        storedName: "Title"
                    },
                    LinkTitleNoMenu: {
                        storedName: "Title"
                    },
                    LinkFilename: {
                        storedName: "LinkFilename"
                    },
                    LinkFileNameNoMenu: {
                        storedName: "LinkFilename"
                    },
                    FileLeafRef: {
                        storedName: "LinkFilename"
                    }
                },
                stylesheets: {
                    basic: "basic",
                    table: "table",
                    cf: "cf",
                    size: "size"
                },
                fixAllWidths: function(n, t, i) {
                    var u = n.rows,
                        f = u.length ? u[0].cells.length : 0,
                        e = SPLST.ListTableLayoutEditor.Helper,
                        r;
                    if (f)
                        for (r = 0; r < f; r++) e.fixWidth(n, r);
                    t && t.call(i)
                },
                getStandardColumnStyles: function(n, t, i) {
                    var b = SPLST.ListTableLayoutEditor,
                        v = jQuerySplst(n),
                        it = v.parent(),
                        y = [],
                        g = n.rows,
                        rt = v.attr("class").replace(/splst_layout_editor[_\w\d-]*\s*/g, "").trim(),
                        l, k, p, nt, u, s, h, c, e;
                    for (y.push('<table class="' + rt + '">'), l = [], l.push(g[0]), v.find("tbody[groupstring]").length ? (k = v.find('tbody[id*="tbod"][isloaded="true"]'), k.length && l.push(k[0].rows[0])) : l.push(g[1]), p = 0, nt = 2; p < nt; p++) {
                        var a = l[p],
                            ut = a && a.className ? a.className.replace(/splst_layout_editor[_\w\d-]*\s*/g, "").replace("s4-itm-selected", "").trim() : "",
                            d = a ? jQuerySplst(a.cells[t].outerHTML) : jQuerySplst("<td><\/td>"),
                            tt = d.attr("class");
                        tt && d.attr("class", tt.replace(/splst_layout_editor[_\w\d-]*\s*/g, "").trim());
                        y.push('<tr class="' + ut + '">' + d[0].outerHTML + "<\/tr>")
                    }
                    y.push("<\/table>");
                    u = jQuerySplst(y.join(""));
                    u.css({
                        position: "fixed",
                        left: "-3000px"
                    });
                    it.append(u);
                    var w = {},
                        o = jQuerySplst(u[0].rows[0].cells[0]),
                        f = jQuerySplst(u[0].rows[1].cells[0]),
                        r = w[b.HEAD] = {
                            "background-color": u.css("background-color") !== o.css("background-color") ? o.css("background-color") : "transparent",
                            color: u.css("color") !== o.css("color") ? o.css("color") : ""
                        };
                    return i ? (s = jQuerySplst(o.find('div[colid="coreContent"]')), s.length && (r["font-weight"] = s.css("font-weight"), r["font-style"] = s.css("font-style"), r["text-decoration"] = s.css("text-decoration"), r["text-align"] = s.css("text-align"))) : (h = jQuerySplst(o.find("div[name]")), r["font-weight"] = h.css("font-weight"), r["font-style"] = h.css("font-style"), r["text-decoration"] = h.css("text-decoration"), c = jQuerySplst(h.find("div[align]")), c.length ? (r["text-align"] = c.css("text-align"), prefixEndIndex = r["text-align"].lastIndexOf("-"), prefixEndIndex > -1 && (r["text-align"] = r["text-align"].slice(prefixEndIndex + 1))) : r["text-align"] = h.css("text-align")), r["text-align"] === "start" && (r["text-align"] = "left"), f && (w[b.COLUMN] = {
                        "background-color": u.css("background-color") !== f.css("background-color") ? f.css("background-color") : "transparent",
                        color: u.css("color") !== f.css("color") ? f.css("color") : "",
                        "font-weight": f.css("font-weight"),
                        "font-style": f.css("font-style"),
                        "text-decoration": f.css("text-decoration")
                    }, c = jQuerySplst(f.find("div[align]")), c.length ? (e = c.css("text-align"), prefixEndIndex = e.lastIndexOf("-"), prefixEndIndex > -1 && (e = e.slice(prefixEndIndex + 1))) : e = f.css("text-align"), e === "start" && (e = "left"), w[b.COLUMN]["text-align"] = e), u.remove(), w
                },
                getColWidthsWithTempTable: function(n, t, i, r) {
                    var s, f, y, e, o, w, a;
                    arguments.length || (s = arguments.callee.caller, s && (f = s.arguments, n = f[0], t = f[1], i = f[2], r = f[3]));
                    t = t || {};
                    var b = n[0],
                        v = n.parent(),
                        u = [],
                        k = n.find("> thead > tr, > tbody > tr, > tbody[data-splst-wrap] > tbody > tr"),
                        h = [];
                    u.push('<table class="' + b.className + '" style="max-width: ' + v.innerWidth() + 'px;">');
                    y = this;
                    jQuerySplst.each(k, function(n, i) {
                        var p, r, w, f, s, c, e, l;
                        if (i.cells && i.cells.length && i.parentNode.style.display !== "none" && i.style.display !== "none") {
                            for (p = i.className, u.push('<tr class="' + p + '">'), r = 0, w = i.cells.length; r < w; r++)
                                if (f = i.cells[r], !f.getAttribute("data-splst-sc")) {
                                    s = jQuerySplst(f);
                                    n === 0 && (c = s.find("div[name]"), c.length && (e = c.attr("name"), e = e && y.getStoredName(e), l = t[e], l && s.css("display") !== "none" && (h[r] = l)));
                                    var a = window.getComputedStyle(f),
                                        b = a.getPropertyValue("padding-left"),
                                        k = a.getPropertyValue("padding-right"),
                                        d = a.getPropertyValue("min-width"),
                                        v = jQuerySplst(f.outerHTML),
                                        o = v[0];
                                    b && (o.style.paddingLeft = b);
                                    k && (o.style.paddingRight = k);
                                    d && (o.style.minWidth = d);
                                    h[r] ? v.outerWidth(h[r]) : v.css("width", "");
                                    u.push(o.outerHTML)
                                }
                            u.push("<\/tr>")
                        }
                    });
                    u.push("<\/table>");
                    e = jQuerySplst(u.join(""));
                    e.css({
                        position: "fixed",
                        left: "-3000px"
                    });
                    v.append(e);
                    var c = [],
                        p = e[0].rows[0].cells,
                        l = 0;
                    for (o = 0, w = p.length; o < w; o++) a = p[o].offsetWidth, c.push(a), l += a;
                    if (e.remove(), i) i.call(r, {
                        widths: c,
                        tableWidth: l
                    });
                    else return {
                        widths: c,
                        tableWidth: l
                    }
                },
                fixWidthWithTempTable: function(n, t, i, r, u) {
                    var c, e, f, o, a, v;
                    arguments.length || (c = arguments.callee.caller, c && (e = c.arguments, n = e[0], t = e[1], r = e[2], u = e[3]));
                    var l = n[0],
                        y = n.parent(),
                        s = [],
                        h = n.find("> thead > tr, > tbody > tr, > tbody[data-splst-wrap] > tbody > tr"),
                        p = h[0] && jQuerySplst(h[0].cells[t]);
                    p.attr("data-splst-sc") || (s.push('<table class="lb-temp-table ' + l.className + '">'), jQuerySplst.each(h, function(n, r) {
                        if (r.cells && r.cells.length && !(r.cells.length <= t)) {
                            var h = r.cells[t],
                                f = window.getComputedStyle(h),
                                c = f.getPropertyValue("padding-left"),
                                l = f.getPropertyValue("padding-right"),
                                a = f.getPropertyValue("min-width"),
                                e = f.getPropertyValue("word-wrap"),
                                o = f.getPropertyValue("word-break"),
                                v = jQuerySplst(h.outerHTML),
                                u = v[0],
                                y = r.className;
                            c && (u.style.paddingLeft = c);
                            l && (u.style.paddingRight = l);
                            a && (u.style.minWidth = a);
                            e && e !== "inherit" && (u.style.wordWrap = e);
                            o && o !== "inherit" && (u.style.wordBreak = o);
                            v.outerWidth(i);
                            s.push('<tr class="' + y + '">' + u.outerHTML + "<\/tr>")
                        }
                    }), s.push("<\/table>"), f = jQuerySplst(s.join("")), f.css({
                        position: "fixed",
                        left: "-3000px"
                    }), f.outerWidth(i), y.append(f), o = f[0].offsetWidth, o < i && (o = i), a = jQuerySplst(h[0].cells[t]), v = l.offsetWidth, a.outerWidth(o), f.remove(), r && r.call(u, t, o, v))
                },
                fixWidth: function(n, t, i, r, u, f, e) {
                    var a, o, l, w, b;
                    arguments.length || (a = arguments.callee.caller, a && (o = a.arguments, n = o[0], t = o[1], i = o[2], r = o[3], u = o[4], f = o[5], e = o[6]));
                    var v = jQuerySplst(n).find("> thead > tr, > tbody > tr, > tbody[data-splst-wrap] > tbody > tr"),
                        c = 0,
                        k = v.length,
                        s = 0,
                        h, y, p, d = SPLST.ListTableLayoutEditor.isEdge();
                    if (h = v[0].cells[t], h) {
                        if (h.getAttribute("data-splst-sc")) {
                            i && i.call(r, t, SPLST.ListTableLayoutEditor.getScrollbarWidth());
                            return
                        }
                        if (s = p = h.offsetWidth, u)
                            for (c = 1; c < k; c++)
                                if ((l = v[c].cells[t], l) && (w = l.getAttribute("colspan"), !w || w == 1)) {
                                    y = l.offsetWidth;
                                    y > s && (s = y);
                                    break
                                }
                        h.style.maxWidth = "";
                        (!f && p !== s || f && f < s) && (b = parseInt(window.getComputedStyle(h).getPropertyValue("width")), h.style.width = b + (s - p) + "px", e && e.cols && e.cols[t].setAttribute("width", s + "px"));
                        i && i.call(r, t, s)
                    }
                },
                fixColSpans: function(n) {
                    if (n) {
                        var i = jQuerySplst(n),
                            t = jQuerySplst(n.rows[0].cells).not("[style*=hidden]").length,
                            r = i.find("td[colspan]");
                        jQuerySplst.each(r, function(n, i) {
                            var u = i.parentNode.cells.length,
                                f = parseInt(i.getAttribute("colspan")),
                                r;
                            f + u > t && (r = t - u + 1, r < 1 && (r = 1), i.setAttribute("colspan", r))
                        })
                    }
                },
                autoAdjustColumnWidth: function(n, t, i, r, u) {
                    var f = jQuerySplst(n),
                        g = f.parent(),
                        o = [],
                        c = f.find('[data-splst-wrap="true"]'),
                        l = f.attr("cellpadding"),
                        a = f.attr("cellspacing"),
                        v = f.attr("border"),
                        y, p, e, b, k, s, h, w, d;
                    for (c.length || (c = f), y = c.find("> tbody"), l && (l = 'cellpadding="' + l + '"'), a && (a = 'cellspacing="' + a + '"'), v && (v = 'border="' + v + '"'), p = "", e = 0; e < t; e++) p += '<td style="display: none;"><\/td>';
                    for (o.push('<table class="lb-temp-table ' + f.attr("class") + '">'), e = 0, b = y.length; e < b; e++) o.push("<tbody>"), k = y[e].rows, jQuerySplst.each(k, function(n, i) {
                        if (i.cells && i.cells.length && !(i.cells.length <= t)) {
                            var f = jQuerySplst(i).attr("class"),
                                r = '<tr class="' + f + '">' + p,
                                e = i.cells[t],
                                u = jQuerySplst(e.outerHTML);
                            u.css("width", "");
                            r += u[0].outerHTML + "<\/tr>";
                            o.push(r)
                        }
                    }), o.push("<\/tbody>");
                    o.push("<\/table>");
                    s = jQuerySplst(o.join(""));
                    s.css("position", "fixed");
                    s.css("left", "-3000px");
                    g.append(s);
                    h = s.outerWidth();
                    h > i && (h = i);
                    w = jQuerySplst(n.rows[0].cells[t]);
                    d = f.outerWidth();
                    w[0].style.maxWidth = "";
                    w.outerWidth(h);
                    s.remove();
                    r && r.call(u, t, h, d)
                },
                generatePoweredByBlockForDialogs: function(n) {
                    var u = SPLST.ListTableLayoutEditor,
                        r = u.locale.messages,
                        t = [],
                        i = _spPageContextInfo.siteServerRelativeUrl;
                    return i.indexOf("/") == i.length - 1 && (i = i.slice(0, -1)), n ? (t.push('<div style="text-align: right; color: rgb(68, 68, 68); margin: 7px 0; opacity: 0.5;">'), t.push("<label>" + r.poweredBy + " "), t.push('<a style="margin-left: 5px;" href="' + r.sharepointalistUrl + '" target="_blank">'), t.push('<img width="100" style="margin-bottom: -5px;" src="' + i + u.contentPath + 'Sharepointalist_small.png" />'), t.push("<\/a><\/label>"), t.push("<\/div>")) : (t.push('<div class="splst-layout-editor-poweredby">'), t.push("<label>" + r.poweredBy + " "), t.push('<a class="splst-logo-a" href="' + r.sharepointalistUrl + '" target="_blank">'), t.push('<img width="100" class="splst-logo-img" src="' + i + u.contentPath + 'Sharepointalist_small.png" />'), t.push("<\/a><\/label>"), t.push("<\/div>")), t.join("")
                },
                togglePreviewTableCellBorders: function() {
                    var r = document.querySelector(".splst-lb-preview-table"),
                        u, f, t, o, e, i, s, n;
                    if (r)
                        for (u = !(r.getAttribute("data-lb-bordered") === "true"), r.setAttribute("data-lb-bordered", u), f = r.rows, t = 1, o = f.length; t < o; t++)
                            for (e = f[t].cells, i = 0, s = e.length; i < s; i++) n = e[i], u ? (i === 0 && (n.style.borderLeft = "1px solid rgb(198, 198, 198)"), t === 1 && (n.style.borderTop = "1px solid rgb(198, 198, 198)"), n.style.borderRight = "1px solid rgb(198, 198, 198)", n.style.borderBottom = "1px solid rgb(198, 198, 198)") : n.style.borderLeft = n.style.borderTop = n.style.borderRight = n.style.borderBottom = ""
                },
                generateColumnSettingsPreviewTable: function(n) {
                    var u = SPLST.ListTableLayoutEditor,
                        f = u.locale.messages,
                        r = [],
                        t, i;
                    for (r.push('<table class="splst-lb-preview-table" cellpadding="5"'), n || jQuerySplst.each(u.ResizersControl.columnSettings, function(n, t) {
                            r.push(" data-" + t + '-haschanges="false"')
                        }), r.push(">"), t = 0; t < 7; t++) i = "splst-lb-preview-td", text = "&nbsp;", t === 0 ? (text = f.headerSampleText, i += " splst-lb-preview-head") : (n || (i += " splst-lb-preview-cell"), t === 1 && (i += " top"), n && (i += t % 2 == 0 ? " splst-layout-editor-preview-even" : " splst-layout-editor-preview-odd"), t !== 6 && (text = f.cellSampleText[t - 1])), n ? r.push("<tr " + (t == 0 ? 'class="ms-vh2"' : "") + '><td class="' + i + (t !== 0 ? " left" : "") + '">&nbsp<\/td><td class="' + i + '">' + text + '<\/td><td class="' + i + '">&nbsp;<\/td><\/tr>') : r.push("<tr " + (t == 0 ? 'class="ms-vh2"' : "") + '><td class="' + (t !== 0 ? " left" : "") + '">&nbsp<\/td><td class="' + i + '">' + text + "<\/td><td>&nbsp;<\/td><\/tr>");
                    return r.push("<\/table>"), r.join("")
                },
                generateColumnSettingsBlockHTML: function(n, t) {
                    var r = SPLST.ListTableLayoutEditor,
                        u = r.locale.messages,
                        i = [],
                        s = r.isIE(),
                        o = r.FONT_STYLE,
                        f = n ? r.HEAD : r.COLUMN,
                        e = _spPageContextInfo.siteServerRelativeUrl;
                    return e.indexOf("/") == e.length - 1 && (e = e.slice(0, -1)), i.push('<div id="splst-' + f + '-settings" class="splst-layout-editor-colSettings-block margin-bottom-10">'), i.push('  <fieldset class="splst-layout-editor-colSettings-fieldset">'), i.push("      <legend>" + u[n ? "headerSettings" : "columnSettings"] + "<\/legend>"), i.push('      <table class="splst-layout-editor-colSettings-table" cellpadding="0" cellspacing="0" style="width: 100%;">'), i.push('          <tr class="splst-layout-editor-colSettings-settings-row">'), i.push("              <td>" + u.backgroundSettings + "<\/td>"), i.push("              <td>"), i.push('                  <div class="splst-layout-editor-colorpicker-btn" id="splst-layout-editor-' + f + '-background-color-btn">'), i.push('                      <div class="splst-layout-editor-colorpicker-color">'), i.push('                          <input type="text" id="splst-layout-editor-' + f + '-background-color-tbx" data-isheader="' + n + '" data-isbackground="true" data-haschages="false" />'), i.push("                      <\/div>"), i.push("                  <\/div>"), i.push("              <\/td>"), i.push("              <td>" + u.textAlign + "<\/td>"), i.push("              <td>"), i.push('                  <div id="splst-layout-editor-' + f + '-align" data-haschanges="false" class="splst-layout-editor-font-properties-icons-container">'), i.push('                      <div data-align="left" data-isheader="' + n + '" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-align-icon-container">'), i.push('                          <img src="' + e + r.contentPath + "font-properties.png?rev=" + r.rev + '" class="splst-layout-editor-font-properties-img splst-layout-editor-left-align-img"/>'), i.push("                      <\/div>"), i.push('                      <div data-align="center" data-isheader="' + n + '" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-align-icon-container">'), i.push('                          <img src="' + e + r.contentPath + "font-properties.png?rev=" + r.rev + '" class="splst-layout-editor-font-properties-img splst-layout-editor-center-align-img"/>'), i.push("                      <\/div>"), i.push('                      <div data-align="right"  data-isheader="' + n + '" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-align-icon-container">'), i.push('                          <img src="' + e + r.contentPath + "font-properties.png?rev=" + r.rev + '" class="splst-layout-editor-font-properties-img splst-layout-editor-right-align-img"/>'), i.push("                      <\/div>"), i.push('                      <div data-align="justify"  data-isheader="' + n + '" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-align-icon-container">'), i.push('                          <img src="' + e + r.contentPath + "font-properties.png?rev=" + r.rev + '" class="splst-layout-editor-font-properties-img splst-layout-editor-justify-align-img"/>'), i.push("                      <\/div>"), i.push("                  <\/div>"), i.push("              <\/td>"), i.push("          <\/tr>"), i.push('          <tr class="splst-layout-editor-colSettings-settings-row">'), i.push("              <td>" + u.fontColorSettings + "<\/td>"), i.push("              <td>"), i.push('                  <div class="splst-layout-editor-colorpicker-btn" id="splst-layout-editor-' + f + '-font-color-btn">'), i.push('                      <div class="splst-layout-editor-colorpicker-color">'), i.push('                          <input type="text" id="splst-layout-editor-' + f + '-font-color-tbx" data-isheader="' + n + '" data-isbackground="false" data-haschages="false" />'), i.push("                      <\/div>"), i.push("                  <\/div>"), i.push("              <\/td>"), i.push("              <td>" + u.fontStyle + "<\/td>"), i.push("              <td>"), i.push('                  <div id="splst-layout-editor-' + f + '-font-style" data-haschanges="false" class="splst-layout-editor-font-properties-icons-container">'), i.push('                      <div data-font-style="' + o.BOLD + '" data-isheader="' + n + '" id="splst-layout-editor-' + f + '-bold" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-style-icon-container">'), i.push('                          <img src="' + e + r.contentPath + "font-properties.png?rev=" + r.rev + '" class="splst-layout-editor-font-properties-img splst-layout-editor-bold-img"/>'), i.push("                      <\/div>"), i.push('                      <div data-font-style="' + o.ITALIC + '" data-isheader="' + n + '" id="splst-layout-editor-' + f + '-italic" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-style-icon-container">'), i.push('                          <img src="' + e + r.contentPath + "font-properties.png?rev=" + r.rev + '" class="splst-layout-editor-font-properties-img splst-layout-editor-italic-img"/>'), i.push("                      <\/div>"), i.push('                      <div data-font-style="' + o.UNDERLINE + '" data-isheader="' + n + '" id="splst-layout-editor-' + f + '-underline" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-style-icon-container">'), i.push('                          <img src="' + e + r.contentPath + "font-properties.png?rev=" + r.rev + '" class="splst-layout-editor-font-properties-img splst-layout-editor-underline-img"/>'), i.push("                      <\/div>"), i.push('                      <div data-font-style="' + o.STRIKETHROUGH + '" data-isheader="' + n + '" id="splst-layout-editor-' + f + '-strikethrough" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-style-icon-container">'), i.push('                          <img src="' + e + r.contentPath + "font-properties.png?rev=" + r.rev + '" class="splst-layout-editor-font-properties-img splst-layout-editor-strikethrough-img"/>'), i.push("                      <\/div>"), i.push("                  <\/div>"), i.push("              <\/td>"), i.push("          <\/tr>"), i.push('          <tr class="splst-layout-editor-colSettings-settings-row">'), i.push("              <td>" + u.textCase + "<\/td>"), i.push('              <td colspan="3">'), i.push('                  <select data-isheader="' + n + '" data-lb-id="text-case-' + f + '">'), i.push('                      <option value="none">' + u.default+"<\/option>"), i.push('                      <option value="uppercase">' + u.uppercase + "<\/option>"), i.push('                      <option value="lowercase">' + u.lowercase + "<\/option>"), i.push('                      <option value="capitalize">' + u.capitalize + "<\/option>"), i.push("                  <\/select>"), i.push("              <\/td>"), i.push("          <\/tr>"), n ? (i.push('          <tr class="splst-layout-editor-colSettings-settings-row">'), i.push('              <td colspan="4">'), i.push('                  <label><input type="checkbox" data-haschanges="false" class="lb-static-styles-cbx" data-lb-id="allowWordWrap" />' + u.allowTextWrap + "<\/label>"), i.push("                  <\/select>"), i.push("              <\/td>"), i.push("          <\/tr>")) : (i.push('          <tr class="splst-layout-editor-colSettings-settings-row">'), i.push('              <td colspan="4">'), i.push('                  <label><input type="checkbox" data-haschanges="false" class="lb-static-styles-cbx" data-lb-id="allowBreakWord" />' + u.allowBreakWord + "<\/label>"), i.push("                  <\/select>"), i.push("              <\/td>"), i.push("          <\/tr>")), n || t.type !== "Note" || (i.push('          <tr class="splst-layout-editor-colSettings-settings-row">'), i.push('              <td colspan="4">'), i.push('                  <label><input type="checkbox" data-haschanges="false" class="lb-static-styles-cbx" id="splst-layout-editor-truncate-text-cbx" />' + u.truncateLongText + "<\/label>"), i.push("              <\/td>"), i.push("          <\/tr>")), i.push("      <\/table>"), i.push("  <\/fieldset>"), i.push("<\/div>"), i.join("")
                },
                generateTableStyleBlockHTML: function(n, t, i) {
                    var f = SPLST.ListTableLayoutEditor,
                        r = [],
                        e = f.isIE(),
                        u = _spPageContextInfo.siteServerRelativeUrl;
                    return u.indexOf("/") == u.length - 1 && (u = u.slice(0, -1)), r.push('<div class="splst-layout-editor-colSettings-block margin-bottom-10">'), r.push('  <fieldset class="splst-layout-editor-colSettings-fieldset">'), r.push("      <legend>" + n + "<\/legend>"), r.push("      <div>"), jQuerySplst.each(t, function(n, t) {
                        var e = t.img;
                        r.push('      <div class="splst-layout-editor-table-style-icon-container' + (n === i ? " pressed" : "") + '" id="' + n + '">');
                        r.push('          <img src="' + u + f.contentPath + 'table-templates.png" class="splst-layout-editor-table-style-img" style="left: -' + e.colIndex * 30 + "px; top: -" + e.rowIndex * 30 + 'px;" />');
                        r.push("      <\/div>")
                    }), r.push("      <\/div>"), r.push("  <\/fieldset>"), r.push("<\/div>"), r.join("")
                },
                splitCAMLIntoParts: function(n) {
                    var f = SPLST.ListTableLayoutEditor,
                        e = f.isIE(),
                        t, i, r, u;
                    return n ? (t = n, i = {}, t.indexOf("<View>") === 0 && (t = t.slice(13, -15)), t = "<Root>" + t + "<\/Root>", r = jQuerySplst(jQuerySplst.parseXML(t)), u = r.children().children(), jQuerySplst.each(u, function(n, t) {
                        var u, f, r, o;
                        if (e) {
                            for (u = "", f = new XMLSerializer, r = 0, o = t.childNodes.length; r < o; r++) u += f.serializeToString(t.childNodes[r]);
                            i[t.tagName] = u
                        } else i[t.tagName] = t.innerHTML
                    }), i) : {}
                },
                getUrlParametersGroupByViewId: function(n) {
                    var w = SPLST.ListTableLayoutEditor,
                        f = {},
                        b = location.search.slice(1),
                        e = location.hash,
                        k = [],
                        h, v, c, l, d, y, tt, g, o, rt, nt, ut, r, u, s;
                    if (location.href.indexOf(_spPageContextInfo.layoutsUrl + "/start.aspx") !== -1 && (e = e.slice(1), l = e.indexOf("#"), l === -1 && (l = e.length), b = e.slice(e.indexOf("?") + 1, l), e = e.slice(l)), b) {
                        for (k = b.split(/&+/g), s = {}, h = 0, v = k.length; h < v; h++) {
                            if (c = k[h].split("="), c[0] === "View") o = unescapeProperly(c[1]).replace("{", "").replace("}", "");
                            else {
                                for (r = c[0], u = c[1]; r && r.indexOf("%") !== -1;) r = unescapeProperly(r);
                                while (u && u.indexOf("%") !== -1) u = unescapeProperly(u)
                            }
                            s[r] = u
                        }
                        o ? (o = o.toLowerCase(), f[o] = jQuerySplst.extend(f[o], s)) : f[w.COMMON_QUERY_PARAMS] = jQuerySplst.extend(f[w.COMMON_QUERY_PARAMS], s)
                    }
                    if (e)
                        for (d = e.split("#").slice(1), y = 0, tt = d.length; y < tt; y++) {
                            var a = d[y],
                                it = a.indexOf("="),
                                p = a.slice(it + 1).split("-"),
                                i;
                            if (a.indexOf("InplviewHash") === 0 ? (i = a.slice(12, it), t.webPartViewMapping[i] ? i = t.webPartViewMapping[i] : (g = jQuerySplst('[webpartid2="' + i + '"]'), g.length ? (o = g.attr("webpartid"), t.webPartViewMapping[i] = o, i = o) : t.webPartViewMapping[i] = i)) : a.indexOf("ServerFilter") === 0 && (i = w.COMMON_QUERY_PARAMS), rt = n && n[i] || [], nt = [], p.length)
                                for (ut = p[0].indexOf("=") !== -1 ? "=" : escapeProperly("="), f[i] || (f[i] = {}), h = 0, v = p.length; h < v; h++) {
                                    for (c = p[h].split(ut), r = c[0], u = c[1]; r && r.indexOf("%") !== -1;) r = unescapeProperly(r);
                                    while (u && u.indexOf("%") !== -1) u = unescapeProperly(u);
                                    f[i][r] = u;
                                    nt.push(r)
                                }
                            s = f[i];
                            s && (s = JSON.parse(JSON.stringify(s)), jQuerySplst.each(s, function(n) {
                                rt.indexOf(n) !== -1 && nt.indexOf(n) === -1 && delete f[i][n]
                            }))
                        }
                    return f
                },
                addStaticCssRules: function() {
                    var o = _spPageContextInfo.siteServerRelativeUrl,
                        r = SPLST.ListTableLayoutEditor,
                        f, e, u, h, v, c, y, p, l, a;
                    if (o.indexOf("/") == o.length - 1 && (o = o.slice(0, -1)), !i) {
                        f = jQuerySplst("head");
                        f.find('link[href*="splst-layout-editor.css"]').length || (e = o + r.cssPath, f.append('<link rel="stylesheet" href="' + e + "splst-layout-editor-jquery-ui.css?rev=" + r.rev + '" type="text/css" />'), f.append('<link rel="stylesheet" href="' + e + "evol.colorpicker.css?rev=" + r.rev + '" type="text/css" />'), f.append('<link rel="stylesheet" href="' + e + "jquery.jui_pagination.css?rev=" + r.rev + '" type="text/css" />'), f.append('<link rel="stylesheet" href="' + e + "jQuery.contextMenu.css?rev=" + r.rev + '" type="text/css" />'), f.append('<link rel="stylesheet" href="' + e + "splst-layout-editor.css?rev=" + r.rev + '" type="text/css" />'), f.append('<link rel="stylesheet" href="' + e + "splst-color-scale.css?rev=" + r.rev + '" type="text/css" />'));
                        n.table || (n.table = new r.StylesheetWrapper(!0));
                        n.basic || (n.basic = new r.StylesheetWrapper(!0));
                        n.cf || r.CFDisabled || (n.cf = new r.StylesheetWrapper(!0));
                        !n.size && r.isEdge() && (n.size = new r.StylesheetWrapper(!0));
                        u = jQuerySplst("body");
                        h = jQuerySplst('<div class="ms-headerCellStyleHover" style="display: none;"><\/div>');
                        u.append(h);
                        var s = jQuerySplst('<div class="s4-itm-selected" style="display:none;"><\/div>'),
                            w = jQuerySplst("<div><\/div>"),
                            b = jQuerySplst('<div class="ms-list-itemLink-td"><\/div>'),
                            k = jQuerySplst('<div class="ms-vb-imgFirstCell"><\/div>');
                        u.append(s);
                        s.append(w);
                        s.append(b);
                        s.append(k);
                        v = jQuerySplst('<div class="ms-vh2" style="display:none;"><\/div>');
                        u.append(v);
                        c = jQuerySplst('<div class="ms-dlgContent"><\/div>');
                        u.append(c);
                        y = jQuerySplst('<div class="ms-core-menu-box ms-core-defaultFont ms-shadow"><\/div>');
                        u.append(y);
                        p = jQuerySplst('<div class="ms-vb2" style="display:none;">,/div>');
                        u.append(p);
                        l = jQuerySplst('<input type="radio" value="val" class="splst-lb-radio" style="position: absolute; left: -1000px;"><\/input>');
                        u.append(l);
                        a = jQuerySplst('<div class="ms-InlineSearch-Outline-Empty" style="position:absolute; left: -1000px;"><\/div>');
                        u.append(a);
                        setTimeout(function() {
                            var u = t.div_ms_headerCellStyleHover_bgColor = window.getComputedStyle(h[0])["background-color"],
                                d, g = t.div_s4_itm_selected_inside_bgColor = window.getComputedStyle(w[0])["background-color"],
                                it = window.getComputedStyle(b[0])["background-color"],
                                rt = window.getComputedStyle(k[0])["background-color"],
                                o = window.getComputedStyle(c[0])["background-color"],
                                ut = l.outerWidth(!0),
                                nt = window.getComputedStyle(a[0]),
                                tt = nt.borderLeftColor || nt["border-left-color"],
                                f, i, e;
                            t.div_ms_vh2_color = window.getComputedStyle(v[0]).color;
                            t.div_ms_vb2_color = window.getComputedStyle(p[0]).color;
                            d = u.indexOf("rgba") !== -1 ? "rgb(" + u.slice(4, u.lastIndexOf(",")) + ")" : u;
                            h.remove();
                            s.remove();
                            c.remove();
                            l.remove();
                            a.remove();
                            f = o;
                            f = f.replace("rgb", "rgba").replace(")", ", 0.9)");
                            i = n.basic;
                            i.addStylesheetRule(".splst_layout_editor_table td.ms-vb-user span.ms-noWrap a.ms-subtleLink", "white-space: normal;");
                            i.addStylesheetRule(".splst_layout_editor_table td.ms-cellstyle span.ms-noWrap", "white-space: normal;");
                            i.addStylesheetRule(".ms-headerCellStyleHover", "background-color: " + u + " !important;");
                            i.addStylesheetRule(".ms-itmHoverEnabled:hover > *", "background-color: " + u + " !important;");
                            i.addStylesheetRule(".ms-itmHoverEnabled:hover .ms-list-itemLink-td", "background-color: " + d + " !important;");
                            i.addStylesheetRule(".s4-itm-selected > *,.s4-itm-selected:hover > *", "background-color: " + g + " !important;");
                            i.addStylesheetRule(".s4-itm-selected .ms-list-itemLink-td,.s4-itm-selected:hover .ms-list-itemLink-td", "background-color: " + it + " !important;");
                            i.addStylesheetRule(".s4-itm-selected > .ms-vb-imgFirstCell.ms-vb-imgFirstCell", "background-color: " + rt + " !important;");
                            i.addStylesheetRule(".splst-paging-state-highlight", "background-color: " + g);
                            i.addStylesheetRule(".splst-paging-state-hover", "background-color: " + u);
                            i.addStylesheetRule(".splst-paging-icon:hover", "background-color: " + u);
                            i.addStylesheetRule(".splst-layout-editor-tabs-state-default", "background-color: " + o + " !important;");
                            i.addStylesheetRule(".splst-cs-cptr-back", "background-color:" + o + " !important;");
                            i.addStylesheetRule(".splst-lb-spinner .ui-state-hover", "background: " + u + " !important;");
                            i.addStylesheetRule(".ms-core-defaultFont", "font-style: normal");
                            i.addStylesheetRule(".splst-lb-radio-offset", "margin-left: " + ut + "px");
                            i.addStylesheetRule(".splst-lb-split:hover", "border-color: " + tt + " !important;");
                            i.addStylesheetRule(".splst-lb-split:hover .splst-lb-menu-arrow > span", "border-left-color: " + tt + " !important;");
                            i.addStylesheetRule(".lb-resizer-tooltip", "background: " + f + " !important;");
                            r.CFDisabled || (e = window.getComputedStyle(y[0]), i.addStylesheetRule(".splst-cond-formatting-ruleContainer:not(:nth-child(1)) .splst-cond-formatting-up-btn:hover", "background-color: " + u), i.addStylesheetRule(".splst-cond-formatting-ruleContainer:not(:nth-last-child(1)) .splst-cond-formatting-down-btn:hover", "background-color: " + u), i.addStylesheetRule(".ms-core-menu-box", "text-indent: " + e["text-indent"] + "; white-space: " + e["white-space"] + "; text-align: " + e["text-align"]))
                        }, 10);
                        i = !0
                    }
                },
                containsSelector: function(t, i) {
                    i = i ? Array.isArray(i) ? i : [i] : ["basic", "table", "cf", "size"];
                    var r = i.indexOf("basic") !== -1,
                        u = i.indexOf("table") !== -1,
                        f = i.indexOf("cf") !== -1,
                        e = i.indexOf("size") !== -1;
                    return r && n.basic && n.basic.containsSelector(t) || u && n.table && n.table.containsSelector(t) || f && n.cf && n.cf.containsSelector(t) || e && n.size && n.size.containsSelector(t)
                },
                addCssRule: function(t, i, r) {
                    var u = n[t];
                    u && u.addStylesheetRule(i, r)
                },
                shiftCssRule: function(t, i, r) {
                    var u = n[t];
                    u && u.shiftStylesheetRule(i, r)
                },
                removeCssRule: function(t, i, r) {
                    var u = n[t];
                    u && u.removeStylesheetRule(i, r)
                },
                removeCssRulesBySelectorPrefix: function(t, i, r) {
                    var u = n[t];
                    u && u.removeStylesheetRulesBySelectorPrefix(i, r)
                },
                getThead: function(n, t) {
                    if (n) {
                        var i;
                        return t ? i = n.find("tr:first-of-type") : (i = n.find("thead"), i.length || (i = n.find("tr:first-of-type"))), i
                    }
                    return null
                },
                getFieldInfoFromHeaderCell: function(n, t, i, r, u) {
                    var o = !1,
                        c = "",
                        f = "",
                        s = "",
                        l = n.css("visibility") !== "hidden" && n.is(":visible") && n.attr("data-splst-sc") !== "true",
                        h, e;
                    return r ? (o = n.attr("title") && t < i - 1) && (h = u.get_Columns(), f = h[t - 1].columnKey, s = h[t - 1].name) : (e = n.find("div[name]"), (o = !!e.length) && (f = e.attr("name"), s = e.attr("displayname"))), f && (c = this.getStoredName(f)), {
                        isFieldCell: o,
                        fieldName: c,
                        colName: f,
                        fieldDisplayName: s,
                        visible: l
                    }
                },
                hasCssProperty: function(t, i) {
                    return n[this.stylesheets.basic] ? n[this.stylesheets.basic].hasCssProperty(t, i) : !1
                },
                updateStylesObj: function(n, t) {
                    if (!n || !t) return t;
                    var r = JSON.parse(JSON.stringify(n)),
                        u = JSON.parse(JSON.stringify(t)),
                        i = jQuerySplst.extend(!0, r, u);
                    return this._removeStyles(i, t), i
                },
                _removeStyles: function(n, t) {
                    var i = this,
                        r = JSON.parse(JSON.stringify(n));
                    jQuerySplst.each(r, function(r, u) {
                        if (t[r] === undefined) {
                            delete n[r];
                            return
                        }
                        u && (Array.isArray(u) ? n[r] = n[r].slice(0, t[r].length) : typeof u == "object" && i._removeStyles(n[r], t[r]))
                    })
                },
                isDefined: function(n) {
                    return n !== null && n !== undefined
                },
                fixFieldNames: function(n) {
                    if (n) {
                        var t = {},
                            i = this;
                        return jQuerySplst.each(n, function(n, r) {
                            i.fieldNamesMapping[n] ? t[i.fieldNamesMapping[n].storedName] = JSON.parse(JSON.stringify(r)) : t[n] = JSON.parse(JSON.stringify(r))
                        }), t
                    }
                },
                getStoredName: function(n) {
                    if (n) return this.fieldNamesMapping[n] ? this.fieldNamesMapping[n].storedName : n
                },
                rgb2hex: function(n) {
                    return n = n.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i), n && n.length === 4 ? "#" + ("0" + parseInt(n[1], 10).toString(16)).slice(-2) + ("0" + parseInt(n[2], 10).toString(16)).slice(-2) + ("0" + parseInt(n[3], 10).toString(16)).slice(-2) : ""
                },
                closest: function(n, t) {
                    var i, r;
                    if (!n || !n.parentElement) return null;
                    if (i = n.parentElement, i.closest) return i.closest(t);
                    for (r = t.toLowerCase(); i;) {
                        if (i.tagName.toLowerCase() === r) return i;
                        i = i.parentElement
                    }
                    return null
                },
                getHideTextCss: function(n) {
                    var i = SPLST.ListTableLayoutEditor,
                        t = {};
                    return t[i.DATA_COLUMN] = {
                        "text-indent": "-9999px",
                        "white-space": "nowrap",
                        "text-align": n || "left"
                    }, t[i.DATA_COLUMN_ALL_DESC] = {
                        display: "none !important"
                    }, t
                },
                isEmptyObject: function(n) {
                    return !!n && Object.keys(n).length === 0 && n.constructor === Object
                }
            };
        return t
    }(), n.ClientDataHelperBase = function() {
        function n(n) {
            if (n = n || {}, !n.listBooster) throw new Error("List Booster is not set");
            this.listBooster = n.listBooster;
            this.clvp = null;
            this.clientData = null;
            this.currentIndex = -1
        }
        return n.prototype.getCLVP = function() {
            var t = this.clvp,
                n = this.listBooster;
            return !t && window.CLVPFromCtx && n.table && (t = this.clvp = CLVPFromCtx(n.isEditMode ? n.parentTable : n.table)), t
        }, n.prototype._initClientData = function() {}, n.prototype.getFieldValue = function(n, t) {
            !this.clientData || t >= this.clientData.length || t < 0
        }, n.prototype.getRowSelector = function(n, t) {
            return n = n.startsWith(".") ? n : "." + n, n + " > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child(" + (t + (this.listBooster.isEditMode ? 2 : 1)) + ")"
        }, n.prototype.getRowColSelector = function(n, t, i) {
            return this.getRowSelector(n, i) + " > td:nth-child(" + t + ")"
        }, n.prototype.getRowSelectorFHWrap = function(n, t) {
            return n = n.startsWith(".") ? n : "." + n, n + ' > tbody[data-splst-wrap="true"] > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child(' + (t + 1) + ")"
        }, n.prototype.getRowColSelectorFHWrap = function(n, t, i) {
            return this.getRowSelectorFHWrap(n, i) + " > td:nth-child(" + t + ")"
        }, n.prototype.startIterator = function() {
            this.clientData || this._initClientData();
            this.currentIndex = -1
        }, n.prototype.moveNext = function() {
            return this.currentIndex++, this.clientData && this.currentIndex < this.clientData.length
        }, n.prototype.getCurrentFieldValue = function(n) {
            return this.getFieldValue(n, this.currentIndex)
        }, n.prototype.getCurrentRowSelector = function(n) {
            return this.getRowSelector(n, this.currentIndex)
        }, n.prototype.getCurrentRowColsSelector = function(n) {
            return this.getCurrentRowSelector(n) + " > td"
        }, n.prototype.getCurrentRowColSelector = function(n, t) {
            return this.getCurrentRowSelector(n) + " > td:nth-child(" + t + ")"
        }, n.prototype.getCurrentRowSelectorFHWrap = function(n) {
            return this.getRowSelectorFHWrap(n, this.currentIndex)
        }, n.prototype.getCurrentRowColsSelectorFHWrap = function(n) {
            return this.getCurrentRowSelectorFHWrap(n) + " > td"
        }, n.prototype.getCurrentRowColSelectorFHWrap = function(n, t) {
            return this.getCurrentRowSelectorFHWrap(n) + " > td:nth-child(" + t + ")"
        }, n.prototype._triggerEvent = function(n, t) {
            var i = new jQuerySplst.Deferred;
            return t.deferred = i, jQuerySplst(this).triggerHandler(n, t), i
        }, n.prototype.getPageItemsIndexes = function() {}, n.prototype.getPageItemsIndexesByClientIndexes = function() {}, n.prototype.dispose = function() {
            delete this.listBooster;
            delete this.clvp;
            delete this.clientData;
            jQuerySplst(this).off()
        }, n
    }(), n.ClientDataHelperSimple = function(n) {
        function t(t) {
            n.call(this, t)
        }
        var i = SPLST.ListTableLayoutEditor;
        return i.__extends(t, n), t.prototype._initClientData = function() {
            var t = this.getCLVP(),
                i = t && t.ctx && t.ctx.ListData,
                n, r;
            i ? this.clientData = i.Row : (n = _spPageContextInfo.webServerRelativeUrl, n.endsWith("/") && (n = n.slice(0, -1)), n += "/" + _spPageContextInfo.layoutsUrl + "/inplview.aspx" + location.search.replace(/View=\{(.{36})\}/gmi, function(n, t) {
                return "View={" + t.toUpperCase() + "}"
            }) + "&IsCSR=TRUE&IsXslView=TRUE&List=" + this.listBooster.listId.toUpperCase(), r = this, jQuerySplst.ajax({
                url: n,
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                async: !1,
                success: function(n) {
                    r.clientData = n.Row
                }
            }))
        }, t.prototype.getFieldValue = function(t, i) {
            var r = n.prototype.getFieldValue.call(this, t, i);
            return r === null ? null : this.clientData[i][t]
        }, t.prototype.getPageItemsIndexes = function(n, t, i) {
            var u, f, e, r;
            return t ? (e = t.currentPage, r = t.rowLimit, u = t.itemsCount, startIndex = (e - 1) * r, f = i ? n.getPageItemsIndexes(r, startIndex) : u != n.get_count() ? n.getPageItemsIndexes(r, 0) : n.getPageItemsIndexes(r, startIndex)) : (u = n.get_count(), f = n.getPageItemsIndexes(u, 0)), f
        }, t.prototype.getPageItemsIndexesByClientIndexes = function(n, t) {
            return t.slice(0)
        }, t
    }(n.ClientDataHelperBase), n.ClientDataHelperGrouped = function(t) {
        function i(n) {
            t.call(this, n);
            this.groups = [];
            this.groupPagingSelectors = {};
            this.additionalTBodiesCount = this.listBooster.$table.find("tbody[id^=aggr], tbody[id^=GroupByCol]").length;
            this.listDataCount = -1;
            this._bindedOnPostRender = null;
            this._bindedOnPreRender = null;
            this._clientDataInitialized = !1
        }
        n.__extends(i, t);
        var u = "grp1_",
            r = "pgng_",
            f = "items";
        return i.prototype._initClientData = function() {
            var n = this.getCLVP(),
                t = n && n.ctx,
                i = t && t.ListData,
                r = t && t.ListSchema,
                u, f;
            i && r ? (this._initClientDataFromCLVP(i, r), this._bindedOnPreRender = this.onPreRender.bind(this), t.OnPreRender.push(this._bindedOnPreRender), this._bindedOnPostRender = this.onPostRender.bind(this), t.OnPostRender.push(this._bindedOnPostRender), n.RefreshCore ? (u = n.RefreshCore, n._lbRefreshCoreChanged = !0, n.RefreshCore = function(t, i) {
                n._lbtbody = n.tBody;
                u.call(this, t, i)
            }) : n.OnReadyStateChangeCallback && n.OnReadyStateChangeCallback == window.CLVPOnReadyStateChangeCallback && (f = n.OnReadyStateChangeCallback.bind(n), n._lbOnReadyStateChangeCallbackChanged = !0, n.OnReadyStateChangeCallback = function(n, t, i, r, u, e, o, s, h, c, l) {
                return o && (this._lbtbody = o), f(n, t, i, r, u, e, o, s, h, c, l)
            })) : this._initClientDataAjax();
            this._clientDataInitialized = !0
        }, i.prototype._getRows = function(n) {
            var u = this.getCLVP().ctx.wpq,
                i = window[u + "ListData"],
                t = n.Row;
            if (!i) return t;
            var r = i.Row,
                f = t.length,
                e = r.length;
            return f ? t : r
        }, i.prototype._initClientDataFromCLVP = function(n, t) {
            var y = t.group1,
                h = t.group2,
                l = this._getRows(n),
                p = "",
                a = {},
                c, w, k, s, b;
            for (this.listDataCount = l.length, this.clientData = [], c = 0, w = l.length; c < w; c++) {
                var i = l[c],
                    e = u + this._getFieldValue(i, y),
                    o = "";
                if (h && (k = i[h], o = e + "_" + this._getFieldValue(i, h)), i.ID) {
                    var v = o || e,
                        g = this.groups.indexOf(v) + 1,
                        d = a[v]++;
                    this.clientData || (this.clientData = []);
                    this.clientData.push({
                        group: v,
                        itemIdx: d,
                        item: i,
                        isVisible: !0
                    })
                } else p !== e && (p = e, this.groups.push(e)), o ? (this.groups.push(o), a[o] = 0) : a[e] = 0, this.groups.push(f), s = i[y + ".groupindex"], h && (s += i[h + ".groupindex2"]), s += "_page", this.groupPagingSelectors[o || e] = s, b = this.listBooster.table.querySelector('[id$="' + s + '"]'), b && this.groups.push(r + s)
            }
        }, i.prototype._initClientDataAjax = function() {}, i.prototype.getFieldValue = function(n, i) {
            var r = t.prototype.getFieldValue.call(this, n, i);
            return r === null ? null : this.clientData[i].item[n]
        }, i.prototype.getRowSelector = function(n, t) {
            n = n.startsWith(".") ? n : "." + n;
            var i = this.clientData[t],
                r = this.groups.indexOf(i.group) + 1,
                u = r + this.additionalTBodiesCount,
                f = i.itemIdx;
            return n + " > tbody:nth-of-type(" + (u + 1) + ") > tr:nth-child(" + (f + 1) + ")"
        }, i.prototype.getRowSelectorFHWrap = function(n, t) {
            n = n.startsWith(".") ? n : "." + n;
            var i = this.clientData[t],
                r = this.groups.indexOf(i.group) + 1,
                u = r + this.additionalTBodiesCount,
                f = i.itemIdx;
            return n + ' > tbody[data-splst-wrap="true"]  > tbody:nth-of-type(' + (u + 1) + ") > tr:nth-child(" + (f + 1) + ")"
        }, i.prototype.onPreRender = function(n) {
            var o, u, f, l, s, a, t, v, h, y;
            this.hideGroup();
            var i = [],
                e = this._getRequestListData(n),
                w = e.Row,
                p = !!(e.NextHref || e.PrevHref),
                b = n.ListSchema,
                c = "page";
            this.clvp && this.clvp._lbtbody && (o = this.clvp._lbtbody.id, c = o.slice(o.indexOf("-") + 1));
            for (u in this.groupPagingSelectors)
                if (this.groupPagingSelectors.hasOwnProperty(u) && (f = this.groupPagingSelectors[u], f.indexOf(c) !== -1) && this.groups.indexOf(r + f) === -1 && (l = this.listBooster.table.querySelector('[id$="' + f + '"]'), !l && p))
                    for (s = this.clientData, a = this.groups.indexOf(u), t = 0, v = s.length; t < v; t++)(h = s[t], h.isVisible) && (y = this.groups.indexOf(h.group), y > a && i.indexOf(t) === -1 && i.push(t));
            i.length && (n.splstRowsToBeUpdated = i, this._triggerEvent("datachanging", {
                deleted: i
            }))
        }, i.prototype.onPostRender = function(n) {
            var b = n.ListData,
                s = n.splstRowsToBeUpdated || [],
                f, y, p, i, tt, c, it, rt, t, h, e, w, o;
            n.splstRowsToBeUpdated = null;
            var l = [],
                a = [],
                k = [],
                d = n.ListSchema,
                ut = d.group1,
                g = d.group2,
                v = {},
                ft = this.listDataCount !== b.Row.length,
                nt = this._getRequestListData(n);
            for (t = 0, h = nt.length; t < h; t++)(f = nt[t], f.ID) && (y = u + this._getFieldValue(f, ut), p = "", g && (p = y + "_" + this._getFieldValue(f, g)), i = p || y, a.indexOf(i) == -1 && a.push(i), k.push(f.ID), ft) && (tt = this.groups.indexOf(i) + 1, v[i] || (v[i] = 0), c = this.groupPagingSelectors[i], this.groups.indexOf(r + c) === -1 && (it = this.listBooster.table.querySelector('[id$="' + c + '"]'), it && this.groups.splice(tt, 0, r + c)), rt = v[i]++, this.clientData || (this.clientData = []), this.clientData.push({
                group: i,
                itemIdx: rt,
                item: f,
                isVisible: !0
            }));
            for (t = 0, h = this.clientData.length; t < h; t++) e = this.clientData[t], k.indexOf(e.item.ID) !== -1 ? (s.indexOf(t) === -1 && s.push(t), e.isVisible = !0) : a.indexOf(e.group) !== -1 && e.isVisible !== !1 && (l.push(t), e.isVisible = !1);
            this.listDataCount = b.Row.length;
            s.length || l.length ? (w = {
                added: s,
                deleted: l
            }, o = this, o._triggerEvent("datachanging", w).then(function() {
                return o._triggerEvent("datachanged", w)
            }).then(function(n, t) {
                return function() {
                    o.showGroup(n, t)
                }
            }(o.clvp && o.clvp._lbtbody, this.$workingOnIt))) : this.showGroup(this.clvp && this.clvp._lbtbody, this.$workingOnIt)
        }, i.prototype._unbindHandler = function(n, t) {
            var i, r, u;
            if (t && n && n.length)
                for (i = 0, r = n.length; i < r; i++)
                    if (u = n[i], u === t) {
                        n.splice(i, 1);
                        break
                    }
        }, i.prototype.getPageItemsIndexes = function(n) {
            var t = this._getItemIDs();
            return n.getPageItemsIndexesByIDs(t)
        }, i.prototype._getItemIDs = function(n) {
            var r = [],
                t, i;
            if (this._clientDataInitialized || this._initClientData(), this.clientData)
                if (n && Array.isArray(n))
                    for (t = 0, i = n.length; t < i; t++) r.push(parseInt(this.clientData[n[t]].item.ID));
                else
                    for (t = 0, i = this.clientData.length; t < i; t++) r.push(parseInt(this.clientData[t].item.ID));
            return r
        }, i.prototype.getPageItemsIndexesByClientIndexes = function(n, t) {
            var i = this._getItemIDs(t);
            return n.getPageItemsIndexesByIDs(i)
        }, i.prototype.hideGroup = function() {
            var t, i;
            if (this.clvp && this.clvp._lbtbody) {
                t = this.clvp._lbtbody;
                t.style.visibility = "hidden";
                var r = jQuerySplst(t),
                    u = this.listBooster.$table,
                    f = this.listBooster.$offsetParent,
                    e = f[0],
                    o = r.offsetParent(),
                    n = r.position(),
                    s = e.scrollLeft,
                    h = e.scrollTop;
                o[0] == u[0] && (i = u.position(), n.left += i.left, n.top += i.top);
                this.$workingOnIt = jQuerySplst('<div style="position: absolute; left: ' + (n.left + s) + "px; top: " + (n.top + h) + 'px;">' + SPLST.ListTableLayoutEditor.locale.messages.workingOnIt + "<\/div>");
                f.append(this.$workingOnIt)
            }
        }, i.prototype.showGroup = function(n, t) {
            n && (n.style.visibility = "visible", t && (t.remove(), delete t))
        }, i.prototype.dispose = function() {
            var r;
            delete this.groups;
            this.groupPagingSelectors;
            delete this.additionalTBodiesCount;
            var n = this.clvp,
                i = this.clvp && this.clvp.ctx,
                u = i && i.OnPreRender;
            this._unbindHandler(u, this._bindedOnPreRender);
            r = i && i.OnPostRender;
            this._unbindHandler(r, this._bindedOnPostRender);
            n && (n._lbRefreshCoreChanged && (delete n._lbRefreshCoreChanged, delete n._lbtbody, n.RefreshCore = window.CLVPRefreshCore), n._lbOnReadyStateChangeCallbackChanged && (delete n._lbOnReadyStateChangeCallbackChanged, delete n._lbtbody, n.CLVPOnReadyStateChangeCallback = window.CLVPOnReadyStateChangeCallback));
            this.$workingOnIt && (this.$workingOnIt.remove(), delete this.$workingOnIt);
            t.prototype.dispose.call(this)
        }, i.prototype._getFieldValue = function(n, t) {
            var i = n[t];
            return Array.isArray(i) ? i[0].lookupValue : i
        }, i.prototype._getRequestListData = function(n) {
            return n.clvp.outstandingRequest && n.clvp.outstandingRequest.responseText ? JSON.parse(n.clvp.outstandingRequest.responseText).Row : n.ListData.Row
        }, i
    }(n.ClientDataHelperBase), n.ClientDataHelperFactory = function() {
        function t() {}
        var n = SPLST.ListTableLayoutEditor;
        return t.createClientDataHelper = function(t) {
            var i = t.hasGrouping;
            return i ? new n.ClientDataHelperGrouped({
                listBooster: t
            }) : new n.ClientDataHelperSimple({
                listBooster: t
            })
        }, t
    }(), n.ResizersControl = function(n) {
        var f;
        if (n = n || {}, !n || !n.table) return null;
        var t = 6,
            i, r = SPLST.ListTableLayoutEditor.Helper,
            u = {
                table: n.table,
                isEditMode: !!n.isEditMode,
                resizers: [],
                sizes: null,
                viewId: n.viewId || "",
                imgBaseUrl: n.imgBaseUrl || "",
                canResize: n.canResize,
                canEditColumnOptions: n.canEditColumnOptions,
                onMouseDown: function(n) {
                    var h = SPLST.ListTableLayoutEditor.locale.messages,
                        c = jQuerySplst("body"),
                        l = this.$offsetParent,
                        a = this.$table,
                        i = this.$activeResizer = jQuerySplst(n.currentTarget),
                        f = i.offset(),
                        v = i.data("index"),
                        u = i.data("cellSize"),
                        r = jQuerySplst('<div class="splst-booster-cover"><\/div>'),
                        e = jQuerySplst('<div data-lb-id="resizer-line" style="position: absolute; z-index:98; width:' + t / 3 + "px; border-left-style: solid; border-left-color: rgb(195, 195, 195); border-left-width: 2px; left: " + (u.left + u.width - t / 6) + "px; top: " + u.top + "px; height: " + a.outerHeight() + 'px;"><\/div>'),
                        s = jQuerySplst('<div class="lb-resizer-tooltip" style="top: ' + (f.top - 5) + "px; left: " + (f.left + t) + 'px;">' + h.resizerTooltip.replace("{0}", Math.round(u.width)) + "<\/div>"),
                        o;
                    c.append(r);
                    o = i.data("th");
                    o && o.removeClass("splst-layout-editor-border");
                    this.resizerLineTimeout = setTimeout(function() {
                        l.append(e);
                        r.append(s)
                    }, 200);
                    r.on({
                        "mousemove.resizerscontrol": jQuerySplst.proxy(this.onMouseMove, this),
                        "mouseup.resizerscontrol": jQuerySplst.proxy(this.onMouseUp, this)
                    });
                    if (navigator.userAgent.indexOf("MSIE") !== -1) {
                        r.addClass("ie");
                        i.on({
                            "mouseup.resizerscontrol": jQuerySplst.proxy(this.onMouseUp, this)
                        });
                        e.on({
                            "mouseup.resizerscontrol": jQuerySplst.proxy(this.onMouseUp, this)
                        })
                    }
                    return this.$resizerLine = e, this.$coverDiv = r, this.$resizerTooltip = s, this.lastMousePosition = n.pageX, this.activeResizerLeft = parseFloat(i.css("left")), this.tooltipLeft = f.left + t, !1
                },
                onMouseMove: function(n) {
                    var r = this.$activeResizer,
                        f = r.data("cellSize"),
                        h = this.$resizerLine,
                        e = this.$resizerTooltip,
                        o = n.pageX,
                        u, i, s;
                    r && (u = this.lastMousePosition - o, i = this.activeResizerLeft + t - u, args = {
                        index: r.data("index"),
                        widthDelta: u,
                        left: f.left,
                        right: i,
                        cancel: !1
                    }, this._triggerEvent("sizechanging", args), args.cancel || (this.activeResizerLeft = i - t, s = i - f.left, this.tooltipLeft = this.tooltipLeft - u, r.css("left", this.activeResizerLeft), h.css("left", i - t / 6), e.css("left", this.tooltipLeft), e.html(SPLST.ListTableLayoutEditor.locale.messages.resizerTooltip.replace("{0}", Math.round(s))), this.lastMousePosition = o, SPLST.ListTableLayoutEditor.trace && SPLST.ListTableLayoutEditor.logTrace("MouseMove event\nTarget: " + n.target.outerHTML + "\nPage X: " + n.pageX + "\nActive Resizer Left: " + this.activeResizerLeft + "\nResizer Line Left: " + (i + t / 6))));
                    n.preventDefault();
                    n.stopPropagation()
                },
                onMouseUp: function(n) {
                    var a = jQuerySplst("body"),
                        i = this.$activeResizer,
                        f = i.data("index"),
                        e = i.data("cellSize"),
                        v = i.data("fieldName"),
                        o = this.activeResizerLeft + t - e.left,
                        c = o - e.width,
                        l = this.table.rows,
                        u, s, h;
                    if (this.resizerLineTimeout && (clearTimeout(this.resizerLineTimeout), delete this.resizerLineTimeout), u = i.data("th"), u && u.addClass("splst-layout-editor-border"), this.$coverDiv.off(".resizerscontrol"), navigator.userAgent.indexOf("MSIE") !== -1 && (i.off(".resizerscontrol"), this.$resizerLine.off(".resizerscontrol")), c && (s = jQuerySplst(l[0].cells[f]), s.css("max-width", ""), r.fixWidthWithTempTable(this.$table, f, o, this._afterFixWidth, this)), delete this.$activeResizer, this.$coverDiv.remove(), this.$resizerLine.remove(), delete this.$coverDiv, delete this.$resizerLine, delete this.$resizerTooltip, delete this.lastMousePosition, delete this.activeResizerLeft, delete this.tooltipLeft, this.lastUpTime && (h = new Date, h - this.lastUpTime < 300)) {
                        delete this.lastUpTime;
                        this.onResizerDoubleClick(i);
                        return !0
                    }
                    return this.lastUpTime = new Date, SPLST.ListTableLayoutEditor.trace && SPLST.ListTableLayoutEditor.logTrace("MouseUp event \nPage X: " + n.pageX), !0
                },
                onResizerDoubleClick: function(n) {
                    var t = SPLST.ListTableLayoutEditor,
                        i = n.data("index");
                    r.autoAdjustColumnWidth(this.table, i, t.maxAdjustColumnWidth, this._afterFixWidth, this)
                },
                onResizerMouseOver: function() {
                    this._triggerEvent("mouseover")
                },
                onResizerMouseLeave: function() {
                    this._triggerEvent("mouseleave")
                },
                _triggerEvent: function(n, t) {
                    i.trigger("resizersControl:" + n, t)
                },
                _afterFixWidth: function(n, t, i) {
                    var r = this.resizers[n],
                        u = r.data("cellSize"),
                        f = u.width,
                        e = this.$table,
                        o = i || e.outerWidth();
                    f != t && (u.width = t, e.outerWidth(o + (t - f)), this._triggerEvent("sizechanged", {
                        colIndex: n,
                        width: t
                    }));
                    this.sizes || (this.sizes = {});
                    this.sizes[r.data("fieldName")] = t;
                    this.refreshResizers()
                },
                _refreshResizers: function() {
                    var e = this.$table,
                        ft = SPLST.ListTableLayoutEditor,
                        c = this.isEditMode,
                        l = r.getThead(e, c),
                        et = l[0],
                        u = {
                            position: l.position()
                        },
                        o = e.find("th"),
                        ot = jQuerySplst("body"),
                        b = this.$offsetParent,
                        k = b[0],
                        d = k.scrollLeft,
                        a = k.scrollTop,
                        i = 0,
                        v, tt, s, h, it, n;
                    if (l.offsetParent()[0] == e[0] && (v = e.position(), u.position.left += v.left, u.position.top += v.top), o && o.length) {
                        var g = o.length,
                            y = 0,
                            p = 0,
                            nt = this.$table.data("layout-editor-plugin"),
                            rt = nt.cellSizes || [];
                        for (i = 0; i < g; i++) {
                            var w = o[i],
                                f = jQuerySplst(w),
                                ut = f.is(":visible");
                            if (!ut) {
                                this.resizers[i] && (tt = this.resizers[i], this.resizers[i] = null, f.data("resizer", null), tt.remove());
                                continue
                            }
                            if (s = rt[i] || w.offsetWidth, h = r.getFieldInfoFromHeaderCell(f, i, g, c, this._ganttControl), p || (p = w.offsetHeight), y += s, h.visible && (it = h.fieldName, n = f.data("resizer"), this.canResize && h.isFieldCell)) {
                                if (!n) {
                                    n = jQuerySplst('<div class="splst-layout-editor-resizer ' + nt.tableCssClassName + '_phantom"><\/div>');
                                    n.data("fieldName", it);
                                    n.data("index", i);
                                    n[0].style.top = u.position.top + a + "px";
                                    c && n.data("th", f);
                                    this.resizers[i] ? this.resizers.splice(i, 0, n) : this.resizers[i] = n;
                                    f.data("resizer", n);
                                    b.append(n);
                                    n.on({
                                        mousedown: jQuerySplst.proxy(this.onMouseDown, this),
                                        mouseover: jQuerySplst.proxy(this.onResizerMouseOver, this),
                                        mouseleave: jQuerySplst.proxy(this.onResizerMouseLeave, this),
                                        dblclick: jQuerySplst.proxy(this.onResizerDoubleClick, this)
                                    })
                                }
                                n[0].style.left = u.position.left + y - t + d + "px";
                                n[0].style.top = u.position.top + a + "px";
                                n.data("cellSize", {
                                    width: s,
                                    height: p,
                                    top: u.position.top + a,
                                    left: u.position.left + y - s + d
                                })
                            }
                        }
                    }
                },
                render: function() {
                    this.refreshResizers(!0);
                    this.hide();
                    this.isRendered = !0;
                    this._triggerEvent("rendered")
                },
                refreshResizers: function(n) {
                    this._refreshResizers();
                    n || this._triggerEvent("refreshed")
                },
                init: function() {
                    var n = this.$table = jQuerySplst(this.table);
                    this.$offsetParent = n.offsetParent();
                    this.isEditMode && (this._ganttControl = window[g_SPGridInitInfo[this.viewId].controllerId]);
                    this.render()
                },
                show: function() {
                    var t = this.resizers,
                        n, r, i;
                    if (t) {
                        for (n = 0, r = t.length; n < r; n++) i = t[n], i && i.show();
                        this.refreshResizers()
                    }
                },
                hide: function() {
                    var n = this.resizers,
                        t, r, i;
                    if (n && n.length)
                        for (t = 0, r = n.length; t < r; t++) i = n[t], i && i.hide()
                },
                dispose: function() {
                    var u = this.resizers,
                        n, e, f, t, o, h, s, r;
                    if (u)
                        for (n = 0, e = u.length; n < e; n++) f = u[n], f && f.remove();
                    if (delete this.resizers, delete this._ganntControl, this.$table && (t = this.$table.find("th"), t && t.length))
                        for (o = t.length, h = 0, n = 0; n < o; n++) s = t[n], r = jQuerySplst(s), r.data("resizer", ""), r.data("phantom", ""), r.removeClass("splst-layout-editor-border");
                    delete this.table;
                    delete this.$table;
                    delete this.$offsetParent;
                    i.off();
                    i = null
                },
                refresh: function() {
                    this.refreshResizers()
                },
                on: function() {
                    i.on.apply(i, arguments)
                }
            };
        return i = jQuerySplst(u), n.events && (f = n.events, jQuerySplst.each(f, function(n, t) {
            i.on("resizersControl:" + n, t)
        })), u.init(), u
    }, n.ResizersControl.columnSettings = ["header-background", "header-color", "header-align", "header-font-weight", "header-font-style", "header-text-decoration", "header-text-transform", "header-white-space", "column-background", "column-color", "column-align", "column-font-weight", "column-font-style", "column-text-decoration", "display-as-html", "truncate-text", "column-text-transform", "column-word-wrap"], n.ResizersControl.getColumnSettingsHTML = function(n, t) {
        var r = SPLST.ListTableLayoutEditor,
            u = r.Helper,
            f = r.locale.messages,
            i = [];
        i.push('<table class="splst-layout-editor-colSettings-dlg-table"><tr>');
        i.push('<td class="splst-layout-editor-colSettings-dlg-td">');
        i.push(u.generateColumnSettingsBlockHTML(!0));
        i.push(u.generateColumnSettingsBlockHTML(!1, t));
        i.push("<\/td>");
        i.push('<td class="splst-layout-editor-colSettings-dlg-td">');
        i.push('<div class="splst-layout-editor-preview-block">');
        i.push('<fieldset class="splst-layout-editor-colSettings-fieldset splst-lb-preview-fieldset' + (t && t.type == "Note" ? " lb-truncate-fieldset" : "") + '">');
        i.push("<legend>" + f.sample + "<\/legend>");
        i.push(u.generateColumnSettingsPreviewTable());
        i.push("<\/fieldset>");
        i.push("<\/div>");
        i.push("<\/td>");
        i.push("<\/tr><\/table>");
        n.one({
            "layouteditorplugin:columnSettingsDialogOpened": r.ResizersControl.onColumnSettingsDialogOpened
        });
        return i.join("")
    }, n.ResizersControl.onColumnSettingsDialogOpened = function(n, t) {
        var h = n.currentTarget,
            st = h.listFields[t.colName],
            u = SPLST.ListTableLayoutEditor,
            v = u.Helper,
            f = u.FONT_STYLE,
            et = t.colIndex,
            c = t.tableStyle,
            e = t.isDisabled,
            ot = t.cellBorders,
            l = jQuerySplst.extend(!0, {
                header: {
                    "background-color": "transparent",
                    color: "",
                    "text-align": "left",
                    "font-weight": "normal",
                    "font-style": "normal",
                    "text-decoration": "normal",
                    "text-transform": "none",
                    "white-space": !1
                },
                column: {
                    "background-color": "transparent",
                    color: "",
                    "text-align": "left",
                    "font-weight": "normal",
                    "font-style": "normal",
                    "text-decoration": "normal",
                    "text-transform": "none",
                    "word-wrap": !1
                },
                truncateText: {
                    column: !1
                }
            }, t.columnStyle),
            y, tt, p, it, w, rt, i, r, ut, ft, b, a, k, d, o, g, s, nt;
        c && (y = c[u.HEAD], y && (tt = jQuerySplst(".splst-lb-preview-table tr:nth-of-type(1)"), tt.css(y)), p = c[u.EVEN], p && (it = jQuerySplst(".splst-lb-preview-table tr:nth-of-type(2n+3)"), it.css(p)), w = c[u.ODD], w && (rt = jQuerySplst(".splst-lb-preview-table tr:nth-of-type(even)"), rt.css(w)));
        ot && u.Helper.togglePreviewTableCellBorders();
        i = l[u.HEAD];
        r = l[u.COLUMN];
        jQuerySplst(".splst-lb-preview-head").css({
            "background-color": i["background-color"],
            color: i.color,
            "font-weight": i["font-weight"],
            "font-style": i["font-style"],
            "text-decoration": i["text-decoration"],
            "text-align": i["text-align"],
            "text-transform": i["text-transform"]
        });
        jQuerySplst(".splst-lb-preview-cell").css({
            "background-color": r["background-color"],
            color: r.color,
            "font-weight": r["font-weight"],
            "font-style": r["font-style"],
            "text-decoration": r["text-decoration"],
            "text-align": r["text-align"],
            "text-transform": r["text-transform"]
        });
        jQuerySplst('#splst-layout-editor-header-align [data-align="' + i["text-align"] + '"]').addClass("pressed");
        ut = jQuerySplst(".splst-layout-editor-colSettings-dlg-table .splst-layout-editor-colorpicker-btn");
        jQuerySplst.each(ut, function(n, t) {
            jQuerySplst(t).click(function(n) {
                n.stopImmediatePropagation();
                var t = jQuerySplst(n.currentTarget);
                if (t.find(".evo-pop").length) t.find('input[type="text"]').colorpicker("hidePalette");
                else {
                    t.find('input[type="text"]').colorpicker("showPalette");
                    jQuerySplst("body").one({
                        mouseup: function(n) {
                            jQuerySplst(n.target).parent().attr("class") !== "evo-more" && t.find('input[type="text"]').colorpicker("hidePalette")
                        }
                    })
                }
            })
        });
        ft = jQuerySplst('.splst-layout-editor-colSettings-dlg-table .splst-layout-editor-colorpicker-color>input[type="text"]');
        jQuerySplst.each(ft, function(n, t) {
            var o = jQuerySplst(t),
                s = !!o.data("isheader"),
                c = !!o.data("isbackground"),
                f, l = o.parent(),
                a = u.tbodySelector;
            f = c ? s ? i["background-color"] : r["background-color"] : s ? i.color || v.div_ms_vh2_color : (v.containsSelector("." + h.tableCssClassName + a + " > tr > td:nth-child(" + (et + 1) + ")"), [v.stylesheets.basic]) ? r.color || h.$table.css("color") : h.$table.css("color");
            (f === "transparent" || /^rgba\(\d+,\s*\d+,\s*\d+,\s*0\)/g.test(f)) && (f = "#0000ffff");
            o.colorpicker({
                displayIndicator: !1,
                showOn: "none",
                transparentColor: c,
                color: f,
                renderPaletteToBody: !0
            }).on("change.color", function(n, t) {
                var h = t !== f,
                    r, o, i;
                t === "#0000ffff" && (t = "transparent");
                o = c ? "background-color" : "color";
                r = s ? jQuerySplst(".splst-lb-preview-head") : jQuerySplst(".splst-lb-preview-cell");
                r.css(o, t);
                i = "data-";
                i += s ? "header-" : "column-";
                i += c ? "background" : "color";
                i += "-haschanges";
                r.closest("table").attr(i, h);
                u.setColSettingsDialogOkButtonAvailability(e)
            });
            l.find("div").first().css({
                width: "20px",
                padding: "0",
                margin: "0"
            })
        });
        jQuerySplst('#splst-layout-editor-column-align [data-align="' + r["text-align"] + '"]').addClass("pressed");
        jQuerySplst(".splst-layout-editor-colSettings-dlg-table .splst-layout-editor-align-icon-container").click(function(n) {
            var t = jQuerySplst(n.currentTarget),
                f = t.data("isheader"),
                l = t.parent(),
                o = jQuerySplst(f ? ".splst-lb-preview-head" : ".splst-lb-preview-cell"),
                s = t.data("align"),
                h, c;
            l.find(".splst-layout-editor-align-icon-container").removeClass("pressed");
            t.addClass("pressed");
            o.css("text-align", s);
            h = f ? i["text-align"] : r["text-align"];
            c = "data-" + (f ? "header-" : "column-") + "align-haschanges";
            o.closest("table").attr(c, s !== h);
            u.setColSettingsDialogOkButtonAvailability(e)
        });
        b = jQuerySplst(".splst-layout-editor-colSettings-dlg-table .splst-layout-editor-style-icon-container");
        jQuerySplst.each(b, function(n, t) {
            var u = jQuerySplst(t),
                o = u.data("isheader"),
                s = u.data("font-style"),
                e = o ? i : r;
            switch (s) {
                case f.BOLD:
                    (e["font-weight"] === "bold" || e["font-weight"] === "700") && u.addClass("pressed");
                    break;
                case f.ITALIC:
                    e["font-style"] === "italic" && u.addClass("pressed");
                    break;
                case f.UNDERLINE:
                    e["text-decoration"] === "underline" && u.addClass("pressed");
                    break;
                case f.STRIKETHROUGH:
                    e["text-decoration"] === "line-through" && u.addClass("pressed")
            }
        });
        b.click(function(n) {
            var o = jQuerySplst(n.currentTarget),
                c = o.data("isheader"),
                l = jQuerySplst(c ? ".splst-lb-preview-head" : ".splst-lb-preview-cell"),
                w = o.data("font-style"),
                t = !1,
                v, h, y;
            o.toggleClass("pressed");
            t = o.hasClass("pressed");
            var s = "data-" + (c ? "header-" : "column-"),
                p = isItalic = !1,
                a = c ? i : r;
            p = a["font-weight"] === "700" || a["font-weight"] === "bold";
            v = a["text-decoration"];
            isItalic = a["font-style"] === "italic";
            isStrikethrough = a["text-decoration"] === "line-through";
            h = !1;
            switch (w) {
                case f.BOLD:
                    l.css("font-weight", t ? "bold" : "normal");
                    s += "font-weight-";
                    h = p !== t;
                    break;
                case f.ITALIC:
                    l.css("font-style", t ? "italic" : "normal");
                    s += "font-style-";
                    h = isItalic !== t;
                    break;
                case f.UNDERLINE:
                    l.css("text-decoration", t ? "underline" : "none");
                    s += "text-decoration-";
                    h = t ? v !== "underline" : v !== "none";
                    t && (y = o.parent().find("#splst-layout-editor-" + (c ? "header" : "column") + "-strikethrough"), y.removeClass("pressed"));
                    break;
                case f.STRIKETHROUGH:
                    l.css("text-decoration", t ? "line-through" : "none");
                    s += "text-decoration-";
                    h = t ? v !== "line-through" : v !== "none";
                    t && (y = o.parent().find("#splst-layout-editor-" + (c ? "header" : "column") + "-underline"), y.removeClass("pressed"))
            }
            s += "haschanges";
            l.closest("table").attr(s, h);
            u.setColSettingsDialogOkButtonAvailability(e)
        });
        a = document.querySelector("#splst-layout-editor-truncate-text-cbx");
        a && (k = !!l.truncateText && l.truncateText.column === !0, a.checked = k, jQuerySplst("#splst-layout-editor-truncate-text-cbx").click(function() {
            var n = jQuerySplst(".splst-lb-preview-head").closest("table");
            n.attr("data-truncate-text-haschanges", k == !a.checked);
            u.setColSettingsDialogOkButtonAvailability(e)
        }));
        d = jQuerySplst('[data-lb-id^="text-case-"]');
        d.each(function(n, t) {
            var u = jQuerySplst(t);
            u.val((t.getAttribute("data-isheader") === "true" ? i : r)["text-transform"])
        });
        d.change(function(n) {
            var f = n.currentTarget,
                t = f.getAttribute("data-isheader") === "true",
                o = f.value,
                h = (t ? i : r)["text-transform"],
                s;
            $preview = jQuerySplst(t ? ".splst-lb-preview-head" : ".splst-lb-preview-cell");
            $preview.css("text-transform", o);
            s = "data-" + (t ? "header-" : "column-") + "text-transform-haschanges";
            $preview.closest("table").attr(s, o !== h);
            u.setColSettingsDialogOkButtonAvailability(e)
        });
        o = document.querySelector('[data-lb-id="allowWordWrap"]');
        o && (g = i["white-space"] === !0, o.checked = g, o.addEventListener("click", function() {
            var n = jQuerySplst(".splst-lb-preview-head").closest("table");
            n.attr("data-header-white-space-haschanges", g == !o.checked);
            u.setColSettingsDialogOkButtonAvailability(e)
        }));
        s = document.querySelector('[data-lb-id="allowBreakWord"]');
        s && (nt = r["word-wrap"] === !0, s.checked = nt, s.addEventListener("click", function() {
            var n = jQuerySplst(".splst-lb-preview-head").closest("table");
            n.attr("data-column-word-wrap-haschanges", nt == !s.checked);
            u.setColSettingsDialogOkButtonAvailability(e)
        }))
    }, n.ResizersControl.collectColumnSettingsDialogData = function() {
        var u = jQuerySplst(".splst-lb-preview-head"),
            f = jQuerySplst(".splst-lb-preview-cell"),
            n = u.closest("table"),
            e = {
                header: {},
                column: {}
            },
            r = hasColumnStyle = !1,
            i = e.header,
            t;
        return n.attr("data-header-background-haschanges") === "true" && (i["background-color"] = u.css("background-color"), r = !0), n.attr("data-header-color-haschanges") === "true" && (i.color = u.css("color"), r = !0), n.attr("data-header-font-weight-haschanges") === "true" && (i["font-weight"] = u.css("font-weight"), r = !0), n.attr("data-header-font-style-haschanges") === "true" && (i["font-style"] = u.css("font-style"), r = !0), n.attr("data-header-text-decoration-haschanges") === "true" && (i["text-decoration"] = u.css("text-decoration"), i["text-decoration"].indexOf(" ") !== -1 && (i["text-decoration"] = i["text-decoration"].slice(0, i["text-decoration"].indexOf(" "))), r = !0), n.attr("data-header-align-haschanges") === "true" && (i["text-align"] = u.css("text-align"), r = !0), n.attr("data-header-text-transform-haschanges") === "true" && (i["text-transform"] = u.css("text-transform"), r = !0), n.attr("data-header-white-space-haschanges") === "true" && (i["white-space"] = document.querySelector('[data-lb-id="allowWordWrap"]').checked, r = !0), t = e.column, n.attr("data-column-background-haschanges") === "true" && (t["background-color"] = f.css("background-color"), hasColumnStyle = !0), n.attr("data-column-color-haschanges") === "true" && (t.color = f.css("color"), hasColumnStyle = !0), n.attr("data-column-font-weight-haschanges") === "true" && (t["font-weight"] = f.css("font-weight"), hasColumnStyle = !0), n.attr("data-column-font-style-haschanges") === "true" && (t["font-style"] = f.css("font-style"), hasColumnStyle = !0), n.attr("data-column-text-decoration-haschanges") === "true" && (t["text-decoration"] = f.css("text-decoration"), t["text-decoration"].indexOf(" ") !== -1 && (t["text-decoration"] = t["text-decoration"].slice(0, t["text-decoration"].indexOf(" "))), hasColumnStyle = !0), n.attr("data-column-align-haschanges") === "true" && (t["text-align"] = f.css("text-align"), hasColumnStyle = !0), n.attr("data-truncate-text-haschanges") === "true" && (e.truncateText = {
            column: document.querySelector("#splst-layout-editor-truncate-text-cbx").checked
        }), n.attr("data-column-text-transform-haschanges") === "true" && (t["text-transform"] = f.css("text-transform"), hasColumnStyle = !0), n.attr("data-column-word-wrap-haschanges") === "true" && (t["word-wrap"] = document.querySelector('[data-lb-id="allowBreakWord"]').checked, hasColumnStyle = !0), r || delete e.header, hasColumnStyle || delete e.column, e
    }, n.ResizersControl.hasColumnSettingsChanges = function() {
        var t = jQuerySplst(".splst-lb-preview-head").closest("table"),
            i = this.columnSettings,
            n = !1;
        return jQuerySplst.each(i, function(i, r) {
            n = n || t.attr("data-" + r + "-haschanges") === "true"
        }), n
    }, n.ResizersControl.getTableSettingsHTML = function(n, t) {
        var r = SPLST.ListTableLayoutEditor,
            f = r.Helper,
            u = r.locale.messages,
            i = [];
        i.push('<table class="splst-layout-editor-colSettings-dlg-table"><tr>');
        i.push('<td class="splst-layout-editor-table-style-dlg-td">');
        i.push(f.generateTableStyleBlockHTML(u.light, r.TableTemplates.light, t));
        i.push(f.generateTableStyleBlockHTML(u.medium, r.TableTemplates.medium, t));
        i.push(f.generateTableStyleBlockHTML(u.dark, r.TableTemplates.dark, t));
        i.push("<div>");
        i.push('<div class="splst-lb-float-left"><label><input type="checkbox" style="margin-top: 0px;" data-lb-id="cellBorders" />' + u.cellBorders + "<\/label><\/div>");
        i.push('<div class="splst-lb-float-right"><a class="splst-lb-ts-clear" href="javascript:;">' + u.clearStyles + "<\/a><\/div>");
        i.push('<div class="splst-lb-float-clear"><\/div>');
        i.push("<\/div>");
        i.push("<\/td>");
        i.push('<td class="splst-layout-editor-table-style-dlg-td-less">');
        i.push('<div class="splst-layout-editor-preview-block">');
        i.push('<fieldset class="splst-layout-editor-colSettings-fieldset splst-lb-preview-fieldset">');
        i.push("<legend>" + u.sample + "<\/legend>");
        i.push(f.generateColumnSettingsPreviewTable(!0));
        i.push("<\/fieldset>");
        i.push("<\/div>");
        i.push("<\/td>");
        i.push("<\/tr><\/table>");
        n.one({
            "layouteditorplugin:tableSettingsDialogOpened": r.ResizersControl.onTableSettingsDialogOpened
        });
        return i.join("")
    }, n.ResizersControl.onTableSettingsDialogOpened = function(n, t) {
        var i = SPLST.ListTableLayoutEditor,
            s = n.currentTarget,
            o = t.tableStyle,
            r = t.isDisabled,
            e = t.selectedStyleId,
            u = t.cellBorders,
            f;
        i.ResizersControl._setTableStylePreviewCss(o);
        jQuerySplst(".splst-layout-editor-table-style-icon-container").on({
            click: jQuerySplst.proxy(function(n) {
                var u = jQuerySplst(n.currentTarget),
                    o = u.parent(),
                    t = u.attr("id"),
                    f = i.TableTemplates.light[t] || i.TableTemplates.medium[t] || i.TableTemplates.dark[t];
                jQuerySplst(".splst-layout-editor-table-style-icon-container").removeClass("pressed");
                u.addClass("pressed");
                i.ResizersControl._setTableStylePreviewCss(f);
                jQuerySplst(".splst-lb-preview-table").attr("data-lb-templ-haschanges", t !== e);
                SPLST.ListTableLayoutEditor.ResizersControl._setTableDialogOkBtnAvailability(r)
            }, this)
        });
        if (!r) jQuerySplst(".splst-layout-editor-table-style-icon-container").on({
            dblclick: jQuerySplst.proxy(function(n) {
                var t = jQuerySplst(n.currentTarget),
                    i = t.attr("id");
                i !== e && SPLST.ListTableLayoutEditor.dismissTableStylesDialog(n.currentTarget, !0)
            }, this)
        });
        jQuerySplst(".splst-lb-ts-clear").click(function() {
            jQuerySplst(".splst-lb-preview-head").css("background-color", "").css("color", "");
            jQuerySplst(".splst-layout-editor-preview-odd").css("background-color", "");
            jQuerySplst(".splst-layout-editor-preview-even").css("background-color", "");
            jQuerySplst(".splst-layout-editor-table-style-icon-container").removeClass("pressed");
            jQuerySplst(".splst-lb-preview-table").attr("data-lb-templ-haschanges", !0);
            SPLST.ListTableLayoutEditor.ResizersControl._setTableDialogOkBtnAvailability(r)
        });
        f = jQuerySplst('[data-lb-id="cellBorders"]');
        f[0].checked = u;
        u && i.Helper.togglePreviewTableCellBorders();
        f.click(function(n) {
            i.Helper.togglePreviewTableCellBorders();
            var t = n.currentTarget.checked !== u;
            jQuerySplst(".splst-lb-preview-table").attr("data-lb-cell-borders-haschanges", t);
            SPLST.ListTableLayoutEditor.ResizersControl._setTableDialogOkBtnAvailability(r)
        })
    }, n.ResizersControl._setTableDialogOkBtnAvailability = function(n) {
        var t = jQuerySplst(".splst-lb-preview-table"),
            i = jQuerySplst("#splst-layout-editor-OkBtnDismissDlg");
        n || t.attr("data-lb-templ-haschanges") !== "true" && t.attr("data-lb-cell-borders-haschanges") !== "true" ? i.attr("disabled", "disabled") : i.removeAttr("disabled")
    }, n.ResizersControl._setTableStylePreviewCss = function(n) {
        if (n) {
            var t = SPLST.ListTableLayoutEditor,
                f = jQuerySplst(".splst-lb-preview-head"),
                i = n[t.HEAD],
                r = i["background-color"],
                u = i.color;
            jQuerySplst.each(f, function(n, t) {
                var i = jQuerySplst(t);
                r && i.css("background-color", r);
                u ? i.css("color", u) : i.css("color", "")
            });
            jQuerySplst(".splst-layout-editor-preview-odd").css("background-color", n[t.ODD]["background-color"]).css("color", n[t.ODD].color);
            jQuerySplst(".splst-layout-editor-preview-even").css("background-color", n[t.EVEN]["background-color"]).css("color", n[t.EVEN].color)
        }
    }, n.ResizersControl.collectTableSettingsDialogData = function() {
        var u = document.querySelector(".splst-lb-preview-table"),
            t = {},
            i = SPLST.ListTableLayoutEditor,
            r, n, f;
        return u.getAttribute("data-lb-templ-haschanges") === "true" && (r = jQuerySplst(".splst-layout-editor-table-style-icon-container.pressed"), r.length ? (n = r.attr("id"), f = i.TableTemplates.light[n] || i.TableTemplates.medium[n] || i.TableTemplates.dark[n], t.selectedTemplateId = n) : t.cleared = !0), u.getAttribute("data-lb-cell-borders-haschanges") && (t.cellBorders = document.querySelector('[data-lb-id="cellBorders"]').checked), t
    }, n.ResizersControl.getTabData = function() {
        return {
            title: SPLST.ListTableLayoutEditor.locale.messages.staticColumnSettingsTabTitle,
            id: "splst_layout_editor_column_static_formatting",
            height: 420,
            width: parseInt(SPLST.ListTableLayoutEditor.locale.styles.staticTab.width) || 650,
            isDisabled: !1,
            isVisible: !0
        }
    }, n.ResizersControl.setColumnStyles = function(n, t, i, r) {
        var w, d, ut, rt;
        if (n) {
            var o = SPLST.ListTableLayoutEditor,
                f = o.Helper,
                e = f.stylesheets.basic,
                s = t.isEditMode,
                c = o.getColumnStylesObject(n, s),
                g = t.table.rows,
                y = jQuerySplst(g[0].cells[r]),
                u, l, nt, p, v, ft, h = t.tableCssClassName,
                et = !s && g.length > 1 && jQuerySplst(g[1].cells[r]).data("decoded"),
                ot = t.$tbodyWrap || t.$table.find("tbody").length > 1,
                a = o.tbodySelector;
            if (needToDecode = et !== n.displayAsHTML, needToDecode && !s && jQuerySplst.each(g, function(t, i) {
                    if (t) {
                        var u = jQuerySplst(i.cells[r]);
                        n.displayAsHTML ? (u.html(u.text()), u.data("decoded", !0)) : et && (u.text(u.html()), u.data("decoded", !1))
                    }
                }), c[o.COLUMN] && (p = c[o.COLUMN], u = h + a + " > tr > td" + (s ? ':not([aria-readonly="true"])' : "") + ":nth-child(" + (r + 1) + ")", f.addCssRule(e, "." + u, p), u = "." + h + a + " > tr:nth-child(" + (s ? "2n + 3" : "odd") + ") > td" + (s ? ':not([aria-readonly="true"])' : "") + ":nth-child(" + (r + 1) + ")", f.addCssRule(e, u, p), u = "." + h + a + " > tr:nth-child(even) > td" + (s ? ':not([aria-readonly="true"])' : "") + ":nth-child(" + (r + 1) + ")", f.addCssRule(e, u, p), s || ot && (v = h + ' > tbody[data-splst-wrap="true"] ' + a + " > tr > td:nth-child(" + (r + 1) + ")", f.addCssRule(e, "." + v, p), v = "." + h + ' > tbody[data-splst-wrap="true"] ' + a + " > tr:nth-child(odd) > td:nth-child(" + (r + 1) + ")", f.addCssRule(e, v, p), v = "." + h + ' > tbody[data-splst-wrap="true"] ' + a + " > tr:nth-child(even) > td:nth-child(" + (r + 1) + ")", f.addCssRule(e, v, p))), c[o.COLUMN_DESCENDANTS]) {
                var st = t.table.rows[0],
                    ct = SPLST.ListTableLayoutEditor.Helper.getFieldInfoFromHeaderCell(jQuerySplst(st.cells[r]), r, st.cells.length, t.isEditMode, t._ganttControl),
                    b = t.getDescendantsSelectors(ct.colName),
                    tt = !!(b && b.length),
                    it = c[o.COLUMN_DESCENDANTS];
                u = "." + h + a + " > tr > td" + (s ? ':not([aria-readonly="true"])' : "") + ":nth-child(" + (r + 1) + ")";
                tt && (l = u + " " + b.join(", " + u + " "), f.addCssRule(e, l, it));
                u = "." + h + a + " > tr:nth-child(" + (s ? "2n + 3" : "odd") + ") > td" + (s ? ':not([aria-readonly="true"])' : "") + ":nth-child(" + (r + 1) + ")";
                tt && (l = u + " " + b.join(", " + u + " "), f.addCssRule(e, l, it));
                u = "." + h + a + " > tr:nth-child(even) > td" + (s ? ':not([aria-readonly="true"])' : "") + ":nth-child(" + (r + 1) + ")";
                tt && (l = u + " " + b.join(", " + u + " "), f.addCssRule(e, l, it));
                ot && tt && !s && (v = "." + h + ' > tbody[data-splst-wrap="true"] ' + a + " > tr > td:nth-child(" + (r + 1) + ")", ft = v + " " + b.join(", " + v + " "), f.addCssRule(e, ft, it))
            }
            if (c[o.HEAD]) {
                u = t._generateCorrectCssClassName(i);
                f.addCssRule(e, "." + u, c[o.HEAD]);
                y.addClass(u);
                var k = c[o.HEAD]["background-color"],
                    lt = JSON.parse(JSON.stringify(c[o.HEAD])),
                    ht = h + "> " + (s ? "tbody" : "thead") + " > tr:nth-child(1) > th:nth-child(" + (r + 1) + ")";
                if (k && k !== "transparent" && !/^rgba\(\d+,\s*\d+,\s*\d+,\s*0\)/g.test(k) ? f.addCssRule(e, "." + ht, lt) : f.removeCssRule(e, "." + ht), s)
                    if (w = u + o.EDIT_MODE_COL_BG, k) {
                        if (f.addCssRule(e, "." + h + "> tbody > tr:nth-child(1) > th." + w, "background-color: " + k + " !important;"), f.addCssRule(e, "." + w, "background-color: " + k + " !important;"), y.addClass(w), !t.handledHeaderCells[i]) {
                            t.handledHeaderCells[i] = y;
                            y.on({
                                "mouseover.splstlayouteditor": function(n) {
                                    jQuerySplst(n.currentTarget).removeClass(w)
                                },
                                "mouseout.splstlayouteditor": function(n) {
                                    jQuerySplst(n.currentTarget).addClass(w)
                                }
                            })
                        }
                    } else t.handledHeaderCells[i] && (f.removeCssRule(e, w), y.off(".splstlayouteditor"), delete t.handledHeaderCells[i])
            }
            c[o.HEAD_DESCENDANTS] && (d = c[o.HEAD_DESCENDANTS], u = t._generateCorrectCssClassName(i), l = "." + u + " " + o.HEAD_DESCENDANTS_SELECTORS.join(", ." + u + " "), f.addCssRule(e, l, d), nt = "." + u + " " + o.HEAD_DESCENDANTS_SELECTORS.join(" :not(select):not(option), ." + u + " ") + " *", f.addCssRule(e, nt, d), y.addClass(u), u = h + "> " + (s ? "tbody" : "thead") + " > tr:nth-child(1) > th:nth-child(" + (r + 1) + ")", l = "." + u + " " + o.HEAD_DESCENDANTS_SELECTORS.join(", ." + u + " "), f.addCssRule(e, l, d), nt = "." + u + " " + o.HEAD_DESCENDANTS_SELECTORS.join(" :not(select):not(option), ." + u + " ") + " *", f.addCssRule(e, nt, d), s && (ut = d["text-align"], rt = y.find('div[colid="content"]'), rt.length && ut && (ut.startsWith("left") ? rt.css("float", "left") : rt.css("float", "none"))));
            this.truncateText(t, n, r, i)
        }
    }, n.ResizersControl.truncateText = function(n, t, i, r) {
        var v, c, o, s;
        if (!n.isEditMode && (v = n.listFields[r], v.type === "Note")) {
            var l = SPLST.ListTableLayoutEditor,
                f = l.Helper,
                e = f.stylesheets.basic,
                p = t.truncateText && t.truncateText.column === !0,
                h = "." + n.tableCssClassName,
                u = n.getClientDataHelper();
            if (p) {
                c = t.column && t.column["text-align"];
                c === "normal" && (c = undefined);
                var y = f.getHideTextCss(c),
                    a = y[l.DATA_COLUMN],
                    w = y[l.DATA_COLUMN_ALL_DESC];
                for (a && (a.cursor = "pointer"), u.startIterator(); u.moveNext();) {
                    var o = u.getCurrentRowColSelector(h, i + 1),
                        s = u.getCurrentRowColSelectorFHWrap(h, i + 1),
                        b = u.getCurrentFieldValue(r);
                    this.truncateCellText(n, b, o, s, a, w)
                }
            } else
                for (u.startIterator(); u.moveNext();) o = u.getCurrentRowColSelector(h, i + 1), s = u.getCurrentRowColSelectorFHWrap(h, i + 1), f.removeCssRule(e, o + "::before"), f.removeCssRule(e, s + "::before"), f.removeCssRule(e, o), f.removeCssRule(e, s), f.removeCssRule(e, o + " > :not(.ms-core-menu-box)"), f.removeCssRule(e, s + " > :not(.ms-core-menu-box)"), n.$tbodyWrap && n.$tbodyWrap.length ? jQuerySplst(s).off("click.truncate") : jQuerySplst(o).off("click.truncate")
        }
    }, n.ResizersControl.truncateCellText = function(n, t, i, r, u, f) {
        var s = text = jQuerySplst("<div>" + t + "<\/div>")[0].innerText.replace(/<br>/gmi, "\\A").replace(/<br \/>/gmi, "\\A"),
            h;
        if (text && !(text.length < 258)) {
            s = text.slice(0, 255) + "...";
            var c = {
                    content: s,
                    "text-indent": "0px",
                    "white-space": "pre-wrap",
                    cursor: "pointer",
                    display: "block"
                },
                l = SPLST.ListTableLayoutEditor,
                e = l.Helper,
                o = e.stylesheets.basic;
            e.addCssRule(o, i + "::before", c);
            e.addCssRule(o, r + "::before", c);
            u && (e.addCssRule(o, i, u), e.addCssRule(o, r, u));
            f && (e.addCssRule(o, i + " > :not(.ms-core-menu-box)", f), e.addCssRule(o, r + " > :not(.ms-core-menu-box)", f));
            h = n.$tbodyWrap && n.$tbodyWrap.length ? r : i;
            jQuerySplst(h).off("click.truncate");
            jQuerySplst(h).on({
                "click.truncate": function(t, i, r) {
                    return function(s) {
                        var h = s.currentTarget,
                            c = h.getAttribute("data-truncated");
                        c === "false" ? (h.style.cursor = "", e.addCssRule(o, t + "::before, " + i + "::before", {
                            content: r,
                            "text-indent": "0px",
                            "white-space": "pre-wrap",
                            cursor: "pointer",
                            display: "block"
                        }), u && (e.addCssRule(o, t, u), e.addCssRule(o, i, u)), f && (e.addCssRule(o, t + " > :not(.ms-core-menu-box)", f), e.addCssRule(o, i + " > :not(.ms-core-menu-box)", f))) : (h.style.cursor = "pointer", e.removeCssRule(o, t + "::before"), e.removeCssRule(o, i + "::before"), u && (e.removeCssRule(o, t), e.removeCssRule(o, i)), f && (e.removeCssRule(o, t + " > :not(.ms-core-menu-box)"), e.removeCssRule(o, i + " > :not(.ms-core-menu-box)")));
                        h.setAttribute("data-truncated", c === "false");
                        n.enabled && n.refresh();
                        s.stopImmediatePropagation();
                        s.preventDefault()
                    }
                }(i, r, s)
            })
        }
    }, n.ResizersControl.initStyles = function(n, t) {
        n && t && (t.isEditMode ? this._setStylesEditMode(n, t) : this._setStylesReadMode(n, t))
    }, n.ResizersControl._setStylesReadMode = function(n, t) {
        for (var f, o, s = SPLST.ListTableLayoutEditor, u = t.table.rows, h = u.length, c = h ? u[0].cells.length : 0, e, i, r = 0; r < c; r++) e = jQuerySplst(u[0].cells[r]), f = e.find("div[name]"), f && (i = f.attr("name")), i && (i = s.Helper.getStoredName(i), o = n[i], this.setColumnStyles(o, t, i, r))
    }, n.ResizersControl._setStylesEditMode = function(n, t) {
        for (var e, o = SPLST.ListTableLayoutEditor, u = t.table.rows, s = u.length, h = s ? u[0].cells.length : 0, c, i, f = t._ganttControl.get_Columns(), r = 0; r < h; r++) c = jQuerySplst(u[0].cells[r]), i = f[r - 1] ? f[r - 1].columnKey : "", i && (i = o.Helper.getStoredName(i), e = n[i], this.setColumnStyles(e, t, i, r))
    }, n.ResizersControl.setSizes = function(n, t) {
        if (n) return t.isEditMode ? this._setSizesEditMode(n, t) : this._setSizesReadMode(n, t)
    }, n.ResizersControl._setSizesReadMode = function(n, t) {
        var r, u, f, v, s;
        if (!t.isDisposed) {
            for (var a = n, h = t.table.rows, y = h.length, p = y ? h[0].cells.length : 0, c = 0, e = [], l = [], i = 0, o = SPLST.ListTableLayoutEditor, w = o.isEdge(), r = 0; r < p; r++)(u = jQuerySplst(h[0].cells[r]), u.css("display") !== "none") && (v = u.find("div[name]"), f = v.attr("name"), f = f && o.Helper.getStoredName(f), i = u.attr("data-splst-sc") ? o.getScrollbarWidth() : e[r] = a[f] || u.outerWidth(), c += i, f && (i = a[f], i && (l.push(r), u[0].style.maxWidth = "", u.outerWidth(i), w && t.cols[r].setAttribute("width", i + "px"))));
            return t.$table.outerWidth(c), s = new jQuerySplst.Deferred, setTimeout(jQuerySplst.proxy(function() {
                if (this.isDisposed) {
                    s.resolve();
                    return
                }
                var u = this.table.rows,
                    f = u.length ? u[0].cells.length : 0,
                    r = 0,
                    h = o.Helper,
                    n;
                if (f)
                    for (n = 0; n < f; n++) h.fixWidth(this.table, n, function(t, u) {
                        i = e[t];
                        u >= i || l.indexOf(n) === -1 ? (r += u, e[t] = u) : r += i
                    }, this, t.isHeaderFreezed, l.indexOf(n) === -1 ? undefined : e[n], t);
                c < r && this.$table.outerWidth(r);
                t.cellSizes = e;
                s.resolve()
            }, t), 10), s
        }
    }, n.ResizersControl._setSizesEditMode = function(n, t) {
        for (var e, u, o, a = n, s = t.table.rows, y = s.length, v = t._ganttControl.get_Columns(), p = y ? s[0].cells.length : 0, h = 0, f = [], c = [], i = 0, l = SPLST.ListTableLayoutEditor, w = l.isEdge(), r = 0; r < p; r++)(e = jQuerySplst(s[0].cells[r]), u = v[r - 1] ? v[r - 1].columnKey : "", e.css("display") !== "none") && (u = u && l.Helper.getStoredName(u), i = f[r] = a[u] || e.outerWidth(), h += i, u && (i = a[u], i && (e.outerWidth(i), c.push(r), w && t.cols[r].setAttribute("width", i + "px"))));
        return t.$table.outerWidth(h), o = new jQuerySplst.Deferred, setTimeout(jQuerySplst.proxy(function() {
            var n;
            try {
                var e = this.table.rows,
                    u = e.length ? e[0].cells.length : 0,
                    s = l.Helper,
                    r = 0;
                if (u)
                    for (n = 0; n < u; n++) n && n !== u - 1 ? s.fixWidth(this.table, n, function(t, u) {
                        i = f[t];
                        u > i || c.indexOf(n) === -1 ? (r += u, f[t] = u) : r += i
                    }, this, !1, c.indexOf(n) === -1 ? undefined : f[n], t) : r += f[n];
                h < r && this.$table.outerWidth(r);
                t.cellSizes = f;
                o.resolve()
            } catch (a) {
                this._onError(a.message);
                o.reject()
            }
        }, t), 10), o.promise()
    }, n.ResizersControl.setTableStyles = function(n, t) {
        var w, et, it, a, rt, ut;
        if (n) {
            var u = SPLST.ListTableLayoutEditor,
                i = SPLST.ListTableLayoutEditor.Helper,
                r = i.stylesheets.table,
                s = t.isEditMode,
                kt = u.TableTemplates.light[n.selectedTemplateId] || u.TableTemplates.medium[n.selectedTemplateId] || u.TableTemplates.dark[n.selectedTemplateId],
                o = u.getTableStylesObject(kt, s),
                f, v, y, h, e = t.tableCssClassName,
                nt = u.PROPERTY_BAG_PREFIX + u.HEAD + "_bgColor",
                tt, ft, c, b, k, p = t.$tbodyWrap || t.$table.find("tbody").length > 1,
                l = u.tbodySelector;
            if (i.removeCssRulesBySelectorPrefix(r, e), i.removeCssRule(r, ".splst_layout_editor_changedCell"), o && (o[u.HEAD] && (h = o[u.HEAD], s ? (f = "." + e + "> tbody > tr:nth-child(1) > th", ft = f + ":not([class*=" + nt + "])", tt = f, w = JSON.parse(JSON.stringify(h)), w["background-color"] && i.addCssRule(r, ft, {
                    "background-color": w["background-color"]
                }), delete w["background-color"], i.addCssRule(r, f, w), et = jQuerySplst(f), jQuerySplst.each(et, function(n, t) {
                    var i = jQuerySplst(t),
                        r = nt + "_fake";
                    i.off(".splstlayouteditor");
                    i.on({
                        "mouseover.splstlayouteditor": function(n) {
                            jQuerySplst(n.currentTarget).addClass(r)
                        },
                        "mouseout.splstlayouteditor": function(n) {
                            jQuerySplst(n.currentTarget).removeClass(r)
                        }
                    })
                })) : (f = "." + e + "> thead > tr:nth-child(1) > th:not([class*=" + nt + "])", tt = "." + e + "> thead > tr:nth-child(1) > th", i.addCssRule(r, f, h)), this._setHeaderCellHoverCssRule(tt, o, t.isEditMode)), o[u.HEAD_DESCENDANTS] && (it = o[u.HEAD_DESCENDANTS], f = s ? e + "> tbody > tr:nth-child(1) > th" : e + "> thead > tr:nth-child(1) > th", v = "." + f + " " + u.HEAD_DESCENDANTS_SELECTORS.join(", ." + f + " "), i.addCssRule(r, v, it), y = "." + f + " " + u.HEAD_DESCENDANTS_SELECTORS.join(" :not(select):not(option), ." + f + " ") + " *", i.addCssRule(r, y, it)), o[u.ODD] && (h = o[u.ODD], f = "." + e + l + " > tr:nth-child(" + (s ? "even" : "odd") + ")", i.addCssRule(r, f, h), h.color && i.addCssRule(r, f + " > td" + (s ? ':not([aria-readonly="true"])' : ""), {
                    color: h.color
                }), s || (this._setRowHoverAndSelectCssRules(f, o), p && (c = "." + e + '> tbody[data-splst-wrap="true"] ' + l + " > tr:nth-child(odd)", i.addCssRule(r, c, h), h.color && i.addCssRule(r, c + " > td" + (s ? ':not([aria-readonly="true"])' : ""), {
                    color: h.color
                }), this._setRowHoverAndSelectCssRules(c, o)))), o[u.ODD_DESCENDANTS] && (a = o[u.ODD_DESCENDANTS], f = "." + e + l + " > tr:nth-child(" + (s ? "even" : "odd") + ") > td" + (s ? ':not([aria-readonly="true"])' : ""), v = f + " " + u.COLUMN_DESCENDANTS_SELECTORS.join(", " + f + " "), i.addCssRule(r, v, a), y = f + " " + u.COLUMN_DESCENDANTS_SELECTORS.join(" *, " + f + " ") + " *", i.addCssRule(r, y, a), !s && p && (c = "." + e + '> tbody[data-splst-wrap="true"] ' + l + " > tr:nth-child(odd) > td", b = c + " " + u.COLUMN_DESCENDANTS_SELECTORS.join(", " + c + " "), i.addCssRule(r, b, a), k = c + " " + u.COLUMN_DESCENDANTS_SELECTORS.join(" *, " + c + " ") + " *", i.addCssRule(r, k, a))), o[u.EVEN] && (h = o[u.EVEN], f = "." + e + l + " > tr:nth-child(" + (s ? "2n + 3" : "even") + ")", i.addCssRule(r, f, h), h.color && i.addCssRule(r, f + " > td" + (s ? ':not([aria-readonly="true"])' : ""), {
                    color: h.color
                }), s || (this._setRowHoverAndSelectCssRules(f, o), p && (c = "." + e + '> tbody[data-splst-wrap="true"] ' + l + " > tr:nth-child(even)", i.addCssRule(r, c, h), h.color && i.addCssRule(r, c + " > td", {
                    color: h.color
                }), this._setRowHoverAndSelectCssRules(c, o)))), o[u.EVEN_DESCENDANTS] && (rt = o[u.EVEN_DESCENDANTS], f = "." + e + l + " > tr:nth-child(" + (s ? "2n + 3" : "even") + ") > td" + (s ? ':not([aria-readonly="true"])' : ""), v = f + " " + u.COLUMN_DESCENDANTS_SELECTORS.join(", " + f + " "), i.addCssRule(r, v, rt), y = f + " " + u.COLUMN_DESCENDANTS_SELECTORS.join(" *, " + f + " ") + " *", i.addCssRule(r, y, rt), !s && p && (c = "." + e + '> tbody[data-splst-wrap="true"] ' + l + " > tr:nth-child(even) > td", b = c + " " + u.COLUMN_DESCENDANTS_SELECTORS.join(", " + c + " "), i.addCssRule(r, b, a), k = c + " " + u.COLUMN_DESCENDANTS_SELECTORS.join(" *, " + c + " ") + " *", i.addCssRule(r, k, a))), o[u.CHANGED_CELL] && s && (h = o[u.CHANGED_CELL], f = ".splst_layout_editor_changedCell", i.addCssRule(r, f, h)), o[u.CHILD_STYLES])) {
                h = o[u.CHILD_STYLES];
                var dt = "." + e + l + " > tr:nth-child(" + (s ? "even" : "odd") + ") > td ",
                    gt = "." + e + l + " > tr:nth-child(" + (s ? "2n + 3" : "even") + ") > td ",
                    ni = "." + e + '> tbody[data-splst-wrap="true"] ' + l + " > tr:nth-child(odd) > td ",
                    ti = "." + e + '> tbody[data-splst-wrap="true"] ' + l + " > tr:nth-child(even) > td ";
                jQuerySplst.each(h, function(n, t) {
                    var u = dt + n;
                    i.addCssRule(r, u, t);
                    u = gt + n;
                    i.addCssRule(r, u, t);
                    !s && p && (u = ni + n, i.addCssRule(r, u, t), u = ti + n, i.addCssRule(r, u, t))
                })
            }
            var d = "." + e + l + " > tr > td",
                ot = d + ".ms-vb-itmcbx",
                st = "." + e + l + " > tr > td:nth-child(1)",
                ht = "." + e + l + " > tr:nth-child(1) > td",
                ct = "." + e + '> tbody[data-splst-wrap="true"] ' + l + " > tr > td",
                lt = d + '> tbody[data-splst-wrap="true"] .ms-vb-itmcbx',
                at = "." + e + '> tbody[data-splst-wrap="true"] ' + l + " > tr > td:nth-child(1)",
                vt = "." + e + '> tbody[data-splst-wrap="true"] ' + l + " > tr:nth-child(1) > td";
            if (!s && (i.removeCssRule(r, d), i.removeCssRule(r, ot), i.removeCssRule(r, st), i.removeCssRule(r, ht), i.removeCssRule(r, ct), i.removeCssRule(r, lt), i.removeCssRule(r, at), i.removeCssRule(r, vt), n.cellBorders)) {
                if (ut = t.table.querySelector(".ms-vb-itmcbx"), ut) {
                    var g = window.getComputedStyle(ut),
                        ii = parseInt(g.getPropertyValue("padding-left")),
                        ri = parseInt(g.getPropertyValue("border-left-width")),
                        ui = parseInt(g.getPropertyValue("padding-right")),
                        fi = parseInt(g.getPropertyValue("border-right-width")),
                        yt = {
                            "padding-left": ii - (1 - ri) + "px",
                            "padding-right": ui - (1 - fi) + "px",
                            "border-right": "1px solid rgb(198, 198, 198) !important;"
                        };
                    i.addCssRule(r, ot, yt);
                    i.addCssRule(r, lt, yt)
                }
                var pt = {
                        "border-right": "1px solid rgb(198, 198, 198)",
                        "border-bottom": "1px solid rgb(198, 198, 198)"
                    },
                    wt = {
                        "border-left": "1px solid rgb(198, 198, 198)"
                    },
                    bt = {
                        "border-top": "1px solid rgb(198, 198, 198)"
                    };
                i.addCssRule(r, d, pt);
                i.addCssRule(r, st, wt);
                i.addCssRule(r, ht, bt);
                i.addCssRule(r, ct, pt);
                i.addCssRule(r, at, wt);
                i.addCssRule(r, vt, bt)
            }
        }
    }, n.ResizersControl._setHeaderCellHoverCssRule = function(n, t, i) {
        var r = SPLST.ListTableLayoutEditor,
            u = r.Helper,
            f = u.stylesheets.table,
            e = t[r.HEADER_HOVER] && t[r.HEADER_HOVER]["background-color"] || u.div_ms_headerCellStyleHover_bgColor;
        u.addCssRule(f, n + (i ? ":hover" : ".ms-headerCellStyleHover"), "background-color: " + e + " !important;")
    }, n.ResizersControl._setRowHoverAndSelectCssRules = function(n, t) {
        var f = SPLST.ListTableLayoutEditor,
            i = f.Helper,
            r = i.stylesheets.table,
            e = t[f.HOVER] && t[f.HOVER]["background-color"] || i.div_ms_headerCellStyleHover_bgColor,
            u = t[f.SELECTED] && t[f.SELECTED]["background-color"] || i.div_s4_itm_selected_inside_bgColor;
        i.addCssRule(r, n + ":hover", {
            "background-color": e
        });
        i.addCssRule(r, n + ":hover > *", {
            "background-color": e + " !important"
        });
        i.addCssRule(r, n + ".s4-itm-selected", {
            "background-color": u
        });
        i.addCssRule(r, n + ".s4-itm-selected > .ms-vb-imgFirstCell.ms-vb-imgFirstCell", {
            "border-right-color": u
        });
        i.addCssRule(r, n + ".s4-itm-selected > *", {
            "background-color": u + " !important"
        });
        i.addCssRule(r, n + ".s4-itm-selected:hover", {
            "background-color": u
        });
        i.addCssRule(r, n + ".s4-itm-selected:hover > .ms-vb-imgFirstCell.ms-vb-imgFirstCell", {
            "border-right-color": u
        });
        i.addCssRule(r, n + ".s4-itm-selected:hover > *", {
            "background-color": u + " !important"
        })
    }, n.ResizersControl.clearTableStyles = function(n) {
        var i = SPLST.ListTableLayoutEditor,
            t = SPLST.ListTableLayoutEditor.Helper,
            r = t.stylesheets.table,
            u = n.tableCssClassName,
            f = i.PROPERTY_BAG_PREFIX + i.HEAD + "_bgColor";
        t.removeCssRulesBySelectorPrefix(r, u);
        selector = ".splst_layout_editor_changedCell";
        t.removeCssRule(r, selector)
    }, n.ResizersControl.mergeStyles = function(n, t, i) {
        var r = SPLST.ListTableLayoutEditor;
        (n[r.COLUMN] || t[r.COLUMN]) && (i[r.COLUMN] = jQuerySplst.extend(!0, {}, n[r.COLUMN], t[r.COLUMN]));
        (n[r.HEAD] || t[r.HEAD]) && (i[r.HEAD] = jQuerySplst.extend(!0, {}, n[r.HEAD], t[r.HEAD]));
        (n.truncateText || t.truncateText) && (i.truncateText = jQuerySplst.extend(!0, {}, n.truncateText, t.truncateText))
    }, n.ResizersControl.switchStylesScope = function() {}, n.ResizersControl.updateDependentStyles = function() {}, n.ResizersControl.getDependentColumns = function() {}, n.ResizersControl.clearColumnSettingsDialogResources = function() {}, n.ResizersControl.onClientDataChanging = function(n) {
        var t = n.layoutEditor,
            tt = n.styles,
            r, y, u, p, e, g, o, s;
        if (!t.isEditMode) {
            var h = SPLST.ListTableLayoutEditor,
                c = h.Helper,
                ct = c.stylesheets.basic,
                l = t.table.rows,
                it = l.length,
                rt = it ? l[0].cells.length : 0,
                k, i, a = n.added,
                ut = a ? a.length : 0,
                v = n.deleted,
                ft = v ? v.length : 0,
                f = t.getClientDataHelper(),
                d = "." + t.tableCssClassName;
            for (w && (w.cursor = "pointer"), r = 0; r < rt; r++)
                if (k = jQuerySplst(l[0].cells[r]), y = k.find("div[name]"), y && (i = y.attr("name")), i) {
                    if (i = c.getStoredName(i), u = tt[i], p = t.listFields[i], !p || p.type !== "Note" || !u || !u.truncateText || u.truncateText.column !== !0) continue;
                    for (e = 0; e < ft; e++) g = v[e], this._removeTextTruncate(r, g, t, f);
                    o = u.column && u.column["text-align"];
                    o === "normal" && (o = undefined);
                    var nt = c.getHideTextCss(o),
                        w = nt[h.DATA_COLUMN],
                        et = nt[h.DATA_COLUMN_ALL_DESC];
                    for (s = 0; s < ut; s++) {
                        var b = a[s],
                            ot = f.getFieldValue(i, b),
                            st = f.getRowColSelector(d, r + 1, b),
                            ht = f.getRowColSelectorFHWrap(d, r + 1, b);
                        this.truncateCellText(t, ot, st, ht, w, et)
                    }
                }
        }
    }, n.ResizersControl.onCellPropertyChanged = function(n, t) {
        var e = SPLST.ListTableLayoutEditor,
            o = e.CELL_PROPERTIES,
            s = t.styles,
            u = t.layoutEditor,
            h = t.colIndex,
            c = t.rowIndex,
            f = t.fieldName,
            i, r;
        switch (n) {
            case o.valueVisible:
                if (i = s[f], r = u.listFields[f], !r || r.type !== "Note" || !i.truncateText || i.truncateText.column !== !0) return;
                this._removeTextTruncate(h, c, u)
        }
    }, n.ResizersControl._removeTextTruncate = function(n, t, i, r) {
        r = r || i.getClientDataHelper();
        var h = SPLST.ListTableLayoutEditor,
            u = h.Helper,
            f = u.stylesheets.basic,
            s = "." + i.tableCssClassName,
            e = r.getRowColSelector(s, n + 1, t),
            o = r.getRowColSelectorFHWrap(s, n + 1, t);
        u.removeCssRule(f, e + "::before");
        u.removeCssRule(f, o + "::before");
        u.removeCssRule(f, e);
        u.removeCssRule(f, o);
        u.removeCssRule(f, e + " > :not(.ms-core-menu-box)");
        u.removeCssRule(f, o + " > :not(.ms-core-menu-box)");
        i.$tbodyWrap && i.$tbodyWrap.length ? jQuerySplst(o).off("click.truncate") : jQuerySplst(e).off("click.truncate")
    }, n.conditionalFormattingVersion = "1.0.0", n.PROPERTY_BAG_LOCAL_POSTFIX = "_local", n.secondArgIdPrefix = "splstRuleSecondArg", n.ConditinalFormattingRuleIdIndex = 0, n.ConditionalFormattingRuleTypes = {
        TextContains: "text|contains",
        TextNotContains: "text|notContains",
        TextEqual: "text|equal",
        TextStartsWith: "text|startsWith",
        TextEndsWith: "text|endsWith",
        TextIsEmpty: "text|isEmpty",
        TextIsNotEmpty: "text|isNotEmpty",
        DateIs: "date|is",
        DateIsBefore: "date|isBefore",
        DateIsAfter: "date|isAfter",
        DigitGreater: "logicalDigit|greater",
        DigitGreaterEqual: "logicalDigit|greaterEqual",
        DigitLess: "logicalDigit|less",
        DigitLessEqual: "logicalDigit|lessEqual",
        DigitEqual: "logicalDigit|equal",
        DigitNotEqual: "logicalDigit|notEqual",
        DigitIsBetween: "logicalDigit|isBetween",
        DigitIsNotBetween: "logicalDigit|isNotBetween",
        DigitTop: "topBottomDigit|top",
        DigitBottom: "topBottomDigit|bottom",
        DigitTopPercent: "topBottomDigit|topPercent",
        DigitBottomPercent: "topBottomDigit|bottomPercent",
        DigitEqualAverage: "averageDigit|equal",
        DigitAboveAverage: "averageDigit|above",
        DigitBelowAverage: "averageDigit|below",
        DigitEqualOrAboveAverage: "averageDigit|equalOrAbove",
        DigitEqualOrBelowAverage: "averageDigit|equalOrBelow"
    }, n.ConditionalFormattingTypeBasedRuleTypes = {
        UserCurrent: "user|current"
    }, n.ConditionalFormattingDateFormulas = {
        Today: "today",
        Yesterday: "yesterday",
        Tomorrow: "tomorrow",
        PastWeek: "pastWeek",
        ThisWeek: "thisWeek",
        NextWeek: "nextWeek",
        PastMonth: "pastMonth",
        ThisMonth: "thisMonth",
        NextMonth: "nextMonth",
        PastYear: "pastYear",
        ThisYear: "thisYear",
        NextYear: "nextYear",
        ExactDate: "exactDate"
    }, n.ConditionalFormattingIndicators = {
        Circle: {
            valueHex: "&#xf100;",
            value: "\\f100",
            row: 0
        },
        Rect: {
            valueHex: "&#xf101;",
            value: "\\f101",
            row: 0
        },
        Rhombus: {
            valueHex: "&#xf10e;",
            value: "\\f10e",
            row: 0
        },
        TriangleUp: {
            valueHex: "&#xf112;",
            value: "\\f112",
            row: 0
        },
        TriangleDown: {
            valueHex: "&#xf113;",
            value: "\\f113",
            row: 0
        },
        Check: {
            valueHex: "&#xf107;",
            value: "\\f107",
            row: 1
        },
        Warning: {
            valueHex: "&#xf109;",
            value: "\\f109",
            row: 1
        },
        Error: {
            valueHex: "&#xf108;",
            value: "\\f108",
            row: 1
        },
        CircleCheck: {
            valueHex: "&#xf102;",
            value: "\\f102",
            row: 1
        },
        CircleWarning: {
            valueHex: "&#xf106;",
            value: "\\f106",
            row: 1
        },
        CircleError: {
            valueHex: "&#xf105;",
            value: "\\f105",
            row: 1
        },
        SmallTriangleUp: {
            valueHex: "&#xf114;",
            value: "\\f114",
            row: 2
        },
        SmallTriangleDown: {
            valueHex: "&#xf103;",
            value: "\\f103",
            row: 2
        },
        Minus: {
            valueHex: "&#xf10a;",
            value: "\\f10a",
            row: 2
        },
        Plus: {
            valueHex: "&#xf117;",
            value: "\\f117",
            row: 2
        },
        ArrowW: {
            valueHex: "&#xf115;",
            value: "\\f115",
            row: 3
        },
        ArrowN: {
            valueHex: "&#xf10b;",
            value: "\\f10b",
            row: 3
        },
        ArrowE: {
            valueHex: "&#xf104;",
            value: "\\f104",
            row: 3
        },
        ArrowS: {
            valueHex: "&#xf10f;",
            value: "\\f10f",
            row: 3
        },
        ArrowNW: {
            valueHex: "&#xf10d;",
            value: "\\f10d",
            row: 4
        },
        ArrowNE: {
            valueHex: "&#xf10c;",
            value: "\\f10c",
            row: 4
        },
        ArrowSE: {
            valueHex: "&#xf110;",
            value: "\\f110",
            row: 4
        },
        ArrowSW: {
            valueHex: "&#xf111;",
            value: "\\f111",
            row: 4
        },
        FlagWaived: {
            valueHex: "&#xf127;",
            value: "\\f127",
            row: 5
        },
        FlagEmpty: {
            valueHex: "&#xf128;",
            value: "\\f128",
            row: 5
        },
        FlagFilled: {
            valueHex: "&#xf126;",
            value: "\\f126",
            row: 5
        },
        StarEmpty: {
            valueHex: "&#xf138;",
            value: "\\f138",
            row: 6
        },
        StarHalf: {
            valueHex: "&#xf13a;",
            value: "\\f13a",
            row: 6
        },
        StarFull: {
            valueHex: "&#xf139;",
            value: "\\f139",
            row: 6
        },
        DiagramEmpty: {
            valueHex: "&#xf129;",
            value: "\\f129",
            row: 7
        },
        DiagramQuarter: {
            valueHex: "&#xf12c;",
            value: "\\f12c",
            row: 7
        },
        DiagramHalf: {
            valueHex: "&#xf12b;",
            value: "\\f12b",
            row: 7
        },
        DiagramThreeQuarters: {
            valueHex: "&#xf12d;",
            value: "\\f12d",
            row: 7
        },
        DiagramFull: {
            valueHex: "&#xf12a;",
            value: "\\f12a",
            row: 7
        },
        CircleEmpty: {
            valueHex: "&#xf12e;",
            value: "\\f12e",
            row: 8
        },
        CircleQuarter: {
            valueHex: "&#xf131;",
            value: "\\f131",
            row: 8
        },
        CircleHalf: {
            valueHex: "&#xf130;",
            value: "\\f130",
            row: 8
        },
        CircleThreeQuarters: {
            valueHex: "&#xf132;",
            value: "\\f132",
            row: 8
        },
        CircleFull: {
            valueHex: "&#xf12f;",
            value: "\\f12f",
            row: 8
        },
        SquaresEmpty: {
            valueHex: "&#xf133;",
            value: "\\f133",
            row: 9
        },
        SquaresQuarter: {
            valueHex: "&#xf136;",
            value: "\\f136",
            row: 9
        },
        SquaresHalf: {
            valueHex: "&#xf135;",
            value: "\\f135",
            row: 9
        },
        SquaresThreeQuarters: {
            valueHex: "&#xf137;",
            value: "\\f137",
            row: 9
        },
        SquaresFull: {
            valueHex: "&#xf134;",
            value: "\\f134",
            row: 9
        },
        WifiEmpty: {
            valueHex: "&#xf13b;",
            value: "\\f13b",
            row: 10
        },
        WifiOne: {
            valueHex: "&#xf140;",
            value: "\\f140",
            row: 10
        },
        WifiTwo: {
            valueHex: "&#xf142;",
            value: "\\f142",
            row: 10
        },
        WifiFull: {
            valueHex: "&#xf141;",
            value: "\\f141",
            row: 10
        },
        SmileHappy: {
            valueHex: "&#xf119;",
            value: "\\f119",
            row: 11
        },
        SmileNeutral: {
            valueHex: "&#xf11a;",
            value: "\\f11a",
            row: 11
        },
        SmileSad: {
            valueHex: "&#xf11d;",
            value: "\\f11d",
            row: 11
        },
        Like: {
            valueHex: "&#xf11c;",
            value: "\\f11c",
            row: 11
        },
        Dislike: {
            valueHex: "&#xf11b;",
            value: "\\f11b",
            row: 11
        },
        ExclPoint: {
            valueHex: "&#xf109;",
            value: "\\f109",
            row: 12
        },
        DoubleExclPoint: {
            valueHex: "&#xf41f;",
            value: "\\f41f",
            row: 12
        },
        QuestionMark: {
            valueHex: "&#xf41e;",
            value: "\\f41e",
            row: 12
        },
        Heart: {
            valueHex: "&#xf41d;",
            value: "\\f41d",
            row: 12
        },
        Crawl: {
            valueHex: "&#xf41c;",
            value: "\\f41c",
            row: 13
        },
        Walk: {
            valueHex: "&#xf41a;",
            value: "\\f41a",
            row: 13
        },
        Run: {
            valueHex: "&#xf41b;",
            value: "\\f41b",
            row: 13
        },
        Fly: {
            valueHex: "&#xf419;",
            value: "\\f419",
            row: 13
        }
    }, n.ConditionalFormattingTypes = {
        rules: "rules",
        pb: "pb",
        none: "none"
    }, n.ConditionalFormattingProgressBars = {
        RectF: {
            type: "linear",
            minValueHex: "&#xf217",
            minValue: "\\f217",
            maxValueHex: "&#xf27b",
            maxValue: "\\f27b",
            displayValueHex: "&#xf235",
            displayValue: "\\f235",
            lessThanMinValueHex: "&#xf216",
            lessThanMinValue: "\\f216",
            greaterThanMaxValueHex: "&#xf27c",
            greaterThanMaxValue: "\\f27c",
            occupancy: .14822
        },
        RectB: {
            type: "linear",
            minValueHex: "&#xf34c",
            minValue: "\\f34c",
            maxValueHex: "&#xf3b0",
            maxValue: "\\f3b0",
            displayValueHex: "&#xf36a",
            displayValue: "\\f36a",
            lessThanMinValueHex: "&#xf34b",
            lessThanMinValue: "\\f34b",
            greaterThanMaxValueHex: "&#xf3b1",
            greaterThanMaxValue: "\\f3b1",
            occupancy: .18868
        },
        Line: {
            type: "linear",
            minValueHex: "&#xf1b0",
            minValue: "\\f1b0",
            maxValueHex: "&#xf214",
            maxValue: "\\f214",
            displayValueHex: "&#xf1ce",
            displayValue: "\\f1ce",
            lessThanMinValueHex: "&#xf1af",
            lessThanMinValue: "\\f1af",
            greaterThanMaxValueHex: "&#xf215",
            greaterThanMaxValue: "\\f215",
            occupancy: .16692
        },
        LineB: {
            type: "linear",
            minValueHex: "&#xf3b3",
            minValue: "\\f3b3",
            maxValueHex: "&#xf417",
            maxValue: "\\f417",
            displayValueHex: "&#xf3d1",
            displayValue: "\\f3d1",
            lessThanMinValueHex: "&#xf3b2",
            lessThanMinValue: "\\f3b2",
            greaterThanMaxValueHex: "&#xf418",
            greaterThanMaxValue: "\\f418",
            occupancy: .19528
        },
        CircleF: {
            type: "radial",
            minValueHex: "&#xf149",
            minValue: "\\f149",
            maxValueHex: "&#xf1ad",
            maxValue: "\\f1ad",
            displayValueHex: "&#xf167",
            displayValue: "\\f167",
            lessThanMinValueHex: "&#xf148",
            lessThanMinValue: "\\f148",
            greaterThanMaxValueHex: "&#xf1ae",
            greaterThanMaxValue: "\\f1ae",
            occupancy: .5
        },
        CircleB: {
            type: "radial",
            minValueHex: "&#xf2e5",
            minValue: "\\f2e5",
            maxValueHex: "&#xf349",
            maxValue: "\\f349",
            displayValueHex: "&#xf303",
            displayValue: "\\f303",
            lessThanMinValueHex: "&#xf2e4",
            lessThanMinValue: "\\f2e4",
            greaterThanMaxValueHex: "&#xf34a",
            greaterThanMaxValue: "\\f34a",
            occupancy: .55666
        },
        CircleH: {
            type: "radial",
            minValueHex: "&#xf27e",
            minValue: "\\f27e",
            maxValueHex: "&#xf2e2",
            maxValue: "\\f2e2",
            displayValueHex: "&#xf29c",
            displayValue: "\\f29c",
            lessThanMinValueHex: "&#xf27d",
            lessThanMinValue: "\\f27d",
            greaterThanMaxValueHex: "&#xf2e3",
            greaterThanMaxValue: "\\f2e3",
            occupancy: .55666
        }
    }, n.ProgressBarFontSize = 104, n.ProgressBarCellOffset = {
        x: 4,
        y: 4
    }, n.CFSelectors = {
        columnSelector: ".{0} > tbody:not([groupstring]):not([id^=aggr]) > tr > td:nth-child({1})",
        columnAllDescSelector: ".{0} > tbody:not([groupstring]):not([id^=aggr]) > tr > td:nth-child({1}) > :not(.ms-core-menu-box)",
        freezePaneColumnSelector: '.{0} > tbody[data-splst-wrap="true"] > tbody:not([groupstring]):not([id^=aggr]) > tr > td:nth-child({1})',
        freezePaneColumnAllDescSelector: '.{0} > tbody[data-splst-wrap="true"] > tbody:not([groupstring]):not([id^=aggr]) > tr > td:nth-child({1}) > :not(.ms-core-menu-box)',
        pbSelector: ".{0} > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child({1}) > td:nth-child({2}):before",
        freezePanePBSelector: '.{0} > tbody[data-splst-wrap="true"] > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child({1}) > td:nth-child({2}):before',
        row: ".{0} > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child({1}) > td",
        rowDataCells: ".{0} > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child({1}) > td:not(.ms-list-itemLink-td):not(.ms-vb-itmcbx)",
        rowAllDesc: ".{0} > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child({1}) > td > :not(.ms-core-menu-box)",
        rowDataCellsAllDesc: ".{0} > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child({1}) > td:not(.ms-list-itemLink-td):not(.ms-vb-itmcbx) > :not(.ms-core-menu-box)",
        cell: ".{0} > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child({1}) > td:nth-child({2})",
        indicator: ".{0} > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child({1}) > td:nth-child({2}):after",
        cellAllDesc: ".{0} > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child({1}) > td:nth-child({2}) > :not(.ms-core-menu-box)",
        freezePaneRow: '.{0} > tbody[data-splst-wrap="true"] > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child({1}) > td:nth-child(n)',
        freezePaneRowDataCells: '.{0} > tbody[data-splst-wrap="true"] > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child({1}) > td:nth-child(n):not(.ms-list-itemLink-td):not(.ms-vb-itmcbx)',
        freezePaneRowAllDesc: '.{0} > tbody[data-splst-wrap="true"] > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child({1}) > td:nth-child(n) > :not(.ms-core-menu-box)',
        freezePaneRowDataCellsAllDesc: '.{0} > tbody[data-splst-wrap="true"] > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child({1}) > td:nth-child(n):not(.ms-list-itemLink-td):not(.ms-vb-itmcbx) > :not(.ms-core-menu-box)',
        freezePaneCell: '.{0} > tbody[data-splst-wrap="true"] > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child({1}) > td:nth-child({2})',
        freezePaneIndicator: '.{0} > tbody[data-splst-wrap="true"] > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child({1}) > td:nth-child({2}):after',
        freezePaneCellAllDesc: '.{0} > tbody[data-splst-wrap="true"] > tbody:not([groupstring]):not([id^=aggr]) > tr:nth-child({1}) > td:nth-child({2}) > :not(.ms-core-menu-box)'
    }, n.ConditionalFormattingTemplates = {
        emptyRulesListHTML: function() {
            return '<div class="splst-cond-formatting-rules-empty ms-core-defaultFont">' + SPLST.ListTableLayoutEditor.locale.messages.conditionalFormatting.rulesEmptyList + "<\/div>"
        },
        ruleHTML: function() {
            var n = SPLST.ListTableLayoutEditor.locale.styles;
            return '<div class="splst-cond-formatting-ruleContainer"><div class="splst-cond-formatting-rule-item"><div class="splst-cond-formatting-order" style="' + n.cfRulesOrder.style + '"><div class="splst-cond-formatting-updown"><div class="splst-cond-formatting-updown-btn splst-cond-formatting-up-btn" data-splst-order-dir="up"><\/div><div class="splst-cond-formatting-updown-btn splst-cond-formatting-down-btn" data-splst-order-dir="down"><\/div><\/div><\/div><div class="splst-cond-formatting-rule" style="' + n.cfRuleType.style + '"><select class="splst-cond-formatting-rule-input splst-cond-formatting-rule-select" style="' + n.cfRuleTypeSelect.style + '" data-splst-rule-select="true">{0}{1}<\/select><div class="splst-cond-formatting-rule-option padding-top"><label><input type="checkbox" data-splst-stop-if-true="true" />' + SPLST.ListTableLayoutEditor.locale.messages.conditionalFormatting.stopIfTrue + '<\/label><\/div><div class="splst-cond-formatting-rule-option padding-top"><label><input type="checkbox" data-splst-hide-text="true" />' + SPLST.ListTableLayoutEditor.locale.messages.conditionalFormatting.hideText + '<\/label><\/div><\/div><div class="splst-cond-formatting-formula" style="' + n.cfFormula.style + '">{2}<\/div><div class="splst-cond-formatting-format" style="' + n.cfRuleFormat.style + '">{3}<\/div><div class="splst-cond-formatting-rule-action" style="' + n.cfRuleAction.style + '"><span class="splst-cond-formatting-rule-delete ms-core-defaultFont">x<\/span><\/div><\/div><\/div>'
        },
        formulaHTML: function() {
            var i = SPLST.ListTableLayoutEditor,
                t = i.locale.messages.conditionalFormatting,
                n = [];
            return n.push('<div class="splst-cond-formatting-formula-part splst-cf-formula-date-input"><input type="text" style="width: 162px;" data-splst-cond-formula-arg="first" class="splst-cond-formatting-rule-input"/><span class="splst-cf-error-txt splst-cf-error" data-splst-cf-arg-error="first" style="display: none;">*<\/span><\/div><div style="display: none;" class="splst-cond-formatting-formula-part"><select style="width: 162px;" data-splst-cond-formula-arg="date-select" class="splst-cond-formatting-rule-input splst-cond-formatting-rule-select">'), jQuerySplst.each(t.dateFormulas, function(t, i) {
                n.push('<option value="' + t + '">' + i + "<\/option>")
            }), n.push('<\/select><\/div><div style="display: none;" class="splst-cond-formatting-formula-part splitter">'), n.push(t.and), n.push('<\/div><div style="display: none;" class="splst-cond-formatting-formula-part splst-cf-formula-input"><input type="text" style="width: 54px;" data-splst-cond-formula-arg="second" class="splst-cond-formatting-rule-input"/><span class="splst-cf-error-txt splst-cf-error" data-splst-cf-arg-error="second" style="display: none;">*<\/span><div class="splst-lb-cf-date-picker-btn"><div class="splst-lb-cf-date-picker-btn-content"><img border="0" src="/_layouts/15/images/calendar_25.gif"><\/div><\/div><\/div>'), n.push('<div class="splst-cond-formatting-formula-part padding-top"><label><input type="checkbox" data-splst-cond-formula-arg="ignore-case" />'), n.push(t.ignoreCase), n.push("<\/label><\/div>"), n.push('<div style="display: none;" class="splst-cf-error-container"><span class="splst-cf-error-txt"><\/span><\/div>'), n.join("")
        },
        simpleFormatHTML: function() {
            var n = _spPageContextInfo.siteServerRelativeUrl,
                t = SPLST.ListTableLayoutEditor.contentPath,
                i = SPLST.ListTableLayoutEditor.locale.messages;
            return n.indexOf("/") == n.length - 1 && (n = n.slice(0, -1)), '<table><tr><td class="format-cell top">' + i.backgroundSettings + '<\/td><td class="format-cell top"><div class="splst-layout-editor-colorpicker-btn"><div class="splst-layout-editor-colorpicker-color"><input type="text" data-backcolor="true" /><\/div><\/div><\/td><td class="format-cell top">' + i.textAlign + '<\/td><td class="format-cell top last"><div data-text-align="true" class="splst-layout-editor-font-properties-icons-container"><div data-align="left" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-align-icon-container"><img src="' + n + t + 'font-properties.png" class="splst-layout-editor-font-properties-img splst-layout-editor-left-align-img"/><\/div><div data-align="center" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-align-icon-container"><img src="' + n + t + 'font-properties.png" class="splst-layout-editor-font-properties-img splst-layout-editor-center-align-img"/><\/div><div data-align="right" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-align-icon-container"><img src="' + n + t + 'font-properties.png" class="splst-layout-editor-font-properties-img splst-layout-editor-right-align-img"/><\/div><\/div><div data-text-valign="true" class="splst-layout-editor-font-properties-icons-container margin-top"><div data-align="top" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-align-icon-container"><img src="' + n + t + 'font-properties.png" class="splst-layout-editor-font-properties-img splst-layout-editor-top-align-img"/><\/div><div data-align="middle" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-align-icon-container"><img src="' + n + t + 'font-properties.png" class="splst-layout-editor-font-properties-img splst-layout-editor-middle-align-img"/><\/div><div data-align="bottom" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-align-icon-container"><img src="' + n + t + 'font-properties.png" class="splst-layout-editor-font-properties-img splst-layout-editor-bottom-align-img"/><\/div><\/div><\/td><\/tr><tr><td class="format-cell top">' + i.fontColorSettings + '<\/td><td class="format-cell top"><div class="splst-layout-editor-colorpicker-btn"><div class="splst-layout-editor-colorpicker-color"><input type="text" data-fontcolor="true" /><\/div><\/div><\/td><td class="format-cell top">' + i.fontStyle + '<\/td><td class="format-cell top last font-props"><div class="splst-layout-editor-font-properties-icons-container"><div data-font-style="' + SPLST.ListTableLayoutEditor.FONT_STYLE.BOLD + '" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-style-icon-container"><img src="' + n + t + 'font-properties.png" class="splst-layout-editor-font-properties-img splst-layout-editor-bold-img"/><\/div><div data-font-style="' + SPLST.ListTableLayoutEditor.FONT_STYLE.ITALIC + '" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-style-icon-container"><img src="' + n + t + 'font-properties.png" class="splst-layout-editor-font-properties-img splst-layout-editor-italic-img"/><\/div><div data-font-style="' + SPLST.ListTableLayoutEditor.FONT_STYLE.UNDERLINE + '" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-style-icon-container"><img src="' + n + t + 'font-properties.png" class="splst-layout-editor-font-properties-img splst-layout-editor-underline-img"/><\/div><div data-font-style="' + SPLST.ListTableLayoutEditor.FONT_STYLE.STRIKETHROUGH + '" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-style-icon-container"><img src="' + n + t + 'font-properties.png" class="splst-layout-editor-font-properties-img splst-layout-editor-strikethrough-img"/><\/div><\/div><\/td><\/tr><tr><\/tr><td colspan="4"><div class="format-cell-delimiter"><\/div><\/td><tr><\/tr><tr><td class="format-cell" colspan="4"><table class="splst-booster-cf-ind-table" cellpadding="0" cellspacing="0"><tr><td class="format-cell">' + i.conditionalFormatting.indicator + '<\/td><td class="format-cell"><div class="splst-booster-cf-ind"><div class="splst-booster-cf-ind-inner"><\/div><\/div><\/td><td class="format-cell">' + i.conditionalFormatting.color + '<\/td><td class="format-cell"><div class="splst-layout-editor-colorpicker-btn"><div class="splst-layout-editor-colorpicker-color"><input type="text" data-indicatorcolor="true" /><\/div><\/div><\/td><td class="format-cell">' + i.conditionalFormatting.align + '<\/td><td class="format-cell font-properties last"><div data-indicator-align="true" class="splst-layout-editor-font-properties-icons-container"><div data-align="left" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-align-icon-container pressed"><img src="' + n + t + 'font-properties.png" class="splst-layout-editor-font-properties-img splst-layout-editor-left-align-img"/><\/div><div data-align="center" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-align-icon-container"><img src="' + n + t + 'font-properties.png" class="splst-layout-editor-font-properties-img splst-layout-editor-center-align-img"/><\/div><div data-align="right" class="splst-layout-editor-font-properties-icon-container splst-layout-editor-align-icon-container"><img src="' + n + t + 'font-properties.png" class="splst-layout-editor-font-properties-img splst-layout-editor-right-align-img"/><\/div><\/div><\/td><\/tr><\/table><\/td><\/tr><\/table>'
        },
        generateRulesSelectOptions: function() {
            var t = SPLST.ListTableLayoutEditor.locale.messages.conditionalFormatting,
                r = t.rulesDelimiter,
                u = t.rules,
                n = [],
                i = !0;
            return jQuerySplst.each(u, function(t, u) {
                i ? i = !1 : n.push('<option disabled="disabled">' + r + "<\/option>");
                jQuerySplst.each(u, function(i, r) {
                    n.push('<option value="' + t + "|" + i + '">' + r + "<\/option>")
                })
            }), n.join("")
        },
        generateTypeBasedRulesSelectOptions: function(n) {
            var r = SPLST.ListTableLayoutEditor.locale.messages.conditionalFormatting,
                f = r.rulesDelimiter,
                t = null,
                i = [],
                u = "";
            switch (n) {
                case "User":
                case "UserMulti":
                    t = r.typeBasedRules.user;
                    u = "user"
            }
            return t ? (i.push('<option disabled="disabled">' + f + "<\/option>"), jQuerySplst.each(t, function(n, t) {
                i.push('<option value="' + u + "|" + n + '" data-type-based="true">' + t + "<\/option>")
            }), i.join("")) : ""
        },
        datePickerFrameHTML: function() {
            return '<iframe style="display:none; position:absolute; width:200px; z-index:9999;" src="/_layouts/15/images/blank.gif" class="owl-date-picker"><\/iframe>'
        },
        progressBarHTML: function() {
            var i = SPLST.ListTableLayoutEditor,
                t = i.locale.messages.conditionalFormatting.pb,
                n = [];
            return n.push('<div class="splst-lb-cf-progress-bar" data-lb-cftype="true" style="display: none;">'), n.push('<div class="splst-lb-cf-pb-style splst-lb-cf-pb-section">'), n.push('<div class="splst-lb-cf-pb-header">'), n.push('<div class="splst-lb-float-left">'), n.push('<span class="splst-lb-section-header">' + t.selectPBType + "<\/span>"), n.push("<\/div>"), n.push('<div class="splst-lb-cf-pb-type splst-lb-float-right">'), n.push('<label><input type="radio" name="pbtype" value="linear" id="splst-lb-cf-type-rules" />' + t.linear + "<\/label>"), n.push('<label><input type="radio" name="pbtype" value="radial" id="splst-lb-cf-type-progress-bar" />' + t.radial + "<\/label>"), n.push("<\/div>"), n.push('<div class="splst-lb-float-clear"><\/div>'), n.push("<\/div>"), n.push(this.generateProgressBarIndicatorsMarkup("linear")), n.push(this.generateProgressBarIndicatorsMarkup("radial")), n.push("<\/div>"), n.push('<div class="splst-lb-cf-pb-color splst-lb-cf-pb-section no-margin">'), n.push('<div class="splst-lb-cf-pb-header">'), n.push('<span class="splst-lb-section-header">' + t.setupColor + "<\/span>"), n.push("<\/div>"), n.push("<\/div>"), n.push('<div class="splst-lb-cf-pb-range splst-lb-cf-pb-section">'), n.push('<div class="splst-lb-cf-pb-header">'), n.push('<span class="splst-lb-section-header">' + t.setupRange + "<\/span>"), n.push("<\/div>"), n.push('<div class="splst-lb-cf-pb-value-lbl splst-lb-float-left">'), n.push("<span>" + t.startValue + "<\/span>"), n.push("<\/div>"), n.push('<div class="splst-lb-cf-pb-value splst-lb-float-left">'), n.push('<input type="text" style="width: 100px;" class="splst-cond-formatting-rule-input" data-splst-cf-pb-arg="start" id="splstPBStart"/><span class="splst-cf-error-txt splst-cf-error" style="display: none;">*<\/span>'), n.push('<div data-input-id="splstPBStart" class="splst-lb-cf-date-picker-btn"><div class="splst-lb-cf-date-picker-btn-content"><img border="0" src="/_layouts/15/images/calendar_25.gif" id="splstPBStartDatePickerImage"><\/div><\/div>'), n.push("<\/div>"), n.push('<div class="splst-lb-cf-pb-value splst-lb-float-right">'), n.push('<input type="text" style="width: 100px;" class="splst-cond-formatting-rule-input" data-splst-cf-pb-arg="end" id="splstPBEnd"/><span class="splst-cf-error-txt splst-cf-error" style="display: none;">*<\/span>'), n.push('<div data-input-id="splstPBEnd" class="splst-lb-cf-date-picker-btn"><div class="splst-lb-cf-date-picker-btn-content"><img border="0" src="/_layouts/15/images/calendar_25.gif" id="splstPBEndDatePickerImage"><\/div><\/div>'), n.push("<\/div>"), n.push('<div class="splst-lb-cf-pb-value-lbl splst-lb-float-right">'), n.push("<span>" + t.goalValue + "<\/span>"), n.push("<\/div>"), n.push('<div class="splst-lb-float-clear"><\/div>'), n.push('<div style="display: none;" class="splst-cf-error-container"><span class="splst-cf-error-txt"><\/span><\/div>'), n.push("<\/div>"), n.push("<\/div>"), n.join("")
        },
        generateProgressBarIndicatorsMarkup: function(n) {
            var r = SPLST.ListTableLayoutEditor,
                u = r.ConditionalFormattingProgressBars,
                o = r.isIE(),
                t = [],
                c = n === "linear" ? 56 : 131,
                s = 1,
                f = r.locale.styles,
                i, e, h;
            t.push('<div class="splst-lb-pb-type" data-pb-type="' + n + '">');
            for (i in u) u.hasOwnProperty(i) && (e = u[i], e.type === n) && (s % 3 ? t.push('<div class="splst-lb-float-left splst-lb-cf-pb-type-item splst-lb-no-select' + (o ? " ie" : "") + '" data-pb-type="' + n + '" data-symbol-type="' + i + '" style="' + f.pbTypeItemContainer.style + '">') : t.push('<div class="splst-lb-float-left splst-lb-cf-pb-type-item last splst-lb-no-select' + (o ? " ie" : "") + '" data-pb-type="' + n + '" data-symbol-type="' + i + '" style="' + f.pbTypeItemContainerLast.style + '">'), h = Math.round((156 - c) / 2), t.push('<div style="top: -' + h + "px; " + f.pbTypeItem.style + '">' + e.displayValueHex + "<\/div>"), t.push("<\/div>"), s++);
            return t.push('<div class="splst-lb-float-clear"><\/div>'), t.push("<\/div>"), t.join("")
        },
        noneHTML: function() {
            var t = SPLST.ListTableLayoutEditor,
                i = t.locale.messages.conditionalFormatting,
                n = [];
            return n.push('<div class="splst-lb-cf-none" data-lb-cftype="true" style="display: none;">'), n.push('<div class="splst-lb-cf-none-content">'), n.push('<div class="splst-lb-cfempty-text">' + i.noneDescription + "<\/div>"), n.push("<\/div>"), n.push("<\/div>"), n.join("")
        }
    }, n.ConditionalFormattingControl = function(n) {
        n = n || {};
        return {}
    }, n.ConditionalFormattingControl.getColumnSettingsHTML = function(n, t) {
        var u = SPLST.ListTableLayoutEditor,
            o = u.Helper,
            r = u.locale.messages.conditionalFormatting,
            f = u.locale.styles,
            i = [],
            e = ["Integer", "Currency", "Number", "DateTime"].indexOf(t.type) !== -1;
        i.push('<div class="splst-lb-cf">');
        i.push('<div class="splst-lb-switch splst-lb-border-bottom">');
        i.push('<label><input type="radio" name="cftype" value="none" id="splst-lb-cf-type-none" data-lb-pnl=".splst-lb-cf-none" />' + r.none + "<\/label>");
        i.push('<label><input type="radio" name="cftype" value="rules" id="splst-lb-cf-type-rules" data-lb-pnl=".splst-cond-formatting-rules" />' + r.applyRules + "<\/label>");
        e && i.push('<label><input type="radio" name="cftype" value="pb" id="splst-lb-cf-type-progress-bar" data-lb-pnl=".splst-lb-cf-progress-bar" />' + r.showProgressBar + "<\/label>");
        i.push("<\/div>");
        i.push(u.ConditionalFormattingTemplates.noneHTML(n[0].imgBaseUrl));
        e && i.push(u.ConditionalFormattingTemplates.progressBarHTML());
        i.push('<div class="splst-cond-formatting-rules splst-cond-formatting-rules-table splst-cond-formatting-rules-fullWidth" data-lb-cftype="true">');
        i.push('<div class="splst-cond-formatting-rules-tableRow splst-cond-formatting-rules-fullHeight">');
        i.push('<div class="splst-cond-formatting-rules-container" style="' + f.rulesContainer.style + '">');
        i.push('<div class="splst-cond-formatting-rules-list" style="' + f.rulesContainer.style + '"><\/div>');
        i.push("<\/div>");
        i.push("<\/div>");
        i.push('<div class="splst-cond-formatting-rules-tableRow">');
        i.push('<div class="splst-cond-formatting-rules-addNew">');
        i.push('<a class="ms-heroCommandLink splst-cond-formatting-rules-addNewLink" href="javascript:;">' + r.addRule + "<\/a>");
        i.push("<\/div>");
        i.push('<div class="splst-cond-formatting-rules-removeAll">');
        i.push('<a class="ms-heroCommandLink splst-cond-formatting-rules-removeAllLink" href="javascript:;">' + r.removeRules + "<\/a>");
        i.push("<\/div>");
        i.push("<\/div>");
        i.push('<div class="splst-cond-formatting-rules-tableRow">');
        i.push('<div class="splst-cond-formatting-rules-style-row" style="display: ' + (n[0].getIsQueryEnabled() ? "block" : "none") + ';">');
        i.push('<label class="disabled"><input type="checkbox" disabled="disabled" id="splst-process-all-pages-cbx" />' + r.processAllPages + "<\/label>");
        i.push("<\/div>");
        i.push('<div class="splst-cond-formatting-rules-style-row">');
        i.push('<label><input type="checkbox" id="splst-layout-editor-style-row-cbx" />' + r.styleRow + '<\/label><span class="splst-lb-info" title="' + r.styleRowInfo + '">&#xf143;<\/span>');
        i.push("<\/div>");
        i.push("<\/div>");
        i.push("<\/div>");
        i.push("<\/div>");
        n.one({
            "layouteditorplugin:columnSettingsDialogOpened": u.ConditionalFormattingControl.onColumnSettingsDialogOpened
        });
        return i.join("")
    }, n.ConditionalFormattingControl.onColumnSettingsDialogOpened = function(n, t) {
        var r = n.currentTarget,
            e = SPLST.ListTableLayoutEditor,
            v = t.isDisabled,
            y = r.sessionSettings.areLocalChanges,
            p = r.getIsQueryEnabled(),
            l = r.listFields[t.colName].type,
            it = ["Integer", "Currency", "Number", "DateTime"].indexOf(l) !== -1,
            i = jQuerySplst(".splst-lb-cf"),
            f = e.ConditionalFormattingTypes,
            u = t.columnStyle,
            o = u.cfType;
        i.data("disabled", v);
        i.data("are-local-changes", y);
        i.data("is-query-enabled", p);
        i.data("field-type", l);
        i.data("field-is-percent", !!r.listFields[t.colName].isPercent);
        i.data("has-manage-perms", r.sessionSettings.hasManageListsPermissions);
        var w = i.find(".splst-cond-formatting-rules"),
            b = i.find(".splst-lb-cf-progress-bar"),
            k = i.find(".splst-lb-cf-none"),
            s = i.find(".splst-lb-switch"),
            d = i.find("input[type=radio][name=cftype]"),
            g = s.find("#splst-lb-cf-type-rules"),
            nt = s.find("#splst-lb-cf-type-progress-bar"),
            tt = s.find("#splst-lb-cf-type-none"),
            h = tt,
            c = k,
            a = i.find("[data-lb-cftype]");
        if (a.hide(), o || (o = u.rules ? f.rules : f.none), u) switch (o) {
            case f.pb:
                u.pb && (h = nt, c = b);
                break;
            case f.rules:
                u.rules && (h = g, c = w)
        }
        c.show();
        h[0].checked = !0;
        d.click(function(n) {
            var t = n.currentTarget,
                r = t.getAttribute("data-lb-pnl");
            a.hide();
            i.find(r).show();
            SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange()
        });
        e.ConditionalFormattingControl.initProgressBarMarkup(r, t);
        e.ConditionalFormattingControl.initRulesMarkup(r, t)
    }, n.ConditionalFormattingControl.initRulesMarkup = function(n, t) {
        var e = SPLST.ListTableLayoutEditor,
            i = e.ConditionalFormattingControl,
            w = e.Helper,
            b = t.isDisabled,
            l = n.listFields[t.colName].type,
            o = n.sessionSettings.areLocalChanges,
            a = n.sessionSettings.hasManageListsPermissions,
            k = n.getIsQueryEnabled(),
            r = jQuerySplst(".splst-cond-formatting-rules"),
            v = jQuerySplst(".splst-cond-formatting-rules-list"),
            y = jQuerySplst(".splst-cond-formatting-rules-addNewLink"),
            p = jQuerySplst(".splst-cond-formatting-rules-removeAllLink"),
            u = jQuerySplst("#splst-layout-editor-style-row-cbx"),
            f = jQuerySplst("#splst-process-all-pages-cbx"),
            c, s, h;
        r.addClass(o ? "local" : "global");
        a || r.addClass("disabled");
        t.columnStyle && t.columnStyle.rules && t.columnStyle.rules.length !== 0 ? i._renderRules(t.columnStyle.rules, l) : (c = jQuerySplst(e.ConditionalFormattingTemplates.emptyRulesListHTML()), v.append(c));
        s = i.getFlagIsGlobal(n, t.colName, "styleRowByRules");
        r.data("style-row-is-global", s);
        h = i.getFlagIsGlobal(n, t.colName, "processAllPages");
        r.data("process-all-is-global", h);
        u[0].checked = !!t.columnStyle.styleRowByRules;
        f[0].checked = !!t.columnStyle.processAllPages;
        o && s ? (u.attr("disabled", "disabled"), u.parent().addClass("disabled", "disabled")) : u.click(function() {
            i.onChange()
        });
        o && h ? (f.attr("disabled", "disabled"), f.parent().addClass("disabled")) : f.click(function() {
            i.onChange()
        });
        y.click(i.onAddRuleLinkClick);
        p.click(i.onRemoveAllLinkClick)
    }, n.ConditionalFormattingControl.initProgressBarMarkup = function(n, t) {
        var u = SPLST.ListTableLayoutEditor,
            r = jQuerySplst(".splst-lb-cf-progress-bar"),
            k, y, p, o;
        if (r && r.length) {
            var s = r.find(".splst-lb-cf-pb-type-item"),
                h = r.find(".splst-lb-pb-type"),
                f = r.find("#splstPBStart"),
                e = r.find("#splstPBEnd"),
                d = u.isIE(),
                w = n.listFields[t.colName],
                c = w.type,
                b = !!w.isPercent,
                i = t.columnStyle && t.columnStyle.pb,
                a = u.Helper.rgb2hex(u.Helper.div_ms_vb2_color),
                l = "linear",
                v = "";
            i ? (i.value && (l = u.ConditionalFormattingProgressBars[i.value].type || l, v = i.value), i.colors && i.colors.length && (a = i.colors[0].color), i.start && (c === "DateTime" ? f.val(moment(i.start).format(u.webDateFormat)) : b && t.columnStyle.version ? f.val((parseFloat(i.start) * 100).toFixed()) : f.val(i.start)), i.end && (c === "DateTime" ? e.val(moment(i.end).format(u.webDateFormat)) : b && t.columnStyle.version ? e.val((parseFloat(i.end) * 100).toFixed()) : e.val(i.end))) : (f.attr("disabled", "disabled"), e.attr("disabled", "disabled"));
            s.on("click", function(n) {
                var t = jQuerySplst(n.currentTarget),
                    i = t.hasClass("selected");
                i ? (t.removeClass("selected"), f.attr("disabled", "disabled"), e.attr("disabled", "disabled"), o.setEnabled(!1)) : (s.removeClass("selected"), t.addClass("selected"), f.removeAttr("disabled"), e.removeAttr("disabled"), o.setEnabled(!0));
                SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange(!0)
            });
            k = r.find("[data-pb-color]");
            k.colorpicker({
                transparentColor: !1,
                color: a,
                history: !1,
                defaultColor: a
            }).on("change.color", function(n, t) {
                s.css("color", t);
                SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange(!0)
            });
            r.find(".splst-cond-formatting-rule-input").on("change keydown paste input", function(n) {
                var t = jQuerySplst(n.currentTarget),
                    i = t.data("text-changed");
                if (!i) {
                    t.attr("data-text-changed", !0);
                    SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange(!0)
                }
            }).on("blur", function(n) {
                var t = jQuerySplst(n.currentTarget);
                c !== "DateTime" && u.ConditionalFormattingControl._checkIfArgHasError(t, ".splst-lb-cf-progress-bar", t.attr("data-splst-cf-pb-arg"))
            });
            y = r.find(".splst-lb-cf-date-picker-btn");
            c === "DateTime" ? (r.find(".splst-lb-cf-pb-value.splst-lb-float-right").css("margin-right", "24px"), y.each(function(n, t) {
                var u = jQuerySplst(t),
                    r, i;
                u.click(SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onShowDatePickerClick);
                r = t.getAttribute("data-input-id");
                i = jQuerySplst(SPLST.ListTableLayoutEditor.ConditionalFormattingTemplates.datePickerFrameHTML());
                i.attr("id", r + "DatePickerFrame");
                jQuerySplst("body").append(i)
            })) : y.hide();
            p = r.find("input[type=radio][name=pbtype]");
            p.click(function(n) {
                h.hide();
                h.filter("[data-pb-type=" + n.currentTarget.value + "]").show()
            });
            v && s.filter("[data-symbol-type=" + v + "]").addClass("selected");
            h.hide();
            h.filter("[data-pb-type=" + l + "]").show();
            p.filter("[value=" + l + "]")[0].checked = !0;
            o = new SPLST.ColorScale({
                parent: ".splst-lb-cf-pb-color",
                defaultColor: "#444",
                messages: u.locale.messages.conditionalFormatting.pb.colorScale,
                styles: u.locale.styles,
                colors: i && i.colors,
                imgBaseUrl: n.imgBaseUrl + u.contentPath,
                enabled: !!i
            });
            o.on({
                change: function() {
                    SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange(!0)
                }
            });
            o.render();
            r.data("color-scale", o)
        }
    }, n.ConditionalFormattingControl.onOrderBtnClick = function(n) {
        var h = jQuerySplst(".splst-cond-formatting-ruleContainer:nth-child(1) .splst-cond-formatting-up-btn"),
            c = jQuerySplst(".splst-cond-formatting-ruleContainer:nth-last-child(1) .splst-cond-formatting-down-btn"),
            f;
        if (n.currentTarget !== h[0] && n.currentTarget !== c[0]) {
            var l = jQuerySplst(".splst-cond-formatting-rules-list"),
                a = jQuerySplst(".splst-lb-cf"),
                e = jQuerySplst(n.currentTarget),
                u = e.data("splst-order-dir"),
                i = e.closest(".splst-cond-formatting-ruleContainer"),
                r = SPLST.ListTableLayoutEditor.ConditionalFormattingControl,
                o = r.collectRuleData(i) || {},
                v = i.hasClass("local"),
                y = u === "up" ? "prev" : "next",
                p = u === "up" ? "prevAll" : "nextAll",
                w = u === "up" ? "prepend" : "append",
                b = u === "up" ? "after" : "before",
                t, s;
            t = i[y]();
            r.onChange();
            v && t.hasClass("global") ? (t = i[p](".local").first(), i.remove(), f = r._renderRule(o, a.data("field-type")), t.length ? t[b](f) : l[w](f)) : (s = r.collectRuleData(t) || {}, r._refreshRule(i, s), r._refreshRule(t, o))
        }
    }, n.ConditionalFormattingControl.onRemoveAllLinkClick = function() {
        var n = jQuerySplst(".splst-cond-formatting-rules-list"),
            t = n.find(".splst-cond-formatting-rules-empty"),
            i = jQuerySplst(".splst-lb-cf"),
            r = i.data("are-local-changes");
        t.length || (t = jQuerySplst(SPLST.ListTableLayoutEditor.ConditionalFormattingTemplates.emptyRulesListHTML()), n.empty(), n.append(t), SPLST.ListTableLayoutEditor.ConditionalFormattingControl._refreshProcessAllCbx(), SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange())
    }, n.ConditionalFormattingControl.onAddRuleLinkClick = function() {
        var t = jQuerySplst(".splst-cond-formatting-rules-list"),
            i = t.find(".splst-cond-formatting-rules-empty"),
            r = jQuerySplst(".splst-cond-formatting-rules-container"),
            f = jQuerySplst(".splst-lb-cf"),
            u = SPLST.ListTableLayoutEditor.ConditionalFormattingControl._renderRule(null, f.data("field-type")),
            n;
        SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange();
        i.length && i.remove();
        t.append(u);
        n = r.prop("scrollHeight");
        n && (r.scrollTop(n), u.find("[data-splst-rule-select]")[0].focus())
    }, n.ConditionalFormattingControl.onDeleteRuleClick = function(n) {
        var i = jQuerySplst(".splst-cond-formatting-rules-list"),
            e = jQuerySplst(n.currentTarget),
            t = e.closest(".splst-cond-formatting-ruleContainer"),
            r, u, f;
        t && (r = t.find('input[data-splst-cond-formula-arg="second"]'), u = r.attr("id"), jQuerySplst("body").find("iframe[id*=" + u + "]").remove(), t.remove());
        i.children().length || (f = jQuerySplst(SPLST.ListTableLayoutEditor.ConditionalFormattingTemplates.emptyRulesListHTML()), i.append(f));
        SPLST.ListTableLayoutEditor.ConditionalFormattingControl._refreshProcessAllCbx();
        SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange()
    }, n.ConditionalFormattingControl.onRuleChanged = function(n) {
        var i = jQuerySplst(n.currentTarget).closest(".splst-cond-formatting-ruleContainer"),
            t = SPLST.ListTableLayoutEditor.ConditionalFormattingControl;
        t._refreshRule(i);
        t._refreshProcessAllCbx();
        t._refreshErrorTextVisibility(i);
        SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange()
    }, n.ConditionalFormattingControl.onDateSelectChanged = function(n) {
        SPLST.ListTableLayoutEditor.ConditionalFormattingControl._refreshRule(jQuerySplst(n.currentTarget).closest(".splst-cond-formatting-ruleContainer"));
        SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange()
    }, n.ConditionalFormattingControl.onShowDatePickerClick = function(n) {
        var e = SPLST.ListTableLayoutEditor,
            o = jQuerySplst(n.currentTarget),
            i = o.parent().find('input[type="text"]'),
            r, t, u, f;
        if (i.length) {
            window.g_strDatePickerFrameID || $_global_datepicker();
            r = i.attr("id");
            t = jQuerySplst('<div class="splst-booster-cover"><\/div>');
            jQuerySplst("body").append(t);
            t.click(function() {
                t.remove();
                t = null;
                clickDatePicker(null, "", "", null)
            });
            i.one({
                focus: function() {
                    t && (t.remove(), t = null, SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange())
                }
            });
            u = getOffsetTop(i[0], 1);
            f = i.offset().top;
            clickDatePickerExtended(r, e.ConditionalFormattingControl._getDatePickerIFrameUrl(), "", window.event || n, "value", f - u, 0)
        }
    }, n.ConditionalFormattingControl._refreshProcessAllCbx = function() {
        var f = SPLST.ListTableLayoutEditor,
            n = f.ConditionalFormattingRuleTypes,
            i = jQuerySplst(".splst-cond-formatting-rules"),
            r = jQuerySplst(".splst-lb-cf"),
            e = i.data("process-all-is-global"),
            o = r.data("are-local-changes"),
            s = r.data("is-query-enabled"),
            t = i.find("#splst-process-all-pages-cbx"),
            u = t.parent(),
            h = i.find('select option[value="' + n.DigitTop + '"]:selected, select option[value="' + n.DigitBottom + '"]:selected, select option[value="' + n.DigitTopPercent + '"]:selected, select option[value="' + n.DigitBottomPercent + '"]:selected, select option[value="' + n.DigitAboveAverage + '"]:selected, select option[value="' + n.DigitBelowAverage + '"]:selected, select option[value="' + n.DigitEqualAverage + '"]:selected, select option[value="' + n.DigitEqualOrAboveAverage + '"]:selected, select option[value="' + n.DigitEqualOrBelowAverage + '"]:selected'),
            c = h.length;
        e && o || (c && s ? (t.removeAttr("disabled"), u.removeClass("disabled")) : (t.attr("disabled", "disabled"), t[0].checked = !1, u.addClass("disabled")))
    }, n.ConditionalFormattingControl._refreshRule = function(n, t) {
        var it = n.find("[data-splst-rule-select]"),
            gt = n.find("[data-splst-stop-if-true]"),
            ni = n.find("[data-splst-hide-text]"),
            p = n.find('[data-splst-cond-formula-arg="first"]'),
            a = p.parent(),
            w = n.find('[data-splst-cond-formula-arg="date-select"]'),
            o = w.parent(),
            v = n.find(".splitter"),
            k = n.find('[data-splst-cond-formula-arg="second"]'),
            s = k.parent(),
            rt = s.find(".splst-lb-cf-date-picker-btn"),
            ut = n.find('[data-splst-cond-formula-arg="ignore-case"]'),
            y = ut.parent(),
            u = n.find(".splst-cond-formatting-format"),
            ft = n.find(".splst-booster-cf-ind"),
            ti = n.find('[data-indicatorcolor="true"]'),
            et = jQuerySplst(".splst-lb-cf"),
            ii = et.data("field-is-percent"),
            h = SPLST.ListTableLayoutEditor,
            i = h.ConditionalFormattingRuleTypes,
            ri = h.ConditionalFormattingTypeBasedRuleTypes,
            ot = h.ConditionalFormattingDateFormulas,
            d = h.FONT_STYLE,
            ui = h.locale.styles,
            st, c, l, e, f, g, ht, r, nt, tt, ct, lt, at, vt, yt, pt, wt, bt, b, kt, dt;
        n.removeClass("local").removeClass("global");
        t ? (n.addClass(t.isLocal !== !1 ? "local" : "global"), it.val(t.type || i.TextContains), gt[0].checked = !!t.stopIfTrue, ni[0].checked = !!t.hideText, c = t.formula, l = c && c.args, w.val(c && c.dateFormula || ot.Today), e = l && l[0] || "", f = l && l[1] || "", t.type && (t.type.startsWith("date|") ? (g = l && l[1], g && (ht = new Date(g), f = moment(ht).format(h.webDateFormat))) : t.type.startsWith("logicalDigit") ? (ii && (e = e && (parseFloat(e) * 100).toFixed(), f = f && (parseFloat(f) * 100).toFixed()), e = this._formatDigit(e), f = this._formatDigit(f)) : t.type.startsWith("topBottomDigit") && (e = this._formatDigit(e), f = this._formatDigit(f))), p.val(e), k.val(f), ut[0].checked = c && c.ignoreCase || !1, r = t.style, nt = u.find('[data-backcolor="true"]'), r && r["background-color"] ? nt.colorpicker("val", r["background-color"]) : nt.colorpicker("val", "#0000ffff"), tt = u.find('[data-fontcolor="true"]'), r && r.color ? tt.colorpicker("val", r.color) : tt.colorpicker("val", "#0000ffff"), u.find("div[data-text-align] div[data-align]").removeClass("pressed"), r && r["text-align"] && (ct = r["text-align"], lt = u.find('div[data-text-align] div[data-align="' + ct + '"]'), lt.addClass("pressed")), u.find("div[data-text-valign] div[data-align]").removeClass("pressed"), r && r["vertical-align"] && (at = r["vertical-align"], vt = u.find('div[data-text-valign] div[data-align="' + at + '"]'), vt.addClass("pressed")), u.find("div[data-font-style]").removeClass("pressed"), r ? ((r["font-weight"] === "bold" || r["font-weight"] === "700") && (yt = u.find('[data-font-style="' + d.BOLD + '"]'), yt.addClass("pressed")), r["font-style"] === "italic" && (pt = u.find('[data-font-style="' + d.ITALIC + '"]'), pt.addClass("pressed")), r["text-decoration"] === "underline" && (wt = u.find('[data-font-style="' + d.UNDERLINE + '"]'), wt.addClass("pressed")), r["text-decoration"] === "line-through" && (bt = u.find('[data-font-style="' + d.STRIKETHROUGH + '"]'), bt.addClass("pressed")), r.indicator ? (b = r.indicator, ft.attr("data-indicator", b.value), ft.find("div").html(h.ConditionalFormattingIndicators[b.value].valueHex), ti.colorpicker("val", b.color), u.find("div[data-indicator-align] div[data-align]").removeClass("pressed"), kt = b.align || "left", u.find('div[data-indicator-align] div[data-align="' + kt + '"]').addClass("pressed")) : this._clearIndicatorStyles(u)) : this._clearIndicatorStyles(u), this._refreshErrorTextVisibility(n.closest(".splst-cond-formatting-ruleContainer"))) : (dt = et.data("are-local-changes"), n.addClass(dt ? "local" : "global"));
        st = it.val();
        switch (st) {
            case i.TextIsEmpty:
            case i.TextIsNotEmpty:
            case i.DigitEqualAverage:
            case i.DigitAboveAverage:
            case i.DigitBelowAverage:
            case i.DigitEqualOrAboveAverage:
            case i.DigitEqualOrBelowAverage:
                a.hide();
                o.hide();
                v.hide();
                s.hide();
                y.hide();
                break;
            case i.TextContains:
            case i.TextNotContains:
            case i.TextEqual:
            case i.TextStartsWith:
            case i.TextEndsWith:
                p.css("width", "172px");
                a.css("display", "inline-block");
                o.hide();
                v.hide();
                s.hide();
                y.css("display", "inline-block");
                break;
            case i.DigitGreater:
            case i.DigitGreaterEqual:
            case i.DigitLess:
            case i.DigitLessEqual:
            case i.DigitEqual:
            case i.DigitNotEqual:
            case i.DigitTop:
            case i.DigitBottom:
            case i.DigitTopPercent:
            case i.DigitBottomPercent:
                p.css("width", "172px");
                a.css("display", "inline-block");
                o.hide();
                v.hide();
                s.hide();
                y.hide();
                break;
            case i.DigitIsBetween:
            case i.DigitIsNotBetween:
                p.css("width", "59px");
                a.css("display", "inline-block");
                o.hide();
                v.css("display", "inline-block");
                k.css("width", "59px");
                s.css("display", "inline-block");
                rt.hide();
                y.hide();
                break;
            case i.DateIs:
            case i.DateIsBefore:
            case i.DateIsAfter:
                a.hide();
                o.css("display", "inline-block");
                v.hide();
                w.val() !== ot.ExactDate ? (w.css("width", "177px"), s.hide(), o.css("margin-right", "0")) : (w.css("width", ui.cfExactDateSelect.width), o.css("margin-right", "10px"), s.css("display", "inline-block"), rt.css("display", "inline-block"), k.css("width", "70px"));
                y.hide();
                break;
            case ri.UserCurrent:
                a.hide();
                o.hide();
                v.hide();
                s.hide();
                y.hide()
        }
    }, n.ConditionalFormattingControl._clearIndicatorStyles = function(n) {
        n.find(".splst-booster-cf-ind").find("div").html("&nbsp;");
        n.find('[data-indicatorcolor="true"]').colorpicker("val", SPLST.ListTableLayoutEditor.Helper.div_ms_vb2_color);
        n.find("div[data-indicator-align] div[data-align]").removeClass("pressed");
        n.find('div[data-indicator-align] div[data-align="left"]').addClass("pressed")
    }, n.ConditionalFormattingControl._renderRules = function(n, t) {
        var i = jQuerySplst(".splst-cond-formatting-rules-list"),
            r = SPLST.ListTableLayoutEditor.ConditionalFormattingControl._getRulesArray(n);
        SPLST.ListTableLayoutEditor.ConditinalFormattingRuleIdIndex = 0;
        jQuerySplst.each(r, function(n, r) {
            i.append(SPLST.ListTableLayoutEditor.ConditionalFormattingControl._renderRule(r, t))
        });
        SPLST.ListTableLayoutEditor.ConditionalFormattingControl._refreshProcessAllCbx()
    }, n.ConditionalFormattingControl._renderRule = function(n, t) {
        var r = SPLST.ListTableLayoutEditor,
            f = r.ConditionalFormattingTemplates,
            i = jQuerySplst(String.format(f.ruleHTML(), f.generateRulesSelectOptions(), f.generateTypeBasedRulesSelectOptions(t), f.formulaHTML(), f.simpleFormatHTML())),
            e = r.isIE(),
            p = i.find(".splst-layout-editor-colorpicker-btn"),
            s, v, h, c, u, o, l, y, a;
        jQuerySplst.each(p, function(n, t) {
            jQuerySplst(t).click(function(n) {
                n.stopImmediatePropagation();
                var t = jQuerySplst(n.currentTarget),
                    i = e ? ".evo-pop-ie" : ".evo-pop";
                if (t.find(i).length) t.find('input[type="text"]').colorpicker("hidePalette");
                else {
                    t.find('input[type="text"]').colorpicker("showPalette");
                    jQuerySplst("body").one({
                        mouseup: function(n) {
                            jQuerySplst(n.target).parent().attr("class") !== "evo-more" && t.find('input[type="text"]').colorpicker("hidePalette")
                        }
                    })
                }
            })
        });
        s = i.find('.splst-layout-editor-colorpicker-color>input[type="text"]');
        jQuerySplst.each(s, function(n, t) {
            var i = jQuerySplst(t),
                f = i.parent(),
                e = i.attr("data-indicatorcolor") === "true",
                u;
            e ? (u = r.Helper.rgb2hex(r.Helper.div_ms_vb2_color), i.colorpicker({
                displayIndicator: !1,
                showOn: "none",
                transparentColor: !1,
                color: u,
                renderPaletteToBody: !0,
                history: !1,
                defaultColor: u
            })) : i.colorpicker({
                displayIndicator: !1,
                showOn: "none",
                transparentColor: !0,
                color: "#0000ffff",
                renderPaletteToBody: !0
            });
            f.find("div").first().css("width", "20px").css("padding", "0").css("margin", "0")
        });
        i.find(".splst-layout-editor-align-icon-container").click(function(n) {
            var t = jQuerySplst(n.currentTarget),
                i = t.parent(),
                u = t.data("align"),
                r = t.hasClass("pressed");
            i.find(".splst-layout-editor-align-icon-container").removeClass("pressed");
            r || t.addClass("pressed");
            SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange()
        });
        v = i.find(".splst-layout-editor-style-icon-container");
        v.click(function(n) {
            var i = jQuerySplst(n.currentTarget),
                r = i.data("font-style"),
                f = !1,
                t, e, u;
            i.toggleClass("pressed");
            f = i.hasClass("pressed");
            f && (t = SPLST.ListTableLayoutEditor.FONT_STYLE, e = r === t.UNDERLINE || r === t.STRIKETHROUGH, e && (u = i.parent().find('[data-font-style="' + (r === t.UNDERLINE ? t.STRIKETHROUGH : t.UNDERLINE) + '"]'), u.hasClass("pressed") && u.removeClass("pressed")));
            SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange()
        });
        h = i.find(".splst-booster-cf-ind");
        c = h.find("div");
        e && c.addClass("ie");
        h.click(function(n) {
            var u = jQuerySplst(n.currentTarget),
                h = jQuerySplst("body"),
                i = jQuerySplst('<div class="splst-booster-cover' + (e ? " ie" : "") + '"><\/div>');
            h.append(i);
            var t = jQuerySplst('<div class="splst-booster-cf-ind-popup"><\/div>'),
                f = [],
                o = jQuerySplst('<div class="splst-booster-cf-ind-option-row"><\/div>');
            o.append('<div class="splst-booster-cf-ind-option ' + (e ? "ie" : "") + '">&nbsp;<\/div>');
            f.push(o);
            t.append(o);
            jQuerySplst.each(r.ConditionalFormattingIndicators, function(n, i) {
                var r, u;
                f[i.row] || (r = jQuerySplst('<div class="splst-booster-cf-ind-option-row"><\/div>'), f[i.row] = r, t.append(r));
                u = f[i.row];
                u.append('<div class="splst-booster-cf-ind-option ' + (e ? "ie" : "") + '" data-indicator="' + n + '">' + i.valueHex + "<\/div>")
            });
            var s = u.offset(),
                a = u.position(),
                l = u.outerHeight(!0);
            t.css("left", s.left);
            t.css("top", s.top + l + 1);
            i.append(t);
            t.find(".splst-booster-cf-ind-option").click(function(n) {
                var t = jQuerySplst(n.currentTarget);
                c.text(t.text());
                u.attr("data-indicator", t.data("indicator") || "");
                i.remove();
                SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange()
            });
            i.click(function() {
                i.remove()
            })
        });
        this._refreshRule(i, n);
        jQuerySplst.each(s, function(n, t) {
            jQuerySplst(t).on("change.color", function() {
                SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange()
            })
        });
        i.find("[data-splst-stop-if-true]").click(function() {
            SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange()
        });
        i.find("[data-splst-hide-text]").click(function() {
            SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange()
        });
        u = -1;
        i.find("[data-splst-cond-formula-arg=first], [data-splst-cond-formula-arg=second]").on("change keydown paste input", function(n) {
            var t = jQuerySplst(n.currentTarget),
                i = t.data("text-changed");
            i || (t.attr("data-text-changed", !0), SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange());
            u !== -1 && clearTimeout(u);
            u = setTimeout(function() {
                var t = jQuerySplst(n.currentTarget);
                SPLST.ListTableLayoutEditor.ConditionalFormattingControl._refreshErrorTextVisibility(t.closest(".splst-cond-formatting-ruleContainer"))
            }, 1e3)
        }).on("blur", function(n) {
            u !== -1 && clearTimeout(u);
            var t = jQuerySplst(n.currentTarget);
            SPLST.ListTableLayoutEditor.ConditionalFormattingControl._refreshErrorTextVisibility(t.closest(".splst-cond-formatting-ruleContainer"))
        });
        return i.find('[data-splst-cond-formula-arg="ignore-case"]').click(function() {
            SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onChange()
        }), i.find(".splst-cond-formatting-rule-delete").click(SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onDeleteRuleClick), i.find("[data-splst-rule-select]").change(SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onRuleChanged), i.find('[data-splst-cond-formula-arg="date-select"]').change(this.onDateSelectChanged), i.find(".splst-cond-formatting-updown-btn").click(SPLST.ListTableLayoutEditor.ConditionalFormattingControl.onOrderBtnClick), o = i.find(".splst-lb-cf-date-picker-btn"), o.click(r.ConditionalFormattingControl.onShowDatePickerClick), l = r.secondArgIdPrefix + r.ConditinalFormattingRuleIdIndex, y = o.parent(), y.find('input[type="text"]').attr("id", l), o.find("img").attr("id", l + "DatePickerImage"), a = jQuerySplst(r.ConditionalFormattingTemplates.datePickerFrameHTML()), a.attr("id", r.secondArgIdPrefix + r.ConditinalFormattingRuleIdIndex + "DatePickerFrame"), jQuerySplst("body").append(a), r.ConditinalFormattingRuleIdIndex++, i
    }, n.ConditionalFormattingControl.collectRuleData = function(n) {
        var l, g, nt, u;
        if (n && n.length) {
            var r = SPLST.ListTableLayoutEditor,
                t = r.ConditionalFormattingRuleTypes,
                at = r.ConditionalFormattingDateFormulas,
                y = r.FONT_STYLE,
                tt = jQuerySplst(".splst-lb-cf"),
                fi = tt.data("field-type"),
                it = tt.data("field-is-percent"),
                vt = n.find("[data-splst-rule-select]"),
                yt = n.find("[data-splst-stop-if-true]"),
                pt = n.find("[data-splst-hide-text]"),
                p = n.find('[data-splst-cond-formula-arg="first"]'),
                wt = n.find('[data-splst-cond-formula-arg="date-select"]'),
                rt = n.find('[data-splst-cond-formula-arg="second"]'),
                bt = n.find('[data-splst-cond-formula-arg="ignore-case"]'),
                f = n.find(".splst-cond-formatting-format"),
                kt = f.find('[data-backcolor="true"]'),
                dt = f.find('[data-fontcolor="true"]'),
                ut = f.find("div[data-text-align] div[data-align].pressed"),
                ft = f.find("div[data-text-valign] div[data-align].pressed"),
                gt = f.find('[data-font-style="' + y.BOLD + '"]'),
                ni = f.find('[data-font-style="' + y.ITALIC + '"]'),
                ti = f.find('[data-font-style="' + y.UNDERLINE + '"]'),
                ii = f.find('[data-font-style="' + y.STRIKETHROUGH + '"]'),
                ri = f.find(".splst-booster-cf-ind"),
                ui = f.find('[data-indicatorcolor="true"]'),
                et = f.find("div[data-indicator-align] div[data-align].pressed"),
                a = kt.colorpicker("val");
            a === "#0000ffff" && (a = "");
            l = dt.colorpicker("val");
            l === "#0000ffff" && (l = "");
            var b = ut.length && ut.data("align") || "",
                k = ft.length && ft.data("align") || "",
                ot = gt.hasClass("pressed"),
                st = ni.hasClass("pressed"),
                ht = ti.hasClass("pressed"),
                ct = ii.hasClass("pressed"),
                d = ri.attr("data-indicator"),
                v = ui.colorpicker("val");
            if (v === "#0000ffff" && (v = ""), g = et.length && et.data("align") || "", nt = pt[0].checked, a || l || b || k || ot || st || ht || ct || d && v || nt) {
                var s = {},
                    lt = vt.val(),
                    i = {},
                    e, w, o, h, c;
                s.type = lt;
                s.stopIfTrue = yt[0].checked;
                s.hideText = nt;
                switch (lt) {
                    case t.TextContains:
                    case t.TextNotContains:
                    case t.TextEqual:
                    case t.TextStartsWith:
                    case t.TextEndsWith:
                        i.args = [];
                        i.args.push(p.val());
                        i.ignoreCase = bt[0].checked;
                        break;
                    case t.DigitGreater:
                    case t.DigitGreaterEqual:
                    case t.DigitLess:
                    case t.DigitLessEqual:
                    case t.DigitEqual:
                    case t.DigitNotEqual:
                        i.args = [];
                        o = r.ConditionalFormattingControl._getDigitSeparators();
                        h = r.ConditionalFormattingControl._escapeRegExpSpecialCharacter(o.thousand);
                        c = r.ConditionalFormattingControl._escapeRegExpSpecialCharacter(o.decimal);
                        e = p.val().trim().replace(new RegExp(h, "gmi"), "").replace(new RegExp(c, "gmi"), ".");
                        it && (e = (parseFloat(e) / 100).toFixed(2));
                        i.args.push(e);
                        break;
                    case t.DigitTop:
                    case t.DigitBottom:
                    case t.DigitTopPercent:
                    case t.DigitBottomPercent:
                        i.args = [];
                        o = r.ConditionalFormattingControl._getDigitSeparators();
                        h = r.ConditionalFormattingControl._escapeRegExpSpecialCharacter(o.thousand);
                        c = r.ConditionalFormattingControl._escapeRegExpSpecialCharacter(o.decimal);
                        e = p.val().trim().replace(new RegExp(h, "gmi"), "").replace(new RegExp(c, "gmi"), ".");
                        i.args.push(e);
                        break;
                    case t.DigitIsBetween:
                    case t.DigitIsNotBetween:
                        i.args = [];
                        o = r.ConditionalFormattingControl._getDigitSeparators();
                        h = r.ConditionalFormattingControl._escapeRegExpSpecialCharacter(o.thousand);
                        c = r.ConditionalFormattingControl._escapeRegExpSpecialCharacter(o.decimal);
                        e = p.val().trim().replace(new RegExp(h, "gmi"), "").replace(new RegExp(c, "gmi"), ".");
                        w = rt.val().trim().replace(new RegExp(h, "gmi"), "").replace(new RegExp(c, "gmi"), ".");
                        it && (e = (parseFloat(e) / 100).toFixed(2), w = (parseFloat(w) / 100).toFixed(2));
                        i.args.push(e);
                        i.args.push(w);
                        break;
                    case t.DateIs:
                    case t.DateIsBefore:
                    case t.DateIsAfter:
                        i.dateFormula = wt.val();
                        i.dateFormula == at.ExactDate && (i.args = [], i.args[1] = moment(rt.val(), r.webDateFormat).format("MM/DD/YYYY"))
                }
                return s.formula = i, u = {}, a && (u["background-color"] = a), l && (u.color = l), b && (u["text-align"] = b), k && (u["vertical-align"] = k), ot && (u["font-weight"] = "bold"), st && (u["font-style"] = "italic"), ht && (u["text-decoration"] = "underline"), ct && (u["text-decoration"] = "line-through"), d && v && (u.indicator = {
                    value: d,
                    color: v
                }, g && (u.indicator.align = g)), s.style = u, s.isLocal = n.hasClass("local") || !n.hasClass("global"), s
            }
        }
    }, n.ConditionalFormattingControl.collectColumnSettingsDialogData = function() {
        var n = {},
            o = null,
            u = SPLST.ListTableLayoutEditor,
            s = jQuerySplst(".splst-lb-cf"),
            y = s.find("input[type=radio][name=cftype]"),
            t = u.ConditionalFormattingTypes,
            f = y.length ? y.filter(":checked")[0].value : t.none,
            c = s.data("are-local-changes"),
            tt = s.data("field-type"),
            it = s.data("field-is-percent"),
            w, v, nt, e;
        if (f === t.none) return n.cfType = f, n;
        var p = s.find(".splst-cond-formatting-ruleContainer"),
            rt = c ? u.PROPERTY_BAG_LOCAL_POSTFIX : u.PROPERTY_BAG_GLOBAL_POSTFIX,
            l = 0,
            a;
        p.length && (o = {}, jQuerySplst.each(p, function(n, t) {
            var r = jQuerySplst(t),
                i;
            (c && r.hasClass("local") || !c && r.hasClass("global")) && (i = u.ConditionalFormattingControl.collectRuleData(r));
            !a && r.hasClass("global") && (a = !0);
            i && (i.index = l, i.isBefore = c && !a, o[l + rt] = i, l++)
        }));
        n.rules = o ? o : null;
        w = jQuerySplst("#splst-layout-editor-style-row-cbx");
        n.styleRowByRules = w[0].checked;
        v = jQuerySplst("#splst-process-all-pages-cbx");
        n.processAllPages = v.is(":enabled") && v[0].checked;
        var h = s.find(".splst-lb-cf-progress-bar"),
            b = h.find(".splst-lb-cf-pb-type-item.selected"),
            i, r, ut = h.data("color-scale");
        if (tt === "DateTime") i = moment(h.find("#splstPBStart").val(), u.webDateFormat).format("MM/DD/YYYY"), r = moment(h.find("#splstPBEnd").val(), u.webDateFormat).format("MM/DD/YYYY");
        else {
            var k = u.ConditionalFormattingControl._getDigitSeparators(),
                d = u.ConditionalFormattingControl._escapeRegExpSpecialCharacter(k.thousand),
                g = u.ConditionalFormattingControl._escapeRegExpSpecialCharacter(k.decimal);
            i = h.find("#splstPBStart").val();
            i && (i = i.trim().replace(new RegExp(d, "gmi"), "").replace(new RegExp(g, "gmi"), "."));
            r = h.find("#splstPBEnd").val();
            r && (r = r.trim().replace(new RegExp(d, "gmi"), "").replace(new RegExp(g, "gmi"), "."));
            it && (i = (parseFloat(i) / 100).toFixed(2), r = (parseFloat(r) / 100).toFixed(2))
        }
        b.length && i && r && i !== "Invalid date" && r !== "Invalid date" ? (nt = b[0], e = {}, e.value = nt.getAttribute("data-symbol-type"), e.colors = ut.getColors(), e.start = i, e.end = r, n.pb = e) : n.pb = null;
        !o && e ? f = t.pb : o && !e ? f = t.rules : (f !== t.rules || o) && (f !== t.pb || e) || (f = t.none);
        switch (f) {
            case t.rules:
                delete n.pb;
                break;
            case t.pb:
                delete n.rules;
                break;
            case t.none:
                delete n.pb;
                delete n.rules
        }
        return n.cfType = f, n.rules || (n.styleRowByRules = !1), n
    }, n.ConditionalFormattingControl.getTabData = function(n) {
        var t = n._getCLVP();
        return {
            title: SPLST.ListTableLayoutEditor.locale.messages.conditionalFormatting.columnSettingsTabTitle,
            id: "splst_layout_editor_column_conditional_formatting",
            height: 468,
            width: parseInt(SPLST.ListTableLayoutEditor.locale.styles.cfTab.width) || 768,
            isDisabled: n.hasGrouping && !n.isClientRendering || t && t.ctx && t.ctx.completedSearchTerm,
            isVisible: !0
        }
    }, n.ConditionalFormattingControl.initStyles = function(n, t) {
        var f = new jQuerySplst.Deferred,
            r, u, i;
        if (n && t) return (r = t._getCLVP(), r && r.ctx && !!r.ctx.completedSearchTerm) ? void 0 : t.hasGrouping && !t.isClientRendering ? void 0 : (u = [], i = {}, jQuerySplst.each(n, function(n, t) {
            (t.rules || t.pb) && (u.push(n), i[n] = {
                rules: t.rules,
                pb: t.pb,
                cfType: t.cfType,
                version: t.version
            });
            t.styleRowByRules && (i[n] = jQuerySplst.extend(!0, i[n], {
                styleRowByRules: !0
            }));
            t.processAllPages && (i[n] = jQuerySplst.extend(!0, i[n], {
                processAllPages: !0
            }))
        }), !u.length) ? void 0 : (t.loadFields(u, function() {
            jQuerySplst.when(SPLST.ListTableLayoutEditor.ConditionalFormattingControl.setStyles(i, t)).then(function() {
                f.resolve()
            })
        }), f.promise())
    }, n.ConditionalFormattingControl.setStyles = function(n, t) {
        var r, f, l;
        if (n && t && !t.isDisposed) {
            var e = new jQuerySplst.Deferred,
                a = SPLST.ListTableLayoutEditor,
                u = t.table.rows,
                v = u.length,
                y = v ? u[0].cells.length : 0,
                o, i, s = t.isEditMode,
                h = s && t._ganttControl.get_Columns(),
                c = [];
            for (r = 0; r < y; r++) o = jQuerySplst(u[0].cells[r]), s ? i = h[r - 1] ? h[r - 1].columnKey : "" : (f = o.find("div[name]"), f && (i = f.attr("name"))), i && (i = a.Helper.getStoredName(i), l = n[i], c.push(this.setColumnStyles(l, t, i, r)));
            return jQuerySplst.when.apply(jQuerySplst, c).then(function() {
                e.resolve()
            }), e.promise()
        }
    }, n.ConditionalFormattingControl.setColumnStyles = function(n, t, i, r) {
        var e, h, o, s, l, f, y, a;
        if (n && t && (e = SPLST.ListTableLayoutEditor.ConditionalFormattingTypes, h = n.cfType || e.rules, h === e.none || (o = t._getCLVP(), !o || !o.ctx || !o.ctx.completedSearchTerm))) try {
            var u = t.cfViewItems,
                c = t.pagingSettings,
                v = h === e.rules && n.processAllPages && t.getIsQueryEnabled();
            for (c && v && c.itemsCount !== u.get_count() && (u.boosterDispose && u.boosterDispose(), u = t.cfViewItems = t.viewItems, t.refreshLoadedFields()), s = t.getClientDataHelper().getPageItemsIndexes(u, c, v), l = new Array(s.length), f = 0, y = s.length; f < y; f++) l[f] = f;
            if (this.removePrevStyles(t, i, r, l, n.styleRowByRules), !n.rules && !n.pb) return;
            if (t.areFieldsLoaded(i)) this._setColumnStyles(n, t, i, r, s);
            else return a = new jQuerySplst.Deferred, t.loadFields(i, function() {
                SPLST.ListTableLayoutEditor.ConditionalFormattingControl.setColumnStyles(n, t, i, r);
                a.resolve()
            }), a.promise()
        } catch (p) {
            t._onError(p.message)
        }
    }, n.ConditionalFormattingControl._setColumnStyles = function(n, t, i, r, u) {
        var f = SPLST.ListTableLayoutEditor.ConditionalFormattingTypes,
            e = n.cfType || f.rules,
            o;
        if (e === f.none || (o = t._getCLVP(), !o || !o.ctx || !o.ctx.completedSearchTerm)) {
            var c = t.cfViewItems,
                s = t.pagingSettings,
                l = e === f.rules && n.processAllPages && t.getIsQueryEnabled(),
                h;
            h = s && !l ? this._getDataArgs(t, i, t.getClientDataHelper().getPageItemsIndexes(c, s, l), null) : this._getDataArgs(t, i, 0, (s ? s.itemsCount : c.get_count()) - 1);
            e === f.rules ? this._setColumnStylesRules(n, t, i, r, u, h) : e === f.pb && this._setColumnStylesPB(n, t, i, r, u, h)
        }
    }, n.ConditionalFormattingControl.removePrevStyles = function(n, t, i, r, u) {
        var l = SPLST.ListTableLayoutEditor,
            f = l.Helper,
            e = f.stylesheets.cf,
            ut = l.ConditionalFormattingControl,
            o = n.tableCssClassName,
            d = n.isEditMode,
            ht = n.sessionSettings.areLocalChanges,
            w = l.CFSelectors,
            ct = String.format(w.columnSelector, o, i + 1),
            lt = String.format(w.columnAllDescSelector, o, i + 1),
            at = String.format(w.freezePaneColumnSelector, o, i + 1),
            vt = String.format(w.freezePaneColumnAllDescSelector, o, i + 1),
            ft = n.table.rows[0],
            yt = SPLST.ListTableLayoutEditor.Helper.getFieldInfoFromHeaderCell(jQuerySplst(ft.cells[i]), i, ft.cells.length, n.isEditMode, n._ganttControl),
            h = n.getDescendantsSelectors(yt.colName),
            s, k, et;
        r && r.length && (f.removeCssRule(e, ct), f.removeCssRule(e, lt), d || (f.removeCssRule(e, at), f.removeCssRule(e, vt)));
        var g = !1,
            nt = !1,
            b = ut.getFieldNameWithFlagSet(n, "styleRowByRules", !0),
            tt = ut.getFieldNameWithFlagSet(n, "styleRowByRules", !1);
        for (ht ? (g = u && (t === b || t === tt && !b), nt = !!b || !!tt) : (g = u, nt = !!b || !!tt), s = n.getClientDataHelper(), k = 0, et = r.length; k < et; k++) {
            var c = r[k],
                pt = s.getRowColSelector(o, i + 1, c) + ":before",
                wt = s.getRowColSelectorFHWrap(o, i + 1, c) + ":before",
                a = s.getRowSelector(o, c) + " > td",
                it = a + ":not(.ms-list-itemLink-td):not(.ms-vb-itmcbx)",
                bt = a + ".ms-list-itemLink-td, " + a + ".ms-vb-itmcbx",
                v = s.getRowColSelector(o, i + 1, c) + ":not(.ms-list-itemLink-td):not(.ms-vb-itmcbx)",
                ot = h && h.length ? v + " " + h.join(", " + v + " ") : "",
                kt = v + ":after",
                dt = v + " > :not(.ms-core-menu-box)",
                gt = it + " " + l.COLUMN_DESCENDANTS_SELECTORS.join(", " + it + " "),
                ni = a + ".ms-list-itemLink-td > :not(.ms-core-menu-box), " + a + ".ms-vb-itmcbx > :not(.ms-core-menu-box)",
                y = s.getRowSelectorFHWrap(o, c) + " > td:nth-child(n)",
                rt = y + ":not(.ms-list-itemLink-td):not(.ms-vb-itmcbx)",
                ti = y + ".ms-list-itemLink-td, " + y + ".ms-vb-itmcbx",
                p = s.getRowColSelectorFHWrap(o, i + 1, c) + ":not(.ms-list-itemLink-td):not(.ms-vb-itmcbx)",
                st = h && h.length ? p + " " + h.join(", " + p + " ") : "",
                ii = p + ":after",
                ri = p + " > :not(.ms-core-menu-box)",
                ui = rt + " " + l.COLUMN_DESCENDANTS_SELECTORS.join(", " + rt + " "),
                fi = y + ".ms-list-itemLink-td > :not(.ms-core-menu-box), " + y + ".ms-vb-itmcbx > :not(.ms-core-menu-box)";
            f.removeCssRule(e, pt);
            f.removeCssRule(e, v);
            f.removeCssRule(e, kt);
            ot && f.removeCssRule(e, ot);
            f.removeCssRule(e, dt);
            d || (f.removeCssRule(e, wt), f.removeCssRule(e, p), f.removeCssRule(e, ii), st && f.removeCssRule(e, st), f.removeCssRule(e, ri));
            (g || !nt) && (f.removeCssRule(e, it), f.removeCssRule(e, gt), f.removeCssRule(e, bt), f.removeCssRule(e, ni), d || (f.removeCssRule(e, rt), f.removeCssRule(e, ui), f.removeCssRule(e, ti), f.removeCssRule(e, fi)))
        }
    }, n.ConditionalFormattingControl._setColumnStylesRules = function(n, t, i, r, u, f) {
        for (var o, h, c = this._getRulesArray(n.rules), l = n.styleRowByRules, s = t.table.rows[0], a = SPLST.ListTableLayoutEditor.Helper.getFieldInfoFromHeaderCell(jQuerySplst(s.cells[r]), r, s.cells.length, t.isEditMode, t._ganttControl), v = t.getDescendantsSelectors(a.colName), e = 0, y = u.length; e < y; e++)(o = u[e], o !== null && o !== undefined) && (h = t.getFieldValue(i, o), this._applyRules({
            pageItemIndex: e,
            value: h,
            min: f.min,
            max: f.max,
            average: f.average,
            sortedValues: f.sortedValues,
            numericValuesCount: f.numericValuesCount
        }, c, i, r, t, l, v))
    }, n.ConditionalFormattingControl._setColumnStylesPB = function(n, t, i, r, u) {
        var f, e, d, c, g, y, nt;
        if (n.pb) {
            var o = SPLST.ListTableLayoutEditor,
                h = o.Helper,
                l = t.tableCssClassName,
                tt = t.isEditMode,
                p = t.listFields[i],
                it = p.type,
                a = o.CFSelectors,
                rt = String.format(a.columnSelector, l, r + 1),
                ut = String.format(a.columnAllDescSelector, l, r + 1),
                ft = String.format(a.freezePaneColumnSelector, l, r + 1),
                et = String.format(a.freezePaneColumnAllDescSelector, l, r + 1),
                s = n.pb,
                w = Math.ceil(o.ConditionalFormattingProgressBars[s.value].occupancy * o.ProgressBarFontSize + 2 * o.ProgressBarCellOffset.y),
                ot = o.ProgressBarFontSize + 2 * o.ProgressBarCellOffset.x,
                b = {
                    "text-indent": "-9999px",
                    "white-space": "nowrap",
                    "text-align": "center",
                    "min-width": ot + "px !important;",
                    height: w + "px !important;",
                    position: "relative",
                    padding: "0px !important;",
                    overflow: "hidden"
                },
                k = {
                    display: "none !important;"
                },
                v = h.stylesheets.cf;
            if (h.addCssRule(v, rt, b), h.addCssRule(v, ut, k), tt || (h.addCssRule(v, ft, b), h.addCssRule(v, et, k)), it === "DateTime") {
                if (f = new Date(s.start), !this._isValidDate(f)) return;
                if (f = Number(f), e = new Date(s.end), !this._isValidDate(e)) return;
                e = Number(e)
            } else f = Number(s.start), e = Number(s.end), p.isPercent && !n.version && (f = (f / 100).toFixed(2), e = (e / 100).toFixed(2));
            for (d = e - f, c = 0, g = u.length; c < g; c++)(y = u[c], y !== null && y !== undefined) && (nt = t.getFieldValue(i, y), this._applyProgressBar(t, s, c, r, nt, w, f, e, d))
        }
    }, n.ConditionalFormattingControl._applyProgressBar = function(n, t, i, r, u, f, e, o, s) {
        var v, y;
        if (u.value) {
            var c = SPLST.ListTableLayoutEditor,
                p = c.Helper,
                w = p.stylesheets.cf,
                b = n.tableCssClassName,
                d = n.isEditMode,
                rt = c.CFSelectors,
                k = n.getClientDataHelper(),
                g = k.getRowColSelector(b, r + 1, i) + ":before",
                nt = k.getRowColSelectorFHWrap(b, r + 1, i) + ":before",
                tt = c.isIE(),
                a = c.ConditionalFormattingProgressBars[t.value],
                l = Number(u.value),
                it = Math.round((l - e) * 100 / s) / 100,
                h = {
                    "font-family": "booster",
                    "font-size": c.ProgressBarFontSize + "px",
                    position: "absolute",
                    left: "50%",
                    "margin-left": "-" + c.ProgressBarFontSize / 2 + "px",
                    "text-indent": "0px",
                    color: this._findPBColor(t.colors, it),
                    top: -Math.floor((c.ProgressBarFontSize - f) / 2) + "px",
                    "font-weight": "normal !important",
                    "font-style": "normal !important",
                    "text-decoration": "none !important",
                    width: c.ProgressBarFontSize + "px"
                };
            tt || (h["line-height"] = h["font-size"]);
            e <= o ? l < e ? h.content = a.lessThanMinValue : l > o ? h.content = a.greaterThanMaxValue : (v = Math.round((l - e) / s * 100), y = parseInt(a.minValue.replace("\\", ""), 16), h.content = "\\" + (y + v).toString(16)) : l > e ? h.content = a.lessThanMinValue : l < o ? h.content = a.greaterThanMaxValue : (v = Math.round((l - e) / s * 100), y = parseInt(a.minValue.replace("\\", ""), 16), h.content = "\\" + (y + v).toString(16));
            p.addCssRule(w, g, h);
            d || p.addCssRule(w, nt, h)
        }
    }, n.ConditionalFormattingControl._findPBColor = function(n, t, i, r) {
        var u, f;
        if (n && n.length) {
            if (i = i || 0, r = r || n.length - 1, i === r) return n[i].color;
            if (u = n[r], f = n[i], t <= f.value) return f.color;
            if (t > u.value) return u.color;
            var e = Math.floor((i + r) / 2),
                o = n[e],
                s = o.value;
            return s === t ? o.color : t < s ? this._findPBColor(n, t, i, e) : this._findPBColor(n, t, e + 1, r)
        }
    }, n.ConditionalFormattingControl._getDataArgs = function(n, t, i, r) {
        var u = [],
            f, o, e, c, s, h;
        if (jQuerySplst.isNumeric(i))
            for (e = i; e <= r; e++) f = n.getFieldValue(t, e).value, (jQuerySplst.isNumeric(f) || f instanceof Date) && u.push(Number(f));
        else if (Array.isArray(i))
            for (e = 0, c = i.length; e < c; e++) f = n.getFieldValue(t, i[e]).value, (jQuerySplst.isNumeric(f) || f instanceof Date) && u.push(Number(f));
        return u.length ? (u.sort(function(n, t) {
            return n - t
        }), s = u[0], h = u[u.length - 1], o = {
            min: s,
            max: h,
            average: (s + h) / 2,
            sortedValues: u,
            numericValuesCount: u.length
        }) : o = {}, o
    }, n.ConditionalFormattingControl._applyRules = function(n, t, i, r, u, f, e) {
        var a = null,
            o = SPLST.ListTableLayoutEditor,
            s = o.Helper,
            c = s.stylesheets.cf,
            v = o.ConditionalFormattingControl,
            nt = u.tableCssClassName,
            y = u.isEditMode,
            ni = o.isIE(),
            ti = u.sessionSettings.areLocalChanges,
            tt = u.getClientDataHelper(),
            vi = o.CFSelectors,
            ii = u.listFields[i],
            ri = ii.type,
            p = tt.getRowSelector(nt, n.pageItemIndex) + " > td",
            et = p + ":not(.ms-list-itemLink-td):not(.ms-vb-itmcbx)",
            ui = p + ".ms-list-itemLink-td, " + p + ".ms-vb-itmcbx",
            w = tt.getRowColSelector(nt, r + 1, n.pageItemIndex) + ":not(.ms-list-itemLink-td):not(.ms-vb-itmcbx)",
            fi = e && e.length ? w + " " + e.join(", " + w + " ") : "",
            bt = w + ":after",
            yi = w + " > :not(.ms-core-menu-box)",
            ot = !1,
            kt = v.getFieldNameWithFlagSet(u, "styleRowByRules", !0),
            ei = v.getFieldNameWithFlagSet(u, "styleRowByRules", !1),
            oi = et + " " + o.COLUMN_DESCENDANTS_SELECTORS.join(", " + et + " "),
            si = p + ".ms-list-itemLink-td > :not(.ms-core-menu-box), " + p + ".ms-vb-itmcbx > :not(.ms-core-menu-box)",
            b = tt.getRowSelectorFHWrap(nt, n.pageItemIndex) + " > td:nth-child(n)",
            st = b + ":not(.ms-list-itemLink-td):not(.ms-vb-itmcbx)",
            hi = b + ".ms-list-itemLink-td, " + b + ".ms-vb-itmcbx",
            it = tt.getRowColSelectorFHWrap(nt, r + 1, n.pageItemIndex) + ":not(.ms-list-itemLink-td):not(.ms-vb-itmcbx)",
            ci = e && e.length ? it + " " + e.join(", " + it + " ") : "",
            dt = it + ":after",
            li = st + " " + o.COLUMN_DESCENDANTS_SELECTORS.join(", " + st + " "),
            ai = b + ".ms-list-itemLink-td > :not(.ms-core-menu-box), " + b + ".ms-vb-itmcbx > :not(.ms-core-menu-box)",
            l, k, ht, h, rt, vt, yt, wt, ut, ft;
        if (ot = ti ? f && (i === kt || i === ei && !kt) : f, t) {
            if (k = !1, jQuerySplst.each(t, function(t, i) {
                    if (v._isValueMeetsRule(n, i, ri) && (a = jQuerySplst.extend(!0, {}, i.style, a), i.style.indicator && !l && (l = i.style.indicator), i.hideText && (k = !0), i.stopIfTrue)) return !1
                }), ht = {}, k && delete a["text-align"], ht[o.COLUMN] = a, h = o.getColumnStylesObject(ht, y), l && (rt = {
                    position: "relative"
                }, l.align === "right" ? rt["padding-right"] = "26px" : l.align === "left" && (rt["padding-left"] = "26px"), h[o.COLUMN] = jQuerySplst.extend(h[o.COLUMN], rt)), k) {
                var ct = u.table.rows,
                    gt = ct && ct.length && ct[0],
                    lt = gt && gt.cells,
                    at = lt && lt.length && lt[r];
                at && (vt = jQuerySplst(at), at.style.width || vt.outerWidth(u.cellSizes && u.cellSizes[r] || vt.outerWidth()));
                yt = s.getHideTextCss();
                h[o.COLUMN] = jQuerySplst.extend(!0, {}, h[o.COLUMN], yt[o.DATA_COLUMN]);
                h[o.COLUMN_DESCENDANTS] = jQuerySplst.extend(!0, {}, h[o.COLUMN_DESCENDANTS], yt[o.DATA_COLUMN_ALL_DESC])
            }
            var pt = h[o.COLUMN],
                d = h[o.DATA_COLUMN],
                g = h[o.SYS_COLUMN];
            pt && (s.addCssRule(c, w, pt), y || s.addCssRule(c, it, pt));
            ot && (d && (delete d["padding-right"], delete d["padding-left"], s.shiftCssRule(c, et, d), y || s.shiftCssRule(c, st, d)), g && (delete g["padding-right"], delete g["padding-left"], s.shiftCssRule(c, ui, g), y || s.shiftCssRule(c, hi, g)));
            h[o.COLUMN_DESCENDANTS] && (wt = h[o.COLUMN_DESCENDANTS], e && e.length && (s.addCssRule(c, fi, wt), y || s.addCssRule(c, ci, wt)));
            ut = h[o.DATA_COLUMN_ALL_DESC];
            ft = h[o.SYS_COLUMN_ALL_DESC];
            ot && (ut && (s.shiftCssRule(c, oi, ut), y || s.shiftCssRule(c, li, ut)), ft && (s.shiftCssRule(c, si, ft), y || s.shiftCssRule(c, ai, ft)));
            l && (ni ? function(t, i) {
                setTimeout(function() {
                    v._applyIndicatorStyles(n, u, l, a["vertical-align"], t);
                    v._applyIndicatorStyles(n, u, l, a["vertical-align"], i)
                }, 45)
            }(bt, dt) : (v._applyIndicatorStyles(n, u, l, a["vertical-align"], bt), v._applyIndicatorStyles(n, u, l, a["vertical-align"], dt)));
            k && u.notifyCellPropertyChanged(o.CELL_PROPERTIES.valueVisible, {
                colIndex: r,
                rowIndex: n.pageItemIndex,
                fieldName: i
            })
        }
    }, n.ConditionalFormattingControl._applyIndicatorStyles = function(n, t, i, r, u) {
        var h = SPLST.ListTableLayoutEditor,
            l = h.Helper,
            a = l.stylesheets.cf,
            e = t.isEditMode,
            c = h.isIE(),
            f, o, s;
        i && (f = {
            "font-family": "booster",
            position: "absolute",
            content: h.ConditionalFormattingIndicators[i.value].value,
            color: i.color + " !important",
            "font-size": "16px !important",
            "font-weight": "normal !important",
            "font-style": "normal !important",
            "text-decoration": "none !important",
            "text-indent": "0px",
            width: "16px",
            height: c && !e && (!r || r != "middle") ? "12px" : "16px",
            "-webkit-font-smoothing": "antialiased",
            "-moz-osx-font-smoothing": "grayscale",
            display: "inline-block",
            "box-sizing": "content-box"
        }, i.align === "right" ? f.right = "5px" : i.align === "center" ? (f.left = "50%", f["margin-left"] = "-8px") : f.left = "5px;", r ? r === "top" ? (f.top = "0px", f.padding = "inherit", f["padding-left"] = "0px", f["padding-right"] = "0px", f["line-height"] = "inherit") : r === "middle" ? c ? (o = t.$table.find("tbody > tr:nth-child(" + (n.pageItemIndex + (e ? 2 : 1)) + ")"), s = o.outerHeight(), f.top = Math.round(s / 2 - 8) + "px") : (f.top = "50%", f["margin-top"] = "-8px") : (f.bottom = "0px", f.padding = "inherit", f["padding-left"] = "0px", f["padding-right"] = "0px", f["line-height"] = "inherit") : e ? c ? (o = t.$table.find("tbody > tr:nth-child(" + (n.pageItemIndex + (e ? 2 : 1)) + ")"), s = o.outerHeight(), f.top = Math.round(s / 2 - 8) + "px") : (f.top = "50%", f["margin-top"] = "-8px") : (f.top = "0px", f.padding = "inherit", f["padding-left"] = "0px", f["padding-right"] = "0px", f["line-height"] = "inherit"), l.addCssRule(a, u, f))
    }, n.ConditionalFormattingControl._isValueMeetsRule = function(n, t, i) {
        var h = t.type,
            f = t.formula,
            o = SPLST.ListTableLayoutEditor,
            r = o.ConditionalFormattingRuleTypes,
            y = o.ConditionalFormattingTypeBasedRuleTypes,
            p = o.ConditionalFormattingDateFormulas,
            c = n.value.value,
            u = n.value.text,
            w = n.index,
            e, l, s, v, a;
        switch (h) {
            case r.TextIsEmpty:
                return !u && !c;
            case r.TextIsNotEmpty:
                return !!u || !!c;
            case r.TextContains:
                return f.ignoreCase ? u && u.toString().toLowerCase().indexOf(f.args[0].toLowerCase()) !== -1 : u && u.toString().indexOf(f.args[0]) !== -1;
            case r.TextNotContains:
                return f.ignoreCase ? !u || u.toString().toLowerCase().indexOf(f.args[0].toLowerCase()) === -1 : !u || u.toString().indexOf(f.args[0]) === -1;
            case r.TextEqual:
                return f.ignoreCase ? u && u.toString().toLowerCase() === f.args[0].toLowerCase() : u && u.toString() === f.args[0];
            case r.TextStartsWith:
                return f.ignoreCase ? u && u.toString().toLowerCase().startsWith(f.args[0].toLowerCase()) : u && u.toString().startsWith(f.args[0]);
            case r.TextEndsWith:
                return f.ignoreCase ? u && u.toString().toLowerCase().endsWith(f.args[0].toLowerCase()) : u && u.toString().endsWith(f.args[0]);
            case r.DigitGreater:
            case r.DigitGreaterEqual:
            case r.DigitLess:
            case r.DigitLessEqual:
            case r.DigitEqual:
            case r.DigitNotEqual:
            case r.DigitTop:
            case r.DigitBottom:
            case r.DigitTopPercent:
            case r.DigitBottomPercent:
            case r.DigitIsBetween:
            case r.DigitIsNotBetween:
            case r.DigitEqualAverage:
            case r.DigitAboveAverage:
            case r.DigitBelowAverage:
            case r.DigitEqualOrAboveAverage:
            case r.DigitEqualOrBelowAverage:
                return this._isValueMeetsDigitRule(n, h, f, i);
            case r.DateIs:
            case r.DateIsBefore:
            case r.DateIsAfter:
                return this._isValueMeetsDateRule(c, h, f);
            case y.UserCurrent:
                if (e = n.value.originalValue, !e) return !1;
                for (l = Array.isArray(e) ? e : [e], s = 0, v = l.length; s < v; s++)
                    if (a = l[s], a.get_lookupId && a.get_lookupId() === o.currentUser.get_id()) return !0;
                return !1
        }
    }, n.ConditionalFormattingControl._isValueMeetsDigitRule = function(n, t, i, r) {
        var b = SPLST.ListTableLayoutEditor,
            s = b.ConditionalFormattingRuleTypes,
            e = n.value.value,
            o = jQuerySplst.isNumeric(e) || e instanceof Date,
            f, a, w, y;
        if (!e) return !1;
        o && (f = Number(e));
        e = e && e.toString();
        var h = i.args && i.args[0],
            c = !1,
            u = h;
        h && (c = jQuerySplst.isNumeric(h) || h instanceof Date, c || (u = new Date(h), c = this._isValidDate(u)), h = h.toString());
        u = c ? Number(u) : undefined;
        var l = i.args && i.args[1],
            p = !1,
            v = l;
        l && (p = jQuerySplst.isNumeric(l) || l instanceof Date, p || (v = new Date(l), p = this._isValidDate(v)), l = l.toString());
        v = p ? Number(v) : undefined;
        a = ["Integer", "Currency", "Number", "DateTime"].indexOf(r) !== -1;
        switch (t) {
            case s.DigitGreater:
                return o && c ? f > u : a ? !1 : e > h;
            case s.DigitGreaterEqual:
                return o && c ? f >= u : a ? !1 : e >= h;
            case s.DigitLess:
                return o && c ? f < u : a ? !1 : e < h;
            case s.DigitLessEqual:
                return o && c ? f <= u : a ? !1 : e <= h;
            case s.DigitEqual:
                return o && c ? f === u : a ? !1 : e == h;
            case s.DigitNotEqual:
                return o && c ? f !== u : a ? !1 : e != h;
            case s.DigitTop:
                return !n.min && n.min !== 0 || !o || !u || u < 0 ? !1 : n.numericValuesCount - u <= 0 ? !0 : f >= n.sortedValues[n.numericValuesCount - u];
            case s.DigitBottom:
                return !n.min && n.min !== 0 || !o || !u || u < 0 ? !1 : n.numericValuesCount <= u ? !0 : f <= n.sortedValues[u - 1];
            case s.DigitTopPercent:
                return !n.min && n.min !== 0 || !o || !u || u <= 0 ? !1 : u >= 100 ? !0 : (w = n.numericValuesCount, y = Math.ceil(w * ((100 - u) / 100)), y >= w && (y = w - 1), f >= n.sortedValues[y]);
            case s.DigitBottomPercent:
                return !n.min && n.min !== 0 || !o || !u || u < 0 ? !1 : u >= 100 ? !0 : (y = Math.floor(n.numericValuesCount * (u / 100)), y = y || 1, f < n.sortedValues[y]);
            case s.DigitIsBetween:
                return o && c && p ? f >= u && f <= v || f >= v && f <= u : a ? !1 : e >= h && e <= l || e >= l && e <= h;
            case s.DigitIsNotBetween:
                return o && c && p ? f < u && f < v || f > v && f > u : a ? !1 : e < h && e < l || e > l && e > h;
            case s.DigitEqualAverage:
                return !o || !n.min && n.min !== 0 ? !1 : f === n.average;
            case s.DigitAboveAverage:
                return !o || !n.min && n.min !== 0 ? !1 : f > n.average;
            case s.DigitBelowAverage:
                return !o || !n.min && n.min !== 0 ? !1 : f < n.average;
            case s.DigitEqualOrAboveAverage:
                return !o || !n.min && n.min !== 0 ? !1 : f >= n.average;
            case s.DigitEqualOrBelowAverage:
                return !o || !n.min && n.min !== 0 ? !1 : f <= n.average
        }
    }, n.ConditionalFormattingControl._isValueMeetsDateRule = function(n, t, i) {
        var d = jQuerySplst.isNumeric(n) || n instanceof Date,
            e;
        if (!d) return !1;
        var tt = SPLST.ListTableLayoutEditor.webRegionalSettings,
            g = Number(n),
            nt = i.dateFormula,
            w = new Date;
        w.setTime(g);
        var o = w.getTime(),
            b = w.getDate(),
            h = w.getMonth(),
            f = w.getFullYear(),
            k = SPLST.ListTableLayoutEditor,
            u = k.ConditionalFormattingRuleTypes,
            c = k.ConditionalFormattingDateFormulas,
            r, l, s, y, p = 864e5,
            v = 36e5 * k.hoursOffset,
            a = new Date;
        a.setTime(a.getTime() + v);
        e = a.getFullYear();
        switch (nt) {
            case c.Today:
                r = new Date;
                r.setTime(r.getTime() + v);
                switch (t) {
                    case u.DateIs:
                        return b === r.getDate() && h === r.getMonth() && f === r.getFullYear();
                    case u.DateIsAfter:
                        return r.setHours(23, 59, 59, 999), o > r.getTime();
                    case u.DateIsBefore:
                        return r.setHours(0, 0, 0, 0), o < r.getTime()
                }
                break;
            case c.Yesterday:
                r = new Date;
                r.setTime(r.getTime() + v - p);
                switch (t) {
                    case u.DateIs:
                        return b === r.getDate() && h === r.getMonth() && f === r.getFullYear();
                    case u.DateIsAfter:
                        return r.setHours(23, 59, 59, 999), o > r.getTime();
                    case u.DateIsBefore:
                        return r.setHours(0, 0, 0, 0), o < r.getTime()
                }
                break;
            case c.Tomorrow:
                r = new Date;
                r.setTime(r.getTime() + v + p);
                switch (t) {
                    case u.DateIs:
                        return b === r.getDate() && h === r.getMonth() && f === r.getFullYear();
                    case u.DateIsAfter:
                        return r.setHours(23, 59, 59, 999), o > r.getTime();
                    case u.DateIsBefore:
                        return r.setHours(0, 0, 0, 0), o < r.getTime()
                }
                break;
            case c.PastWeek:
                r = new Date;
                r.setTime(r.getTime() + v - p * (7 + r.getDay()));
                r.setHours(0, 0, 0, 0);
                l = r.getTime();
                s = new Date;
                s.setTime(s.getTime() + v - p * (s.getDay() + 1));
                s.setHours(23, 59, 59, 999);
                y = s.getTime();
                switch (t) {
                    case u.DateIs:
                        return o >= l && o <= y;
                    case u.DateIsAfter:
                        return o > y;
                    case u.DateIsBefore:
                        return o < l
                }
                break;
            case c.ThisWeek:
                r = new Date;
                r.setTime(r.getTime() + v - p * r.getDay());
                r.setHours(0, 0, 0, 0);
                l = r.getTime();
                s = new Date;
                s.setTime(s.getTime() + v + p * (6 - s.getDay()));
                s.setHours(23, 59, 59, 999);
                y = s.getTime();
                switch (t) {
                    case u.DateIs:
                        return o >= l && o <= y;
                    case u.DateIsAfter:
                        return o > y;
                    case u.DateIsBefore:
                        return o < l
                }
                break;
            case c.NextWeek:
                r = new Date;
                r.setTime(r.getTime() + v + p * (7 - r.getDay()));
                r.setHours(0, 0, 0, 0);
                l = r.getTime();
                s = new Date;
                s.setTime(s.getTime() + v + p * (13 - s.getDay()));
                s.setHours(23, 59, 59, 999);
                y = s.getTime();
                switch (t) {
                    case u.DateIs:
                        return o >= l && o <= y;
                    case u.DateIsAfter:
                        return o > y;
                    case u.DateIsBefore:
                        return o < l
                }
                break;
            case c.PastMonth:
                switch (t) {
                    case u.DateIs:
                        return h === a.getMonth() - 1 && f === e;
                    case u.DateIsAfter:
                        return h > a.getMonth() - 1 && f === e || f > e;
                    case u.DateIsBefore:
                        return h < a.getMonth() - 1 && f === e || f < e
                }
                break;
            case c.ThisMonth:
                switch (t) {
                    case u.DateIs:
                        return h === a.getMonth() && f === e;
                    case u.DateIsAfter:
                        return h > a.getMonth() && f === e || f > e;
                    case u.DateIsBefore:
                        return h < a.getMonth() && f === e || f < e
                }
                break;
            case c.NextMonth:
                switch (t) {
                    case u.DateIs:
                        return h === a.getMonth() + 1 && f === e;
                    case u.DateIsAfter:
                        return h > a.getMonth() + 1 && f === e || f > e;
                    case u.DateIsBefore:
                        return h < a.getMonth() + 1 && f === e || f < e
                }
                break;
            case c.PastYear:
                switch (t) {
                    case u.DateIs:
                        return f === e - 1;
                    case u.DateIsAfter:
                        return f > e - 1;
                    case u.DateIsBefore:
                        return f < e - 1
                }
                break;
            case c.ThisYear:
                switch (t) {
                    case u.DateIs:
                        return f === e;
                    case u.DateIsAfter:
                        return f > e;
                    case u.DateIsBefore:
                        return f < e
                }
                break;
            case c.NextYear:
                switch (t) {
                    case u.DateIs:
                        return f === e + 1;
                    case u.DateIsAfter:
                        return f > e + 1;
                    case u.DateIsBefore:
                        return f < e + 1
                }
                break;
            case c.ExactDate:
                if (r = new Date(i.args[1]), !this._isValidDate(r)) return !1;
                switch (t) {
                    case u.DateIs:
                        return b === r.getDate() && h === r.getMonth() && f === r.getFullYear();
                    case u.DateIsAfter:
                        return r.setHours(23, 59, 59, 59), l = r.getTime(), o > l;
                    case u.DateIsBefore:
                        return r.setHours(0, 0, 0, 0), l = r.getTime(), o < l
                }
        }
        return !1
    }, n.ConditionalFormattingControl._isValidDate = function(n) {
        var t;
        return t = typeof n == "string" ? new Date(n) : n, Object.prototype.toString.call(n) === "[object Date]" && !isNaN(n.getTime())
    }, n.ConditionalFormattingControl.hasColumnSettingsChanges = function() {
        var n = jQuerySplst(".splst-lb-cf");
        return n.data("has-changes") == !0
    }, n.ConditionalFormattingControl.mergeStyles = function(n, t, i) {
        var u = SPLST.ListTableLayoutEditor,
            r = u.Helper;
        i.pb = r.updateStylesObj(n.pb, t.pb);
        i.rules = r.updateStylesObj(n.rules, t.rules);
        i.styleRowByRules = t.styleRowByRules;
        i.processAllPages = t.processAllPages;
        i.cfType = t.cfType
    }, n.ConditionalFormattingControl._getRulesArray = function(n) {
        var t = [],
            i = SPLST.ListTableLayoutEditor,
            r = i.Helper;
        return n ? Array.isArray(n) ? n.slice(0).filter(function(n) {
            return r.isDefined(n)
        }) : (jQuerySplst.each(n, function(n, u) {
            var f = n.toString();
            r.isDefined(u) && (f.endsWith(i.PROPERTY_BAG_LOCAL_POSTFIX) || f.endsWith(i.PROPERTY_BAG_GLOBAL_POSTFIX)) && t.push(u)
        }), t.sort(function(n, t) {
            return n.isLocal && t.isLocal ? n.index > t.index ? 1 : n.index < t.index ? -1 : 0 : n.isLocal && !t.isLocal ? n.isBefore ? -1 : 1 : !n.isLocal && t.isLocal ? t.isBefore ? 1 : -1 : n.index > t.index ? 1 : n.index < t.index ? -1 : 0
        }), t) : t
    }, n.ConditionalFormattingControl.switchStylesScope = function(n, t) {
        if (n && !t) {
            var i = SPLST.ListTableLayoutEditor;
            jQuerySplst.each(n, function(n, r) {
                if (r.rules) {
                    var f = r.rules,
                        e = i.ConditionalFormattingControl._getRulesArray(f),
                        u = {},
                        o = i.PROPERTY_BAG_GLOBAL_POSTFIX;
                    index = 0;
                    jQuerySplst.each(e, function(n, i) {
                        var r = JSON.parse(JSON.stringify(i));
                        r.isLocal = t;
                        r.isBefore = r.isBefore && t;
                        r.index = 0;
                        u[index + o] = r;
                        index++
                    });
                    r.rules = u
                }
            })
        }
    }, n.ConditionalFormattingControl.updateDependentStyles = function(n, t, i) {
        var r = t.styleRowByRules;
        r && jQuerySplst.each(i, function(t, i) {
            t !== n && i.styleRowByRules && (i.styleRowByRules = !1)
        })
    }, n.ConditionalFormattingControl.getDependentColumns = function(n, t, i, r) {
        if (t.styleRowByRules && !i.styleRowByRules) {
            var u = SPLST.ListTableLayoutEditor.ConditionalFormattingControl.getFieldNameWithFlagSet(n, "styleRowByRules", !1);
            u && (r[u] = !0)
        }
    }, n.ConditionalFormattingControl.getFlagIsGlobal = function(n, t, i) {
        var r = n.globalStyles;
        return isGlobal = r && r[t] && !!r[t][i]
    }, n.ConditionalFormattingControl.getFieldNameWithFlagSet = function(n, t, i) {
        n.aggregatedStyles === undefined && n.initStylesVariables();
        var e = SPLST.ListTableLayoutEditor,
            u = n.localStyles,
            f = n.globalStyles,
            r = "";
        if (i) {
            if (!u) return "";
            jQuerySplst.each(u, function(n, i) {
                if (i[t]) return r = n, !1
            })
        } else {
            if (!f) return "";
            jQuerySplst.each(f, function(n, i) {
                if (i[t]) return r = n, !1
            })
        }
        return r
    }, n.ConditionalFormattingControl._getDatePickerIFrameUrl = function(n) {
        var u = SPLST.ListTableLayoutEditor,
            i = _spPageContextInfo.siteServerRelativeUrl,
            t, r;
        return i.indexOf("/") == i.length - 1 && (i = i.slice(0, -1)), i += "/_layouts/15/iframe.aspx?", t = {
            cal: 1,
            minjday: 109207,
            maxjday: 266626,
            dateonly: !0,
            swn: !1
        }, u.webRegionalSettings ? (r = u.webRegionalSettings, t.lcid = t.langid = r.get_localeId(), t.ww = r.get_workDays(), t.fdow = r.get_firstDayOfWeek(), t.fwoy = r.get_firstWeekOfYear(), t.hj = r.get_adjustHijriDays()) : (t.lcid = t.langid = 1033, t.ww = "0111110", t.fdow = 0, t.fwoy = 0, t.hj = 0), jQuerySplst.each(t, function(n, t) {
            i += "&" + n + "=" + t
        }), i += "&date=", n && (i += escapeProperly(n)), i
    }, n.ConditionalFormattingControl._getDigitTestRegExp = function() {
        if (!this._digitRegExp) {
            var i = this._getDigitSeparators(),
                t = i.thousand,
                n = i.decimal;
            t = this._escapeRegExpSpecialCharacter(t);
            n = this._escapeRegExpSpecialCharacter(n);
            this._digitRegExp = new RegExp("(^\\d+(" + n + "\\d+)?$)|(^\\d{1,3}(" + t + "\\d{3})+(" + n + "\\d+)?$)", "gmi")
        }
        return this._digitRegExp.lastIndex = 0, this._digitRegExp
    }, n.ConditionalFormattingControl._escapeRegExpSpecialCharacter = function(n) {
        if (n.length === 1) {
            if (/\s/.test(n)) return "\\s";
            if (/\./.test(n)) return "\\."
        }
        return n
    }, n.ConditionalFormattingControl._getDigitSeparators = function() {
        var n, t, i;
        return this._digitSeparators || (n = {
            thousand: ",",
            decimal: "."
        }, t = SPLST.ListTableLayoutEditor, t.webRegionalSettings && (i = t.webRegionalSettings, n.thousand = i.get_thousandSeparator(), n.decimal = i.get_decimalSeparator()), this._digitSeparators = n), this._digitSeparators
    }, n.ConditionalFormattingControl._refreshErrorTextVisibility = function(n) {
        if (n && n.length) {
            var e = jQuerySplst(".splst-lb-cf"),
                o = n.find("[data-splst-rule-select]"),
                s = e.data("field-type"),
                f = ["Integer", "Currency", "Number"].indexOf(s) !== -1,
                h = o.val(),
                r = SPLST.ListTableLayoutEditor,
                t = r.ConditionalFormattingRuleTypes,
                i, u;
            switch (h) {
                case t.TextIsEmpty:
                case t.TextIsNotEmpty:
                case t.DigitEqualAverage:
                case t.DigitAboveAverage:
                case t.DigitBelowAverage:
                case t.DigitEqualOrAboveAverage:
                case t.DigitEqualOrBelowAverage:
                case t.TextContains:
                case t.TextNotContains:
                case t.TextEqual:
                case t.TextStartsWith:
                case t.TextEndsWith:
                case t.DateIs:
                case t.DateIsBefore:
                case t.DateIsAfter:
                    n.find(".splst-cf-error-container").hide();
                    n.find(".splst-cf-error").hide();
                    break;
                case t.DigitGreater:
                case t.DigitGreaterEqual:
                case t.DigitLess:
                case t.DigitLessEqual:
                case t.DigitEqual:
                case t.DigitNotEqual:
                    n.find('[data-splst-cf-arg-error="second"]').hide();
                    f ? (i = n.find('[data-splst-cond-formula-arg="first"]'), r.ConditionalFormattingControl._checkIfArgHasError(i, ".splst-cond-formatting-formula", i.attr("data-splst-cond-formula-arg"))) : n.find('[data-splst-cf-arg-error="first"]').hide();
                    break;
                case t.DigitTop:
                case t.DigitBottom:
                case t.DigitTopPercent:
                case t.DigitBottomPercent:
                    n.find('[data-splst-cf-arg-error="second"]').hide();
                    i = n.find('[data-splst-cond-formula-arg="first"]');
                    r.ConditionalFormattingControl._checkIfArgHasError(i, ".splst-cond-formatting-formula", i.attr("data-splst-cond-formula-arg"));
                    break;
                case t.DigitIsBetween:
                case t.DigitIsNotBetween:
                    f ? (i = n.find('[data-splst-cond-formula-arg="first"]'), u = n.find('[data-splst-cond-formula-arg="second"]'), r.ConditionalFormattingControl._checkIfArgHasError(i, ".splst-cond-formatting-formula", i.attr("data-splst-cond-formula-arg")), r.ConditionalFormattingControl._checkIfArgHasError(u, ".splst-cond-formatting-formula", u.attr("data-splst-cond-formula-arg"))) : (n.find('[data-splst-cf-arg-error="first"]').hide(), n.find('[data-splst-cf-arg-error="second"]').hide())
            }
        }
    }, n.ConditionalFormattingControl._checkIfArgHasError = function(n, t, i) {
        var a = n.closest(t),
            v = n.parent().find(".splst-cf-error"),
            f = a.find(".splst-cf-error-container"),
            h = f.find("span"),
            c = n.val(),
            r = f.attr("data-splst-cf-error-in"),
            l = !1,
            e = !!r,
            y = SPLST.ListTableLayoutEditor.ConditionalFormattingControl._getDigitTestRegExp(),
            p = !c || y.test(c.trim()),
            u, o, w, s;
        p ? r && (u = r.split("|"), o = u.indexOf(i), o !== -1 && (u = u.splice(o + 1, 1), r = u.join("|"), e = !!u.length)) : (l = !0, e = !0, r ? r.indexOf(i) === -1 && (r += "|" + i) : r = i);
        f.attr("data-splst-cf-error-in", r);
        v[l ? "show" : "hide"]();
        f[e ? "show" : "hide"]();
        e && !h.text() && (w = SPLST.ListTableLayoutEditor, s = SPLST.ListTableLayoutEditor.ConditionalFormattingControl._getDigitSeparators(), h.text(String.format(SPLST.ListTableLayoutEditor.locale.messages.conditionalFormatting.digitFormatError, s.decimal, s.thousand)))
    }, n.ConditionalFormattingControl._formatDigit = function(n) {
        if (n) {
            for (var i = /(\d+)(\d{3})/, r = n.split("."), t = r[0], u = r[1], f = this._getDigitSeparators(); i.test(t);) t = t.replace(i, "$1" + f.thousand + "$2");
            return u ? t + f.decimal + u : t
        }
    }, n.ConditionalFormattingControl.updateItemsCount = function(n) {
        var t = SPLST.ListTableLayoutEditor,
            r = n._getCLVP(),
            s = n.getIsQueryEnabled(),
            e = !!this.getFieldNameWithFlagSet(n, "processAllPages", !0) || !!this.getFieldNameWithFlagSet(n, "processAllPages", !1),
            h = n.getView(),
            u = n.viewId.toLowerCase(),
            c = h.get_paged(),
            o = !c || e,
            l = o || !s,
            f = new jQuerySplst.Deferred,
            i;
        if (o && t.viewItems && t.viewItems[u]) {
            i = t.viewItems[u];
            n.cfViewItems = i.viewItems;
            n.viewItems = n.cfViewItems;
            n.loadedFields = i.loadedFields;
            n.splittedCaml = i.splittedCaml;
            delete t.viewItems[u];
            return
        }
        return r && r.ctx && r.ctx.completedSearchTerm ? f.resolve() : n.updateItemsCount(function(t, i) {
            n.cfViewItems = t;
            n.loadedFields = i;
            l && (n.viewItems = t);
            f.resolve()
        }, e, this), f
    }, n.ConditionalFormattingControl.onChange = function(n) {
        var t = jQuerySplst(".splst-lb-cf");
        t.attr("data-has-changes", !0);
        SPLST.ListTableLayoutEditor.setColSettingsDialogOkButtonAvailability(t.data("disabled"));
        n || SPLST.ListTableLayoutEditor.ConditionalFormattingControl._convertGlobalRulesToLocal()
    }, n.ConditionalFormattingControl.clearColumnSettingsDialogResources = function() {
        var n = jQuerySplst("#splstPBStartDatePickerFrame, #splstPBEndDatePickerFrame, [id*=splstRuleSecondArgDatePickerFrame]");
        n.remove()
    }, n.ConditionalFormattingControl._hasGlobalRules = function() {
        return !!jQuerySplst(".splst-lb-cf .splst-cond-formatting-ruleContainer.global").length
    }, n.ConditionalFormattingControl._convertGlobalRulesToLocal = function() {
        var n = jQuerySplst(".splst-lb-cf"),
            t;
        n.data("are-local-changes") === !0 && n.data("has-manage-perms") === !0 && this._hasGlobalRules() && (t = jQuerySplst(".splst-lb-cf .splst-cond-formatting-ruleContainer.global"), t.each(function(n, t) {
            jQuerySplst(t).removeClass("global").addClass("local")
        }))
    }, n.ConditionalFormattingControl.fixAggregatedStyles = function(n, t, i, r) {
        var f = SPLST.ListTableLayoutEditor.Helper,
            u;
        if (!n.sessionSettings.hasManageListsPermissions || !t || !i || f.isEmptyObject(i) || !r || f.isEmptyObject(r)) return t;
        for (u in t) t.hasOwnProperty(u) && i[u] && i[u].rules && (t[u].rules = i[u].rules);
        return t
    }, n.ConditionalFormattingControl.onClientDataChanging = function(n) {
        for (var h, i, c, p = n.styles, t = n.layoutEditor, f = SPLST.ListTableLayoutEditor.ConditionalFormattingTypes, tt = this, e = [], w = SPLST.ListTableLayoutEditor, o = t.table.rows, b = o.length, k = b ? o[0].cells.length : 0, l, r, a = t.isEditMode, v = a && t._ganttControl.get_Columns(), s = n.deleted, it = s ? s.length : 0, u = 0; u < k; u++)(l = jQuerySplst(o[0].cells[u]), a ? r = v[u - 1] ? v[u - 1].columnKey : "" : (h = l.find("div[name]"), h && (r = h.attr("name"))), r) && (r = w.Helper.getStoredName(r), i = p[r], i && i.cfType !== f.none && (i.cfType || i.rules) && (i.cfType !== f.rules || i.rules) && (i.cfType !== f.pb || i.pb)) && (e.push({
            colIndex: u,
            fieldName: r,
            style: i
        }), this.removePrevStyles(t, r, u, s, i.styleRowByRules));
        if (n.added && n.added.length) {
            var rt = t._getCLVP(),
                ut = t.getIsQueryEnabled(),
                y = !!this.getFieldNameWithFlagSet(t, "processAllPages", !0) || !!this.getFieldNameWithFlagSet(t, "processAllPages", !1),
                d = t.getView(),
                ft = t.viewId.toLowerCase(),
                g = d.get_paged(),
                nt = !g || y;
            if (nt) this._setAddedStyles(t, e, n.added);
            else return c = new jQuerySplst.Deferred, t.updateItemsCount(function(i, r) {
                t.cfViewItems = i;
                t.loadedFields = r;
                this._setAddedStyles(t, e, n.added);
                c.resolve()
            }, y, this), c
        }
    }, n.ConditionalFormattingControl._setAddedStyles = function(n, t, i) {
        var r, u, f;
        if (i && i.length && t && t.length) {
            var o = n.getClientDataHelper(),
                s = o.getPageItemsIndexesByClientIndexes(n.cfViewItems, i),
                h = i.slice().sort(function(n, t) {
                    return n - t
                }),
                e = new Array(h[i.length - 1]);
            for (r = 0, u = i.length; r < u; r++) e[i[r]] = s[r];
            for (r = 0, u = t.length; r < u; r++) f = t[r], this._setColumnStyles(f.style, n, f.fieldName, f.colIndex, e);
            n.refresh()
        }
    }, n.AdvancedColumnSettingsModule = function(n) {
        n = n || {};
        return {}
    }, n.AdvancedColumnSettingsModule.getColumnSettingsHTML = function(n) {
        var i = SPLST.ListTableLayoutEditor,
            t = i.locale.messages.advancedColSettings,
            r = '<div class="splst-lb-advanced"><div class="splst-lb-advanced-visibility"><div class="splst-lb-advanced-section-header"><span class="splst-lb-section-header">' + t.visibilityHeader + '<\/span><\/div><div class="splst-lb-switch"><label><input type="radio" name="visibilityType" value="all" id="splst-lb-advanced-visibility-type-all" checked="true" />' + t.allUsers + '<\/label><label><input type="radio" name="visibilityType" value="specific" id="splst-lb-advanced-visibility-type-specific" />' + t.specificUsers + '<\/label><\/div><div class="splst-lb-advanced-visibility-user-select" style="display: none;"><div><span>' + t.selectUsers + '<\/span><\/div><div class="splst-lb-advanced-visibility-picker" id="visibilityPeoplePicker"><\/div><\/div><\/div><\/div>';
        n.one({
            "layouteditorplugin:columnSettingsDialogOpened": this.onColumnSettingsDialogOpened
        });
        return r
    }, n.AdvancedColumnSettingsModule.onColumnSettingsDialogOpened = function(n, t) {
        var f = SPLST.ListTableLayoutEditor,
            h = n.currentTarget,
            u = f.AdvancedColumnSettingsModule.getTabData(h),
            e;
        if (u.isVisible) {
            if (u.isDisabled) {
                e = jQuerySplst('li[aria-controls="' + u.id + '"]');
                e.attr("title", f.locale.messages.advancedColSettings.tabTooltip);
                return
            }
            var r = jQuerySplst(".splst-lb-advanced"),
                o = r.find("input[type=radio][name=visibilityType]"),
                s = r.find(".splst-lb-advanced-visibility-user-select"),
                i = null;
            r.data("disabled", t.isDisabled);
            o.click(function(n) {
                var i = n.currentTarget;
                s[i.value === "all" ? "hide" : "show"]();
                r.attr("data-has-changes", !0);
                SPLST.ListTableLayoutEditor.setColSettingsDialogOkButtonAvailability(t.isDisabled)
            });
            SPLST.ListTableLayoutEditor.loadScripts(["clienttemplates.js", "clientforms.js", "clientpeoplepicker.js", "autofill.js", "sp.js", "sp.runtime.js", "sp.core.js"]).then(function() {
                var n = {},
                    f, u, e;
                if (n.PrincipalAccountType = "User,SPGroup", n.SearchPrincipalSource = 15, n.ResolvePrincipalSource = 15, n.AllowMultipleValues = !0, n.MaximumEntitySuggestions = 50, n.Width = "100%", window.SPClientPeoplePicker_InitStandaloneControlWrapper("visibilityPeoplePicker", null, n), f = window.SPClientPeoplePicker.SPClientPeoplePickerDict.visibilityPeoplePicker_TopSpan, t.columnStyle && t.columnStyle.advanced && (i = t.columnStyle.advanced.visibleFor, i && i.length))
                    for (s.show(), o[1].checked = !0, u = 0, e = i.length; u < e; u++) f.AddUnresolvedUser({
                        Key: i[u]
                    }, !0);
                f.OnValueChangedClientScript = function(n, u) {
                    var o = !0,
                        e, f, s;
                    if (i && i.length == u.length) {
                        for (e = !0, f = 0, s = u.length; f < s; f++)
                            if (i.indexOf(u[f].Key) === -1) {
                                e = !1;
                                break
                            }
                        o = !e
                    }
                    o && (r.attr("data-has-changes", !0), SPLST.ListTableLayoutEditor.setColSettingsDialogOkButtonAvailability(t.isDisabled))
                }
            })
        }
    }, n.AdvancedColumnSettingsModule.hasColumnSettingsChanges = function() {
        var n = jQuerySplst(".splst-lb-advanced");
        return n.attr("data-has-changes") === "true"
    }, n.AdvancedColumnSettingsModule.getTabData = function(n) {
        return {
            title: SPLST.ListTableLayoutEditor.locale.messages.advancedColSettings.columnSettingsTabTitle,
            id: "splst_lb_column_advanced",
            height: 200,
            width: parseInt(SPLST.ListTableLayoutEditor.locale.styles.advancedTab.width) || 508,
            isDisabled: !1,
            isVisible: n.sessionSettings.hasManageListsPermissions
        }
    }, n.AdvancedColumnSettingsModule.collectColumnSettingsDialogData = function() {
        var f = document.querySelector("#splst-lb-advanced-visibility-type-all"),
            i = {},
            t, o, u;
        if (!f) return i;
        if (f.checked) return {
            advanced: {}
        };
        var s = window.SPClientPeoplePicker.SPClientPeoplePickerDict.visibilityPeoplePicker_TopSpan,
            e = s.GetAllUserInfo(),
            n = null,
            r = [];
        for (t = 0, o = e.length; t < o; t++) u = e[t], u.Resolved && r.push(u.Key);
        return r.length && (n || (n = {}), n.visibleFor = r), n && (i.advanced = n), i
    }, n.AdvancedColumnSettingsModule.fixAggregatedStyles = function(n, t, i, r) {
        var f = SPLST.ListTableLayoutEditor.Helper,
            u;
        if (!t || !i || f.isEmptyObject(i) || !r || f.isEmptyObject(r)) return t;
        for (u in t) t.hasOwnProperty(u) && i[u] && i[u].advanced !== undefined && (t[u].advanced = i[u].advanced);
        return t
    }, n.AdvancedColumnSettingsModule.fixColAggregatedStyles = function() {}, n.AdvancedColumnSettingsModule.mergeStyles = function(n, t, i) {
        var r = SPLST.ListTableLayoutEditor,
            u = r.Helper;
        return i.advanced = u.updateStylesObj(n.advanced, t.advanced), i
    }, n.AdvancedColumnSettingsModule.initStyles = function(n, t) {
        var u = jQuerySplst.Deferred(),
            i, r;
        if (n && t) return (i = [], r = {}, jQuerySplst.each(n, function(n, t) {
            t.advanced && (i.push(n), r[n] = {
                advanced: t.advanced
            })
        }), !i.length) ? void 0 : (jQuerySplst.when(SPLST.ListTableLayoutEditor.AdvancedColumnSettingsModule.setStyles(r, t)).then(function() {
            u.resolve()
        }), u)
    }, n.AdvancedColumnSettingsModule.setStyles = function(n, t) {
        var r, f, l;
        if (n && t && !t.isDisposed) {
            var e = jQuerySplst.Deferred(),
                a = SPLST.ListTableLayoutEditor,
                u = t.table.rows,
                v = u.length,
                y = v ? u[0].cells.length : 0,
                o, i, s = t.isEditMode,
                h = s && t._ganttControl.get_Columns(),
                c = [];
            for (r = 0; r < y; r++) o = jQuerySplst(u[0].cells[r]), s ? i = h[r - 1] ? h[r - 1].columnKey : "" : (f = o.find("div[name]"), f && (i = f.attr("name"))), i && (i = a.Helper.getStoredName(i), l = n[i], c.push(this.setColumnStyles(l, t, i, r)));
            return jQuerySplst.when.apply(jQuerySplst, c).then(function() {
                e.resolve()
            }), e
        }
    }, n.AdvancedColumnSettingsModule.setColumnStyles = function(n, t, i, r) {
        var c;
        if (n && t && !this.isVisibleForUser(n.advanced)) {
            var s = SPLST.ListTableLayoutEditor,
                u = s.Helper,
                f = u.stylesheets.basic,
                l = t.isEditMode,
                e = "." + t.tableCssClassName,
                a = t.$tbodyWrap || t.$table.find("tbody").length > 1,
                v = e + " > thead > tr:nth-child(1) > th:nth-child(" + (r + 1) + ")",
                y = e + " > tbody > tr:nth-child(1) > th:nth-child(" + (r + 1) + ")",
                p = e + " > tbody:not([groupstring]) > tr > td:nth-child(" + (r + 1) + ")",
                w = jQuerySplst(t.table.rows[0].cells[r]),
                b = w.innerWidth(),
                o = {
                    display: "none !important;",
                    padding: "0px !important;",
                    border: "0px !important;"
                },
                h = t.table.offsetWidth - b,
                k = s.scrollbarWidth === -1 ? 0 : s.scrollbarWidth;
            t.$table.outerWidth(h);
            t.groupedCell && jQuerySplst(t.groupedCell).outerWidth(h - k);
            t.cellSizes && (t.cellSizes[r] = 0);
            u.addCssRule(f, v, o);
            u.addCssRule(f, y, o);
            u.addCssRule(f, p, o);
            !l && a && (c = e + ' > tbody[data-splst-wrap="true"] > tbody:not([groupstring]) > tr > td:nth-child(' + (r + 1) + ")", u.addCssRule(f, c, o))
        }
    }, n.AdvancedColumnSettingsModule.isVisibleForUser = function(n) {
        var i, r, u, t, f, e;
        if (!n || !n.visibleFor || !n.visibleFor.length || (i = n.visibleFor, r = SPLST.ListTableLayoutEditor.currentUser, i.indexOf(r.get_loginName()) !== -1)) return !0;
        for (u = r.get_groups(), t = 0, f = u.get_count(); t < f; t++)
            if (e = u.get_item(t).get_loginName(), i.indexOf(e) !== -1) return !0;
        return !1
    }, n.AdvancedColumnSettingsModule.switchStylesScope = function(n, t) {
        if (n && !t) {
            var i = SPLST.ListTableLayoutEditor,
                r = i.Helper;
            jQuerySplst.each(n, function(n, t) {
                (!t.advanced || r.isEmptyObject(t.advanced)) && delete t.advanced
            })
        }
    }, n.LayoutEditorPlugin = function(n) {
        var r = function() {
            var n = SPLST.ListTableLayoutEditor;
            return n.disableFeatures && n.licenseExpirationDate && n.getLicenseLeftDays() <= 0
        };
        if (n = n || {}, !n && !n.table) return null;
        var t = SPLST.ListTableLayoutEditor.Helper,
            h = SPLST.ListTableLayoutEditor.ConditionalFormattingControl,
            c = SPLST.ListTableLayoutEditor.AdvancedColumnSettingsModule,
            u = {},
            e = {
                viewerEditOptions: {
                    width: !0,
                    columnStyles: !0,
                    tableStyles: !0,
                    freezePane: !0,
                    configurePrint: !0
                },
                customPaging: !0,
                showDocLibraryQuickEditLink: !0
            },
            o = {
                freezeHeader: {
                    state: "inherit"
                }
            },
            s = 5,
            f = {
                table: n.table,
                imgBaseUrl: n.imgBaseUrl || "",
                enabled: !1,
                needToHide: !0,
                isEditMode: !!n.isEditMode,
                parentTable: n.parentTable,
                phantoms: [],
                sessionSettings: {
                    areLocalChanges: !0,
                    changeColumnBackgroundColor: !0,
                    changeColumnFontColor: !1,
                    hasManageListsPermissions: !1,
                    isPersonalView: !1
                },
                handledHeaderCells: {},
                listFields: {},
                loadedFields: null,
                splittedCaml: null,
                viewItems: null,
                cfViewItems: null,
                listTemplate: -1,
                clvp: null,
                hasGrouping: !1,
                clientData: {},
                onPostRenderProxy: null,
                cellSizes: null,
                clientDataHelper: null,
                importedListSettings: null,
                importedStyles: null,
                isExportEnabled: undefined,
                hasLocalChanges: !1,
                colgroup: null,
                cols: null,
                _executeQuery: function(n, t) {
                    var i = SPLST.ListTableLayoutEditor,
                        r = i.spContext;
                    this._queryExecuting || (this._queryExecuting = !0, r.executeQueryAsync(jQuerySplst.proxy(function(t, i) {
                        this._queryExecuting = !1;
                        n && n.call(this, t, i);
                        this._executeQueriesFromQueue()
                    }, this), jQuerySplst.proxy(function(n, i) {
                        this._queryExecuting = !1;
                        t && t.call(this, n, i);
                        this._executeQueriesFromQueue()
                    }, this)))
                },
                executeQueryAsync: function(n, t) {
                    this._queryExecuting ? this._addItemToQueue(n, t) : this._updateCounter ? (n && this.addSuccessBatchQueryExecutionHandler(n), t && this.addFailBatchQueryExecutionHandler(t)) : this._executeQuery(n, t)
                },
                onBatchQueryExecuted: function(n, t, i) {
                    var r, u, f;
                    if (r = n ? this.successBatchHandlers : this.failBatchHandlers, r)
                        for (u = 0, f = r.length; u < f; u++) r[u].call(this, t, i);
                    delete this.failBatchHandlers;
                    delete this.successBatchHandlers
                },
                addSuccessBatchQueryExecutionHandler: function(n) {
                    n && (this.successBatchHandlers || (this.successBatchHandlers = []), this.successBatchHandlers.push(n))
                },
                addFailBatchQueryExecutionHandler: function(n) {
                    n && (this.failBatchHandlers || (this.failBatchHandlers = []), this.failBatchHandlers.push(n))
                },
                beginUpdate: function() {
                    this._updateCounter ? this._updateCounter++ : this._updateCounter = 1
                },
                endUpdate: function() {
                    if (this._updateCounter && (this._updateCounter--, !this._updateCounter)) {
                        var n = jQuerySplst.proxy(function(n, t) {
                                this.onBatchQueryExecuted(!0, n, t)
                            }, this),
                            t = jQuerySplst.proxy(function(n, t) {
                                this.onBatchQueryExecuted(!1, n, t)
                            }, this);
                        this._executeQuery(n, t)
                    }
                },
                _addItemToQueue: function(n, t) {
                    this._queryQueue || (this._queryQueue = []);
                    this._queryQueue.push({
                        success: n,
                        fail: t
                    })
                },
                _executeQueriesFromQueue: function() {
                    if (this._queryQueue && this._queryQueue.length && !this._queryExecuting) {
                        var n = this._queryQueue;
                        delete this._queryQueue;
                        this.beginUpdate();
                        jQuerySplst.each(n, jQuerySplst.proxy(function(n, t) {
                            this.executeQueryAsync(t.success, t.fail)
                        }, this));
                        this.endUpdate()
                    }
                },
                _callOnce: function(n, t, i) {
                    var r, u;
                    this._calledOnce || (this._calledOnce = {});
                    r = this._calledOnce[n];
                    r && clearTimeout(r);
                    u = this;
                    this._calledOnce[n] = setTimeout(function(n, t, i) {
                        delete u._calledOnce[n];
                        t.apply(u, i)
                    }, 100, n, t, i)
                },
                removeEditLinkForDocLibrary: function() {
                    var t, r, u;
                    if (this.table && this.$table.attr("id").startsWith("onetidDoclib") && !this.isEditMode && window.g_SPGridInitInfo && g_SPGridInitInfo[this.viewId] && (t = this.$table.parent().find('[id^="Hero-"]'), t)) {
                        var f = this.viewId,
                            n = t.find("td.ms-list-addnew"),
                            i = n && n.children()[0];
                        i && (i.tagName.toLowerCase() === "a" ? (r = n.find(".splst-layout-editor-edit-doclib"), r.length && r.remove()) : i.tagName.toLowerCase() === "div" && (u = n.find("button.splst-layout-editor-edit-doclib"), u.length && u.remove()))
                    }
                },
                renderEditLinkForDocLibrary: function() {
                    var u, i, r;
                    if (this.table && this.$table.attr("id").startsWith("onetidDoclib") && !this.isEditMode && window.g_SPGridInitInfo && g_SPGridInitInfo[this.viewId] && (u = this.$table.parent().find('[id^="Hero-"]'), u)) {
                        var e = this.viewId,
                            n = u.find("td.ms-list-addnew"),
                            f = n && n.children()[0],
                            h = SPLST.ListTableLayoutEditor,
                            t = h.locale.messages;
                        if (f)
                            if (f.tagName.toLowerCase() === "a") {
                                if (i = n.find(".splst-layout-editor-edit-doclib"), !i.length) {
                                    var o = n.children(),
                                        c = o.length,
                                        l = jQuerySplst(o[c - 1]);
                                    i = jQuerySplst("<a class=\"ms-heroCommandLink splst-layout-editor-edit-doclib\" href=\"javascript:;\" onclick=\"EnsureScriptParams('inplview', 'InitGridFromView', '" + e + '\'); return false;" title="' + t.editLibraryHint + '">' + t.editLibraryWithComma + "<\/a>");
                                    i.insertAfter(l)
                                }
                            } else if (f.tagName.toLowerCase() === "div" && (r = n.find("button.splst-layout-editor-edit-doclib"), !r.length)) {
                            var a = n.find(".ms-qcb-leftzone"),
                                s = jQuerySplst('<li class="ms-qcb-item"><\/li>'),
                                v = n.find(".js-listview-qcbUploadButton"),
                                y = v.attr("class").replace("js-listview-qcbUploadButton", "").replace("js-callout-launchPoint", ""),
                                r = jQuerySplst('<button class="' + y + ' splst-layout-editor-edit-doclib" type="button" title="' + t.editLibraryHint + '" role="button" aira-expanded="false"><span class="ms-qcb-glyph ms-listview-glyph-withmargin ms-core-form-heading">&#57630;<\/span>' + t.editLibrary + '<span class="ms-qcb-glyph"><\/span><\/button>');
                            r.click(function() {
                                EnsureScriptParams("inplview", "InitGridFromView", e)
                            });
                            s.append(r);
                            a.append(s)
                        }
                    }
                },
                render: function() {
                    var n = SPLST.ListTableLayoutEditor,
                        ot = n.Helper,
                        f = this.isEditMode,
                        l = this.sessionSettings.hasManageListsPermissions,
                        e = this.pluginSettings.viewerEditOptions,
                        tt = this.getIsMenuVisible() && (l || e.width || e.columnStyles || e.tableStyles || e.freezePane || e.configurePrint),
                        st = this.pluginSettings.customPaging,
                        o = this.table,
                        i = this.$table,
                        ti = this.$table.attr("id").startsWith("onetidDoclib") && window.g_SPGridInitInfo && g_SPGridInitInfo[this.viewId],
                        p = this._getCLVP(),
                        w = this.getIsQueryEnabled(),
                        u = n.locale.messages,
                        it = n.isEdge(),
                        b, a, h, v, rt, s, y;
                    if (o) try {
                        if (n.trace && n.logInfo(this, "Rendering List Booster... LB rendered: " + !!this.isRendered + "; LB disposed: " + !!this.isDisposed), l && this.pluginSettings.showDocLibraryQuickEditLink && this.renderEditLinkForDocLibrary(), f ? this._gridControl.RefreshAllRows() : (b = jQuerySplst(o.rows[0]).find("span.ms-addcolumn-span"), b.length && (a = 0, h = this, jQuerySplst.each(b, function(n, t) {
                                var r = jQuerySplst(t.parentNode),
                                    u = r[0],
                                    f = u.offsetWidth,
                                    i = u.cellIndex,
                                    e;
                                h.cellSizes && h.cellSizes[i] && (h.cellSizes[i] = 0);
                                r.remove();
                                f > a && (a = f);
                                it && (e = h.cols[i], h.colgroup.removeChild(e))
                            }), i.outerWidth(i.outerWidth() - a)), this.view.get_aggregationsStatus() === "On" && p && p.ctx && p.ctx.ListSchema.TabularView != "1" && (v = o.querySelector("tbody[id^=aggr]").rows[0], rt = v.cells[v.cells.length - 1].offsetWidth, i.outerWidth(i.outerWidth() - rt), v.deleteCell(0)), ot.fixColSpans(o)), this._getSizeInfoForGroupingFix(), !tt && !(st && w && this._isPaged()) && !n.isTrial) {
                            n.showTable(o, f ? this.parentTable : null, !0);
                            n.trace && n.logInfo(this, "List Booster shouldn't be rendered. Menu visible setting is " + this.getIsMenuVisible() + "; Has Manage List Perms: " + this.sessionSettings.hasManageListPermissions + "; Viewer Edit Options: " + JSON.stringify(e));
                            return
                        }
                        i.addClass(this.tableCssClassName);
                        i.addClass(n.PROPERTY_BAG_PREFIX + "table");
                        it && i.addClass("lb-edge");
                        s = "";
                        n.isTrial ? n.trialLeftDays && n.trialLeftDays <= 0 && (s = u.trialExpired) : n.licenseExpirationDate && (y = n.getLicenseLeftDays(), y <= 0 ? s = u.licenseExpired : y <= n.licExpDaysCnt && (s = u.licenseExpiring.replace("{0}", y)));
                        var ii = i.position(),
                            ri = f ? i.find("tr:first-of-type").height() : i.find("thead").height(),
                            t = this.$el = jQuerySplst('<div class="splst-layout-editor-plugin"><\/div>'),
                            ut = this.$activationEl = jQuerySplst("<a data-lb-id='lb-menu' class='ms-heroCommandLink' href='javascript:;' style='cursor: pointer; line-height: 30px;'><span class='splst-layout-editor-plugin-menu-icon with-text'>&#xf116;<\/span><span class='splst-layout-editor-plugin-name'>" + u.pluginName + "<\/span><\/a>"),
                            ht = this.$activationArrowEl = jQuerySplst('<span class="splst-layout-editor-activation-arrow">' + u.pluginDeactivatedArrow + "<\/span>"),
                            ct = this.$settingsEl = jQuerySplst("<a class='ms-heroCommandLink' id='lbsettingssplitmenu-" + this.viewId.slice(1, -1) + "' href='javascript:;' style='cursor: pointer; margin-left: 15px; display: none;'><span class='splst-layout-editor-plugin-menu-icon'>&#xf124;<\/span><\/a>"),
                            lt = this.$settingsScopeTextEl = jQuerySplst('<span style="display: none;" class="splst-layout-editor-scope">' + u.customStyles + "<\/span>"),
                            at = this.$settingsScopeLearnMoreEl = jQuerySplst("<a class='ms-heroCommandLink' style='display: none;' href='javascript:;' style='cursor: pointer; line-height: 30px;'><\/a>"),
                            vt = this.$clearAllEl = jQuerySplst("<a data-lb-id='clear-all-btn' class='ms-heroCommandLink' href='javascript:;' style='cursor: pointer; margin-left: 15px; display: none;'><span class='splst-layout-editor-plugin-menu-icon with-text'>&#xf11f;<\/span><span>" + u.clearAllChangesLinkText + "<\/span><\/a>"),
                            yt = this.viewId.slice(1, -1) + "_splst_top_paging",
                            ft = this.$topPagingEl = jQuerySplst('<div id="' + yt + '" style="display: inline-block;"><div class="splst-lb-loader"><\/div><\/div>'),
                            pt = this.$formatTableEl = jQuerySplst("<a data-lb-id='format-table-btn' class='ms-heroCommandLink' href='javascript:;' style='cursor: pointer; margin-left: 15px; display: none;'><span class='splst-layout-editor-plugin-menu-icon with-text'>&#xf120;<\/span><span>" + u.formatAsTable + "<\/span><\/a>"),
                            k, et = this.$trialEl = jQuerySplst('<span class="splst-layout-editor-trial">' + s + "<\/span>"),
                            wt = this.$aboutEl = jQuerySplst("<a data-lb-id='about-btn' class='ms-heroCommandLink' href='javascript:;' style='cursor: pointer; margin-left: 15px; display: none;'><span class='splst-layout-editor-plugin-menu-icon'>&#xf125;<\/span><\/a>"),
                            bt = this.$freezePaneIconEl = jQuerySplst("<span class='splst-layout-editor-plugin-menu-icon with-text'>&#xf145;<\/span>"),
                            kt = this.$freezePaneTextEl = jQuerySplst("<span>" + u.freezePane.iconTextFreeze + "<\/span>"),
                            d = this.$freezePaneSplitBtnEl = jQuerySplst("<a data-lb-id='freeze-pane-split-btn' class='ms-heroCommandLink splst-lb-split-btn" + (n.isFF ? " splst-lb-ff" : "") + (n.isMac ? " splst-lb-mac" : "") + "' href='javascript:;' style='cursor: pointer;'><\/a>"),
                            dt = this.$freezePaneSplitMenuArrowEl = jQuerySplst("<a data-lb-id='freeze-pane-split-menu' id='lbsplitmenu-" + this.viewId.slice(1, -1) + "' class='ms-heroCommandLink splst-lb-menu-arrow" + (n.isFF && !n.isMac ? " splst-lb-ff" : "") + "' href='javascript:;'><span>" + u.menuArrow + "<\/span><\/a>"),
                            g = this.$freezePaneEl = jQuerySplst("<div class='splst-lb-split' style='display: none;'><\/div>"),
                            nt = this.$printSplitBtnEl = jQuerySplst("<a data-lb-id='print-btn' class='ms-heroCommandLink splst-lb-split-btn" + (n.isFF ? " splst-lb-ff" : "") + (n.isMac ? " splst-lb-mac" : "") + "' href='javascript:;' style='cursor: pointer;'><span class='splst-layout-editor-plugin-menu-icon'>&#xf147;<\/span><\/a>"),
                            gt = this.$printSplitMenuArrowEl = jQuerySplst("<a id='lbprintsplitmenu-" + this.viewId.slice(1, -1) + "' class='ms-heroCommandLink splst-lb-menu-arrow" + (n.isFF && !n.isMac ? " splst-lb-ff" : "") + "' href='javascript:;'><span>" + u.menuArrow + "<\/span><\/a>"),
                            c = this.$printEl = jQuerySplst("<div class='splst-lb-split' style='display: none;'><\/div>");
                        d.append(bt);
                        d.append(kt);
                        g.append(d);
                        g.append(dt);
                        l || e.configurePrint ? (c.append(nt), c.append(gt)) : (c = this.$printEl = nt, nt.css({
                            display: "none",
                            "margin-left": "15px"
                        }));
                        this._setSettingsScopeText();
                        f ? this.$parentTable.before(t) : this.$table.before(t);
                        tt ? (ut.append(ht), t.append(ut), w && t.append(ft), n.ResizersControl ? t.append(pt) : delete this.$formatTableEl, f || r() ? (delete this.$freezePaneEl, delete this.$freezePaneIconEl, delete this.$freezePaneSplitBtnEl, delete this.$freezePaneSplitMenuArrowEl, delete this.$freezePaneTextEl) : (t.append(g), jQuerySplst.contextMenu({
                            selector: "#lbsplitmenu-" + this.viewId.slice(1, -1),
                            trigger: "left",
                            build: jQuerySplst.proxy(this.buildFreezeHeaderCM, this)
                        })), t.append(vt), t.append(lt), t.append(at), l && (t.append(ct), jQuerySplst.contextMenu({
                            selector: "#lbsettingssplitmenu-" + this.viewId.slice(1, -1),
                            trigger: "left",
                            build: jQuerySplst.proxy(this.buildSettingsCM, this)
                        })), t.append(c), t.append(wt), s && c.before(et), jQuerySplst.contextMenu({
                            selector: "#lbprintsplitmenu-" + this.viewId.slice(1, -1),
                            trigger: "left",
                            build: jQuerySplst.proxy(this.buildPrintCM, this)
                        })) : (w && t.append(ft), s && t.append(et));
                        k = this.isEditMode ? this.$parentTable.parent().closest("table").parent().find(".ms-bottompaging") : i.parent().closest("table").parent().find(".ms-bottompaging");
                        k.length && (this.$defaultPagingEl = k);
                        this.bindEvents();
                        n.trace && n.logInfo(this, "Menu is rendered. Showing data...");
                        n.showTable(o, f ? this.parentTable : null);
                        this.isRendered = !0;
                        n.trace && n.logInfo(this, "Rendering is completed")
                    } catch (ni) {
                        this._onError(ni.message);
                        n.showTable(o, f ? this.parentTable : null)
                    }
                },
                buildPrintCM: function() {
                    var t = SPLST.ListTableLayoutEditor,
                        i = t.locale.messages,
                        n = {};
                    return n.selectColumns = {
                        name: i.printSetup
                    }, {
                        className: "splst-lb-freeze-menu",
                        zIndex: 99,
                        reposition: !1,
                        items: n,
                        position: function(n) {
                            n.$menu.position({
                                my: "right top",
                                at: "right bottom",
                                of: this
                            })
                        },
                        callback: jQuerySplst.proxy(this.onPrintCMItemSelected, this)
                    }
                },
                buildSettingsCM: function() {
                    var i = SPLST.ListTableLayoutEditor,
                        r = this.$table.attr("id").startsWith("onetidDoclib") && window.g_SPGridInitInfo && g_SPGridInitInfo[this.viewId],
                        u = this.getIsQueryEnabled(),
                        t = i.locale.messages,
                        n = {};
                    return n.currentViewSettings = {
                        name: t.currentViewSettings
                    }, n.viewsSettings = {
                        name: t.viewsSettings
                    }, n.lbSettings = {
                        name: t.lbSettings
                    }, {
                        className: "splst-lb-freeze-menu",
                        zIndex: 99,
                        reposition: !1,
                        items: n,
                        position: function(n) {
                            n.$menu.position({
                                my: "right top",
                                at: "right bottom",
                                of: this
                            })
                        },
                        callback: jQuerySplst.proxy(this.onSettingsCMItemSelected, this)
                    }
                },
                buildFreezeHeaderCM: function() {
                    var u = SPLST.ListTableLayoutEditor,
                        r = u.locale.messages.freezePane,
                        f = this.sessionSettings.areLocalChanges,
                        n = u.FREEZE_STATES,
                        e = this.getFreezedHeader(),
                        t = {},
                        i;
                    return f && (t[n.inherit] = {
                        name: r.inherit
                    }), t[n.auto] = {
                        name: r.freezeAuto
                    }, t[n.fixed] = {
                        name: r.freezeFixed,
                        type: "spinner",
                        key: n.fixed,
                        postfix: "px",
                        value: 300
                    }, t[n.unfreeze] = {
                        name: r.unfreeze
                    }, i = f ? this.localOptions && this.localOptions.freezeHeader && this.localOptions.freezeHeader.state || n.inherit : this.globalOptions && this.globalOptions.freezeHeader && this.globalOptions.freezeHeader.state || n.unfreeze, i === n.fixed && (t[i].value = e.height), t[i].className = "splst-lb-freeze-menu-selected", t[i].icon = "checked", {
                        className: "splst-lb-freeze-menu",
                        zIndex: 99,
                        reposition: !1,
                        items: t,
                        position: function(n) {
                            n.$menu.position({
                                my: "right top",
                                at: "right bottom",
                                of: this
                            })
                        },
                        callback: jQuerySplst.proxy(this.onFreezeHeaderCMItemSelected, this)
                    }
                },
                getFreezedHeader: function() {
                    var t = SPLST.ListTableLayoutEditor,
                        i = this.isEditMode,
                        r = this.sessionSettings.areLocalChanges,
                        n;
                    return i ? null : (n = r && this.localOptions && this.localOptions.freezeHeader, n && n.state !== t.FREEZE_STATES.inherit || (n = this.globalOptions && this.globalOptions.freezeHeader), n)
                },
                refreshFreezedHeader: function(n) {
                    var i;
                    if (!this.isToggling && !r()) {
                        var o = this.$table,
                            u = SPLST.ListTableLayoutEditor,
                            f = u.FREEZE_STATES,
                            s = u.Helper,
                            e = this.isEditMode,
                            h = this.sessionSettings.areLocalChanges,
                            t = -1;
                        if (!e) {
                            if (i = this.getFreezedHeader(), i) switch (i.state) {
                                case f.auto:
                                    t = this._calcTableHeight();
                                    break;
                                case f.fixed:
                                    t = i.height
                            }
                            t === -1 ? this._unfreezeHeader() : this._freezeHeader(t, n)
                        }
                    }
                },
                _getBottomOffsets: function(n) {
                    var t = 0,
                        r = window.getComputedStyle(n[0]),
                        i;
                    return t = parseInt(r["padding-bottom"]) + parseInt(r["margin-bottom"]), i = n.parent(), i[0] !== this.$offsetParent[0] && (t += this._getBottomOffsets(i)), t
                },
                _getVScrollableParent: function() {
                    var n, t;
                    if (!this.$scrollableParent)
                        for (n = this.$table;;)
                            if (n = n.offsetParent(), t = n[0], t.tagName.toLowerCase() === "html" || t.id === "s4-workspace" || t.offsetHeight !== t.scrollHeight) {
                                this.$scrollableParent = n;
                                break
                            }
                    return this.$scrollableParent
                },
                _fixFixedHeight: function(n) {
                    var t = this.$table,
                        i = t.find("thead");
                    return n * 1.1 > this._getTableContentHeight() ? -1 : n
                },
                _calcTableHeight: function() {
                    var t = this.$table,
                        o = SPLST.ListTableLayoutEditor,
                        r = this._getVScrollableParent(),
                        s = t.offset().top - r.offset().top + r.scrollTop(),
                        u = r.height(),
                        h = t.find("thead"),
                        f = this.$defaultPagingEl,
                        n = -h.outerHeight(!0) - (f && f.length ? f.outerHeight(!0) : 0),
                        i, e;
                    return s < u ? (n += u - s, n -= this._getBottomOffsets(t)) : (i = this._getCLVP(), e = null, e = i && i.wpid ? t.closest("." + i.wpid) : t.parent(), n -= e.outerHeight(!0) - t.outerHeight(!0), n += u), n < o.minHeight && (n = o.minHeight), n
                },
                _getTableContentHeight: function() {
                    var n = null,
                        t = 0;
                    return n = this.$tbodyWrap ? this.$tbodyWrap.find("> tbody") : this.$table.find(" > tbody"), n.each(function(n, i) {
                        t += i.scrollHeight
                    }), t
                },
                _updateCellSizeCss: function(n, i) {
                    var r = "." + this.tableCssClassName + ":not(.lb-temp-table) " + SPLST.ListTableLayoutEditor.tbodySelector + " > tr > td:nth-child(" + (i + 1) + ")";
                    t.addCssRule(t.stylesheets.size, r, {
                        width: n + "px"
                    })
                },
                _freezeHeader: function(n, t) {
                    var u = this.$table,
                        p = SPLST.ListTableLayoutEditor,
                        at = p.isIE(),
                        ut = p.isMac,
                        a = p.isEdge(),
                        f = u.find("tr:first"),
                        wt = u.find("thead"),
                        i = this.$tbodyWrap || u.find("> tbody"),
                        vt, h, e, o, d, et, pt, c, it, v, rt, st, r, w, b, s, ht, l, ct, lt;
                    if (i.length) {
                        if (this.isHeaderFreezed) {
                            if (vt = parseInt(i.css("max-height")), vt !== n && i.css("max-height", n + "px"), t) {
                                if (h = this._getHeaderCellsWidths(!1), this.firstRowCells)
                                    for (r = 0, w = h.headerCellsWidths.length; r < w; r++) e = this.firstRowCells[r], o = h.headerCellsWidths[r], e && (a && (b = e.offsetWidth - parseInt(window.getComputedStyle(e).width), this.cols[r].setAttribute("width", o + "px"), this._updateCellSizeCss(o - b, r)), jQuerySplst(e).outerWidth(o));
                                this.groupedCell && jQuerySplst(this.groupedCell).outerWidth(h.totalWidth)
                            }
                            return
                        }
                        u.css("position") !== "relative" && u.outerWidth(u.outerWidth());
                        var k = f[0].cells,
                            yt = [],
                            ft = 0,
                            h = this._getHeaderCellsWidths(!0);
                        yt = h.headerCellsWidths;
                        ft = h.totalWidth;
                        ut || (d = p.getScrollbarWidth(), u.outerWidth(ft + d));
                        et = !1;
                        i.length > 1 && (et = !!i.filter("[groupstring]").length, pt = u.children(), i = jQuerySplst('<tbody data-splst-wrap="true"><\/tbody>'), u.append(i), pt.each(function(n, t) {
                            if (t.tagName.toLowerCase() !== "thead") {
                                var r = jQuerySplst(t);
                                r.detach();
                                r.appendTo(i)
                            }
                        }), this.$tbodyWrap = i);
                        var ot = {
                                position: "relative",
                                display: "block",
                                padding: "0px"
                            },
                            g = {
                                display: "block",
                                "overflow-y": ut ? "auto" : "scroll",
                                "max-height": n + "px",
                                "overflow-x": "hidden"
                            },
                            nt = "{ position: " + f.css("position") + " !important;  display: " + f.css("display") + " !important; padding: " + f.css("padding") + " !important;",
                            tt = "{ display: " + i.css("display") + " !important; overflow-y: " + i.css("overflow-y") + " !important; max-height: " + i.css("max-height") + " !important;";
                        if ((a || at) && (tt += " position: " + i.css("position") + " !important;"), at ? (g.position = "relative", window.splst_layout_editor_ie <= 9 && (ot.float = "left", ot.clear = "left", g.float = "left", g.clear = "left", nt += " float: " + f.css("float") + " !important; clear: " + f.css("clear") + " !important;", tt += " float: " + i.css("float") + " !important; clear: " + i.css("clear") + " !important;")) : !a && this.$tbodyWrap && this.$tbodyWrap.length && (nt += " float: left !important; clear: left !important;"), nt += " }", tt += " }", c = document.createElement("style"), c.setAttribute("media", "print"), it = "." + this.tableCssClassName, c.textContent = c.innerText = it + " > thead > tr " + nt + " " + it + " > tbody " + tt + " " + it + " th[data-splst-sc] { display: none !important; }", document.head.appendChild(c), this.freezeHeaderPrintCss = c, f.css(ot), i.css(g), et ? (st = i.find('tbody[isloaded="true"]'), st.length && (v = jQuerySplst(st[0]).find("tr:first")[0].cells), rt = i.find("tbody[groupstring]:first tr:first")[0].cells[0]) : v = i.find("tr:first")[0].cells, this.firstRowCells = v, v)
                            for (r = 0, w = k.length; r < w; r++) {
                                var y = k[r],
                                    e = v[r],
                                    o = yt[r];
                                y && e && (y.style["max-width"] && (y.style["max-width"] = ""), y.style.width || jQuerySplst(y).outerWidth(o), a && (b = e.offsetWidth - parseInt(window.getComputedStyle(e).width), this.cols[r].setAttribute("width", o + "px"), this._updateCellSizeCss(o - b, r)), jQuerySplst(e).outerWidth(o))
                            }
                        this.groupedCell = rt;
                        rt && jQuerySplst(rt).outerWidth(ft);
                        ut || (s = jQuerySplst(k[k.length - 1]).clone(), s.text(""), s.css("padding", "0px"), s.attr("data-splst-sc", "true"), s.outerWidth(d), f.append(s), this.$scrollCell = s, a && (ht = document.createElement("col"), this.colgroup.appendChild(ht), ht.setAttribute("width", d + "px")));
                        i.attr("data-splst-hfreezed", "true");
                        l = f[0].querySelector(".ms-core-menu-box");
                        l && (ct = l.getAttribute("data-lb-top"), lt = l.getAttribute("data-lb-left"), ct && (l.style.top = ct + "px"), lt && (l.style.left = lt + "px"));
                        this.isHeaderFreezed = !0;
                        this._rowsValueOf()
                    }
                },
                _getHeaderCellsWidths: function() {
                    var s = this.$table,
                        h = SPLST.ListTableLayoutEditor,
                        l = h.isIE(),
                        c = s.find("tr:first"),
                        u = c[0].cells,
                        f = [],
                        e = 0,
                        i, n, o, t, r;
                    for (this.cellSizes || (this.cellSizes = []), i = this.cellSizes, n = 0, o = u.length; n < o; n++)
                        if (t = 0, r = u[n], !r.getAttribute("data-splst-sc")) {
                            if (i[n] || i[n] === 0) t = i[n];
                            else {
                                if (r.getAttribute("data-splst-sc")) continue;
                                t = r.offsetWidth;
                                i[n] = t
                            }
                            f.push(t);
                            e += t
                        }
                    return {
                        headerCellsWidths: f,
                        totalWidth: e
                    }
                },
                _unfreezeHeader: function() {
                    this.isHeaderFreezed && window.location.reload()
                },
                refreshPhantoms: function(n) {
                    var h = this.$table,
                        r = SPLST.ListTableLayoutEditor,
                        c = r.Helper,
                        l = this.isEditMode,
                        y = c.getThead(h, l),
                        at = y[0],
                        f = {
                            offset: y.position()
                        },
                        a = h.find("th"),
                        vt = jQuerySplst("body"),
                        nt = this.$offsetParent,
                        tt = nt[0],
                        it = tt.scrollLeft,
                        p = tt.scrollTop,
                        i = 0,
                        et = this.sessionSettings.hasManageListsPermissions,
                        ot = this.pluginSettings.viewerEditOptions,
                        st = et || ot.columnStyles,
                        w, ut, d, t, lt, e, g;
                    if (r.trace && r.logInfo(this, "Refreshing phantoms... First Time: " + !!n + "; LB rendered: " + !!this.isRendered + "; LB disposed: " + !!this.isDisposed), y.offsetParent()[0] == h[0] && (w = h.position(), f.offset.left += w.left, f.offset.top += w.top), a && a.length) {
                        var rt = a.length,
                            b = 0,
                            v = 0,
                            ht = this.cellSizes || [];
                        for (i = 0; i < rt; i++) {
                            var k = a[i],
                                u = jQuerySplst(k),
                                ct = u.is(":visible");
                            if (!ct) {
                                this.phantoms[i] && (ut = this.phantoms[i], this.phantoms[i] = null, u.data("phantom", null), ut.remove());
                                continue
                            }
                            var o = ht[i] || k.offsetWidth,
                                s = c.getFieldInfoFromHeaderCell(u, i, rt, l, this._ganttControl),
                                ft = this.tableCssClassName + "_phantom";
                            if (v || (v = k.offsetHeight, c.addCssRule(c.stylesheets.basic, "." + ft, {
                                    height: v + "px"
                                })), b += o, s.visible) {
                                if (d = s.fieldName, t = u.data("phantom"), t) t[0].style.left = f.offset.left + b - o + it + "px", t[0].style.top = f.offset.top + p + "px", t.outerWidth(o);
                                else {
                                    if (t = jQuerySplst('<div class="splst-layout-editor-phantom ' + ft + (l ? "" : " splst-layout-editor-border") + '" style="width: ' + o + "px; top: " + (f.offset.top + p) + 'px;"><\/div>'), l && t.data("th", u), u.attr("data-splst-index", i), u.attr("data-splst-field-name", d), st && s.isFieldCell) {
                                        lt = (v - 11) / 2;
                                        e = jQuerySplst('<a class="splst-layout-editor-phantom-settings" href="javascript:;" ><span class="splst-layout-editor-phantom-settings-span"><img class="splst-layout-editor-phantom-settings-image" src="' + this.imgBaseUrl + r.contentPath + 'editor.png"><\/span><\/a>');
                                        e.data("index", i);
                                        e.data("fieldName", d);
                                        e.data("fieldDisplayName", s.fieldDisplayName);
                                        e.on({
                                            click: jQuerySplst.proxy(this.onEditLinkClick, this)
                                        });
                                        t.append(e);
                                        r.ResizersControl || e.addClass("no-margin")
                                    }
                                    this.phantoms[i] ? this.phantoms.splice(i, 0, t) : this.phantoms[i] = t;
                                    u.data("phantom", t);
                                    s.isFieldCell || (t.attr("title", r.locale.messages.systemColumn), t[0].style.cursor = "not-allowed");
                                    t[0].style.left = f.offset.left + b - o + it + "px";
                                    t[0].style.top = f.offset.top + p + "px";
                                    t.outerWidth(o);
                                    nt.append(t);
                                    t.on({
                                        mouseover: jQuerySplst.proxy(this.onPhantomMouseOver, this),
                                        mouseleave: jQuerySplst.proxy(this.onPhantomMouseLeave, this)
                                    })
                                }
                                g = t.data("th");
                                g && g.addClass("splst-layout-editor-border")
                            }
                        }
                    }
                    r.trace && r.logInfo(this, "Phantoms were refreshed... First Time: " + !!n + "; LB rendered: " + !!this.isRendered + "; LB disposed: " + !!this.isDisposed)
                },
                hidePhantoms: function() {
                    var i = this.phantoms,
                        n, u, t, r;
                    if (i)
                        for (n = 0, u = i.length; n < u; n++) t = i[n], t && (t.hide(), r = t.data("th"), r && r.removeClass("splst-layout-editor-border"))
                },
                showPhantoms: function() {
                    var n = this.phantoms,
                        t, r, i;
                    if (n && n.length)
                        for (t = 0, r = n.length; t < r; t++) i = n[t], i && i.show();
                    this.refreshPhantoms()
                },
                refreshFreezePaneEl: function() {
                    var n = SPLST.ListTableLayoutEditor,
                        t = this.getFreezedHeader();
                    this.$freezePaneEl && (t && t.state !== n.FREEZE_STATES.unfreeze ? (this.$freezePaneIconEl.html("&#xf146;"), this.$freezePaneTextEl.text(n.locale.messages.freezePane.iconTextUnfreeze), this.$freezePaneEl.attr("data-is-freezed", "true")) : (this.$freezePaneIconEl.html("&#xf145;"), this.$freezePaneTextEl.text(n.locale.messages.freezePane.iconTextFreeze), this.$freezePaneEl.attr("data-is-freezed", "false")))
                },
                showPaging: function() {
                    this.$topPagingEl && (this.$topPagingEl[0].style.display = "inline-block");
                    this.$bottomPagingEl && (this.$bottomPagingEl[0].style.display = "inline-block", this.$bottomPagingEl[0].style.visibility = "visible");
                    this.$defaultPagingEl && (this.$defaultPagingEl[0].style.display = "none")
                },
                hidePaging: function(n) {
                    this.$topPagingEl && (this.$topPagingEl[0].style.display = "none");
                    this.$bottomPagingEl && (n ? this.$bottomPagingEl[0].style.visibility = "hidden" : this.$bottomPagingEl[0].style.display = "none");
                    this.$defaultPagingEl && !n && (this.$defaultPagingEl[0].style.display = "table")
                },
                showDefaultPaging: function() {
                    this.$defaultPagingEl && (this.$defaultPagingEl[0].style.display = "table", this.$bottomPagingEl && (this.$bottomPagingEl[0].style.display = "none"))
                },
                hideDefaultPaging: function() {
                    this.$defaultPagingEl && (this.$defaultPagingEl[0].style.display = "none")
                },
                renderPaging: function(n, t) {
                    var r, i;
                    if (this.pagingSettings) {
                        r = this.pagingSettings;
                        i = jQuerySplst("#" + n);
                        i.jui_pagination({
                            currentPage: r.currentPage,
                            visiblePageLinks: 5,
                            useSlider: !1,
                            totalPages: r.pageCount,
                            showGoToPage: !1,
                            showLabelTotalPages: !0,
                            showTotalPages: !0,
                            showNavButtons: !0,
                            disableSelectionNavPane: !0,
                            showPreferences: !1,
                            containerClass: "splst-paging-container" + (t ? " splst-paging-container-bottom" : ""),
                            navGoToPageClass: "splst-paging-goto-page",
                            navPaneClass: "nav-pane",
                            navItemClass: "nav-item splst-paging-state-default ms-InlineSearch-Outline-Empty splst-paging-nav-item",
                            navItemSelectedClass: "nav-item splst-paging-state-default ms-InlineSearch-Outline-Empty splst-paging-nav-item splst-paging-state-highlight",
                            navItemHoverClass: "splst-paging-state-hover",
                            navButtonTopClass: "splst-paging-nav-button-top splst-paging-state-default ms-InlineSearch-Outline-Empty splst-paging-icon splst-paging-icon-seek-first",
                            navButtonPrevClass: "splst-paging-nav-button-prev splst-paging-state-default ms-InlineSearch-Outline-Empty splst-paging-icon splst-paging-icon-seek-prev",
                            navButtonNextClass: "splst-paging-nav-button-prev splst-paging-state-default ms-InlineSearch-Outline-Empty splst-paging-icon splst-paging-icon-seek-next",
                            navButtonLastClass: "splst-paging-nav-button-prev splst-paging-state-default ms-InlineSearch-Outline-Empty splst-paging-icon splst-paging-icon-seek-end",
                            onDisplay: function() {
                                jQuerySplst("#top_" + n).text("");
                                jQuerySplst("#prev_" + n).text("");
                                jQuerySplst("#next_" + n).text("");
                                jQuerySplst("#last_" + n).text("")
                            },
                            onChangingPage: jQuerySplst.proxy(this.onPageChanging, this)
                        });
                        switch (r.pageCount) {
                            case 2:
                                i.css("min-width", "260px");
                                break;
                            case 3:
                                i.css("min-width", "290px");
                                break;
                            case 4:
                                i.css("min-width", "320px");
                                break;
                            case 5:
                                i.css("min-width", "350px")
                        }
                    } else {
                        var f = SPLST.ListTableLayoutEditor,
                            u = this.pluginSettings.viewerEditOptions,
                            e = this.getIsMenuVisible() && (this.sessionSettings.hasManageListsPermissions || u.width || u.columnStyles || u.tableStyles || u.freezePane);
                        e || f.isTrial || !this.$el || this.$el.remove()
                    }
                },
                onPageChanging: function(n, t) {
                    var w = t.newPage,
                        b = SPLST.ListTableLayoutEditor,
                        et = b.Helper,
                        bt = this.viewItems,
                        a = this.viewId.slice(1, -1).toLowerCase(),
                        i = this.listTemplate,
                        kt = ["p_ID", "Paged", "PrevPaged", "PageFirstRow", "FirstRow", "View"],
                        ot = {},
                        st = "",
                        ht = "",
                        k = "",
                        s = "",
                        d = "",
                        ct = "",
                        r = "",
                        u = "",
                        lt = this.pagingSettings,
                        g = this.splittedCaml,
                        nt, h, e, at = !1,
                        tt, it, c, vt, rt, ut, o, v, y, l, f, p, ft, pt, wt;
                    if (ot[a] = ["p_ID", "Paged", "PrevPaged", "PageFirstRow", "FirstRow"], tt = et.getUrlParametersGroupByViewId(ot), t.cancel = !0, it = this._getCLVP(), c = it && it.ctx, this.listTemplate === -1 && c && (i = this.listTemplate = parseInt(c.listTemplate)), w === 1 ? (k = i !== 171 ? "&PageFirstRow=1" : "&FirstRow=1", nt = lt.rowLimit) : (st = i !== 171 ? "Paged=TRUE" : "", vt = w - 1, rt = lt.rowLimit * vt, nt = rt - 1, k = (i !== 171 ? "&PageFirstRow=" : "&FirstRow=") + (rt + 1)), h = bt.get_itemSorted(nt, i), ht = w === 1 || i === 171 ? "" : "&p_ID=" + h.get_item("ID"), ut = window.event || n, o = jQuerySplst.extend(!0, {}, tt[b.COMMON_QUERY_PARAMS], tt[a]), c && (v = c.ListData, v ? (y = v.NextHref || v.PrevHref, y && (r = y.match(/p_SortBehavior=\d+/) || "", r && r.length && (r = "&" + r[0]), u = y.match(/(FolderCTID=[\d,\w]+)/) || "", u && (u = "&" + u[1]))) : (l = this.$defaultPagingEl.find("a[onclick*=RefreshPageTo]"), f = "", l.length == 2 ? f = jQuerySplst(l[1]).attr("onclick") : l.length && (f = jQuerySplst(l[0]).attr("onclick")), f && (f = unescapeProperly(f.replace(/\\u[\d,a-f,A-F]{4}/gi, function(n) {
                            return String.fromCharCode(parseInt(n.slice(2), 16))
                        })), r = f.match(/p_SortBehavior=\d+/) || "", r && r.length && (r = "&" + r[0]), p = f.match(/{{?[\d,a-f,A-F,\-]{36}}}?/), p && p.length && (a = escapeProperly(p[0])), u = f.match(/(FolderCTID=[\d,\w]+)/) || "", u && (u = "&" + u[1])))), (i === 101 || i === 116) && (ft = h.get_fieldValues().SortBehavior, ft && (r = "&p_SortBehavior=" + ft.get_lookupValue())), o.SortField) {
                        e = o.SortField;
                        var ni = escapeProperly(e),
                            dt = o.SortDir || "Asc",
                            yt = h.get_item(e),
                            gt = yt ? escapeProperly(this._getFieldStringValue(yt, e)) : "";
                        i !== 171 && (s = "&p_" + et.getStoredName(e) + "=" + gt);
                        d = "&SortField=" + e + "&SortDir=" + dt;
                        delete o.SortField;
                        delete o.SortDir;
                        delete o["p_" + e]
                    } else i === 171 && (d = "&SortField=&SortDir=");
                    return jQuerySplst.each(o, function(n, t) {
                        if (kt.indexOf(n) === -1 && n.indexOf("p_") !== 0) {
                            var i = "";
                            t && (n.startsWith("FilterValue") ? (i = escapeProperly(t), at = !0) : i = t);
                            ct += "&" + n + "=" + i
                        }
                    }), g && g.OrderBy && i !== 171 && (pt = jQuerySplst(jQuerySplst.parseXML("<Root>" + g.OrderBy + "<\/Root>")).find("FieldRef"), jQuerySplst.each(pt, jQuerySplst.proxy(function(n, t) {
                        var i = jQuerySplst(t).attr("Name"),
                            t;
                        i !== e && i !== "ID" && (t = h.get_item(i), s += "&p_" + i + "=" + (t ? escapeProperly(this._getFieldStringValue(t, i)) : ""))
                    }, this))), at && b.getCurrentSPVersion().startsWith("15") || (ut.currentCtx = this.isEditMode ? this.$parentTable[0] : this.$table[0]), (i === 101 || i == 851) && (s = s.replace("LinkFilenameNoMenu", "FileLeafRef").replace("LinkFilename", "FileLeafRef")), wt = "?" + st + "" + u + s + ht + k + ct + d + "&View=" + a + r, this.isPageChanging = !0, RefreshPageTo(ut, wt), n.stopImmediatePropagation(), !1
                },
                _getFieldStringValue: function(n, t) {
                    var i, r;
                    if (!n) return "";
                    r = "";
                    i = SPLST.ListTableLayoutEditor.FIELD_TYPES;
                    t ? r = this.listFields && this.listFields[t].type || "" : n instanceof Date ? r = i.DateTime : n instanceof SP.FieldLookupValue ? r = i.Lookup : n instanceof SP.FieldUrlValue ? r = i.Url : n instanceof SP.FieldUserValue ? r = i.User : n instanceof SP.Taxonomy.TaxonomyFieldValue && (r = i.Taxonomy);
                    switch (r) {
                        case i.DateTime:
                            return n.toISOString().replace(/-/gmi, "").replace("T", " ").replace(/\..*/gmi, "");
                        case i.User:
                        case i.Lookup:
                            return n.get_lookupValue().toString();
                        case i.Url:
                            return n.get_description().toString();
                        case i.Taxonomy:
                            return n.get_label().toString();
                        default:
                            return n.toString()
                    }
                    return ""
                },
                bindEvents: function() {
                    var n = this.$table;
                    if (this.$activationEl) this.$activationEl.on({
                        mousedown: jQuerySplst.proxy(this.onMouseDown, this)
                    });
                    if (this.$clearAllEl) this.$clearAllEl.on({
                        click: jQuerySplst.proxy(this.onClearAllClick, this)
                    });
                    if (this.$formatTableEl) this.$formatTableEl.on({
                        click: jQuerySplst.proxy(this.onFormatTableClick, this)
                    });
                    if (this.$settingsScopeLearnMoreEl) this.$settingsScopeLearnMoreEl.on({
                        click: jQuerySplst.proxy(this.onLearnMoreClick, this)
                    });
                    if (this.$aboutEl) this.$aboutEl.on({
                        click: jQuerySplst.proxy(this.onAboutClick, this)
                    });
                    if (this.$printSplitBtnEl && !r()) this.$printSplitBtnEl.on({
                        click: jQuerySplst.proxy(this.onPrintClick, this)
                    });
                    jQuerySplst(document).on({
                        "splstlayouteditor.ribbontabselected": jQuerySplst.proxy(this._refreshResizersControl, this),
                        "splstlayouteditor.collgroupexpand": jQuerySplst.proxy(this.onCollGroupExpand, this)
                    });
                    jQuerySplst(window).on({
                        "resize.splstlayouteditor": jQuerySplst.proxy(this.onResize, this)
                    });
                    if (this.$freezePaneEl) this.$freezePaneSplitBtnEl.on({
                        click: jQuerySplst.proxy(this.onFreezePaneBtnClick, this)
                    })
                },
                unbindEvents: function() {
                    if (this.$el && this.$el.off(), this.$activationEl && this.$activationEl.off(), this.$clearAllEl && this.$clearAllEl.off(), this.$formatTableEl && this.$formatTableEl.off(), this.$settingsScopeLearnMoreEl && this.$settingsScopeLearnMoreEl.off(), this.$aboutEl && this.$aboutEl.off(), this.$printSplitBtnEl && !r()) this.$printSplitBtnEl.on({
                        click: jQuerySplst.proxy(this.onPrintClick, this)
                    });
                    jQuerySplst(document).off("splstlayouteditor.ribbontabselected");
                    jQuerySplst(document).off("splstlayouteditor.collgroupexpand");
                    this.handledHeaderCells && jQuerySplst.each(this.handledHeaderCells, function(n, t) {
                        t.off(".splstlayouteditor")
                    });
                    this.$freezePaneEl && this.$freezePaneSplitBtnEl.off()
                },
                onPostRender: function() {
                    this._rowsValueOf()
                },
                onCellSizeChanged: function(n, t) {
                    this.cellSizes || (this.cellSizes = []);
                    this.cellSizes[t.colIndex] = t.width;
                    SPLST.ListTableLayoutEditor.isEdge() && this.cols[t.colIndex].setAttribute("width", t.width + "px");
                    this._updateHasLocalChanges(!0)
                },
                onCellSizeChanging: function(n, t) {
                    var r = this.phantoms[t.index],
                        e = t.widthDelta,
                        u = t.left,
                        f = t.right,
                        i;
                    r && (i = f - u, t.cancel = i <= s, t.cancel || r.outerWidth(i))
                },
                onPhantomMouseOver: function(n) {
                    jQuerySplst(n.currentTarget).addClass("splst-hovered")
                },
                onPhantomMouseLeave: function(n) {
                    jQuerySplst(n.currentTarget).removeClass("splst-hovered")
                },
                onEditLinkClick: function(n) {
                    var t = jQuerySplst(n.currentTarget);
                    this._showColumnSettingsDialog(t.data("index"), t.data("fieldName"), t.data("fieldDisplayName"))
                },
                onCollGroupExpand: function(n, t) {
                    var u = t.groupName,
                        r = this.$table.find('tbody[id*="tbod' + u + '"]'),
                        i;
                    r.attr("isloaded") === "false" && r.css("display") !== "none" ? (i = this._getCLVP(), i && i.ctx && i.ctx.OnPostRender.push(jQuerySplst.proxy(this._fixUIAfterGroupExpand, this))) : (this._rowsValueOf(), this._fixUIAfterGroupExpand())
                },
                onSettingsMouseUp: function() {
                    this._showResizerSettingsDialog()
                },
                onClearAllClick: function() {
                    this._showClearAllConfirmationDialog()
                },
                onFormatTableClick: function() {
                    this._showTableStylesDialog()
                },
                onLearnMoreClick: function() {
                    this._showScopeDialog()
                },
                onAboutClick: function() {
                    this._showAboutDialog()
                },
                onPrintClick: function() {
                    this._print()
                },
                onPrintCMItemSelected: function() {
                    this._showPrintSetupDialog()
                },
                onFreezePaneBtnClick: function() {
                    var i = this.$freezePaneEl.attr("data-is-freezed") === "true",
                        n = SPLST.ListTableLayoutEditor,
                        t = {};
                    t.state = i ? n.FREEZE_STATES.unfreeze : n.FREEZE_STATES.auto;
                    this._updateHasLocalChanges(!0);
                    this.saveFreezeHeaderOptions(t).then(jQuerySplst.proxy(function() {
                        this.refreshFreezedHeader();
                        this.refreshFreezePaneEl()
                    }, this))
                },
                onFreezeHeaderCMItemSelected: function(n, t) {
                    var i = {
                        state: n
                    };
                    n === "fixed" && (i.height = t.items[n].value);
                    this.saveFreezeHeaderOptions(i).then(jQuerySplst.proxy(function() {
                        this._updateHasLocalChanges();
                        this.refreshFreezedHeader();
                        this.refreshFreezePaneEl()
                    }, this))
                },
                onSettingsCMItemSelected: function(n) {
                    var t = SPLST.ListTableLayoutEditor;
                    switch (n) {
                        case "currentViewSettings":
                            this._showResizerSettingsDialog();
                            break;
                        case "viewsSettings":
                            t.showViewsSettingsDialog(this.listId, !0);
                            break;
                        case "lbSettings":
                            t.ShowEnablePluginDialog(this.listId, !0)
                    }
                },
                onResize: function() {
                    this._resizeTimeout && (clearTimeout(this._resizeTimeout), delete this._resizeTimeout);
                    this._resizeTimeout = setTimeout(jQuerySplst.proxy(function() {
                        this._refreshResizersControl() || this.refreshFreezedHeader()
                    }, this), 0)
                },
                onMouseDown: function() {
                    this._toggleEnabled()
                },
                _toggleEnabled: function() {
                    var r, n;
                    if (this.enabled = !this.enabled, this.isToggling = this.enabled, r = this.pluginSettings.customPaging && this.getIsQueryEnabled() && !this.hasGrouping, n = SPLST.ListTableLayoutEditor, this.enabled) {
                        var t = this.sessionSettings.hasManageListsPermissions,
                            i = this.pluginSettings.viewerEditOptions,
                            u = t || i.columnStyles,
                            f = (t || i.tableStyles) && n.ResizersControl,
                            e = t || i.freezePane;
                        this.$activationArrowEl.html(n.locale.messages.pluginActivatedArrow);
                        this.$activationEl.addClass("splst-layout-editor-enabled");
                        t && (this.$settingsEl.css("display", "inline-block"), this.$settingsEl.css("cursor", "pointer"));
                        this._toggleScopeTextVisibility(!0);
                        this.$clearAllEl.show();
                        this.$aboutEl.css("display", "inline-block");
                        this.$printEl.css("display", "inline-block");
                        f && this.$formatTableEl.show();
                        r ? this.hidePaging(!0) : this.hideDefaultPaging();
                        this.$freezePaneEl && e && this.$freezePaneEl.show();
                        this.showPhantoms();
                        n.ResizersControl && (this.resizersControl ? this.resizersControl.show() : this.resizersControl = new SPLST.ListTableLayoutEditor.ResizersControl({
                            table: this.table,
                            isEditMode: this.isEditMode,
                            viewId: this.viewId,
                            imgBaseUrl: this.imgBaseUrl,
                            canResize: t || i.width,
                            canEditColumnOptions: u,
                            events: {
                                rendered: function(n) {
                                    n.target.show()
                                },
                                refreshed: jQuerySplst.proxy(function(n) {
                                    this._gridControl && this._gridControl.RefreshRow(0);
                                    this.refreshPhantoms();
                                    this.refreshFreezedHeader(!0);
                                    delete this.aggregatedWidths;
                                    this.saveSizes(n.target.sizes);
                                    this.isToggling = !1
                                }, this),
                                sizechanging: jQuerySplst.proxy(this.onCellSizeChanging, this),
                                sizechanged: jQuerySplst.proxy(this.onCellSizeChanged, this)
                            }
                        }))
                    } else this.$activationArrowEl.html(n.locale.messages.pluginDeactivatedArrow), this.$activationEl.removeClass("splst-layout-editor-enabled"), this.$settingsEl.css("display", "none"), this.$settingsEl.css("cursor", "default"), this.$settingsScopeTextEl.css("display", "none"), this.$settingsScopeLearnMoreEl.css("display", "none"), this.$clearAllEl.hide(), n.ResizersControl && this.$formatTableEl.hide(), this.$aboutEl.hide(), this.$printEl.hide(), this.$freezePaneEl && this.$freezePaneEl.hide(), r ? this.showPaging() : this.showDefaultPaging(), this.resizersControl && this.resizersControl.hide(), this.hidePhantoms()
                },
                hideResizerByTimeout: function() {
                    this.needToHide && !this.enabled && this.$el.hide()
                },
                onRowDeleted: function(n) {
                    SPLST.ListTableLayoutEditor.CFDisabled || this.cfViewItems && this.cfViewItems.deleteItem(n.recordKey)
                },
                onRowInserted: function(n) {
                    this.afterItemID = n.afterRecordKey
                },
                onRowChanged: function(n, t) {
                    var u, f;
                    this._refreshResizersControl();
                    var e = this.loadedFields || [],
                        i = [],
                        o = jQuerySplst.extend(!0, {}, this.globalStyles, this.localStyles),
                        s = this._ganttControl.get_Columns(),
                        h = this,
                        r = SPLST.ListTableLayoutEditor;
                    r.CFDisabled || (jQuerySplst.each(t, function(n) {
                        e.indexOf(n) !== -1 && i.push(n)
                    }), this.afterItemID && t.ID ? (u = this.afterItemID, delete this.afterItemID, r.CFDisabled ? this._refreshColumnStyles(this.loadedFields) : this._addItem(this.loadedFields, t.ID, u).then(jQuerySplst.proxy(this._refreshColumnStyles, this, this.loadedFields))) : !t.ID && i.length && (r.CFDisabled ? this._refreshColumnStyles(i) : (f = this._gridControl._GetPaneManager().RecordKeyToViewIdx(n), jQuerySplst.when(this.refreshItem(parseInt(f), i)).then(jQuerySplst.proxy(this._refreshColumnStyles, this, i)))))
                },
                _refreshColumnStyles: function(n) {
                    var i = jQuerySplst.extend(!0, {}, this.globalStyles, this.localStyles),
                        r = this._ganttControl.get_Columns(),
                        t = this;
                    jQuerySplst.each(n, function(n, u) {
                        var f = -1;
                        jQuerySplst.each(r, function(n, t) {
                            if (t.columnKey === u) return f = n, !1
                        });
                        f !== -1 && t._callModulesMethod("setColumnStyles", [i[u], t, u, f + 1])
                    })
                },
                onBeginRenameColumn: function() {
                    this.enabled && this.resizersControl && this.resizersControl.hide()
                },
                onEndRenameColumn: function() {
                    this.enabled && this.resizersControl && this.resizersControl.show();
                    var n = this;
                    jQuerySplst.when(n.initWidths()).then(function() {
                        n._afterColumnRenamed()
                    })
                },
                onBeforeGridDispose: function() {
                    this.exitingEditMode = !0;
                    this.dispose()
                },
                onCellEditCompleted: function(n) {
                    for (var e = this._gridControl._GetPaneManager().RecordKeyToViewIdx(n.recordKey) + 1, o = n.fieldKey, u = this._ganttControl.get_Columns(), i = -1, r, f, t = 0, s = u.length; t < s; t++)
                        if (u[t].columnKey === o) {
                            i = t + 1;
                            break
                        }
                    i !== -1 && (r = jQuerySplst(this.table.rows[e].cells[i]), f = r.hasClass("splst_layout_editor_changedCell"));
                    jQuerySplst(".splst_layout_editor_changedCell").removeClass("splst_layout_editor_changedCell");
                    f && r.addClass("splst_layout_editor_changedCell");
                    this._refreshResizersControl()
                },
                onGridPropertyChanged: function(n) {
                    var t, u, f;
                    if (n.oldProp.localized !== n.newProp.localized) {
                        var e = this._gridControl._GetPaneManager().RecordKeyToViewIdx(n.recordKey) + 1,
                            o = n.fieldKey,
                            r = this._ganttControl.get_Columns(),
                            i = -1;
                        for (t = 0, u = r.length; t < u; t++)
                            if (r[t].columnKey === o) {
                                i = t + 1;
                                break
                            }
                        i !== -1 && (f = jQuerySplst(this.table.rows[e].cells[i]), f.addClass("splst_layout_editor_changedCell"))
                    }
                },
                _afterColumnRenamed: function() {
                    this._gridControl && this._gridControl.RefreshRow(0);
                    this._refreshResizersControl()
                },
                _refreshResizersControl: function() {
                    return this.resizersControl && this.enabled ? (this.resizersControl.refresh(), !0) : !1
                },
                _triggerEvent: function(n, t) {
                    jQuerySplst(this).trigger("layouteditorplugin:" + n, t)
                },
                dispose: function() {
                    var n = SPLST.ListTableLayoutEditor,
                        h, c, f, l, e, u, r, a, i, o, v, y, p, s, g, w;
                    if (n.trace && n.logInfo(this, "Dispose started... Disposed previously: " + !!this.isDisposed + ";\nCall Stack: " + n.getStackTrace(arguments.callee)), !this.isDisposed) {
                        if (this.clientDataHelper && (this.clientDataHelper.dispose(), delete this.clientDataHelper), delete this._ganttControl, delete this._gridControl, this.onPostRenderProxy && (h = this._getCLVP().ctx.OnPostRender, c = h.indexOf(this.onPostRenderProxy), c !== -1 && h.splice(c, 1), delete this.onPostRenderProxy), this.viewItems && this.viewItems.boosterDispose && this.viewItems.boosterDispose(), this.cfViewItems && this.cfViewItems.boosterDispose && this.cfViewItems.boosterDispose(), delete this.viewItems, delete this.cfViewItems, delete this.loadedFields, this.resizersControl && this.resizersControl.dispose(), this.$table && (this.$table.data("layout-editor-plugin", ""), this.$table.css("width", "")), this.unbindEvents(), delete this.handledHeaderCells, this.viewId && (jQuerySplst.contextMenu("destroy", "#lbsplitmenu-" + this.viewId.slice(1, -1)), jQuerySplst.contextMenu("destroy", "#lbprintsplitmenu-" + this.viewId.slice(1, -1)), jQuerySplst.contextMenu("destroy", "#lbsettingssplitmenu-" + this.viewId.slice(1, -1))), this.$el && this.$el.remove(), window.asyncDeltaManager && this.proxiedOnPageLoading && (asyncDeltaManager.remove_pageLoading(this.proxiedPageLoading), delete this.proxiedOnPageLoading), window.asyncDeltaManager && this.proxiedOnPageLoaded && (asyncDeltaManager.remove_pageLoading(this.proxiedPageLoaded), delete this.proxiedOnPageLoaded), this.$bottomPagingEl && (this.$bottomPagingEl.jui_pagination && this.$bottomPagingEl.jui_pagination("destroy"), this.$bottomPagingEl.remove(), delete this.$bottomPagingEl), this.$topPagingEl && this.$topPagingEl.jui_pagination && this.$topPagingEl.jui_pagination("destroy"), this.$defaultPagingEl ? (this.isPageChanging || this.exitingEditMode || this.$defaultPagingEl.css("display", "table"), delete this.$defaultPagingEl) : $defaultPaging = this.isEditMode ? this.$parentTable && this.$parentTable.parent().closest("table").parent().find(".ms-bottompaging") : this.$table && this.$table.parent().closest("table").parent().find(".ms-bottompaging"), f = this.phantoms, f && f.length)
                            for (i = 0, o = f.length; i < o; i++) l = f[i], l && l.remove();
                        if (delete this.phantoms, t.removeCssRulesBySelectorPrefix(t.stylesheets.basic, this.tableCssClassName), t.removeCssRulesBySelectorPrefix(t.stylesheets.table, this.tableCssClassName), t.removeCssRulesBySelectorPrefix(t.stylesheets.cf, this.tableCssClassName), t.removeCssRulesBySelectorPrefix(t.stylesheets.size, this.tableCssClassName), this.$table && this.$table.length) {
                            if (e = this.$table, n.showTable(this.table, this.isEditMode ? this.parentTable : null, !0), e.attr("style", this.table.style.cssText.replace(/width:\s*\d+px;/gmi, "").replace(/visibility:\s*visible;/gmi, "").replace(/visibility:\s*hidden;/gmi, "")), e.removeClass(this.tableCssClassName), e.removeClass(n.PROPERTY_BAG_PREFIX + "table"), e.removeClass("lb-edge"), this.colgroup && this.table.removeChild(this.colgroup), u = this.$table.find("tr:first"), this.isHeaderFreezed) {
                                if (this.freezeHeaderPrintCss && (document.head.removeChild(this.freezeHeaderPrintCss), delete this.freezeHeaderPrintCss), this.$scrollCell && this.$scrollCell.length && this.$scrollCell.remove(), u.length) {
                                    if (r = u[0].querySelector(".ms-core-menu-box"), r) {
                                        var b = u.position(),
                                            k = parseInt(r.style.top),
                                            d = parseInt(r.style.left),
                                            nt = k + b.top,
                                            tt = d + b.left;
                                        r.style.top = nt + "px";
                                        r.style.left = tt + "px";
                                        r.setAttribute("data-lb-left", d);
                                        r.setAttribute("data-lb-top", k)
                                    }
                                    u.attr("style", u.attr("style").replace("position: relative;", "").replace("display: block;", "").replace("padding: 0px;", ""))
                                }
                                if (this.$tbodyWrap && this.$tbodyWrap.length) {
                                    for (a = this.$tbodyWrap.children(), i = 0, o = a.length; i < o; i++) v = jQuerySplst(a[i]), v.detach(), this.$table.append(v);
                                    this.$tbodyWrap.remove()
                                } else y = this.$table.find("tbody"), y.removeAttr("style"), y.removeAttr("data-splst-hfreezed")
                            }
                            for (p = u[0].cells, s = 0, g = p.length; s < g; s++) w = p[s], w.style.width && (w.style.width = "")
                        }
                        delete this.resizersControl;
                        delete this.table;
                        delete this.$table;
                        delete this.$parentTable;
                        delete this.parentTable;
                        delete this.colgroup;
                        delete this.cols;
                        delete this.$el;
                        delete this.$activationEl;
                        delete this.$settingsEl;
                        delete this.$clearAllEl;
                        delete this.$formatTableEl;
                        delete this.$settingsScopeTextEl;
                        delete this.$settingsScopeLearnMoreEl;
                        delete this.$topPagingEl;
                        delete this.$offsetParent;
                        delete this.$trialEl;
                        delete this.$aboutEl;
                        delete this.$printSplitBtnEl;
                        delete this.$printSplitMenuArrowEl;
                        delete this.$printEl;
                        delete this.$freezePaneEl;
                        delete this.$freezePaneIconEl;
                        delete this.$freezePaneTextEl;
                        delete this.$freezePaneSplitBtnEl;
                        delete this.$freezePaneSplitMenuArrowEl;
                        delete this.$topPagingEl;
                        delete this.$bottomPagingEl;
                        delete this.$defaultPagingEl;
                        delete this.$tbodyWrap;
                        delete this.$scrollableParent;
                        delete this.$scrollCell;
                        delete this.groupedCell;
                        delete this.firstRowCells;
                        delete this.localStyles;
                        delete this.globalStyles;
                        delete this.aggregatedStyles;
                        delete this.localWidths;
                        delete this.globalWidths;
                        delete this.localOptions;
                        delete this.globalOptions;
                        delete this.fieldSelectors;
                        delete this.clientData;
                        window.SPLST && window.SPLST.ListTableLayoutEditor && n._boosters && this.viewId && delete n._boosters[this.viewId.toLowerCase()];
                        delete this.viewId;
                        delete this.clvp;
                        delete this.cellSizes;
                        this.isDisposed = !0;
                        n.trace && n.logInfo(this, "List Booster is disposed...")
                    }
                },
                refresh: function() {
                    SPLST.ListTableLayoutEditor.trace && SPLST.ListTableLayoutEditor.logInfo(this, "List Booster Refresh");
                    var n = this;
                    jQuerySplst.when(n.initWidths()).then(function() {
                        n._refreshResizersControl()
                    })
                },
                _addColgroup: function() {
                    for (var t, r = this.$table, u = this.table, n = ["<colgroup>"], f = u.rows[0].cells.length, i = 0; i < f; i++) n.push("<col>");
                    n.push("<\/colgroup>");
                    t = jQuerySplst(n.join(""));
                    r.prepend(t);
                    this.colgroup = t[0];
                    this.cols = this.colgroup.children
                },
                _initEnabledForList: function() {
                    var n = SPLST.ListTableLayoutEditor,
                        r, i, u;
                    n.trace && n.logInfo(this, "Init List Booster (enabled for list)");
                    jQuerySplst.cookie || $_global_splst_layout_editor_cookie(splst_layout_editor_cookie_factory);
                    (!jQuerySplst.ui || jQuerySplst.ui.version < "1.11.2") && $_global_splst_layout_editor_jquery_ui(splst_layout_editor_jquery_ui_factory);
                    jQuerySplst.fn.jui_pagination || $_global_splst_layout_editor_jui_pagination(jQuerySplst);
                    window.clickDatePicker || SPLST.ListTableLayoutEditor.CFDisabled || (SP.SOD.executeFunc("datepicker.js", "clickDatePicker", function() {}), SP.SOD.executeOrDelayUntilScriptLoaded(function() {}, "datepicker.js"));
                    n = SPLST.ListTableLayoutEditor;
                    n.locale || n.loadResources();
                    t.addStaticCssRules();
                    r = this.$table;
                    this.isEditMode && (this.parentTable ? this.$parentTable = jQuerySplst(this.parentTable) : (this.$parentTable = r.parent(".ms-listviewtable"), this.parentTable = this.$parentTable[0]));
                    i = this._getCLVP();
                    i && i.ctx && (this.listTemplate = parseInt(i.ctx.listTemplate), i.ctx.IsClientRendering && (this.onPostRenderProxy = jQuerySplst.proxy(this.onPostRender, this), i.ctx.OnPostRender.push(this.onPostRenderProxy)));
                    this.tableCssClassName = n.PROPERTY_BAG_PREFIX + this.viewId.slice(1, -1) + (this.isEditMode ? n.PROPERTY_BAG_EDIT_MODE_POSTFIX : "");
                    this.hasGrouping = !!this.$table.find("tbody[groupstring]").length;
                    r.addClass(this.tableCssClassName);
                    r.addClass(n.PROPERTY_BAG_PREFIX + "table");
                    this.isEditMode && (this._ganttControl = window[g_SPGridInitInfo[this.viewId].controllerId], this._gridControl = this._ganttControl.get_GridControl(), this._attachGridEvents());
                    this.$offsetParent = r.offsetParent();
                    window.asyncDeltaManager && !this.isEditMode && (u = this, this.proxiedPageLoading = function() {
                        u.resizersControl && u.resizersControl.hide()
                    }, this.proxiedPageLoaded = function() {
                        u.isDisposed || u.dispose()
                    }, asyncDeltaManager.add_pageLoading(this.proxiedPageLoading), asyncDeltaManager.add_pageLoaded(this.proxiedPageLoaded));
                    n.isEdge() && this._addColgroup();
                    n.trace && n.logInfo(this, "Init List Booster (enabled for list) finished")
                },
                init: function() {
                    var r, u, f, n, i;
                    try {
                        if (n = SPLST.ListTableLayoutEditor, n.trace && n.logInfo(this, "Creating LB instance... Stack trace: " + n.getStackTrace(arguments.callee)), !this.table) {
                            n.trace && n.logInfo(this, "Creating LB instance terminated - Table is not set");
                            return
                        }
                        r = this.$table = jQuerySplst(this.table);
                        n = SPLST.ListTableLayoutEditor;
                        u = n.getContext();
                        f = n.getWeb();
                        this.isEditMode && (this.parentTable || (this.parentTable = t.closest(this.table, "table")));
                        this._getListInfoFromTable();
                        r.data("layout-editor-plugin", this);
                        n._boosters || (n._boosters = {});
                        n._boosters[this.viewId.toLowerCase()] = this;
                        i = this;
                        this.waitUntilListIsLoaded().then(function() {
                            n.isTrial ? i.getScriptCreatedDate() : i.requestNeededData()
                        })
                    } catch (e) {
                        this._onError(e.message)
                    }
                },
                waitUntilListIsLoaded: function(n, t) {
                    var u = n || new jQuerySplst.Deferred,
                        i, r;
                    return g_ExpGroupInProgress || g_ExpGroupXSLTQueue && g_ExpGroupXSLTQueue.length ? (i = this._getCLVP(), r = function(n) {
                        return function(t) {
                            this.waitUntilListIsLoaded(n, t)
                        }
                    }(u).bind(this), i && i.ctx ? t || (i.ctx.OnPostRender.push(r), i.ctx.lbWaitUntilListLoadedHandler = r) : setTimeout(r, 45)) : (t && t.lbWaitUntilListLoadedHandler && (t.OnPostRender.splice(t.OnPostRender.indexOf(t.lbWaitUntilListLoadedHandler), 1), delete t.lbWaitUntilListLoadedHandler), u.resolve()), u
                },
                getScriptCreatedDate: function() {
                    var n = SPLST.ListTableLayoutEditor,
                        u = n.spWeb,
                        i = n.spContext,
                        r, t;
                    if (n.trace && n.logInfo(this, "Getting script created date"), n.dateCreated) {
                        this.requestNeededData();
                        return
                    }
                    r = i.get_site().get_rootWeb();
                    t = r.getFileByServerRelativeUrl(this.imgBaseUrl + n.scriptsPath + "splst.layouteditor.min.js");
                    i.load(t, "Exists", "TimeCreated");
                    this.executeQueryAsync(jQuerySplst.proxy(function() {
                        if (t.get_exists()) {
                            var i = n.oneDay,
                                r = t.get_timeCreated(),
                                u = r - new Date(1970, 0, 1),
                                f = new Date(u + n.trialDaysCount * i);
                            n.trialLeftDays = Math.ceil((f - new Date) / i);
                            this.requestNeededData()
                        }
                    }, this), jQuerySplst.proxy(function() {
                        this.requestNeededData()
                    }, this))
                },
                requestNeededData: function() {
                    var n = SPLST.ListTableLayoutEditor,
                        o, v, h, i, p, s, c, r, w, u, l, a, t, f, b, e, y, k;
                    if (n.trace && n.logInfo(this, "Requesting initial data from SharePoint: server timezone, current user, list, view, fields, property bag"), t = n.spContext, f = n.spWeb, n.webRegionalSettings || (o = f.get_regionalSettings(), v = SP.Utilities.Utility.formatDateTime(t, f, new Date(1999, 3, 6), SP.Utilities.DateTimeFormat.dateOnly), h = !0, b = o.get_timeZone(), e = new Date, e.setHours(e.getUTCHours()), y = b.utcToLocalTime(e), t.load(o)), n.currentUser || (u = f.get_currentUser(), k = u.get_groups(), l = !0, t.load(u), t.load(k)), i = f.get_lists().getByTitle(this.listName), s = i.get_fields(), a = t.get_site(), n.allProperties[this.listName] || (p = i.get_rootFolder(), c = !0, n.isExportEnabled ? t.load(i, "EffectiveBasePermissions", "ItemCount", "Views") : t.load(i, "EffectiveBasePermissions", "ItemCount"), t.load(p, "Properties"), t.load(s), t.load(a, "MaxItemsPerThrottledOperation")), r = i.getView(this.viewId), n.loadedViews || (n.loadedViews = {}), n.loadedViews[this.viewId] || (w = !0, t.load(r, "Id", "RowLimit", "Paged", "ViewQuery", "PersonalView", "ListViewXml", "Scope", "HtmlSchemaXml", "Title", "ViewFields", "AggregationsStatus", "ServerRelativeUrl")), h || c || w || l) this.executeQueryAsync(jQuerySplst.proxy(function() {
                        var n = SPLST.ListTableLayoutEditor;
                        if (h) this.onWebRegionalSettingsLoaded(o, v, y, e);
                        if (l && (n.trace && n.logInfo(this, "Current User: " + u.get_loginName()), n.currentUser = u), c && (n.threshold = a.get_maxItemsPerThrottledOperation()), this.onListLoaded(i, s)) {
                            this.getCurrentUserPermissionsForList();
                            n.isExportEnabled && (this.importedStyles = n.getViewStyles(this, r));
                            this.initPluginSettings();
                            this.onViewLoaded(r)
                        }
                    }, this), jQuerySplst.proxy(function(n, t) {
                        this._onError("Message: " + t.get_message() + "------------- Stack Trace:" + t.get_stackTrace())
                    }, this));
                    else {
                        if (!this.onListLoaded(i, s)) return;
                        this.getCurrentUserPermissionsForList();
                        n.isExportEnabled && (this.importedStyles = n.getViewStyles(this, r));
                        this.initPluginSettings();
                        this.onViewLoaded(r)
                    }
                },
                onWebRegionalSettingsLoaded: function(n, t, i, r) {
                    var u = SPLST.ListTableLayoutEditor;
                    try {
                        u.webRegionalSettings = n;
                        u.webDateFormat = this.getWebDateFormat(t.m_value);
                        var f = r.getHours(),
                            o = r.getDate(),
                            s = i.get_value(),
                            h = s.getDate(),
                            e = s.getHours();
                        u.hoursOffset = h == o ? e - f : h < o ? e - 24 - f : e + 24 - f
                    } catch (c) {
                        this._onError(c.message)
                    }
                },
                getWebDateFormat: function(n) {
                    var t = n.toString();
                    return t.replace(/9/gmi, "Y").replace("1", "Y").replace("04", "MM").replace("4", "M").replace(/\d/gmi, "D")
                },
                onListLoaded: function(n, t) {
                    var r = SPLST.ListTableLayoutEditor,
                        e, o, s, i, c;
                    if (r.trace && r.logInfo(this, "Processing loaded list info..."), this.isDisposed) {
                        r.trace && r.logInfo(this, "Processing loaded list info terminated - List Booster is disposed");
                        return
                    }
                    try {
                        if (r.isExportEnabled) try {
                            e = r._getLBListSettingsView(n.get_views());
                            e && (o = r.getListStyles(e), o && (this.importedListSettings = o))
                        } catch (l) {}
                        if (this.getIsEnabledForList(), !this.isEnabledForList) {
                            r.trace && r.logInfo(this, "Processing loaded list info terminated - List Booster is not enabled for the list");
                            r.showTable(this.table, this.isEditMode ? this.parentTable : null, !0);
                            this.dispose();
                            return
                        }
                        for (r.showSpinner(this.$table, this.isEditMode ? jQuerySplst(this.parentTable) : null), this._initEnabledForList(), s = t.getEnumerator(); s.moveNext();) {
                            var u = s.get_current(),
                                a = u.get_internalName(),
                                h = u.get_typeAsString(),
                                f = u.get_jsLink();
                            f && f === "clienttemplates.js" && (f = null);
                            i = {
                                type: h,
                                title: u.get_title()
                            };
                            f && (i.customRendering = !0);
                            switch (h) {
                                case "Note":
                                    i.richText = u.get_richText();
                                    break;
                                case "Lookup":
                                case "User":
                                    i.AllowMultipleValues = u.get_allowMultipleValues();
                                    break;
                                case "Number":
                                    u.get_schemaXml().toLowerCase().indexOf('percentage="true"') !== -1 && (i.isPercent = !0);
                                    break;
                                case "Calculated":
                                    c = u.get_outputType();
                                    switch (c) {
                                        case 1:
                                            i.type = "Integer";
                                            break;
                                        case 2:
                                            i.type = "Text";
                                            break;
                                        case 4:
                                            i.type = "DateTime";
                                            break;
                                        case 8:
                                            i.type = "Boolean";
                                            break;
                                        case 9:
                                            i.type = "Number";
                                            u.get_schemaXml().toLowerCase().indexOf('percentage="true"') !== -1 && (i.isPercent = !0);
                                            break;
                                        case 10:
                                            i.type = "Currency"
                                    }
                                    i.isCalculated = !0
                            }
                            this.listFields[a] = i
                        }
                    } catch (l) {
                        return this._onError(l.message), !1
                    }
                    return !0
                },
                onViewLoaded: function(n) {
                    var t = SPLST.ListTableLayoutEditor,
                        i;
                    t.trace && t.logInfo(this, "Processing loaded view info...");
                    try {
                        t.loadedViews || (t.loadedViews = {});
                        this.view = n;
                        this.sessionSettings.isPersonalView = n.get_personalView();
                        t.loadedViews[this.viewId] = !0;
                        i = this;
                        this._callModulesMethod("updateItemsCount", [this]).then(function() {
                            i.onPluginSettingsLoaded()
                        }, function(n) {
                            i._onError("Message: " + n.message + "------------- Stack Trace:" + n.stackTrace)
                        })
                    } catch (r) {
                        this._onError(r.message)
                    }
                },
                getFieldValue: function(n, t) {
                    var s, r, h, c, l;
                    try {
                        if (this.areFieldsLoaded(n)) {
                            n = SPLST.ListTableLayoutEditor.Helper.getStoredName(n);
                            var v = this.listFields[n].type,
                                u = this.cfViewItems.get_itemSorted(t, this.listTemplate),
                                i, f = "",
                                e, a = !0,
                                o = null;
                            n === "ContentType" ? (i = u.get_contentType(), f = "get_name") : n === "LinkFilename" ? (i = u.get_item(n), s = u.get_fieldValuesAsText().get_fieldValues().File_x0020_Type, s && i.lastIndexOf("." + s) !== -1 && (e = i.slice(0, i.lastIndexOf("." + s)))) : i = u.get_item(n);
                            switch (v) {
                                case "User":
                                case "Lookup":
                                    f = "get_lookupValue";
                                    o = i;
                                    break;
                                case "UserMulti":
                                    o = i;
                                    break;
                                case "DateTime":
                                    r = this._getCLVP();
                                    r && r.ctx && r.ctx.ListData && r.ctx.ListData.Row && (h = r.ctx.ListData.Row[t], h && (c = h[n + ".FriendlyDisplay"], c && (e = c.split("|")[1])));
                                    break;
                                case "Attachments":
                                    a = !1
                            }
                            return i && (i = f && i[f] ? i[f]() : i), !e && a && (e = u.get_fieldValuesAsText().get_fieldValues()[n] || i), l = {
                                value: i,
                                text: e
                            }, o && (l.originalValue = o), l
                        }
                        this.loadFields(n, jQuerySplst.proxy(function() {
                            this.getFieldValue(n, t)
                        }, this))
                    } catch (y) {
                        this._onError(y.message)
                    }
                },
                areFieldsLoaded: function(n) {
                    if (!this.cfViewItems) return !1;
                    n = jQuerySplst.isArray(n) ? n : [n];
                    var t = this.loadedFields,
                        i = jQuerySplst.grep(n, function(n) {
                            return t.indexOf(n) === -1
                        });
                    return !i.length
                },
                loadFields: function(n, t, i, r) {
                    var u, f, e;
                    this.cfViewItems || i && i();
                    n = jQuerySplst.isArray(n) ? n : [n];
                    u = this.loadedFields;
                    f = u ? jQuerySplst.grep(n, function(n) {
                        return u.indexOf(n) === -1
                    }) : n && n.slice(0);
                    f.length || r ? (this.loadedFields = this.loadedFields ? this.loadedFields.concat(f) : f, e = SPLST.ListTableLayoutEditor.spContext, this.cfViewItems.boosterDispose && this.cfViewItems.boosterDispose(!1), e.load(this.cfViewItems, "Include(FieldValuesAsHtml,FieldValuesAsText" + (this.loadedFields.length ? "," : "") + this.loadedFields.join(",") + ")"), this.executeQueryAsync(t, jQuerySplst.proxy(function() {
                        u = this.loadedFields;
                        this.loadedFields = jQuerySplst.grep(u, function(n) {
                            f.indexOf(n) === -1
                        });
                        i && i()
                    }, this))) : t && t()
                },
                _addItem: function(n, t, i) {
                    var u = jQuerySplst.Deferred(),
                        f = SPLST.ListTableLayoutEditor,
                        e = f.spContext,
                        h = f.spWeb.get_lists().getByTitle(this.listName),
                        o = h.getItemById(t),
                        s = this,
                        r;
                    return s.cfViewItems && s.cfViewItems.addNewItem(o, i), r = [o, "FieldValuesAsHtml", "FieldValuesAsText"], this.listTemplate === 171 && n.indexOf("ParentID") === -1 && r.push("ParentID"), r = r.concat(n), e.load.apply(e, r), this.executeQueryAsync(function() {
                        u.resolve()
                    }, function() {
                        u.reject()
                    }), u
                },
                refreshItem: function(n, t) {
                    var i, f, r, e, o, u, s;
                    if (this.cfViewItems) return i = jQuerySplst.Deferred(), this.pagingSettings ? (e = this.pagingSettings, r = e.rowLimit, f = (e.currentPage - 1) * r) : (f = 0, r = this.cfViewItems.get_count()), o = this.cfViewItems.getPageItemsIndexes(r, f), u = this.cfViewItems.get_itemSorted(o[n], this.listTemplate), u && (u.retrieve(t), s = u.get_fieldValuesAsText(), s.retrieve(), this.executeQueryAsync(function() {
                        i.resolve()
                    }, function() {
                        i.reject()
                    })), i.promise()
                },
                getFieldNamesFromQuery: function(n) {
                    for (var i = [], r = new RegExp('<FieldRef[^/>]*Names*=s*"([^"]*)"[^/>]*/>', "g"), t; t = r.exec(n);) t.length == 2 && i.indexOf(t[1]) === -1 && i.push(t[1]);
                    return i
                },
                updateItemsCount: function(n, t, i) {
                    var v = this.getIsQueryEnabled(),
                        r = "",
                        f, e = SPLST.ListTableLayoutEditor,
                        u, s, h, c, l, a, o, w;
                    if (e.trace && e.logInfo(this, "Getting items count... Query Enabled: " + !!v + "; All Pages: " + !!t), u = this, v && t) this.getItemsCount(r, f, !1).then(function(t) {
                        n && n.call(i || u, t.items, t.loadedFields)
                    }, function(n) {
                        u._onError("Message: " + n.message + "------------- Stack Trace:" + n.stackTrace)
                    });
                    else {
                        var d = e.Helper,
                            g = e.spContext,
                            b = e.spWeb.get_lists().getByTitle(this.listName),
                            y = b.getView(this.viewId),
                            nt = y.get_paged(),
                            k = this.isEditMode,
                            p = !1;
                        if (f = y.get_rowLimit(), s = this._getCLVP(), s && s.ctx && s.ctx.ListData) {
                            this.getItemsCount(null, null, !0).then(function(t) {
                                n && n.call(i || u, t.items, t.loadedFields)
                            }, function(n) {
                                u._onError("Message: " + n.message + "------------- Stack Trace:" + n.stackTrace)
                            });
                            return
                        }
                        h = k ? this.$parentTable.parent().closest("table").parent().find(".ms-bottompaging") : this.$table.parent().closest("table").parent().find(".ms-bottompaging");
                        h.length && (l = h.find("td[id*=next]"), l.length ? c = l.find("a") : (a = h.find("td[id*=prev]"), a.length && (c = a.find("a"), p = !0)), c && (o = c.attr("onclick"), o && (r = o.slice(o.indexOf("?") + 1, o.lastIndexOf('"')))));
                        r && (r.startsWith("http://") || r.startsWith("https://") ? r = r.slice(r.indexOf("?") + 1) : r.startsWith("?") && (r = r.slice(1)), w = r.split("&"), r = "", jQuerySplst.each(w, function(n, t) {
                            (t.startsWith("p_") || t.startsWith("Paged") || t.startsWith("PagedPrev") || t.startsWith("FirstRow")) && (r += t + "&")
                        }), r.endsWith("&") && (r = r.slice(0, r.length - 1)));
                        f && r ? this.getItemsCount(r, f).then(function(t) {
                            if (p) r = t.pagingInfo;
                            else {
                                var s = r.split("&"),
                                    e = "",
                                    h = t.items,
                                    c = h.get_item(0),
                                    o = c.get_fieldValues();
                                jQuerySplst.each(s, function(n, t) {
                                    if (t)
                                        if (t.startsWith("p_")) {
                                            var n = t.split("=")[0].slice(2);
                                            e += o[n] ? "p_" + n + "=" + escapeProperly(u._getFieldStringValue(o[n], n)) + "&" : t + "&"
                                        } else e += t + "&"
                                });
                                e.endsWith("&") && (e = e.slice(0, e.length - 1));
                                e += "&PagedPrev=TRUE";
                                r = e
                            }
                            u.getItemsCount(r, f).then(function(t) {
                                n && n.call(i || u, t.items, t.loadedFields)
                            }, function(n) {
                                u._onError("Message: " + n.message + "------------- Stack Trace:" + n.stackTrace)
                            })
                        }, function(n) {
                            u._onError("Message: " + n.message + "------------- Stack Trace:" + n.stackTrace)
                        }) : this.getItemsCount(r, f).then(function(t) {
                            n && n.call(i || u, t.items, t.loadedFields)
                        }, function(n) {
                            u._onError("Message: " + n.message + "------------- Stack Trace:" + n.stackTrace)
                        })
                    }
                },
                getItemsCount: function(n, t, i) {
                    var l = new jQuerySplst.Deferred,
                        w = SPLST.ListTableLayoutEditor,
                        rt = w.Helper,
                        ut = w.spContext,
                        ft = w.spWeb.get_lists().getByTitle(this.listName),
                        ht = ft.getView(this.viewId),
                        a = ht.get_viewQuery(),
                        et = rt.getUrlParametersGroupByViewId(),
                        ct = this.viewId.slice(1, -1).toLowerCase(),
                        u = rt.splitCAMLIntoParts(a),
                        v = new SP.CamlQuery,
                        ot = "",
                        k = !1,
                        r, d, g, f, o, h, b, nt, y, st, c, e, tt, p, it, s;
                    if (v.set_datesInUtc(!1), r = jQuerySplst.extend(!0, {}, et[w.COMMON_QUERY_PARAMS], et[ct]), this.listTemplate === -1 && (d = this._getCLVP(), g = d && d.ctx, g && (this.listTemplate = parseInt(g.listTemplate))), r.SortField && (u.OrderBy || (u.OrderBy = ""), u.OrderBy = '<FieldRef Name="' + r.SortField + '" Ascending="' + (!!(!r.SortDir || r.SortDir === "Asc")).toString().toUpperCase() + '" />' + (this.listTemplate !== 171 ? u.OrderBy : ""), this.listTemplate === 171 ? r.SortField !== "LinkTitle" && r.SortField !== "Order" && (u.OrderBy += '<FieldRef Name="LinkTitle" Ascending="TRUE" />') : (this.listTemplate === 101 || this.listTemplate === 116) && r.SortDir !== "Asc" && (ot = "Desc"), delete r.SortField, delete r.SortDir), this.listTemplate === 171 && (u.OrderBy ? (k = !0, u.OrderBy.indexOf('<FieldRef Name="LinkTitle"') === -1 && (u.OrderBy += '<FieldRef Name="LinkTitle" Ascending="TRUE" />')) : u.OrderBy = '<FieldRef Name="Order" Ascending="TRUE" /><FieldRef Name="LinkTitle" Ascending="TRUE" />'), f = "", i) idsQuery = this._getItemIdsQuery(), f = idsQuery.query, t && (t = idsQuery.count);
                    else
                        for (o = 1, u.Where || (u.Where = ""), f = u.Where; r["FilterField" + o] || r["FilterFields" + o];) nt = r["FilterLookupId" + o], y = r["FilterOp" + o] || "Eq", r["FilterField" + o] ? (h = unescapeProperly(unescapeProperly(r["FilterField" + o])), b = this.listFields[h].type, f = (f ? "<And>" : "") + f + "<" + y + '><FieldRef Name="' + h + '"' + (nt ? ' LookupId="TRUE"' : "") + " />" + (y == "In" ? "<Values>" : "") + '<Value Type="' + (nt ? "Integer" : b) + '" >' + unescapeProperly(unescapeProperly(r["FilterValue" + o])) + "<\/Value>" + (y == "In" ? "<\/Values>" : "") + "<\/" + y + ">" + (f ? "<\/And>" : "")) : (h = unescapeProperly(unescapeProperly(r["FilterFields" + o])), b = this.listFields[h].type, st = unescapeProperly(unescapeProperly(r["FilterValues" + o])).split(";#"), c = "", jQuerySplst.each(st, function(n, t) {
                            if (t) {
                                var i = '<Eq><FieldRef Name="' + h + '" /><Value Type="' + b + '" >' + t + "<\/Value><\/Eq>";
                                c = c ? "<Or>" + c + i + "<\/Or>" : i
                            }
                        }), f = (f ? "<And>" : "") + f + c + (f ? "<\/And>" : "")), o++;
                    r.RootFolder && v.set_folderServerRelativeUrl(unescapeProperly(r.RootFolder));
                    f ? (u.Where = f, k = !0) : delete u.Where;
                    a = "";
                    jQuerySplst.each(u, function(n, t) {
                        a += "<" + n + ">" + t + "<\/" + n + ">"
                    });
                    this.splittedCaml = u;
                    e = this.getFieldNamesFromQuery(a);
                    e.indexOf("ID") === -1 && this.listFields.ID && e.push("ID");
                    this.listTemplate === 171 && e.indexOf("ParentID") === -1 && e.push("ParentID");
                    (this.listTemplate === 101 || this.listTemplate === 116) && (e.push("ContentTypeId"), e.push("SortBehavior"));
                    e = this.getQueryFieldsFromStyles(e);
                    tt = "";
                    t && (tt = "<RowLimit>" + t + "<\/RowLimit>");
                    p = "<View";
                    switch (this.view.get_scope()) {
                        case SP.ViewScope.recursive:
                            p += ' Scope="Recursive">';
                            break;
                        case SP.ViewScope.recursiveAll:
                            p += ' Scope="RecursiveAll">';
                            break;
                        case SP.ViewScope.defaultValue:
                        default:
                            p += ">"
                    }
                    return v.set_viewXml(p + "<Query>" + a + "<\/Query>" + tt + "<\/View>"), n && (it = new SP.ListItemCollectionPosition, it.set_pagingInfo(n), v.set_listItemCollectionPosition(it)), s = ft.getItems(v), ut.load(s, "ListItemCollectionPosition"), ut.load(s, "Include(FieldValuesAsHtml,FieldValuesAsText" + (e.length ? "," : "") + e.join(",") + ")"), this.executeQueryAsync(jQuerySplst.proxy(function() {
                        var n, t = "";
                        try {
                            n = s.get_listItemCollectionPosition()
                        } catch (i) {}
                        n && (t = n.get_pagingInfo());
                        s && (s.setListTemplate(this.listTemplate), s.setDocsUserSorting(ot), s.setHasFiltersOrSorting(k));
                        l.resolve({
                            pagingInfo: t,
                            items: s,
                            loadedFields: e
                        })
                    }, this), jQuerySplst.proxy(function(i, r) {
                        r.get_errorTypeName() === "System.ArgumentException" ? (this.removeDeletedFieldsFromStyles(), this.getItemsCount(n, t).then(function(n) {
                            l.resolve(n)
                        }, function(n) {
                            l.reject(n)
                        })) : l.reject({
                            message: r.get_message(),
                            stackTrace: r.get_stackTrace()
                        })
                    }, this)), l
                },
                _getItemIdsQuery: function() {
                    var t = this._getCLVP(),
                        n = "",
                        f = [],
                        u, i, e, o, r;
                    if (t && t.ctx && t.ctx.ListData)
                        for (u = t.ctx.ListData.Row || [], i = 0, e = u.length; i < e; i++)(o = u[i], r = o.ID, r) && (n += '<Value Type="Counter">' + r + "<\/Value>", f.push(r));
                    return n && (n = '<In><FieldRef Name="ID"/><Values>' + n + "<\/Values><\/In>"), {
                        count: f.length,
                        query: n
                    }
                },
                getQueryFieldsFromStyles: function(n) {
                    var i, t = [],
                        r;
                    return n = n || [], r = SPLST.ListTableLayoutEditor.Helper, i = this.aggregatedStyles === undefined ? this.initStylesVariables() || {} : this.aggregatedStyles || {}, jQuerySplst.each(i, function(i, u) {
                        i = r.getStoredName(i);
                        (u.rules || u.pb) && n.indexOf(i) === -1 && t.push(i)
                    }), t = n.concat(t)
                },
                removeDeletedFieldsFromStyles: function() {
                    var n = SPLST.ListTableLayoutEditor,
                        l, a, e, v, i, y, r;
                    this.aggregatedWidths === undefined && this.initWidthsVariables();
                    !this.aggregatedStyles === undefined && this.initStylesVariables();
                    var o = this.localWidths ? JSON.parse(JSON.stringify(this.localWidths)) : null,
                        s = this.globalWidths ? JSON.parse(JSON.stringify(this.globalWidths)) : null,
                        h = this.localStyles ? JSON.parse(JSON.stringify(this.localStyles)) : null,
                        c = this.globalStyles ? JSON.parse(JSON.stringify(this.globalStyles)) : null,
                        p = this.sessionSettings.hasManageListsPermissions,
                        t = updateLocalWidths = updateGlobalStyles = updateLocalStyles = !1,
                        u = this.listFields,
                        w = this.isEditMode,
                        f = this;
                    o && jQuerySplst.each(o, function(n) {
                        u[n] || (delete f.localWidths[n], updateLocalWidths = !0)
                    });
                    s && jQuerySplst.each(s, function(n) {
                        u[n] || (delete f.globalWidths[n], t = !0)
                    });
                    h && jQuerySplst.each(h, function(n) {
                        u[n] || (delete f.localStyles[n], updateLocalStyles = !0)
                    });
                    c && jQuerySplst.each(c, function(n) {
                        u[n] || (delete f.globalStyles[n], updateGlobalStyles = !0)
                    });
                    this.beginUpdate();
                    p && (t && (l = this._getPropertyBagKeySpecificScope(n.PROPERTY_BAG_WIDTH_POSTFIX, !1), i = JSON.stringify(this.globalWidths), this._savePropertyBagItem(l, i)), updateGlobalStyles && (a = this._getPropertyBagKeySpecificScope(n.PROPERTY_BAG_STYLE_POSTFIX, !1), r = JSON.stringify(this.globalStyles), this._savePropertyBagItem(a, r)), this.getIsExportEnabled() && (updateGlobalStyles || t) && (e = {}, updateGlobalStyles && (e.styles = this.globalStyles), t && (e.widths = this.globalWidths), n.saveViewStyles(this.listName, this.listId, this.view, e)));
                    updateLocalWidths && (v = this._getPropertyBagKeySpecificScope(n.PROPERTY_BAG_WIDTH_POSTFIX, !0), i = JSON.stringify(this.localWidths), this._savePropertyBagItem(v, i, null, jQuerySplst.proxy(function(t, r) {
                        if (r.get_errorTypeName() === "System.UnauthorizedAccessException") {
                            var u = this._getPropertyBagKey(n.PROPERTY_BAG_WIDTH_POSTFIX) + "_" + userId;
                            jQuerySplst.cookie(u, i, {
                                expires: 17532
                            })
                        }
                    }, this)));
                    updateLocalStyles && (y = this._getPropertyBagKeySpecificScope(n.PROPERTY_BAG_STYLE_POSTFIX, !0), r = JSON.stringify(this.localWidths), this._savePropertyBagItem(y, r, null, jQuerySplst.proxy(function(t, i) {
                        if (i.get_errorTypeName() === "System.UnauthorizedAccessException") {
                            var u = this._getPropertyBagKey(n.PROPERTY_BAG_STYLE_POSTFIX) + "_" + userId;
                            jQuerySplst.cookie(u, r, {
                                expires: 17532
                            })
                        }
                    }, this)));
                    this.endUpdate();
                    (t || updateLocalWidths) && (this.aggregatedWidths = jQuerySplst.extend(!0, {}, this.globalWidths, this.localWidths));
                    (updateGlobalStyles || updateLocalStyles) && (this.aggregatedStyles = jQuerySplst.extend(!0, {}, this.globalStyles, this.localStyles), this._callModulesMethod("fixAggregatedStyles", [this, this.aggregatedStyles, this.localStyles, this.globalStyles]))
                },
                onPluginSettingsLoaded: function() {
                    try {
                        if (this.isDisposed) return;
                        this.toggleTasksExpand();
                        var n = !!this.viewItems;
                        n && this.initPagingSettings();
                        this.initTableStyles();
                        this.initStyles().then(jQuerySplst.proxy(this.initWidths, this)).then(jQuerySplst.proxy(function() {
                            var n = SPLST.ListTableLayoutEditor;
                            if (n.locale) this.onResourcesLoaded();
                            else jQuerySplst(document).one("splstlayouteditor.resouresloaded", this.onResourcesLoaded.bind(this))
                        }, this))
                    } catch (t) {
                        this._onError(t.message)
                    }
                },
                onResourcesLoaded: function() {
                    this.render();
                    this.updatePagingItemsCount();
                    this.initViewOptions();
                    this._updateHasLocalChanges()
                },
                _attachGridEvents: function() {
                    this._gridControl && this._ganttControl && (this._ganttControl.AttachRowChanged(jQuerySplst.proxy(this.onRowChanged, this)), this._gridControl.AttachEvent(SP.JsGrid.EventType.OnBeforeGridDispose, jQuerySplst.proxy(this.onBeforeGridDispose, this)), this._gridControl.AttachEvent(SP.JsGrid.EventType.OnEndRenameColumn, jQuerySplst.proxy(this.onEndRenameColumn, this)), this._gridControl.AttachEvent(SP.JsGrid.EventType.OnBeginRenameColumn, jQuerySplst.proxy(this.onBeginRenameColumn, this)), this._gridControl.AttachEvent(SP.JsGrid.EventType.OnCellEditCompleted, jQuerySplst.proxy(this.onCellEditCompleted, this)), this._gridControl.AttachEvent(SP.JsGrid.EventType.OnPropertyChanged, jQuerySplst.proxy(this.onGridPropertyChanged, this)), this._gridControl.AttachEvent(SP.JsGrid.EventType.OnRecordInserted, jQuerySplst.proxy(this.onRowInserted, this)), this._gridControl.AttachEvent(SP.JsGrid.EventType.OnRecordDeleted, jQuerySplst.proxy(this.onRowDeleted, this)))
                },
                getIsEnabledForList: function() {
                    var t = SPLST.ListTableLayoutEditor,
                        r = t.PROPERTY_BAG_PREFIX + t.PROPERTY_BAG_PLUGIN_VISIBILITY,
                        n = this._getPropertyBagItem(r),
                        i;
                    !n && this.importedListSettings && (i = this.importedListSettings.settings, i && (n = i[t.PROPERTY_BAG_PLUGIN_VISIBILITY]));
                    n = n ? n === "true" : t.isEnabled;
                    this.isEnabledForList = n
                },
                getIsMenuVisible: function() {
                    var t = SPLST.ListTableLayoutEditor,
                        n, r, i;
                    return t.Helper.isDefined(this.isMenuVisibleForList) || (n = !0, location.search.indexOf("IsDlg=1") !== -1 && (n = !window.parent), n && (r = t.PROPERTY_BAG_PREFIX + t.PROPERTY_BAG_PLUGIN_MENU_VISIBILITY, n = this._getPropertyBagItem(r), !n && this.importedListSettings && (i = this.importedListSettings.settings, i && (n = i[t.PROPERTY_BAG_PLUGIN_MENU_VISIBILITY])), n = n !== "false"), this.isMenuVisibleForList = n), this.isMenuVisibleForList
                },
                getIsQueryEnabled: function() {
                    var t = SPLST.ListTableLayoutEditor,
                        u, n, r, f, i;
                    return t.Helper.isDefined(this.isQueryEnabled) || (u = t.PROPERTY_BAG_PREFIX + t.PROPERTY_BAG_LIST_QUERY_ENABLED, n = this._getPropertyBagItem(u), !n && this.importedListSettings && (r = this.importedListSettings.settings, r && (n = r[t.PROPERTY_BAG_LIST_QUERY_ENABLED])), f = t.spWeb.get_lists().getByTitle(this.listName), n = f.get_itemCount() <= t.threshold ? n !== "false" : n === "true", i = this._getCLVP(), this.isQueryEnabled = n && (!i || !i.ctx || !i.ctx.completedSearchTerm) && !this.hasGrouping), this.isQueryEnabled
                },
                getIsExportEnabled: function() {
                    var n = SPLST.ListTableLayoutEditor,
                        u, t, i;
                    return n.Helper.isDefined(this.isExportEnabled) || (!n.isExportEnabled || r() ? this.isExportEnabled = !1 : (u = n.PROPERTY_BAG_PREFIX + n.PROPERTY_BAG_EXPORT_ENABLED, t = this._getPropertyBagItem(u), !t && this.importedListSettings && (i = this.importedListSettings.settings, i && (t = i[n.PROPERTY_BAG_EXPORT_ENABLED])), this.isExportEnabled = t !== "false")), this.isExportEnabled
                },
                getCurrentUserPermissionsForList: function() {
                    var n, t, i, r;
                    u[this.listName] || (u[this.listName] = {});
                    n = u[this.listName];
                    t = _spPageContextInfo.userId;
                    n[t] || (i = SPLST.ListTableLayoutEditor, r = i.spWeb.get_lists().getByTitle(this.listName), n[t] = r.get_effectiveBasePermissions());
                    this.sessionSettings.hasManageListsPermissions = n[t] && n[t].has(SP.PermissionKind.manageLists)
                },
                initViewOptionsVariables: function() {
                    var u = SPLST.ListTableLayoutEditor,
                        n = this._getAggregatePropObject(u.PROPERTY_BAG_OPTIONS_POSTFIX, "globalOptions", "localOptions"),
                        t, i, r;
                    return n ? (n.print && (t = n.print, t.printAll !== !1 ? (t.printAll = !0, t.columns = null) : (i = this.localOptions && this.localOptions.print && this.localOptions.print.columns, r = this.globalOptions && this.globalOptions.print && this.globalOptions.print.columns, t.columns = i || r)), this.aggregatedOptions = n, n) : (this.aggregatedOptions = null, null)
                },
                initViewOptions: function() {
                    if (this.aggregatedOptions === undefined && this.initViewOptionsVariables(), this.localOptions = jQuerySplst.extend(!0, {}, o, this.localOptions), this.aggregatedOptions) {
                        var n = jQuerySplst.Deferred();
                        return this.setViewOptions(this.aggregatedOptions), n.promise()
                    }
                },
                setViewOptions: function(n) {
                    n && n.freezeHeader && !this.isEditMode && (this.refreshFreezePaneEl(), this.refreshFreezedHeader(!0))
                },
                initPagingSettings: function() {
                    var i, s;
                    if (this.pagingSettings === undefined) {
                        var r = SPLST.ListTableLayoutEditor,
                            y = r.Helper,
                            p = r.spWeb.get_lists().getByTitle(this.listName),
                            h = this.view,
                            u = this.viewItems.get_count(),
                            f = h.get_rowLimit(),
                            c = h.get_paged() && u > f,
                            n = {};
                        if (c && !this.hasGrouping) {
                            n.isPaged = c;
                            n.itemsCount = u;
                            n.rowLimit = f;
                            var l, a, v = {},
                                o = this.viewId.slice(1, -1).toLowerCase(),
                                t = 1,
                                e = this._getCLVP();
                            e ? e.ctx && e.ctx.ListData && (t = e.ctx.ListData.FirstRow) : (v[o] = ["p_ID", "Paged", "PrevPaged", "PageFirstRow", "FirstRow"], i = y.getUrlParametersGroupByViewId(v), i && (i[o] ? (s = i[o], t = parseInt(s.PageFirstRow || s.FirstRow || 1)) : this.listTemplate === 171 && (t = i[r.COMMON_QUERY_PARAMS] && i[r.COMMON_QUERY_PARAMS].FirstRow || 1)));
                            t > u && (t = 1);
                            l = Math.ceil(u / f);
                            a = Math.ceil(t / f);
                            n.pageCount = l;
                            n.currentPage = a;
                            this.pagingSettings = n
                        } else this.pagingSettings = null
                    }
                },
                initPluginSettings: function() {
                    var t = SPLST.ListTableLayoutEditor,
                        r = this._getPropertyBagKey(t.PROPERTY_BAG_PLUGIN_SETTINGS_POSTFIX),
                        n = this._getPropertyBagItem(r),
                        i;
                    n && (n = JSON.parse(n));
                    i = this.importedStyles && this.importedStyles[t.PROPERTY_BAG_PLUGIN_SETTINGS_POSTFIX];
                    this.pluginSettings = jQuerySplst.extend(!0, {}, e, i, n)
                },
                initTableStyles: function() {
                    var i = SPLST.ListTableLayoutEditor,
                        n, t;
                    if (!r()) return (n = this._getAggregatePropObject(i.PROPERTY_BAG_TABLE_STYLE_POSTFIX, "globalTableStyles", "localTableStyles"), !n) ? void 0 : (t = jQuerySplst.Deferred(), this._callModulesMethod("setTableStyles", [n, this], t), t.promise())
                },
                initStylesVariables: function() {
                    var t = SPLST.ListTableLayoutEditor,
                        n = this._getAggregatePropObject(t.PROPERTY_BAG_STYLE_POSTFIX, "globalStyles", "localStyles");
                    if (!n) {
                        this.aggregatedStyles = null;
                        return
                    }
                    return this.localStyles = t.Helper.fixFieldNames(this.localStyles), this.globalStyles = t.Helper.fixFieldNames(this.globalStyles), this.aggregatedStyles = n = t.Helper.fixFieldNames(n), this._callModulesMethod("fixAggregatedStyles", [this, n, this.localStyles, this.globalStyles]), n
                },
                initStyles: function() {
                    this.aggregatedStyles === undefined && this.initStylesVariables();
                    var n = jQuerySplst.Deferred();
                    return r() ? n.resolve() : this._callModulesMethod("initStyles", [this.aggregatedStyles, this], n), n.promise()
                },
                initWidthsVariables: function() {
                    var n = SPLST.ListTableLayoutEditor,
                        t = this._getAggregatePropObject(n.PROPERTY_BAG_WIDTH_POSTFIX, "globalWidths", "localWidths");
                    if (!t) {
                        this.aggregatedWidths = null;
                        return
                    }
                    return this.localWidths = n.Helper.fixFieldNames(this.localWidths), this.globalWidths = n.Helper.fixFieldNames(this.globalWidths), this.aggregatedWidths = n.Helper.fixFieldNames(t), this.aggregatedWidths
                },
                initWidths: function() {
                    this.aggregatedWidths === undefined && this.initWidthsVariables();
                    var n = jQuerySplst.Deferred();
                    return r() ? n.resolve() : this._callModulesMethod("setSizes", [this.aggregatedWidths, this], n), n.promise()
                },
                _getAggregatePropObject: function(n, t, i) {
                    var s = SPLST.ListTableLayoutEditor,
                        e = this._getPropertyBagKey(n),
                        u = this._getPropertyBagItem(e + s.PROPERTY_BAG_GLOBAL_POSTFIX),
                        f = this._getPropertyBagItem(e + "_" + _spPageContextInfo.userId),
                        r = jQuerySplst.cookie(e + "_" + _spPageContextInfo.userId) || null,
                        o = this.importedStyles && this.importedStyles[n];
                    return (u || o) && (u = this[t] = jQuerySplst.extend(!0, {}, o, JSON.parse(u))), f && (f = this[i] = JSON.parse(f)), r && (r = JSON.parse(r), this[i] = jQuerySplst.extend(!0, this[i], r)), u || f || r ? jQuerySplst.extend(!0, {}, u, f, r) : null
                },
                clearTableStyles: function() {
                    var n = jQuerySplst.Deferred();
                    return this._callModulesMethod("clearTableStyles", [this], n), n.promise()
                },
                _generateCorrectCssClassName: function(n, t) {
                    var i = SPLST.ListTableLayoutEditor,
                        f = this.isEditMode,
                        r = this.viewId.slice(1, -1),
                        u = n.replace(/[^_\-a-zA-Z0-9]/g, "");
                    return i.PROPERTY_BAG_PREFIX + r + u + (t ? i.COLUMN : i.HEAD) + (this.isEditMode ? i.PROPERTY_BAG_EDIT_MODE_POSTFIX : "")
                },
                _clearListViewStyles: function() {
                    var n = SPLST.ListTableLayoutEditor,
                        e = this.sessionSettings.areLocalChanges,
                        c = this.isEditMode,
                        o = _spPageContextInfo.userId,
                        i, o = _spPageContextInfo.userId,
                        r, t = this.listName,
                        u = n.allProperties[t],
                        s = n.spWeb.get_lists().getByTitle(t),
                        h = s.get_rootFolder(),
                        f = n.PROPERTY_BAG_TABLE_STYLE_POSTFIX;
                    e ? (r = this._getPropertyBagKey(f, !1) + "_" + o, jQuerySplst.cookie(r, "")) : this.getIsExportEnabled() && n.saveViewStyles(t, this.listId, this.view, {
                        tableStyles: null
                    }, this, !1);
                    u && (i = this._getPropertyBagKey(f, !0), u.set_item(i, null), h.update(), this.executeQueryAsync())
                },
                _setListViewStyles: function(n) {
                    var e;
                    if (n) {
                        var r = new jQuerySplst.Deferred,
                            u = SPLST.ListTableLayoutEditor,
                            f = this.sessionSettings.areLocalChanges,
                            t = f ? "localTableStyles" : "globalTableStyles",
                            o = n.cleared,
                            i = null;
                        return delete n.cleared, o === !0 && delete this[t].selectedTemplateId, this[t] = jQuerySplst.extend(!0, this[t], n), this[t].selectedTemplateId === undefined && this[t].cellBorders === undefined ? delete this[t] : i = JSON.stringify(this[t]), e = jQuerySplst.extend(!0, {}, this.globalTableStyles, this.localTableStyles), this._callModulesMethod("setTableStyles", [e, this]), i ? this._savePropertyBagItems(u.PROPERTY_BAG_TABLE_STYLE_POSTFIX, i, r) : this._clearListViewStyles(), !f && this.getIsExportEnabled() && u.saveViewStyles(this.listName, this.listId, this.view, {
                            tableStyles: n
                        }, this), r
                    }
                },
                _setFieldStyles: function(n, t, i) {
                    var s = SPLST.ListTableLayoutEditor,
                        b = s.Helper,
                        e = this.sessionSettings.areLocalChanges,
                        k = this.isEditMode,
                        w = _spPageContextInfo.userId,
                        o = this.localStyles,
                        u = this.globalStyles,
                        r = e ? o : u,
                        l = new jQuerySplst.Deferred,
                        f, a, y, h, c, p, v;
                    return e && !o ? r = o = this.localStyles = {} : e || u || (r = u = this.globalStyles = {}), r[n] || (r[n] = {}), f = {}, i.displayAsHTML && (f.displayAsHTML = i.displayAsHTML), a = {}, this._callModulesMethod("getDependentColumns", [this, r[n], i, a]), this._callModulesMethod("mergeStyles", [r[n], i, f]), i.version && (f.version = i.version), this._callModulesMethod("updateDependentStyles", [n, f, r]), r[n] = f, y = JSON.parse(JSON.stringify(r[n])), jQuerySplst.each(y, function(t, i) {
                        i == null && delete r[n][t]
                    }), h = this.aggregatedStyles = jQuerySplst.extend(!0, {}, u, o), this._callModulesMethod("fixAggregatedStyles", [this, h, this.localStyles, this.globalStyles]), this._callModulesMethod("setColumnStyles", [h[n], this, n, t], l), c = this, jQuerySplst.each(a, function(n, t) {
                        var i, r;
                        t && (i = c.$table.find("th[data-splst-field-name=" + n + "]"), i.length && (r = i.attr("data-splst-index"), c._callModulesMethod("setColumnStyles", [h[n], c, n, r], l)))
                    }), v = JSON.stringify(e ? o : u), p = this._getPropertyBagKey(s.PROPERTY_BAG_STYLE_POSTFIX, !0), this.beginUpdate(), this._savePropertyBagItem(p, v, null, jQuerySplst.proxy(function(n, t) {
                        if (t.get_errorTypeName() === "System.UnauthorizedAccessException") {
                            var i = this._getPropertyBagKey(s.PROPERTY_BAG_STYLE_POSTFIX) + "_" + w;
                            jQuerySplst.cookie(i, v, {
                                expires: 17532
                            })
                        }
                    }, this)), !e && this.getIsExportEnabled() && s.saveViewStyles(this.listName, this.listId, this.view, {
                        styles: u
                    }, this), this.endUpdate(), l.promise()
                },
                saveStyles: function(n) {
                    if (n) {
                        var t = new jQuerySplst.Deferred,
                            i = SPLST.ListTableLayoutEditor,
                            r = this.sessionSettings.areLocalChanges,
                            u = JSON.stringify(n);
                        return r ? this.localStyles = n : this.globalStyles = n, this._savePropertyBagItems(i.PROPERTY_BAG_STYLE_POSTFIX, u, t), t
                    }
                },
                saveSizes: function(n) {
                    if (n) {
                        var i = new jQuerySplst.Deferred,
                            u = SPLST.ListTableLayoutEditor,
                            r = this.sessionSettings.areLocalChanges,
                            t = jQuerySplst.extend(!0, {}, r ? this.localWidths : this.globalWidths, n),
                            f = JSON.stringify(t);
                        return r ? this.localWidths = t : this.globalWidths = t, this._savePropertyBagItems(u.PROPERTY_BAG_WIDTH_POSTFIX, f, i), i
                    }
                },
                saveFreezeHeaderOptions: function(n) {
                    var t, r, i;
                    if (n) return t = new jQuerySplst.Deferred, r = {
                        freezeHeader: n
                    }, this.saveViewOptions(r, t), i = this.getFreezedHeader(), i && i.state !== SPLST.ListTableLayoutEditor.FREEZE_STATES.unfreeze && t.resolve(), t
                },
                saveViewOptions: function(n, t) {
                    if (n) {
                        var u = t || new jQuerySplst.Deferred,
                            f = SPLST.ListTableLayoutEditor,
                            r = this.sessionSettings.areLocalChanges,
                            e = r ? this.localOptions : this.globalOptions,
                            i = this._mergeOptions(e, n),
                            o = JSON.stringify(i);
                        return r ? this.localOptions = i : this.globalOptions = i, this.beginUpdate(), !r && this.getIsExportEnabled() && f.saveViewStyles(this.listName, this.listId, this.view, {
                            options: i
                        }, this), this._savePropertyBagItems(f.PROPERTY_BAG_OPTIONS_POSTFIX, o, u), this.endUpdate(), t ? void 0 : u
                    }
                },
                saveSettings: function(n) {
                    var t = SPLST.ListTableLayoutEditor,
                        i = this._getPropertyBagKey(t.PROPERTY_BAG_PLUGIN_SETTINGS_POSTFIX);
                    this.beginUpdate();
                    this._savePropertyBagItem(i, n);
                    this.getIsExportEnabled() && t.saveViewStyles(this.listName, this.listId, this.view, {
                        pluginSettings: n
                    }, this);
                    this.endUpdate()
                },
                _savePropertyBagItems: function(n, t, i) {
                    if (t) {
                        var r = i || new jQuerySplst.Deferred,
                            e = SPLST.ListTableLayoutEditor,
                            u = _spPageContextInfo.userId,
                            f = this._getPropertyBagKey(n, !0);
                        return this._savePropertyBagItem(f, t, function() {
                            r.resolve()
                        }, jQuerySplst.proxy(function(i, f) {
                            if (f.get_errorTypeName() === "System.UnauthorizedAccessException") {
                                var e = this._getPropertyBagKey(n) + "_" + u;
                                jQuerySplst.cookie(e, t, {
                                    expires: 17532
                                })
                            }
                            r.resolve()
                        }, this)), i ? void 0 : r
                    }
                },
                _savePropertyBagItem: function(n, t, i, r) {
                    var u = SPLST.ListTableLayoutEditor,
                        f = this.listName,
                        e = u.allProperties[f],
                        s = jQuerySplst.type(t) === "object" ? JSON.stringify(t) : t,
                        o;
                    e && (e.set_item(n, s), o = u.spWeb.get_lists().getByTitle(f), o.get_rootFolder().update(), this.executeQueryAsync(i, r))
                },
                _getPropertyBagItem: function(n) {
                    var t = SPLST.ListTableLayoutEditor,
                        r, u, f, i;
                    return (t.allProperties[this.listName] || (r = t.spWeb.get_lists().getByTitle(this.listName), u = r.get_rootFolder(), t.allProperties[this.listName] = u.get_properties()), f = t.allProperties[this.listName], i = f.get_fieldValues(), i && i[n]) ? i[n] : null
                },
                _resetLocalStyles: function(n) {
                    var i = SPLST.ListTableLayoutEditor,
                        a = _spPageContextInfo.userId,
                        h = this.listName,
                        o = i.allProperties[h],
                        v = i.spWeb.get_lists().getByTitle(h),
                        y = v.get_rootFolder(),
                        f = "_" + a,
                        c = this.sessionSettings.hasManageListsPermissions,
                        r = [],
                        t = "",
                        u, s, e, l;
                    if (n.styles && (t = this._getPropertyBagKey(i.PROPERTY_BAG_STYLE_POSTFIX, !1) + f, r.push(t), jQuerySplst.cookie(t, "")), n.widths && (t = this._getPropertyBagKey(i.PROPERTY_BAG_WIDTH_POSTFIX, !1) + f, r.push(t), jQuerySplst.cookie(t, "")), n.tableStyles && (t = this._getPropertyBagKey(i.PROPERTY_BAG_TABLE_STYLE_POSTFIX, !1) + f, r.push(t), jQuerySplst.cookie(t, "")), t = this._getPropertyBagKey(i.PROPERTY_BAG_OPTIONS_POSTFIX, !1) + f, (n.freezeHeader || n.print) && (n.freezeHeader && n.print ? (r.push(t), jQuerySplst.cookie(t, "")) : (u = this.localOptions, n.freezeHeader && delete u.freezeHeader, n.print && delete u.print, u.print || u.freezeHeader ? (s = JSON.stringify(u), jQuerySplst.cookie(t, s), c && o.set_item(t, s)) : (r.push(t), jQuerySplst.cookie(t, "")))), o && c) {
                        for (e = 0, l = r.length; e < l; e++) o.set_item(r[e], null);
                        y.update();
                        this.executeQueryAsync(function() {
                            location.reload()
                        }, function() {
                            SP.UI.Notify.addNotification("<span>" + i.locale.messages.clearChangesFailMessage + "<\/span>")
                        })
                    } else location.reload()
                },
                _clearAll: function(n, t, i) {
                    var r = SPLST.ListTableLayoutEditor,
                        v = _spPageContextInfo.userId,
                        o = this.listName,
                        u = r.allProperties[o],
                        y = r.spWeb.get_lists().getByTitle(o),
                        p = y.get_rootFolder(),
                        s = this.sessionSettings.areLocalChanges,
                        f = "_" + v,
                        e = r.PROPERTY_BAG_GLOBAL_POSTFIX,
                        w = this.sessionSettings.hasManageListsPermissions,
                        nt = this.isEditMode;
                    n = n || {
                        clearLocal: s,
                        clearGlobal: !s
                    };
                    var h = this._getPropertyBagKey(r.PROPERTY_BAG_WIDTH_POSTFIX, !1),
                        c = this._getPropertyBagKey(r.PROPERTY_BAG_STYLE_POSTFIX, !1),
                        l = this._getPropertyBagKey(r.PROPERTY_BAG_TABLE_STYLE_POSTFIX, !1),
                        a = this._getPropertyBagKey(r.PROPERTY_BAG_OPTIONS_POSTFIX, !1),
                        b = this._getPropertyBagKey(r.PROPERTY_BAG_WIDTH_POSTFIX, !1) + f,
                        k = this._getPropertyBagKey(r.PROPERTY_BAG_STYLE_POSTFIX, !1) + f,
                        d = this._getPropertyBagKey(r.PROPERTY_BAG_TABLE_STYLE_POSTFIX, !1) + f,
                        g = this._getPropertyBagKey(r.PROPERTY_BAG_OPTIONS_POSTFIX, !1) + f;
                    n.clearLocal && (jQuerySplst.cookie(b, ""), jQuerySplst.cookie(k, ""), jQuerySplst.cookie(d, ""), jQuerySplst.cookie(g, ""));
                    u && w ? (n.clearLocal && (u.set_item(h + f, null), u.set_item(c + f, null), u.set_item(l + f, null), u.set_item(a + f, null)), n.clearGlobal && (u.set_item(h + e, null), u.set_item(c + e, null), u.set_item(l + e, null), u.set_item(a + e, null), !i && this.getIsExportEnabled() && r.clearViewStyles(this, this.view, !1)), (n.clearLocal || n.clearGlobal) && (p.update(), this.executeQueryAsync(function() {
                        t || location.reload()
                    }, function() {
                        SP.UI.Notify.addNotification("<span>" + r.locale.messages.clearChangesFailMessage + "<\/span>")
                    }))) : t || location.reload()
                },
                _getListInfoFromTable: function() {
                    var n = this.isEditMode ? this.parentTable : this.table,
                        r = n && n.getAttribute("o:webquerysourcehref"),
                        u = this._getCLVP(),
                        i, f;
                    u && u.ctx ? (i = u.ctx, this.viewId = i.view, this.listName = i.ListTitle, this.listId = i.listName, this.isClientRendering = i.IsClientRendering) : (r && (this.viewId = unescapeProperly(r.slice(r.indexOf("View=") + 5))), this.listName = n && n.getAttribute("summary"), this.listId = n.id.split("}-{")[0] + "}", f = t.closest(n, "div"), f && f.className.indexOf("nf-filler-control") !== -1 && (this.listName = this.listName.slice(0, -1)), this.isClientRendering = !1)
                },
                _getSizeInfoForGroupingFix: function() {
                    var t = this.$table,
                        n;
                    this.hasGrouping && (n = t.find('tbody[id*="tbod"][isloaded="true"]:not([style*="display: none;"])'), this.isExpanded = !!n.length)
                },
                _updateWidthsAfterGroupExpand: function(n) {
                    var u = this.isHeaderFreezed,
                        l = SPLST.ListTableLayoutEditor,
                        a = u ? l.getScrollbarWidth() : 0,
                        f, e, i, h, r, s;
                    for (this.aggregatedWidths === undefined && this.initWidthsVariables(), widths = t.getColWidthsWithTempTable(this.$table, this.aggregatedWidths), cellsWidths = widths.widths, totalWidth = widths.tableWidth, f = this.table.rows[0].cells, e = u && n && n.length ? n[0].rows[0].cells : null, this.$table.outerWidth(totalWidth + a), this.groupedCell && jQuerySplst(this.groupedCell).outerWidth(totalWidth), this.cellSizes || (this.cellSizes = []), i = 0, h = cellsWidths.length; i < h; i++)
                        if (r = cellsWidths[i], this.cellSizes[i] = r, u) jQuerySplst(f[i]).outerWidth(r), e && jQuerySplst(e[i]).outerWidth(r);
                        else {
                            var o = f[i],
                                v = o.style,
                                c = v.width;
                            if (!c) continue;
                            s = o.offsetWidth;
                            s != r && (o.style.width = parseFloat(c) + (r - s) + "px")
                        }
                },
                _fixUIAfterGroupExpand: function(n) {
                    var o, i, e, s, h;
                    n && (o = arguments.callee.caller, i = n.OnPostRender.indexOf(o), i !== -1 && n.OnPostRender.splice(i, 1));
                    var r = this.$table,
                        u = r.find('tbody[id*="tbod"][isloaded="true"]:not([style*="display: none;"])'),
                        f = !!u.length;
                    f ? this._updateWidthsAfterGroupExpand(u) : f != this.isExpanded && (this.isHeaderFreezed && (e = r.find(".ms-headerCellStyleIcon"), s = e.children().outerWidth(), e.outerWidth(s), h = r.find('th:not([scope="col"])'), h.css("width", "0px")), this._updateWidthsAfterGroupExpand(u));
                    this.isExpanded = f;
                    t.fixColSpans(this.table);
                    this._refreshResizersControl()
                },
                _onError: function(n) {
                    SPLST.ListTableLayoutEditor.trace && SPLST.ListTableLayoutEditor.logError(this, n);
                    n && console.log(n);
                    this.table && SPLST.ListTableLayoutEditor.showTable(this.table, this.isEditMode ? this.parentTable : null);
                    this.dispose()
                },
                _getPropertyBagKeySpecificScope: function(n, t) {
                    var i = SPLST.ListTableLayoutEditor,
                        r = i.PROPERTY_BAG_PREFIX + this.viewId + n,
                        u = _spPageContextInfo.userId;
                    return r + (t ? "_" + u : i.PROPERTY_BAG_GLOBAL_POSTFIX)
                },
                _getPropertyBagKey: function(n, t) {
                    var i = SPLST.ListTableLayoutEditor,
                        r = i.PROPERTY_BAG_PREFIX + this.viewId + n,
                        u;
                    return t && (u = _spPageContextInfo.userId, r += this.sessionSettings.areLocalChanges ? "_" + u : i.PROPERTY_BAG_GLOBAL_POSTFIX), r
                },
                _showClearAllConfirmationDialog: function() {
                    var r = jQuerySplst("<div><\/div>"),
                        n = [],
                        s = this.sessionSettings.areLocalChanges,
                        e = SPLST.ListTableLayoutEditor,
                        o = SPLST.ListTableLayoutEditor.Helper,
                        t = e.locale.messages,
                        i = this.sessionSettings.hasManageListsPermissions,
                        u, f;
                    i ? (n.push('<div class="splst-layout-editor-dlg-row"><span>' + t.clearAllOptionsHeader + "<\/span><\/div><br />"), n.push('<div class="splst-layout-editor-dlg-row"><label><input type="checkbox" class="splst-layout-editor-scope-cbx" id="splst-layout-editor-global-cbx" />' + t.clearAllGlobal + "<\/label><\/div>"), n.push('<div class="splst-layout-editor-dlg-row"><label><input type="checkbox" class="splst-layout-editor-scope-cbx" id="splst-layout-editor-local-cbx" />' + t.clearAllLocal + "<\/label><\/div><br />"), n.push('<div class="splst-layout-editor-dlg-row"><span class="splst-layout-editor-warning">' + t.clearAllWarning + "<\/span><\/div>")) : n.push('<div class="splst-layout-editor-dlg-row"><span>' + t.clearAllQuestion + "<\/span><\/div>");
                    n.push('<div class="splst-layout-editor-dlg-row">' + o.generatePoweredByBlockForDialogs() + "<\/div>");
                    n.push('<div class="ms-core-form-bottomButtonBox">');
                    n.push('<button id="splst-layout-editor-OkBtnDismissDlg" class="ms-ButtonHeightWidth" ');
                    n.push('value="ok"' + (i ? ' disabled="disabled"' : "") + ' onclick="SPLST.ListTableLayoutEditor.dismissClearAllConfDialog(this, ' + i.toString() + ')">');
                    n.push(SP.Res.okButtonText);
                    n.push("<\/button>");
                    n.push('<button id="splst-layout-editor-CancelBtnDismissDlg" class="ms-ButtonHeightWidth" ');
                    n.push('value="cancel" onclick="SPLST.ListTableLayoutEditor.dismissClearAllConfDialog(this)">');
                    n.push(SP.Res.cancelButtonText);
                    n.push("<\/button>");
                    n.push("<\/div>");
                    r.html(n.join(""));
                    u = {
                        html: r[0],
                        title: t.clearAllTitle,
                        dialogReturnValueCallback: jQuerySplst.proxy(this.onClearAllConfDialogReturnValueCallback, this)
                    };
                    f = new SP.UI.ModalDialog.showModalDialog(u);
                    f.autoSize();
                    jQuerySplst(".splst-layout-editor-scope-cbx").click(function() {
                        var t = jQuerySplst("#splst-layout-editor-global-cbx")[0].checked || jQuerySplst("#splst-layout-editor-local-cbx")[0].checked,
                            n = jQuerySplst("#splst-layout-editor-OkBtnDismissDlg");
                        t ? n.removeAttr("disabled") : n.attr("disabled", "disabled")
                    })
                },
                onClearAllConfDialogReturnValueCallback: function(n, t) {
                    n && this._clearAll(t)
                },
                _showAboutDialog: function() {
                    var h = jQuerySplst("<div><\/div>"),
                        i = SPLST.ListTableLayoutEditor,
                        n = [],
                        r = i.locale.messages,
                        t = r.aboutDialog,
                        u = i.locale.styles,
                        s, f, e, c, l, a, v, y, o, p, w;
                    n.push('<div class="splst-layout-editor-dlg-row">');
                    n.push('<div class="splst-lb-about-col splst-lb-float-left" style="' + u.aboutCol.style + '">');
                    n.push('<div class="splst-lb-about-col-content">');
                    n.push('<img src="' + this.imgBaseUrl + i.contentPath + 'plugin_logo.png" width="305" alt="' + t.pluginNamePlain + '" />');
                    n.push("<\/div>");
                    n.push("<\/div>");
                    n.push('<div class="splst-lb-about-col splst-lb-float-right" style="' + u.aboutCol.style + '">');
                    n.push('<div class="splst-lb-about-col-content license-info">');
                    n.push('<div class="license-info-content">');
                    i.customerTitle && n.push('<div class="splst-lb-about-customer">' + t.customer.replace("{0}", i.customerTitle) + "<\/div>");
                    i.isTrial ? (s = "", s = i.trialLeftDays ? i.trialLeftDays <= 0 ? t.trialExpired : r.trialVersion + " " + r.trialLeft.replace("{0}", i.trialLeftDays) : r.trialVersion, n.push('<div class="splst-lb-about-col-content trial"><span class="splst-layout-editor-trial">' + s + "<\/span><\/div>"), hasTrialBlock = !0) : i.licenseExpirationDate && (n.push('<div class="splst-lb-about-license">' + t.licenseInfo.replace("{0}", i.disableFeatures ? t.subscription : t.perpetual).replace("{1}", moment(i.licenseExpirationDate).format(i.webDateFormat)) + "<\/div>"), f = "", e = i.getLicenseLeftDays(), e <= 0 ? f = r.licenseExpired : e <= i.licExpDaysCnt && (f = r.licenseExpiring.replace("{0}", e)), f && (n.push('<div class="splst-lb-about-col-content trial"><span class="splst-layout-editor-trial">' + f + "<\/span><\/div>"), hasTrialBlock = !0));
                    n.push("<\/div>");
                    n.push("<\/div>");
                    n.push("<\/div>");
                    n.push('<div class="splst-layout-editor-clear"><\/div>');
                    n.push("<\/div>");
                    n.push('<div class="splst-layout-editor-dlg-row">');
                    n.push('<div class="splst-lb-about-col splst-lb-float-left" style="' + u.aboutCol.style + '">');
                    n.push('<div class="splst-lb-about-col-content">');
                    n.push('<div class="splst-lb-about-header">' + t.product + i.version + "<\/div>");
                    n.push('<div class="splst-lb-about-subheader">' + t.edition.replace("{0}", i.CFDisabled ? r.staticColumnSettingsTabTitle : r.conditionalFormatting.columnSettingsTabTitle).replace("{1}", i.isExportEnabled ? "&nbsp;" + r.pro : "").replace("{2}", r.edition) + "<\/div>");
                    n.push("<\/div>");
                    c = String.format(t.eulaHref, this.imgBaseUrl);
                    l = '<a href="' + c + '" class="splst-layout-editor-eula">' + t.eulaHrefText + "<\/a>";
                    n.push('<div class="splst-lb-about-col-content">');
                    n.push('<span class="splst-layout-editor-eula-warning">' + String.format(t.eulaWarning, l) + "<\/span>");
                    n.push("<\/div>");
                    n.push('<div class="splst-lb-about-col-content">');
                    n.push('<span class="splst-layout-editor-copyright-warning">' + t.copyrightWarning + "<\/span>");
                    n.push("<\/div>");
                    n.push('<div class="splst-lb-about-col-content">');
                    n.push('<span class="splst-lb-copyright">' + String.format(t.copyright, (new Date).getFullYear()) + "<\/span>");
                    n.push("<\/div>");
                    n.push("<\/div>");
                    n.push('<div class="splst-lb-about-col splst-lb-float-right" style="' + u.aboutCol.style + '">');
                    n.push('<div class="splst-lb-about-col-content">');
                    n.push('<span class="splst-lb-about-header">' + t.needHelp + "<\/span>");
                    n.push("<\/div>");
                    a = String.format(t.manualHref, this.imgBaseUrl, i.rev);
                    n.push('<div class="splst-lb-about-col-content">');
                    n.push('<div class="splst-lb-about-video"><a href="https://www.youtube.com/channel/UC8sYJYaEiQEN6JO3k2tq48g">' + t.video + "<\/a><\/div>");
                    n.push('<div class="splst-lb-about-manual"><a href="' + a + '">' + t.manual + "<\/a><\/div>");
                    n.push("<\/div>");
                    n.push('<div class="splst-lb-about-col-content new-block">');
                    n.push('<span class="splst-lb-about-header">' + t.haveFeedback + "<\/span>");
                    n.push("<\/div>");
                    v = t.mailtoHref.replace("{Version}", i.version).replace("{browser}", navigator.userAgent);
                    y = '<a href="' + v + '" class="splst-layout-editor-mailto">' + t.clickHere + "<\/a>";
                    n.push('<div class="splst-lb-about-col-content">');
                    n.push('<div class="splst-lb-about-feedback">' + String.format(t.appreciateFeedback, y) + "<\/div>");
                    n.push("<\/div>");
                    n.push("<\/div>");
                    n.push('<div class="splst-layout-editor-clear"><\/div>');
                    n.push("<\/div>");
                    h.html(n.join(""));
                    o = u.aboutDlg.height || 340;
                    i.isFF && u.aboutDlg.ff && (o = u.aboutDlg.ff.height || o);
                    p = {
                        html: h[0],
                        title: t.title,
                        width: u.aboutDlg.width || 690,
                        height: o
                    };
                    w = new SP.UI.ModalDialog.showModalDialog(p)
                },
                _showScopeDialog: function() {
                    var u = jQuerySplst("<div><\/div>"),
                        f = SPLST.ListTableLayoutEditor,
                        i = f.Helper,
                        n = [],
                        s = this.sessionSettings.areLocalChanges,
                        h = this.sessionSettings.isPersonalView,
                        c = this.pluginSettings,
                        o = this.sessionSettings.hasManageListsPermissions,
                        t = f.locale.messages.publishDialog,
                        e, r;
                    n.push('<div class="splst-layout-editor-dlg-row"><span class="splst-layout-editor-scope-info">');
                    o ? (n.push(t.customStylesInfo), n.push("<\/span><\/div>"), n.push('<div class="splst-layout-editor-dlg-row" data-lb-id="custom-styles-publish-or-reset">' + t.publishOrResetCustomStylesActions.replace("{0}", '<a href="javascript:;" data-lb-action="custom-styles-publish">' + t.publishStyles + "<\/a>").replace("{1}", '<a href="javascript:;" data-lb-action="custom-styles-init-reset">' + t.resetStyles + "<\/a>") + "<\/div>")) : (n.push(t.customStylesNoPermsInfo), n.push("<\/span><\/div><br/>"), n.push('<div class="splst-layout-editor-dlg-row" data-lb-id="custom-styles-publish-or-reset"><a href="javascript:;" data-lb-action="custom-styles-init-reset">' + t.resetStyles + "<\/a><\/div>"));
                    n.push('<div class="splst-layout-editor-dlg-row" data-lb-id="custom-styles-reset-items" style="display: none;">');
                    this.localStyles && !i.isEmptyObject(this.localStyles) && n.push('<div><label><input type="checkbox" data-lb-id="custom-styles-col-styles-cbx" checked />' + t.columnsStyles + "<\/label><\/div>");
                    this.localWidths && !i.isEmptyObject(this.localWidths) && n.push('<div><label><input type="checkbox" data-lb-id="custom-styles-col-widths-cbx" checked />' + t.columnsWidths + "<\/label><\/div>");
                    this.localTableStyles && !i.isEmptyObject(this.localTableStyles) && n.push('<div><label><input type="checkbox" data-lb-id="custom-styles-tbl-styles-cbx" checked />' + t.tableStyles + "<\/label><\/div>");
                    this.localOptions && !i.isEmptyObject(this.localOptions) && this.localOptions.freezeHeader && this.localOptions.freezeHeader.state !== SPLST.ListTableLayoutEditor.FREEZE_STATES.inherit && n.push('<div><label><input type="checkbox" data-lb-id="custom-styles-opts-cbx" checked />' + t.freezeHeader + "<\/label><\/div>");
                    this.localOptions && !i.isEmptyObject(this.localOptions) && this.localOptions.print && !i.isEmptyObject(this.localOptions.print) && n.push('<div><label><input type="checkbox" data-lb-id="custom-styles-print-cbx" checked />' + t.print + "<\/label><\/div>");
                    n.push('<div data-lb-id="custom-styles-buttons">');
                    n.push('<button id="splst-layout-editor-OkBtnDismissDlg" class="ms-ButtonHeightWidth" ');
                    n.push('data-lb-action="custom-styles-reset">' + t.resetSelected + "<\/button>");
                    n.push('<button data-lb-action="custom-styles-cancel" class="ms-ButtonHeightWidth">');
                    n.push(SP.Res.cancelButtonText);
                    n.push("<\/button>");
                    n.push("<\/div>");
                    n.push("<\/div>");
                    n.push('<div class="splst-layout-editor-dlg-row">' + i.generatePoweredByBlockForDialogs() + "<\/div>");
                    u.html(n.join(""));
                    e = {
                        html: u[0],
                        title: t.title,
                        dialogReturnValueCallback: jQuerySplst.proxy(this.onScopeDialogReturnValueCallback, this)
                    };
                    r = new SP.UI.ModalDialog.showModalDialog(e);
                    r.autoSize();
                    jQuerySplst('[data-lb-action="custom-styles-init-reset"]').click(function() {
                        jQuerySplst('[data-lb-id="custom-styles-reset-items"]').show();
                        jQuerySplst('[data-lb-id="custom-styles-publish-or-reset"]').hide();
                        r.autoSize()
                    });
                    jQuerySplst('[data-lb-action="custom-styles-reset"], [data-lb-action="custom-styles-publish"], [data-lb-action="custom-styles-cancel"]').click(SPLST.ListTableLayoutEditor.dismissScopeDialog)
                },
                onScopeDialogReturnValueCallback: function(n, t) {
                    var i, o;
                    if (t)
                        if (t.action === "reset") this._resetLocalStyles(t.settings);
                        else if (t.action === "publish") {
                        i = SPLST.ListTableLayoutEditor;
                        this.beginUpdate();
                        var u = jQuerySplst.extend(!0, {}, this.globalWidths, this.localWidths),
                            r = jQuerySplst.extend(!0, {}, this.globalStyles, this.localStyles),
                            f = jQuerySplst.extend(!0, {}, this.globalTableStyles, this.localTableStyles),
                            e = this._mergeOptions(this.globalOptions, this.localOptions);
                        this._callModulesMethod("fixAggregatedStyles", [this, r, this.localStyles, this.globalStyles]);
                        this._clearAll({
                            clearLocal: !0,
                            clearGlobal: !0
                        }, !0, !0);
                        delete this.globalWidths;
                        delete this.globalStyles;
                        delete this.globalTableStyles;
                        delete this.globalOptions;
                        delete this.localWidths;
                        delete this.localStyles;
                        delete this.localTableStyles;
                        delete this.localOptions;
                        this._callModulesMethod("switchStylesScope", [r, !1]);
                        this.sessionSettings.areLocalChanges = !1;
                        this._setListViewStyles(f);
                        this.saveStyles(r);
                        this.saveSizes(u);
                        this.saveViewOptions(e);
                        this.sessionSettings.areLocalChanges = !0;
                        this.getIsExportEnabled() && i.saveViewStyles(this.listName, this.listId, this.view, {
                            styles: r,
                            tableStyles: f,
                            widths: u,
                            options: e,
                            pluginSettings: this.pluginSettings
                        }, this);
                        o = this;
                        this.addSuccessBatchQueryExecutionHandler(function() {
                            o._updateHasLocalChanges(!1);
                            i.showNotificationDlg(i.locale.messages.published)
                        });
                        this.endUpdate()
                    }
                },
                _showTableStylesDialog: function() {
                    var o = jQuerySplst("<div><\/div>"),
                        t = SPLST.ListTableLayoutEditor,
                        c = t.Helper,
                        f = t.locale.messages,
                        n = [],
                        v = this.sessionSettings.areLocalChanges,
                        y = this.isEditMode,
                        s, e = r(),
                        u = e || t.isTrial && t.disableFeatures && (!t.trialLeftDays || t.trialLeftDays <= 0),
                        i = this.localTableStyles && this.localTableStyles.selectedTemplateId || this.globalTableStyles && this.globalTableStyles.selectedTemplateId,
                        l = !!jQuerySplst.extend({}, this.globalTableStyles, this.localTableStyles).cellBorders,
                        h, a;
                    i && (s = t.TableTemplates.light[i] || t.TableTemplates.medium[i] || t.TableTemplates.dark[i]);
                    n.push('<div class="splst-layout-editor-dlg-row">');
                    n.push(t.ResizersControl.getTableSettingsHTML(jQuerySplst(this), i));
                    n.push("<\/div>");
                    (u || e) && (n.push('<div class="splst-layout-editor-dlg-row" style="margin-top: 10px;">'), n.push('<span class="splst-layout-editor-trial" style="margin-left: 0px;">' + (e ? f.licenseExpiredExtended : f.trialExpiredExtended) + "<\/span>"), n.push("<\/div>"));
                    n.push('<div class="splst-layout-editor-dlg-row">' + c.generatePoweredByBlockForDialogs() + "<\/div>");
                    n.push('<div class="ms-core-form-bottomButtonBox">');
                    n.push('<button id="splst-layout-editor-OkBtnDismissDlg" class="ms-ButtonHeightWidth" ');
                    n.push('value="ok" ' + (u || !0 ? 'disabled="disabled"' : "") + ' onclick="SPLST.ListTableLayoutEditor.dismissTableStylesDialog(this)">');
                    n.push(SP.Res.okButtonText);
                    n.push("<\/button>");
                    n.push('<button id="splst-layout-editor-CancelBtnDismissDlg" class="ms-ButtonHeightWidth" ');
                    n.push('value="cancel" onclick="SPLST.ListTableLayoutEditor.dismissTableStylesDialog(this)">');
                    n.push(SP.Res.cancelButtonText);
                    n.push("<\/button>");
                    n.push("<\/div>");
                    o.html(n.join(""));
                    h = {
                        html: o[0],
                        title: f.tableSettings,
                        height: u ? 540 : 510,
                        width: 600,
                        dialogReturnValueCallback: jQuerySplst.proxy(this.onTableStylesDialogReturnValueCallback, this)
                    };
                    a = new SP.UI.ModalDialog.showModalDialog(h);
                    this._triggerEvent("tableSettingsDialogOpened", {
                        tableStyle: s,
                        isDisabled: u,
                        selectedStyleId: i,
                        cellBorders: l
                    })
                },
                onTableStylesDialogReturnValueCallback: function(n, t) {
                    if (n) {
                        var i = SPLST.ListTableLayoutEditor,
                            r = i.isTrial && i.disableFeatures && (!i.trialLeftDays || i.trialLeftDays <= 0);
                        if (r) return;
                        t.selectedTemplateId && this._updateHasLocalChanges(!0);
                        this._setListViewStyles(t)
                    }
                },
                _showColumnSettingsDialog: function(n, t, i) {
                    for (var v, pt, wt, e, y, s, o, bt, tt, kt, dt, ot, st, it, ht = jQuerySplst("<div><\/div>"), f = SPLST.ListTableLayoutEditor, c = f.Helper, p = f.locale.messages, u = [], gt = f.isIE(), ni = f.isMac, rt = this.isEditMode, ct = f.Modules(), lt = this.listFields[t], ut = this._getModulesTabData(lt), w = 0, ft = 0, h, l, at = r(), a = at || f.isTrial && f.disableFeatures && (!f.trialLeftDays || f.trialLeftDays <= 0), b = this.aggregatedStyles && this.aggregatedStyles[t] || {}, vt = !!lt.isCalculated, k = [], d = [], yt = [], g = 0, ti = ut.length; g < ti; g++)(e = ut[g], e.isVisible) && (e.height > w && (w = e.height), e.width > ft && (ft = e.width), e.isDisabled && yt.push(g));
                    for (k.push("<ul>"), v = 0, pt = ct.length; v < pt; v++)(wt = ct[v], e = ut[v], e.isVisible) && (k.push('<li><a href="#' + e.id + '">' + e.title + "<\/a><\/li>"), d.push('<div id="' + e.id + '" style="height: ' + w + 'px;">'), d.push(wt.getColumnSettingsHTML(jQuerySplst(this), this.listFields[t])), d.push("<\/div>"));
                    k.push("<\/ul>");
                    u.push('<div class="splst-layout-editor-dlg-row' + (gt ? " ie" : "") + (ni ? " mac" : "") + '">');
                    u.push('<div id="splst-column-settings-tabs">');
                    u.push(k.join(""));
                    u.push(d.join(""));
                    u.push("<\/div>");
                    u.push("<\/div>");
                    vt && u.push('<div class="splst-layout-editor-dlg-row"><label><input type="checkbox" data-haschanges="false" id="splst-layout-editor-showAsHtml-cbx"' + (b && b.displayAsHTML ? " checked" : "") + " />" + p.displayAsHTML + "<\/label><\/div>");
                    a && (u.push('<div class="splst-layout-editor-dlg-row" style="margin-top: 10px;">'), u.push('<span class="splst-layout-editor-trial" style="margin-left: 0px;">' + (at ? p.licenseExpiredExtended : p.trialExpiredExtended) + "<\/span>"), u.push("<\/div>"));
                    u.push('<input type="hidden" id="splst-layout-editor-column-idx" value="' + n + '" />');
                    u.push('<input type="hidden" id="splst-layout-editor-column-name" value="' + t + '" />');
                    u.push('<div class="splst-layout-editor-dlg-row">' + c.generatePoweredByBlockForDialogs() + "<\/div>");
                    u.push('<div class="ms-core-form-bottomButtonBox">');
                    u.push('<button id="splst-layout-editor-OkBtnDismissDlg" class="ms-ButtonHeightWidth" ');
                    u.push('value="ok" disabled="disabled" onclick="SPLST.ListTableLayoutEditor.dismissColumnSettingsDialog(this, ' + rt + ')">');
                    u.push(SP.Res.okButtonText);
                    u.push("<\/button>");
                    u.push('<button id="splst-layout-editor-CancelBtnDismissDlg" class="ms-ButtonHeightWidth" ');
                    u.push('value="cancel" onclick="SPLST.ListTableLayoutEditor.dismissColumnSettingsDialog(this)">');
                    u.push(SP.Res.cancelButtonText);
                    u.push("<\/button>");
                    u.push("<\/div>");
                    ht.html(u.join(""));
                    h = w;
                    h += 78;
                    a && (h += 30);
                    vt && (h += 30);
                    h += 84;
                    l = ft;
                    l += 34;
                    a && l < 560 && (l += 20);
                    var ii = {
                            html: ht[0],
                            title: p.columnSettingsTitle + (i ? " - " + i : ""),
                            height: h,
                            width: l,
                            dialogReturnValueCallback: jQuerySplst.proxy(this.onColumnSettingsDialogReturnValueCallback, this)
                        },
                        et = this._getCLVP(),
                        ui = this.hasGrouping || et && et.ctx && et.ctx.completedSearchTerm,
                        ri = new SP.UI.ModalDialog.showModalDialog(ii),
                        nt = jQuerySplst("#splst-column-settings-tabs").tabs({
                            activate: function(n, t) {
                                t.newTab.removeClass("ui-state-active")
                            },
                            disabled: yt
                        }).removeClass("ui-corner-all").removeClass("ui-widget-content").removeClass("ui-widget").addClass("splst-layout-editor-tabs");
                    nt.find(".ui-tabs-nav").removeClass("ui-widget-header").removeClass("ui-corner-all").addClass("splst-layout-editor-tabs-header");
                    nt.find(".ui-tabs-panel").removeClass("ui-widget-content").removeClass("ui-corner-bottom").addClass("splst-layout-editor-tabs-content");
                    nt.find(".ui-tabs-anchor").addClass("ms-heroCommandLink");
                    nt.find('[role="tab"]').removeClass("ui-corner-top").removeClass("ui-state-default").removeClass("ui-state-active").addClass("splst-layout-editor-tabs-state-default");
                    o = b;
                    f.ResizersControl && (tt = f.TableTemplates, y = this.localTableStyles && this.localTableStyles.selectedTemplateId || this.globalTableStyles && this.globalTableStyles.selectedTemplateId, s = y && (tt.light[y] || tt.medium[y] || tt.dark[y]), bt = !!jQuerySplst.extend({}, this.globalTableStyles, this.localTableStyles).cellBorders);
                    o ? (kt = c.hasCssProperty("." + this._generateCorrectCssClassName(t), "color"), dt = c.hasCssProperty("." + this._generateCorrectCssClassName(t), "background-color"), o = jQuerySplst.extend(!0, {}, c.getStandardColumnStyles(this.table, n, rt), o), !kt && s && s[f.HEAD].color && (o[f.HEAD].color = ""), !dt && s && s[f.HEAD]["background-color"] && (o[f.HEAD]["background-color"] = "transparent")) : (o = c.getStandardColumnStyles(this.table, n, rt), s && (ot = s[f.HEAD], st = o[f.HEAD], ot.color && (st.color = ""), ot["background-color"] && (st["background-color"] = "transparent")));
                    it = jQuerySplst("#splst-layout-editor-showAsHtml-cbx");
                    it.length && it.parent().click(function() {
                        var n = jQuerySplst(".splst-lb-preview-head").closest("table");
                        n.attr("data-display-as-html-haschanges", !!b.displayAsHTML == !it[0].checked);
                        f.setColSettingsDialogOkButtonAvailability(a)
                    });
                    this._triggerEvent("columnSettingsDialogOpened", {
                        colName: t,
                        colIndex: n,
                        tableStyle: s,
                        columnStyle: o,
                        isDisabled: a,
                        cellBorders: bt
                    });
                    ri.autoSize()
                },
                onColumnSettingsDialogReturnValueCallback: function(n, t) {
                    var i, r, u;
                    if (this._callModulesMethod("clearColumnSettingsDialogResources", null, null), n) {
                        if (i = SPLST.ListTableLayoutEditor, r = i.isTrial && i.disableFeatures && (!i.trialLeftDays || i.trialLeftDays <= 0), r) return;
                        u = this._areSizeImpactingOptionsChanged(t.fieldName, t.style);
                        jQuerySplst.when(this._setFieldStyles(t.fieldName, parseInt(t.index), t.style)).then(jQuerySplst.proxy(function() {
                            this._updateHasLocalChanges(!0);
                            u && this.refresh()
                        }, this))
                    }
                },
                _areSizeImpactingOptionsChanged: function(n, t) {
                    var u = jQuerySplst.extend(!0, {}, this.globalStyles, this.localStyles)[n],
                        i = this._getColSizeImpactingStyles(t),
                        r = this._getColSizeImpactingStyles(u);
                    return i["font-style"] !== r["font-style"] || i["font-weight"] !== r["font-weight"] || i["text-decoration"] !== r["text-decoration"] || i["word-wrap"] !== r["word-wrap"] || i["header-font-style"] !== r["header-font-style"] || i["header-font-weight"] !== r["header-font-weight"] || i["header-text-decoration"] !== r["header-text-decoration"] || i["header-white-space"] !== r["header-white-space"] || i.indicator !== r.indicator || i.truncateColText !== r.truncateColText || i.pb || r.pb || i.visibleFor || i.visibleFor !== r.visibleFor || i.rulesCount !== r.rulesCount
                },
                _getColSizeImpactingStyles: function(n) {
                    var f, e, s, r;
                    if (!n) return {};
                    var h = SPLST.ListTableLayoutEditor,
                        o = h.ConditionalFormattingTypes,
                        u = n.column,
                        i = n.header,
                        t = {};
                    if (u && (t = {
                            "font-style": u["font-style"] && u["font-style"] !== "normal",
                            "font-weight": u["font-weight"] && u["font-weight"] !== "400",
                            "text-decoration": u["text-decoration"] && u["text-decoration"] !== "normal",
                            "word-wrap": u["word-wrap"]
                        }), i && (i["font-style"] && (t["header-font-style"] = i["font-style"] !== "normal"), i["font-weight"] && (t["header-font-weight"] = i["font-weight"] !== "400"), i["text-decoration"] && (t["header-text-decoration"] = i["text-decoration"] !== "normal"), i["white-space"] && (i["header-white-space"] = i["white-space"])), (!n.cfType || n.cfType === o.rules) && n.rules) {
                        f = n.rules;
                        e = 0;
                        for (s in f)(r = f[s], r) && (e++, !t["font-style"] && r.style["font-style"] && r.style["font-style"] !== "normal" && (t["font-style"] = !0), !t["font-weight"] && r.style["font-weight"] && r.style["font-weight"] !== "400" && (t["font-weight"] = !0), !t["text-decoration"] && r.style["text-decoration"] && r.style["text-decoration"] !== "none" && (t["text-decoration"] = !0), !t.indicator && r.style.indicator && (t.indicator = !0));
                        t.rulesCount = e
                    }
                    return n.truncateText && (t.truncateColText = n.truncateText.column && n.truncateText.column === !0), n.cfType === o.pb && n.pb && (t.pb = !0), n.advanced && n.advanced.visibleFor && (t.visibleFor = !0), t
                },
                _showResizerSettingsDialog: function() {
                    var u = jQuerySplst("<div><\/div>"),
                        r = SPLST.ListTableLayoutEditor,
                        e = r.Helper,
                        n = [],
                        h = this.sessionSettings.isPersonalView,
                        i = this.pluginSettings,
                        o = this.getIsQueryEnabled(),
                        t = r.locale.messages,
                        f, s;
                    o && n.push('<div class="splst-layout-editor-dlg-row"><label><input type="checkbox" id="splst-layout-editor-customPaging-cbx" ' + (i.customPaging ? "checked " : "") + " />" + t.customPaging + "<\/label><\/div>");
                    this.$table.attr("id").startsWith("onetidDoclib") && window.g_SPGridInitInfo && g_SPGridInitInfo[this.viewId] && n.push('<div class="splst-layout-editor-dlg-row"><label><input type="checkbox" id="splst-layout-editor-docLibEdit-cbx" ' + (i.showDocLibraryQuickEditLink ? "checked " : "") + " />" + t.showQuickEditLink + "<\/label><\/div>");
                    this._getListTemplate() === 171 && n.push('<div class="splst-layout-editor-dlg-row"><label><input type="checkbox" id="splst-layout-editor-collapseTasks-cbx" ' + (i.collapseTasks ? "checked " : "") + " />" + t.collapseTasks + "<\/label><\/div>");
                    n.push('<br /><hr class="splst-layout-editor-hr" />');
                    n.push('<div class="splst-layout-editor-dlg-row"><span style="font-weight: bold;">' + t.viewerSettingsTitle + "<\/span><\/div><br/>");
                    n.push('<div class="splst-layout-editor-dlg-row"><label><input type="checkbox" id="splst-layout-editor-width-cbx" ' + (i.viewerEditOptions.width ? "checked " : "") + "/>" + t.widthPermissions + "<\/label><\/div>");
                    n.push('<div class="splst-layout-editor-dlg-row"><label><input type="checkbox" id="splst-layout-editor-columnStyles-cbx" ' + (i.viewerEditOptions.columnStyles ? "checked " : "") + "/>" + t.columnPermissions + "<\/label><\/div>");
                    n.push('<div class="splst-layout-editor-dlg-row"><label><input type="checkbox" id="splst-layout-editor-tableStyles-cbx" ' + (i.viewerEditOptions.tableStyles ? "checked " : "") + "/>" + t.tablePermissions + "<\/label><\/div>");
                    n.push('<div class="splst-layout-editor-dlg-row"><label><input type="checkbox" id="splst-lb-freezePane-cbx" ' + (i.viewerEditOptions.freezePane ? "checked " : "") + "/>" + t.freezePanePermissions + "<\/label><\/div>");
                    n.push('<div class="splst-layout-editor-dlg-row"><label><input type="checkbox" id="splst-lb-configurePrint-cbx" ' + (i.viewerEditOptions.configurePrint ? "checked " : "") + "/>" + t.configurePrintPermissions + "<\/label><\/div><br />");
                    n.push('<div class="splst-layout-editor-dlg-row"><span class="splst-layout-editor-info">' + t.settingsInCookiesWarning + "<\/span><\/div>");
                    n.push('<div class="splst-layout-editor-dlg-row">' + e.generatePoweredByBlockForDialogs() + "<\/div>");
                    n.push('<div class="ms-core-form-bottomButtonBox">');
                    n.push('<button id="splst-layout-editor-OkBtnDismissDlg" class="ms-ButtonHeightWidth" ');
                    n.push('value="ok" onclick="SPLST.ListTableLayoutEditor.dismissPluginSettingsDialog(this)">');
                    n.push(SP.Res.okButtonText);
                    n.push("<\/button>");
                    n.push('<button id="splst-layout-editor-CancelBtnDismissDlg" class="ms-ButtonHeightWidth" ');
                    n.push('value="cancel" onclick="SPLST.ListTableLayoutEditor.dismissPluginSettingsDialog(this)">');
                    n.push(SP.Res.cancelButtonText);
                    n.push("<\/button>");
                    n.push("<\/div>");
                    u.html(n.join(""));
                    f = {
                        html: u[0],
                        title: r.locale.messages.pluginSettingsTitle,
                        dialogReturnValueCallback: jQuerySplst.proxy(this.onPluginSettingsDialogReturnValueCallback, this)
                    };
                    s = new SP.UI.ModalDialog.showModalDialog(f)
                },
                onPluginSettingsDialogReturnValueCallback: function(n, i) {
                    n && (t.isDefined(i.customPaging) && (this.pluginSettings.customPaging = i.customPaging), i.showDocLibraryQuickEditLink !== this.pluginSettings.showDocLibraryQuickEditLink && (this[i.showDocLibraryQuickEditLink ? "renderEditLinkForDocLibrary" : "removeEditLinkForDocLibrary"](), this.pluginSettings.showDocLibraryQuickEditLink = i.showDocLibraryQuickEditLink), t.isDefined(i.collapseTasks) && (this.pluginSettings.collapseTasks = i.collapseTasks), i.viewerEditOptions && (this.pluginSettings.viewerEditOptions = i.viewerEditOptions), this.saveSettings(this.pluginSettings))
                },
                _setSettingsScopeText: function() {
                    var n = SPLST.ListTableLayoutEditor,
                        t = this.sessionSettings,
                        r = t.areLocalChanges,
                        i = !t.hasManageListsPermissions;
                    this.$settingsScopeLearnMoreEl && (i ? this.$settingsScopeLearnMoreEl.html(n.locale.messages.reset) : this.$settingsScopeLearnMoreEl.html(n.locale.messages.publishOrResetCustomStyles))
                },
                _callModulesMethod: function(n, t, i) {
                    var r = SPLST.ListTableLayoutEditor,
                        f = r.Modules().slice(),
                        e, u;
                    return r.trace && r.logInfo(this, 'Calling modules method "' + n + '"'), i = i || new jQuerySplst.Deferred, e = this, u = function() {
                        if (f.length) {
                            var e = f.shift();
                            e[n] ? jQuerySplst.when(e[n].apply(e, t)).then(u) : u()
                        } else r.trace && r.logInfo(this, 'Calling modules method "' + n + '" FINISHED'), i.resolve()
                    }, u(), i.promise()
                },
                _getListTemplate: function() {
                    if (this.listTemplate === -1) {
                        var n = this._getCLVP();
                        n && n.ctx && (this.listTemplate = parseInt(n.ctx.listTemplate))
                    }
                    return this.listTemplate
                },
                _getCLVP: function() {
                    var n = this.clvp;
                    return !n && window.CLVPFromCtx && this.table && (n = this.clvp = CLVPFromCtx(this.isEditMode ? this.parentTable : this.table)), n
                },
                getView: function() {
                    var n = SPLST.ListTableLayoutEditor;
                    if (!n.loadedViews[this.viewId]) return null;
                    var i = n.spContext,
                        t = n.spWeb.get_lists().getByTitle(this.listName);
                    return t.getView(this.viewId)
                },
                updatePagingItemsCount: function() {
                    var n = SPLST.ListTableLayoutEditor,
                        i = new jQuerySplst.Deferred,
                        t = this.viewId.toLowerCase();
                    if (!this.getIsQueryEnabled()) {
                        this.$defaultPagingEl && this.$defaultPagingEl.length && (this.$defaultPagingEl[0].style.display = "table");
                        return
                    }
                    n.viewItems && n.viewItems[t] && (this.viewItems = n.viewItems[t].viewItems, this.splittedCaml || (this.splittedCaml = n.viewItems[t].splittedCaml), delete n.viewItems[t]);
                    this.viewItems ? this.initPaging(this.viewItems) : this.updateItemsCount(this.initPaging, !0)
                },
                initPaging: function(n) {
                    var i = SPLST.ListTableLayoutEditor,
                        r, u;
                    if (i.trace && i.logInfo(this, "Paging is loaded. Rendering paging..."), this.isDisposed) {
                        i.trace && i.logInfo(this, "Rendering paging terminated - List Booster is disposed");
                        return
                    }
                    this.viewItems = n;
                    this.initPagingSettings();
                    var e = this.$table,
                        t = this.$defaultPagingEl,
                        f = this.viewId.slice(1, -1) + "_splst_bottom_paging";
                    (this.$topPagingEl && this.$topPagingEl.empty(), this.isRendered) && (this.pagingSettings ? (t && t.length && (r = this.$bottomPagingEl = jQuerySplst('<div id="' + f + '"><\/div>'), $bottomPagingContainer = t.parent(), $bottomPagingContainer.append(r), r[0].style.display = "none"), this.$topPagingEl && this.$topPagingEl.length && (this.$topPagingEl[0].style.display = "inline-block"), this.$bottomPagingEl && (this.$bottomPagingEl[0].style.display = "inline-block", this.renderPaging(this.$bottomPagingEl.attr("id"), !0), this.$defaultPagingEl[0].style.display = "none"), this.renderPaging(this.$topPagingEl.attr("id")), u = this.pluginSettings.customPaging && this.getIsQueryEnabled() && !this.hasGrouping, this.enabled ? u ? this.hidePaging(!0) : this.hideDefaultPaging() : u ? this.showPaging() : this.hidePaging()) : t && t.length && (t[0].style.display = "table"))
                },
                getDescendantsSelectors: function(n) {
                    var t = SPLST.ListTableLayoutEditor,
                        r;
                    if (!n) return t.COLUMN_DESCENDANTS_SELECTORS;
                    if (this.fieldSelectors || (this.fieldSelectors = {}), this.fieldSelectors[n]) return this.fieldSelectors[n];
                    if (t = SPLST.ListTableLayoutEditor, r = t.fieldBasedSelectors[this.isEditMode ? "edit" : "read"], ["LinkTitle", "LinkTitleNoMenu", "LinkFilename", "LinkFilenameNoMenu"].indexOf(n) !== -1) this.fieldSelectors[n] = r[n];
                    else {
                        var i = this.listFields[n],
                            u = i && i.type,
                            f = i && !!i.customRendering;
                        u && !f && (this.fieldSelectors[n] = r[u])
                    }
                    return this.fieldSelectors[n] || (this.fieldSelectors[n] = t.COLUMN_DESCENDANTS_SELECTORS), this.fieldSelectors[n]
                },
                getFieldClientData: function(n) {
                    var i, f, r, e, u, o, t, s;
                    if (this.clientData[n]) return this.clientData[n];
                    if (i = this._getCLVP(), f = i && i.ctx && i.ctx.ListData, f)
                        for (r = [], e = f.Row, u = 0, o = e.length; u < o; u++) r.push(e[u][n]);
                    else t = _spPageContextInfo.webServerRelativeUrl, t.endsWith("/") && (t = t.slice(0, -1)), t += "/" + _spPageContextInfo.layoutsUrl + "/inplview.aspx?" + location.search + "&IsCSR=TRUE&IsXslView=TRUE&List=" + this.listId, s = this, jQuerySplst.ajax({
                        url: t,
                        method: "POST",
                        contentType: "application/x-www-form-urlencoded",
                        async: !1,
                        success: function(t) {
                            for (var f, i, u = {}, o = t.Row, e = 0, h = o.length; e < h; e++) {
                                f = o[e];
                                for (i in f) f.hasOwnProperty(i) && (u[i] || (u[i] = []), u[i].push(f[i]))
                            }
                            s.clientData = u;
                            r = u[n]
                        }
                    });
                    return r
                },
                getClientDataHelper: function() {
                    if (!this.clientDataHelper) {
                        this.clientDataHelper = SPLST.ListTableLayoutEditor.ClientDataHelperFactory.createClientDataHelper(this);
                        jQuerySplst(this.clientDataHelper).on("datachanging", this.onClientDataChanging.bind(this));
                        jQuerySplst(this.clientDataHelper).on("datachanged", this.onClientDataChanged.bind(this))
                    }
                    return this.clientDataHelper
                },
                onClientDataChanging: function(n, t) {
                    this.aggregatedStyles === undefined && this.initStylesVariables();
                    this._callModulesMethod("onClientDataChanging", [jQuerySplst.extend(!0, {}, t, {
                        layoutEditor: this,
                        styles: this.aggregatedStyles
                    })], t.deferred)
                },
                onClientDataChanged: function(n, t) {
                    t.added.length && t.deleted.length && this._fixUIAfterGroupExpand();
                    t.deferred.resolve()
                },
                _rowsValueOf: function() {
                    if (this.isHeaderFreezed && this.$tbodyWrap && this.$tbodyWrap.length) {
                        var n = [];
                        n.push(this.table.rows[0]);
                        this.$tbodyWrap.find("> tbody > tr").each(function(t, i) {
                            n.push(i)
                        });
                        this.table.rows.valueOf = function() {
                            return n
                        }
                    }
                },
                _getModulesTabData: function(n) {
                    for (var u, f = SPLST.ListTableLayoutEditor, i = f.Modules(), r = [], t = 0, e = i.length; t < e; t++) u = i[t], r.push(u.getTabData(this, n));
                    return r
                },
                _isPaged: function() {
                    var r = this.view ? this.view.get_paged() : !0,
                        t, n, i;
                    return r ? (t = this._getCLVP(), t ? !!t.pagingTab : (n = null, n = this.isEditMode ? this.$parentTable.parent().closest("table").parent().find(".ms-bottompaging") : this.$table.parent().closest("table").parent().find(".ms-bottompaging"), !n || !n.length) ? !1 : (i = this.$defaultPagingEl.find("a[onclick*=RefreshPageTo]"), !!(i && i.length))) : !1
                },
                _updateHasLocalChanges: function(n) {
                    this.hasLocalChanges = n !== undefined ? n : this.localStyles && !t.isEmptyObject(this.localStyles) || this.localWidths && !t.isEmptyObject(this.localWidths) || this.localTableStyles && !t.isEmptyObject(this.localTableStyles) || this.localOptions && (this.localOptions.freezeHeader && this.localOptions.freezeHeader.state !== SPLST.ListTableLayoutEditor.FREEZE_STATES.inherit || this.localOptions.print && !t.isEmptyObject(this.localOptions.print));
                    this.enabled && this._toggleScopeTextVisibility(this.hasLocalChanges)
                },
                _toggleScopeTextVisibility: function(n) {
                    n ? !this.sessionSettings.isPersonalView && this.hasLocalChanges && (this.$settingsScopeTextEl.css("display", "inline-block"), this.$settingsScopeLearnMoreEl.css("display", "inline-block")) : (this.$settingsScopeTextEl.css("display", "none"), this.$settingsScopeLearnMoreEl.css("display", "none"))
                },
                _showPrintSetupDialog: function() {
                    var l = jQuerySplst("<div><\/div>"),
                        f = SPLST.ListTableLayoutEditor,
                        w = f.Helper,
                        r = f.locale.messages.printDialog,
                        n = [],
                        b = f.getScrollbarWidth(),
                        s = 550 + b,
                        t, h, e, a, i, c, v, y, p, k;
                    for (this.aggregatedOptions === undefined && this.initViewOptionsVariables(), t = this.aggregatedOptions && this.aggregatedOptions.print || {
                            printSystemColumns: !0,
                            printAll: !0
                        }, n.push('<div class="splst-layout-editor-dlg-row"><label><input type="checkbox" data-lb-id="print-system-cols-cbx"' + (t.printSystemColumns ? " checked" : "") + " />" + r.printSystemColumns + "<\/label><\/div>"), n.push('<hr class="splst-layout-editor-hr" />'), n.push('<div class="splst-layout-editor-dlg-row"><span style="font-weight: bold;">' + r.selectColumns + "<\/span><\/div>"), n.push('<div class="splst-layout-editor-dlg-row">'), n.push('<div class="lb-print-cols-header" style="width: ' + s + 'px;">'), n.push('<div class="lb-print-cols-cbx"><input type="checkbox" data-lb-id="select-all"' + (t.printAll ? " checked" : "") + " /><\/div>"), n.push('<div class="lb-print-cols-name"><span>' + r.columnName + "<\/span><\/div>"), n.push("<\/div>"), n.push('<div class="lb-print-cols-body" style="width: ' + s + 'px;">'), h = this.view.get_viewFields(), this.aggregatedStyles === undefined && this.initStylesVariables(), e = 0, a = h.get_count(); e < a; e++)(i = h.get_item(e), c = !0, this.aggregatedStyles && this.aggregatedStyles[i] && (c = f.AdvancedColumnSettingsModule.isVisibleForUser(this.aggregatedStyles[i].advanced, this)), c) && (v = this.listFields[i].title, y = t.printAll || t.columns && t.columns.indexOf(i) !== -1, n.push('<div class="lb-print-cols-row">'), n.push('<div class="lb-print-cols-cbx"><input type="checkbox" data-lb-id="select-field-' + i + '" data-lb-field="' + i + '"' + (y ? " checked" : "") + " /><\/div>"), n.push('<div class="lb-print-cols-name"><span>' + v + "<\/span><\/div>"), n.push("<\/div>"));
                    n.push("<\/div>");
                    n.push("<\/div>");
                    n.push('<div class="splst-layout-editor-dlg-row">' + w.generatePoweredByBlockForDialogs() + "<\/div>");
                    n.push('<div class="ms-core-form-bottomButtonBox">');
                    n.push('<button id="splst-layout-editor-OkBtnDismissDlg" class="ms-ButtonHeightWidth" ');
                    n.push('value="ok" onclick="SPLST.ListTableLayoutEditor.dismissPrintSetupDialog(this)">');
                    n.push(r.printBtn);
                    n.push("<\/button>");
                    n.push('<button id="splst-layout-editor-CancelBtnDismissDlg" class="ms-ButtonHeightWidth" ');
                    n.push('value="cancel" onclick="SPLST.ListTableLayoutEditor.dismissPrintSetupDialog(this)">');
                    n.push(SP.Res.cancelButtonText);
                    n.push("<\/button>");
                    n.push("<\/div>");
                    l.html(n.join(""));
                    p = {
                        html: l[0],
                        title: r.title,
                        width: s,
                        dialogReturnValueCallback: jQuerySplst.proxy(this.onPrintSetupDialogReturnValueCallback, this)
                    };
                    k = new SP.UI.ModalDialog.showModalDialog(p);
                    jQuerySplst(".lb-print-cols-row").click(function(n) {
                        jQuerySplst(n.currentTarget.querySelector('[data-lb-id^="select-field-"]')).click()
                    });
                    var d = jQuerySplst('[data-lb-id="print-system-cols-cbx"]'),
                        u = jQuerySplst('[data-lb-id="select-all"]'),
                        o = jQuerySplst('[data-lb-id^="select-field-"]');
                    d.click(function(n) {
                        var i = n.currentTarget;
                        i.setAttribute("data-lb-haschanges", i.checked !== t.printSystemColumns)
                    });
                    u.click(function(n) {
                        var i = n.currentTarget,
                            r = i.checked;
                        i.setAttribute("data-lb-haschanges", r !== t.printAll);
                        o.each(function(n, t) {
                            t.checked = r
                        })
                    });
                    o.click(function(n) {
                        var i, r;
                        n.stopImmediatePropagation();
                        i = n.currentTarget;
                        i.checked ? (r = o.filter(":checked"), u[0].checked = r.length === o.length, i.setAttribute("data-lb-haschanges", !t.columns || t.columns.indexOf(i.getAttribute("data-lb-field")) === -1)) : (u[0].checked = !1, i.setAttribute("data-lb-haschanges", !!(!t.columns || t.columns.indexOf(i.getAttribute("data-lb-field")) !== -1)));
                        u.attr("data-lb-haschanges", u[0].checked !== t.printAll)
                    })
                },
                onPrintSetupDialogReturnValueCallback: function(n, t) {
                    if (n)
                        if (t) {
                            var i = this;
                            this.savePrintOptions(t).then(function() {
                                i.initViewOptionsVariables();
                                i._print();
                                i._updateHasLocalChanges()
                            })
                        } else this._print()
                },
                savePrintOptions: function(n) {
                    if (n) {
                        var t = new jQuerySplst.Deferred,
                            i = {
                                print: n
                            };
                        return this.saveViewOptions(i, t), t
                    }
                },
                _print: function() {
                    var n = this.tableCssClassName,
                        t = document.createElement("style"),
                        i, r;
                    t.setAttribute("media", "print");
                    i = "table." + n + " { width: inherit !important; } body > .ms-shadow { visibility: collapse; } ." + n + ", ." + n + " * { visibility: visible; } ." + n + " { position: absolute; left: 0; top: 0; }.lb-notPrintable { display: none !important } #s4-titlerow, #s4-ribbon, #suiteBar, .ms-webpart-chrome-title, .splst-paging-container, .splst_layout_editor_table:not(." + n + "), .splst-layout-editor-plugin { display: none !important; } #contentRow { padding: 0 !important; } ";
                    i += this._getColumnsPrintStyles();
                    r = document.querySelector("#pageStatusBar");
                    r && !r.className ? jQuerySplst("#s4-workspace *:not(#pageStatusBar)").addClass("lb-notPrintable") : jQuerySplst("#s4-workspace *").addClass("lb-notPrintable");
                    this.$table.removeClassCompletely("lb-notPrintable");
                    this.$table.parents().each(function(n, t) {
                        jQuerySplst(t).removeClassCompletely("lb-notPrintable")
                    });
                    this.$table.find("*").each(function(n, t) {
                        jQuerySplst(t).removeClassCompletely("lb-notPrintable")
                    });
                    t.innerText = t.textContent = i;
                    document.head.appendChild(t);
                    window.print();
                    jQuerySplst("#s4-workspace *").removeClassCompletely("lb-notPrintable");
                    document.head.removeChild(t)
                },
                _getColumnsPrintStyles: function() {
                    var n, o, a;
                    if ((this.aggregatedOptions === undefined && this.initViewOptionsVariables(), !this.aggregatedOptions || !this.aggregatedOptions.print) || (n = this.aggregatedOptions.print, n.printSystemColumns && n.printAll)) return "";
                    var s = this.$table,
                        v = SPLST.ListTableLayoutEditor,
                        h = v.Helper,
                        f = this.isEditMode,
                        y = h.getThead(s, f),
                        k = y[0],
                        r = s.find("th"),
                        t = "." + this.tableCssClassName,
                        e = "";
                    if (r && r.length) {
                        var c = r.length,
                            l = !1,
                            p = t + " > thead > tr:nth-child(1) > th:nth-child({0}), " + t + " > tbody > tr:nth-child(1) > th:nth-child({0}), " + t + " > tbody:not([groupstring]) > tr > td:nth-child({0}), " + t + ' > tbody[data-splst-wrap="true"] > tbody:not([groupstring]) > tr > td:nth-child({0}) { display: none !important; padding: 0px !important; border: 0px !important; }';
                        for (i = 0; i < c; i++) {
                            var w = r[i],
                                b = jQuerySplst(w),
                                u = h.getFieldInfoFromHeaderCell(b, i, c, f, this._ganttControl);
                            u.visible && ((!u.isFieldCell || n.printAll || n.columns && n.columns.indexOf(u.colName) !== -1) && (u.isFieldCell || n.printSystemColumns) ? f && !l && i !== 0 && (o = this.table.querySelector(".ms-vb-firstCell"), o && (a = window.getComputedStyle(o).getPropertyValue("border-left"), e += t + " > tbody:not([groupstring]) > tr > td:nth-child(" + (i + 1) + ") { border-left: " + a + "; }"), l = !0) : e += p.replace(/\{0\}/gmi, (i + 1).toString()))
                        }
                        return e.trim()
                    }
                },
                _mergeOptions: function(n, t) {
                    var i, r, u, f;
                    return t && t.freezeHeader && t.freezeHeader.state === "inherit" && delete t.freezeHeader, i = jQuerySplst.extend(!0, {}, n, t), i.print && (r = i.print, r.printAll ? r.columns = null : (u = t && t.print && t.print.columns, f = n && n.print && n.print.columns, r.columns = u || f)), i
                },
                toggleTasksExpand: function() {
                    if (this.pluginSettings && this.pluginSettings.collapseTasks === !0 && window.clientHierarchyManagers && clientHierarchyManagers.length) {
                        var n = clientHierarchyManagers.length;
                        this.$table.find("[id^=idExpandCollapse]").each(function(t, i) {
                            for (var r = 0; r < n; r++) clientHierarchyManagers[r].ToggleExpandByImg(i)
                        })
                    }
                },
                refreshLoadedFields: function() {
                    var n, u, t;
                    if (!this.cfViewItems || !this.cfViewItems.get_count()) {
                        this.loadedFields = [];
                        return
                    }
                    var f = this.cfViewItems.get_item(0),
                        e = f.get_fieldValues(),
                        i = [],
                        r = this.loadedFields;
                    for (n = 0, u = r.length; n < u; n++) t = r[n], e[t] && i.push(t);
                    this.loadedFields = i
                },
                notifyCellPropertyChanged: function(n, t) {
                    this.aggregatedStyles === undefined && this.initStylesVariables();
                    this._callModulesMethod("onCellPropertyChanged", [n, jQuerySplst.extend(!0, {}, t, {
                        layoutEditor: this,
                        styles: this.aggregatedStyles
                    })])
                }
            };
        return $this = jQuerySplst(f), f.init(), f
    }, n.dismissClearAllConfDialog = function(n, t) {
        var i = SP.UI.ModalDialog.get_childDialog(),
            r, u;
        i && (r = SP.UI.DialogResult.cancel, n.value === "ok" && (r = SP.UI.DialogResult.OK, t && (u = {
            clearLocal: jQuerySplst("#splst-layout-editor-local-cbx")[0].checked,
            clearGlobal: jQuerySplst("#splst-layout-editor-global-cbx")[0].checked
        }, i.set_returnValue(u))), i.close(r))
    }, n.dismissTableStylesDialog = function(n, t) {
        var r = SP.UI.ModalDialog.get_childDialog(),
            u, i, f, e;
        if (r) {
            if (u = SP.UI.DialogResult.cancel, n.value === "ok" || t) {
                if (i = SPLST.ListTableLayoutEditor, f = i.isTrial && i.disableFeatures && (!i.trialLeftDays || i.trialLeftDays < 0), f) return;
                e = i.ResizersControl.collectTableSettingsDialogData();
                r.set_returnValue(e);
                u = SP.UI.DialogResult.OK
            }
            r.close(u)
        }
    }, n.dismissColumnSettingsDialog = function(n) {
        var u = SP.UI.ModalDialog.get_childDialog(),
            f, t, s, e, r, l, o;
        if (u) {
            if (f = SP.UI.DialogResult.cancel, n.value === "ok") {
                if (t = SPLST.ListTableLayoutEditor, s = t.isTrial && t.disableFeatures && (!t.trialLeftDays || t.trialLeftDays < 0), s) return;
                var i = {
                        fieldName: jQuerySplst("#splst-layout-editor-column-name").attr("value"),
                        index: jQuerySplst("#splst-layout-editor-column-idx").attr("value")
                    },
                    h = jQuerySplst(".splst-lb-preview-head").closest("table"),
                    c = jQuerySplst("#splst-layout-editor-showAsHtml-cbx");
                for (c.length && h.length && h.attr("data-display-as-html-haschanges") === "true" && (i = jQuerySplst.extend(!0, i, {
                        style: {
                            displayAsHTML: c[0].checked
                        }
                    })), e = t.Modules(), r = 0, l = e.length; r < l; r++) o = e[r], o.collectColumnSettingsDialogData && (i.style = jQuerySplst.extend(!0, i.style, o.collectColumnSettingsDialogData()));
                i.style && (i.style.version = t.version);
                u.set_returnValue(i);
                f = SP.UI.DialogResult.OK
            }
            u.close(f)
        }
    }, n.dismissPluginSettingsDialog = function(n) {
        var i = SP.UI.ModalDialog.get_childDialog(),
            r, t, u, f, e;
        i && (r = SP.UI.DialogResult.cancel, n.value === "ok" && (r = SP.UI.DialogResult.OK, t = {}, u = jQuerySplst("#splst-layout-editor-customPaging-cbx"), u.length && (t.customPaging = u[0].checked), f = jQuerySplst("#splst-layout-editor-docLibEdit-cbx"), f.length && (t.showDocLibraryQuickEditLink = f[0].checked), e = document.querySelector("#splst-layout-editor-collapseTasks-cbx"), e && (t.collapseTasks = e.checked), t.viewerEditOptions = {
            width: jQuerySplst("#splst-layout-editor-width-cbx")[0].checked,
            columnStyles: jQuerySplst("#splst-layout-editor-columnStyles-cbx")[0].checked,
            tableStyles: jQuerySplst("#splst-layout-editor-tableStyles-cbx")[0].checked,
            freezePane: jQuerySplst("#splst-lb-freezePane-cbx")[0].checked,
            configurePrint: jQuerySplst("#splst-lb-configurePrint-cbx")[0].checked
        }, i.set_returnValue(t)), i.close(r))
    }, n.dismissScopeDialog = function(n) {
        var u = SP.UI.ModalDialog.get_childDialog(),
            e = SP.UI.DialogResult.OK,
            i, f, r, t;
        if (u) {
            i = {};
            f = n.currentTarget.getAttribute("data-lb-action");
            switch (f) {
                case "custom-styles-publish":
                    i.action = "publish";
                    break;
                case "custom-styles-reset":
                    i.action = "reset";
                    break;
                case "custom-styles-cancel":
                    i.action = "cancel"
            }
            i.action === "reset" && (r = {}, t = document.querySelector('[data-lb-id="custom-styles-col-styles-cbx"]'), t && t.checked && (r.styles = !0), t = document.querySelector('[data-lb-id="custom-styles-col-widths-cbx"]'), t && t.checked && (r.widths = !0), t = document.querySelector('[data-lb-id="custom-styles-tbl-styles-cbx"]'), t && t.checked && (r.tableStyles = !0), t = document.querySelector('[data-lb-id="custom-styles-opts-cbx"]'), t && t.checked && (r.freezeHeader = !0), t = document.querySelector('[data-lb-id="custom-styles-print-cbx"]'), t && t.checked && (r.print = !0), i.settings = r);
            u.set_returnValue(i);
            u.close(e)
        }
    }, n.dismissPrintSetupDialog = function(n) {
        var f = SP.UI.ModalDialog.get_childDialog(),
            e, t, i, o, r, s, h, c, u, a, l;
        if (f) {
            if (e = SP.UI.DialogResult.cancel, t = {}, n.value === "ok" && (e = SP.UI.DialogResult.OK, i = !1, o = document.querySelector('[data-lb-id="print-system-cols-cbx"]'), o.getAttribute("data-lb-haschanges") === "true" && (t.printSystemColumns = o.checked, i = !0), r = document.querySelector('[data-lb-id="select-all"]'), r.getAttribute("data-lb-haschanges") === "true" && (t.printAll = r.checked, i = !0), !r.checked && (s = document.querySelectorAll('[data-lb-id^="select-field-"]'), h = document.querySelectorAll('[data-lb-id^="select-field-"][data-lb-haschanges="true"]'), h && h.length))) {
                for (i = !0, c = [], u = 0, a = s.length; u < a; u++) l = s[u], l.checked && c.push(l.getAttribute("data-lb-field"));
                t.columns = c
            }
            i || (t = null);
            f.set_returnValue(t);
            f.close(e)
        }
    }, n.getColumnStylesObject = function(n, t) {
        var o, f;
        if (n) {
            if (o = {}, f = SPLST.ListTableLayoutEditor, n[f.HEAD]) {
                var r = n[f.HEAD],
                    h = {},
                    s = {};
                r["background-color"] && r["background-color"] !== "transparent" && r["background-color"] !== "rgba(0, 0, 0, 0)" && (h["background-color"] = r["background-color"]);
                r.color && (h.color = r.color, s.color = r.color + " !important");
                r["font-weight"] && (s["font-weight"] = r["font-weight"] + " !important");
                r["font-style"] && (s["font-style"] = r["font-style"] + " !important");
                r["text-decoration"] && (s["text-decoration"] = r["text-decoration"] + " !important");
                r["text-align"] && (s["text-align"] = r["text-align"] + " !important");
                r["text-transform"] && (s["text-transform"] = r["text-transform"] + " !important");
                r["white-space"] === !0 && (h["white-space"] = "normal");
                o[f.HEAD] = h;
                o[f.HEAD_DESCENDANTS] = s
            }
            if (n[f.COLUMN]) {
                var i = n[f.COLUMN],
                    u = {},
                    e = {};
                i["background-color"] && i["background-color"] !== "transparent" && (u["background-color"] = i["background-color"]);
                i.color && (u.color = i.color + (t ? " !important" : ""), e.color = i.color + " !important");
                i["font-weight"] && (u["font-weight"] = i["font-weight"] + (t ? " !important" : ""), e["font-weight"] = i["font-weight"] + " !important");
                i["font-style"] && (u["font-style"] = i["font-style"] + (t ? " !important" : ""), e["font-style"] = i["font-style"] + " !important");
                i["text-decoration"] && (u["text-decoration"] = i["text-decoration"] + (t ? " !important" : ""), e["text-decoration"] = i["text-decoration"] + " !important");
                i["text-align"] && (u["text-align"] = i["text-align"] + (t ? " !important" : ""), e["text-align"] = i["text-align"] + " !important");
                i["vertical-align"] && (u["vertical-align"] = i["vertical-align"] + (t ? " !important" : ""));
                i["text-transform"] && (u["text-transform"] = i["text-transform"] + (t ? " !important" : ""));
                i["word-wrap"] === !0 && (u["word-wrap"] = "break-word", u["word-break"] = "break-all");
                o[f.COLUMN] = u;
                o[f.DATA_COLUMN] = u;
                u = JSON.parse(JSON.stringify(u));
                delete u["text-align"];
                delete u["vertical-align"];
                o[f.SYS_COLUMN] = u;
                o[f.COLUMN_DESCENDANTS] = e;
                o[f.DATA_COLUMN_ALL_DESC] = e;
                e = JSON.parse(JSON.stringify(e));
                delete e["text-align"];
                delete e["vertical-align"];
                o[f.SYS_COLUMN_ALL_DESC] = e
            }
            return o
        }
    }, n.getTableStylesObject = function(n, t) {
        var w, v, b, f;
        if (n) {
            var r = JSON.parse(JSON.stringify(n)),
                i = SPLST.ListTableLayoutEditor,
                u = {};
            if (r[i.HEAD]) {
                var e = r[i.HEAD],
                    h = {},
                    c = {};
                e["background-color"] && (h["background-color"] = e["background-color"] + (t ? " !important" : ""));
                e.color ? (h.color = e.color, c.color = e.color + " !important") : (h.color = "", c.color = "");
                u[i.HEAD] = h;
                u[i.HEAD_DESCENDANTS] = c;
                delete r[i.HEAD]
            }
            if (r[i.ODD]) {
                var o = r[i.ODD],
                    l = {},
                    y = {};
                o["background-color"] && (l["background-color"] = o["background-color"]);
                o.color && (l.color = o.color + (t ? " !important" : ""), y.color = o.color + " !important");
                u[i.ODD] = l;
                u[i.ODD_DESCENDANTS] = y;
                delete r[i.ODD]
            }
            if (r[i.EVEN]) {
                var s = r[i.EVEN],
                    a = {},
                    p = {};
                s["background-color"] && (a["background-color"] = s["background-color"]);
                s.color && (a.color = s.color + (t ? " !important" : ""), p.color = s.color + " !important");
                u[i.EVEN] = a;
                u[i.EVEN_DESCENDANTS] = p;
                delete r[i.EVEN]
            }
            return r[i.HOVER] && (u[i.HOVER] = r[i.HOVER], delete r[i.HOVER]), r[i.SELECTED] && (u[i.SELECTED] = r[i.SELECTED], delete r[i.SELECTED]), r[i.HEADER_HOVER] && (u[i.HEADER_HOVER] = r[i.HEADER_HOVER], delete r[i.HEADER_HOVER]), r[i.CHANGED_CELL] && (w = r[i.CHANGED_CELL], v = {}, jQuerySplst.each(w, function(n, t) {
                v[n] = t + " !important"
            }), u[i.CHANGED_CELL] = v, delete r[i.CHANGED_CELL]), r[i.CHILD_STYLES] && (b = r[i.CHILD_STYLES], f = {}, jQuerySplst.each(b, function(n, t) {
                f[n] = {};
                t.color && (f[n].color = t.color + " !important");
                delete t.color;
                f[n] = jQuerySplst.extend(f[n], t)
            }), u[i.CHILD_STYLES] = f, delete r[i.CHILD_STYLES]), jQuerySplst.extend(u, r)
        }
    }, n.initLayoutEditor = function(n, t) {
        if (!(window.splst_layout_editor_ie < 9)) {
            var u = SPLST.ListTableLayoutEditor,
                r = _spPageContextInfo.siteServerRelativeUrl,
                f = jQuerySplst(n),
                e = f.find('table[class*="ms-listviewgrid"]'),
                i;
            if (r.indexOf("/") == r.length - 1 && (r = r.slice(0, -1)), e.length) {
                u._initEditTableLayoutEditor(f);
                return
            }
            if (i = f.data("layout-editor-plugin"), t && u.hideTable(f), i) {
                if (i.isRendered) {
                    if (n.style.visibility === "visible") return;
                    i.unbindEvents();
                    i.bindEvents();
                    i.refresh();
                    u.showTable(n, i.isEditMode ? i.parentTable : null)
                }
            } else i = new u.LayoutEditorPlugin({
                table: n,
                imgBaseUrl: r
            })
        }
    }, n.initLayoutEditors = function() {
        var r;
        if (!(window.splst_layout_editor_ie < 9)) {
            if (window.MSOWebPartPageFormName && (document.forms[MSOWebPartPageFormName]._wikiPageMode && document.forms[MSOWebPartPageFormName] && document.forms[MSOWebPartPageFormName]._wikiPageMode.value === "Edit" || document.forms[MSOWebPartPageFormName] && document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode && document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value === "1")) {
                var u = SPLST.ListTableLayoutEditor,
                    n = jQuerySplst(".ms-listviewtable"),
                    t, i = 0;
                if (n && n.length)
                    for (i = n.length, t = 0; t < i; t++) u.initLayoutEditor(n[t], !0)
            }
            window._ribbonInitFunc1 && (r = window._ribbonInitFunc1, window._ribbonInitFunc1 = function() {
                r();
                jQuerySplst(document).trigger("splstlayouteditor.ribbontabselected")
            })
        }
    }, n._initEditTableLayoutEditor = function(n) {
        var t, o, f;
        if (!(window.splst_layout_editor_ie < 9))
            if (t = e ? jQuerySplst('table[id*="' + n + '"]') : n, SP.GanttControl) {
                var u = SPLST.ListTableLayoutEditor,
                    e = jQuerySplst.type(n) !== "object",
                    i = t.find('table[class*="ms-listviewgrid"]'),
                    r = _spPageContextInfo.siteServerRelativeUrl;
                r.indexOf("/") == r.length - 1 && (r = r.slice(0, -1));
                u.hideTable(i, t);
                i.data("layout-editor-plugin") ? (f = i.data("layout-editor-plugin"), f.isRendered && u.showTable(i[0], t[0])) : o = new u.LayoutEditorPlugin({
                    table: i[0],
                    imgBaseUrl: r,
                    isEditMode: !0,
                    parentTable: t[0]
                })
            } else t.data("init_splst_layout_editor_plugin", !0)
    }, n.ShowEnablePluginDialog = function(n, t) {
        var i = SPLST.ListTableLayoutEditor,
            r = SP.UI.Notify.addNotification("<span>" + i.locale.messages.pluginVisibilityLoading + "<\/span>");
        SP.SOD.executeFunc("sp.js", "SP.ClientContext", function() {});
        SP.SOD.executeOrDelayUntilScriptLoaded(function() {
            var u, e, s = i.Helper;
            u = i.getContext();
            e = i.getWeb();
            var h = u.get_site(),
                f = e.get_lists().getById(n),
                c = f.get_rootFolder(),
                l = e.get_siteUserInfoList(),
                o;
            u.load(h, "MaxItemsPerThrottledOperation");
            u.load(f);
            u.load(c, "Properties");
            u.load(l, "Id");
            i.isExportEnabled && (o = f.get_views(), u.load(o));
            u.executeQueryAsync(function() {
                SP.SOD.executeFunc("sp.ui.dialog.js", "SP.UI.ModalDialog", function() {});
                SP.SOD.executeOrDelayUntilScriptLoaded(function() {
                    var it = c.get_properties(),
                        b = it.get_fieldValues(),
                        a = b[i.PROPERTY_BAG_PREFIX + i.PROPERTY_BAG_PLUGIN_VISIBILITY],
                        y = b[i.PROPERTY_BAG_PREFIX + i.PROPERTY_BAG_PLUGIN_MENU_VISIBILITY],
                        v = b[i.PROPERTY_BAG_PREFIX + i.PROPERTY_BAG_LIST_QUERY_ENABLED],
                        p = b[i.PROPERTY_BAG_PREFIX + i.PROPERTY_BAG_EXPORT_ENABLED],
                        g = jQuerySplst("<div><\/div>"),
                        u = [],
                        nt = i.locale.styles.enableDlg.width || 250,
                        rt = !!i.CFDisabled,
                        e = i.locale.messages,
                        k, d, w, tt, ut;
                    !i.isExportEnabled || a && y && v && p || (k = i._getLBListSettingsView(o), k && (d = i.getListStyles(k), w = d && d.settings, w && (a || (a = w[i.PROPERTY_BAG_PLUGIN_VISIBILITY]), y || (y = w[i.PROPERTY_BAG_PLUGIN_MENU_VISIBILITY]), v || (v = w[i.PROPERTY_BAG_LIST_QUERY_ENABLED]), p || (p = w[i.PROPERTY_BAG_EXPORT_ENABLED]))));
                    y = y !== "false";
                    v = f.get_itemCount() <= h.get_maxItemsPerThrottledOperation() ? v !== "false" : v === "true";
                    p = p !== "false";
                    a = a ? a === "true" : i.isEnabled;
                    n !== "{" + l.get_id().toString().toLowerCase() + "}" ? (u.push('<div class="splst-layout-editor-dlg-row"><label title="' + e.pluginVisibilityTooltipText + '"><input type="checkbox" id="splst-layout-editor-enablePlugin-cbx" ' + (a ? "checked " : "") + " />" + e.pluginVisibilityText + "<\/label><\/div>"), u.push('<div class="splst-layout-editor-dlg-row"><label title="' + e.pluginMenuVisibilityTooltipText + '"><input type="checkbox" id="splst-layout-editor-showPluginMenu-cbx" ' + (y ? "checked " : "") + " />" + e.pluginMenuVisibilityText + "<\/label><\/div>"), u.push('<div class="splst-layout-editor-dlg-row"><label title=\'' + (rt ? e.listQueryEnabledTooltipText : e.listQueryEnabledTooltipTextStatic) + '\'><input type="checkbox" id="splst-layout-editor-queryEnabled-cbx" ' + (v ? "checked " : "") + " />" + e.listQueryEnabledText + "<\/label><\/div>"), i.isExportEnabled && u.push('<div class="splst-layout-editor-dlg-row"><label title="' + e.exportEnanbledTooltipText + '"><input type="checkbox" id="splst-layout-editor-exportEnabled-cbx" ' + (p ? "checked " : "") + " />" + e.exportEnanbledText + "<\/label><\/div>"), u.push('<div class="splst-layout-editor-dlg-row">' + s.generatePoweredByBlockForDialogs(!0) + "<\/div>"), u.push('<div class="ms-core-form-bottomButtonBox">'), u.push('<button id="splst-layout-editor-OkBtnDismissDlg" class="ms-ButtonHeightWidth" '), u.push('value="ok" onclick="SPLST.ListTableLayoutEditor.dismissEnablePluginDialog(this, \'' + n + "', " + t + ')">'), u.push(SP.Res.okButtonText), u.push("<\/button>"), u.push('<button id="splst-layout-editor-CancelBtnDismissDlg" class="ms-ButtonHeightWidth" '), u.push('value="cancel" onclick="SPLST.ListTableLayoutEditor.dismissEnablePluginDialog(this)">'), u.push(SP.Res.cancelButtonText), u.push("<\/button>"), u.push("<\/div>")) : (u.push('<div class="splst-layout-editor-dlg-row">' + i.locale.messages.notSupportedList + "<\/div>"), u.push('<div class="splst-layout-editor-dlg-row">' + s.generatePoweredByBlockForDialogs(!0) + "<\/div>"), u.push('<div class="ms-core-form-bottomButtonBox">'), u.push('<button id="splst-layout-editor-OkBtnDismissDlg" class="ms-ButtonHeightWidth" '), u.push('value="cancel" onclick="SPLST.ListTableLayoutEditor.dismissEnablePluginDialog(this, \'' + n + "')\">"), u.push(SP.Res.okButtonText), u.push("<\/button>"), u.push("<\/div>"), nt = 400);
                    g.html(u.join(""));
                    tt = {
                        html: g[0],
                        title: i.locale.messages.pluginVisibilityCaption,
                        width: nt,
                        height: i.isExportEnabled ? 167 : 145,
                        dialogReturnValueCallback: i.onEnablePluginDialogReturnValueCallback
                    };
                    SP.UI.Notify.removeNotification(r);
                    ut = new SP.UI.ModalDialog.showModalDialog(tt)
                }, "sp.ui.dialog.js")
            }, function() {
                SP.UI.Notify.removeNotification(r)
            })
        }, "sp.js")
    }, n.onEnablePluginDialogReturnValueCallback = function(n, t) {
        var r;
        if (t && t.listId) {
            var i = SPLST.ListTableLayoutEditor,
                c = SP.UI.Notify.addNotification("<span>" + i.locale.messages.lbSettingsApplying + "<\/span>"),
                o = i.spContext,
                l = i.spWeb,
                e = i.spWeb.get_lists().getById(t.listId),
                h = e.get_rootFolder(),
                u = h.get_properties(),
                f, s;
            i.isExportEnabled && (o.load(e), f = e.get_views(), o.load(f));
            u && (u.set_item(i.PROPERTY_BAG_PREFIX + i.PROPERTY_BAG_PLUGIN_VISIBILITY, t.value.toString()), u.set_item(i.PROPERTY_BAG_PREFIX + i.PROPERTY_BAG_PLUGIN_MENU_VISIBILITY, t.menuValue.toString()), u.set_item(i.PROPERTY_BAG_PREFIX + i.PROPERTY_BAG_LIST_QUERY_ENABLED, t.queryEnabledValue.toString()), i.isExportEnabled && (s = u.get_fieldValues()[i.PROPERTY_BAG_PREFIX + i.PROPERTY_BAG_EXPORT_ENABLED], u.set_item(i.PROPERTY_BAG_PREFIX + i.PROPERTY_BAG_EXPORT_ENABLED, t.exportEnabledValue.toString()), t.exportEnabledValue.toString() === "false" && u.set_item(i.PROPERTY_BAG_PREFIX + i.PROPERTY_BAG_VIEWS_MAPPING, null)), h.update(), r = function() {
                SP.UI.Notify.removeNotification(c);
                t.refreshPage && window.location.reload()
            }, o.executeQueryAsync(function() {
                i.isExportEnabled ? t.exportEnabledValue.toString() !== "false" ? i._savePluginSettingsToHiddenView(f, t).then(function() {
                    if (s === "false") return i.saveAllViewsStyles(e, f)
                }).then(function() {
                    r()
                }, function() {
                    r()
                }) : s !== "false" ? (i.clearAllViewsStyles(f, !1), i.spContext.executeQueryAsync(function() {
                    r()
                }, function() {
                    r()
                })) : r() : r()
            }, function() {
                r()
            }))
        }
    }, n.dismissEnablePluginDialog = function(n, t, i) {
        var u = SP.UI.ModalDialog.get_childDialog(),
            f, r;
        u && (f = SP.UI.DialogResult.cancel, n.value === "ok" && (r = {
            value: jQuerySplst("#splst-layout-editor-enablePlugin-cbx")[0].checked,
            menuValue: jQuerySplst("#splst-layout-editor-showPluginMenu-cbx")[0].checked,
            queryEnabledValue: jQuerySplst("#splst-layout-editor-queryEnabled-cbx")[0].checked,
            listId: t
        }, SPLST.ListTableLayoutEditor.isExportEnabled && (r.exportEnabledValue = jQuerySplst("#splst-layout-editor-exportEnabled-cbx")[0].checked), r.refreshPage = i, u.set_returnValue(r), f = SP.UI.DialogResult.OK), u.close(f))
    }, n.initPluginsForTables = function() {
        var n, i, t, r;
        if (!(window.splst_layout_editor_ie < 9) && SP.ClientContext && (n = jQuerySplst(".ms-listviewtable"), n && (i = n.length)))
            for (t = 0; t < i; t++) r = n[t], SPLST.ListTableLayoutEditor.initLayoutEditor(r)
    }, n.hasColumnSettingsChanges = function() {
        for (var n = !1, i = this.Modules(), t = 0, r = i.length; t < r; t++) n = n || i[t].hasColumnSettingsChanges();
        return n
    }, n.setColSettingsDialogOkButtonAvailability = function(n) {
        var t = jQuerySplst("#splst-layout-editor-OkBtnDismissDlg");
        t.length && (n || !this.hasColumnSettingsChanges() ? t.attr("disabled", "disabled") : t.removeAttr("disabled"))
    }, n.getCurrentSPVersion = function() {
        var t = SPLST.ListTableLayoutEditor,
            n;
        return !t.spVersion && _spPageContextInfo && (n = _spPageContextInfo.siteClientTag, n && (n = n.split("$$"), t.spVersion = n[1])), t.spVersion
    }, n.SODLoadMultiple = function(n, t) {
        var f = [],
            r, e, i, u;
        for (n || n.length || t && t(), r = 0, e = n.length; r < e; r++) i = n[r], SP.SOD.executeFunc(i, null, null), u = jQuerySplst.Deferred(), u._script = i, f.push(u), i.endsWith(".js") || (i += ".js"),
            function(n) {
                SP.SOD.executeOrDelayUntilScriptLoaded(function() {
                    n.resolve()
                }, i)
            }(u);
        jQuerySplst.when.apply(jQuerySplst, f).done(function() {
            t && t()
        })
    }, n.getRegisteredInplviewSodName = function() {
        var n = window._v_dictSod || {};
        return n["inplview.js"] ? "inplview.js" : "inplview"
    }, n.addHoverStyleForViewColumnsTable = function() {
        var e = document.querySelector("#tbodyViewColumns"),
            i, u, f, r, o, s, n, t;
        if (e) {
            if (i = e.rows[0].cells[3], n = i.querySelector("style"), n) return;
            for (u = i.querySelector("table"), f = u.rows, r = 1, o = f.length; r < o; r++) s = f[r], s.className += " ms-itmHoverEnabled";
            n = document.createElement("style");
            n.appendChild(document.createTextNode(""));
            i.insertBefore(n, u);
            t = n.sheet;
            "addRule" in t ? t.addRule(".ms-itmHoverEnabled:hover > *", "border: 0px;", 0) : "insertRule" in t && t.insertRule(".ms-itmHoverEnabled:hover > * { border: 0px; }", 0)
        }
    }, n.refreshPageBoosters = function() {
        var i = SPLST.ListTableLayoutEditor,
            n, r, t;
        if (i._boosters) {
            n = i._boosters;
            for (r in n) t = n[r], t.isDisposed || t.refresh()
        }
    }, n.getFuncArgsNames = function(n) {
        var t = n.toString(),
            r = t.slice(t.indexOf("(") + 1, t.indexOf(")")),
            i = r.match(/([^\s,]+)/g);
        return i ? i : []
    }, n.isScriptRegistered = function(n) {
        if (document.querySelector('script[src*="' + n + '"]')) return {
            registered: !0
        };
        if (_v_dictSod[n]) return {
            registered: !0,
            sodName: n
        };
        var t = n.slice(0, n.lastIndexOf(".js"));
        return _v_dictSod[t] ? {
            registered: !0,
            sodName: t
        } : null
    }, n.loadScripts = function(n, t) {
        var o = [],
            s = [],
            u = jQuerySplst.Deferred(),
            i, h, r, f, e;
        for (t = t !== !1, n = Array.isArray(n) ? n : [n], i = 0, h = n.length; i < h; i++) r = n[i], f = this.isScriptRegistered(r), f ? f.sodName && s.push(r) : o.push(r);
        return e = jQuerySplst.map(o, function(n) {
            var r = t ? _spPageContextInfo.layoutsUrl + "/" + n : n,
                i = _spPageContextInfo.webServerRelativeUrl;
            return i.endsWith("/") && (i = i.slice(1, -1)), jQuerySplst.getScript(i + "/" + r)
        }), e.push(jQuerySplst.Deferred(function(n) {
            jQuerySplst(n.resolve)
        })), jQuerySplst.when.apply(jQuerySplst, e).then(function() {
            SPLST.ListTableLayoutEditor.SODLoadMultiple(s, function() {
                u.resolve()
            })
        }, function() {
            u.reject()
        }), u
    }, n._getViewIdFromTableEl = function(n) {
        var i = n.getAttribute("o:webquerysourcehref"),
            t, r;
        return i ? (t = i.slice(i.indexOf("View=") + 5), r = t.indexOf("&"), r !== -1 && (t = t.slice(0, r)), t.replace(/%2D|%7D|%7B/gm, "-")) : ""
    }, n.hideTable = function(n, t) {
        if (n[0].style.visibility !== "hidden") {
            n[0].style.visibility = "hidden";
            var i = this;
            jQuerySplst("body").ready(function() {
                var r = t || n,
                    i = r.parent().closest("table").parent().find(".ms-bottompaging");
                i.length && (i[0].style.display = "none", i.parent()[0].style.display = "none")
            })
        }
    }, n.showTable = function(n, t, i) {
        var f, r, e, u;
        n.style.visibility !== "visible" && (n.style.visibility = "visible", f = this._getViewIdFromTableEl(t || n), r = document.querySelector('[id="' + f + '_loader"]'), r && r.parentNode.removeChild(r), e = jQuerySplst(t || n), u = e.parent().closest("table").parent().find(".ms-bottompaging"), u.length && (i && (u[0].style.display = "table"), u.parent()[0].style.display = "block"))
    }, n.showSpinner = function(n, t) {
        if (n[0].style.visibility === "hidden") {
            var i = this;
            jQuerySplst("body").ready(function() {
                var r = t || n,
                    h = SPLST.ListTableLayoutEditor._getViewIdFromTableEl(r[0]),
                    u = jQuerySplst(i.getLoadingHtml(h + "_loader", !0)),
                    f = r.position(),
                    e = parseInt(r.css("left") || "0"),
                    o = 20,
                    s = 20;
                location.hash.indexOf("InitialTabId=") !== -1 && (s -= jQuerySplst(".ms-cui-tabContainer").outerHeight());
                e !== 0 && r.css("position") === "relative" && (o -= e);
                u.css({
                    position: "absolute",
                    left: f.left + o + "px",
                    top: f.top + s + "px"
                });
                r.after(u)
            })
        }
    }, n.getLoadingHtml = function(n, t) {
        var r = SPLST.ListTableLayoutEditor.locale,
            f = SPLST.ListTableLayoutEditor.isIE(),
            e = t ? "0" : "40",
            u = t ? "20" : "32",
            o = t ? "24" : "36",
            i = "Working on it...";
        return r ? i = r.messages.workingOnIt : window.SP && window.SP.Res && window.SP.Res.dialogLoading15 ? i = SP.Res.dialogLoading15 : window.Strings && window.Strings.STS && window.Strings.STS.L_Loading_Text && (i = Strings.STS.L_Loading_Text), '<div style="text-align: center; margin-top: ' + e + 'px;"' + (n ? ' id="' + n + '"' : "") + ">" + (f ? "" : '<img src="data:image/gif;base64,R0lGODlhEAAQAIAAAFLOQv///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgABACwJAAIAAgACAAACAoRRACH5BAUKAAEALAwABQACAAIAAAIChFEAIfkEBQoAAQAsDAAJAAIAAgAAAgKEUQAh+QQFCgABACwJAAwAAgACAAACAoRRACH5BAUKAAEALAUADAACAAIAAAIChFEAIfkEBQoAAQAsAgAJAAIAAgAAAgKEUQAh+QQFCgABACwCAAUAAgACAAACAoRRACH5BAkKAAEALAIAAgAMAAwAAAINjAFne8kPo5y02ouzLQAh+QQJCgABACwCAAIADAAMAAACF4wBphvID1uCyNEZM7Ov4v1p0hGOZlAAACH5BAkKAAEALAIAAgAMAAwAAAIUjAGmG8gPW4qS2rscRPp1rH3H1BUAIfkECQoAAQAsAgACAAkADAAAAhGMAaaX64peiLJa6rCVFHdQAAAh+QQJCgABACwCAAIABQAMAAACDYwBFqiX3mJjUM63QAEAIfkECQoAAQAsAgACAAUACQAAAgqMARaol95iY9AUACH5BAkKAAEALAIAAgAFAAUAAAIHjAEWqJeuCgAh+QQJCgABACwFAAIAAgACAAACAoRRADs=" width="' + u + '" height="' + u + '" />') + '<span style="color: #0072c6; font-size: ' + o + "px; font-family: 'Segoe UI Light', 'Segoe UI', Tahoma, Helvetica, Arial, sans-serif\">&nbsp;" + i + "<\/span><\/div>"
    }, n.getListStyles = function(n) {
        if (!this.isExportEnabled) return null;
        var t = "";
        try {
            t = n.get_htmlSchemaXml()
        } catch (i) {
            return null
        }
        return this.getListStylesFromSchemaXml(t, n.get_id().toString())
    }, n.getListStylesFromSchemaXml = function(n, t) {
        var r;
        if (!this.isExportEnabled) return null;
        var u = {},
            f = jQuerySplst(jQuerySplst.parseXML(n)),
            i = f.find(this.LBLISTSTYLES_ELEMENT);
        return !i || !i.length ? null : i.attr("ViewId") === t ? null : (r = this._getViewStyle(i, this.LBLISTSTYLES_SETTINGS_ELEMENT), r && (u.settings = r), u)
    }, n.getViewStyles = function(n, t) {
        if (!this.isExportEnabled) return null;
        var i = this._getViewStylesFromXML(t),
            r = this._getExportedViewStylesFromPropertyBag(n.listName, n.listId, t);
        return !i && !r ? null : jQuerySplst.extend(!0, {}, r, i)
    }, n._getViewStyle = function(n, t) {
        var i = n.find(t),
            r;
        if (i && i.length) try {
            r = JSON.parse(i.text())
        } catch (u) {}
        return r
    }, n.clearAllViewsStyles = function(n, t) {
        var u, i, f, r;
        if (n) {
            for (i = 0, f = n.get_count(); i < f; i++) {
                if (r = n.get_item(i), r.get_title() === this.HIDDEN_VIEW_TITLE) {
                    u = r;
                    continue
                }
                this.clearViewStyles(null, r, !1)
            }
            u && u.deleteObject();
            t !== !1 && this.getContext().executeQueryAsync()
        }
    }, n.clearViewStyles = function(n, t, i) {
        var u, e, f, r;
        if (this.isExportEnabled) {
            u = "";
            try {
                u = t.get_htmlSchemaXml()
            } catch (o) {
                return
            }
            if (e = jQuerySplst(jQuerySplst.parseXML(u)), f = e.find(this.LBSTYLES_ELEMENT), f && f.length) {
                r = "";
                try {
                    r = t.get_listViewXml().replace("<\/View>", "").replace(/<View\s[^>]*>/gmi, "")
                } catch (o) {
                    return
                }
                r && (t.set_listViewXml(r), t.update(), i !== !1 && (n ? n.executeQueryAsync() : this.getContext().executeQueryAsync()))
            }
        }
    }, n.saveAllViewsStyles = function(n, t, i) {
        var r = i || new jQuerySplst.Deferred,
            f, l, u, a, s, h, e, v, o, y, c;
        if (!n || !t || !t.get_count()) return r.resolve(), r;
        u = this.getContext();
        try {
            f = n.get_title();
            l = n.get_id()
        } catch (p) {
            u.load(n, "Title", "ID");
            u.executeQueryAsync(function() {
                SPLST.ListTableLayoutEditor.saveAllViewsStyles(n, t, r)
            }, function() {
                console.log("Error getting list info in saveAllViewsStyles");
                r.reject()
            })
        }
        if (a = this.allProperties[f], a) {
            for (h = !1, e = 0, v = t.get_count(); e < v; e++)(o = t.get_item(e), o.get_title() !== this.HIDDEN_VIEW_TITLE) && (y = o.get_id().toString().toUpperCase(), c = this._getViewStylesFromPropertyBag(f, y), c && (h = !0, this.saveViewStyles(f, l, o, c, null, !1)));
            h && u.executeQueryAsync(function() {
                r.resolve()
            }, function() {
                console.log("Error saving styles to View XML in saveAllViewsStyles");
                r.reject()
            })
        } else s = n.get_rootFolder(), u.load(s, "Properties"), u.executeQueryAsync(function() {
            SPLST.ListTableLayoutEditor.allProperties[f] = s.get_properties();
            SPLST.ListTableLayoutEditor.saveAllViewsStyles(n, t, r)
        }, function() {
            console.log("Error getting Property Bag in saveAllViewsStyles")
        });
        return r
    }, n.saveViewStyles = function(n, t, i, r, u, f) {
        var e, a, c, o, p, v, y, l;
        if (this.isExportEnabled) {
            if (e = {}, e[this.LBSTYLES_STYLES_ELEMENT] = r.styles || r[this.PROPERTY_BAG_STYLE_POSTFIX], e[this.LBSTYLES_TABLE_STYLES_ELEMENT] = r.tableStyles || r[this.PROPERTY_BAG_TABLE_STYLE_POSTFIX], e[this.LBSTYLES_WIDTHS_ELEMENT] = r.widths || r[this.PROPERTY_BAG_WIDTH_POSTFIX], e[this.LBSTYLES_OPTIONS_ELEMENT] = r.options || r[this.PROPERTY_BAG_OPTIONS_POSTFIX], e[this.LBSTYLES_PLUGIN_SETTINGS_ELEMENT] = r.pluginSettings || r[this.PROPERTY_BAG_PLUGIN_SETTINGS_POSTFIX], a = this._saveStyles(i, this.LBSTYLES_ELEMENT, e), a && (c = this.allProperties[n], c)) {
                var w = c.get_fieldValues(),
                    b = w[this.PROPERTY_BAG_PREFIX + this.PROPERTY_BAG_VIEWS_MAPPING],
                    s = JSON.parse(b || "{}"),
                    h = i.get_title(),
                    k = i.get_id().toString();
                t.indexOf("{") !== -1 && (t = t.slice(1, -1));
                o = t + "_" + k;
                s[h] && s[h] === o || (p = s[h], p && (l = o.indexOf("_"), l !== -1 ? (y = o.slice(0, l), v = o.slice(l + 1)) : v = o, !h && y && t !== y && this._clearPropertyBagForView(u, n, v, f)), s[h] = o, c.set_item(this.PROPERTY_BAG_PREFIX + this.PROPERTY_BAG_VIEWS_MAPPING, JSON.stringify(s)), (this.spWeb || SP.ClientContext.get_current().get_web()).get_lists().getByTitle(n).get_rootFolder().update())
            }
            f !== !1 && a && (u ? u.executeQueryAsync() : this.getContext().executeQueryAsync())
        }
    }, n.saveListStyles = function(n, t) {
        if (this.isExportEnabled && t) {
            var i = {};
            return i[this.LBLISTSTYLES_SETTINGS_ELEMENT] = t, this._saveStyles(n, this.LBLISTSTYLES_ELEMENT, i)
        }
    }, n._saveStyles = function(n, t, i) {
        var o, u, f, e, h;
        if (this.isExportEnabled) {
            o = "";
            try {
                o = n.get_htmlSchemaXml()
            } catch (l) {
                return
            }
            u = "";
            try {
                u = n.get_listViewXml().replace("<\/View>", "").replace(/<View\s[^>]*>/gmi, "")
            } catch (l) {
                return
            }
            if (u) {
                f = o;
                new RegExp("<" + t + '\\s+ViewId="([\\d\\w]{32}|[\\d\\w-]{36})"\\s*>', "gmi").test(u) && (f = "<root>" + u + "<\/root>", u = u.replace(new RegExp("<" + t + '\\s+ViewId="([\\d\\w]{32}|[\\d\\w-]{36})"\\s*>.*<\\/' + t + ">", "gmi"), ""));
                var c = jQuerySplst(jQuerySplst.parseXML(f)),
                    s = c.find(t),
                    r = "";
                s && s.length && (SPLST.ListTableLayoutEditor.isIE() ? (r = new RegExp("<" + t + '\\s+ViewId="([\\d\\w]{32}|[\\d\\w-]{36})"\\s*>.*<\\/' + t + ">", "gmi").exec(f)[0], r = r.replace(new RegExp("<" + t + '\\s+ViewId="([\\d\\w]{32}|[\\d\\w-]{36})"\\s*>', "gmi"), "").replace(new RegExp("<\\/" + t + ">", "gmi"), "")) : r = s.html());
                for (e in i) i.hasOwnProperty(e) && (h = i[e], r = this._updateXmlPropString(r, e, h));
                if (r) return r = "<" + t + ' ViewId="' + n.get_id() + '">' + r + "<\/" + t + ">", u += r, n.set_listViewXml(u), n.update(), !0
            }
        }
    }, n._updateXmlPropString = function(n, t, i) {
        if (i === undefined) return n;
        var r = i ? "<" + t + "><![CDATA[" + JSON.stringify(i) + "]\]><\/" + t + ">" : "";
        return n ? n.indexOf("<" + t + ">") === -1 ? n + r : n.replace(new RegExp("<" + t + "><!\\[CDATA\\[.*\\]\\]><\\/" + t + ">", "gmi"), r) : r
    }, n._getLBListSettingsView = function(n) {
        var r, t, u, i;
        if (n) {
            try {
                for (t = 0, u = n.get_count(); t < u; t++)
                    if (i = n.get_item(t), i.get_title() === this.HIDDEN_VIEW_TITLE) {
                        r = i;
                        break
                    }
            } catch (f) {
                return
            }
            return r
        }
    }, n._clearPropertyBagForView = function(n, t, i, r) {
        var u, f;
        if (i.startsWith("{") || (i = "{" + i + "}"), u = this.allProperties[t], u) {
            var o = u.get_fieldValues(),
                s = (this.PROPERTY_BAG_PREFIX + i).toLowerCase(),
                e = !1;
            for (f in o) f.toLowerCase().indexOf(s) !== -1 && (u.set_item(f, null), e = !0);
            e && (this.spWeb.get_lists().getByTitle(t).get_rootFolder().update(), r !== !1 && n.executeQueryAsync())
        }
    }, n._getViewStylesFromPropertyBag = function(n, t) {
        var l = this.allProperties[n],
            i, o, s, h, c;
        if (!l) return null;
        i = l.get_fieldValues();
        t.startsWith("{") || (t = "{" + t + "}");
        var f = this.PROPERTY_BAG_PREFIX + t.toLowerCase(),
            e = this.PROPERTY_BAG_PREFIX + t.toUpperCase(),
            r = {},
            u = !1,
            a = i[f + this.PROPERTY_BAG_STYLE_POSTFIX + this.PROPERTY_BAG_GLOBAL_POSTFIX] || i[e + this.PROPERTY_BAG_STYLE_POSTFIX + this.PROPERTY_BAG_GLOBAL_POSTFIX];
        return (a && (r[this.PROPERTY_BAG_STYLE_POSTFIX] = JSON.parse(a), u = !0), o = i[f + this.PROPERTY_BAG_TABLE_STYLE_POSTFIX + this.PROPERTY_BAG_GLOBAL_POSTFIX] || i[e + this.PROPERTY_BAG_TABLE_STYLE_POSTFIX + this.PROPERTY_BAG_GLOBAL_POSTFIX], o && (r[this.PROPERTY_BAG_TABLE_STYLE_POSTFIX] = JSON.parse(o), u = !0), s = i[f + this.PROPERTY_BAG_WIDTH_POSTFIX + this.PROPERTY_BAG_GLOBAL_POSTFIX] || i[e + this.PROPERTY_BAG_WIDTH_POSTFIX + this.PROPERTY_BAG_GLOBAL_POSTFIX], s && (r[this.PROPERTY_BAG_WIDTH_POSTFIX] = JSON.parse(s), u = !0), h = i[f + this.PROPERTY_BAG_OPTIONS_POSTFIX + this.PROPERTY_BAG_GLOBAL_POSTFIX] || i[e + this.PROPERTY_BAG_OPTIONS_POSTFIX + this.PROPERTY_BAG_GLOBAL_POSTFIX], h && (r[this.PROPERTY_BAG_OPTIONS_POSTFIX] = JSON.parse(h), u = !0), c = i[f + this.PROPERTY_BAG_PLUGIN_SETTINGS_POSTFIX] || i[e + this.PROPERTY_BAG_PLUGIN_SETTINGS_POSTFIX], c && (r[this.PROPERTY_BAG_PLUGIN_SETTINGS_POSTFIX] = JSON.parse(c), u = !0), !u) ? null : r
    }, n._getExportedViewStylesFromPropertyBag = function(n, t, i) {
        var e = this.allProperties[n],
            u, t, r, f;
        if (!e) return null;
        t.indexOf("{") !== -1 && (t = t.slice(1, -1));
        var h = e.get_fieldValues(),
            c = h[this.PROPERTY_BAG_PREFIX + this.PROPERTY_BAG_VIEWS_MAPPING],
            o = JSON.parse(c || "{}"),
            s = i.get_title(),
            l = i.get_id().toString();
        if (!o[s]) return null;
        if (u = o[s], f = u.indexOf("_"), f !== -1) {
            if (savedlistId = u.slice(0, f), savedlistId === t) return null;
            r = u.slice(f + 1)
        } else r = u;
        return r.startsWith("{") || (r = "{" + r + "}"), this._getViewStylesFromPropertyBag(n, r)
    }, n._getViewStylesFromXML = function(n) {
        var i = {},
            r = !1,
            h = "",
            c, t, u, f, e, o, s;
        try {
            h = n.get_htmlSchemaXml()
        } catch (l) {
            return null
        }
        return (c = jQuerySplst(jQuerySplst.parseXML(h)), t = c.find(this.LBSTYLES_ELEMENT), !t || !t.length) ? null : t.attr("ViewId") === n.get_id().toString() ? null : (u = this._getViewStyle(t, this.LBSTYLES_STYLES_ELEMENT), u && (i[this.PROPERTY_BAG_STYLE_POSTFIX] = u, r = !0), f = this._getViewStyle(t, this.LBSTYLES_TABLE_STYLES_ELEMENT), f && (i[this.PROPERTY_BAG_TABLE_STYLE_POSTFIX] = f, r = !0), e = this._getViewStyle(t, this.LBSTYLES_WIDTHS_ELEMENT), e && (i[this.PROPERTY_BAG_WIDTH_POSTFIX] = e, r = !0), o = this._getViewStyle(t, this.LBSTYLES_OPTIONS_ELEMENT), o && (i[this.PROPERTY_BAG_OPTIONS_POSTFIX] = o, r = !0), s = this._getViewStyle(t, this.LBSTYLES_PLUGIN_SETTINGS_ELEMENT), s && (i[this.PROPERTY_BAG_PLUGIN_SETTINGS_POSTFIX] = s, r = !0), !r) ? null : i
    }, n._savePluginSettingsToHiddenView = function(n, t, i, r) {
        var f = r || new jQuerySplst.Deferred,
            e = this._getLBListSettingsView(n),
            o = this.getContext(),
            s, u;
        return e ? (e.get_hidden() || (e.set_hidden(!0), e.update()), u = {}, u[this.PROPERTY_BAG_PLUGIN_VISIBILITY] = t.value.toString(), u[this.PROPERTY_BAG_PLUGIN_MENU_VISIBILITY] = t.menuValue.toString(), u[this.PROPERTY_BAG_LIST_QUERY_ENABLED] = t.queryEnabledValue.toString(), u[this.PROPERTY_BAG_EXPORT_ENABLED] = t.exportEnabledValue.toString(), this.saveListStyles(e, u) && i !== !1 ? o.executeQueryAsync(function() {
            f.resolve()
        }, function() {
            f.resolve()
        }) : f.resolve()) : (s = new SP.ViewCreationInformation, s.set_title(this.HIDDEN_VIEW_TITLE), n.add(s), o.load(n), o.executeQueryAsync(function() {
            SPLST.ListTableLayoutEditor._savePluginSettingsToHiddenView(n, t, i, f)
        }, function() {
            r.resolve()
        })), f
    }, n.showNotificationDlg = function(n) {
        var t = document.createElement("div"),
            i, r;
        t.innerText = t.textContent = n;
        t.style.whiteSpace = "nowrap";
        t.style.textAlign = "center";
        t.style.fontSize = "32px";
        t.style.paddingBottom = "20px";
        t.style.fontFamily = '"Segoe UI Light", "Segoe UI", Tahoma, Helvetica, Arial, sans-serif';
        t.style.color = "#0072c6";
        i = {
            html: t,
            title: " ",
            showClose: !1,
            width: 250
        };
        r = new SP.UI.ModalDialog.showModalDialog(i);
        setTimeout(function() {
            r.close()
        }, 1500)
    }, n.getLicenseLeftDays = function() {
        if (!this.licenseExpirationDate) return null;
        if (!this.licenseLeftDays) {
            var n = new Date;
            this.licenseLeftDays = Math.ceil((this.licenseExpirationDate - new Date(n.getFullYear(), n.getMonth(), n.getDate())) / this.oneDay) + 1
        }
        return this.licenseLeftDays
    }, n.getContext = function() {
        return this.spContext || (this.spContext = SP.ClientContext.get_current()), this.spContext
    }, n.getWeb = function() {
        return this.spWeb || (this.spWeb = this.getContext().get_web()), this.spWeb
    }, n.loadResources = function() {
        var i, r, n, t;
        if (this.locale) {
            jQuerySplst(document).trigger("splstlayouteditor.resouresloaded");
            return
        }
        i = "en-US";
        _spPageContextInfo && (i = _spPageContextInfo.currentUICultureName);
        i === "en-US" ? (this.locale = this.defaultLocale, jQuerySplst(document).trigger("splstlayouteditor.resouresloaded")) : (r = "", n = _spPageContextInfo.siteServerRelativeUrl, n.indexOf("/") == n.length - 1 && (n = n.slice(0, -1)), r = n + this.scriptsPath + "locale/resources." + i + ".js", t = this, jQuerySplst.ajax({
            url: r,
            method: "GET",
            contentType: "application/json",
            async: !1,
            headers: {
                accept: "application/json"
            },
            dataType: "json",
            success: function(n) {
                t.locale = jQuerySplst.extend({}, t.defaultLocale, n);
                jQuerySplst(document).trigger("splstlayouteditor.resouresloaded")
            },
            error: function() {
                t.locale = t.defaultLocale;
                jQuerySplst(document).trigger("splstlayouteditor.resouresloaded")
            }
        }))
    }, n.getScrollbarWidth = function() {
        var n, t;
        return this.isMac ? 0 : (this.scrollbarWidth === -1 && (n = jQuerySplst('<div style="width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;"><\/div>'), jQuerySplst("body").append(n), t = n[0].offsetWidth - n[0].clientWidth, n.remove(), this.scrollbarWidth = t), this.scrollbarWidth)
    }, n.logInfo = function(n, t) {
        this.logTrace({
            list: n.listName,
            view: n.viewId,
            mode: n.isEditMode ? "edit" : "read",
            type: "info",
            message: t
        })
    }, n.logError = function(n, t) {
        this.logTrace({
            list: n.listName,
            view: n.viewId,
            mode: n.isEditMode ? "edit" : "read",
            type: "error",
            message: t
        })
    }, n.logTrace = function(n) {
        var t = JSON.parse(JSON.stringify(n)),
            i = new Date;
        t.timespan = i;
        this.traceInfo.push(t)
    }, n.getTraceInfo = function(n) {
        var u = this.traceInfo,
            i = "",
            r, f;
        for (n || (i += "<table><thead><tr><th>List<\/th><th>View<\/th><th>Mode<\/th><th>Type<\/th><th>Message<\/th><th>Timespan<\/th><\/tr><\/thead><tbody>"), r = 0, f = u.length; r < f; r++) {
            var t = u[r],
                o = t.timespan,
                e = o.toISOString();
            i += n ? t.list + "," + t.view + "," + t.mode + "," + t.type + "," + t.message + "," + e + "\n" : "<tr><td>" + t.list + "<\/td><td>" + t.view + "<\/td><td>" + t.mode + "<\/td><td>" + t.type + "<\/td><td>" + t.message + "<\/td><td>" + e + "<\/td><\/tr>"
        }
        n ? console.log(i) : (i += "<\/tbody><\/table>", console.log(i))
    }, n.getStackTrace = function(n) {
        var t = "";
        try {
            throw new Error;
        } catch (i) {
            t = i.stack;
            n.name && (t = t.slice(t.indexOf(n.name)))
        }
        return t
    }, n.showViewsSettingsDialog = function(n, t) {
        var i = SPLST.ListTableLayoutEditor,
            u = SP.UI.Notify.addNotification("<span>" + i.locale.messages.pluginVisibilityLoading + "<\/span>"),
            r = i.Helper;
        r.addStaticCssRules();
        SP.SOD.executeFunc("sp.js", "SP.ClientContext", function() {});
        SP.SOD.executeOrDelayUntilScriptLoaded(function() {
            var f, e;
            i.spContext || (i.spContext = SP.ClientContext.get_current());
            i.spWeb || (i.spWeb = i.spContext.get_web());
            f = i.spContext;
            e = i.spWeb;
            var o = e.get_lists().getById(n),
                h = o.get_rootFolder(),
                s = o.get_views(),
                c = e.get_siteUserInfoList();
            f.load(o);
            f.load(s);
            f.load(h, "Properties");
            f.load(c, "Id");
            f.executeQueryAsync(function() {
                SP.SOD.executeFunc("sp.ui.dialog.js", "SP.UI.ModalDialog", function() {});
                SP.SOD.executeOrDelayUntilScriptLoaded(function() {
                    var w = h.get_properties(),
                        b = w.get_fieldValues(),
                        e = JSON.parse(b[i.PROPERTY_BAG_PREFIX + i.PROPERTY_BAG_VIEWS_SETTINGS] || "{}"),
                        k = e && e.views,
                        v = jQuerySplst("<div><\/div>"),
                        f = [],
                        l = i.locale.messages.viewsSettingsDlg,
                        y = n === "{" + c.get_id().toString().toLowerCase() + "}",
                        p, o, a;
                    y ? (f.push('<div class="splst-layout-editor-dlg-row">' + i.locale.messages.notSupportedList + "<\/div>"), f.push('<div class="splst-layout-editor-dlg-row">' + r.generatePoweredByBlockForDialogs(!0) + "<\/div>"), f.push('<div class="ms-core-form-bottomButtonBox">'), f.push('<button id="splst-layout-editor-OkBtnDismissDlg" class="ms-ButtonHeightWidth" value="cancel" onclick="SPLST.ListTableLayoutEditor.dismissViewsSettingsDialog(this, \'' + n + "')\">"), f.push(SP.Res.okButtonText), f.push("<\/button>"), f.push("<\/div>")) : (f.push('<div class="splst-layout-editor-dlg-row" data-lb-id="views-settings-container" style="padding: 0 15px; max-height: 800px; overflow-y: auto; overflow-x: hidden;">'), f.push("<\/div>"), f.push('<div class="splst-layout-editor-dlg-row" style="padding: 20px 15px; display: table; box-sizing: border-box; width: 100%;">'), f.push('<div class="splst-lb-views-footer">'), f.push('<div class="splst-lb-views-info">' + l.info + "<\/div>"), f.push('<div class="splst-lb-views-reset"><a class="ms-heroCommandLink splst-lb-views-reset-link" href="javascript:;">' + l.reset + "<\/a><\/div>"), f.push("<\/div>"), f.push("<\/div>"), f.push('<div class="splst-layout-editor-dlg-row">' + r.generatePoweredByBlockForDialogs(!0) + "<\/div>"), f.push('<div class="ms-core-form-bottomButtonBox">'), f.push('<button id="splst-layout-editor-OkBtnDismissDlg" class="ms-ButtonHeightWidth" value="ok" onclick="SPLST.ListTableLayoutEditor.dismissViewsSettingsDialog(this, \'' + n + "', " + t + ')">'), f.push(SP.Res.okButtonText), f.push("<\/button>"), f.push('<button id="splst-layout-editor-CancelBtnDismissDlg" class="ms-ButtonHeightWidth" value="cancel" onclick="SPLST.ListTableLayoutEditor.dismissViewsSettingsDialog(this, \'' + n + "', " + t + ')">'), f.push(SP.Res.cancelButtonText), f.push("<\/button>"), f.push("<\/div>"));
                    v.html(f.join(""));
                    p = {
                        html: v[0],
                        title: l.title,
                        width: 780,
                        dialogReturnValueCallback: i.onViewsSettingsDialogReturnValueCallback
                    };
                    SP.UI.Notify.removeNotification(u);
                    o = new SP.UI.ModalDialog.showModalDialog(p);
                    y || (a = jQuerySplst('[data-lb-id="views-settings-container"]'), i.renderViewsSettings(a, k, e && e.pvm, s, o), jQuerySplst(".splst-lb-views-reset-link").click(function(n) {
                        SPLST.ListTableLayoutEditor.renderViewsSettings(a, null, null, s, o);
                        n.currentTarget.setAttribute("data-lb-haschanges", "true")
                    }), setTimeout(function() {
                        o.autoSize()
                    }, 100))
                }, "sp.ui.dialog.js")
            }, function() {
                SP.UI.Notify.removeNotification(u)
            })
        }, "sp.js")
    }, n.renderViewsSettings = function(n, t, i, r, u) {
        var k = SPLST.ListTableLayoutEditor,
            a = _spPageContextInfo.siteServerRelativeUrl,
            y, p, d, l, e, h, f, g, ut, ft;
        a.indexOf("/") == a.length - 1 && (a = a.slice(0, -1));
        var o = [],
            s = k.locale.messages.viewsSettingsDlg,
            nt = '<div class="splst-lb-views-table-header" {1}><div class="splst-lb-views-title-header splst-lb-views-title-col">{0}<\/div><div class="splst-lb-views-visibility-col splst-lb-views-visibility-header">' + s.default+'<\/div><div class="splst-lb-views-visibility-col splst-lb-views-visibility-header">' + s.hidden + '<\/div><div class="splst-lb-views-visibility-col splst-lb-views-visibility-header">' + s.specificUsers + "<\/div><\/div>",
            tt = '<li class="splst-lb-view-item" data-lb-view-title="{0}"><div class="splst-lb-views-drag-col">&nbsp;<img src="' + a + k.contentPath + 'resizer.png" /><\/div><div class="splst-lb-views-title-col splst-lb-views-title-content">{0}<\/div><div class="splst-lb-views-visibility-col"><input type="radio" value="default" name="view-visibility-{4}" {1}/><\/div><div class="splst-lb-views-visibility-col"><input type="radio" value="hidden" name="view-visibility-{4}" {2}/><\/div><div class="splst-lb-views-visibility-col"><input type="radio" value="specific" name="view-visibility-{4}" {3}/><\/div><div class="splst-lb-view-people-picker" style="display: {5};" id="view-visibility-pp-{4}"><\/div><\/li>',
            rt = !!t,
            it = 3,
            w = 0,
            b = [],
            v = [],
            c = [];
        for (e = 0, h = r.get_count(); e < h; e++) b.push(r.get_item(e));
        for (b.sort(function(n, t) {
                if (n.get_defaultView()) return -1;
                if (t.get_defaultView()) return 1;
                var i = n.get_title().replace(/^\-/),
                    r = t.get_title().replace(/^\-/);
                return i.localeCompare(r)
            }), e = 0, h = b.length; e < h; e++)(f = b[e], f.get_personalView() || f.get_hidden()) || (y = f.get_title(), rt ? (p = t[y], p ? p.isLink ? v.push(p) : c.push(p) : c.push({
            title: y,
            index: -1
        })) : (w < it ? v.push({
            title: y,
            index: w
        }) : c.push({
            title: y,
            index: w - it
        }), w++));
        for (d = function(n, t) {
                var i = n.index,
                    r = t.index;
                return i !== -1 && r !== -1 || i === -1 && r === -1 ? i - r : i === -1 ? 1 : -1
            }, v.sort(d), c.sort(d), l = k.PERSONAL_VIEWS_MODES, i = i || l.default, o.push('<div class="splst-lb-views-table-header" style="border: none;"><div class="splst-lb-views-title-header splst-lb-views-title-col" style="width: 130px;">&nbsp;<\/div><div class="splst-lb-views-visibility-col splst-lb-views-visibility-header">' + s.default+'<\/div><div class="splst-lb-views-visibility-col splst-lb-views-visibility-header">' + s.hidden + '<\/div><div class="splst-lb-views-visibility-col splst-lb-views-visibility-header">' + s.visible + '<\/div><div class="splst-lb-views-visibility-col splst-lb-views-visibility-header">' + s.menu + "<\/div><\/div>"), o.push('<div class="splst-lb-view-item" style="border: none; padding: 0;">'), o.push('<div style="width: 130px;" class="splst-lb-views-title-header splst-lb-views-title-col">' + s.personalViews + "<\/div>"), o.push('<div class="splst-lb-views-visibility-col"><input type="radio" value="' + l.default+'" name="views-personal" /><\/div>'), o.push('<div class="splst-lb-views-visibility-col"><input type="radio" value="' + l.hidden + '" name="views-personal" /><\/div>'), o.push('<div class="splst-lb-views-visibility-col"><input type="radio" value="' + l.visible + '" name="views-personal" /><\/div>'), o.push('<div class="splst-lb-views-visibility-col"><input type="radio" value="' + l.menu + '" name="views-personal" /><\/div>'), o.push("<\/div>"), o.push(nt.replace("{0}", s.visible).replace("{1}", 'style="margin-top: 40px;"')), o.push('<ul data-lb-id="visible-views" class="splst-lb-views-list">'), e = 0, h = v.length; e < h; e++) f = v[e], o.push(tt.replace(/\{0\}/gmi, f.title).replace("{1}", f.visibleFor ? "" : 'checked="checked"').replace("{2}", f.visibleFor && f.visibleFor.length === 0 ? 'checked="checked"' : "").replace("{3}", f.visibleFor && f.visibleFor.length ? 'checked="checked"' : "").replace(/\{4\}/gmi, "visible-" + e).replace("{5}", f.visibleFor && f.visibleFor.length ? "block" : "none"));
        for (o.push("<\/ul>"), o.push(nt.replace("{0}", s.menu).replace("{1}", 'style="margin-top: 30px;"')), o.push('<ul data-lb-id="menu-views" class="splst-lb-views-list">'), e = 0, h = c.length; e < h; e++) f = c[e], o.push(tt.replace(/\{0\}/gmi, f.title).replace("{1}", f.visibleFor ? "" : 'checked="checked"').replace("{2}", f.visibleFor && f.visibleFor.length === 0 ? 'checked="checked"' : "").replace("{3}", f.visibleFor && f.visibleFor.length ? 'checked="checked"' : "").replace(/\{4\}/gmi, "menu-" + e).replace("{5}", f.visibleFor && f.visibleFor.length ? "block" : "none"));
        o.push("<\/ul>");
        n.html(o.join(""));
        g = document.querySelector('input[type=radio][name="views-personal"][value="' + i + '"]');
        g && (g.checked = !0);
        ut = jQuerySplst('input[type=radio][name="views-personal"]').click(function() {
            document.querySelector(".splst-lb-views-reset-link").setAttribute("data-lb-haschanges", "false")
        });
        jQuerySplst('[data-lb-id="visible-views"], [data-lb-id="menu-views"]').sortable({
            connectWith: ".splst-lb-views-list",
            placeholder: "splst-lb-view-drop-placeholder",
            dropOnEmpty: !0,
            update: function() {
                document.querySelector(".splst-lb-views-reset-link").setAttribute("data-lb-haschanges", "false")
            }
        }).disableSelection();
        ft = jQuerySplst('input[type=radio][name^="view-visibility-"]').click(function(n) {
            var t = n.currentTarget,
                i = jQuerySplst(t),
                r = i.closest(".splst-lb-view-item").find(".splst-lb-view-people-picker");
            r.css({
                display: t.value === "specific" ? "block" : "none"
            });
            document.querySelector(".splst-lb-views-reset-link").setAttribute("data-lb-haschanges", "false");
            u.autoSize()
        });
        SPLST.ListTableLayoutEditor.loadScripts(["clienttemplates.js", "clientforms.js", "clientpeoplepicker.js", "autofill.js", "sp.runtime.js", "sp.core.js"]).then(function() {
            var n = {},
                e, i, c, s, h, f, l;
            for (n.PrincipalAccountType = "User,SPGroup", n.SearchPrincipalSource = 15, n.ResolvePrincipalSource = 15, n.AllowMultipleValues = !0, n.MaximumEntitySuggestions = 50, n.Width = "100%", e = document.querySelectorAll('[id^="view-visibility-pp-"]'), i = 0, c = e.length; i < c; i++) {
                var o = e[i],
                    a = o.parentNode,
                    v = a.getAttribute("data-lb-view-title"),
                    r = t && t[v];
                if (window.SPClientPeoplePicker_InitStandaloneControlWrapper(o.id, null, n), s = window.SPClientPeoplePicker.SPClientPeoplePickerDict[o.id + "_TopSpan"], r && r.visibleFor && r.visibleFor.length)
                    for (h = r.visibleFor, f = 0, l = h.length; f < l; f++) s.AddUnresolvedUser({
                        Key: h[f]
                    }, !0);
                s.OnValueChangedClientScript = function() {}
            }
            u.autoSize()
        })
    }, n.dismissViewsSettingsDialog = function(n, t, i) {
        var e = SP.UI.ModalDialog.get_childDialog(),
            o, r, s, u, h, f;
        e && (o = SP.UI.DialogResult.cancel, n.value === "ok" && (r = {
            listId: t
        }, s = document.querySelector(".splst-lb-views-reset-link").getAttribute("data-lb-haschanges") === "true", r.reset = s, s || (u = {}, h = function(n, t, i) {
            var c = jQuerySplst(t),
                e = t.getAttribute("data-lb-view-title"),
                l = c.find("input[type=radio]:checked")[0].value,
                r = undefined,
                f, h, o;
            switch (l) {
                case "hidden":
                    r = [];
                    break;
                case "specific":
                    var a = t.querySelector('[id^="view-visibility-pp-"]'),
                        v = window.SPClientPeoplePicker.SPClientPeoplePickerDict[a.id + "_TopSpan"],
                        s = v.GetAllUserInfo();
                    for (r = [], f = 0, h = s.length; f < h; f++) o = s[f], o.Resolved && r.push(o.Key)
            }
            u[e] = {
                title: e,
                isLink: i,
                index: n
            };
            r && (u[e].visibleFor = r)
        }, jQuerySplst('[data-lb-id="visible-views"] > li').each(function(n, t) {
            h(n, t, !0)
        }), jQuerySplst('[data-lb-id="menu-views"] > li').each(function(n, t) {
            h(n, t, !1)
        }), r.views = u, f = jQuerySplst('input[type=radio][name="views-personal"]:checked'), f && f.length && (r.pvm = f[0].value)), r.refreshPage = i, e.set_returnValue(r), o = SP.UI.DialogResult.OK), e.close(o))
    }, n.onViewsSettingsDialogReturnValueCallback = function(n, t) {
        if (t && t.listId) {
            var i = SPLST.ListTableLayoutEditor,
                r = i.spContext,
                c = i.spWeb,
                e = i.spWeb.get_lists().getById(t.listId),
                s = e.get_rootFolder(),
                h = s.get_properties(),
                o = e.get_views(),
                u = e.get_userCustomActions(),
                f = t.reset;
            delete t.reset;
            delete t.listId;
            r.load(o);
            r.load(u);
            h && (h.set_item(i.PROPERTY_BAG_PREFIX + i.PROPERTY_BAG_VIEWS_SETTINGS, f ? null : JSON.stringify(t)), s.update());
            r.executeQueryAsync(function() {
                for (var a, v, h, c, n, e, s = 0, l = u.get_count(); s < l; s++)
                    if (a = u.get_item(s), v = a.get_name(), v === "SPLSTLBCurrentView") {
                        e = a;
                        break
                    }
                for (f && e ? e.deleteObject() : f || e || (e = u.add(), e.set_location("CommandUI.Ribbon"), e.set_name("SPLSTLBCurrentView"), e.set_commandUIExtension('<CommandUIExtension><CommandUIDefinitions><CommandUIDefinition Location="Ribbon.List.CustomViews.CurrentView" /><CommandUIDefinition Location="Ribbon.List.CustomViews.DisplayView" /><CommandUIDefinition Location="Ribbon.List.CustomViews.Controls._children"><DropDown Id="Ribbon.List.CustomViews.DisplayView" Sequence="60" Command="SPLSTLBSelectView"><Menu Id="Ribbon.List.CustomViews.DisplayView.Menu"><MenuSection Id="Ribbon.List.CustomViews.DisplayView.Menu.MenuSection" DisplayMode="Menu16"><Controls Id="Ribbon.List.CustomViews.DisplayView.Menu.MenuSection.Controls"><\/Controls><\/MenuSection><\/Menu><\/DropDown><\/CommandUIDefinition><\/CommandUIDefinitions><CommandUIHandlers><CommandUIHandler Command="SPLSTLBSelectView" CommandAction="javascript:(function() { } )()" EnabledScript="javascript:(function() { return false; } )()" /><\/CommandUIHandlers><\/CommandUIExtension>'), e.update(), r.load(u)), h = "~sitecollection" + i.scriptsPath + "splst_lb_view_renderer.js", s = 0, l = o.get_count(); s < l; s++) c = o.get_item(s), n = c.get_jsLink(), f ? n = n === h ? "clienttemplates.js" : n.replace("|" + h, "") : n && n !== "clienttemplates.js" ? n.indexOf(h) === -1 && (n += "|" + h) : n = h, c.set_jsLink(n), c.update();
                r.executeQueryAsync();
                t.refreshPage && (SP.UI.Notify.addNotification("<span>" + i.locale.messages.workingOnIt + "<\/span>"), setTimeout(function() {
                    window.location.reload()
                }, 1e3))
            })
        }
    }, r = SPLST.ListTableLayoutEditor.getRegisteredInplviewSodName(), SPLST.ListTableLayoutEditor.SODLoadMultiple(["sp.js", r], function() {
        window.splst_layout_editor_ie < 9 || SPLST.ListTableLayoutEditor.initPluginsForTables()
    }), SP.SOD.executeFunc("spgantt.js", "SP.GanttControl", function() {}), SP.SOD.executeOrDelayUntilScriptLoaded(function() {
        if (!(window.splst_layout_editor_ie < 9)) {
            var n = SP.GanttControl;
            SP.GanttControl = function() {
                if (n.call(this), !this.get_GridControl) {
                    var t = this.Init;
                    this.Init = function(n) {
                        var i, r;
                        t.apply(this, arguments);
                        this._associatedGridControl = n;
                        i = jQuerySplst(n.parentNode).closest("table");
                        i && i.data("init_splst_layout_editor_plugin") && (i.data("init_splst_layout_editor_plugin", ""), window.SPLST && window.SPLST.ListTableLayoutEditor && window.SPLST.ListTableLayoutEditor._initEditTableLayoutEditor(i));
                        r = n.AddColumn;
                        n.AddColumn = function(n, t) {
                            jQuerySplst(this).trigger("gridcontrol:columnadding");
                            r(n, t)
                        }
                    };
                    this.get_GridControl = function() {
                        return this._associatedGridControl
                    }
                }
            };
            for (prop in n) n.hasOwnProperty(prop) && (SP.GanttControl[prop] = n[prop])
        }
    }, "spgantt.js"), SP.SOD.executeFunc("sp.ui.tilmeline.js", "AddItemsToTimeline", function() {}), SP.SOD.executeOrDelayUntilScriptLoaded(function() {
        var e, o, s, n, r, h, c, l, i, u, t, f;
        if (SP.UI.Timeline.CalloutElement)
            if (SP.UI.Timeline.CalloutElement.prototype.onEndDrag) e = SP.UI.Timeline.CalloutElement.prototype.onEndDrag, SP.UI.Timeline.CalloutElement.prototype.onEndDrag = function(n, t) {
                e.call(this, n, t);
                setTimeout(function() {
                    SPLST.ListTableLayoutEditor.refreshPageBoosters()
                }, 45)
            }, o = SP.UI.Timeline.CalloutElement.prototype.showAll, SP.UI.Timeline.CalloutElement.prototype.showAll = function() {
                o.call(this);
                setTimeout(function() {
                    SPLST.ListTableLayoutEditor.refreshPageBoosters()
                }, 45)
            }, s = SP.UI.Timeline.CalloutElement.prototype.hideAll, SP.UI.Timeline.CalloutElement.prototype.hideAll = function() {
                s.call(this);
                setTimeout(function() {
                    SPLST.ListTableLayoutEditor.refreshPageBoosters()
                }, 45)
            };
            else {
                n = SP.UI.Timeline.CalloutElement;
                r = function() {
                    var t, i, r, u;
                    n.call(this);
                    t = this;
                    i = this.onEndDrag;
                    this.onEndDrag = function(n, r) {
                        i.call(t, n, r);
                        setTimeout(function() {
                            SPLST.ListTableLayoutEditor.refreshPageBoosters()
                        }, 45)
                    };
                    r = this.showAll;
                    this.showAll = function() {
                        r.call(this);
                        setTimeout(function() {
                            SPLST.ListTableLayoutEditor.refreshPageBoosters()
                        }, 45)
                    };
                    u = this.hideAll;
                    this.hideAll = function() {
                        u.call(this);
                        setTimeout(function() {
                            SPLST.ListTableLayoutEditor.refreshPageBoosters()
                        }, 45)
                    }
                };
                for (t in n) n.hasOwnProperty(t) && (r[t] = n[t]);
                for (f in n.prototype) r.prototype[f] = n.prototype[f];
                r.prototype.constructor = r;
                r.super = n.prototype;
                SP.UI.Timeline.CalloutElement = r
            }
        if (SP.UI.Timeline.MilestoneElement)
            if (SP.UI.Timeline.MilestoneElement.prototype.onEndDrag) h = SP.UI.Timeline.MilestoneElement.prototype.onEndDrag, SP.UI.Timeline.MilestoneElement.prototype.onEndDrag = function(n, t) {
                h.call(this, n, t);
                setTimeout(function() {
                    SPLST.ListTableLayoutEditor.refreshPageBoosters()
                }, 45)
            }, c = SP.UI.Timeline.MilestoneElement.prototype.showAll, SP.UI.Timeline.MilestoneElement.prototype.showAll = function() {
                c.call(this);
                setTimeout(function() {
                    SPLST.ListTableLayoutEditor.refreshPageBoosters()
                }, 45)
            }, l = SP.UI.Timeline.MilestoneElement.prototype.hideAll, SP.UI.Timeline.MilestoneElement.prototype.hideAll = function() {
                l.call(this);
                setTimeout(function() {
                    SPLST.ListTableLayoutEditor.refreshPageBoosters()
                }, 45)
            };
            else {
                i = SP.UI.Timeline.MilestoneElement;
                u = function() {
                    var n, t, r, u;
                    i.call(this);
                    n = this;
                    t = this.onEndDrag;
                    this.onEndDrag = function(i, r) {
                        t.call(n, i, r);
                        n.isCustomDrag = !0;
                        setTimeout(function() {
                            SPLST.ListTableLayoutEditor.refreshPageBoosters()
                        }, 45)
                    };
                    r = this.showAll;
                    this.showAll = function() {
                        r.call(this);
                        setTimeout(function() {
                            SPLST.ListTableLayoutEditor.refreshPageBoosters()
                        }, 45)
                    };
                    u = this.hideAll;
                    this.hideAll = function() {
                        u.call(this);
                        setTimeout(function() {
                            SPLST.ListTableLayoutEditor.refreshPageBoosters()
                        }, 45)
                    }
                };
                for (t in i) i.hasOwnProperty(t) && (u[t] = i[t]);
                for (f in i.prototype) u.prototype[f] = i.prototype[f];
                u.prototype.constructor = u;
                u.super = i.prototype;
                SP.UI.Timeline.MilestoneElement = u
            }
    }, "sp.ui.timeline.js"), jQuerySplst(document).ready(SPLST.ListTableLayoutEditor.initLayoutEditors), n = null)
}
if ($_global_splstlayouteditor(), window.SP && window.SP.SOD) {
    var inplviewSodName = SPLST.ListTableLayoutEditor.getRegisteredInplviewSodName();
    SP.SOD.executeFunc(inplviewSodName, "InitGridFromView", function() {});
    SP.SOD.executeOrDelayUntilScriptLoaded(function() {
        var t, i, r, u;
        if (!(window.splst_layout_editor_ie < 9)) {
            if (window.CLVPFromEventReal) {
                var n = window.CLVPFromEventReal.toString(),
                    f = /function\s*CLVPFromEventReal\s*\((\w+)\)/gmi.exec(n)[1],
                    e = n.replace(/([\w,\]]+\.className)(\s*==\s*"ms-listviewtable")/gmi, '$1.indexOf("ms-listviewtable") !== -1').replace(/function\s*CLVPFromEventReal\s*\(\w+\)\s*\{(.*)\}$/gmi, "$1");
                window.CLVPFromEventReal = new Function(f, e)
            }
            window.InitGridFromView && (t = window.InitGridFromView, window.InitGridFromView = function(n, i) {
                t(n, i)
            });
            window.ReRenderListView && (i = window.ReRenderListView, window.ReRenderListView = function(n, t, r) {
                var u = jQuerySplst(n.clvp.tab),
                    f = u.data("layout-editor-plugin");
                f && f.dispose();
                n.isReRender = !0;
                i.call(this, n, t, r);
                delete n.isReRender;
                u = jQuerySplst(n.clvp.tab);
                n.inGridMode ? n.IsClientRendering ? (n.OnPostRender || (n.OnPostRender = []), n.OnPostRender.push(function() {
                    SPLST.ListTableLayoutEditor._initEditTableLayoutEditor(u)
                })) : SPLST.ListTableLayoutEditor._initEditTableLayoutEditor(u) : SPLST.ListTableLayoutEditor.initLayoutEditor(u[0], !0)
            });
            window.RefreshPageTo && (r = window.RefreshPageTo, window.RefreshPageTo = function(n, t, i) {
                var o, e, u, f, c, s, a, l, h;
                try {
                    if (o = CLVPFromEvent(n), e = SPLST.ListTableLayoutEditor, o && o.ctx && o.ctx.view) u = o.ctx.view.toLowerCase();
                    else
                        for (f = t, f.startsWith("http://") || f.startsWith("https://") ? f = f.slice(f.indexOf("?") + 1) : f.startsWith("?") && (f = f.slice(1)), c = f.split("&"), s = 0, a = c.length; s < a; s++)
                            if (l = c[s].toLowerCase(), l.startsWith("view=")) {
                                u = l.slice(6);
                                break
                            }
                    u && !u.startsWith("{") && (u = "{" + u + "}");
                    u && e._boosters && e._boosters[u] && (e.viewItems || (e.viewItems = {}), h = e._boosters[u], e.viewItems[u] = {
                        viewItems: h.viewItems,
                        loadedFields: h.loadedFields,
                        splittedCaml: h.splittedCaml
                    })
                } catch (v) {}
                r.call(this, n, t, i)
            });
            window.FixupTable && (u = window.FixupTable, window.FixupTable = function(n, t, i, r) {
                var f = Boolean(t) && Boolean(t.getAttribute("data-splst-hfreezed"));
                u.call(this, n, t, i, r);
                f && (t.style.display = "block")
            })
        }
    }, "inplview.js");
    SP.SOD.executeFunc("clienttemplates.js", "RenderListView", function() {});
    SP.SOD.executeOrDelayUntilScriptLoaded(function() {
        var n, i, t;
        window.splst_layout_editor_ie < 9 || (window.RenderListView && (n = window.RenderListView, window.RenderListView = function(t) {
            var i, r, u, f;
            if (t.isReRender) {
                n.apply(this, arguments);
                return
            }(!t.clvp || t.bInitialRender ? (n.apply(this, arguments), i = jQuerySplst("td#script" + t.wpq + ' table[summary="' + t.ListTitle + '"]'), i.length && window.SPLST && window.SPLST.ListTableLayoutEditor && SPLST.ListTableLayoutEditor.hideTable(i)) : (r = jQuerySplst(t.clvp.tab).attr("id"), i = jQuerySplst('table[id="' + r + '"]'), u = i.data("layout-editor-plugin"), u && u.dispose(), n.apply(this, arguments), i = jQuerySplst('table[id="' + r + '"]')), i.length && window.SPLST && window.SPLST.ListTableLayoutEditor) && (f = SPLST.ListTableLayoutEditor.getRegisteredInplviewSodName(), SPLST.ListTableLayoutEditor.SODLoadMultiple(["sp.js", f], function() {
                t.inGridMode ? SPLST.ListTableLayoutEditor._initEditTableLayoutEditor(i) : SPLST.ListTableLayoutEditor.initLayoutEditor(i[0], !0)
            }, "sp.js"))
        }), window.OnExpandCollapseButtonClick && (i = window.OnExpandCollapseButtonClick, window.OnExpandCollapseButtonClick = function(n) {
            var t, r;
            (i(n), window.SPLST && window.SPLST.ListTableLayoutEditor && window.jQuerySplst) && (t = jQuerySplst(n.target).closest("table.splst_layout_editor_table"), t && t.length) && (r = t.data("layout-editor-plugin"), r) && (r._updateWidthsAfterGroupExpand(), r._refreshResizersControl())
        }), window.OpenCallout && !window.splstlbopencallout && (window.splstlbopencallout = !0, t = window.OpenCallout, window.OpenCallout = function(n, i, r, u) {
            function h() {
                setTimeout(function() {
                    function i() {
                        var t = n.parentNode.querySelector('[id$="_callout"]'),
                            c, u, o, a, i, s, l, r, h;
                        if (t && (c = f.closest(".splst_layout_editor_table"), u = c.offsetParent()[0], SPLST.ListTableLayoutEditor.isIE() && (document.head.removeChild(e), o = f.position(), a = f.offset(), t.style.left = parseFloat(t.style.left) + o.left + "px", t.style.top = parseFloat(t.style.top) + o.top - f[0].scrollTop + u.scrollTop + "px"), window.m$ && (i = m$(t).data()), t.parentNode.removeChild(t), u.appendChild(t), i)) {
                            s = m$(t);
                            l = s.data();
                            for (r in i) i.hasOwnProperty(r) && (l[r] || s.data(r, i[r]))
                        }
                        h = function(n) {
                            if (n.currentTarget.scrollLeft) f.one({
                                scroll: h
                            });
                            else CalloutManager.closeAll()
                        };
                        setTimeout(function() {
                            f.one({
                                scroll: h
                            })
                        }, 100)
                    }
                    var t = CalloutManager.getFromLaunchPointIfExists(n);
                    t && (t.isOpen() ? i() : t.addEventCallback("opened", i))
                }, 45)
            }
            var a = jQuerySplst(n.parentNode),
                f = a.closest('[data-splst-hfreezed="true"]'),
                o, e, s, c, l;
            return f.length ? (o = findIIDInAncestorNode(r), o === null) ? s : (e = null, SPLST.ListTableLayoutEditor.isIE() && (e = document.createElement("style"), e.textContent = '[iid="' + o + '"] .js-callout-mainElement { visibility: collapse; }', document.head.appendChild(e)), s = t(n, i, r, u), c = GetCtxRgiidFromIid(o), l = c.ctx, l.ListSchema.IsDocLib ? EnsureScriptFunc("filePreview.js", "filePreviewManager", h) : h(), s) : t(n, i, r, u)
        }))
    }, "clienttemplates.js");
    SP.SOD.executeFunc("init.js", "_spPageLoaded", function() {});
    SP.SOD.executeOrDelayUntilScriptLoaded(function() {
        var n, t, i;
        window._spPageLoaded && (n = window._spPageLoaded, window._spPageLoaded = function() {
            var i, r, u, t, f, e;
            n();
            window.SPLST && window.SPLST.ListTableLayoutEditor ? window.splst_layout_editor_ie < 9 || (i = SPLST.ListTableLayoutEditor.getRegisteredInplviewSodName(), SP.SOD.executeFunc(i, "CLVPFromCtx", function() {}), SP.SOD.executeOrDelayUntilScriptLoaded(function() {
                window.SPLST.ListTableLayoutEditor.initPluginsForTables()
            }, "inplview.js")) : ($_global_splstlayouteditor(), SPLSTColorScale(jQuerySplst || jQuery));
            _spPageContextInfo.serverRequestPath.toLowerCase().indexOf("listedit.aspx") !== -1 ? (r = _spPageContextInfo.pageListId, u = jQuerySplst("[id*=SharepointalistListBoosterSettings]"), u.length || (t = jQuerySplst("span[id*=_GeneralLinks]>table"), f = '<td valign="top" nowrap="nowrap" class="ms-descriptiontext ms-linksectionitembullet" width="8px" style="padding-top:5px;"><img src="/' + _spPageContextInfo.layoutsUrl + '/images/setrect.gif" width="5px" height="5px" alt="">&nbsp;<\/td><td valign="top" class="ms-descriptiontext ms-linksectionitemdescription"><a id="SharepointalistListBoosterSettings" href="javascript:SPLST.ListTableLayoutEditor.ShowEnablePluginDialog(\'' + r + "');\">List Booster Styling Settings<\/a><\/td>", t.length && (e = t[0].insertRow(), e.innerHTML = f))) : (_spPageContextInfo.serverRequestPath.toLowerCase().indexOf("viewedit.aspx") !== -1 || _spPageContextInfo.serverRequestPath.toLowerCase().indexOf("viewnew.aspx") !== -1) && SPLST.ListTableLayoutEditor.addHoverStyleForViewColumnsTable()
        });
        window.ExpCollGroup && (t = window.ExpCollGroup, window.ExpCollGroup = function(n, i, r, u) {
            t(n, i, r, u);
            jQuerySplst(document).trigger("splstlayouteditor.collgroupexpand", {
                groupName: n
            })
        });
        window.NotifyScriptLoadedAndExecuteWaitingJobs && (i = NotifyScriptLoadedAndExecuteWaitingJobs, NotifyScriptLoadedAndExecuteWaitingJobs = function(n) {
            var r = n;
            try {
                i(n)
            } catch (t) {
                if (typeof g_MinimalDownload != "undefined" && Boolean(g_MinimalDownload) && typeof RegisterModuleInit != "undefined" && n.indexOf("_catalogs/masterpage/splst/layouteditor/scripts/") === -1) throw t;
            }
        })
    }, "init.js");
    SP.SOD.executeFunc("core.js", "FixRibbonAndPageLayout", function() {});
    SP.SOD.executeOrDelayUntilScriptLoaded(function() {
        var f, a, v, n, u, t, i, e, s, h, c, l;
        if (!(window.splst_layout_editor_ie < 9)) {
            if (f = SPLST.ListTableLayoutEditor, window.FixRibbonAndPageLayout && (a = window.FixRibbonAndPageLayout, window.FixRibbonAndPageLayout = function(n) {
                    a(n);
                    jQuerySplst(document).trigger("splstlayouteditor.ribbontabselected")
                }), window.SPUpdatePage && (v = window.SPUpdatePage, window.SPUpdatePage = function(n) {
                    var u = v(n),
                        t, f, i, e, r;
                    if ("undefined" == typeof g_MinimalDownload || !g_MinimalDownload || IsAccessibilityFeatureEnabled()) return u;
                    if (t = jQuerySplst(".ms-listviewtable"), t && (f = t.length))
                        for (i = 0; i < f; i++) e = jQuerySplst(t[i]), r = e.data("layout-editor-plugin"), r && r.dispose();
                    return window.jQuerySplst && jQuerySplst.contextMenu("destroy"), u
                }), window.EnsureSelectionHandlerDeferred && (n = f.getFuncArgsNames(window.EnsureSelectionHandlerDeferred), u = n && n.length > 1 && n[1], u && (t = window.EnsureSelectionHandlerDeferred.toString(), t = t.slice(t.indexOf(")") + 1).replace(new RegExp(u + ".rows", "gmi"), u + ".rows.valueOf()"), window.EnsureSelectionHandlerDeferred = new Function(n.join(", "), t))), window.ToggleAllItems2 && (i = f.getFuncArgsNames(window.ToggleAllItems2), e = i && i.length && i[0], e)) {
                var r = window.ToggleAllItems2.toString(),
                    y = new RegExp("var\\s+([a-zA-Z_0-9]+)\\s*=\\s*" + e + "\\s*;", "gmi"),
                    o = y.exec(r);
                o && o.length > 1 && (s = o[1], r = r.slice(r.indexOf(")") + 1).replace(new RegExp(s + ".rows", "gmi"), s + ".rows.valueOf()"), window.ToggleAllItems2 = new Function(i.join(", "), r))
            }
            window.CreateMenuEx && (h = window.CreateMenuEx, window.CreateMenuEx = function(n, t, i, r) {
                var e, l, o, s, v, y;
                if (SPLST.ListTableLayoutEditor.getCurrentSPVersion().startsWith("16")) return h(n, t, i, r);
                if (e = window.itemTable, l = h(n, t, i, r), e) {
                    if (o = jQuerySplst(e.parentNode), s = o.closest('[data-splst-hfreezed="true"]'), !s.length) return l;
                    var u = e.parentNode.querySelector(".ms-core-menu-box"),
                        a = s.closest(".splst_layout_editor_table"),
                        c = o.offsetParent(),
                        f = o.position();
                    SPLST.ListTableLayoutEditor.isIE() && (v = c.position(), c = c.offsetParent(), f.left += v.left, f.top += v.top);
                    c[0] == a[0] && (y = a.position(), f.left += y.left, f.top += y.top);
                    u.parentNode.removeChild(u);
                    u.style.left = parseFloat(u.style.left) + f.left + "px";
                    u.style.top = parseFloat(u.style.top) + f.top + "px";
                    a.offsetParent()[0].appendChild(u);
                    setTimeout(function() {
                        s.one({
                            scroll: function() {
                                if (g_menuHtc_lastMenu != null) {
                                    var n = g_menuHtc_lastMenu;
                                    n != null && HideMenu(n)
                                }
                            }
                        })
                    }, 45)
                }
                return l
            });
            window.ElementInViewportVertical && (c = window.ElementInViewportVertical, window.ElementInViewportVertical = function(n, t) {
                var i = jQuerySplst(n).closest('[data-splst-hfreezed="true"]');
                return !i.length || jQuerySplst.contains(i[0], t) ? c(n, t) : c(n, i[0])
            });
            window.OpenCallout && !window.splstlbopencallout && (window.splstlbopencallout = !0, l = window.OpenCallout, window.OpenCallout = function(n, t, i, r) {
                function s() {
                    setTimeout(function() {
                        function i() {
                            var t = n.parentNode.querySelector('[id$="_callout"]'),
                                o, i, r, s, e;
                            t && (o = u.closest(".splst_layout_editor_table"), i = o.offsetParent()[0], SPLST.ListTableLayoutEditor.isIE() && (document.head.removeChild(f), r = u.position(), s = u.offset(), t.style.left = parseFloat(t.style.left) + r.left + "px", t.style.top = parseFloat(t.style.top) + r.top - u[0].scrollTop + i.scrollTop + "px"), t.parentNode.removeChild(t), i.appendChild(t));
                            e = function(n) {
                                if (n.currentTarget.scrollLeft) u.one({
                                    scroll: e
                                });
                                else CalloutManager.closeAll()
                            };
                            setTimeout(function() {
                                u.one({
                                    scroll: e
                                })
                            }, 100)
                        }
                        var t = CalloutManager.getFromLaunchPointIfExists(n);
                        t && (t.isOpen() ? i() : t.addEventCallback("opened", i))
                    }, 45)
                }
                var a = jQuerySplst(n.parentNode),
                    u = a.closest('[data-splst-hfreezed="true"]'),
                    e, f, o, h, c;
                return u.length ? (e = findIIDInAncestorNode(i), e === null) ? o : (f = null, SPLST.ListTableLayoutEditor.isIE() && (f = document.createElement("style"), f.textContent = '[iid="' + e + '"] .js-callout-mainElement { visibility: collapse; }', document.head.appendChild(f)), o = l(n, t, i, r), h = GetCtxRgiidFromIid(e), c = h.ctx, c.ListSchema.IsDocLib ? EnsureScriptFunc("filePreview.js", "filePreviewManager", s) : s(), o) : l(n, t, i, r)
            })
        }
    }, "core.js");

    function SPLSTLBExtendListItemCollection() {
        SP.SOD.executeFunc("sp.js", "SP.ListItemCollection", function() {});
        SP.SOD.executeOrDelayUntilScriptLoaded(function() {
            SP.ListItemCollection.prototype.boosterDispose || (SP.ListItemCollection.prototype.boosterDispose = function(n) {
                n = n !== !1;
                delete this._itemsById;
                delete this._sortedItems;
                delete this._itemIndexes;
                n && delete this._listTemplate;
                delete this._docsUserSorting;
                delete this._addedItems;
                delete this._pageItemsIndexes
            }, SP.ListItemCollection.prototype._getItemById = function(n) {
                var u, t, i, r;
                if (this._itemsById || (this._itemsById = {}), this._itemsById[n]) return this._itemsById[n];
                for (u = this.get_count(), t = 0; t < u; t++)
                    if (i = this.get_item(t), r = i.get_item("ID"), this._itemsById[r] = i, r === n) return i
            }, SP.ListItemCollection.prototype._processHoldedItems = function(n, t, i, r) {
                var u, o, f, h, s, e;
                if (!t || !t[n]) return 0;
                for (u = t[n], o = i.indexOf(n), r[n] || (r[n] = 0), f = 0, h = u.length; f < h; f++) s = u[f], e = s.get_item("ID"), i.splice(o + r[n] + 1, 0, e), this._sortedItems.splice(o + r[n] + 1, 0, s), r[n]++, t[e] && (r[n] += this._processHoldedItems(e, t, i, r));
                return delete u[n], r[n]
            }, SP.ListItemCollection.prototype.get_itemSortedTasks = function(n) {
                var v = this.get_count(),
                    s, c, o, l, y, a;
                if (!this._sortedItems || this._sortedItems.length !== v) {
                    var i = {},
                        u = {},
                        h = this._sortedItems = [],
                        f = this._itemIndexes = [];
                    for (s = 0; s < v; s++) {
                        var e = this.get_item(s),
                            r = e.get_item("ID"),
                            t = e.get_item("ParentID");
                        if (t && (t = t.get_lookupId()), t)
                            if (c = f.indexOf(t), c === -1) u[t] || (u[t] = []), u[t].push(e);
                            else {
                                o = i[t];
                                o || o === 0 || (i[t] = 0, o = 0);
                                l = c + o + 1;
                                f.splice(l, 0, r);
                                h.splice(l, 0, e);
                                y = this._processHoldedItems(r, u, f, i) + 1;
                                do i[t] += y, a = h[f.indexOf(t)], a ? (t = a.get_item("ParentID"), t && (t = t.get_lookupId())) : t = undefined; while (t)
                            }
                        else f.push(r), h.push(e), u[r] && (i[r] || (i[r] = 0), i[r] += this._processHoldedItems(r, u, f, i))
                    }
                }
                return this._sortedItems[n]
            }, SP.ListItemCollection.prototype.get_itemSortedDocs = function(n) {
                var r, u, f, t, i, e;
                if (this._docsUserSorting !== "Desc") return this.get_item(n);
                if (r = this.get_count(), !this._sortedItems || this._sortedItems.length !== r) {
                    for (u = [], f = [], t = 0; t < r; t++)
                        if (i = this.get_item(t), e = i.get_item("ContentTypeId").get_stringValue(), e.startsWith("0x0120")) u.push(i);
                        else if (e.startsWith("0x0101")) f.push(i);
                    else throw new Error("Unknown content type in document library");
                    this._sortedItems = f.concat(u)
                }
                return this._sortedItems[n]
            }, SP.ListItemCollection.prototype.get_itemSorted = function(n, t) {
                t = t || this._listTemplate;
                var i = this.get_count();
                if (n >= i) return this._addedItems ? this._addedItems[n - i].item : null;
                switch (t) {
                    case 171:
                        return this.get_itemSortedTasks(n, t);
                    case 101:
                    case 116:
                        return this.get_itemSortedDocs(n, t);
                    default:
                        return this.get_item(n)
                }
            }, SP.ListItemCollection.prototype.getCount = function() {
                var n = this.get_count();
                return this._addedItems && (n += this._addedItems.length), n
            }, SP.ListItemCollection.prototype.addNewItem = function(n, t) {
                t = parseInt(t);
                this._addedItems || (this._addedItems = []);
                this._addedItems.push({
                    item: n,
                    afterId: t
                })
            }, SP.ListItemCollection.prototype.deleteItem = function(n) {
                var t, i, r, u;
                if (n = parseInt(n), this._deletedItems || (this._deletedItems = []), t = -1, this._addedItems) {
                    for (i = 0, r = this._addedItems.length; i < r; i++)
                        if (u = this._addedItems[i].item, n == u.get_item("ID")) {
                            t = i;
                            break
                        }
                    t != -1 && this._addedItems.splice(t, 1)
                }
                t == -1 && this._deletedItems.push(n)
            }, SP.ListItemCollection.prototype.setHasFiltersOrSorting = function(n) {
                this._hasFiltersOrSorting = n
            }, SP.ListItemCollection.prototype.setListTemplate = function(n) {
                this._listTemplate = n
            }, SP.ListItemCollection.prototype.setDocsUserSorting = function(n) {
                this._docsUserSorting = n
            }, SP.ListItemCollection.prototype.getPageItemsIndexes = function(n, t) {
                for (var r = [], i = this.get_itemSorted(t), f = i && i.get_fieldValues().ParentID, v = this.get_count(), l = this.getCount(), c = this._addedItems ? this._addedItems.length : 0, a = t + n + c > l ? l : t + n + c, h, u, e, o, s; i && f;) this._deletedItems && this._deletedItems.indexOf(f.get_lookupId()) !== -1 || (s = this._itemIndexes.indexOf(f.get_lookupId()), r.splice(0, 0, s), i = this._sortedItems[s], f = i && i.get_fieldValues().ParentID);
                for (h = a - c, u = t; u < a; u++)
                    if (u < h) {
                        if (i = this.get_itemSorted(u), this._deletedItems && this._deletedItems.indexOf(i.get_item("ID")) !== -1) continue;
                        r.push(u)
                    } else i = this._addedItems[u - h], afterId = i.afterId, e = v + u - h, afterId && this._itemIndexes ? (o = this._itemIndexes.indexOf(afterId), o !== -1 && r.indexOf(o) !== -1 ? this._hasFiltersOrSorting ? (f = i.item && i.item.get_fieldValues().ParentID, s = f && this._itemIndexes.indexOf(f.get_lookupId()), o === s ? r.splice(r.indexOf(o) + 1, 0, e) : r.push(e)) : r.splice(r.indexOf(o) + 1, 0, e) : r.push(e)) : r.push(e);
                return r
            }, SP.ListItemCollection.prototype.getPageItemsIndexesByIDs = function(n) {
                var t, i, r;
                if (!n) return [];
                n = Array.isArray(n) ? n : [n];
                var u = new Array(n.length),
                    o = this.get_count(),
                    e = this.getCount(),
                    f = 0;
                for (t = 0; t < e; t++)
                    if (i = this.get_itemSorted(t), i && (r = n.indexOf(i.get_item("ID")), r !== -1 && (u[r] = t, f++, f === n.length))) break;
                return u
            })
        }, "sp.js")
    }
    SPLSTLBExtendListItemCollection();
    window.asyncDeltaManager && window.asyncDeltaManager.add_endRequest(SPLSTLBExtendListItemCollection)
}
jQuerySplst.ui.tabs.prototype._isLocal = function() {
    return !0
};
jQuerySplst.widget("ui.spinner", jQuerySplst.ui.spinner, {
    _uiSpinnerHtml: function() {
        return "<div class='ui-spinner ui-widget ui-widget-content splst-lb-spinner'><\/div>"
    }
});
jQuerySplst.widget("evol.colorpicker", jQuerySplst.evol.colorpicker, {
    options: {
        renderPaletteToBody: !1,
        defaultColor: null
    },
    _paletteHTML1: function() {
        var n = this._super(),
            t = this.options;
        return t.defaultColor && (n = n.slice(0, n.length - 8) + ('<tr><th colspan="10" class="ui-widget-content"><div class="evo-tr-box evo-color evo-default" style="background-color:' + t.defaultColor + ';"><\/div>' + SPLST.ListTableLayoutEditor.locale.messages.colorpickerDefaultColor + "<\/th><\/tr><\/table>")), n
    },
    _bindColors: function() {
        this._super();
        var n = this;
        this._palette.on("click", ".evo-default", function() {
            if (n._enabled) {
                var t = jQuerySplst(this);
                n._setValue(t.attr("style").substring(17))
            }
        })
    },
    showPalette: function() {
        var i;
        if (this._enabled && (jQuerySplst(".colorPicker").not("." + this._id).colorpicker("hidePalette"), this._palette === null)) {
            if (this.options.renderPaletteToBody) {
                var n = window.navigator,
                    r = n.userAgent,
                    t = !1;
                n.appName === "Microsoft Internet Explorer" ? t = r.indexOf("MSIE ") > 0 : n.appName === "Netscape" && (t = r.indexOf("Trident/") > 0);
                this._cover = jQuerySplst('<div class="splst-booster-cover' + (t ? " ie" : "") + '"><\/div>');
                jQuerySplst("body").append(this._cover);
                var u = this.element.next(),
                    e = this._cover,
                    f = u.offset();
                this._palette = jQuerySplst(this._paletteHTML());
                e.append(this._palette);
                this._palette.css("left", f.left).css("top", f.top + u.outerHeight()).addClass("splst-colorpicker-palette").on("click", function(n) {
                    n.stopPropagation()
                })
            } else this._palette = this.element.next().after(this._paletteHTML()).next().on("click", function(n) {
                n.stopPropagation()
            });
            this._bindColors();
            i = this;
            jQuerySplst(document.body).on("click." + this._id, function(n) {
                n.target != i.element.get(0) && i.hidePalette()
            })
        }
        return this
    },
    hidePalette: function() {
        if (this._isPopup && this._palette) {
            jQuerySplst(document.body).off("click." + this._id);
            var n = this,
                t = n._palette;
            this._palette.off("mouseover click", "td,.evo-transparent").fadeOut(function() {
                t && t.remove();
                n._palette = n._cTxt = null;
                n._cover && (n._cover.remove(), n._cover = null)
            }).find(".evo-more a").off("click")
        }
        return this
    }
});
jQuerySplst.contextMenu.types.spinner = function(n, t, i) {
    function f(n) {
        var t = jQuerySplst("<span><\/span>");
        return n._accesskey ? (n._beforeAccesskey && t.append(document.createTextNode(n._beforeAccesskey)), jQuerySplst("<span><\/span>").addClass("context-menu-accesskey").text(n._accesskey).appendTo(t), n._afterAccesskey && t.append(document.createTextNode(n._afterAccesskey))) : t.text(n.name), t
    }
    var r = jQuerySplst("<label><\/label>").appendTo(this),
        u;
    f(n).appendTo(r);
    this.addClass("context-menu-spinner");
    u = jQuerySplst('<input type="text" value="' + (n.value || 300) + '" name="" value="">').attr("name", "context-menu-input-" + n.key).val(n.value || "").appendTo(r);
    n.postfix && jQuerySplst('<span class="context-menu-preffix">' + n.postfix + "<\/span>").appendTo(r);
    n.icon && (n._icon = jQuerySplst.isFunction(n.icon) ? n.icon.call(this, this, this, key, n) : i.classNames.icon + " " + i.classNames.icon + "-" + n.icon, this.addClass(n._icon));
    u.spinner({
        icons: {
            up: "splst-lb-icon-up",
            down: "splst-lb-icon-down"
        }
    });
    this.find(".splst-lb-spinner").on({
        "mouseup.contextMenu": function(n) {
            n.preventDefault();
            n.stopImmediatePropagation()
        }
    });
    this.on({
        "mouseup.contextMenu": function() {
            n.value = n.$node.find("input").val()
        }
    })
};
jQuerySplst.fn.extend({
    removeClassCompletely: function(n) {
        var s = /[\t\r\n\f]/g,
            e, t, i, r, o, u, f = 0,
            h = this.length,
            c = arguments.length === 0 || typeof n == "string" && n;
        if (c)
            for (e = (n || "").match(/\S+/g) || []; f < h; f++)
                if (t = this[f], i = t.nodeType === 1 && (t.className ? (" " + t.className + " ").replace(s, " ") : ""), i) {
                    for (o = 0; r = e[o++];)
                        while (i.indexOf(" " + r + " ") >= 0) i = i.replace(" " + r + " ", " ");
                    u = n ? jQuerySplst.trim(i) : "";
                    t.className !== u && (t.className = u);
                    t.className || t.removeAttribute("class")
                }
        return this
    }
})