[h: doc="Type{effect, duration, progression rate}"]
[h: data = json.set("{}",
    "Combat Drugs", json.append("[]", "-2 Melee, -2 Ranged", "4 hours", "per use"),
    "Alcohol", json.append("[]", "-2 Movement, -4 Dodging", "6 hours", "per drink"),
    "Quick", json.append("[]", "-2 Intelligence, -4 Dexterity", "24 hours", "Immediate"),
    "Slow", json.append("[]", "-1 Endurance, -1 Melee", "24 hours", "Immediate"),
    "BMP", json.append("[]", "-1 Movement, -1 Dodging", "4 hours", "per use"),
    "Neurotoxin", json.append("[]", "-1 Intelligence, -1 Dexterity", "10 Minutes", "round"),
    "Venom", json.append("[]", "-3 Endurance, -2 Strength", "6 hours", "hour"),
    "Cyanide", json.append("[]", "-6 Endurance, -6 Strength", "Immediate", "one-time"),
    "Arsenic", json.append("[]", "-2 Endurance, -2 Strength", "24 hours", "hour")
)]
[h: macro.return = data]



