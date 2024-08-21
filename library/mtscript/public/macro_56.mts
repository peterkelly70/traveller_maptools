[h: defdata = json.set("{}",
    "weaponsList", json.append("[]", "TL", "Range", "Damage", "Weight", "Cost", "Mag_Size", "Mag_Cost", "Traits"),
    "armorList", json.append("[]", "TL", "Kinetic", "Energy", "Rad", "Exp", "CR", "Cold", "Heat", "Skill", "Description", "Weight", "Cost"),
    "augmentsList", json.append("[]", "Improvement", "TL", "Cost"),
    "equipmentList", json.append("[]", "TL", "Weight", "Cost", "Description", "Traits"),
    "skillList", json.append("[]", "Level"),
    "Weapons", json.append("[]", "TL", "Range", "Damage", "Weight", "Cost", "Mag_Size", "Mag_Cost", "Traits"),
    "weaponTypes", json.append("[]","Melee", "Slug", "Beam", "Grenade", "Heavy"),
    "damageTypes", json.append("[]","Kinetic", "Energy", "Radiation", "Explosive", "Stun", "Corrosive", "Cold", "Heat"),
    "Armor", json.append("[]", "TL", "Kinetic", "Energy", "Rad", "Exp", "CR", "Cold", "Heat", "Skill", "Description", "Weight", "Cost"),
    "suppliesList", json.append("[]", "TL", "Weight", "Cost", "Amount", "Effect"),
    "Augmentations", json.append("[]", "Improvement", "TL", "Cost"),
    "Supplies", json.append("[]", "itemCount", "itemCapacity", "itemType"),
    "Equipment", json.append("[]", "TL", "Weight", "Cost", "Description", "Traits"),
    "GlobalEffects", json.append("[]", "Wind", "Terrain", "Fog", "Rain", "Gravity", "Atmosphere", "Temperature"),
    "Status", json.append("[]", "Dead","Injured","Bleeding","Unconscious","Incapacitated","Stunned","Panicked","Blinded","Deafened","Drugged","Poisoned","Infected","Fatigued","Hot","Cold","Suffocating","Radiated","Sickness","Hidden","Prone"),
    "injuryList", json.append("[]","Injury"),
    "infectionList", json.append("[]","Infection"),
    "drugList", json.append("[]","Drug"),
    "progression", json.append("[]","round","hour","day","week","month"),
    "difficultyList", json.append("[]","Simple","Easy","Routine","Average","Difficult","Very Difficult","Formidable"),
    "Careers", json.append("[]", "Career", "Assignment", "Rank", "Description", "Rewards"),
    "Skills", json.append("[]", "Level"),
    "UPD", json.append("[]", "Title", "Age", "Species", "HomeWorld", "Traits"),
    "Injuries", json.append("[]", "injuryList"),
    "Infections", json.append("[]", "infectionList"),
    "Drugs", json.append("[]", "drugList"),
    "Statuses",json.append("[]", "Injured", "Unconscious", "Stunned", "Panicked", "Blinded", "Deafened", "Poisoned", "Infected", "Bleeding", "Fatigued", "Suffocating", "Radiated", "Sick","Drugged"),
    "InitiativeModifiers", json.append("[]", "baseInit", "curInit", "dexMod", "surpriseMod", "awarenessMod", "environmentMod", "equipmentMod", "encumbranceMod", "fatigueMod", "miscMod", "recoilMods", "reactionMods"),
    "AttackModifiers", json.append("[]", "skillMod", "statMod", "surpriseMod", "awarenessMod", "environmentMod", "equipmentMod", "encumbranceMod", "fatigueMod", "injuredMod"),
    "LastAttack", json.append("[]", "coverMod", "aimingMod", "autoMode", "useScope", "miscMod"),
    "Attacks", json.append("[]", "Skill", "Stat"),
    "currentAttack", json.append("[]", "Name"),
    "InitModifiers", json.append("[]", "dexMod", "surpriseMod", "awarenessMod", "environmentMod", "equipmentMod", "encumbranceMod", "fatigueMod", "injuredMod"),
    "Combat", json.append("[]", "Dodge", "Reactions", "DiveForCover", "Distance")
)]

[h: macro.return = defdata]
