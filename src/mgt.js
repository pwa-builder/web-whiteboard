window.mgt=function(e){"use strict";function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _get(e,t,r){return(_get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function _get(e,t,r){var n=function _superPropBase(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_getPrototypeOf(e)););return e}(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(r):o.value}})(e,t,r||e)}function _toArray(e){return function _arrayWithHoles(e){if(Array.isArray(e))return e}(e)||function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function _toPropertyKey(e){var t=function _toPrimitive(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}function _decorate(e,t,r,n){var o=function _getDecoratorsApi(){(function(){return e});var e={elementsDefinitionOrder:[["method"],["field"]],initializeInstanceElements:function(e,t){["method","field"].forEach(function(r){t.forEach(function(t){t.kind===r&&"own"===t.placement&&this.defineClassElement(e,t)},this)},this)},initializeClassElements:function(e,t){var r=e.prototype;["method","field"].forEach(function(n){t.forEach(function(t){var o=t.placement;if(t.kind===n&&("static"===o||"prototype"===o)){var i="static"===o?e:r;this.defineClassElement(i,t)}},this)},this)},defineClassElement:function(e,t){var r=t.descriptor;if("field"===t.kind){var n=t.initializer;r={enumerable:r.enumerable,writable:r.writable,configurable:r.configurable,value:void 0===n?void 0:n.call(e)}}Object.defineProperty(e,t.key,r)},decorateClass:function(e,t){var r=[],n=[],o={static:[],prototype:[],own:[]};if(e.forEach(function(e){this.addElementPlacement(e,o)},this),e.forEach(function(e){if(!_hasDecorators(e))return r.push(e);var t=this.decorateElement(e,o);r.push(t.element),r.push.apply(r,t.extras),n.push.apply(n,t.finishers)},this),!t)return{elements:r,finishers:n};var i=this.decorateConstructor(r,t);return n.push.apply(n,i.finishers),i.finishers=n,i},addElementPlacement:function(e,t,r){var n=t[e.placement];if(!r&&-1!==n.indexOf(e.key))throw new TypeError("Duplicated element ("+e.key+")");n.push(e.key)},decorateElement:function(e,t){for(var r=[],n=[],o=e.decorators,i=o.length-1;i>=0;i--){var s=t[e.placement];s.splice(s.indexOf(e.key),1);var a=this.fromElementDescriptor(e),l=this.toElementFinisherExtras((0,o[i])(a)||a);e=l.element,this.addElementPlacement(e,t),l.finisher&&n.push(l.finisher);var c=l.extras;if(c){for(var d=0;d<c.length;d++)this.addElementPlacement(c[d],t);r.push.apply(r,c)}}return{element:e,finishers:n,extras:r}},decorateConstructor:function(e,t){for(var r=[],n=t.length-1;n>=0;n--){var o=this.fromClassDescriptor(e),i=this.toClassDescriptor((0,t[n])(o)||o);if(void 0!==i.finisher&&r.push(i.finisher),void 0!==i.elements){e=i.elements;for(var s=0;s<e.length-1;s++)for(var a=s+1;a<e.length;a++)if(e[s].key===e[a].key&&e[s].placement===e[a].placement)throw new TypeError("Duplicated element ("+e[s].key+")")}}return{elements:e,finishers:r}},fromElementDescriptor:function(e){var t={kind:e.kind,key:e.key,placement:e.placement,descriptor:e.descriptor};return Object.defineProperty(t,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),"field"===e.kind&&(t.initializer=e.initializer),t},toElementDescriptors:function(e){if(void 0!==e)return _toArray(e).map(function(e){var t=this.toElementDescriptor(e);return this.disallowProperty(e,"finisher","An element descriptor"),this.disallowProperty(e,"extras","An element descriptor"),t},this)},toElementDescriptor:function(e){var t=String(e.kind);if("method"!==t&&"field"!==t)throw new TypeError('An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "'+t+'"');var r=_toPropertyKey(e.key),n=String(e.placement);if("static"!==n&&"prototype"!==n&&"own"!==n)throw new TypeError('An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "'+n+'"');var o=e.descriptor;this.disallowProperty(e,"elements","An element descriptor");var i={kind:t,key:r,placement:n,descriptor:Object.assign({},o)};return"field"!==t?this.disallowProperty(e,"initializer","A method descriptor"):(this.disallowProperty(o,"get","The property descriptor of a field descriptor"),this.disallowProperty(o,"set","The property descriptor of a field descriptor"),this.disallowProperty(o,"value","The property descriptor of a field descriptor"),i.initializer=e.initializer),i},toElementFinisherExtras:function(e){var t=this.toElementDescriptor(e),r=_optionalCallableProperty(e,"finisher"),n=this.toElementDescriptors(e.extras);return{element:t,finisher:r,extras:n}},fromClassDescriptor:function(e){var t={kind:"class",elements:e.map(this.fromElementDescriptor,this)};return Object.defineProperty(t,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),t},toClassDescriptor:function(e){var t=String(e.kind);if("class"!==t)throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "'+t+'"');this.disallowProperty(e,"key","A class descriptor"),this.disallowProperty(e,"placement","A class descriptor"),this.disallowProperty(e,"descriptor","A class descriptor"),this.disallowProperty(e,"initializer","A class descriptor"),this.disallowProperty(e,"extras","A class descriptor");var r=_optionalCallableProperty(e,"finisher"),n=this.toElementDescriptors(e.elements);return{elements:n,finisher:r}},runClassFinishers:function(e,t){for(var r=0;r<t.length;r++){var n=(0,t[r])(e);if(void 0!==n){if("function"!=typeof n)throw new TypeError("Finishers must return a constructor.");e=n}}return e},disallowProperty:function(e,t,r){if(void 0!==e[t])throw new TypeError(r+" can't have a ."+t+" property.")}};return e}();if(n)for(var i=0;i<n.length;i++)o=n[i](o);var s=t(function initialize(e){o.initializeInstanceElements(e,a.elements)},r),a=o.decorateClass(function _coalesceClassElements(e){for(var t=[],r=function(e){return"method"===e.kind&&e.key===i.key&&e.placement===i.placement},n=0;n<e.length;n++){var o,i=e[n];if("method"===i.kind&&(o=t.find(r)))if(_isDataDescriptor(i.descriptor)||_isDataDescriptor(o.descriptor)){if(_hasDecorators(i)||_hasDecorators(o))throw new ReferenceError("Duplicated methods ("+i.key+") can't be decorated.");o.descriptor=i.descriptor}else{if(_hasDecorators(i)){if(_hasDecorators(o))throw new ReferenceError("Decorators can't be placed on different accessors with for the same property ("+i.key+").");o.decorators=i.decorators}_coalesceGetterSetter(i,o)}else t.push(i)}return t}(s.d.map(_createElementDescriptor)),e);return o.initializeClassElements(s.F,a.elements),o.runClassFinishers(s.F,a.finishers)}function _createElementDescriptor(e){var t,r=_toPropertyKey(e.key);"method"===e.kind?t={value:e.value,writable:!0,configurable:!0,enumerable:!1}:"get"===e.kind?t={get:e.value,configurable:!0,enumerable:!1}:"set"===e.kind?t={set:e.value,configurable:!0,enumerable:!1}:"field"===e.kind&&(t={configurable:!0,writable:!0,enumerable:!0});var n={kind:"field"===e.kind?"field":"method",key:r,placement:e.static?"static":"field"===e.kind?"own":"prototype",descriptor:t};return e.decorators&&(n.decorators=e.decorators),"field"===e.kind&&(n.initializer=e.value),n}function _coalesceGetterSetter(e,t){void 0!==e.descriptor.get?t.descriptor.get=e.descriptor.get:t.descriptor.set=e.descriptor.set}function _hasDecorators(e){return e.decorators&&e.decorators.length}function _isDataDescriptor(e){return void 0!==e&&!(void 0===e.value&&void 0===e.writable)}function _optionalCallableProperty(e,t){var r=e[t];if(void 0!==r&&"function"!=typeof r)throw new TypeError("Expected '"+t+"' to be a function");return r}const t=new WeakMap,r=e=>(...r)=>{const n=e(...r);return t.set(n,!0),n},n=e=>"function"==typeof e&&t.has(e),o=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(e,t,r=null)=>{for(;t!==r;){const r=t.nextSibling;e.removeChild(t),t=r}},s={},a={},l=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${l}--\x3e`,d=new RegExp(`${l}|${c}`),p="$lit$";class Template{constructor(e,t){this.parts=[],this.element=t;const r=[],n=[],o=document.createTreeWalker(t.content,133,null,!1);let i=0,s=-1,a=0;const{strings:c,values:{length:h}}=e;for(;a<h;){const e=o.nextNode();if(null!==e){if(s++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:r}=t;let n=0;for(let e=0;e<r;e++)u(t[e].name,p)&&n++;for(;n-- >0;){const t=c[a],r=m.exec(t)[2],n=r.toLowerCase()+p,o=e.getAttribute(n);e.removeAttribute(n);const i=o.split(d);this.parts.push({type:"attribute",index:s,name:r,strings:i}),a+=i.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),o.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(l)>=0){const n=e.parentNode,o=t.split(d),i=o.length-1;for(let t=0;t<i;t++){let r,i=o[t];if(""===i)r=g();else{const e=m.exec(i);null!==e&&u(e[2],p)&&(i=i.slice(0,e.index)+e[1]+e[2].slice(0,-p.length)+e[3]),r=document.createTextNode(i)}n.insertBefore(r,e),this.parts.push({type:"node",index:++s})}""===o[i]?(n.insertBefore(g(),e),r.push(e)):e.data=o[i],a+=i}}else if(8===e.nodeType)if(e.data===l){const t=e.parentNode;null!==e.previousSibling&&s!==i||(s++,t.insertBefore(g(),e)),i=s,this.parts.push({type:"node",index:s}),null===e.nextSibling?e.data="":(r.push(e),s--),a++}else{let t=-1;for(;-1!==(t=e.data.indexOf(l,t+1));)this.parts.push({type:"node",index:-1}),a++}}else o.currentNode=n.pop()}for(const e of r)e.parentNode.removeChild(e)}}const u=(e,t)=>{const r=e.length-t.length;return r>=0&&e.slice(r)===t},h=e=>-1!==e.index,g=()=>document.createComment(""),m=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class TemplateInstance{constructor(e,t,r){this.__parts=[],this.template=e,this.processor=t,this.options=r}update(e){let t=0;for(const r of this.__parts)void 0!==r&&r.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],r=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let i,s=0,a=0,l=n.nextNode();for(;s<r.length;)if(i=r[s],h(i)){for(;a<i.index;)a++,"TEMPLATE"===l.nodeName&&(t.push(l),n.currentNode=l.content),null===(l=n.nextNode())&&(n.currentNode=t.pop(),l=n.nextNode());if("node"===i.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,i.name,i.strings,this.options));s++}else this.__parts.push(void 0),s++;return o&&(document.adoptNode(e),customElements.upgrade(e)),e}}class TemplateResult{constructor(e,t,r,n){this.strings=e,this.values=t,this.type=r,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",r=!1;for(let n=0;n<e;n++){const e=this.strings[n],o=e.lastIndexOf("\x3c!--");r=(o>-1||r)&&-1===e.indexOf("--\x3e",o+1);const i=m.exec(e);t+=null===i?e+(r?l:c):e.substr(0,i.index)+i[1]+i[2]+p+i[3]+l}return t+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}const f=e=>null===e||!("object"==typeof e||"function"==typeof e),y=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class AttributeCommitter{constructor(e,t,r){this.dirty=!0,this.element=e,this.name=t,this.strings=r,this.parts=[];for(let e=0;e<r.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new AttributePart(this)}_getValue(){const e=this.strings,t=e.length-1;let r="";for(let n=0;n<t;n++){r+=e[n];const t=this.parts[n];if(void 0!==t){const e=t.value;if(f(e)||!y(e))r+="string"==typeof e?e:String(e);else for(const t of e)r+="string"==typeof t?t:String(t)}}return r+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class AttributePart{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===s||f(e)&&e===this.value||(this.value=e,n(e)||(this.committer.dirty=!0))}commit(){for(;n(this.value);){const e=this.value;this.value=s,e(this)}this.value!==s&&this.committer.commit()}}class NodePart{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(g()),this.endNode=e.appendChild(g())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=g()),e.__insert(this.endNode=g())}insertAfterPart(e){e.__insert(this.startNode=g()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){for(;n(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=s,e(this)}const e=this.__pendingValue;e!==s&&(f(e)?e!==this.value&&this.__commitText(e):e instanceof TemplateResult?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):y(e)?this.__commitIterable(e):e===a?(this.value=a,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,r="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=r:this.__commitNode(document.createTextNode(r)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof TemplateInstance&&this.value.template===t)this.value.update(e.values);else{const r=new TemplateInstance(t,e.processor,this.options),n=r._clone();r.update(e.values),this.__commitNode(n),this.value=r}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let r,n=0;for(const o of e)void 0===(r=t[n])&&(r=new NodePart(this.options),t.push(r),0===n?r.appendIntoPart(this):r.insertAfterPart(t[n-1])),r.setValue(o),r.commit(),n++;n<t.length&&(t.length=n,this.clear(r&&r.endNode))}clear(e=this.startNode){i(this.startNode.parentNode,e.nextSibling,this.endNode)}}class BooleanAttributePart{constructor(e,t,r){if(this.value=void 0,this.__pendingValue=void 0,2!==r.length||""!==r[0]||""!==r[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=r}setValue(e){this.__pendingValue=e}commit(){for(;n(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=s,e(this)}if(this.__pendingValue===s)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=s}}class PropertyCommitter extends AttributeCommitter{constructor(e,t,r){super(e,t,r),this.single=2===r.length&&""===r[0]&&""===r[1]}_createPart(){return new PropertyPart(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class PropertyPart extends AttributePart{}let v=!1;try{const e={get capture(){return v=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class EventPart{constructor(e,t,r){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=r,this.__boundHandleEvent=(e=>this.handleEvent(e))}setValue(e){this.__pendingValue=e}commit(){for(;n(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=s,e(this)}if(this.__pendingValue===s)return;const e=this.__pendingValue,t=this.value,r=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),o=null!=e&&(null==t||r);r&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=k(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=s}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const k=e=>e&&(v?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);const w=new class DefaultTemplateProcessor{handleAttributeExpressions(e,t,r,n){const o=t[0];return"."===o?new PropertyCommitter(e,t.slice(1),r).parts:"@"===o?[new EventPart(e,t.slice(1),n.eventContext)]:"?"===o?[new BooleanAttributePart(e,t.slice(1),r)]:new AttributeCommitter(e,t,r).parts}handleTextExpression(e){return new NodePart(e)}};function templateFactory(e){let t=T.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},T.set(e.type,t));let r=t.stringsArray.get(e.strings);if(void 0!==r)return r;const n=e.strings.join(l);return void 0===(r=t.keyString.get(n))&&(r=new Template(e,e.getTemplateElement()),t.keyString.set(n,r)),t.stringsArray.set(e.strings,r),r}const T=new Map,C=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.1");const b=(e,...t)=>new TemplateResult(e,t,"html",w),_=133;function removeNodesFromTemplate(e,t){const{element:{content:r},parts:n}=e,o=document.createTreeWalker(r,_,null,!1);let i=A(n),s=n[i],a=-1,l=0;const c=[];let d=null;for(;o.nextNode();){a++;const e=o.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(c.push(e),null===d&&(d=e)),null!==d&&l++;void 0!==s&&s.index===a;)s.index=null!==d?-1:s.index-l,s=n[i=A(n,i)]}c.forEach(e=>e.parentNode.removeChild(e))}const S=e=>{let t=11===e.nodeType?0:1;const r=document.createTreeWalker(e,_,null,!1);for(;r.nextNode();)t++;return t},A=(e,t=-1)=>{for(let r=t+1;r<e.length;r++){const t=e[r];if(h(t))return r}return-1};const P=(e,t)=>`${e}--${t}`;let E=!0;void 0===window.ShadyCSS?E=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),E=!1);const I=e=>t=>{const r=P(t.type,e);let n=T.get(r);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},T.set(r,n));let o=n.stringsArray.get(t.strings);if(void 0!==o)return o;const i=t.strings.join(l);if(void 0===(o=n.keyString.get(i))){const r=t.getTemplateElement();E&&window.ShadyCSS.prepareTemplateDom(r,e),o=new Template(t,r),n.keyString.set(i,o)}return n.stringsArray.set(t.strings,o),o},x=["html","svg"],D=new Set,R=(e,t,r)=>{D.add(e);const n=r?r.element:document.createElement("template"),o=t.querySelectorAll("style"),{length:i}=o;if(0===i)return void window.ShadyCSS.prepareTemplateStyles(n,e);const s=document.createElement("style");for(let e=0;e<i;e++){const t=o[e];t.parentNode.removeChild(t),s.textContent+=t.textContent}(e=>{x.forEach(t=>{const r=T.get(P(t,e));void 0!==r&&r.keyString.forEach(e=>{const{element:{content:t}}=e,r=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{r.add(e)}),removeNodesFromTemplate(e,r)})})})(e);const a=n.content;r?function insertNodeIntoTemplate(e,t,r=null){const{element:{content:n},parts:o}=e;if(null==r)return void n.appendChild(t);const i=document.createTreeWalker(n,_,null,!1);let s=A(o),a=0,l=-1;for(;i.nextNode();)for(l++,i.currentNode===r&&(a=S(t),r.parentNode.insertBefore(t,r));-1!==s&&o[s].index===l;){if(a>0){for(;-1!==s;)o[s].index+=a,s=A(o,s);return}s=A(o,s)}}(r,s,a.firstChild):a.insertBefore(s,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(r){a.insertBefore(s,a.firstChild);const e=new Set;e.add(s),removeNodesFromTemplate(r,e)}};window.JSCompiler_renameProperty=((e,t)=>e);const O={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},L=(e,t)=>t!==e&&(t==t||e==e),M={attribute:!0,type:String,converter:O,reflect:!1,hasChanged:L},U=Promise.resolve(!0),N=1,H=4,q=8,$=16,F=32,j="finalized";class UpdatingElement extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=U,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,r)=>{const n=this._attributeNameForProperty(r,t);void 0!==n&&(this._attributeToPropertyMap.set(n,r),e.push(n))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=M){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():`__${e}`;Object.defineProperty(this.prototype,e,{get(){return this[r]},set(t){const n=this[e];this[r]=t,this._requestUpdate(e,n)},configurable:!0,enumerable:!0})}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(j)||e.finalize(),this[j]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=L){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,n=t.converter||O,o="function"==typeof n?n:n.fromAttribute;return o?o(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,n=t.converter;return(n&&n.toAttribute||O.toAttribute)(e,r)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|F,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=M){const n=this.constructor,o=n._attributeNameForProperty(e,r);if(void 0!==o){const e=n._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=this._updateState|q,null==e?this.removeAttribute(o):this.setAttribute(o,e),this._updateState=this._updateState&~q}}_attributeToProperty(e,t){if(this._updateState&q)return;const r=this.constructor,n=r._attributeToPropertyMap.get(e);if(void 0!==n){const e=r._classProperties.get(n)||M;this._updateState=this._updateState|$,this[n]=r._propertyValueFromAttribute(t,e),this._updateState=this._updateState&~$}}_requestUpdate(e,t){let r=!0;if(void 0!==e){const n=this.constructor,o=n._classProperties.get(e)||M;n._valueHasChanged(this[e],t,o.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==o.reflect||this._updateState&$||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,o))):r=!1}!this._hasRequestedUpdate&&r&&this._enqueueUpdate()}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){let e,t;this._updateState=this._updateState|H;const r=this._updatePromise;this._updatePromise=new Promise((r,n)=>{e=r,t=n});try{await r}catch(e){}this._hasConnected||await new Promise(e=>this._hasConnectedResolver=e);try{const e=this.performUpdate();null!=e&&await e}catch(e){t(e)}e(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&F}get _hasRequestedUpdate(){return this._updateState&H}get hasUpdated(){return this._updateState&N}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{(e=this.shouldUpdate(t))&&this.update(t)}catch(t){throw e=!1,t}finally{this._markUpdated()}e&&(this._updateState&N||(this._updateState=this._updateState|N,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~H}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0)}updated(e){}firstUpdated(e){}}UpdatingElement[j]=!0;const B=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:r,elements:n}=t;return{kind:r,elements:n,finisher(t){window.customElements.define(e,t)}}})(e,t),V=(e,t)=>"method"!==t.kind||!t.descriptor||"value"in t.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}}:Object.assign({},t,{finisher(r){r.createProperty(t.key,e)}}),z=(e,t,r)=>{t.constructor.createProperty(r,e)};function property(e){return(t,r)=>void 0!==r?z(e,t,r):V(e,t)}const G="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol();class CSSResult{constructor(e,t){if(t!==W)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(G?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Z=(e,...t)=>{const r=t.reduce((t,r,n)=>t+(e=>{if(e instanceof CSSResult)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[n+1],e[0]);return new CSSResult(r,W)};(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const K=e=>e.flat?e.flat(1/0):function arrayFlat(e,t=[]){for(let r=0,n=e.length;r<n;r++){const n=e[r];Array.isArray(n)?arrayFlat(n,t):t.push(n)}return t}(e);class LitElement extends UpdatingElement{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const e=this.styles,t=[];if(Array.isArray(e)){K(e).reduceRight((e,t)=>(e.add(t),e),new Set).forEach(e=>t.unshift(e))}else e&&t.push(e);return t}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?G?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){super.update(e);const t=this.render();t instanceof TemplateResult&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){}}LitElement.finalized=!0,LitElement.render=((e,t,r)=>{if(!r||"object"!=typeof r||!r.scopeName)throw new Error("The `scopeName` option is required.");const n=r.scopeName,o=C.has(t),s=E&&11===t.nodeType&&!!t.host,a=s&&!D.has(n),l=a?document.createDocumentFragment():t;if(((e,t,r)=>{let n=C.get(t);void 0===n&&(i(t,t.firstChild),C.set(t,n=new NodePart(Object.assign({templateFactory:templateFactory},r))),n.appendInto(t)),n.setValue(e),n.commit()})(e,l,Object.assign({templateFactory:I(n)},r)),a){const e=C.get(l);C.delete(l);const r=e.value instanceof TemplateInstance?e.value.template:void 0;R(n,l,r),i(t,t.firstChild),t.appendChild(l),C.set(t,e)}!o&&s&&window.ShadyCSS.styleElement(t.host)});class IProvider{get state(){return this._state}setState(e){e!==this._state&&(this._state=e,this._loginChangedDispatcher.fire({}))}onStateChanged(e){this._loginChangedDispatcher.add(e)}removeStateChangedHandler(e){this._loginChangedDispatcher.remove(e)}constructor(){_defineProperty(this,"_state",void 0),_defineProperty(this,"_loginChangedDispatcher",new EventDispatcher),_defineProperty(this,"graph",void 0),this._state=e.ProviderState.Loading}getAccessTokenForScopes(...e){return this.getAccessToken({scopes:e})}}class EventDispatcher{constructor(){_defineProperty(this,"eventHandlers",[])}fire(e){for(const t of this.eventHandlers)t(e)}add(e){this.eventHandlers.push(e)}remove(e){for(let t=0;t<this.eventHandlers.length;t++)this.eventHandlers[t]===e&&(this.eventHandlers.splice(t,1),t--)}}var Q,J,X;(Q=e.LoginType||(e.LoginType={}))[Q.Popup=0]="Popup",Q[Q.Redirect=1]="Redirect",(J=e.ProviderState||(e.ProviderState={}))[J.Loading=0]="Loading",J[J.SignedOut=1]="SignedOut",J[J.SignedIn=2]="SignedIn";class Providers{static get globalProvider(){return this._globalProvider}static set globalProvider(t){t!==this._globalProvider&&(this._globalProvider&&this._globalProvider.removeStateChangedHandler(this.handleProviderStateChanged),t&&t.onStateChanged(this.handleProviderStateChanged),this._globalProvider=t,this._eventDispatcher.fire(e.ProvidersChangedState.ProviderChanged))}static onProviderUpdated(e){this._eventDispatcher.add(e)}static removeProviderUpdatedListener(e){this._eventDispatcher.remove(e)}static handleProviderStateChanged(){Providers._eventDispatcher.fire(e.ProvidersChangedState.ProviderStateChanged)}}_defineProperty(Providers,"_eventDispatcher",new EventDispatcher),_defineProperty(Providers,"_globalProvider",void 0),(X=e.ProvidersChangedState||(e.ProvidersChangedState={}))[X.ProviderChanged=0]="ProviderChanged",X[X.ProviderStateChanged=1]="ProviderStateChanged";const Y=[Z`
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/*
  Your use of the content in the files referenced here is subject to the terms of the license at http://aka.ms/fabric-assets-license
*/
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
:host([hidden]) {
  display: none; }

:host {
  display: block;
  --default-font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  --theme-primary-color: #0078d7;
  --theme-dark-color: #005a9e; }

.ms-Icon {
  display: inline-block;
  font-family: "FabricMDL2Icons";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  margin: 4px 0; }

.ms-Icon--ChevronDown::before {
  content: "\\\E70D"; }

.ms-Icon--ChevronUp::before {
  content: "\\\E70E"; }

.ms-Icon--Contact::before {
  content: "\\\E77B"; }

.ms-Icon--AddFriend::before {
  content: "\\\E8FA"; }

.ms-Icon--OutlookLogoInverse::before {
  content: "\\\EB6D"; }

:host .header,
mgt-agenda .header {
  margin: var(--agenda-header-margin, 40px 10px 14px 10px);
  font-family: var(--default-font-family);
  font-size: var(--agenda-header-font-size, 24px);
  color: var(--agenda-header-color, #333333); }

:host .agenda > .group:first-child > .header,
mgt-agenda .agenda > .group:first-child > .header {
  margin-top: 0; }

:host .agenda-list,
mgt-agenda .agenda-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-family: var(--default-font-family);
  font-style: normal;
  font-weight: normal; }

:host .event,
mgt-agenda .event {
  background: var(--event-background, #ffffff);
  border: var(--event-border, solid 2px rgba(0, 0, 0, 0));
  box-shadow: var(--event-box-shadow, 0px 2px 8px rgba(0, 0, 0, 0.092));
  margin: var(--event-margin, 0px 10px 14px 10px);
  padding: var(--event-padding, 0px);
  display: flex; }

:host .narrow .event,
mgt-agenda .narrow .event {
  flex-direction: column; }

:host .event-time-container,
mgt-agenda .event-time-container {
  display: flex;
  flex-direction: column;
  margin: 18px 38px 18px 18px;
  width: 120px; }

:host .narrow .event-time-container,
mgt-agenda .narrow .event-time-container {
  margin: 14px 18px 8px 18px; }

:host .event-time,
mgt-agenda .event-time {
  font-size: var(--event-time-font-size, 12px);
  color: var(--event-time-color, #000000);
  font-weight: 600; }

:host .event-duration,
mgt-agenda .event-duration {
  color: rgba(16, 16, 16, 0.3); }

:host .event-details-container,
mgt-agenda .event-details-container {
  margin: 14px 18px 14px 0px; }

:host .narrow .event-details-container,
mgt-agenda .narrow .event-details-container {
  margin: 0px 18px 14px 18px; }

:host .event-subject,
mgt-agenda .event-subject {
  margin: 0px 18px 0px 0px;
  font-size: var(--event-subject-font-size, 19px);
  color: var(--event-subject-color, #333333); }

:host .event-location-container,
mgt-agenda .event-location-container {
  display: flex;
  margin: 8px 18px 0px 0px; }

:host .event-location,
mgt-agenda .event-location {
  font-size: var(--event-location-font-size, 12px);
  color: var(--event-location-color, #000000);
  margin: 0px 0px 0px 4px; }

:host .event-attendees,
mgt-agenda .event-attendees {
  --list-margin: 8px 0 0 0;
  --avatar-size-s: 20px; }

:host .event-other-container,
mgt-agenda .event-other-container {
  margin: 2px 16px 4px 16px;
  margin-left: auto; }

:host .loading-element,
mgt-agenda .loading-element {
  background: #f2f2f2;
  border-radius: 1px; }

:host .event-time-loading,
mgt-agenda .event-time-loading {
  width: 100px;
  height: 10px; }

:host .event-subject-loading,
mgt-agenda .event-subject-loading {
  width: 263px;
  height: 16px; }

:host .event-location-icon-loading,
mgt-agenda .event-location-icon-loading {
  width: 14px;
  height: 14px; }

:host .event-location-loading,
mgt-agenda .event-location-loading {
  width: 90px;
  height: 10px;
  margin: 2px 0px 0px 4px; }

:host .event-attendee-loading,
mgt-agenda .event-attendee-loading {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin: 0 2px 0 0; }

`];var ee=function(e,t){return(ee=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};function __extends(e,t){function __(){this.constructor=e}ee(e,t),e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)}var te,re=function(){return(re=Object.assign||function __assign(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function __awaiter(e,t,r,n){return new(r||(r=Promise))(function(o,i){function fulfilled(e){try{step(n.next(e))}catch(e){i(e)}}function rejected(e){try{step(n.throw(e))}catch(e){i(e)}}function step(e){e.done?o(e.value):new r(function(t){t(e.value)}).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})}!function(e){e.GET="GET",e.PATCH="PATCH",e.POST="POST",e.PUT="PUT",e.DELETE="DELETE"}(te||(te={}));class BatchRequestContent{constructor(e){if(this.requests=new Map,void 0!==e){const t=BatchRequestContent.requestLimit;if(e.length>t){const e=new Error(`Maximum requests limit exceeded, Max allowed number of requests are ${t}`);throw e.name="Limit Exceeded Error",e}for(const t of e)this.addRequest(t)}}static validateDependencies(e){if(0===e.size){const e=new Error("Empty requests map, Please provide at least one request.");throw e.name="Empty Requests Error",e}return(e=>{const t=e.entries();let r=t.next();for(;!r.done;){const e=r.value[1];if(void 0!==e.dependsOn&&e.dependsOn.length>0)return!1;r=t.next()}return!0})(e)||(e=>{const t=e.entries();let r=t.next();const n=r.value[1];if(void 0!==n.dependsOn&&n.dependsOn.length>0)return!1;let o=r;for(r=t.next();!r.done;){const e=r.value[1];if(void 0===e.dependsOn||1!==e.dependsOn.length||e.dependsOn[0]!==o.value[1].id)return!1;o=r,r=t.next()}return!0})(e)||(e=>{const t=e.entries();let r=t.next();const n=r.value[1];let o;if(void 0===n.dependsOn||0===n.dependsOn.length)o=n.id;else{if(1!==n.dependsOn.length)return!1;{const t=n.dependsOn[0];if(t===n.id||!e.has(t))return!1;o=t}}for(r=t.next();!r.done;){const e=r.value[1];if((void 0===e.dependsOn||0===e.dependsOn.length)&&o!==e.id)return!1;if(void 0!==e.dependsOn&&0!==e.dependsOn.length){if(1===e.dependsOn.length&&(e.id===o||e.dependsOn[0]!==o))return!1;if(e.dependsOn.length>1)return!1}r=t.next()}return!0})(e)}static getRequestData(e){return __awaiter(this,void 0,void 0,function*(){const t={url:""},r=new RegExp("^https?://");t.url=r.test(e.url)?"/"+e.url.split(/.*?\/\/.*?\//)[1]:e.url,t.method=e.method;const n={};return e.headers.forEach((e,t)=>{n[t]=e}),Object.keys(n).length&&(t.headers=n),e.method!==te.PATCH&&e.method!==te.POST&&e.method!==te.PUT||(t.body=yield BatchRequestContent.getRequestBody(e)),t})}static getRequestBody(e){return __awaiter(this,void 0,void 0,function*(){let t,r=!1;try{const n=e.clone();t=yield n.json(),r=!0}catch(e){}if(!r)try{if("undefined"!=typeof Blob){const r=yield e.blob(),n=new FileReader;t=yield new Promise(e=>{n.addEventListener("load",()=>{const t=n.result,r=new RegExp("^s*data:(.+?/.+?(;.+?=.+?)*)?(;base64)?,(.*)s*$").exec(t);e(r[4])},!1),n.readAsDataURL(r)})}else if("undefined"!=typeof Buffer){t=(yield e.buffer()).toString("base64")}r=!0}catch(e){}return t})}addRequest(e){const t=BatchRequestContent.requestLimit;if(""===e.id){const e=new Error("Id for a request is empty, Please provide an unique id");throw e.name="Empty Id For Request",e}if(this.requests.size===t){const e=new Error(`Maximum requests limit exceeded, Max allowed number of requests are ${t}`);throw e.name="Limit Exceeded Error",e}if(this.requests.has(e.id)){const t=new Error(`Adding request with duplicate id ${e.id}, Make the id of the requests unique`);throw t.name="Duplicate RequestId Error",t}return this.requests.set(e.id,e),e.id}removeRequest(e){const t=this.requests.delete(e),r=this.requests.entries();let n=r.next();for(;!n.done;){const t=n.value[1].dependsOn;if(void 0!==t){const r=t.indexOf(e);-1!==r&&t.splice(r,1),0===t.length&&delete n.value[1].dependsOn}n=r.next()}return t}getContent(){return __awaiter(this,void 0,void 0,function*(){const e=[],t={requests:e},r=this.requests.entries();let n=r.next();if(n.done){const e=new Error("No requests added yet, Please add at least one request.");throw e.name="Empty Payload",e}if(!BatchRequestContent.validateDependencies(this.requests)){const e=new Error("Invalid dependency found, Dependency should be:\n1. Parallel - no individual request states a dependency in the dependsOn property.\n2. Serial - all individual requests depend on the previous individual request.\n3. Same - all individual requests that state a dependency in the dependsOn property, state the same dependency.");throw e.name="Invalid Dependency",e}for(;!n.done;){const t=n.value[1],o=yield BatchRequestContent.getRequestData(t.request);if(void 0!==o.body&&(void 0===o.headers||void 0===o.headers["content-type"])){const e=new Error(`Content-type header is not mentioned for request #${t.id}, For request having body, Content-type header should be mentioned`);throw e.name="Invalid Content-type header",e}o.id=t.id,void 0!==t.dependsOn&&t.dependsOn.length>0&&(o.dependsOn=t.dependsOn),e.push(o),n=r.next()}return t.requests=e,t})}addDependency(e,t){if(!this.requests.has(e)){const t=new Error(`Dependent ${e} does not exists, Please check the id`);throw t.name="Invalid Dependent",t}if(void 0!==t&&!this.requests.has(t)){const e=new Error(`Dependency ${t} does not exists, Please check the id`);throw e.name="Invalid Dependency",e}if(void 0!==t){const r=this.requests.get(e);if(void 0===r.dependsOn&&(r.dependsOn=[]),-1!==r.dependsOn.indexOf(t)){const r=new Error(`Dependency ${t} is already added for the request ${e}`);throw r.name="Duplicate Dependency",r}r.dependsOn.push(t)}else{const r=this.requests.entries();let n,o=r.next();for(;!o.done&&o.value[1].id!==e;)n=o,o=r.next();if(void 0===n){const e=new Error(`Can't add dependency ${t}, There is only a dependent request in the batch`);throw e.name="Invalid Dependency Addition",e}{const t=n.value[0];if(void 0===o.value[1].dependsOn&&(o.value[1].dependsOn=[]),-1!==o.value[1].dependsOn.indexOf(t)){const r=new Error(`Dependency ${t} is already added for the request ${e}`);throw r.name="Duplicate Dependency",r}o.value[1].dependsOn.push(t)}}}removeDependency(e,t){const r=this.requests.get(e);if(void 0===r||void 0===r.dependsOn||0===r.dependsOn.length)return!1;if(void 0!==t){const e=r.dependsOn.indexOf(t);return-1!==e&&(r.dependsOn.splice(e,1),!0)}return delete r.dependsOn,!0}}BatchRequestContent.requestLimit=20;class MiddlewareControl{constructor(e=[]){this.middlewareOptions=new Map;for(const t of e){const e=t.constructor;this.middlewareOptions.set(e,t)}}getMiddlewareOptions(e){return this.middlewareOptions.get(e)}setMiddlewareOptions(e,t){this.middlewareOptions.set(e,t)}}const ne=()=>{let e="";for(let t=0;t<32;t++)8!==t&&12!==t&&16!==t&&20!==t||(e+="-"),e+=Math.floor(16*Math.random()).toString(16);return e},oe=(e,t,r)=>{let n=null;if("undefined"!=typeof Request&&e instanceof Request)n=e.headers.get(r);else if(void 0!==t&&void 0!==t.headers)if("undefined"!=typeof Headers&&t.headers instanceof Headers)n=t.headers.get(r);else if(t.headers instanceof Array){const e=t.headers;for(let t=0,o=e.length;t<o;t++)if(e[t][0]===r){n=e[t][1];break}}else void 0!==t.headers[r]&&(n=t.headers[r]);return n},ie=(e,t,r,n)=>{if("undefined"!=typeof Request&&e instanceof Request)e.headers.set(r,n);else if(void 0!==t)if(void 0===t.headers)t.headers=new Headers({[r]:n});else if("undefined"!=typeof Headers&&t.headers instanceof Headers)t.headers.set(r,n);else if(t.headers instanceof Array){let e=0;const o=t.headers.length;for(;e<o;e++){const o=t.headers[e];if(o[0]===r){o[1]=n;break}}e===o&&t.headers.push([r,n])}else Object.assign(t.headers,{[r]:n})},se=(e,t,r,n)=>{"undefined"!=typeof Request&&e instanceof Request?e.headers.append(r,n):void 0!==t&&(void 0===t.headers?t.headers=new Headers({[r]:n}):"undefined"!=typeof Headers&&t.headers instanceof Headers?t.headers.append(r,n):t.headers instanceof Array?t.headers.push([r,n]):void 0===t.headers?t.headers={[r]:n}:void 0===t.headers[r]?t.headers[r]=n:t.headers[r]+=`, ${n}`)},ae=(e,t)=>__awaiter(void 0,void 0,void 0,function*(){const r=t.headers.get("Content-Type")?yield t.blob():yield Promise.resolve(void 0),{method:n,headers:o,referrer:i,referrerPolicy:s,mode:a,credentials:l,cache:c,redirect:d,integrity:p,keepalive:u,signal:h}=t;return new Request(e,{method:n,headers:o,body:r,referrer:i,referrerPolicy:s,mode:a,credentials:l,cache:c,redirect:d,integrity:p,keepalive:u,signal:h})});class AuthenticationHandlerOptions{constructor(e,t){this.authenticationProvider=e,this.authenticationProviderOptions=t}}var le;!function(e){e[e.NONE=0]="NONE",e[e.REDIRECT_HANDLER_ENABLED=1]="REDIRECT_HANDLER_ENABLED",e[e.RETRY_HANDLER_ENABLED=2]="RETRY_HANDLER_ENABLED",e[e.AUTHENTICATION_HANDLER_ENABLED=4]="AUTHENTICATION_HANDLER_ENABLED"}(le||(le={}));class TelemetryHandlerOptions{constructor(){this.featureUsage=le.NONE}static updateFeatureUsageFlag(e,t){let r;e.middlewareControl instanceof MiddlewareControl?r=e.middlewareControl.getMiddlewareOptions(TelemetryHandlerOptions):e.middlewareControl=new MiddlewareControl,void 0===r&&(r=new TelemetryHandlerOptions,e.middlewareControl.setMiddlewareOptions(TelemetryHandlerOptions,r)),r.setFeatureUsage(t)}setFeatureUsage(e){this.featureUsage=this.featureUsage|e}getFeatureUsage(){return this.featureUsage.toString(16)}}class AuthenticationHandler{constructor(e){this.authenticationProvider=e}execute(e){return __awaiter(this,void 0,void 0,function*(){try{let t,r,n;e.middlewareControl instanceof MiddlewareControl&&(t=e.middlewareControl.getMiddlewareOptions(AuthenticationHandlerOptions)),void 0!==t&&(r=t.authenticationProvider,n=t.authenticationProviderOptions),void 0===r&&(r=this.authenticationProvider);const o=`Bearer ${yield r.getAccessToken(n)}`;return se(e.request,e.options,AuthenticationHandler.AUTHORIZATION_HEADER,o),TelemetryHandlerOptions.updateFeatureUsageFlag(e,le.AUTHENTICATION_HANDLER_ENABLED),yield this.nextMiddleware.execute(e)}catch(e){throw e}})}setNext(e){this.nextMiddleware=e}}AuthenticationHandler.AUTHORIZATION_HEADER="Authorization";class HTTPMessageHandler{execute(e){return __awaiter(this,void 0,void 0,function*(){try{return void(e.response=yield fetch(e.request,e.options))}catch(e){throw e}})}}class RetryHandlerOptions{constructor(e=RetryHandlerOptions.DEFAULT_DELAY,t=RetryHandlerOptions.DEFAULT_MAX_RETRIES,r=RetryHandlerOptions.DEFAULT_SHOULD_RETRY){if(e>RetryHandlerOptions.MAX_DELAY&&t>RetryHandlerOptions.MAX_MAX_RETRIES){const e=new Error(`Delay and MaxRetries should not be more than ${RetryHandlerOptions.MAX_DELAY} and ${RetryHandlerOptions.MAX_MAX_RETRIES}`);throw e.name="MaxLimitExceeded",e}if(e>RetryHandlerOptions.MAX_DELAY){const e=new Error(`Delay should not be more than ${RetryHandlerOptions.MAX_DELAY}`);throw e.name="MaxLimitExceeded",e}if(t>RetryHandlerOptions.MAX_MAX_RETRIES){const e=new Error(`MaxRetries should not be more than ${RetryHandlerOptions.MAX_MAX_RETRIES}`);throw e.name="MaxLimitExceeded",e}if(e<0&&t<0){const e=new Error("Delay and MaxRetries should not be negative");throw e.name="MinExpectationNotMet",e}if(e<0){const e=new Error("Delay should not be negative");throw e.name="MinExpectationNotMet",e}if(t<0){const e=new Error("MaxRetries should not be negative");throw e.name="MinExpectationNotMet",e}this.delay=Math.min(e,RetryHandlerOptions.MAX_DELAY),this.maxRetries=Math.min(t,RetryHandlerOptions.MAX_MAX_RETRIES),this.shouldRetry=r}getMaxDelay(){return RetryHandlerOptions.MAX_DELAY}}RetryHandlerOptions.DEFAULT_DELAY=3,RetryHandlerOptions.DEFAULT_MAX_RETRIES=3,RetryHandlerOptions.MAX_DELAY=180,RetryHandlerOptions.MAX_MAX_RETRIES=10,RetryHandlerOptions.DEFAULT_SHOULD_RETRY=(()=>!0);class RetryHandler{constructor(e=new RetryHandlerOptions){this.options=e}isRetry(e){return-1!==RetryHandler.RETRY_STATUS_CODES.indexOf(e.status)}isBuffered(e,t){const r="string"==typeof e?t.method:e.method;if(r===te.PUT||r===te.PATCH||r===te.POST){if("application/octet-stream"===oe(e,t,"Content-Type"))return!1}return!0}getDelay(e,t,r){const n=()=>Number(Math.random().toFixed(3)),o=void 0!==e.headers?e.headers.get(RetryHandler.RETRY_AFTER_HEADER):null;let i;return i=null!==o?Number.isNaN(Number(o))?Math.round((new Date(o).getTime()-Date.now())/1e3):Number(o):t>=2?this.getExponentialBackOffTime(t)+r+n():r+n(),Math.min(i,this.options.getMaxDelay()+n())}getExponentialBackOffTime(e){return Math.round(.5*(Math.pow(2,e)-1))}sleep(e){return __awaiter(this,void 0,void 0,function*(){const t=1e3*e;return new Promise(e=>setTimeout(e,t))})}getOptions(e){let t;return e.middlewareControl instanceof MiddlewareControl&&(t=e.middlewareControl.getMiddlewareOptions(this.options.constructor)),void 0===t&&(t=Object.assign(new RetryHandlerOptions,this.options)),t}executeWithRetry(e,t,r){return __awaiter(this,void 0,void 0,function*(){try{if(yield this.nextMiddleware.execute(e),t<r.maxRetries&&this.isRetry(e.response)&&this.isBuffered(e.request,e.options)&&r.shouldRetry(r.delay,t,e.request,e.options,e.response)){++t,ie(e.request,e.options,RetryHandler.RETRY_ATTEMPT_HEADER,t.toString());const n=this.getDelay(e.response,t,r.delay);return yield this.sleep(n),yield this.executeWithRetry(e,t,r)}return}catch(e){throw e}})}execute(e){return __awaiter(this,void 0,void 0,function*(){try{const t=0,r=this.getOptions(e);return TelemetryHandlerOptions.updateFeatureUsageFlag(e,le.RETRY_HANDLER_ENABLED),yield this.executeWithRetry(e,t,r)}catch(e){throw e}})}setNext(e){this.nextMiddleware=e}}RetryHandler.RETRY_STATUS_CODES=[429,503,504],RetryHandler.RETRY_ATTEMPT_HEADER="Retry-Attempt",RetryHandler.RETRY_AFTER_HEADER="Retry-After";class RedirectHandlerOptions{constructor(e=RedirectHandlerOptions.DEFAULT_MAX_REDIRECTS,t=RedirectHandlerOptions.DEFAULT_SHOULD_RETRY){if(e>RedirectHandlerOptions.MAX_MAX_REDIRECTS){const e=new Error(`MaxRedirects should not be more than ${RedirectHandlerOptions.MAX_MAX_REDIRECTS}`);throw e.name="MaxLimitExceeded",e}if(e<0){const e=new Error("MaxRedirects should not be negative");throw e.name="MinExpectationNotMet",e}this.maxRedirects=e,this.shouldRedirect=t}}RedirectHandlerOptions.DEFAULT_MAX_REDIRECTS=5,RedirectHandlerOptions.MAX_MAX_REDIRECTS=20,RedirectHandlerOptions.DEFAULT_SHOULD_RETRY=(()=>!0);class RedirectHandler{constructor(e=new RedirectHandlerOptions){this.options=e}isRedirect(e){return-1!==RedirectHandler.REDIRECT_STATUS_CODES.indexOf(e.status)}hasLocationHeader(e){return e.headers.has(RedirectHandler.LOCATION_HEADER)}getLocationHeader(e){return e.headers.get(RedirectHandler.LOCATION_HEADER)}isRelativeURL(e){return-1===e.indexOf("://")}shouldDropAuthorizationHeader(e,t){const r=/^[A-Za-z].+?:\/\/.+?(?=\/|$)/,n=r.exec(e);let o,i;null!==n&&(o=n[0]);const s=r.exec(t);return null!==s&&(i=s[0]),void 0!==o&&void 0!==i&&o!==i}updateRequestUrl(e,t){return __awaiter(this,void 0,void 0,function*(){t.request="string"==typeof t.request?e:yield ae(e,t.request)})}getOptions(e){let t;return e.middlewareControl instanceof MiddlewareControl&&(t=e.middlewareControl.getMiddlewareOptions(RedirectHandlerOptions)),void 0===t&&(t=Object.assign(new RedirectHandlerOptions,this.options)),t}executeWithRedirect(e,t,r){return __awaiter(this,void 0,void 0,function*(){try{yield this.nextMiddleware.execute(e);const n=e.response;if(!(t<r.maxRedirects&&this.isRedirect(n)&&this.hasLocationHeader(n)&&r.shouldRedirect(n)))return;if(++t,n.status===RedirectHandler.STATUS_CODE_SEE_OTHER)e.options.method=te.GET,delete e.options.body;else{const t=this.getLocationHeader(n);!this.isRelativeURL(t)&&this.shouldDropAuthorizationHeader(n.url,t)&&ie(e.request,e.options,RedirectHandler.AUTHORIZATION_HEADER,void 0),yield this.updateRequestUrl(t,e)}yield this.executeWithRedirect(e,t,r)}catch(e){throw e}})}execute(e){return __awaiter(this,void 0,void 0,function*(){try{const t=0,r=this.getOptions(e);return e.options.redirect=RedirectHandler.MANUAL_REDIRECT,TelemetryHandlerOptions.updateFeatureUsageFlag(e,le.REDIRECT_HANDLER_ENABLED),yield this.executeWithRedirect(e,t,r)}catch(e){throw e}})}setNext(e){this.nextMiddleware=e}}RedirectHandler.REDIRECT_STATUS_CODES=[301,302,303,307,308],RedirectHandler.STATUS_CODE_SEE_OTHER=303,RedirectHandler.LOCATION_HEADER="Location",RedirectHandler.AUTHORIZATION_HEADER="Authorization",RedirectHandler.MANUAL_REDIRECT="manual";const ce="2.0.0";class TelemetryHandler{execute(e){return __awaiter(this,void 0,void 0,function*(){try{let t=oe(e.request,e.options,TelemetryHandler.CLIENT_REQUEST_ID_HEADER);null===t&&(t=ne(),ie(e.request,e.options,TelemetryHandler.CLIENT_REQUEST_ID_HEADER,t));let r,n=`${TelemetryHandler.PRODUCT_NAME}/${ce}`;if(e.middlewareControl instanceof MiddlewareControl&&(r=e.middlewareControl.getMiddlewareOptions(TelemetryHandlerOptions)),void 0!==r){const e=r.getFeatureUsage();n+=` (${TelemetryHandler.FEATURE_USAGE_STRING}=${e})`}return se(e.request,e.options,TelemetryHandler.SDK_VERSION_HEADER,n),yield this.nextMiddleware.execute(e)}catch(e){throw e}})}setNext(e){this.nextMiddleware=e}}TelemetryHandler.CLIENT_REQUEST_ID_HEADER="client-request-id",TelemetryHandler.SDK_VERSION_HEADER="SdkVersion",TelemetryHandler.PRODUCT_NAME="graph-js",TelemetryHandler.FEATURE_USAGE_STRING="featureUsage";const de="v1.0",pe="https://graph.microsoft.com/";class CustomAuthenticationProvider{constructor(e){this.provider=e}getAccessToken(){return __awaiter(this,void 0,void 0,function*(){return new Promise((e,t)=>{this.provider((r,n)=>{n?e(n):t(r)})})})}}class GraphError{constructor(e=-1){this.statusCode=e,this.code=null,this.message=null,this.requestId=null,this.date=new Date,this.body=null}}class GraphErrorHandler{static constructError(e,t){const r=new GraphError(t);return void 0!==e.name&&(r.code=e.name),r.body=e.toString(),r.message=e.message,r.date=new Date,r}static constructErrorFromResponse(e,t){e=e.error;const r=new GraphError(t);r.code=e.code,r.message=e.message,void 0!==e.innerError&&(r.requestId=e.innerError["request-id"],r.date=new Date(e.innerError.date));try{r.body=JSON.stringify(e)}catch(e){}return r}static getError(e=null,t=-1,r){return __awaiter(this,void 0,void 0,function*(){let n;if(n=e&&e.error?GraphErrorHandler.constructErrorFromResponse(e,t):"undefined"!=typeof Error&&e instanceof Error?GraphErrorHandler.constructError(e,t):new GraphError(t),"function"!=typeof r)return n;r(n,null)})}}const ue=["$select","$expand","$orderby","$filter","$top","$skip","$skipToken","$count"],he=e=>{const t=e=>e.replace(/\/+$/,""),r=e=>e.replace(/^\/+/,"");return Array.prototype.slice.call(e).reduce((e,n)=>[t(e),r(n)].join("/"))},ge=e=>{const t=e.constructor.name;if("Buffer"===t||"Blob"===t||"File"===t||"FormData"===t||"string"==typeof e)return e;if("ArrayBuffer"===t)e=Buffer.from(e);else if("Int8Array"===t||"Int16Array"===t||"Int32Array"===t||"Uint8Array"===t||"Uint16Array"===t||"Uint32Array"===t||"Uint8ClampedArray"===t||"Float32Array"===t||"Float64Array"===t||"DataView"===t)e=Buffer.from(e.buffer);else try{e=JSON.stringify(e)}catch(e){throw new Error("Unable to stringify the content")}return e};var me,fe,ye,ve;!function(e){e.ARRAYBUFFER="arraybuffer",e.BLOB="blob",e.DOCUMENT="document",e.JSON="json",e.RAW="raw",e.STREAM="stream",e.TEXT="text"}(me||(me={})),function(e){e.TEXT_HTML="text/html",e.TEXT_XML="text/xml",e.APPLICATION_XML="application/xml",e.APPLICATION_XHTML="application/xhtml+xml"}(fe||(fe={})),function(e){e.TEXT_PLAIN="text/plain",e.APPLICATION_JSON="application/json"}(ye||(ye={})),function(e){e.DOCUMENT="^(text\\/(html|xml))|(application\\/(xml|xhtml\\+xml))$",e.IMAGE="^image\\/.+"}(ve||(ve={}));class GraphResponseHandler{static parseDocumentResponse(e,t){try{return"undefined"!=typeof DOMParser?new Promise((r,n)=>{e.text().then(e=>{try{const o=(new DOMParser).parseFromString(e,t);r(o)}catch(e){n(e)}})}):Promise.resolve(e.body)}catch(e){throw e}}static convertResponse(e,t){return __awaiter(this,void 0,void 0,function*(){if(204===e.status)return Promise.resolve();let r;try{switch(t){case me.ARRAYBUFFER:r=yield e.arrayBuffer();break;case me.BLOB:r=yield e.blob();break;case me.DOCUMENT:r=yield GraphResponseHandler.parseDocumentResponse(e,fe.TEXT_XML);break;case me.JSON:r=yield e.json();break;case me.STREAM:r=yield Promise.resolve(e.body);break;case me.TEXT:r=yield e.text();break;default:const n=e.headers.get("Content-type");if(null!==n){const t=n.split(";")[0];r=new RegExp(ve.DOCUMENT).test(t)?yield GraphResponseHandler.parseDocumentResponse(e,t):new RegExp(ve.IMAGE).test(t)?e.blob():t===ye.TEXT_PLAIN?yield e.text():t===ye.APPLICATION_JSON?yield e.json():Promise.resolve(e.body)}else r=Promise.resolve(e.body)}}catch(e){throw e}return r})}static getResponse(e,t,r){return __awaiter(this,void 0,void 0,function*(){try{if(t===me.RAW)return Promise.resolve(e);{const n=yield GraphResponseHandler.convertResponse(e,t);if(!e.ok)throw n;if("function"!=typeof r)return n;r(null,n)}}catch(e){throw e}})}}class GraphRequest{constructor(e,t,r){this.parsePath=(e=>{if(-1!==e.indexOf("https://")){const t=(e=e.replace("https://","")).indexOf("/");-1!==t&&(this.urlComponents.host="https://"+e.substring(0,t),e=e.substring(t+1,e.length));const r=e.indexOf("/");-1!==r&&(this.urlComponents.version=e.substring(0,r),e=e.substring(r+1,e.length))}"/"===e.charAt(0)&&(e=e.substr(1));const t=e.indexOf("?");if(-1===t)this.urlComponents.path=e;else{this.urlComponents.path=e.substr(0,t);const r=e.substring(t+1,e.length).split("&");for(const e of r){const t=e.split("="),r=t[0],n=t[1];-1!==ue.indexOf(r)?this.urlComponents.oDataQueryParams[r]=n:this.urlComponents.otherURLQueryParams[r]=n}}}),this.httpClient=e,this.config=t,this.urlComponents={host:this.config.baseUrl,version:this.config.defaultVersion,oDataQueryParams:{},otherURLQueryParams:{}},this._headers={},this._options={},this._middlewareOptions=[],this.parsePath(r)}addCsvQueryParameter(e,t,r){this.urlComponents.oDataQueryParams[e]=this.urlComponents.oDataQueryParams[e]?this.urlComponents.oDataQueryParams[e]+",":"";let n=[];r.length>1&&"string"==typeof t?n=Array.prototype.slice.call(r):"string"==typeof t?n.push(t):n=n.concat(t),this.urlComponents.oDataQueryParams[e]+=n.join(",")}buildFullUrl(){const e=he([this.urlComponents.host,this.urlComponents.version,this.urlComponents.path])+this.createQueryString();return this.config.debugLogging&&console.log(e),e}createQueryString(){const e=this.urlComponents,t=[];if(0!==Object.keys(e.oDataQueryParams).length)for(const r in e.oDataQueryParams)e.oDataQueryParams.hasOwnProperty(r)&&t.push(r+"="+e.oDataQueryParams[r]);if(0!==Object.keys(e.otherURLQueryParams).length)for(const r in e.otherURLQueryParams)e.otherURLQueryParams.hasOwnProperty(r)&&t.push(r+"="+e.otherURLQueryParams[r]);return t.length>0?"?"+t.join("&"):""}updateRequestOptions(e){const t=Object.assign({},e.headers);if(void 0!==this.config.fetchOptions){const t=Object.assign({},this.config.fetchOptions);Object.assign(e,t),void 0!==typeof this.config.fetchOptions.headers&&(e.headers=Object.assign({},this.config.fetchOptions.headers))}Object.assign(e,this._options),void 0!==e.headers&&Object.assign(t,e.headers),Object.assign(t,this._headers),e.headers=t}send(e,t,r){return __awaiter(this,void 0,void 0,function*(){let n;const o=new MiddlewareControl(this._middlewareOptions);this.updateRequestOptions(t);try{return n=(yield this.httpClient.sendRequest({request:e,options:t,middlewareControl:o})).response,yield GraphResponseHandler.getResponse(n,this._responseType,r)}catch(e){let t;throw void 0!==n&&(t=n.status),yield GraphErrorHandler.getError(e,t,r)}})}header(e,t){return this._headers[e]=t,this}headers(e){for(const t in e)e.hasOwnProperty(t)&&(this._headers[t]=e[t]);return this}option(e,t){return this._options[e]=t,this}options(e){for(const t in e)e.hasOwnProperty(t)&&(this._options[t]=e[t]);return this}middlewareOptions(e){return this._middlewareOptions=e,this}version(e){return this.urlComponents.version=e,this}responseType(e){return this._responseType=e,this}select(e){return this.addCsvQueryParameter("$select",e,arguments),this}expand(e){return this.addCsvQueryParameter("$expand",e,arguments),this}orderby(e){return this.addCsvQueryParameter("$orderby",e,arguments),this}filter(e){return this.urlComponents.oDataQueryParams.$filter=e,this}search(e){return this.urlComponents.oDataQueryParams.$search=e,this}top(e){return this.urlComponents.oDataQueryParams.$top=e,this}skip(e){return this.urlComponents.oDataQueryParams.$skip=e,this}skipToken(e){return this.urlComponents.oDataQueryParams.$skipToken=e,this}count(e){return this.urlComponents.oDataQueryParams.$count=e.toString(),this}query(e){const t=this.urlComponents.otherURLQueryParams;if("string"==typeof e){const r=e.split("="),n=r[0],o=r[1];t[n]=o}else for(const r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);return this}get(e){return __awaiter(this,void 0,void 0,function*(){const t=this.buildFullUrl(),r={method:te.GET};try{return yield this.send(t,r,e)}catch(e){throw e}})}post(e,t){return __awaiter(this,void 0,void 0,function*(){const r=this.buildFullUrl(),n={method:te.POST,body:ge(e),headers:"undefined"!=typeof FormData&&e instanceof FormData?{}:{"Content-Type":"application/json"}};try{return yield this.send(r,n,t)}catch(e){throw e}})}create(e,t){return __awaiter(this,void 0,void 0,function*(){try{return yield this.post(e,t)}catch(e){throw e}})}put(e,t){return __awaiter(this,void 0,void 0,function*(){const r=this.buildFullUrl(),n={method:te.PUT,body:ge(e),headers:{"Content-Type":"application/json"}};try{return yield this.send(r,n,t)}catch(e){throw e}})}patch(e,t){return __awaiter(this,void 0,void 0,function*(){const r=this.buildFullUrl(),n={method:te.PATCH,body:ge(e),headers:{"Content-Type":"application/json"}};try{return yield this.send(r,n,t)}catch(e){throw e}})}update(e,t){return __awaiter(this,void 0,void 0,function*(){try{return yield this.patch(e,t)}catch(e){throw e}})}delete(e){return __awaiter(this,void 0,void 0,function*(){const t=this.buildFullUrl(),r={method:te.DELETE};try{return yield this.send(t,r,e)}catch(e){throw e}})}del(e){return __awaiter(this,void 0,void 0,function*(){try{return yield this.delete(e)}catch(e){throw e}})}getStream(e){return __awaiter(this,void 0,void 0,function*(){const t=this.buildFullUrl(),r={method:te.GET};this.responseType(me.STREAM);try{return yield this.send(t,r,e)}catch(e){throw e}})}putStream(e,t){return __awaiter(this,void 0,void 0,function*(){const r=this.buildFullUrl(),n={method:te.PUT,headers:{"Content-Type":"application/octet-stream"},body:e};try{return yield this.send(r,n,t)}catch(e){throw e}})}}class HTTPClient{constructor(e){this.middleware=e}sendRequest(e){return __awaiter(this,void 0,void 0,function*(){try{if("string"==typeof e.request&&void 0===e.options){const e=new Error;throw e.name="InvalidRequestOptions",e.message="Unable to execute the middleware, Please provide valid options for a request",e}return yield this.middleware.execute(e),e}catch(e){throw e}})}}const ke=()=>new Function("try {return this === global;}catch(e){return false;}")();class HTTPClientFactory{static createWithAuthenticationProvider(e){const t=new AuthenticationHandler(e),r=new RetryHandler(new RetryHandlerOptions),n=new TelemetryHandler,o=new HTTPMessageHandler;if(t.setNext(r),ke()){const e=new RedirectHandler(new RedirectHandlerOptions);r.setNext(e),e.setNext(n)}else r.setNext(n);return n.setNext(o),HTTPClientFactory.createWithMiddleware(t)}static createWithMiddleware(e){return new HTTPClient(e)}}const we=()=>{if("undefined"==typeof Promise&&"undefined"==typeof fetch){const e=new Error("Library cannot function without Promise and fetch. So, please provide polyfill for them.");throw e.name="PolyFillNotAvailable",e}if("undefined"==typeof Promise){const e=new Error("Library cannot function without Promise. So, please provide polyfill for it.");throw e.name="PolyFillNotAvailable",e}if("undefined"==typeof fetch){const e=new Error("Library cannot function without fetch. So, please provide polyfill for it.");throw e.name="PolyFillNotAvailable",e}return!0};class Client{constructor(e){this.config={baseUrl:pe,debugLogging:!1,defaultVersion:de};try{we()}catch(e){throw e}for(const t in e)e.hasOwnProperty(t)&&(this.config[t]=e[t]);let t;if(void 0!==e.authProvider&&void 0!==e.middleware){const e=new Error;throw e.name="AmbiguityInInitialization",e.message="Unable to Create Client, Please provide either authentication provider for default middleware chain or custom middleware chain not both",e}if(void 0!==e.authProvider)t=HTTPClientFactory.createWithAuthenticationProvider(e.authProvider);else{if(void 0===e.middleware){const e=new Error;throw e.name="InvalidMiddlewareChain",e.message="Unable to Create Client, Please provide either authentication provider for default middleware chain or custom middleware chain",e}t=new HTTPClient(e.middleware)}this.httpClient=t}static init(e){const t={};for(const r in e)e.hasOwnProperty(r)&&(t[r]="authProvider"===r?new CustomAuthenticationProvider(e[r]):e[r]);return Client.initWithMiddleware(t)}static initWithMiddleware(e){try{return new Client(e)}catch(e){throw e}}api(e){return new GraphRequest(this.httpClient,this.config,e)}}const Te="1.0.0";function prepScopes(...e){return[new AuthenticationHandlerOptions(void 0,{scopes:e})]}class SdkVersionMiddleware{constructor(){_defineProperty(this,"nextMiddleware",void 0)}async execute(e){try{let t=`mgt/${Te}`;return t+=", "+oe(e.request,e.options,"SdkVersion"),ie(e.request,e.options,"SdkVersion",t),await this.nextMiddleware.execute(e)}catch(e){throw e}}setNext(e){this.nextMiddleware=e}}class BatchRequest{constructor(e,t){_defineProperty(this,"resource",void 0),_defineProperty(this,"method",void 0),"/"!==e.charAt(0)&&(e="/"+e),this.resource=e,this.method=t}}class Batch{constructor(e){_defineProperty(this,"requests",new Map),_defineProperty(this,"scopes",[]),_defineProperty(this,"client",void 0),this.client=e}get(e,t,r){const n=new BatchRequest(t,"GET");this.requests.set(e,n),r&&(this.scopes=this.scopes.concat(r))}async execute(){const e={};if(!this.requests.size)return e;let t=new BatchRequestContent;for(let e of this.requests)t.addRequest({id:e[0],request:new Request(Batch.baseUrl+e[1].resource,{method:e[1].method})});let r=this.client.api("$batch").version("beta");this.scopes.length&&(r=r.middlewareOptions(prepScopes(...this.scopes)));let n=await r.post(await t.getContent());for(let t of n.responses)200!==t.status?t[t.id]=null:t.headers["Content-Type"].includes("image/jpeg")?e[t.id]="data:image/jpeg;base64,"+t.body:e[t.id]=t.body;return e}}_defineProperty(Batch,"baseUrl","https://graph.microsoft.com");class Graph{constructor(e){if(_defineProperty(this,"client",void 0),e){let t=new AuthenticationHandler(e);const r=new RetryHandler(new RetryHandlerOptions),n=new TelemetryHandler,o=new SdkVersionMiddleware,i=new HTTPMessageHandler;t.setNext(r),r.setNext(n),n.setNext(o),o.setNext(i),this.client=Client.initWithMiddleware({middleware:t})}}blobToBase64(e){return new Promise((t,r)=>{const n=new FileReader;n.onerror=r,n.onload=(e=>{t(n.result)}),n.readAsDataURL(e)})}createBatch(){return new Batch(this.client)}async getMe(){return this.client.api("me").middlewareOptions(prepScopes("user.read")).get()}async getUser(e){return this.client.api(`/users/${e}`).middlewareOptions(prepScopes("user.readbasic.all")).get()}async findPerson(e){let t=await this.client.api("/me/people").search('"'+e+'"').middlewareOptions(prepScopes("people.read")).get();return t?t.value:null}async findContactByEmail(e){let t=await this.client.api("/me/contacts").filter(`emailAddresses/any(a:a/address eq '${e}')`).middlewareOptions(prepScopes("contacts.read")).get();return t?t.value:null}async findUserByEmail(e){return Promise.all([this.findPerson(e),this.findContactByEmail(e)]).then(([e,t])=>(e||[]).concat(t||[]))}async getPhotoForResource(e,t){try{let r=await this.client.api(`${e}/photo/$value`).version("beta").responseType(me.BLOB).middlewareOptions(prepScopes(...t)).get();return await this.blobToBase64(r)}catch(e){return null}}async myPhoto(){return this.getPhotoForResource("me",["user.read"])}async getUserPhoto(e){return this.getPhotoForResource(`users/${e}`,["user.readbasic.all"])}async getContactPhoto(e){return this.getPhotoForResource(`me/contacts/${e}`,["contacts.read"])}async getEvents(e,t,r){let n;n=r?`groups/${r}/calendar`:"me",n+=`/calendarview?${`startdatetime=${e.toISOString()}`}&${`enddatetime=${t.toISOString()}`}`;let o=await this.client.api(n).middlewareOptions(prepScopes("calendars.read")).orderby("start/dateTime").get();return o?o.value:null}async getPeople(){let e=await this.client.api("/me/people").middlewareOptions(prepScopes("people.read")).filter("personType/class eq 'Person'").get();return e?e.value:null}async getPeopleFromGroup(e){let t=`/groups/${e}/members`,r=await this.client.api(t).middlewareOptions(prepScopes("people.read")).get();return r?r.value:null}async planner_getAllMyPlans(){let e=await this.client.api("/me/planner/plans").header("Cache-Control","no-store").middlewareOptions(prepScopes("Group.Read.All")).get();return e&&e.value}async planner_getSinglePlan(e){return await this.client.api(`/planner/plans/${e}`).header("Cache-Control","no-store").middlewareOptions(prepScopes("Group.Read.All")).get()}async planner_getBucketsForPlan(e){let t=await this.client.api(`/planner/plans/${e}/buckets`).header("Cache-Control","no-store").middlewareOptions(prepScopes("Group.Read.All")).get();return t&&t.value}async planner_getTasksForBucket(e){let t=await this.client.api(`/planner/buckets/${e}/tasks`).header("Cache-Control","no-store").middlewareOptions(prepScopes("Group.Read.All")).get();return t&&t.value}async planner_setTaskDetails(e,t,r){return await this.client.api(`/planner/tasks/${e}`).header("Cache-Control","no-store").middlewareOptions(prepScopes("Group.ReadWrite.All")).header("If-Match",r).patch(JSON.stringify(t))}async planner_setTaskComplete(e,t){return this.planner_setTaskDetails(e,{percentComplete:100},t)}async planner_setTaskIncomplete(e,t){return this.planner_setTaskDetails(e,{percentComplete:0},t)}async planner_addTask(e){return this.client.api("/planner/tasks").header("Cache-Control","no-store").middlewareOptions(prepScopes("Group.ReadWrite.All")).post(e)}async planner_removeTask(e,t){return this.client.api(`/planner/tasks/${e}`).header("Cache-Control","no-store").header("If-Match",t).middlewareOptions(prepScopes("Group.ReadWrite.All")).delete()}async todo_getAllMyGroups(){let e=await this.client.api("/me/outlook/taskGroups").header("Cache-Control","no-store").version("beta").middlewareOptions(prepScopes("Tasks.Read")).get();return e&&e.value}async todo_getSingleGroup(e){return await this.client.api(`/me/outlook/taskGroups/${e}`).header("Cache-Control","no-store").version("beta").middlewareOptions(prepScopes("Tasks.Read")).get()}async todo_getFoldersForGroup(e){let t=await this.client.api(`/me/outlook/taskGroups/${e}/taskFolders`).header("Cache-Control","no-store").version("beta").middlewareOptions(prepScopes("Tasks.Read")).get();return t&&t.value}async todo_getAllTasksForFolder(e){let t=await this.client.api(`/me/outlook/taskFolders/${e}/tasks`).header("Cache-Control","no-store").version("beta").middlewareOptions(prepScopes("Tasks.Read")).get();return t&&t.value}async todo_setTaskDetails(e,t,r){return await this.client.api(`/me/outlook/tasks/${e}`).header("Cache-Control","no-store").version("beta").header("If-Match",r).middlewareOptions(prepScopes("Tasks.ReadWrite")).patch(t)}async todo_setTaskComplete(e,t){return await this.todo_setTaskDetails(e,{status:"completed",isReminderOn:!1},t)}async todo_setTaskIncomplete(e,t){return await this.todo_setTaskDetails(e,{status:"notStarted",isReminderOn:!0},t)}async todo_addTask(e){let{parentFolderId:t=null}=e;return t?await this.client.api(`/me/outlook/taskFolders/${t}/tasks`).header("Cache-Control","no-store").version("beta").middlewareOptions(prepScopes("Tasks.ReadWrite")).post(e):await this.client.api("/me/outlook/tasks").header("Cache-Control","no-store").version("beta").middlewareOptions(prepScopes("Tasks.ReadWrite")).post(e)}async todo_removeTask(e,t){return await this.client.api(`/me/outlook/tasks/${e}`).header("Cache-Control","no-store").version("beta").header("If-Match",t).middlewareOptions(prepScopes("Tasks.ReadWrite")).delete()}}const Ce=document.createElement("style");Ce.type="text/css",Ce.appendChild(document.createTextNode("\n@font-face {\n    font-family: 'FabricMDL2Icons';\n    src: url('https://static2.sharepointonline.com/files/fabric/assets/icons/fabricmdl2icons-2.68.woff2') format('woff2'),\n    url(https://static2.sharepointonline.com/files/fabric/assets/icons/fabricmdl2icons-2.68.woff) format(\"woff\"),\n    url(https://static2.sharepointonline.com/files/fabric/assets/icons/fabricmdl2icons-2.68.ttf) format(\"truetype\");;\n}\n")),document.head.appendChild(Ce);const be=new WeakMap,_e=r(e=>t=>{if(!(t instanceof AttributePart)||t instanceof PropertyPart||"class"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:r}=t,{element:n}=r;be.has(t)||(n.className=r.strings.join(" "));const{classList:o}=n,i=be.get(t);for(const t in i)t in e||o.remove(t);for(const t in e){const r=e[t];if(!i||r!==i[t]){o[r?"add":"remove"](t)}}be.set(t,e)});function getEmailFromGraphEntity(e){const t=e,r=e,n=e;return r.mail?r.mail:t.scoredEmailAddresses&&t.scoredEmailAddresses.length?t.scoredEmailAddresses[0].address:n.emailAddresses&&n.emailAddresses.length?n.emailAddresses[0].address:null}class TemplateHelper{static getValueFromObject(e,t){let r=t.trim().split("."),n=e;for(let e=0;e<r.length;e++){if(!(n=n[r[e]]))return null}return n}static replaceExpression(e,t,r){return e.replace(this._converterExpression,e=>r?this.evalInContext(e.substring(3,e.length-3).trim(),function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(r,!0).forEach(function(t){_defineProperty(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},r,{},t)):"").replace(this._expression,e=>{let r=e.substring(2,e.length-2),n=this.getValueFromObject(t,r);return n?"object"==typeof n?JSON.stringify(n):n.toString():""})}static renderNode(e,t,r){if("#text"===e.nodeName)return e.textContent=this.replaceExpression(e.textContent,t,r),e;let n=e;if(n.attributes)for(let e=0;e<n.attributes.length;e++){let o=n.attributes[e];n.setAttribute(o.name,this.replaceExpression(o.value,t,r))}let o=[],i=[],s=!1;for(let n=0;n<e.childNodes.length;n++){let a=e.childNodes[n],l=a,c=!1;if(l.dataset){let e=!1;if(l.dataset.if){let r=l.dataset.if;this.evalBoolInContext(r,t)?(l.removeAttribute("data-if"),s=!0,c=!0):(i.push(l),e=!0)}else void 0!==l.dataset.else&&(s?(i.push(l),e=!0):l.removeAttribute("data-else"));l.dataset.for&&!e?o.push(l):e||this.renderNode(a,t,r)}else this.renderNode(a,t,r);c||"#text"===a.nodeName||(s=!1)}for(let e=0;e<i.length;e++)n.removeChild(i[e]);for(let e=0;e<o.length;e++){let i=o[e],s=i.dataset.for.split(" ");if(s.length>1){let e=s[0],o=s[s.length-1],a=this.getValueFromObject(t,o);if(Array.isArray(a)){n.removeChild(i),i.removeAttribute("data-for");for(let t=0;t<a.length;t++){let o={};o[e]=a[t],o.index=t;let s=i.cloneNode(!0);this.renderNode(s,o,r),n.appendChild(s)}}}}return e}static evalBoolInContext(e,t){return new Function("with(this) { return !!("+e+")}").call(t)}static evalInContext(e,t){let r,n=new Function("with(this) { return "+e+";}");try{r=n.call(t)}catch(e){console.log(e)}return r}static renderTemplate(e,t,r){if(e.content&&e.content.childNodes.length){let n=e.content.cloneNode(!0);return this.renderNode(n,t,r)}if(e.childNodes.length){let n=document.createElement("div");for(let t=0;t<e.childNodes.length;t++)n.appendChild(e.childNodes[t].cloneNode(!0));return this.renderNode(n,t,r)}}}_defineProperty(TemplateHelper,"_expression",/{{\s*[\w\.]+\s*}}/g),_defineProperty(TemplateHelper,"_converterExpression",/{{{\s*[\w\.()]+\s*}}}/g);class MgtBaseComponent extends LitElement{fireCustomEvent(e,t){let r=new CustomEvent(e,{cancelable:!0,bubbles:!1,detail:t});return this.dispatchEvent(r)}static get useShadowRoot(){return this._useShadowRoot}static set useShadowRoot(e){this._useShadowRoot=e}constructor(){super(),this.isShadowRootDisabled()&&(this._needsShimAdoptedStyleSheets=!0)}createRenderRoot(){return this.isShadowRootDisabled()?this:super.createRenderRoot()}isShadowRootDisabled(){return!MgtBaseComponent._useShadowRoot||!this.constructor._useShadowRoot}}_defineProperty(MgtBaseComponent,"_useShadowRoot",!0);class MgtTemplatedComponent extends MgtBaseComponent{constructor(){super(),_defineProperty(this,"_renderedSlots",!1),_defineProperty(this,"_slotNamesAddedDuringRender",[]),_defineProperty(this,"templates",{}),_defineProperty(this,"templateConverters",{}),this.templateConverters.lower=(e=>e.toLowerCase()),this.templateConverters.upper=(e=>e.toUpperCase())}update(e){this.templates=this.getTemplates(),this._slotNamesAddedDuringRender=[],super.update(e)}updated(){this.removeUnusedSlottedElements()}getTemplates(){let e={};for(let t=0;t<this.children.length;t++){let r=this.children[t];if("TEMPLATE"==r.nodeName){let t=r;t.dataset.type?e[t.dataset.type]=t:e.default=t}}return e}removeUnusedSlottedElements(){if(this._renderedSlots){for(let e=0;e<this.children.length;e++){let t=this.children[e];t.dataset&&t.dataset.generated&&!this._slotNamesAddedDuringRender.includes(t.slot)&&(this.removeChild(t),e--)}this._renderedSlots=!1}}renderTemplate(e,t,r){if(!this.templates[e])return null;r=r||e,this._slotNamesAddedDuringRender.push(r),this._renderedSlots=!0;for(let e=0;e<this.children.length;e++)if(this.children[e].slot==r)return b`
          <slot name=${r}></slot>
        `;let n=TemplateHelper.renderTemplate(this.templates[e],t,this.templateConverters),o=document.createElement("div");return o.slot=r,o.dataset.generated="template",o.appendChild(n),this.appendChild(o),this.fireCustomEvent("templateRendered",{templateType:e,context:t,element:o}),b`
      <slot name=${r}></slot>
    `}}const Se=[Z`
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/*
  Your use of the content in the files referenced here is subject to the terms of the license at http://aka.ms/fabric-assets-license
*/
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
:host([hidden]) {
  display: none; }

:host {
  display: block;
  --default-font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  --theme-primary-color: #0078d7;
  --theme-dark-color: #005a9e; }

.ms-Icon {
  display: inline-block;
  font-family: "FabricMDL2Icons";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  margin: 4px 0; }

.ms-Icon--ChevronDown::before {
  content: "\\\E70D"; }

.ms-Icon--ChevronUp::before {
  content: "\\\E70E"; }

.ms-Icon--Contact::before {
  content: "\\\E77B"; }

.ms-Icon--AddFriend::before {
  content: "\\\E8FA"; }

.ms-Icon--OutlookLogoInverse::before {
  content: "\\\EB6D"; }

:host .root {
  display: inline-block;
  position: relative; }

:host svg,
mgt-person svg {
  width: var(--avatar-size-s, 24px);
  height: var(--avatar-size-s, 24px); }

:host img,
mgt-person img {
  border: var(--avatar-border);
  border-radius: 50%; }

:host .person-root,
mgt-person .person-root {
  position: relative;
  display: flex;
  align-items: center;
  font-family: var(--default-font-family, "Segoe UI"); }

:host .Details,
mgt-person .Details {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  margin-left: 12px; }
  :host .Details.small,
  mgt-person .Details.small {
    margin-left: 6px; }

:host .user-avatar,
mgt-person .user-avatar {
  width: var(--avatar-size, 48px);
  height: var(--avatar-size, 48px); }
  :host .user-avatar.initials,
  mgt-person .user-avatar.initials {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--initials-color, white);
    background-color: var(--initials-background-color, #b4009e);
    border-radius: 50%;
    font-weight: 400;
    font-size: 60%; }
  :host .user-avatar.small,
  mgt-person .user-avatar.small {
    width: var(--avatar-size-s, 24px);
    height: var(--avatar-size-s, 24px); }
  :host .user-avatar.row-span-2,
  mgt-person .user-avatar.row-span-2 {
    width: var(--avatar-size, 48px);
    height: var(--avatar-size, 48px); }
  :host .user-avatar.row-span-3,
  mgt-person .user-avatar.row-span-3 {
    width: var(--avatar-size, 48px);
    height: var(--avatar-size, 48px); }

:host .avatar-icon,
mgt-person .avatar-icon {
  flex: 1 1 auto;
  line-height: 1;
  margin: 0;
  font-size: var(--avatar-size, 48px); }
  :host .avatar-icon.small,
  mgt-person .avatar-icon.small {
    font-size: var(--avatar-size-s, 24px); }
  :host .avatar-icon.row-span-2,
  mgt-person .avatar-icon.row-span-2 {
    grid-row: 1 / 3;
    -ms-grid-row: 1;
    -ms-grid-row-span: 2; }
  :host .avatar-icon.row-span-3,
  mgt-person .avatar-icon.row-span-3 {
    grid-row: 1 / 4;
    -ms-grid-row: 1;
    -ms-grid-row-span: 3; }

:host .user-name,
mgt-person .user-name {
  font-size: var(--font-size, 14px);
  font-weight: var(--font-weight, 600);
  white-space: nowrap;
  grid-column: 2;
  -ms-grid-column: 2; }

:host .user-email,
mgt-person .user-email {
  color: var(--email-color, #323130);
  font-size: var(--email-font-size, 12px);
  white-space: nowrap;
  grid-column: 2;
  -ms-grid-column: 2;
  grid-row: 2;
  -ms-grid-row: 2; }

.root .flyout {
  display: none;
  position: absolute;
  z-index: 1;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 0.1s;
  padding: 8px; }

.root .flyout.visible {
  display: inline-block;
  opacity: 1; }
  .root .flyout.visible.openLeft {
    right: 0; }

`];var Ae;(Ae=e.PersonCardInteraction||(e.PersonCardInteraction={}))[Ae.none=0]="none",Ae[Ae.hover=1]="hover",Ae[Ae.click=2]="click";let Pe=_decorate([B("mgt-person")],function(t,r){class MgtPerson extends r{constructor(...e){super(...e),t(this)}}return{F:MgtPerson,d:[{kind:"field",decorators:[property({attribute:"person-query"})],key:"personQuery",value:void 0},{kind:"field",decorators:[property({attribute:"user-id"})],key:"userId",value:void 0},{kind:"field",decorators:[property({attribute:"show-name",type:Boolean})],key:"showName",value:void 0},{kind:"field",decorators:[property({attribute:"show-email",type:Boolean})],key:"showEmail",value:void 0},{kind:"field",decorators:[property({attribute:"person-details",type:Object})],key:"personDetails",value:void 0},{kind:"field",decorators:[property({attribute:"person-image",type:String})],key:"personImage",value:void 0},{kind:"field",decorators:[property({attribute:"person-card",converter:(t,r)=>(t=t.toLowerCase(),e.PersonCardInteraction[t]||e.PersonCardInteraction.none)})],key:"personCardInteraction",value:()=>e.PersonCardInteraction.none},{kind:"field",decorators:[property({attribute:!1})],key:"_isPersonCardVisible",value:()=>!1},{kind:"field",decorators:[property({attribute:!1})],key:"_personCardShouldRender",value:()=>!1},{kind:"field",key:"_mouseLeaveTimeout",value:void 0},{kind:"field",key:"_mouseEnterTimeout",value:void 0},{kind:"field",key:"_openLeft",value:()=>!1},{kind:"field",key:"_openUp",value:()=>!1},{kind:"method",key:"attributeChangedCallback",value:function attributeChangedCallback(e,t,r){_get(_getPrototypeOf(MgtPerson.prototype),"attributeChangedCallback",this).call(this,e,t,r),"person-query"!==e&&"user-id"!==e||t===r||(this.personDetails=null,this.loadData())}},{kind:"get",static:!0,key:"styles",value:function styles(){return Se}},{kind:"method",key:"firstUpdated",value:function firstUpdated(){Providers.onProviderUpdated(()=>this.loadData()),this.loadData()}},{kind:"method",key:"render",value:function render(){const e=this.renderTemplate("default",{person:this.personDetails})||b`
        <div class="person-root">
          ${this.renderImage()} ${this.renderDetails()}
        </div>
      `;return b`
      <div
        class="root"
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
        @click=${this._handleMouseClick}
      >
        ${e} ${this.renderPersonCard()}
      </div>
    `}},{kind:"method",key:"loadData",value:async function loadData(){const t=Providers.globalProvider;if(t&&t.state!==e.ProviderState.Loading){if(t.state===e.ProviderState.SignedOut)return this.personDetails=null,void(this.personImage=null);if(this.personDetails)this.personImage&&"@"===this.personImage&&(this.personImage=null,this.loadImage());else if(this.userId||this.personQuery&&"me"===this.personQuery){const e=t.graph.createBatch();this.userId?(e.get("user",`/users/${this.userId}`,["user.readbasic.all"]),e.get("photo",`users/${this.userId}/photo/$value`,["user.readbasic.all"])):(e.get("user","me",["user.read"]),e.get("photo","me/photo/$value",["user.read"]));const r=await e.execute();this.personImage=r.photo,this.personDetails=r.user}else if(!this.personDetails&&this.personQuery){const e=await t.graph.findPerson(this.personQuery);if(e&&e.length>0){const t=e[0];this.personDetails=t,this.loadImage()}}}}},{kind:"method",key:"loadImage",value:async function loadImage(){const e=Providers.globalProvider,t=this.personDetails;if(t.userPrincipalName){const r=t.userPrincipalName;this.personImage=await e.graph.getUserPhoto(r)}else{const r=getEmailFromGraphEntity(t);if(r){const t=await e.graph.findUserByEmail(r);if(t&&t.length)if(t[0].personType&&"OrganizationUser"===t[0].personType.subclass)this.personImage=await e.graph.getUserPhoto(t[0].scoredEmailAddresses[0].address);else{const r=t[0].id;this.personImage=await e.graph.getContactPhoto(r)}}}this.requestUpdate()}},{kind:"method",key:"_handleMouseClick",value:function _handleMouseClick(){this.personCardInteraction===e.PersonCardInteraction.click&&(this._isPersonCardVisible?this._hidePersonCard():this._showPersonCard())}},{kind:"method",key:"_handleMouseEnter",value:function _handleMouseEnter(t){this.personCardInteraction===e.PersonCardInteraction.hover&&(clearTimeout(this._mouseEnterTimeout),clearTimeout(this._mouseLeaveTimeout),this._mouseEnterTimeout=setTimeout(this._showPersonCard.bind(this),500))}},{kind:"method",key:"_handleMouseLeave",value:function _handleMouseLeave(e){clearTimeout(this._mouseEnterTimeout),clearTimeout(this._mouseLeaveTimeout),this._mouseLeaveTimeout=setTimeout(this._hidePersonCard.bind(this),500)}},{kind:"method",key:"_showPersonCard",value:function _showPersonCard(){this._personCardShouldRender||(this._personCardShouldRender=!0),this._isPersonCardVisible=!0}},{kind:"method",key:"_hidePersonCard",value:function _hidePersonCard(){this._isPersonCardVisible=!1;const e=this.querySelector("mgt-person-card");e&&(e.isExpanded=!1)}},{kind:"method",key:"renderPersonCard",value:function renderPersonCard(){if(this.personCardInteraction===e.PersonCardInteraction.none||!this._personCardShouldRender)return;const t=this.renderRoot.querySelector(".root").getBoundingClientRect(),r=t.left,n=(window.innerWidth||document.documentElement.clientWidth)-t.right;this._openLeft=n<r;const o=(window.innerHeight||document.documentElement.clientHeight)-t.bottom;this._openUp=o<175;let i=null;if(this._openUp){i=`bottom: ${(this.getBoundingClientRect().bottom-this.getBoundingClientRect().top)/2+8}px`}const s={flyout:!0,openLeft:this._openLeft,openUp:this._openUp,visible:this._isPersonCardVisible};return this._isPersonCardVisible?b`
        <div style="${i}" class=${_e(s)}>
          ${this.renderTemplate("person-card",{person:this.personDetails,personImage:this.personImage})||b`
              <mgt-person-card .personDetails=${this.personDetails} .personImage=${this.personImage}> </mgt-person-card>
            `}
        </div>
      `:void 0}},{kind:"method",key:"renderDetails",value:function renderDetails(){return this.showEmail||this.showName?b`
        <span class="Details ${this.getImageSizeClass()}">
          ${this.renderNameAndEmail()}
        </span>
      `:null}},{kind:"method",key:"renderImage",value:function renderImage(){if(this.personDetails){const t=this.personCardInteraction===e.PersonCardInteraction.none?this.personDetails.displayName:"";return this.personImage&&"@"!==this.personImage?b`
          <img
            class="user-avatar ${this.getImageRowSpanClass()} ${this.getImageSizeClass()}"
            title=${t}
            aria-label=${t}
            alt=${t}
            src=${this.personImage}
          />
        `:b`
          <div
            class="user-avatar initials ${this.getImageRowSpanClass()} ${this.getImageSizeClass()}"
            title=${t}
            aria-label=${t}
          >
            <span class="initials-text" aria-label="${this.getInitials()}">
              ${this.getInitials()}
            </span>
          </div>
        `}return this.renderEmptyImage()}},{kind:"method",key:"renderEmptyImage",value:function renderEmptyImage(){return b`
      <i class="ms-Icon ms-Icon--Contact avatar-icon ${this.getImageRowSpanClass()} ${this.getImageSizeClass()}"></i>
    `}},{kind:"method",key:"renderNameAndEmail",value:function renderNameAndEmail(){if(!this.personDetails||!this.showEmail&&!this.showName)return;const e=this.showName?b`
          <div class="user-name" aria-label="${this.personDetails.displayName}">${this.personDetails.displayName}</div>
        `:null;let t;if(this.showEmail){const e=getEmailFromGraphEntity(this.personDetails);t=b`
        <div class="user-email" aria-label="${e}">${e}</div>
      `}return b`
      ${e} ${t}
    `}},{kind:"method",key:"getInitials",value:function getInitials(){if(!this.personDetails)return"";let e="";if(this.personDetails.givenName&&(e+=this.personDetails.givenName[0].toUpperCase()),this.personDetails.surname&&(e+=this.personDetails.surname[0].toUpperCase()),!e&&this.personDetails.displayName){const t=this.personDetails.displayName.split(" ");for(let r=0;r<2&&r<t.length;r++)t[r][0].match(/[a-z]/i)&&(e+=t[r][0].toUpperCase())}return e}},{kind:"method",key:"getImageRowSpanClass",value:function getImageRowSpanClass(){return this.showEmail&&this.showName?"row-span-2":""}},{kind:"method",key:"getImageSizeClass",value:function getImageSizeClass(){return this.showEmail&&this.showName?"":"small"}}]}},MgtTemplatedComponent),Ee=_decorate([B("mgt-agenda")],function(t,r){class MgtAgenda extends r{constructor(){super(),t(this),this.onResize=this.onResize.bind(this)}}return{F:MgtAgenda,d:[{kind:"get",static:!0,key:"styles",value:function styles$1(){return Y}},{kind:"field",decorators:[property({attribute:"events"})],key:"events",value:void 0},{kind:"field",decorators:[property({attribute:"group-by-day",reflect:!0,type:Boolean})],key:"groupByDay",value:()=>!1},{kind:"field",decorators:[property({attribute:"date",reflect:!0,type:String})],key:"date",value:void 0},{kind:"field",decorators:[property({attribute:"days",reflect:!0,type:Number})],key:"days",value:()=>3},{kind:"field",decorators:[property({attribute:"event-query",type:String})],key:"eventQuery",value:void 0},{kind:"field",decorators:[property({attribute:"show-max",type:Number})],key:"showMax",value:void 0},{kind:"field",decorators:[property({attribute:"group-id",type:String})],key:"groupId",value:void 0},{kind:"field",key:"_firstUpdated",value:()=>!1},{kind:"field",decorators:[property({attribute:!1})],key:"_isNarrow",value:void 0},{kind:"field",decorators:[property({attribute:!1})],key:"_loading",value:()=>!0},{kind:"method",key:"firstUpdated",value:function firstUpdated(){this._firstUpdated=!0,Providers.onProviderUpdated(()=>this.loadData()),this.loadData()}},{kind:"method",key:"connectedCallback",value:function connectedCallback(){this._isNarrow=this.offsetWidth<600,_get(_getPrototypeOf(MgtAgenda.prototype),"connectedCallback",this).call(this),window.addEventListener("resize",this.onResize)}},{kind:"method",key:"disconnectedCallback",value:function disconnectedCallback(){window.removeEventListener("resize",this.onResize),_get(_getPrototypeOf(MgtAgenda.prototype),"disconnectedCallback",this).call(this)}},{kind:"method",key:"attributeChangedCallback",value:function attributeChangedCallback(e,t,r){t===r||"date"!==e&&"days"!==e&&"group-id"!==e||(this.events=null,this.loadData()),_get(_getPrototypeOf(MgtAgenda.prototype),"attributeChangedCallback",this).call(this,e,t,r)}},{kind:"method",key:"render",value:function render(){return this._isNarrow=this.offsetWidth<600,b`
      <div class="agenda ${this._isNarrow?"narrow":""}">
        ${this.renderAgenda()}
      </div>
    `}},{kind:"method",key:"onResize",value:function onResize(){this._isNarrow=this.offsetWidth<600}},{kind:"method",key:"loadData",value:async function loadData(){if(this.events)return;if(!this._firstUpdated)return;const t=Providers.globalProvider;if(t&&t.state===e.ProviderState.SignedIn){if(this._loading=!0,this.eventQuery)try{const e=this.eventQuery.split("|");let r,n;e.length>1?(n=e[0].trim(),r=e[1].trim()):n=this.eventQuery;let o=await t.graph.client.api(n);r&&(o=o.middlewareOptions(prepScopes(r)));const i=await o.get();i&&i.value&&(this.events=i.value)}catch(e){}else{const e=this.date?new Date(this.date):new Date;e.setHours(0,0,0,0);const r=new Date(e.getTime());r.setDate(e.getDate()+this.days);try{this.events=await t.graph.getEvents(e,r,this.groupId)}catch(e){}}this._loading=!1}else t&&t.state===e.ProviderState.Loading?this._loading=!0:this._loading=!1}},{kind:"method",key:"renderAgenda",value:function renderAgenda(){if(this._loading)return this.renderTemplate("loading",null)||this.renderLoading();if(this.events){const e=this.showMax&&this.showMax>0?this.events.slice(0,this.showMax):this.events,t=this.renderTemplate("default",{events:e});if(t)return t;if(this.groupByDay){const t={};for(let r=0;r<e.length;r++){const n=this.getDateHeaderFromDateTimeString(e[r].start.dateTime);t[n]=t[n]||[],t[n].push(e[r])}return b`
          <div class="agenda grouped ${this._isNarrow?"narrow":""}">
            ${Object.keys(t).map(e=>b`
                  <div class="group">
                    ${this.renderTemplate("header",{header:e},"header-"+e)||b`
                        <div class="header" aria-label="${e}">${e}</div>
                      `}
                    ${this.renderListOfEvents(t[e])}
                  </div>
                `)}
          </div>
        `}return this.renderListOfEvents(e)}return this.renderTemplate("no-data",null)||b``}},{kind:"method",key:"renderListOfEvents",value:function renderListOfEvents(e){return b`
      <ul class="agenda-list">
        ${e.map(e=>b`
              <li>
                ${this.renderTemplate("event",{event:e},e.id)||this.renderEvent(e)}
              </li>
            `)}
      </ul>
    `}},{kind:"method",key:"renderLoading",value:function renderLoading(){return b`
      <div class="event">
        <div class="event-time-container">
          <div class="event-time-loading loading-element"></div>
        </div>
        <div class="event-details-container">
          <div class="event-subject-loading loading-element"></div>
          <div class="event-location-container">
            <div class="event-location-icon-loading loading-element"></div>
            <div class="event-location-loading loading-element"></div>
          </div>
          <div class="event-location-container">
            <div class="event-attendee-loading loading-element"></div>
            <div class="event-attendee-loading loading-element"></div>
            <div class="event-attendee-loading loading-element"></div>
          </div>
        </div>
      </div>
    `}},{kind:"method",key:"renderEvent",value:function renderEvent(e){return b`
      <div class="event">
        <div class="event-time-container">
          <div class="event-time" aria-label="${this.getEventTimeString(e)}">${this.getEventTimeString(e)}</div>
        </div>
        <div class="event-details-container">
          <div class="event-subject">${e.subject}</div>
          ${this.renderLocation(e)} ${this.renderAttendies(e)}
        </div>
        ${this.templates["event-other"]?b`
              <div class="event-other-container">
                ${this.renderTemplate("event-other",{event:e},e.id+"-other")}
              </div>
            `:""}
      </div>
    `}},{kind:"method",key:"renderLocation",value:function renderLocation(e){return e.location.displayName?b`
      <div class="event-location-container">
        <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.99989 6.49989C4.15159 6.49989 3.46143 5.81458 3.46143 4.97224C3.46143 4.12965 4.15159 3.44434 4.99989 3.44434C5.84845 3.44434 6.53835 4.12965 6.53835 4.97224C6.53835 5.81458 5.84845 6.49989 4.99989 6.49989Z"
            stroke="black"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.1897 7.57436L5.00029 12L1.80577 7.56765C0.5971 6.01895 0.770299 3.47507 2.17681 2.12383C2.93098 1.39918 3.93367 1 5.00029 1C6.06692 1 7.06961 1.39918 7.82401 2.12383C9.23075 3.47507 9.40372 6.01895 8.1897 7.57436Z"
            stroke="black"
          />
        </svg>
        <div class="event-location" aria-label="${e.location.displayName}">${e.location.displayName}</div>
      </div>
    `:null}},{kind:"method",key:"renderAttendies",value:function renderAttendies(e){return e.attendees.length?b`
      <mgt-people
        class="event-attendees"
        .people=${e.attendees.map(e=>({displayName:e.emailAddress.name,emailAddresses:[e.emailAddress]}))}
      ></mgt-people>
    `:null}},{kind:"method",key:"getEventTimeString",value:function getEventTimeString(e){if(e.isAllDay)return"ALL DAY";return`${this.prettyPrintTimeFromDateTime(new Date(e.start.dateTime))} - ${this.prettyPrintTimeFromDateTime(new Date(e.end.dateTime))}`}},{kind:"method",key:"prettyPrintTimeFromDateTime",value:function prettyPrintTimeFromDateTime(e){e.setMinutes(e.getMinutes()-e.getTimezoneOffset());let t=e.getHours();const r=e.getMinutes(),n=t>=12?"PM":"AM";return`${t=(t%=12)||12}:${r<10?"0"+r:r} ${n}`}},{kind:"method",key:"getDateHeaderFromDateTimeString",value:function getDateHeaderFromDateTimeString(e){const t=new Date(e);t.setMinutes(t.getMinutes()-t.getTimezoneOffset());const r=t.getDay(),n=t.getMonth(),o=t.getDate(),i=t.getFullYear();return`${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][r]}, ${["January","February","March","April","May","June","July","August","September","October","November","December"][n]} ${o}, ${i}`}},{kind:"method",key:"getEventDuration",value:function getEventDuration(e){let t=new Date(e.start.dateTime);const r=new Date(e.end.dateTime),n=new Date;let o="";n>t&&(t=n);const i=r.getTime()-t.getTime(),s=Math.round(i/6e4);if(s>1440||e.isAllDay)o=Math.ceil(s/1440)+"d";else if(s>60){o=Math.round(s/60)+"h";const e=s%60;e&&(o+=e+"m")}else o=s+"m";return o}}]}},MgtTemplatedComponent);const Ie=[Z`
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/*
  Your use of the content in the files referenced here is subject to the terms of the license at http://aka.ms/fabric-assets-license
*/
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
:host([hidden]) {
  display: none; }

:host {
  display: block;
  --default-font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  --theme-primary-color: #0078d7;
  --theme-dark-color: #005a9e; }

.ms-Icon {
  display: inline-block;
  font-family: "FabricMDL2Icons";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  margin: 4px 0; }

.ms-Icon--ChevronDown::before {
  content: "\\\E70D"; }

.ms-Icon--ChevronUp::before {
  content: "\\\E70E"; }

.ms-Icon--Contact::before {
  content: "\\\E77B"; }

.ms-Icon--AddFriend::before {
  content: "\\\E8FA"; }

.ms-Icon--OutlookLogoInverse::before {
  content: "\\\EB6D"; }

:host,
mgt-login {
  --font-size: 14px;
  --font-weight: 600;
  --width: '100%';
  --height: '100%';
  --margin: 0;
  --padding: 12px 20px;
  --color: #201f1e;
  --background-color: transparent;
  --background-color--hover: #edebe9;
  --popup-content-background-color: white;
  --popup-command-font-size: 12px;
  --popup-command-margin: 16px 0 0;
  --popup-padding: 24px 48px 16px 24px; }

:host .root,
mgt-login .root {
  position: relative;
  display: inline-block; }

:host .login-button,
mgt-login .login-button {
  display: flex;
  align-items: center;
  font-family: var(--default-font-family);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  width: var(--width);
  height: var(--height);
  margin: var(--margin);
  padding: var(--padding);
  color: var(--color);
  background-color: var(--background-color);
  border: none;
  cursor: pointer;
  transition: color 0.3s, background-color 0.3s; }
  :host .login-button:hover,
  mgt-login .login-button:hover {
    color: var(--theme-primary-color);
    background-color: var(--background-color--hover); }
  :host .login-button:focus,
  mgt-login .login-button:focus {
    outline: 0; }
  :host .login-button:disabled,
  mgt-login .login-button:disabled {
    opacity: 0.4;
    pointer-events: none; }

:host .login-icon + span,
mgt-login .login-icon + span {
  margin-left: 6px; }

:host .popup,
mgt-login .popup {
  display: none;
  position: absolute;
  animation-duration: 300ms;
  font-family: var(--default-font-family);
  background: var(--popup-content-background-color);
  box-shadow: 0 12px 40px 2px rgba(0, 0, 0, 0.08);
  min-width: 240px;
  z-index: 1; }
  :host .popup.show-menu,
  mgt-login .popup.show-menu {
    display: inline-block;
    animation-name: fade-in; }
  :host .popup.open-left,
  mgt-login .popup.open-left {
    right: 0; }

:host .popup-content,
mgt-login .popup-content {
  display: flex;
  flex-direction: column;
  padding: var(--popup-padding); }

:host .popup-commands ul,
mgt-login .popup-commands ul {
  list-style-type: none;
  margin: var(--popup-command-margin);
  padding: 0; }

:host .popup-command,
mgt-login .popup-command {
  font-family: var(--default-font-family);
  font-size: var(--popup-command-font-size);
  font-weight: var(--font-weight);
  color: var(--theme-primary-color);
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.3s; }
  :host .popup-command:hover,
  mgt-login .popup-command:hover {
    color: var(--theme-dark-color); }

@keyframes fade-in {
  from {
    opacity: 0; }
  to {
    opacity: 1; } }

`];let xe=_decorate([B("mgt-login")],function(t,r){return{F:class MgtLogin extends r{constructor(){super(),t(this),Providers.onProviderUpdated(()=>this.loadState()),this.loadState()}},d:[{kind:"get",static:!0,key:"styles",value:function styles(){return Ie}},{kind:"field",decorators:[property({attribute:"user-details",type:Object})],key:"userDetails",value:void 0},{kind:"field",key:"_loginButtonRect",value:void 0},{kind:"field",key:"_popupRect",value:void 0},{kind:"field",key:"_openLeft",value:()=>!1},{kind:"field",key:"_image",value:void 0},{kind:"field",decorators:[property({attribute:!1})],key:"_showMenu",value:()=>!1},{kind:"field",decorators:[property({attribute:!1})],key:"_loading",value:()=>!0},{kind:"method",key:"login",value:async function login(){if(this.userDetails)return;const t=Providers.globalProvider;t&&t.login&&(await t.login(),t.state===e.ProviderState.SignedIn?this.fireCustomEvent("loginCompleted"):this.fireCustomEvent("loginFailed"),await this.loadState())}},{kind:"method",key:"logout",value:async function logout(){if(!this.fireCustomEvent("logoutInitiated"))return;const e=Providers.globalProvider;e&&e.logout&&(await e.logout(),this.fireCustomEvent("logoutCompleted")),this.userDetails=null,this._showMenu=!1}},{kind:"method",key:"updated",value:function updated(e){if(!1===e.get("_showMenu")){const e=this.renderRoot.querySelector(".popup");if(e&&e.animate){this._popupRect=e.getBoundingClientRect();const t=this._loginButtonRect.left-this._popupRect.left,r=this._loginButtonRect.top-this._popupRect.top,n=this._loginButtonRect.width/this._popupRect.width,o=this._loginButtonRect.height/this._popupRect.height;e.animate([{backgroundColor:"#eaeaea",transform:`\n              translate(${t}px, ${r}px)\n              scale(${n}, ${o})\n              `,transformOrigin:"top left"},{backgroundColor:"white",transform:"none",transformOrigin:"top left"}],{duration:100,easing:"ease-in-out",fill:"both"})}}}},{kind:"method",key:"firstUpdated",value:function firstUpdated(){window.addEventListener("click",e=>{const t=this.renderRoot.querySelector(".popup");t&&(this._popupRect=t.getBoundingClientRect(),this._showMenu=!1)})}},{kind:"method",key:"render",value:function render(){const e=this.userDetails?this.renderLoggedIn():this.renderLogIn();return b`
      <div class="root">
        <button ?disabled="${this._loading}" class="login-button" @click=${this.onClick} role="button">
          ${e}
        </button>
        ${this.renderMenu()}
      </div>
    `}},{kind:"method",key:"renderLogIn",value:function renderLogIn(){return b`
      <i class="login-icon ms-Icon ms-Icon--Contact"></i>
      <span aria-label="Sign In">
        Sign In
      </span>
    `}},{kind:"method",key:"renderLoggedIn",value:function renderLoggedIn(){return this.userDetails?b`
        <mgt-person .personDetails=${this.userDetails} .personImage=${this._image} show-name />
      `:this.renderLogIn()}},{kind:"method",key:"renderMenu",value:function renderMenu(){if(!this.userDetails)return;const e=b`
      <mgt-person .personDetails=${this.userDetails} .personImage=${this._image} show-name show-email />
    `;return b`
      <div class="popup ${this._openLeft?"open-left":""} ${this._showMenu?"show-menu":""}">
        <div class="popup-content">
          <div>
            ${e}
          </div>
          <div class="popup-commands">
            <ul>
              <li>
                <button class="popup-command" @click=${this.logout} aria-label="Sign Out">
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `}},{kind:"method",key:"loadState",value:async function loadState(){const t=Providers.globalProvider;if(t)if(this._loading=!0,t.state===e.ProviderState.SignedIn){const e=t.graph.createBatch();e.get("me","me",["user.read"]),e.get("photo","me/photo/$value",["user.read"]);const r=await e.execute();this._image=r.photo,this.userDetails=r.me}else{if(t.state!==e.ProviderState.SignedOut)return void(this._showMenu=!1);this.userDetails=null}this._loading=!1}},{kind:"method",key:"onClick",value:function onClick(e){if(e.stopPropagation(),this.userDetails){const e=this.renderRoot.querySelector(".login-button");if(e){this._loginButtonRect=e.getBoundingClientRect();const t=this._loginButtonRect.left,r=(window.innerWidth||document.documentElement.clientWidth)-this._loginButtonRect.right;this._openLeft=r<t,this._showMenu=!this._showMenu}}else this.fireCustomEvent("loginInitiated")&&this.login()}}]}},MgtBaseComponent);const De=(e,t)=>{const r=e.startNode.parentNode,n=void 0===t?e.endNode:t.startNode,o=r.insertBefore(g(),n);r.insertBefore(g(),n);const i=new NodePart(e.options);return i.insertAfterNode(o),i},Re=(e,t)=>(e.setValue(t),e.commit(),e),Oe=(e,t,r)=>{const n=e.startNode.parentNode,o=r?r.startNode:e.endNode,i=t.endNode.nextSibling;i!==o&&((e,t,r=null,n=null)=>{for(;t!==r;){const r=t.nextSibling;e.insertBefore(t,n),t=r}})(n,t.startNode,i,o)},Le=e=>{i(e.startNode.parentNode,e.startNode,e.endNode.nextSibling)},Me=(e,t,r)=>{const n=new Map;for(let o=t;o<=r;o++)n.set(e[o],o);return n},Ue=new WeakMap,Ne=new WeakMap,He=r((e,t,r)=>{let n;return void 0===r?r=t:void 0!==t&&(n=t),t=>{if(!(t instanceof NodePart))throw new Error("repeat can only be used in text bindings");const o=Ue.get(t)||[],i=Ne.get(t)||[],s=[],a=[],l=[];let c,d,p=0;for(const t of e)l[p]=n?n(t,p):p,a[p]=r(t,p),p++;let u=0,h=o.length-1,g=0,m=a.length-1;for(;u<=h&&g<=m;)if(null===o[u])u++;else if(null===o[h])h--;else if(i[u]===l[g])s[g]=Re(o[u],a[g]),u++,g++;else if(i[h]===l[m])s[m]=Re(o[h],a[m]),h--,m--;else if(i[u]===l[m])s[m]=Re(o[u],a[m]),Oe(t,o[u],s[m+1]),u++,m--;else if(i[h]===l[g])s[g]=Re(o[h],a[g]),Oe(t,o[h],o[u]),h--,g++;else if(void 0===c&&(c=Me(l,g,m),d=Me(i,u,h)),c.has(i[u]))if(c.has(i[h])){const e=d.get(l[g]),r=void 0!==e?o[e]:null;if(null===r){const e=De(t,o[u]);Re(e,a[g]),s[g]=e}else s[g]=Re(r,a[g]),Oe(t,r,o[u]),o[e]=null;g++}else Le(o[h]),h--;else Le(o[u]),u++;for(;g<=m;){const e=De(t,s[m+1]);Re(e,a[g]),s[g++]=e}for(;u<=h;){const e=o[u++];null!==e&&Le(e)}Ue.set(t,s),Ne.set(t,l)}});const qe=[Z`
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/*
  Your use of the content in the files referenced here is subject to the terms of the license at http://aka.ms/fabric-assets-license
*/
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
:host([hidden]) {
  display: none; }

:host {
  display: block;
  --default-font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  --theme-primary-color: #0078d7;
  --theme-dark-color: #005a9e; }

.ms-Icon {
  display: inline-block;
  font-family: "FabricMDL2Icons";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  margin: 4px 0; }

.ms-Icon--ChevronDown::before {
  content: "\\\E70D"; }

.ms-Icon--ChevronUp::before {
  content: "\\\E70E"; }

.ms-Icon--Contact::before {
  content: "\\\E77B"; }

.ms-Icon--AddFriend::before {
  content: "\\\E8FA"; }

.ms-Icon--OutlookLogoInverse::before {
  content: "\\\EB6D"; }

:host {
  border-radius: 2px; }

:host .root,
mgt-people-picker .root {
  display: block; }

:host .people-picker,
mgt-people-picker .people-picker {
  position: relative;
  margin: 7px 0 0 0;
  background-color: white;
  padding-bottom: 8px; }

:host .people-list,
mgt-people-picker .people-list {
  position: absolute;
  margin: 7px 0px 0px 0px;
  padding: 0;
  box-shadow: 0px 1.3289px 2.65781px rgba(180, 180, 180, 0.182), 0px 1.3289px 2.65781px rgba(68, 68, 68, 0.3);
  border-radius: 2px;
  background-color: var(--people-list-background-color, white);
  z-index: 1;
  /* Sit on top */
  width: 100%;
  text-align: left;
  list-style-type: none;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: normal; }

:host .people-list-separator,
mgt-people-picker .people-list-separator {
  height: 2px;
  background: var(--accent-color, #0078d4);
  margin-top: 5px;
  text-align: center; }

:host .people-chosen-input,
mgt-people-picker .people-chosen-input {
  position: relative;
  border: none;
  line-height: normal;
  outline: none;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px; }

:host .people-chosen-list,
mgt-people-picker .people-chosen-list {
  display: flex;
  flex-wrap: wrap;
  vertical-align: middle;
  margin: 0 0 0 0;
  list-style-type: none;
  padding-left: 10px;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: normal; }

.CloseIcon,
mgt-people-picker .CloseIcon {
  line-height: normal;
  font-family: 'FabricMDL2Icons';
  padding-right: 8px;
  padding-left: 4px;
  margin-top: 0px; }

:host .SearchIcon,
mgt-people-picker .SearchIcon {
  font-family: 'FabricMDL2Icons';
  color: var(--accent-color, #0078d4); }

:host .people-person,
mgt-people-picker .people-person {
  display: flex;
  margin: 4px 5px 0 0;
  align-items: center;
  background-color: rgba(196, 196, 196, 0.24);
  border-radius: 15px;
  height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; }

:host .people-person-list,
mgt-people-picker .people-person-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 12px;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: 600;
  font-size: 14px; }

:host .people-person-list-fill,
mgt-people-picker .people-person-list-fill {
  display: flex;
  align-items: center;
  padding: 12px;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  background-color: #f1f1f1; }

:host .people-person-text,
mgt-people-picker .people-person-text {
  font-size: 14px;
  font-weight: normal;
  margin: 0;
  padding: 0; }

:host .input-search,
mgt-people-picker .input-search {
  margin: 7px 2px 0px 3px; }

:host .input-search-start,
mgt-people-picker .input-search-start {
  margin: 7px 0px 0px 0px;
  line-height: normal;
  margin-inline-start: 0px;
  margin-inline-end: 0px; }

:host .people-picker-input,
mgt-people-picker .people-picker-input {
  display: flex;
  order: 2;
  background-color: white;
  margin: var(--avatar-margin, 0 4px 0 0);
  font-size: 14px;
  line-height: 19px; }

:host .duplicate-person,
mgt-people-picker .duplicate-person {
  text-decoration: none;
  border-bottom: 1px solid red; }

:host .remove-person-button,
mgt-people-picker .remove-person-button {
  background: #767676;
  transform: matrix(-0.71, -0.71, 0.71, -0.71, 0, 0); }

:host .remove-person-button-secondary,
mgt-people-picker .remove-person-button-secondary {
  background: #767676;
  transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0); }

:host .person-display-name,
mgt-people-picker .person-display-name {
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 8px;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #000000; }

mgt-person {
  --avatar-size-s: 32px;
  margin-left: 12px; }

.chosen-person {
  --avatar-size-s: 24px;
  margin-left: 0px; }

:host .search-error-text,
mgt-people-picker .search-error-text {
  font-family: Segoe UI;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #232222; }

:host .SearchErrorIcon,
mgt-people-picker .SearchErrorIcon {
  display: inline-block;
  font-family: 'FabricMDL2Icons';
  color: #cf0000; }

:host .error-message-parent,
mgt-people-picker .error-message-parent {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle; }

:host .highlight-search-text,
mgt-people-picker .highlight-search-text {
  font-weight: bold; }

:host .people-person-job-title,
mgt-people-picker .people-person-job-title {
  flex: 100%;
  order: 3;
  font-weight: normal;
  font-size: 12px;
  text-transform: uppercase; }

:host .people-person-text-area,
mgt-people-picker .people-person-text-area {
  margin-left: 13px;
  flex: 1 1 0;
  max-height: 40px; }

`];let $e=_decorate([B("mgt-people-picker")],function(t,r){class MgtPeoplePicker extends r{constructor(){super(),t(this)}}return{F:MgtPeoplePicker,d:[{kind:"get",static:!0,key:"styles",value:function styles(){return qe}},{kind:"field",decorators:[property({attribute:"people",type:Object})],key:"people",value:()=>null},{kind:"field",decorators:[property({attribute:"show-max",type:Number})],key:"showMax",value:()=>6},{kind:"field",decorators:[property({attribute:"group-id",type:String})],key:"groupId",value:void 0},{kind:"field",decorators:[property()],key:"selectedPeople",value:()=>[]},{kind:"field",decorators:[property()],key:"_duplicatePersonId",value:()=>""},{kind:"field",decorators:[property()],key:"_userInput",value:()=>""},{kind:"field",key:"arrowSelectionCount",value:()=>0},{kind:"field",key:"groupPeople",value:void 0},{kind:"field",key:"isLoading",value:()=>!1},{kind:"field",key:"debounceHandle",value(){return window.addEventListener("keyup",function debounce(e,t){let r;return function(){clearTimeout(r),r=setTimeout(()=>e.apply(this,arguments),t)}}(e=>{40!==e.keyCode&&38!==e.keyCode&&(this.arrowSelectionCount=0,this.loadPersonSearch(this._userInput))},300))}},{kind:"method",key:"attributeChangedCallback",value:function attributeChangedCallback(e,t,r){_get(_getPrototypeOf(MgtPeoplePicker.prototype),"attributeChangedCallback",this).call(this,e,t,r),"group-id"===e&&t!==r&&this.findGroup()}},{kind:"method",key:"firstUpdated",value:function firstUpdated(){this.groupId&&(Providers.onProviderUpdated(()=>this.findGroup()),this.findGroup())}},{kind:"method",key:"render",value:function render(){return this.renderTemplate("default",{people:this.people})||b`
        <div class="people-picker">
          <div class="people-picker-input">
            ${this.renderChosenPeople()}
          </div>
          <div class="people-list-separator"></div>
          ${this.renderPeopleList()}
        </div>
      `}},{kind:"method",key:"findGroup",value:async function findGroup(){const t=Providers.globalProvider;if(t&&t.state===e.ProviderState.SignedIn){const e=Providers.globalProvider.graph;this.groupPeople=await e.getPeopleFromGroup(this.groupId)}}},{kind:"method",key:"onUserTypeSearch",value:function onUserTypeSearch(e){return"Escape"===e.code?(e.target.value="",this._userInput="",void(this.people=[])):"Backspace"===e.code&&0===this._userInput.length&&this.selectedPeople.length>0?(e.target.value="",this._userInput="",this.selectedPeople=this.selectedPeople.splice(0,this.selectedPeople.length-1),void this.fireCustomEvent("selectionChanged",this.selectedPeople)):(this._userInput=e.target.value,void(e.target.value?this.debounceHandle:(e.target.value="",this._userInput="",this.people=[])))}},{kind:"method",key:"onUserKeyDown",value:function onUserKeyDown(e){40!==e.keyCode&&38!==e.keyCode||(this.handleArrowSelection(e),this._userInput.length>0&&e.preventDefault()),"Tab"!==e.code&&"Enter"!==e.code||(this.people.length&&e.preventDefault(),this.addPerson(this.people[this.arrowSelectionCount],e),e.target.value="")}},{kind:"method",key:"handleArrowSelection",value:function handleArrowSelection(e){if(this.people.length){38===e.keyCode&&(this.arrowSelectionCount>0?this.arrowSelectionCount--:this.arrowSelectionCount=0),40===e.keyCode&&(this.arrowSelectionCount+1!==this.people.length&&this.arrowSelectionCount+1<this.showMax?this.arrowSelectionCount++:this.arrowSelectionCount=0);const t=this.renderRoot.querySelector(".people-list");for(let e=0;e<t.children.length;e++)t.children[e].setAttribute("class","people-person-list");t.children[this.arrowSelectionCount].setAttribute("class","people-person-list-fill")}}},{kind:"method",key:"addPerson",value:function addPerson(e,t){if(e){this._userInput="",this._duplicatePersonId="";const t=e,r=this.selectedPeople.filter(e=>e.id===t.id);this.selectedPeople.length&&r.length?this._duplicatePersonId=t.id:(this.selectedPeople.push(e),this.fireCustomEvent("selectionChanged",this.selectedPeople),this.people=[],this._userInput="",this.arrowSelectionCount=0)}}},{kind:"method",key:"loadPersonSearch",value:async function loadPersonSearch(t){if(t.length){t=t.toLowerCase();const r=Providers.globalProvider;let n;if(r&&r.state===e.ProviderState.SignedIn){const e=this;setTimeout(()=>{e.isLoading=!0},400);const r=Providers.globalProvider.graph;(n=this.groupId?this.groupPeople:await r.findPerson(t))&&(n=n.filter(e=>-1!==e.displayName.toLowerCase().indexOf(t))),this.people=this.filterPeople(n),this.isLoading=!1}}}},{kind:"method",key:"filterPeople",value:function filterPeople(e){if(e){const t=this.selectedPeople.map(e=>e.id);return e.filter(e=>-1===t.indexOf(e.id))}}},{kind:"method",key:"removePerson",value:function removePerson(e){const t=e,r=this.selectedPeople.filter(e=>e.id!==t.id);this.selectedPeople=r,this.fireCustomEvent("selectionChanged",this.selectedPeople)}},{kind:"method",key:"renderErrorMessage",value:function renderErrorMessage(){return b`
      <div class="error-message-parent">
        <div label="search-error-text" aria-label="We didn't find any matches." class="search-error-text">
          We didn't find any matches.
        </div>
      </div>
    `}},{kind:"method",key:"renderChosenPeople",value:function renderChosenPeople(){let e,t="input-search-start";return this.selectedPeople.length>0&&(t="input-search",e=b`
        ${this.selectedPeople.slice(0,this.selectedPeople.length).map(e=>b`
              <li class="${e.id===this._duplicatePersonId?"people-person duplicate-person":"people-person"}">
                ${this.renderTemplate("person",{person:e},e.displayName)||this.renderChosenPerson(e)}
                <p class="person-display-name">${e.displayName}</p>
                <div class="CloseIcon" @click="${()=>this.removePerson(e)}">\uE711</div>
              </li>
            `)}
      `),b`
      <div class="people-chosen-list">
        ${e}
        <div class="${t}">
          <input
            id="people-picker-input"
            class="people-chosen-input"
            type="text"
            placeholder="Start typing a name"
            label="people-picker-input"
            aria-label="people-picker-input"
            role="input"
            .value="${this._userInput}"
            @blur=${this.lostFocus}
            @click=${this.gainedFocus}
            @keydown="${e=>{this.onUserKeyDown(e)}}"
            @keyup="${e=>{this.onUserTypeSearch(e)}}"
          />
        </div>
      </div>
    `}},{kind:"method",key:"gainedFocus",value:function gainedFocus(){const e=this.renderRoot.querySelector(".people-list"),t=this.renderRoot.querySelector(".people-chosen-input");t.focus(),t.select(),e&&e.setAttribute("style","display:block")}},{kind:"method",key:"lostFocus",value:function lostFocus(){const e=this.renderRoot.querySelector(".people-list");e&&setTimeout(()=>{e.setAttribute("style","display:none")},300)}},{kind:"method",key:"renderHighlightText",value:function renderHighlightText(e){const t=e,r=t.displayName.toLowerCase().indexOf(this._userInput.toLowerCase());return-1!==r&&(0===r?(t.first="",t.highlight=t.displayName.slice(0,this._userInput.length),t.last=t.displayName.slice(this._userInput.length,t.displayName.length)):r===t.displayName.length?(t.first=t.displayName.slice(0,r),t.highlight=t.displayName.slice(r,t.displayName.length),t.last=""):(t.first=t.displayName.slice(0,r),t.highlight=t.displayName.slice(r,r+this._userInput.length),t.last=t.displayName.slice(r+this._userInput.length,t.displayName.length))),b`
      <div>
        <span class="people-person-text">${t.first}</span
        ><span class="people-person-text highlight-search-text">${t.highlight}</span
        ><span class="people-person-text">${t.last}</span>
      </div>
    `}},{kind:"method",key:"renderPeopleList",value:function renderPeopleList(){let e=this.people;if(e)return 0===(e=e.slice(0,this.showMax)).length&&this._userInput.length>0&&!1===this.isLoading?b`
          <div class="people-list">
            ${this.renderErrorMessage()}
          </div>
        `:(e[0]&&(e[0].isSelected="fill"),b`
          <div class="people-list">
            ${this.renderPersons(e)}
          </div>
        `)}},{kind:"method",key:"renderPersons",value:function renderPersons(e){return b`
      ${He(e,e=>e.id,e=>b`
          <li
            class="${"fill"===e.isSelected?"people-person-list-fill":"people-person-list"}"
            @click="${t=>this.addPerson(e,t)}"
          >
            ${this.renderTemplate("person",{person:e},e.displayName)||this.renderPerson(e)}
            <div class="people-person-text-area" id="${e.displayName}">
              ${this.renderHighlightText(e)}
              <span class="people-person-job-title">${e.jobTitle}</span>
            </div>
          </li>
        `)}
    `}},{kind:"method",key:"renderPerson",value:function renderPerson(e){return b`
      <mgt-person .personDetails=${e} .personImage=${"@"}></mgt-person>
    `}},{kind:"method",key:"renderChosenPerson",value:function renderChosenPerson(e){return b`
      <mgt-person class="chosen-person" .personDetails=${e} .personImage=${"@"}></mgt-person>
    `}}]}},MgtTemplatedComponent);const Fe=[Z`
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/*
  Your use of the content in the files referenced here is subject to the terms of the license at http://aka.ms/fabric-assets-license
*/
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
:host([hidden]) {
  display: none; }

:host {
  display: block;
  --default-font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  --theme-primary-color: #0078d7;
  --theme-dark-color: #005a9e; }

.ms-Icon {
  display: inline-block;
  font-family: "FabricMDL2Icons";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  margin: 4px 0; }

.ms-Icon--ChevronDown::before {
  content: "\\\E70D"; }

.ms-Icon--ChevronUp::before {
  content: "\\\E70E"; }

.ms-Icon--Contact::before {
  content: "\\\E77B"; }

.ms-Icon--AddFriend::before {
  content: "\\\E8FA"; }

.ms-Icon--OutlookLogoInverse::before {
  content: "\\\EB6D"; }

:host .people-list,
mgt-people .people-list {
  list-style-type: none;
  margin: var(--list-margin, 8px 4px 8px 8px);
  padding: 0;
  font-family: var(--default-font-family, "Segoe UI");
  font-style: normal;
  font-weight: normal;
  display: flex; }

:host .people-person,
mgt-people .people-person {
  margin: var(--avatar-margin, 0 4px 0 0);
  display: flex; }

`];let je,Be=_decorate([B("mgt-people")],function(t,r){return{F:class MgtPeople extends r{constructor(...e){super(...e),t(this)}},d:[{kind:"get",static:!0,key:"styles",value:function styles(){return Fe}},{kind:"field",decorators:[property({attribute:"people",type:Object})],key:"people",value:()=>null},{kind:"field",decorators:[property({attribute:"show-max",type:Number})],key:"showMax",value:()=>3},{kind:"field",decorators:[property({attribute:"group-id",type:String})],key:"groupId",value:void 0},{kind:"field",key:"_firstUpdated",value:()=>!1},{kind:"method",key:"firstUpdated",value:function firstUpdated(){this._firstUpdated=!0,Providers.onProviderUpdated(()=>this.loadPeople()),this.loadPeople()}},{kind:"method",key:"render",value:function render(){return this.people?this.renderTemplate("default",{people:this.people})||b`
          <ul class="people-list">
            ${this.people.slice(0,this.showMax).map(e=>b`
                  <li class="people-person">
                    ${this.renderTemplate("person",{person:e},e.displayName)||this.renderPerson(e)}
                  </li>
                `)}
            ${this.people.length>this.showMax?this.renderTemplate("overflow",{extra:this.people.length-this.showMax,max:this.showMax,people:this.people})||b`
                  <li>+${this.people.length-this.showMax}</li>
                `:null}
          </ul>
        `:this.renderTemplate("no-data",null)||b``}},{kind:"method",key:"loadPeople",value:async function loadPeople(){if(this._firstUpdated&&!this.people){const t=Providers.globalProvider;if(t&&t.state===e.ProviderState.SignedIn){const e=Providers.globalProvider.graph;this.groupId?this.people=await e.getPeopleFromGroup(this.groupId):this.people=await e.getPeople()}}}},{kind:"method",key:"renderPerson",value:function renderPerson(t){return b`
      <mgt-person
        .personDetails=${t}
        .personImage=${"@"}
        .personCardInteraction=${e.PersonCardInteraction.hover}
      ></mgt-person>
    `}}]}},MgtTemplatedComponent);function getSvg(e,t){switch(e){case je.Phone:return b`
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.7034 14.5117L18.7138 14.5161L18.7243 14.5202C18.9341 14.6021 19.115 14.7202 19.2727 14.8779L21.7446 17.3486C21.9023 17.5062 22.0205 17.6869 22.1023 17.8965L22.1064 17.907L22.1109 17.9175C22.1978 18.1219 22.2414 18.3353 22.2414 18.564C22.2414 18.7927 22.1977 19.0122 22.1083 19.2279L22.1082 19.2278L22.1047 19.2367C22.0237 19.439 21.9055 19.6186 21.7446 19.7794L21.5873 19.9366C21.1876 20.3361 20.8232 20.6893 20.4938 20.9965C20.1952 21.2751 19.8884 21.5061 19.5739 21.6927C19.2738 21.8634 18.9328 21.999 18.5464 22.0956C18.1736 22.1887 17.703 22.2414 17.1236 22.2414C16.2669 22.2414 15.3768 22.1079 14.4508 21.8345C13.5137 21.5577 12.5751 21.1731 11.635 20.6782C10.6999 20.182 9.77555 19.5905 8.86223 18.9024C7.95477 18.2129 7.09416 17.4617 6.28031 16.6485C5.47314 15.827 4.72822 14.9625 4.04528 14.0548C3.36417 13.1422 2.77981 12.2186 2.2907 11.2841C1.80227 10.3435 1.42465 9.41241 1.15509 8.49067C0.888472 7.57901 0.758621 6.70744 0.758621 5.87354C0.758621 5.2942 0.807601 4.82667 0.894029 4.45987C0.990209 4.08378 1.12524 3.74754 1.2962 3.4474C1.48349 3.13198 1.71123 2.8291 1.98168 2.53898C2.28907 2.2098 2.6423 1.84565 3.04191 1.44622L3.22169 1.26654C3.38571 1.1026 3.57043 0.978071 3.77975 0.889152C3.98223 0.803141 4.19935 0.758621 4.4382 0.758621C4.66717 0.758621 4.88079 0.802229 5.08542 0.889152L5.08541 0.889179L5.09158 0.891738C5.30795 0.981409 5.49379 1.10569 5.65472 1.26654L8.12663 3.73724C8.28435 3.89489 8.4025 4.07557 8.48434 4.28518L8.48846 4.29572L8.49288 4.30613C8.5798 4.51055 8.6234 4.72393 8.6234 4.95264C8.6234 5.19331 8.58291 5.38399 8.51772 5.53744C8.4302 5.73489 8.32445 5.9107 8.20135 6.0673C8.0676 6.23744 7.91909 6.39189 7.75539 6.53127L7.75 6.53587L7.74469 6.54056C7.53965 6.72185 7.34847 6.90089 7.17157 7.0777C6.97623 7.27294 6.80449 7.47975 6.66073 7.69906C6.46768 7.98486 6.36497 8.31044 6.36497 8.65869C6.36497 9.14561 6.54689 9.58161 6.89067 9.92523L13.0817 16.1132C13.4255 16.4568 13.8615 16.6385 14.3483 16.6385C14.6963 16.6385 15.0216 16.5361 15.3073 16.3434C15.527 16.1997 15.734 16.0279 15.9296 15.8325C16.1065 15.6556 16.2856 15.4646 16.467 15.2596L16.4717 15.2543L16.4763 15.2489C16.6157 15.0853 16.7702 14.9369 16.9405 14.8032C17.0972 14.6801 17.2731 14.5744 17.4707 14.4869C17.6244 14.4217 17.8153 14.3812 18.0562 14.3812C18.2851 14.3812 18.4988 14.4248 18.7034 14.5117Z"
            stroke="#3078CD"
            stroke-width="1.51724"
          />
        </svg>
      `;case je.Email:return b`
        <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24.2759 0.275862V15.4483H0V0.275862H24.2759ZM1.69504 1.7931L12.1379 7.02047L22.5808 1.7931H1.69504ZM22.7586 13.931V3.40517L12.1379 8.70366L1.51724 3.40517V13.931H22.7586Z"
            fill="#3078CD"
          />
        </svg>
      `;case je.Chat:return b`
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
          <path d="M15.173 6.20106H4.83114V4.69376H15.173V6.20106Z" fill="#3078CD" />
          <path d="M4.83114 11.1766H11.3545V9.66933H4.83114V11.1766Z" fill="#3078CD" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.100098 2.39808C0.100098 1.18556 1.06777 0.199951 2.2857 0.199951H18.5145C19.7324 0.199951 20.7001 1.18556 20.7001 2.39808V20.2133C20.7001 20.9187 20.1975 21.4177 19.7305 21.6375C19.2562 21.8608 18.5192 21.9305 17.9793 21.3859L17.9397 21.346L15.1804 17.5802L15.162 17.5491C14.9874 17.2557 14.8758 17.2036 14.7939 17.176C14.6395 17.1241 14.4252 17.1152 13.9162 17.115C10.113 17.2743 5.24741 17.2819 2.42987 16.6132L2.36553 16.5979L2.30484 16.5717C1.77324 16.3418 1.21866 16.0979 0.815136 15.7451C0.347187 15.336 0.100098 14.8053 0.100098 14.1144V2.39808ZM2.2857 1.70725C1.91258 1.70725 1.6074 2.00562 1.6074 2.39808V14.1144C1.6074 14.3865 1.67852 14.4978 1.80722 14.6103C1.99344 14.7731 2.29809 14.9252 2.84155 15.1615C5.44205 15.761 10.0684 15.7681 13.8688 15.6084L13.8846 15.6077L13.968 15.6077C14.3859 15.6073 14.8562 15.6068 15.2743 15.7473C15.7779 15.9167 16.1388 16.2546 16.4378 16.746L19.0364 20.2925C19.0505 20.2891 19.0681 20.2833 19.0885 20.2738C19.1369 20.251 19.1718 20.2199 19.1892 20.1969L19.1928 20.192V2.39808C19.1928 2.00562 18.8876 1.70725 18.5145 1.70725H2.2857Z"
            fill="#3078CD"
          />
        </svg>
      `;case je.SmallPhone:return b`
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
          <path
            d="M13.848 10.6702L13.8548 10.6731L13.8618 10.6758C14.0247 10.7393 14.1654 10.8313 14.288 10.9537L16.115 12.7799C16.2376 12.9024 16.3295 13.0431 16.3931 13.2058L16.3958 13.2127L16.3987 13.2196C16.4662 13.3783 16.5 13.5441 16.5 13.7212C16.5 13.8983 16.4661 14.0685 16.397 14.2352L16.3969 14.2352L16.3946 14.241C16.3316 14.3983 16.2396 14.5379 16.115 14.6625L15.9988 14.7787L16.3522 15.1323L15.9988 14.7787C15.7029 15.0744 15.4331 15.3359 15.189 15.5636C14.9652 15.7724 14.7348 15.9459 14.4982 16.0862C14.271 16.2156 14.0136 16.3178 13.7229 16.3904C13.4413 16.4608 13.0882 16.5 12.6566 16.5C12.017 16.5 11.3533 16.4003 10.6638 16.1967C9.96713 15.991 9.26981 15.7052 8.57174 15.3378C7.87734 14.9693 7.19129 14.5303 6.51368 14.0197C5.84063 13.5084 5.20237 12.9512 4.59881 12.3481C4.00029 11.739 3.44789 11.0979 2.94143 10.4248C2.43615 9.74777 2.00243 9.06232 1.63929 8.36852C1.2766 7.67005 0.995933 6.97818 0.795483 6.29276C0.596975 5.61399 0.5 4.96403 0.5 4.34131C0.5 3.90971 0.536484 3.55902 0.601835 3.28194C0.674224 2.99869 0.776112 2.74472 0.905573 2.51755C1.0464 2.28029 1.21749 2.0528 1.42033 1.83521C1.64811 1.59128 1.90969 1.32162 2.20545 1.026L2.33832 0.893191C2.46501 0.766564 2.60804 0.670106 2.76999 0.601313C2.92742 0.534437 3.09601 0.5 3.28041 0.5C3.4577 0.5 3.62368 0.533835 3.78253 0.601313L3.78252 0.601331L3.78659 0.603017C3.95378 0.672306 4.09785 0.768603 4.2225 0.89319L6.04956 2.71936C6.1721 2.84184 6.26406 2.9825 6.3276 3.14523L6.33031 3.15217L6.33322 3.15903C6.40071 3.31773 6.43454 3.48354 6.43454 3.66064C6.43454 3.84568 6.40334 3.99501 6.3514 4.11708C6.28472 4.26761 6.20393 4.40206 6.1096 4.52205C6.00826 4.65097 5.89569 4.76805 5.77161 4.87369L5.77155 4.87363L5.76455 4.87982C5.61383 5.01309 5.47343 5.14457 5.34365 5.27429C5.20174 5.41613 5.07747 5.56589 4.97373 5.72421C4.83747 5.92576 4.76527 6.15476 4.76527 6.3999C4.76527 6.7436 4.89326 7.05044 5.13603 7.29309L9.71199 11.8668C9.95476 12.1095 10.2616 12.2373 10.6053 12.2373C10.8504 12.2373 11.0793 12.1652 11.2809 12.029C11.4393 11.9254 11.5892 11.8012 11.7311 11.6593C11.8609 11.5296 11.9924 11.3893 12.1258 11.2386L12.1258 11.2387L12.1319 11.2316C12.2376 11.1075 12.3547 10.995 12.4837 10.8937C12.6038 10.7994 12.7383 10.7186 12.889 10.652C13.0112 10.6 13.1607 10.5688 13.3459 10.5688C13.5232 10.5688 13.6891 10.6027 13.848 10.6702Z"
            stroke=${t}
          />
        </svg>
      `;case je.SmallEmail:return b`
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17 0.1875V10.8125H0V0.1875H17ZM1.18701 1.25L8.5 4.91064L15.813 1.25H1.18701ZM15.9375 9.75V2.37891L8.5 6.08936L1.0625 2.37891V9.75H15.9375Z"
            fill=${t}
          />
        </svg>
      `;case je.SmallChat:return b`
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
          <path d="M12.3072 4.72225H4.27469V3.53616H12.3072V4.72225Z" fill="#666666" />
          <path d="M4.27469 8.63751H9.34136V7.45142H4.27469V8.63751Z" fill="#666666" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.600098 1.7297C0.600098 0.775576 1.35168 0 2.29765 0H14.9025C15.8485 0 16.6001 0.775576 16.6001 1.7297V15.7485C16.6001 16.3035 16.2097 16.6961 15.847 16.8691C15.4786 17.0448 14.9062 17.0997 14.4868 16.6712L14.4561 16.6398L12.313 13.6764L12.2986 13.652C12.1631 13.4211 12.0763 13.3801 12.0127 13.3584C11.8928 13.3176 11.7264 13.3106 11.331 13.3104C8.37707 13.4358 4.59801 13.4417 2.40963 12.9155L2.35966 12.9035L2.31252 12.8828C1.89963 12.702 1.46889 12.51 1.15547 12.2324C0.792012 11.9105 0.600098 11.4929 0.600098 10.9492V1.7297ZM2.29765 1.18609C2.00785 1.18609 1.77082 1.42087 1.77082 1.7297V10.9492C1.77082 11.1633 1.82606 11.2509 1.92602 11.3395C2.07065 11.4676 2.30728 11.5872 2.72938 11.7732C4.74919 12.245 8.34249 12.2506 11.2942 12.1249L11.3065 12.1243L11.3713 12.1243C11.6959 12.124 12.0612 12.1236 12.3859 12.2342C12.777 12.3675 13.0574 12.6333 13.2896 13.02L15.3079 15.8108C15.3189 15.8081 15.3326 15.8035 15.3484 15.796C15.3859 15.7781 15.4131 15.7536 15.4266 15.7355L15.4294 15.7317V1.7297C15.4294 1.42087 15.1923 1.18609 14.9025 1.18609H2.29765Z"
            fill=${t}
          />
        </svg>
      `;case je.SmallLocation:return b`
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="20" viewBox="0 0 13 20" fill="none">
          <path
            d="M9.18115 1.73047L8.92657 2.16084L8.93112 2.16346L9.18115 1.73047ZM10.252 2.56055L9.89534 2.91112L9.90143 2.91711L10.252 2.56055ZM11.082 3.63135L10.649 3.8814L10.6517 3.88592L11.082 3.63135ZM11.6714 7.4082L11.1886 7.27793L11.1872 7.28326L11.6714 7.4082ZM11.2812 8.4375L10.834 8.21389L11.2812 8.4375ZM6.5 18L6.05279 18.2236L6.5 19.118L6.94721 18.2236L6.5 18ZM1.71875 8.4375L2.16596 8.21389L1.71875 8.4375ZM1.32031 7.4082L0.83561 7.5313L0.83811 7.54042L1.32031 7.4082ZM1.90967 3.63135L1.4793 3.37676L1.47668 3.38131L1.90967 3.63135ZM2.73975 2.56055L2.38619 2.20699L2.73975 2.56055ZM3.81885 1.73047L4.0689 2.16348L4.07342 2.16081L3.81885 1.73047ZM7.32178 8.27148L7.12599 7.81139L7.12241 7.81295L7.32178 8.27148ZM8.45898 7.14258L8.91753 7.34195L8.91906 7.33836L8.45898 7.14258ZM8.45898 5.49072L7.99889 5.68651L8.00045 5.69009L8.45898 5.49072ZM7.32178 4.35352L7.12241 4.81206L7.126 4.81359L7.32178 4.35352ZM5.66992 4.35352L5.47414 3.89342L5.47056 3.89498L5.66992 4.35352ZM4.54102 5.49072L4.99956 5.69009L5.00109 5.6865L4.54102 5.49072ZM4.54102 7.14258L4.08092 7.33836L4.08248 7.34194L4.54102 7.14258ZM5.66992 8.27148L5.47055 8.73003L5.47414 8.73156L5.66992 8.27148ZM6.5 1.5C6.94286 1.5 7.36772 1.55779 7.7761 1.67234L8.04617 0.709497C7.54699 0.569484 7.0311 0.5 6.5 0.5V1.5ZM7.7761 1.67234C8.18934 1.78825 8.57233 1.95125 8.92658 2.16081L9.43572 1.30013C9.00416 1.04484 8.54048 0.848145 8.04617 0.709497L7.7761 1.67234ZM8.93112 2.16346C9.28459 2.36758 9.60576 2.61644 9.89539 2.91107L10.6085 2.21003C10.2562 1.85166 9.86352 1.54713 9.43119 1.29748L8.93112 2.16346ZM9.90143 2.91711C10.1961 3.20674 10.4449 3.52791 10.649 3.88138L11.515 3.38131C11.2654 2.94898 10.9608 2.55628 10.6025 2.20398L9.90143 2.91711ZM10.6517 3.88592C10.8612 4.24017 11.0243 4.62316 11.1402 5.0364L12.103 4.76633C11.9644 4.27202 11.7677 3.80834 11.5124 3.37678L10.6517 3.88592ZM11.1402 5.0364C11.2547 5.44478 11.3125 5.86964 11.3125 6.3125H12.3125C12.3125 5.7814 12.243 5.26551 12.103 4.76633L11.1402 5.0364ZM11.3125 6.3125C11.3125 6.65287 11.2706 6.97415 11.1887 7.27794L12.1541 7.53846C12.2603 7.14499 12.3125 6.7358 12.3125 6.3125H11.3125ZM11.1872 7.28326C11.1082 7.58959 10.9911 7.89972 10.834 8.21389L11.7285 8.66111C11.9145 8.28908 12.0575 7.91301 12.1555 7.53314L11.1872 7.28326ZM10.834 8.21389L6.05279 17.7764L6.94721 18.2236L11.7285 8.66111L10.834 8.21389ZM6.94721 17.7764L2.16596 8.21389L1.27154 8.66111L6.05279 18.2236L6.94721 17.7764ZM2.16596 8.21389C2.00791 7.89778 1.8873 7.58521 1.80251 7.27599L0.83811 7.54042C0.941476 7.9174 1.08649 8.29102 1.27154 8.66111L2.16596 8.21389ZM1.80493 7.28513C1.72721 6.97912 1.6875 6.65538 1.6875 6.3125H0.6875C0.6875 6.7333 0.736331 7.14003 0.835697 7.53128L1.80493 7.28513ZM1.6875 6.3125C1.6875 5.86964 1.74529 5.44478 1.85984 5.0364L0.896997 4.76633C0.756984 5.26551 0.6875 5.7814 0.6875 6.3125H1.6875ZM1.85984 5.0364C1.97628 4.62127 2.13745 4.23675 2.34266 3.88138L1.47668 3.38131C1.22811 3.81175 1.03512 4.27391 0.896997 4.76633L1.85984 5.0364ZM2.34001 3.88592C2.55121 3.52889 2.80215 3.20525 3.0933 2.9141L2.38619 2.20699C2.03541 2.55777 1.73297 2.948 1.47933 3.37678L2.34001 3.88592ZM3.0933 2.9141C3.38946 2.61794 3.71448 2.36812 4.06888 2.16346L3.56881 1.29748C3.13741 1.5466 2.74303 1.85016 2.38619 2.20699L3.0933 2.9141ZM4.07342 2.16081C4.42767 1.95125 4.81066 1.78825 5.2239 1.67234L4.95383 0.709497C4.45952 0.848145 3.99583 1.04484 3.56428 1.30013L4.07342 2.16081ZM5.2239 1.67234C5.63228 1.55779 6.05714 1.5 6.5 1.5V0.5C5.9689 0.5 5.45301 0.569484 4.95383 0.709497L5.2239 1.67234ZM6.5 8.9375C6.85794 8.9375 7.20015 8.86958 7.52114 8.73002L7.12241 7.81295C6.93429 7.89474 6.72865 7.9375 6.5 7.9375V8.9375ZM7.51756 8.73156C7.83465 8.59663 8.11557 8.40892 8.356 8.16849L7.64889 7.46139C7.50194 7.60834 7.32908 7.72499 7.126 7.81141L7.51756 8.73156ZM8.356 8.16849C8.59464 7.92985 8.78217 7.65324 8.91752 7.34194L8.00045 6.94321C7.91444 7.14103 7.79761 7.31266 7.64889 7.46139L8.356 8.16849ZM8.91906 7.33836C9.05708 7.01402 9.125 6.67049 9.125 6.3125H8.125C8.125 6.5411 8.08225 6.75095 7.99891 6.9468L8.91906 7.33836ZM9.125 6.3125C9.125 5.95456 9.05708 5.61235 8.91752 5.29136L8.00045 5.69009C8.08224 5.87821 8.125 6.08385 8.125 6.3125H9.125ZM8.91906 5.29495C8.78413 4.97784 8.59642 4.69693 8.356 4.45651L7.64889 5.16361C7.79584 5.31056 7.91249 5.48342 7.99891 5.6865L8.91906 5.29495ZM8.356 4.45651C8.11557 4.21608 7.83465 4.02837 7.51756 3.89344L7.126 4.81359C7.32908 4.90001 7.50194 5.01666 7.64889 5.16361L8.356 4.45651ZM7.52114 3.89498C7.20015 3.75542 6.85794 3.6875 6.5 3.6875V4.6875C6.72865 4.6875 6.93429 4.73026 7.12241 4.81205L7.52114 3.89498ZM6.5 3.6875C6.14201 3.6875 5.79848 3.75542 5.47414 3.89344L5.8657 4.81359C6.06155 4.73025 6.2714 4.6875 6.5 4.6875V3.6875ZM5.47056 3.89498C5.15926 4.03033 4.88265 4.21786 4.64401 4.45651L5.35111 5.16361C5.49984 5.01489 5.67147 4.89806 5.86929 4.81205L5.47056 3.89498ZM4.64401 4.45651C4.40358 4.69693 4.21587 4.97784 4.08094 5.29495L5.00109 5.6865C5.08751 5.48342 5.20416 5.31056 5.35111 5.16361L4.64401 4.45651ZM4.08248 5.29136C3.94292 5.61235 3.875 5.95456 3.875 6.3125H4.875C4.875 6.08385 4.91776 5.87821 4.99955 5.69009L4.08248 5.29136ZM3.875 6.3125C3.875 6.67049 3.94292 7.01402 4.08094 7.33836L5.00109 6.9468C4.91775 6.75095 4.875 6.5411 4.875 6.3125H3.875ZM4.08248 7.34194C4.21783 7.65324 4.40536 7.92985 4.64401 8.16849L5.35111 7.46139C5.20239 7.31266 5.08556 7.14103 4.99955 6.94321L4.08248 7.34194ZM4.64401 8.16849C4.88265 8.40714 5.15926 8.59467 5.47056 8.73002L5.86929 7.81295C5.67147 7.72694 5.49984 7.61011 5.35111 7.46139L4.64401 8.16849ZM5.47414 8.73156C5.79848 8.86958 6.14201 8.9375 6.5 8.9375V7.9375C6.2714 7.9375 6.06155 7.89475 5.8657 7.81141L5.47414 8.73156Z"
            fill=${t}
          />
        </svg>
      `}}!function(e){e[e.Phone=0]="Phone",e[e.Email=1]="Email",e[e.Chat=2]="Chat",e[e.SmallPhone=3]="SmallPhone",e[e.SmallEmail=4]="SmallEmail",e[e.SmallChat=5]="SmallChat",e[e.SmallLocation=6]="SmallLocation"}(je||(je={}));const Ve=[Z`
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/*
  Your use of the content in the files referenced here is subject to the terms of the license at http://aka.ms/fabric-assets-license
*/
:host .root {
  position: relative;
  width: 340px;
  background: #ffffff;
  box-shadow: 0px 0px 4.55172px rgba(0, 0, 0, 0.16);
  font-family: var(--default-font-family); }
  :host .root .default-view {
    display: flex;
    padding: 18px 14px; }
    :host .root .default-view mgt-person.person-image {
      --avatar-size-s: 75px; }
    :host .root .default-view .details {
      margin-left: 14px; }
      :host .root .default-view .details .display-name {
        font-size: 27.3103px;
        color: #333333; }
      :host .root .default-view .details .job-title {
        font-size: 18.2069px;
        color: #767676;
        font-weight: 600; }
      :host .root .default-view .details .department {
        font-size: 15.1724px;
        color: #767676; }
      :host .root .default-view .details .base-icons {
        margin-top: 14px;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        max-width: 120px; }
        :host .root .default-view .details .base-icons .icon {
          margin: 0 22px 0 0; }
        :host .root .default-view .details .base-icons .icon:hover {
          opacity: 0.6; }
  :host .root .additional-details-container .additional-details-button {
    height: 28px;
    background: rgba(196, 196, 196, 0.1);
    text-align: center;
    position: relative; }
    :host .root .additional-details-container .additional-details-button .additional-details-svg {
      width: 50%;
      bottom: 0;
      top: 100%; }
  :host .root .additional-details-container .additional-details-button:hover {
    background-color: rgba(0, 0, 0, 0.068); }
  :host .root .additional-details-container .additional-details-info {
    margin: 0 0 0 20px;
    padding-bottom: 18px; }
    :host .root .additional-details-container .additional-details-info .contact-text {
      margin: 0 0 24px 0;
      font-weight: 600;
      font-size: 14px;
      color: #000000; }
    :host .root .additional-details-container .additional-details-info .additional-details-row {
      display: flex; }
      :host .root .additional-details-container .additional-details-info .additional-details-row .additional-details-item {
        line-height: normal;
        font-style: normal;
        font-weight: normal;
        font-size: 15px; }
        :host .root .additional-details-container .additional-details-info .additional-details-row .additional-details-item .icons {
          text-align: left; }
          :host .root .additional-details-container .additional-details-info .additional-details-row .additional-details-item .icons .details-icon {
            margin: 0 0 10px 0;
            display: flex;
            flex-direction: row;
            align-items: center; }
        :host .root .additional-details-container .additional-details-info .additional-details-row .additional-details-item .data {
          display: block;
          margin: 0 0 0px 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 280px; }
        :host .root .additional-details-container .additional-details-info .additional-details-row .additional-details-item .normal-subtitle {
          padding-top: 2px; }
        :host .root .additional-details-container .additional-details-info .additional-details-row .additional-details-item .link-subtitle {
          color: #3078cd; }
        :host .root .additional-details-container .additional-details-info .additional-details-row .additional-details-item .link-subtitle:hover {
          opacity: 0.6; }
    :host .root .additional-details-container .additional-details-info .section-divider {
      width: 96%;
      height: 1px;
      background: #eaeaea; }

`];let ze=_decorate([B("mgt-person-card")],function(t,r){class MgtPersonCard extends r{constructor(...e){super(...e),t(this)}}return{F:MgtPersonCard,d:[{kind:"get",static:!0,key:"styles",value:function styles(){return Ve}},{kind:"field",decorators:[property({attribute:"person-details",type:Object})],key:"personDetails",value:void 0},{kind:"field",decorators:[property({attribute:"person-image",type:String})],key:"personImage",value:void 0},{kind:"field",decorators:[property({attribute:"is-expanded",type:Boolean})],key:"isExpanded",value:()=>!1},{kind:"method",key:"attributeChangedCallback",value:function attributeChangedCallback(e,t,r){_get(_getPrototypeOf(MgtPersonCard.prototype),"attributeChangedCallback",this).call(this,e,t,r),"is-expanded"===e&&t!==r&&(this.isExpanded=!1)}},{kind:"method",key:"firstUpdated",value:function firstUpdated(){Providers.onProviderUpdated(()=>this.loadData()),this.loadData()}},{kind:"method",key:"render",value:function render(){if(this.personDetails){const e=this.personDetails;let t,r;return e.department&&(t=b`
          <div class="department">${e.department}</div>
        `),e.jobTitle&&(r=b`
          <div class="job-title">${e.jobTitle}</div>
        `),b`
        <div class="root" @click=${this.handleClose}>
          <div class="default-view">
            ${this.renderTemplate("default",{person:this.personDetails})||b`
                <mgt-person
                  class="person-image"
                  .personDetails=${this.personDetails}
                  .personImage=${this.personImage}
                ></mgt-person>
                <div class="details">
                  <div class="display-name">${e.displayName}</div>
                  ${r} ${t}
                  <div class="base-icons">
                    ${this.renderIcons()}
                  </div>
                </div>
              `}
          </div>
          <div class="additional-details-container">
            ${this.renderAdditionalDetails()}
          </div>
        </div>
      `}}},{kind:"method",key:"renderIcons",value:function renderIcons(){if(!0===this.isExpanded)return b``;{const e=this.personDetails;let t,r,n;return e.mailNickname&&(t=b`
          <div class="icon" @click=${this._chatUser}>
            ${getSvg(je.Chat,"#666666")}
          </div>
        `),getEmailFromGraphEntity(e)&&(r=b`
          <div class="icon" @click=${this._emailUser}>
            ${getSvg(je.Email,"#666666")}
          </div>
        `),e.businessPhones&&e.businessPhones.length>0&&(n=b`
          <div class="icon" @click=${this._callUser}>
            ${getSvg(je.Phone,"#666666")}
          </div>
        `),b`
        ${t} ${r} ${n}
      `}}},{kind:"method",key:"renderAdditionalDetails",value:function renderAdditionalDetails(){if(!0===this.isExpanded){const e=this.personDetails;let t,r,n,o;e.businessPhones&&e.businessPhones.length>0&&(t=b`
          <div class="details-icon" @click=${this._callUser}>
            ${getSvg(je.SmallPhone,"#666666")}
            <span class="link-subtitle data">${e.businessPhones[0]}</span>
          </div>
        `),getEmailFromGraphEntity(e)&&(r=b`
          <div class="details-icon" @click=${this._emailUser}>
            ${getSvg(je.SmallEmail,"#666666")}
            <span class="link-subtitle data">${getEmailFromGraphEntity(e)}</span>
          </div>
        `),e.mailNickname&&(o=b`
          <div class="details-icon" @click=${this._chatUser}>
            ${getSvg(je.SmallChat,"#666666")}
            <span class="link-subtitle data">${e.mailNickname}</span>
          </div>
        `),e.officeLocation&&(n=b`
          <div class="details-icon">
            ${getSvg(je.SmallLocation,"#666666")}<span class="normal-subtitle data">${e.officeLocation}</span>
          </div>
        `);const i=this.templates&&this.templates["additional-details"];return b`
        <div class="additional-details-info">
          <div class="contact-text">Contact</div>
          <div class="additional-details-row">
            <div class="additional-details-item">
              <div class="icons">
                ${o} ${r} ${t} ${n}
              </div>
              ${i?b`
                    <div class="section-divider"></div>
                    <div class="custom-section">
                      ${this.renderTemplate("additional-details",null)}
                    </div>
                  `:null}
            </div>
          </div>
        </div>
      `}return b`
        <div class="additional-details-button" @click=${this._showAdditionalDetails}>
          <svg
            class="additional-details-svg"
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 7L8.24324 13.7568L1.24324 6.75676" stroke="#3078CD" />
          </svg>
        </div>
      `}},{kind:"method",key:"_showAdditionalDetails",value:function _showAdditionalDetails(e){e.stopPropagation();const t=this.renderRoot.querySelector(".root");t&&t.animate&&t.animate([{height:"auto",transformOrigin:"top left"},{height:"auto",transformOrigin:"top left"}],{duration:1e3,easing:"ease-in-out",fill:"both"}),this.isExpanded=!0}},{kind:"method",key:"_callUser",value:function _callUser(e){const t=this.personDetails;let r;t.businessPhones&&t.businessPhones.length>0&&(r=t.businessPhones[0]),e.stopPropagation(),window.location.assign("tel:"+r)}},{kind:"method",key:"_emailUser",value:function _emailUser(e){const t=this.personDetails;let r;getEmailFromGraphEntity(t)&&(r=getEmailFromGraphEntity(t)),e.stopPropagation(),window.location.assign("mailto:"+r)}},{kind:"method",key:"_chatUser",value:function _chatUser(e){const t=this.personDetails;let r;t.mailNickname&&(r=t.mailNickname),e.stopPropagation(),window.location.assign("sip:"+r)}},{kind:"method",key:"loadData",value:async function loadData(){if(this.personDetails)return;const t=Providers.globalProvider;t&&(t.state,e.ProviderState.SignedIn)}},{kind:"method",key:"handleClose",value:function handleClose(e){e.stopPropagation()}}]}},MgtTemplatedComponent);class TaskSourceBase{constructor(e){this.graph=e}async me(){return await this.graph.getMe()}}class PlannerTaskSource extends TaskSourceBase{async getMyDressers(){return(await this.graph.planner_getAllMyPlans()).map(e=>({id:e.id,title:e.title}))}async getSingleDresser(e){let t=await this.graph.planner_getSinglePlan(e);return{id:t.id,title:t.title,_raw:t}}async getDrawersForDresser(e){return(await this.graph.planner_getBucketsForPlan(e)).map(e=>({id:e.id,parentId:e.planId,name:e.name,_raw:e}))}async getAllTasksForDrawer(e){return(await this.graph.planner_getTasksForBucket(e)).map(e=>({id:e.id,immediateParentId:e.bucketId,topParentId:e.planId,name:e.title,eTag:e["@odata.etag"],completed:100===e.percentComplete,dueDate:e.dueDateTime,assignments:e.assignments,_raw:e}))}async setTaskComplete(e,t){return await this.graph.planner_setTaskComplete(e,t)}async setTaskIncomplete(e,t){return await this.graph.planner_setTaskIncomplete(e,t)}async addTask(e){return await this.graph.planner_addTask({title:e.name,bucketId:e.immediateParentId,planId:e.topParentId,dueDateTime:e.dueDate,assignments:e.assignments})}async removeTask(e,t){return await this.graph.planner_removeTask(e,t)}}class TodoTaskSource extends TaskSourceBase{async getMyDressers(){return(await this.graph.todo_getAllMyGroups()).map(e=>({id:e.id,secondaryId:e.groupKey,title:e.name,_raw:e}))}async getSingleDresser(e){let t=await this.graph.todo_getSingleGroup(e);return{id:t.id,secondaryId:t.groupKey,title:t.name,_raw:t}}async getDrawersForDresser(e){return(await this.graph.todo_getFoldersForGroup(e)).map(t=>({id:t.id,parentId:e,name:t.name,_raw:t}))}async getAllTasksForDrawer(e,t){return(await this.graph.todo_getAllTasksForFolder(e)).map(r=>({id:r.id,immediateParentId:e,topParentId:t,name:r.subject,eTag:r["@odata.etag"],completed:!!r.completedDateTime,dueDate:r.dueDateTime&&r.dueDateTime.dateTime,assignments:{},_raw:r}))}async setTaskComplete(e,t){return await this.graph.todo_setTaskComplete(e,t)}async setTaskIncomplete(e,t){return await this.graph.todo_setTaskIncomplete(e,t)}async addTask(e){let t={subject:e.name,assignedTo:(e.assignments,"John Doe"),parentFolderId:e.immediateParentId};return e.dueDate&&(t.dueDateTime={dateTime:e.dueDate,timeZone:"UTC"}),await this.graph.todo_addTask(t)}async removeTask(e,t){return await this.graph.todo_removeTask(e,t)}}const Ge=[Z`
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
:host([hidden]) {
  display: none; }

:host {
  display: block;
  --default-font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  --theme-primary-color: #0078d7;
  --theme-dark-color: #005a9e; }

.ms-Icon {
  display: inline-block;
  font-family: "FabricMDL2Icons";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  margin: 4px 0; }

.ms-Icon--ChevronDown::before {
  content: "\\\E70D"; }

.ms-Icon--ChevronUp::before {
  content: "\\\E70E"; }

.ms-Icon--Contact::before {
  content: "\\\E77B"; }

.ms-Icon--AddFriend::before {
  content: "\\\E8FA"; }

.ms-Icon--OutlookLogoInverse::before {
  content: "\\\EB6D"; }

/*
  Your use of the content in the files referenced here is subject to the terms of the license at http://aka.ms/fabric-assets-license
*/
mgt-tasks,
:host {
  font-family: var(--default-font-family, "Segoe UI");
  display: flex;
  flex-direction: column; }

mgt-tasks .TaskIcon,
:host .TaskIcon {
  font-family: 'FabricMDL2Icons';
  text-align: center;
  justify-self: center;
  align-content: center;
  align-self: center;
  vertical-align: middle;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none; }

mgt-tasks .Header,
:host .Header {
  padding: var(--tasks-header-padding, 0px 10px 0 10px);
  margin: var(--tasks-header-margin, 0 0 10px 0); }

mgt-tasks .TaskIcon.Divider,
:host .TaskIcon.Divider {
  vertical-align: initial;
  margin: 0 12px;
  font-size: 16px; }

mgt-tasks .Header .PlannerTitle,
:host .Header .PlannerTitle {
  padding: var(--tasks-title-padding, 0px 0px 0px 0px);
  display: flex;
  align-items: center;
  align-content: center; }

mgt-tasks select,
:host select {
  font-family: var(--default-font-family, "Segoe UI");
  border: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  cursor: pointer; }

mgt-tasks select::-ms-expand,
:host select::-ms-expand {
  display: none; }

mgt-tasks .PlannerTitle select,
:host .PlannerTitle select,
mgt-tasks .Header .PlannerTitle .PlanTitle,
:host .Header .PlannerTitle .PlanTitle {
  font-family: var(--default-font-family, "Segoe UI");
  font-size: var(--tasks-plan-title-font-size, 1.1em);
  padding: var(--tasks-plan-title-padding, 5px); }

mgt-tasks .Header .AddBar,
:host .Header .AddBar {
  display: flex; }

mgt-tasks .Header .AddBar .AddBarItem,
:host .Header .AddBar .AddBarItem {
  flex: 1 1 auto; }

mgt-tasks .Header .NewTaskDue,
:host .Header .NewTaskDue {
  display: flex; }

mgt-tasks .Header .NewTaskDue input,
:host .Header .NewTaskDue input {
  flex: 1 1 auto; }

mgt-tasks .Header .TitleCont,
:host .Header .TitleCont {
  flex: 1 1 auto;
  height: var(--tasks-new-button-height, 34px); }

mgt-tasks .Header .NewTaskButton,
:host .Header .NewTaskButton {
  flex: 0 0 auto;
  display: inline-block;
  width: var(--task-new-button-width, 90px);
  height: var(--tasks-new-button-height, 32px);
  max-width: 90px;
  min-width: 90px;
  line-height: 200%;
  text-align: center;
  align-content: center;
  align-self: center;
  vertical-align: middle;
  justify-self: flex-end;
  background: var(--tasks-new-button-background, #0078d4);
  border: var(--tasks-new-button-border, solid 1px rgba(0, 0, 0, 0));
  color: var(--tasks-new-button-color, #ffffff);
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  cursor: pointer; }

mgt-tasks .Header .NewTaskButton:hover,
:host .Header .NewTaskButton:hover {
  background: var(--tasks-new-button-hover-background, #0091ff); }

mgt-tasks .Header .NewTaskButton:active,
:host .Header .NewTaskButton:active {
  background: var(--tasks-new-button-active-background, #00508d); }

mgt-tasks .NewTaskName,
:host .NewTaskName {
  margin: var(--task-new-name-margin, 0 130px 0 0); }

mgt-tasks .Task,
:host .Task {
  display: flex;
  flex-direction: column;
  margin: var(--task-margin, 0 10px 10px 10px);
  padding: var(--task-padding, 0 0 0 0);
  box-shadow: var(--task-box-shadow, 0px 2px 8px rgba(0, 0, 0, 0.092));
  background: var(--task-background, #ffffff); }

mgt-tasks .Task.NewTask,
:host .Task.NewTask {
  flex-direction: row;
  margin: var(--task-new-margin, var(--task-margin, 0 10px 10px 10px)); }

mgt-tasks .Task.NewTask .InnerTask,
:host .Task.NewTask .InnerTask {
  flex: 1 1 auto;
  align-content: center;
  vertical-align: middle;
  margin: 0 0 0 12px; }

mgt-tasks .Task.NewTask .TaskTitle,
:host .Task.NewTask .TaskTitle {
  display: flex; }

mgt-tasks .Task.NewTask .TaskHeader,
:host .Task.NewTask .TaskHeader {
  margin: 0; }

mgt-tasks .Task.NewTask .TaskTitle input,
:host .Task.NewTask .TaskTitle input {
  flex: 1 1 auto;
  font-family: var(--default-font-family, "Segoe UI");
  margin: var(--task-new-input-margin, 16px 0 0 0);
  padding: var(--task-new-input-padding, 7px);
  font-size: var(--task-new-input-font-size, 1.2em);
  border: var(--task-new-border, none); }

mgt-tasks .Task.NewTask .TaskTitle input:active,
:host .Task.NewTask .TaskTitle input:active {
  border: var(--task-new-input-active-border, none); }

mgt-tasks .Task.NewTask hr,
:host .Task.NewTask hr {
  border: var(--task-new-line-border, solid 1px #d8d8d8);
  margin: 0; }

mgt-tasks .Task.NewTask .TaskDetails,
:host .Task.NewTask .TaskDetails {
  flex: 0 0 auto;
  margin: 14px 0 14px 4px; }

mgt-tasks .Task.NewTask .TaskDetails .TaskPeople label,
:host .Task.NewTask .TaskDetails .TaskPeople label {
  display: flex;
  align-content: center;
  align-items: center; }

mgt-tasks .Task.NewTask .TaskDetails select,
:host .Task.NewTask .TaskDetails select,
mgt-tasks .Task.NewTask .TaskDetails input,
:host .Task.NewTask .TaskDetails input {
  font-family: var(--default-font-family, "Segoe UI");
  border: var(--task-new-select-border, none); }

mgt-tasks .Task.NewTask .TaskAddCont,
:host .Task.NewTask .TaskAddCont {
  flex: 0 0 auto;
  display: flex;
  align-content: center;
  align-items: center; }

mgt-tasks .Task.NewTask .TaskAddCont .TaskAdd,
:host .Task.NewTask .TaskAddCont .TaskAdd,
mgt-tasks .Task.NewTask .TaskAddCont .TaskCancel,
:host .Task.NewTask .TaskAddCont .TaskCancel {
  height: 100%;
  max-width: 50px;
  min-width: 50px;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
  color: white; }

mgt-tasks .Task.NewTask .TaskAddCont .TaskAdd,
:host .Task.NewTask .TaskAddCont .TaskAdd {
  background: var(--task-new-add-button-background, #0078d4); }

mgt-tasks .Task.NewTask .TaskAddCont .TaskCancel,
:host .Task.NewTask .TaskAddCont .TaskCancel {
  font-family: 'Segoe UI';
  color: var(--task-new-cancel-button-color, gray);
  margin: 0px 20px 0px 32px; }

mgt-tasks .Task.NewTask .TaskAddCont.Disabled .TaskAdd,
:host .Task.NewTask .TaskAddCont.Disabled .TaskAdd {
  background: var(--task-new-add-button-disabled-background, #eaeaea);
  cursor: default; }

mgt-tasks .Task.NewTask .SelfAssign,
:host .Task.NewTask .SelfAssign {
  display: none; }

mgt-tasks .Task.NewTask .FakeCheckBox,
:host .Task.NewTask .FakeCheckBox {
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin: 0 5px 0 5px; }

mgt-tasks .Task.NewTask .FakeCheckBox::after,
:host .Task.NewTask .FakeCheckBox::after {
  font-family: 'FabricMDL2Icons';
  content: '\uE739'; }

mgt-tasks .Task.NewTask input:checked,
:host .Task.NewTask input:checked ~ .FakeCheckBox::after {
  font-family: 'FabricMDL2Icons';
  content: '\uE73A'; }

mgt-tasks .Task .TaskDetails,
:host .Task .TaskDetails {
  margin: 0 0 16px 20px;
  color: var(--task-detail-color, #767676);
  font-size: 0.9em;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  justify-items: flex-start;
  align-content: stretch;
  align-items: stretch; }

mgt-tasks .Task .TaskDetails input,
:host .Task .TaskDetails input,
mgt-tasks .Task .TaskDetails select,
:host .Task .TaskDetails select {
  color: var(--task-detail-color, #767676);
  font-size: 0.9em; }

mgt-tasks .Task.Complete,
:host .Task.Complete {
  background: var(--task-complete-background, #f6f6f6);
  border-color: var(--task-complete-border, #e2e2e2); }

mgt-tasks .Task.Complete .TaskHeader,
:host .Task.Complete .TaskHeader {
  color: var(--task-complete-header-color, #959595); }

mgt-tasks .Task.Complete .TaskDetails,
:host .Task.Complete .TaskDetails {
  color: var(--task-complete-detail-color #b0b0b0); }

mgt-tasks .Task.Complete .TaskDetails .TaskIcon,
:host .Task.Complete .TaskDetails .TaskIcon {
  color: var(--task-compete-detail-icon-color, #959595); }

mgt-tasks .Task .TaskDetail,
:host .Task .TaskDetail {
  align-items: center;
  align-content: center;
  display: flex; }

mgt-tasks .Task .TaskDetail svg,
:host .Task .TaskDetail svg,
mgt-tasks .Task .TaskDetail span,
:host .Task .TaskDetail span {
  vertical-align: middle; }

mgt-tasks .Task .TaskDetail svg,
:host .Task .TaskDetail svg {
  margin-right: 4px; }

mgt-tasks .Task .TaskDetail .TaskIcon,
:host .Task .TaskDetail .TaskIcon {
  margin: var(--task-detail-icon-margin 0 8px 0 0); }

mgt-tasks .Task .TaskHeader,
:host .Task .TaskHeader {
  display: flex;
  justify-content: center;
  color: var(--task-header-color, #333333);
  margin: var(--task-header-margin, 0 0 0 10px); }

mgt-tasks .Task.ReadOnly .TaskCheckCont,
:host .Task.ReadOnly .TaskCheckCont {
  cursor: default; }

mgt-tasks .Task .TaskCheckCont,
:host .Task .TaskCheckCont {
  font-family: 'FabricMDL2Icons';
  display: inline-block;
  width: 35px;
  height: 35px;
  margin: 5px;
  text-align: center;
  border-radius: 50%;
  flex: 0 0 auto;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none; }

mgt-tasks .Task .TaskCheckCont.Complete .TaskCheck,
:host .Task .TaskCheckCont.Complete .TaskCheck {
  background: #00b294;
  border-color: #00b294;
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center; }

mgt-tasks .Task .TaskCheck,
:host .Task .TaskCheck {
  flex: 1 1 auto;
  font-family: 'FabricMDL2Icons';
  display: inline-block;
  width: 22px;
  height: 22px;
  text-align: center;
  border-radius: 50%;
  border: solid 1px #666666;
  flex: 0 0 auto;
  color: white;
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none; }

mgt-tasks .Task .TaskCheck.Loading,
:host .Task .TaskCheck.Loading {
  color: black;
  animation: rotateIcon 2s infinite linear; }

mgt-tasks .Task .TaskTitle,
:host .Task .TaskTitle {
  flex: 1 1 auto;
  justify-self: center;
  align-self: center;
  align-content: center;
  color: #333333; }

mgt-tasks .Task .TaskDetails .TaskDetail,
:host .Task .TaskDetails .TaskDetail {
  margin: 0 20px 0 0; }

mgt-tasks .Task .TaskDetails .TaskIcon,
:host .Task .TaskDetails .TaskIcon {
  color: #333333; }

mgt-tasks .Task .TaskDetails mgt-person,
:host .Task .TaskDetails mgt-person {
  display: inline-block; }

mgt-tasks .Task .TaskDelete,
:host .Task .TaskDelete {
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  margin: 0 10px 0 0; }

@keyframes rotateIcon {
  from {
    transform: rotate(0deg); }
  to {
    transform: rotate(360deg); } }

mgt-tasks .LoadingHeader,
:host .LoadingHeader {
  max-width: 90px;
  width: 100%;
  height: 20px;
  background: #f2f2f2; }

mgt-tasks .Task.LoadingTask .TaskCheckCont,
:host .Task.LoadingTask .TaskCheckCont {
  cursor: default; }

mgt-tasks .Task.LoadingTask .TaskCheck,
:host .Task.LoadingTask .TaskCheck {
  background: #f2f2f2;
  border-color: #f2f2f2;
  cursor: default; }

mgt-tasks .Task.LoadingTask .TaskHeader,
:host .Task.LoadingTask .TaskHeader {
  justify-content: flex-start;
  justify-items: flex-start; }

mgt-tasks .Task.LoadingTask .TaskTitle,
:host .Task.LoadingTask .TaskTitle {
  max-width: 370px;
  width: 100%;
  height: 20px;
  background: #f2f2f2; }

mgt-tasks .Task.LoadingTask .TaskDetailIcon,
:host .Task.LoadingTask .TaskDetailIcon {
  width: 16px;
  height: 16px;
  margin: 5px;
  background: #f2f2f2; }

mgt-tasks .Task.LoadingTask .TaskDetail,
:host .Task.LoadingTask .TaskDetail {
  margin-right: 8px; }

mgt-tasks .Task.LoadingTask .TaskDetailName,
:host .Task.LoadingTask .TaskDetailName {
  width: 81px;
  height: 10px;
  background: #f2f2f2; }

`],We=[Z`
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
:host,
mgt-arrow-options {
  position: relative;
  font-family: 'Segoe UI';
  margin: 0 0 12px 0; }

:host .ArrowIcon,
mgt-arrow-options .ArrowIcon {
  font-family: 'FabricMDL2Icons';
  margin: 0 0 0 20px;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none; }

:host .Header,
mgt-arrow-options .Header {
  cursor: pointer; }

:host .Header:hover,
mgt-arrow-options .Header:hover {
  color: var(--theme-primary-color);
  background-color: var(--background-color--hover); }

:host .Menu,
mgt-arrow-options .Menu {
  position: absolute;
  left: 0;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 40px 5px;
  background: #ffffff;
  z-index: 1;
  display: none;
  color: black;
  white-space: nowrap; }

:host .Menu.Open,
mgt-arrow-options .Menu.Open {
  display: block; }

:host .MenuOption,
mgt-arrow-options .MenuOption {
  padding: 20px;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  display: flex;
  align-items: center;
  justify-content: stretch;
  justify-items: stretch; }

:host .MenuOption:first,
mgt-arrow-options .MenuOption:first {
  padding: 12px 20px 20px 20px; }

:host .MenuOption:hover,
mgt-arrow-options .MenuOption:hover {
  background: #c0c0c0; }

:host .MenuOption:active,
mgt-arrow-options .MenuOption:active {
  background: #d8d8d8; }

:host .MenuOptionCheck,
mgt-arrow-options .MenuOptionCheck {
  font-family: 'FabricMDL2Icons';
  color: rgba(0, 0, 0, 0);
  margin-right: 10px; }

:host .MenuOptionCheck.CurrentValue,
mgt-arrow-options .MenuOptionCheck.CurrentValue {
  color: #0078d4; }

`];_decorate([B("mgt-arrow-options")],function(e,t){class MgtArrowOptions extends t{constructor(){super(),e(this),this._clickHandler=(e=>this.open=!1)}}return{F:MgtArrowOptions,d:[{kind:"get",static:!0,key:"styles",value:function styles(){return We}},{kind:"field",decorators:[property({type:Boolean})],key:"open",value:()=>!1},{kind:"field",decorators:[property({type:String})],key:"value",value:()=>""},{kind:"field",decorators:[property({type:Object})],key:"options",value:()=>({})},{kind:"field",key:"_clickHandler",value:void 0},{kind:"method",key:"connectedCallback",value:function connectedCallback(){_get(_getPrototypeOf(MgtArrowOptions.prototype),"connectedCallback",this).call(this),window.addEventListener("click",this._clickHandler)}},{kind:"method",key:"disconnectedCallback",value:function disconnectedCallback(){window.removeEventListener("click",this._clickHandler),_get(_getPrototypeOf(MgtArrowOptions.prototype),"disconnectedCallback",this).call(this)}},{kind:"method",key:"onHeaderClick",value:function onHeaderClick(e){Object.keys(this.options).length>1&&(e.preventDefault(),e.stopPropagation(),this.open=!this.open)}},{kind:"method",key:"render",value:function render(){return b`
      <span class="Header" @click=${e=>this.onHeaderClick(e)}>
        <span class="CurrentValue">${this.value}</span>
      </span>
      <div class=${_e({Menu:!0,Open:this.open,Closed:!this.open})}>
        ${this.getMenuOptions()}
      </div>
    `}},{kind:"method",key:"getMenuOptions",value:function getMenuOptions(){let e=Object.keys(this.options),t=this.options;return e.map(e=>b`
        <div
          class="MenuOption"
          @click="${r=>{this.open=!1,t[e](r)}}"
        >
          <span class=${_e({MenuOptionCheck:!0,CurrentValue:this.value===e})}>
            \uE73E
          </span>
          <span class="MenuOptionName">${e}</span>
        </div>
      `)}}]}},MgtBaseComponent);const Ze=[Z`
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
:host([hidden]) {
  display: none; }

:host {
  display: block;
  --default-font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  --theme-primary-color: #0078d7;
  --theme-dark-color: #005a9e; }

.ms-Icon {
  display: inline-block;
  font-family: "FabricMDL2Icons";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  margin: 4px 0; }

.ms-Icon--ChevronDown::before {
  content: "\\\E70D"; }

.ms-Icon--ChevronUp::before {
  content: "\\\E70E"; }

.ms-Icon--Contact::before {
  content: "\\\E77B"; }

.ms-Icon--AddFriend::before {
  content: "\\\E8FA"; }

.ms-Icon--OutlookLogoInverse::before {
  content: "\\\EB6D"; }

/*
  Your use of the content in the files referenced here is subject to the terms of the license at http://aka.ms/fabric-assets-license
*/
:host,
mgt-dot-options {
  font-family: 'Segoe UI'; }

:host .DotIcon,
mgt-dot-options .DotIcon {
  display: inline-block;
  font-family: 'FabricMDL2Icons';
  min-width: 30px;
  min-height: 30px; }

:host .Menu,
mgt-dot-options .Menu {
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 40px 5px;
  background: #ffffff;
  z-index: 1;
  display: none;
  color: black;
  white-space: nowrap;
  transform: translateX(-50px); }

:host .DotMenu.Open .Menu,
mgt-dot-options .DotMenu.Open .Menu {
  display: block; }

:host .DotMenu .DotItem,
mgt-dot-options .DotMenu .DotItem {
  direction: ltr;
  text-align: left;
  padding: 10px 10px 8px 10px; }

:host .DotMenu .DotItem:hover,
mgt-dot-options .DotMenu .DotItem:hover {
  background: #c0c0c0; }

:host .DotMenu .DotItem:active,
mgt-dot-options .DotMenu .DotItem:active {
  background: #d8d8d8; }

:host .DotMenu .DotItemName,
mgt-dot-options .DotMenu .DotItemName {
  direction: rtl; }

`];_decorate([B("mgt-dot-options")],function(e,t){class MgtDotOptions extends t{constructor(){super(),e(this),this._clickHandler=(e=>this.open=!1)}}return{F:MgtDotOptions,d:[{kind:"get",static:!0,key:"styles",value:function styles(){return Ze}},{kind:"field",decorators:[property({type:Boolean})],key:"open",value:()=>!1},{kind:"field",decorators:[property({type:Object})],key:"options",value:()=>null},{kind:"field",key:"_clickHandler",value:()=>null},{kind:"method",key:"connectedCallback",value:function connectedCallback(){_get(_getPrototypeOf(MgtDotOptions.prototype),"connectedCallback",this).call(this),window.addEventListener("click",this._clickHandler)}},{kind:"method",key:"disconnectedCallback",value:function disconnectedCallback(){window.removeEventListener("click",this._clickHandler),_get(_getPrototypeOf(MgtDotOptions.prototype),"disconnectedCallback",this).call(this)}},{kind:"method",key:"onDotClick",value:function onDotClick(e){e.preventDefault(),e.stopPropagation(),this.open=!this.open}},{kind:"method",key:"render",value:function render(){return b`
      <div class=${_e({DotMenu:!0,Open:this.open})} @click=${e=>this.onDotClick(e)}>
        <span class="DotIcon">\uE712</span>
        <div class="Menu">
          ${Object.keys(this.options).map(e=>this.getMenuOption(e,this.options[e]))}
        </div>
      </div>
    `}},{kind:"method",key:"getMenuOption",value:function getMenuOption(e,t){return b`
      <div
        class="DotItem"
        @click="${e=>{e.preventDefault(),e.stopPropagation(),t(e),this.open=!1}}"
      >
        <span class="DotItemName">
          ${e}
        </span>
      </div>
    `}}]}},MgtBaseComponent);const Ke={todo:{DUE_DATE_TIME:"T17:00",BASE_SELF_ASSIGNED:"All Tasks",PLANS_SELF_ASSIGNED:"All groups",BUCKETS_SELF_ASSIGNED:"All Folders",PLAN_NOT_FOUND:"Group not found",BUCKET_NOT_FOUND:"Folder not found"},planner:{DUE_DATE_TIME:"T17:00",BASE_SELF_ASSIGNED:"Assigned to Me",PLANS_SELF_ASSIGNED:"All Plans",BUCKETS_SELF_ASSIGNED:"All Buckets",PLAN_NOT_FOUND:"Plan not found",BUCKET_NOT_FOUND:"Bucket not found"}};let Qe=_decorate([B("mgt-tasks")],function(t,r){class MgtTasks extends r{constructor(){super(),t(this),this._providerUpdateCallback=(()=>this.loadTasks())}}return{F:MgtTasks,d:[{kind:"get",key:"res",value:function res(){switch(this.dataSource){case"todo":return Ke.todo;case"planner":default:return Ke.planner}}},{kind:"get",static:!0,key:"styles",value:function styles(){return Ge}},{kind:"field",decorators:[property({attribute:"read-only",type:Boolean})],key:"readOnly",value:()=>!1},{kind:"field",decorators:[property({attribute:"data-source",type:String})],key:"dataSource",value:()=>"planner"},{kind:"field",decorators:[property({attribute:"target-id",type:String})],key:"targetId",value:()=>null},{kind:"field",decorators:[property({attribute:"target-bucket-id",type:String})],key:"targetBucketId",value:()=>null},{kind:"field",decorators:[property({attribute:"initial-id",type:String})],key:"initialId",value:()=>null},{kind:"field",decorators:[property({attribute:"initial-bucket-id",type:String})],key:"initialBucketId",value:()=>null},{kind:"field",decorators:[property({attribute:"hide-header",type:Boolean})],key:"hideHeader",value:()=>!1},{kind:"field",decorators:[property()],key:"_showNewTask",value:()=>!1},{kind:"field",decorators:[property()],key:"_newTaskBeingAdded",value:()=>!1},{kind:"field",decorators:[property()],key:"_newTaskSelfAssigned",value:()=>!0},{kind:"field",decorators:[property()],key:"_newTaskName",value:()=>""},{kind:"field",decorators:[property()],key:"_newTaskDueDate",value:()=>""},{kind:"field",decorators:[property()],key:"_newTaskDresserId",value:()=>""},{kind:"field",decorators:[property()],key:"_newTaskDrawerId",value:()=>""},{kind:"field",decorators:[property()],key:"_dressers",value:()=>[]},{kind:"field",decorators:[property()],key:"_drawers",value:()=>[]},{kind:"field",decorators:[property()],key:"_tasks",value:()=>[]},{kind:"field",decorators:[property()],key:"_currentTargetDresser",value(){return this.res.BASE_SELF_ASSIGNED}},{kind:"field",decorators:[property()],key:"_currentSubTargetDresser",value(){return this.res.PLANS_SELF_ASSIGNED}},{kind:"field",decorators:[property()],key:"_currentTargetDrawer",value(){return this.res.BUCKETS_SELF_ASSIGNED}},{kind:"field",decorators:[property()],key:"_hiddenTasks",value:()=>[]},{kind:"field",decorators:[property()],key:"_loadingTasks",value:()=>[]},{kind:"field",decorators:[property()],key:"_inTaskLoad",value:()=>!1},{kind:"field",decorators:[property()],key:"_hasDoneInitialLoad",value:()=>!1},{kind:"field",decorators:[property()],key:"_todoDefaultSet",value:()=>!1},{kind:"field",key:"_me",value:()=>null},{kind:"field",key:"_providerUpdateCallback",value:void 0},{kind:"method",key:"connectedCallback",value:function connectedCallback(){_get(_getPrototypeOf(MgtTasks.prototype),"connectedCallback",this).call(this),Providers.onProviderUpdated(this._providerUpdateCallback)}},{kind:"method",key:"disconnectedCallback",value:function disconnectedCallback(){Providers.removeProviderUpdatedListener(this._providerUpdateCallback),_get(_getPrototypeOf(MgtTasks.prototype),"disconnectedCallback",this).call(this)}},{kind:"method",key:"firstUpdated",value:function firstUpdated(){!this.initialId||this._currentTargetDresser&&!this.isDefault(this._currentTargetDresser)||("planner"===this.dataSource?this._currentTargetDresser=this.initialId:"todo"===this.dataSource&&(this._currentTargetDrawer=this.initialId)),"planner"!==this.dataSource||!this.initialBucketId||this._currentTargetDrawer&&!this.isDefault(this._currentTargetDrawer)||(this._currentTargetDrawer=this.initialBucketId),this.loadTasks()}},{kind:"method",key:"attributeChangedCallback",value:function attributeChangedCallback(e,t,r){_get(_getPrototypeOf(MgtTasks.prototype),"attributeChangedCallback",this).call(this,e,t,r),"data-source"===e&&("planner"===this.dataSource?(this._currentTargetDresser=this.initialId||this.res.BASE_SELF_ASSIGNED,this._currentTargetDrawer=this.initialBucketId||this.res.BUCKETS_SELF_ASSIGNED):"todo"===this.dataSource&&(this._currentTargetDresser=this.res.BASE_SELF_ASSIGNED,this._currentTargetDrawer=this.initialId||this.res.BUCKETS_SELF_ASSIGNED),this._newTaskSelfAssigned=!1,this._newTaskDrawerId="",this._newTaskDresserId="",this._newTaskDueDate="",this._newTaskName="",this._newTaskBeingAdded=!1,this._tasks=[],this._drawers=[],this._dressers=[],this._hasDoneInitialLoad=!1,this._inTaskLoad=!1,this._todoDefaultSet=!1,this.loadTasks())}},{kind:"method",key:"loadTasks",value:async function loadTasks(){let e=this.getTaskSource();e&&(this._inTaskLoad=!0,this._me=await e.me(),this.targetId?"todo"===this.dataSource?await this._loadTargetTodoTasks(e):await this._loadTargetPlannerTasks(e):await this._loadAllTasks(e),this._inTaskLoad=!1,this._hasDoneInitialLoad||(this._hasDoneInitialLoad=!0))}},{kind:"method",key:"_loadTargetTodoTasks",value:async function _loadTargetTodoTasks(e){let t=await e.getMyDressers(),r=(await Promise.all(t.map(t=>e.getDrawersForDresser(t.id)))).reduce((e,t)=>[...e,...t],[]),n=(await Promise.all(r.map(t=>e.getAllTasksForDrawer(t.id,t.parentId)))).reduce((e,t)=>[...e,...t],[]);this._tasks=n,this._drawers=r,this._dressers=t,this._currentTargetDresser=this.res.BASE_SELF_ASSIGNED,this._currentTargetDrawer=this.targetId}},{kind:"method",key:"_loadTargetPlannerTasks",value:async function _loadTargetPlannerTasks(e){let t=await e.getSingleDresser(this.targetId),r=await e.getDrawersForDresser(t.id),n=(await Promise.all(r.map(t=>e.getAllTasksForDrawer(t.id,t.parentId)))).reduce((e,t)=>[...e,...t],[]);this._tasks=n,this._drawers=r,this._dressers=[t],this._currentTargetDresser=this.targetId,this.targetBucketId&&(this._currentTargetDrawer=this.targetBucketId)}},{kind:"method",key:"_loadAllTasks",value:async function _loadAllTasks(e){let t=await e.getMyDressers(),r=(await Promise.all(t.map(t=>e.getDrawersForDresser(t.id)))).reduce((e,t)=>[...e,...t],[]);if(!this.initialId&&"todo"===this.dataSource&&!this._todoDefaultSet){this._todoDefaultSet=!0;let e=r.find(e=>e._raw.isDefaultFolder);e&&(this._currentTargetDrawer=e.id)}let n=(await Promise.all(r.map(t=>e.getAllTasksForDrawer(t.id,t.parentId)))).reduce((e,t)=>[...e,...t],[]);this._tasks=n,this._drawers=r,this._dressers=t}},{kind:"method",key:"addTask",value:async function addTask(e,t,r,n,o={}){let i=this.getTaskSource();if(!i)return;let s={topParentId:r,immediateParentId:n,name:e,assignments:o};t&&"T"!==t&&(s.dueDate=this.getDateTimeOffset(t+"Z")),this._newTaskBeingAdded=!0,await i.addTask(s),await this.loadTasks(),this._newTaskBeingAdded=!1,this.closeNewTask(null)}},{kind:"method",key:"completeTask",value:async function completeTask(e){let t=this.getTaskSource();t&&(this._loadingTasks=[...this._loadingTasks,e.id],await t.setTaskComplete(e.id,e.eTag),await this.loadTasks(),this._loadingTasks=this._loadingTasks.filter(t=>t!==e.id))}},{kind:"method",key:"uncompleteTask",value:async function uncompleteTask(e){let t=this.getTaskSource();t&&(this._loadingTasks=[...this._loadingTasks,e.id],await t.setTaskIncomplete(e.id,e.eTag),await this.loadTasks(),this._loadingTasks=this._loadingTasks.filter(t=>t!==e.id))}},{kind:"method",key:"removeTask",value:async function removeTask(e){let t=this.getTaskSource();t&&(this._hiddenTasks=[...this._hiddenTasks,e.id],await t.removeTask(e.id,e.eTag),await this.loadTasks(),this._hiddenTasks=this._hiddenTasks.filter(t=>t!==e.id))}},{kind:"method",key:"openNewTask",value:function openNewTask(e){this._showNewTask=!0}},{kind:"method",key:"closeNewTask",value:function closeNewTask(e){this._showNewTask=!1,this._newTaskSelfAssigned=!1,this._newTaskDueDate="",this._newTaskName="",this._newTaskDresserId=""}},{kind:"method",key:"render",value:function render(){let e,t=this._tasks.filter(e=>this.taskPlanFilter(e)).filter(e=>this.taskBucketPlanFilter(e)).filter(e=>!this._hiddenTasks.includes(e.id)),r=this._inTaskLoad&&!this._hasDoneInitialLoad?this.renderLoadingTask():null;return this.hideHeader||(e=b`
        <div class="Header">
          <span class="PlannerTitle">
            ${this.renderPlanOptions()}
          </span>
        </div>
      `),b`
      ${e}
      <div class="Tasks">
        ${this._showNewTask?this.renderNewTaskHtml():null} ${r}
        ${He(t,e=>e.id,e=>this.renderTaskHtml(e))}
      </div>
    `}},{kind:"method",key:"onAddTaskClick",value:function onAddTaskClick(e){this._newTaskBeingAdded||!this._newTaskName||this.isDefault(this._currentTargetDresser)&&!this._newTaskDresserId||this.addTask(this._newTaskName,this._newTaskDueDate?this._newTaskDueDate+this.res.DUE_DATE_TIME:null,this.isDefault(this._currentTargetDresser)?this._newTaskDresserId:this._currentTargetDresser,this.isDefault(this._currentTargetDrawer)?this._newTaskDrawerId:this._currentTargetDrawer,this._newTaskSelfAssigned?{[this._me.id]:{"@odata.type":"microsoft.graph.plannerAssignment",orderHint:"string !"}}:void 0)}},{kind:"method",key:"renderPlanOptions",value:function renderPlanOptions(){let t=Providers.globalProvider;if(!t||t.state!==e.ProviderState.SignedIn)return null;if(this._inTaskLoad&&!this._hasDoneInitialLoad)return b`
        <span class="LoadingHeader"></span>
      `;let r=this.readOnly||this._showNewTask?null:b`
            <span
              class="AddBarItem NewTaskButton"
              @click="${e=>{this._showNewTask?this.closeNewTask(e):this.openNewTask(e)}}"
            >
              <span class="TaskIcon">\uE710</span>
              <span>Add</span>
            </span>
          `;if("planner"===this.dataSource){let e=this._dressers.find(e=>e.id===this._currentTargetDresser)||{title:this.res.BASE_SELF_ASSIGNED},t={[this.res.BASE_SELF_ASSIGNED]:e=>{this._currentTargetDresser=this.res.BASE_SELF_ASSIGNED,this._currentTargetDrawer=this.res.BUCKETS_SELF_ASSIGNED}};for(let e of this._dressers)t[e.title]=(t=>{this._currentTargetDresser=e.id,this._currentTargetDrawer=this.res.BUCKETS_SELF_ASSIGNED});let n=this.targetId?b`
            <span class="PlanTitle">
              ${this._dressers[0]&&this._dressers[0].title}
            </span>
          `:b`
            <mgt-arrow-options .options="${t}" .value="${e.title}"></mgt-arrow-options>
          `,o=this.isDefault(this._currentTargetDresser)?null:b`
            <span class="TaskIcon Divider">/</span>
          `,i=this._drawers.find(e=>e.id===this._currentTargetDrawer)||{name:this.res.BUCKETS_SELF_ASSIGNED},s={[this.res.BUCKETS_SELF_ASSIGNED]:e=>{this._currentTargetDrawer=this.res.BUCKETS_SELF_ASSIGNED}};for(let e of this._drawers.filter(e=>e.parentId===this._currentTargetDresser))s[e.name]=(t=>{this._currentTargetDrawer=e.id});let a=this.targetBucketId?b`
            <span class="PlanTitle">
              ${this._drawers[0]&&this._drawers[0].name}
            </span>
          `:b`
            <mgt-arrow-options .options="${s}" .value="${i.name}"></mgt-arrow-options>
          `;return b`
        <span class="TitleCont">
          ${n} ${o} ${this.isDefault(this._currentTargetDresser)?null:a}
        </span>
        ${r}
      `}{let e=this._drawers.find(e=>e.id===this.targetId)||{name:this.res.BUCKETS_SELF_ASSIGNED},t=this._drawers.find(e=>e.id===this._currentTargetDrawer)||{name:this.res.BUCKETS_SELF_ASSIGNED},n={};for(let e of this._drawers)n[e.name]=(t=>{this._currentTargetDrawer=e.id});n[this.res.BUCKETS_SELF_ASSIGNED]=(e=>{this._currentTargetDrawer=this.res.BUCKETS_SELF_ASSIGNED});let o=this.targetId?b`
            <span class="PlanTitle">
              ${e.name}
            </span>
          `:b`
            <mgt-arrow-options .value="${t.name}" .options="${n}"></mgt-arrow-options>
          `;return b`
        <span class="TitleCont">
          ${o}
        </span>
        ${r}
      `}}},{kind:"method",key:"renderNewTaskHtml",value:function renderNewTaskHtml(){let e=b`
      <span class="TaskTitle">
        <input
          type="text"
          placeholder="Task..."
          .value="${this._newTaskName}"
          label="new-taskName-input"
          aria-label="new-taskName-input"
          role="input"
          @input="${e=>{this._newTaskName=e.target.value}}"
        />
      </span>
    `,t=this._dressers;t.length>0&&!this._newTaskDresserId&&(this._newTaskDresserId=t[0].id);let r="todo"===this.dataSource?null:this.isDefault(this._currentTargetDresser)?b`
            <span class="TaskDetail TaskAssignee">
              ${this.renderPlannerIcon()}
              <select
                .value="${this._newTaskDresserId}"
                @change="${e=>{this._newTaskDresserId=e.target.value}}"
              >
                ${this._dressers.map(e=>b`
                    <option value="${e.id}">${e.title}</option>
                  `)}
              </select>
            </span>
          `:b`
            <span class="TaskDetail TaskAssignee">
              ${this.renderPlannerIcon()}
              <span>${this.getPlanTitle(this._currentTargetDresser)}</span>
            </span>
          `,n=this._drawers.filter(e=>!this.isDefault(this._currentTargetDresser)&&e.parentId===this._currentTargetDresser||this.isDefault(this._currentTargetDresser)&&e.parentId===this._newTaskDresserId);n.length>0&&!this._newTaskDrawerId&&(this._newTaskDrawerId=n[0].id);let o=this.isDefault(this._currentTargetDrawer)?b`
          <span class="TaskDetail TaskBucket">
            ${this.renderBucketIcon()}
            <select
              .value="${this._newTaskDrawerId}"
              @change="${e=>{this._newTaskDrawerId=e.target.value}}"
            >
              ${n.map(e=>b`
                  <option value="${e.id}">${e.name}</option>
                `)}
            </select>
          </span>
        `:b`
          <span class="TaskDetail TaskBucket">
            ${this.renderBucketIcon()}
            <span>${this.getDrawerName(this._currentTargetDrawer)}</span>
          </span>
        `,i=b`
      <span class="TaskDetail TaskDue">
        ${this.renderCalendarIcon()}
        <input
          type="date"
          label="new-taskDate-input"
          aria-label="new-taskDate-input"
          role="input"
          .value="${this._newTaskDueDate}"
          @change="${e=>{this._newTaskDueDate=e.target.value}}"
        />
      </span>
    `,s="todo"===this.dataSource?null:b`
            <span class="TaskDetail TaskPeople">
              <label>
                <input
                  class="SelfAssign"
                  type="checkbox"
                  label="self-assign-input"
                  aria-label="self-assign-input"
                  .checked="${this._newTaskSelfAssigned}"
                  @change="${e=>{this._newTaskSelfAssigned=e.target.checked}}"
                />
                <span class="FakeCheckBox"></span>
                <span>Assign to Me</span>
              </label>
            </span>
          `,a=this._newTaskBeingAdded?b`
          <div class="TaskAddCont"></div>
        `:b`
          <div class="TaskAddCont ${""===this._newTaskName?"Disabled":""}">
            <div class="TaskIcon TaskCancel" @click="${this.closeNewTask}">
              <span>Cancel</span>
            </div>
            <div class="TaskIcon TaskAdd" @click="${this.onAddTaskClick}">
              <span>\uE710</span>
            </div>
          </div>
        `;return b`
      <div class="Task NewTask Incomplete">
        <div class="InnerTask">
          <span class="TaskHeader">
            ${e}
          </span>
          <hr />
          <span class="TaskDetails">
            ${r} ${o} ${s} ${i}
          </span>
        </div>
        ${a}
      </div>
    `}},{kind:"method",key:"renderTaskHtml",value:function renderTaskHtml(e){let{name:t="Task",completed:r=!1,dueDate:n,assignments:o}=e,i=new Date(n),s=Object.keys(o),a=this._loadingTasks.includes(e.id)?b`
          <span class="TaskCheck TaskIcon Loading">\uF16A</span>
        `:r?b`
          <span class="TaskCheck TaskIcon Complete">\uE73E</span>
        `:b`
          <span class="TaskCheck TaskIcon Incomplete"></span>
        `,l="todo"!==this.dataSource&&this.isDefault(this._currentTargetDresser)?b`
            <span class="TaskDetail TaskAssignee">
              ${this.renderPlannerIcon()}
              <span>${this.getPlanTitle(e.topParentId)}</span>
            </span>
          `:null,c=this.isDefault(this._currentTargetDrawer)?b`
          <span class="TaskDetail TaskBucket">
            ${this.renderBucketIcon()}
            <span>${this.getDrawerName(e.immediateParentId)}</span>
          </span>
        `:null,d=n?b`
          <span class="TaskDetail TaskDue">
            ${this.renderCalendarIcon()}
            <span>${function getShortDateString(e){let t=e.getMonth(),r=e.getDate();return`${function getMonthString(e){switch(e){case 0:return"January";case 1:return"February";case 2:return"March";case 3:return"April";case 4:return"May";case 5:return"June";case 6:return"July";case 7:return"August";case 8:return"September";case 9:return"October";case 10:return"November";case 11:return"December";default:return"Month"}}(t)} ${r}`}(i)}</span>
          </span>
        `:null,p=s&&0!==s.length?b`
            <span class="TaskDetail TaskPeople">
              ${s.map(e=>b`
                    <mgt-person user-id="${e}"></mgt-person>
                  `)}
            </span>
          `:null,u=this.readOnly?null:b`
          <span class="TaskIcon TaskDelete">
            <mgt-dot-options
              .options="${{"Delete Task":()=>this.removeTask(e)}}"
            ></mgt-dot-options>
          </span>
        `;return b`
      <div
        class=${_e({Task:!0,Complete:r,Incomplete:!r,ReadOnly:this.readOnly})}
      >
        <div class="TaskHeader">
          <span
            class=${_e({TaskCheckCont:!0,Complete:r,Incomplete:!r})}
            @click="${t=>{this.readOnly||(e.completed?this.uncompleteTask(e):this.completeTask(e))}}"
          >
            ${a}
          </span>
          <span class="TaskTitle">
            ${t}
          </span>
          ${u}
        </div>
        <div class="TaskDetails">
          ${l} ${c} ${p} ${d}
        </div>
      </div>
    `}},{kind:"method",key:"renderLoadingTask",value:function renderLoadingTask(){return b`
      <div class="Task LoadingTask">
        <div class="TaskHeader">
          <div class="TaskCheckCont">
            <div class="TaskCheck"></div>
          </div>
          <div class="TaskTitle"></div>
        </div>
        <div class="TaskDetails">
          <div class="TaskDetail">
            <div class="TaskDetailIcon"></div>
            <div class="TaskDetailName"></div>
          </div>
          <div class="TaskDetail">
            <div class="TaskDetailIcon"></div>
            <div class="TaskDetailName"></div>
          </div>
          <div class="TaskDetail">
            <div class="TaskDetailIcon"></div>
            <div class="TaskDetailName"></div>
          </div>
          <div class="TaskDetail">
            <div class="TaskDetailIcon"></div>
            <div class="TaskDetailName"></div>
          </div>
        </div>
      </div>
    `}},{kind:"method",key:"renderPlannerIcon",value:function renderPlannerIcon(){return b`
      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.223 1.156C6.98 1.26 6.769 1.404 6.586 1.586C6.403 1.768 6.261 1.98 6.157 2.223C6.052 2.465 6 2.724 6 3H2V17H14V3H10C10 2.724 9.948 2.465 9.844 2.223C9.74 1.98 9.596 1.768 9.414 1.586C9.231 1.404 9.02 1.26 8.777 1.156C8.535 1.053 8.276 1 8 1C7.723 1 7.465 1.053 7.223 1.156ZM5 4H7V3C7 2.86 7.026 2.729 7.078 2.609C7.13 2.49 7.202 2.385 7.293 2.293C7.384 2.202 7.49 2.131 7.609 2.079C7.73 2.026 7.859 2 8 2C8.14 2 8.271 2.026 8.39 2.079C8.511 2.131 8.616 2.202 8.707 2.293C8.798 2.385 8.87 2.49 8.922 2.609C8.974 2.729 9 2.86 9 3V4H11V5H5V4ZM12 6V4H13V16H3V4H4V6H12Z"
          fill="#3C3C3C"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.35156 12.3517L5.49956 14.2037L4.14856 12.8517L4.85156 12.1487L5.49956 12.7967L6.64856 11.6487L7.35156 12.3517Z"
          fill="#3C3C3C"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.35156 8.35168L5.49956 10.2037L4.14856 8.85168L4.85156 8.14868L5.49956 8.79668L6.64856 7.64868L7.35156 8.35168Z"
          fill="#3C3C3C"
        />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14H12.001V13H8V14Z" fill="#3C3C3C" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 10H12.001V9H8V10Z" fill="#3C3C3C" />
      </svg>
    `}},{kind:"method",key:"renderBucketIcon",value:function renderBucketIcon(){return b`
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14 2H2V4H3H5H6H10H11H13H14V2ZM10 5H6V6H10V5ZM5 5H3V14H13V5H11V6C11 6.55228 10.5523 7 10 7H6C5.44772 7 5 6.55228 5 6V5ZM1 5H2V14V15H3H13H14V14V5H15V4V2V1H14H2H1V2V4V5Z"
          fill="#3C3C3C"
        />
      </svg>
    `}},{kind:"method",key:"renderCalendarIcon",value:function renderCalendarIcon(){return b`
      <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 7H11V8H12V7ZM9 13H8V14H9V13ZM6 7H5V8H6V7ZM9 7H8V8H9V7ZM12 9H11V10H12V9ZM15 9H14V10H15V9ZM6 9H5V10H6V9ZM9 9H8V10H9V9ZM12 11H11V12H12V11ZM15 11H14V12H15V11ZM6 11H5V12H6V11ZM9 11H8V12H9V11ZM12 13H11V14H12V13ZM15 13H14V14H15V13ZM2 2V16H18V2H15V1H14V2H6V1H5V2H2ZM17 3V5H3V3H5V4H6V3H14V4H15V3H17ZM3 15V6H17V15H3Z"
          fill="#3C3C3C"
        />
      </svg>
    `}},{kind:"method",key:"getTaskSource",value:function getTaskSource(){let t=Providers.globalProvider;return t&&t.state===e.ProviderState.SignedIn?"planner"===this.dataSource?new PlannerTaskSource(t.graph):"todo"===this.dataSource?new TodoTaskSource(t.graph):null:null}},{kind:"method",key:"isAssignedToMe",value:function isAssignedToMe(e){if("todo"===this.dataSource)return!0;return Object.keys(e.assignments).includes(this._me.id)}},{kind:"method",key:"getDateTimeOffset",value:function getDateTimeOffset(e){let t=((new Date).getTimezoneOffset()/60).toString();return t.length<2&&(t="0"+t),e=e.replace("Z",`-${t}:00`)}},{kind:"method",key:"getPlanTitle",value:function getPlanTitle(e){return this.isDefault(e)?this.res.BASE_SELF_ASSIGNED:e===this.res.PLANS_SELF_ASSIGNED?this.res.PLANS_SELF_ASSIGNED:(this._dressers.find(t=>t.id===e)||{title:this.res.PLAN_NOT_FOUND}).title}},{kind:"method",key:"getDrawerName",value:function getDrawerName(e){return this.isDefault(e)?this.res.BUCKETS_SELF_ASSIGNED:(this._drawers.find(t=>t.id===e)||{name:this.res.BUCKET_NOT_FOUND}).name}},{kind:"method",key:"isDefault",value:function isDefault(e){for(let t in Ke)for(let r in Ke[t])if(e===Ke[t][r])return!0;return!1}},{kind:"method",key:"taskPlanFilter",value:function taskPlanFilter(e){return e.topParentId===this._currentTargetDresser||this.isDefault(this._currentTargetDresser)&&this.isAssignedToMe(e)}},{kind:"method",key:"taskSubPlanFilter",value:function taskSubPlanFilter(e){return e.topParentId===this._currentSubTargetDresser||this.isDefault(this._currentSubTargetDresser)}},{kind:"method",key:"taskBucketPlanFilter",value:function taskBucketPlanFilter(e){return e.immediateParentId===this._currentTargetDrawer||this.isDefault(this._currentTargetDrawer)}}]}},MgtBaseComponent);var Je=function(){function CryptoUtils(){}return CryptoUtils.createNewGuid=function(){var e=window.crypto;if(e&&e.getRandomValues){var t=new Uint8Array(16);return e.getRandomValues(t),t[6]|=64,t[6]&=79,t[8]|=128,t[8]&=191,CryptoUtils.decimalToHex(t[0])+CryptoUtils.decimalToHex(t[1])+CryptoUtils.decimalToHex(t[2])+CryptoUtils.decimalToHex(t[3])+"-"+CryptoUtils.decimalToHex(t[4])+CryptoUtils.decimalToHex(t[5])+"-"+CryptoUtils.decimalToHex(t[6])+CryptoUtils.decimalToHex(t[7])+"-"+CryptoUtils.decimalToHex(t[8])+CryptoUtils.decimalToHex(t[9])+"-"+CryptoUtils.decimalToHex(t[10])+CryptoUtils.decimalToHex(t[11])+CryptoUtils.decimalToHex(t[12])+CryptoUtils.decimalToHex(t[13])+CryptoUtils.decimalToHex(t[14])+CryptoUtils.decimalToHex(t[15])}for(var r="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",n="0123456789abcdef",o=0,i="",s=0;s<36;s++)"-"!==r[s]&&"4"!==r[s]&&(o=16*Math.random()|0),"x"===r[s]?i+=n[o]:"y"===r[s]?(o&=3,i+=n[o|=8]):i+=r[s];return i},CryptoUtils.decimalToHex=function(e){for(var t=e.toString(16);t.length<2;)t="0"+t;return t},CryptoUtils.base64Encode=function(e){return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,function toSolidBytes(e,t){return String.fromCharCode(Number("0x"+t))}))},CryptoUtils.base64Decode=function(e){return decodeURIComponent(atob(e).split("").map(function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)}).join(""))},CryptoUtils.deserialize=function(e){var t,r=/\+/g,n=/([^&=]+)=([^&]*)/g,o=function(e){return decodeURIComponent(e.replace(r," "))},i={};for(t=n.exec(e);t;)i[o(t[1])]=o(t[2]),t=n.exec(e);return i},CryptoUtils}(),Xe=function(){function Constants(){}return Object.defineProperty(Constants,"errorDescription",{get:function(){return"error_description"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"error",{get:function(){return"error"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"scope",{get:function(){return"scope"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"clientInfo",{get:function(){return"client_info"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"clientId",{get:function(){return"clientId"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"idToken",{get:function(){return"id_token"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"adalIdToken",{get:function(){return"adal.idtoken"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"accessToken",{get:function(){return"access_token"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"expiresIn",{get:function(){return"expires_in"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"sessionState",{get:function(){return"session_state"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"claims",{get:function(){return"claims"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"msalClientInfo",{get:function(){return"msal.client.info"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"msalError",{get:function(){return"msal.error"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"msalErrorDescription",{get:function(){return"msal.error.description"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"msalSessionState",{get:function(){return"msal.session.state"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"tokenKeys",{get:function(){return"msal.token.keys"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"accessTokenKey",{get:function(){return"msal.access.token.key"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"expirationKey",{get:function(){return"msal.expiration.key"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"stateLogin",{get:function(){return"msal.state.login"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"stateAcquireToken",{get:function(){return"msal.state.acquireToken"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"stateRenew",{get:function(){return"msal.state.renew"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"nonceIdToken",{get:function(){return"msal.nonce.idtoken"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"userName",{get:function(){return"msal.username"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"idTokenKey",{get:function(){return"msal.idtoken"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"loginRequest",{get:function(){return"msal.login.request"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"loginError",{get:function(){return"msal.login.error"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"renewStatus",{get:function(){return"msal.token.renew.status"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"urlHash",{get:function(){return"msal.urlHash"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"angularLoginRequest",{get:function(){return"msal.angular.login.request"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"msal",{get:function(){return"msal"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"no_account",{get:function(){return"NO_ACCOUNT"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"consumersUtid",{get:function(){return"9188040d-6c67-4c5b-b112-36a304b66dad"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"upn",{get:function(){return"upn"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"prompt_select_account",{get:function(){return"&prompt=select_account"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"prompt_none",{get:function(){return"&prompt=none"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"prompt",{get:function(){return"prompt"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"response_mode_fragment",{get:function(){return"&response_mode=fragment"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"resourceDelimiter",{get:function(){return"|"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"tokenRenewStatusCancelled",{get:function(){return"Canceled"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"tokenRenewStatusCompleted",{get:function(){return"Completed"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"tokenRenewStatusInProgress",{get:function(){return"In Progress"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"popUpWidth",{get:function(){return this._popUpWidth},set:function(e){this._popUpWidth=e},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"popUpHeight",{get:function(){return this._popUpHeight},set:function(e){this._popUpHeight=e},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"login",{get:function(){return"LOGIN"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"renewToken",{get:function(){return"RENEW_TOKEN"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"unknown",{get:function(){return"UNKNOWN"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"homeAccountIdentifier",{get:function(){return"homeAccountIdentifier"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"common",{get:function(){return"common"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"openidScope",{get:function(){return"openid"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"profileScope",{get:function(){return"profile"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"cacheLocationLocal",{get:function(){return"localStorage"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"cacheLocationSession",{get:function(){return"sessionStorage"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"interactionTypeRedirect",{get:function(){return"redirectInteraction"},enumerable:!0,configurable:!0}),Object.defineProperty(Constants,"interactionTypePopup",{get:function(){return"popupInteraction"},enumerable:!0,configurable:!0}),Constants._popUpWidth=483,Constants._popUpHeight=600,Constants}(),Ye="msal.authority",et="msal.acquireTokenAccount",tt={"login.windows.net":"login.windows.net","login.chinacloudapi.cn":"login.chinacloudapi.cn","login.cloudgovapi.us":"login.cloudgovapi.us","login.microsoftonline.com":"login.microsoftonline.com","login.microsoftonline.de":"login.microsoftonline.de","login.microsoftonline.us":"login.microsoftonline.us"},rt="sid",nt="login_hint",ot="id_token",it="domain_hint",st="organizations",at="consumers",lt="homeAccountIdentifier",ct="login_req",dt="domain_req",pt=[rt,nt],ut={LOGIN:"login",SELECT_ACCOUNT:"select_account",CONSENT:"consent",NONE:"none"};var ht=function(){function ScopeSet(){}return ScopeSet.isIntersectingScopes=function(e,t){e=this.convertToLowerCase(e);for(var r=0;r<t.length;r++)if(e.indexOf(t[r].toLowerCase())>-1)return!0;return!1},ScopeSet.containsScope=function(e,t){return e=this.convertToLowerCase(e),t.every(function(t){return e.indexOf(t.toString().toLowerCase())>=0})},ScopeSet.convertToLowerCase=function(e){return e.map(function(e){return e.toLowerCase()})},ScopeSet.removeElement=function(e,t){return e.filter(function(e){return e!==t})},ScopeSet.parseScope=function(e){var t="";if(e)for(var r=0;r<e.length;++r)t+=r!==e.length-1?e[r]+" ":e[r];return t},ScopeSet}(),gt=function(){function StringUtils(){}return StringUtils.isEmpty=function(e){return void 0===e||!e||0===e.length},StringUtils}(),mt=function(){function UrlUtils(){}return UrlUtils.createNavigateUrl=function(e){var t=this.createNavigationUrlString(e),r=e.authorityInstance.AuthorizationEndpoint;return r.indexOf("?")<0?r+="?":r+="&",""+r+t.join("&")},UrlUtils.createNavigationUrlString=function(e){var t=e.scopes;-1===t.indexOf(e.clientId)&&t.push(e.clientId);var r=[];return r.push("response_type="+e.responseType),this.translateclientIdUsedInScope(t,e.clientId),r.push("scope="+encodeURIComponent(ht.parseScope(t))),r.push("client_id="+encodeURIComponent(e.clientId)),r.push("redirect_uri="+encodeURIComponent(e.redirectUri)),r.push("state="+encodeURIComponent(e.state)),r.push("nonce="+encodeURIComponent(e.nonce)),r.push("client_info=1"),r.push("x-client-SKU="+e.xClientSku),r.push("x-client-Ver="+e.xClientVer),e.promptValue&&r.push("prompt="+encodeURIComponent(e.promptValue)),e.claimsValue&&r.push("claims="+encodeURIComponent(e.claimsValue)),e.queryParameters&&r.push(e.queryParameters),e.extraQueryParameters&&r.push(e.extraQueryParameters),r.push("client-request-id="+encodeURIComponent(e.correlationId)),r},UrlUtils.translateclientIdUsedInScope=function(e,t){var r=e.indexOf(t);r>=0&&(e.splice(r,1),-1===e.indexOf("openid")&&e.push("openid"),-1===e.indexOf("profile")&&e.push("profile"))},UrlUtils.getDefaultRedirectUri=function(){return window.location.href.split("?")[0].split("#")[0]},UrlUtils.replaceTenantPath=function(e,t){e=e.toLowerCase();var r=this.GetUrlComponents(e),n=r.PathSegments;return!t||0===n.length||n[0]!==Xe.common&&n[0]!==st||(n[0]=t),this.constructAuthorityUriFromObject(r,n)},UrlUtils.constructAuthorityUriFromObject=function(e,t){return this.CanonicalizeUri(e.Protocol+"//"+e.HostNameAndPort+"/"+t.join("/"))},UrlUtils.GetUrlComponents=function(e){if(!e)throw"Url required";var t=RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?"),r=e.match(t);if(!r||r.length<6)throw"Valid url required";var n={Protocol:r[1],HostNameAndPort:r[4],AbsolutePath:r[5]},o=n.AbsolutePath.split("/");return o=o.filter(function(e){return e&&e.length>0}),n.PathSegments=o,n},UrlUtils.CanonicalizeUri=function(e){return e&&(e=e.toLowerCase()),e&&!UrlUtils.endsWith(e,"/")&&(e+="/"),e},UrlUtils.endsWith=function(e,t){return!(!e||!t)&&-1!==e.indexOf(t,e.length-t.length)},UrlUtils.urlRemoveQueryStringParameter=function(e,t){if(gt.isEmpty(e))return e;var r=new RegExp("(\\&"+t+"=)[^&]+");return e=e.replace(r,""),r=new RegExp("("+t+"=)[^&]+&"),e=e.replace(r,""),r=new RegExp("("+t+"=)[^&]+"),e=e.replace(r,"")},UrlUtils.getHashFromUrl=function(e){var t=e.indexOf("#"),r=e.indexOf("#/");return r>-1?e.substring(r+2):t>-1?e.substring(t+1):e},UrlUtils}(),ft=function(){return function AccessTokenKey(e,t,r,n,o){this.authority=mt.CanonicalizeUri(e),this.clientId=t,this.scopes=r,this.homeAccountIdentifier=Je.base64Encode(n)+"."+Je.base64Encode(o)}}(),yt=function(){return function AccessTokenValue(e,t,r,n){this.accessToken=e,this.idToken=t,this.expiresIn=r,this.homeAccountIdentifier=n}}(),vt={code:"unexpected_error",desc:"Unexpected error in authentication."},kt=function(e){function AuthError(t,r){var n=e.call(this,r)||this;return Object.setPrototypeOf(n,AuthError.prototype),n.errorCode=t,n.errorMessage=r,n.name="AuthError",n}return __extends(AuthError,e),AuthError.createUnexpectedError=function(e){return new AuthError(vt.code,vt.desc+": "+e)},AuthError}(Error),wt={code:"multiple_matching_tokens",desc:"The cache contains multiple tokens satisfying the requirements. Call AcquireToken again providing more requirements like authority."},Tt={code:"multiple_authorities",desc:"Multiple authorities found in the cache. Pass authority in the API overload."},Ct={code:"endpoints_resolution_error",desc:"Error: could not resolve endpoints. Please check network and try again."},bt={code:"popup_window_error",desc:"Error opening popup window. This can happen if you are using IE or if popups are blocked in the browser."},_t={code:"token_renewal_error",desc:"Token renewal operation failed due to timeout."},St={code:"invalid_id_token",desc:"Invalid ID token format."},At={code:"invalid_state_error",desc:"Invalid state."},Pt={code:"nonce_mismatch_error",desc:"Nonce is not matching, Nonce received: "},Et={code:"login_progress_error",desc:"Login_In_Progress: Error during login call - login is already in progress."},It={code:"acquiretoken_progress_error",desc:"AcquireToken_In_Progress: Error during login call - login is already in progress."},xt={code:"user_cancelled",desc:"User cancelled the flow."},Dt={code:"callback_error",desc:"Error occurred in token received callback function."},Rt={code:"user_login_error",desc:"User login is required."},Ot={code:"user_non_existent",desc:"User object does not exist. Please call a login API."},Lt={code:"client_info_decoding_error",desc:"The client info could not be parsed/decoded correctly. Please review the trace to determine the root cause."},Mt={code:"client_info_not_populated_error",desc:"The service did not populate client_info in the response, Please verify with the service team"},Ut={code:"null_or_empty_id_token",desc:"The idToken is null or empty. Please review the trace to determine the root cause."},Nt={code:"id_token_parsing_error",desc:"ID token cannot be parsed. Please review stack trace to determine root cause."},Ht={code:"token_encoding_error",desc:"The token to be decoded is not encoded correctly."},qt={code:"invalid_interaction_type",desc:"The interaction type passed to the handler was incorrect or unknown"},$t=function(e){function ClientAuthError(t,r){var n=e.call(this,t,r)||this;return n.name="ClientAuthError",Object.setPrototypeOf(n,ClientAuthError.prototype),n}return __extends(ClientAuthError,e),ClientAuthError.createEndpointResolutionError=function(e){var t=Ct.desc;return e&&!gt.isEmpty(e)&&(t+=" Details: "+e),new ClientAuthError(Ct.code,t)},ClientAuthError.createMultipleMatchingTokensInCacheError=function(e){return new ClientAuthError(wt.code,"Cache error for scope "+e+": "+wt.desc+".")},ClientAuthError.createMultipleAuthoritiesInCacheError=function(e){return new ClientAuthError(Tt.code,"Cache error for scope "+e+": "+Tt.desc+".")},ClientAuthError.createPopupWindowError=function(e){var t=bt.desc;return e&&!gt.isEmpty(e)&&(t+=" Details: "+e),new ClientAuthError(bt.code,t)},ClientAuthError.createTokenRenewalTimeoutError=function(){return new ClientAuthError(_t.code,_t.desc)},ClientAuthError.createInvalidIdTokenError=function(e){return new ClientAuthError(St.code,St.desc+" Given token: "+e)},ClientAuthError.createInvalidStateError=function(e,t){return new ClientAuthError(At.code,At.desc+" "+e+", state expected : "+t+".")},ClientAuthError.createNonceMismatchError=function(e,t){return new ClientAuthError(Pt.code,Pt.desc+" "+e+", nonce expected : "+t+".")},ClientAuthError.createLoginInProgressError=function(){return new ClientAuthError(Et.code,Et.desc)},ClientAuthError.createAcquireTokenInProgressError=function(){return new ClientAuthError(It.code,It.desc)},ClientAuthError.createUserCancelledError=function(){return new ClientAuthError(xt.code,xt.desc)},ClientAuthError.createErrorInCallbackFunction=function(e){return new ClientAuthError(Dt.code,Dt.desc+" "+e+".")},ClientAuthError.createUserLoginRequiredError=function(){return new ClientAuthError(Rt.code,Rt.desc)},ClientAuthError.createUserDoesNotExistError=function(){return new ClientAuthError(Ot.code,Ot.desc)},ClientAuthError.createClientInfoDecodingError=function(e){return new ClientAuthError(Lt.code,Lt.desc+" Failed with error: "+e)},ClientAuthError.createClientInfoNotPopulatedError=function(e){return new ClientAuthError(Mt.code,Mt.desc+" Failed with error: "+e)},ClientAuthError.createIdTokenNullOrEmptyError=function(e){return new ClientAuthError(Ut.code,Ut.desc+" Raw ID Token Value: "+e)},ClientAuthError.createIdTokenParsingError=function(e){return new ClientAuthError(Nt.code,Nt.desc+" Failed with error: "+e)},ClientAuthError.createTokenEncodingError=function(e){return new ClientAuthError(Ht.code,Ht.desc+" Attempted to decode: "+e)},ClientAuthError.createInvalidInteractionTypeError=function(){return new ClientAuthError(qt.code,qt.desc)},ClientAuthError}(kt),Ft={configurationNotSet:{code:"no_config_set",desc:"Configuration has not been set. Please call the UserAgentApplication constructor with a valid Configuration object."},invalidCacheLocation:{code:"invalid_cache_location",desc:"The cache location provided is not valid."},noStorageSupported:{code:"browser_storage_not_supported",desc:"localStorage and sessionStorage are not supported."},noRedirectCallbacksSet:{code:"no_redirect_callbacks",desc:"No redirect callbacks have been set. Please call setRedirectCallbacks() with the appropriate function arguments before continuing. More information is available here: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics."},invalidCallbackObject:{code:"invalid_callback_object",desc:"The object passed for the callback was invalid. More information is available here: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics."},scopesRequired:{code:"scopes_required",desc:"Scopes are required to obtain an access token."},emptyScopes:{code:"empty_input_scopes_error",desc:"Scopes cannot be passed as empty array."},nonArrayScopes:{code:"nonarray_input_scopes_error",desc:"Scopes cannot be passed as non-array."},clientScope:{code:"clientid_input_scopes_error",desc:"Client ID can only be provided as a single scope."},invalidPrompt:{code:"invalid_prompt_value",desc:"Supported prompt values are 'login', 'select_account', 'consent' and 'none'"},invalidAuthorityType:{code:"invalid_authority_type",desc:"The given authority is not a valid type of authority supported by MSAL. Please see here for valid authorities: <insert URL here>."},authorityUriInsecure:{code:"authority_uri_insecure",desc:"Authority URIs must use https."},authorityUriInvalidPath:{code:"authority_uri_invalid_path",desc:"Given authority URI is invalid."},unsupportedAuthorityValidation:{code:"unsupported_authority_validation",desc:"The authority validation is not supported for this authority type."},b2cAuthorityUriInvalidPath:{code:"b2c_authority_uri_invalid_path",desc:"The given URI for the B2C authority is invalid."},claimsRequestParsingError:{code:"claims_request_parsing_error",desc:"Could not parse the given claims request object."},emptyRequestError:{code:"empty_request_error",desc:"Request object is required."},telemetryConfigError:{code:"telemetry_config_error",desc:"Telemetry config is not configured with required values"}},jt=function(e){function ClientConfigurationError(t,r){var n=e.call(this,t,r)||this;return n.name="ClientConfigurationError",Object.setPrototypeOf(n,ClientConfigurationError.prototype),n}return __extends(ClientConfigurationError,e),ClientConfigurationError.createNoSetConfigurationError=function(){return new ClientConfigurationError(Ft.configurationNotSet.code,""+Ft.configurationNotSet.desc)},ClientConfigurationError.createInvalidCacheLocationConfigError=function(e){return new ClientConfigurationError(Ft.invalidCacheLocation.code,Ft.invalidCacheLocation.desc+" Provided value: "+e+". Possible values are: "+Xe.cacheLocationLocal+", "+Xe.cacheLocationSession+".")},ClientConfigurationError.createNoStorageSupportedError=function(){return new ClientConfigurationError(Ft.noStorageSupported.code,Ft.noStorageSupported.desc)},ClientConfigurationError.createRedirectCallbacksNotSetError=function(){return new ClientConfigurationError(Ft.noRedirectCallbacksSet.code,Ft.noRedirectCallbacksSet.desc)},ClientConfigurationError.createInvalidCallbackObjectError=function(e){return new ClientConfigurationError(Ft.invalidCallbackObject.code,Ft.invalidCallbackObject.desc+" Given value for callback function: "+e)},ClientConfigurationError.createEmptyScopesArrayError=function(e){return new ClientConfigurationError(Ft.emptyScopes.code,Ft.emptyScopes.desc+" Given value: "+e+".")},ClientConfigurationError.createScopesNonArrayError=function(e){return new ClientConfigurationError(Ft.nonArrayScopes.code,Ft.nonArrayScopes.desc+" Given value: "+e+".")},ClientConfigurationError.createClientIdSingleScopeError=function(e){return new ClientConfigurationError(Ft.clientScope.code,Ft.clientScope.desc+" Given value: "+e+".")},ClientConfigurationError.createScopesRequiredError=function(e){return new ClientConfigurationError(Ft.scopesRequired.code,Ft.scopesRequired.desc+" Given value: "+e)},ClientConfigurationError.createInvalidPromptError=function(e){return new ClientConfigurationError(Ft.invalidPrompt.code,Ft.invalidPrompt.desc+" Given value: "+e)},ClientConfigurationError.createClaimsRequestParsingError=function(e){return new ClientConfigurationError(Ft.claimsRequestParsingError.code,Ft.claimsRequestParsingError.desc+" Given value: "+e)},ClientConfigurationError.createEmptyRequestError=function(){var e=Ft.emptyRequestError;return new ClientConfigurationError(e.code,e.desc)},ClientConfigurationError.createTelemetryConfigError=function(e){var t=Ft.telemetryConfigError,r=t.code,n=t.desc,o={applicationName:"string",applicationVersion:"string",telemetryEmitter:"function"};return new ClientConfigurationError(r,n+" mising values: "+Object.keys(o).reduce(function(t,r){return e[r]?t:t.concat([r+" ("+o[r]+")"])},[]).join(","))},ClientConfigurationError}($t);var Bt,Vt=function(){function ServerRequestParameters(e,t,r,n,o,i){this.authorityInstance=e,this.clientId=t,this.scopes=r?r.slice():[t],this.nonce=Je.createNewGuid(),this.state=i&&!gt.isEmpty(i)?Je.createNewGuid()+"|"+i:Je.createNewGuid(),this.correlationId=Je.createNewGuid(),this.xClientSku="MSAL.JS",this.xClientVer="1.1.3",this.responseType=n,this.redirectUri=o}return Object.defineProperty(ServerRequestParameters.prototype,"authority",{get:function(){return this.authorityInstance?this.authorityInstance.CanonicalAuthority:null},enumerable:!0,configurable:!0}),ServerRequestParameters.prototype.populateQueryParams=function(e,t,r){var n,o={};t&&(t.prompt&&(this.validatePromptParameter(t.prompt),this.promptValue=t.prompt),t.claimsRequest&&(!function validateClaimsRequest(e){if(e.claimsRequest)try{JSON.parse(e.claimsRequest)}catch(e){throw jt.createClaimsRequestParsingError(e)}}(t),this.claimsValue=t.claimsRequest),ServerRequestParameters.isSSOParam(t)&&(o=this.constructUnifiedCacheQueryParameter(t,null))),r&&(o=this.constructUnifiedCacheQueryParameter(null,r)),o=this.addHintParameters(e,o),t&&(n=this.sanitizeEQParams(t)),this.queryParameters=ServerRequestParameters.generateQueryParametersString(o),this.extraQueryParameters=ServerRequestParameters.generateQueryParametersString(n)},ServerRequestParameters.prototype.validatePromptParameter=function(e){if(!([ut.LOGIN,ut.SELECT_ACCOUNT,ut.CONSENT,ut.NONE].indexOf(e)>=0))throw jt.createInvalidPromptError(e)},ServerRequestParameters.prototype.constructUnifiedCacheQueryParameter=function(e,t){var r,n,o={};if(e)if(e.account){var i=e.account;i.sid?(r=rt,n=i.sid):i.userName&&(r=nt,n=i.userName)}else e.sid?(r=rt,n=e.sid):e.loginHint&&(r=nt,n=e.loginHint);else t&&(t.hasOwnProperty(Xe.upn)?(r=ot,n=t.upn):(r=st,n=null));return o=this.addSSOParameter(r,n),e&&e.account&&e.account.homeAccountIdentifier&&(o=this.addSSOParameter(lt,e.account.homeAccountIdentifier,o)),o},ServerRequestParameters.prototype.addHintParameters=function(e,t){if(e&&!t[rt]){if(!t[nt]&&e.sid&&this.promptValue===ut.NONE)t=this.addSSOParameter(rt,e.sid,t);else!t[nt]&&e.userName&&!gt.isEmpty(e.userName)&&(t=this.addSSOParameter(nt,e.userName,t));!t[dt]&&!t[ct]&&(t=this.addSSOParameter(lt,e.homeAccountIdentifier,t))}return t},ServerRequestParameters.prototype.addSSOParameter=function(e,t,r){if(r||(r={}),!t)return r;switch(e){case rt:r[rt]=t;break;case ot:r[nt]=t,r[it]=st;break;case nt:r[nt]=t;break;case st:r[it]=st;break;case at:r[it]=at;break;case lt:var n=t.split("."),o=Je.base64Decode(n[0]),i=Je.base64Decode(n[1]);r[ct]=o,r[dt]=i,i===Xe.consumersUtid?r[it]=at:r[it]=st;break;case ct:r[ct]=t;break;case dt:r[dt]=t}return r},ServerRequestParameters.prototype.sanitizeEQParams=function(e){var t=e.extraQueryParameters;return t?(e.claimsRequest&&delete t[Xe.claims],pt.forEach(function(e){t[e]&&delete t[e]}),t):null},ServerRequestParameters.generateQueryParametersString=function(e){var t=null;return e&&Object.keys(e).forEach(function(r){null==t?t=r+"="+encodeURIComponent(e[r]):t+="&"+r+"="+encodeURIComponent(e[r])}),t},ServerRequestParameters.isSSOParam=function(e){return e&&(e.account||e.sid||e.loginHint)},ServerRequestParameters}(),zt=function(){function ClientInfo(e){if(!e||gt.isEmpty(e))return this.uid="",void(this.utid="");try{var t=Je.base64Decode(e),r=JSON.parse(t);r&&(r.hasOwnProperty("uid")&&(this.uid=r.uid),r.hasOwnProperty("utid")&&(this.utid=r.utid))}catch(e){throw $t.createClientInfoDecodingError(e)}}return Object.defineProperty(ClientInfo.prototype,"uid",{get:function(){return this._uid?this._uid:""},set:function(e){this._uid=e},enumerable:!0,configurable:!0}),Object.defineProperty(ClientInfo.prototype,"utid",{get:function(){return this._utid?this._utid:""},set:function(e){this._utid=e},enumerable:!0,configurable:!0}),ClientInfo}(),Gt=function(){function TokenUtils(){}return TokenUtils.decodeJwt=function(e){if(gt.isEmpty(e))return null;var t=/^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/.exec(e);return!t||t.length<4?null:{header:t[1],JWSPayload:t[2],JWSSig:t[3]}},TokenUtils.extractIdToken=function(e){var t=this.decodeJwt(e);if(!t)return null;try{var r=t.JWSPayload,n=Je.base64Decode(r);return n?JSON.parse(n):null}catch(e){}return null},TokenUtils}(),Wt=function(){return function IdToken(e){if(gt.isEmpty(e))throw $t.createIdTokenNullOrEmptyError(e);try{this.rawIdToken=e,this.claims=Gt.extractIdToken(e),this.claims&&(this.claims.hasOwnProperty("iss")&&(this.issuer=this.claims.iss),this.claims.hasOwnProperty("oid")&&(this.objectId=this.claims.oid),this.claims.hasOwnProperty("sub")&&(this.subject=this.claims.sub),this.claims.hasOwnProperty("tid")&&(this.tenantId=this.claims.tid),this.claims.hasOwnProperty("ver")&&(this.version=this.claims.ver),this.claims.hasOwnProperty("preferred_username")&&(this.preferredName=this.claims.preferred_username),this.claims.hasOwnProperty("name")&&(this.name=this.claims.name),this.claims.hasOwnProperty("nonce")&&(this.nonce=this.claims.nonce),this.claims.hasOwnProperty("exp")&&(this.expiration=this.claims.exp),this.claims.hasOwnProperty("home_oid")&&(this.homeObjectId=this.claims.home_oid),this.claims.hasOwnProperty("sid")&&(this.sid=this.claims.sid))}catch(e){throw $t.createIdTokenParsingError(e)}}}(),Zt=function(){return function AccessTokenCacheItem(e,t){this.key=e,this.value=t}}(),Kt=function(){function Storage(e){if(Storage.instance)return Storage.instance;if(this.cacheLocation=e,this.localStorageSupported=void 0!==window[this.cacheLocation]&&null!=window[this.cacheLocation],this.sessionStorageSupported=void 0!==window[e]&&null!=window[e],Storage.instance=this,!this.localStorageSupported&&!this.sessionStorageSupported)throw jt.createNoStorageSupportedError();return Storage.instance}return Storage.prototype.setItem=function(e,t,r){window[this.cacheLocation]&&window[this.cacheLocation].setItem(e,t),r&&this.setItemCookie(e,t)},Storage.prototype.getItem=function(e,t){return t&&this.getItemCookie(e)?this.getItemCookie(e):window[this.cacheLocation]?window[this.cacheLocation].getItem(e):null},Storage.prototype.removeItem=function(e){if(window[this.cacheLocation])return window[this.cacheLocation].removeItem(e)},Storage.prototype.clear=function(){if(window[this.cacheLocation])return window[this.cacheLocation].clear()},Storage.prototype.getAllAccessTokens=function(e,t){var r,n=[],o=window[this.cacheLocation];if(o){var i=void 0;for(i in o)if(o.hasOwnProperty(i)&&i.match(e)&&i.match(t)){var s=this.getItem(i);s&&(r=new Zt(JSON.parse(i),JSON.parse(s)),n.push(r))}}return n},Storage.prototype.removeAcquireTokenEntries=function(e){var t=window[this.cacheLocation];if(t){var r=void 0;for(r in t)if(t.hasOwnProperty(r)&&!(-1===r.indexOf(Ye)&&1===r.indexOf(et)||e&&-1===r.indexOf(e))){var n=r.split(Xe.resourceDelimiter),o=void 0;n.length>1&&(o=n[1]),o&&!this.tokenRenewalInProgress(o)&&(this.removeItem(r),this.removeItem(Xe.renewStatus+o),this.removeItem(Xe.stateLogin),this.removeItem(Xe.stateAcquireToken),this.setItemCookie(r,"",-1))}}this.clearCookie()},Storage.prototype.tokenRenewalInProgress=function(e){var t=window[this.cacheLocation][Xe.renewStatus+e];return!(!t||t!==Xe.tokenRenewStatusInProgress)},Storage.prototype.resetCacheItems=function(){var e=window[this.cacheLocation];if(e){var t=void 0;for(t in e)e.hasOwnProperty(t)&&-1!==t.indexOf(Xe.msal)&&this.removeItem(t);this.removeAcquireTokenEntries()}},Storage.prototype.setItemCookie=function(e,t,r){var n=e+"="+t+";";r&&(n+="expires="+this.getCookieExpirationTime(r)+";");document.cookie=n},Storage.prototype.getItemCookie=function(e){for(var t=e+"=",r=document.cookie.split(";"),n=0;n<r.length;n++){for(var o=r[n];" "===o.charAt(0);)o=o.substring(1);if(0===o.indexOf(t))return o.substring(t.length,o.length)}return""},Storage.prototype.getCookieExpirationTime=function(e){var t=new Date;return new Date(t.getTime()+24*e*60*60*1e3).toUTCString()},Storage.prototype.clearCookie=function(){this.setItemCookie(Xe.nonceIdToken,"",-1),this.setItemCookie(Xe.stateLogin,"",-1),this.setItemCookie(Xe.loginRequest,"",-1),this.setItemCookie(Xe.stateAcquireToken,"",-1)},Storage.generateAcquireTokenAccountKey=function(e,t){return et+Xe.resourceDelimiter+""+e+Xe.resourceDelimiter+t},Storage.generateAuthorityKey=function(e){return Ye+Xe.resourceDelimiter+""+e},Storage}(),Qt=function(){function Account(e,t,r,n,o,i,s){this.accountIdentifier=e,this.homeAccountIdentifier=t,this.userName=r,this.name=n,this.idToken=o,this.idTokenClaims=o,this.sid=i,this.environment=s}return Account.createAccount=function(e,t){var r,n=e.objectId||e.subject,o=t?t.uid:"",i=t?t.utid:"";return gt.isEmpty(o)||gt.isEmpty(i)||(r=Je.base64Encode(o)+"."+Je.base64Encode(i)),new Account(n,r,e.preferredName,e.name,e.claims,e.sid,e.issuer)},Account.compareAccounts=function(e,t){return!(!e||!t)&&!(!e.homeAccountIdentifier||!t.homeAccountIdentifier||e.homeAccountIdentifier!==t.homeAccountIdentifier)},Account}(),Jt=function(){function TimeUtils(){}return TimeUtils.parseExpiresIn=function(e){return e||(e="3599"),parseInt(e,10)},TimeUtils.now=function(){return Math.round((new Date).getTime()/1e3)},TimeUtils}(),Xt=function(){function ResponseUtils(){}return ResponseUtils.setResponseIdToken=function(e,t){if(!e)return null;if(!t)return e;var r=Number(t.expiration);return r&&!e.expiresOn&&(e.expiresOn=new Date(1e3*r)),re({},e,{idToken:t,idTokenClaims:t.claims,uniqueId:t.objectId||t.subject,tenantId:t.tenantId})},ResponseUtils}(),Yt=function(){function XhrClient(){}return XhrClient.prototype.sendRequestAsync=function(e,t,r){var n=this;return new Promise(function(r,o){var i=new XMLHttpRequest;if(i.open(t,e,!0),i.onload=function(e){(i.status<200||i.status>=300)&&o(n.handleError(i.responseText));try{var t=JSON.parse(i.responseText)}catch(e){o(n.handleError(i.responseText))}r(t)},i.onerror=function(e){o(i.status)},"GET"!==t)throw"not implemented";i.send()})},XhrClient.prototype.handleError=function(e){var t;try{if((t=JSON.parse(e)).error)return t.error;throw e}catch(t){return e}},XhrClient}();!function(e){e[e.Aad=0]="Aad",e[e.Adfs=1]="Adfs",e[e.B2C=2]="B2C"}(Bt||(Bt={}));var er,tr=function(e){function AadAuthority(t,r){return e.call(this,t,r)||this}return __extends(AadAuthority,e),Object.defineProperty(AadAuthority.prototype,"AadInstanceDiscoveryEndpointUrl",{get:function(){return AadAuthority.AadInstanceDiscoveryEndpoint+"?api-version=1.0&authorization_endpoint="+this.CanonicalAuthority+"oauth2/v2.0/authorize"},enumerable:!0,configurable:!0}),Object.defineProperty(AadAuthority.prototype,"AuthorityType",{get:function(){return Bt.Aad},enumerable:!0,configurable:!0}),AadAuthority.prototype.GetOpenIdConfigurationEndpointAsync=function(){var e=this,t=new Promise(function(t,r){return t(e.DefaultOpenIdConfigurationEndpoint)});if(!this.IsValidationEnabled)return t;var r=this.CanonicalAuthorityUrlComponents.HostNameAndPort;return this.IsInTrustedHostList(r)?t:(new Yt).sendRequestAsync(this.AadInstanceDiscoveryEndpointUrl,"GET",!0).then(function(e){return e.tenant_discovery_endpoint})},AadAuthority.prototype.IsInTrustedHostList=function(e){return tt[e.toLowerCase()]},AadAuthority.AadInstanceDiscoveryEndpoint="https://login.microsoftonline.com/common/discovery/instance",AadAuthority}(function(){function Authority(e,t){this.IsValidationEnabled=t,this.CanonicalAuthority=e,this.validateAsUri()}return Object.defineProperty(Authority.prototype,"Tenant",{get:function(){return this.CanonicalAuthorityUrlComponents.PathSegments[0]},enumerable:!0,configurable:!0}),Object.defineProperty(Authority.prototype,"AuthorizationEndpoint",{get:function(){return this.validateResolved(),this.tenantDiscoveryResponse.AuthorizationEndpoint.replace("{tenant}",this.Tenant)},enumerable:!0,configurable:!0}),Object.defineProperty(Authority.prototype,"EndSessionEndpoint",{get:function(){return this.validateResolved(),this.tenantDiscoveryResponse.EndSessionEndpoint.replace("{tenant}",this.Tenant)},enumerable:!0,configurable:!0}),Object.defineProperty(Authority.prototype,"SelfSignedJwtAudience",{get:function(){return this.validateResolved(),this.tenantDiscoveryResponse.Issuer.replace("{tenant}",this.Tenant)},enumerable:!0,configurable:!0}),Authority.prototype.validateResolved=function(){if(!this.tenantDiscoveryResponse)throw"Please call ResolveEndpointsAsync first"},Object.defineProperty(Authority.prototype,"CanonicalAuthority",{get:function(){return this.canonicalAuthority},set:function(e){this.canonicalAuthority=mt.CanonicalizeUri(e),this.canonicalAuthorityUrlComponents=null},enumerable:!0,configurable:!0}),Object.defineProperty(Authority.prototype,"CanonicalAuthorityUrlComponents",{get:function(){return this.canonicalAuthorityUrlComponents||(this.canonicalAuthorityUrlComponents=mt.GetUrlComponents(this.CanonicalAuthority)),this.canonicalAuthorityUrlComponents},enumerable:!0,configurable:!0}),Object.defineProperty(Authority.prototype,"DefaultOpenIdConfigurationEndpoint",{get:function(){return this.CanonicalAuthority+"v2.0/.well-known/openid-configuration"},enumerable:!0,configurable:!0}),Authority.prototype.validateAsUri=function(){var e;try{e=this.CanonicalAuthorityUrlComponents}catch(e){throw Ft.invalidAuthorityType}if(!e.Protocol||"https:"!==e.Protocol.toLowerCase())throw Ft.authorityUriInsecure;if(!e.PathSegments||e.PathSegments.length<1)throw Ft.authorityUriInvalidPath},Authority.prototype.DiscoverEndpoints=function(e){return(new Yt).sendRequestAsync(e,"GET",!0).then(function(e){return{AuthorizationEndpoint:e.authorization_endpoint,EndSessionEndpoint:e.end_session_endpoint,Issuer:e.issuer}})},Authority.prototype.resolveEndpointsAsync=function(){var e=this,t="";return this.GetOpenIdConfigurationEndpointAsync().then(function(r){return t=r,e.DiscoverEndpoints(t)}).then(function(t){return e.tenantDiscoveryResponse=t,e})},Authority}()),rr=function(e){function B2cAuthority(t,r){var n=e.call(this,t,r)||this,o=mt.GetUrlComponents(t),i=o.PathSegments;if(i.length<3)throw Ft.b2cAuthorityUriInvalidPath;return n.CanonicalAuthority="https://"+o.HostNameAndPort+"/"+i[0]+"/"+i[1]+"/"+i[2]+"/",n}return __extends(B2cAuthority,e),Object.defineProperty(B2cAuthority.prototype,"AuthorityType",{get:function(){return Bt.B2C},enumerable:!0,configurable:!0}),B2cAuthority.prototype.GetOpenIdConfigurationEndpointAsync=function(){var e=this,t=new Promise(function(t,r){return t(e.DefaultOpenIdConfigurationEndpoint)});return this.IsValidationEnabled?this.IsInTrustedHostList(this.CanonicalAuthorityUrlComponents.HostNameAndPort)?t:new Promise(function(e,t){return t(Ft.unsupportedAuthorityValidation)}):t},B2cAuthority.B2C_PREFIX="tfp",B2cAuthority}(tr),nr=function(){function AuthorityFactory(){}return AuthorityFactory.DetectAuthorityFromUrl=function(e){switch(e=mt.CanonicalizeUri(e),mt.GetUrlComponents(e).PathSegments[0]){case"tfp":return Bt.B2C;case"adfs":return Bt.Adfs;default:return Bt.Aad}},AuthorityFactory.CreateInstance=function(e,t){if(gt.isEmpty(e))return null;switch(AuthorityFactory.DetectAuthorityFromUrl(e)){case Bt.B2C:return new rr(e,t);case Bt.Aad:return new tr(e,t);default:throw Ft.invalidAuthorityType}},AuthorityFactory}();!function(e){e[e.Error=0]="Error",e[e.Warning=1]="Warning",e[e.Info=2]="Info",e[e.Verbose=3]="Verbose"}(er||(er={}));var or=function(){function Logger(e,t){void 0===t&&(t={}),this.level=er.Info;var r=t.correlationId,n=void 0===r?"":r,o=t.level,i=void 0===o?er.Info:o,s=t.piiLoggingEnabled,a=void 0!==s&&s;this.localCallback=e,this.correlationId=n,this.level=i,this.piiLoggingEnabled=a}return Logger.prototype.logMessage=function(e,t,r){if(!(e>this.level||!this.piiLoggingEnabled&&r)){var n,o=(new Date).toUTCString();n=gt.isEmpty(this.correlationId)?o+":1.1.3-"+er[e]+" "+t:o+":"+this.correlationId+"-1.1.3-"+er[e]+" "+t,this.executeCallback(e,n,r)}},Logger.prototype.executeCallback=function(e,t,r){this.localCallback&&this.localCallback(e,t,r)},Logger.prototype.error=function(e){this.logMessage(er.Error,e,!1)},Logger.prototype.errorPii=function(e){this.logMessage(er.Error,e,!0)},Logger.prototype.warning=function(e){this.logMessage(er.Warning,e,!1)},Logger.prototype.warningPii=function(e){this.logMessage(er.Warning,e,!0)},Logger.prototype.info=function(e){this.logMessage(er.Info,e,!1)},Logger.prototype.infoPii=function(e){this.logMessage(er.Info,e,!0)},Logger.prototype.verbose=function(e){this.logMessage(er.Verbose,e,!1)},Logger.prototype.verbosePii=function(e){this.logMessage(er.Verbose,e,!0)},Logger.prototype.isPiiLoggingEnabled=function(){return this.piiLoggingEnabled},Logger}(),ir={clientId:"",authority:null,validateAuthority:!0,redirectUri:function(){return mt.getDefaultRedirectUri()},postLogoutRedirectUri:function(){return mt.getDefaultRedirectUri()},navigateToLoginRequestUrl:!0},sr={cacheLocation:"sessionStorage",storeAuthStateInCookie:!1},ar={logger:new or(null),loadFrameTimeout:6e3,tokenRenewalOffsetSeconds:300,navigateFrameWait:500},lr={isAngular:!1,unprotectedResources:new Array,protectedResourceMap:new Map};var cr={code:"server_unavailable",desc:"Server is temporarily unavailable."},dr={code:"unknown_server_error"},pr=function(e){function ServerError(t,r){var n=e.call(this,t,r)||this;return n.name="ServerError",Object.setPrototypeOf(n,ServerError.prototype),n}return __extends(ServerError,e),ServerError.createServerUnavailableError=function(){return new ServerError(cr.code,cr.desc)},ServerError.createUnknownServerError=function(e){return new ServerError(dr.code,e)},ServerError}(kt),ur={code:"interaction_required"},hr={code:"consent_required"},gr={code:"login_required"},mr=function(e){function InteractionRequiredAuthError(t,r){var n=e.call(this,t,r)||this;return n.name="InteractionRequiredAuthError",Object.setPrototypeOf(n,InteractionRequiredAuthError.prototype),n}return __extends(InteractionRequiredAuthError,e),InteractionRequiredAuthError.isInteractionRequiredError=function(e){var t=[ur.code,hr.code,gr.code];return e&&t.indexOf(e)>-1},InteractionRequiredAuthError.createLoginRequiredAuthError=function(e){return new InteractionRequiredAuthError(gr.code,e)},InteractionRequiredAuthError.createInteractionRequiredAuthError=function(e){return new InteractionRequiredAuthError(ur.code,e)},InteractionRequiredAuthError.createConsentRequiredAuthError=function(e){return new InteractionRequiredAuthError(hr.code,e)},InteractionRequiredAuthError}(pr);function buildResponseStateOnly(e){return{uniqueId:"",tenantId:"",tokenType:"",idToken:null,idTokenClaims:null,accessToken:"",scopes:null,expiresOn:null,account:null,accountState:e}}var fr="event_name",yr="start_time",vr="elapsed_time",kr={MsalCorrelationIdConstStrKey:"Microsoft.MSAL.correlation_id",ApiTelemIdConstStrKey:"msal.api_telem_id",ApiIdConstStrKey:"msal.api_id",BrokerAppConstStrKey:"Microsoft_MSAL_broker_app",CacheEventCountConstStrKey:"Microsoft_MSAL_cache_event_count",HttpEventCountTelemetryBatchKey:"Microsoft_MSAL_http_event_count",IdpConstStrKey:"Microsoft_MSAL_idp",IsSilentTelemetryBatchKey:"",IsSuccessfulConstStrKey:"Microsoft_MSAL_is_successful",ResponseTimeConstStrKey:"Microsoft_MSAL_response_time",TenantIdConstStrKey:"Microsoft_MSAL_tenant_id",UiEventCountTelemetryBatchKey:"Microsoft_MSAL_ui_event_count"},wr=function(e){return"msal."+(e||"")},Tr=function(e){function DefaultEvent(t,r,n,o){var i=e.call(this,wr("default_event"),r)||this;return i.event[wr("client_id")]=n,i.event[wr("sdk_plaform")]=t.sdk,i.event[wr("sdk_version")]=t.sdkVersion,i.event[wr("application_name")]=t.applicationName,i.event[wr("application_version")]=t.applicationVersion,i.event[""+kr.UiEventCountTelemetryBatchKey]=i.getEventCount(wr("ui_event"),o),i.event[""+kr.HttpEventCountTelemetryBatchKey]=i.getEventCount(wr("http_event"),o),i.event[""+kr.CacheEventCountConstStrKey]=i.getEventCount(wr("cache_event"),o),i}return __extends(DefaultEvent,e),DefaultEvent.prototype.getEventCount=function(e,t){return t[e]?t[e]:0},DefaultEvent}(function(){function TelemetryEvent(e,t){var r;this.startTimestamp=Date.now(),this.eventId=Je.createNewGuid(),this.event=((r={})[wr(fr)]=e,r[wr(yr)]=this.startTimestamp,r[wr(vr)]=-1,r[""+kr.MsalCorrelationIdConstStrKey]=t,r)}return TelemetryEvent.prototype.setElapsedTime=function(e){this.event[wr(vr)]=e},TelemetryEvent.prototype.stop=function(){this.setElapsedTime(+Date.now()-+this.startTimestamp)},Object.defineProperty(TelemetryEvent.prototype,"telemetryCorrelationId",{get:function(){return this.event[""+kr.MsalCorrelationIdConstStrKey]},set:function(e){this.event[""+kr.MsalCorrelationIdConstStrKey]=e},enumerable:!0,configurable:!0}),Object.defineProperty(TelemetryEvent.prototype,"eventName",{get:function(){return this.event[wr(fr)]},enumerable:!0,configurable:!0}),TelemetryEvent.prototype.get=function(){return re({},this.event,{eventId:this.eventId})},TelemetryEvent}()),Cr=function(e){return e.telemetryCorrelationId+"-"+e.eventId+"-"+e.eventName},br=function(){function TelemetryManager(e,t){this.completedEvents={},this.inProgressEvents={},this.eventCountByCorrelationId={},this.onlySendFailureTelemetry=!1,this.telemetryPlatform=e.platform,this.clientId=e.clientId,this.onlySendFailureTelemetry=e.onlySendFailureTelemetry,this.telemetryEmitter=t}return TelemetryManager.prototype.startEvent=function(e){if(this.telemetryEmitter){var t=Cr(e);this.inProgressEvents[t]=e}},TelemetryManager.prototype.stopEvent=function(e){var t=Cr(e);if(this.telemetryEmitter&&this.inProgressEvents[t]){e.stop(),this.incrementEventCount(e);var r=this.completedEvents[e.telemetryCorrelationId];this.completedEvents[e.telemetryCorrelationId]=(r||[]).concat([e]),delete this.inProgressEvents[t]}},TelemetryManager.prototype.flush=function(e){var t=this;if(this.telemetryEmitter&&this.completedEvents[e]){var r=this.getOrphanedEvents(e);r.forEach(function(e){return t.incrementEventCount(e)});var n=this.completedEvents[e].concat(r);delete this.completedEvents[e];var o=this.eventCountByCorrelationId[e];if(delete this.eventCountByCorrelationId[e],n&&n.length){var i=new Tr(this.telemetryPlatform,e,this.clientId,o),s=n.concat([i]);this.telemetryEmitter(s.map(function(e){return e.get()}))}}},TelemetryManager.prototype.incrementEventCount=function(e){var t,r=e.eventName,n=this.eventCountByCorrelationId[e.telemetryCorrelationId];n?n[r]=n[r]?n[r]+1:1:this.eventCountByCorrelationId[e.telemetryCorrelationId]=((t={})[r]=1,t)},TelemetryManager.prototype.getOrphanedEvents=function(e){var t=this;return Object.keys(this.inProgressEvents).reduce(function(r,n){if(-1!==n.indexOf(e)){var o=t.inProgressEvents[n];return delete t.inProgressEvents[n],r.concat([o])}return r},[])},TelemetryManager}(),_r="https://login.microsoftonline.com/common",Sr="id_token",Ar="token",Pr="id_token token",Er=function(e,t,r){var n=r.value;return r.value=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this.isInIframe()?new Promise(function(){}):n.apply(this,e)},r},Ir=function(){function UserAgentApplication(e){this.authResponseCallback=null,this.tokenReceivedCallback=null,this.errorReceivedCallback=null,this.config=function buildConfiguration(e){var t=e.auth,r=e.cache,n=void 0===r?{}:r,o=e.system,i=void 0===o?{}:o,s=e.framework,a=void 0===s?{}:s;return{auth:re({},ir,t),cache:re({},sr,n),system:re({},ar,i),framework:re({},lr,a)}}(e),this.redirectCallbacksSet=!1,this.logger=this.config.system.logger,this.clientId=this.config.auth.clientId,this.inCookie=this.config.cache.storeAuthStateInCookie,this.telemetryManager=this.getTelemetryManagerFromConfig(this.config.system.telemetry,this.clientId),this.authority=this.config.auth.authority||_r,this.loginInProgress=!1,this.acquireTokenInProgress=!1;try{this.cacheStorage=new Kt(this.config.cache.cacheLocation)}catch(e){throw jt.createInvalidCacheLocationConfigError(this.config.cache.cacheLocation)}window.openedWindows=[],window.activeRenewals={},window.renewStates=[],window.callbackMappedToRenewStates={},window.promiseMappedToRenewStates={},window.msal=this;var t=window.location.hash,r=this.urlContainsHash(t);this.config.framework.isAngular||r&&this.handleAuthenticationResponse(t)}return Object.defineProperty(UserAgentApplication.prototype,"authority",{get:function(){return this.authorityInstance.CanonicalAuthority},set:function(e){this.authorityInstance=nr.CreateInstance(e,this.config.auth.validateAuthority)},enumerable:!0,configurable:!0}),UserAgentApplication.prototype.getAuthorityInstance=function(){return this.authorityInstance},UserAgentApplication.prototype.handleRedirectCallback=function(e,t){if(!e)throw this.redirectCallbacksSet=!1,jt.createInvalidCallbackObjectError(e);if(t?(this.tokenReceivedCallback=e,this.errorReceivedCallback=t,this.logger.warning("This overload for callback is deprecated - please change the format of the callbacks to a single callback as shown: (err: AuthError, response: AuthResponse).")):this.authResponseCallback=e,this.redirectCallbacksSet=!0,!this.config.framework.isAngular){var r=this.cacheStorage.getItem(Xe.urlHash);r&&this.processCallBack(r,null)}},UserAgentApplication.prototype.authResponseHandler=function(e,t,r){if(e===Xe.interactionTypeRedirect)this.errorReceivedCallback?this.tokenReceivedCallback(t):this.authResponseCallback&&this.authResponseCallback(null,t);else{if(e!==Xe.interactionTypePopup)throw $t.createInvalidInteractionTypeError();r(t)}},UserAgentApplication.prototype.authErrorHandler=function(e,t,r,n){if(e===Xe.interactionTypeRedirect)this.errorReceivedCallback?this.errorReceivedCallback(t,r.accountState):this.authResponseCallback(t,r);else{if(e!==Xe.interactionTypePopup)throw $t.createInvalidInteractionTypeError();n(t)}},UserAgentApplication.prototype.loginRedirect=function(e){if(!this.redirectCallbacksSet)throw jt.createRedirectCallbacksNotSetError();this.acquireTokenInteractive(Xe.interactionTypeRedirect,!0,e)},UserAgentApplication.prototype.acquireTokenRedirect=function(e){if(!e)throw jt.createEmptyRequestError();if(!this.redirectCallbacksSet)throw jt.createRedirectCallbacksNotSetError();this.acquireTokenInteractive(Xe.interactionTypeRedirect,!1,e)},UserAgentApplication.prototype.loginPopup=function(e){var t=this;return new Promise(function(r,n){t.acquireTokenInteractive(Xe.interactionTypePopup,!0,e,r,n)})},UserAgentApplication.prototype.acquireTokenPopup=function(e){var t=this;if(!e)throw jt.createEmptyRequestError();return new Promise(function(r,n){t.acquireTokenInteractive(Xe.interactionTypePopup,!1,e,r,n)})},UserAgentApplication.prototype.acquireTokenInteractive=function(e,t,r,n,o){var i=this;if(this.loginInProgress||this.acquireTokenInProgress){var s=this.loginInProgress?$t.createLoginInProgressError():$t.createAcquireTokenInProgressError(),a=buildResponseStateOnly(this.getAccountState(r&&r.state));this.authErrorHandler(e,s,a,o)}else{var l=t?this.appendScopes(r):r.scopes;this.validateInputScope(l,!t);var c=r&&r.account&&!t?r.account:this.getAccount();if(c||Vt.isSSOParam(r))this.acquireTokenHelper(c,e,t,r,l,n,o);else{if(!t)throw this.logger.info("User login is required"),$t.createUserLoginRequiredError();if(this.extractADALIdToken()&&!l){this.logger.info("ADAL's idToken exists. Extracting login information from ADAL's idToken ");var d=this.buildIDTokenRequest(r);this.silentLogin=!0,this.acquireTokenSilent(d).then(function(t){i.silentLogin=!1,i.logger.info("Unified cache call is successful"),i.authResponseHandler(e,t,n)},function(s){i.silentLogin=!1,i.logger.error("Error occurred during unified cache ATS: "+s),i.acquireTokenHelper(null,e,t,r,l,n,o)})}else this.acquireTokenHelper(null,e,t,r,l,n,o)}}},UserAgentApplication.prototype.acquireTokenHelper=function(e,t,r,n,o,i,s){var a=this;r?this.loginInProgress=!0:this.acquireTokenInProgress=!0;var l,c,d=o?o.join(" ").toLowerCase():this.clientId.toLowerCase(),p=!r&&n&&n.authority?nr.CreateInstance(n.authority,this.config.auth.validateAuthority):this.authorityInstance;(t!==Xe.interactionTypePopup||(c=this.openWindow("about:blank","_blank",1,this,i,s)))&&p.resolveEndpointsAsync().then(function(){var u,h=r?Sr:a.getTokenType(e,o,!1);r&&((u=a.cacheStorage.getItem(Xe.angularLoginRequest))&&""!==u?a.cacheStorage.setItem(Xe.angularLoginRequest,""):u=window.location.href),l=new Vt(p,a.clientId,o,h,a.getRedirectUri(),n&&n.state),a.updateCacheEntries(l,e,u),l.populateQueryParams(e,n);var g=mt.createNavigateUrl(l)+Xe.response_mode_fragment;if(t===Xe.interactionTypeRedirect)r||a.cacheStorage.setItem(Xe.stateAcquireToken,l.state,a.inCookie);else{if(t!==Xe.interactionTypePopup)throw $t.createInvalidInteractionTypeError();window.renewStates.push(l.state),window.requestType=r?Xe.login:Xe.renewToken,a.registerCallback(l.state,d,i,s)}a.navigateWindow(g,c)}).catch(function(e){a.logger.warning("could not resolve endpoints"),a.authErrorHandler(t,$t.createEndpointResolutionError(e.toString),buildResponseStateOnly(n.state),s),c&&c.close()})},UserAgentApplication.prototype.acquireTokenSilent=function(e){var t=this;if(!e)throw jt.createEmptyRequestError();return new Promise(function(r,n){t.validateInputScope(e.scopes,!0);var o=e.scopes.join(" ").toLowerCase(),i=e.account||t.getAccount(),s=t.cacheStorage.getItem(Xe.adalIdToken);if(!i&&!e.sid&&!e.loginHint&&gt.isEmpty(s))return t.logger.info("User login is required"),n($t.createUserLoginRequiredError());var a=t.getTokenType(i,e.scopes,!0),l=new Vt(nr.CreateInstance(e.authority,t.config.auth.validateAuthority),t.clientId,e.scopes,a,t.getRedirectUri(),e&&e.state);if(Vt.isSSOParam(e)||i)l.populateQueryParams(i,e);else if(!i&&!gt.isEmpty(s)){var c=Gt.extractIdToken(s);t.logger.verbose("ADAL's idToken exists. Extracting login information from ADAL's idToken "),l.populateQueryParams(i,null,c)}var d,p,u=e.claimsRequest||l.claimsValue;if(!u&&!e.forceRefresh)try{p=t.getCachedToken(l,i)}catch(e){d=e}if(p)return t.logger.info("Token is already in cache for scope:"+o),r(p),null;if(d)return t.logger.infoPii(d.errorCode+":"+d.errorMessage),n(d),null;var h=void 0;return h=u?"Skipped cache lookup since claims were given.":e.forceRefresh?"Skipped cache lookup since request.forceRefresh option was set to true":"Token is not in cache for scope:"+o,t.logger.verbose(h),l.authorityInstance||(l.authorityInstance=e.authority?nr.CreateInstance(e.authority,t.config.auth.validateAuthority):t.authorityInstance),l.authorityInstance.resolveEndpointsAsync().then(function(){window.activeRenewals[o]?(t.logger.verbose("Renew token for scope: "+o+" is in progress. Registering callback"),t.registerCallback(window.activeRenewals[o],o,r,n)):e.scopes&&e.scopes.indexOf(t.clientId)>-1&&1===e.scopes.length?(t.logger.verbose("renewing idToken"),t.silentLogin=!0,t.renewIdToken(e.scopes,r,n,i,l)):(t.logger.verbose("renewing accesstoken"),t.renewToken(e.scopes,r,n,i,l))}).catch(function(e){return t.logger.warning("could not resolve endpoints"),n($t.createEndpointResolutionError(e.toString())),null})})},UserAgentApplication.prototype.openWindow=function(e,t,r,n,o,i){var s,a=this;try{s=this.openPopup(e,t,Xe.popUpWidth,Xe.popUpHeight)}catch(e){return n.loginInProgress=!1,n.acquireTokenInProgress=!1,this.logger.info(bt.code+":"+bt.desc),this.cacheStorage.setItem(Xe.msalError,bt.code),this.cacheStorage.setItem(Xe.msalErrorDescription,bt.desc),i&&i($t.createPopupWindowError()),null}window.openedWindows.push(s);var l=window.setInterval(function(){if(s&&s.closed&&(n.loginInProgress||n.acquireTokenInProgress)){if(i&&i($t.createUserCancelledError()),window.clearInterval(l),a.config.framework.isAngular)return void a.broadcast("msal:popUpClosed",xt.code+Xe.resourceDelimiter+xt.desc);n.loginInProgress=!1,n.acquireTokenInProgress=!1}try{var e=s.location;if(-1!==e.href.indexOf(a.getRedirectUri())&&(window.clearInterval(l),n.loginInProgress=!1,n.acquireTokenInProgress=!1,a.logger.info("Closing popup window"),a.config.framework.isAngular)){a.broadcast("msal:popUpHashChanged",e.hash);for(var t=0;t<window.openedWindows.length;t++)window.openedWindows[t].close()}}catch(e){}},r);return s},UserAgentApplication.prototype.openPopup=function(e,t,r,n){try{var o=window.screenLeft?window.screenLeft:window.screenX,i=window.screenTop?window.screenTop:window.screenY,s=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,a=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,l=s/2-r/2+o,c=a/2-n/2+i,d=window.open(e,t,"width="+r+", height="+n+", top="+c+", left="+l);if(!d)throw $t.createPopupWindowError();return d.focus&&d.focus(),d}catch(e){throw this.logger.error("error opening popup "+e.message),this.loginInProgress=!1,this.acquireTokenInProgress=!1,$t.createPopupWindowError(e.toString())}},UserAgentApplication.prototype.isInIframe=function(){return window.parent!==window},UserAgentApplication.prototype.parentIsMsal=function(){return window.parent!==window&&window.parent.msal},UserAgentApplication.prototype.loadIframeTimeout=function(e,t,r){var n=this,o=window.activeRenewals[r];this.logger.verbose("Set loading state to pending for: "+r+":"+o),this.cacheStorage.setItem(Xe.renewStatus+o,Xe.tokenRenewStatusInProgress),this.loadFrame(e,t),setTimeout(function(){n.cacheStorage.getItem(Xe.renewStatus+o)===Xe.tokenRenewStatusInProgress&&(n.logger.verbose("Loading frame has timed out after: "+n.config.system.loadFrameTimeout/1e3+" seconds for scope "+r+":"+o),o&&window.callbackMappedToRenewStates[o]&&window.callbackMappedToRenewStates[o](null,$t.createTokenRenewalTimeoutError()),n.cacheStorage.setItem(Xe.renewStatus+o,Xe.tokenRenewStatusCancelled))},this.config.system.loadFrameTimeout)},UserAgentApplication.prototype.loadFrame=function(e,t){var r=this;this.logger.info("LoadFrame: "+t);var n=t;setTimeout(function(){var o=r.addHiddenIFrame(n);""!==o.src&&"about:blank"!==o.src||(o.src=e,r.logger.infoPii("Frame Name : "+t+" Navigated to: "+e))},this.config.system.navigateFrameWait)},UserAgentApplication.prototype.addHiddenIFrame=function(e){if(void 0===e)return null;this.logger.info("Add msal frame to document:"+e);var t=document.getElementById(e);if(!t){if(document.createElement&&document.documentElement&&-1===window.navigator.userAgent.indexOf("MSIE 5.0")){var r=document.createElement("iframe");r.setAttribute("id",e),r.style.visibility="hidden",r.style.position="absolute",r.style.width=r.style.height="0",r.style.border="0",t=document.getElementsByTagName("body")[0].appendChild(r)}else document.body&&document.body.insertAdjacentHTML&&document.body.insertAdjacentHTML("beforeend","<iframe name='"+e+"' id='"+e+"' style='display:none'></iframe>");window.frames&&window.frames[e]&&(t=window.frames[e])}return t},UserAgentApplication.prototype.navigateWindow=function(e,t){if(!e||gt.isEmpty(e))throw this.logger.info("Navigate url is empty"),kt.createUnexpectedError("Navigate url is empty");var r=t||window,n=t?"Navigated Popup window to:"+e:"Navigate to:"+e;this.logger.infoPii(n),r.location.replace(e)},UserAgentApplication.prototype.registerCallback=function(e,t,r,n){var o=this;window.activeRenewals[t]=e,window.promiseMappedToRenewStates[e]||(window.promiseMappedToRenewStates[e]=[]),window.promiseMappedToRenewStates[e].push({resolve:r,reject:n}),window.callbackMappedToRenewStates[e]||(window.callbackMappedToRenewStates[e]=function(r,n){window.activeRenewals[t]=null;for(var i=0;i<window.promiseMappedToRenewStates[e].length;++i)try{if(n)window.promiseMappedToRenewStates[e][i].reject(n);else{if(!r)throw kt.createUnexpectedError("Error and response are both null");window.promiseMappedToRenewStates[e][i].resolve(r)}}catch(e){o.logger.warning(e)}window.promiseMappedToRenewStates[e]=null,window.callbackMappedToRenewStates[e]=null})},UserAgentApplication.prototype.logout=function(){var e=this;this.clearCache(),this.account=null;var t="";this.getPostLogoutRedirectUri()&&(t="post_logout_redirect_uri="+encodeURIComponent(this.getPostLogoutRedirectUri())),this.authorityInstance.resolveEndpointsAsync().then(function(r){var n=r.EndSessionEndpoint?r.EndSessionEndpoint+"?"+t:e.authority+"oauth2/v2.0/logout?"+t;e.navigateWindow(n)})},UserAgentApplication.prototype.clearCache=function(){window.renewStates=[];for(var e=this.cacheStorage.getAllAccessTokens(Xe.clientId,Xe.homeAccountIdentifier),t=0;t<e.length;t++)this.cacheStorage.removeItem(JSON.stringify(e[t].key));this.cacheStorage.resetCacheItems(),this.cacheStorage.clearCookie()},UserAgentApplication.prototype.clearCacheForScope=function(e){for(var t=this.cacheStorage.getAllAccessTokens(Xe.clientId,Xe.homeAccountIdentifier),r=0;r<t.length;r++){var n=t[r];n.value.accessToken===e&&this.cacheStorage.removeItem(JSON.stringify(n.key))}},UserAgentApplication.prototype.isCallback=function(e){return this.logger.info("isCallback will be deprecated in favor of urlContainsHash in MSAL.js v2.0."),this.urlContainsHash(e)},UserAgentApplication.prototype.urlContainsHash=function(e){var t=this.deserializeHash(e);return t.hasOwnProperty(Xe.errorDescription)||t.hasOwnProperty(Xe.error)||t.hasOwnProperty(Xe.accessToken)||t.hasOwnProperty(Xe.idToken)},UserAgentApplication.prototype.processCallBack=function(e,t,r){var n,o;this.logger.info("Processing the callback from redirect response"),t||(t=this.getResponseState(e));try{n=this.saveTokenFromHash(e,t)}catch(e){o=e}this.cacheStorage.removeItem(Xe.urlHash);try{this.cacheStorage.clearCookie();var i=this.getAccountState(t.state);if(n){if(t.requestType===Xe.renewToken||n.accessToken?(window.parent!==window?this.logger.verbose("Window is in iframe, acquiring token silently"):this.logger.verbose("acquiring token interactive in progress"),n.tokenType=Xe.accessToken):t.requestType===Xe.login&&(n.tokenType=Xe.idToken),!r)return void this.authResponseHandler(Xe.interactionTypeRedirect,n)}else if(!r)return void this.authErrorHandler(Xe.interactionTypeRedirect,o,buildResponseStateOnly(i));r(n,o)}catch(e){throw this.logger.error("Error occurred in token received callback function: "+e),$t.createErrorInCallbackFunction(e.toString())}},UserAgentApplication.prototype.handleAuthenticationResponse=function(e){null==e&&(e=window.location.hash);var t=null,r=!1,n=!1;try{n=window.opener&&window.opener.msal&&window.opener.msal!==window.msal}catch(e){n=!1}n?(t=window.opener.msal,r=!0):window.parent&&window.parent.msal&&(t=window.parent.msal);var o=t.getResponseState(e),i=null;if(t.logger.info("Returned from redirect url"),this.parentIsMsal())i=window.parent.callbackMappedToRenewStates[o.state];else if(n)i=window.opener.callbackMappedToRenewStates[o.state];else{if(i=null,t.config.auth.navigateToLoginRequestUrl)return t.cacheStorage.setItem(Xe.urlHash,e),void(window.parent!==window||r||(window.location.href=t.cacheStorage.getItem(Xe.loginRequest,t.inCookie)));if(window.location.hash="",!this.redirectCallbacksSet)return void t.cacheStorage.setItem(Xe.urlHash,e)}if(t.processCallBack(e,o,i),n)for(var s=0;s<window.opener.openedWindows.length;s++)window.opener.openedWindows[s].close()},UserAgentApplication.prototype.deserializeHash=function(e){var t=mt.getHashFromUrl(e);return Je.deserialize(t)},UserAgentApplication.prototype.getResponseState=function(e){var t,r=this.deserializeHash(e);if(!r)throw kt.createUnexpectedError("Hash was not parsed correctly.");if(!r.hasOwnProperty("state"))throw kt.createUnexpectedError("Hash does not contain state.");if((t={requestType:Xe.unknown,state:r.state,stateMatch:!1}).state===this.cacheStorage.getItem(Xe.stateLogin,this.inCookie)||t.state===this.silentAuthenticationState)return t.requestType=Xe.login,t.stateMatch=!0,t;if(t.state===this.cacheStorage.getItem(Xe.stateAcquireToken,this.inCookie))return t.requestType=Xe.renewToken,t.stateMatch=!0,t;if(!t.stateMatch){t.requestType=window.requestType;for(var n=window.renewStates,o=0;o<n.length;o++)if(n[o]===t.state){t.stateMatch=!0;break}}return t},UserAgentApplication.prototype.getCachedToken=function(e,t){var r=null,n=e.scopes,o=this.cacheStorage.getAllAccessTokens(this.clientId,t?t.homeAccountIdentifier:null);if(0===o.length)return null;var i=[];if(e.authority){for(s=0;s<o.length;s++){l=(a=o[s]).key.scopes.split(" ");ht.containsScope(l,n)&&mt.CanonicalizeUri(a.key.authority)===e.authority&&i.push(a)}if(0===i.length)return null;if(1!==i.length)throw $t.createMultipleMatchingTokensInCacheError(n.toString());r=i[0]}else{for(var s=0;s<o.length;s++){var a,l=(a=o[s]).key.scopes.split(" ");ht.containsScope(l,n)&&i.push(a)}if(1===i.length)r=i[0],e.authorityInstance=nr.CreateInstance(r.key.authority,this.config.auth.validateAuthority);else{if(i.length>1)throw $t.createMultipleMatchingTokensInCacheError(n.toString());var c=this.getUniqueAuthority(o,"authority");if(c.length>1)throw $t.createMultipleAuthoritiesInCacheError(n.toString());e.authorityInstance=nr.CreateInstance(c[0],this.config.auth.validateAuthority)}}if(null!=r){var d=Number(r.value.expiresIn),p=this.config.system.tokenRenewalOffsetSeconds||300;if(d&&d>Jt.now()+p){var u=new Wt(r.value.idToken);if(!t&&!(t=this.getAccount()))throw kt.createUnexpectedError("Account should not be null here.");var h=this.getAccountState(e.state),g={uniqueId:"",tenantId:"",tokenType:r.value.idToken===r.value.accessToken?Xe.idToken:Xe.accessToken,idToken:u,idTokenClaims:u.claims,accessToken:r.value.accessToken,scopes:r.key.scopes.split(" "),expiresOn:new Date(1e3*d),account:t,accountState:h};return Xt.setResponseIdToken(g,u),g}return this.cacheStorage.removeItem(JSON.stringify(i[0].key)),null}return null},UserAgentApplication.prototype.getUniqueAuthority=function(e,t){var r=[],n=[];return e.forEach(function(e){e.key.hasOwnProperty(t)&&-1===n.indexOf(e.key[t])&&(n.push(e.key[t]),r.push(e.key[t]))}),r},UserAgentApplication.prototype.extractADALIdToken=function(){var e=this.cacheStorage.getItem(Xe.adalIdToken);return gt.isEmpty(e)?null:Gt.extractIdToken(e)},UserAgentApplication.prototype.renewToken=function(e,t,r,n,o){var i=e.join(" ").toLowerCase();this.logger.verbose("renewToken is called for scope:"+i);var s=this.addHiddenIFrame("msalRenewFrame"+i);this.updateCacheEntries(o,n),this.logger.verbose("Renew token Expected state: "+o.state);var a=mt.urlRemoveQueryStringParameter(mt.createNavigateUrl(o),Xe.prompt)+Xe.prompt_none;window.renewStates.push(o.state),window.requestType=Xe.renewToken,this.registerCallback(o.state,i,t,r),this.logger.infoPii("Navigate to:"+a),s.src="about:blank",this.loadIframeTimeout(a,"msalRenewFrame"+i,i)},UserAgentApplication.prototype.renewIdToken=function(e,t,r,n,o){this.logger.info("renewidToken is called");var i=this.addHiddenIFrame("msalIdTokenFrame");this.updateCacheEntries(o,n),this.logger.verbose("Renew Idtoken Expected state: "+o.state);var s=mt.urlRemoveQueryStringParameter(mt.createNavigateUrl(o),Xe.prompt)+Xe.prompt_none;this.silentLogin?(window.requestType=Xe.login,this.silentAuthenticationState=o.state):(window.requestType=Xe.renewToken,window.renewStates.push(o.state)),this.registerCallback(o.state,this.clientId,t,r),this.logger.infoPii("Navigate to:"+s),i.src="about:blank",this.loadIframeTimeout(s,"msalIdTokenFrame",this.clientId)},UserAgentApplication.prototype.saveAccessToken=function(e,t,r,n,o){var i,s,a=re({},e),l=new zt(n);if(r.hasOwnProperty("scope")){for(var c=(i=r.scope).split(" "),d=this.cacheStorage.getAllAccessTokens(this.clientId,t),p=0;p<d.length;p++){var u=d[p];if(u.key.homeAccountIdentifier===e.account.homeAccountIdentifier){var h=u.key.scopes.split(" ");ht.isIntersectingScopes(h,c)&&this.cacheStorage.removeItem(JSON.stringify(u.key))}}var g=Jt.parseExpiresIn(r[Xe.expiresIn]);s=Jt.now()+g;var m=new ft(t,this.clientId,i,l.uid,l.utid),f=new yt(r[Xe.accessToken],o.rawIdToken,s.toString(),n);this.cacheStorage.setItem(JSON.stringify(m),JSON.stringify(f)),a.accessToken=r[Xe.accessToken],a.scopes=c}else{i=this.clientId;m=new ft(t,this.clientId,i,l.uid,l.utid);s=Number(o.expiration);f=new yt(r[Xe.idToken],r[Xe.idToken],s.toString(),n);this.cacheStorage.setItem(JSON.stringify(m),JSON.stringify(f)),a.scopes=[i],a.accessToken=r[Xe.idToken]}return s?a.expiresOn=new Date(1e3*s):this.logger.error("Could not parse expiresIn parameter"),a},UserAgentApplication.prototype.saveTokenFromHash=function(e,t){this.logger.info("State status:"+t.stateMatch+"; Request type:"+t.requestType),this.cacheStorage.setItem(Xe.msalError,""),this.cacheStorage.setItem(Xe.msalErrorDescription,"");var r,n={uniqueId:"",tenantId:"",tokenType:"",idToken:null,idTokenClaims:null,accessToken:null,scopes:[],expiresOn:null,account:null,accountState:""},o=this.deserializeHash(e),i="",s="",a=null;if(o.hasOwnProperty(Xe.errorDescription)||o.hasOwnProperty(Xe.error)){if(this.logger.infoPii("Error :"+o[Xe.error]+"; Error description:"+o[Xe.errorDescription]),this.cacheStorage.setItem(Xe.msalError,o[Xe.error]),this.cacheStorage.setItem(Xe.msalErrorDescription,o[Xe.errorDescription]),t.requestType===Xe.login&&(this.loginInProgress=!1,this.cacheStorage.setItem(Xe.loginError,o[Xe.errorDescription]+":"+o[Xe.error]),i=Kt.generateAuthorityKey(t.state)),t.requestType===Xe.renewToken){this.acquireTokenInProgress=!1,i=Kt.generateAuthorityKey(t.state);var l=this.getAccount(),c=void 0;c=l&&!gt.isEmpty(l.homeAccountIdentifier)?l.homeAccountIdentifier:Xe.no_account,s=Kt.generateAcquireTokenAccountKey(c,t.state)}var d=o[Xe.error],p=o[Xe.errorDescription];r=mr.isInteractionRequiredError(d)||mr.isInteractionRequiredError(p)?new mr(o[Xe.error],o[Xe.errorDescription]):new pr(o[Xe.error],o[Xe.errorDescription])}else if(t.stateMatch){this.logger.info("State is right"),o.hasOwnProperty(Xe.sessionState)&&this.cacheStorage.setItem(Xe.msalSessionState,o[Xe.sessionState]),n.accountState=this.getAccountState(t.state);var u="";if(o.hasOwnProperty(Xe.accessToken)){this.logger.info("Fragment has access token"),this.acquireTokenInProgress=!1,o.hasOwnProperty(Xe.idToken)?(a=new Wt(o[Xe.idToken]),n.idToken=a,n.idTokenClaims=a.claims):(a=new Wt(this.cacheStorage.getItem(Xe.idTokenKey)),n=Xt.setResponseIdToken(n,a));var h=Kt.generateAuthorityKey(t.state),g=this.cacheStorage.getItem(h,this.inCookie);if(gt.isEmpty(g)||(g=mt.replaceTenantPath(g,n.tenantId)),!o.hasOwnProperty(Xe.clientInfo))throw this.logger.warning("ClientInfo not received in the response from AAD"),$t.createClientInfoNotPopulatedError("ClientInfo not received in the response from the server");u=o[Xe.clientInfo],n.account=Qt.createAccount(a,new zt(u));var m=void 0;m=n.account&&!gt.isEmpty(n.account.homeAccountIdentifier)?n.account.homeAccountIdentifier:Xe.no_account,s=Kt.generateAcquireTokenAccountKey(m,t.state);var f=Kt.generateAcquireTokenAccountKey(Xe.no_account,t.state),y=this.cacheStorage.getItem(s),v=void 0;gt.isEmpty(y)?gt.isEmpty(this.cacheStorage.getItem(f))||(n=this.saveAccessToken(n,g,o,u,a)):(v=JSON.parse(y),n.account&&v&&Qt.compareAccounts(n.account,v)?(n=this.saveAccessToken(n,g,o,u,a),this.logger.info("The user object received in the response is the same as the one passed in the acquireToken request")):this.logger.warning("The account object created from the response is not the same as the one passed in the acquireToken request"))}if(o.hasOwnProperty(Xe.idToken)){this.logger.info("Fragment has id token"),this.loginInProgress=!1,a=new Wt(o[Xe.idToken]),n=Xt.setResponseIdToken(n,a),o.hasOwnProperty(Xe.clientInfo)?u=o[Xe.clientInfo]:this.logger.warning("ClientInfo not received in the response from AAD"),i=Kt.generateAuthorityKey(t.state);g=this.cacheStorage.getItem(i,this.inCookie);gt.isEmpty(g)||(g=mt.replaceTenantPath(g,a.tenantId)),this.account=Qt.createAccount(a,new zt(u)),n.account=this.account,a&&a.nonce?a.nonce!==this.cacheStorage.getItem(Xe.nonceIdToken,this.inCookie)?(this.account=null,this.cacheStorage.setItem(Xe.loginError,"Nonce Mismatch. Expected Nonce: "+this.cacheStorage.getItem(Xe.nonceIdToken,this.inCookie)+",Actual Nonce: "+a.nonce),this.logger.error("Nonce Mismatch.Expected Nonce: "+this.cacheStorage.getItem(Xe.nonceIdToken,this.inCookie)+",Actual Nonce: "+a.nonce),r=$t.createNonceMismatchError(this.cacheStorage.getItem(Xe.nonceIdToken,this.inCookie),a.nonce)):(this.cacheStorage.setItem(Xe.idTokenKey,o[Xe.idToken]),this.cacheStorage.setItem(Xe.msalClientInfo,u),this.saveAccessToken(n,g,o,u,a)):(i=t.state,s=t.state,this.logger.error("Invalid id_token received in the response"),r=$t.createInvalidIdTokenError(a),this.cacheStorage.setItem(Xe.msalError,r.errorCode),this.cacheStorage.setItem(Xe.msalErrorDescription,r.errorMessage))}}else{i=t.state,s=t.state;var k=this.cacheStorage.getItem(Xe.stateLogin,this.inCookie);this.logger.error("State Mismatch.Expected State: "+k+",Actual State: "+t.state),r=$t.createInvalidStateError(t.state,k),this.cacheStorage.setItem(Xe.msalError,r.errorCode),this.cacheStorage.setItem(Xe.msalErrorDescription,r.errorMessage)}if(this.cacheStorage.setItem(Xe.renewStatus+t.state,Xe.tokenRenewStatusCompleted),this.cacheStorage.removeAcquireTokenEntries(t.state),this.inCookie&&(this.cacheStorage.setItemCookie(i,"",-1),this.cacheStorage.clearCookie()),r)throw r;if(!n)throw kt.createUnexpectedError("Response is null");return n},UserAgentApplication.prototype.getAccount=function(){if(this.account)return this.account;var e=this.cacheStorage.getItem(Xe.idTokenKey),t=this.cacheStorage.getItem(Xe.msalClientInfo);if(!gt.isEmpty(e)&&!gt.isEmpty(t)){var r=new Wt(e),n=new zt(t);return this.account=Qt.createAccount(r,n),this.account}return null},UserAgentApplication.prototype.getAccountState=function(e){if(e){var t=e.indexOf("|");if(t>-1&&t+1<e.length)return e.substring(t+1)}return e},UserAgentApplication.prototype.getAllAccounts=function(){for(var e=[],t=this.cacheStorage.getAllAccessTokens(Xe.clientId,Xe.homeAccountIdentifier),r=0;r<t.length;r++){var n=new Wt(t[r].value.idToken),o=new zt(t[r].value.homeAccountIdentifier),i=Qt.createAccount(n,o);e.push(i)}return this.getUniqueAccounts(e)},UserAgentApplication.prototype.getUniqueAccounts=function(e){if(!e||e.length<=1)return e;for(var t=[],r=[],n=0;n<e.length;++n)e[n].homeAccountIdentifier&&-1===t.indexOf(e[n].homeAccountIdentifier)&&(t.push(e[n].homeAccountIdentifier),r.push(e[n]));return r},UserAgentApplication.prototype.validateInputScope=function(e,t){if(e){if(!Array.isArray(e))throw jt.createScopesNonArrayError(e);if(e.length<1)throw jt.createEmptyScopesArrayError(e.toString());if(e.indexOf(this.clientId)>-1&&e.length>1)throw jt.createClientIdSingleScopeError(e.toString())}else if(t)throw jt.createScopesRequiredError(e)},UserAgentApplication.prototype.getScopeFromState=function(e){if(e){var t=e.indexOf("|");if(t>-1&&t+1<e.length)return e.substring(t+1)}return""},UserAgentApplication.prototype.appendScopes=function(e){var t;return e&&e.scopes&&(t=e.extraScopesToConsent?e.scopes.concat(e.extraScopesToConsent):e.scopes),t},UserAgentApplication.prototype.broadcast=function(e,t){var r=new CustomEvent(e,{detail:t});window.dispatchEvent(r)},UserAgentApplication.prototype.getCachedTokenInternal=function(e,t,r){var n=t||this.getAccount();if(!n)return null;var o=this.authorityInstance?this.authorityInstance:nr.CreateInstance(this.authority,this.config.auth.validateAuthority),i=this.getTokenType(n,e,!0),s=new Vt(o,this.clientId,e,i,this.getRedirectUri(),r);return this.getCachedToken(s,t)},UserAgentApplication.prototype.getScopesForEndpoint=function(e){if(this.config.framework.unprotectedResources.length>0)for(var t=0;t<this.config.framework.unprotectedResources.length;t++)if(e.indexOf(this.config.framework.unprotectedResources[t])>-1)return null;if(this.config.framework.protectedResourceMap.size>0)for(var r=0,n=Array.from(this.config.framework.protectedResourceMap.keys());r<n.length;r++){var o=n[r];if(e.indexOf(o)>-1)return this.config.framework.protectedResourceMap.get(o)}return e.indexOf("http://")>-1||e.indexOf("https://")>-1?this.getHostFromUri(e)===this.getHostFromUri(this.getRedirectUri())?new Array(this.clientId):null:new Array(this.clientId)},UserAgentApplication.prototype.getLoginInProgress=function(){return!!this.cacheStorage.getItem(Xe.urlHash)||this.loginInProgress},UserAgentApplication.prototype.setloginInProgress=function(e){this.loginInProgress=e},UserAgentApplication.prototype.getAcquireTokenInProgress=function(){return this.acquireTokenInProgress},UserAgentApplication.prototype.setAcquireTokenInProgress=function(e){this.acquireTokenInProgress=e},UserAgentApplication.prototype.getLogger=function(){return this.config.system.logger},UserAgentApplication.prototype.getRedirectUri=function(){return"function"==typeof this.config.auth.redirectUri?this.config.auth.redirectUri():this.config.auth.redirectUri},UserAgentApplication.prototype.getPostLogoutRedirectUri=function(){return"function"==typeof this.config.auth.postLogoutRedirectUri?this.config.auth.postLogoutRedirectUri():this.config.auth.postLogoutRedirectUri},UserAgentApplication.prototype.getCurrentConfiguration=function(){if(!this.config)throw jt.createNoSetConfigurationError();return this.config},UserAgentApplication.prototype.getHostFromUri=function(e){var t=String(e).replace(/^(https?:)\/\//,"");return t=t.split("/")[0]},UserAgentApplication.prototype.getTokenType=function(e,t,r){return r?Qt.compareAccounts(e,this.getAccount())?t.indexOf(this.config.auth.clientId)>-1?Sr:Ar:t.indexOf(this.config.auth.clientId)>-1?Sr:Pr:Qt.compareAccounts(e,this.getAccount())?t.indexOf(this.clientId)>-1?Sr:Ar:Pr},UserAgentApplication.prototype.setAccountCache=function(e,t){var r=e?this.getAccountId(e):Xe.no_account,n=Kt.generateAcquireTokenAccountKey(r,t);this.cacheStorage.setItem(n,JSON.stringify(e))},UserAgentApplication.prototype.setAuthorityCache=function(e,t){var r=Kt.generateAuthorityKey(e);this.cacheStorage.setItem(r,mt.CanonicalizeUri(t),this.inCookie)},UserAgentApplication.prototype.updateCacheEntries=function(e,t,r){r?(this.cacheStorage.setItem(Xe.loginRequest,r,this.inCookie),this.cacheStorage.setItem(Xe.loginError,""),this.cacheStorage.setItem(Xe.stateLogin,e.state,this.inCookie),this.cacheStorage.setItem(Xe.msalError,""),this.cacheStorage.setItem(Xe.msalErrorDescription,"")):this.setAccountCache(t,e.state),this.setAuthorityCache(e.state,e.authority),this.cacheStorage.setItem(Xe.nonceIdToken,e.nonce,this.inCookie)},UserAgentApplication.prototype.getAccountId=function(e){return gt.isEmpty(e.homeAccountIdentifier)?Xe.no_account:e.homeAccountIdentifier},UserAgentApplication.prototype.buildIDTokenRequest=function(e){return{scopes:[this.clientId],authority:this.authority,account:this.getAccount(),extraQueryParameters:e.extraQueryParameters}},UserAgentApplication.prototype.getTelemetryManagerFromConfig=function(e,t){if(!e)return null;var r=e.applicationName,n=e.applicationVersion,o=e.telemetryEmitter;if(!r||!n||!o)throw jt.createTelemetryConfigError(e);return new br({platform:{sdk:"msal.js",sdkVersion:"1.1.3",applicationName:r,applicationVersion:n},clientId:t},o)},function __decorate(e,t,r,n){var o,i=arguments.length,s=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(i<3?o(s):i>3?o(t,r,s):o(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s}([Er],UserAgentApplication.prototype,"acquireTokenSilent",null),UserAgentApplication}();class MsalProvider extends IProvider{get provider(){return this._userAgentApplication}constructor(e){super(),_defineProperty(this,"scopes",void 0),_defineProperty(this,"_userAgentApplication",void 0),_defineProperty(this,"clientId",void 0),_defineProperty(this,"_loginType",void 0),_defineProperty(this,"_loginHint",void 0),_defineProperty(this,"ss_requested_scopes_key","mgt-requested-scopes"),_defineProperty(this,"ss_denied_scopes_key","mgt-denied-scopes"),this.initProvider(e)}async trySilentSignIn(){try{if(this._userAgentApplication.isCallback(window.location.hash))return;this._userAgentApplication.getAccount()&&await this.getAccessToken(null)?this.setState(e.ProviderState.SignedIn):this.setState(e.ProviderState.SignedOut)}catch(t){this.setState(e.ProviderState.SignedOut)}}async login(t){const r=t||{loginHint:this._loginHint,prompt:"select_account",scopes:this.scopes};if(this._loginType===e.LoginType.Popup){const t=await this._userAgentApplication.loginPopup(r);this.setState(t.account?e.ProviderState.SignedIn:e.ProviderState.SignedOut)}else this._userAgentApplication.loginRedirect(r)}async logout(){this._userAgentApplication.logout(),this.setState(e.ProviderState.SignedOut)}async getAccessToken(t){const r=t&&t.scopes||this.scopes,n={loginHint:this._loginHint,scopes:r};try{return(await this._userAgentApplication.acquireTokenSilent(n)).accessToken}catch(t){if(!this.requiresInteraction(t))throw this.setState(e.ProviderState.SignedOut),t;if(this._loginType===e.LoginType.Redirect){if(this.areScopesDenied(r))throw t;this.setRequestedScopes(r),this._userAgentApplication.acquireTokenRedirect(n)}else try{return(await this._userAgentApplication.acquireTokenPopup(n)).accessToken}catch(e){throw e}}throw null}updateScopes(e){this.scopes=e}requiresInteraction(e){return!(!e||!e.errorCode)&&(-1!==e.errorCode.indexOf("consent_required")||-1!==e.errorCode.indexOf("interaction_required")||-1!==e.errorCode.indexOf("login_required"))}setRequestedScopes(e){e&&sessionStorage.setItem(this.ss_requested_scopes_key,JSON.stringify(e))}getRequestedScopes(){let e=sessionStorage.getItem(this.ss_requested_scopes_key);return e?JSON.parse(e):null}clearRequestedScopes(){sessionStorage.removeItem(this.ss_requested_scopes_key)}addDeniedScopes(e){if(e){let t=this.getDeniedScopes()||[],r=(t=t.concat(e)).indexOf("openid");-1!==r&&t.splice(r,1),-1!==(r=t.indexOf("profile"))&&t.splice(r,1),sessionStorage.setItem(this.ss_denied_scopes_key,JSON.stringify(t))}}getDeniedScopes(){let e=sessionStorage.getItem(this.ss_denied_scopes_key);return e?JSON.parse(e):null}areScopesDenied(e){if(e){const t=this.getDeniedScopes();if(t&&t.filter(t=>-1!==e.indexOf(t)).length>0)return!0}return!1}initProvider(t){this.scopes=void 0!==t.scopes?t.scopes:["user.read"],this._loginType=void 0!==t.loginType?t.loginType:e.LoginType.Redirect,this._loginHint=t.loginHint;const r=(e=>{this.tokenReceivedCallback(e)}).bind(this),n=((e,t)=>{this.errorReceivedCallback(e,status)}).bind(this);if(!t.clientId)throw new Error("clientId must be provided");{const e=t.options||{auth:{clientId:t.clientId}};e.auth.clientId=t.clientId,e.cache=e.cache||{},e.cache.cacheLocation=e.cache.cacheLocation||"localStorage",e.cache.storeAuthStateInCookie=e.cache.storeAuthStateInCookie||!0,t.authority&&(e.auth.authority=t.authority),this.clientId=t.clientId,this._userAgentApplication=new Ir(e),this._userAgentApplication.handleRedirectCallback(r,n)}this.graph=new Graph(this),this.trySilentSignIn()}tokenReceivedCallback(t){"id_token"===t.tokenType&&this.setState(e.ProviderState.SignedIn),this.clearRequestedScopes()}errorReceivedCallback(e,t){const r=this.getRequestedScopes();r&&this.addDeniedScopes(r),this.clearRequestedScopes()}}let xr=_decorate(null,function(e,t){class MgtBaseProvider extends t{constructor(...t){super(...t),e(this)}}return{F:MgtBaseProvider,d:[{kind:"get",key:"provider",value:function provider(){return this._provider}},{kind:"set",key:"provider",value:function provider(e){this._provider&&this.provider.removeStateChangedHandler(()=>this.stateChangedHandler),this._provider=e,this._provider&&this.provider.onStateChanged(()=>this.stateChangedHandler)}},{kind:"get",key:"isAvailable",value:function isAvailable(){return!0}},{kind:"field",decorators:[property({attribute:"depends-on",converter:e=>document.querySelector(e),type:String})],key:"dependsOn",value:void 0},{kind:"field",key:"_provider",value:void 0},{kind:"method",key:"firstUpdated",value:function firstUpdated(e){_get(_getPrototypeOf(MgtBaseProvider.prototype),"firstUpdated",this).call(this,e);let t=!1;if(this.dependsOn){let e=this.dependsOn;for(;e;){if(e.isAvailable){t=!0;break}e=e.dependsOn}}!t&&this.isAvailable&&this.initializeProvider()}},{kind:"method",key:"initializeProvider",value:function initializeProvider(){}},{kind:"method",key:"stateChangedHandler",value:function stateChangedHandler(){this.fireCustomEvent("onStateChanged",this.provider.state)}}]}},MgtBaseComponent),Dr=_decorate([B("mgt-msal-provider")],function(t,r){return{F:class MgtMsalProvider extends r{constructor(...e){super(...e),t(this)}},d:[{kind:"field",decorators:[property({type:String,attribute:"client-id"})],key:"clientId",value:()=>""},{kind:"field",decorators:[property({type:String,attribute:"login-type"})],key:"loginType",value:void 0},{kind:"field",decorators:[property()],key:"authority",value:void 0},{kind:"field",decorators:[property({type:String,attribute:"scopes"})],key:"scopes",value:void 0},{kind:"get",key:"isAvailable",value:function isAvailable(){return!0}},{kind:"method",key:"initializeProvider",value:function initializeProvider(){if(this.clientId){const t={clientId:this.clientId};if(this.loginType&&this.loginType.length>1){let r=this.loginType.toLowerCase();r=r[0].toUpperCase()+r.slice(1);const n=e.LoginType[r];t.loginType=n}if(this.authority&&(t.authority=this.authority),this.scopes){const e=this.scopes.split(",");e&&e.length>0&&(t.scopes=e)}this.provider=new MsalProvider(t),Providers.globalProvider=this.provider}}}]}},xr);class TeamsProvider extends MsalProvider{static get isAvailable(){return!(window.parent!==window.self||!window.nativeInterface)||("embedded-page-container"===window.name||"extension-tab-frame"===window.name)}static async handleAuth(){const t=TeamsProvider.microsoftTeamsLib||microsoftTeams;if(!t)return void console.error("Make sure you have referenced the Microsoft Teams sdk before using the TeamsProvider");t.initialize(),window.opener&&(window.opener.msal=null);const r=new URL(window.location.href),n=sessionStorage.getItem(this._sessionStorageParametersKey);let o;if((o=n?JSON.parse(n):{}).clientId||(o.clientId=r.searchParams.get("clientId"),o.scopes=r.searchParams.get("scopes"),o.loginHint=r.searchParams.get("loginHint"),sessionStorage.setItem(this._sessionStorageParametersKey,JSON.stringify(o))),!o.clientId)return void t.authentication.notifyFailure("no clientId provided");const i=o.scopes?o.scopes.split(","):null,s=new MsalProvider({clientId:o.clientId,options:{auth:{clientId:o.clientId,redirectUri:r.protocol+"//"+r.host+r.pathname},system:{loadFrameTimeout:1e4}},scopes:i});if(Ir.prototype.urlContainsHash(window.location.hash))return;const a=async()=>{if(s.state===e.ProviderState.SignedOut)s.login({loginHint:o.loginHint,scopes:i||s.scopes});else if(s.state===e.ProviderState.SignedIn)try{const e=await s.getAccessTokenForScopes(...s.scopes);sessionStorage.removeItem(this._sessionStorageParametersKey),t.authentication.notifySuccess(e)}catch(e){sessionStorage.removeItem(this._sessionStorageParametersKey),t.authentication.notifyFailure(e)}};s.onStateChanged(a),a()}constructor(t){super({clientId:t.clientId,loginType:e.LoginType.Redirect,options:t.msalOptions,scopes:t.scopes}),_defineProperty(this,"scopes",void 0),_defineProperty(this,"teamsContext",void 0),_defineProperty(this,"_authPopupUrl",void 0);const r=TeamsProvider.microsoftTeamsLib||microsoftTeams;this._authPopupUrl=t.authPopupUrl,r.initialize()}async login(){this.setState(e.ProviderState.Loading);const t=TeamsProvider.microsoftTeamsLib||microsoftTeams;return new Promise((r,n)=>{t.getContext(o=>{this.teamsContext=o;const i=new URL(this._authPopupUrl,new URL(window.location.href));i.searchParams.append("clientId",this.clientId),o.loginHint&&i.searchParams.append("loginHint",o.loginHint),this.scopes&&i.searchParams.append("scopes",this.scopes.join(",")),t.authentication.authenticate({failureCallback:t=>{this.setState(e.ProviderState.SignedOut),n()},successCallback:t=>{this.setState(e.ProviderState.SignedIn),r()},url:i.href})})})}async getAccessToken(e){if(!this.teamsContext){const e=TeamsProvider.microsoftTeamsLib||microsoftTeams;this.teamsContext=await e.getContext()}const t={scopes:e&&e.scopes||this.scopes};this.teamsContext&&this.teamsContext.loginHint&&(t.loginHint=this.teamsContext.loginHint);const r=window.parent;document.referrer.startsWith("https://teams.microsoft.com/")&&(window.parent=window);try{const e=await this._userAgentApplication.acquireTokenSilent(t);return window.parent=r,e.accessToken}catch(e){if(window.parent=r,this.requiresInteraction(e))return null;throw e}}}_defineProperty(TeamsProvider,"microsoftTeamsLib",void 0),_defineProperty(TeamsProvider,"_sessionStorageParametersKey","msg-teamsprovider-auth-parameters");let Rr=_decorate([B("mgt-teams-provider")],function(e,t){return{F:class MgtTeamsProvider extends t{constructor(...t){super(...t),e(this)}},d:[{kind:"field",decorators:[property({type:String,attribute:"client-id"})],key:"clientId",value:()=>""},{kind:"field",decorators:[property({type:String,attribute:"auth-popup-url"})],key:"authPopupUrl",value:()=>""},{kind:"field",decorators:[property({type:String,attribute:"scopes"})],key:"scopes",value:void 0},{kind:"get",key:"isAvailable",value:function isAvailable(){return TeamsProvider.isAvailable}},{kind:"method",key:"initializeProvider",value:function initializeProvider(){if(this.clientId&&this.authPopupUrl){const e={authPopupUrl:this.authPopupUrl,clientId:this.clientId};if(this.scopes){const t=this.scopes.split(",");t&&t.length>0&&(e.scopes=t)}this.provider=new TeamsProvider(e),Providers.globalProvider=this.provider}}}]}},xr);class WamProvider extends IProvider{static get isAvailable(){return!!window.Windows}get isLoggedIn(){return!!this.accessToken}constructor(e,t){super(),_defineProperty(this,"graphResource","https://graph.microsoft.com"),_defineProperty(this,"clientId",void 0),_defineProperty(this,"authority",void 0),_defineProperty(this,"accessToken",void 0),this.clientId=e,this.authority=t||"https://login.microsoftonline.com/common",this.graph=new Graph(this),this.printRedirectUriToConsole()}async login(){if(WamProvider.isAvailable){const t=window.Windows.Security.Authentication.Web.Core,r=await t.WebAuthenticationCoreManager.findAccountProviderAsync("https://login.microsoft.com",this.authority);if(!r)return void console.log("no account provider");const n=new t.WebTokenRequest(r,"",this.clientId);n.properties.insert("resource",this.graphResource);const o=await t.WebAuthenticationCoreManager.requestTokenAsync(n);switch(o.responseStatus){case t.WebTokenRequestStatus.success:o.responseData[0].webAccount;this.accessToken=o.responseData[0].token,this.setState(this.accessToken?e.ProviderState.SignedIn:e.ProviderState.SignedOut);break;case t.WebTokenRequestStatus.userCancel:case t.WebTokenRequestStatus.accountSwitch:case t.WebTokenRequestStatus.userInteractionRequired:case t.WebTokenRequestStatus.accountProviderNotAvailable:case t.WebTokenRequestStatus.providerError:console.log(`status ${o.responseStatus}: error code ${o.responseError} | error message ${o.responseError.errorMessage}`)}}}printRedirectUriToConsole(){if(WamProvider.isAvailable){const e=`ms-appx-web://Microsoft.AAD.BrokerPlugIn/${window.Windows.Security.Authentication.Web.WebAuthenticationBroker.getCurrentApplicationCallbackUri().host.toUpperCase()}`;console.log("Use the following redirect URI in your AAD application:"),console.log(e)}else console.log("WAM not supported on this platform")}getAccessToken(e){if(this.isLoggedIn)return Promise.resolve(this.accessToken);throw new Error("Not logged in")}}let Or=_decorate([B("mgt-wam-provider")],function(e,t){return{F:class MgtWamProvider extends t{constructor(...t){super(...t),e(this)}},d:[{kind:"field",decorators:[property({attribute:"client-id"})],key:"clientId",value:void 0},{kind:"field",decorators:[property({attribute:"authority"})],key:"authority",value:void 0},{kind:"method",key:"firstUpdated",value:function firstUpdated(e){this.validateAuthProps()}},{kind:"method",key:"validateAuthProps",value:function validateAuthProps(){void 0!==this.clientId&&(Providers.globalProvider=new WamProvider(this.clientId,this.authority))}}]}},LitElement);class MockProvider extends IProvider{constructor(t=!1){super(),_defineProperty(this,"provider",void 0),_defineProperty(this,"graph",new MockGraph(this)),t?this.setState(e.ProviderState.SignedIn):this.setState(e.ProviderState.SignedOut)}async login(){this.setState(e.ProviderState.Loading),await new Promise(e=>setTimeout(e,3e3)),this.setState(e.ProviderState.SignedIn)}async logout(){this.setState(e.ProviderState.Loading),await new Promise(e=>setTimeout(e,3e3)),this.setState(e.ProviderState.SignedOut)}getAccessToken(){return Promise.resolve("{token:https://graph.microsoft.com/}")}}class MockGraph extends Graph{constructor(e){super(null),_defineProperty(this,"baseUrl","https://proxy.apisandbox.msdn.microsoft.com/svc?url="),_defineProperty(this,"rootGraphUrl","https://graph.microsoft.com/"),this.client=Client.initWithMiddleware({baseUrl:this.baseUrl+escape(this.rootGraphUrl),authProvider:e})}async getEvents(e,t){let r=`/me/calendarview?${`startdatetime=${e.toISOString()}`}&${`enddatetime=${t.toISOString()}`}`,n=await this.client.api(escape(r)).get();return n?n.value:null}}let Lr=_decorate([B("mgt-mock-provider")],function(e,t){return{F:class MgtMockProvider extends t{constructor(){super(),e(this),Providers.globalProvider=new MockProvider(!0)}},d:[]}},LitElement);return e.EventDispatcher=EventDispatcher,e.IProvider=IProvider,e.MgtAgenda=Ee,e.MgtBaseComponent=MgtBaseComponent,e.MgtLogin=xe,e.MgtMockProvider=Lr,e.MgtMsalProvider=Dr,e.MgtPeople=Be,e.MgtPeoplePicker=$e,e.MgtPerson=Pe,e.MgtPersonCard=ze,e.MgtTasks=Qe,e.MgtTeamsProvider=Rr,e.MgtWamProvider=Or,e.MsalProvider=MsalProvider,e.Providers=Providers,e.SharePointProvider=class SharePointProvider extends IProvider{get provider(){return this._provider}get isLoggedIn(){return!!this._idToken}constructor(e){super(),_defineProperty(this,"_idToken",void 0),_defineProperty(this,"_provider",void 0),_defineProperty(this,"context",void 0),_defineProperty(this,"scopes",void 0),_defineProperty(this,"authority",void 0),this.context=e,e.aadTokenProviderFactory.getTokenProvider().then(e=>{this._provider=e,this.graph=new Graph(this),this.internalLogin()})}async internalLogin(){this._idToken=await this.getAccessToken(),this.setState(this._idToken?e.ProviderState.SignedIn:e.ProviderState.SignedOut)}async getAccessToken(){let e;try{e=await this.provider.getToken("https://graph.microsoft.com")}catch(e){throw console.log(e),e}return e}updateScopes(e){this.scopes=e}},e.SimpleProvider=class SimpleProvider extends IProvider{constructor(e,t,r){super(),_defineProperty(this,"_getAccessTokenHandler",void 0),_defineProperty(this,"_loginHandler",void 0),_defineProperty(this,"_logoutHandler",void 0),this._getAccessTokenHandler=e,this._loginHandler=t,this._logoutHandler=r,this.graph=new Graph(this)}getAccessToken(e){return this._getAccessTokenHandler(e.scopes)}login(){return this._loginHandler()}logout(){return this._logoutHandler()}},e.TeamsProvider=TeamsProvider,e.prepScopes=prepScopes,e}({});
