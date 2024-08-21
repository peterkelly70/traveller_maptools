[h: cssContent = "
body {
    font-family: Arial, sans-serif;  /* Corrected the typo 'Aaial' */
    background-color: black;
    color: white;
    margin: 0;
    padding: 20px;
}

.header {
    background-color: black;
    color: red;
    text-align: center;
}

.header img{
    display: inline-block;
}

.tab {
    overflow: hidden;
    border: 1px solid red;
    padding: 2px;
    background-color: black;
    color: red;
    text-align: center;
    text-decoration: none;  
}

.tab a {
    overflow: hidden;
    border: 1px solid red;
    background-color: black;
    color: white;
    text-align: center;
    text-decoration: none;  
}

.tab a:hover {  /* Corrected '.tab a hover' to '.tab a:hover' */
    background-color: black;
    color: red;
    text-decoration: none;  
}

.tabcontent {
    display: none;
    padding: 5px;
    border: 1px solid #ccc;
}

.active-content {
    display: block;
}

.heading {
    padding-left: 10px;
    padding-right: 10px;
    display: block;
    background-color: black;
    color: red;
    font-size: 16px; 
}

.section {
    padding: 2px;
    border: 2px solid black;
    background-color: white;
    color: black;
    margin-bottom: 20px;
    width: 100%;
}

.scrollable {
    height: 100px;
    overflow-y: auto;
}

.section .black {
    padding: 2px;
    border: 2px solid black;
    background-color: black;
    color: white;
    width: 100%;
}


.crud {
    float: right;
    text-align: right;
    color: black;
    font-weight: bold;
}

.tblhead {
    color: white;
    background-color: black;  
    padding-top: 5px;
    width=100%;
}

.center {
	text-align: center;
}


.stat-name { width: 40%; }  /* Allocate more width to the stat name for better readability */
.cur, .max, .dm { width: 15%; text-align: center; }  /* Smaller width for these specific columns and centered text */
.separator { width: 5%; text-align: center; }  /* Very narrow column for separators like '/' */
.equip-name {width: 30%;}
.narrow {width: 5%;text-align: center;}
.icons {width: 15%;text-align: center;}

/* General table styling */
td, th {
    padding: 8px;  /* Uniform padding inside table cells */
    text-align: left;  /* Default alignment to left for text */
}

.black .center{
	text-align: center;
    font-weight: bold;
}

.submit-btn {
	color: red;
    background-color: black;  
    text-align: center;
    font-weight: bold;
    border: 2px solid white;
}


.input-small {
    width: 100%; /* Force input fields to not exceed their cell width */
    box-sizing: border-box; /* Include padding and borders in the width calculation */
}

.section table {
    width: 100%; /* Make table use all available space in the section */
    box-sizing: border-box; /* Include padding and border in the element's width and height */
    margin: 0; /* Remove default margin */
    padding: 0; /* Remove padding inside the table, if you want padding inside the cells, set it in 'th' and 'td' */
    border-collapse: collapse; /* Remove spaces between borders */
}

.black {
    background-color: black;
    color: white;
}

.white {
    background-color: white;
    color: black;
}
"]
[h: macro.return = cssContent]

