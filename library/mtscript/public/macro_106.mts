[h: doc="Type:Infection Details with Recovery"]
<!-- Bacterial Infection: Infectious Level, Progression Rate, Effect/Progression Rate, Description of Symptoms, Minimum Duration, End Check, Recovery Rate, Medical Requirement -->
<!-- Viral Infection: Infectious Level, Progression Rate, Effect/Progression Rate, Description of Symptoms, Minimum Duration, End Check, Recovery Rate, Medical Requirement -->
<!-- Fungal Infection: Infectious Level, Progression Rate, Effect/Progression Rate, Description of Symptoms, Minimum Duration, End Check, Recovery Rate, Medical Requirement -->
<!-- Parasitic Infection: Infectious Level, Progression Rate, Effect/Progression Rate, Description of Symptoms, Minimum Duration, End Check, Recovery Rate, Medical Requirement -->
<!-- Septicemia: Infectious Level, Progression Rate, Effect/Progression Rate, Description of Symptoms, Minimum Duration, End Check, Recovery Rate, Medical Requirement -->
<!-- Rabies: Infectious Level, Progression Rate, Effect/Progression Rate, Description of Symptoms, Minimum Duration, End Check, Recovery Rate, Medical Requirement -->
<!-- Necrotizing Fasciitis: Infectious Level, Progression Rate, Effect/Progression Rate, Description of Symptoms, Minimum Duration, End Check, Recovery Rate, Medical Requirement -->
<!-- Space Plague: Infectious Level, Progression Rate, Effect/Progression Rate, Description of Symptoms, Minimum Duration, End Check, Recovery Rate, Medical Requirement -->
<!-- Alien Parasite: Infectious Level, Progression Rate, Effect/Progression Rate, Description of Symptoms, Minimum Duration, End Check, Recovery Rate, Medical Requirement -->
<!-- Radiation Sickness: Infectious Level, Progression Rate, Effect/Progression Rate, Description of Symptoms, Minimum Duration, End Check, Recovery Rate, Medical Requirement -->
<!-- Biohazard Exposure: Infectious Level, Progression Rate, Effect/Progression Rate, Description of Symptoms, Minimum Duration, End Check, Recovery Rate, Medical Requirement -->

[h: infectionData = json.set("{}",
    "Bacterial Infection", json.append("[]", 1, "daily", "-1 Endurance, -1 Strength", "Fever, fatigue, muscle aches", "7 days", "END check 8+", "moderate", "Requires Antibiotics"),
    "Viral Infection", json.append("[]", 1, "daily", "-1 Dexterity, -1 Intelligence", "Cough, headaches, possible fever", "10 days", "END check 6+", "slow", "Rest and fluids"),
    "Fungal Infection", json.append("[]", 1, "weekly", "-1 Endurance", "Skin irritation, respiratory issues", "2 weeks", "END check 10+", "very slow", "Requires Antifungal Treatment"),
    "Parasitic Infection", json.append("[]", 2, "daily", "-2 Endurance, Ongoing Damage", "Severe pain, fatigue, potential organ failure", "Until treated", "NA", "none", "Requires Antiparasitic Treatment"),
    "Septicemia", json.append("[]", 3, "hourly", "-2 Endurance, -2 Strength", "High fever, chills, rapid heartbeat, severe pain", "72 hours", "END check 12+", "rapid with treatment", "Requires Immediate Medical Attention"),
    "Rabies", json.append("[]", 3, "daily", "-2 Dexterity, -2 Intelligence, Fatal if Untreated", "Aggressive behavior, hydrophobia, convulsions", "10 days", "NA", "fatal without treatment", "Requires Immediate Vaccination"),
    "Necrotizing Fasciitis", json.append("[]", 4, "hourly", "-4 Endurance, Rapid Tissue Damage", "Severe pain, rapidly spreading infection, tissue death", "24 hours", "NA", "requires surgical intervention", "Requires Emergency Surgery"),
    "Space Plague", json.append("[]", 5, "daily", "-3 Intelligence, -3 Strength", "Hallucinations, severe weakness, highly contagious", "Until treated", "NA", "none", "Requires Quarantine and Treatment"),
    "Alien Parasite", json.append("[]", 4, "daily", "-3 Endurance, Risk of Mutation", "Extreme fatigue, strange growths, potential mutation", "Until extracted", "NA", "none", "Requires Parasite Extraction"),
    "Radiation Sickness", json.append("[]", 0, "weekly", "-2 Endurance, -2 Strength", "Nausea, vomiting, fatigue, long-term health issues", "6 weeks", "END check 8+", "very slow", "Requires Radiation Treatment"),
    "Biohazard Exposure", json.append("[]", 3, "daily", "-3 Endurance, -2 Dexterity, Quarantine Required", "Severe weakness, coughing, high fever, highly dangerous", "14 days", "END check 10+", "moderate", "Requires Isolation and Treatment")
)]
[h: macro.return = infectionData]
