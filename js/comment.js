if(!window["String"]["prototype"]["trim"]){window["String"]["prototype"]["trim"]=function(){return this.replace(/^\s+|\s+$/g,"")}}var JELON=window.JELON||{};(function(JL){var constants={ACCESS_TOKEN_KEY:"xups-github-comments-token",USER_INFO_KEY:"xups-github-user-info",PER_PAGE:5,API_HOST:"https://api.github.com"};var queryUrl=function(e,t,s){t=t||location.href;var a=new RegExp("(\\?|&|#|&amp;)"+e+"=([^?&#]*)");var n=t.match(a);if(s){return n?n[2]:""}return n?decodeURIComponent(n[2]):""};var $=JL.$||function(e){return/^(\[object HTML)[a-zA-Z]*(Element\])$/.test(Object.prototype.toString.call(e))?e:document.getElementById(e)};var addClass=function(e,t){if(!e)return;var s;var a;var n,i,r;if(e instanceof Array){for(n=0,i=e.length;n<i;n++){e[n]=arguments.callee.call(this,e[n],t)}}else if(typeof e.item==="function"){var o=[];for(n=0,i=e.length;n<i;n++){o.push(arguments.callee.call(this,e.item(n),t))}e=o}else{e=$(e);if(!e)return;if(t&&typeof t==="string"){s=t.split(/\s+/);if(e.nodeType===1){if(!e.className&&s.length===1){e.className=t}else{a=" "+e.className+" ";for(n=0,r=s.length;n<r;n++){if(a.indexOf(" "+s[n]+" ")<0){a+=s[n]+" "}}e.className=a.trim()}}}}return e};var removeClass=function(e,t){if(!e)return;var s,a,n,i,r;if(e instanceof Array){for(a=0,n=e.length;a<n;a++){e[a]=arguments.callee.call(this,e[a],t)}}else if(typeof e.item==="function"){var o=[];for(a=0,n=e.length;a<n;a++){o.push(arguments.callee.call(this,e.item(a),t))}e=o}else{e=$(e);if(!e)return;if(t&&typeof t==="string"||t===undefined){s=(t||"").split(/\s+/);if(e.nodeType===1&&e.className){if(t){t=(" "+e.className+" ").replace(/[\n\t\r]/g," ");for(i=0,r=s.length;i<r;i++){t=t.replace(" "+s[i]+" "," ")}e.className=t.trim()}else{e.className=""}}}}return e};var formatDate=function(e,t){if(!t)return"";if(typeof t=="number")t=new Date(t*1e3);var s={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds(),w:"日一二三四五六".charAt(t.getDay())};e=e.replace(/y{4}/,t.getFullYear()).replace(/y{2}/,t.getFullYear().toString().substring(2));for(var a in s){var n=new RegExp(a);e=e.replace(n,i)}function i(e){return e.length==1?s[a]:("00"+s[a]).substr((""+s[a]).length)}return e};var ajax=function(e){e=e||{};e.method=e.method.toUpperCase()||"POST";e.url=e.url||"";e.async=e.async||true;e.data=e.data||null;e.success=e.success||function(){};var t=null;if(window.XMLHttpRequest){t=new XMLHttpRequest}else{t=new ActiveXObject("Microsoft.XMLHTTP")}var s=[];var a=window.localStorage.getItem(constants.ACCESS_TOKEN_KEY);for(var n in e.data){s.push(n+"="+e.data[n])}var i=s.join("&");if(e.method.toUpperCase()==="POST"){t.open(e.method,e.url,e.async);if(window.JSON){i=JSON.stringify(e.data);t.setRequestHeader("Content-Type","application/json;charset=utf-8")}else{t.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8")}if(e.headers&&e.headers["Accept"]){t.setRequestHeader("Accept",e.headers["Accept"])}else{t.setRequestHeader("Accept","application/vnd.github.squirrel-girl-preview, application/vnd.github.html+json")}if(a){t.setRequestHeader("Authorization","token "+a)}t.send(i)}else if(e.method.toUpperCase()==="GET"){t.open(e.method,e.url+"?"+i,e.async);t.setRequestHeader("Accept","application/vnd.github.squirrel-girl-preview, application/vnd.github.html+json");if(a){t.setRequestHeader("Authorization","token "+a)}t.send(null)}t.onreadystatechange=function(){if(t.readyState===4){if(t.status>=200&&t.status<300){e.success&&e.success(t.responseText)}else{e.fail&&e.fail(t.status)}}};t.onerror=function(){e.fail&&e.fail({message:"请求错误！"})}};JL.issueComments=0;JL.issueNumber=0;JL.Utils={ajax:ajax,queryUrl:queryUrl,addClass:addClass,removeClass:removeClass,formatDate:formatDate};JL.Renders={box:{tpl:['<section class="box" id="JELON__commentBox">','<div class="com-avatar"><img id="JELON__loginAvatar" src="/img/unsigned_avatar.jpg" alt="avatar"></div>','<div class="com-text">','<div class="main">','<textarea class="text-area-edited show" id="JELON__editBox" placeholder="欢迎评论！"></textarea>','<div class="text-area-preview" id="JELON__previewBox"></div>',"</div>",'<div class="switch">','<div class="switch-item on" id="JELON__editSwitcher" onclick="JELON.Actions.editPreviewSwitch(\'edit\')">编辑</div>','<div class="switch-item" id="JELON__previewSwitcher" onclick="JELON.Actions.editPreviewSwitch(\'preview\')">预览</div>',"</div>",'<div class="button" onclick="JELON.Actions.postComment()">提交</div>',"</div>","</section>"].join(""),update:function(){var e=localStorage.getItem(constants.USER_INFO_KEY);if(e){e=JSON.parse(e)}else{e={}}$("JELON__loginAvatar").src=e.avatar_url||"/img/unsigned_avatar.jpg"}},list:{tpl:['<section class="list-wrap" id="JELON__commentList">','<div class="text-center">正在加载评论</div>',"</section>"].join(""),update:function(e,t,s,a){var n=5;var i="";var r=[];var o=[];var c=Math.ceil(t/constants.PER_PAGE);if(t===0){i='<div class="text-center">暂无评论</div>'}else{var l="";var u="";for(var d=0,m=s.length;d<m;d++){l=['<li class="item">','<div class="user-avatar">','<a target="_blank" href="'+s[d].user.html_url+'">','<img src="'+s[d].user.avatar_url+'" alt="user-avatar">',"</a>","</div>",'<div class="user-comment">','<div class="user-comment-header" id="JELON__comment_'+s[d].id+'_reactions">','<span class="post-name">'+s[d].user.login+"</span>",'<span class="post-time">'+formatDate("yyyy-MM-dd hh:mm",new Date(s[d].created_at))+"</span>",'<span class="like" onclick="JELON.Actions.like('+s[d].id+')">点赞</span>','<span class="like-num">'+s[d].reactions.heart+"</span>","</div>",'<div class="user-comment-body">'+(s[d].body_html||s[d].body)+"</div>","</div>","</li>"].join("");r.push(l)}if(c===1){u='<a href="javascript: void(0);" class="item current">'+e+"</a>";o.push(u)}else if(c<=n){for(var d=1;d<=c;d++){if(d===e){u='<a href="javascript: void(0);" class="item current">'+e+"</a>"}else{u='<a href="javascript: JELON.Actions.pageJump('+d+');" class="item">'+d+"</a>"}o.push(u)}if(e!==1){o.unshift('<a href="javascript: JELON.Actions.pageJump('+(e-1)+');" class="item">上一页</a>')}if(e!==c){o.push('<a href="javascript: JELON.Actions.pageJump('+(e+1)+');" class="item">下一页</a>')}}else if(c>n){if(e<=n){for(var d=1;d<=n;d++){if(d===e){u='<a href="javascript: void(0);" class="item current">'+e+"</a>"}else{u='<a href="javascript: JELON.Actions.pageJump('+d+');" class="item">'+d+"</a>"}o.push(u)}if(e!==1){o.unshift('<a href="javascript: JELON.Actions.pageJump('+(e-1)+');" class="item">上一页</a>')}o.push('<a href="javascript: JELON.Actions.pageJump('+(e+1)+');" class="item">下一页</a>');o.push('<a href="javascript: JELON.Actions.pageJump('+c+');" class="item">末页</a>')}else if(e>n&&e<=c-n){var p=e%n;var f=Math.floor(e/n)*n+1;var v=Math.ceil(e/n)*n;o.push('<a href="javascript: JELON.Actions.pageJump(1);" class="item">首页</a>');o.push('<a href="javascript: JELON.Actions.pageJump('+(e-1)+');" class="item">上一页</a>');for(var d=f;d<=v;d++){if(d===e){u='<a href="javascript: void(0);" class="item current">'+e+"</a>"}else{u='<a href="javascript: JELON.Actions.pageJump('+d+');" class="item">'+d+"</a>"}o.push(u)}o.push('<a href="javascript: JELON.Actions.pageJump('+(e+1)+');" class="item">下一页</a>');o.push('<a href="javascript: JELON.Actions.pageJump('+c+');" class="item">末页</a>')}else if(e>n&&e>c-n){var f=c-n+1;var v=c;o.push('<a href="javascript: JELON.Actions.pageJump(1);" class="item">首页</a>');o.push('<a href="javascript: JELON.Actions.pageJump('+(e-1)+');" class="item">上一页</a>');for(var d=f;d<=v;d++){if(d===e){u='<a href="javascript: void(0);" class="item current">'+e+"</a>"}else{u='<a href="javascript: JELON.Actions.pageJump('+d+');" class="item">'+d+"</a>"}o.push(u)}if(e!==c){o.push('<a href="javascript: JELON.Actions.pageJump('+(e+1)+');" class="item">下一页</a>')}}}i=['<header class="list-header">总共 <span class="comments-num" id="JELON__commentsNum">'+JL.issueComments+"</span> 条评论</header>",'<ul class="list">',r.join(""),"</ul>",'<div class="page-nav">',o.join(""),"</div>"].join("")}$("JELON__commentList").innerHTML=i;if(localStorage.getItem(constants.USER_INFO_KEY)){a&&a()}},reactionUpdate:function(e,t){var s=localStorage.getItem(constants.USER_INFO_KEY);if(s){s=JSON.parse(s)}else{return}var a=s.id;for(var n=0,i=t.length;n<i;n++){if(a===t[n].user.id){console.log(a,t[n].user.id);addClass($("JELON__comment_"+e+"_reactions").getElementsByClassName("like")[0],"liked");$("JELON__comment_"+e+"_reactions").getElementsByClassName("like")[0].innerHTML="已赞";break}}},addOne:function(e){var t=document.createElement("li");t.className="item";var s=['<div class="user-avatar">','<a target="_blank" href="'+e.user.html_url+'">','<img src="'+e.user.avatar_url+'" alt="user-avatar">',"</a>","</div>",'<div class="user-comment">','<div class="user-comment-header" id="JELON__comment_'+e.id+'_reactions">','<span class="post-name">'+e.user.login+"</span>",'<span class="post-time">'+formatDate("yyyy-MM-dd hh:mm",new Date(e.created_at))+"</span>",'<span class="like" onclick="JELON.Actions.like('+e.reactions.heart+')">点赞</span>','<span class="like-num">'+e.reactions.heart+"</span>","</div>",'<div class="user-comment-body">'+(e.body_html||e.body)+"</div>","</div>"].join("");t.innerHTML=s;var a=$("JELON__commentList").getElementsByTagName("ul")[0];if(a){a.insertBefore(t,a.firstChild);$("JELON__commentsNum").innerHTML=JL.issueComments+1}else{$("JELON__commentList").innerHTML=['<header class="list-header">总共 <span class="comments-num" id="JELON__commentsNum">'+(JL.issueComments+1)+"</span> 条评论</header>",'<ul class="list">','<li class="item">',s,"</li>","</ul>"].join("")}}},signBar:{tpl:['<div class="sign-bar" id="JELON__commentSignBar">',"</div>"].join(""),update:function(){var e=localStorage.getItem(constants.ACCESS_TOKEN_KEY);var t=localStorage.getItem(constants.USER_INFO_KEY);var s="";if(e&&t){s=['<span class="sign-txt">GitHub 已登录!</span>','<span class="sign-link" onclick="JELON.Actions.signOut()">登出</span>'].join("")}else{s=['<span class="sign-txt">GitHub 未登录?</span>','<a href="https://github.com/login/oauth/authorize?scope=public_repo&redirect_uri=',location.href.indexOf("?")!==-1?encodeURIComponent(location.href.substring(0,location.href.indexOf("?"))):encodeURIComponent(location.href),"&client_id="+JL.options.clientId+"&client_secret="+JL.options.clientSecret+'" class="sign-link">',"登录","</a>"].join("")}$("JELON__commentSignBar").innerHTML=s}},tips:{tpl:'<section class="tips clearfix" id="JELON__comment_tips">注：评论支持 markdown 语法！</section>',update:function(){var e=localStorage.getItem(constants.USER_INFO_KEY);var t="";if(e&&JSON.parse(e).login===JL.options.owner&&JL.issueNumber===0){t='<a href="javascript: JELON.Actions.createIssue();" class="init" title="文章关联 issue">初始化评论</a>'}$("JELON__comment_tips").innerHTML=t+"注：评论支持 markdown 语法！"}},flashTitle:function(e){var t=0;document.title=e+"...";var s=setInterval(function(){t++;if(t%3===0){document.title=e+"..."}else if(t%3===1){document.title=e+".."}else if(t%3===2){document.title=e+"."}},100)},loading:{create:function(e){e=e||document.body;var t=document.createElement("div");t.className="loading-mask";t.id="JELON__loadingMask";t.innerHTML='<div class="loading-icon"><img src="/img/loading.gif" width="50" height="50" alt="加载中" ></div>';e.appendChild(t)},remove:function(){var e=$("JELON__loadingMask");e.parentNode.removeChild(e)}}};JL.Actions={init:function(){var e=queryUrl("code");JL.Renders.signBar.update();JL.Renders.box.update();if(e){JL.Renders.loading.create();JL.Renders.flashTitle("登录中");JL.Requests.getAccessToken({client_id:JL.options.clientId,client_secret:JL.options.clientSecret,code:e},function(e){if(e.access_token){localStorage.setItem(constants.ACCESS_TOKEN_KEY,e.access_token);JL.Requests.getUserInfo({access_token:e.access_token},function(e){if(e.login){localStorage.setItem(constants.USER_INFO_KEY,JSON.stringify(e));location.href=location.href.substring(0,location.href.indexOf("?"));JL.Renders.loading.remove()}})}else{location.href=location.href.substring(0,location.href.indexOf("?"));JL.Renders.loading.remove()}})}else{JL.Requests.getIssueNumberByLabel(JL.options.label,function(e){if(e.length>0){var t=e[0].number;var s=e[0].comments;JL.issueNumber=t;JL.issueComments=s;JL.Requests.getCommentListByIssueNumber(t,{page:1,per_page:constants.PER_PAGE},function(e){JL.Renders.list.update(1,s,e,function(){for(var t=0,s=e.length;t<s;t++){(function(e){JL.Requests.getReactionsByCommentId(e,{content:"heart"},function(t){JL.Renders.list.reactionUpdate(e,t)})})(e[t].id)}})})}else{if(typeof e!=="object"){localStorage.removeItem(constants.ACCESS_TOKEN_KEY);localStorage.removeItem(constants.USER_INFO_KEY);JL.Renders.signBar.update();JL.Renders.box.update();location.reload()}else{JL.Renders.list.update(1,0,[]);JL.Renders.tips.update()}}})}},signOut:function(){localStorage.removeItem(constants.ACCESS_TOKEN_KEY);localStorage.removeItem(constants.USER_INFO_KEY);JL.Renders.signBar.update();JL.Renders.box.update()},pageJump:function(e){JL.Requests.getCommentListByIssueNumber(JL.issueNumber,{page:Number(e),per_page:constants.PER_PAGE},function(t){JL.Renders.list.update(e,JL.issueComments,t,function(){for(var e=0,s=t.length;e<s;e++){(function(e){JL.Requests.getReactionsByCommentId(e,{content:"heart"},function(t){JL.Renders.list.reactionUpdate(e,t)})})(t[e].id)}})})},editPreviewSwitch:function(e){if(e==="edit"){removeClass("JELON__previewSwitcher","on");addClass("JELON__editSwitcher","on");removeClass("JELON__previewBox","show");addClass("JELON__editBox","show")}else{removeClass("JELON__editSwitcher","on");addClass("JELON__previewSwitcher","on");removeClass("JELON__editBox","show");addClass("JELON__previewBox","show");var t=$("JELON__editBox").value.trim();if(t){JL.Requests.markdown({text:t,mode:"markdown",context:"github/gollum"},function(e){$("JELON__previewBox").innerHTML=e})}else{$("JELON__previewBox").innerHTML=""}}},postComment:function(){var e=localStorage.getItem(constants.ACCESS_TOKEN_KEY);var t=localStorage.getItem(constants.USER_INFO_KEY);if(!e||!t){alert("请先登录哦..!^_^");return}var s=$("JELON__editBox").value.trim();if(s){JL.Renders.loading.create();if(JL.issueNumber!==0){JL.Requests.createComment(JL.issueNumber,{body:s},function(e){if(e.id){JL.Renders.list.addOne(e);JL.issueComments++;$("JELON__editBox").value="";$("JELON__previewBox").innerHTML=""}JL.Renders.loading.remove()})}else{JL.Requests.createIssue({title:document.title,body:location.href,labels:[JL.options.label||location.href]},function(e){if(e.number){JL.issueNumber=e.number;JL.Requests.createComment(JL.issueNumber,{body:s},function(t){if(e.id){JL.Renders.list.addOne(t);JL.issueComments++;$("JELON__editBox").value="";$("JELON__previewBox").innerHTML=""}JL.Renders.loading.remove()})}})}}},like:function(e){var t=$("JELON__comment_"+e+"_reactions").getElementsByClassName("liked");var s=$("JELON__comment_"+e+"_reactions").getElementsByClassName("like")[0];var a=$("JELON__comment_"+e+"_reactions").getElementsByClassName("like-num")[0];var n=localStorage.getItem(constants.ACCESS_TOKEN_KEY);var i=localStorage.getItem(constants.USER_INFO_KEY);if(t.length){return false}else{if(n&&i){JL.Requests.createReaction(e,{content:"heart"},function(e){if(e.content==="heart"){addClass(s,"liked");s.innerHTML="已赞";a.innerHTML=Number(a.innerHTML)+1}})}}},createIssue:function(){JL.Renders.loading.create();JL.Requests.createIssue({title:document.title,body:location.href,labels:[JL.options.label||location.href]},function(e){if(e.number){JL.issueNumber=e.number;JL.Renders.tips.update()}JL.Renders.loading.remove()})}};JL.Requests={getIssueNumberByLabel:function(label,callback){ajax({url:constants.API_HOST+"/repos/"+JL.options.owner+"/"+JL.options.repo+"/issues",method:"GET",data:{labels:[label],rnd:Math.random()},success:function(res){if(typeof res==="string"){if(window.JSON){res=JSON.parse(res)}else{res=eval("("+res+")")}}callback&&callback(res)},fail:function(e){callback&&callback(e)}})},createIssue:function(data,callback){ajax({url:constants.API_HOST+"/repos/"+JL.options.owner+"/"+JL.options.repo+"/issues",method:"POST",data:data,success:function(res){if(typeof res==="string"){if(window.JSON){res=JSON.parse(res)}else{res=eval("("+res+")")}}callback&&callback(res)},fail:function(e){callback&&callback(e)}})},getCommentListByIssueNumber:function(number,data,callback){ajax({url:constants.API_HOST+"/repos/"+JL.options.owner+"/"+JL.options.repo+"/issues/"+number+"/comments",method:"GET",data:data,success:function(res){if(typeof res==="string"){if(window.JSON){res=JSON.parse(res)}else{res=eval("("+res+")")}}callback&&callback(res)},fail:function(e){callback&&callback(e)}})},getReactionsByCommentId:function(id,data,callback){if(typeof data==="object"&&!data.rnd){data.rnd=Math.random()}ajax({url:constants.API_HOST+"/repos/"+JL.options.owner+"/"+JL.options.repo+"/issues/comments/"+id+"/reactions",method:"GET",data:data,success:function(res){if(typeof res==="string"){if(window.JSON){res=JSON.parse(res)}else{res=eval("("+res+")")}}callback&&callback(res)},fail:function(e){callback&&callback(e)}})},editIssue:function(number,data,callback){ajax({url:constants.API_HOST+"/repos/"+JL.options.owner+"/"+JL.options.owner+"/issues/"+number,method:"POST",data:data,success:function(res){if(typeof res==="string"){if(window.JSON){res=JSON.parse(res)}else{res=eval("("+res+")")}}callback&&callback(res)},fail:function(e){callback&&callback(e)}})},markdown:function(e,t){ajax({url:constants.API_HOST+"/markdown",method:"POST",data:e,success:function(e){t&&t(e)},fail:function(e){t&&t(e)}})},getAccessToken:function(data,callback){ajax({url:"https://gh-oauth.imsun.net/",method:"POST",data:data,success:function(res){if(typeof res==="string"){if(window.JSON){res=JSON.parse(res)}else{res=eval("("+res+")")}}callback&&callback(res)},fail:function(e){callback&&callback(e)}})},getUserInfo:function(data,callback){ajax({url:constants.API_HOST+"/user",method:"GET",data:data,success:function(res){if(typeof res==="string"){if(window.JSON){res=JSON.parse(res)}else{res=eval("("+res+")")}}callback&&callback(res)},fail:function(e){callback&&callback(e)}})},createComment:function(number,data,callback){ajax({url:constants.API_HOST+"/repos/"+JL.options.owner+"/"+JL.options.repo+"/issues/"+number+"/comments",method:"POST",data:data,success:function(res){if(typeof res==="string"){if(window.JSON){res=JSON.parse(res)}else{res=eval("("+res+")")}}callback&&callback(res)},fail:function(e){callback&&callback(e)}})},createReaction:function(commentId,data,callback){ajax({url:constants.API_HOST+"/repos/"+JL.options.owner+"/"+JL.options.repo+"/issues/comments/"+commentId+"/reactions",method:"POST",data:data,success:function(res){if(typeof res==="string"){if(window.JSON){res=JSON.parse(res)}else{res=eval("("+res+")")}}callback&&callback(res)},fail:function(e){callback&&callback(e)}})}};JL.Comment=function(e){JL.options=e||{};var t=$("comments");if(e.container){if(typeof e.container==="object"){t=e.container}else if(typeof e.container==="string"){if(/^#/.test(e.container)){t=$(e.container.replace(/^#/,""))}else{t=$(e.container)}}else{t=$("comments")}}t.innerHTML=[this.Renders.signBar.tpl,this.Renders.box.tpl,this.Renders.tips.tpl,this.Renders.list.tpl].join("");JL.Actions.init()}})(JELON);