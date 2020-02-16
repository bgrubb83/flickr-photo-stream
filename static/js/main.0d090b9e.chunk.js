(this["webpackJsonpflickr-photo-stream"]=this["webpackJsonpflickr-photo-stream"]||[]).push([[0],{218:function(e,t,a){},219:function(e,t,a){"use strict";a.r(t);a(97);var n=a(0),r=a.n(n),c=a(58),o=a.n(c),s=a(21),l=a.n(s),i=a(41),u=a(31),h=a(36),m=a(37),p=a(39),f=a(38),g=a(40),d=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(p.a)(this,Object(f.a)(t).call(this,e))).handleChange=function(e){a.setState({searchText:e.target.value})},a.handleSubmit=function(e){a.props.search(e,a.state.searchText),a.setState({searchText:""})},a.state={searchText:""},a}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("form",{onSubmit:function(t){e.handleSubmit(t)},className:"form"},r.a.createElement("input",{id:"search-box",type:"text",value:this.state.searchText,onChange:this.handleChange,placeholder:this.props.placeholder}),r.a.createElement("button",{type:"submit",disabled:0===this.state.searchText.length,className:"button"},"Search"))}}]),t}(r.a.Component);var E=function(e){return r.a.createElement("h1",null,r.a.createElement("span",{className:"highlight",onClick:e.refresh},"".concat(e.logoName)," "),"".concat(e.logoText))};var v=function(e){return r.a.createElement("section",{id:"header-bar"},r.a.createElement(E,{logoName:"flickr",logoText:"Photo Stream",refresh:e.refresh}),r.a.createElement(d,{search:e.search,placeholder:"Enter some tags to search for"}))},S=a(93);var b=function(e){return r.a.createElement(S.LazyLoadImage,{alt:e.title,title:e.title,src:e.src,effect:"opacity",width:"100%"})};var w=function(e){return r.a.createElement("section",null,r.a.createElement("a",{href:e.url,className:"link ".concat(e.small?"small":"")},e.text))};var _=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("section",{className:"text-content"},e.text),r.a.createElement("section",{className:"fade-end"}))};var R=function(e){var t=e.tag;return r.a.createElement("section",{className:"tag"},t)};var y=function(e){var t=e.tags;return r.a.createElement(r.a.Fragment,null,r.a.createElement("section",{className:"photo-tag-box"},t.map((function(e){return r.a.createElement(R,{tag:e,key:e})}))),r.a.createElement("section",{className:"fade-end tag-fade"}))};var x=function(e){var t=e.photo;return r.a.createElement("section",{className:"photo-details"},r.a.createElement(w,{url:t.imageURL,text:t.title||"Untitled"}),r.a.createElement(w,{url:t.ownerURL,text:t.ownername,small:!0}),r.a.createElement(_,{text:t.strippedText}),r.a.createElement("br",null),r.a.createElement(y,{tags:t.tags.split(" ")}))};var k=function(e){return r.a.createElement("section",{className:"photo-frame"},r.a.createElement(b,{src:e.photo.src,title:e.photo.title}),r.a.createElement(x,{photo:e.photo}))},L=a(94),T=a.n(L);a(216);var N=function(e){return r.a.createElement("section",{className:"loading"},r.a.createElement(T.a,{type:"Puff",color:"#fc167a",height:24,width:24}))};var j=function(e){var t=e.message;return r.a.createElement("h1",{className:"status-message"},t)},C=a(95),I=a.n(C);var O={FLICKR_PUBLIC_BASE_URL:"https://www.flickr.com",FLICKR_API_BASE_URL:"https://api.flickr.com",FLICKR_FARM_BASE_URL:"https://farm",FLICKR_API_KEY:"750cec80b72249c07ae79b7c421314f7"},P=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(p.a)(this,Object(f.a)(t).call(this,e))).collateTags=function(e,t,n){var r,c,o=Object(u.a)(n);e&&e.length>0?(console.log("userTags",e),console.log("mand",n),r=[].concat(Object(u.a)(e),Object(u.a)(n))):(o.unshift((c=t)[Math.floor(Math.random()*c.length)]),r=o,a.setState({lastSearch:r[0]})),console.log("tags",r);var s="";return r.forEach((function(e,t){t===r.length-1?s+="".concat(e):s+="".concat(e,",")})),console.log(s),s},a.formatResults=function(e){var t=e.photos,n=e.photos.photo;if(t&&n){t.page&&t.pages&&t.page===t.pages?a.setState({lastPage:!0}):a.setState({lastPage:!1});var r=[],c=!0,o=!1,s=void 0;try{for(var l,i=n[Symbol.iterator]();!(c=(l=i.next()).done);c=!0){var h=l.value,m=h.server,p=h.id,f=h.secret,g=h.owner,d=h.farm;0===d&&(d=1),h.src="".concat(O.FLICKR_FARM_BASE_URL).concat(d,".staticflickr.com/").concat(m,"/").concat(p,"_").concat(f,"_q.jpg"),h.imageURL="".concat(O.FLICKR_PUBLIC_BASE_URL,"/photos/").concat(g,"/").concat(p),h.ownerURL="".concat(O.FLICKR_PUBLIC_BASE_URL,"/people/").concat(g,"/"),h.strippedText=h.description._content.replace(/(<([^>]+)>)/gi,"")||"This photo doesn't have a description.",r.push(h)}}catch(E){o=!0,s=E}finally{try{c||null==i.return||i.return()}finally{if(o)throw s}}a.setState({photos:Array.from(new Set([].concat(Object(u.a)(a.state.photos),r)))}),r&&r.length>0?a.setState({nothingReturned:!1}):a.setState({nothingReturned:!0})}},a.fetchSearchResults=function(){var e=Object(i.a)(l.a.mark((function e(){var t,n,r,c=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=c.length>0&&void 0!==c[0]?c[0]:1,n="".concat(O.FLICKR_API_BASE_URL,"/services/rest/?method=flickr.photos.search")+"&api_key=".concat(O.FLICKR_API_KEY)+"&per_page=".concat(a.state.perPage)+"&format=json"+"&tags=".concat(a.collateTags(a.state.userTags,a.state.defaultTags,a.state.mandatoryTags))+"&tag_mode=all"+"&page=".concat(t)+"&extras=description,tags,owner_name&safe_search=1&nojsoncallback=1",console.log(n),e.next=5,fetch(n);case 5:return e.next=7,e.sent.json();case 7:r=e.sent,a.formatResults(r);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),a.search=function(e,t){e.preventDefault();var n,r=(n=t,console.log(n),console.log(typeof n),n.replace(/[^a-zA-Z\d\s]/g," "));a.setState({lastSearch:r.replace(/ /g,", ")});var c=Array.from(new Set(r.split(" ").slice(0,20)));a.setState({userTags:c})},a.componentDidMount=Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.fetchSearchResults();case 2:case"end":return e.stop()}}),e)}))),a.componentDidUpdate=function(){var e=Object(i.a)(l.a.mark((function e(t,n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.state.userTags===n.userTags){e.next=5;break}return a.setState({photos:[]}),e.next=4,a.fetchSearchResults();case 4:window.scrollTo(0,0);case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),a.sortPhotosIntoColumns=function(e){var t={col1:[],col2:[],col3:[],col4:[]},a=1;return e.forEach((function(e){t["col".concat(a)].push(e),a<4?a++:a=1})),t},a.generateStatusMessage=function(){return a.state.nothingReturned?"Nothing to show here...":a.state.userTags&&a.state.userTags.length>0?r.a.createElement("p",null,"Here are some ",r.a.createElement("span",{class:"stand-out"},a.state.lastSearch)," pictures like you asked for..."):r.a.createElement("p",null,"You've not searched for any tags yet, so here are some nice pictures of ",r.a.createElement("span",{class:"stand-out"},a.state.lastSearch)," for you to look at...")},a.refresh=function(){window.location.reload(!1)},a.state={lastPage:!1,perPage:50,photos:[],userTags:[],defaultTags:["landscapes","nature","trees","cats","dogs","gardens","boats","cars"],mandatoryTags:["safe"],lastSearch:"",nothingReturned:!1},a}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.sortPhotosIntoColumns(this.state.photos);return r.a.createElement("section",{className:"wrapper"},r.a.createElement(v,{search:this.search,refresh:this.refresh}),r.a.createElement("section",{className:"pic-list"},r.a.createElement(j,{message:this.generateStatusMessage()}),r.a.createElement(I.a,{pageStart:1,loadMore:this.fetchSearchResults,hasMore:!this.state.lastPage,loader:r.a.createElement(N,null),initialLoad:!1},r.a.createElement("section",{className:"row"},r.a.createElement("section",{className:"column"},e.col1.map((function(e){return r.a.createElement(k,{photo:e,key:e.id})}))),r.a.createElement("section",{className:"column"},e.col2.map((function(e){return r.a.createElement(k,{photo:e,key:e.id})}))),r.a.createElement("section",{className:"column"},e.col3.map((function(e){return r.a.createElement(k,{photo:e,key:e.id})}))),r.a.createElement("section",{className:"column"},e.col4.map((function(e){return r.a.createElement(k,{photo:e,key:e.id})})))))))}}]),t}(r.a.Component);a(218);var A=function(){return r.a.createElement(P,{aprop:"hello"})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},96:function(e,t,a){e.exports=a(219)}},[[96,1,2]]]);
//# sourceMappingURL=main.0d090b9e.chunk.js.map