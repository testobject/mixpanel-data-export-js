var MixpanelExport=function(){function a(a){if(this.opts=a,!this.opts.api_key||!this.opts.api_secret)throw"Error: api_key and api_secret must be passed to Mixpanel constructor.";this.api_key=this.opts.api_key,this.api_secret=this.opts.api_secret,this.api_stub=this.opts.api_stub||"//mixpanel.com/api/2.0/",this.timeout_after=this.opts.timeout_after||10}return a.prototype.events=function(a){return this.get("events",a)},a.prototype.top_events=function(a){return this.get(["events","top"],a)},a.prototype.topEvents=function(a){return this.get(["events","top"],a)},a.prototype.names=function(a){return this.get(["events","names"],a)},a.prototype.properties=function(a){return this.get(["events","properties"],a)},a.prototype.top_properties=function(a){return this.get(["events","properties","top"],a)},a.prototype.topProperties=function(a){return this.get(["events","properties","top"],a)},a.prototype.values=function(a){return this.get(["events","properties","values"],a)},a.prototype.funnels=function(a){return this.get(["funnels"],a)},a.prototype.list=function(a){return this.get(["funnels","list"],a)},a.prototype.segmentation=function(a){return this.get(["segmentation"],a)},a.prototype.numeric=function(a){return this.get(["segmentation","numeric"],a)},a.prototype.sum=function(a){return this.get(["segmentation","sum"],a)},a.prototype.average=function(a){return this.get(["segmentation","average"],a)},a.prototype.retention=function(a){return this.get(["retention"],a)},a.prototype.engage=function(a){return this.get(["engage"],a)},a.prototype.get=function(a,b){var c;return c={request_url:this._buildRequestURL(a,b),req:new XMLHttpRequest,done:function(){throw"[MixpanelExport] You must implement the .done(json) method on the result of your API call!"},get:function(){var a=this;return this.req.open("get",this.request_url,!0),this.req.onload=function(){return c=JSON.parse(a.req.responseText),a.done(c)},this.req.send()}},c.get(),c},a.prototype._buildRequestURL=function(a,b){return""+this.api_stub+(("function"==typeof a.join?a.join("/"):void 0)||a)+"/?"+this._requestParameterString(b)},a.prototype._requestParameterString=function(a){var b,c,d;return b=this._extend({api_key:this.api_key,expire:this._timeout(),callback:""},a),c=this._keys(b).sort(),d=this._without(c,"callback"),this._getParameterString(c,b)+"&sig="+this._getSignature(d,b)},a.prototype._getParameterString=function(a,b){var c=this;return this._map(a,function(a){return""+a+"="+c._urlEncode(b[a])}).join("&")},a.prototype._getSignature=function(a,b){var c,d=this;return c=this._map(a,function(a){return""+a+"="+d._sigEncode(b[a])}).join("")+this.api_secret,CryptoJS.MD5(c)},a.prototype._urlEncode=function(a){return Array.isArray(a)?encodeURIComponent(JSON.stringify(a)):encodeURIComponent(a)},a.prototype._sigEncode=function(a){return Array.isArray(a)?JSON.stringify(a):a},a.prototype._timeout=function(){return Math.round((new Date).getTime()/1e3)+this.timeout_after},a.prototype._map=function(a,b){var c,d,e,f;for(c=[],e=0,f=a.length;f>e;e++)d=a[e],c.push(b(d));return c},a.prototype._keys=function(a){var b,c;c=[];for(b in a)c.push(b);return c},a.prototype._without=function(a,b){return a.filter(function(a){return a!==b})},a.prototype._extend=function(a,b){var c,d;for(c in b)d=b[c],a[c]=d;return a},a}();