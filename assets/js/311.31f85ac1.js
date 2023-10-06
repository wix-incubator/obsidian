"use strict";
exports.id = 311;
exports.ids = [311];
exports.modules = {

/***/ 5311:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Za),
/* harmony export */   "defaultUrlTransform": () => (/* binding */ Xa)
/* harmony export */ });
/* harmony import */ var _index_51a8fd79_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(923);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2834);



function xr(n, e) {
  const t = e || {};
  return (n[n.length - 1] === "" ? [...n, ""] : n).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
const kr = /[ \t\n\f\r]/g;
function br(n) {
  return typeof n == "object" ? n.type === "text" ? Re(n.value) : !1 : Re(n);
}
function Re(n) {
  return n.replace(kr, "") === "";
}
class Mn {
  /**
   * @constructor
   * @param {Properties} property
   * @param {Normal} normal
   * @param {string} [space]
   */
  constructor(e, t, r) {
    this.property = e, this.normal = t, r && (this.space = r);
  }
}
Mn.prototype.property = {};
Mn.prototype.normal = {};
Mn.prototype.space = null;
function At(n, e) {
  const t = {}, r = {};
  let i = -1;
  for (; ++i < n.length; )
    Object.assign(t, n[i].property), Object.assign(r, n[i].normal);
  return new Mn(t, r, e);
}
function se(n) {
  return n.toLowerCase();
}
class tn {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   */
  constructor(e, t) {
    this.property = e, this.attribute = t;
  }
}
tn.prototype.space = null;
tn.prototype.boolean = !1;
tn.prototype.booleanish = !1;
tn.prototype.overloadedBoolean = !1;
tn.prototype.number = !1;
tn.prototype.commaSeparated = !1;
tn.prototype.spaceSeparated = !1;
tn.prototype.commaOrSpaceSeparated = !1;
tn.prototype.mustUseProperty = !1;
tn.prototype.defined = !1;
let wr = 0;
const L = Sn(), $ = Sn(), Pt = Sn(), w = Sn(), _ = Sn(), Pn = Sn(), J = Sn();
function Sn() {
  return 2 ** ++wr;
}
const ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: L,
  booleanish: $,
  commaOrSpaceSeparated: J,
  commaSeparated: Pn,
  number: w,
  overloadedBoolean: Pt,
  spaceSeparated: _
}, Symbol.toStringTag, { value: "Module" })), Zn = Object.keys(ce);
class xe extends tn {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   * @param {number|null} [mask]
   * @param {string} [space]
   */
  constructor(e, t, r, i) {
    let l = -1;
    if (super(e, t), Me(this, "space", i), typeof r == "number")
      for (; ++l < Zn.length; ) {
        const o = Zn[l];
        Me(this, Zn[l], (r & ce[o]) === ce[o]);
      }
  }
}
xe.prototype.defined = !0;
function Me(n, e, t) {
  t && (n[e] = t);
}
const Sr = {}.hasOwnProperty;
function zn(n) {
  const e = {}, t = {};
  let r;
  for (r in n.properties)
    if (Sr.call(n.properties, r)) {
      const i = n.properties[r], l = new xe(
        r,
        n.transform(n.attributes || {}, r),
        i,
        n.space
      );
      n.mustUseProperty && n.mustUseProperty.includes(r) && (l.mustUseProperty = !0), e[r] = l, t[se(r)] = r, t[se(l.attribute)] = r;
    }
  return new Mn(e, t, n.space);
}
const Tt = zn({
  space: "xlink",
  transform(n, e) {
    return "xlink:" + e.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
}), zt = zn({
  space: "xml",
  transform(n, e) {
    return "xml:" + e.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});
function Lt(n, e) {
  return e in n ? n[e] : e;
}
function Ot(n, e) {
  return Lt(n, e.toLowerCase());
}
const Dt = zn({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: Ot,
  properties: { xmlns: null, xmlnsXLink: null }
}), Ft = zn({
  transform(n, e) {
    return e === "role" ? e : "aria-" + e.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: $,
    ariaAutoComplete: null,
    ariaBusy: $,
    ariaChecked: $,
    ariaColCount: w,
    ariaColIndex: w,
    ariaColSpan: w,
    ariaControls: _,
    ariaCurrent: null,
    ariaDescribedBy: _,
    ariaDetails: null,
    ariaDisabled: $,
    ariaDropEffect: _,
    ariaErrorMessage: null,
    ariaExpanded: $,
    ariaFlowTo: _,
    ariaGrabbed: $,
    ariaHasPopup: null,
    ariaHidden: $,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: _,
    ariaLevel: w,
    ariaLive: null,
    ariaModal: $,
    ariaMultiLine: $,
    ariaMultiSelectable: $,
    ariaOrientation: null,
    ariaOwns: _,
    ariaPlaceholder: null,
    ariaPosInSet: w,
    ariaPressed: $,
    ariaReadOnly: $,
    ariaRelevant: null,
    ariaRequired: $,
    ariaRoleDescription: _,
    ariaRowCount: w,
    ariaRowIndex: w,
    ariaRowSpan: w,
    ariaSelected: $,
    ariaSetSize: w,
    ariaSort: null,
    ariaValueMax: w,
    ariaValueMin: w,
    ariaValueNow: w,
    ariaValueText: null,
    role: null
  }
}), Cr = zn({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: Ot,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: Pn,
    acceptCharset: _,
    accessKey: _,
    action: null,
    allow: null,
    allowFullScreen: L,
    allowPaymentRequest: L,
    allowUserMedia: L,
    alt: null,
    as: null,
    async: L,
    autoCapitalize: null,
    autoComplete: _,
    autoFocus: L,
    autoPlay: L,
    blocking: _,
    capture: L,
    charSet: null,
    checked: L,
    cite: null,
    className: _,
    cols: w,
    colSpan: null,
    content: null,
    contentEditable: $,
    controls: L,
    controlsList: _,
    coords: w | Pn,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: L,
    defer: L,
    dir: null,
    dirName: null,
    disabled: L,
    download: Pt,
    draggable: $,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: L,
    formTarget: null,
    headers: _,
    height: w,
    hidden: L,
    high: w,
    href: null,
    hrefLang: null,
    htmlFor: _,
    httpEquiv: _,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: L,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: L,
    itemId: null,
    itemProp: _,
    itemRef: _,
    itemScope: L,
    itemType: _,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: L,
    low: w,
    manifest: null,
    max: null,
    maxLength: w,
    media: null,
    method: null,
    min: null,
    minLength: w,
    multiple: L,
    muted: L,
    name: null,
    nonce: null,
    noModule: L,
    noValidate: L,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: L,
    optimum: w,
    pattern: null,
    ping: _,
    placeholder: null,
    playsInline: L,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: L,
    referrerPolicy: null,
    rel: _,
    required: L,
    reversed: L,
    rows: w,
    rowSpan: w,
    sandbox: _,
    scope: null,
    scoped: L,
    seamless: L,
    selected: L,
    shape: null,
    size: w,
    sizes: null,
    slot: null,
    span: w,
    spellCheck: $,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: w,
    step: null,
    style: null,
    tabIndex: w,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: L,
    useMap: null,
    value: $,
    width: w,
    wrap: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: _,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: w,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: w,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: L,
    // Lists. Use CSS to reduce space between items instead
    declare: L,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: w,
    // `<img>` and `<object>`
    leftMargin: w,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: w,
    // `<body>`
    marginWidth: w,
    // `<body>`
    noResize: L,
    // `<frame>`
    noHref: L,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: L,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: L,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: w,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: $,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: w,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: w,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: L,
    disableRemotePlayback: L,
    prefix: null,
    property: null,
    results: w,
    security: null,
    unselectable: null
  }
}), Er = zn({
  space: "svg",
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  transform: Lt,
  properties: {
    about: J,
    accentHeight: w,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: w,
    amplitude: w,
    arabicForm: null,
    ascent: w,
    attributeName: null,
    attributeType: null,
    azimuth: w,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: w,
    by: null,
    calcMode: null,
    capHeight: w,
    className: _,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: w,
    diffuseConstant: w,
    direction: null,
    display: null,
    dur: null,
    divisor: w,
    dominantBaseline: null,
    download: L,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: w,
    enableBackground: null,
    end: null,
    event: null,
    exponent: w,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: w,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: Pn,
    g2: Pn,
    glyphName: Pn,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: w,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: w,
    horizOriginX: w,
    horizOriginY: w,
    id: null,
    ideographic: w,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: w,
    k: w,
    k1: w,
    k2: w,
    k3: w,
    k4: w,
    kernelMatrix: J,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: w,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: w,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: w,
    overlineThickness: w,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: w,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: _,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: w,
    pointsAtY: w,
    pointsAtZ: w,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: J,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: J,
    rev: J,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: J,
    requiredFeatures: J,
    requiredFonts: J,
    requiredFormats: J,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: w,
    specularExponent: w,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: w,
    strikethroughThickness: w,
    string: null,
    stroke: null,
    strokeDashArray: J,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: w,
    strokeOpacity: w,
    strokeWidth: null,
    style: null,
    surfaceScale: w,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: J,
    tabIndex: w,
    tableValues: null,
    target: null,
    targetX: w,
    targetY: w,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: J,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: w,
    underlineThickness: w,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: w,
    values: null,
    vAlphabetic: w,
    vMathematical: w,
    vectorEffect: null,
    vHanging: w,
    vIdeographic: w,
    version: null,
    vertAdvY: w,
    vertOriginX: w,
    vertOriginY: w,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: w,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
}), Ir = /^data[-\w.:]+$/i, Be = /-[a-z]/g, Ar = /[A-Z]/g;
function Pr(n, e) {
  const t = se(e);
  let r = e, i = tn;
  if (t in n.normal)
    return n.property[n.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && Ir.test(e)) {
    if (e.charAt(4) === "-") {
      const l = e.slice(5).replace(Be, zr);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = e.slice(4);
      if (!Be.test(l)) {
        let o = l.replace(Ar, Tr);
        o.charAt(0) !== "-" && (o = "-" + o), e = "data" + o;
      }
    }
    i = xe;
  }
  return new i(r, e);
}
function Tr(n) {
  return "-" + n.toLowerCase();
}
function zr(n) {
  return n.charAt(1).toUpperCase();
}
const Lr = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, Or = At([zt, Tt, Dt, Ft, Cr], "html"), Nt = At([zt, Tt, Dt, Ft, Er], "svg");
function Dr(n) {
  return n.join(" ").trim();
}
var ke = { exports: {} }, ve = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Fr = /\n/g, Nr = /^\s*/, Rr = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Mr = /^:\s*/, Br = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, vr = /^[;\s]*/, _r = /^\s+|\s+$/g, jr = `
`, _e = "/", je = "*", wn = "", Hr = "comment", Ur = "declaration", qr = function(n, e) {
  if (typeof n != "string")
    throw new TypeError("First argument must be a string");
  if (!n)
    return [];
  e = e || {};
  var t = 1, r = 1;
  function i(y) {
    var k = y.match(Fr);
    k && (t += k.length);
    var I = y.lastIndexOf(jr);
    r = ~I ? y.length - I : r + y.length;
  }
  function l() {
    var y = { line: t, column: r };
    return function(k) {
      return k.position = new o(y), s(), k;
    };
  }
  function o(y) {
    this.start = y, this.end = { line: t, column: r }, this.source = e.source;
  }
  o.prototype.content = n;
  function a(y) {
    var k = new Error(
      e.source + ":" + t + ":" + r + ": " + y
    );
    if (k.reason = y, k.filename = e.source, k.line = t, k.column = r, k.source = n, !e.silent)
      throw k;
  }
  function u(y) {
    var k = y.exec(n);
    if (k) {
      var I = k[0];
      return i(I), n = n.slice(I.length), k;
    }
  }
  function s() {
    u(Nr);
  }
  function c(y) {
    var k;
    for (y = y || []; k = f(); )
      k !== !1 && y.push(k);
    return y;
  }
  function f() {
    var y = l();
    if (!(_e != n.charAt(0) || je != n.charAt(1))) {
      for (var k = 2; wn != n.charAt(k) && (je != n.charAt(k) || _e != n.charAt(k + 1)); )
        ++k;
      if (k += 2, wn === n.charAt(k - 1))
        return a("End of comment missing");
      var I = n.slice(2, k - 2);
      return r += 2, i(I), n = n.slice(k), r += 2, y({
        type: Hr,
        comment: I
      });
    }
  }
  function d() {
    var y = l(), k = u(Rr);
    if (k) {
      if (f(), !u(Mr))
        return a("property missing ':'");
      var I = u(Br), b = y({
        type: Ur,
        property: He(k[0].replace(ve, wn)),
        value: I ? He(I[0].replace(ve, wn)) : wn
      });
      return u(vr), b;
    }
  }
  function p() {
    var y = [];
    c(y);
    for (var k; k = d(); )
      k !== !1 && (y.push(k), c(y));
    return y;
  }
  return s(), p();
};
function He(n) {
  return n ? n.replace(_r, wn) : wn;
}
var Vr = qr;
function Rt(n, e) {
  var t = null;
  if (!n || typeof n != "string")
    return t;
  for (var r, i = Vr(n), l = typeof e == "function", o, a, u = 0, s = i.length; u < s; u++)
    r = i[u], o = r.property, a = r.value, l ? e(o, a, r) : a && (t || (t = {}), t[o] = a);
  return t;
}
ke.exports = Rt;
ke.exports.default = Rt;
var $r = ke.exports;
const Wr = /* @__PURE__ */ (0,_index_51a8fd79_js__WEBPACK_IMPORTED_MODULE_0__.g)($r), Mt = Bt("end"), be = Bt("start");
function Bt(n) {
  return e;
  function e(t) {
    const r = t && t.position && t.position[n] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function Qr(n) {
  const e = be(n), t = Mt(n);
  if (e && t)
    return { start: e, end: t };
}
function Nn(n) {
  return !n || typeof n != "object" ? "" : "position" in n || "type" in n ? Ue(n.position) : "start" in n || "end" in n ? Ue(n) : "line" in n || "column" in n ? pe(n) : "";
}
function pe(n) {
  return qe(n && n.line) + ":" + qe(n && n.column);
}
function Ue(n) {
  return pe(n && n.start) + "-" + pe(n && n.end);
}
function qe(n) {
  return n && typeof n == "number" ? n : 1;
}
class K extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(e, t, r) {
    super(), typeof t == "string" && (r = t, t = void 0);
    let i = "", l = {}, o = !1;
    if (t && ("line" in t && "column" in t ? l = { place: t } : "start" in t && "end" in t ? l = { place: t } : "type" in t ? l = {
      ancestors: [t],
      place: t.position
    } : l = { ...t }), typeof e == "string" ? i = e : !l.cause && e && (o = !0, i = e.message, l.cause = e), !l.ruleId && !l.source && typeof r == "string") {
      const u = r.indexOf(":");
      u === -1 ? l.ruleId = r : (l.source = r.slice(0, u), l.ruleId = r.slice(u + 1));
    }
    if (!l.place && l.ancestors && l.ancestors) {
      const u = l.ancestors[l.ancestors.length - 1];
      u && (l.place = u.position);
    }
    const a = l.place && "start" in l.place ? l.place.start : l.place;
    this.ancestors = l.ancestors || void 0, this.cause = l.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file, this.message = i, this.line = a ? a.line : void 0, this.name = Nn(l.place) || "1:1", this.place = l.place || void 0, this.reason = this.message, this.ruleId = l.ruleId || void 0, this.source = l.source || void 0, this.stack = o && l.cause && typeof l.cause.stack == "string" ? l.cause.stack : "", this.actual, this.expected, this.note, this.url;
  }
}
K.prototype.file = "";
K.prototype.name = "";
K.prototype.reason = "";
K.prototype.message = "";
K.prototype.stack = "";
K.prototype.column = void 0;
K.prototype.line = void 0;
K.prototype.ancestors = void 0;
K.prototype.cause = void 0;
K.prototype.fatal = void 0;
K.prototype.place = void 0;
K.prototype.ruleId = void 0;
K.prototype.source = void 0;
const we = {}.hasOwnProperty, Xr = /* @__PURE__ */ new Map(), Kr = /[A-Z]/g, Yr = /-([a-z])/g, Gr = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Zr = /* @__PURE__ */ new Set(["td", "th"]);
function Jr(n, e) {
  if (!e || e.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const t = e.filePath || void 0;
  let r;
  if (e.development) {
    if (typeof e.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = ei(t, e.jsxDEV);
  } else {
    if (typeof e.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof e.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = ni(t, e.jsx, e.jsxs);
  }
  const i = {
    Fragment: e.Fragment,
    ancestors: [],
    components: e.components || {},
    create: r,
    elementAttributeNameCase: e.elementAttributeNameCase || "react",
    filePath: t,
    ignoreInvalidStyle: e.ignoreInvalidStyle || !1,
    passKeys: e.passKeys !== !1,
    passNode: e.passNode || !1,
    schema: e.space === "svg" ? Nt : Or,
    stylePropertyNameCase: e.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: e.tableCellAlignToStyle !== !1
  }, l = vt(i, n, void 0);
  return l && typeof l != "string" ? l : i.create(
    n,
    i.Fragment,
    { children: l || void 0 },
    void 0
  );
}
function vt(n, e, t) {
  if (e.type === "element" || e.type === "root") {
    const r = n.schema;
    let i = r;
    e.type === "element" && e.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Nt, n.schema = i), n.ancestors.push(e);
    let l = ti(n, e);
    const o = ri(n, n.ancestors);
    let a = n.Fragment;
    if (n.ancestors.pop(), e.type === "element")
      if (l && Gr.has(e.tagName) && (l = l.filter(function(u) {
        return typeof u == "string" ? !br(u) : !0;
      })), we.call(n.components, e.tagName)) {
        const u = (
          /** @type {keyof JSX.IntrinsicElements} */
          e.tagName
        );
        a = n.components[u], typeof a != "string" && a !== n.Fragment && n.passNode && (o.node = e);
      } else
        a = e.tagName;
    if (l.length > 0) {
      const u = l.length > 1 ? l : l[0];
      u && (o.children = u);
    }
    return n.schema = r, n.create(e, a, o, t);
  }
  if (e.type === "text")
    return e.value;
}
function ni(n, e, t) {
  return r;
  function r(i, l, o, a) {
    const s = Array.isArray(o.children) ? t : e;
    return a ? s(l, o, a) : s(l, o);
  }
}
function ei(n, e) {
  return t;
  function t(r, i, l, o) {
    const a = Array.isArray(l.children), u = be(r);
    return e(
      i,
      l,
      o,
      a,
      {
        columnNumber: u ? u.column - 1 : void 0,
        fileName: n,
        lineNumber: u ? u.line : void 0
      },
      void 0
    );
  }
}
function ti(n, e) {
  const t = [];
  let r = -1;
  const i = n.passKeys ? /* @__PURE__ */ new Map() : Xr;
  for (; ++r < e.children.length; ) {
    const l = e.children[r];
    let o;
    if (n.passKeys && l.type === "element") {
      const u = i.get(l.tagName) || 0;
      o = l.tagName + "-" + u, i.set(l.tagName, u + 1);
    }
    const a = vt(n, l, o);
    a !== void 0 && t.push(a);
  }
  return t;
}
function ri(n, e) {
  const t = e[e.length - 1], r = {};
  let i;
  if ("properties" in t && t.properties) {
    let l;
    for (i in t.properties)
      if (i !== "children" && we.call(t.properties, i)) {
        const o = ii(
          n,
          e,
          i,
          t.properties[i]
        );
        if (o) {
          const [a, u] = o;
          n.tableCellAlignToStyle && a === "align" && typeof u == "string" && Zr.has(t.tagName) ? l = u : r[a] = u;
        }
      }
    if (l) {
      const o = (
        /** @type {Style} */
        r.style || (r.style = {})
      );
      o[n.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = l;
    }
  }
  return r;
}
function ii(n, e, t, r) {
  const i = Pr(n.schema, t);
  if (!(r == null || typeof r == "number" && Number.isNaN(r))) {
    if (Array.isArray(r) && (r = i.commaSeparated ? xr(r) : Dr(r)), i.property === "style") {
      let l = typeof r == "object" ? r : li(n, e, String(r));
      return n.stylePropertyNameCase === "css" && (l = oi(l)), ["style", l];
    }
    return [
      n.elementAttributeNameCase === "react" && i.space ? Lr[i.property] || i.property : i.attribute,
      r
    ];
  }
}
function li(n, e, t) {
  const r = {};
  try {
    Wr(t, i);
  } catch (l) {
    if (!n.ignoreInvalidStyle) {
      const o = (
        /** @type {Error} */
        l
      ), a = new K("Cannot parse `style` attribute", {
        ancestors: e,
        cause: o,
        source: "hast-util-to-jsx-runtime",
        ruleId: "style"
      });
      throw a.file = n.filePath || void 0, a.url = "https://github.com/syntax-tree/hast-util-to-jsx-runtime#cannot-parse-style-attribute", a;
    }
  }
  return r;
  function i(l, o) {
    let a = l;
    a.slice(0, 2) !== "--" && (a.slice(0, 4) === "-ms-" && (a = "ms-" + a.slice(4)), a = a.replace(Yr, ui)), r[a] = o;
  }
}
function oi(n) {
  const e = {};
  let t;
  for (t in n)
    we.call(n, t) && (e[ai(t)] = n[t]);
  return e;
}
function ai(n) {
  let e = n.replace(Kr, si);
  return e.slice(0, 3) === "ms-" && (e = "-" + e), e;
}
function ui(n, e) {
  return e.toUpperCase();
}
function si(n) {
  return "-" + n.toLowerCase();
}
const Jn = {
  action: ["form"],
  cite: ["blockquote", "del", "ins", "q"],
  data: ["object"],
  formAction: ["button", "input"],
  href: ["a", "area", "base", "link"],
  icon: ["menuitem"],
  itemId: null,
  manifest: ["html"],
  ping: ["a", "area"],
  poster: ["video"],
  src: [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video"
  ]
}, ci = yn(/\p{P}/u), sn = yn(/[A-Za-z]/), nn = yn(/[\dA-Za-z]/), pi = yn(/[#-'*+\--9=?A-Z^-~]/);
function fe(n) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    n !== null && (n < 32 || n === 127)
  );
}
const he = yn(/\d/), fi = yn(/[\dA-Fa-f]/), _t = yn(/[!-/:-@[-`{-~]/);
function T(n) {
  return n !== null && n < -2;
}
function G(n) {
  return n !== null && (n < 0 || n === 32);
}
function M(n) {
  return n === -2 || n === -1 || n === 32;
}
function hi(n) {
  return _t(n) || ci(n);
}
const mi = yn(/\s/);
function yn(n) {
  return e;
  function e(t) {
    return t !== null && t > -1 && n.test(String.fromCharCode(t));
  }
}
const di = { '"': "quot", "&": "amp", "<": "lt", ">": "gt" };
function gi(n) {
  return n.replace(/["&<>]/g, e);
  function e(t) {
    return "&" + di[t] + ";";
  }
}
function yi(n, e) {
  const t = gi(Cn(n || ""));
  if (!e)
    return t;
  const r = t.indexOf(":"), i = t.indexOf("?"), l = t.indexOf("#"), o = t.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    r < 0 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    o > -1 && r > o || i > -1 && r > i || l > -1 && r > l || // It is a protocol, it should be allowed.
    e.test(t.slice(0, r)) ? t : ""
  );
}
function Cn(n) {
  const e = [];
  let t = -1, r = 0, i = 0;
  for (; ++t < n.length; ) {
    const l = n.charCodeAt(t);
    let o = "";
    if (l === 37 && nn(n.charCodeAt(t + 1)) && nn(n.charCodeAt(t + 2)))
      i = 2;
    else if (l < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l)) || (o = String.fromCharCode(l));
    else if (l > 55295 && l < 57344) {
      const a = n.charCodeAt(t + 1);
      l < 56320 && a > 56319 && a < 57344 ? (o = String.fromCharCode(l, a), i = 1) : o = "�";
    } else
      o = String.fromCharCode(l);
    o && (e.push(n.slice(r, t), encodeURIComponent(o)), r = t + i + 1, o = ""), i && (t += i, i = 0);
  }
  return e.join("") + n.slice(r);
}
const xi = {};
function ki(n, e) {
  const t = e || xi, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, i = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return jt(n, r, i);
}
function jt(n, e, t) {
  if (bi(n)) {
    if ("value" in n)
      return n.type === "html" && !t ? "" : n.value;
    if (e && "alt" in n && n.alt)
      return n.alt;
    if ("children" in n)
      return Ve(n.children, e, t);
  }
  return Array.isArray(n) ? Ve(n, e, t) : "";
}
function Ve(n, e, t) {
  const r = [];
  let i = -1;
  for (; ++i < n.length; )
    r[i] = jt(n[i], e, t);
  return r.join("");
}
function bi(n) {
  return !!(n && typeof n == "object");
}
const $e = document.createElement("i");
function Se(n) {
  const e = "&" + n + ";";
  $e.innerHTML = e;
  const t = $e.textContent;
  return t.charCodeAt(t.length - 1) === 59 && n !== "semi" || t === e ? !1 : t;
}
function cn(n, e, t, r) {
  const i = n.length;
  let l = 0, o;
  if (e < 0 ? e = -e > i ? 0 : i + e : e = e > i ? i : e, t = t > 0 ? t : 0, r.length < 1e4)
    o = Array.from(r), o.unshift(e, t), n.splice(...o);
  else
    for (t && n.splice(e, t); l < r.length; )
      o = r.slice(l, l + 1e4), o.unshift(e, 0), n.splice(...o), l += 1e4, e += 1e4;
}
function en(n, e) {
  return n.length > 0 ? (cn(n, n.length, 0, e), n) : e;
}
const We = {}.hasOwnProperty;
function wi(n) {
  const e = {};
  let t = -1;
  for (; ++t < n.length; )
    Si(e, n[t]);
  return e;
}
function Si(n, e) {
  let t;
  for (t in e) {
    const i = (We.call(n, t) ? n[t] : void 0) || (n[t] = {}), l = e[t];
    let o;
    if (l)
      for (o in l) {
        We.call(i, o) || (i[o] = []);
        const a = l[o];
        Ci(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function Ci(n, e) {
  let t = -1;
  const r = [];
  for (; ++t < e.length; )
    (e[t].add === "after" ? n : r).push(e[t]);
  cn(n, 0, 0, r);
}
function Ht(n, e) {
  const t = Number.parseInt(n, e);
  return (
    // C0 except for HT, LF, FF, CR, space.
    t < 9 || t === 11 || t > 13 && t < 32 || // Control character (DEL) of C0, and C1 controls.
    t > 126 && t < 160 || // Lone high surrogates and low surrogates.
    t > 55295 && t < 57344 || // Noncharacters.
    t > 64975 && t < 65008 || (t & 65535) === 65535 || (t & 65535) === 65534 || // Out of range
    t > 1114111 ? "�" : String.fromCharCode(t)
  );
}
function Tn(n) {
  return n.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
function j(n, e, t, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let l = 0;
  return o;
  function o(u) {
    return M(u) ? (n.enter(t), a(u)) : e(u);
  }
  function a(u) {
    return M(u) && l++ < i ? (n.consume(u), a) : (n.exit(t), e(u));
  }
}
const Ei = {
  tokenize: Ii
};
function Ii(n) {
  const e = n.attempt(
    this.parser.constructs.contentInitial,
    r,
    i
  );
  let t;
  return e;
  function r(a) {
    if (a === null) {
      n.consume(a);
      return;
    }
    return n.enter("lineEnding"), n.consume(a), n.exit("lineEnding"), j(n, e, "linePrefix");
  }
  function i(a) {
    return n.enter("paragraph"), l(a);
  }
  function l(a) {
    const u = n.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = u), t = u, o(a);
  }
  function o(a) {
    if (a === null) {
      n.exit("chunkText"), n.exit("paragraph"), n.consume(a);
      return;
    }
    return T(a) ? (n.consume(a), n.exit("chunkText"), l) : (n.consume(a), o);
  }
}
const Ai = {
  tokenize: Pi
}, Qe = {
  tokenize: Ti
};
function Pi(n) {
  const e = this, t = [];
  let r = 0, i, l, o;
  return a;
  function a(C) {
    if (r < t.length) {
      const N = t[r];
      return e.containerState = N[1], n.attempt(
        N[0].continuation,
        u,
        s
      )(C);
    }
    return s(C);
  }
  function u(C) {
    if (r++, e.containerState._closeFlow) {
      e.containerState._closeFlow = void 0, i && E();
      const N = e.events.length;
      let O = N, x;
      for (; O--; )
        if (e.events[O][0] === "exit" && e.events[O][1].type === "chunkFlow") {
          x = e.events[O][1].end;
          break;
        }
      b(r);
      let R = N;
      for (; R < e.events.length; )
        e.events[R][1].end = Object.assign({}, x), R++;
      return cn(
        e.events,
        O + 1,
        0,
        e.events.slice(N)
      ), e.events.length = R, s(C);
    }
    return a(C);
  }
  function s(C) {
    if (r === t.length) {
      if (!i)
        return d(C);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return y(C);
      e.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return e.containerState = {}, n.check(
      Qe,
      c,
      f
    )(C);
  }
  function c(C) {
    return i && E(), b(r), d(C);
  }
  function f(C) {
    return e.parser.lazy[e.now().line] = r !== t.length, o = e.now().offset, y(C);
  }
  function d(C) {
    return e.containerState = {}, n.attempt(
      Qe,
      p,
      y
    )(C);
  }
  function p(C) {
    return r++, t.push([e.currentConstruct, e.containerState]), d(C);
  }
  function y(C) {
    if (C === null) {
      i && E(), b(0), n.consume(C);
      return;
    }
    return i = i || e.parser.flow(e.now()), n.enter("chunkFlow", {
      contentType: "flow",
      previous: l,
      _tokenizer: i
    }), k(C);
  }
  function k(C) {
    if (C === null) {
      I(n.exit("chunkFlow"), !0), b(0), n.consume(C);
      return;
    }
    return T(C) ? (n.consume(C), I(n.exit("chunkFlow")), r = 0, e.interrupt = void 0, a) : (n.consume(C), k);
  }
  function I(C, N) {
    const O = e.sliceStream(C);
    if (N && O.push(null), C.previous = l, l && (l.next = C), l = C, i.defineSkip(C.start), i.write(O), e.parser.lazy[C.start.line]) {
      let x = i.events.length;
      for (; x--; )
        if (
          // The token starts before the line ending…
          i.events[x][1].start.offset < o && // …and either is not ended yet…
          (!i.events[x][1].end || // …or ends after it.
          i.events[x][1].end.offset > o)
        )
          return;
      const R = e.events.length;
      let q = R, v, H;
      for (; q--; )
        if (e.events[q][0] === "exit" && e.events[q][1].type === "chunkFlow") {
          if (v) {
            H = e.events[q][1].end;
            break;
          }
          v = !0;
        }
      for (b(r), x = R; x < e.events.length; )
        e.events[x][1].end = Object.assign({}, H), x++;
      cn(
        e.events,
        q + 1,
        0,
        e.events.slice(R)
      ), e.events.length = x;
    }
  }
  function b(C) {
    let N = t.length;
    for (; N-- > C; ) {
      const O = t[N];
      e.containerState = O[1], O[0].exit.call(e, n);
    }
    t.length = C;
  }
  function E() {
    i.write([null]), l = void 0, i = void 0, e.containerState._closeFlow = void 0;
  }
}
function Ti(n, e, t) {
  return j(
    n,
    n.attempt(this.parser.constructs.document, e, t),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function Xe(n) {
  if (n === null || G(n) || mi(n))
    return 1;
  if (hi(n))
    return 2;
}
function Ce(n, e, t) {
  const r = [];
  let i = -1;
  for (; ++i < n.length; ) {
    const l = n[i].resolveAll;
    l && !r.includes(l) && (e = l(e, t), r.push(l));
  }
  return e;
}
const me = {
  name: "attention",
  tokenize: Li,
  resolveAll: zi
};
function zi(n, e) {
  let t = -1, r, i, l, o, a, u, s, c;
  for (; ++t < n.length; )
    if (n[t][0] === "enter" && n[t][1].type === "attentionSequence" && n[t][1]._close) {
      for (r = t; r--; )
        if (n[r][0] === "exit" && n[r][1].type === "attentionSequence" && n[r][1]._open && // If the markers are the same:
        e.sliceSerialize(n[r][1]).charCodeAt(0) === e.sliceSerialize(n[t][1]).charCodeAt(0)) {
          if ((n[r][1]._close || n[t][1]._open) && (n[t][1].end.offset - n[t][1].start.offset) % 3 && !((n[r][1].end.offset - n[r][1].start.offset + n[t][1].end.offset - n[t][1].start.offset) % 3))
            continue;
          u = n[r][1].end.offset - n[r][1].start.offset > 1 && n[t][1].end.offset - n[t][1].start.offset > 1 ? 2 : 1;
          const f = Object.assign({}, n[r][1].end), d = Object.assign({}, n[t][1].start);
          Ke(f, -u), Ke(d, u), o = {
            type: u > 1 ? "strongSequence" : "emphasisSequence",
            start: f,
            end: Object.assign({}, n[r][1].end)
          }, a = {
            type: u > 1 ? "strongSequence" : "emphasisSequence",
            start: Object.assign({}, n[t][1].start),
            end: d
          }, l = {
            type: u > 1 ? "strongText" : "emphasisText",
            start: Object.assign({}, n[r][1].end),
            end: Object.assign({}, n[t][1].start)
          }, i = {
            type: u > 1 ? "strong" : "emphasis",
            start: Object.assign({}, o.start),
            end: Object.assign({}, a.end)
          }, n[r][1].end = Object.assign({}, o.start), n[t][1].start = Object.assign({}, a.end), s = [], n[r][1].end.offset - n[r][1].start.offset && (s = en(s, [
            ["enter", n[r][1], e],
            ["exit", n[r][1], e]
          ])), s = en(s, [
            ["enter", i, e],
            ["enter", o, e],
            ["exit", o, e],
            ["enter", l, e]
          ]), s = en(
            s,
            Ce(
              e.parser.constructs.insideSpan.null,
              n.slice(r + 1, t),
              e
            )
          ), s = en(s, [
            ["exit", l, e],
            ["enter", a, e],
            ["exit", a, e],
            ["exit", i, e]
          ]), n[t][1].end.offset - n[t][1].start.offset ? (c = 2, s = en(s, [
            ["enter", n[t][1], e],
            ["exit", n[t][1], e]
          ])) : c = 0, cn(n, r - 1, t - r + 3, s), t = r + s.length - c - 2;
          break;
        }
    }
  for (t = -1; ++t < n.length; )
    n[t][1].type === "attentionSequence" && (n[t][1].type = "data");
  return n;
}
function Li(n, e) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Xe(r);
  let l;
  return o;
  function o(u) {
    return l = u, n.enter("attentionSequence"), a(u);
  }
  function a(u) {
    if (u === l)
      return n.consume(u), a;
    const s = n.exit("attentionSequence"), c = Xe(u), f = !c || c === 2 && i || t.includes(u), d = !i || i === 2 && c || t.includes(r);
    return s._open = !!(l === 42 ? f : f && (i || !d)), s._close = !!(l === 42 ? d : d && (c || !f)), e(u);
  }
}
function Ke(n, e) {
  n.column += e, n.offset += e, n._bufferIndex += e;
}
const Oi = {
  name: "autolink",
  tokenize: Di
};
function Di(n, e, t) {
  let r = 0;
  return i;
  function i(p) {
    return n.enter("autolink"), n.enter("autolinkMarker"), n.consume(p), n.exit("autolinkMarker"), n.enter("autolinkProtocol"), l;
  }
  function l(p) {
    return sn(p) ? (n.consume(p), o) : s(p);
  }
  function o(p) {
    return p === 43 || p === 45 || p === 46 || nn(p) ? (r = 1, a(p)) : s(p);
  }
  function a(p) {
    return p === 58 ? (n.consume(p), r = 0, u) : (p === 43 || p === 45 || p === 46 || nn(p)) && r++ < 32 ? (n.consume(p), a) : (r = 0, s(p));
  }
  function u(p) {
    return p === 62 ? (n.exit("autolinkProtocol"), n.enter("autolinkMarker"), n.consume(p), n.exit("autolinkMarker"), n.exit("autolink"), e) : p === null || p === 32 || p === 60 || fe(p) ? t(p) : (n.consume(p), u);
  }
  function s(p) {
    return p === 64 ? (n.consume(p), c) : pi(p) ? (n.consume(p), s) : t(p);
  }
  function c(p) {
    return nn(p) ? f(p) : t(p);
  }
  function f(p) {
    return p === 46 ? (n.consume(p), r = 0, c) : p === 62 ? (n.exit("autolinkProtocol").type = "autolinkEmail", n.enter("autolinkMarker"), n.consume(p), n.exit("autolinkMarker"), n.exit("autolink"), e) : d(p);
  }
  function d(p) {
    if ((p === 45 || nn(p)) && r++ < 63) {
      const y = p === 45 ? d : f;
      return n.consume(p), y;
    }
    return t(p);
  }
}
const Wn = {
  tokenize: Fi,
  partial: !0
};
function Fi(n, e, t) {
  return r;
  function r(l) {
    return M(l) ? j(n, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || T(l) ? e(l) : t(l);
  }
}
const Ut = {
  name: "blockQuote",
  tokenize: Ni,
  continuation: {
    tokenize: Ri
  },
  exit: Mi
};
function Ni(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    if (o === 62) {
      const a = r.containerState;
      return a.open || (n.enter("blockQuote", {
        _container: !0
      }), a.open = !0), n.enter("blockQuotePrefix"), n.enter("blockQuoteMarker"), n.consume(o), n.exit("blockQuoteMarker"), l;
    }
    return t(o);
  }
  function l(o) {
    return M(o) ? (n.enter("blockQuotePrefixWhitespace"), n.consume(o), n.exit("blockQuotePrefixWhitespace"), n.exit("blockQuotePrefix"), e) : (n.exit("blockQuotePrefix"), e(o));
  }
}
function Ri(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return M(o) ? j(
      n,
      l,
      "linePrefix",
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    )(o) : l(o);
  }
  function l(o) {
    return n.attempt(Ut, e, t)(o);
  }
}
function Mi(n) {
  n.exit("blockQuote");
}
const qt = {
  name: "characterEscape",
  tokenize: Bi
};
function Bi(n, e, t) {
  return r;
  function r(l) {
    return n.enter("characterEscape"), n.enter("escapeMarker"), n.consume(l), n.exit("escapeMarker"), i;
  }
  function i(l) {
    return _t(l) ? (n.enter("characterEscapeValue"), n.consume(l), n.exit("characterEscapeValue"), n.exit("characterEscape"), e) : t(l);
  }
}
const Vt = {
  name: "characterReference",
  tokenize: vi
};
function vi(n, e, t) {
  const r = this;
  let i = 0, l, o;
  return a;
  function a(f) {
    return n.enter("characterReference"), n.enter("characterReferenceMarker"), n.consume(f), n.exit("characterReferenceMarker"), u;
  }
  function u(f) {
    return f === 35 ? (n.enter("characterReferenceMarkerNumeric"), n.consume(f), n.exit("characterReferenceMarkerNumeric"), s) : (n.enter("characterReferenceValue"), l = 31, o = nn, c(f));
  }
  function s(f) {
    return f === 88 || f === 120 ? (n.enter("characterReferenceMarkerHexadecimal"), n.consume(f), n.exit("characterReferenceMarkerHexadecimal"), n.enter("characterReferenceValue"), l = 6, o = fi, c) : (n.enter("characterReferenceValue"), l = 7, o = he, c(f));
  }
  function c(f) {
    if (f === 59 && i) {
      const d = n.exit("characterReferenceValue");
      return o === nn && !Se(r.sliceSerialize(d)) ? t(f) : (n.enter("characterReferenceMarker"), n.consume(f), n.exit("characterReferenceMarker"), n.exit("characterReference"), e);
    }
    return o(f) && i++ < l ? (n.consume(f), c) : t(f);
  }
}
const Ye = {
  tokenize: ji,
  partial: !0
}, Ge = {
  name: "codeFenced",
  tokenize: _i,
  concrete: !0
};
function _i(n, e, t) {
  const r = this, i = {
    tokenize: O,
    partial: !0
  };
  let l = 0, o = 0, a;
  return u;
  function u(x) {
    return s(x);
  }
  function s(x) {
    const R = r.events[r.events.length - 1];
    return l = R && R[1].type === "linePrefix" ? R[2].sliceSerialize(R[1], !0).length : 0, a = x, n.enter("codeFenced"), n.enter("codeFencedFence"), n.enter("codeFencedFenceSequence"), c(x);
  }
  function c(x) {
    return x === a ? (o++, n.consume(x), c) : o < 3 ? t(x) : (n.exit("codeFencedFenceSequence"), M(x) ? j(n, f, "whitespace")(x) : f(x));
  }
  function f(x) {
    return x === null || T(x) ? (n.exit("codeFencedFence"), r.interrupt ? e(x) : n.check(Ye, k, N)(x)) : (n.enter("codeFencedFenceInfo"), n.enter("chunkString", {
      contentType: "string"
    }), d(x));
  }
  function d(x) {
    return x === null || T(x) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), f(x)) : M(x) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), j(n, p, "whitespace")(x)) : x === 96 && x === a ? t(x) : (n.consume(x), d);
  }
  function p(x) {
    return x === null || T(x) ? f(x) : (n.enter("codeFencedFenceMeta"), n.enter("chunkString", {
      contentType: "string"
    }), y(x));
  }
  function y(x) {
    return x === null || T(x) ? (n.exit("chunkString"), n.exit("codeFencedFenceMeta"), f(x)) : x === 96 && x === a ? t(x) : (n.consume(x), y);
  }
  function k(x) {
    return n.attempt(i, N, I)(x);
  }
  function I(x) {
    return n.enter("lineEnding"), n.consume(x), n.exit("lineEnding"), b;
  }
  function b(x) {
    return l > 0 && M(x) ? j(
      n,
      E,
      "linePrefix",
      l + 1
    )(x) : E(x);
  }
  function E(x) {
    return x === null || T(x) ? n.check(Ye, k, N)(x) : (n.enter("codeFlowValue"), C(x));
  }
  function C(x) {
    return x === null || T(x) ? (n.exit("codeFlowValue"), E(x)) : (n.consume(x), C);
  }
  function N(x) {
    return n.exit("codeFenced"), e(x);
  }
  function O(x, R, q) {
    let v = 0;
    return H;
    function H(F) {
      return x.enter("lineEnding"), x.consume(F), x.exit("lineEnding"), P;
    }
    function P(F) {
      return x.enter("codeFencedFence"), M(F) ? j(
        x,
        A,
        "linePrefix",
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
      )(F) : A(F);
    }
    function A(F) {
      return F === a ? (x.enter("codeFencedFenceSequence"), U(F)) : q(F);
    }
    function U(F) {
      return F === a ? (v++, x.consume(F), U) : v >= o ? (x.exit("codeFencedFenceSequence"), M(F) ? j(x, V, "whitespace")(F) : V(F)) : q(F);
    }
    function V(F) {
      return F === null || T(F) ? (x.exit("codeFencedFence"), R(F)) : q(F);
    }
  }
}
function ji(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return o === null ? t(o) : (n.enter("lineEnding"), n.consume(o), n.exit("lineEnding"), l);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : e(o);
  }
}
const ne = {
  name: "codeIndented",
  tokenize: Ui
}, Hi = {
  tokenize: qi,
  partial: !0
};
function Ui(n, e, t) {
  const r = this;
  return i;
  function i(s) {
    return n.enter("codeIndented"), j(n, l, "linePrefix", 4 + 1)(s);
  }
  function l(s) {
    const c = r.events[r.events.length - 1];
    return c && c[1].type === "linePrefix" && c[2].sliceSerialize(c[1], !0).length >= 4 ? o(s) : t(s);
  }
  function o(s) {
    return s === null ? u(s) : T(s) ? n.attempt(Hi, o, u)(s) : (n.enter("codeFlowValue"), a(s));
  }
  function a(s) {
    return s === null || T(s) ? (n.exit("codeFlowValue"), o(s)) : (n.consume(s), a);
  }
  function u(s) {
    return n.exit("codeIndented"), e(s);
  }
}
function qi(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? t(o) : T(o) ? (n.enter("lineEnding"), n.consume(o), n.exit("lineEnding"), i) : j(n, l, "linePrefix", 4 + 1)(o);
  }
  function l(o) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? e(o) : T(o) ? i(o) : t(o);
  }
}
const Vi = {
  name: "codeText",
  tokenize: Qi,
  resolve: $i,
  previous: Wi
};
function $i(n) {
  let e = n.length - 4, t = 3, r, i;
  if ((n[t][1].type === "lineEnding" || n[t][1].type === "space") && (n[e][1].type === "lineEnding" || n[e][1].type === "space")) {
    for (r = t; ++r < e; )
      if (n[r][1].type === "codeTextData") {
        n[t][1].type = "codeTextPadding", n[e][1].type = "codeTextPadding", t += 2, e -= 2;
        break;
      }
  }
  for (r = t - 1, e++; ++r <= e; )
    i === void 0 ? r !== e && n[r][1].type !== "lineEnding" && (i = r) : (r === e || n[r][1].type === "lineEnding") && (n[i][1].type = "codeTextData", r !== i + 2 && (n[i][1].end = n[r - 1][1].end, n.splice(i + 2, r - i - 2), e -= r - i - 2, r = i + 2), i = void 0);
  return n;
}
function Wi(n) {
  return n !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Qi(n, e, t) {
  let r = 0, i, l;
  return o;
  function o(f) {
    return n.enter("codeText"), n.enter("codeTextSequence"), a(f);
  }
  function a(f) {
    return f === 96 ? (n.consume(f), r++, a) : (n.exit("codeTextSequence"), u(f));
  }
  function u(f) {
    return f === null ? t(f) : f === 32 ? (n.enter("space"), n.consume(f), n.exit("space"), u) : f === 96 ? (l = n.enter("codeTextSequence"), i = 0, c(f)) : T(f) ? (n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), u) : (n.enter("codeTextData"), s(f));
  }
  function s(f) {
    return f === null || f === 32 || f === 96 || T(f) ? (n.exit("codeTextData"), u(f)) : (n.consume(f), s);
  }
  function c(f) {
    return f === 96 ? (n.consume(f), i++, c) : i === r ? (n.exit("codeTextSequence"), n.exit("codeText"), e(f)) : (l.type = "codeTextData", s(f));
  }
}
function $t(n) {
  const e = {};
  let t = -1, r, i, l, o, a, u, s;
  for (; ++t < n.length; ) {
    for (; t in e; )
      t = e[t];
    if (r = n[t], t && r[1].type === "chunkFlow" && n[t - 1][1].type === "listItemPrefix" && (u = r[1]._tokenizer.events, l = 0, l < u.length && u[l][1].type === "lineEndingBlank" && (l += 2), l < u.length && u[l][1].type === "content"))
      for (; ++l < u.length && u[l][1].type !== "content"; )
        u[l][1].type === "chunkText" && (u[l][1]._isInFirstContentOfListItem = !0, l++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(e, Xi(n, t)), t = e[t], s = !0);
    else if (r[1]._container) {
      for (l = t, i = void 0; l-- && (o = n[l], o[1].type === "lineEnding" || o[1].type === "lineEndingBlank"); )
        o[0] === "enter" && (i && (n[i][1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = l);
      i && (r[1].end = Object.assign({}, n[i][1].start), a = n.slice(i, t), a.unshift(r), cn(n, i, t - i + 1, a));
    }
  }
  return !s;
}
function Xi(n, e) {
  const t = n[e][1], r = n[e][2];
  let i = e - 1;
  const l = [], o = t._tokenizer || r.parser[t.contentType](t.start), a = o.events, u = [], s = {};
  let c, f, d = -1, p = t, y = 0, k = 0;
  const I = [k];
  for (; p; ) {
    for (; n[++i][1] !== p; )
      ;
    l.push(i), p._tokenizer || (c = r.sliceStream(p), p.next || c.push(null), f && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(c), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), f = p, p = p.next;
  }
  for (p = t; ++d < a.length; )
    // Find a void token that includes a break.
    a[d][0] === "exit" && a[d - 1][0] === "enter" && a[d][1].type === a[d - 1][1].type && a[d][1].start.line !== a[d][1].end.line && (k = d + 1, I.push(k), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : I.pop(), d = I.length; d--; ) {
    const b = a.slice(I[d], I[d + 1]), E = l.pop();
    u.unshift([E, E + b.length - 1]), cn(n, E, 2, b);
  }
  for (d = -1; ++d < u.length; )
    s[y + u[d][0]] = y + u[d][1], y += u[d][1] - u[d][0] - 1;
  return s;
}
const Ki = {
  tokenize: Zi,
  resolve: Gi
}, Yi = {
  tokenize: Ji,
  partial: !0
};
function Gi(n) {
  return $t(n), n;
}
function Zi(n, e) {
  let t;
  return r;
  function r(a) {
    return n.enter("content"), t = n.enter("chunkContent", {
      contentType: "content"
    }), i(a);
  }
  function i(a) {
    return a === null ? l(a) : T(a) ? n.check(
      Yi,
      o,
      l
    )(a) : (n.consume(a), i);
  }
  function l(a) {
    return n.exit("chunkContent"), n.exit("content"), e(a);
  }
  function o(a) {
    return n.consume(a), n.exit("chunkContent"), t.next = n.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, i;
  }
}
function Ji(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return n.exit("chunkContent"), n.enter("lineEnding"), n.consume(o), n.exit("lineEnding"), j(n, l, "linePrefix");
  }
  function l(o) {
    if (o === null || T(o))
      return t(o);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? e(o) : n.interrupt(r.parser.constructs.flow, t, e)(o);
  }
}
function Wt(n, e, t, r, i, l, o, a, u) {
  const s = u || Number.POSITIVE_INFINITY;
  let c = 0;
  return f;
  function f(b) {
    return b === 60 ? (n.enter(r), n.enter(i), n.enter(l), n.consume(b), n.exit(l), d) : b === null || b === 32 || b === 41 || fe(b) ? t(b) : (n.enter(r), n.enter(o), n.enter(a), n.enter("chunkString", {
      contentType: "string"
    }), k(b));
  }
  function d(b) {
    return b === 62 ? (n.enter(l), n.consume(b), n.exit(l), n.exit(i), n.exit(r), e) : (n.enter(a), n.enter("chunkString", {
      contentType: "string"
    }), p(b));
  }
  function p(b) {
    return b === 62 ? (n.exit("chunkString"), n.exit(a), d(b)) : b === null || b === 60 || T(b) ? t(b) : (n.consume(b), b === 92 ? y : p);
  }
  function y(b) {
    return b === 60 || b === 62 || b === 92 ? (n.consume(b), p) : p(b);
  }
  function k(b) {
    return !c && (b === null || b === 41 || G(b)) ? (n.exit("chunkString"), n.exit(a), n.exit(o), n.exit(r), e(b)) : c < s && b === 40 ? (n.consume(b), c++, k) : b === 41 ? (n.consume(b), c--, k) : b === null || b === 32 || b === 40 || fe(b) ? t(b) : (n.consume(b), b === 92 ? I : k);
  }
  function I(b) {
    return b === 40 || b === 41 || b === 92 ? (n.consume(b), k) : k(b);
  }
}
function Qt(n, e, t, r, i, l) {
  const o = this;
  let a = 0, u;
  return s;
  function s(p) {
    return n.enter(r), n.enter(i), n.consume(p), n.exit(i), n.enter(l), c;
  }
  function c(p) {
    return a > 999 || p === null || p === 91 || p === 93 && !u || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    p === 94 && !a && "_hiddenFootnoteSupport" in o.parser.constructs ? t(p) : p === 93 ? (n.exit(l), n.enter(i), n.consume(p), n.exit(i), n.exit(r), e) : T(p) ? (n.enter("lineEnding"), n.consume(p), n.exit("lineEnding"), c) : (n.enter("chunkString", {
      contentType: "string"
    }), f(p));
  }
  function f(p) {
    return p === null || p === 91 || p === 93 || T(p) || a++ > 999 ? (n.exit("chunkString"), c(p)) : (n.consume(p), u || (u = !M(p)), p === 92 ? d : f);
  }
  function d(p) {
    return p === 91 || p === 92 || p === 93 ? (n.consume(p), a++, f) : f(p);
  }
}
function Xt(n, e, t, r, i, l) {
  let o;
  return a;
  function a(d) {
    return d === 34 || d === 39 || d === 40 ? (n.enter(r), n.enter(i), n.consume(d), n.exit(i), o = d === 40 ? 41 : d, u) : t(d);
  }
  function u(d) {
    return d === o ? (n.enter(i), n.consume(d), n.exit(i), n.exit(r), e) : (n.enter(l), s(d));
  }
  function s(d) {
    return d === o ? (n.exit(l), u(o)) : d === null ? t(d) : T(d) ? (n.enter("lineEnding"), n.consume(d), n.exit("lineEnding"), j(n, s, "linePrefix")) : (n.enter("chunkString", {
      contentType: "string"
    }), c(d));
  }
  function c(d) {
    return d === o || d === null || T(d) ? (n.exit("chunkString"), s(d)) : (n.consume(d), d === 92 ? f : c);
  }
  function f(d) {
    return d === o || d === 92 ? (n.consume(d), c) : c(d);
  }
}
function Rn(n, e) {
  let t;
  return r;
  function r(i) {
    return T(i) ? (n.enter("lineEnding"), n.consume(i), n.exit("lineEnding"), t = !0, r) : M(i) ? j(
      n,
      r,
      t ? "linePrefix" : "lineSuffix"
    )(i) : e(i);
  }
}
const nl = {
  name: "definition",
  tokenize: tl
}, el = {
  tokenize: rl,
  partial: !0
};
function tl(n, e, t) {
  const r = this;
  let i;
  return l;
  function l(p) {
    return n.enter("definition"), o(p);
  }
  function o(p) {
    return Qt.call(
      r,
      n,
      a,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(p);
  }
  function a(p) {
    return i = Tn(
      r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
    ), p === 58 ? (n.enter("definitionMarker"), n.consume(p), n.exit("definitionMarker"), u) : t(p);
  }
  function u(p) {
    return G(p) ? Rn(n, s)(p) : s(p);
  }
  function s(p) {
    return Wt(
      n,
      c,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(p);
  }
  function c(p) {
    return n.attempt(el, f, f)(p);
  }
  function f(p) {
    return M(p) ? j(n, d, "whitespace")(p) : d(p);
  }
  function d(p) {
    return p === null || T(p) ? (n.exit("definition"), r.parser.defined.push(i), e(p)) : t(p);
  }
}
function rl(n, e, t) {
  return r;
  function r(a) {
    return G(a) ? Rn(n, i)(a) : t(a);
  }
  function i(a) {
    return Xt(
      n,
      l,
      t,
      "definitionTitle",
      "definitionTitleMarker",
      "definitionTitleString"
    )(a);
  }
  function l(a) {
    return M(a) ? j(n, o, "whitespace")(a) : o(a);
  }
  function o(a) {
    return a === null || T(a) ? e(a) : t(a);
  }
}
const il = {
  name: "hardBreakEscape",
  tokenize: ll
};
function ll(n, e, t) {
  return r;
  function r(l) {
    return n.enter("hardBreakEscape"), n.consume(l), i;
  }
  function i(l) {
    return T(l) ? (n.exit("hardBreakEscape"), e(l)) : t(l);
  }
}
const ol = {
  name: "headingAtx",
  tokenize: ul,
  resolve: al
};
function al(n, e) {
  let t = n.length - 2, r = 3, i, l;
  return n[r][1].type === "whitespace" && (r += 2), t - 2 > r && n[t][1].type === "whitespace" && (t -= 2), n[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && n[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (i = {
    type: "atxHeadingText",
    start: n[r][1].start,
    end: n[t][1].end
  }, l = {
    type: "chunkText",
    start: n[r][1].start,
    end: n[t][1].end,
    contentType: "text"
  }, cn(n, r, t - r + 1, [
    ["enter", i, e],
    ["enter", l, e],
    ["exit", l, e],
    ["exit", i, e]
  ])), n;
}
function ul(n, e, t) {
  let r = 0;
  return i;
  function i(c) {
    return n.enter("atxHeading"), l(c);
  }
  function l(c) {
    return n.enter("atxHeadingSequence"), o(c);
  }
  function o(c) {
    return c === 35 && r++ < 6 ? (n.consume(c), o) : c === null || G(c) ? (n.exit("atxHeadingSequence"), a(c)) : t(c);
  }
  function a(c) {
    return c === 35 ? (n.enter("atxHeadingSequence"), u(c)) : c === null || T(c) ? (n.exit("atxHeading"), e(c)) : M(c) ? j(n, a, "whitespace")(c) : (n.enter("atxHeadingText"), s(c));
  }
  function u(c) {
    return c === 35 ? (n.consume(c), u) : (n.exit("atxHeadingSequence"), a(c));
  }
  function s(c) {
    return c === null || c === 35 || G(c) ? (n.exit("atxHeadingText"), a(c)) : (n.consume(c), s);
  }
}
const sl = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], Ze = ["pre", "script", "style", "textarea"], cl = {
  name: "htmlFlow",
  tokenize: ml,
  resolveTo: hl,
  concrete: !0
}, pl = {
  tokenize: gl,
  partial: !0
}, fl = {
  tokenize: dl,
  partial: !0
};
function hl(n) {
  let e = n.length;
  for (; e-- && !(n[e][0] === "enter" && n[e][1].type === "htmlFlow"); )
    ;
  return e > 1 && n[e - 2][1].type === "linePrefix" && (n[e][1].start = n[e - 2][1].start, n[e + 1][1].start = n[e - 2][1].start, n.splice(e - 2, 2)), n;
}
function ml(n, e, t) {
  const r = this;
  let i, l, o, a, u;
  return s;
  function s(m) {
    return c(m);
  }
  function c(m) {
    return n.enter("htmlFlow"), n.enter("htmlFlowData"), n.consume(m), f;
  }
  function f(m) {
    return m === 33 ? (n.consume(m), d) : m === 47 ? (n.consume(m), l = !0, k) : m === 63 ? (n.consume(m), i = 3, r.interrupt ? e : h) : sn(m) ? (n.consume(m), o = String.fromCharCode(m), I) : t(m);
  }
  function d(m) {
    return m === 45 ? (n.consume(m), i = 2, p) : m === 91 ? (n.consume(m), i = 5, a = 0, y) : sn(m) ? (n.consume(m), i = 4, r.interrupt ? e : h) : t(m);
  }
  function p(m) {
    return m === 45 ? (n.consume(m), r.interrupt ? e : h) : t(m);
  }
  function y(m) {
    const on = "CDATA[";
    return m === on.charCodeAt(a++) ? (n.consume(m), a === on.length ? r.interrupt ? e : A : y) : t(m);
  }
  function k(m) {
    return sn(m) ? (n.consume(m), o = String.fromCharCode(m), I) : t(m);
  }
  function I(m) {
    if (m === null || m === 47 || m === 62 || G(m)) {
      const on = m === 47, xn = o.toLowerCase();
      return !on && !l && Ze.includes(xn) ? (i = 1, r.interrupt ? e(m) : A(m)) : sl.includes(o.toLowerCase()) ? (i = 6, on ? (n.consume(m), b) : r.interrupt ? e(m) : A(m)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(m) : l ? E(m) : C(m));
    }
    return m === 45 || nn(m) ? (n.consume(m), o += String.fromCharCode(m), I) : t(m);
  }
  function b(m) {
    return m === 62 ? (n.consume(m), r.interrupt ? e : A) : t(m);
  }
  function E(m) {
    return M(m) ? (n.consume(m), E) : H(m);
  }
  function C(m) {
    return m === 47 ? (n.consume(m), H) : m === 58 || m === 95 || sn(m) ? (n.consume(m), N) : M(m) ? (n.consume(m), C) : H(m);
  }
  function N(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || nn(m) ? (n.consume(m), N) : O(m);
  }
  function O(m) {
    return m === 61 ? (n.consume(m), x) : M(m) ? (n.consume(m), O) : C(m);
  }
  function x(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? t(m) : m === 34 || m === 39 ? (n.consume(m), u = m, R) : M(m) ? (n.consume(m), x) : q(m);
  }
  function R(m) {
    return m === u ? (n.consume(m), u = null, v) : m === null || T(m) ? t(m) : (n.consume(m), R);
  }
  function q(m) {
    return m === null || m === 34 || m === 39 || m === 47 || m === 60 || m === 61 || m === 62 || m === 96 || G(m) ? O(m) : (n.consume(m), q);
  }
  function v(m) {
    return m === 47 || m === 62 || M(m) ? C(m) : t(m);
  }
  function H(m) {
    return m === 62 ? (n.consume(m), P) : t(m);
  }
  function P(m) {
    return m === null || T(m) ? A(m) : M(m) ? (n.consume(m), P) : t(m);
  }
  function A(m) {
    return m === 45 && i === 2 ? (n.consume(m), X) : m === 60 && i === 1 ? (n.consume(m), W) : m === 62 && i === 4 ? (n.consume(m), ln) : m === 63 && i === 3 ? (n.consume(m), h) : m === 93 && i === 5 ? (n.consume(m), pn) : T(m) && (i === 6 || i === 7) ? (n.exit("htmlFlowData"), n.check(
      pl,
      fn,
      U
    )(m)) : m === null || T(m) ? (n.exit("htmlFlowData"), U(m)) : (n.consume(m), A);
  }
  function U(m) {
    return n.check(
      fl,
      V,
      fn
    )(m);
  }
  function V(m) {
    return n.enter("lineEnding"), n.consume(m), n.exit("lineEnding"), F;
  }
  function F(m) {
    return m === null || T(m) ? U(m) : (n.enter("htmlFlowData"), A(m));
  }
  function X(m) {
    return m === 45 ? (n.consume(m), h) : A(m);
  }
  function W(m) {
    return m === 47 ? (n.consume(m), o = "", rn) : A(m);
  }
  function rn(m) {
    if (m === 62) {
      const on = o.toLowerCase();
      return Ze.includes(on) ? (n.consume(m), ln) : A(m);
    }
    return sn(m) && o.length < 8 ? (n.consume(m), o += String.fromCharCode(m), rn) : A(m);
  }
  function pn(m) {
    return m === 93 ? (n.consume(m), h) : A(m);
  }
  function h(m) {
    return m === 62 ? (n.consume(m), ln) : m === 45 && i === 2 ? (n.consume(m), h) : A(m);
  }
  function ln(m) {
    return m === null || T(m) ? (n.exit("htmlFlowData"), fn(m)) : (n.consume(m), ln);
  }
  function fn(m) {
    return n.exit("htmlFlow"), e(m);
  }
}
function dl(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return T(o) ? (n.enter("lineEnding"), n.consume(o), n.exit("lineEnding"), l) : t(o);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : e(o);
  }
}
function gl(n, e, t) {
  return r;
  function r(i) {
    return n.enter("lineEnding"), n.consume(i), n.exit("lineEnding"), n.attempt(Wn, e, t);
  }
}
const yl = {
  name: "htmlText",
  tokenize: xl
};
function xl(n, e, t) {
  const r = this;
  let i, l, o;
  return a;
  function a(h) {
    return n.enter("htmlText"), n.enter("htmlTextData"), n.consume(h), u;
  }
  function u(h) {
    return h === 33 ? (n.consume(h), s) : h === 47 ? (n.consume(h), O) : h === 63 ? (n.consume(h), C) : sn(h) ? (n.consume(h), q) : t(h);
  }
  function s(h) {
    return h === 45 ? (n.consume(h), c) : h === 91 ? (n.consume(h), l = 0, y) : sn(h) ? (n.consume(h), E) : t(h);
  }
  function c(h) {
    return h === 45 ? (n.consume(h), p) : t(h);
  }
  function f(h) {
    return h === null ? t(h) : h === 45 ? (n.consume(h), d) : T(h) ? (o = f, W(h)) : (n.consume(h), f);
  }
  function d(h) {
    return h === 45 ? (n.consume(h), p) : f(h);
  }
  function p(h) {
    return h === 62 ? X(h) : h === 45 ? d(h) : f(h);
  }
  function y(h) {
    const ln = "CDATA[";
    return h === ln.charCodeAt(l++) ? (n.consume(h), l === ln.length ? k : y) : t(h);
  }
  function k(h) {
    return h === null ? t(h) : h === 93 ? (n.consume(h), I) : T(h) ? (o = k, W(h)) : (n.consume(h), k);
  }
  function I(h) {
    return h === 93 ? (n.consume(h), b) : k(h);
  }
  function b(h) {
    return h === 62 ? X(h) : h === 93 ? (n.consume(h), b) : k(h);
  }
  function E(h) {
    return h === null || h === 62 ? X(h) : T(h) ? (o = E, W(h)) : (n.consume(h), E);
  }
  function C(h) {
    return h === null ? t(h) : h === 63 ? (n.consume(h), N) : T(h) ? (o = C, W(h)) : (n.consume(h), C);
  }
  function N(h) {
    return h === 62 ? X(h) : C(h);
  }
  function O(h) {
    return sn(h) ? (n.consume(h), x) : t(h);
  }
  function x(h) {
    return h === 45 || nn(h) ? (n.consume(h), x) : R(h);
  }
  function R(h) {
    return T(h) ? (o = R, W(h)) : M(h) ? (n.consume(h), R) : X(h);
  }
  function q(h) {
    return h === 45 || nn(h) ? (n.consume(h), q) : h === 47 || h === 62 || G(h) ? v(h) : t(h);
  }
  function v(h) {
    return h === 47 ? (n.consume(h), X) : h === 58 || h === 95 || sn(h) ? (n.consume(h), H) : T(h) ? (o = v, W(h)) : M(h) ? (n.consume(h), v) : X(h);
  }
  function H(h) {
    return h === 45 || h === 46 || h === 58 || h === 95 || nn(h) ? (n.consume(h), H) : P(h);
  }
  function P(h) {
    return h === 61 ? (n.consume(h), A) : T(h) ? (o = P, W(h)) : M(h) ? (n.consume(h), P) : v(h);
  }
  function A(h) {
    return h === null || h === 60 || h === 61 || h === 62 || h === 96 ? t(h) : h === 34 || h === 39 ? (n.consume(h), i = h, U) : T(h) ? (o = A, W(h)) : M(h) ? (n.consume(h), A) : (n.consume(h), V);
  }
  function U(h) {
    return h === i ? (n.consume(h), i = void 0, F) : h === null ? t(h) : T(h) ? (o = U, W(h)) : (n.consume(h), U);
  }
  function V(h) {
    return h === null || h === 34 || h === 39 || h === 60 || h === 61 || h === 96 ? t(h) : h === 47 || h === 62 || G(h) ? v(h) : (n.consume(h), V);
  }
  function F(h) {
    return h === 47 || h === 62 || G(h) ? v(h) : t(h);
  }
  function X(h) {
    return h === 62 ? (n.consume(h), n.exit("htmlTextData"), n.exit("htmlText"), e) : t(h);
  }
  function W(h) {
    return n.exit("htmlTextData"), n.enter("lineEnding"), n.consume(h), n.exit("lineEnding"), rn;
  }
  function rn(h) {
    return M(h) ? j(
      n,
      pn,
      "linePrefix",
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    )(h) : pn(h);
  }
  function pn(h) {
    return n.enter("htmlTextData"), o(h);
  }
}
const Ee = {
  name: "labelEnd",
  tokenize: El,
  resolveTo: Cl,
  resolveAll: Sl
}, kl = {
  tokenize: Il
}, bl = {
  tokenize: Al
}, wl = {
  tokenize: Pl
};
function Sl(n) {
  let e = -1;
  for (; ++e < n.length; ) {
    const t = n[e][1];
    (t.type === "labelImage" || t.type === "labelLink" || t.type === "labelEnd") && (n.splice(e + 1, t.type === "labelImage" ? 4 : 2), t.type = "data", e++);
  }
  return n;
}
function Cl(n, e) {
  let t = n.length, r = 0, i, l, o, a;
  for (; t--; )
    if (i = n[t][1], l) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      n[t][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (o) {
      if (n[t][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (l = t, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else
      i.type === "labelEnd" && (o = t);
  const u = {
    type: n[l][1].type === "labelLink" ? "link" : "image",
    start: Object.assign({}, n[l][1].start),
    end: Object.assign({}, n[n.length - 1][1].end)
  }, s = {
    type: "label",
    start: Object.assign({}, n[l][1].start),
    end: Object.assign({}, n[o][1].end)
  }, c = {
    type: "labelText",
    start: Object.assign({}, n[l + r + 2][1].end),
    end: Object.assign({}, n[o - 2][1].start)
  };
  return a = [
    ["enter", u, e],
    ["enter", s, e]
  ], a = en(a, n.slice(l + 1, l + r + 3)), a = en(a, [["enter", c, e]]), a = en(
    a,
    Ce(
      e.parser.constructs.insideSpan.null,
      n.slice(l + r + 4, o - 3),
      e
    )
  ), a = en(a, [
    ["exit", c, e],
    n[o - 2],
    n[o - 1],
    ["exit", s, e]
  ]), a = en(a, n.slice(o + 1)), a = en(a, [["exit", u, e]]), cn(n, l, n.length, a), n;
}
function El(n, e, t) {
  const r = this;
  let i = r.events.length, l, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      l = r.events[i][1];
      break;
    }
  return a;
  function a(d) {
    return l ? l._inactive ? f(d) : (o = r.parser.defined.includes(
      Tn(
        r.sliceSerialize({
          start: l.end,
          end: r.now()
        })
      )
    ), n.enter("labelEnd"), n.enter("labelMarker"), n.consume(d), n.exit("labelMarker"), n.exit("labelEnd"), u) : t(d);
  }
  function u(d) {
    return d === 40 ? n.attempt(
      kl,
      c,
      o ? c : f
    )(d) : d === 91 ? n.attempt(
      bl,
      c,
      o ? s : f
    )(d) : o ? c(d) : f(d);
  }
  function s(d) {
    return n.attempt(
      wl,
      c,
      f
    )(d);
  }
  function c(d) {
    return e(d);
  }
  function f(d) {
    return l._balanced = !0, t(d);
  }
}
function Il(n, e, t) {
  return r;
  function r(f) {
    return n.enter("resource"), n.enter("resourceMarker"), n.consume(f), n.exit("resourceMarker"), i;
  }
  function i(f) {
    return G(f) ? Rn(n, l)(f) : l(f);
  }
  function l(f) {
    return f === 41 ? c(f) : Wt(
      n,
      o,
      a,
      "resourceDestination",
      "resourceDestinationLiteral",
      "resourceDestinationLiteralMarker",
      "resourceDestinationRaw",
      "resourceDestinationString",
      32
    )(f);
  }
  function o(f) {
    return G(f) ? Rn(n, u)(f) : c(f);
  }
  function a(f) {
    return t(f);
  }
  function u(f) {
    return f === 34 || f === 39 || f === 40 ? Xt(
      n,
      s,
      t,
      "resourceTitle",
      "resourceTitleMarker",
      "resourceTitleString"
    )(f) : c(f);
  }
  function s(f) {
    return G(f) ? Rn(n, c)(f) : c(f);
  }
  function c(f) {
    return f === 41 ? (n.enter("resourceMarker"), n.consume(f), n.exit("resourceMarker"), n.exit("resource"), e) : t(f);
  }
}
function Al(n, e, t) {
  const r = this;
  return i;
  function i(a) {
    return Qt.call(
      r,
      n,
      l,
      o,
      "reference",
      "referenceMarker",
      "referenceString"
    )(a);
  }
  function l(a) {
    return r.parser.defined.includes(
      Tn(
        r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
      )
    ) ? e(a) : t(a);
  }
  function o(a) {
    return t(a);
  }
}
function Pl(n, e, t) {
  return r;
  function r(l) {
    return n.enter("reference"), n.enter("referenceMarker"), n.consume(l), n.exit("referenceMarker"), i;
  }
  function i(l) {
    return l === 93 ? (n.enter("referenceMarker"), n.consume(l), n.exit("referenceMarker"), n.exit("reference"), e) : t(l);
  }
}
const Tl = {
  name: "labelStartImage",
  tokenize: zl,
  resolveAll: Ee.resolveAll
};
function zl(n, e, t) {
  const r = this;
  return i;
  function i(a) {
    return n.enter("labelImage"), n.enter("labelImageMarker"), n.consume(a), n.exit("labelImageMarker"), l;
  }
  function l(a) {
    return a === 91 ? (n.enter("labelMarker"), n.consume(a), n.exit("labelMarker"), n.exit("labelImage"), o) : t(a);
  }
  function o(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(a) : e(a);
  }
}
const Ll = {
  name: "labelStartLink",
  tokenize: Ol,
  resolveAll: Ee.resolveAll
};
function Ol(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return n.enter("labelLink"), n.enter("labelMarker"), n.consume(o), n.exit("labelMarker"), n.exit("labelLink"), l;
  }
  function l(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(o) : e(o);
  }
}
const ee = {
  name: "lineEnding",
  tokenize: Dl
};
function Dl(n, e) {
  return t;
  function t(r) {
    return n.enter("lineEnding"), n.consume(r), n.exit("lineEnding"), j(n, e, "linePrefix");
  }
}
const Hn = {
  name: "thematicBreak",
  tokenize: Fl
};
function Fl(n, e, t) {
  let r = 0, i;
  return l;
  function l(s) {
    return n.enter("thematicBreak"), o(s);
  }
  function o(s) {
    return i = s, a(s);
  }
  function a(s) {
    return s === i ? (n.enter("thematicBreakSequence"), u(s)) : r >= 3 && (s === null || T(s)) ? (n.exit("thematicBreak"), e(s)) : t(s);
  }
  function u(s) {
    return s === i ? (n.consume(s), r++, u) : (n.exit("thematicBreakSequence"), M(s) ? j(n, a, "whitespace")(s) : a(s));
  }
}
const Y = {
  name: "list",
  tokenize: Ml,
  continuation: {
    tokenize: Bl
  },
  exit: _l
}, Nl = {
  tokenize: jl,
  partial: !0
}, Rl = {
  tokenize: vl,
  partial: !0
};
function Ml(n, e, t) {
  const r = this, i = r.events[r.events.length - 1];
  let l = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return a;
  function a(p) {
    const y = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (y === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : he(p)) {
      if (r.containerState.type || (r.containerState.type = y, n.enter(y, {
        _container: !0
      })), y === "listUnordered")
        return n.enter("listItemPrefix"), p === 42 || p === 45 ? n.check(Hn, t, s)(p) : s(p);
      if (!r.interrupt || p === 49)
        return n.enter("listItemPrefix"), n.enter("listItemValue"), u(p);
    }
    return t(p);
  }
  function u(p) {
    return he(p) && ++o < 10 ? (n.consume(p), u) : (!r.interrupt || o < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (n.exit("listItemValue"), s(p)) : t(p);
  }
  function s(p) {
    return n.enter("listItemMarker"), n.consume(p), n.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, n.check(
      Wn,
      // Can’t be empty when interrupting.
      r.interrupt ? t : c,
      n.attempt(
        Nl,
        d,
        f
      )
    );
  }
  function c(p) {
    return r.containerState.initialBlankLine = !0, l++, d(p);
  }
  function f(p) {
    return M(p) ? (n.enter("listItemPrefixWhitespace"), n.consume(p), n.exit("listItemPrefixWhitespace"), d) : t(p);
  }
  function d(p) {
    return r.containerState.size = l + r.sliceSerialize(n.exit("listItemPrefix"), !0).length, e(p);
  }
}
function Bl(n, e, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, n.check(Wn, i, l);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, j(
      n,
      e,
      "listItemIndent",
      r.containerState.size + 1
    )(a);
  }
  function l(a) {
    return r.containerState.furtherBlankLines || !M(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, n.attempt(Rl, e, o)(a));
  }
  function o(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, j(
      n,
      n.attempt(Y, e, t),
      "linePrefix",
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    )(a);
  }
}
function vl(n, e, t) {
  const r = this;
  return j(
    n,
    i,
    "listItemIndent",
    r.containerState.size + 1
  );
  function i(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? e(l) : t(l);
  }
}
function _l(n) {
  n.exit(this.containerState.type);
}
function jl(n, e, t) {
  const r = this;
  return j(
    n,
    i,
    "listItemPrefixWhitespace",
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1
  );
  function i(l) {
    const o = r.events[r.events.length - 1];
    return !M(l) && o && o[1].type === "listItemPrefixWhitespace" ? e(l) : t(l);
  }
}
const Je = {
  name: "setextUnderline",
  tokenize: Ul,
  resolveTo: Hl
};
function Hl(n, e) {
  let t = n.length, r, i, l;
  for (; t--; )
    if (n[t][0] === "enter") {
      if (n[t][1].type === "content") {
        r = t;
        break;
      }
      n[t][1].type === "paragraph" && (i = t);
    } else
      n[t][1].type === "content" && n.splice(t, 1), !l && n[t][1].type === "definition" && (l = t);
  const o = {
    type: "setextHeading",
    start: Object.assign({}, n[i][1].start),
    end: Object.assign({}, n[n.length - 1][1].end)
  };
  return n[i][1].type = "setextHeadingText", l ? (n.splice(i, 0, ["enter", o, e]), n.splice(l + 1, 0, ["exit", n[r][1], e]), n[r][1].end = Object.assign({}, n[l][1].end)) : n[r][1] = o, n.push(["exit", o, e]), n;
}
function Ul(n, e, t) {
  const r = this;
  let i;
  return l;
  function l(s) {
    let c = r.events.length, f;
    for (; c--; )
      if (r.events[c][1].type !== "lineEnding" && r.events[c][1].type !== "linePrefix" && r.events[c][1].type !== "content") {
        f = r.events[c][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || f) ? (n.enter("setextHeadingLine"), i = s, o(s)) : t(s);
  }
  function o(s) {
    return n.enter("setextHeadingLineSequence"), a(s);
  }
  function a(s) {
    return s === i ? (n.consume(s), a) : (n.exit("setextHeadingLineSequence"), M(s) ? j(n, u, "lineSuffix")(s) : u(s));
  }
  function u(s) {
    return s === null || T(s) ? (n.exit("setextHeadingLine"), e(s)) : t(s);
  }
}
const ql = {
  tokenize: Vl
};
function Vl(n) {
  const e = this, t = n.attempt(
    // Try to parse a blank line.
    Wn,
    r,
    // Try to parse initial flow (essentially, only code).
    n.attempt(
      this.parser.constructs.flowInitial,
      i,
      j(
        n,
        n.attempt(
          this.parser.constructs.flow,
          i,
          n.attempt(Ki, i)
        ),
        "linePrefix"
      )
    )
  );
  return t;
  function r(l) {
    if (l === null) {
      n.consume(l);
      return;
    }
    return n.enter("lineEndingBlank"), n.consume(l), n.exit("lineEndingBlank"), e.currentConstruct = void 0, t;
  }
  function i(l) {
    if (l === null) {
      n.consume(l);
      return;
    }
    return n.enter("lineEnding"), n.consume(l), n.exit("lineEnding"), e.currentConstruct = void 0, t;
  }
}
const $l = {
  resolveAll: Yt()
}, Wl = Kt("string"), Ql = Kt("text");
function Kt(n) {
  return {
    tokenize: e,
    resolveAll: Yt(
      n === "text" ? Xl : void 0
    )
  };
  function e(t) {
    const r = this, i = this.parser.constructs[n], l = t.attempt(i, o, a);
    return o;
    function o(c) {
      return s(c) ? l(c) : a(c);
    }
    function a(c) {
      if (c === null) {
        t.consume(c);
        return;
      }
      return t.enter("data"), t.consume(c), u;
    }
    function u(c) {
      return s(c) ? (t.exit("data"), l(c)) : (t.consume(c), u);
    }
    function s(c) {
      if (c === null)
        return !0;
      const f = i[c];
      let d = -1;
      if (f)
        for (; ++d < f.length; ) {
          const p = f[d];
          if (!p.previous || p.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Yt(n) {
  return e;
  function e(t, r) {
    let i = -1, l;
    for (; ++i <= t.length; )
      l === void 0 ? t[i] && t[i][1].type === "data" && (l = i, i++) : (!t[i] || t[i][1].type !== "data") && (i !== l + 2 && (t[l][1].end = t[i - 1][1].end, t.splice(l + 2, i - l - 2), i = l + 2), l = void 0);
    return n ? n(t, r) : t;
  }
}
function Xl(n, e) {
  let t = 0;
  for (; ++t <= n.length; )
    if ((t === n.length || n[t][1].type === "lineEnding") && n[t - 1][1].type === "data") {
      const r = n[t - 1][1], i = e.sliceStream(r);
      let l = i.length, o = -1, a = 0, u;
      for (; l--; ) {
        const s = i[l];
        if (typeof s == "string") {
          for (o = s.length; s.charCodeAt(o - 1) === 32; )
            a++, o--;
          if (o)
            break;
          o = -1;
        } else if (s === -2)
          u = !0, a++;
        else if (s !== -1) {
          l++;
          break;
        }
      }
      if (a) {
        const s = {
          type: t === n.length || u || a < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            line: r.end.line,
            column: r.end.column - a,
            offset: r.end.offset - a,
            _index: r.start._index + l,
            _bufferIndex: l ? o : r.start._bufferIndex + o
          },
          end: Object.assign({}, r.end)
        };
        r.end = Object.assign({}, s.start), r.start.offset === r.end.offset ? Object.assign(r, s) : (n.splice(
          t,
          0,
          ["enter", s, e],
          ["exit", s, e]
        ), t += 2);
      }
      t++;
    }
  return n;
}
function Kl(n, e, t) {
  let r = Object.assign(
    t ? Object.assign({}, t) : {
      line: 1,
      column: 1,
      offset: 0
    },
    {
      _index: 0,
      _bufferIndex: -1
    }
  );
  const i = {}, l = [];
  let o = [], a = [];
  const u = {
    consume: E,
    enter: C,
    exit: N,
    attempt: R(O),
    check: R(x),
    interrupt: R(x, {
      interrupt: !0
    })
  }, s = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser: n,
    sliceStream: p,
    sliceSerialize: d,
    now: y,
    defineSkip: k,
    write: f
  };
  let c = e.tokenize.call(s, u);
  return e.resolveAll && l.push(e), s;
  function f(P) {
    return o = en(o, P), I(), o[o.length - 1] !== null ? [] : (q(e, 0), s.events = Ce(l, s.events, s), s.events);
  }
  function d(P, A) {
    return Gl(p(P), A);
  }
  function p(P) {
    return Yl(o, P);
  }
  function y() {
    const { line: P, column: A, offset: U, _index: V, _bufferIndex: F } = r;
    return {
      line: P,
      column: A,
      offset: U,
      _index: V,
      _bufferIndex: F
    };
  }
  function k(P) {
    i[P.line] = P.column, H();
  }
  function I() {
    let P;
    for (; r._index < o.length; ) {
      const A = o[r._index];
      if (typeof A == "string")
        for (P = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === P && r._bufferIndex < A.length; )
          b(A.charCodeAt(r._bufferIndex));
      else
        b(A);
    }
  }
  function b(P) {
    c = c(P);
  }
  function E(P) {
    T(P) ? (r.line++, r.column = 1, r.offset += P === -3 ? 2 : 1, H()) : P !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === o[r._index].length && (r._bufferIndex = -1, r._index++)), s.previous = P;
  }
  function C(P, A) {
    const U = A || {};
    return U.type = P, U.start = y(), s.events.push(["enter", U, s]), a.push(U), U;
  }
  function N(P) {
    const A = a.pop();
    return A.end = y(), s.events.push(["exit", A, s]), A;
  }
  function O(P, A) {
    q(P, A.from);
  }
  function x(P, A) {
    A.restore();
  }
  function R(P, A) {
    return U;
    function U(V, F, X) {
      let W, rn, pn, h;
      return Array.isArray(V) ? fn(V) : "tokenize" in V ? (
        // @ts-expect-error Looks like a construct.
        fn([V])
      ) : ln(V);
      function ln(Q) {
        return Ln;
        function Ln(dn) {
          const En = dn !== null && Q[dn], kn = dn !== null && Q.null, Yn = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(En) ? En : En ? [En] : [],
            ...Array.isArray(kn) ? kn : kn ? [kn] : []
          ];
          return fn(Yn)(dn);
        }
      }
      function fn(Q) {
        return W = Q, rn = 0, Q.length === 0 ? X : m(Q[rn]);
      }
      function m(Q) {
        return Ln;
        function Ln(dn) {
          return h = v(), pn = Q, Q.partial || (s.currentConstruct = Q), Q.name && s.parser.constructs.disable.null.includes(Q.name) ? xn() : Q.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            A ? Object.assign(Object.create(s), A) : s,
            u,
            on,
            xn
          )(dn);
        }
      }
      function on(Q) {
        return P(pn, h), F;
      }
      function xn(Q) {
        return h.restore(), ++rn < W.length ? m(W[rn]) : X;
      }
    }
  }
  function q(P, A) {
    P.resolveAll && !l.includes(P) && l.push(P), P.resolve && cn(
      s.events,
      A,
      s.events.length - A,
      P.resolve(s.events.slice(A), s)
    ), P.resolveTo && (s.events = P.resolveTo(s.events, s));
  }
  function v() {
    const P = y(), A = s.previous, U = s.currentConstruct, V = s.events.length, F = Array.from(a);
    return {
      restore: X,
      from: V
    };
    function X() {
      r = P, s.previous = A, s.currentConstruct = U, s.events.length = V, a = F, H();
    }
  }
  function H() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Yl(n, e) {
  const t = e.start._index, r = e.start._bufferIndex, i = e.end._index, l = e.end._bufferIndex;
  let o;
  if (t === i)
    o = [n[t].slice(r, l)];
  else {
    if (o = n.slice(t, i), r > -1) {
      const a = o[0];
      typeof a == "string" ? o[0] = a.slice(r) : o.shift();
    }
    l > 0 && o.push(n[i].slice(0, l));
  }
  return o;
}
function Gl(n, e) {
  let t = -1;
  const r = [];
  let i;
  for (; ++t < n.length; ) {
    const l = n[t];
    let o;
    if (typeof l == "string")
      o = l;
    else
      switch (l) {
        case -5: {
          o = "\r";
          break;
        }
        case -4: {
          o = `
`;
          break;
        }
        case -3: {
          o = `\r
`;
          break;
        }
        case -2: {
          o = e ? " " : "	";
          break;
        }
        case -1: {
          if (!e && i)
            continue;
          o = " ";
          break;
        }
        default:
          o = String.fromCharCode(l);
      }
    i = l === -2, r.push(o);
  }
  return r.join("");
}
const Zl = {
  42: Y,
  43: Y,
  45: Y,
  48: Y,
  49: Y,
  50: Y,
  51: Y,
  52: Y,
  53: Y,
  54: Y,
  55: Y,
  56: Y,
  57: Y,
  62: Ut
}, Jl = {
  91: nl
}, no = {
  [-2]: ne,
  [-1]: ne,
  32: ne
}, eo = {
  35: ol,
  42: Hn,
  45: [Je, Hn],
  60: cl,
  61: Je,
  95: Hn,
  96: Ge,
  126: Ge
}, to = {
  38: Vt,
  92: qt
}, ro = {
  [-5]: ee,
  [-4]: ee,
  [-3]: ee,
  33: Tl,
  38: Vt,
  42: me,
  60: [Oi, yl],
  91: Ll,
  92: [il, qt],
  93: Ee,
  95: me,
  96: Vi
}, io = {
  null: [me, $l]
}, lo = {
  null: [42, 95]
}, oo = {
  null: []
}, ao = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: lo,
  contentInitial: Jl,
  disable: oo,
  document: Zl,
  flow: eo,
  flowInitial: no,
  insideSpan: io,
  string: to,
  text: ro
}, Symbol.toStringTag, { value: "Module" }));
function uo(n) {
  const t = (
    /** @type {FullNormalizedExtension} */
    wi([ao, ...(n || {}).extensions || []])
  ), r = {
    defined: [],
    lazy: {},
    constructs: t,
    content: i(Ei),
    document: i(Ai),
    flow: i(ql),
    string: i(Wl),
    text: i(Ql)
  };
  return r;
  function i(l) {
    return o;
    function o(a) {
      return Kl(r, l, a);
    }
  }
}
function so(n) {
  for (; !$t(n); )
    ;
  return n;
}
const nt = /[\0\t\n\r]/g;
function co() {
  let n = 1, e = "", t = !0, r;
  return i;
  function i(l, o, a) {
    const u = [];
    let s, c, f, d, p;
    for (l = e + (typeof l == "string" ? l.toString() : new TextDecoder(o || void 0).decode(l)), f = 0, e = "", t && (l.charCodeAt(0) === 65279 && f++, t = void 0); f < l.length; ) {
      if (nt.lastIndex = f, s = nt.exec(l), d = s && s.index !== void 0 ? s.index : l.length, p = l.charCodeAt(d), !s) {
        e = l.slice(f);
        break;
      }
      if (p === 10 && f === d && r)
        u.push(-3), r = void 0;
      else
        switch (r && (u.push(-5), r = void 0), f < d && (u.push(l.slice(f, d)), n += d - f), p) {
          case 0: {
            u.push(65533), n++;
            break;
          }
          case 9: {
            for (c = Math.ceil(n / 4) * 4, u.push(-2); n++ < c; )
              u.push(-1);
            break;
          }
          case 10: {
            u.push(-4), n = 1;
            break;
          }
          default:
            r = !0, n = 1;
        }
      f = d + 1;
    }
    return a && (r && u.push(-5), e && u.push(e), u.push(null)), u;
  }
}
const po = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function fo(n) {
  return n.replace(po, ho);
}
function ho(n, e, t) {
  if (e)
    return e;
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1), l = i === 120 || i === 88;
    return Ht(t.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return Se(t) || n;
}
const Gt = {}.hasOwnProperty;
function mo(n, e, t) {
  return typeof e != "string" && (t = e, e = void 0), go(t)(
    so(
      uo(t).document().write(co()(n, e, !0))
    )
  );
}
function go(n) {
  const e = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(Fe),
      autolinkProtocol: v,
      autolinkEmail: v,
      atxHeading: l(Le),
      blockQuote: l(En),
      characterEscape: v,
      characterReference: v,
      codeFenced: l(kn),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: l(kn, o),
      codeText: l(Yn, o),
      codeTextData: v,
      data: v,
      codeFlowValue: v,
      definition: l(cr),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: l(pr),
      hardBreakEscape: l(Oe),
      hardBreakTrailing: l(Oe),
      htmlFlow: l(De, o),
      htmlFlowData: v,
      htmlText: l(De, o),
      htmlTextData: v,
      image: l(fr),
      label: o,
      link: l(Fe),
      listItem: l(hr),
      listItemValue: d,
      listOrdered: l(Ne, f),
      listUnordered: l(Ne),
      paragraph: l(mr),
      reference: m,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: l(Le),
      strong: l(dr),
      thematicBreak: l(yr)
    },
    exit: {
      atxHeading: u(),
      atxHeadingSequence: O,
      autolink: u(),
      autolinkEmail: dn,
      autolinkProtocol: Ln,
      blockQuote: u(),
      characterEscapeValue: H,
      characterReferenceMarkerHexadecimal: xn,
      characterReferenceMarkerNumeric: xn,
      characterReferenceValue: Q,
      codeFenced: u(I),
      codeFencedFence: k,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: y,
      codeFlowValue: H,
      codeIndented: u(b),
      codeText: u(F),
      codeTextData: H,
      data: H,
      definition: u(),
      definitionDestinationString: N,
      definitionLabelString: E,
      definitionTitleString: C,
      emphasis: u(),
      hardBreakEscape: u(A),
      hardBreakTrailing: u(A),
      htmlFlow: u(U),
      htmlFlowData: H,
      htmlText: u(V),
      htmlTextData: H,
      image: u(W),
      label: pn,
      labelText: rn,
      lineEnding: P,
      link: u(X),
      listItem: u(),
      listOrdered: u(),
      listUnordered: u(),
      paragraph: u(),
      referenceString: on,
      resourceDestinationString: h,
      resourceTitleString: ln,
      resource: fn,
      setextHeading: u(q),
      setextHeadingLineSequence: R,
      setextHeadingText: x,
      strong: u(),
      thematicBreak: u()
    }
  };
  Zt(e, (n || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(g) {
    let S = {
      type: "root",
      children: []
    };
    const z = {
      stack: [S],
      tokenStack: [],
      config: e,
      enter: a,
      exit: s,
      buffer: o,
      resume: c,
      data: t
    }, D = [];
    let B = -1;
    for (; ++B < g.length; )
      if (g[B][1].type === "listOrdered" || g[B][1].type === "listUnordered")
        if (g[B][0] === "enter")
          D.push(B);
        else {
          const an = D.pop();
          B = i(g, an, B);
        }
    for (B = -1; ++B < g.length; ) {
      const an = e[g[B][0]];
      Gt.call(an, g[B][1].type) && an[g[B][1].type].call(
        Object.assign(
          {
            sliceSerialize: g[B][2].sliceSerialize
          },
          z
        ),
        g[B][1]
      );
    }
    if (z.tokenStack.length > 0) {
      const an = z.tokenStack[z.tokenStack.length - 1];
      (an[1] || et).call(z, void 0, an[0]);
    }
    for (S.position = {
      start: gn(
        g.length > 0 ? g[0][1].start : {
          line: 1,
          column: 1,
          offset: 0
        }
      ),
      end: gn(
        g.length > 0 ? g[g.length - 2][1].end : {
          line: 1,
          column: 1,
          offset: 0
        }
      )
    }, B = -1; ++B < e.transforms.length; )
      S = e.transforms[B](S) || S;
    return S;
  }
  function i(g, S, z) {
    let D = S - 1, B = -1, an = !1, bn, hn, On, Dn;
    for (; ++D <= z; ) {
      const Z = g[D];
      switch (Z[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Z[0] === "enter" ? B++ : B--, Dn = void 0;
          break;
        }
        case "lineEndingBlank": {
          Z[0] === "enter" && (bn && !Dn && !B && !On && (On = D), Dn = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Dn = void 0;
      }
      if (!B && Z[0] === "enter" && Z[1].type === "listItemPrefix" || B === -1 && Z[0] === "exit" && (Z[1].type === "listUnordered" || Z[1].type === "listOrdered")) {
        if (bn) {
          let In = D;
          for (hn = void 0; In--; ) {
            const mn = g[In];
            if (mn[1].type === "lineEnding" || mn[1].type === "lineEndingBlank") {
              if (mn[0] === "exit")
                continue;
              hn && (g[hn][1].type = "lineEndingBlank", an = !0), mn[1].type = "lineEnding", hn = In;
            } else if (!(mn[1].type === "linePrefix" || mn[1].type === "blockQuotePrefix" || mn[1].type === "blockQuotePrefixWhitespace" || mn[1].type === "blockQuoteMarker" || mn[1].type === "listItemIndent"))
              break;
          }
          On && (!hn || On < hn) && (bn._spread = !0), bn.end = Object.assign(
            {},
            hn ? g[hn][1].start : Z[1].end
          ), g.splice(hn || D, 0, ["exit", bn, Z[2]]), D++, z++;
        }
        if (Z[1].type === "listItemPrefix") {
          const In = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Z[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          bn = In, g.splice(D, 0, ["enter", In, Z[2]]), D++, z++, On = void 0, Dn = !0;
        }
      }
    }
    return g[S][1]._spread = an, z;
  }
  function l(g, S) {
    return z;
    function z(D) {
      a.call(this, g(D), D), S && S.call(this, D);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(g, S, z) {
    this.stack[this.stack.length - 1].children.push(g), this.stack.push(g), this.tokenStack.push([S, z]), g.position = {
      start: gn(S.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function u(g) {
    return S;
    function S(z) {
      g && g.call(this, z), s.call(this, z);
    }
  }
  function s(g, S) {
    const z = this.stack.pop(), D = this.tokenStack.pop();
    if (D)
      D[0].type !== g.type && (S ? S.call(this, g, D[0]) : (D[1] || et).call(this, g, D[0]));
    else
      throw new Error(
        "Cannot close `" + g.type + "` (" + Nn({
          start: g.start,
          end: g.end
        }) + "): it’s not open"
      );
    z.position.end = gn(g.end);
  }
  function c() {
    return ki(this.stack.pop());
  }
  function f() {
    this.data.expectingFirstListItemValue = !0;
  }
  function d(g) {
    if (this.data.expectingFirstListItemValue) {
      const S = this.stack[this.stack.length - 2];
      S.start = Number.parseInt(this.sliceSerialize(g), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const g = this.resume(), S = this.stack[this.stack.length - 1];
    S.lang = g;
  }
  function y() {
    const g = this.resume(), S = this.stack[this.stack.length - 1];
    S.meta = g;
  }
  function k() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function I() {
    const g = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = g.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function b() {
    const g = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = g.replace(/(\r?\n|\r)$/g, "");
  }
  function E(g) {
    const S = this.resume(), z = this.stack[this.stack.length - 1];
    z.label = S, z.identifier = Tn(
      this.sliceSerialize(g)
    ).toLowerCase();
  }
  function C() {
    const g = this.resume(), S = this.stack[this.stack.length - 1];
    S.title = g;
  }
  function N() {
    const g = this.resume(), S = this.stack[this.stack.length - 1];
    S.url = g;
  }
  function O(g) {
    const S = this.stack[this.stack.length - 1];
    if (!S.depth) {
      const z = this.sliceSerialize(g).length;
      S.depth = z;
    }
  }
  function x() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function R(g) {
    const S = this.stack[this.stack.length - 1];
    S.depth = this.sliceSerialize(g).codePointAt(0) === 61 ? 1 : 2;
  }
  function q() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function v(g) {
    const z = this.stack[this.stack.length - 1].children;
    let D = z[z.length - 1];
    (!D || D.type !== "text") && (D = gr(), D.position = {
      start: gn(g.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, z.push(D)), this.stack.push(D);
  }
  function H(g) {
    const S = this.stack.pop();
    S.value += this.sliceSerialize(g), S.position.end = gn(g.end);
  }
  function P(g) {
    const S = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const z = S.children[S.children.length - 1];
      z.position.end = gn(g.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && e.canContainEols.includes(S.type) && (v.call(this, g), H.call(this, g));
  }
  function A() {
    this.data.atHardBreak = !0;
  }
  function U() {
    const g = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = g;
  }
  function V() {
    const g = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = g;
  }
  function F() {
    const g = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = g;
  }
  function X() {
    const g = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const S = this.data.referenceType || "shortcut";
      g.type += "Reference", g.referenceType = S, delete g.url, delete g.title;
    } else
      delete g.identifier, delete g.label;
    this.data.referenceType = void 0;
  }
  function W() {
    const g = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const S = this.data.referenceType || "shortcut";
      g.type += "Reference", g.referenceType = S, delete g.url, delete g.title;
    } else
      delete g.identifier, delete g.label;
    this.data.referenceType = void 0;
  }
  function rn(g) {
    const S = this.sliceSerialize(g), z = this.stack[this.stack.length - 2];
    z.label = fo(S), z.identifier = Tn(S).toLowerCase();
  }
  function pn() {
    const g = this.stack[this.stack.length - 1], S = this.resume(), z = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, z.type === "link") {
      const D = g.children;
      z.children = D;
    } else
      z.alt = S;
  }
  function h() {
    const g = this.resume(), S = this.stack[this.stack.length - 1];
    S.url = g;
  }
  function ln() {
    const g = this.resume(), S = this.stack[this.stack.length - 1];
    S.title = g;
  }
  function fn() {
    this.data.inReference = void 0;
  }
  function m() {
    this.data.referenceType = "collapsed";
  }
  function on(g) {
    const S = this.resume(), z = this.stack[this.stack.length - 1];
    z.label = S, z.identifier = Tn(
      this.sliceSerialize(g)
    ).toLowerCase(), this.data.referenceType = "full";
  }
  function xn(g) {
    this.data.characterReferenceType = g.type;
  }
  function Q(g) {
    const S = this.sliceSerialize(g), z = this.data.characterReferenceType;
    let D;
    z ? (D = Ht(
      S,
      z === "characterReferenceMarkerNumeric" ? 10 : 16
    ), this.data.characterReferenceType = void 0) : D = Se(S);
    const B = this.stack.pop();
    B.value += D, B.position.end = gn(g.end);
  }
  function Ln(g) {
    H.call(this, g);
    const S = this.stack[this.stack.length - 1];
    S.url = this.sliceSerialize(g);
  }
  function dn(g) {
    H.call(this, g);
    const S = this.stack[this.stack.length - 1];
    S.url = "mailto:" + this.sliceSerialize(g);
  }
  function En() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function kn() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Yn() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function cr() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function pr() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Le() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Oe() {
    return {
      type: "break"
    };
  }
  function De() {
    return {
      type: "html",
      value: ""
    };
  }
  function fr() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Fe() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Ne(g) {
    return {
      type: "list",
      ordered: g.type === "listOrdered",
      start: null,
      spread: g._spread,
      children: []
    };
  }
  function hr(g) {
    return {
      type: "listItem",
      spread: g._spread,
      checked: null,
      children: []
    };
  }
  function mr() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function dr() {
    return {
      type: "strong",
      children: []
    };
  }
  function gr() {
    return {
      type: "text",
      value: ""
    };
  }
  function yr() {
    return {
      type: "thematicBreak"
    };
  }
}
function gn(n) {
  return {
    line: n.line,
    column: n.column,
    offset: n.offset
  };
}
function Zt(n, e) {
  let t = -1;
  for (; ++t < e.length; ) {
    const r = e[t];
    Array.isArray(r) ? Zt(n, r) : yo(n, r);
  }
}
function yo(n, e) {
  let t;
  for (t in e)
    if (Gt.call(e, t))
      switch (t) {
        case "canContainEols": {
          const r = e[t];
          r && n[t].push(...r);
          break;
        }
        case "transforms": {
          const r = e[t];
          r && n[t].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = e[t];
          r && Object.assign(n[t], r);
          break;
        }
      }
}
function et(n, e) {
  throw n ? new Error(
    "Cannot close `" + n.type + "` (" + Nn({
      start: n.start,
      end: n.end
    }) + "): a different token (`" + e.type + "`, " + Nn({
      start: e.start,
      end: e.end
    }) + ") is open"
  ) : new Error(
    "Cannot close document, a token (`" + e.type + "`, " + Nn({
      start: e.start,
      end: e.end
    }) + ") is still open"
  );
}
function xo(n) {
  const e = this;
  e.parser = t;
  function t(r) {
    return mo(r, {
      ...e.data("settings"),
      ...n,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: e.data("micromarkExtensions") || [],
      mdastExtensions: e.data("fromMarkdownExtensions") || []
    });
  }
}
function ko(n, e) {
  const t = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: n.wrap(n.all(e), !0)
  };
  return n.patch(e, t), n.applyData(e, t);
}
function bo(n, e) {
  const t = { type: "element", tagName: "br", properties: {}, children: [] };
  return n.patch(e, t), [n.applyData(e, t), { type: "text", value: `
` }];
}
function wo(n, e) {
  const t = e.value ? e.value + `
` : "", r = {};
  e.lang && (r.className = ["language-" + e.lang]);
  let i = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: t }]
  };
  return e.meta && (i.data = { meta: e.meta }), n.patch(e, i), i = n.applyData(e, i), i = { type: "element", tagName: "pre", properties: {}, children: [i] }, n.patch(e, i), i;
}
function So(n, e) {
  const t = {
    type: "element",
    tagName: "del",
    properties: {},
    children: n.all(e)
  };
  return n.patch(e, t), n.applyData(e, t);
}
function Co(n, e) {
  const t = {
    type: "element",
    tagName: "em",
    properties: {},
    children: n.all(e)
  };
  return n.patch(e, t), n.applyData(e, t);
}
function Eo(n, e) {
  const t = typeof n.options.clobberPrefix == "string" ? n.options.clobberPrefix : "user-content-", r = String(e.identifier).toUpperCase(), i = Cn(r.toLowerCase()), l = n.footnoteOrder.indexOf(r);
  let o, a = n.footnoteCounts.get(r);
  a === void 0 ? (a = 0, n.footnoteOrder.push(r), o = n.footnoteOrder.length) : o = l + 1, a += 1, n.footnoteCounts.set(r, a);
  const u = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + t + "fn-" + i,
      id: t + "fnref-" + i + (a > 1 ? "-" + a : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(o) }]
  };
  n.patch(e, u);
  const s = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [u]
  };
  return n.patch(e, s), n.applyData(e, s);
}
function Io(n, e) {
  const t = {
    type: "element",
    tagName: "h" + e.depth,
    properties: {},
    children: n.all(e)
  };
  return n.patch(e, t), n.applyData(e, t);
}
function Ao(n, e) {
  if (n.options.allowDangerousHtml) {
    const t = { type: "raw", value: e.value };
    return n.patch(e, t), n.applyData(e, t);
  }
}
function Jt(n, e) {
  const t = e.referenceType;
  let r = "]";
  if (t === "collapsed" ? r += "[]" : t === "full" && (r += "[" + (e.label || e.identifier) + "]"), e.type === "imageReference")
    return [{ type: "text", value: "![" + e.alt + r }];
  const i = n.all(e), l = i[0];
  l && l.type === "text" ? l.value = "[" + l.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function Po(n, e) {
  const t = String(e.identifier).toUpperCase(), r = n.definitionById.get(t);
  if (!r)
    return Jt(n, e);
  const i = { src: Cn(r.url || ""), alt: e.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = { type: "element", tagName: "img", properties: i, children: [] };
  return n.patch(e, l), n.applyData(e, l);
}
function To(n, e) {
  const t = { src: Cn(e.url) };
  e.alt !== null && e.alt !== void 0 && (t.alt = e.alt), e.title !== null && e.title !== void 0 && (t.title = e.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return n.patch(e, r), n.applyData(e, r);
}
function zo(n, e) {
  const t = { type: "text", value: e.value.replace(/\r?\n|\r/g, " ") };
  n.patch(e, t);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [t]
  };
  return n.patch(e, r), n.applyData(e, r);
}
function Lo(n, e) {
  const t = String(e.identifier).toUpperCase(), r = n.definitionById.get(t);
  if (!r)
    return Jt(n, e);
  const i = { href: Cn(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = {
    type: "element",
    tagName: "a",
    properties: i,
    children: n.all(e)
  };
  return n.patch(e, l), n.applyData(e, l);
}
function Oo(n, e) {
  const t = { href: Cn(e.url) };
  e.title !== null && e.title !== void 0 && (t.title = e.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: t,
    children: n.all(e)
  };
  return n.patch(e, r), n.applyData(e, r);
}
function Do(n, e, t) {
  const r = n.all(e), i = t ? Fo(t) : nr(e), l = {}, o = [];
  if (typeof e.checked == "boolean") {
    const c = r[0];
    let f;
    c && c.type === "element" && c.tagName === "p" ? f = c : (f = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(f)), f.children.length > 0 && f.children.unshift({ type: "text", value: " " }), f.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: e.checked, disabled: !0 },
      children: []
    }), l.className = ["task-list-item"];
  }
  let a = -1;
  for (; ++a < r.length; ) {
    const c = r[a];
    (i || a !== 0 || c.type !== "element" || c.tagName !== "p") && o.push({ type: "text", value: `
` }), c.type === "element" && c.tagName === "p" && !i ? o.push(...c.children) : o.push(c);
  }
  const u = r[r.length - 1];
  u && (i || u.type !== "element" || u.tagName !== "p") && o.push({ type: "text", value: `
` });
  const s = { type: "element", tagName: "li", properties: l, children: o };
  return n.patch(e, s), n.applyData(e, s);
}
function Fo(n) {
  let e = !1;
  if (n.type === "list") {
    e = n.spread || !1;
    const t = n.children;
    let r = -1;
    for (; !e && ++r < t.length; )
      e = nr(t[r]);
  }
  return e;
}
function nr(n) {
  const e = n.spread;
  return e ?? n.children.length > 1;
}
function No(n, e) {
  const t = {}, r = n.all(e);
  let i = -1;
  for (typeof e.start == "number" && e.start !== 1 && (t.start = e.start); ++i < r.length; ) {
    const o = r[i];
    if (o.type === "element" && o.tagName === "li" && o.properties && Array.isArray(o.properties.className) && o.properties.className.includes("task-list-item")) {
      t.className = ["contains-task-list"];
      break;
    }
  }
  const l = {
    type: "element",
    tagName: e.ordered ? "ol" : "ul",
    properties: t,
    children: n.wrap(r, !0)
  };
  return n.patch(e, l), n.applyData(e, l);
}
function Ro(n, e) {
  const t = {
    type: "element",
    tagName: "p",
    properties: {},
    children: n.all(e)
  };
  return n.patch(e, t), n.applyData(e, t);
}
function Mo(n, e) {
  const t = { type: "root", children: n.wrap(n.all(e)) };
  return n.patch(e, t), n.applyData(e, t);
}
function Bo(n, e) {
  const t = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: n.all(e)
  };
  return n.patch(e, t), n.applyData(e, t);
}
function vo(n, e) {
  const t = n.all(e), r = t.shift(), i = [];
  if (r) {
    const o = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: n.wrap([r], !0)
    };
    n.patch(e.children[0], o), i.push(o);
  }
  if (t.length > 0) {
    const o = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: n.wrap(t, !0)
    }, a = be(e.children[1]), u = Mt(e.children[e.children.length - 1]);
    a && u && (o.position = { start: a, end: u }), i.push(o);
  }
  const l = {
    type: "element",
    tagName: "table",
    properties: {},
    children: n.wrap(i, !0)
  };
  return n.patch(e, l), n.applyData(e, l);
}
function _o(n, e, t) {
  const r = t ? t.children : void 0, l = (r ? r.indexOf(e) : 1) === 0 ? "th" : "td", o = t && t.type === "table" ? t.align : void 0, a = o ? o.length : e.children.length;
  let u = -1;
  const s = [];
  for (; ++u < a; ) {
    const f = e.children[u], d = {}, p = o ? o[u] : void 0;
    p && (d.align = p);
    let y = { type: "element", tagName: l, properties: d, children: [] };
    f && (y.children = n.all(f), n.patch(f, y), y = n.applyData(f, y)), s.push(y);
  }
  const c = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: n.wrap(s, !0)
  };
  return n.patch(e, c), n.applyData(e, c);
}
function jo(n, e) {
  const t = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: n.all(e)
  };
  return n.patch(e, t), n.applyData(e, t);
}
const tt = 9, rt = 32;
function Ho(n) {
  const e = String(n), t = /\r?\n|\r/g;
  let r = t.exec(e), i = 0;
  const l = [];
  for (; r; )
    l.push(
      it(e.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = t.exec(e);
  return l.push(it(e.slice(i), i > 0, !1)), l.join("");
}
function it(n, e, t) {
  let r = 0, i = n.length;
  if (e) {
    let l = n.codePointAt(r);
    for (; l === tt || l === rt; )
      r++, l = n.codePointAt(r);
  }
  if (t) {
    let l = n.codePointAt(i - 1);
    for (; l === tt || l === rt; )
      i--, l = n.codePointAt(i - 1);
  }
  return i > r ? n.slice(r, i) : "";
}
function Uo(n, e) {
  const t = { type: "text", value: Ho(String(e.value)) };
  return n.patch(e, t), n.applyData(e, t);
}
function qo(n, e) {
  const t = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return n.patch(e, t), n.applyData(e, t);
}
const Vo = {
  blockquote: ko,
  break: bo,
  code: wo,
  delete: So,
  emphasis: Co,
  footnoteReference: Eo,
  heading: Io,
  html: Ao,
  imageReference: Po,
  image: To,
  inlineCode: zo,
  linkReference: Lo,
  link: Oo,
  listItem: Do,
  list: No,
  paragraph: Ro,
  // @ts-expect-error: root is different, but hard to type.
  root: Mo,
  strong: Bo,
  table: vo,
  tableCell: jo,
  tableRow: _o,
  text: Uo,
  thematicBreak: qo,
  toml: vn,
  yaml: vn,
  definition: vn,
  footnoteDefinition: vn
};
function vn() {
}
const er = -1, Qn = 0, qn = 1, Vn = 2, Ie = 3, Ae = 4, Pe = 5, Te = 6, tr = 7, rr = 8, lt = typeof self == "object" ? self : globalThis, $o = (n, e) => {
  const t = (i, l) => (n.set(l, i), i), r = (i) => {
    if (n.has(i))
      return n.get(i);
    const [l, o] = e[i];
    switch (l) {
      case Qn:
      case er:
        return t(o, i);
      case qn: {
        const a = t([], i);
        for (const u of o)
          a.push(r(u));
        return a;
      }
      case Vn: {
        const a = t({}, i);
        for (const [u, s] of o)
          a[r(u)] = r(s);
        return a;
      }
      case Ie:
        return t(new Date(o), i);
      case Ae: {
        const { source: a, flags: u } = o;
        return t(new RegExp(a, u), i);
      }
      case Pe: {
        const a = t(/* @__PURE__ */ new Map(), i);
        for (const [u, s] of o)
          a.set(r(u), r(s));
        return a;
      }
      case Te: {
        const a = t(/* @__PURE__ */ new Set(), i);
        for (const u of o)
          a.add(r(u));
        return a;
      }
      case tr: {
        const { name: a, message: u } = o;
        return t(new lt[a](u), i);
      }
      case rr:
        return t(BigInt(o), i);
      case "BigInt":
        return t(Object(BigInt(o)), i);
    }
    return t(new lt[l](o), i);
  };
  return r;
}, ot = (n) => $o(/* @__PURE__ */ new Map(), n)(0), An = "", { toString: Wo } = {}, { keys: Qo } = Object, Fn = (n) => {
  const e = typeof n;
  if (e !== "object" || !n)
    return [Qn, e];
  const t = Wo.call(n).slice(8, -1);
  switch (t) {
    case "Array":
      return [qn, An];
    case "Object":
      return [Vn, An];
    case "Date":
      return [Ie, An];
    case "RegExp":
      return [Ae, An];
    case "Map":
      return [Pe, An];
    case "Set":
      return [Te, An];
  }
  return t.includes("Array") ? [qn, t] : t.includes("Error") ? [tr, t] : [Vn, t];
}, _n = ([n, e]) => n === Qn && (e === "function" || e === "symbol"), Xo = (n, e, t, r) => {
  const i = (o, a) => {
    const u = r.push(o) - 1;
    return t.set(a, u), u;
  }, l = (o) => {
    if (t.has(o))
      return t.get(o);
    let [a, u] = Fn(o);
    switch (a) {
      case Qn: {
        let c = o;
        switch (u) {
          case "bigint":
            a = rr, c = o.toString();
            break;
          case "function":
          case "symbol":
            if (n)
              throw new TypeError("unable to serialize " + u);
            c = null;
            break;
          case "undefined":
            return i([er], o);
        }
        return i([a, c], o);
      }
      case qn: {
        if (u)
          return i([u, [...o]], o);
        const c = [], f = i([a, c], o);
        for (const d of o)
          c.push(l(d));
        return f;
      }
      case Vn: {
        if (u)
          switch (u) {
            case "BigInt":
              return i([u, o.toString()], o);
            case "Boolean":
            case "Number":
            case "String":
              return i([u, o.valueOf()], o);
          }
        if (e && "toJSON" in o)
          return l(o.toJSON());
        const c = [], f = i([a, c], o);
        for (const d of Qo(o))
          (n || !_n(Fn(o[d]))) && c.push([l(d), l(o[d])]);
        return f;
      }
      case Ie:
        return i([a, o.toISOString()], o);
      case Ae: {
        const { source: c, flags: f } = o;
        return i([a, { source: c, flags: f }], o);
      }
      case Pe: {
        const c = [], f = i([a, c], o);
        for (const [d, p] of o)
          (n || !(_n(Fn(d)) || _n(Fn(p)))) && c.push([l(d), l(p)]);
        return f;
      }
      case Te: {
        const c = [], f = i([a, c], o);
        for (const d of o)
          (n || !_n(Fn(d))) && c.push(l(d));
        return f;
      }
    }
    const { message: s } = o;
    return i([a, { name: u, message: s }], o);
  };
  return l;
}, at = (n, { json: e, lossy: t } = {}) => {
  const r = [];
  return Xo(!(e || t), !!e, /* @__PURE__ */ new Map(), r)(n), r;
}, $n = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (n, e) => e && ("json" in e || "lossy" in e) ? ot(at(n, e)) : structuredClone(n)
) : (n, e) => ot(at(n, e));
function Ko(n, e) {
  const t = [{ type: "text", value: "↩" }];
  return e > 1 && t.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(e) }]
  }), t;
}
function Yo(n, e) {
  return "Back to reference " + (n + 1) + (e > 1 ? "-" + e : "");
}
function Go(n) {
  const e = typeof n.options.clobberPrefix == "string" ? n.options.clobberPrefix : "user-content-", t = n.options.footnoteBackContent || Ko, r = n.options.footnoteBackLabel || Yo, i = n.options.footnoteLabel || "Footnotes", l = n.options.footnoteLabelTagName || "h2", o = n.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let u = -1;
  for (; ++u < n.footnoteOrder.length; ) {
    const s = n.footnoteById.get(n.footnoteOrder[u]);
    if (!s)
      continue;
    const c = n.all(s), f = String(s.identifier).toUpperCase(), d = Cn(f.toLowerCase());
    let p = 0;
    const y = [], k = n.footnoteCounts.get(f);
    for (; k !== void 0 && ++p <= k; ) {
      y.length > 0 && y.push({ type: "text", value: " " });
      let E = typeof t == "string" ? t : t(u, p);
      typeof E == "string" && (E = { type: "text", value: E }), y.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + e + "fnref-" + d + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(u, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(E) ? E : [E]
      });
    }
    const I = c[c.length - 1];
    if (I && I.type === "element" && I.tagName === "p") {
      const E = I.children[I.children.length - 1];
      E && E.type === "text" ? E.value += " " : I.children.push({ type: "text", value: " " }), I.children.push(...y);
    } else
      c.push(...y);
    const b = {
      type: "element",
      tagName: "li",
      properties: { id: e + "fn-" + d },
      children: n.wrap(c, !0)
    };
    n.patch(s, b), a.push(b);
  }
  if (a.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: l,
          properties: {
            ...$n(o),
            id: "footnote-label"
          },
          children: [{ type: "text", value: i }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: n.wrap(a, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const ir = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(n) {
    if (n == null)
      return ea;
    if (typeof n == "function")
      return Xn(n);
    if (typeof n == "object")
      return Array.isArray(n) ? Zo(n) : Jo(n);
    if (typeof n == "string")
      return na(n);
    throw new Error("Expected function, string, or object as test");
  }
);
function Zo(n) {
  const e = [];
  let t = -1;
  for (; ++t < n.length; )
    e[t] = ir(n[t]);
  return Xn(r);
  function r(...i) {
    let l = -1;
    for (; ++l < e.length; )
      if (e[l].apply(this, i))
        return !0;
    return !1;
  }
}
function Jo(n) {
  const e = (
    /** @type {Record<string, unknown>} */
    n
  );
  return Xn(t);
  function t(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let l;
    for (l in n)
      if (i[l] !== e[l])
        return !1;
    return !0;
  }
}
function na(n) {
  return Xn(e);
  function e(t) {
    return t && t.type === n;
  }
}
function Xn(n) {
  return e;
  function e(t, r, i) {
    return !!(ta(t) && n.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function ea() {
  return !0;
}
function ta(n) {
  return n !== null && typeof n == "object" && "type" in n;
}
const lr = [], ra = !0, ut = !1, ia = "skip";
function la(n, e, t, r) {
  let i;
  typeof e == "function" && typeof t != "function" ? (r = t, t = e) : i = e;
  const l = ir(i), o = r ? -1 : 1;
  a(n, void 0, [])();
  function a(u, s, c) {
    const f = (
      /** @type {Record<string, unknown>} */
      u && typeof u == "object" ? u : {}
    );
    if (typeof f.type == "string") {
      const p = (
        // `hast`
        typeof f.tagName == "string" ? f.tagName : (
          // `xast`
          typeof f.name == "string" ? f.name : void 0
        )
      );
      Object.defineProperty(d, "name", {
        value: "node (" + (u.type + (p ? "<" + p + ">" : "")) + ")"
      });
    }
    return d;
    function d() {
      let p = lr, y, k, I;
      if ((!e || l(u, s, c[c.length - 1] || void 0)) && (p = oa(t(u, c)), p[0] === ut))
        return p;
      if ("children" in u && u.children) {
        const b = (
          /** @type {UnistParent} */
          u
        );
        if (b.children && p[0] !== ia)
          for (k = (r ? b.children.length : -1) + o, I = c.concat(b); k > -1 && k < b.children.length; ) {
            const E = b.children[k];
            if (y = a(E, k, I)(), y[0] === ut)
              return y;
            k = typeof y[1] == "number" ? y[1] : k + o;
          }
      }
      return p;
    }
  }
}
function oa(n) {
  return Array.isArray(n) ? n : typeof n == "number" ? [ra, n] : n == null ? lr : [n];
}
function aa(n, e, t, r) {
  let i, l, o;
  typeof e == "function" && typeof t != "function" ? (l = void 0, o = e, i = t) : (l = e, o = t, i = r), la(n, l, a, i);
  function a(u, s) {
    const c = s[s.length - 1], f = c ? c.children.indexOf(u) : void 0;
    return o(u, f, c);
  }
}
const de = {}.hasOwnProperty, ua = {};
function sa(n, e) {
  const t = e || ua, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), o = { ...Vo, ...t.handlers }, a = {
    all: s,
    applyData: pa,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: l,
    footnoteOrder: [],
    handlers: o,
    one: u,
    options: t,
    patch: ca,
    wrap: ha
  };
  return aa(n, function(c) {
    if (c.type === "definition" || c.type === "footnoteDefinition") {
      const f = c.type === "definition" ? r : i, d = String(c.identifier).toUpperCase();
      f.has(d) || f.set(d, c);
    }
  }), a;
  function u(c, f) {
    const d = c.type, p = a.handlers[d];
    if (de.call(a.handlers, d) && p)
      return p(a, c, f);
    if (a.options.passThrough && a.options.passThrough.includes(d)) {
      if ("children" in c) {
        const { children: k, ...I } = c, b = $n(I);
        return b.children = a.all(c), b;
      }
      return $n(c);
    }
    return (a.options.unknownHandler || fa)(a, c, f);
  }
  function s(c) {
    const f = [];
    if ("children" in c) {
      const d = c.children;
      let p = -1;
      for (; ++p < d.length; ) {
        const y = a.one(d[p], c);
        if (y) {
          if (p && d[p - 1].type === "break" && (!Array.isArray(y) && y.type === "text" && (y.value = st(y.value)), !Array.isArray(y) && y.type === "element")) {
            const k = y.children[0];
            k && k.type === "text" && (k.value = st(k.value));
          }
          Array.isArray(y) ? f.push(...y) : f.push(y);
        }
      }
    }
    return f;
  }
}
function ca(n, e) {
  n.position && (e.position = Qr(n));
}
function pa(n, e) {
  let t = e;
  if (n && n.data) {
    const r = n.data.hName, i = n.data.hChildren, l = n.data.hProperties;
    if (typeof r == "string")
      if (t.type === "element")
        t.tagName = r;
      else {
        const o = "children" in t ? t.children : [t];
        t = { type: "element", tagName: r, properties: {}, children: o };
      }
    t.type === "element" && l && Object.assign(t.properties, $n(l)), "children" in t && t.children && i !== null && i !== void 0 && (t.children = i);
  }
  return t;
}
function fa(n, e) {
  const t = e.data || {}, r = "value" in e && !(de.call(t, "hProperties") || de.call(t, "hChildren")) ? { type: "text", value: e.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: n.all(e)
  };
  return n.patch(e, r), n.applyData(e, r);
}
function ha(n, e) {
  const t = [];
  let r = -1;
  for (e && t.push({ type: "text", value: `
` }); ++r < n.length; )
    r && t.push({ type: "text", value: `
` }), t.push(n[r]);
  return e && n.length > 0 && t.push({ type: "text", value: `
` }), t;
}
function st(n) {
  let e = 0, t = n.charCodeAt(e);
  for (; t === 9 || t === 32; )
    e++, t = n.charCodeAt(e);
  return n.slice(e);
}
function ct(n, e) {
  const t = sa(n, e), r = t.one(n, void 0), i = Go(t), l = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && l.children.push({ type: "text", value: `
` }, i), l;
}
function ma(n, e) {
  return n && "run" in n ? async function(t, r) {
    const i = (
      /** @type {HastRoot} */
      ct(t, e)
    );
    await n.run(i, r);
  } : function(t) {
    return (
      /** @type {HastRoot} */
      ct(t, e || n)
    );
  };
}
function pt(n) {
  if (n)
    throw n;
}
var Un = Object.prototype.hasOwnProperty, or = Object.prototype.toString, ft = Object.defineProperty, ht = Object.getOwnPropertyDescriptor, mt = function(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : or.call(e) === "[object Array]";
}, dt = function(e) {
  if (!e || or.call(e) !== "[object Object]")
    return !1;
  var t = Un.call(e, "constructor"), r = e.constructor && e.constructor.prototype && Un.call(e.constructor.prototype, "isPrototypeOf");
  if (e.constructor && !t && !r)
    return !1;
  var i;
  for (i in e)
    ;
  return typeof i > "u" || Un.call(e, i);
}, gt = function(e, t) {
  ft && t.name === "__proto__" ? ft(e, t.name, {
    enumerable: !0,
    configurable: !0,
    value: t.newValue,
    writable: !0
  }) : e[t.name] = t.newValue;
}, yt = function(e, t) {
  if (t === "__proto__")
    if (Un.call(e, t)) {
      if (ht)
        return ht(e, t).value;
    } else
      return;
  return e[t];
}, da = function n() {
  var e, t, r, i, l, o, a = arguments[0], u = 1, s = arguments.length, c = !1;
  for (typeof a == "boolean" && (c = a, a = arguments[1] || {}, u = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); u < s; ++u)
    if (e = arguments[u], e != null)
      for (t in e)
        r = yt(a, t), i = yt(e, t), a !== i && (c && i && (dt(i) || (l = mt(i))) ? (l ? (l = !1, o = r && mt(r) ? r : []) : o = r && dt(r) ? r : {}, gt(a, { name: t, newValue: n(c, o, i) })) : typeof i < "u" && gt(a, { name: t, newValue: i }));
  return a;
};
const te = /* @__PURE__ */ (0,_index_51a8fd79_js__WEBPACK_IMPORTED_MODULE_0__.g)(da);
function ge(n) {
  if (typeof n != "object" || n === null)
    return !1;
  const e = Object.getPrototypeOf(n);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in n) && !(Symbol.iterator in n);
}
function ga() {
  const n = [], e = { run: t, use: r };
  return e;
  function t(...i) {
    let l = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    a(null, ...i);
    function a(u, ...s) {
      const c = n[++l];
      let f = -1;
      if (u) {
        o(u);
        return;
      }
      for (; ++f < i.length; )
        (s[f] === null || s[f] === void 0) && (s[f] = i[f]);
      i = s, c ? ya(c, a)(...s) : o(null, ...s);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return n.push(i), e;
  }
}
function ya(n, e) {
  let t;
  return r;
  function r(...o) {
    const a = n.length > o.length;
    let u;
    a && o.push(i);
    try {
      u = n.apply(this, o);
    } catch (s) {
      const c = (
        /** @type {Error} */
        s
      );
      if (a && t)
        throw c;
      return i(c);
    }
    a || (u instanceof Promise ? u.then(l, i) : u instanceof Error ? i(u) : l(u));
  }
  function i(o, ...a) {
    t || (t = !0, e(o, ...a));
  }
  function l(o) {
    i(null, o);
  }
}
const un = { basename: xa, dirname: ka, extname: ba, join: wa, sep: "/" };
function xa(n, e) {
  if (e !== void 0 && typeof e != "string")
    throw new TypeError('"ext" argument must be a string');
  Bn(n);
  let t = 0, r = -1, i = n.length, l;
  if (e === void 0 || e.length === 0 || e.length > n.length) {
    for (; i--; )
      if (n.codePointAt(i) === 47) {
        if (l) {
          t = i + 1;
          break;
        }
      } else
        r < 0 && (l = !0, r = i + 1);
    return r < 0 ? "" : n.slice(t, r);
  }
  if (e === n)
    return "";
  let o = -1, a = e.length - 1;
  for (; i--; )
    if (n.codePointAt(i) === 47) {
      if (l) {
        t = i + 1;
        break;
      }
    } else
      o < 0 && (l = !0, o = i + 1), a > -1 && (n.codePointAt(i) === e.codePointAt(a--) ? a < 0 && (r = i) : (a = -1, r = o));
  return t === r ? r = o : r < 0 && (r = n.length), n.slice(t, r);
}
function ka(n) {
  if (Bn(n), n.length === 0)
    return ".";
  let e = -1, t = n.length, r;
  for (; --t; )
    if (n.codePointAt(t) === 47) {
      if (r) {
        e = t;
        break;
      }
    } else
      r || (r = !0);
  return e < 0 ? n.codePointAt(0) === 47 ? "/" : "." : e === 1 && n.codePointAt(0) === 47 ? "//" : n.slice(0, e);
}
function ba(n) {
  Bn(n);
  let e = n.length, t = -1, r = 0, i = -1, l = 0, o;
  for (; e--; ) {
    const a = n.codePointAt(e);
    if (a === 47) {
      if (o) {
        r = e + 1;
        break;
      }
      continue;
    }
    t < 0 && (o = !0, t = e + 1), a === 46 ? i < 0 ? i = e : l !== 1 && (l = 1) : i > -1 && (l = -1);
  }
  return i < 0 || t < 0 || // We saw a non-dot character immediately before the dot.
  l === 0 || // The (right-most) trimmed path component is exactly `..`.
  l === 1 && i === t - 1 && i === r + 1 ? "" : n.slice(i, t);
}
function wa(...n) {
  let e = -1, t;
  for (; ++e < n.length; )
    Bn(n[e]), n[e] && (t = t === void 0 ? n[e] : t + "/" + n[e]);
  return t === void 0 ? "." : Sa(t);
}
function Sa(n) {
  Bn(n);
  const e = n.codePointAt(0) === 47;
  let t = Ca(n, !e);
  return t.length === 0 && !e && (t = "."), t.length > 0 && n.codePointAt(n.length - 1) === 47 && (t += "/"), e ? "/" + t : t;
}
function Ca(n, e) {
  let t = "", r = 0, i = -1, l = 0, o = -1, a, u;
  for (; ++o <= n.length; ) {
    if (o < n.length)
      a = n.codePointAt(o);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(i === o - 1 || l === 1))
        if (i !== o - 1 && l === 2) {
          if (t.length < 2 || r !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
            if (t.length > 2) {
              if (u = t.lastIndexOf("/"), u !== t.length - 1) {
                u < 0 ? (t = "", r = 0) : (t = t.slice(0, u), r = t.length - 1 - t.lastIndexOf("/")), i = o, l = 0;
                continue;
              }
            } else if (t.length > 0) {
              t = "", r = 0, i = o, l = 0;
              continue;
            }
          }
          e && (t = t.length > 0 ? t + "/.." : "..", r = 2);
        } else
          t.length > 0 ? t += "/" + n.slice(i + 1, o) : t = n.slice(i + 1, o), r = o - i - 1;
      i = o, l = 0;
    } else
      a === 46 && l > -1 ? l++ : l = -1;
  }
  return t;
}
function Bn(n) {
  if (typeof n != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(n)
    );
}
const Ea = { cwd: Ia };
function Ia() {
  return "/";
}
function ye(n) {
  return !!(n !== null && typeof n == "object" && "href" in n && n.href && "protocol" in n && n.protocol && // @ts-expect-error: indexing is fine.
  n.auth === void 0);
}
function Aa(n) {
  if (typeof n == "string")
    n = new URL(n);
  else if (!ye(n)) {
    const e = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + n + "`"
    );
    throw e.code = "ERR_INVALID_ARG_TYPE", e;
  }
  if (n.protocol !== "file:") {
    const e = new TypeError("The URL must be of scheme file");
    throw e.code = "ERR_INVALID_URL_SCHEME", e;
  }
  return Pa(n);
}
function Pa(n) {
  if (n.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const e = n.pathname;
  let t = -1;
  for (; ++t < e.length; )
    if (e.codePointAt(t) === 37 && e.codePointAt(t + 1) === 50) {
      const r = e.codePointAt(t + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(e);
}
const re = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class ar {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(e) {
    let t;
    e ? ye(e) ? t = { path: e } : typeof e == "string" || Ta(e) ? t = { value: e } : t = e : t = {}, this.cwd = Ea.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < re.length; ) {
      const l = re[r];
      l in t && t[l] !== void 0 && t[l] !== null && (this[l] = l === "history" ? [...t[l]] : t[l]);
    }
    let i;
    for (i in t)
      re.includes(i) || (this[i] = t[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? un.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(e) {
    le(e, "basename"), ie(e, "basename"), this.path = un.join(this.dirname || "", e);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? un.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(e) {
    xt(this.basename, "dirname"), this.path = un.join(e || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? un.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(e) {
    if (ie(e, "extname"), xt(this.dirname, "extname"), e) {
      if (e.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (e.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = un.join(this.dirname, this.stem + (e || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(e) {
    ye(e) && (e = Aa(e)), le(e, "path"), this.path !== e && this.history.push(e);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? un.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(e) {
    le(e, "stem"), ie(e, "stem"), this.path = un.join(this.dirname || "", e + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(e, t, r) {
    const i = this.message(e, t, r);
    throw i.fatal = !0, i;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(e, t, r) {
    const i = this.message(e, t, r);
    return i.fatal = void 0, i;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(e, t, r) {
    const i = new K(
      // @ts-expect-error: the overloads are fine.
      e,
      t,
      r
    );
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(e) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(e || void 0).decode(this.value);
  }
}
function ie(n, e) {
  if (n && n.includes(un.sep))
    throw new Error(
      "`" + e + "` cannot be a path: did not expect `" + un.sep + "`"
    );
}
function le(n, e) {
  if (!n)
    throw new Error("`" + e + "` cannot be empty");
}
function xt(n, e) {
  if (!n)
    throw new Error("Setting `" + e + "` requires `path` to be set too");
}
function Ta(n) {
  return !!(n && typeof n == "object" && "byteLength" in n && "byteOffset" in n);
}
const za = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(n) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), i = r[n], l = function() {
      return i.apply(l, arguments);
    };
    Object.setPrototypeOf(l, r);
    const o = Object.getOwnPropertyNames(i);
    for (const a of o) {
      const u = Object.getOwnPropertyDescriptor(i, a);
      u && Object.defineProperty(l, a, u);
    }
    return l;
  }
), La = {}.hasOwnProperty;
class ze extends za {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = ga();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@link Processor `Processor`}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const e = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new ze()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      e.use(...r);
    }
    return e.data(te(!0, {}, this.namespace)), e;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > 👉 **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > 👉 **Note**: to register custom data in TypeScript, augment the
   * > {@link Data `Data`} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(e, t) {
    return typeof e == "string" ? arguments.length === 2 ? (ue("data", this.frozen), this.namespace[e] = t, this) : La.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (ue("data", this.frozen), this.namespace = e, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const e = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [t, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = t.call(e, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > 👉 **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > 👉 **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(e) {
    this.freeze();
    const t = jn(e), r = this.parser || this.Parser;
    return oe("parse", r), r(String(t), t);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > 👉 **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > 👉 **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > 👉 **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@link CompileResultMap `CompileResultMap`}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(e, t) {
    const r = this;
    return this.freeze(), oe("process", this.parser || this.Parser), ae("process", this.compiler || this.Compiler), t ? i(void 0, t) : new Promise(i);
    function i(l, o) {
      const a = jn(e), u = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(u, a, function(c, f, d) {
        if (c || !f || !d)
          return s(c);
        const p = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          f
        ), y = r.stringify(p, d);
        Fa(y) ? d.value = y : d.result = y, s(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          d
        );
      });
      function s(c, f) {
        c || !f ? o(c) : l ? l(f) : t(void 0, f);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > 👉 **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > 👉 **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > 👉 **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@link CompileResultMap `CompileResultMap`}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(e) {
    let t = !1, r;
    return this.freeze(), oe("processSync", this.parser || this.Parser), ae("processSync", this.compiler || this.Compiler), this.process(e, i), bt("processSync", "process", t), r;
    function i(l, o) {
      t = !0, pt(l), r = o;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > 👉 **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > 👉 **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(e, t, r) {
    kt(e), this.freeze();
    const i = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? l(void 0, r) : new Promise(l);
    function l(o, a) {
      const u = jn(t);
      i.run(e, u, s);
      function s(c, f, d) {
        const p = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          f || e
        );
        c ? a(c) : o ? o(p) : r(void 0, p, d);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > 👉 **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > 👉 **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(e, t) {
    let r = !1, i;
    return this.run(e, t, l), bt("runSync", "run", r), i;
    function l(o, a) {
      pt(o), i = a, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > 👉 **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > 👉 **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > 👉 **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@link CompileResultMap `CompileResultMap`}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(e, t) {
    this.freeze();
    const r = jn(t), i = this.compiler || this.Compiler;
    return ae("stringify", i), kt(e), i(e, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > 👉 **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(e, ...t) {
    const r = this.attachers, i = this.namespace;
    if (ue("use", this.frozen), e != null)
      if (typeof e == "function")
        u(e, t);
      else if (typeof e == "object")
        Array.isArray(e) ? a(e) : o(e);
      else
        throw new TypeError("Expected usable value, not `" + e + "`");
    return this;
    function l(s) {
      if (typeof s == "function")
        u(s, []);
      else if (typeof s == "object")
        if (Array.isArray(s)) {
          const [c, ...f] = (
            /** @type {PluginTuple<Array<unknown>>} */
            s
          );
          u(c, f);
        } else
          o(s);
      else
        throw new TypeError("Expected usable value, not `" + s + "`");
    }
    function o(s) {
      if (!("plugins" in s) && !("settings" in s))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      a(s.plugins), s.settings && (i.settings = te(!0, i.settings, s.settings));
    }
    function a(s) {
      let c = -1;
      if (s != null)
        if (Array.isArray(s))
          for (; ++c < s.length; ) {
            const f = s[c];
            l(f);
          }
        else
          throw new TypeError("Expected a list of plugins, not `" + s + "`");
    }
    function u(s, c) {
      let f = -1, d = -1;
      for (; ++f < r.length; )
        if (r[f][0] === s) {
          d = f;
          break;
        }
      if (d === -1)
        r.push([s, ...c]);
      else if (c.length > 0) {
        let [p, ...y] = c;
        const k = r[d][1];
        ge(k) && ge(p) && (p = te(!0, k, p)), r[d] = [s, p, ...y];
      }
    }
  }
}
const Oa = new ze().freeze();
function oe(n, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + n + "` without `parser`");
}
function ae(n, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + n + "` without `compiler`");
}
function ue(n, e) {
  if (e)
    throw new Error(
      "Cannot call `" + n + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function kt(n) {
  if (!ge(n) || typeof n.type != "string")
    throw new TypeError("Expected node, got `" + n + "`");
}
function bt(n, e, t) {
  if (!t)
    throw new Error(
      "`" + n + "` finished async. Use `" + e + "` instead"
    );
}
function jn(n) {
  return Da(n) ? n : new ar(n);
}
function Da(n) {
  return !!(n && typeof n == "object" && "message" in n && "messages" in n);
}
function Fa(n) {
  return typeof n == "string" || Na(n);
}
function Na(n) {
  return !!(n && typeof n == "object" && "byteLength" in n && "byteOffset" in n);
}
const ur = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(n) {
    if (n == null)
      return va;
    if (typeof n == "function")
      return Kn(n);
    if (typeof n == "object")
      return Array.isArray(n) ? Ra(n) : Ma(n);
    if (typeof n == "string")
      return Ba(n);
    throw new Error("Expected function, string, or object as test");
  }
);
function Ra(n) {
  const e = [];
  let t = -1;
  for (; ++t < n.length; )
    e[t] = ur(n[t]);
  return Kn(r);
  function r(...i) {
    let l = -1;
    for (; ++l < e.length; )
      if (e[l].apply(this, i))
        return !0;
    return !1;
  }
}
function Ma(n) {
  const e = (
    /** @type {Record<string, unknown>} */
    n
  );
  return Kn(t);
  function t(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let l;
    for (l in n)
      if (i[l] !== e[l])
        return !1;
    return !0;
  }
}
function Ba(n) {
  return Kn(e);
  function e(t) {
    return t && t.type === n;
  }
}
function Kn(n) {
  return e;
  function e(t, r, i) {
    return !!(_a(t) && n.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function va() {
  return !0;
}
function _a(n) {
  return n !== null && typeof n == "object" && "type" in n;
}
const sr = [], ja = !0, wt = !1, Ha = "skip";
function Ua(n, e, t, r) {
  let i;
  typeof e == "function" && typeof t != "function" ? (r = t, t = e) : i = e;
  const l = ur(i), o = r ? -1 : 1;
  a(n, void 0, [])();
  function a(u, s, c) {
    const f = (
      /** @type {Record<string, unknown>} */
      u && typeof u == "object" ? u : {}
    );
    if (typeof f.type == "string") {
      const p = (
        // `hast`
        typeof f.tagName == "string" ? f.tagName : (
          // `xast`
          typeof f.name == "string" ? f.name : void 0
        )
      );
      Object.defineProperty(d, "name", {
        value: "node (" + (u.type + (p ? "<" + p + ">" : "")) + ")"
      });
    }
    return d;
    function d() {
      let p = sr, y, k, I;
      if ((!e || l(u, s, c[c.length - 1] || void 0)) && (p = qa(t(u, c)), p[0] === wt))
        return p;
      if ("children" in u && u.children) {
        const b = (
          /** @type {UnistParent} */
          u
        );
        if (b.children && p[0] !== Ha)
          for (k = (r ? b.children.length : -1) + o, I = c.concat(b); k > -1 && k < b.children.length; ) {
            const E = b.children[k];
            if (y = a(E, k, I)(), y[0] === wt)
              return y;
            k = typeof y[1] == "number" ? y[1] : k + o;
          }
      }
      return p;
    }
  }
}
function qa(n) {
  return Array.isArray(n) ? n : typeof n == "number" ? [ja, n] : n == null ? sr : [n];
}
function Va(n, e, t, r) {
  let i, l, o;
  typeof e == "function" && typeof t != "function" ? (l = void 0, o = e, i = t) : (l = e, o = t, i = r), Ua(n, l, a, i);
  function a(u, s) {
    const c = s[s.length - 1], f = c ? c.children.indexOf(u) : void 0;
    return o(u, f, c);
  }
}
const St = {}.hasOwnProperty, $a = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Ct = [], Et = { allowDangerousHtml: !0 }, Wa = /^(https?|ircs?|mailto|xmpp)$/i, Qa = [
  { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
  { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
  {
    from: "allowNode",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowElement"
  },
  {
    from: "allowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowedElements"
  },
  {
    from: "disallowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "disallowedElements"
  },
  { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
  { from: "includeElementIndex", id: "#remove-includeelementindex" },
  {
    from: "includeNodeIndex",
    id: "change-includenodeindex-to-includeelementindex"
  },
  { from: "linkTarget", id: "remove-linktarget" },
  { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" },
  { from: "rawSourcePos", id: "#remove-rawsourcepos" },
  { from: "renderers", id: "change-renderers-to-components", to: "components" },
  { from: "source", id: "change-source-to-children", to: "children" },
  { from: "sourcePos", id: "#remove-sourcepos" },
  { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
  { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }
];
function Za(n) {
  const e = n.allowedElements, t = n.allowElement, r = n.children || "", i = n.className, l = n.components, o = n.disallowedElements, a = n.rehypePlugins || Ct, u = n.remarkPlugins || Ct, s = n.remarkRehypeOptions ? { ...n.remarkRehypeOptions, ...Et } : Et, c = n.skipHtml, f = n.unwrapDisallowed, d = n.urlTransform || Xa, p = Oa().use(xo).use(u).use(ma, s).use(a), y = new ar();
  typeof r == "string" && (y.value = r);
  for (const E of Qa)
    Object.hasOwn(n, E.from) && ("" + E.from + (E.to ? "use `" + E.to + "` instead" : "remove it") + $a + E.id, void 0);
  const k = p.parse(y);
  let I = p.runSync(k, y);
  return i && (I = {
    type: "element",
    tagName: "div",
    properties: { className: i },
    // Assume no doctypes.
    children: (
      /** @type {Array<ElementContent>} */
      I.type === "root" ? I.children : [I]
    )
  }), Va(I, b), Jr(I, {
    Fragment: _index_51a8fd79_js__WEBPACK_IMPORTED_MODULE_0__.j.Fragment,
    components: l,
    ignoreInvalidStyle: !0,
    jsx: _index_51a8fd79_js__WEBPACK_IMPORTED_MODULE_0__.j.jsx,
    jsxs: _index_51a8fd79_js__WEBPACK_IMPORTED_MODULE_0__.j.jsxs,
    passKeys: !0,
    passNode: !0
  });
  function b(E, C, N) {
    if (E.type === "raw" && N && typeof C == "number")
      return c ? N.children.splice(C, 1) : N.children[C] = { type: "text", value: E.value }, C;
    if (E.type === "element") {
      let O;
      for (O in Jn)
        if (St.call(Jn, O) && St.call(E.properties, O)) {
          const x = E.properties[O], R = Jn[O];
          (R === null || R.includes(E.tagName)) && (E.properties[O] = d(String(x || ""), O, E));
        }
    }
    if (E.type === "element") {
      let O = e ? !e.includes(E.tagName) : o ? o.includes(E.tagName) : !1;
      if (!O && t && typeof C == "number" && (O = !t(E, C, N)), O && N && typeof C == "number")
        return f && E.children ? N.children.splice(C, 1, ...E.children) : N.children.splice(C, 1), C;
    }
  }
}
function Xa(n) {
  return yi(n, Wa);
}



/***/ })

};
;