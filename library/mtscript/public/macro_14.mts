[h: keys= "<!-- Type{Improvement,TL,Cost} -->"]
[h: jsondata = json.set("{}",
  "Bionic Eyes", json.append("[]", "Binoc/Low Light", 13, 25000),
  "Cognitive 1", json.append("[]", "INT +1", 12, 500000),
  "Cognitive 2", json.append("[]", "INT +2", 14, 1000000),
  "Cognitive 3", json.append("[]", "INT +3", 16, 5000000),
  "Dexterity 1", json.append("[]", "DEX +1", 11, 50000),
  "Dexterity 2", json.append("[]", "DEX +2", 12, 100000),
  "Dexterity 3", json.append("[]", "DEX +3", 15, 500000),
  "Endurance 1", json.append("[]", "END +1", 11, 50000),
  "Endurance 2", json.append("[]", "END +2", 12, 100000),
  "Endurance 3", json.append("[]", "END +3", 15, 500000),
  "Neural Comm 1", json.append("[]", "Audio", 10, 1000),
  "Neural Comm 2", json.append("[]", "AV/Computer/0", 12, 15000),
  "Neural Comm 3", json.append("[]", "AV/Computer/1", 14, 20000),
  "Skill 1", json.append("[]", "Skill +1", 12, 50000),
  "Skill 2", json.append("[]", "Skill +2", 13, 100000),
  "Strength 1", json.append("[]", "STR +1", 10, 500000),
  "Strength 2", json.append("[]", "STR +2", 12, 1000000),
  "Strength 3", json.append("[]", "STR +3", 15, 5000000),
  "Subdermal Armour 1", json.append("[]", "Protection +1", 10, 50000),
  "Subdermal Armour 3", json.append("[]", "Protection +3", 11, 100000),
  "Wafer Jack 4", json.append("[]", "Capacity Bandwidth/4", 12, 10000),
  "Wafer Jack 8", json.append("[]", "Capacity Bandwidth/8", 13, 15000)
)]

[h: macro.return = jsondata]