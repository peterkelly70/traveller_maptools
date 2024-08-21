[h: argCount = argCount()]

<!-- Extract tab name and token ID from arguments -->
[r: callerID = json.get(macro.args, 0) ]
[r: tab = json.get(macro.args, 1) ]

<!-- Create a JSON object mapping tab names to macro commands located in 'lib:Traveller' -->
[h: tabNames = json.set("{}",
    "Personal Data", "char_personaldata",
    "Statistics", "char_statistics",
    "Skills", "char_skills",
    "Equipment", "char_equipment"
    )] 

[r: jsonData = getTableEntry("Images", 1)]
[r: imageUrl = json.get(jsonData, "assetid")]

[h: macroLinkText = ""]

[FOREACH (macroName,tabNames), CODE:
    {
  	[h: macroCommand = "CharSheet@lib:Traveller")] 
  	[h: args = json.append("[]", callerID,macroName)]
    [h: link = macroLink(macroName, macroCommand, "none",args)]
    [h: macroLinkText = macroLinkText + link + " | "]
    }
]

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

[
[frame5("Character Sheet"): {
<html>
<head>
    <title>Character Sheet</title>
    <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>
    <script src='https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js'></script>
    <script>
        $(document).ready(function(){
            $("#tabs").tabs();
        });
    </script>
</head>
<body>
    <div id="tabs">
        <ul>
            <li><a href="#tab-1">Armor</a></li>
            <li><a href="#tab-2">Weapons</a></li>
            <li><a href="#tab-3">Augments</a></li>
            <li><a href="#tab-4">Consumables</a></li>
            <li><a href="#tab-5">Equipment</a></li>
        </ul>
        <div id="tab-1"><p>Armor content goes here.</p></div>
        <div id="tab-2"><p>Weapons content goes here.</p></div>
        <div id="tab-3"><p>Augments content goes here.</p></div>
        <div id="tab-4"><p>Consumables content goes here.</p></div>
        <div id="tab-5"><p>Equipment content goes here.</p></div>
    </div>
</body>
</html>
}]