[h: callerID = json.get(macro.args, 0)]

<!-- List of stats corresponding to the UPP -->
[h: statsList = "Strength,Dexterity,Endurance,Intelligence,Education,Social"]

<!-- Initialize the UPP string -->
[h: UPP = ""]

<!-- Loop through each stat, get its value, convert to hexadecimal, and append to UPP -->
[h, foreach(stat, statsList), code: {
    [h: statValue = getProperty(stat, callerID)]
    
    <!-- Ensure the stat value is numeric before converting to hexadecimal -->
    [h: hexValue = if(isNumber(statValue), decimalToHex(statValue), "0")]
    
    <!-- Append the hex value to the UPP string -->
    [h: UPP = UPP + hexValue]
}]

<!-- Return the final UPP string -->
[h: macro.return = UPP]