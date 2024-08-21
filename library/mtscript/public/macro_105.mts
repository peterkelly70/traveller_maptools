[h: doc="Type:level"]
<!-- Injured: 0 no, 1 yes -->
<!-- Unconscious: Rounds effect lasts -->
<!-- Stunned: Rounds effect lasts -->
<!-- Panicked: yes/no -->
<!-- Exhausted: 0 Rested, 1 Tired, 2 Exhausted -->
<!-- Blinded: Rounds effect lasts -->
<!-- Deafened: Rounds effect lasts -->
<!-- Poisoned: Rounds effect lasts -->
<!-- Infected: yes/no -->
<!-- Bleeding: Rounds effect lasts -->
<!-- Fatigued: Rounds effect lasts -->
<!-- Suffocating: Rounds effect lasts -->
<!-- RadiationExposure: Rounds effect lasts -->
<!-- ZeroGSickness: Rounds effect lasts -->
<!-- Frozen: Rounds effect lasts -->
<!-- Heatstroke: Rounds effect lasts -->
<!-- Drugged: yes/no -->
<!-- Dead: Permanent -->
<!-- Hidden: 0 no, 1 yes -->
<!-- Incapacitated: 0 no, 1 yes -->
<!-- Prone: 0 no, 1 yes -->
<!-- Hot: 0 None, 1 Warm, 2 Hot, 3 Very Hot -->
<!-- Cold: 0 None, 1 Chilly, 2 Cold, 3 Freezing -->

[h: effectData = json.set("{}",
    "Dead", 0,
    "Injured", 0,
    "Bleeding", 0,
    "Unconscious", 0,
    "Incapacitated", 0,
    "Stunned", 0,
    "Panicked", 0,
    "Blinded", 0,
    "Deafened", 0,
    "Drugged", 0,
    "Poisoned", 0,
    "Infected", 0,
    "Fatigued", 0,
    "Hot", 0,
    "Cold", 0,
    "Suffocating", 0,
    "Radiated", 0,
    "Sickness", 0,
    "Hidden", 0,
    "Prone", 0
)]
[h: macro.return = effectData]
