(function () {
    function e() {
        var t = SPLST.ListTableLayoutEditor,
            i = t.locale.messages,
            k = !!t.CFDisabled,
            c = t.PROPERTY_BAG_PREFIX.replace(/_/gmi, "_x005f_"),
            d = t.PROPERTY_BAG_PLUGIN_VISIBILITY.replace(/_/gmi, "_x005f_"),
            g = t.PROPERTY_BAG_PLUGIN_MENU_VISIBILITY.replace(/_/gmi, "_x005f_"),
            nt = t.PROPERTY_BAG_LIST_QUERY_ENABLED.replace(/_/gmi, "_x005f_"),
            tt = t.PROPERTY_BAG_EXPORT_ENABLED.replace(/_/gmi, "_x005f_"),
            o = document.getElementById("s4-workspace"),
            l = jQuerySplst("tr[id*=ListExperienceSection]"),
            a = jQuerySplst("input[id*=BtnCancel]"),
            p = a.closest("table").closest("tr"),
            s = jQuerySplst(".propertysheet"),
            it = jQuerySplst(".propertysheet > tbody > tr"),
            u, v, h, y, w, f, b, e;
        if (it.hide(), o && (o.style.width = document.documentElement.clientWidth + "px", o.style.height ? o.style.cssText = o.style.cssText.replace(/height:\s*\d+px\s*(?:!important)?;/gmi, "height: " + document.documentElement.clientHeight + "px !important;") : o.style.cssText += "height: " + document.documentElement.clientHeight + "px !important;"), u = document.createElement("div"), v = document.querySelector("#DeltaPlaceHolderMain"), v.appendChild(u), u.outerHTML = t.getLoadingHtml("lb-loading"), u = v.querySelector("#lb-loading"), u.style.display = "none", y = 5e3, n && (s.hide(), u.style.display = "block", f = _spPageContextInfo.webServerRelativeUrl, f.endsWith("/") && (f = f.slice(0, -1)), jQuerySplst.ajax({
            async: !1,
            url: f + "/_api/contextinfo",
            type: "POST",
            headers: {
            accept: "application/json;odata=verbose"
        },
            success: function (n) {
                    window.SPLSTLBFormDigest = n.d.GetContextWebInformation.FormDigestValue
        }
        }), jQuerySplst.ajax({
            async: !1,
            url: f + "/_api/site",
            type: "GET",
            headers: {
            accept: "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
        },
            success: function (n) {
                    y = parseInt(n.d.MaxItemsPerThrottledOperation)
        }
        }), jQuerySplst.ajax({
            async: !1,
            url: f + "/_api/web/Lists/GetById('" + n + "')",
            type: "GET",
            headers: {
            accept: "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
        },
            success: function (n) {
                    w = parseInt(n.d.ItemCount)
        }
        }), jQuerySplst.ajax({
            async: !1,
            url: f + "/_api/web/Lists/GetById('" + n + "')/RootFolder/Properties",
            type: "GET",
            headers: {
            accept: "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
        },
            success: function (i) {
                    var e = i.d;
                    properties = {};
                    var r = e[c + d],
                        o = e[c + g],
                        u = e[c + nt],
                        s = e[c + tt];
                    !t.isExportEnabled || r && o && u && s || jQuerySplst.ajax({
            async: !1,
            url: f + "/_api/web/Lists/GetById('" + n + "')/Views",
            type: "GET",
            headers: {
            accept: "application/json;odata=verbose",
                            "content-type": "application/json;odata=verbose"
        },
            success: function (n) {
                            var f = n.d.results,
                                e, h, a, c, l, i;
                            if (f && f.length)
                                for (h = 0, a = f.length; h < a; h++)
                                    if (c = f[h], c.Title === t.HIDDEN_VIEW_TITLE) {
                                        e = c;
                                        break
        }
                            e && (l = t.getListStylesFromSchemaXml(e.HtmlSchemaXml, e.Id), i = l && l.settings, i && (r || (r = i[t.PROPERTY_BAG_PLUGIN_VISIBILITY]), o || (o = i[t.PROPERTY_BAG_PLUGIN_MENU_VISIBILITY]), u || (u = i[t.PROPERTY_BAG_LIST_QUERY_ENABLED]), s || (s = i[t.PROPERTY_BAG_EXPORT_ENABLED])))
        }
        });
                    r = r ? r === "true" : t.isEnabled;
                    properties.lbEnabled = r;
                    properties.menuVisible = o !== "false";
                    properties.queryEnabled = w <= y ? u !== "false" : u === "true";
                    properties.exportEnabled = s !== "false"
        }
        }), t.isExportEnabled ? ExecuteOrDelayUntilScriptLoaded(function () {
                var t = SP.ClientContext.get_current(),
                    i = t.get_web(),
                    r = i.get_lists().getById(n);
                h = r.get_views();
                t.load(h);
                t.executeQueryAsync(function () {
                    s.show();
                    u.style.display = "none"
        }, function () {
                    s.show();
                    u.style.display = "none"
        })
        }, "sp.js") : (s.show(), u.style.display = "none")), a.removeAttr("onclick"), a.click(function () {
                parent.SPLSTLBCloseDlg(!1)
        }), properties) {
            var rt = i.lbSettings,
                ut = i[l.length ? "lbSettingsDescriptionListExperience" : "lbSettingsDescription"],
                ft = jQuerySplst('<tr id="SPLSTLBSettingsSection"><td class="ms-formdescriptioncolumn-wide" style="vertical-align: top;"><table border="0" cellpadding="1" cellspacing="0" width="100%" summary="" role="presentation"><tbody><tr><td class="ms-sectionheader" style="padding-top: 4px;" height="22" valign="top"><h3 class="ms-standardheader ms-inputformheader">' + rt + '<\/h3><\/td><\/tr><tr><td class="ms-descriptiontext ms-inputformdescription">' + ut + '<\/td><td><img src="/_layouts/15/images/blank.gif?rev=44" width="8" height="1" alt="" data-accessibility-nocheck="true"><\/td><\/tr><tr><td><img src="/_layouts/15/images/blank.gif?rev=44" width="150" height="19" alt="" data-accessibility-nocheck="true"><\/td><\/tr><\/tbody><\/table><\/td><td class="ms-authoringcontrols ms-inputformcontrols" valign="top" align="left"><table border="0" width="100%" cellspacing="0" cellpadding="0" summary="" role="presentation"><tbody><tr><td width="9px"><img src="/_layouts/15/images/blank.gif?rev=44" width="9" height="7" alt="" data-accessibility-nocheck="true"><\/td><td><img src="/_layouts/15/images/blank.gif?rev=44" width="150" height="7" alt="" data-accessibility-nocheck="true"><\/td><td width="10px"><img src="/_layouts/15/images/blank.gif?rev=44" width="10" height="1" alt="" data-accessibility-nocheck="true"><\/td><\/tr><tr><td><\/td><td class="ms-authoringcontrols"><fieldset style="border-width:0px;padding-bottom:6px"><div style="padding-left:11px"><div class="splst-layout-editor-dlg-row"><label title="' + i.pluginVisibilityTooltipText + '"><input type="checkbox" id="splst-layout-editor-enablePlugin-cbx" ' + (properties.lbEnabled ? "checked " : "") + " />" + i.pluginVisibilityText + '<\/label><\/div><div class="splst-layout-editor-dlg-row"><label title="' + i.pluginMenuVisibilityTooltipText + '"><input type="checkbox" id="splst-layout-editor-showPluginMenu-cbx" ' + (properties.menuVisible ? "checked " : "") + " />" + i.pluginMenuVisibilityText + '<\/label><\/div><div class="splst-layout-editor-dlg-row"><label title=\'' + (k ? i.listQueryEnabledTooltipText : i.listQueryEnabledTooltipTextStatic) + '\'><input type="checkbox" id="splst-layout-editor-queryEnabled-cbx" ' + (properties.queryEnabled ? "checked " : "") + " />" + i.listQueryEnabledText + "<\/label><\/div>" + (t.isExportEnabled ? '<div class="splst-layout-editor-dlg-row"><label title="' + i.exportEnanbledTooltipText + '"><input type="checkbox" id="splst-layout-editor-exportEnabled-cbx" ' + (properties.exportEnabled ? "checked " : "") + " />" + i.exportEnanbledText + "<\/label><\/div>" : "") + '<\/div><\/fieldset><\/td><td width="10px"><img src="/_layouts/15/images/blank.gif?rev=44" width="10" height="1" alt="" data-accessibility-nocheck="true"><\/td><\/tr><tr><td><\/td><td><img src="/_layouts/15/images/blank.gif?rev=44" width="150" height="13" alt="" data-accessibility-nocheck="true"><\/td><td><\/td><\/tr><\/tbody><\/table><\/td><\/tr>');
            p.prev().prev().before(ft)
        }
        l.length ? (l.css("display", "table-row"), b = l.find(".ms-descriptiontext"), b.html(i.lbListExperienceDescription)) : s.css({
            height: document.documentElement.clientHeight + "px",
            width: "100%",
            "table-layout": "fixed",
            position: "absolute"
        });
        p.css({
            display: "table-row",
            "vertical-align": "bottom"
        });
        e = window.WebForm_DoPostBackWithOptions;
        window.WebForm_DoPostBackWithOptions = function () {
            var r, f;
            s.hide();
            u.style.display = "block";
            var c = SP.ClientContext.get_current(),
                w = c.get_web(),
                l = w.get_lists().getById(n),
                a = l.get_rootFolder(),
                o = a.get_properties(),
                v = document.querySelector("#splst-layout-editor-enablePlugin-cbx").checked.toString(),
                y = document.querySelector("#splst-layout-editor-showPluginMenu-cbx").checked.toString(),
                p = document.querySelector("#splst-layout-editor-queryEnabled-cbx").checked.toString(),
                r;
            return o.set_item(t.PROPERTY_BAG_PREFIX + t.PROPERTY_BAG_PLUGIN_VISIBILITY, v), o.set_item(t.PROPERTY_BAG_PREFIX + t.PROPERTY_BAG_PLUGIN_MENU_VISIBILITY, y), o.set_item(t.PROPERTY_BAG_PREFIX + t.PROPERTY_BAG_LIST_QUERY_ENABLED, p), t.isExportEnabled && (r = document.querySelector("#splst-layout-editor-exportEnabled-cbx").checked, o.set_item(t.PROPERTY_BAG_PREFIX + t.PROPERTY_BAG_EXPORT_ENABLED, r.toString()), r || o.set_item(t.PROPERTY_BAG_PREFIX + t.PROPERTY_BAG_VIEWS_MAPPING, null)), a.update(), f = arguments, c.executeQueryAsync(function () {
                t.isExportEnabled ? h && (r ? t._savePluginSettingsToHiddenView(h, {
                    value: v,
                    menuValue: y,
                    queryEnabledValue: p,
                    exportEnabledValue: r
                }).then(function () {
                    if (r !== properties.exportEnabled) return t.saveAllViewsStyles(l, h)
                }).then(function () {
                    parent.SPLSTLBCloseDlg(!0, i.workingOnIt);
                    e.apply(this, f)
                }, function () {
                    parent.SPLSTLBCloseDlg(!0, i.workingOnIt);
                    e.apply(this, f)
                }) : r !== properties.exportEnabled && (t.clearAllViewsStyles(h, !1), c.executeQueryAsync(function () {
                    parent.SPLSTLBCloseDlg(!0, i.workingOnIt);
                    e.apply(this, f)
                }, function () {
                    parent.SPLSTLBCloseDlg(!0, i.workingOnIt);
                    e.apply(this, f)
                }))) : (parent.SPLSTLBCloseDlg(!0, i.workingOnIt), e.apply(this, f))
            }, function () {
                parent.SPLSTLBCloseDlg(!0, i.workingOnIt);
                e.apply(this, arguments)
            }), undefined
        };
        document.head.removeChild(r)
    }

    function o() {
        var t = document.createElement("style"),
            n;
        return t.innerText = t.textContent = "#suiteBar, #suiteBarDelta, #s4-ribbonrow, #s4-titlerow, #sideNavBox, #pageTitle { display: none !important; height: 0px !important; } #contentBox { margin: 0px !important; min-width: 0px !important; } #s4-bodyContainer { padding-bottom: 0px !important; } #contentRow { padding-top: 0px !important; }", document.head.appendChild(t), n = document.createElement("style"), n.innerText = n.textContent = ".propertysheet { visibility: hidden !important; }", document.head.appendChild(n), n
    }
    var r, t, f, i;
    if (window.location.pathname.endsWith("advsetng.aspx") && window.location.search.indexOf("SPLSTLBListExperience") !== -1 && (r = o(), window.jQuerySplst)) {
        if (SPLST.ListTableLayoutEditor.locale) jQuerySplst("body").ready(e);
        else jQuerySplst(document).one("splstlayouteditor.resouresloaded", function () {
            jQuerySplst("body").ready(e)
        });
        var n = "",
            u = window.location.search.slice(1).split("&");
        for (t = 0, f = u.length; t < f; t++)
            if (i = u[t].split("="), i[0] === "List") {
                n = i[1].replace("%7B", "{").replace("%7D", "}");
                break
            }
    }
})()