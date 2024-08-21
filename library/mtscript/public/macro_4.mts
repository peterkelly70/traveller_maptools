[h: str = getProperty("Strength")]
[h: dex = getProperty("Dexterity")]
[h: end = getProperty("Endurance")]
[h: int = getProperty("Intelligence")]
[h: edu = getProperty("Education")]
[h: soc = getProperty("SocialStanding")]
[h: psi = getProperty("Psionics")]

<!-- Generate HTML content for Statistics -->
[h: htmlContent = "
<html>
<body>
  <h3>Statistics</h3>
  <table>
    <tr><td>STR:</td><td>" + str + "</td></tr>
    <tr><td>DEX:</td><td>" + dex + "</td></tr>
    <tr><td>END:</td><td>" + end + "</td></tr>
    <tr><td>INT:</td><td>" + int + "</td></tr>
    <tr><td>EDU:</td><td>" + edu + "</td></tr>
    <tr><td>SOC:</td><td>" + soc + "</td></tr>
    <tr><td>PSI:</td><td>" + psi + "</td></tr>
  </table>
</body>
</html>
"]

[r: htmlContent] <!-- Return the HTML content -->
