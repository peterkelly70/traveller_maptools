[h: callerID = json.get(macro.args, 0)]
[h: effect = json.get(macro.args, 1)]

[h: effect = max(-6, min(effect, 3))]  <!-- Ensures the value is between -6 and 3 -->

[h: stealthAura = ""]
[h, if(effect == -6): stealthAura = "Aura Stealth -6"]
[h, if(effect == -5): stealthAura = "Aura Stealth -5"]
[h, if(effect == -4): stealthAura = "Aura Stealth -4"]
[h, if(effect == -3): stealthAura = "Aura Stealth -3"]
[h, if(effect == -2): stealthAura = "Aura Stealth -2"]
[h, if(effect == -1): stealthAura = "Aura Stealth -1"]
[h, if(effect == 0): stealthAura = "Aura Stealth 0"]
[h, if(effect == 1): stealthAura = "Aura Stealth 1"]
[h, if(effect == 2): stealthAura = "Aura Stealth 2"]
[h, if(effect == 3): stealthAura = "Aura Stealth 3"]

<!-- Function to remove all auras -->
[h: allStealthAuras = "Aura Stealth -6,Aura Stealth -5,Aura Stealth -4,Aura Stealth -3,Aura Stealth -2,Aura Stealth -1,Aura Stealth 0,Aura Stealth 1,Aura Stealth 2,Aura Stealth 3"]

[h, foreach(aura, allStealthAuras, ""), code: {
    [h: setLight("Stealth", aura, 0, callerID)]
}]

<!-- Add the new stealth aura -->
[h: setLight("Stealth", stealthAura, 1, callerID)]

