[h: doc="Type{effect, expected healing rate, medical treatment check}"]
[h: data = json.set("{}",
    "Broken Arm", json.append("[]", "-2 Melee, -2 Ranged", "2 weeks", 8),
    "Broken Leg", json.append("[]", "-2 Movement, -4 Dodging", "3 weeks", 8),
    "Concussion", json.append("[]", "-2 Intelligence, -2 Dexterity", "1 week", 6),
    "Fractured Ribs", json.append("[]", "-1 Endurance, -1 Melee", "2 weeks", 7),
    "Sprained Ankle", json.append("[]", "-1 Movement, -1 Dodging", "1 week", 5)
)]
[h: macro.return = data]


