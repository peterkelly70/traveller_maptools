[h: statsL = getLibProperty("statsList","lib:Traveller")]
[h: callerID=arg(0)]



[h: endCur = json.get(getProperty("Endurance"), "cur")]
[h: endMax = json.get(getProperty("Endurance"), "max")]
[h: strCur = json.get(getProperty("Strength"), "cur")]
[h: strMax = json.get(getProperty("Strength"), "max")]
[h: dexCur = json.get(getProperty("Dexterity"), "cur")]
[h: dexMax = json.get(getProperty("Dexterity"), "max")]

[h: currentHP = endCur + strCur + dexCur]
[h: maxHP = endMax + strMax + dexMax]

[h: healthPercent = (currentHP / maxHP) * 100]

[h: haloColor = ""]

[h, if(healthPercent > 75), code: {
  [haloColor = "00FF00"]  <!-- Green -->
};{
  [h, if(healthPercent > 50), code: {
    [haloColor = "FFFF00"]  <!-- Yellow -->
  };{
    [h, if(healthPercent > 25), code: {
      [haloColor = "FFA500"]  <!-- Orange -->
    };{
      [haloColor = "FF0000"]  <!-- Red -->
    }]
  }]
}]

[h: setHalo(haloColor.callerID)]