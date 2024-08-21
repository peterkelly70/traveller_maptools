[h: argCount = argCount()]

<!-- Extract tab name and token ID from arguments -->
[r: callerID = json.get(macro.args, 0) ]
[r: tab = json.get(macro.args, 1) ]

[h: tabNames = json.set("{}",
    "UPD", "char_personaldata",
    "Statistics", "char_statistics",
    "Skills", "char_skills",
    "Combat", "char_combat",
    "Armor", "char_armor",
    "Weapons", "char_weapons",
    "Augments", "char_augments",
    "Equipment", "char_equipment"
)]

[h: jsonData = getTableEntry("Images", 1)]
[h: imageUrl = json.get(jsonData, "assetid")]

[h: macroLinkText = ""]
[h: acount = 0]
[h: aline = 4] 
[FOREACH (macroName, tabNames), CODE: {
    [h: sep = " | "]
    [h: acount = acount+1]
    [h, if (acount == aline), CODE: {
        [h: sep = "<br/>"]
        [h: acount = 0]
    	};{
        [h: sep = " | "]
    	};
    ]
    [h: macroCommand = "CharSheet@lib:Traveller"]
    [h: args = json.append("[]", callerID, macroName)]
    [h: link = macroLink(macroName, macroCommand, "none", args)]
    [h: macroLinkText = macroLinkText + link + sep]
}]

[h: macroLinkText = substring(macroLinkText, 0, length(macroLinkText) - 3)]

<!-- Charater info -->
[h: tokenImage = getTokenPortrait("",callerID)]
[h: imgSrc= "<img src='"+ tokenImage +"' alt='Token Image' width='32' height='32'>"]
[h: cName = getName(callerID)]

<!-- Assuming 'contentMacro' is a macro on 'lib:Traveller' that returns HTML content based on 'tab' -->
[h: contentMacro = json.get(tabNames, tab)]
[h: runMacro = ""] <!-- Placeholder for the content result -->
[r: runMacro = evalMacro(contentMacro + "@lib:Traveller")]
[h: args = json.append("[]",callerID)]
[macro(runMacro): args] <!-- macro call, with values being passed -->
[h: tabcontent = macro.return ]  <!-- this is what you get back from the called macro -->
[macro("CSS@lib:Traveller") : ""]

[h: css=macro.return]

[frame(getName(callerID)): {
    <html>
    <head>
        <style type="text/css">
            [r: css]
        </style>
        <title>Character Sheet:[r:getName(callerID)]</title>
    </head>
    <body>
        <div class="header">
            <img src=[r: imageUrl] alt="Logo">
        </div>
        <div class='heading'><table><tr><td>[r: imgSrc]</td><td>[r: cName]</td></tr></table>
        <div class="tab">
            [r: macroLinkText]
        </div>
        <div class="tabcontent">
            [r: tabcontent]
        </div>
    </body>
    </html>
}]