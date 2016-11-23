/*!
 * CSVParser.js
 * Mr-Data-Converter
 *
 * Input CSV or Tab-delimited data and this will parse it into a Data Grid Javascript object
 */
function DataConverter(n){this.nodeId=n;this.node=$("#"+n);this.outputDataType="json";this.rowDelimiter="\n";this.inputText="";this.outputText="";this.indent="  ";this.tableName="MrDataConverter";this.headersProvided=!0;this.downcaseHeaders=!1;this.upcaseHeaders=!1;this.includeWhiteSpace=!0;this.useTabsForIndent=!1}var isDecimalRe=/^\s*(\+|-)?((\d+([,\.]\d+)?)|([,\.]\d+))\s*$/,CSVParser={escapeText:function(n,t){return n===undefined?"":(t===undefined&&(t="html"),t==="xml"&&(n=n.replace(/&/g,"&amp;"),n=n.replace(/'/g,"&apos;")),t==="rtf"?(n=n.replace(/\\/g,"\\'5c"),n=n.replace(/\{/g,"\\'7b"),n=n.replace(/\}/g,"\\'7d"),n=n.replace(/~/g,"\\'98")):(n=n.replace(/</g,"&lt;"),n=n.replace(/>/g,"&gt;")),n=n.replace(/…/g,t==="rtf"?"\\'85":"&hellip;"),n=n.replace(/‘/g,t==="rtf"?"\\'91":"&lsquo;"),n=n.replace(/’/g,t==="rtf"?"\\'92":"&rsquo;"),n=n.replace(/“/g,t==="rtf"?"\\'93":"&ldquo;"),n=n.replace(/”/g,t==="rtf"?"\\'94":"&rdquo;"),n=n.replace(/–/g,t==="rtf"?"\\'96":"&ndash;"),n=n.replace(/—/g,t==="rtf"?"\\'97":"&mdash;"),n=n.replace(/‹/g,t==="rtf"?"\\'8b":"&lsaquo;"),n=n.replace(/›/g,t==="rtf"?"\\'9b":"&rsaquo;"),n=n.replace(/«/g,t==="rtf"?"\\'ab":"&laquo;"),n=n.replace(/»/g,t==="rtf"?"\\'bb":"&raquo;"),n=n.replace(/¡/g,t==="rtf"?"\\'a1":"&iexcl;"),n=n.replace(/¿/g,t==="rtf"?"\\'bf":"&iquest;"),n=n.replace(/ /g,t==="rtf"?"\\~":"&nbsp;"),n=n.replace(/€/g,t==="rtf"?"\\'80":"&euro;"),n=n.replace(/†/g,t==="rtf"?"\\'86":"&dagger;"),n=n.replace(/‡/g,t==="rtf"?"\\'87":"&Dagger;"),n=n.replace(/•/g,t==="rtf"?"\\'95":"&bull;"),n=n.replace(/™/g,t==="rtf"?"\\'99":"&trade;"),n=n.replace(/¢/g,t==="rtf"?"\\'a2":"&cent;"),n=n.replace(/£/g,t==="rtf"?"\\'a3":"&pound;"),n=n.replace(/¤/g,t==="rtf"?"\\'a4":"&curren;"),n=n.replace(/¥/g,t==="rtf"?"\\'a5":"&yen;"),n=n.replace(/§/g,t==="rtf"?"\\'a7":"&sect;"),n=n.replace(/©/g,t==="rtf"?"\\'a9":"&copy;"),n=n.replace(/®/g,t==="rtf"?"\\'ae":"&reg;"),n=n.replace(/°/g,t==="rtf"?"\\'b0":"&deg;"),n=n.replace(/±/g,t==="rtf"?"\\'b1":"&plusmn;"),n=n.replace(/²/g,t==="rtf"?"\\'b2":"&sup2;"),n=n.replace(/³/g,t==="rtf"?"\\'b3":"&sup3;"),n=n.replace(/µ/g,t==="rtf"?"\\'b5":"&micro;"),n=n.replace(/¶/g,t==="rtf"?"\\'b6":"&para;"),n=n.replace(/·/g,t==="rtf"?"\\'b7":"&middot;"),n=n.replace(/¼/g,t==="rtf"?"\\'bc":"&frac14;"),n=n.replace(/½/g,t==="rtf"?"\\'bd":"&frac12;"),n=n.replace(/¾/g,t==="rtf"?"\\'be":"&frac34;"),n=n.replace(/×/g,t==="rtf"?"\\'d7":"&times;"),n=n.replace(/÷/g,t==="rtf"?"\\'f7":"&divide;"),n=n.replace(/á/g,t==="rtf"?"\\'e1":"&aacute;"),n=n.replace(/Á/g,t==="rtf"?"\\'c1":"&Aacute;"),n=n.replace(/à/g,t==="rtf"?"\\'e0":"&agrave;"),n=n.replace(/À/g,t==="rtf"?"\\'c0":"&Agrave;"),n=n.replace(/â/g,t==="rtf"?"\\'e2":"&acirc;"),n=n.replace(/Â/g,t==="rtf"?"\\'c2":"&Acirc;"),n=n.replace(/ä/g,t==="rtf"?"\\'e4":"&auml;"),n=n.replace(/Ä/g,t==="rtf"?"\\'c4":"&Auml;"),n=n.replace(/ã/g,t==="rtf"?"\\'e3":"&atilde;"),n=n.replace(/Ã/g,t==="rtf"?"\\'c3":"&Atilde;"),n=n.replace(/å/g,t==="rtf"?"\\'e5":"&aring;"),n=n.replace(/Å/g,t==="rtf"?"\\'c5":"&Aring;"),n=n.replace(/æ/g,t==="rtf"?"\\'e6":"&aelig;"),n=n.replace(/Æ/g,t==="rtf"?"\\'c6":"&AElig;"),n=n.replace(/ç/g,t==="rtf"?"\\'e7":"&ccedil;"),n=n.replace(/Ç/g,t==="rtf"?"\\'c7":"&Ccedil;"),n=n.replace(/ð/g,t==="rtf"?"\\'f0":"&eth;"),n=n.replace(/Ð/g,t==="rtf"?"\\'d0":"&ETH;"),n=n.replace(/é/g,t==="rtf"?"\\'e9":"&eacute;"),n=n.replace(/É/g,t==="rtf"?"\\'c9":"&Eacute;"),n=n.replace(/è/g,t==="rtf"?"\\'e8":"&egrave;"),n=n.replace(/È/g,t==="rtf"?"\\'c8":"&Egrave;"),n=n.replace(/ê/g,t==="rtf"?"\\'ea":"&ecirc;"),n=n.replace(/Ê/g,t==="rtf"?"\\'ca":"&Ecirc;"),n=n.replace(/ë/g,t==="rtf"?"\\'eb":"&euml;"),n=n.replace(/Ë/g,t==="rtf"?"\\'cb":"&Euml;"),n=n.replace(/í/g,t==="rtf"?"\\'ed":"&iacute;"),n=n.replace(/Í/g,t==="rtf"?"\\'cd":"&Iacute;"),n=n.replace(/ì/g,t==="rtf"?"\\'ec":"&igrave;"),n=n.replace(/Ì/g,t==="rtf"?"\\'cc":"&Igrave;"),n=n.replace(/î/g,t==="rtf"?"\\'ee":"&icirc;"),n=n.replace(/Î/g,t==="rtf"?"\\'ce":"&Icirc;"),n=n.replace(/ï/g,t==="rtf"?"\\'ef":"&iuml;"),n=n.replace(/Ï/g,t==="rtf"?"\\'cf":"&Iuml;"),n=n.replace(/ñ/g,t==="rtf"?"\\'f1":"&ntilde;"),n=n.replace(/Ñ/g,t==="rtf"?"\\'d1":"&Ntilde;"),n=n.replace(/ó/g,t==="rtf"?"\\'f3":"&oacute;"),n=n.replace(/Ó/g,t==="rtf"?"\\'d3":"&Oacute;"),n=n.replace(/ò/g,t==="rtf"?"\\'f2":"&ograve;"),n=n.replace(/Ò/g,t==="rtf"?"\\'d2":"&Ograve;"),n=n.replace(/ô/g,t==="rtf"?"\\'f4":"&ocirc;"),n=n.replace(/Ô/g,t==="rtf"?"\\'d4":"&Ocirc;"),n=n.replace(/ö/g,t==="rtf"?"\\'f6":"&ouml;"),n=n.replace(/Ö/g,t==="rtf"?"\\'d6":"&Ouml;"),n=n.replace(/õ/g,t==="rtf"?"\\'f5":"&otilde;"),n=n.replace(/Õ/g,t==="rtf"?"\\'d5":"&Otilde;"),n=n.replace(/ø/g,t==="rtf"?"\\'f8":"&oslash;"),n=n.replace(/Ø/g,t==="rtf"?"\\'d8":"&Oslash;"),n=n.replace(/œ/g,t==="rtf"?"\\'9c":"&#339;"),n=n.replace(/Œ/g,t==="rtf"?"\\'8c":"&#338;"),n=n.replace(/ß/g,t==="rtf"?"\\'df":"&szlig;"),n=n.replace(/ú/g,t==="rtf"?"\\'fa":"&uacute;"),n=n.replace(/Ú/g,t==="rtf"?"\\'da":"&Uacute;"),n=n.replace(/ù/g,t==="rtf"?"\\'f9":"&ugrave;"),n=n.replace(/Ù/g,t==="rtf"?"\\'d9":"&Ugrave;"),n=n.replace(/û/g,t==="rtf"?"\\'fb":"&ucirc;"),n=n.replace(/Û/g,t==="rtf"?"\\'db":"&Ucirc;"),n=n.replace(/ü/g,t==="rtf"?"\\'fc":"&uuml;"),n=n.replace(/Ü/g,t==="rtf"?"\\'dc":"&Uuml;"),n=n.replace(/ý/g,t==="rtf"?"\\'fd":"&yacute;"),n=n.replace(/Ý/g,t==="rtf"?"\\'dd":"&Yacute;"),n=n.replace(/ÿ/g,t==="rtf"?"\\'ff":"&yuml;"),n=n.replace(/Ÿ/g,t==="rtf"?"\\'9f":"&#376;"),n=n.replace(/´/g,t==="rtf"?"\\'b4":"&acute;"),t!=="rtf"&&(n=n.replace(/`/g,"&#96;")),n)},isNumber:function(n){return n!==""&&!(isNaN(n)||/^0\d/.test(n))},repeat:function(n,t){if(t<1)return"";for(var i="";t>1;)t&1&&(i+=n),t>>=1,n+=n;return i+n},parse:function(n,t,i,r,u,f){var l,o=[],p,c,b,k,e,a,h;switch(i){case"comma":l=",";break;case"tab":l="\t";break;default:l=/\t/.test(n)?"\t":","}for(n.indexOf(l)>-1&&(p=new RegExp("^"+d.rowDelimiter+"+|"+d.rowDelimiter+"+$","g"),n=n.replace(p,"")),o=this.CSVToArray(n,l),e=o.length-1;e>=0;--e)for(c=o[e].length-1;c>=0;--c)o[e][c]=o[e][c].replace("\t","\\t"),o[e][c]=o[e][c].replace("\n","\\n"),o[e][c]=o[e][c].replace("\r","\\r");var s=[],v=[],w=o[0].length,tt=o.length;if(t)s=o.splice(0,1)[0],tt=o.length;else for(e=0;e<w;++e)s.push("val"+e),v.push("");for(e=s.length-1;e>=0;--e)s[e]=$.trim(s[e]),s[e]=s[e].replace(/[^\w -]|&quot;/g,""),s[e]=s[e].replace(/ +/g,"_"),/^[^a-z]/i.test(s[e])&&(s[e]="col"+s[e]),u&&(s[e]=s[e].toUpperCase()),r&&(s[e]=s[e].toLowerCase());for(e=0,a=o.length;e<a;++e)b=o[e].length,b!==w&&this.log("Error parsing row "+e+". Wrong number of columns.");for(k=o.length,e=0,a=s.length;e<a;++e){var g=0,nt=0,y=0;for(h=0;h<k;++h)o[h]&&(f==="comma"&&isDecimalRe.test(o[h][e])&&(o[h][e]=o[h][e].replace(",",".")),CSVParser.isNumber(o[h][e])?(++nt,(o[h][e]+"").indexOf(".")>-1&&++y):o[h][e]!==""&&++g);v[e]=g||!nt&&!y?"string":y===0?"int":"float"}return{dataGrid:o,headerNames:s,headerTypes:v,errors:this.getLog()}},errorLog:[],resetLog:function(){this.errorLog=[]},log:function(n){this.errorLog.push(n)},getLog:function(){var t="",n,i;if(this.errorLog.length>0){for(n=0,i=this.errorLog.length;n<i;++n)t+="!!"+this.errorLog[n]+"!!\n";t+="\n"}return t},CSVToArray:function(n,t){var u,f;t=t||",";var e=new RegExp("(\\"+t+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+t+"\\r\\n]*))","gi"),r=[[]],i=null;for(t==="\t"&&(n=n.replace(/(\t|\r?\n|\r|^)(".+?")([\t\n\r])/g,function(n,t,i,r){return t+i.replace(/\t/g,"\\t")+r}),n=n.replace(/(\t|\r?\n|\r|^)([^\t"][^\t]+)/g,function(n,t,i){return t+i.replace(/"/g,"&quot;")}));i=e.exec(n);)u=i[1],u.length&&u!==t&&r.push([]),f=i[2]?i[2].replace(/""/g,"&quot;"):i[3],r[r.length-1].push(f);return r}},DataGridRenderer,d;
/*!
 * DataGridRenderer.js
 * Part of Mr-Data-Converter
 *
 * Created by Shan Carter on 2010-10-18.
 */
DataGridRenderer={asp:function(n,t,i,r,u){var o="",c=n.length,l=t.length,e,s,f,h;for(u=u||":",e=0;e<c;++e)for(s=n[e],f=0;f<l;++f)h=i[f]==="int"||i[f]==="float"?s[f]||"Empty":'"'+(s[f]||"")+'"',o+="myArray("+f+","+e+") = "+h+u;return o="Dim myArray("+(f-1)+","+(e-1)+")"+u+o,o.replace(/&quot;/g,'""')},csharp:function(n,t,i,r,u){var e="",c=n.length,s=t.length,o,h,f;for(e+="DataTable "+d.tableName+" = new DataTable();"+u,f=0;f<s;++f)e+=d.tableName+'.Columns.Add("'+t[f]+'", typeof('+(i[f]==="int"||i[f]==="float"?i[f]:"string")+"));"+u;for(o=0;o<c;++o){for(h=n[o],e+=d.tableName+".Rows.Add(",f=0;f<s;++f)e+=i[f]==="int"||i[f]==="float"?h[f]||"null":'"'+(h[f]||"")+'"',f<s-1&&(e+=", ");e+=");"+u}return e.replace(/&quot;/g,'\\"')},cfml:function(n,t,i,r,u){for(var s,f,l,e="[",h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+="{",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||'""':'"'+(s[f]||"")+'"',e+='"'+t[f]+'"='+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+="]"+u,e.replace(/&quot;/g,'\\"')},go:function(n,t,i,r,u){var e="",c=n.length,o=t.length,s,h,f;for(e+="type rows struct{",f=0;f<o;++f)e+=t[f]+" "+(i[f]==="int"||i[f]==="float"?i[f]+"64":"string"),f<o-1&&(e+="; ");for(e+="}"+(u||";")+d.tableName+" := []rows{"+u,s=0;s<c;++s){for(h=n[s],e+=r+"{",f=0;f<o;++f)e+=i[f]==="int"||i[f]==="float"?h[f]||"nil":'"'+(h[f]||"")+'"',f<o-1&&(e+=", ");e+="},"+u}return e+="}"+u,e.replace(/&quot;/g,'\\"')},html:function(n,t,i,r,u){var f="",h=n.length,c=t.length,l=function(n){return d.includeHtmlClass?' class="cell-'+(d.headersProvided?t[n].replace(/_/g,"-").toLowerCase():"col"+(n+1))+'"':""},o,a,s,e;if(f+="<table>"+u,d.headersProvided){for(f+=r+"<thead>"+u+r+r+"<tr>"+u,e=0;e<c;++e)f+=r+r+r+"<th"+l(e)+">"+t[e].replace(/^col(\d)/,"$1")+"</th>"+u;f+=r+r+"</tr>"+u+r+"</thead>"+u}for(f+=r+"<tbody>"+u,o=0;o<h;++o){for(a=n[o],s="",o===h-1?s=d.includeHtmlClass?' class="last-row"':"":o===0&&(s=d.includeHtmlClass?' class="first-row"':""),f+=r+r+"<tr"+s+">"+u,e=0;e<c;++e)f+=r+r+r+"<td"+l(e)+">"+CSVParser.escapeText(a[e])+"</td>"+u;f+=r+r+"</tr>"+u}return f+=r+"</tbody>"+u+"</table>"+u,f.replace(/&quot;/g,'"')},json:function(n,t,i,r,u){for(var s,f,l,e="[",h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+="{",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"null":'"'+(s[f]||"")+'"',e+='"'+t[f]+'":'+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+="]"+u,e.replace(/&quot;/g,'\\"')},jsonArrayCols:function(n,t,i,r,u){for(var o,e="{"+u,s=n.length,h=t.length,f=0;f<h;++f){for(e+=r+'"'+t[f]+'":[',o=0;o<s;++o)e+=i[f]==="int"||i[f]==="float"?n[o][f]||"null":'"'+(n[o][f]||"")+'"',o<s-1&&(e+=",");e+="]";f<h-1&&(e+=","+u)}return e+=u+"}"+u,e.replace(/&quot;/g,'\\"')},jsonArrayRows:function(n,t,i,r,u){for(var f,e="["+u,s=n.length,h=t.length,o=0;o<s;++o){for(e+=r+"[",f=0;f<h;++f)e+=i[f]==="int"||i[f]==="float"?n[o][f]||"null":'"'+(n[o][f]||"")+'"',f<h-1&&(e+=",");e+="]";o<s-1&&(e+=","+u)}return e+=u+"]"+u,e.replace(/&quot;/g,'\\"')},jsonDict:function(n,t,i,r,u){for(var o,f="{"+u,s=n.length,h=t.length,c=function(t,r){return i[r]==="int"||i[r]==="float"?n[t][r]||"null":'"'+(n[t][r]||"")+'"'},e=0;e<s;++e){if(f+=r+'"'+n[e][0]+'":',h===2)f+=c(e,1);else{for(f+="{",o=1;o<h;++o)o>1&&(f+=","),f+='"'+t[o]+'":'+c(e,o);f+="}"}e<s-1&&(f+=","+u)}return f+=u+"}"+u,f.replace(/&quot;/g,'\\"')},luaDict:function(n,t,i,r,u){for(var o,f="{"+u,s=n.length,h=t.length,c=function(t,r){return i[r]==="int"||i[r]==="float"?n[t][r]||"nil":'"'+(n[t][r]||"")+'"'},e=0;e<s;++e){if(f+=r+'["'+n[e][0]+'"]=',h===2)f+=c(e,1);else{for(f+="{",o=1;o<h;++o)o>1&&(f+=","),f+='["'+t[o]+'"]='+c(e,o);f+="}"}e<s-1&&(f+=","+u)}return f+=u+"}"+u,f.replace(/&quot;/g,'\\"')},luaArray:function(n,t,i,r,u){for(var s,f,l,e="{"+u,h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+=r+"["+(o+1)+"]={",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"nil":'"'+(s[f]||"")+'"',e+='["'+t[f]+'"]='+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+=u+"}"+u,e.replace(/&quot;/g,'\\"')},markdown:function(n,t,i,r,u){var e="",l=n.length,h=t.length,o=[],s,c,f;for(e+="|",f=0;f<h;++f)e+=" "+t[f]+" |",o.push(t[f].length+2+(i[f]==="int"||i[f]==="float"?"r":""));for(e+=u+"|",f=0;f<h;++f)e+=(o[f].indexOf("r")<0?CSVParser.repeat("-",o[f]):CSVParser.repeat("-",parseInt(o[f])-1)+":")+"|";for(s=0;s<l;++s)for(c=n[s],e+=u+"|",f=0;f<h;++f)e+=" "+CSVParser.escapeText(c[f]).replace(/\|/g,"&#124;")+" |";return e+=u,e.replace(/&quot;/g,'"')},mysql:function(n,t,i,r,u){var e="",c=n.length,s=t.length,h,o,f;for(e+="CREATE TABLE "+d.tableName+" ("+u+r+"id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,"+u,f=0;f<s;++f)h="VARCHAR(255)",(i[f]==="int"||i[f]==="float")&&(h=i[f].toUpperCase()),e+=r+t[f]+" "+h,f<s-1&&(e+=","),e+=u;for(e+=");"+u+"INSERT INTO "+d.tableName+" "+u+r+"(",f=0;f<s;++f)e+=t[f].replace(/\W/g,""),f<s-1&&(e+=",");for(e+=") "+u+"VALUES "+u,o=0;o<c;++o){for(e+=r+"(",f=0;f<s;++f)i[f]==="int"||i[f]==="float"?e+=n[o][f]||"NULL":(n[o][f]=n[o][f]?n[o][f].replace(/'/g,"''"):"",e+="'"+n[o][f]+"'"),f<s-1&&(e+=",");e+=")";o<c-1&&(e+=","+u)}return e+=";"+u,e.replace(/&quot;/g,'"')},perl:function(n,t,i,r,u){for(var s,f,l,e="(",h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+="{",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"undef":'"'+(s[f]||"")+'"',e+='"'+t[f]+'"=>'+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+=")"+u,e.replace(/&quot;/g,'\\"')},php:function(n,t,i,r,u){for(var s,f,l,e="array("+u,h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+=r+"array(",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"NULL":'"'+(s[f]||"")+'"',e+='"'+t[f]+'"=>'+l,f<c-1&&(e+=",");e+=")";o<h-1&&(e+=","+u)}return e+=u+")"+u,e.replace(/&quot;/g,'\\"')},python:function(n,t,i,r,u){for(var s,f,l,e="[",h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+="{",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"None":'"'+(s[f]||"")+'"',e+='"'+t[f]+'":'+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+="]"+u,e.replace(/&quot;/g,'\\"')},rtf:function(n,t,i,r,u){var e="",l=n.length,o=t.length,h="",a=Math.round(9e3/o),s,c,f;for(e+="\\trowd\\trgaph144",f=0;f<o;++f)e+="\\clbrdrt\\brdrs\\clbrdrl\\brdrs\\clbrdrb\\brdrs\\clbrdrr\\brdrs\\cellx"+a*(f+1);for(h=e,f=0;f<o;++f)e+="\\pard\\intbl\\qc\\b{"+t[f]+"}\\cell";for(e+="\\row"+u,s=0;s<l;++s){for(c=n[s],e+=h,f=0;f<o;++f)e+="\\pard\\intbl"+(i[f]==="int"||i[f]==="float"?"\\qr":"")+"\\plain{"+CSVParser.escapeText(c[f],"rtf")+"}\\cell";e+="\\row"+u}return e.replace(/&quot;/g,'"')},ruby:function(n,t,i,r,u){for(var s,f,l,e="[",h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+="{",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"nil":'"'+(s[f]||"")+'"',e+='"'+t[f]+'"=>'+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+="]"+u,e.replace(/&quot;/g,'\\"')},trac:function(n,t,i,r,u){var e="",c=n.length,s=t.length,o,h,f;for(e+="||=",f=0;f<s;++f)e+=" "+t[f]+" =||",f<s-1&&(e+="=");for(o=0;o<c;++o)for(h=n[o],e+=u+"||",f=0;f<s;++f)e+=" "+CSVParser.escapeText(h[f]).replace(/\|/g,"&#124;")+(i[f]==="int"||i[f]==="float"?"":" ")+"||";return e+=u,e.replace(/&quot;/g,'"')},wiki:function(n,t,i,r,u){var e="",h=n.length,s=t.length,o,c,f;for(e+='{| class="wikitable"'+u+"! ",f=0;f<s;++f)e+='scope="col" | '+t[f],f<s-1&&(e+=" || ");for(e+=u+"|-"+u,o=0;o<h;++o){for(c=n[o],e+="| ",f=0;f<s;++f)e+=(i[f]==="int"||i[f]==="float"?'style="text-align:right" | ':"")+CSVParser.escapeText(c[f]).replace(/\|/g,"&#124;"),f<s-1&&(e+=" || ");o<h-1&&(e+=u+"|-"+u)}return e+=u+"|}"+u,e.replace(/&quot;/g,'"')},xmlProperties:function(n,t,i,r,u){var f="",h=n.length,c=t.length,o,s,e;for(f+='<?xml version="1.0" encoding="UTF-8"?>'+u+"<rows>"+u,o=0;o<h;++o){for(s=n[o],f+=r+"<row ",e=0;e<c;++e)f+=t[e]+'="'+CSVParser.escapeText(s[e],"xml")+'" ';f+="/>"+u}return f+="</rows>"+u,f.replace(/&amp;quot;/g,"&quot;")},xml:function(n,t,i,r,u){var e="",h=n.length,c=t.length,s,o,f;for(e+='<?xml version="1.0" encoding="UTF-8"?>'+u+"<rows>"+u,s=0;s<h;++s){for(o=n[s],e+=r+"<row>"+u,f=0;f<c;++f)o[f]=o[f]?CSVParser.escapeText(o[f],"xml"):"",t[f]=t[f].replace(/\W/g,""),e+=r+r+"<"+t[f]+">"+o[f]+"</"+t[f]+">"+u;e+=r+"</row>"+u}return e+="</rows>"+u,e.replace(/&amp;quot;/g,"&quot;")},xmlIllustrator:function(n,t,i,r,u){var e="",c=n.length,h=t.length,o,s,f;for(e+='<?xml version="1.0" encoding="utf-8"?>'+u+'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20001102//EN" "http://www.w3.org/TR/2000/CR-SVG-20001102/DTD/svg-20001102.dtd" ['+u+r+'<!ENTITY ns_graphs "http://ns.adobe.com/Graphs/1.0/">'+u+r+'<!ENTITY ns_vars "http://ns.adobe.com/Variables/1.0/">'+u+r+'<!ENTITY ns_imrep "http://ns.adobe.com/ImageReplacement/1.0/">'+u+r+'<!ENTITY ns_custom "http://ns.adobe.com/GenericCustomNamespace/1.0/">'+u+r+'<!ENTITY ns_flows "http://ns.adobe.com/Flows/1.0/">'+u+r+'<!ENTITY ns_extend "http://ns.adobe.com/Extensibility/1.0/">'+u+"]>"+u+"<svg>"+u+r+'<variableSets xmlns="&ns_vars;">'+u+r+r+'<variableSet varSetName="binding1" locked="none">'+u+r+r+r+"<variables>"+u,f=0;f<h;++f)e+=r+r+r+r+'<variable varName="'+t[f]+'" trait="textcontent" category="&ns_flows;"></variable>'+u;for(e+=r+r+r+"</variables>"+u+r+r+r+'<v:sampleDataSets xmlns:v="http://ns.adobe.com/Variables/1.0/" xmlns="http://ns.adobe.com/GenericCustomNamespace/1.0/">'+u,o=0;o<c;++o){for(s=n[o],e+=r+r+r+r+'<v:sampleDataSet dataSetName="'+s[0]+'">'+u,f=0;f<h;++f)t[f]=t[f].replace(/\W/g,""),e+=r+r+r+r+r+"<"+t[f]+"><p>"+CSVParser.escapeText(s[f],"xml")+"</p></"+t[f]+">"+u;e+=r+r+r+r+"</v:sampleDataSet>"+u}return e+=r+r+r+"</v:sampleDataSets>"+u+r+r+"</variableSet>"+u+r+"</variableSets>"+u+"</svg>"+u,e.replace(/&amp;quot;/g,"&quot;")},yaml:function(n,t,i,r,u){for(var s,f,o="",h=n.length,c=t.length,l=t.sort(function(n,t){return t.length-n.length})[0].length,e=0;e<h;++e)for(s=n[e],f=0;f<c;++f)o+=(f>0?"  ":"- ")+t[f]+": "+CSVParser.repeat(" ",l-t[f].length)+(s[f]||"")+u;return o.replace(/&quot;/g,'"')}};
/*!
 * Converter.js
 * Mr-Data-Converter
 *
 * Created by Shan Carter on 2010-09-01.
 */
DataConverter.prototype.init=function(){var n=this;this.inputTextArea=$("#data-input");this.outputTextArea=$("#data-output");this.dataSelector=$("#data-selector");$("#converter > .wrapper").append('<div class="loader">  <span class="loader-text">Loading...</span>  <i class="loader-icon"></i></div>');this.outputTextArea.val()&&(n.outputDataType=this.dataSelector.children("option:selected").val(),n.convert());this.inputTextArea.add(this.outputTextArea).click(function(){this.select()});$("#insert-sample").click(function(t){t.preventDefault();n.insertSampleData();n.convert();ga("send","event","SampleData","InsertGeneric")});this.inputTextArea.on({change:function(){n.convert();ga("send","event","DataType",n.outputDataType)},keyup:function(){var t=$(this);t.data("wait")||(t.data("wait",!0),n.convert(),setTimeout(function(){t.data("wait",!1)},500))}});this.dataSelector.change(function(){n.outputDataType=$(this).val();n.convert();n.outputTextArea.select()});$(".loader").remove();this.node.addClass("loaded")};DataConverter.prototype.convert=function(){if(this.inputText=this.inputTextArea.val(),this.inputText.length>0){this.includeWhiteSpace?this.newLine="\n":(this.indent="",this.newLine="");CSVParser.resetLog();var n=CSVParser.parse(this.inputText,this.headersProvided,this.delimiter,this.downcaseHeaders,this.upcaseHeaders,this.decimal),t=n.dataGrid,i=n.headerNames,r=n.headerTypes,u=n.errors;this.outputText=DataGridRenderer[this.outputDataType](t,i,r,this.indent,this.newLine);this.outputTextArea.val(u+this.outputText)}};DataConverter.prototype.insertSampleData=function(){this.inputTextArea.val('NAME\tVALUE\tCOLOR\tDATE\nAlan\t12\tblue\tSep. 25, 2009\nShan\t13\t"green\tblue"\tSep. 27, 2009\nJohn\t45\torange\tSep. 29, 2009\nMinna\t27\tteal\tSep. 30, 2009')};
/*!
 * Controller.js
 */
$(document).ready(function(){function n(n){if(n&&ga("send","event","Settings",n.currentTarget.id),d.includeWhiteSpace=$("#includeWhiteSpaceCB").prop("checked"),d.includeHtmlClass=$("#includeHtmlClassCB").prop("checked"),d.includeWhiteSpace){$("input[name=indentType]").removeAttr("disabled");switch($("input[name=indentType]:checked").val()){case"spaces":d.indent="  ";break;case"tabs":d.indent="\t"}}else $("input[name=indentType]").prop("disabled",!0);if(d.headersProvided=$("#headersProvidedCB").prop("checked"),d.headersProvided){$("input[name=headerModifications]").removeAttr("disabled");switch($("input[name=headerModifications]:checked").val()){case"none":d.downcaseHeaders=!1;d.upcaseHeaders=!1;break;case"downcase":d.downcaseHeaders=!0;d.upcaseHeaders=!1;break;case"upcase":d.downcaseHeaders=!1;d.upcaseHeaders=!0}}else $("input[name=headerModifications]").prop("disabled",!0);d.delimiter=$("input[name=delimiter]:checked").val();d.decimal=$("input[name=decimal]:checked").val();d.convert()}d=new DataConverter("converter");d.init();$(".settings-element").change(n);n()});