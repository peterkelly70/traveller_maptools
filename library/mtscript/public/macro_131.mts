[h: debug("applyHealing Started")]
[h: callerID = arg(0)]
[h: returnCall = arg(1)]
[h: tabName = arg(2)]
[h: targetID = arg(3)]
[h: healingAmount = arg(4)]
[h: inputResult = 1]

[h: isPC = isPC(targetID)]

[h, if (!isPC), code: {
    [h: debug("NPC")]
    [h: curHits = getProperty("Hits", targetID)]
    [h: maxHits = getProperty("MaxHits", targetID)]
    [h: newHits = min(curHits + healingAmount, maxHits)]
    [h: setProperty("Hits",newHits,targetID)]
    [h: debug("New Hits (NPC): " + newHits)]
    [h:setBar("HITS",curHits/maxHits, targetID)]
};{
    [h: debug("PC")]
    [h: curEnd = getStat(targetID,"Endurance","cur")]
    [h: curStr = getStat(targetID,"Strength","cur")]
    [h: curDex = getStat(targetID,"Dexterity","cur")]

    [h: maxEnd = getStat(targetID,"Endurance","max")]
    [h: maxStr = getStat(targetID,"Strength","max")]
    [h: maxDex = getStat(targetID,"Dexterity","max")]

    [h: inputResult = input(
        "Label|Distribute Healing ("+healingAmount+" points)|LABEL",
        "endHeal|0|END Healing("+curEnd+" / "+maxEnd+")|TEXT|"+healingAmount,
        "strHeal|0|STR Healing("+curStr+" / "+maxStr+")|TEXT|"+healingAmount,
        "dexHeal|0|DEX Healing("+curDex+" / "+maxDex+")|TEXT|"+healingAmount
    )]
    [h: abort(inputResult)]

    [h: endHeal = number(endHeal)]
    [h: strHeal = number(strHeal)]
    [h: dexHeal = number(dexHeal)]

    [h: curEnd = min(curEnd + endHeal, maxEnd)]
    [h: curStr = min(curStr + strHeal, maxStr)]
    [h: curDex = min(curDex + dexHeal, maxDex)]

    [h: setStat(targetID,"Endurance",curEnd,"cur")]
    [h: setStat(targetID,"Strength",curStr,"cur")]
    [h: setStat(targetID,"Dexterity",curDex,"cur")]

    <!-- Set Bars -->
    [h:setBar("END",  curEnd/maxEnd, targetID)]
    [h:setBar("STR",  curStr/maxStr, targetID)]
    [h:setBar("DEX",  curDex/maxDex, targetID)]

    [h: debug("Applied END Healing: " + endHeal + "<br>STR Healing: " + strHeal + "<br>DEX Healing: " + dexHeal)]
    [h: debug("Current END: " + curEnd + "<br>Current STR: " + curStr + "<br>Current DEX: " + curDex)]
}]

[h: debug("applyHealing Stopped")]
[r:say(callerID, "Healing applied to " + getName(targetID))]

[h, if(tabName != "None"), code: {
    [h: args = json.append("[]", callerID, tabName)]
    [macro(returnCall + "@lib:Traveller"): args]
};{
    [macro.return = inputResult]
}]
