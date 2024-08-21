[h: val = arg(0)]
[h: val = if(val >= 10, substring("ABCDEF", val - 10, val - 9), strformat("%{val}"))]
[h: macro.return = val]

