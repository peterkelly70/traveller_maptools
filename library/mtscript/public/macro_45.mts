[h: debug("getStatDM Stopped")]
[h: value = number(json.get(macro.args, 0)) ]
[h: mod = floor((value - 7) / 2)]  <!-- Traveller characteristic modifier formula -->
[h: debug("ModVal = "+mod)]
[h: debug("getStatDM Stopped")]
[h: macro.return = mod]
