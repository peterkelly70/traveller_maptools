[h: doc="Type:level"]
 <!-- wind: 0 none, 1 Light, 2 Stiff, 3 high, 4 cyclonic -->
 <!-- terrain: 0 clear, 1 difficult, 2 dangerous, 3 slippery --> 
 <!-- fog: 0 none, 1 light, 2 heavy, 3 impenetrable -->
 <!-- rain: 0 None, 1 Light, 2 Heavy, 3 Torrential -->
 <!-- gravity: 0 zero g, 1 Light, 2 Normal, 3 high -->
 <!-- atmosphere: 0 None, 1 Sparse, 2 Normal, 3 Toxic -->
 <!-- temperature: 0 Very Cold, 1 Cold, 2 Normal, 3 Warm, 4 very Warm -->

[h: effectData = json.set("{}",
    "Wind", 0,
    "Terrain", 0, 
    "Fog", 0, 
    "Rain", 0, 
    "Gravity", 0, 
    "Atmosphere", 0, 
    "Temperature", 0 
)]
[h: macro.return = effectData]
