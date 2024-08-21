[h: debug = getLibProperty("debug","lib:Traveller")]
[h: debug = 0]
[h, if (debug == 1): broadcast("makeLink Started")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: linkName = json.get(macro.args, 2)]
[h: linkMacro = json.get(macro.args, 3)]
[h: macroArgs = json.get(macro.args, 4)]
[h: linkImage = json.get(macro.args, 5)]
[h, if (debug == 1): broadcast("args : "+json.length(macro.args))]
[h, if(json.length(macro.args) < 7), code: {
	[h: imageSize=32] 
	};{
	[h: imageSize=json.get(macro.args, 6)]
}]


[h, if (debug == 1), code:{
   [h: broadcast("<pre> makelink </pre>")]
   [h: broadcast("<pre>" + json.indent(macro.args) + "</pre>")]
   [h: broadcast("<pre>"+json.indent(macro.args, 3))+"</pre>"]
};{}]

[h: iconArray = json.append("[]", "none", "add", "view", "edit", "delete","roll","new","plus","minus","delay","blood","attack","defend","shoot","dodge","dive","aim","cover","parry","run","reload","applyDamage","tick","notick")]
[h: icon = json.indexOf(iconArray, linkImage)]
[h:tooltips = table("Icons", icon)]
[h:tooltips = linkName]
[h:imageUrl = tblImage("Icons", icon,imageSize)]
[h: args = json.append("[]", callerID, returnCall)]
[h, foreach(arg, macroArgs), code: {
    [h: args = json.append(args, arg)]
}]

[h: pic = strformat("<img border='0' alt='%s' src='%s' />", tooltips, imageUrl)]
[h: link = macroLinkText(linkMacro,"all",args, callerID,macroArgs)]
[h: retLink = strformat("<a href='%s'>%s</a>", link, pic)]
[h, if (debug == 1): broadcast("makeLink Stopped")]
[h: macro.return = retLink]

