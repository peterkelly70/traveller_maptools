[h: argCount = argCount()]

<!-- Extract tab name and token ID from arguments -->
[r: callerID = json.get(macro.args, 0) ]
[r: tab = json.get(macro.args, 1) ]

[h: tabNames = json.set("{}",
    "Test", "admin_test",
    "Combat", "admin_combat",
    "Skills", "admin_skills",
    "Armor", "admin_armor",
    "Weapons", "admin_weapons",
    "Augments", "admin_augments",
    "Equipment", "admin_equipment",
    "Supplies", "admin_supplies",
    "Statuses", "admin_statuses"
)]

[h: jsonData = getTableEntry("Images", 1)]
[h: imageUrl = json.get(jsonData, "assetid")]

[h: macroLinkText = ""]
[h: acount = 0]
[h: aline = 3] 
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
    [h: macroCommand = "AdminSheet@lib:Traveller"]
    [h: args = json.append("[]", callerID, macroName)]
    [h: link = macroLink(macroName, macroCommand, "none", args)]
    [h: macroLinkText = macroLinkText + link + sep]
}]

[h: macroLinkText = substring(macroLinkText, 0, length(macroLinkText) - 3)]



<!-- Assuming 'contentMacro' is a macro on 'lib:Traveller' that returns HTML content based on 'tab' -->
[h: contentMacro = json.get(tabNames, tab)]
[h: runMacro = ""] <!-- Placeholder for the content result -->
[r: runMacro = evalMacro(contentMacro + "@lib:Traveller")]
[h: args = json.append("[]",callerID)]
[macro(runMacro): args] <!-- macro call, with values being passed -->
[h: tabcontent = macro.return ]  <!-- this is what you get back from the called macro -->
[macro("CSS@lib:Traveller") : ""]

[h: css=macro.return]

[frame("Admin"): {
    <html>
    <head>
        <style type="text/css">
            [r: css]
        </style>
        <title>Admin</title>
    </head>
    <body>
        <div class="header">
            <img src="[r: imageUrl]" alt="Logo">
        </div>
        <div class="tab">
            [r: macroLinkText]
        </div>
        <div class="tabcontent">
            [r: tabcontent]
        </div>
    </body>
    </html>
}]