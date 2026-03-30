(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();const H=2e4,N={alert:[{x:32,y:0}],itch:[{x:0,y:64},{x:32,y:64}],sleep:[{x:0,y:32},{x:32,y:32}],still:[{x:0,y:96}],wash:[{x:0,y:0}],yawn:[{x:32,y:96}],nscratch:[{x:0,y:224},{x:32,y:224}],escratch:[{x:0,y:192},{x:32,y:192}],sscratch:[{x:0,y:160},{x:32,y:160}],wscratch:[{x:0,y:128},{x:32,y:128}],nrun:[{x:0,y:480},{x:32,y:480}],nerun:[{x:0,y:448},{x:32,y:448}],erun:[{x:0,y:416},{x:32,y:416}],serun:[{x:0,y:384},{x:32,y:384}],srun:[{x:0,y:352},{x:32,y:352}],swrun:[{x:0,y:320},{x:32,y:320}],wrun:[{x:0,y:288},{x:32,y:288}],nwrun:[{x:0,y:256},{x:32,y:256}]},D={sleep:3e4,itch:1e4,scratch:2e4,wscratch:2e4,escratch:2e4,nscratch:2e4,sscratch:2e4,wash:1e4,alert:3e3,still:3e3,yawn:3e3};class G{constructor(t,e,i){this.cats=t,this.props=e,this.actions=new Array(this.cats.length),this.lastUpdate=Date.now(),this.editorMode=i,this.triggerOnChanges=this.triggerOnChanges.bind(this),this.onChanges=[]}addOnChange(t){this.onChanges.push(t)}removeOnChange(t){this.onChanges=this.onChanges.filter(e=>e!==t)}triggerOnChanges(t){this.onChanges.forEach(e=>{e(t)})}addProp(t){this.props.includes(t)||this.props.push(t),t.addOnChange(this.triggerOnChanges),this.triggerOnChanges(t)}removeProp(t){this.props=this.props.filter(e=>e!==t),t.removeOnChange(this.triggerOnChanges),this.triggerOnChanges(t)}removeCatAtIndex(t){this.cats[t].remove(),this.cats.splice(t,1),this.actions.splice(t,1)}update(){let t=Date.now()-this.lastUpdate;for(let e=0;e<this.cats.length;e++){let i=this.cats[e],s=this.actions[e];if(!s||s.duration<0){if(i.visitDurationLeft<0&&(i.x<-100||i.x>innerWidth+100||i.y<-100||i.y>innerHeight+100)){this.removeCatAtIndex(e),e-=1;continue}this.actions[e]=this.getAction(i),s=this.actions[e]}s.update(t),i.update(t)}this.lastUpdate+=t}setAction(t,e){let i=this.cats.indexOf(t);i<0||(this.actions[i]=e)}getAction(t){if(t.visitDurationLeft<0){let s=t.x<innerWidth/2?-200:innerWidth+200,n=t.y<innerHeight/2?-200:innerHeight+200;return Math.random()<1/3?s=t.x:Math.random()<.5&&(n=t.x),new Y(t,"sleep",1e3,s,n)}let e=[];for(let s of this.props)for(let n of s.spots){if(n.occupied)continue;let r=n.allowedActions[Math.floor(Math.random()*n.allowedActions.length)],l=(.5+Math.random())*(D[r]||3e3);e.push(new Z(t,s,n,r,l))}let i=e;return(e.length===0||!this.editorMode)&&(i=i.concat(this.getUndirectedActions(t))),i[Math.floor(Math.random()*i.length)]}getUndirectedActions(t){let e=["sleep","itch","scratch","sleep","itch","scratch","wash","alert","still","yawn"],i=[];for(let s of e){let{x:n,y:r}=this.getEmptyLocation(),l=(.5+Math.random())*(D[s]||3e3);if(s==="scratch"){const g=Math.floor(Math.random()*4);g===0?(s="w"+s,n=16):g===1?(s="s"+s,r=innerHeight-16):g===2?(s="e"+s,n=innerWidth-16):(s="n"+s,r=16)}i.push(new Y(t,s,l,n,r))}return i}getEmptyLocation(){let t=1e3,e,i;for(;t>0;){e=Math.random()*(innerWidth-64)+32,i=Math.random()*(innerHeight-64)+32;let s=!0;for(let n of this.props){if(n.width*n.height>64*64)continue;let r=e-n.x+n.width/2,l=i-n.y+n.height/2;if(r*r+l*l<n.width*n.width+n.height*n.height){s=!1;break}}if(s)break;t--}return{x:e,y:i}}}class P{constructor(t){this.cat=t}update(t){}updateRunTo(t,e,i){const s=T;let n=e-this.cat.x,r=i-this.cat.y,l=r<-.5?"n":"",g=r>.5?"s":"",c=n<-.5?"w":"",p=n>.5?"e":"",C=l+g+c+p+"run";this.cat.animation!==C&&this.cat.setAnimation(C);let f=Math.max(Math.min(n,s*t),-.05*t),b=Math.max(Math.min(r,s*t),-.05*t);Math.abs(n)<s*t?this.cat.x=e:this.cat.x+=f,Math.abs(r)<s*t?this.cat.y=i:this.cat.y+=b,this.cat.z=this.cat.y}updateClimbTo(t,e,i){const s=T/3;let n=e-this.cat.x,r=i-this.cat.y,l="nscratch";this.cat.animation!==l&&this.cat.setAnimation(l);let g=Math.max(Math.min(n,s*t),-.016666666666666666*t),c=Math.max(Math.min(r,s*t),-.016666666666666666*t);Math.abs(n)<s*t?this.cat.x=e:this.cat.x+=g,Math.abs(r)<s*t?this.cat.y=i:this.cat.y+=c}}const A={runTo:"runTo",climbTo:"climbTo",descendFrom:"descendFrom",animate:"animate"},T=.05;class Y extends P{constructor(t,e,i,s,n){super(t),this.phase=A.runTo,this.targetAnimation=e,this.duration=i,this.targetX=s,this.targetY=n}update(t){let e=this.targetX-this.cat.x,i=this.targetY-this.cat.y;this.phase===A.runTo&&Math.abs(e)<1&&Math.abs(i)<1&&(this.phase=A.animate),this.phase===A.animate?(this.cat.animation!==this.targetAnimation&&this.cat.setAnimation(this.targetAnimation),this.duration-=t):this.updateRunTo(t,this.targetX,this.targetY)}}class Z extends P{constructor(t,e,i,s,n){super(t),this.prop=e,this.spot=i,this.phase=A.runTo,this.targetX=e.x+i.x,this.targetY=e.y+i.y,this.spotOffGround=!1,i.y<=e.height-16&&!e.propTemplate.isFloorProp&&(this.spotOffGround=!0,this.targetY=e.y+Math.max(i.y,e.height-16)),this.targetAnimation=s,this.duration=n}update(t){let e=this.targetX-this.cat.x,i=this.targetY-this.cat.y;if(this.spot.occupied=!0,Math.abs(e)<1&&Math.abs(i)<1)switch(this.phase){case A.runTo:this.spotOffGround?(this.phase=A.climbTo,this.targetY=this.prop.y+this.spot.y+8):this.phase=A.animate;break;case A.climbTo:this.cat.y-=8,this.phase=A.animate;break;case A.descendFrom:this.duration=-1;break}switch(this.phase){case A.animate:this.cat.animation!==this.targetAnimation&&this.cat.setAnimation(this.targetAnimation),this.duration-=t,this.duration<0&&(this.spot.occupied=!1,this.spotOffGround&&(this.phase=A.descendFrom,this.targetY=this.prop.y+this.prop.height-16,this.duration=1)),this.cat.z=this.prop.z+5;break;case A.climbTo:this.updateClimbTo(t,this.targetX,this.targetY),this.cat.z=this.prop.z+10;break;case A.descendFrom:this.updateClimbTo(t,this.targetX,this.targetY),this.cat.z=this.prop.z+10;break;case A.runTo:default:this.updateRunTo(t,this.targetX,this.targetY);break}}}const J=10;class X{constructor(t,e,i){this.spot=e.spots.find(s=>s.id===i),this.name=t,this.x=0,this.y=0,this.z=this.y,this.elt=document.createElement("div"),this.elt.classList.add("cat"),this.elt.style.backgroundImage=`url(spritesheets/${t}.png)`,document.body.appendChild(this.elt),this.lastFrame=-1,this.animation="wrun",this.animationIndex=0,this.animationScale=1,this.dragging=!1,this.onPointerMove=this.onPointerMove.bind(this),this.onPointerDown=this.onPointerDown.bind(this),this.onPointerUp=this.onPointerUp.bind(this),window.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),this.elt.addEventListener("pointerdown",this.onPointerDown)}remove(){document.body.removeChild(this.elt),window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),this.elt.removeEventListener("pointerdown",this.onPointerUp),this.actionManager=null}onPointerDown(){this.dragging=!0,document.body.classList.add("trash-visible")}onPointerMove(t){if(!this.dragging)return;let e=Math.round(t.clientX-window.innerWidth/2),i=Math.round(t.clientY-window.innerHeight/2);this.moveTo(e+window.innerWidth/2,i+window.innerHeight/2),this.spot.controlX.setValue(e),this.spot.controlY.setValue(i)}onPointerUp(){this.dragging=!1,document.body.classList.remove("trash-visible"),this.x<100&&this.remove()}update(){this.updateAnimation()}updateAnimation(){if(Date.now()-this.lastFrame<1e3*this.animationScale/J)return;this.lastFrame=Date.now();const t=N[this.animation],e=t[this.animationIndex];this.animationIndex=(this.animationIndex+1)%t.length,this.elt.style.backgroundPosition=`${e.x}px ${512-e.y}px`}setAnimation(t){switch(this.animation=t,this.animationIndex=0,this.animationScale=1,this.animation){case"sleep":this.animationScale=5;break;case"itch":case"wscratch":case"sscratch":case"escratch":case"nscratch":this.animationScale=2;break}this.lastFrame=0,this.updateAnimation()}moveTo(t,e){this.x=t,this.y=e,this.z=this.y+400,this.elt.style.top=`${this.y}px`,this.elt.style.left=`${this.x}px`,this.elt.style.zIndex=Math.round(this.z+H)}}class K{constructor(t){this.spotCats=[],this.propTemplate=t,this.animationIndex=0,this.showCatsForSpots(),this.showingCats=!0}toggleCatsForSpots(){this.showingCats?this.hideCatsForSpots():this.showCatsForSpots(!0)}showCatsForSpots(t){for(this.showingCats=!0;this.spotCats.length>this.propTemplate.spots.length;)this.spotCats.pop().remove();for(let e=0;e<this.propTemplate.spots.length;e++){let i=this.propTemplate.spots[e];const s=!this.spotCats[e];if(s){let r=new X("kina-nothoughts",this.propTemplate,i.id);this.spotCats.push(r)}let n=this.spotCats[e];if(n.moveTo(i.x+window.innerWidth/2,i.y+window.innerHeight/2),s||t){let r=i.allowedActions[this.animationIndex%i.allowedActions.length];this.animationIndex+=1,n.setAnimation(r)}}}hideCatsForSpots(){this.showingCats=!1;for(const t of this.spotCats)t.remove();this.spotCats=[]}update(){for(let t of this.spotCats)t.update(0);this.showingCats&&this.showCatsForSpots(!1)}}function Q(o){return/^data:image\/(png|jpeg|gif);base64,[a-zA-Z0-9+\/=]+$/.test(o)?o:""}class _{constructor(t,e,i,s,n){this.id=t,this.width=e,this.height=i,this.spots=s,this.isFloorProp=n,this.container=document.createElement("div"),this.container.classList.add("prop")}create(){return this.container.cloneNode(!0)}static deserialize(t){let{id:e,width:i,height:s,isFloorProp:n}=t,r=t.spots.map(c=>new k(c.x,c.y,c.allowedActions)),l=document.createElement("img");l.draggable=!1,l.style.width=i+"px",l.style.height=s+"px",l.src=Q(t.src);let g=new _(e,i,s,r,n);return g.container.appendChild(l),g}serialize(){let{width:t,height:e,isFloorProp:i}=this,s=this.spots.map(l=>({x:l.x,y:l.y,allowedActions:l.allowedActions})),n="unknown",r=this.container.querySelector("img");return r&&(n=r.src),{width:t,height:e,isFloorProp:i,spots:s,src:n}}addSpotMarkers(){for(let t of this.spots){let e=document.createElement("div");e.classList.add("spot-marker"),e.style.top=t.y+"px",e.style.left=t.x+"px",this.container.appendChild(e)}}removeSpotMarkers(){Array.from(this.container.querySelectorAll(".spot-marker")).forEach(t=>{this.container.removeChild(t)})}}class k{constructor(t,e,i){this.x=t,this.y=e,this.allowedActions=i,this.occupied=!1}clone(){return new k(this.x,this.y,this.allowedActions)}}class F{constructor(t,e,i,s){this.inventory=t,this.width=s.width,this.height=s.height,this.propTemplate=s,this.spots=this.propTemplate.spots.map(n=>n.clone()),this.elt=this.propTemplate.create(),this.onChanges=[],this.moveTo(e,i),document.body.appendChild(this.elt),this.onPointerDown=this.onPointerDown.bind(this),this.elt.addEventListener("pointerdown",this.onPointerDown,{passive:!0})}addOnChange(t){this.onChanges.push(t)}removeOnChange(t){this.onChanges=this.onChanges.filter(e=>e!==t)}remove(){document.body.removeChild(this.elt)}onPointerDown(){this.inventory.pickUp(this)}serialize(){return{x:this.x,y:this.y,propTemplate:this.propTemplate.serialize()}}static deserialize(t,e){let{x:i,y:s,propTemplate:n}=t,r=_.deserialize(n);return new F(e,i,s,r)}moveTo(t,e){this.x=t,this.y=e,this.z=this.y+this.height,this.propTemplate.isFloorProp&&(this.z=this.y),this.elt.style.top=`${this.y}px`,this.elt.style.left=`${this.x}px`,this.elt.style.zIndex=Math.round(H+this.z),this.onChanges.forEach(i=>{i(this)})}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class m{constructor(t,e,i,s,n="div"){this.parent=t,this.object=e,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(n),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),m.nextNameID=m.nextNameID||0,this.$name.id=`lil-gui-name-${++m.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",r=>r.stopPropagation()),this.domElement.addEventListener("keyup",r=>r.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const e=this.parent.add(this.object,this.property,t);return e.name(this._name),this.destroy(),e}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class q extends m{constructor(t,e,i){super(t,e,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function $(o){let t,e;return(t=o.match(/(#|0x)?([a-f0-9]{6})/i))?e=t[2]:(t=o.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?e=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=o.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(e=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),e?"#"+e:!1}const tt={isPrimitive:!0,match:o=>typeof o=="string",fromHexString:$,toHexString:$},x={isPrimitive:!0,match:o=>typeof o=="number",fromHexString:o=>parseInt(o.substring(1),16),toHexString:o=>"#"+o.toString(16).padStart(6,0)},et={isPrimitive:!1,match:o=>Array.isArray(o),fromHexString(o,t,e=1){const i=x.fromHexString(o);t[0]=(i>>16&255)/255*e,t[1]=(i>>8&255)/255*e,t[2]=(i&255)/255*e},toHexString([o,t,e],i=1){i=255/i;const s=o*i<<16^t*i<<8^e*i<<0;return x.toHexString(s)}},it={isPrimitive:!1,match:o=>Object(o)===o,fromHexString(o,t,e=1){const i=x.fromHexString(o);t.r=(i>>16&255)/255*e,t.g=(i>>8&255)/255*e,t.b=(i&255)/255*e},toHexString({r:o,g:t,b:e},i=1){i=255/i;const s=o*i<<16^t*i<<8^e*i<<0;return x.toHexString(s)}},st=[tt,x,et,it];function nt(o){return st.find(t=>t.match(o))}class ot extends m{constructor(t,e,i,s){super(t,e,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=nt(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const n=$(this.$text.value);n&&this._setValueFromHexString(n)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const e=this._format.fromHexString(t);this.setValue(e)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class L extends m{constructor(t,e,i){super(t,e,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class rt extends m{constructor(t,e,i,s,n,r){super(t,e,i,"number"),this._initInput(),this.min(s),this.max(n);const l=r!==void 0;this.step(l?r:this._getImplicitStep(),l),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,e=!0){return this._step=t,this._stepExplicit=e,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1)),this.$fill.style.width=e*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let a=parseFloat(this.$input.value);isNaN(a)||(this._stepExplicit&&(a=this._snap(a)),this.setValue(this._clamp(a)))},i=a=>{const u=parseFloat(this.$input.value);isNaN(u)||(this._snapClampSetValue(u+a),this.$input.value=this.getValue())},s=a=>{a.key==="Enter"&&this.$input.blur(),a.code==="ArrowUp"&&(a.preventDefault(),i(this._step*this._arrowKeyMultiplier(a))),a.code==="ArrowDown"&&(a.preventDefault(),i(this._step*this._arrowKeyMultiplier(a)*-1))},n=a=>{this._inputFocused&&(a.preventDefault(),i(this._step*this._normalizeMouseWheel(a)))};let r=!1,l,g,c,p,C;const f=5,b=a=>{l=a.clientX,g=c=a.clientY,r=!0,p=this.getValue(),C=0,window.addEventListener("mousemove",E),window.addEventListener("mouseup",w)},E=a=>{if(r){const u=a.clientX-l,M=a.clientY-g;Math.abs(M)>f?(a.preventDefault(),this.$input.blur(),r=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(u)>f&&w()}if(!r){const u=a.clientY-c;C-=u*this._step*this._arrowKeyMultiplier(a),p+C>this._max?C=this._max-p:p+C<this._min&&(C=this._min-p),this._snapClampSetValue(p+C)}c=a.clientY},w=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",E),window.removeEventListener("mouseup",w)},S=()=>{this._inputFocused=!0},h=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",n,{passive:!1}),this.$input.addEventListener("mousedown",b),this.$input.addEventListener("focus",S),this.$input.addEventListener("blur",h)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(h,a,u,M,j)=>(h-a)/(u-a)*(j-M)+M,e=h=>{const a=this.$slider.getBoundingClientRect();let u=t(h,a.left,a.right,this._min,this._max);this._snapClampSetValue(u)},i=h=>{this._setDraggingStyle(!0),e(h.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",n)},s=h=>{e(h.clientX)},n=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",n)};let r=!1,l,g;const c=h=>{h.preventDefault(),this._setDraggingStyle(!0),e(h.touches[0].clientX),r=!1},p=h=>{h.touches.length>1||(this._hasScrollBar?(l=h.touches[0].clientX,g=h.touches[0].clientY,r=!0):c(h),window.addEventListener("touchmove",C,{passive:!1}),window.addEventListener("touchend",f))},C=h=>{if(r){const a=h.touches[0].clientX-l,u=h.touches[0].clientY-g;Math.abs(a)>Math.abs(u)?c(h):(window.removeEventListener("touchmove",C),window.removeEventListener("touchend",f))}else h.preventDefault(),e(h.touches[0].clientX)},f=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",C),window.removeEventListener("touchend",f)},b=this._callOnFinishChange.bind(this),E=400;let w;const S=h=>{if(Math.abs(h.deltaX)<Math.abs(h.deltaY)&&this._hasScrollBar)return;h.preventDefault();const u=this._normalizeMouseWheel(h)*this._step;this._snapClampSetValue(this.getValue()+u),this.$input.value=this.getValue(),clearTimeout(w),w=setTimeout(b,E)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",p,{passive:!1}),this.$slider.addEventListener("wheel",S,{passive:!1})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${e}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:e,deltaY:i}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(e=0,i=-t.wheelDelta/120,i*=this._stepExplicit?1:10),e+-i}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;return t.shiftKey?e*=10:t.altKey&&(e/=10),e}_snap(t){let e=0;return this._hasMin?e=this._min:this._hasMax&&(e=this._max),t-=e,t=Math.round(t/this._step)*this._step,t+=e,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class at extends m{constructor(t,e,i,s){super(t,e,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(e=>{const i=document.createElement("option");i.textContent=e,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),e=this._values.indexOf(t);return this.$select.selectedIndex=e,this.$display.textContent=e===-1?t:this._names[e],this}}class lt extends m{constructor(t,e,i){super(t,e,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var ht=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function gt(o){const t=document.createElement("style");t.innerHTML=o;const e=document.querySelector("head link[rel=stylesheet], head style");e?document.head.insertBefore(t,e):document.head.appendChild(t)}let z=!1;class O{constructor({parent:t,autoPlace:e=t===void 0,container:i,width:s,title:n="Controls",closeFolders:r=!1,injectStyles:l=!0,touchStyles:g=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(n),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),g&&this.domElement.classList.add("allow-touch-styles"),!z&&l&&(gt(ht),z=!0),i?i.appendChild(this.domElement):e&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=r}add(t,e,i,s,n){if(Object(i)===i)return new at(this,t,e,i);const r=t[e];switch(typeof r){case"number":return new rt(this,t,e,i,s,n);case"boolean":return new q(this,t,e);case"string":return new lt(this,t,e);case"function":return new L(this,t,e)}console.error(`gui.add failed
	property:`,e,`
	object:`,t,`
	value:`,r)}addColor(t,e,i=1){return new ot(this,t,e,i)}addFolder(t){const e=new O({parent:this,title:t});return this.root._closeFolders&&e.close(),e}load(t,e=!0){return t.controllers&&this.controllers.forEach(i=>{i instanceof L||i._name in t.controllers&&i.load(t.controllers[i._name])}),e&&t.folders&&this.folders.forEach(i=>{i._title in t.folders&&i.load(t.folders[i._title])}),this}save(t=!0){const e={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof L)){if(i._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);e.controllers[i._name]=i.save()}}),t&&this.folders.forEach(i=>{if(i._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);e.folders[i._title]=i.save()}),e}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const e=this.$children.clientHeight;this.$children.style.height=e+"px",this.domElement.classList.add("transition");const i=n=>{n.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const s=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(e=>{t=t.concat(e.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(e=>{t=t.concat(e.foldersRecursive())}),t}}const v=new O;let V=1;const R=Object.keys(N),U=document.getElementById("upload-image");let d={isFloorProp:!1,width:32,height:32,spots:[],src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAbCAYAAAAdx42aAAAA0GVYSWZJSSoACAAAAAoAAAEEAAEAAAAgAAAAAQEEAAEAAAAbAAAAAgEDAAMAAACGAAAAEgEDAAEAAAABAAAAGgEFAAEAAACMAAAAGwEFAAEAAACUAAAAKAEDAAEAAAACAAAAMQECAA0AAACcAAAAMgECABQAAACqAAAAaYcEAAEAAAC+AAAAAAAAAAgACAAIAEgAAAABAAAASAAAAAEAAABHSU1QIDIuMTAuMzgAADIwMjU6MDI6MTYgMTk6MDY6MzEAAQABoAMAAQAAAAEAAAAAAAAAj/EGhAAAAYRpQ0NQSUNDIHByb2ZpbGUAAHicfZE9SMNQFIVPU6UiFRE7iDhkqE52URHBpVahCBVCrdCqg8lL/6BJQ5Li4ii4Fhz8Waw6uDjr6uAqCII/IO6Ck6KLlHhfUmgR44PH+zjvncN99wJCo8I0qysOaLptppMJMZtbFUOvEDAAoBuzMrOMOUlKwXd93SPAz7sYz/J/9+fqU/MWAwIicZwZpk28QTy9aRuc94kjrCSrxOfE4yYVSPzIdcXjN85FlwWeGTEz6XniCLFY7GClg1nJ1IiniKOqplO+kPVY5bzFWavUWKtO/sNwXl9Z5jrtESSxiCVIEKGghjIqsBGjUyfFQpruEz7+YdcvkUshVxmMHAuoQoPs+sFn8Lu3VmFywksKJ2gwL47zMQqEdoFm3XG+jx2neQIEn4Erve2vNoCZT9LrbS16BPRvAxfXbU3ZAy53gKEnQzZlVwrSFgoF4P2MxpQDBm+B3jWvb617nD4AGepV6gY4OATGipS97vPvns6+/fum1b8fbzlypfQET1kAAA14aVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjE2ZWQxMmNmLTFmNzAtNDM5My1hNTM4LWFkNjU5OTMzYzlmMyIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MWNmNzRhNC02NmQ1LTQzZDYtYWQ5MS1hNGEwNjhhZTg3ZmMiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWNhY2ZmNC1lYzAyLTRkYWItOWU0Mi1jMTMyZjA3N2U1Y2QiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJMaW51eCIKICAgR0lNUDpUaW1lU3RhbXA9IjE3Mzk3NTA3OTMyNTM2MTEiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zOCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjU6MDI6MTZUMTk6MDY6MzEtMDU6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDI1OjAyOjE2VDE5OjA2OjMxLTA1OjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MTUyZWQ0MzktMTgxYi00YTk5LWE1ZTUtN2I5YTg4ODBmNjEyIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKExpbnV4KSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNS0wMi0xNlQxOTowNjozMy0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz52CQ0MAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH6QIRAAYhdck0qAAAAstJREFUSMelV89rE0EU/mYJ2JuoSUN+7KFlbWC7YCGHUrDSSump9/wN3griUaT0KII3j96EHPRUvVRB1IuHgkJcqAY9LJuQJk3xVi8dL7717ctMdqMDYXcnb9/3vW/evHmrkHM8f/NChx/eTcz3fv5C9fKl1NzcvAsAuL21heb1G2qaX5UF/PDJI31+EiVg4/jP/WCY2FTLJfQGQ1TLJVytuRjHEQLfSxG6d+eumonA/t6upvtO2P0bMQPuj2JUijXj+9VyKUXCRkSZpH798jCR1QTOncv/+6M4eSZyZE/Ldf/BY2UkYIuanG9vrk2sMwAsLi3g+9cfoKXqhF0cffmEs9ML+A0X/VGM5vJKShEioTi4TKhO2E2i3t5cw9y8i/OTKLlKefkckTApwUkUuJNxHGEcA4HvpRSgyAlAgpvmCIjnDB/k3wGAVmtHS8nJQbVcwv8OnheEE/gejr591g490I+MuKFtSNKmIGQApEgn7OLVs6dQ+3u7qei5/BJc2uUZlEeUiPL9gg3MBpAXWNqHx1FSrIhY4HtwZNSmiCVJk23W8BtuUjH5UjimyPi9JGFSgWoCrw22RCQFaGc5tohIIgKbJj1twcWlBfg3bxlV5IWoNxgmiV6Y5jxLejlPpKUNL2hya6v1jVVtOjg4uMlx1ta05ZUkVpDVikuelWymHcRV4dHTmnM1eoMhlBfUdaVYSx00WSBckSySNjsioVqtHW07ZmfZ8zYi3B/HAYB2+0ApAFjfWNX8j6zyO2s+yMipKrbbB8qR+5S2SB5J8xak3mCYyjNekpN+wAvq+uz0AleuOagUa8aWapbl4ElMUZNfkn+iI/KCuuYNhNyz/1ovJIn3bz8qa0/IlaBrc3kldZCYTk6b9DIIinxqV0xKyOaSy2giZGrVTVHn/i4gItRchscR/Iabqy2nYQPO/WEiFakUawmwvM4CTOM3laLxwu8VRakAAAAASUVORK5CYII=",addSpot:function(){let o={id:V,x:Math.round(d.width/4*(Math.random()*2+1)),y:Math.round(d.height/4*(Math.random()*2+1)),allowedActions:["sleep","alert"]};d.spots.push(o);let t=v.addFolder("Spot");o.controlX=t.add(o,"x").onChange(I),o.controlY=t.add(o,"y").onChange(I);let e=t.addFolder("Allowed Actions"),i={};for(let s of R)i[s]=o.allowedActions.includes(s),e.add(i,s).onChange(()=>{o.allowedActions=R.filter(r=>i[r]),I()});o.remove=()=>{d.spots=d.spots.filter(s=>s.id!==o.id),t.destroy()},t.add(o,"remove").onChange(I).name("Remove Spot"),V+=1},toggleCatsForSpots:function(){W.toggleCatsForSpots()},save:function(){const o=y.props[0].propTemplate.serialize(),t=JSON.stringify(o,null,2);navigator.clipboard.writeText(t).catch(e=>{console.warn(e)}),I()},uploadImage:function(){U.click()}};function I(){for(let i of y.props)i.remove();y.props=[];let o=_.deserialize(d);o.addSpotMarkers();let t=innerWidth/2,e=innerHeight/2;y.props.push(new F(null,t,e,o))}v.add(d,"isFloorProp").name("Prop lies flat on floor").onChange(I);let At=v.add(d,"width").onChange(I).name("Width"),dt=v.add(d,"height").onChange(I).name("Height");v.add(d,"uploadImage").name("Upload Image");v.add(d,"addSpot").onChange(I).name("Add Spot");v.add(d,"toggleCatsForSpots").name("Toggle Cats At Spots");v.add(d,"save").name("Copy to Clipboard");U.onchange=ct;function ct(o){let t=o.target.files[0];if(!t)return;let e=new FileReader;e.onload=()=>{d.src=e.result;let i=document.createElement("img");i.onload=()=>{At.setValue(i.naturalWidth),dt.setValue(i.naturalHeight)},i.src=d.src,I()},e.readAsDataURL(t)}let Ct=[],y=new G(Ct,[],!0);function B(){y.update(),W.update(),window.requestAnimationFrame(B)}let W=new K(d);B();
//# sourceMappingURL=index-B4qS5Xql.js.map
