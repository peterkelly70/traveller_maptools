[h: value = json.get(macro.args, 0) ]
[h: mod = floor((value - 7) / 2)]  <!-- Traveller characteristic modifier formula -->
[h: macro.return = mod]