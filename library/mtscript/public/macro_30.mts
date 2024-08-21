[h: callerID = json.get(macro.args, 0)]
[h: weaponName = json.get(macro.args, 1)]
[h: damage = json.get(macro.args, 2)]
[h: rof = json.get(macro.args, 3)]
[h: special = json.get(macro.args, 4)]

[h: statModArgs = json.append("[]", 7)]
[macro("getModifier@lib:Traveller"): statModArgs]
[h: statDM = macro.return]

[h: result = ""]

[h: isDiceExpression = matches(damage, "\\d+d\\d+")]

[h: rollResult = 0]
[h: result = weaponName + ": "]
[h: DiceTimes = strfind(damage, "(\\d+)D\\d+")]
[t: diceRoll=eval(damage)]
[h: result = if(isNumber(DiceTimes), weaponName + ": " + diceRoll + "  (" + special + ")", weaponName + ": Invalid Damage Expression")]
[h: args = json.append("[]", callerID,result)]
[macro("say@lib:Traveller"):args]

