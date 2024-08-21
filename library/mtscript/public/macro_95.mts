[h: debug("applyDamage Started")]
[h: callerID = arg(0)]
[h: returnCall = arg(1)]
[h: tabName = arg(2)]
[h: targetID = arg(3)]
[h: damage = arg(4)]
[h: damageType = arg(5)]
[h: defences = getProperty("Defences", targetID)]
[h: damList = "Kinetic,Energy,Radiation,Explosive,Stun,Corrosive,Cold,Heat"]
[h: debug("<pre> Args " + json.indent(macro.args) + "</pre>")]
[h: debug("<pre> Target Def " + json.indent(defences) + "</pre>")]
[h: debug("damageType >>> " + damageType)]
[h: inputResult=1]

[h: totalKD = 0]
[h: totalED = 0]
[h: totalRad = 0]
[h: totalExp = 0]
[h: totalStun = 0]
[h: totalCor = 0]
[h: totalCold = 0]
[h: totalHeat  = 0]


<!-- Check if damageType is "NA" and damage is 0 -->
[h, if(damageType == "NA" && damage == 0), code: {
    [h: debug("User Input")]
    [inputResult = input(
        "newDamageType|"+damList+"|Select Damage Type|LIST",
        "newDamage|1|Enter Damage Amount|TEXT"
    )]
    [h: abort(inputResult)]  <!-- Abort if user cancels input -->

    <!-- Update damageType and damage with user inputs -->
    [h: damageType = listGet(damList, newDamageType)]
    [h: damage = newDamage]
    [h: debug("User-selected Damage Type: " + damageType + "<br>Damage: " + damage)]
}]


[h: debug("<pre>Armor: "+defences+"</pre>")]
[h: armorJ = getProperty("Armor", targetID)]
<!-- Loop through defences to calculate total defence values -->
[h, foreach(def, defences), code: {
    [h: armorInfo = json.get(armorJ, def)]
    [h, if (!json.isEmpty(armorInfo)), code: {
        [h: totalKD = totalKD + number(json.get(armorInfo, 1))]
        [h: totalED = totalED + json.get(armorInfo, 2)]
        [h: totalRad = totalRad + json.get(armorInfo, 3)]
        [h: totalExp = totalExp + json.get(armorInfo, 4)]
        [h: totalStun = totalStun + json.get(armorInfo, 5)]
        [h: totalCor = totalCor + json.get(armorInfo, 6)]
        [h: totalCold = totalCold + json.get(armorInfo, 7)]
        [h: totalHeat = totalHeat + json.get(armorInfo, 8)]
    }]
}]

[h: debug("Total KD: " + totalKD + "<br>Total ED: " + totalED + "<br>Total Rad: " + totalRad + "<br>Total Exp: " + totalExp + "<br>Total Stun: " + totalStun + "<br>Total Cor: " + totalCor + "<br>Total Cold: " + totalCold + "<br>Total Heat: " + totalHeat + "<br>")]
[h: debug("Damage: " + damage)]

<!-- Apply defences against incoming damage using a switch statement -->
[h: reducedDamage = damage]
[h, switch(damageType), code:
    case "Kinetic": {
        [h: reducedDamage = max(reducedDamage - totalKD, 0)]
        [h: debug("<pre>Kinetic Damage reduced to: " + reducedDamage + " </pre>")]
    };
    case "Energy": {
        [h: reducedDamage = max(reducedDamage - totalED, 0)]
        [h: debug("<pre>Energy Damage reduced to: " + reducedDamage + " </pre>")]
    };
    case "Radiation": {
        [h: reducedDamage = max(reducedDamage - totalRad, 0)]
        [h: debug("<pre>Radiation Damage reduced to: " + reducedDamage + " </pre>")]
    };
    case "Explosive": {
        [h: reducedDamage = max(reducedDamage - totalExp, 0)]
        [h: debug("<pre>Explosive Damage reduced to: " + reducedDamage + " </pre>")]
    };
    case "Stun": {
        [h: reducedDamage = max(reducedDamage - totalStun, 0)]
        [h: debug("<pre>Stun Damage reduced to: " + reducedDamage + " </pre>")]
    };
    case "Corrosive": {
        [h: reducedDamage = max(reducedDamage - totalCor, 0)]
        [h: debug("<pre>Corrosive Damage reduced to: " + reducedDamage + " </pre>")]
    };
    case "Cold": {
        [h: reducedDamage = max(reducedDamage - totalCold, 0)]
        [h: debug("<pre>Cold Damage reduced to: " + reducedDamage + " </pre>")]
    };
    case "Heat": {
        [h: reducedDamage = max(reducedDamage - totalHeat, 0)]
        [h: debug("<pre>Heat Damage reduced to: " + reducedDamage + " </pre>")]
    };
    default: {
        [h: debug("<pre>No defence against Damage.</pre>")]
    }
]

[h: debug("Reduced Damage: " + reducedDamage)]

[h: isPC = isPC(targetID)]

[h, if(reducedDamage<1 && isPC), code: {
    [r:debug("No Damage")]
	[r:popup(callerID,"No Damage")]
	[h: abort(0)]
}]

<!-- Apply damage based on whether the target is a PC or NPC -->


[h, if (!isPC), code: {
    <!-- NPC Logic: Apply damage to Hits and adjust Attack Modifiers if Hits < 25% -->
    [h: debug("NPC")]
    [h: curHits = number(getProperty("Hits", targetID))]
    [h: debug("Hits:"+curHits)]
    [h: mxHits = number(getProperty("MaxHits", targetID))]
    [h: debug("Max Hits:"+mxHits)]
    [h: newHits = max((curHits - reducedDamage), 0)]
    [h: debug("New Hits:"+newHits)]
    [h, if (damageType == "Stun"), code: {
       [h: setStatus(callerID,returnCall,"None",targetID,"Stunned", reducedDamage)]
    };{
         [h: setProperty("Hits", newHits,targetID)]
    }]
    [h: curHits=newHits]
    [h: setBar("HITS", curHits/mxHits,targetID)]
    <!-- Check for Injury -->
    [h, if (curHits < (mxHits / 2)), code: {
        [h: debug(getName(targetID)+" is injured")]
        [h: setStatus(callerID,returnCall,"None",targetID,"Injured", 1)]
    }]
    <!-- Check for death -->
    [h, if(curHits == 0), code: {
        [h: setStatus(callerID,returnCall,"None",targetID,"Unconscious", 0)]
        [h: setStatus(callerID,returnCall,"None",targetID,"Dead", 1)]
        [h: debug("Target is Dead.")]
    }]
    [h: debug("New Hits (NPC): " + newHits)]
};{
    [h: debug("PC")]
    <!-- Get Stats -->
    [h: curEnd = getStat(targetID,"Endurance","cur")]
    [h: curStr = getStat(targetID,"Strength","cur")]
    [h: curDex = getStat(targetID,"Dexterity","cur")]
    [h: maxEnd = getStat(targetID,"Endurance","max")]
    [h: maxStr = getStat(targetID,"Strength","max")]
    [h: maxDex = getStat(targetID,"Dexterity","max")]
    [h, if (damageType == "Stun"), code: {
       [h: setStatus(callerID,returnCall,"None",targetID,"Stunned", reducedDamage)]
    };{
       [h: inputResult = input(
        "Label|Apply Damage|"+reducedDamage+"|LABEL",
        "endDam|0|END Damage("+curEnd+")|TEXT|"+reducedDamage,
        "strDam|0|STR Damage("+curStr+")|TEXT|"+reducedDamage,
        "dexDam|0|DEX Damage("+curDex+")|TEXT|"+reducedDamage
       )]
       <!-- Check if the input was cancelled -->
       [h: abort(inputResult)]

       <!-- Use the selected values -->
       [h: endDamage = number(endDam)]
       [h: strDamage = number(strDam)]
       [h: dexDamage = number(dexDam)]

       <!-- Apply the damage to stats stored in JSON -->
       [h: curEnd = max(curEnd - endDamage, 0)]
       [h: curStr = max(curStr - strDamage, 0)]
       [h: curDex = max(curDex - dexDamage, 0)]

       [h: setStat(targetID,"Endurance",curEnd,"cur")]
       [h: setStat(targetID,"Strength",curStr,"cur")]
       [h: setStat(targetID,"Dexterity",curDex,"cur")]

       <!-- Set Bars -->
       [h:setBar("END",  curEnd/maxEnd, targetID)]
       [h:setBar("STR",  curStr/maxStr, targetID)]
       [h:setBar("DEX",  curDex/maxDex, targetID)]
       
       [h: debug("Applied END Damage: " + endDamage + "<br>STR Damage: " + strDamage + "<br>DEX Damage: " + dexDamage)]
       [h: debug("Current END: " + curEnd + "<br>Current STR: " + curStr + "<br>Current DEX: " + curDex)]
    }]


    <!-- Check for unconsciousness -->
    [h, if(curEnd == 0 && (curStr == 0 || curDex == 0)), code: {
        [h: setStatus(callerID,returnCall,"None",targetID,"Unconscious", 1)]
        [h: debug("Target is Unconsious.")]
    }]

    <!-- Check for death -->
    [h, if(curEnd == 0 && curStr == 0 && curDex == 0), code: {
        [h: setStatus(callerID,returnCall,"None",targetID,"Unconscious", 0)]
        [h: setStatus(callerID,returnCall,"None",targetID,"Dead", 1)]
        [h: debug("Target is Dead.")]
    }]
}]

[h: debug("applyDamage Stopped")]
[r:say(callerID, reducedDamage+" Damage applied to " + getName(targetID))]
<!-- Refresh the calling page -->
[h, if(tabName != "None"), code: {
    [h: args = json.append("[]", callerID, tabName)]
    [macro(returnCall + "@lib:Traveller"): args]
};{
    [macro.return = inputResult]
}]
