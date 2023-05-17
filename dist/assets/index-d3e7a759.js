(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const He={},Jc=["problems"],E={subscribe:function(t){let{event:e,listener:n,events:r}=t;r||(r=[e]),r.forEach(s=>{He[s]===void 0?He[s]=[n]:He[s]=[...He[s],n]})},publish:function(t){let{event:e,detail:n}=t;const r=!Jc.includes(e);if(r&&console.log("Event Published: "+e,n),He[e]===void 0){r&&console.log(`Event (${e}) has no listeners`);return}He[e].forEach(s=>{s(n)})}},b=(t,e,n)=>{let r=document.createElement(t);return Zc(e,r),eu(n,r),r},Zc=(t,e)=>{if(t===""||t===void 0)return!1;e.classList.add(t)},eu=(t,e)=>{if(t===""||t===void 0)return!1;e.id=t};E.subscribe({event:"render_startUp",listener:tu});function tu(t){let e=document.querySelector("#app");e.innerHTML="";let n=b("div","","startUpContainer");e.append(n);let r=b("h2","gameTitle");r.textContent="Dåd på kungens hörna",n.append(r),E.publish({event:"render_component_startUp_form",detail:t})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mo=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},nu=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},go={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,u=c?t[s+2]:0,l=i>>2,h=(i&3)<<4|a>>4;let f=(a&15)<<2|u>>6,m=u&63;c||(m=64,o||(f=64)),r.push(n[l],n[h],n[f],n[m])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(mo(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):nu(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const u=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||a==null||u==null||h==null)throw new ru;const f=i<<2|a>>4;if(r.push(f),u!==64){const m=a<<4&240|u>>2;if(r.push(m),h!==64){const _=u<<6&192|h;r.push(_)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class ru extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const su=function(t){const e=mo(t);return go.encodeByteArray(e,!0)},En=function(t){return su(t).replace(/\./g,"")},iu=function(t){try{return go.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ou(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const au=()=>ou().__FIREBASE_DEFAULTS__,cu=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},uu=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&iu(t[1]);return e&&JSON.parse(e)},yo=()=>{try{return au()||cu()||uu()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},lu=t=>{var e,n;return(n=(e=yo())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},hu=t=>{const e=lu(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},du=()=>{var t;return(t=yo())===null||t===void 0?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fu{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pu(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t),a="";return[En(JSON.stringify(n)),En(JSON.stringify(o)),a].join(".")}function mu(){try{return typeof indexedDB=="object"}catch{return!1}}function gu(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yu="FirebaseError";class ct extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=yu,Object.setPrototypeOf(this,ct.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,vo.prototype.create)}}class vo{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?vu(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new ct(s,a,r)}}function vu(t,e){return t.replace(wu,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const wu=/\{\$([^}]+)}/g;function Lr(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(ui(i)&&ui(o)){if(!Lr(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function ui(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(t){return t&&t._delegate?t._delegate:t}class Nt{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Me="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new fu;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Iu(e))try{this.getOrInitializeService({instanceIdentifier:Me})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Me){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Me){return this.instances.has(e)}getOptions(e=Me){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:bu(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Me){return this.component?this.component.multipleInstances?e:Me:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function bu(t){return t===Me?void 0:t}function Iu(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tu{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Eu(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var x;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(x||(x={}));const Su={debug:x.DEBUG,verbose:x.VERBOSE,info:x.INFO,warn:x.WARN,error:x.ERROR,silent:x.SILENT},Cu=x.INFO,_u={[x.DEBUG]:"log",[x.VERBOSE]:"log",[x.INFO]:"info",[x.WARN]:"warn",[x.ERROR]:"error"},Du=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=_u[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class wo{constructor(e){this.name=e,this._logLevel=Cu,this._logHandler=Du,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in x))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Su[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,x.DEBUG,...e),this._logHandler(this,x.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,x.VERBOSE,...e),this._logHandler(this,x.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,x.INFO,...e),this._logHandler(this,x.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,x.WARN,...e),this._logHandler(this,x.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,x.ERROR,...e),this._logHandler(this,x.ERROR,...e)}}const Au=(t,e)=>e.some(n=>t instanceof n);let li,hi;function ku(){return li||(li=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Nu(){return hi||(hi=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Eo=new WeakMap,Rr=new WeakMap,bo=new WeakMap,gr=new WeakMap,ls=new WeakMap;function xu(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Se(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Eo.set(n,t)}).catch(()=>{}),ls.set(e,t),e}function Lu(t){if(Rr.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Rr.set(t,e)}let Mr={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Rr.get(t);if(e==="objectStoreNames")return t.objectStoreNames||bo.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Se(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Ru(t){Mr=t(Mr)}function Mu(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(yr(this),e,...n);return bo.set(r,e.sort?e.sort():[e]),Se(r)}:Nu().includes(t)?function(...e){return t.apply(yr(this),e),Se(Eo.get(this))}:function(...e){return Se(t.apply(yr(this),e))}}function Ou(t){return typeof t=="function"?Mu(t):(t instanceof IDBTransaction&&Lu(t),Au(t,ku())?new Proxy(t,Mr):t)}function Se(t){if(t instanceof IDBRequest)return xu(t);if(gr.has(t))return gr.get(t);const e=Ou(t);return e!==t&&(gr.set(t,e),ls.set(e,t)),e}const yr=t=>ls.get(t);function Pu(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=Se(o);return r&&o.addEventListener("upgradeneeded",c=>{r(Se(o.result),c.oldVersion,c.newVersion,Se(o.transaction))}),n&&o.addEventListener("blocked",()=>n()),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",()=>s())}).catch(()=>{}),a}const Fu=["get","getKey","getAll","getAllKeys","count"],Uu=["put","add","delete","clear"],vr=new Map;function di(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(vr.get(e))return vr.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Uu.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Fu.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let u=c.store;return r&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),s&&c.done]))[0]};return vr.set(e,i),i}Ru(t=>({...t,get:(e,n,r)=>di(e,n)||t.get(e,n,r),has:(e,n)=>!!di(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Bu(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Bu(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Or="@firebase/app",fi="0.9.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Be=new wo("@firebase/app"),$u="@firebase/app-compat",qu="@firebase/analytics-compat",ju="@firebase/analytics",zu="@firebase/app-check-compat",Gu="@firebase/app-check",Hu="@firebase/auth",Ku="@firebase/auth-compat",Wu="@firebase/database",Qu="@firebase/database-compat",Yu="@firebase/functions",Xu="@firebase/functions-compat",Ju="@firebase/installations",Zu="@firebase/installations-compat",el="@firebase/messaging",tl="@firebase/messaging-compat",nl="@firebase/performance",rl="@firebase/performance-compat",sl="@firebase/remote-config",il="@firebase/remote-config-compat",ol="@firebase/storage",al="@firebase/storage-compat",cl="@firebase/firestore",ul="@firebase/firestore-compat",ll="firebase",hl="9.19.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pr="[DEFAULT]",dl={[Or]:"fire-core",[$u]:"fire-core-compat",[ju]:"fire-analytics",[qu]:"fire-analytics-compat",[Gu]:"fire-app-check",[zu]:"fire-app-check-compat",[Hu]:"fire-auth",[Ku]:"fire-auth-compat",[Wu]:"fire-rtdb",[Qu]:"fire-rtdb-compat",[Yu]:"fire-fn",[Xu]:"fire-fn-compat",[Ju]:"fire-iid",[Zu]:"fire-iid-compat",[el]:"fire-fcm",[tl]:"fire-fcm-compat",[nl]:"fire-perf",[rl]:"fire-perf-compat",[sl]:"fire-rc",[il]:"fire-rc-compat",[ol]:"fire-gcs",[al]:"fire-gcs-compat",[cl]:"fire-fst",[ul]:"fire-fst-compat","fire-js":"fire-js",[ll]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bn=new Map,Fr=new Map;function fl(t,e){try{t.container.addComponent(e)}catch(n){Be.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function In(t){const e=t.name;if(Fr.has(e))return Be.debug(`There were multiple attempts to register component ${e}.`),!1;Fr.set(e,t);for(const n of bn.values())fl(n,t);return!0}function pl(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ml={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},Ce=new vo("app","Firebase",ml);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Nt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ce.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yl=hl;function Io(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Pr,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Ce.create("bad-app-name",{appName:String(s)});if(n||(n=du()),!n)throw Ce.create("no-options");const i=bn.get(s);if(i){if(Lr(n,i.options)&&Lr(r,i.config))return i;throw Ce.create("duplicate-app",{appName:s})}const o=new Tu(s);for(const c of Fr.values())o.addComponent(c);const a=new gl(n,r,o);return bn.set(s,a),a}function vl(t=Pr){const e=bn.get(t);if(!e&&t===Pr)return Io();if(!e)throw Ce.create("no-app",{appName:t});return e}function Ye(t,e,n){var r;let s=(r=dl[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${s}" with version "${e}":`];i&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Be.warn(a.join(" "));return}In(new Nt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wl="firebase-heartbeat-database",El=1,xt="firebase-heartbeat-store";let wr=null;function To(){return wr||(wr=Pu(wl,El,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(xt)}}}).catch(t=>{throw Ce.create("idb-open",{originalErrorMessage:t.message})})),wr}async function bl(t){try{return(await To()).transaction(xt).objectStore(xt).get(So(t))}catch(e){if(e instanceof ct)Be.warn(e.message);else{const n=Ce.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Be.warn(n.message)}}}async function pi(t,e){try{const r=(await To()).transaction(xt,"readwrite");return await r.objectStore(xt).put(e,So(t)),r.done}catch(n){if(n instanceof ct)Be.warn(n.message);else{const r=Ce.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Be.warn(r.message)}}}function So(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Il=1024,Tl=30*24*60*60*1e3;class Sl{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new _l(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=mi();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{const i=new Date(s.date).valueOf();return Date.now()-i<=Tl}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=mi(),{heartbeatsToSend:n,unsentEntries:r}=Cl(this._heartbeatsCache.heartbeats),s=En(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}}function mi(){return new Date().toISOString().substring(0,10)}function Cl(t,e=Il){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),gi(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),gi(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class _l{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return mu()?gu().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await bl(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return pi(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return pi(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function gi(t){return En(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dl(t){In(new Nt("platform-logger",e=>new Vu(e),"PRIVATE")),In(new Nt("heartbeat",e=>new Sl(e),"PRIVATE")),Ye(Or,fi,t),Ye(Or,fi,"esm2017"),Ye("fire-js","")}Dl("");var Al="firebase",kl="9.19.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ye(Al,kl,"app");const Nl="AIzaSyCl99vq9iVGVNJGQ-4QuAB3Nz_T4eBSFdk",xl="murder-mystery-malmo.firebaseapp.com",Ll="murder-mystery-malmo",Rl="murder-mystery-malmo.appspot.com",Ml="878905522965",Ol="1:878905522965:web:857232b6151d0fc377871c",Pl={apiKey:Nl,authDomain:xl,projectId:Ll,storageBucket:Rl,messagingSenderId:Ml,appId:Ol},Fl=Io(Pl);var Ul=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},y,hs=hs||{},T=Ul||self;function Tn(){}function Vn(t){var e=typeof t;return e=e!="object"?e:t?Array.isArray(t)?"array":e:"null",e=="array"||e=="object"&&typeof t.length=="number"}function jt(t){var e=typeof t;return e=="object"&&t!=null||e=="function"}function Vl(t){return Object.prototype.hasOwnProperty.call(t,Er)&&t[Er]||(t[Er]=++Bl)}var Er="closure_uid_"+(1e9*Math.random()>>>0),Bl=0;function $l(t,e,n){return t.call.apply(t.bind,arguments)}function ql(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var s=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(s,r),t.apply(e,s)}}return function(){return t.apply(e,arguments)}}function Z(t,e,n){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?Z=$l:Z=ql,Z.apply(null,arguments)}function cn(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var r=n.slice();return r.push.apply(r,arguments),t.apply(this,r)}}function W(t,e){function n(){}n.prototype=e.prototype,t.X=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Wb=function(r,s,i){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[s].apply(r,o)}}function xe(){this.s=this.s,this.o=this.o}var jl=0;xe.prototype.s=!1;xe.prototype.na=function(){!this.s&&(this.s=!0,this.M(),jl!=0)&&Vl(this)};xe.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const Co=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if(typeof t=="string")return typeof e!="string"||e.length!=1?-1:t.indexOf(e,0);for(let n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1};function ds(t){const e=t.length;if(0<e){const n=Array(e);for(let r=0;r<e;r++)n[r]=t[r];return n}return[]}function yi(t,e){for(let n=1;n<arguments.length;n++){const r=arguments[n];if(Vn(r)){const s=t.length||0,i=r.length||0;t.length=s+i;for(let o=0;o<i;o++)t[s+o]=r[o]}else t.push(r)}}function ee(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}ee.prototype.h=function(){this.defaultPrevented=!0};var zl=function(){if(!T.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{T.addEventListener("test",Tn,e),T.removeEventListener("test",Tn,e)}catch{}return t}();function Sn(t){return/^[\s\xa0]*$/.test(t)}var vi=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function br(t,e){return t<e?-1:t>e?1:0}function Bn(){var t=T.navigator;return t&&(t=t.userAgent)?t:""}function he(t){return Bn().indexOf(t)!=-1}function fs(t){return fs[" "](t),t}fs[" "]=Tn;function Gl(t){var e=Wl;return Object.prototype.hasOwnProperty.call(e,9)?e[9]:e[9]=t(9)}var Hl=he("Opera"),Ze=he("Trident")||he("MSIE"),_o=he("Edge"),Ur=_o||Ze,Do=he("Gecko")&&!(Bn().toLowerCase().indexOf("webkit")!=-1&&!he("Edge"))&&!(he("Trident")||he("MSIE"))&&!he("Edge"),Kl=Bn().toLowerCase().indexOf("webkit")!=-1&&!he("Edge");function Ao(){var t=T.document;return t?t.documentMode:void 0}var Cn;e:{var Ir="",Tr=function(){var t=Bn();if(Do)return/rv:([^\);]+)(\)|;)/.exec(t);if(_o)return/Edge\/([\d\.]+)/.exec(t);if(Ze)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t);if(Kl)return/WebKit\/(\S+)/.exec(t);if(Hl)return/(?:Version)[ \/]?(\S+)/.exec(t)}();if(Tr&&(Ir=Tr?Tr[1]:""),Ze){var Sr=Ao();if(Sr!=null&&Sr>parseFloat(Ir)){Cn=String(Sr);break e}}Cn=Ir}var Wl={};function Ql(){return Gl(function(){let t=0;const e=vi(String(Cn)).split("."),n=vi("9").split("."),r=Math.max(e.length,n.length);for(let o=0;t==0&&o<r;o++){var s=e[o]||"",i=n[o]||"";do{if(s=/(\d*)(\D*)(.*)/.exec(s)||["","","",""],i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],s[0].length==0&&i[0].length==0)break;t=br(s[1].length==0?0:parseInt(s[1],10),i[1].length==0?0:parseInt(i[1],10))||br(s[2].length==0,i[2].length==0)||br(s[2],i[2]),s=s[3],i=i[3]}while(t==0)}return 0<=t})}var Vr;if(T.document&&Ze){var wi=Ao();Vr=wi||parseInt(Cn,10)||void 0}else Vr=void 0;var Yl=Vr;function Lt(t,e){if(ee.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(Do){e:{try{fs(e.nodeName);var s=!0;break e}catch{}s=!1}s||(e=null)}}else n=="mouseover"?e=t.fromElement:n=="mouseout"&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:Xl[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&Lt.X.h.call(this)}}W(Lt,ee);var Xl={2:"touch",3:"pen",4:"mouse"};Lt.prototype.h=function(){Lt.X.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var zt="closure_listenable_"+(1e6*Math.random()|0),Jl=0;function Zl(t,e,n,r,s){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.ha=s,this.key=++Jl,this.ba=this.ea=!1}function $n(t){t.ba=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function ps(t,e,n){for(const r in t)e.call(n,t[r],r,t)}function ko(t){const e={};for(const n in t)e[n]=t[n];return e}const Ei="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function No(t,e){let n,r;for(let s=1;s<arguments.length;s++){r=arguments[s];for(n in r)t[n]=r[n];for(let i=0;i<Ei.length;i++)n=Ei[i],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function qn(t){this.src=t,this.g={},this.h=0}qn.prototype.add=function(t,e,n,r,s){var i=t.toString();t=this.g[i],t||(t=this.g[i]=[],this.h++);var o=$r(t,e,r,s);return-1<o?(e=t[o],n||(e.ea=!1)):(e=new Zl(e,this.src,i,!!r,s),e.ea=n,t.push(e)),e};function Br(t,e){var n=e.type;if(n in t.g){var r=t.g[n],s=Co(r,e),i;(i=0<=s)&&Array.prototype.splice.call(r,s,1),i&&($n(e),t.g[n].length==0&&(delete t.g[n],t.h--))}}function $r(t,e,n,r){for(var s=0;s<t.length;++s){var i=t[s];if(!i.ba&&i.listener==e&&i.capture==!!n&&i.ha==r)return s}return-1}var ms="closure_lm_"+(1e6*Math.random()|0),Cr={};function xo(t,e,n,r,s){if(r&&r.once)return Ro(t,e,n,r,s);if(Array.isArray(e)){for(var i=0;i<e.length;i++)xo(t,e[i],n,r,s);return null}return n=vs(n),t&&t[zt]?t.N(e,n,jt(r)?!!r.capture:!!r,s):Lo(t,e,n,!1,r,s)}function Lo(t,e,n,r,s,i){if(!e)throw Error("Invalid event type");var o=jt(s)?!!s.capture:!!s,a=ys(t);if(a||(t[ms]=a=new qn(t)),n=a.add(e,n,r,o,i),n.proxy)return n;if(r=eh(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)zl||(s=o),s===void 0&&(s=!1),t.addEventListener(e.toString(),r,s);else if(t.attachEvent)t.attachEvent(Oo(e.toString()),r);else if(t.addListener&&t.removeListener)t.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return n}function eh(){function t(n){return e.call(t.src,t.listener,n)}const e=th;return t}function Ro(t,e,n,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)Ro(t,e[i],n,r,s);return null}return n=vs(n),t&&t[zt]?t.O(e,n,jt(r)?!!r.capture:!!r,s):Lo(t,e,n,!0,r,s)}function Mo(t,e,n,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)Mo(t,e[i],n,r,s);else r=jt(r)?!!r.capture:!!r,n=vs(n),t&&t[zt]?(t=t.i,e=String(e).toString(),e in t.g&&(i=t.g[e],n=$r(i,n,r,s),-1<n&&($n(i[n]),Array.prototype.splice.call(i,n,1),i.length==0&&(delete t.g[e],t.h--)))):t&&(t=ys(t))&&(e=t.g[e.toString()],t=-1,e&&(t=$r(e,n,r,s)),(n=-1<t?e[t]:null)&&gs(n))}function gs(t){if(typeof t!="number"&&t&&!t.ba){var e=t.src;if(e&&e[zt])Br(e.i,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(Oo(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=ys(e))?(Br(n,t),n.h==0&&(n.src=null,e[ms]=null)):$n(t)}}}function Oo(t){return t in Cr?Cr[t]:Cr[t]="on"+t}function th(t,e){if(t.ba)t=!0;else{e=new Lt(e,this);var n=t.listener,r=t.ha||t.src;t.ea&&gs(t),t=n.call(r,e)}return t}function ys(t){return t=t[ms],t instanceof qn?t:null}var _r="__closure_events_fn_"+(1e9*Math.random()>>>0);function vs(t){return typeof t=="function"?t:(t[_r]||(t[_r]=function(e){return t.handleEvent(e)}),t[_r])}function G(){xe.call(this),this.i=new qn(this),this.P=this,this.I=null}W(G,xe);G.prototype[zt]=!0;G.prototype.removeEventListener=function(t,e,n,r){Mo(this,t,e,n,r)};function K(t,e){var n,r=t.I;if(r)for(n=[];r;r=r.I)n.push(r);if(t=t.P,r=e.type||e,typeof e=="string")e=new ee(e,t);else if(e instanceof ee)e.target=e.target||t;else{var s=e;e=new ee(r,t),No(e,s)}if(s=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];s=un(o,r,!0,e)&&s}if(o=e.g=t,s=un(o,r,!0,e)&&s,s=un(o,r,!1,e)&&s,n)for(i=0;i<n.length;i++)o=e.g=n[i],s=un(o,r,!1,e)&&s}G.prototype.M=function(){if(G.X.M.call(this),this.i){var t=this.i,e;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)$n(n[r]);delete t.g[e],t.h--}}this.I=null};G.prototype.N=function(t,e,n,r){return this.i.add(String(t),e,!1,n,r)};G.prototype.O=function(t,e,n,r){return this.i.add(String(t),e,!0,n,r)};function un(t,e,n,r){if(e=t.i.g[String(e)],!e)return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.ba&&o.capture==n){var a=o.listener,c=o.ha||o.src;o.ea&&Br(t.i,o),s=a.call(c,r)!==!1&&s}}return s&&!r.defaultPrevented}var ws=T.JSON.stringify;function nh(){var t=Uo;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}class rh{constructor(){this.h=this.g=null}add(e,n){const r=Po.get();r.set(e,n),this.h?this.h.next=r:this.g=r,this.h=r}}var Po=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}(()=>new sh,t=>t.reset());class sh{constructor(){this.next=this.g=this.h=null}set(e,n){this.h=e,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}function ih(t){T.setTimeout(()=>{throw t},0)}function Fo(t,e){qr||oh(),jr||(qr(),jr=!0),Uo.add(t,e)}var qr;function oh(){var t=T.Promise.resolve(void 0);qr=function(){t.then(ah)}}var jr=!1,Uo=new rh;function ah(){for(var t;t=nh();){try{t.h.call(t.g)}catch(n){ih(n)}var e=Po;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}jr=!1}function jn(t,e){G.call(this),this.h=t||1,this.g=e||T,this.j=Z(this.lb,this),this.l=Date.now()}W(jn,G);y=jn.prototype;y.ca=!1;y.R=null;y.lb=function(){if(this.ca){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.R=this.g.setTimeout(this.j,this.h-t):(this.R&&(this.g.clearTimeout(this.R),this.R=null),K(this,"tick"),this.ca&&(Es(this),this.start()))}};y.start=function(){this.ca=!0,this.R||(this.R=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function Es(t){t.ca=!1,t.R&&(t.g.clearTimeout(t.R),t.R=null)}y.M=function(){jn.X.M.call(this),Es(this),delete this.g};function bs(t,e,n){if(typeof t=="function")n&&(t=Z(t,n));else if(t&&typeof t.handleEvent=="function")t=Z(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:T.setTimeout(t,e||0)}function Vo(t){t.g=bs(()=>{t.g=null,t.i&&(t.i=!1,Vo(t))},t.j);const e=t.h;t.h=null,t.m.apply(null,e)}class ch extends xe{constructor(e,n){super(),this.m=e,this.j=n,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:Vo(this)}M(){super.M(),this.g&&(T.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Rt(t){xe.call(this),this.h=t,this.g={}}W(Rt,xe);var bi=[];function Bo(t,e,n,r){Array.isArray(n)||(n&&(bi[0]=n.toString()),n=bi);for(var s=0;s<n.length;s++){var i=xo(e,n[s],r||t.handleEvent,!1,t.h||t);if(!i)break;t.g[i.key]=i}}function $o(t){ps(t.g,function(e,n){this.g.hasOwnProperty(n)&&gs(e)},t),t.g={}}Rt.prototype.M=function(){Rt.X.M.call(this),$o(this)};Rt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function zn(){this.g=!0}zn.prototype.Aa=function(){this.g=!1};function uh(t,e,n,r,s,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var l=u[0];u=u[1];var h=l.split("_");o=2<=h.length&&h[1]=="type"?o+(l+"="+u+"&"):o+(l+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+`
`+n+`
`+o})}function lh(t,e,n,r,s,i,o){t.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+`
`+n+`
`+i+" "+o})}function Qe(t,e,n,r){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+dh(t,n)+(r?" "+r:"")})}function hh(t,e){t.info(function(){return"TIMEOUT: "+e})}zn.prototype.info=function(){};function dh(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n){for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if(i!="noop"&&i!="stop"&&i!="close")for(var o=1;o<s.length;o++)s[o]=""}}}}return ws(n)}catch{return e}}var je={},Ii=null;function Gn(){return Ii=Ii||new G}je.Pa="serverreachability";function qo(t){ee.call(this,je.Pa,t)}W(qo,ee);function Mt(t){const e=Gn();K(e,new qo(e))}je.STAT_EVENT="statevent";function jo(t,e){ee.call(this,je.STAT_EVENT,t),this.stat=e}W(jo,ee);function re(t){const e=Gn();K(e,new jo(e,t))}je.Qa="timingevent";function zo(t,e){ee.call(this,je.Qa,t),this.size=e}W(zo,ee);function Gt(t,e){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return T.setTimeout(function(){t()},e)}var Hn={NO_ERROR:0,mb:1,zb:2,yb:3,tb:4,xb:5,Ab:6,Ma:7,TIMEOUT:8,Db:9},Go={rb:"complete",Nb:"success",Na:"error",Ma:"abort",Fb:"ready",Gb:"readystatechange",TIMEOUT:"timeout",Bb:"incrementaldata",Eb:"progress",ub:"downloadprogress",Vb:"uploadprogress"};function Is(){}Is.prototype.h=null;function Ti(t){return t.h||(t.h=t.i())}function Ho(){}var Ht={OPEN:"a",qb:"b",Na:"c",Cb:"d"};function Ts(){ee.call(this,"d")}W(Ts,ee);function Ss(){ee.call(this,"c")}W(Ss,ee);var zr;function Kn(){}W(Kn,Is);Kn.prototype.g=function(){return new XMLHttpRequest};Kn.prototype.i=function(){return{}};zr=new Kn;function Kt(t,e,n,r){this.l=t,this.j=e,this.m=n,this.U=r||1,this.S=new Rt(this),this.O=fh,t=Ur?125:void 0,this.T=new jn(t),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.V=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.Y=-1,this.I=!1,this.N=0,this.L=null,this.$=this.J=this.Z=this.P=!1,this.h=new Ko}function Ko(){this.i=null,this.g="",this.h=!1}var fh=45e3,Gr={},_n={};y=Kt.prototype;y.setTimeout=function(t){this.O=t};function Hr(t,e,n){t.K=1,t.v=Qn(we(e)),t.s=n,t.P=!0,Wo(t,null)}function Wo(t,e){t.F=Date.now(),Wt(t),t.A=we(t.v);var n=t.A,r=t.U;Array.isArray(r)||(r=[String(r)]),na(n.i,"t",r),t.C=0,n=t.l.H,t.h=new Ko,t.g=Ta(t.l,n?e:null,!t.s),0<t.N&&(t.L=new ch(Z(t.La,t,t.g),t.N)),Bo(t.S,t.g,"readystatechange",t.ib),e=t.H?ko(t.H):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.da(t.A,t.u,t.s,e)):(t.u="GET",t.g.da(t.A,t.u,null,e)),Mt(),uh(t.j,t.u,t.A,t.m,t.U,t.s)}y.ib=function(t){t=t.target;const e=this.L;e&&ge(t)==3?e.l():this.La(t)};y.La=function(t){try{if(t==this.g)e:{const l=ge(this.g);var e=this.g.Ea();const h=this.g.aa();if(!(3>l)&&(l!=3||Ur||this.g&&(this.h.h||this.g.fa()||Di(this.g)))){this.I||l!=4||e==7||(e==8||0>=h?Mt(3):Mt(2)),Wn(this);var n=this.g.aa();this.Y=n;t:if(Qo(this)){var r=Di(this.g);t="";var s=r.length,i=ge(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Oe(this),Ct(this);var o="";break t}this.h.i=new T.TextDecoder}for(e=0;e<s;e++)this.h.h=!0,t+=this.h.i.decode(r[e],{stream:i&&e==s-1});r.splice(0,s),this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.fa();if(this.i=n==200,lh(this.j,this.u,this.A,this.m,this.U,l,n),this.i){if(this.Z&&!this.J){t:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Sn(a)){var u=a;break t}}u=null}if(n=u)Qe(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,Kr(this,n);else{this.i=!1,this.o=3,re(12),Oe(this),Ct(this);break e}}this.P?(Yo(this,l,o),Ur&&this.i&&l==3&&(Bo(this.S,this.T,"tick",this.hb),this.T.start())):(Qe(this.j,this.m,o,null),Kr(this,o)),l==4&&Oe(this),this.i&&!this.I&&(l==4?wa(this.l,this):(this.i=!1,Wt(this)))}else n==400&&0<o.indexOf("Unknown SID")?(this.o=3,re(12)):(this.o=0,re(13)),Oe(this),Ct(this)}}}catch{}finally{}};function Qo(t){return t.g?t.u=="GET"&&t.K!=2&&t.l.Da:!1}function Yo(t,e,n){let r=!0,s;for(;!t.I&&t.C<n.length;)if(s=ph(t,n),s==_n){e==4&&(t.o=4,re(14),r=!1),Qe(t.j,t.m,null,"[Incomplete Response]");break}else if(s==Gr){t.o=4,re(15),Qe(t.j,t.m,n,"[Invalid Chunk]"),r=!1;break}else Qe(t.j,t.m,s,null),Kr(t,s);Qo(t)&&s!=_n&&s!=Gr&&(t.h.g="",t.C=0),e!=4||n.length!=0||t.h.h||(t.o=1,re(16),r=!1),t.i=t.i&&r,r?0<n.length&&!t.$&&(t.$=!0,e=t.l,e.g==t&&e.$&&!e.K&&(e.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),xs(e),e.K=!0,re(11))):(Qe(t.j,t.m,n,"[Invalid Chunked Response]"),Oe(t),Ct(t))}y.hb=function(){if(this.g){var t=ge(this.g),e=this.g.fa();this.C<e.length&&(Wn(this),Yo(this,t,e),this.i&&t!=4&&Wt(this))}};function ph(t,e){var n=t.C,r=e.indexOf(`
`,n);return r==-1?_n:(n=Number(e.substring(n,r)),isNaN(n)?Gr:(r+=1,r+n>e.length?_n:(e=e.substr(r,n),t.C=r+n,e)))}y.cancel=function(){this.I=!0,Oe(this)};function Wt(t){t.V=Date.now()+t.O,Xo(t,t.O)}function Xo(t,e){if(t.B!=null)throw Error("WatchDog timer not null");t.B=Gt(Z(t.gb,t),e)}function Wn(t){t.B&&(T.clearTimeout(t.B),t.B=null)}y.gb=function(){this.B=null;const t=Date.now();0<=t-this.V?(hh(this.j,this.A),this.K!=2&&(Mt(),re(17)),Oe(this),this.o=2,Ct(this)):Xo(this,this.V-t)};function Ct(t){t.l.G==0||t.I||wa(t.l,t)}function Oe(t){Wn(t);var e=t.L;e&&typeof e.na=="function"&&e.na(),t.L=null,Es(t.T),$o(t.S),t.g&&(e=t.g,t.g=null,e.abort(),e.na())}function Kr(t,e){try{var n=t.l;if(n.G!=0&&(n.g==t||Wr(n.h,t))){if(!t.J&&Wr(n.h,t)&&n.G==3){try{var r=n.Fa.g.parse(e)}catch{r=null}if(Array.isArray(r)&&r.length==3){var s=r;if(s[0]==0){e:if(!n.u){if(n.g)if(n.g.F+3e3<t.F)kn(n),Jn(n);else break e;Ns(n),re(18)}}else n.Ba=s[1],0<n.Ba-n.T&&37500>s[2]&&n.L&&n.A==0&&!n.v&&(n.v=Gt(Z(n.cb,n),6e3));if(1>=ia(n.h)&&n.ja){try{n.ja()}catch{}n.ja=void 0}}else Pe(n,11)}else if((t.J||n.g==t)&&kn(n),!Sn(e))for(s=n.Fa.g.parse(e),e=0;e<s.length;e++){let u=s[e];if(n.T=u[0],u=u[1],n.G==2)if(u[0]=="c"){n.I=u[1],n.ka=u[2];const l=u[3];l!=null&&(n.ma=l,n.j.info("VER="+n.ma));const h=u[4];h!=null&&(n.Ca=h,n.j.info("SVER="+n.Ca));const f=u[5];f!=null&&typeof f=="number"&&0<f&&(r=1.5*f,n.J=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const m=t.g;if(m){const _=m.g?m.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(_){var i=r.h;i.g||_.indexOf("spdy")==-1&&_.indexOf("quic")==-1&&_.indexOf("h2")==-1||(i.j=i.l,i.g=new Set,i.h&&(Cs(i,i.h),i.h=null))}if(r.D){const S=m.g?m.g.getResponseHeader("X-HTTP-Session-Id"):null;S&&(r.za=S,P(r.F,r.D,S))}}n.G=3,n.l&&n.l.xa(),n.$&&(n.P=Date.now()-t.F,n.j.info("Handshake RTT: "+n.P+"ms")),r=n;var o=t;if(r.sa=Ia(r,r.H?r.ka:null,r.V),o.J){oa(r.h,o);var a=o,c=r.J;c&&a.setTimeout(c),a.B&&(Wn(a),Wt(a)),r.g=o}else ya(r);0<n.i.length&&Zn(n)}else u[0]!="stop"&&u[0]!="close"||Pe(n,7);else n.G==3&&(u[0]=="stop"||u[0]=="close"?u[0]=="stop"?Pe(n,7):ks(n):u[0]!="noop"&&n.l&&n.l.wa(u),n.A=0)}}Mt(4)}catch{}}function mh(t){if(t.W&&typeof t.W=="function")return t.W();if(typeof Map<"u"&&t instanceof Map||typeof Set<"u"&&t instanceof Set)return Array.from(t.values());if(typeof t=="string")return t.split("");if(Vn(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}e=[],n=0;for(r in t)e[n++]=t[r];return e}function gh(t){if(t.oa&&typeof t.oa=="function")return t.oa();if(!t.W||typeof t.W!="function"){if(typeof Map<"u"&&t instanceof Map)return Array.from(t.keys());if(!(typeof Set<"u"&&t instanceof Set)){if(Vn(t)||typeof t=="string"){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const r in t)e[n++]=r;return e}}}function Jo(t,e){if(t.forEach&&typeof t.forEach=="function")t.forEach(e,void 0);else if(Vn(t)||typeof t=="string")Array.prototype.forEach.call(t,e,void 0);else for(var n=gh(t),r=mh(t),s=r.length,i=0;i<s;i++)e.call(void 0,r[i],n&&n[i],t)}var Zo=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function yh(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),s=null;if(0<=r){var i=t[n].substring(0,r);s=t[n].substring(r+1)}else i=t[n];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}function Ue(t,e){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,t instanceof Ue){this.h=e!==void 0?e:t.h,Dn(this,t.j),this.s=t.s,this.g=t.g,An(this,t.m),this.l=t.l,e=t.i;var n=new Ot;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),Si(this,n),this.o=t.o}else t&&(n=String(t).match(Zo))?(this.h=!!e,Dn(this,n[1]||"",!0),this.s=bt(n[2]||""),this.g=bt(n[3]||"",!0),An(this,n[4]),this.l=bt(n[5]||"",!0),Si(this,n[6]||"",!0),this.o=bt(n[7]||"")):(this.h=!!e,this.i=new Ot(null,this.h))}Ue.prototype.toString=function(){var t=[],e=this.j;e&&t.push(It(e,Ci,!0),":");var n=this.g;return(n||e=="file")&&(t.push("//"),(e=this.s)&&t.push(It(e,Ci,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,n!=null&&t.push(":",String(n))),(n=this.l)&&(this.g&&n.charAt(0)!="/"&&t.push("/"),t.push(It(n,n.charAt(0)=="/"?Eh:wh,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.o)&&t.push("#",It(n,Ih)),t.join("")};function we(t){return new Ue(t)}function Dn(t,e,n){t.j=n?bt(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function An(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function Si(t,e,n){e instanceof Ot?(t.i=e,Th(t.i,t.h)):(n||(e=It(e,bh)),t.i=new Ot(e,t.h))}function P(t,e,n){t.i.set(e,n)}function Qn(t){return P(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function bt(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function It(t,e,n){return typeof t=="string"?(t=encodeURI(t).replace(e,vh),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function vh(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var Ci=/[#\/\?@]/g,wh=/[#\?:]/g,Eh=/[#\?]/g,bh=/[#\?@]/g,Ih=/#/g;function Ot(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function Le(t){t.g||(t.g=new Map,t.h=0,t.i&&yh(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}y=Ot.prototype;y.add=function(t,e){Le(this),this.i=null,t=ut(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this};function ea(t,e){Le(t),e=ut(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function ta(t,e){return Le(t),e=ut(t,e),t.g.has(e)}y.forEach=function(t,e){Le(this),this.g.forEach(function(n,r){n.forEach(function(s){t.call(e,s,r,this)},this)},this)};y.oa=function(){Le(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let r=0;r<e.length;r++){const s=t[r];for(let i=0;i<s.length;i++)n.push(e[r])}return n};y.W=function(t){Le(this);let e=[];if(typeof t=="string")ta(this,t)&&(e=e.concat(this.g.get(ut(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e};y.set=function(t,e){return Le(this),this.i=null,t=ut(this,t),ta(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this};y.get=function(t,e){return t?(t=this.W(t),0<t.length?String(t[0]):e):e};function na(t,e,n){ea(t,e),0<n.length&&(t.i=null,t.g.set(ut(t,e),ds(n)),t.h+=n.length)}y.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var r=e[n];const i=encodeURIComponent(String(r)),o=this.W(r);for(r=0;r<o.length;r++){var s=i;o[r]!==""&&(s+="="+encodeURIComponent(String(o[r]))),t.push(s)}}return this.i=t.join("&")};function ut(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function Th(t,e){e&&!t.j&&(Le(t),t.i=null,t.g.forEach(function(n,r){var s=r.toLowerCase();r!=s&&(ea(this,r),na(this,s,n))},t)),t.j=e}var Sh=class{constructor(e,n){this.h=e,this.g=n}};function ra(t){this.l=t||Ch,T.PerformanceNavigationTiming?(t=T.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(T.g&&T.g.Ga&&T.g.Ga()&&T.g.Ga().$b),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Ch=10;function sa(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function ia(t){return t.h?1:t.g?t.g.size:0}function Wr(t,e){return t.h?t.h==e:t.g?t.g.has(e):!1}function Cs(t,e){t.g?t.g.add(e):t.h=e}function oa(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}ra.prototype.cancel=function(){if(this.i=aa(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function aa(t){if(t.h!=null)return t.i.concat(t.h.D);if(t.g!=null&&t.g.size!==0){let e=t.i;for(const n of t.g.values())e=e.concat(n.D);return e}return ds(t.i)}function _s(){}_s.prototype.stringify=function(t){return T.JSON.stringify(t,void 0)};_s.prototype.parse=function(t){return T.JSON.parse(t,void 0)};function _h(){this.g=new _s}function Dh(t,e,n){const r=n||"";try{Jo(t,function(s,i){let o=s;jt(s)&&(o=ws(s)),e.push(r+i+"="+encodeURIComponent(o))})}catch(s){throw e.push(r+"type="+encodeURIComponent("_badmap")),s}}function Ah(t,e){const n=new zn;if(T.Image){const r=new Image;r.onload=cn(ln,n,r,"TestLoadImage: loaded",!0,e),r.onerror=cn(ln,n,r,"TestLoadImage: error",!1,e),r.onabort=cn(ln,n,r,"TestLoadImage: abort",!1,e),r.ontimeout=cn(ln,n,r,"TestLoadImage: timeout",!1,e),T.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=t}else e(!1)}function ln(t,e,n,r,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(r)}catch{}}function Qt(t){this.l=t.ac||null,this.j=t.jb||!1}W(Qt,Is);Qt.prototype.g=function(){return new Yn(this.l,this.j)};Qt.prototype.i=function(t){return function(){return t}}({});function Yn(t,e){G.call(this),this.D=t,this.u=e,this.m=void 0,this.readyState=Ds,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}W(Yn,G);var Ds=0;y=Yn.prototype;y.open=function(t,e){if(this.readyState!=Ds)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,Pt(this)};y.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||T).fetch(new Request(this.B,e)).then(this.Wa.bind(this),this.ga.bind(this))};y.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Yt(this)),this.readyState=Ds};y.Wa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,Pt(this)),this.g&&(this.readyState=3,Pt(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Ua.bind(this),this.ga.bind(this));else if(typeof T.ReadableStream<"u"&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;ca(this)}else t.text().then(this.Va.bind(this),this.ga.bind(this))};function ca(t){t.j.read().then(t.Ta.bind(t)).catch(t.ga.bind(t))}y.Ta=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?Yt(this):Pt(this),this.readyState==3&&ca(this)}};y.Va=function(t){this.g&&(this.response=this.responseText=t,Yt(this))};y.Ua=function(t){this.g&&(this.response=t,Yt(this))};y.ga=function(){this.g&&Yt(this)};function Yt(t){t.readyState=4,t.l=null,t.j=null,t.A=null,Pt(t)}y.setRequestHeader=function(t,e){this.v.append(t,e)};y.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""};y.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join(`\r
`)};function Pt(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(Yn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});var kh=T.JSON.parse;function F(t){G.call(this),this.headers=new Map,this.u=t||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=ua,this.K=this.L=!1}W(F,G);var ua="",Nh=/^https?$/i,xh=["POST","PUT"];y=F.prototype;y.Ka=function(t){this.L=t};y.da=function(t,e,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+t);e=e?e.toUpperCase():"GET",this.H=t,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():zr.g(),this.C=this.u?Ti(this.u):Ti(zr),this.g.onreadystatechange=Z(this.Ha,this);try{this.F=!0,this.g.open(e,String(t),!0),this.F=!1}catch(i){_i(this,i);return}if(t=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var s in r)n.set(s,r[s]);else if(typeof r.keys=="function"&&typeof r.get=="function")for(const i of r.keys())n.set(i,r.get(i));else throw Error("Unknown input type for opt_headers: "+String(r));r=Array.from(n.keys()).find(i=>i.toLowerCase()=="content-type"),s=T.FormData&&t instanceof T.FormData,!(0<=Co(xh,e))||r||s||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,o]of n)this.g.setRequestHeader(i,o);this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{da(this),0<this.B&&((this.K=Lh(this.g))?(this.g.timeout=this.B,this.g.ontimeout=Z(this.qa,this)):this.A=bs(this.qa,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(i){_i(this,i)}};function Lh(t){return Ze&&Ql()&&typeof t.timeout=="number"&&t.ontimeout!==void 0}y.qa=function(){typeof hs<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,K(this,"timeout"),this.abort(8))};function _i(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,la(t),Xn(t)}function la(t){t.D||(t.D=!0,K(t,"complete"),K(t,"error"))}y.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,K(this,"complete"),K(this,"abort"),Xn(this))};y.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Xn(this,!0)),F.X.M.call(this)};y.Ha=function(){this.s||(this.F||this.v||this.l?ha(this):this.fb())};y.fb=function(){ha(this)};function ha(t){if(t.h&&typeof hs<"u"&&(!t.C[1]||ge(t)!=4||t.aa()!=2)){if(t.v&&ge(t)==4)bs(t.Ha,0,t);else if(K(t,"readystatechange"),ge(t)==4){t.h=!1;try{const a=t.aa();e:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var n;if(!(n=e)){var r;if(r=a===0){var s=String(t.H).match(Zo)[1]||null;if(!s&&T.self&&T.self.location){var i=T.self.location.protocol;s=i.substr(0,i.length-1)}r=!Nh.test(s?s.toLowerCase():"")}n=r}if(n)K(t,"complete"),K(t,"success");else{t.m=6;try{var o=2<ge(t)?t.g.statusText:""}catch{o=""}t.j=o+" ["+t.aa()+"]",la(t)}}finally{Xn(t)}}}}function Xn(t,e){if(t.g){da(t);const n=t.g,r=t.C[0]?Tn:null;t.g=null,t.C=null,e||K(t,"ready");try{n.onreadystatechange=r}catch{}}}function da(t){t.g&&t.K&&(t.g.ontimeout=null),t.A&&(T.clearTimeout(t.A),t.A=null)}function ge(t){return t.g?t.g.readyState:0}y.aa=function(){try{return 2<ge(this)?this.g.status:-1}catch{return-1}};y.fa=function(){try{return this.g?this.g.responseText:""}catch{return""}};y.Sa=function(t){if(this.g){var e=this.g.responseText;return t&&e.indexOf(t)==0&&(e=e.substring(t.length)),kh(e)}};function Di(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.J){case ua:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}y.Ea=function(){return this.m};y.Oa=function(){return typeof this.j=="string"?this.j:String(this.j)};function fa(t){let e="";return ps(t,function(n,r){e+=r,e+=":",e+=n,e+=`\r
`}),e}function As(t,e,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=fa(n),typeof t=="string"?n!=null&&encodeURIComponent(String(n)):P(t,e,n))}function Et(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function pa(t){this.Ca=0,this.i=[],this.j=new zn,this.ka=this.sa=this.F=this.V=this.g=this.za=this.D=this.ia=this.o=this.S=this.s=null,this.ab=this.U=0,this.Za=Et("failFast",!1,t),this.L=this.v=this.u=this.m=this.l=null,this.Y=!0,this.pa=this.Ba=this.T=-1,this.Z=this.A=this.C=0,this.Xa=Et("baseRetryDelayMs",5e3,t),this.bb=Et("retryDelaySeedMs",1e4,t),this.$a=Et("forwardChannelMaxRetries",2,t),this.ta=Et("forwardChannelRequestTimeoutMs",2e4,t),this.ra=t&&t.xmlHttpFactory||void 0,this.Da=t&&t.Zb||!1,this.J=void 0,this.H=t&&t.supportsCrossDomainXhr||!1,this.I="",this.h=new ra(t&&t.concurrentRequestLimit),this.Fa=new _h,this.O=t&&t.fastHandshake||!1,this.N=t&&t.encodeInitMessageHeaders||!1,this.O&&this.N&&(this.N=!1),this.Ya=t&&t.Xb||!1,t&&t.Aa&&this.j.Aa(),t&&t.forceLongPolling&&(this.Y=!1),this.$=!this.O&&this.Y&&t&&t.detectBufferingProxy||!1,this.ja=void 0,this.P=0,this.K=!1,this.la=this.B=null}y=pa.prototype;y.ma=8;y.G=1;function ks(t){if(ma(t),t.G==3){var e=t.U++,n=we(t.F);P(n,"SID",t.I),P(n,"RID",e),P(n,"TYPE","terminate"),Xt(t,n),e=new Kt(t,t.j,e,void 0),e.K=2,e.v=Qn(we(n)),n=!1,T.navigator&&T.navigator.sendBeacon&&(n=T.navigator.sendBeacon(e.v.toString(),"")),!n&&T.Image&&(new Image().src=e.v,n=!0),n||(e.g=Ta(e.l,null),e.g.da(e.v)),e.F=Date.now(),Wt(e)}ba(t)}function Jn(t){t.g&&(xs(t),t.g.cancel(),t.g=null)}function ma(t){Jn(t),t.u&&(T.clearTimeout(t.u),t.u=null),kn(t),t.h.cancel(),t.m&&(typeof t.m=="number"&&T.clearTimeout(t.m),t.m=null)}function Zn(t){sa(t.h)||t.m||(t.m=!0,Fo(t.Ja,t),t.C=0)}function Rh(t,e){return ia(t.h)>=t.h.j-(t.m?1:0)?!1:t.m?(t.i=e.D.concat(t.i),!0):t.G==1||t.G==2||t.C>=(t.Za?0:t.$a)?!1:(t.m=Gt(Z(t.Ja,t,e),Ea(t,t.C)),t.C++,!0)}y.Ja=function(t){if(this.m)if(this.m=null,this.G==1){if(!t){this.U=Math.floor(1e5*Math.random()),t=this.U++;const s=new Kt(this,this.j,t,void 0);let i=this.s;if(this.S&&(i?(i=ko(i),No(i,this.S)):i=this.S),this.o!==null||this.N||(s.H=i,i=null),this.O)e:{for(var e=0,n=0;n<this.i.length;n++){t:{var r=this.i[n];if("__data__"in r.g&&(r=r.g.__data__,typeof r=="string")){r=r.length;break t}r=void 0}if(r===void 0)break;if(e+=r,4096<e){e=n;break e}if(e===4096||n===this.i.length-1){e=n+1;break e}}e=1e3}else e=1e3;e=ga(this,s,e),n=we(this.F),P(n,"RID",t),P(n,"CVER",22),this.D&&P(n,"X-HTTP-Session-Id",this.D),Xt(this,n),i&&(this.N?e="headers="+encodeURIComponent(String(fa(i)))+"&"+e:this.o&&As(n,this.o,i)),Cs(this.h,s),this.Ya&&P(n,"TYPE","init"),this.O?(P(n,"$req",e),P(n,"SID","null"),s.Z=!0,Hr(s,n,null)):Hr(s,n,e),this.G=2}}else this.G==3&&(t?Ai(this,t):this.i.length==0||sa(this.h)||Ai(this))};function Ai(t,e){var n;e?n=e.m:n=t.U++;const r=we(t.F);P(r,"SID",t.I),P(r,"RID",n),P(r,"AID",t.T),Xt(t,r),t.o&&t.s&&As(r,t.o,t.s),n=new Kt(t,t.j,n,t.C+1),t.o===null&&(n.H=t.s),e&&(t.i=e.D.concat(t.i)),e=ga(t,n,1e3),n.setTimeout(Math.round(.5*t.ta)+Math.round(.5*t.ta*Math.random())),Cs(t.h,n),Hr(n,r,e)}function Xt(t,e){t.ia&&ps(t.ia,function(n,r){P(e,r,n)}),t.l&&Jo({},function(n,r){P(e,r,n)})}function ga(t,e,n){n=Math.min(t.i.length,n);var r=t.l?Z(t.l.Ra,t.l,t):null;e:{var s=t.i;let i=-1;for(;;){const o=["count="+n];i==-1?0<n?(i=s[0].h,o.push("ofs="+i)):i=0:o.push("ofs="+i);let a=!0;for(let c=0;c<n;c++){let u=s[c].h;const l=s[c].g;if(u-=i,0>u)i=Math.max(0,s[c].h-100),a=!1;else try{Dh(l,o,"req"+u+"_")}catch{r&&r(l)}}if(a){r=o.join("&");break e}}}return t=t.i.splice(0,n),e.D=t,r}function ya(t){t.g||t.u||(t.Z=1,Fo(t.Ia,t),t.A=0)}function Ns(t){return t.g||t.u||3<=t.A?!1:(t.Z++,t.u=Gt(Z(t.Ia,t),Ea(t,t.A)),t.A++,!0)}y.Ia=function(){if(this.u=null,va(this),this.$&&!(this.K||this.g==null||0>=this.P)){var t=2*this.P;this.j.info("BP detection timer enabled: "+t),this.B=Gt(Z(this.eb,this),t)}};y.eb=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.L=!1,this.K=!0,re(10),Jn(this),va(this))};function xs(t){t.B!=null&&(T.clearTimeout(t.B),t.B=null)}function va(t){t.g=new Kt(t,t.j,"rpc",t.Z),t.o===null&&(t.g.H=t.s),t.g.N=0;var e=we(t.sa);P(e,"RID","rpc"),P(e,"SID",t.I),P(e,"CI",t.L?"0":"1"),P(e,"AID",t.T),P(e,"TYPE","xmlhttp"),Xt(t,e),t.o&&t.s&&As(e,t.o,t.s),t.J&&t.g.setTimeout(t.J);var n=t.g;t=t.ka,n.K=1,n.v=Qn(we(e)),n.s=null,n.P=!0,Wo(n,t)}y.cb=function(){this.v!=null&&(this.v=null,Jn(this),Ns(this),re(19))};function kn(t){t.v!=null&&(T.clearTimeout(t.v),t.v=null)}function wa(t,e){var n=null;if(t.g==e){kn(t),xs(t),t.g=null;var r=2}else if(Wr(t.h,e))n=e.D,oa(t.h,e),r=1;else return;if(t.G!=0){if(t.pa=e.Y,e.i)if(r==1){n=e.s?e.s.length:0,e=Date.now()-e.F;var s=t.C;r=Gn(),K(r,new zo(r,n)),Zn(t)}else ya(t);else if(s=e.o,s==3||s==0&&0<t.pa||!(r==1&&Rh(t,e)||r==2&&Ns(t)))switch(n&&0<n.length&&(e=t.h,e.i=e.i.concat(n)),s){case 1:Pe(t,5);break;case 4:Pe(t,10);break;case 3:Pe(t,6);break;default:Pe(t,2)}}}function Ea(t,e){let n=t.Xa+Math.floor(Math.random()*t.bb);return t.l||(n*=2),n*e}function Pe(t,e){if(t.j.info("Error code "+e),e==2){var n=null;t.l&&(n=null);var r=Z(t.kb,t);n||(n=new Ue("//www.google.com/images/cleardot.gif"),T.location&&T.location.protocol=="http"||Dn(n,"https"),Qn(n)),Ah(n.toString(),r)}else re(2);t.G=0,t.l&&t.l.va(e),ba(t),ma(t)}y.kb=function(t){t?(this.j.info("Successfully pinged google.com"),re(2)):(this.j.info("Failed to ping google.com"),re(1))};function ba(t){if(t.G=0,t.la=[],t.l){const e=aa(t.h);(e.length!=0||t.i.length!=0)&&(yi(t.la,e),yi(t.la,t.i),t.h.i.length=0,ds(t.i),t.i.length=0),t.l.ua()}}function Ia(t,e,n){var r=n instanceof Ue?we(n):new Ue(n,void 0);if(r.g!="")e&&(r.g=e+"."+r.g),An(r,r.m);else{var s=T.location;r=s.protocol,e=e?e+"."+s.hostname:s.hostname,s=+s.port;var i=new Ue(null,void 0);r&&Dn(i,r),e&&(i.g=e),s&&An(i,s),n&&(i.l=n),r=i}return n=t.D,e=t.za,n&&e&&P(r,n,e),P(r,"VER",t.ma),Xt(t,r),r}function Ta(t,e,n){if(e&&!t.H)throw Error("Can't create secondary domain capable XhrIo object.");return e=n&&t.Da&&!t.ra?new F(new Qt({jb:!0})):new F(t.ra),e.Ka(t.H),e}function Sa(){}y=Sa.prototype;y.xa=function(){};y.wa=function(){};y.va=function(){};y.ua=function(){};y.Ra=function(){};function Nn(){if(Ze&&!(10<=Number(Yl)))throw Error("Environmental error: no available transport.")}Nn.prototype.g=function(t,e){return new ue(t,e)};function ue(t,e){G.call(this),this.g=new pa(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.ya&&(t?t["X-WebChannel-Client-Profile"]=e.ya:t={"X-WebChannel-Client-Profile":e.ya}),this.g.S=t,(t=e&&e.Yb)&&!Sn(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!Sn(e)&&(this.g.D=e,t=this.h,t!==null&&e in t&&(t=this.h,e in t&&delete t[e])),this.j=new lt(this)}W(ue,G);ue.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.H=!0);var t=this.g,e=this.l,n=this.h||void 0;re(0),t.V=e,t.ia=n||{},t.L=t.Y,t.F=Ia(t,null,t.V),Zn(t)};ue.prototype.close=function(){ks(this.g)};ue.prototype.u=function(t){var e=this.g;if(typeof t=="string"){var n={};n.__data__=t,t=n}else this.v&&(n={},n.__data__=ws(t),t=n);e.i.push(new Sh(e.ab++,t)),e.G==3&&Zn(e)};ue.prototype.M=function(){this.g.l=null,delete this.j,ks(this.g),delete this.g,ue.X.M.call(this)};function Ca(t){Ts.call(this);var e=t.__sm__;if(e){e:{for(const n in e){t=n;break e}t=void 0}(this.i=t)&&(t=this.i,e=e!==null&&t in e?e[t]:void 0),this.data=e}else this.data=t}W(Ca,Ts);function _a(){Ss.call(this),this.status=1}W(_a,Ss);function lt(t){this.g=t}W(lt,Sa);lt.prototype.xa=function(){K(this.g,"a")};lt.prototype.wa=function(t){K(this.g,new Ca(t))};lt.prototype.va=function(t){K(this.g,new _a)};lt.prototype.ua=function(){K(this.g,"b")};Nn.prototype.createWebChannel=Nn.prototype.g;ue.prototype.send=ue.prototype.u;ue.prototype.open=ue.prototype.m;ue.prototype.close=ue.prototype.close;Hn.NO_ERROR=0;Hn.TIMEOUT=8;Hn.HTTP_ERROR=6;Go.COMPLETE="complete";Ho.EventType=Ht;Ht.OPEN="a";Ht.CLOSE="b";Ht.ERROR="c";Ht.MESSAGE="d";G.prototype.listen=G.prototype.N;F.prototype.listenOnce=F.prototype.O;F.prototype.getLastError=F.prototype.Oa;F.prototype.getLastErrorCode=F.prototype.Ea;F.prototype.getStatus=F.prototype.aa;F.prototype.getResponseJson=F.prototype.Sa;F.prototype.getResponseText=F.prototype.fa;F.prototype.send=F.prototype.da;F.prototype.setWithCredentials=F.prototype.Ka;var Mh=function(){return new Nn},Oh=function(){return Gn()},Dr=Hn,Ph=Go,Fh=je,ki={sb:0,vb:1,wb:2,Pb:3,Ub:4,Rb:5,Sb:6,Qb:7,Ob:8,Tb:9,PROXY:10,NOPROXY:11,Mb:12,Ib:13,Jb:14,Hb:15,Kb:16,Lb:17,ob:18,nb:19,pb:20},Uh=Qt,hn=Ho,Vh=F;const Ni="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Y.UNAUTHENTICATED=new Y(null),Y.GOOGLE_CREDENTIALS=new Y("google-credentials-uid"),Y.FIRST_PARTY=new Y("first-party-uid"),Y.MOCK_USER=new Y("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ht="9.19.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $e=new wo("@firebase/firestore");function xi(){return $e.logLevel}function v(t,...e){if($e.logLevel<=x.DEBUG){const n=e.map(Ls);$e.debug(`Firestore (${ht}): ${t}`,...n)}}function Ee(t,...e){if($e.logLevel<=x.ERROR){const n=e.map(Ls);$e.error(`Firestore (${ht}): ${t}`,...n)}}function xn(t,...e){if($e.logLevel<=x.WARN){const n=e.map(Ls);$e.warn(`Firestore (${ht}): ${t}`,...n)}}function Ls(t){if(typeof t=="string")return t;try{return e=t,JSON.stringify(e)}catch{return t}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I(t="Unexpected state"){const e=`FIRESTORE (${ht}) INTERNAL ASSERTION FAILED: `+t;throw Ee(e),new Error(e)}function O(t,e){t||I()}function D(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};let g=class extends ct{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Bh{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(Y.UNAUTHENTICATED))}shutdown(){}}class $h{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class qh{constructor(e){this.t=e,this.currentUser=Y.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){let r=this.i;const s=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let i=new ye;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new ye,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},a=c=>{v("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(v("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new ye)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(v("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(O(typeof r.accessToken=="string"),new Da(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return O(e===null||typeof e=="string"),new Y(e)}}class jh{constructor(e,n,r){this.h=e,this.l=n,this.m=r,this.type="FirstParty",this.user=Y.FIRST_PARTY,this.g=new Map}p(){return this.m?this.m():null}get headers(){this.g.set("X-Goog-AuthUser",this.h);const e=this.p();return e&&this.g.set("Authorization",e),this.l&&this.g.set("X-Goog-Iam-Authorization-Token",this.l),this.g}}class zh{constructor(e,n,r){this.h=e,this.l=n,this.m=r}getToken(){return Promise.resolve(new jh(this.h,this.l,this.m))}start(e,n){e.enqueueRetryable(()=>n(Y.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Gh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Hh{constructor(e){this.I=e,this.forceRefresh=!1,this.appCheck=null,this.T=null}start(e,n){const r=i=>{i.error!=null&&v("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.T;return this.T=i.token,v("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{v("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.appCheck.addTokenListener(this.o)};this.I.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.I.getImmediate({optional:!0});i?s(i):v("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(O(typeof n.token=="string"),this.T=n.token,new Gh(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kh(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aa{static A(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=Kh(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function R(t,e){return t<e?-1:t>e?1:0}function et(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new g(d.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new g(d.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new g(d.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new g(d.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return $.fromMillis(Date.now())}static fromDate(e){return $.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new $(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?R(this.nanoseconds,e.nanoseconds):R(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e){this.timestamp=e}static fromTimestamp(e){return new C(e)}static min(){return new C(new $(0,0))}static max(){return new C(new $(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(e,n,r){n===void 0?n=0:n>e.length&&I(),r===void 0?r=e.length-n:r>e.length-n&&I(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Ft.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Ft?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class M extends Ft{construct(e,n,r){return new M(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new g(d.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new M(n)}static emptyPath(){return new M([])}}const Wh=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class J extends Ft{construct(e,n,r){return new J(e,n,r)}static isValidIdentifier(e){return Wh.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),J.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new J(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new g(d.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const a=e[s];if(a==="\\"){if(s+1===e.length)throw new g(d.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new g(d.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(r+=a,s++):(i(),s++)}if(i(),o)throw new g(d.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new J(n)}static emptyPath(){return new J([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w{constructor(e){this.path=e}static fromPath(e){return new w(M.fromString(e))}static fromName(e){return new w(M.fromString(e).popFirst(5))}static empty(){return new w(M.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&M.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return M.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new w(new M(e.slice()))}}function Qh(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=C.fromTimestamp(r===1e9?new $(n+1,0):new $(n,r));return new Ae(s,w.empty(),e)}function Yh(t){return new Ae(t.readTime,t.key,-1)}class Ae{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Ae(C.min(),w.empty(),-1)}static max(){return new Ae(C.max(),w.empty(),-1)}}function Xh(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=w.comparator(t.documentKey,e.documentKey),n!==0?n:R(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Zh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jt(t){if(t.code!==d.FAILED_PRECONDITION||t.message!==Jh)throw t;v("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&I(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new p((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof p?n:p.resolve(n)}catch(n){return p.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):p.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):p.reject(n)}static resolve(e){return new p((n,r)=>{n(e)})}static reject(e){return new p((n,r)=>{r(e)})}static waitFor(e){return new p((n,r)=>{let s=0,i=0,o=!1;e.forEach(a=>{++s,a.next(()=>{++i,o&&i===s&&n()},c=>r(c))}),o=!0,i===s&&n()})}static or(e){let n=p.resolve(!1);for(const r of e)n=n.next(s=>s?p.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new p((r,s)=>{const i=e.length,o=new Array(i);let a=0;for(let c=0;c<i;c++){const u=c;n(e[u]).next(l=>{o[u]=l,++a,a===i&&r(o)},l=>s(l))}})}static doWhile(e,n){return new p((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function Zt(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ot(r),this.ut=r=>n.writeSequenceNumber(r))}ot(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ut&&this.ut(e),e}}Rs.ct=-1;function er(t){return t==null}function Ln(t){return t===0&&1/t==-1/0}function ed(t){return typeof t=="number"&&Number.isInteger(t)&&!Ln(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Li(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function ze(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function ka(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e,n){this.comparator=e,this.root=n||H.EMPTY}insert(e,n){return new j(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,H.BLACK,null,null))}remove(e){return new j(this.comparator,this.root.remove(e,this.comparator).copy(null,null,H.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new dn(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new dn(this.root,e,this.comparator,!1)}getReverseIterator(){return new dn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new dn(this.root,e,this.comparator,!0)}}class dn{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class H{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??H.RED,this.left=s??H.EMPTY,this.right=i??H.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new H(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return H.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return H.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,H.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,H.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw I();const e=this.left.check();if(e!==this.right.check())throw I();return e+(this.isRed()?0:1)}}H.EMPTY=null,H.RED=!0,H.BLACK=!1;H.EMPTY=new class{constructor(){this.size=0}get key(){throw I()}get value(){throw I()}get color(){throw I()}get left(){throw I()}get right(){throw I()}copy(t,e,n,r,s){return this}insert(t,e,n){return new H(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e){this.comparator=e,this.data=new j(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Ri(this.data.getIterator())}getIteratorFrom(e){return new Ri(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof q)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new q(this.comparator);return n.data=e,n}}class Ri{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e){this.fields=e,e.sort(J.comparator)}static empty(){return new ae([])}unionWith(e){let n=new q(J.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new ae(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return et(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class td extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(r){try{return atob(r)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new td("Invalid base64 string: "+s):s}}(e);return new te(n)}static fromUint8Array(e){const n=function(r){let s="";for(let i=0;i<r.length;++i)s+=String.fromCharCode(r[i]);return s}(e);return new te(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let r=0;r<e.length;r++)n[r]=e.charCodeAt(r);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return R(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}te.EMPTY_BYTE_STRING=new te("");const nd=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ke(t){if(O(!!t),typeof t=="string"){let e=0;const n=nd.exec(t);if(O(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:V(t.seconds),nanos:V(t.nanos)}}function V(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function tt(t){return typeof t=="string"?te.fromBase64String(t):te.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Na(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function xa(t){const e=t.mapValue.fields.__previous_value__;return Na(e)?xa(e):e}function Ut(t){const e=ke(t.mapValue.fields.__local_write_time__.timestampValue);return new $(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(e,n,r,s,i,o,a,c){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.useFetchStreams=c}}class Vt{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Vt("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Vt&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fn={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function qe(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Na(t)?4:sd(t)?9007199254740991:10:I()}function pe(t,e){if(t===e)return!0;const n=qe(t);if(n!==qe(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Ut(t).isEqual(Ut(e));case 3:return function(r,s){if(typeof r.timestampValue=="string"&&typeof s.timestampValue=="string"&&r.timestampValue.length===s.timestampValue.length)return r.timestampValue===s.timestampValue;const i=ke(r.timestampValue),o=ke(s.timestampValue);return i.seconds===o.seconds&&i.nanos===o.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(r,s){return tt(r.bytesValue).isEqual(tt(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(r,s){return V(r.geoPointValue.latitude)===V(s.geoPointValue.latitude)&&V(r.geoPointValue.longitude)===V(s.geoPointValue.longitude)}(t,e);case 2:return function(r,s){if("integerValue"in r&&"integerValue"in s)return V(r.integerValue)===V(s.integerValue);if("doubleValue"in r&&"doubleValue"in s){const i=V(r.doubleValue),o=V(s.doubleValue);return i===o?Ln(i)===Ln(o):isNaN(i)&&isNaN(o)}return!1}(t,e);case 9:return et(t.arrayValue.values||[],e.arrayValue.values||[],pe);case 10:return function(r,s){const i=r.mapValue.fields||{},o=s.mapValue.fields||{};if(Li(i)!==Li(o))return!1;for(const a in i)if(i.hasOwnProperty(a)&&(o[a]===void 0||!pe(i[a],o[a])))return!1;return!0}(t,e);default:return I()}}function Bt(t,e){return(t.values||[]).find(n=>pe(n,e))!==void 0}function nt(t,e){if(t===e)return 0;const n=qe(t),r=qe(e);if(n!==r)return R(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return R(t.booleanValue,e.booleanValue);case 2:return function(s,i){const o=V(s.integerValue||s.doubleValue),a=V(i.integerValue||i.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(t,e);case 3:return Mi(t.timestampValue,e.timestampValue);case 4:return Mi(Ut(t),Ut(e));case 5:return R(t.stringValue,e.stringValue);case 6:return function(s,i){const o=tt(s),a=tt(i);return o.compareTo(a)}(t.bytesValue,e.bytesValue);case 7:return function(s,i){const o=s.split("/"),a=i.split("/");for(let c=0;c<o.length&&c<a.length;c++){const u=R(o[c],a[c]);if(u!==0)return u}return R(o.length,a.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,i){const o=R(V(s.latitude),V(i.latitude));return o!==0?o:R(V(s.longitude),V(i.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(s,i){const o=s.values||[],a=i.values||[];for(let c=0;c<o.length&&c<a.length;++c){const u=nt(o[c],a[c]);if(u)return u}return R(o.length,a.length)}(t.arrayValue,e.arrayValue);case 10:return function(s,i){if(s===fn.mapValue&&i===fn.mapValue)return 0;if(s===fn.mapValue)return 1;if(i===fn.mapValue)return-1;const o=s.fields||{},a=Object.keys(o),c=i.fields||{},u=Object.keys(c);a.sort(),u.sort();for(let l=0;l<a.length&&l<u.length;++l){const h=R(a[l],u[l]);if(h!==0)return h;const f=nt(o[a[l]],c[u[l]]);if(f!==0)return f}return R(a.length,u.length)}(t.mapValue,e.mapValue);default:throw I()}}function Mi(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return R(t,e);const n=ke(t),r=ke(e),s=R(n.seconds,r.seconds);return s!==0?s:R(n.nanos,r.nanos)}function rt(t){return Qr(t)}function Qr(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(r){const s=ke(r);return`time(${s.seconds},${s.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?tt(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,w.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(r){let s="[",i=!0;for(const o of r.values||[])i?i=!1:s+=",",s+=Qr(o);return s+"]"}(t.arrayValue):"mapValue"in t?function(r){const s=Object.keys(r.fields||{}).sort();let i="{",o=!0;for(const a of s)o?o=!1:i+=",",i+=`${a}:${Qr(r.fields[a])}`;return i+"}"}(t.mapValue):I();var e,n}function Oi(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Yr(t){return!!t&&"integerValue"in t}function Ms(t){return!!t&&"arrayValue"in t}function Pi(t){return!!t&&"nullValue"in t}function Fi(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function gn(t){return!!t&&"mapValue"in t}function _t(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return ze(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=_t(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=_t(t.arrayValue.values[n]);return e}return Object.assign({},t)}function sd(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e){this.value=e}static empty(){return new ie({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!gn(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=_t(n)}setAll(e){let n=J.emptyPath(),r={},s=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const c=this.getFieldsMap(n);this.applyChanges(c,r,s),r={},s=[],n=a.popLast()}o?r[a.lastSegment()]=_t(o):s.push(a.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());gn(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return pe(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];gn(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){ze(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new ie(_t(this.value))}}function La(t){const e=[];return ze(t.fields,(n,r)=>{const s=new J([n]);if(gn(r)){const i=La(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new ae(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(e,n,r,s,i,o,a){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(e){return new X(e,0,C.min(),C.min(),C.min(),ie.empty(),0)}static newFoundDocument(e,n,r,s){return new X(e,1,n,C.min(),r,s,0)}static newNoDocument(e,n){return new X(e,2,n,C.min(),C.min(),ie.empty(),0)}static newUnknownDocument(e,n){return new X(e,3,n,C.min(),C.min(),ie.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(C.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ie.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ie.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=C.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof X&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new X(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(e,n){this.position=e,this.inclusive=n}}function Ui(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=w.comparator(w.fromName(o.referenceValue),n.key):r=nt(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Vi(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!pe(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e,n="asc"){this.field=e,this.dir=n}}function id(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{}class B extends Ra{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new ad(e,n,r):n==="array-contains"?new ld(e,r):n==="in"?new hd(e,r):n==="not-in"?new dd(e,r):n==="array-contains-any"?new fd(e,r):new B(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new cd(e,r):new ud(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(nt(n,this.value)):n!==null&&qe(this.value)===qe(n)&&this.matchesComparison(nt(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return I()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class le extends Ra{constructor(e,n){super(),this.filters=e,this.op=n,this.ht=null}static create(e,n){return new le(e,n)}matches(e){return Ma(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ht!==null||(this.ht=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ht}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){const e=this.lt(n=>n.isInequality());return e!==null?e.field:null}lt(e){for(const n of this.getFlattenedFilters())if(e(n))return n;return null}}function Ma(t){return t.op==="and"}function Oa(t){return od(t)&&Ma(t)}function od(t){for(const e of t.filters)if(e instanceof le)return!1;return!0}function Xr(t){if(t instanceof B)return t.field.canonicalString()+t.op.toString()+rt(t.value);if(Oa(t))return t.filters.map(e=>Xr(e)).join(",");{const e=t.filters.map(n=>Xr(n)).join(",");return`${t.op}(${e})`}}function Pa(t,e){return t instanceof B?function(n,r){return r instanceof B&&n.op===r.op&&n.field.isEqual(r.field)&&pe(n.value,r.value)}(t,e):t instanceof le?function(n,r){return r instanceof le&&n.op===r.op&&n.filters.length===r.filters.length?n.filters.reduce((s,i,o)=>s&&Pa(i,r.filters[o]),!0):!1}(t,e):void I()}function Fa(t){return t instanceof B?function(e){return`${e.field.canonicalString()} ${e.op} ${rt(e.value)}`}(t):t instanceof le?function(e){return e.op.toString()+" {"+e.getFilters().map(Fa).join(" ,")+"}"}(t):"Filter"}class ad extends B{constructor(e,n,r){super(e,n,r),this.key=w.fromName(r.referenceValue)}matches(e){const n=w.comparator(e.key,this.key);return this.matchesComparison(n)}}class cd extends B{constructor(e,n){super(e,"in",n),this.keys=Ua("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class ud extends B{constructor(e,n){super(e,"not-in",n),this.keys=Ua("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Ua(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>w.fromName(r.referenceValue))}class ld extends B{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Ms(n)&&Bt(n.arrayValue,this.value)}}class hd extends B{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Bt(this.value.arrayValue,n)}}class dd extends B{constructor(e,n){super(e,"not-in",n)}matches(e){if(Bt(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Bt(this.value.arrayValue,n)}}class fd extends B{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Ms(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Bt(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{constructor(e,n=null,r=[],s=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=a,this.ft=null}}function Bi(t,e=null,n=[],r=[],s=null,i=null,o=null){return new pd(t,e,n,r,s,i,o)}function Os(t){const e=D(t);if(e.ft===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Xr(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),er(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>rt(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>rt(r)).join(",")),e.ft=n}return e.ft}function Ps(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!id(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!Pa(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Vi(t.startAt,e.startAt)&&Vi(t.endAt,e.endAt)}function Jr(t){return w.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e,n=null,r=[],s=[],i=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=c,this.dt=null,this.wt=null,this.startAt,this.endAt}}function md(t,e,n,r,s,i,o,a){return new en(t,e,n,r,s,i,o,a)}function Fs(t){return new en(t)}function $i(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function Va(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function Us(t){for(const e of t.filters){const n=e.getFirstInequalityField();if(n!==null)return n}return null}function Ba(t){return t.collectionGroup!==null}function Xe(t){const e=D(t);if(e.dt===null){e.dt=[];const n=Us(e),r=Va(e);if(n!==null&&r===null)n.isKeyField()||e.dt.push(new Dt(n)),e.dt.push(new Dt(J.keyField(),"asc"));else{let s=!1;for(const i of e.explicitOrderBy)e.dt.push(i),i.field.isKeyField()&&(s=!0);if(!s){const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.dt.push(new Dt(J.keyField(),i))}}}return e.dt}function be(t){const e=D(t);if(!e.wt)if(e.limitType==="F")e.wt=Bi(e.path,e.collectionGroup,Xe(e),e.filters,e.limit,e.startAt,e.endAt);else{const n=[];for(const i of Xe(e)){const o=i.dir==="desc"?"asc":"desc";n.push(new Dt(i.field,o))}const r=e.endAt?new Rn(e.endAt.position,e.endAt.inclusive):null,s=e.startAt?new Rn(e.startAt.position,e.startAt.inclusive):null;e.wt=Bi(e.path,e.collectionGroup,n,e.filters,e.limit,r,s)}return e.wt}function Zr(t,e){e.getFirstInequalityField(),Us(t);const n=t.filters.concat([e]);return new en(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function es(t,e,n){return new en(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function tr(t,e){return Ps(be(t),be(e))&&t.limitType===e.limitType}function $a(t){return`${Os(be(t))}|lt:${t.limitType}`}function ts(t){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(r=>Fa(r)).join(", ")}]`),er(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(r=>function(s){return`${s.field.canonicalString()} (${s.dir})`}(r)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>rt(r)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>rt(r)).join(",")),`Target(${n})`}(be(t))}; limitType=${t.limitType})`}function nr(t,e){return e.isFoundDocument()&&function(n,r){const s=r.key.path;return n.collectionGroup!==null?r.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(s):w.isDocumentKey(n.path)?n.path.isEqual(s):n.path.isImmediateParentOf(s)}(t,e)&&function(n,r){for(const s of Xe(n))if(!s.field.isKeyField()&&r.data.field(s.field)===null)return!1;return!0}(t,e)&&function(n,r){for(const s of n.filters)if(!s.matches(r))return!1;return!0}(t,e)&&function(n,r){return!(n.startAt&&!function(s,i,o){const a=Ui(s,i,o);return s.inclusive?a<=0:a<0}(n.startAt,Xe(n),r)||n.endAt&&!function(s,i,o){const a=Ui(s,i,o);return s.inclusive?a>=0:a>0}(n.endAt,Xe(n),r))}(t,e)}function gd(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function qa(t){return(e,n)=>{let r=!1;for(const s of Xe(t)){const i=yd(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function yd(t,e,n){const r=t.field.isKeyField()?w.comparator(e.key,n.key):function(s,i,o){const a=i.data.field(s),c=o.data.field(s);return a!==null&&c!==null?nt(a,c):I()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return I()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){ze(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return ka(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vd=new j(w.comparator);function Ie(){return vd}const ja=new j(w.comparator);function Tt(...t){let e=ja;for(const n of t)e=e.insert(n.key,n);return e}function za(t){let e=ja;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Fe(){return At()}function Ga(){return At()}function At(){return new dt(t=>t.toString(),(t,e)=>t.isEqual(e))}const wd=new j(w.comparator),Ed=new q(w.comparator);function A(...t){let e=Ed;for(const n of t)e=e.add(n);return e}const bd=new q(R);function Ha(){return bd}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ka(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ln(e)?"-0":e}}function Wa(t){return{integerValue:""+t}}function Id(t,e){return ed(e)?Wa(e):Ka(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(){this._=void 0}}function Td(t,e,n){return t instanceof Mn?function(r,s){const i={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return s&&(i.fields.__previous_value__=s),{mapValue:i}}(n,e):t instanceof st?Ya(t,e):t instanceof $t?Xa(t,e):function(r,s){const i=Qa(r,s),o=qi(i)+qi(r._t);return Yr(i)&&Yr(r._t)?Wa(o):Ka(r.serializer,o)}(t,e)}function Sd(t,e,n){return t instanceof st?Ya(t,e):t instanceof $t?Xa(t,e):n}function Qa(t,e){return t instanceof On?Yr(n=e)||function(r){return!!r&&"doubleValue"in r}(n)?e:{integerValue:0}:null;var n}class Mn extends rr{}class st extends rr{constructor(e){super(),this.elements=e}}function Ya(t,e){const n=Ja(e);for(const r of t.elements)n.some(s=>pe(s,r))||n.push(r);return{arrayValue:{values:n}}}class $t extends rr{constructor(e){super(),this.elements=e}}function Xa(t,e){let n=Ja(e);for(const r of t.elements)n=n.filter(s=>!pe(s,r));return{arrayValue:{values:n}}}class On extends rr{constructor(e,n){super(),this.serializer=e,this._t=n}}function qi(t){return V(t.integerValue||t.doubleValue)}function Ja(t){return Ms(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(e,n){this.field=e,this.transform=n}}function _d(t,e){return t.field.isEqual(e.field)&&function(n,r){return n instanceof st&&r instanceof st||n instanceof $t&&r instanceof $t?et(n.elements,r.elements,pe):n instanceof On&&r instanceof On?pe(n._t,r._t):n instanceof Mn&&r instanceof Mn}(t.transform,e.transform)}class Dd{constructor(e,n){this.version=e,this.transformResults=n}}class de{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new de}static exists(e){return new de(void 0,e)}static updateTime(e){return new de(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function yn(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class sr{}function Za(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new tc(t.key,de.none()):new tn(t.key,t.data,de.none());{const n=t.data,r=ie.empty();let s=new q(J.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Re(t.key,r,new ae(s.toArray()),de.none())}}function Ad(t,e,n){t instanceof tn?function(r,s,i){const o=r.value.clone(),a=zi(r.fieldTransforms,s,i.transformResults);o.setAll(a),s.convertToFoundDocument(i.version,o).setHasCommittedMutations()}(t,e,n):t instanceof Re?function(r,s,i){if(!yn(r.precondition,s))return void s.convertToUnknownDocument(i.version);const o=zi(r.fieldTransforms,s,i.transformResults),a=s.data;a.setAll(ec(r)),a.setAll(o),s.convertToFoundDocument(i.version,a).setHasCommittedMutations()}(t,e,n):function(r,s,i){s.convertToNoDocument(i.version).setHasCommittedMutations()}(0,e,n)}function kt(t,e,n,r){return t instanceof tn?function(s,i,o,a){if(!yn(s.precondition,i))return o;const c=s.value.clone(),u=Gi(s.fieldTransforms,a,i);return c.setAll(u),i.convertToFoundDocument(i.version,c).setHasLocalMutations(),null}(t,e,n,r):t instanceof Re?function(s,i,o,a){if(!yn(s.precondition,i))return o;const c=Gi(s.fieldTransforms,a,i),u=i.data;return u.setAll(ec(s)),u.setAll(c),i.convertToFoundDocument(i.version,u).setHasLocalMutations(),o===null?null:o.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(l=>l.field))}(t,e,n,r):function(s,i,o){return yn(s.precondition,i)?(i.convertToNoDocument(i.version).setHasLocalMutations(),null):o}(t,e,n)}function kd(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=Qa(r.transform,s||null);i!=null&&(n===null&&(n=ie.empty()),n.set(r.field,i))}return n||null}function ji(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(n,r){return n===void 0&&r===void 0||!(!n||!r)&&et(n,r,(s,i)=>_d(s,i))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class tn extends sr{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Re extends sr{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function ec(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function zi(t,e,n){const r=new Map;O(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,Sd(o,a,n[s]))}return r}function Gi(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,Td(i,o,e))}return r}class tc extends sr{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Nd extends sr{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xd{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Ad(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=kt(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=kt(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=Ga();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=n.has(s.key)?null:a;const c=Za(o,a);c!==null&&r.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(C.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),A())}isEqual(e){return this.batchId===e.batchId&&et(this.mutations,e.mutations,(n,r)=>ji(n,r))&&et(this.baseMutations,e.baseMutations,(n,r)=>ji(n,r))}}class Vs{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){O(e.mutations.length===r.length);let s=wd;const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Vs(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ld{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rd{constructor(e){this.count=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var U,k;function Md(t){switch(t){default:return I();case d.CANCELLED:case d.UNKNOWN:case d.DEADLINE_EXCEEDED:case d.RESOURCE_EXHAUSTED:case d.INTERNAL:case d.UNAVAILABLE:case d.UNAUTHENTICATED:return!1;case d.INVALID_ARGUMENT:case d.NOT_FOUND:case d.ALREADY_EXISTS:case d.PERMISSION_DENIED:case d.FAILED_PRECONDITION:case d.ABORTED:case d.OUT_OF_RANGE:case d.UNIMPLEMENTED:case d.DATA_LOSS:return!0}}function nc(t){if(t===void 0)return Ee("GRPC error has no .code"),d.UNKNOWN;switch(t){case U.OK:return d.OK;case U.CANCELLED:return d.CANCELLED;case U.UNKNOWN:return d.UNKNOWN;case U.DEADLINE_EXCEEDED:return d.DEADLINE_EXCEEDED;case U.RESOURCE_EXHAUSTED:return d.RESOURCE_EXHAUSTED;case U.INTERNAL:return d.INTERNAL;case U.UNAVAILABLE:return d.UNAVAILABLE;case U.UNAUTHENTICATED:return d.UNAUTHENTICATED;case U.INVALID_ARGUMENT:return d.INVALID_ARGUMENT;case U.NOT_FOUND:return d.NOT_FOUND;case U.ALREADY_EXISTS:return d.ALREADY_EXISTS;case U.PERMISSION_DENIED:return d.PERMISSION_DENIED;case U.FAILED_PRECONDITION:return d.FAILED_PRECONDITION;case U.ABORTED:return d.ABORTED;case U.OUT_OF_RANGE:return d.OUT_OF_RANGE;case U.UNIMPLEMENTED:return d.UNIMPLEMENTED;case U.DATA_LOSS:return d.DATA_LOSS;default:return I()}}(k=U||(U={}))[k.OK=0]="OK",k[k.CANCELLED=1]="CANCELLED",k[k.UNKNOWN=2]="UNKNOWN",k[k.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",k[k.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",k[k.NOT_FOUND=5]="NOT_FOUND",k[k.ALREADY_EXISTS=6]="ALREADY_EXISTS",k[k.PERMISSION_DENIED=7]="PERMISSION_DENIED",k[k.UNAUTHENTICATED=16]="UNAUTHENTICATED",k[k.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",k[k.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",k[k.ABORTED=10]="ABORTED",k[k.OUT_OF_RANGE=11]="OUT_OF_RANGE",k[k.UNIMPLEMENTED=12]="UNIMPLEMENTED",k[k.INTERNAL=13]="INTERNAL",k[k.UNAVAILABLE=14]="UNAVAILABLE",k[k.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(){this.onExistenceFilterMismatchCallbacks=new Map}static get instance(){return pn}static getOrCreateInstance(){return pn===null&&(pn=new Bs),pn}onExistenceFilterMismatch(e){const n=Symbol();return this.onExistenceFilterMismatchCallbacks.set(n,e),()=>this.onExistenceFilterMismatchCallbacks.delete(n)}notifyOnExistenceFilterMismatch(e){this.onExistenceFilterMismatchCallbacks.forEach(n=>n(e))}}let pn=null;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,nn.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new ir(C.min(),s,Ha(),Ie(),A())}}class nn{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new nn(r,n,A(),A(),A())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e,n,r,s){this.It=e,this.removedTargetIds=n,this.key=r,this.Tt=s}}class rc{constructor(e,n){this.targetId=e,this.Et=n}}class sc{constructor(e,n,r=te.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class Hi{constructor(){this.At=0,this.Rt=Wi(),this.vt=te.EMPTY_BYTE_STRING,this.bt=!1,this.Pt=!0}get current(){return this.bt}get resumeToken(){return this.vt}get Vt(){return this.At!==0}get St(){return this.Pt}Dt(e){e.approximateByteSize()>0&&(this.Pt=!0,this.vt=e)}Ct(){let e=A(),n=A(),r=A();return this.Rt.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:I()}}),new nn(this.vt,this.bt,e,n,r)}xt(){this.Pt=!1,this.Rt=Wi()}Nt(e,n){this.Pt=!0,this.Rt=this.Rt.insert(e,n)}kt(e){this.Pt=!0,this.Rt=this.Rt.remove(e)}Ot(){this.At+=1}$t(){this.At-=1}Mt(){this.Pt=!0,this.bt=!0}}class Od{constructor(e){this.Ft=e,this.Bt=new Map,this.Lt=Ie(),this.qt=Ki(),this.Ut=new q(R)}Kt(e){for(const n of e.It)e.Tt&&e.Tt.isFoundDocument()?this.Gt(n,e.Tt):this.Qt(n,e.key,e.Tt);for(const n of e.removedTargetIds)this.Qt(n,e.key,e.Tt)}zt(e){this.forEachTarget(e,n=>{const r=this.jt(n);switch(e.state){case 0:this.Wt(n)&&r.Dt(e.resumeToken);break;case 1:r.$t(),r.Vt||r.xt(),r.Dt(e.resumeToken);break;case 2:r.$t(),r.Vt||this.removeTarget(n);break;case 3:this.Wt(n)&&(r.Mt(),r.Dt(e.resumeToken));break;case 4:this.Wt(n)&&(this.Ht(n),r.Dt(e.resumeToken));break;default:I()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Bt.forEach((r,s)=>{this.Wt(s)&&n(s)})}Jt(e){var n;const r=e.targetId,s=e.Et.count,i=this.Yt(r);if(i){const o=i.target;if(Jr(o))if(s===0){const a=new w(o.path);this.Qt(r,a,X.newNoDocument(a,C.min()))}else O(s===1);else{const a=this.Zt(r);a!==s&&(this.Ht(r),this.Ut=this.Ut.add(r),(n=Bs.instance)===null||n===void 0||n.notifyOnExistenceFilterMismatch({localCacheCount:a,existenceFilterCount:e.Et.count}))}}}Xt(e){const n=new Map;this.Bt.forEach((i,o)=>{const a=this.Yt(o);if(a){if(i.current&&Jr(a.target)){const c=new w(a.target.path);this.Lt.get(c)!==null||this.te(o,c)||this.Qt(o,c,X.newNoDocument(c,e))}i.St&&(n.set(o,i.Ct()),i.xt())}});let r=A();this.qt.forEach((i,o)=>{let a=!0;o.forEachWhile(c=>{const u=this.Yt(c);return!u||u.purpose===2||(a=!1,!1)}),a&&(r=r.add(i))}),this.Lt.forEach((i,o)=>o.setReadTime(e));const s=new ir(e,n,this.Ut,this.Lt,r);return this.Lt=Ie(),this.qt=Ki(),this.Ut=new q(R),s}Gt(e,n){if(!this.Wt(e))return;const r=this.te(e,n.key)?2:0;this.jt(e).Nt(n.key,r),this.Lt=this.Lt.insert(n.key,n),this.qt=this.qt.insert(n.key,this.ee(n.key).add(e))}Qt(e,n,r){if(!this.Wt(e))return;const s=this.jt(e);this.te(e,n)?s.Nt(n,1):s.kt(n),this.qt=this.qt.insert(n,this.ee(n).delete(e)),r&&(this.Lt=this.Lt.insert(n,r))}removeTarget(e){this.Bt.delete(e)}Zt(e){const n=this.jt(e).Ct();return this.Ft.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Ot(e){this.jt(e).Ot()}jt(e){let n=this.Bt.get(e);return n||(n=new Hi,this.Bt.set(e,n)),n}ee(e){let n=this.qt.get(e);return n||(n=new q(R),this.qt=this.qt.insert(e,n)),n}Wt(e){const n=this.Yt(e)!==null;return n||v("WatchChangeAggregator","Detected inactive target",e),n}Yt(e){const n=this.Bt.get(e);return n&&n.Vt?null:this.Ft.ne(e)}Ht(e){this.Bt.set(e,new Hi),this.Ft.getRemoteKeysForTarget(e).forEach(n=>{this.Qt(e,n,null)})}te(e,n){return this.Ft.getRemoteKeysForTarget(e).has(n)}}function Ki(){return new j(w.comparator)}function Wi(){return new j(w.comparator)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pd=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),Fd=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),Ud=(()=>({and:"AND",or:"OR"}))();class Vd{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Pn(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function ic(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Bd(t,e){return Pn(t,e.toTimestamp())}function fe(t){return O(!!t),C.fromTimestamp(function(e){const n=ke(e);return new $(n.seconds,n.nanos)}(t))}function $s(t,e){return function(n){return new M(["projects",n.projectId,"databases",n.database])}(t).child("documents").child(e).canonicalString()}function oc(t){const e=M.fromString(t);return O(lc(e)),e}function ns(t,e){return $s(t.databaseId,e.path)}function Ar(t,e){const n=oc(e);if(n.get(1)!==t.databaseId.projectId)throw new g(d.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new g(d.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new w(ac(n))}function rs(t,e){return $s(t.databaseId,e)}function $d(t){const e=oc(t);return e.length===4?M.emptyPath():ac(e)}function ss(t){return new M(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function ac(t){return O(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Qi(t,e,n){return{name:ns(t,e),fields:n.value.mapValue.fields}}function qd(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:I()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(c,u){return c.useProto3Json?(O(u===void 0||typeof u=="string"),te.fromBase64String(u||"")):(O(u===void 0||u instanceof Uint8Array),te.fromUint8Array(u||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(c){const u=c.code===void 0?d.UNKNOWN:nc(c.code);return new g(u,c.message||"")}(o);n=new sc(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Ar(t,r.document.name),i=fe(r.document.updateTime),o=r.document.createTime?fe(r.document.createTime):C.min(),a=new ie({mapValue:{fields:r.document.fields}}),c=X.newFoundDocument(s,i,o,a),u=r.targetIds||[],l=r.removedTargetIds||[];n=new vn(u,l,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Ar(t,r.document),i=r.readTime?fe(r.readTime):C.min(),o=X.newNoDocument(s,i),a=r.removedTargetIds||[];n=new vn([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Ar(t,r.document),i=r.removedTargetIds||[];n=new vn([],i,s,null)}else{if(!("filter"in e))return I();{e.filter;const r=e.filter;r.targetId;const s=r.count||0,i=new Rd(s),o=r.targetId;n=new rc(o,i)}}return n}function jd(t,e){let n;if(e instanceof tn)n={update:Qi(t,e.key,e.value)};else if(e instanceof tc)n={delete:ns(t,e.key)};else if(e instanceof Re)n={update:Qi(t,e.key,e.data),updateMask:Jd(e.fieldMask)};else{if(!(e instanceof Nd))return I();n={verify:ns(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,i){const o=i.transform;if(o instanceof Mn)return{fieldPath:i.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof st)return{fieldPath:i.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof $t)return{fieldPath:i.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof On)return{fieldPath:i.field.canonicalString(),increment:o._t};throw I()}(0,r))),e.precondition.isNone||(n.currentDocument=function(r,s){return s.updateTime!==void 0?{updateTime:Bd(r,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:I()}(t,e.precondition)),n}function zd(t,e){return t&&t.length>0?(O(e!==void 0),t.map(n=>function(r,s){let i=r.updateTime?fe(r.updateTime):fe(s);return i.isEqual(C.min())&&(i=fe(s)),new Dd(i,r.transformResults||[])}(n,e))):[]}function Gd(t,e){return{documents:[rs(t,e.path)]}}function Hd(t,e){const n={structuredQuery:{}},r=e.path;e.collectionGroup!==null?(n.parent=rs(t,r),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=rs(t,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const s=function(c){if(c.length!==0)return uc(le.create(c,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const i=function(c){if(c.length!==0)return c.map(u=>function(l){return{field:Ke(l.field),direction:Qd(l.dir)}}(u))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=function(c,u){return c.useProto3Json||er(u)?u:{value:u}}(t,e.limit);var a;return o!==null&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt={before:(a=e.startAt).inclusive,values:a.position}),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),n}function Kd(t){let e=$d(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){O(r===1);const l=n.from[0];l.allDescendants?s=l.collectionId:e=e.child(l.collectionId)}let i=[];n.where&&(i=function(l){const h=cc(l);return h instanceof le&&Oa(h)?h.getFilters():[h]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(l=>function(h){return new Dt(We(h.field),function(f){switch(f){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(h.direction))}(l)));let a=null;n.limit&&(a=function(l){let h;return h=typeof l=="object"?l.value:l,er(h)?null:h}(n.limit));let c=null;n.startAt&&(c=function(l){const h=!!l.before,f=l.values||[];return new Rn(f,h)}(n.startAt));let u=null;return n.endAt&&(u=function(l){const h=!l.before,f=l.values||[];return new Rn(f,h)}(n.endAt)),md(e,s,o,i,a,"F",c,u)}function Wd(t,e){const n=function(r,s){switch(s){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return I()}}(0,e.purpose);return n==null?null:{"goog-listen-tags":n}}function cc(t){return t.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=We(e.unaryFilter.field);return B.create(n,"==",{doubleValue:NaN});case"IS_NULL":const r=We(e.unaryFilter.field);return B.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=We(e.unaryFilter.field);return B.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=We(e.unaryFilter.field);return B.create(i,"!=",{nullValue:"NULL_VALUE"});default:return I()}}(t):t.fieldFilter!==void 0?function(e){return B.create(We(e.fieldFilter.field),function(n){switch(n){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return I()}}(e.fieldFilter.op),e.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(e){return le.create(e.compositeFilter.filters.map(n=>cc(n)),function(n){switch(n){case"AND":return"and";case"OR":return"or";default:return I()}}(e.compositeFilter.op))}(t):I()}function Qd(t){return Pd[t]}function Yd(t){return Fd[t]}function Xd(t){return Ud[t]}function Ke(t){return{fieldPath:t.canonicalString()}}function We(t){return J.fromServerFormat(t.fieldPath)}function uc(t){return t instanceof B?function(e){if(e.op==="=="){if(Fi(e.value))return{unaryFilter:{field:Ke(e.field),op:"IS_NAN"}};if(Pi(e.value))return{unaryFilter:{field:Ke(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Fi(e.value))return{unaryFilter:{field:Ke(e.field),op:"IS_NOT_NAN"}};if(Pi(e.value))return{unaryFilter:{field:Ke(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ke(e.field),op:Yd(e.op),value:e.value}}}(t):t instanceof le?function(e){const n=e.getFilters().map(r=>uc(r));return n.length===1?n[0]:{compositeFilter:{op:Xd(e.op),filters:n}}}(t):I()}function Jd(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function lc(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e,n,r,s,i=C.min(),o=C.min(),a=te.EMPTY_BYTE_STRING){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a}withSequenceNumber(e){return new Ve(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,n){return new Ve(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new Ve(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zd{constructor(e){this.se=e}}function ef(t){const e=Kd({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?es(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf{constructor(){this.He=new nf}addToCollectionParentIndex(e,n){return this.He.add(n),p.resolve()}getCollectionParents(e,n){return p.resolve(this.He.getEntries(n))}addFieldIndex(e,n){return p.resolve()}deleteFieldIndex(e,n){return p.resolve()}getDocumentsMatchingTarget(e,n){return p.resolve(null)}getIndexType(e,n){return p.resolve(0)}getFieldIndexes(e,n){return p.resolve([])}getNextCollectionGroupToUpdate(e){return p.resolve(null)}getMinOffset(e,n){return p.resolve(Ae.min())}getMinOffsetFromCollectionGroup(e,n){return p.resolve(Ae.min())}updateCollectionGroup(e,n,r){return p.resolve()}updateIndexEntries(e,n){return p.resolve()}}class nf{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new q(M.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new q(M.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e){this.Rn=e}next(){return this.Rn+=2,this.Rn}static vn(){return new it(0)}static bn(){return new it(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(){this.changes=new dt(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,X.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?p.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&kt(r.mutation,s,ae.empty(),$.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,A()).next(()=>r))}getLocalViewOfDocuments(e,n,r=A()){const s=Fe();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=Tt();return i.forEach((a,c)=>{o=o.insert(a,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Fe();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,A()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,a)=>{n.set(o,a)})})}computeViews(e,n,r,s){let i=Ie();const o=At(),a=At();return n.forEach((c,u)=>{const l=r.get(u.key);s.has(u.key)&&(l===void 0||l.mutation instanceof Re)?i=i.insert(u.key,u):l!==void 0?(o.set(u.key,l.mutation.getFieldMask()),kt(l.mutation,u,l.mutation.getFieldMask(),$.now())):o.set(u.key,ae.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((u,l)=>o.set(u,l)),n.forEach((u,l)=>{var h;return a.set(u,new sf(l,(h=o.get(u))!==null&&h!==void 0?h:null))}),a))}recalculateAndSaveOverlays(e,n){const r=At();let s=new j((o,a)=>o-a),i=A();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const a of o)a.keys().forEach(c=>{const u=n.get(c);if(u===null)return;let l=r.get(c)||ae.empty();l=a.applyToLocalView(u,l),r.set(c,l);const h=(s.get(a.batchId)||A()).add(c);s=s.insert(a.batchId,h)})}).next(()=>{const o=[],a=s.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),u=c.key,l=c.value,h=Ga();l.forEach(f=>{if(!i.has(f)){const m=Za(n.get(f),r.get(f));m!==null&&h.set(f,m),i=i.add(f)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,h))}return p.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r){return function(s){return w.isDocumentKey(s.path)&&s.collectionGroup===null&&s.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):Ba(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r):this.getDocumentsMatchingCollectionQuery(e,n,r)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):p.resolve(Fe());let a=-1,c=i;return o.next(u=>p.forEach(u,(l,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),i.get(l)?p.resolve():this.remoteDocumentCache.getEntry(e,l).next(f=>{c=c.insert(l,f)}))).next(()=>this.populateOverlays(e,u,i)).next(()=>this.computeViews(e,c,u,A())).next(l=>({batchId:a,changes:za(l)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new w(n)).next(r=>{let s=Tt();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r){const s=n.collectionGroup;let i=Tt();return this.indexManager.getCollectionParents(e,s).next(o=>p.forEach(o,a=>{const c=function(u,l){return new en(l,null,u.explicitOrderBy.slice(),u.filters.slice(),u.limit,u.limitType,u.startAt,u.endAt)}(n,a.child(s));return this.getDocumentsMatchingCollectionQuery(e,c,r).next(u=>{u.forEach((l,h)=>{i=i.insert(l,h)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,n,r){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s))).next(i=>{s.forEach((a,c)=>{const u=c.getKey();i.get(u)===null&&(i=i.insert(u,X.newInvalidDocument(u)))});let o=Tt();return i.forEach((a,c)=>{const u=s.get(a);u!==void 0&&kt(u.mutation,c,ae.empty(),$.now()),nr(n,c)&&(o=o.insert(a,c))}),o})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af{constructor(e){this.serializer=e,this.Zn=new Map,this.Xn=new Map}getBundleMetadata(e,n){return p.resolve(this.Zn.get(n))}saveBundleMetadata(e,n){var r;return this.Zn.set(n.id,{id:(r=n).id,version:r.version,createTime:fe(r.createTime)}),p.resolve()}getNamedQuery(e,n){return p.resolve(this.Xn.get(n))}saveNamedQuery(e,n){return this.Xn.set(n.name,function(r){return{name:r.name,query:ef(r.bundledQuery),readTime:fe(r.readTime)}}(n)),p.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cf{constructor(){this.overlays=new j(w.comparator),this.ts=new Map}getOverlay(e,n){return p.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Fe();return p.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.re(e,n,i)}),p.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.ts.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.ts.delete(r)),p.resolve()}getOverlaysForCollection(e,n,r){const s=Fe(),i=n.length+1,o=new w(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,u=c.getKey();if(!n.isPrefixOf(u.path))break;u.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return p.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new j((u,l)=>u-l);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===n&&u.largestBatchId>r){let l=i.get(u.largestBatchId);l===null&&(l=Fe(),i=i.insert(u.largestBatchId,l)),l.set(u.getKey(),u)}}const a=Fe(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((u,l)=>a.set(u,l)),!(a.size()>=s)););return p.resolve(a)}re(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.ts.get(s.largestBatchId).delete(r.key);this.ts.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Ld(n,r));let i=this.ts.get(n);i===void 0&&(i=A(),this.ts.set(n,i)),this.ts.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(){this.es=new q(z.ns),this.ss=new q(z.rs)}isEmpty(){return this.es.isEmpty()}addReference(e,n){const r=new z(e,n);this.es=this.es.add(r),this.ss=this.ss.add(r)}os(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.us(new z(e,n))}cs(e,n){e.forEach(r=>this.removeReference(r,n))}hs(e){const n=new w(new M([])),r=new z(n,e),s=new z(n,e+1),i=[];return this.ss.forEachInRange([r,s],o=>{this.us(o),i.push(o.key)}),i}ls(){this.es.forEach(e=>this.us(e))}us(e){this.es=this.es.delete(e),this.ss=this.ss.delete(e)}fs(e){const n=new w(new M([])),r=new z(n,e),s=new z(n,e+1);let i=A();return this.ss.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new z(e,0),r=this.es.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class z{constructor(e,n){this.key=e,this.ds=n}static ns(e,n){return w.comparator(e.key,n.key)||R(e.ds,n.ds)}static rs(e,n){return R(e.ds,n.ds)||w.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uf{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.ws=1,this._s=new q(z.ns)}checkEmpty(e){return p.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.ws;this.ws++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new xd(i,n,r,s);this.mutationQueue.push(o);for(const a of s)this._s=this._s.add(new z(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return p.resolve(o)}lookupMutationBatch(e,n){return p.resolve(this.gs(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.ys(r),i=s<0?0:s;return p.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return p.resolve(this.mutationQueue.length===0?-1:this.ws-1)}getAllMutationBatches(e){return p.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new z(n,0),s=new z(n,Number.POSITIVE_INFINITY),i=[];return this._s.forEachInRange([r,s],o=>{const a=this.gs(o.ds);i.push(a)}),p.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new q(R);return n.forEach(s=>{const i=new z(s,0),o=new z(s,Number.POSITIVE_INFINITY);this._s.forEachInRange([i,o],a=>{r=r.add(a.ds)})}),p.resolve(this.ps(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;w.isDocumentKey(i)||(i=i.child(""));const o=new z(new w(i),0);let a=new q(R);return this._s.forEachWhile(c=>{const u=c.key.path;return!!r.isPrefixOf(u)&&(u.length===s&&(a=a.add(c.ds)),!0)},o),p.resolve(this.ps(a))}ps(e){const n=[];return e.forEach(r=>{const s=this.gs(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){O(this.Is(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this._s;return p.forEach(n.mutations,s=>{const i=new z(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this._s=r})}En(e){}containsKey(e,n){const r=new z(n,0),s=this._s.firstAfterOrEqual(r);return p.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,p.resolve()}Is(e,n){return this.ys(e)}ys(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}gs(e){const n=this.ys(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(e){this.Ts=e,this.docs=new j(w.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.Ts(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return p.resolve(r?r.document.mutableCopy():X.newInvalidDocument(n))}getEntries(e,n){let r=Ie();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():X.newInvalidDocument(s))}),p.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=Ie();const o=n.path,a=new w(o.child("")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:u,value:{document:l}}=c.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||Xh(Yh(l),r)<=0||(s.has(l.key)||nr(n,l))&&(i=i.insert(l.key,l.mutableCopy()))}return p.resolve(i)}getAllFromCollectionGroup(e,n,r,s){I()}Es(e,n){return p.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new hf(this)}getSize(e){return p.resolve(this.size)}}class hf extends rf{constructor(e){super(),this.Jn=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.Jn.addEntry(e,s)):this.Jn.removeEntry(r)}),p.waitFor(n)}getFromCache(e,n){return this.Jn.getEntry(e,n)}getAllFromCache(e,n){return this.Jn.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class df{constructor(e){this.persistence=e,this.As=new dt(n=>Os(n),Ps),this.lastRemoteSnapshotVersion=C.min(),this.highestTargetId=0,this.Rs=0,this.vs=new qs,this.targetCount=0,this.bs=it.vn()}forEachTarget(e,n){return this.As.forEach((r,s)=>n(s)),p.resolve()}getLastRemoteSnapshotVersion(e){return p.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return p.resolve(this.Rs)}allocateTargetId(e){return this.highestTargetId=this.bs.next(),p.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Rs&&(this.Rs=n),p.resolve()}Sn(e){this.As.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.bs=new it(n),this.highestTargetId=n),e.sequenceNumber>this.Rs&&(this.Rs=e.sequenceNumber)}addTargetData(e,n){return this.Sn(n),this.targetCount+=1,p.resolve()}updateTargetData(e,n){return this.Sn(n),p.resolve()}removeTargetData(e,n){return this.As.delete(n.target),this.vs.hs(n.targetId),this.targetCount-=1,p.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.As.forEach((o,a)=>{a.sequenceNumber<=n&&r.get(a.targetId)===null&&(this.As.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),s++)}),p.waitFor(i).next(()=>s)}getTargetCount(e){return p.resolve(this.targetCount)}getTargetData(e,n){const r=this.As.get(n)||null;return p.resolve(r)}addMatchingKeys(e,n,r){return this.vs.os(n,r),p.resolve()}removeMatchingKeys(e,n,r){this.vs.cs(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),p.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.vs.hs(n),p.resolve()}getMatchingKeysForTargetId(e,n){const r=this.vs.fs(n);return p.resolve(r)}containsKey(e,n){return p.resolve(this.vs.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(e,n){this.Ps={},this.overlays={},this.Vs=new Rs(0),this.Ss=!1,this.Ss=!0,this.referenceDelegate=e(this),this.Ds=new df(this),this.indexManager=new tf,this.remoteDocumentCache=function(r){return new lf(r)}(r=>this.referenceDelegate.Cs(r)),this.serializer=new Zd(n),this.xs=new af(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Ss=!1,Promise.resolve()}get started(){return this.Ss}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new cf,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.Ps[e.toKey()];return r||(r=new uf(n,this.referenceDelegate),this.Ps[e.toKey()]=r),r}getTargetCache(){return this.Ds}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.xs}runTransaction(e,n,r){v("MemoryPersistence","Starting transaction:",e);const s=new pf(this.Vs.next());return this.referenceDelegate.Ns(),r(s).next(i=>this.referenceDelegate.ks(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Os(e,n){return p.or(Object.values(this.Ps).map(r=>()=>r.containsKey(e,n)))}}class pf extends Zh{constructor(e){super(),this.currentSequenceNumber=e}}class js{constructor(e){this.persistence=e,this.$s=new qs,this.Ms=null}static Fs(e){return new js(e)}get Bs(){if(this.Ms)return this.Ms;throw I()}addReference(e,n,r){return this.$s.addReference(r,n),this.Bs.delete(r.toString()),p.resolve()}removeReference(e,n,r){return this.$s.removeReference(r,n),this.Bs.add(r.toString()),p.resolve()}markPotentiallyOrphaned(e,n){return this.Bs.add(n.toString()),p.resolve()}removeTarget(e,n){this.$s.hs(n.targetId).forEach(s=>this.Bs.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.Bs.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}Ns(){this.Ms=new Set}ks(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return p.forEach(this.Bs,r=>{const s=w.fromPath(r);return this.Ls(e,s).next(i=>{i||n.removeEntry(s,C.min())})}).next(()=>(this.Ms=null,n.apply(e)))}updateLimboDocument(e,n){return this.Ls(e,n).next(r=>{r?this.Bs.delete(n.toString()):this.Bs.add(n.toString())})}Cs(e){return 0}Ls(e,n){return p.or([()=>p.resolve(this.$s.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Os(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.Vi=r,this.Si=s}static Di(e,n){let r=A(),s=A();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new zs(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mf{constructor(){this.Ci=!1}initialize(e,n){this.xi=e,this.indexManager=n,this.Ci=!0}getDocumentsMatchingQuery(e,n,r,s){return this.Ni(e,n).next(i=>i||this.ki(e,n,s,r)).next(i=>i||this.Oi(e,n))}Ni(e,n){if($i(n))return p.resolve(null);let r=be(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=es(n,null,"F"),r=be(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=A(...i);return this.xi.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,r).next(c=>{const u=this.$i(n,a);return this.Mi(n,u,o,c.readTime)?this.Ni(e,es(n,null,"F")):this.Fi(e,u,n,c)}))})))}ki(e,n,r,s){return $i(n)||s.isEqual(C.min())?this.Oi(e,n):this.xi.getDocuments(e,r).next(i=>{const o=this.$i(n,i);return this.Mi(n,o,r,s)?this.Oi(e,n):(xi()<=x.DEBUG&&v("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),ts(n)),this.Fi(e,o,n,Qh(s,-1)))})}$i(e,n){let r=new q(qa(e));return n.forEach((s,i)=>{nr(e,i)&&(r=r.add(i))}),r}Mi(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Oi(e,n){return xi()<=x.DEBUG&&v("QueryEngine","Using full collection scan to execute query:",ts(n)),this.xi.getDocumentsMatchingQuery(e,n,Ae.min())}Fi(e,n,r,s){return this.xi.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gf{constructor(e,n,r,s){this.persistence=e,this.Bi=n,this.serializer=s,this.Li=new j(R),this.qi=new dt(i=>Os(i),Ps),this.Ui=new Map,this.Ki=e.getRemoteDocumentCache(),this.Ds=e.getTargetCache(),this.xs=e.getBundleCache(),this.Gi(r)}Gi(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new of(this.Ki,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ki.setIndexManager(this.indexManager),this.Bi.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Li))}}function yf(t,e,n,r){return new gf(t,e,n,r)}async function hc(t,e){const n=D(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.Gi(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],a=[];let c=A();for(const u of s){o.push(u.batchId);for(const l of u.mutations)c=c.add(l.key)}for(const u of i){a.push(u.batchId);for(const l of u.mutations)c=c.add(l.key)}return n.localDocuments.getDocuments(r,c).next(u=>({Qi:u,removedBatchIds:o,addedBatchIds:a}))})})}function vf(t,e){const n=D(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.Ki.newChangeBuffer({trackRemovals:!0});return function(o,a,c,u){const l=c.batch,h=l.keys();let f=p.resolve();return h.forEach(m=>{f=f.next(()=>u.getEntry(a,m)).next(_=>{const S=c.docVersions.get(m);O(S!==null),_.version.compareTo(S)<0&&(l.applyToRemoteDocument(_,c),_.isValidDocument()&&(_.setReadTime(c.commitVersion),u.addEntry(_)))})}),f.next(()=>o.mutationQueue.removeMutationBatch(a,l))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(o){let a=A();for(let c=0;c<o.mutationResults.length;++c)o.mutationResults[c].transformResults.length>0&&(a=a.add(o.batch.mutations[c].key));return a}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function dc(t){const e=D(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ds.getLastRemoteSnapshotVersion(n))}function wf(t,e){const n=D(t),r=e.snapshotVersion;let s=n.Li;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.Ki.newChangeBuffer({trackRemovals:!0});s=n.Li;const a=[];e.targetChanges.forEach((l,h)=>{const f=s.get(h);if(!f)return;a.push(n.Ds.removeMatchingKeys(i,l.removedDocuments,h).next(()=>n.Ds.addMatchingKeys(i,l.addedDocuments,h)));let m=f.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.has(h)?m=m.withResumeToken(te.EMPTY_BYTE_STRING,C.min()).withLastLimboFreeSnapshotVersion(C.min()):l.resumeToken.approximateByteSize()>0&&(m=m.withResumeToken(l.resumeToken,r)),s=s.insert(h,m),function(_,S,N){return _.resumeToken.approximateByteSize()===0||S.snapshotVersion.toMicroseconds()-_.snapshotVersion.toMicroseconds()>=3e8?!0:N.addedDocuments.size+N.modifiedDocuments.size+N.removedDocuments.size>0}(f,m,l)&&a.push(n.Ds.updateTargetData(i,m))});let c=Ie(),u=A();if(e.documentUpdates.forEach(l=>{e.resolvedLimboDocuments.has(l)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,l))}),a.push(Ef(i,o,e.documentUpdates).next(l=>{c=l.zi,u=l.ji})),!r.isEqual(C.min())){const l=n.Ds.getLastRemoteSnapshotVersion(i).next(h=>n.Ds.setTargetsMetadata(i,i.currentSequenceNumber,r));a.push(l)}return p.waitFor(a).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,u)).next(()=>c)}).then(i=>(n.Li=s,i))}function Ef(t,e,n){let r=A(),s=A();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=Ie();return n.forEach((a,c)=>{const u=i.get(a);c.isFoundDocument()!==u.isFoundDocument()&&(s=s.add(a)),c.isNoDocument()&&c.version.isEqual(C.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):v("LocalStore","Ignoring outdated watch update for ",a,". Current version:",u.version," Watch version:",c.version)}),{zi:o,ji:s}})}function bf(t,e){const n=D(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function If(t,e){const n=D(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Ds.getTargetData(r,e).next(i=>i?(s=i,p.resolve(s)):n.Ds.allocateTargetId(r).next(o=>(s=new Ve(e,o,0,r.currentSequenceNumber),n.Ds.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.Li.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Li=n.Li.insert(r.targetId,r),n.qi.set(e,r.targetId)),r})}async function is(t,e,n){const r=D(t),s=r.Li.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Zt(o))throw o;v("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.Li=r.Li.remove(e),r.qi.delete(s.target)}function Yi(t,e,n){const r=D(t);let s=C.min(),i=A();return r.persistence.runTransaction("Execute query","readonly",o=>function(a,c,u){const l=D(a),h=l.qi.get(u);return h!==void 0?p.resolve(l.Li.get(h)):l.Ds.getTargetData(c,u)}(r,o,be(e)).next(a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,r.Ds.getMatchingKeysForTargetId(o,a.targetId).next(c=>{i=c})}).next(()=>r.Bi.getDocumentsMatchingQuery(o,e,n?s:C.min(),n?i:A())).next(a=>(Tf(r,gd(e),a),{documents:a,Wi:i})))}function Tf(t,e,n){let r=t.Ui.get(e)||C.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.Ui.set(e,r)}class Xi{constructor(){this.activeTargetIds=Ha()}tr(e){this.activeTargetIds=this.activeTargetIds.add(e)}er(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Xi(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Sf{constructor(){this.Br=new Xi,this.Lr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e){return this.Br.tr(e),this.Lr[e]||"not-current"}updateQueryState(e,n,r){this.Lr[e]=n}removeLocalQueryTarget(e){this.Br.er(e)}isLocalQueryTarget(e){return this.Br.activeTargetIds.has(e)}clearQueryState(e){delete this.Lr[e]}getAllActiveQueryTargets(){return this.Br.activeTargetIds}isActiveQueryTarget(e){return this.Br.activeTargetIds.has(e)}start(){return this.Br=new Xi,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cf{qr(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(){this.Ur=()=>this.Kr(),this.Gr=()=>this.Qr(),this.zr=[],this.jr()}qr(e){this.zr.push(e)}shutdown(){window.removeEventListener("online",this.Ur),window.removeEventListener("offline",this.Gr)}jr(){window.addEventListener("online",this.Ur),window.addEventListener("offline",this.Gr)}Kr(){v("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.zr)e(0)}Qr(){v("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.zr)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mn=null;function kr(){return mn===null?mn=268435456+Math.round(2147483648*Math.random()):mn++,"0x"+mn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _f={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(e){this.Wr=e.Wr,this.Hr=e.Hr}Jr(e){this.Yr=e}Zr(e){this.Xr=e}onMessage(e){this.eo=e}close(){this.Hr()}send(e){this.Wr(e)}no(){this.Yr()}so(e){this.Xr(e)}io(e){this.eo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q="WebChannelConnection";class Af extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http";this.ro=n+"://"+e.host,this.oo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get uo(){return!1}co(e,n,r,s,i){const o=kr(),a=this.ao(e,n);v("RestConnection",`Sending RPC '${e}' ${o}:`,a,r);const c={};return this.ho(c,s,i),this.lo(e,a,c,r).then(u=>(v("RestConnection",`Received RPC '${e}' ${o}: `,u),u),u=>{throw xn("RestConnection",`RPC '${e}' ${o} failed with error: `,u,"url: ",a,"request:",r),u})}fo(e,n,r,s,i,o){return this.co(e,n,r,s,i)}ho(e,n,r){e["X-Goog-Api-Client"]="gl-js/ fire/"+ht,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}ao(e,n){const r=_f[e];return`${this.ro}/v1/${n}:${r}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}lo(e,n,r,s){const i=kr();return new Promise((o,a)=>{const c=new Vh;c.setWithCredentials(!0),c.listenOnce(Ph.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Dr.NO_ERROR:const l=c.getResponseJson();v(Q,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(l)),o(l);break;case Dr.TIMEOUT:v(Q,`RPC '${e}' ${i} timed out`),a(new g(d.DEADLINE_EXCEEDED,"Request time out"));break;case Dr.HTTP_ERROR:const h=c.getStatus();if(v(Q,`RPC '${e}' ${i} failed with status:`,h,"response text:",c.getResponseText()),h>0){let f=c.getResponseJson();Array.isArray(f)&&(f=f[0]);const m=f==null?void 0:f.error;if(m&&m.status&&m.message){const _=function(S){const N=S.toLowerCase().replace(/_/g,"-");return Object.values(d).indexOf(N)>=0?N:d.UNKNOWN}(m.status);a(new g(_,m.message))}else a(new g(d.UNKNOWN,"Server responded with status "+c.getStatus()))}else a(new g(d.UNAVAILABLE,"Connection failed."));break;default:I()}}finally{v(Q,`RPC '${e}' ${i} completed.`)}});const u=JSON.stringify(s);v(Q,`RPC '${e}' ${i} sending request:`,s),c.send(n,"POST",u,r,15)})}wo(e,n,r){const s=kr(),i=[this.ro,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Mh(),a=Oh(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(c.xmlHttpFactory=new Uh({})),this.ho(c.initMessageHeaders,n,r),c.encodeInitMessageHeaders=!0;const u=i.join("");v(Q,`Creating RPC '${e}' stream ${s}: ${u}`,c);const l=o.createWebChannel(u,c);let h=!1,f=!1;const m=new Df({Wr:S=>{f?v(Q,`Not sending because RPC '${e}' stream ${s} is closed:`,S):(h||(v(Q,`Opening RPC '${e}' stream ${s} transport.`),l.open(),h=!0),v(Q,`RPC '${e}' stream ${s} sending:`,S),l.send(S))},Hr:()=>l.close()}),_=(S,N,ne)=>{S.listen(N,oe=>{try{ne(oe)}catch(me){setTimeout(()=>{throw me},0)}})};return _(l,hn.EventType.OPEN,()=>{f||v(Q,`RPC '${e}' stream ${s} transport opened.`)}),_(l,hn.EventType.CLOSE,()=>{f||(f=!0,v(Q,`RPC '${e}' stream ${s} transport closed`),m.so())}),_(l,hn.EventType.ERROR,S=>{f||(f=!0,xn(Q,`RPC '${e}' stream ${s} transport errored:`,S),m.so(new g(d.UNAVAILABLE,"The operation could not be completed")))}),_(l,hn.EventType.MESSAGE,S=>{var N;if(!f){const ne=S.data[0];O(!!ne);const oe=ne,me=oe.error||((N=oe[0])===null||N===void 0?void 0:N.error);if(me){v(Q,`RPC '${e}' stream ${s} received error:`,me);const vt=me.status;let wt=function(Xc){const ci=U[Xc];if(ci!==void 0)return nc(ci)}(vt),ai=me.message;wt===void 0&&(wt=d.INTERNAL,ai="Unknown error status: "+vt+" with message "+me.message),f=!0,m.so(new g(wt,ai)),l.close()}else v(Q,`RPC '${e}' stream ${s} received:`,ne),m.io(ne)}}),_(a,Fh.STAT_EVENT,S=>{S.stat===ki.PROXY?v(Q,`RPC '${e}' stream ${s} detected buffering proxy`):S.stat===ki.NOPROXY&&v(Q,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{m.no()},0),m}}function Nr(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function or(t){return new Vd(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(e,n,r=1e3,s=1.5,i=6e4){this.Ws=e,this.timerId=n,this._o=r,this.mo=s,this.yo=i,this.po=0,this.Io=null,this.To=Date.now(),this.reset()}reset(){this.po=0}Eo(){this.po=this.yo}Ao(e){this.cancel();const n=Math.floor(this.po+this.Ro()),r=Math.max(0,Date.now()-this.To),s=Math.max(0,n-r);s>0&&v("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.po} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.Io=this.Ws.enqueueAfterDelay(this.timerId,s,()=>(this.To=Date.now(),e())),this.po*=this.mo,this.po<this._o&&(this.po=this._o),this.po>this.yo&&(this.po=this.yo)}vo(){this.Io!==null&&(this.Io.skipDelay(),this.Io=null)}cancel(){this.Io!==null&&(this.Io.cancel(),this.Io=null)}Ro(){return(Math.random()-.5)*this.po}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(e,n,r,s,i,o,a,c){this.Ws=e,this.bo=r,this.Po=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.Vo=0,this.So=null,this.Do=null,this.stream=null,this.Co=new fc(e,n)}xo(){return this.state===1||this.state===5||this.No()}No(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.ko()}async stop(){this.xo()&&await this.close(0)}Oo(){this.state=0,this.Co.reset()}$o(){this.No()&&this.So===null&&(this.So=this.Ws.enqueueAfterDelay(this.bo,6e4,()=>this.Mo()))}Fo(e){this.Bo(),this.stream.send(e)}async Mo(){if(this.No())return this.close(0)}Bo(){this.So&&(this.So.cancel(),this.So=null)}Lo(){this.Do&&(this.Do.cancel(),this.Do=null)}async close(e,n){this.Bo(),this.Lo(),this.Co.cancel(),this.Vo++,e!==4?this.Co.reset():n&&n.code===d.RESOURCE_EXHAUSTED?(Ee(n.toString()),Ee("Using maximum backoff delay to prevent overloading the backend."),this.Co.Eo()):n&&n.code===d.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.qo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Zr(n)}qo(){}auth(){this.state=1;const e=this.Uo(this.Vo),n=this.Vo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Vo===n&&this.Ko(r,s)},r=>{e(()=>{const s=new g(d.UNKNOWN,"Fetching auth token failed: "+r.message);return this.Go(s)})})}Ko(e,n){const r=this.Uo(this.Vo);this.stream=this.Qo(e,n),this.stream.Jr(()=>{r(()=>(this.state=2,this.Do=this.Ws.enqueueAfterDelay(this.Po,1e4,()=>(this.No()&&(this.state=3),Promise.resolve())),this.listener.Jr()))}),this.stream.Zr(s=>{r(()=>this.Go(s))}),this.stream.onMessage(s=>{r(()=>this.onMessage(s))})}ko(){this.state=5,this.Co.Ao(async()=>{this.state=0,this.start()})}Go(e){return v("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Uo(e){return n=>{this.Ws.enqueueAndForget(()=>this.Vo===e?n():(v("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class kf extends pc{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}Qo(e,n){return this.connection.wo("Listen",e,n)}onMessage(e){this.Co.reset();const n=qd(this.serializer,e),r=function(s){if(!("targetChange"in s))return C.min();const i=s.targetChange;return i.targetIds&&i.targetIds.length?C.min():i.readTime?fe(i.readTime):C.min()}(e);return this.listener.zo(n,r)}jo(e){const n={};n.database=ss(this.serializer),n.addTarget=function(s,i){let o;const a=i.target;return o=Jr(a)?{documents:Gd(s,a)}:{query:Hd(s,a)},o.targetId=i.targetId,i.resumeToken.approximateByteSize()>0?o.resumeToken=ic(s,i.resumeToken):i.snapshotVersion.compareTo(C.min())>0&&(o.readTime=Pn(s,i.snapshotVersion.toTimestamp())),o}(this.serializer,e);const r=Wd(this.serializer,e);r&&(n.labels=r),this.Fo(n)}Wo(e){const n={};n.database=ss(this.serializer),n.removeTarget=e,this.Fo(n)}}class Nf extends pc{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i,this.Ho=!1}get Jo(){return this.Ho}start(){this.Ho=!1,this.lastStreamToken=void 0,super.start()}qo(){this.Ho&&this.Yo([])}Qo(e,n){return this.connection.wo("Write",e,n)}onMessage(e){if(O(!!e.streamToken),this.lastStreamToken=e.streamToken,this.Ho){this.Co.reset();const n=zd(e.writeResults,e.commitTime),r=fe(e.commitTime);return this.listener.Zo(r,n)}return O(!e.writeResults||e.writeResults.length===0),this.Ho=!0,this.listener.Xo()}tu(){const e={};e.database=ss(this.serializer),this.Fo(e)}Yo(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>jd(this.serializer,r))};this.Fo(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xf extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.eu=!1}nu(){if(this.eu)throw new g(d.FAILED_PRECONDITION,"The client has already been terminated.")}co(e,n,r){return this.nu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.co(e,n,r,s,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===d.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new g(d.UNKNOWN,s.toString())})}fo(e,n,r,s){return this.nu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.fo(e,n,r,i,o,s)).catch(i=>{throw i.name==="FirebaseError"?(i.code===d.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new g(d.UNKNOWN,i.toString())})}terminate(){this.eu=!0}}class Lf{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.su=0,this.iu=null,this.ru=!0}ou(){this.su===0&&(this.uu("Unknown"),this.iu=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.iu=null,this.cu("Backend didn't respond within 10 seconds."),this.uu("Offline"),Promise.resolve())))}au(e){this.state==="Online"?this.uu("Unknown"):(this.su++,this.su>=1&&(this.hu(),this.cu(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.uu("Offline")))}set(e){this.hu(),this.su=0,e==="Online"&&(this.ru=!1),this.uu(e)}uu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}cu(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ru?(Ee(n),this.ru=!1):v("OnlineStateTracker",n)}hu(){this.iu!==null&&(this.iu.cancel(),this.iu=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rf{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.lu=[],this.fu=new Map,this.du=new Set,this.wu=[],this._u=i,this._u.qr(o=>{r.enqueueAndForget(async()=>{Ge(this)&&(v("RemoteStore","Restarting streams for network reachability change."),await async function(a){const c=D(a);c.du.add(4),await rn(c),c.mu.set("Unknown"),c.du.delete(4),await ar(c)}(this))})}),this.mu=new Lf(r,s)}}async function ar(t){if(Ge(t))for(const e of t.wu)await e(!0)}async function rn(t){for(const e of t.wu)await e(!1)}function mc(t,e){const n=D(t);n.fu.has(e.targetId)||(n.fu.set(e.targetId,e),Ks(n)?Hs(n):ft(n).No()&&Gs(n,e))}function gc(t,e){const n=D(t),r=ft(n);n.fu.delete(e),r.No()&&yc(n,e),n.fu.size===0&&(r.No()?r.$o():Ge(n)&&n.mu.set("Unknown"))}function Gs(t,e){t.gu.Ot(e.targetId),ft(t).jo(e)}function yc(t,e){t.gu.Ot(e),ft(t).Wo(e)}function Hs(t){t.gu=new Od({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ne:e=>t.fu.get(e)||null}),ft(t).start(),t.mu.ou()}function Ks(t){return Ge(t)&&!ft(t).xo()&&t.fu.size>0}function Ge(t){return D(t).du.size===0}function vc(t){t.gu=void 0}async function Mf(t){t.fu.forEach((e,n)=>{Gs(t,e)})}async function Of(t,e){vc(t),Ks(t)?(t.mu.au(e),Hs(t)):t.mu.set("Unknown")}async function Pf(t,e,n){if(t.mu.set("Online"),e instanceof sc&&e.state===2&&e.cause)try{await async function(r,s){const i=s.cause;for(const o of s.targetIds)r.fu.has(o)&&(await r.remoteSyncer.rejectListen(o,i),r.fu.delete(o),r.gu.removeTarget(o))}(t,e)}catch(r){v("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Fn(t,r)}else if(e instanceof vn?t.gu.Kt(e):e instanceof rc?t.gu.Jt(e):t.gu.zt(e),!n.isEqual(C.min()))try{const r=await dc(t.localStore);n.compareTo(r)>=0&&await function(s,i){const o=s.gu.Xt(i);return o.targetChanges.forEach((a,c)=>{if(a.resumeToken.approximateByteSize()>0){const u=s.fu.get(c);u&&s.fu.set(c,u.withResumeToken(a.resumeToken,i))}}),o.targetMismatches.forEach(a=>{const c=s.fu.get(a);if(!c)return;s.fu.set(a,c.withResumeToken(te.EMPTY_BYTE_STRING,c.snapshotVersion)),yc(s,a);const u=new Ve(c.target,a,1,c.sequenceNumber);Gs(s,u)}),s.remoteSyncer.applyRemoteEvent(o)}(t,n)}catch(r){v("RemoteStore","Failed to raise snapshot:",r),await Fn(t,r)}}async function Fn(t,e,n){if(!Zt(e))throw e;t.du.add(1),await rn(t),t.mu.set("Offline"),n||(n=()=>dc(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{v("RemoteStore","Retrying IndexedDB access"),await n(),t.du.delete(1),await ar(t)})}function wc(t,e){return e().catch(n=>Fn(t,n,e))}async function cr(t){const e=D(t),n=Ne(e);let r=e.lu.length>0?e.lu[e.lu.length-1].batchId:-1;for(;Ff(e);)try{const s=await bf(e.localStore,r);if(s===null){e.lu.length===0&&n.$o();break}r=s.batchId,Uf(e,s)}catch(s){await Fn(e,s)}Ec(e)&&bc(e)}function Ff(t){return Ge(t)&&t.lu.length<10}function Uf(t,e){t.lu.push(e);const n=Ne(t);n.No()&&n.Jo&&n.Yo(e.mutations)}function Ec(t){return Ge(t)&&!Ne(t).xo()&&t.lu.length>0}function bc(t){Ne(t).start()}async function Vf(t){Ne(t).tu()}async function Bf(t){const e=Ne(t);for(const n of t.lu)e.Yo(n.mutations)}async function $f(t,e,n){const r=t.lu.shift(),s=Vs.from(r,e,n);await wc(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await cr(t)}async function qf(t,e){e&&Ne(t).Jo&&await async function(n,r){if(s=r.code,Md(s)&&s!==d.ABORTED){const i=n.lu.shift();Ne(n).Oo(),await wc(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,r)),await cr(n)}var s}(t,e),Ec(t)&&bc(t)}async function Zi(t,e){const n=D(t);n.asyncQueue.verifyOperationInProgress(),v("RemoteStore","RemoteStore received new credentials");const r=Ge(n);n.du.add(3),await rn(n),r&&n.mu.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.du.delete(3),await ar(n)}async function jf(t,e){const n=D(t);e?(n.du.delete(2),await ar(n)):e||(n.du.add(2),await rn(n),n.mu.set("Unknown"))}function ft(t){return t.yu||(t.yu=function(e,n,r){const s=D(e);return s.nu(),new kf(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(t.datastore,t.asyncQueue,{Jr:Mf.bind(null,t),Zr:Of.bind(null,t),zo:Pf.bind(null,t)}),t.wu.push(async e=>{e?(t.yu.Oo(),Ks(t)?Hs(t):t.mu.set("Unknown")):(await t.yu.stop(),vc(t))})),t.yu}function Ne(t){return t.pu||(t.pu=function(e,n,r){const s=D(e);return s.nu(),new Nf(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(t.datastore,t.asyncQueue,{Jr:Vf.bind(null,t),Zr:qf.bind(null,t),Xo:Bf.bind(null,t),Zo:$f.bind(null,t)}),t.wu.push(async e=>{e?(t.pu.Oo(),await cr(t)):(await t.pu.stop(),t.lu.length>0&&(v("RemoteStore",`Stopping write stream with ${t.lu.length} pending writes`),t.lu=[]))})),t.pu}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new ye,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,a=new Ws(e,n,o,s,i);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new g(d.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Qs(t,e){if(Ee("AsyncQueue",`${e}: ${t}`),Zt(t))return new g(d.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.comparator=e?(n,r)=>e(n,r)||w.comparator(n.key,r.key):(n,r)=>w.comparator(n.key,r.key),this.keyedMap=Tt(),this.sortedSet=new j(this.comparator)}static emptySet(e){return new Je(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Je)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Je;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eo{constructor(){this.Iu=new j(w.comparator)}track(e){const n=e.doc.key,r=this.Iu.get(n);r?e.type!==0&&r.type===3?this.Iu=this.Iu.insert(n,e):e.type===3&&r.type!==1?this.Iu=this.Iu.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Iu=this.Iu.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Iu=this.Iu.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Iu=this.Iu.remove(n):e.type===1&&r.type===2?this.Iu=this.Iu.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Iu=this.Iu.insert(n,{type:2,doc:e.doc}):I():this.Iu=this.Iu.insert(n,e)}Tu(){const e=[];return this.Iu.inorderTraversal((n,r)=>{e.push(r)}),e}}class ot{constructor(e,n,r,s,i,o,a,c,u){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(a=>{o.push({type:0,doc:a})}),new ot(e,n,Je.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&tr(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{constructor(){this.Eu=void 0,this.listeners=[]}}class Gf{constructor(){this.queries=new dt(e=>$a(e),tr),this.onlineState="Unknown",this.Au=new Set}}async function Ic(t,e){const n=D(t),r=e.query;let s=!1,i=n.queries.get(r);if(i||(s=!0,i=new zf),s)try{i.Eu=await n.onListen(r)}catch(o){const a=Qs(o,`Initialization of query '${ts(e.query)}' failed`);return void e.onError(a)}n.queries.set(r,i),i.listeners.push(e),e.Ru(n.onlineState),i.Eu&&e.vu(i.Eu)&&Ys(n)}async function Tc(t,e){const n=D(t),r=e.query;let s=!1;const i=n.queries.get(r);if(i){const o=i.listeners.indexOf(e);o>=0&&(i.listeners.splice(o,1),s=i.listeners.length===0)}if(s)return n.queries.delete(r),n.onUnlisten(r)}function Hf(t,e){const n=D(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const a of o.listeners)a.vu(s)&&(r=!0);o.Eu=s}}r&&Ys(n)}function Kf(t,e,n){const r=D(t),s=r.queries.get(e);if(s)for(const i of s.listeners)i.onError(n);r.queries.delete(e)}function Ys(t){t.Au.forEach(e=>{e.next()})}class Sc{constructor(e,n,r){this.query=e,this.bu=n,this.Pu=!1,this.Vu=null,this.onlineState="Unknown",this.options=r||{}}vu(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new ot(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Pu?this.Su(e)&&(this.bu.next(e),n=!0):this.Du(e,this.onlineState)&&(this.Cu(e),n=!0),this.Vu=e,n}onError(e){this.bu.error(e)}Ru(e){this.onlineState=e;let n=!1;return this.Vu&&!this.Pu&&this.Du(this.Vu,e)&&(this.Cu(this.Vu),n=!0),n}Du(e,n){if(!e.fromCache)return!0;const r=n!=="Offline";return(!this.options.xu||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Su(e){if(e.docChanges.length>0)return!0;const n=this.Vu&&this.Vu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}Cu(e){e=ot.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Pu=!0,this.bu.next(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cc{constructor(e){this.key=e}}class _c{constructor(e){this.key=e}}class Wf{constructor(e,n){this.query=e,this.Lu=n,this.qu=null,this.hasCachedResults=!1,this.current=!1,this.Uu=A(),this.mutatedKeys=A(),this.Ku=qa(e),this.Gu=new Je(this.Ku)}get Qu(){return this.Lu}zu(e,n){const r=n?n.ju:new eo,s=n?n.Gu:this.Gu;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,a=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,u=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((l,h)=>{const f=s.get(l),m=nr(this.query,h)?h:null,_=!!f&&this.mutatedKeys.has(f.key),S=!!m&&(m.hasLocalMutations||this.mutatedKeys.has(m.key)&&m.hasCommittedMutations);let N=!1;f&&m?f.data.isEqual(m.data)?_!==S&&(r.track({type:3,doc:m}),N=!0):this.Wu(f,m)||(r.track({type:2,doc:m}),N=!0,(c&&this.Ku(m,c)>0||u&&this.Ku(m,u)<0)&&(a=!0)):!f&&m?(r.track({type:0,doc:m}),N=!0):f&&!m&&(r.track({type:1,doc:f}),N=!0,(c||u)&&(a=!0)),N&&(m?(o=o.add(m),i=S?i.add(l):i.delete(l)):(o=o.delete(l),i=i.delete(l)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const l=this.query.limitType==="F"?o.last():o.first();o=o.delete(l.key),i=i.delete(l.key),r.track({type:1,doc:l})}return{Gu:o,ju:r,Mi:a,mutatedKeys:i}}Wu(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r){const s=this.Gu;this.Gu=e.Gu,this.mutatedKeys=e.mutatedKeys;const i=e.ju.Tu();i.sort((u,l)=>function(h,f){const m=_=>{switch(_){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return I()}};return m(h)-m(f)}(u.type,l.type)||this.Ku(u.doc,l.doc)),this.Hu(r);const o=n?this.Ju():[],a=this.Uu.size===0&&this.current?1:0,c=a!==this.qu;return this.qu=a,i.length!==0||c?{snapshot:new ot(this.query,e.Gu,s,i,e.mutatedKeys,a===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),Yu:o}:{Yu:o}}Ru(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Gu:this.Gu,ju:new eo,mutatedKeys:this.mutatedKeys,Mi:!1},!1)):{Yu:[]}}Zu(e){return!this.Lu.has(e)&&!!this.Gu.has(e)&&!this.Gu.get(e).hasLocalMutations}Hu(e){e&&(e.addedDocuments.forEach(n=>this.Lu=this.Lu.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Lu=this.Lu.delete(n)),this.current=e.current)}Ju(){if(!this.current)return[];const e=this.Uu;this.Uu=A(),this.Gu.forEach(r=>{this.Zu(r.key)&&(this.Uu=this.Uu.add(r.key))});const n=[];return e.forEach(r=>{this.Uu.has(r)||n.push(new _c(r))}),this.Uu.forEach(r=>{e.has(r)||n.push(new Cc(r))}),n}Xu(e){this.Lu=e.Wi,this.Uu=A();const n=this.zu(e.documents);return this.applyChanges(n,!0)}tc(){return ot.fromInitialDocuments(this.query,this.Gu,this.mutatedKeys,this.qu===0,this.hasCachedResults)}}class Qf{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class Yf{constructor(e){this.key=e,this.ec=!1}}class Xf{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.nc={},this.sc=new dt(a=>$a(a),tr),this.ic=new Map,this.rc=new Set,this.oc=new j(w.comparator),this.uc=new Map,this.cc=new qs,this.ac={},this.hc=new Map,this.lc=it.bn(),this.onlineState="Unknown",this.fc=void 0}get isPrimaryClient(){return this.fc===!0}}async function Jf(t,e){const n=cp(t);let r,s;const i=n.sc.get(e);if(i)r=i.targetId,n.sharedClientState.addLocalQueryTarget(r),s=i.view.tc();else{const o=await If(n.localStore,be(e));n.isPrimaryClient&&mc(n.remoteStore,o);const a=n.sharedClientState.addLocalQueryTarget(o.targetId);r=o.targetId,s=await Zf(n,e,r,a==="current",o.resumeToken)}return s}async function Zf(t,e,n,r,s){t.dc=(h,f,m)=>async function(_,S,N,ne){let oe=S.view.zu(N);oe.Mi&&(oe=await Yi(_.localStore,S.query,!1).then(({documents:wt})=>S.view.zu(wt,oe)));const me=ne&&ne.targetChanges.get(S.targetId),vt=S.view.applyChanges(oe,_.isPrimaryClient,me);return no(_,S.targetId,vt.Yu),vt.snapshot}(t,h,f,m);const i=await Yi(t.localStore,e,!0),o=new Wf(e,i.Wi),a=o.zu(i.documents),c=nn.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),u=o.applyChanges(a,t.isPrimaryClient,c);no(t,n,u.Yu);const l=new Qf(e,n,o);return t.sc.set(e,l),t.ic.has(n)?t.ic.get(n).push(e):t.ic.set(n,[e]),u.snapshot}async function ep(t,e){const n=D(t),r=n.sc.get(e),s=n.ic.get(r.targetId);if(s.length>1)return n.ic.set(r.targetId,s.filter(i=>!tr(i,e))),void n.sc.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await is(n.localStore,r.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(r.targetId),gc(n.remoteStore,r.targetId),os(n,r.targetId)}).catch(Jt)):(os(n,r.targetId),await is(n.localStore,r.targetId,!0))}async function tp(t,e,n){const r=up(t);try{const s=await function(i,o){const a=D(i),c=$.now(),u=o.reduce((f,m)=>f.add(m.key),A());let l,h;return a.persistence.runTransaction("Locally write mutations","readwrite",f=>{let m=Ie(),_=A();return a.Ki.getEntries(f,u).next(S=>{m=S,m.forEach((N,ne)=>{ne.isValidDocument()||(_=_.add(N))})}).next(()=>a.localDocuments.getOverlayedDocuments(f,m)).next(S=>{l=S;const N=[];for(const ne of o){const oe=kd(ne,l.get(ne.key).overlayedDocument);oe!=null&&N.push(new Re(ne.key,oe,La(oe.value.mapValue),de.exists(!0)))}return a.mutationQueue.addMutationBatch(f,c,N,o)}).next(S=>{h=S;const N=S.applyToLocalDocumentSet(l,_);return a.documentOverlayCache.saveOverlays(f,S.batchId,N)})}).then(()=>({batchId:h.batchId,changes:za(l)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(i,o,a){let c=i.ac[i.currentUser.toKey()];c||(c=new j(R)),c=c.insert(o,a),i.ac[i.currentUser.toKey()]=c}(r,s.batchId,n),await sn(r,s.changes),await cr(r.remoteStore)}catch(s){const i=Qs(s,"Failed to persist write");n.reject(i)}}async function Dc(t,e){const n=D(t);try{const r=await wf(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.uc.get(i);o&&(O(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.ec=!0:s.modifiedDocuments.size>0?O(o.ec):s.removedDocuments.size>0&&(O(o.ec),o.ec=!1))}),await sn(n,r,e)}catch(r){await Jt(r)}}function to(t,e,n){const r=D(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.sc.forEach((i,o)=>{const a=o.view.Ru(e);a.snapshot&&s.push(a.snapshot)}),function(i,o){const a=D(i);a.onlineState=o;let c=!1;a.queries.forEach((u,l)=>{for(const h of l.listeners)h.Ru(o)&&(c=!0)}),c&&Ys(a)}(r.eventManager,e),s.length&&r.nc.zo(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function np(t,e,n){const r=D(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.uc.get(e),i=s&&s.key;if(i){let o=new j(w.comparator);o=o.insert(i,X.newNoDocument(i,C.min()));const a=A().add(i),c=new ir(C.min(),new Map,new q(R),o,a);await Dc(r,c),r.oc=r.oc.remove(i),r.uc.delete(e),Xs(r)}else await is(r.localStore,e,!1).then(()=>os(r,e,n)).catch(Jt)}async function rp(t,e){const n=D(t),r=e.batch.batchId;try{const s=await vf(n.localStore,e);kc(n,r,null),Ac(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await sn(n,s)}catch(s){await Jt(s)}}async function sp(t,e,n){const r=D(t);try{const s=await function(i,o){const a=D(i);return a.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let u;return a.mutationQueue.lookupMutationBatch(c,o).next(l=>(O(l!==null),u=l.keys(),a.mutationQueue.removeMutationBatch(c,l))).next(()=>a.mutationQueue.performConsistencyCheck(c)).next(()=>a.documentOverlayCache.removeOverlaysForBatchId(c,u,o)).next(()=>a.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,u)).next(()=>a.localDocuments.getDocuments(c,u))})}(r.localStore,e);kc(r,e,n),Ac(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await sn(r,s)}catch(s){await Jt(s)}}function Ac(t,e){(t.hc.get(e)||[]).forEach(n=>{n.resolve()}),t.hc.delete(e)}function kc(t,e,n){const r=D(t);let s=r.ac[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.ac[r.currentUser.toKey()]=s}}function os(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.ic.get(e))t.sc.delete(r),n&&t.nc.wc(r,n);t.ic.delete(e),t.isPrimaryClient&&t.cc.hs(e).forEach(r=>{t.cc.containsKey(r)||Nc(t,r)})}function Nc(t,e){t.rc.delete(e.path.canonicalString());const n=t.oc.get(e);n!==null&&(gc(t.remoteStore,n),t.oc=t.oc.remove(e),t.uc.delete(n),Xs(t))}function no(t,e,n){for(const r of n)r instanceof Cc?(t.cc.addReference(r.key,e),ip(t,r)):r instanceof _c?(v("SyncEngine","Document no longer in limbo: "+r.key),t.cc.removeReference(r.key,e),t.cc.containsKey(r.key)||Nc(t,r.key)):I()}function ip(t,e){const n=e.key,r=n.path.canonicalString();t.oc.get(n)||t.rc.has(r)||(v("SyncEngine","New document in limbo: "+n),t.rc.add(r),Xs(t))}function Xs(t){for(;t.rc.size>0&&t.oc.size<t.maxConcurrentLimboResolutions;){const e=t.rc.values().next().value;t.rc.delete(e);const n=new w(M.fromString(e)),r=t.lc.next();t.uc.set(r,new Yf(n)),t.oc=t.oc.insert(n,r),mc(t.remoteStore,new Ve(be(Fs(n.path)),r,2,Rs.ct))}}async function sn(t,e,n){const r=D(t),s=[],i=[],o=[];r.sc.isEmpty()||(r.sc.forEach((a,c)=>{o.push(r.dc(c,e,n).then(u=>{if((u||n)&&r.isPrimaryClient&&r.sharedClientState.updateQueryState(c.targetId,u!=null&&u.fromCache?"not-current":"current"),u){s.push(u);const l=zs.Di(c.targetId,u);i.push(l)}}))}),await Promise.all(o),r.nc.zo(s),await async function(a,c){const u=D(a);try{await u.persistence.runTransaction("notifyLocalViewChanges","readwrite",l=>p.forEach(c,h=>p.forEach(h.Vi,f=>u.persistence.referenceDelegate.addReference(l,h.targetId,f)).next(()=>p.forEach(h.Si,f=>u.persistence.referenceDelegate.removeReference(l,h.targetId,f)))))}catch(l){if(!Zt(l))throw l;v("LocalStore","Failed to update sequence numbers: "+l)}for(const l of c){const h=l.targetId;if(!l.fromCache){const f=u.Li.get(h),m=f.snapshotVersion,_=f.withLastLimboFreeSnapshotVersion(m);u.Li=u.Li.insert(h,_)}}}(r.localStore,i))}async function op(t,e){const n=D(t);if(!n.currentUser.isEqual(e)){v("SyncEngine","User change. New user:",e.toKey());const r=await hc(n.localStore,e);n.currentUser=e,function(s,i){s.hc.forEach(o=>{o.forEach(a=>{a.reject(new g(d.CANCELLED,i))})}),s.hc.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await sn(n,r.Qi)}}function ap(t,e){const n=D(t),r=n.uc.get(e);if(r&&r.ec)return A().add(r.key);{let s=A();const i=n.ic.get(e);if(!i)return s;for(const o of i){const a=n.sc.get(o);s=s.unionWith(a.view.Qu)}return s}}function cp(t){const e=D(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Dc.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=ap.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=np.bind(null,e),e.nc.zo=Hf.bind(null,e.eventManager),e.nc.wc=Kf.bind(null,e.eventManager),e}function up(t){const e=D(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=rp.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=sp.bind(null,e),e}class ro{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=or(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,n){return null}createIndexBackfillerScheduler(e,n){return null}createLocalStore(e){return yf(this.persistence,new mf,e.initialUser,this.serializer)}createPersistence(e){return new ff(js.Fs,this.serializer)}createSharedClientState(e){return new Sf}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class lp{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>to(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=op.bind(null,this.syncEngine),await jf(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new Gf}createDatastore(e){const n=or(e.databaseInfo.databaseId),r=(s=e.databaseInfo,new Af(s));var s;return function(i,o,a,c){return new xf(i,o,a,c)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return n=this.localStore,r=this.datastore,s=e.asyncQueue,i=a=>to(this.syncEngine,a,0),o=Ji.D()?new Ji:new Cf,new Rf(n,r,s,i,o);var n,r,s,i,o}createSyncEngine(e,n){return function(r,s,i,o,a,c,u){const l=new Xf(r,s,i,o,a,c);return u&&(l.fc=!0),l}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}terminate(){return async function(e){const n=D(e);v("RemoteStore","RemoteStore shutting down."),n.du.add(5),await rn(n),n._u.shutdown(),n.mu.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.gc(this.observer.next,e)}error(e){this.observer.error?this.gc(this.observer.error,e):Ee("Uncaught Error in snapshot listener:",e.toString())}yc(){this.muted=!0}gc(e,n){this.muted||setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hp{constructor(e,n,r,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=Y.UNAUTHENTICATED,this.clientId=Aa.A(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async i=>{v("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(r,i=>(v("FirestoreClient","Received new app check token=",i),this.appCheckCredentialListener(i,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new g(d.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new ye;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Qs(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function xr(t,e){t.asyncQueue.verifyOperationInProgress(),v("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await hc(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function so(t,e){t.asyncQueue.verifyOperationInProgress();const n=await fp(t);v("FirestoreClient","Initializing OnlineComponentProvider");const r=await t.getConfiguration();await e.initialize(n,r),t.setCredentialChangeListener(s=>Zi(e.remoteStore,s)),t.setAppCheckTokenChangeListener((s,i)=>Zi(e.remoteStore,i)),t._onlineComponents=e}function dp(t){return t.name==="FirebaseError"?t.code===d.FAILED_PRECONDITION||t.code===d.UNIMPLEMENTED:!(typeof DOMException<"u"&&t instanceof DOMException)||t.code===22||t.code===20||t.code===11}async function fp(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){v("FirestoreClient","Using user provided OfflineComponentProvider");try{await xr(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!dp(n))throw n;xn("Error using user provided cache. Falling back to memory cache: "+n),await xr(t,new ro)}}else v("FirestoreClient","Using default OfflineComponentProvider"),await xr(t,new ro);return t._offlineComponents}async function Lc(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(v("FirestoreClient","Using user provided OnlineComponentProvider"),await so(t,t._uninitializedComponentsProvider._online)):(v("FirestoreClient","Using default OnlineComponentProvider"),await so(t,new lp))),t._onlineComponents}function pp(t){return Lc(t).then(e=>e.syncEngine)}async function Rc(t){const e=await Lc(t),n=e.eventManager;return n.onListen=Jf.bind(null,e.syncEngine),n.onUnlisten=ep.bind(null,e.syncEngine),n}function mp(t,e,n={}){const r=new ye;return t.asyncQueue.enqueueAndForget(async()=>function(s,i,o,a,c){const u=new xc({next:h=>{i.enqueueAndForget(()=>Tc(s,l));const f=h.docs.has(o);!f&&h.fromCache?c.reject(new g(d.UNAVAILABLE,"Failed to get document because the client is offline.")):f&&h.fromCache&&a&&a.source==="server"?c.reject(new g(d.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(h)},error:h=>c.reject(h)}),l=new Sc(Fs(o.path),u,{includeMetadataChanges:!0,xu:!0});return Ic(s,l)}(await Rc(t),t.asyncQueue,e,n,r)),r.promise}function gp(t,e,n={}){const r=new ye;return t.asyncQueue.enqueueAndForget(async()=>function(s,i,o,a,c){const u=new xc({next:h=>{i.enqueueAndForget(()=>Tc(s,l)),h.fromCache&&a.source==="server"?c.reject(new g(d.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(h)},error:h=>c.reject(h)}),l=new Sc(o,u,{includeMetadataChanges:!0,xu:!0});return Ic(s,l)}(await Rc(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mc(t,e,n){if(!n)throw new g(d.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function yp(t,e,n,r){if(e===!0&&r===!0)throw new g(d.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function oo(t){if(!w.isDocumentKey(t))throw new g(d.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function ao(t){if(w.isDocumentKey(t))throw new g(d.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function ur(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":I()}function Te(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new g(d.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=ur(t);throw new g(d.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co{constructor(e){var n;if(e.host===void 0){if(e.ssl!==void 0)throw new g(d.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.cache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new g(d.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,yp("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new co({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new g(d.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new g(d.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new co(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Bh;switch(n.type){case"firstParty":return new zh(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new g(d.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=io.get(e);n&&(v("ComponentProvider","Removing Datastore"),io.delete(e),n.terminate())}(this),Promise.resolve()}}function vp(t,e,n,r={}){var s;const i=(t=Te(t,lr))._getSettings();if(i.host!=="firestore.googleapis.com"&&i.host!==e&&xn("Host has been set in both settings() and useEmulator(), emulator host will be used"),t._setSettings(Object.assign(Object.assign({},i),{host:`${e}:${n}`,ssl:!1})),r.mockUserToken){let o,a;if(typeof r.mockUserToken=="string")o=r.mockUserToken,a=Y.MOCK_USER;else{o=pu(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const c=r.mockUserToken.sub||r.mockUserToken.user_id;if(!c)throw new g(d.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");a=new Y(c)}t._authCredentials=new $h(new Da(o,a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new _e(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new se(this.firestore,e,this._key)}}class pt{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new pt(this.firestore,e,this._query)}}class _e extends pt{constructor(e,n,r){super(e,n,Fs(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new se(this.firestore,null,new w(e))}withConverter(e){return new _e(this.firestore,e,this._path)}}function mt(t,e,...n){if(t=ve(t),Mc("collection","path",e),t instanceof lr){const r=M.fromString(e,...n);return ao(r),new _e(t,null,r)}{if(!(t instanceof se||t instanceof _e))throw new g(d.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(M.fromString(e,...n));return ao(r),new _e(t.firestore,null,r)}}function qt(t,e,...n){if(t=ve(t),arguments.length===1&&(e=Aa.A()),Mc("doc","path",e),t instanceof lr){const r=M.fromString(e,...n);return oo(r),new se(t,null,new w(r))}{if(!(t instanceof se||t instanceof _e))throw new g(d.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(M.fromString(e,...n));return oo(r),new se(t.firestore,t instanceof _e?t.converter:null,new w(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wp{constructor(){this.Nc=Promise.resolve(),this.kc=[],this.Oc=!1,this.$c=[],this.Mc=null,this.Fc=!1,this.Bc=!1,this.Lc=[],this.Co=new fc(this,"async_queue_retry"),this.qc=()=>{const n=Nr();n&&v("AsyncQueue","Visibility state changed to "+n.visibilityState),this.Co.vo()};const e=Nr();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.qc)}get isShuttingDown(){return this.Oc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Uc(),this.Kc(e)}enterRestrictedMode(e){if(!this.Oc){this.Oc=!0,this.Bc=e||!1;const n=Nr();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.qc)}}enqueue(e){if(this.Uc(),this.Oc)return new Promise(()=>{});const n=new ye;return this.Kc(()=>this.Oc&&this.Bc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.kc.push(e),this.Gc()))}async Gc(){if(this.kc.length!==0){try{await this.kc[0](),this.kc.shift(),this.Co.reset()}catch(e){if(!Zt(e))throw e;v("AsyncQueue","Operation failed with retryable error: "+e)}this.kc.length>0&&this.Co.Ao(()=>this.Gc())}}Kc(e){const n=this.Nc.then(()=>(this.Fc=!0,e().catch(r=>{this.Mc=r,this.Fc=!1;const s=function(i){let o=i.message||"";return i.stack&&(o=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),o}(r);throw Ee("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.Fc=!1,r))));return this.Nc=n,n}enqueueAfterDelay(e,n,r){this.Uc(),this.Lc.indexOf(e)>-1&&(n=0);const s=Ws.createAndSchedule(this,e,n,r,i=>this.Qc(i));return this.$c.push(s),s}Uc(){this.Mc&&I()}verifyOperationInProgress(){}async zc(){let e;do e=this.Nc,await e;while(e!==this.Nc)}jc(e){for(const n of this.$c)if(n.timerId===e)return!0;return!1}Wc(e){return this.zc().then(()=>{this.$c.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.$c)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.zc()})}Hc(e){this.Lc.push(e)}Qc(e){const n=this.$c.indexOf(e);this.$c.splice(n,1)}}class on extends lr{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new wp,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||Oc(this),this._firestoreClient.terminate()}}function Ep(t,e){const n=typeof t=="object"?t:vl(),r=typeof t=="string"?t:e||"(default)",s=pl(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=hu("firestore");i&&vp(s,...i)}return s}function Js(t){return t._firestoreClient||Oc(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function Oc(t){var e,n,r;const s=t._freezeSettings(),i=function(o,a,c,u){return new rd(o,a,c,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,u.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._firestoreClient=new hp(t._authCredentials,t._appCheckCredentials,t._queue,i),!((n=s.cache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.cache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._firestoreClient._uninitializedComponentsProvider={_offlineKind:s.cache.kind,_offline:s.cache._offlineComponentProvider,_online:s.cache._onlineComponentProvider})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e){this._byteString=e}static fromBase64String(e){try{return new at(te.fromBase64String(e))}catch(n){throw new g(d.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new at(te.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new g(d.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new J(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zs{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new g(d.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new g(d.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return R(this._lat,e._lat)||R(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bp=/^__.*__$/;class Ip{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Re(e,this.data,this.fieldMask,n,this.fieldTransforms):new tn(e,this.data,n,this.fieldTransforms)}}class Pc{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Re(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function Fc(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw I()}}class fr{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Jc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Yc(){return this.settings.Yc}Zc(e){return new fr(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Xc(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Zc({path:r,ta:!1});return s.ea(e),s}na(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Zc({path:r,ta:!1});return s.Jc(),s}sa(e){return this.Zc({path:void 0,ta:!0})}ia(e){return Un(e,this.settings.methodName,this.settings.ra||!1,this.path,this.settings.oa)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Jc(){if(this.path)for(let e=0;e<this.path.length;e++)this.ea(this.path.get(e))}ea(e){if(e.length===0)throw this.ia("Document fields must not be empty");if(Fc(this.Yc)&&bp.test(e))throw this.ia('Document fields cannot begin and end with "__"')}}class Tp{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||or(e)}ua(e,n,r,s=!1){return new fr({Yc:e,methodName:n,oa:r,path:J.emptyPath(),ta:!1,ra:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ei(t){const e=t._freezeSettings(),n=or(t._databaseId);return new Tp(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Sp(t,e,n,r,s,i={}){const o=t.ua(i.merge||i.mergeFields?2:0,e,n,s);ti("Data must be an object, but it was:",o,r);const a=Uc(r,o);let c,u;if(i.merge)c=new ae(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const l=[];for(const h of i.mergeFields){const f=as(e,h,n);if(!o.contains(f))throw new g(d.INVALID_ARGUMENT,`Field '${f}' is specified in your field mask but missing from your input data.`);Bc(l,f)||l.push(f)}c=new ae(l),u=o.fieldTransforms.filter(h=>c.covers(h.field))}else c=null,u=o.fieldTransforms;return new Ip(new ie(a),c,u)}class pr extends dr{_toFieldTransform(e){if(e.Yc!==2)throw e.Yc===1?e.ia(`${this._methodName}() can only appear at the top level of your update data`):e.ia(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof pr}}function Cp(t,e,n){return new fr({Yc:3,oa:e.settings.oa,methodName:t._methodName,ta:n},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class _p extends dr{constructor(e,n){super(e),this.ca=n}_toFieldTransform(e){const n=Cp(this,e,!0),r=this.ca.map(i=>gt(i,n)),s=new st(r);return new Cd(e.path,s)}isEqual(e){return this===e}}function Dp(t,e,n,r){const s=t.ua(1,e,n);ti("Data must be an object, but it was:",s,r);const i=[],o=ie.empty();ze(r,(c,u)=>{const l=ni(e,c,n);u=ve(u);const h=s.na(l);if(u instanceof pr)i.push(l);else{const f=gt(u,h);f!=null&&(i.push(l),o.set(l,f))}});const a=new ae(i);return new Pc(o,a,s.fieldTransforms)}function Ap(t,e,n,r,s,i){const o=t.ua(1,e,n),a=[as(e,r,n)],c=[s];if(i.length%2!=0)throw new g(d.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let f=0;f<i.length;f+=2)a.push(as(e,i[f])),c.push(i[f+1]);const u=[],l=ie.empty();for(let f=a.length-1;f>=0;--f)if(!Bc(u,a[f])){const m=a[f];let _=c[f];_=ve(_);const S=o.na(m);if(_ instanceof pr)u.push(m);else{const N=gt(_,S);N!=null&&(u.push(m),l.set(m,N))}}const h=new ae(u);return new Pc(l,h,o.fieldTransforms)}function kp(t,e,n,r=!1){return gt(n,t.ua(r?4:3,e))}function gt(t,e){if(Vc(t=ve(t)))return ti("Unsupported field value:",e,t),Uc(t,e);if(t instanceof dr)return function(n,r){if(!Fc(r.Yc))throw r.ia(`${n._methodName}() can only be used with update() and set()`);if(!r.path)throw r.ia(`${n._methodName}() is not currently supported inside arrays`);const s=n._toFieldTransform(r);s&&r.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.ta&&e.Yc!==4)throw e.ia("Nested arrays are not supported");return function(n,r){const s=[];let i=0;for(const o of n){let a=gt(o,r.sa(i));a==null&&(a={nullValue:"NULL_VALUE"}),s.push(a),i++}return{arrayValue:{values:s}}}(t,e)}return function(n,r){if((n=ve(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Id(r.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const s=$.fromDate(n);return{timestampValue:Pn(r.serializer,s)}}if(n instanceof $){const s=new $(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Pn(r.serializer,s)}}if(n instanceof Zs)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof at)return{bytesValue:ic(r.serializer,n._byteString)};if(n instanceof se){const s=r.databaseId,i=n.firestore._databaseId;if(!i.isEqual(s))throw r.ia(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:$s(n.firestore._databaseId||r.databaseId,n._key.path)}}throw r.ia(`Unsupported field value: ${ur(n)}`)}(t,e)}function Uc(t,e){const n={};return ka(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):ze(t,(r,s)=>{const i=gt(s,e.Xc(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function Vc(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof $||t instanceof Zs||t instanceof at||t instanceof se||t instanceof dr)}function ti(t,e,n){if(!Vc(n)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(n)){const r=ur(n);throw r==="an object"?e.ia(t+" a custom object"):e.ia(t+" "+r)}}function as(t,e,n){if((e=ve(e))instanceof hr)return e._internalPath;if(typeof e=="string")return ni(t,e);throw Un("Field path arguments must be of type string or ",t,!1,void 0,n)}const Np=new RegExp("[~\\*/\\[\\]]");function ni(t,e,n){if(e.search(Np)>=0)throw Un(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new hr(...e.split("."))._internalPath}catch{throw Un(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Un(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new g(d.INVALID_ARGUMENT,a+t+c)}function Bc(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new se(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new xp(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(ri("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class xp extends $c{data(){return super.data()}}function ri(t,e){return typeof e=="string"?ni(t,e):e instanceof hr?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lp(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new g(d.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class si{}class Rp extends si{}function qc(t,e,...n){let r=[];e instanceof si&&r.push(e),r=r.concat(n),function(s){const i=s.filter(a=>a instanceof ii).length,o=s.filter(a=>a instanceof mr).length;if(i>1||i>0&&o>0)throw new g(d.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class mr extends Rp{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new mr(e,n,r)}_apply(e){const n=this._parse(e);return jc(e._query,n),new pt(e.firestore,e.converter,Zr(e._query,n))}_parse(e){const n=ei(e.firestore);return function(s,i,o,a,c,u,l){let h;if(c.isKeyField()){if(u==="array-contains"||u==="array-contains-any")throw new g(d.INVALID_ARGUMENT,`Invalid Query. You can't perform '${u}' queries on documentId().`);if(u==="in"||u==="not-in"){lo(l,u);const f=[];for(const m of l)f.push(uo(a,s,m));h={arrayValue:{values:f}}}else h=uo(a,s,l)}else u!=="in"&&u!=="not-in"&&u!=="array-contains-any"||lo(l,u),h=kp(o,i,l,u==="in"||u==="not-in");return B.create(c,u,h)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function cs(t,e,n){const r=e,s=ri("where",t);return mr._create(s,r,n)}class ii extends si{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new ii(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:le.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(r,s){let i=r;const o=s.getFlattenedFilters();for(const a of o)jc(i,a),i=Zr(i,a)}(e._query,n),new pt(e.firestore,e.converter,Zr(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function uo(t,e,n){if(typeof(n=ve(n))=="string"){if(n==="")throw new g(d.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ba(e)&&n.indexOf("/")!==-1)throw new g(d.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(M.fromString(n));if(!w.isDocumentKey(r))throw new g(d.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Oi(t,new w(r))}if(n instanceof se)return Oi(t,n._key);throw new g(d.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ur(n)}.`)}function lo(t,e){if(!Array.isArray(t)||t.length===0)throw new g(d.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function jc(t,e){if(e.isInequality()){const r=Us(t),s=e.field;if(r!==null&&!r.isEqual(s))throw new g(d.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${r.toString()}' and '${s.toString()}'`);const i=Va(t);i!==null&&Mp(t,s,i)}const n=function(r,s){for(const i of r)for(const o of i.getFlattenedFilters())if(s.indexOf(o.op)>=0)return o.op;return null}(t.filters,function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new g(d.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new g(d.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}function Mp(t,e,n){if(!n.isEqual(e))throw new g(d.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}class Op{convertValue(e,n="none"){switch(qe(e)){case 0:return null;case 1:return e.booleanValue;case 2:return V(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(tt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 10:return this.convertObject(e.mapValue,n);default:throw I()}}convertObject(e,n){const r={};return ze(e.fields,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertGeoPoint(e){return new Zs(V(e.latitude),V(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=xa(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Ut(e));default:return null}}convertTimestamp(e){const n=ke(e);return new $(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=M.fromString(e);O(lc(r));const s=new Vt(r.get(1),r.get(3)),i=new w(r.popFirst(5));return s.isEqual(n)||Ee(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pp(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class zc extends $c{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new wn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(ri("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class wn extends zc{data(e={}){return super.data(e)}}class Fp{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new St(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new wn(this._firestore,this._userDataWriter,r.key,r,new St(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new g(d.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(r,s){if(r._snapshot.oldDocs.isEmpty()){let i=0;return r._snapshot.docChanges.map(o=>{const a=new wn(r._firestore,r._userDataWriter,o.doc.key,o.doc,new St(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);return o.doc,{type:"added",doc:a,oldIndex:-1,newIndex:i++}})}{let i=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(o=>s||o.type!==3).map(o=>{const a=new wn(r._firestore,r._userDataWriter,o.doc.key,o.doc,new St(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);let c=-1,u=-1;return o.type!==0&&(c=i.indexOf(o.doc.key),i=i.delete(o.doc.key)),o.type!==1&&(i=i.add(o.doc),u=i.indexOf(o.doc.key)),{type:Up(o.type),doc:a,oldIndex:c,newIndex:u}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function Up(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return I()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gc(t){t=Te(t,se);const e=Te(t.firestore,on);return mp(Js(e),t._key).then(n=>Vp(e,t,n))}class Hc extends Op{constructor(e){super(),this.firestore=e}convertBytes(e){return new at(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new se(this.firestore,null,n)}}function oi(t){t=Te(t,pt);const e=Te(t.firestore,on),n=Js(e),r=new Hc(e);return Lp(t._query),gp(n,t._query).then(s=>new Fp(e,r,t,s))}function ho(t,e,n){t=Te(t,se);const r=Te(t.firestore,on),s=Pp(t.converter,e,n);return Wc(r,[Sp(ei(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,de.none())])}function Kc(t,e,n,...r){t=Te(t,se);const s=Te(t.firestore,on),i=ei(s);let o;return o=typeof(e=ve(e))=="string"||e instanceof hr?Ap(i,"updateDoc",t._key,e,n,r):Dp(i,"updateDoc",t._key,e),Wc(s,[o.toMutation(t._key,de.exists(!0))])}function Wc(t,e){return function(n,r){const s=new ye;return n.asyncQueue.enqueueAndForget(async()=>tp(await pp(n),r,s)),s.promise}(Js(t),e)}function Vp(t,e,n){const r=n.docs.get(e._key),s=new Hc(t);return new zc(t,s,e._key,r,new St(n.hasPendingWrites,n.fromCache),e.converter)}function Bp(...t){return new _p("arrayUnion",t)}(function(t,e=!0){(function(n){ht=n})(yl),In(new Nt("firestore",(n,{instanceIdentifier:r,options:s})=>{const i=n.getProvider("app").getImmediate(),o=new on(new qh(n.getProvider("auth-internal")),new Hh(n.getProvider("app-check-internal")),function(a,c){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new g(d.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Vt(a.options.projectId,c)}(i,r),i);return s=Object.assign({useFetchStreams:e},s),o._setSettings(s),o},"PUBLIC").setMultipleInstances(!0)),Ye(Ni,"3.10.0",t),Ye(Ni,"3.10.0","esm2017")})();const yt=Ep(Fl),Qc=async(t,e)=>{if(t===""||e==="")return!1;{let n=mt(yt,"users"),r=qc(n,cs("username","==",t),cs("password","==",e)),s=await oi(r);return s.empty?!1:s.docs[0].data()}},$p=async(t,e,n)=>{let r=mt(yt,t),s=qc(r,cs("unlockRiddleKey","==",e)),i=await oi(s);if(i.empty)return{params:"error",response:{error:"Wrong answer"}};{let o=i.docs[0].data();if(t==="puzzelStory"){let a=n.chapters.find(c=>c.chapter===o.chapterId&&c.onGoing);return a===void 0||!a.onGoing?{params:"error",response:{error:"Already enter this value"}}:o}else return n.chapters.find(c=>c.chapter===o.clueId)!==void 0?o:{params:"error",response:{error:"Already enter this value"}}}},ce=async(t,e)=>{let n=mt(yt,t);if(e){let r=qt(n,e),s=await Gc(r);if(s.exists()){let i=s.data();return i.id=s.id,i}else return{params:"error",response:{error:"No matching document found"}}}else return(await oi(n)).docs.map(i=>{let o=i.data();return o.id=i.id,o})},qp=async(t,e,n)=>{let r=mt(yt,t);if(n){let s=qt(r,n);return await ho(s,{...e,id:s.id})}else{let s=qt(r);return await ho(s,{...e,id:s.id})}},De=async(t,e,n,r)=>{let s=mt(yt,t),i=qt(s,e),o={[n]:Bp(r)};try{return await Kc(i,o),console.log(`Document with ID ${e} successfully updated.`,r),r}catch(a){return console.error(`Error updating document with ID ${e}:`,a),!1}},an=async(t,e,n,r,s)=>{const i=mt(yt,t),o=qt(i,e);try{const c=(await Gc(o)).data()[n].map((u,l)=>l===r?{...u,...s}:u);return await Kc(o,{[n]:c}),c}catch(a){return console.error(`Error updating document with ID ${e}:`,a),!1}};async function jp(){const t=JSON.parse(localStorage.getItem("user"));if(t){const e=await Qc(t.username,t.password);return e?{detail:!0,data:e}:(localStorage.removeItem("userId"),!1)}}E.subscribe({event:"render_component_startUp_form",listener:zp});function zp(t){let e=b("form","","formStartUp");[{type:"text",name:"username",id:"username",label:"Enter username"},{type:"password",name:"password",id:"password",label:"Enter password"}].forEach(r=>{let s=b("div","box_input"),i=b("input","formStartUp_input",r.id);i.type=r.type,i.name=r.name;let o=b("label","labelInput");o.for=r.name,o.textContent=r.label,s.append(i,o),e.appendChild(s)}),document.querySelector("#startUpContainer").appendChild(e),Gp(e),E.publish({event:"render_component_startUp_btns",detail:t}),e.addEventListener("submit",r=>{Hp(r,t)})}function Gp(t){t.querySelectorAll("div > input").forEach(e=>{e.addEventListener("keyup",n=>{n.target.value!==""?n.target.parentElement.lastElementChild.classList.add("active"):n.target.parentElement.lastElementChild.classList.remove("active")})})}async function Hp(t,e){t.preventDefault();let n=document.querySelector("#username").value,r=document.querySelector("#password").value;if(e==="login"){let s=await Qc(n,r);if(s.params==="error")E.publish({event:"render_component_popup",detail:s});else{const i={userId:s.id,password:r,username:n};localStorage.setItem("user",JSON.stringify(i)),E.publish({event:"render_map",detail:{response:{data:s}}}),E.publish({event:"render_counDown"})}}else n!==""&&r!==""&&(await Kp(),E.publish({event:"render_startUp",detail:"login"}))}async function Kp(){let t=await ce("users"),e=document.querySelector("#username").value,n=document.querySelector("#password").value;t.find(i=>i.username===e)===void 0?await qp("users",{password:n,username:e,clues:[],characters:[{characterId:1}],chapters:[{chapter:1,onGoing:!0}]}):console.log("error user exists in db")}E.subscribe({event:"render_component_startUp_btns",listener:Wp});function Wp(t){let e=b("div","","btnContainer");["register","login"].forEach(r=>{let s=b("button","playGame");s.textContent=r,e.append(s),s.textContent===t&&s.classList.add("active"),s.classList.contains("active")||s.addEventListener("click",()=>{E.publish({event:"render_startUp",detail:s.textContent})})}),document.querySelector("#formStartUp").appendChild(e)}E.subscribe({event:"render_bag",listener:Qp});async function Qp(t){let e=document.querySelector("#app"),n=await ce("clues"),r=b("div","containerPopUP","containerBag");e.appendChild(r);let s=b("div","","containerWrapper");r.append(s),s.innerHTML=` 
        <div id="bagNav">
            <div class="bagClose"> 
                <div class="close" id="containerBagClose"> </div>
            </div>
            <h2 class="bagHeader"> Väska </h2>
        </div>
        <div id="containerInventory">  
        </div>
    `,document.querySelector("#containerBagClose").addEventListener("click",()=>{r.remove()}),E.publish({event:"render_bag_details",detail:{response:{data:t,clues:n}}})}E.subscribe({event:"render_bag_details",listener:Yp});async function Yp({response:t}){let{data:e,clues:n}=t,r=b("div","","inventory");n.sort((s,i)=>s.clueId>i.clueId),n.forEach(s=>{const i=b("div","foundClue"),o=b("div","imgClue"),a=e.clues.some(c=>c.clueId===s.clueId);o.style.backgroundImage=a?`url(${s.imageRef})`:"url(../../src/lib/icons/lock.png)",i.addEventListener("click",()=>{a?E.publish({event:"render_component_bag_detail",detail:s}):console.log("error")}),i.append(o),r.append(i)}),document.querySelector("#containerInventory").append(r)}E.subscribe({event:"render_component_bag_detail",listener:Xp});function Xp(t){let e=document.querySelector("#app"),n=b("div","containerPopUP","containerItem");e.appendChild(n);let r=b("div","","containerWrapper");n.append(r),r.innerHTML=` 
        <div id="bagNav">
            <div class="bagClose"> 
                <div class="close" id="containerItemClose"> </div>
            </div>
            <h3 class="bagHeader"> ${t.clue} </h3>
        </div>
        <div id="itemInventory">  
            <div id="itemImgBox">
                <div class="imgClue" id="imgClue"></div>
            </div>
            <div id="itemInformation">
                <p> ${t.information} </p>
            </div>
        </div>
    `,document.querySelector("#imgClue").style.backgroundImage=`url(${t.imageRef})`,document.querySelector("#containerItemClose").addEventListener("click",()=>{n.remove()})}E.subscribe({event:"render_map",listener:Jp}),E.subscribe({event:"update_map",listener:Yc});async function Jp({response:t}){let{data:e,myLocation:n}=t,r=document.querySelector("#app");r.innerHTML="";let s=b("div","","container_map");r.appendChild(s);let i=b("div","","map");s.append(i),document.querySelector("#map").style.display="flex",Yc(e)}async function Yc(t,e){let n,r=t.chapters.filter(i=>i.onGoing)[0],s=await ce("storyTelling");if(r!==void 0){let i=s.filter(o=>o.chapterId===r.chapter&&r.onGoing)[0];r.searchOnGoing?n=L.map("map").setView([i.locationSearch._lat,i.locationSearch._long],16):n=L.map("map").setView([i.locationCharacter._lat,i.locationCharacter._long],16),L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(n),Zp(n,i,r),em(n,s,t),tm(n),n.on("click",nm),E.publish({event:"render_navigation",detail:{response:{data:t,storys:i}}})}else n=L.map("map").setView([55.605,13.0038],16),L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(n),console.log("!!!!! Missing something to be ongoing !!!! "),console.log("!!!!! Missing something to be ongoing !!!! ")}function Zp(t,e,n){let r=L.icon({iconUrl:"../../library/pin.png",iconSize:[38,38],iconAnchor:[18,38],popupAnchor:[0,-31]});n.searchOnGoing||!e.locationCharacter?L.circle([e.locationSearch._lat,e.locationSearch._long],{radius:e.searchRadius}).addTo(t).bindPopup(e.character):L.marker([e.locationCharacter._lat,e.locationCharacter._long],{icon:r}).addTo(t).bindPopup(e.character)}function em(t,e,n){let r=n.chapters.filter(i=>i.completed);e.forEach(i=>{r.forEach(o=>{if(o.chapter===i.chapterId){let a=b("button","",`foundCharacterMapBtn${i.chapterId}`);a.textContent=`Story ${i.chapterId}`,a.addEventListener("click",()=>{s(i,n)});let c=b("div");c.appendChild(a),L.marker([i.locationCharacter._lat,i.locationCharacter._long]).addTo(t).bindPopup(c)}o.chapter===i.chapterId&&o.searchDone&&L.circle([i.locationSearch._lat,i.locationSearch._long],{radius:i.searchRadius,color:"lightgreen",fillOpacity:.4}).addTo(t).bindPopup("Search Completed")})});function s(i,o){E.publish({event:"map_found_charater_interaction",detail:{response:{data:o,story:i,found:!0}}})}}function tm(t){navigator.geolocation.watchPosition(s);let e,n,r;function s(i){const o=i.coords.latitude,a=i.coords.longitude,c=i.coords.accuracy;e&&t.removeLayer(e),n&&t.removeLayer(n),e=L.marker([o,a]).addTo(t),n=L.circle([o,a],c).addTo(t),r||(r=t.fitBounds(n.getBounds())),t.setView([o,a])}}function nm(t){alert("latitude"+t.latlng)}E.subscribe({event:"render_navigation",listener:rm});function rm(t){let e=document.querySelector("#container_map"),n=document.querySelector("#map"),r=b("div","","topNavigation");r.innerHTML=`
        <div id="navigationContainer">
            <div id="guessMurderBox">
                <button id="guessMurder" class="topNav"> Gissa mördaren </button>
            </div>
            <div id="timeContainer"> 
                <h3 id="timeLeft"> </h3>
            </div>
        </div>
    `,e.insertBefore(r,n),document.querySelector("#guessMurder").addEventListener("click",()=>{E.publish({event:"render_guess_murder",detail:t})})}E.subscribe({event:"render_navigation",listener:sm});function sm(t){let e=document.querySelector("#container_map"),n=b("div","","navigationBox");[{text:"Lös Gåta",id:"topLeft",icon:"../../../../src/lib/icons/search.png"},{text:"Logga ut",id:"topRight",icon:"../../../../src/lib/icons/letter.png"},{text:"Väska",id:"bottomLeft",icon:"../../../../src/lib/icons/backpack.png"},{text:"Misstänkta",id:"bottomRight",icon:"../../../../src/lib/icons/spyware.png"}].forEach(s=>{let i=b("div","navigationBtn",s.id),o=b("div","","iconNav");o.style.backgroundImage=`url(${s.icon})`;let a=b("div","infoNavBtn");a.textContent=s.text,i.addEventListener("click",()=>{im(s.text,t)}),i.append(o,a),n.append(i)}),e.append(n)}async function im(t,{response:e}){let{data:n,storys:r}=e;switch(document.querySelector("#wrapperPopUp")&&document.querySelector("#wrapperPopUp").remove(),t){case"Lös Gåta":E.publish({event:"render_component_popup",detail:{params:"",response:{data:n,storys:r}}});break;case"Logga ut":localStorage.clear(),E.publish({event:"render_startUp",detail:"login"});break;case"Väska":E.publish({event:"render_bag",detail:n});break;case"Misstänkta":E.publish({event:"render_suspects",detail:{response:{data:n}}});break}}E.subscribe({event:"render_counDown",listener:om}),E.subscribe({event:"render_stopCounDown",listener:am});let us;function om(){let t=14400;us=setInterval(()=>{if(t>0){t--;let e=Math.floor(t/3600),n=Math.floor(t%3600/60),r=t%60;document.querySelector("#timeLeft")&&(document.querySelector("#timeLeft").innerHTML=`Timer: <br> ${e}: ${n}m : ${r}s`)}else clearInterval(us)},1e3)}function am(){clearInterval(us)}E.subscribe({event:"render_riddle",listener:cm});function cm({response:t}){let e=document.querySelector("#app");e.innerHTML="";let n=b("div","","riddleContainer");e.append(n),n.innerHTML=`
        <div id="riddleBox">
            <div>
                <div id="riddleIcon"></div>
                <div id="riddleText">
                    <p>${t.puzzel.riddle}</p>
                </div>
                <input type="text" id="riddleAnswer">
                <div>
                    <button id="btnAnswerRiddle"> send answer </button>
                </div>
            </div>
        </div>
    `,um(t)}function um(t){let{data:e,puzzel:n,storys:r}=t;document.querySelector("#btnAnswerRiddle").addEventListener("click",async s=>{s.preventDefault(),document.querySelector("#riddleAnswer").value===n.answer?n.clueId?hm(e,n):lm(e,r):console.log("Wrong answer")})}async function lm(t,e){let n=await ce("users",t.id);E.publish({event:"render_charater_interaction",detail:{response:{data:n,story:e}}})}async function hm(t,e){let n=t.chapters.findIndex(h=>h.searchOnGoing===!0),r=t.chapters.filter(h=>h.searchOnGoing).map(h=>h.chapter)[0];if(r===void 0){console.log("error",r);return}let i=(await ce("clues")).filter(h=>h.clueId===e.clueId)[0],a=(await ce("storyTelling")).sort((h,f)=>h.chapterId>f.chapterId?1:-1),c=t.searchArea?t.searchArea.length:0,u=a.filter(h=>h.partAfterSearch)[c];await an("users",t.id,"chapters",n,{searchDone:!0,searchOnGoing:!1,onGoing:!1,completed:!0}),await De("users",t.id,"searchArea",{searchArea:c}),await De("users",t.id,"chapters",{chapter:u.chapterId,onGoing:!0,searchOnGoing:!1}),await De("users",t.id,"clues",{clueId:i.clueId});let l=await ce("users",t.id);E.publish({event:"render_map",detail:{response:{data:l}}})}E.subscribe({event:"render_component_popup",listener:dm});function dm(t){let e=document.querySelector("#app"),n=b("div","","wrapperPopUp");e.appendChild(n);let r=b("div","","containerPopUp");n.append(r);let s=b("form","","box");document.querySelector("#containerPopUp").appendChild(s),s.innerHTML=`
        <div class="navContainer">
            <div class="navClose"> 
                <div class="close" id="popUpClose"> </div>
            </div>
            <h3 class="headerPopUp"> </h3>
        </div>
        <div class="popUp">
        </div>
    `,document.querySelector("#popUpClose").addEventListener("click",()=>{document.querySelector("#wrapperPopUp").remove()}),fm(t)}function fm(t){let{params:e,response:n}=t,r=document.querySelector(".headerPopUp"),s=document.querySelector(".popUp");switch(e){case"error":r.textContent="Error!",s.textContent=n.error;break;case"wrong":r.textContent="Ajdå!";break;case"success":r.textContent="Grattis";break;default:r.textContent="Skriv in kod";let i=b("input","popUp_input","");i.placeholder="Enter the clue!";let o=b("button","","");o.textContent="Submit your answer",s.append(i),document.querySelector("#box").append(o),pm(n);break}}function pm(t){t.data.chapters.some(n=>n.searchOnGoing)?document.querySelector("#box").classList.add("puzzelClues"):document.querySelector("#box").classList.add("puzzelStory"),document.querySelector("#box").addEventListener("submit",async n=>{n.preventDefault();let r=document.querySelector(".popUp_input"),s=await $p(n.target.className,r.value,t.data);s.params?r.classList.add("error"):(r.classList.remove("error"),E.publish({event:"render_riddle",detail:{response:{data:t.data,storys:t.storys,puzzel:s}}}))})}E.subscribe({event:"render_charater_interaction",listener:fo}),E.subscribe({event:"map_found_charater_interaction",listener:fo});function fo({response:t},e=0){let{data:n,story:r,found:s}=t,i=document.querySelector("#app");s||(i.innerHTML="");let o=b("div","","containerDialog");i.appendChild(o),s&&o.classList.add("chapterFoundReading"),o.style.backgroundImage=`url(../../src/lib/images/${r.imageRef}.jpg)`;let a=b("div","","dialogBox");o.append(a),a.innerHTML=`
        <div>
            <h3> ${r.character} </h3>
        </div>
        <div id="dialogText"> 
            ${r.partsChapter[e]}
        </div>
        <div>
            <div id="nextPart"> -> </div>
        </div>
    `,mm(n,r,s,e)}function mm(t,e,n,r){document.querySelector("#nextPart").addEventListener("click",()=>{if(r++,r<e.partsChapter.length)document.querySelector("#dialogText").innerHTML=e.partsChapter[r];else if(!n)document.querySelector("#nextPart").remove(),E.publish({event:"render_charater_interaction_btns",detail:{response:{data:t,story:e}}});else{let s=t.chapters.find(i=>i.chapter===e.chapterId+1);document.querySelector("#nextPart").remove(),s===void 0?E.publish({event:"render_charater_interaction_reOpen",detail:{response:{data:t,story:e}}}):document.querySelector("#containerDialog").remove()}})}E.subscribe({event:"render_charater_interaction_btns",listener:gm});async function gm({response:t}){let{data:e,story:n}=t,r=b("div","","choiseContainer");document.querySelector("#containerDialog").appendChild(r),n.secoundCharacter?r.innerHTML=`
            <div>
                <button id="btnCharacterFind"> Find a new character </button>
            </div>
            <div>
                <button id="btnsecoundCharacterFind"> Find a new character </button>
            </div>
        `:n.locationSearch&&!n.alley?r.innerHTML=`
            <div>
                <button id="btnCharacterFind"> Find a new character </button>
            </div>
            <div> 
                <button id="btnClueSearch"> Go to a search area </button>
            </div>
        `:n.locationSearch&&n.alley?r.innerHTML=`
            <div> 
                <button id="btnClueSearch"> Go to a search area </button>
            </div>
        `:r.innerHTML=`
            <div>
                <button id="btnCharacterFind"> Find a new character </button>
            </div>
        `,ym(e,n)}function ym(t,e){document.querySelector("#btnClueSearch")&&vm(t),document.querySelector("#btnCharacterFind")&&wm(t,e),document.querySelector("#btnsecoundCharacterFind")&&Em(t,e)}function vm(t){document.querySelector("#btnClueSearch").addEventListener("click",async()=>{let e=t.chapters.findIndex(r=>r.onGoing===!0);await an("users",t.id,"chapters",e,{searchOnGoing:!0,completed:!0});let n=await ce("users",t.id);E.publish({event:"render_map",detail:{response:{data:n}}})})}function wm(t,e){document.querySelector("#btnCharacterFind").addEventListener("click",async()=>{let n=t.chapters.findIndex(o=>o.onGoing);await an("users",t.id,"chapters",n,{completed:!0,onGoing:!1});let r=t.chapters.filter(o=>o.onGoing),s=r.length>0?r[r.length-1].chapter:null;await De("users",t.id,"characters",{characterId:e.characterId}),await De("users",t.id,"chapters",{chapter:s+1,onGoing:!0});let i=await ce("users",t.id);E.publish({event:"render_map",detail:{response:{data:i}}})})}function Em(t,e){document.querySelector("#btnsecoundCharacterFind").addEventListener("click",async n=>{let r=t.chapters.findIndex(a=>a.onGoing);await an("users",t.id,"chapters",r,{completed:!0,onGoing:!1});let s=t.chapters.filter(a=>a.onGoing),i=s.length>0?s[s.length-1].chapter:null;await De("users",t.id,"characters",{characterId:e.characterId}),await De("users",t.id,"chapters",{chapter:i+2,onGoing:!0});let o=await ce("users",t.id);E.publish({event:"render_map",detail:{response:{data:o}}})})}E.subscribe({event:"render_charater_interaction_reOpen",listener:bm});async function bm({response:t}){let{data:e,story:n}=t,r=b("div","","choiseContainer");document.querySelector("#containerDialog").appendChild(r),r.innerHTML=`
        <div>
            <button id="btnCharacterFind"> Find a new character </button>
        </div>
    `,document.querySelector("#btnCharacterFind").addEventListener("click",async()=>{let s=e.chapters.find(a=>a.chapter===n.chapterId),i=e.chapters.findIndex(a=>a.onGoing===!0);await an("users",e.id,"chapters",i,{searchOnGoing:!1,searchPaused:!0,onGoing:!1}),await De("users",e.id,"chapters",{chapter:s.chapter+1,onGoing:!0});let o=await ce("users",e.id);E.publish({event:"render_map",detail:{response:{data:o}}})})}E.subscribe({event:"render_component_suspects_bio",listener:Im});function Im(t){let e=document.querySelector("#app"),n=b("div","","wrapBio");e.appendChild(n),n.innerHTML=`
        <div id="SusBio">
            <div class="CloseBio">
                <div class="close" id="containerClose"></div>
            </div>
            
            <div id="info">
                <h1 class="title1">${t.fullName}</h1>
                <h4 class="title2">${t.title}</h4>
            </div>    

            <div id="BioInfo">
                <div id="SuspectInfo">
                    <p>${t.bio}</p>
                
                    <div id="ImgBox">
                            <div class="imgSus"></div>
                    </div>
                </div>  
            </div>
        </div>
    `,document.querySelector(".imgSus").style.backgroundImage=`url(${t.imgref})`,document.querySelector(".CloseBio").addEventListener("click",()=>{n.remove()})}E.subscribe({event:"render_guess_murder",listener:Tm});async function Tm({response:t}){let e=document.querySelector("#app"),n=b("div","","wrapSus");e.append(n);var r=b("div","rubrik"),s=document.createElement("H1");s.textContent="Gissa mördaren!",r.appendChild(s);let i=b("div","","Xbtn");i.innerHTML="X",r.append(i),i.addEventListener("click",()=>{n.remove()});let o=b("div","suspectsContainer");n.append(r,o);let a=await ce("charaters");console.log(a),a.forEach(c=>{let u=b("div","susBtn",c.imgref),l=b("div","","iconSus");l.style.backgroundImage=`url(../../src/lib/ProfilePics/${c.ImgProfile}.png)`,l.addEventListener("click",()=>{E.publish({event:"render_guess_weaponMotive",detail:c})});let h=b("div","name");h.textContent=c.fullName,u.append(l),u.append(h),o.append(u)})}E.subscribe({event:"render_guess_weaponMotive",listener:Sm});function Sm(){console.log("helo")}E.subscribe({event:"render_suspects",listener:Cm});async function Cm({response:t}){let e=document.querySelector("#app"),n=b("div","","wrapSus");e.append(n);var r=b("div","rubrik"),s=document.createElement("H1");s.textContent="Misstänkta",r.appendChild(s);let i=b("div","","Xbtn");i.innerHTML="X",r.append(i),i.addEventListener("click",()=>{n.remove()});let o=b("div","suspectsContainer");n.append(r,o),(await ce("charaters")).forEach(c=>{let u=b("div","susBtn",c.imgref),l=b("div","","iconSus");l.style.backgroundImage=`url(${c.ImgProfile})`,l.addEventListener("click",()=>{E.publish({event:"render_component_suspects_bio",detail:c})});let h=b("div","name");h.textContent=c.fullName,u.append(l),u.append(h),o.append(u)})}let po=await jp();po?(E.publish({event:"render_counDown"}),E.publish({event:"render_map",detail:{response:{data:po.data}}})):E.publish({event:"render_startUp",detail:"login"});
