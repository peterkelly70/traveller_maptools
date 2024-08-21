[h: mapID = getCurrentMapID()]  
[h: mapName = getMapName(mapID)]
[h: debug("Map Changed: " + mapName)]

<!-- Ensure that the lib:Traveller token is accessible -->
[h: libToken = findToken("lib:Traveller")]
[if(libToken != ""), code: {
    [r: execMacro("Admin@lib:Traveller")]
};{
    [debug("lib:Traveller token not found. Ensure it is correctly set up.")]
}]
