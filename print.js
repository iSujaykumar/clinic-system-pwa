function printSheet(){

const html = `
<html>
<head>

<title>Prescription</title>

<style>

@media print{
body{
width:210mm;
height:297mm;
}
}

body{
font-family: Arial, sans-serif;
margin:40px;
}

.header{
text-align:center;
margin-bottom:25px;
}

.line{
border-bottom:1px solid black;
display:inline-block;
min-width:120px;
}

.row{
margin-bottom:10px;
font-size:16px;
}

.section{
margin-top:20px;
}

.rx{
height:300px;
border-bottom:1px solid black;
margin-top:10px;
}

.bigline{
border-bottom:1px solid black;
display:block;
margin-top:6px;
min-height:25px;
white-space:pre-line;
}

hr{
margin:20px 0;
border:0;
border-top:1px solid black;
}

</style>
</head>

<body>

<div class="header">
<h2>Dr. Wankhede</h2>
<h3>Nimbabi Health and Wellness Clinic</h3>
</div>

<hr>

<div class="row">
Patient Name: <span class="line">${elements.name.value}</span>
&nbsp;&nbsp;&nbsp;&nbsp;
Date: <span class="line">${elements.dateInput.value}</span>
</div>

<div class="row">
Mobile: <span class="line">${elements.mobile.value}</span>
&nbsp;&nbsp;&nbsp;
Age: <span class="line">${elements.age.value}</span>
&nbsp;&nbsp;&nbsp;
Sex: <span class="line">${elements.sex.value}</span>
</div>

<div class="row">
Height: <span class="line">${elements.height.value}</span>
&nbsp;&nbsp;&nbsp;
Weight: <span class="line">${elements.weight.value}</span>
</div>

<div class="row">
Pulse: <span class="line">${elements.pulse.value}</span>
&nbsp;&nbsp;&nbsp;
B.P: <span class="line">${elements.bp.value}</span>
&nbsp;&nbsp;&nbsp;
Temp: <span class="line">${elements.temp.value}</span>
&nbsp;&nbsp;&nbsp;
R.R: <span class="line">${elements.rr.value}</span>
&nbsp;&nbsp;&nbsp;
Blood Sugar: <span class="line">${elements.sugar.value}</span>
</div>

<div class="section">
<b>Present Complaints</b>
<div class="bigline">${elements.complaints.value}</div>
</div>

<div class="section">
<b>Investigation</b>
<div class="bigline">${elements.investigation.value}</div>
</div>

<div class="section">
<b>Rx</b>
<div class="rx"></div>
</div>

<hr>

<div class="row">
Follow Up: <span class="line">${elements.followup.value}</span>
</div>

</body>
</html>
`;

const w = window.open("","","width=900,height=700");

if(!w){
alert("Popup blocked. Please allow popups for printing.");
return;
}

w.document.write(html);
w.document.close();

w.onload = function(){
w.focus();
w.print();
};

}