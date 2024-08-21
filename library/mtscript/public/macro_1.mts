<!-- Define the initial JSON object and user impersonation -->
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = "CharSheet"]
[h: charName = getName(callerID)]
[h: charAge = string(getProperty("Age",callerID))]
[h: charSex = string(getProperty("Sex",callerID))]
[h: charHomeWorld = string(getProperty("Home World",callerID))]
[h: charSpecies = string(getProperty("Species",callerID))]
[h: careersJ = getProperty("Careers",callerID)]

[h: jsonName = "Careers"]
[h: tabReturn = "UPD"]


<!-- Generate HTML content for Personal Data -->
[h: editUPDLink=makeLink(callerID,returnCall,"Edit","edit_personaldata@lib:Traveller",json.append("[]",tabReturn),"Edit")]]

[h: tokenImage = getTokenPortrait("",callerID)]
[h: imgSrc= "<img src='"+ tokenImage +"' alt='Token Image'>"]
[h: htmlContent = "
<div class='section'> 
  <div class='heading'><h3>Personal Data</h3></div>
  <table>
	<tr>
      <td>Name:</td><td>" + charName + "</td>
      <td rowspan='5'>" + imgSrc + "</td> <!-- Including the image here -->
    </tr>
    <tr><td>Age:</td><td>" + charAge + "</td></tr>
    <tr><td>Sex:</td><td>" + charSex + "</td></tr>
    <tr><td>Species:</td><td>" + charSpecies + "</td></tr>
    <tr><td>Home World:</td><td>" + charHomeWorld + "</td></tr>
  </table>
  <div class='crud'>" + editUPDLink + "</div>
</div>
"]

<!-- Initialize variables for table styling -->
[h: row_class = "grey"]

<!-- Generate HTML content for Career Data -->


[h: htmlContent = htmlContent + "
<div class='section'> 
  <div class='heading'><h3>Careers</h3></div>
  <table><tr class='tblhead'><th>Term</th><th>Career</th><th>Assignment</th><th>Rank</th><th></th></tr>
"]

<!-- Loop through each career in the JSON array -->

[h, foreach(term, careersJ), code: {
   [h: careerInfo = json.get(careersJ, term)]
   [h: debug("<pre>" + json.indent(careerInfo) + "</pre>")]
   [h: career = json.get(careerInfo,0)]
   [h: assignment = json.get(careerInfo,1)]
   [h: rank =  json.get(careerInfo,2)]
   [h: description =  json.get(careerInfo,3)]
   [h: rewards =  json.get(careerInfo,4)]
   [h: itemName = term]

  [h: debug("tab:"+tabReturn+" ,itemName:"+itemName+" jsonName:"+jsonName)]
  [h: edLink=makeLink(callerID,returnCall,"Edit","jsonEdit@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"edit")]
  [h: delLink=makeLink(callerID,returnCall,"Delete","jsonDel@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"delete")]
  [h: viewLink=makeLink(callerID,returnCall,"View","jsonView@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"view")]
  
  [h: htmlContent = htmlContent + "<tr class='" + row_class + "'><td>"+term+"</td><td>" + career + "</td><td>" + assignment + "</td><td>" + rank + "</td><td>"+edlink+delLink+viewLink+"</td></tr>"]
    [h: row_class = if (row_class == "grey","white","grey")]
}]

[h: newLink = makeLink(callerID,returnCall,"New","jsonNew@lib:Traveller",json.append("[]",tabReturn,"Careers"),"new")]
<!-- Close the table and add the edit link -->
[h: htmlContent = htmlContent + "</table><div class='crud'>"+newLink+"</div></div>"]

<!-- Return the HTML content -->
[h: macro.return = htmlContent]
