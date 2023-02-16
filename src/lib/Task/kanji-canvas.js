!function(a,n){"use strict";a.KanjiCanvas=new Object,KanjiCanvas.refPatterns=[],KanjiCanvas.strokeColors=["#bf0000","#bf5600","#bfac00","#7cbf00","#26bf00","#00bf2f","#00bf85","#00a2bf","#004cbf","#0900bf","#5f00bf","#b500bf","#bf0072","#bf001c","#bf2626","#bf6b26","#bfaf26","#89bf26","#44bf26","#26bf4c","#26bf91","#26a8bf","#2663bf","#2d26bf","#7226bf","#b726bf","#bf2682","#bf263d","#bf4c4c","#bf804c"],KanjiCanvas.init=function(a){KanjiCanvas["canvas_"+a]=n.getElementById(a),KanjiCanvas["canvas_"+a].tabIndex=0,KanjiCanvas["ctx_"+a]=KanjiCanvas["canvas_"+a].getContext("2d"),KanjiCanvas["w_"+a]=KanjiCanvas["canvas_"+a].width,KanjiCanvas["h_"+a]=KanjiCanvas["canvas_"+a].height,KanjiCanvas["flagOver_"+a]=!1,KanjiCanvas["flagDown_"+a]=!1,KanjiCanvas["prevX_"+a]=0,KanjiCanvas["currX_"+a]=0,KanjiCanvas["prevY_"+a]=0,KanjiCanvas["currY_"+a]=0,KanjiCanvas["dot_flag_"+a]=!1,KanjiCanvas["recordedPattern_"+a]=new Array,KanjiCanvas["currentLine_"+a]=null,KanjiCanvas["canvas_"+a].addEventListener("mousemove",function(n){KanjiCanvas.findxy("move",n,a)},!1),KanjiCanvas["canvas_"+a].addEventListener("mousedown",function(n){KanjiCanvas.findxy("down",n,a)},!1),KanjiCanvas["canvas_"+a].addEventListener("mouseup",function(n){KanjiCanvas.findxy("up",n,a)},!1),KanjiCanvas["canvas_"+a].addEventListener("mouseout",function(n){KanjiCanvas.findxy("out",n,a)},!1),KanjiCanvas["canvas_"+a].addEventListener("mouseover",function(n){KanjiCanvas.findxy("over",n,a)},!1),KanjiCanvas["canvas_"+a].addEventListener("touchmove",function(n){KanjiCanvas.findxy("move",n,a)},!1),KanjiCanvas["canvas_"+a].addEventListener("touchstart",function(n){KanjiCanvas.findxy("down",n,a)},!1),KanjiCanvas["canvas_"+a].addEventListener("touchend",function(n){KanjiCanvas.findxy("up",n,a)},!1)},KanjiCanvas.draw=function(a,n){KanjiCanvas["ctx_"+a].beginPath(),KanjiCanvas["ctx_"+a].moveTo(KanjiCanvas["prevX_"+a],KanjiCanvas["prevY_"+a]),KanjiCanvas["ctx_"+a].lineTo(KanjiCanvas["currX_"+a],KanjiCanvas["currY_"+a]),KanjiCanvas["ctx_"+a].strokeStyle=n||"#333",KanjiCanvas["ctx_"+a].lineCap="round",KanjiCanvas["ctx_"+a].lineWidth=4,KanjiCanvas["ctx_"+a].stroke(),KanjiCanvas["ctx_"+a].closePath()},KanjiCanvas.deleteLast=function(a){KanjiCanvas["ctx_"+a].clearRect(0,0,KanjiCanvas["w_"+a],KanjiCanvas["h_"+a]);for(var n=0;n<KanjiCanvas["recordedPattern_"+a].length-1;n++)for(var i=KanjiCanvas["recordedPattern_"+a][n],e=0;e<i.length-1;e++)KanjiCanvas["prevX_"+a]=i[e][0],KanjiCanvas["prevY_"+a]=i[e][1],KanjiCanvas["currX_"+a]=i[e+1][0],KanjiCanvas["currY_"+a]=i[e+1][1],KanjiCanvas.draw(a);KanjiCanvas["recordedPattern_"+a].pop()},KanjiCanvas.erase=function(a){KanjiCanvas["ctx_"+a].clearRect(0,0,KanjiCanvas["w_"+a],KanjiCanvas["h_"+a]),KanjiCanvas["recordedPattern_"+a].length=0},KanjiCanvas.findxy=function(a,n,i){var e=n.changedTouches?n.changedTouches[0]:null;if(e&&n.preventDefault(),"down"==a){var r=KanjiCanvas["canvas_"+i].getBoundingClientRect();KanjiCanvas["prevX_"+i]=KanjiCanvas["currX_"+i],KanjiCanvas["prevY_"+i]=KanjiCanvas["currY_"+i],KanjiCanvas["currX_"+i]=(e?e.clientX:n.clientX)-r.left,KanjiCanvas["currY_"+i]=(e?e.clientY:n.clientY)-r.top,KanjiCanvas["currentLine_"+i]=new Array,KanjiCanvas["currentLine_"+i].push([KanjiCanvas["currX_"+i],KanjiCanvas["currY_"+i]]),KanjiCanvas["flagDown_"+i]=!0,KanjiCanvas["flagOver_"+i]=!0,KanjiCanvas["dot_flag_"+i]=!0,KanjiCanvas["dot_flag_"+i]&&(KanjiCanvas["ctx_"+i].beginPath(),KanjiCanvas["ctx_"+i].fillRect(KanjiCanvas["currX_"+i],KanjiCanvas["currY_"+i],2,2),KanjiCanvas["ctx_"+i].closePath(),KanjiCanvas["dot_flag_"+i]=!1)}if("up"==a&&(KanjiCanvas["flagDown_"+i]=!1,1==KanjiCanvas["flagOver_"+i]&&KanjiCanvas["recordedPattern_"+i].push(KanjiCanvas["currentLine_"+i])),"out"==a&&(KanjiCanvas["flagOver_"+i]=!1,1==KanjiCanvas["flagDown_"+i]&&KanjiCanvas["recordedPattern_"+i].push(KanjiCanvas["currentLine_"+i]),KanjiCanvas["flagDown_"+i]=!1),"move"==a&&KanjiCanvas["flagOver_"+i]&&KanjiCanvas["flagDown_"+i]){r=KanjiCanvas["canvas_"+i].getBoundingClientRect();KanjiCanvas["prevX_"+i]=KanjiCanvas["currX_"+i],KanjiCanvas["prevY_"+i]=KanjiCanvas["currY_"+i],KanjiCanvas["currX_"+i]=(e?e.clientX:n.clientX)-r.left,KanjiCanvas["currY_"+i]=(e?e.clientY:n.clientY)-r.top,KanjiCanvas["currentLine_"+i].push([KanjiCanvas["prevX_"+i],KanjiCanvas["prevY_"+i]]),KanjiCanvas["currentLine_"+i].push([KanjiCanvas["currX_"+i],KanjiCanvas["currY_"+i]]),KanjiCanvas.draw(i)}},KanjiCanvas.redraw=function(a){KanjiCanvas["ctx_"+a].clearRect(0,0,KanjiCanvas["w_"+a],KanjiCanvas["h_"+a]);for(var n=0;n<KanjiCanvas["recordedPattern_"+a].length;n++)for(var i=KanjiCanvas["recordedPattern_"+a][n],e=0;e<i.length-1;e++)KanjiCanvas["prevX_"+a]=i[e][0],KanjiCanvas["prevY_"+a]=i[e][1],KanjiCanvas["currX_"+a]=i[e+1][0],KanjiCanvas["currY_"+a]=i[e+1][1],KanjiCanvas.draw(a,KanjiCanvas.strokeColors[n]);if("false"!=KanjiCanvas["canvas_"+a].dataset.strokeNumbers)for(n=0;n<KanjiCanvas["recordedPattern_"+a].length;n++){var r=(i=KanjiCanvas["recordedPattern_"+a][n])[Math.floor(i.length/2)][0]+5,s=i[Math.floor(i.length/2)][1]-5;KanjiCanvas["ctx_"+a].font="20px Arial",KanjiCanvas["ctx_"+a].lineWidth=3,KanjiCanvas["ctx_"+a].strokeStyle=KanjiCanvas.alterHex(KanjiCanvas.strokeColors[n]?KanjiCanvas.strokeColors[n]:"#333333",60,"dec"),KanjiCanvas["ctx_"+a].strokeText((n+1).toString(),r,s),KanjiCanvas["ctx_"+a].fillStyle=KanjiCanvas.strokeColors[n]?KanjiCanvas.strokeColors[n]:"#333",KanjiCanvas["ctx_"+a].fillText((n+1).toString(),r,s)}},KanjiCanvas.alterHex=function(a,n,i){for(var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a),r=[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)],s=0,t=r.length;s<t;s++){switch(i){case"inc":r[s]=(r[s]+n>255?255:r[s]+n).toString(16);break;case"dec":r[s]=(r[s]-n<0?0:r[s]-n).toString(16)}1==r[s].length&&(r[s]=r[s]+"0")}return"#"+r.join("")},KanjiCanvas.normalizeLinear=function(a){var n=new Array;KanjiCanvas.newHeight=256,KanjiCanvas.newWidth=256,KanjiCanvas.xMin=256,KanjiCanvas.xMax=0,KanjiCanvas.yMin=256,KanjiCanvas.yMax=0;for(var i=0;i<KanjiCanvas["recordedPattern_"+a].length;i++)for(var e=KanjiCanvas["recordedPattern_"+a][i],r=0;r<e.length;r++)KanjiCanvas.x=e[r][0],KanjiCanvas.y=e[r][1],KanjiCanvas.x<KanjiCanvas.xMin&&(KanjiCanvas.xMin=KanjiCanvas.x),KanjiCanvas.x>KanjiCanvas.xMax&&(KanjiCanvas.xMax=KanjiCanvas.x),KanjiCanvas.y<KanjiCanvas.yMin&&(KanjiCanvas.yMin=KanjiCanvas.y),KanjiCanvas.y>KanjiCanvas.yMax&&(KanjiCanvas.yMax=KanjiCanvas.y);KanjiCanvas.oldHeight=Math.abs(KanjiCanvas.yMax-KanjiCanvas.yMin),KanjiCanvas.oldWidth=Math.abs(KanjiCanvas.xMax-KanjiCanvas.xMin);for(i=0;i<KanjiCanvas["recordedPattern_"+a].length;i++){e=KanjiCanvas["recordedPattern_"+a][i];var s=new Array;for(r=0;r<e.length;r++)KanjiCanvas.x=e[r][0],KanjiCanvas.y=e[r][1],KanjiCanvas.xNorm=(KanjiCanvas.x-KanjiCanvas.xMin)*(KanjiCanvas.newWidth/KanjiCanvas.oldWidth),KanjiCanvas.yNorm=(KanjiCanvas.y-KanjiCanvas.yMin)*(KanjiCanvas.newHeight/KanjiCanvas.oldHeight),s.push([KanjiCanvas.xNorm,KanjiCanvas.yNorm]);n.push(s)}KanjiCanvas["recordedPattern_"+a]=n,KanjiCanvas.redraw(a)},KanjiCanvas.m10=function(a){for(var n=0,i=0;i<a.length;i++)for(var e=a[i],r=0;r<e.length;r++)n+=e[r][0];return n},KanjiCanvas.m01=function(a){for(var n=0,i=0;i<a.length;i++)for(var e=a[i],r=0;r<e.length;r++)n+=e[r][1];return n},KanjiCanvas.m00=function(a){for(var n=0,i=0;i<a.length;i++){n+=a[i].length}return n},KanjiCanvas.mu20=function(a,n){for(var i=0,e=0;e<a.length;e++)for(var r=a[e],s=0;s<r.length;s++){var t=r[s][0]-n;i+=t*t}return i},KanjiCanvas.mu02=function(a,n){for(var i=0,e=0;e<a.length;e++)for(var r=a[e],s=0;s<r.length;s++){var t=r[s][1]-n;i+=t*t}return i},KanjiCanvas.aran=function(a,n){var i=0;i=n>a?a/n:n/a;var e=Math.PI/2*i,r=Math.sin(e);Math.sqrt(r);return Math.sqrt(Math.sin(Math.PI/2*i))},KanjiCanvas.chopOverbounds=function(a){for(var n=new Array,i=0;i<a.length;i++){for(var e=a[i],r=new Array,s=0;s<e.length;s++){var t=e[s][0],v=e[s][1];t<0&&(t=0),t>=256&&(t=255),v<0&&(v=0),v>=256&&(v=255),r.push([t,v])}n.push(r)}return n},KanjiCanvas.transform=function(a,n,i){for(var e=new Array,r=0;r<a.length;r++){for(var s=a[r],t=new Array,v=0;v<s.length;v++){var C=s[v][0]+n,j=s[v][1]+i;t.push([C,j])}e.push(t)}return e},KanjiCanvas.momentNormalize=function(a){KanjiCanvas.newHeight=256,KanjiCanvas.newWidth=256,KanjiCanvas.xMin=256,KanjiCanvas.xMax=0,KanjiCanvas.yMin=256,KanjiCanvas.yMax=0;for(var n=0;n<KanjiCanvas["recordedPattern_"+a].length;n++)for(var i=KanjiCanvas["recordedPattern_"+a][n],e=0;e<i.length;e++)KanjiCanvas.x=i[e][0],KanjiCanvas.y=i[e][1],KanjiCanvas.x<KanjiCanvas.xMin&&(KanjiCanvas.xMin=KanjiCanvas.x),KanjiCanvas.x>KanjiCanvas.xMax&&(KanjiCanvas.xMax=KanjiCanvas.x),KanjiCanvas.y<KanjiCanvas.yMin&&(KanjiCanvas.yMin=KanjiCanvas.y),KanjiCanvas.y>KanjiCanvas.yMax&&(KanjiCanvas.yMax=KanjiCanvas.y);KanjiCanvas.oldHeight=Math.abs(KanjiCanvas.yMax-KanjiCanvas.yMin),KanjiCanvas.oldWidth=Math.abs(KanjiCanvas.xMax-KanjiCanvas.xMin);var r=KanjiCanvas.aran(KanjiCanvas.oldWidth,KanjiCanvas.oldHeight),s=KanjiCanvas.newWidth,t=KanjiCanvas.newHeight;KanjiCanvas.oldHeight>KanjiCanvas.oldWidth?s=r*KanjiCanvas.newWidth:t=r*KanjiCanvas.newHeight;var v=(KanjiCanvas.newWidth-s)/2,C=(KanjiCanvas.newHeight-t)/2,j=KanjiCanvas.m00(KanjiCanvas["recordedPattern_"+a]),K=KanjiCanvas.m01(KanjiCanvas["recordedPattern_"+a]),o=KanjiCanvas.m10(KanjiCanvas["recordedPattern_"+a])/j,c=K/j,f=s/2,l=t/2,d=KanjiCanvas.mu20(KanjiCanvas["recordedPattern_"+a],o),h=KanjiCanvas.mu02(KanjiCanvas["recordedPattern_"+a],c),u=s/(4*Math.sqrt(d/j))||0,_=t/(4*Math.sqrt(h/j))||0,g=new Array;for(n=0;n<KanjiCanvas["recordedPattern_"+a].length;n++){var x=KanjiCanvas["recordedPattern_"+a][n],p=new Array;for(e=0;e<x.length;e++){var M=u*(x[e][0]-o)+f,y=_*(x[e][1]-c)+l;p.push([M,y])}g.push(p)}return KanjiCanvas.transform(g,v,C)},KanjiCanvas.euclid=function(a,n){var i=a[0]-n[0],e=a[1]-n[1];return Math.sqrt(i*i+e*e)},KanjiCanvas.extractFeatures=function(a,n){for(var i=new Array,e=a.length,r=0;r<e;r++){for(var s=a[r],t=new Array,v=0,C=0;C<s.length;){if(0==C){var j=s[0];t.push(j)}if(C>0){j=s[C-1];var K=s[C];v+=KanjiCanvas.euclid(j,K)}if(v>=n&&C>1){v-=n;j=s[C];t.push(j)}C++}if(1==t.length){j=s[s.length-1];t.push(j)}else if(v>.75*n){j=s[s.length-1];t.push(j)}i.push(t)}return i},KanjiCanvas.endPointDistance=function(a,n){var i=0,e=void 0===a?0:a.length,r=void 0===n?0:n.length;if(0==e||0==r)return 0;var s=a[0],t=n[0];return i+=Math.abs(s[0]-t[0])+Math.abs(s[1]-t[1]),s=a[e-1],t=n[r-1],i+=Math.abs(s[0]-t[0])+Math.abs(s[1]-t[1])},KanjiCanvas.initialDistance=function(a,n){for(var i=a.length,e=n.length,r=Math.min(i,e),s=Math.max(i,e),t=0,v=0;v<r;v++){var C=a[v],j=n[v];t+=Math.abs(C[0]-j[0])+Math.abs(C[1]-j[1])}return t*(s/r)},KanjiCanvas.getLargerAndSize=function(a,n){var i=void 0===a?0:a.length,e=void 0===n?0:n.length,r=i,s=e,t=a,v=n;return i<e&&(s=i,r=e,t=n,v=a),[t,v,r,s]},KanjiCanvas.wholeWholeDistance=function(a,n){for(var i=KanjiCanvas.getLargerAndSize(a,n),e=0,r=0;r<i[3];r++){KanjiCanvas.j_of_i=parseInt(parseInt(i[2]/i[3])*r);var s=i[0][KanjiCanvas.j_of_i],t=i[1][r];e+=Math.abs(s[0]-t[0])+Math.abs(s[1]-t[1])}return parseInt(e/i[3])},KanjiCanvas.initStrokeMap=function(a,n,i){for(var e=KanjiCanvas.getLargerAndSize(a,n),r=new Array,s=0;s<e[2];s++)r[s]=-1;var t=new Array;for(s=0;s<e[2];s++)t[s]=!0;for(s=0;s<e[3];s++){KanjiCanvas.minDist=1e7,KanjiCanvas.min_j=-1;for(var v=0;v<e[2];v++)if(1==t[v]){var C=i(e[0][v],e[1][s]);C<KanjiCanvas.minDist&&(KanjiCanvas.minDist=C,KanjiCanvas.min_j=v)}t[KanjiCanvas.min_j]=!1,r[KanjiCanvas.min_j]=s}return r},KanjiCanvas.getMap=function(a,n,i){for(var e=KanjiCanvas.getLargerAndSize(a,n),r=KanjiCanvas.initStrokeMap(e[0],e[1],i),s=0;s<3;s++)for(var t=0;t<r.length;t++)if(-1!=r[t]){KanjiCanvas.dii=i(e[0][t],e[1][r[t]]);for(var v=0;v<r.length;v++)if(-1!=r[t])if(-1!=r[v]){var C=i(e[0][v],e[1][r[v]]),j=i(e[0][v],e[1][r[t]]);if(i(e[0][t],e[1][r[v]])+j<KanjiCanvas.dii+C){var K=r[v];r[v]=r[t],r[t]=K,KanjiCanvas.dii=j}}else{(j=i(e[0][v],e[1][r[t]]))<KanjiCanvas.dii&&(r[v]=r[t],r[t]=-1,KanjiCanvas.dii=j)}}return r},KanjiCanvas.completeMap=function(a,n,i,e){var r=KanjiCanvas.getLargerAndSize(a,n);if(!e.includes(-1))return e;for(var s=e[e.length],t=-1,v=e.length-1;v>=0;v--){if(-1!=e[v]){t=e[v];break}s=v}for(v=s;v<e.length;v++)e[v]=t;var C=-1,j=-1;for(v=0;v<e.length;v++){if(-1!=e[v]){j=e[v];break}C=v}for(v=0;v<=C;v++)e[v]=j;for(v=0;v<e.length;v++)if(v+1<e.length&&-1==e[v+1]){for(var K=v,o=v+1;o<e.length&&-1==e[o];)o++;for(var c=K,f=1e6,l=K;l<o;l++){for(var d=r[0][K],h=K+1;h<=l;h++)d=d.concat(r[0][h]);var u=r[0][l+1];for(h=l+2;h<=o;h++)u=u.concat(r[0][h]);var _=i(d,r[1][e[K]]),g=i(u,r[1][e[o]]);_+g<f&&(c=l,f=_+g)}for(l=K;l<=c;l++)e[l]=e[K];for(l=c+1;l<o;l++)e[l]=e[o]}return e},KanjiCanvas.computeDistance=function(a,n,i,e){for(var r=KanjiCanvas.getLargerAndSize(a,n),s=0,t=0;t<r[2];){for(var v=r[1][e[t]],C=t,j=C+1;j<e.length&&e[j]==e[t];)j++;for(var K=r[0][C],o=C+1;o<j;o++)K=K.concat(r[0][o]);s+=i(v,K),t=j}return s},KanjiCanvas.computeWholeDistanceWeighted=function(a,n,i){for(var e=KanjiCanvas.getLargerAndSize(a,n),r=0,s=0;s<e[2];){for(var t=e[1][i[s]],v=s,C=v+1;C<i.length&&i[C]==i[s];)C++;for(var j=e[0][v],K=v+1;K<C;K++)j=j.concat(e[0][K]);var o=KanjiCanvas.wholeWholeDistance(t,j);if(C>v+1){var c=void 0===t?0:t.length,f=j.length;if(f<c){K=f;f=c,c=K}o*=f/c}r+=o,s=C}return r},KanjiCanvas.coarseClassification=function(a){for(var n=a.length,i=[],e=0;e<KanjiCanvas.refPatterns.length;e++){var r=KanjiCanvas.refPatterns[e][1];if(n<r+2&&n>r-3){var s=KanjiCanvas.refPatterns[e][2],t=KanjiCanvas.getMap(s,a,KanjiCanvas.endPointDistance);t=KanjiCanvas.completeMap(s,a,KanjiCanvas.endPointDistance,t);var v=KanjiCanvas.computeDistance(s,a,KanjiCanvas.endPointDistance,t),C=r,j=s.length;if(j<C){var K=j;j=C,C=K}i.push([e,v*(C/j)])}}return i.sort(function(a,n){return a[1]-n[1]}),i},KanjiCanvas.fineClassification=function(a,n){for(var i=a.length,e=[],r=0;r<Math.min(n.length,100);r++){var s=n[r][0],t=KanjiCanvas.refPatterns[s][1],v=KanjiCanvas.refPatterns[s][2];if(i<t+2&&i>t-3){var C=KanjiCanvas.getMap(v,a,KanjiCanvas.initialDistance);C=KanjiCanvas.completeMap(v,a,KanjiCanvas.wholeWholeDistance,C),"委"==KanjiCanvas.refPatterns[s][0]&&(console.log("finished imap, fine:"),console.log(C),console.log("weight:"),console.log(KanjiCanvas.computeDistance(v,a,KanjiCanvas.wholeWholeDistance,C)),console.log("weight intended:"),console.log(KanjiCanvas.computeDistance(v,a,KanjiCanvas.wholeWholeDistance,[0,1,2,3,4,7,5,6])));var j=KanjiCanvas.computeWholeDistanceWeighted(v,a,C),K=i,o=v.length;o>K&&(o=K),j/=o,e.push([s,j])}}e.sort(function(a,n){return a[1]-n[1]});var c="";for(r=0;r<Math.min(e.length,10);r++)c+=KanjiCanvas.refPatterns[e[r][0]][0],c+="  ";return c},KanjiCanvas.recognize=function(a){var i=KanjiCanvas.momentNormalize(a),e=KanjiCanvas.extractFeatures(i,20),r=KanjiCanvas.getMap(e,KanjiCanvas.refPatterns[0][2],KanjiCanvas.endPointDistance);r=KanjiCanvas.completeMap(e,KanjiCanvas.refPatterns[0][2],KanjiCanvas.endPointDistance,r);var s=KanjiCanvas.coarseClassification(e);if(KanjiCanvas.redraw(a),!KanjiCanvas["canvas_"+a].dataset.candidateList)return KanjiCanvas.fineClassification(e,s);n.getElementById(KanjiCanvas["canvas_"+a].dataset.candidateList).innerHTML=KanjiCanvas.fineClassification(e,s)},KanjiCanvas.copyStuff=function(a){KanjiCanvas.s="";for(var n=0,i=KanjiCanvas["recordedPattern_"+a].length;n<i;n++)console.log(n+1,KanjiCanvas["recordedPattern_"+a][n],KanjiCanvas["recordedPattern_"+a][n].toString()),console.log(KanjiCanvas["recordedPattern_"+a][n]),console.log(JSON.stringify(KanjiCanvas["recordedPattern_"+a][n])),KanjiCanvas.s+="["+JSON.stringify(KanjiCanvas["recordedPattern_"+a][n])+"],";KanjiCanvas.copyToClipboard(KanjiCanvas.s)},KanjiCanvas.copyToClipboard=function(a){var i=n.createElement("textarea");i.value=a,n.body.appendChild(i),i.select(),n.execCommand("copy"),n.body.removeChild(i)},n.addEventListener("keydown",function(a){var i=n.activeElement.id;if(KanjiCanvas["canvas_"+i]&&a.ctrlKey)switch(a.key.toLowerCase()){case"z":a.preventDefault(),KanjiCanvas.deleteLast(i);break;case"x":a.preventDefault(),KanjiCanvas.erase(i);break;case"f":a.preventDefault(),KanjiCanvas.recognize(i)}})}(window,document);