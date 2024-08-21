[h: keys="<!--Name, TL, KG,Description,Cost -->"]
[h: keys="Name{TL-0,weight-1,cost-2,description-3,traits-4}"]
[h: jsondata = json.set("{}",
  "Medikit",json.append("[]",7,2,25000,"Medpack fro healing","Heal 2 points Stat Damage"),
  "Stim",json.append("[]",9,0.1,5000,"Combat Drugs","Add 1 point End/Str/DEX 10 Minutes")
)]

[h: macro.return = jsondata]