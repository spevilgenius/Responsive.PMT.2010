function splst_lb_view_renderer_register_module_init() {
    if (window._spPageContextInfo) {
        var n = _spPageContextInfo.siteServerRelativeUrl;
        n.endsWith("/") && (n = n.slice(0, -1));
        RegisterModuleInit(n + "/_catalogs/masterpage/splst/layouteditor/scripts/splst_lb_view_renderer.js", $_global_splst_lb_view_renderer)
    }
}

function $_global_splst_lb_view_renderer() {
    window.SPLST || (window.SPLST = {});
    SPLST.ViewRenderer || (SPLST.ViewRenderer = {
        customHeaderHtml: function (n, t) {
            var i = "",
                r;
            return n.lbHasPermissions !== !1 && (r = ClientPivotControl.prototype.SurfacedPivotCount, (n.surfacedPivotCount || n.surfacedPivotCount === 0) && (ClientPivotControl.prototype.SurfacedPivotCount = n.surfacedPivotCount), i = RenderHeaderTemplate(n, t), ClientPivotControl.prototype.SurfacedPivotCount = r), i
        },
        customFooterHtml: function (n) {
            return n.lbHasPermissions !== !1 ? RenderFooterTemplate(n) : ""
        },
        customBodyHtml: function (n) {
            var t = SPLST.ListTableLayoutEditor && SPLST.ListTableLayoutEditor.locale && SPLST.ListTableLayoutEditor.locale.messages && SPLST.ListTableLayoutEditor.locale.messages.viewPermissionsError || "You do not have permissions to access current view. Please, contact list administrator to request permissions.";
            return n.lbHasPermissions !== !1 ? RenderBodyTemplate(n) : "<div>" + t + "<\/div>"
        },
        onPreRender: function (n) {
            var r, c, i, o, s, y, h, t;
            if (window.jQuerySplst && n.listName) {
                r = _spPageContextInfo.webServerRelativeUrl;
                r.endsWith("/") && (r = r.slice(0, -1));
                jQuerySplst.ajax({
                    async: !1,
                    url: r + "/_api/web/currentuser/?$expand=groups",
                    method: "GET",
                    contentType: "application/json;odata=verbose",
                    headers: {
                        Accept: "application/json;odata=verbose"
                    },
                    success: function (n) {
                        c = n.d
                    }
                });
                var p = "splst_x005f_layout_x005f_editor_x005f_views_x005f_settings",
                    f, l, e = [],
                    a = [];
                if (jQuerySplst.ajax({
                    async: !1,
                    url: r + "/_api/web/Lists/GetById('" + n.listName + "')/RootFolder/Properties",
                    type: "GET",
                    headers: {
                    accept: "application/json;odata=verbose",
                            "content-type": "application/json;odata=verbose"
                },
                    success: function (n) {
                            var t = n.d;
                            l = JSON.parse(t && t[p] || "{}")
                }
                }), jQuerySplst.ajax({
                    async: !1,
                    url: r + "/_api/web/Lists/GetById('" + n.listName + "')/Views",
                    type: "GET",
                    headers: {
                    accept: "application/json;odata=verbose",
                            "content-type": "application/json;odata=verbose"
                },
                    success: function (n) {
                            for (var t, r = n.d.results, i = 0, u = r.length; i < u; i++) t = r[i], t.PersonalView && e.push(t.Title), a.push(t.Title)
                }
                }), i = l.views || {}, o = l.pvm || "default", !SPLST.ViewRenderer.isVisibleForUser(c, i, n.viewTitle)) {
                    n.lbHasPermissions = !1;
                    return
                }
                if (n.ListSchema.ViewSelectorPivotMenuOptions) {
                    var v = JSON.parse(n.ListSchema.ViewSelectorPivotMenuOptions),
                        u = [],
                        f = 0;
                    for (s = 0, y = v.length; s < y; s++)
                        if (t = v[s], e.indexOf(t.DisplayText) !== -1) switch (o) {
                            case "default":
                                u.push(t);
                                break;
                            case "visible":
                                u.push(t);
                                f++;
                                break;
                            case "menu":
                                u.push(t)
                        } else SPLST.ViewRenderer.isVisibleForUser(c, i, t.DisplayText) && (u.push(t), i[t.DisplayText] && i[t.DisplayText].isLink && f++);
                    if (u.sort(function (n, t) {
                            var f = e.indexOf(n.DisplayText) !== -1,
                                s = e.indexOf(t.DisplayText) !== -1,
                                r, u;
                            return f || s ? f ? s ? n.DisplayText <= t.DisplayText ? -1 : 1 : (u = i[t.DisplayText], SPLST.ViewRenderer.comparePersonalWithPublic(n, t, u, o, a) ? -1 : 1) : (r = i[n.DisplayText], SPLST.ViewRenderer.comparePersonalWithPublic(t, n, r, o, a) ? 1 : -1) : (r = i[n.DisplayText], u = i[t.DisplayText], r ? u ? r.isLink && u.isLink || !r.isLink && !u.isLink ? parseInt(r.index) - parseInt(u.index) : r.isLink ? -1 : 1 : -1 : u ? 1 : 0)
                    }), o === "default")
                        for (h = 0; h < f;) t = u[h], e.indexOf(t.DisplayText) !== -1 && f++, h++;
                    n.ListSchema.ViewSelectorPivotMenuOptions = JSON.stringify(u);
                    n.surfacedPivotCount = f
                }
            }
        },
        comparePersonalWithPublic: function (n, t, i, r, u) {
            if (!t.DisplayText || u.indexOf(t.DisplayText) == -1) return !0;
            switch (r) {
                case "default":
                    return n.DisplayText < t.DisplayText;
                case "visible":
                    return i.isLink ? !1 : !0;
                case "menu":
                    return i.isLink ? !1 : !1
            }
        },
        isVisibleForUser: function (n, t, i) {
            var r, f, u, e, o;
            if (!t || !t[i] || !t[i].visibleFor) return !0;
            if (r = t[i].visibleFor, !r.length) return !1;
            if (r.indexOf(n.LoginName) !== -1) return !0;
            for (f = n.Groups.results, u = 0, e = f.length; u < e; u++)
                if (o = f[u], r.indexOf(o.LoginName) !== -1) return !0;
            return !1
        }
    });
    var n = {};
    n.Templates = {};
    n.Templates.Header = SPLST.ViewRenderer.customHeaderHtml;
    n.Templates.Footer = SPLST.ViewRenderer.customFooterHtml;
    n.Templates.Body = SPLST.ViewRenderer.customBodyHtml;
    n.Templates.OnPreRender = SPLST.ViewRenderer.onPreRender;
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(n)
}
splst_lb_view_renderer_register_module_init();
$_global_splst_lb_view_renderer()