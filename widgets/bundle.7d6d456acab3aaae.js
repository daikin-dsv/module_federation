"use strict";(self.webpackChunkwidget_provider=self.webpackChunkwidget_provider||[]).push([["332"],{1064:function(e,t,r){r.d(t,{T$1:function(){return n},anZ:function(){return i},sK3:function(){return o}});let o="#54c3f1",n="#828282",i="#0097e0"},7374:function(e,t,r){var o=r("2552"),n=r("7282"),i=r("9356"),l=r("2657");r("8924");var a=r("7521");r("8916");var s=r("4151"),d=Object.defineProperty,c=Object.getOwnPropertyDescriptor,u=(e,t,r,o)=>{for(var n=o>1?void 0:o?c(t,r):t,i,l=e.length-1;l>=0;l--)(i=e[l])&&(n=(o?i(t,r,n):i(n))||n);return o&&n&&d(t,r,n),n};let f=(0,o.j)(["flex","flex-col","gap-4","size-full","p-3","rounded-lg","bg-ddt-color-common-background-default"],{variants:{outline:{true:["border","border-ddt-color-divider"],false:[]}}}),p=class extends l.v{constructor(){super(...arguments),this.outline=!1}render(){return(0,n.dy)`<div
      class=${f({outline:this.outline})}
    >
      <slot class="text-ddt-color-common-text-primary"></slot>
    </div>`}};p.styles=(0,n.iv)`
    ${(0,n.$m)(s.Z)}

    :host {
      display: block;
      width: 100%;
    }
  `,u([(0,i.Cb)({type:Boolean,reflect:!0})],p.prototype,"outline",2),u([(0,a.r)("daikin-card")],p)},2781:function(e,t,r){var o=r("2552"),n=r("7282"),i=r("9356"),l=r("7270"),a=r("1377"),s=r("2657");r("8924");var d=r("7521");r("8916");var c=r("4151");function u(e,t){return Array.from({length:Math.max(t-e,0)},(t,r)=>e+r)}function f(e,t){return u(e,t).map(e=>({type:"page",page:e}))}var p=Object.defineProperty,h=Object.getOwnPropertyDescriptor,b=(e,t,r,o)=>{for(var n=o>1?void 0:o?h(t,r):t,i,l=e.length-1;l>=0;l--)(i=e[l])&&(n=(o?i(t,r,n):i(n))||n);return o&&n&&p(t,r,n),n};let v=(0,o.j)(["border-0","no-underline","flex","relative","items-center","justify-center","min-w-12","min-h-12","p-1","font-daikinSerif","text-base","not-italic","leading-6","bg-clip-content","focus-visible:outline","focus-visible:outline-2","focus-visible:outline-offset-[-2px]","focus-visible:outline-ddt-color-common-border-focus"],{variants:{active:{true:["text-ddt-color-common-brand-default","focus-visible:text-ddt-color-common-brand-default","font-bold","hover:text-ddt-color-common-brand-hover","hover:bg-ddt-color-common-surface-brand-hover","active:text-ddt-color-common-brand-press","active:bg-ddt-color-common-surface-brand-press","after:bg-ddt-color-common-brand-default","after:content-['']","after:h-1","after:absolute","after:inset-1","after:top-auto"],false:["font-normal","text-ddt-color-common-neutral-default","active:bg-ddt-color-common-surface-neutral-press","active:text-ddt-color-common-neutral-press","hover:bg-ddt-color-common-surface-neutral-hover","hover:text-ddt-color-common-neutral-hover"]}}}),g=(0,o.j)(["relative","border-0","no-underline","flex","items-center","justify-center","w-12","h-12","font-daikinSerif","text-base","not-italic","font-normal","leading-6","text-ddt-color-common-neutral-default"]),m=(0,o.j)(["border-0","no-underline","flex","items-center","justify-center","w-12","h-12","text-ddt-color-common-neutral-default","font-daikinSerif","text-base","not-italic","font-normal","leading-6","enabled:hover:bg-ddt-color-common-surface-neutral-hover","enabled:hover:text-ddt-color-common-neutral-hover","enabled:active:bg-ddt-color-common-surface-neutral-press","enabled:active:text-ddt-color-common-neutral-press","disabled:!text-ddt-color-common-disabled","focus-visible:outline","focus-visible:outline-2","focus-visible:outline-offset-[-2px]","focus-visible:outline-ddt-color-common-border-focus"]),y=class extends s.v{constructor(){super(...arguments),this.current=1,this.total=1,this.window=5}_goto(e){this.current=this.current=Math.max(Math.min(e,this.total),1),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))}_gotoOffset(e){this._goto(this.current+e)}render(){let e=m(),t=function(e,t,r){if(e<1&&(e=1),r<5&&(r=5),e<=r)return f(1,e+1);let o=t-Math.floor((r-5)/2),n=o+r-5;return o<=3?[...f(1,r-1),{type:"ellipsis",pages:u(r-1,e)},{type:"page",page:e}]:n>=e-2?[{type:"page",page:1},{type:"ellipsis",pages:u(2,e-(r-3))},...u(e-(r-3),e).map(e=>({type:"page",page:e})),{type:"page",page:e}]:[{type:"page",page:1},{type:"ellipsis",pages:u(2,o)},...f(o,n+1),{type:"ellipsis",pages:u(n+1,e)},{type:"page",page:e}]}(this.total,this.current,this.window);return(0,n.dy)`
      <div
        aria-label="Pagination"
        role="navigation"
        class="inline-flex flex-wrap"
      >
        <button
          class=${e}
          type="button"
          aria-label="Go to the previous page."
          ?disabled=${1===this.current}
          @click=${()=>this._gotoOffset(-1)}
        >
          <span class="i-daikin-pagination-chevron-left w-4 h-4"></span>
        </button>
        ${(0,a.r)(t,(e,t)=>"page"===e.type?`p${e.page}`:`e${t}`,e=>{if("page"!==e.type)return(0,n.dy)`
                <span class=${g()}>
                  <button
                    type="button"
                    disabled
                    aria-label="Expand the omitted pages."
                    class="after:content-['._._.']"
                  ></button>
                </span>
              `;{let t=v({active:this.current===e.page});return(0,n.dy)`
                <button
                  type="button"
                  class=${t}
                  @click=${()=>this._goto(e.page)}
                  aria-label="Go to page ${e.page}"
                  aria-current=${(0,l.o)(e.page===this.current?"page":void 0)}
                >
                  ${e.page}
                </button>
              `}})}
        <button
          type="button"
          class=${e}
          aria-label="Go to the next page."
          ?disabled=${this.current===this.total}
          @click=${()=>this._gotoOffset(1)}
        >
          <span class="i-daikin-pagination-chevron-right w-4 h-4"></span>
        </button>
      </div>
    `}};y.styles=(0,n.iv)`
    ${(0,n.$m)(c.Z)}

    :host {
      display: inline-flex;
    }
  `,b([(0,i.Cb)({type:Number,reflect:!0})],y.prototype,"current",2),b([(0,i.Cb)({type:Number,reflect:!0})],y.prototype,"total",2),b([(0,i.Cb)({type:Number,reflect:!0})],y.prototype,"window",2),b([(0,d.r)("daikin-pagination")],y)},3439:function(e,t,r){var o=r("7282"),n=r("9356"),i=r("1377"),l=r("2657");r("8924");var a=r("7521");r("8916");var s=r("4151"),d=Object.defineProperty,c=Object.getOwnPropertyDescriptor,u=(e,t,r,o)=>{for(var n=o>1?void 0:o?c(t,r):t,i,l=e.length-1;l>=0;l--)(i=e[l])&&(n=(o?i(t,r,n):i(n))||n);return o&&n&&d(t,r,n),n};let f=class extends l.v{constructor(){super(...arguments),this.value="",this.panels=[],this.panelRole=null}render(){return(0,i.r)(this.panels,e=>(0,o.dy)`<div
          class=${this.value===e?"contents":"hidden"}
          role=${this.panelRole??o.Ld}
          ?hidden=${this.value!==e}
        >
          <slot name=${`panel:${e}`}></slot>
        </div>`)}};f.styles=(0,o.iv)`
    ${(0,o.$m)(s.Z)}
  `,u([(0,n.Cb)({type:String,reflect:!0})],f.prototype,"value",2),u([(0,n.Cb)({type:Array,hasChanged:(e,t)=>JSON.stringify(e)!==JSON.stringify(t)})],f.prototype,"panels",2),u([(0,n.Cb)({type:String,reflect:!0,attribute:"panel-role"})],f.prototype,"panelRole",2),u([(0,a.r)("daikin-tab-panels")],f)},8121:function(e,t,r){var o=r("2552"),n=r("7282"),i=r("9356"),l=r("2657");r("8924");var a=r("7521");r("8916");var s=r("4151"),d=Object.defineProperty,c=Object.getOwnPropertyDescriptor,u=(e,t,r,o)=>{for(var n=o>1?void 0:o?c(t,r):t,i,l=e.length-1;l>=0;l--)(i=e[l])&&(n=(o?i(t,r,n):i(n))||n);return o&&n&&d(t,r,n),n};let f=(0,o.j)(["flex","size-full","items-center","justify-center","px-4","pt-2","pb-3","leading-[130%]","text-center","font-daikinSerif","tracking-wide","relative","focus-visible:outline-none","focus-visible:before:absolute","focus-visible:before:-inset-1","focus-visible:before:z-[1]","focus-visible:before:border","focus-visible:before:border-2","focus-visible:before:border-ddt-color-common-border-focus","disabled:text-ddt-color-common-disabled","after:absolute","after:inset-0","after:top-auto"],{variants:{active:{false:["enabled:text-ddt-color-common-neutral-default","enabled:hover:text-ddt-color-common-neutral-hover","enabled:hover:bg-ddt-color-common-surface-hover","enabled:active:text-ddt-color-common-neutral-press","enabled:active:bg-ddt-color-common-surface-press","after:h-[1px]","after:bg-ddt-color-divider"],true:["font-bold","enabled:text-ddt-color-common-brand-default","enabled:hover:bg-ddt-color-common-surface-brand-hover","enabled:active:bg-ddt-color-common-surface-brand-press","after:h-1","enabled:after:bg-ddt-color-common-brand-default","disabled:after:bg-ddt-color-common-disabled"]}}}),p=class extends l.v{constructor(){super(),this.value="",this.disabled=!1,this.sizing="stretch",this.active=!1,this.addEventListener("click",e=>{this.disabled&&e.stopImmediatePropagation()})}focus(e){var t;null==(t=this._button)||t.focus(e)}render(){return(0,n.dy)`
      <button
        type="button"
        class=${f({active:this.active})}
        ?disabled=${this.disabled}
        role="tab"
        aria-selected=${!this.disabled&&this.active}
        tabindex=${this.active?0:-1}
      >
        <slot></slot>
      </button>
    `}};p.styles=(0,n.iv)`
    ${(0,n.$m)(s.Z)}

    :host {
      display: block;
      white-space: nowrap;
      min-width: fit-content;
      height: 2.5rem;
    }

    :host([sizing="stretch"]) {
      width: 100%;
    }

    :host([sizing="fit"]) {
      width: fit-content;
    }
  `,u([(0,i.Cb)({type:String,reflect:!0})],p.prototype,"value",2),u([(0,i.Cb)({type:Boolean,reflect:!0})],p.prototype,"disabled",2),u([(0,i.Cb)({type:String,reflect:!0})],p.prototype,"sizing",2),u([(0,i.Cb)({type:Boolean,reflect:!0})],p.prototype,"active",2),u([(0,i.IO)("button")],p.prototype,"_button",2),u([(0,a.r)("daikin-tab")],p)},9515:function(e,t,r){var o=r("7282"),n=r("9356"),i=r("2657");r("8924");var l=r("7521");r("8916");var a=r("4151");function s(e,t,r){return"horizontal"===r?e:"vertical"===r?t:e||t}function d(e){return"visible"!==e&&"hidden"!==e&&"clip"!==e}var c=Object.defineProperty,u=Object.getOwnPropertyDescriptor,f=(e,t,r,o)=>{for(var n=o>1?void 0:o?u(t,r):t,i,l=e.length-1;l>=0;l--)(i=e[l])&&(n=(o?i(t,r,n):i(n))||n);return o&&n&&c(t,r,n),n};let p=class extends i.v{constructor(){super(...arguments),this.value="",this.sizing="stretch"}_emitBeforeChange(e){return!!(this.value!==e.value&&this.dispatchEvent(new CustomEvent("beforechange",{detail:{newTab:e},bubbles:!0,cancelable:!0})))||!1}_updateValue(e){this.value=e.value,this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!1}))}_updateTabs(){let e;let t=this._tabs;for(let r of t){let t=!e&&!r.disabled&&r.value===this.value;r.active=t,t&&(e=r)}if(!e&&(e=t.find(e=>!e.disabled))&&(e.active=!0,this._updateValue(e)),!!e)!function(e,t,r){let o=function e(t,r){var o,n;let i=(o=t).assignedSlot||o.parentElement||(null==(n=o.parentNode)?void 0:n.host);if(!i)return null;if(s(i.scrollWidth>i.clientWidth,i.scrollHeight>i.clientHeight,r)){let e=getComputedStyle(i);if(s(d(e.overflowX),d(e.overflowY),r))return i}return e(i,r)}(e,t);if(!o)return;let[n,i]=function(e,t,r){let o=t.getBoundingClientRect(),n=e.getBoundingClientRect(),i=r?(o.width-n.width)/2:0,l=r?(o.height-n.height)/2:0,a=Math.min(n.left-o.left-i,0)||Math.max(n.right-o.right+i,0);return[a,Math.min(n.top-o.top-l,0)||Math.max(n.bottom-o.bottom+l,0)]}(e,o,r);"horizontal"===t&&(i=0),"vertical"===t&&(n=0),(n||i)&&o.scrollBy(n,i)}(e,"horizontal",!1)}_updateTabStyle(){for(let e of this._tabs)e.sizing=this.sizing}_updateTabPanels(){let e=this._panelSwitchers,t=Array.from(new Set(this._tabs.map(e=>e.value)));for(let r of e)r.panelRole="tabpanel",r.panels=t,r.value=this.value}_handleTabClick(e){let t=this._tabs,r=e.target;if(!r||!t.includes(r))return;if(e.stopImmediatePropagation(),this.value!==r.value&&!!this._emitBeforeChange(r)){for(let e of t)e.active=e===r;this._updateValue(r)}}_handleKeyDown(e){let t={ArrowRight:1,ArrowLeft:-1}[e.key];if(!t)return;let r=this._tabs;if(!r.some(e=>!e.disabled))return;let o=document.activeElement,n=o?r.findIndex(e=>e.contains(o)):-1;if(n<0){let t=r.find(e=>!e.disabled&&e.active);null==t||t.focus(),e.preventDefault();return}for(let o=1;o<=r.length;o++){let i=(n+t*o+r.length*o)%r.length,l=r[i];if(!l.disabled){l.focus(),e.preventDefault();return}}}_handleSlotChange(){this._updateTabs(),this._updateTabPanels()}_handleTabPanelsSlotChange(){this._updateTabPanels()}render(){return(0,o.dy)`
      <div
        class="flex flex-nowrap w-full p-1 overflow-auto relative before:absolute before:h-[1px] before:inset-1 before:top-auto before:bg-ddt-color-divider"
        role="tablist"
        @click=${this._handleTabClick}
        @keydown=${this._handleKeyDown}
      >
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
      <slot name="panels" @slotchange=${this._handleTabPanelsSlotChange}></slot>
    `}updated(e){e.has("value")&&(this._updateTabs(),this._updateTabPanels()),e.has("sizing")&&this._updateTabStyle()}};p.styles=(0,o.iv)`
    ${(0,o.$m)(a.Z)}

    :host {
      display: block;
      width: 100%;
    }
  `,f([(0,n.Cb)({type:String,reflect:!0})],p.prototype,"value",2),f([(0,n.Cb)({type:String,reflect:!0})],p.prototype,"sizing",2),f([(0,n.NH)({selector:"daikin-tab"})],p.prototype,"_tabs",2),f([(0,n.NH)({slot:"panels",selector:"daikin-tab-panels"})],p.prototype,"_panelSwitchers",2),f([(0,l.r)("daikin-tabs")],p)},1185:function(e,t,r){r.d(t,{N:function(){return n}});var o=r(5787);function n(e){return(t,r)=>{let{slot:n,selector:i}=e??{},l="slot"+(n?`[name=${n}]`:":not([name])");return(0,o.C)(t,r,{get(){let t=this.renderRoot?.querySelector(l),r=t?.assignedElements(e)??[];return void 0===i?r:r.filter(e=>e.matches(i))}})}}},1049:function(e,t,r){r.d(t,{OR:function(){return n},_Y:function(){return l},fk:function(){return a},hl:function(){return d},i9:function(){return c},ws:function(){return u}});let{I:o}=r(3626).Al,n=e=>void 0===e.strings,i=()=>document.createComment(""),l=(e,t,r)=>{let n=e._$AA.parentNode,l=void 0===t?e._$AB:t._$AA;if(void 0===r){let t=n.insertBefore(i(),l);r=new o(t,n.insertBefore(i(),l),e,e.options)}else{let t=r._$AB.nextSibling,o=r._$AM,i=o!==e;if(i){let t;r._$AQ?.(e),r._$AM=e,void 0!==r._$AP&&(t=e._$AU)!==o._$AU&&r._$AP(t)}if(t!==l||i){let e=r._$AA;for(;e!==t;){let t=e.nextSibling;n.insertBefore(e,l),e=t}}}return r},a=(e,t,r=e)=>(e._$AI(t,r),e),s={},d=(e,t=s)=>e._$AH=t,c=e=>e._$AH,u=e=>{e._$AP?.(!1,!0);let t=e._$AA,r=e._$AB.nextSibling;for(;t!==r;){let e=t.nextSibling;t.remove(),t=e}}},9356:function(e,t,r){r.d(t,{NH:()=>d.N,SB:()=>a,Cb:()=>l,IO:()=>s.I});var o=r("2884");let n={attribute:!0,type:String,converter:o.Ts,reflect:!1,hasChanged:o.Qu},i=(e=n,t,r)=>{let{kind:o,metadata:i}=r,l=globalThis.litPropertyMetadata.get(i);if(void 0===l&&globalThis.litPropertyMetadata.set(i,l=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),l.set(r.name,e),"accessor"===o){let{name:o}=r;return{set(r){let n=t.get.call(this);t.set.call(this,r),this.requestUpdate(o,n,e)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){let{name:o}=r;return function(r){let n=this[o];t.call(this,r),this.requestUpdate(o,n,e)}}throw Error("Unsupported decorator location: "+o)};function l(e){return(t,r)=>"object"==typeof r?i(e,t,r):((e,t,r)=>{let o=t.hasOwnProperty(r);return t.constructor.createProperty(r,e),o?Object.getOwnPropertyDescriptor(t,r):void 0})(e,t,r)}function a(e){return l({...e,state:!0,attribute:!1})}var s=r("6944"),d=r("1185")},1377:function(e,t,r){r.d(t,{r:()=>a});var o=r("3626"),n=r("9340"),i=r("1049");let l=(e,t,r)=>{let o=new Map;for(let n=t;n<=r;n++)o.set(e[n],n);return o},a=(0,n.XM)(class extends n.Xe{constructor(e){if(super(e),e.type!==n.pX.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,r){let o;void 0===r?r=t:void 0!==t&&(o=t);let n=[],i=[],l=0;for(let t of e)n[l]=o?o(t,l):l,i[l]=r(t,l),l++;return{values:i,keys:n}}render(e,t,r){return this.dt(e,t,r).values}update(e,[t,r,n]){let a=(0,i.i9)(e),{values:s,keys:d}=this.dt(t,r,n);if(!Array.isArray(a))return this.ut=d,s;let c=this.ut??=[],u=[],f,p,h=0,b=a.length-1,v=0,g=s.length-1;for(;h<=b&&v<=g;)if(null===a[h])h++;else if(null===a[b])b--;else if(c[h]===d[v])u[v]=(0,i.fk)(a[h],s[v]),h++,v++;else if(c[b]===d[g])u[g]=(0,i.fk)(a[b],s[g]),b--,g--;else if(c[h]===d[g])u[g]=(0,i.fk)(a[h],s[g]),(0,i._Y)(e,u[g+1],a[h]),h++,g--;else if(c[b]===d[v])u[v]=(0,i.fk)(a[b],s[v]),(0,i._Y)(e,a[h],a[b]),b--,v++;else if(void 0===f&&(f=l(d,v,g),p=l(c,h,b)),f.has(c[h])){if(f.has(c[b])){let t=p.get(d[v]),r=void 0!==t?a[t]:null;if(null===r){let t=(0,i._Y)(e,a[h]);(0,i.fk)(t,s[v]),u[v]=t}else u[v]=(0,i.fk)(r,s[v]),(0,i._Y)(e,a[h],r),a[t]=null;v++}else(0,i.ws)(a[b]),b--}else(0,i.ws)(a[h]),h++;for(;v<=g;){let t=(0,i._Y)(e,u[g+1]);(0,i.fk)(t,s[v]),u[v++]=t}for(;h<=b;){let e=a[h++];null!==e&&(0,i.ws)(e)}return this.ut=d,(0,i.hl)(e,u),o.Jb}})},7282:function(e,t,r){r.d(t,{$m:()=>o.$m,sY:()=>n.sY,dy:()=>n.dy,iv:()=>o.iv,oi:()=>l,Ld:()=>n.Ld});var o=r("2884"),n=r("3626");let i=globalThis;class l extends o.fl{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=(0,n.sY)(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return n.Jb}}l._$litElement$=!0,l.finalized=!0,i.litElementHydrateSupport?.({LitElement:l});let a=i.litElementPolyfillSupport;a?.({LitElement:l}),(i.litElementVersions??=[]).push("4.2.0")}}]);
//# sourceMappingURL=bundle.7d6d456acab3aaae.js.map