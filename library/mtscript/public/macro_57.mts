[h: callerID="B31CE5ED488E4CB79DA0781DF31950AD"]
[h: returnCall = "AdminSheet"]
[h: dataName = "armorList"]
[h: itemName = "Mesh"]
[h: args = json.append("[]", callerID,returnCall,"admin_test",dataName,itemName)]
[macro("jsonView@Lib:Traveller"): args]
[h: view=macro.return]
[dialog(itemName): {
[r: view]
}]

