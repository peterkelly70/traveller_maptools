[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: tabReturn = json.get(macro.args, 2)]

[h: charTitle = string(getProperty("Title",callerID))]
[h: charName = string(getProperty("Name",callerID))]
[h: charAge = string(getProperty("Age",callerID))]
[h: charSex = string(getProperty("Sex",callerID))]
[h: charHomeWorld = string(getProperty("Home World",callerID))]
[h: charSpecies = string(getProperty("Species",callerID))]

[h: input = input(
    "newName|" + charName + "|Name|text",
    "newTitle|" + charTitle + "|Title|text",
    "newAge|" + charAge + "|Age|text",
    "newSex|" + charSex + "|Sex|text",
    "newHomeWorld|" + charHomeWorld + "|Homeworld|text",
    "newSpecies|" + charSpecies + "|Species|text"
)]

[h, if (input), code: {
	[h: setProperty("Name",newName,callerID)]
	[h: setProperty("Title",newTitle,callerID)]
    [h: setProperty("Age",newAge,callerID)]
    [h: setProperty("Sex",newSex,callerID)]
    [h: setProperty("Home World",newHomeWorld,callerID)]
    [h: setProperty("Species",newSpecies),callerID)]
}]

[h: args = json.append("[]",callerID,tabReturn)]
[h, macro(returnCall + "@lib:Traveller"): args]