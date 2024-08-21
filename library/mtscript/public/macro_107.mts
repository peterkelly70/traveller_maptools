[h: debug("Combat Macro Started")]

[h: callerID = json.get(macro.args, 0)]
[h: returnCall = "AdminSheet"]
[h: tabName = "Combat"]
[h: debug("<pre>callerID --> " + callerID + "</pre>")]
[h: debug("<pre>returnCall --> " + returnCall + "</pre>")]
[h: debug("<pre>tabName --> " + tabName + "</pre>")]

[h: htmlContent = "<div class=section><div class=heading><h3>Combat</h3></div><table>"]
[h: row_class = "black"]

[h: debug("Fetching list of NPCs")]
[h: npcList = getTokens("json", "{ 'type':'PC,NPC','status':'' }")]
[h: debug("npcList fetched, count: " + listCount(npcList))]

[h: htmlContent = htmlContent + "<tr><th>Select</th><th>Icon</th><th>Name</th><th>UPP</th><th>Hits</th><th>Actions</th></tr>"]

[h: debug("Processing each NPC in the list")]
[h, foreach(npc, npcList), code: {
    [h: npcID = json.get(npc, "id")]
    [h: npcName = getName(npcID)]
    [h: npcIcon = getTokenImage(npcID, 30)]
    [h: npcUPP = getProperty("UPP", npcID)]
    [h: npcHits = json.get(getProperty("Hits", npcID), "cur") + "/" + json.get(getProperty("Hits", npcID), "max")]
    [h: debug("Processing NPC --> " + npcName + " (ID: " + npcID + ")")]
    [h: debug("npcIcon --> " + npcIcon + ", npcUPP --> " + npcUPP + ", npcHits --> " + npcHits)]

    [h: isSelected = getLibProperty("selected_" + npcID, "lib:Traveller")]
    [h: debug("isSelected --> " + isSelected)]

    [h: selectionLink = if(isSelected == 1, 
        makeLink(callerID, returnCall, "Deselect", "toggleSelection@lib:Traveller", json.append("[]", tabName, npcID), "minus", 32), 
        makeLink(callerID, returnCall, "Select", "toggleSelection@lib:Traveller", json.append("[]", tabName, npcID), "plus", 32))]
    [h: debug("selectionLink created")]

    [h: rowContent = "<tr class='"+row_class+"'>"]
    [h: rowContent = rowContent + "<td>" + selectionLink + "</td>"]
    [h: rowContent = rowContent + "<td><img src='"+npcIcon+"'></td>"]
    [h: rowContent = rowContent + "<td>" + npcName + "</td>"]
    [h: rowContent = rowContent + "<td>" + npcUPP + "</td>"]
    [h: rowContent = rowContent + "<td>" + npcHits + "</td>"]

    [h: rollAttackLink = makeLink(callerID, returnCall, "Roll Attack", "rollAttack@lib:Traveller", json.append("[]", tabName, npcID), "roll", 32)]
    [h: dodgeLink = makeLink(callerID, returnCall, "Dodge", "rollDodge@lib:Traveller", json.append("[]", tabName, npcID), "dodge", 32)]
    [h: parryLink = makeLink(callerID, returnCall, "Parry", "rollParry@lib:Traveller", json.append("[]", tabName, npcID), "parry", 32)]
    [h: takeCoverLink = makeLink(callerID, returnCall, "Take Cover", "takeCoverReaction@lib:Traveller", json.append("[]", tabName, npcID), "cover", 32)]
    [h: debug("Action links created: rollAttackLink, dodgeLink, parryLink, takeCoverLink")]

    [h: actionLinks = rollAttackLink + dodgeLink + parryLink + takeCoverLink]

    [h: rowContent = rowContent + "<td>" + actionLinks + "</td>"]
    [h: rowContent = rowContent + "</tr>"]

    [h: htmlContent = htmlContent + rowContent]
    [h: row_class = if(row_class == "black", "grey", "black")]
    [h: debug("Row for NPC " + npcName + " added to htmlContent")]
}]

[h: htmlContent = htmlContent + "</table></div>"]

[h: debug("Finalizing HTML content")]
[h: htmlContent = htmlContent + "<div class='section'><div class='heading'><h3>Summary</h3></div><p>Additional controls or information can be added here.</p></div>"]

[h: debug("Returning HTML content from Combat Macro")]
[h: macro.return = htmlContent]
