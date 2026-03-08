// app.js - Clinic Patient Management Logic

// DOM elements cache
const elements = {
  formSection: document.getElementById('formSection'),
  historySection: document.getElementById('historySection'),
  patientTable: document.getElementById('patientTable'),
  searchBox: document.getElementById('searchBox'),
  todayCount: document.getElementById('todayCount'),
  dateInput: document.getElementById('date'),

  name: document.getElementById('name'),
  age: document.getElementById('age'),
  sex: document.getElementById('sex'),
  mobile: document.getElementById('mobile'),
  height: document.getElementById('height'),
  weight: document.getElementById('weight'),
  pulse: document.getElementById('pulse'),
  bp: document.getElementById('bp'),
  temp: document.getElementById('temp'),
  rr: document.getElementById('rr'),
  sugar: document.getElementById('sugar'),
  complaints: document.getElementById('complaints'),
  investigation: document.getElementById('investigation'),
  followup: document.getElementById('followup'),
};

// ── Show / Hide Sections ──
function showForm() {
  elements.formSection.style.display = 'block';
  elements.historySection.style.display = 'none';
}

function showHistory() {
  elements.formSection.style.display = 'none';
  elements.historySection.style.display = 'block';
  loadPatients();
}

// ── Save Patient ──
function savePatient() {

  const data = {
    name: elements.name.value.trim(),
    date: elements.dateInput.value,
    age: elements.age.value,
    sex: elements.sex.value,
    mobile: elements.mobile.value.trim(),
    height: elements.height.value,
    weight: elements.weight.value,
    pulse: elements.pulse.value,
    bp: elements.bp.value,
    temp: elements.temp.value,
    rr: elements.rr.value,
    sugar: elements.sugar.value,
    complaints: elements.complaints.value.trim(),
    investigation: elements.investigation.value.trim(),
    followup: elements.followup.value.trim(),
  };

  // Basic validation
  if (!data.name || !data.date) {
    alert('Please fill in Patient Name and Date.');
    return;
  }

  saveToDB(data); // database.js
  alert('Patient saved successfully!');

  clearForm();
  getTodayCount();
}

// ── Clear Form ──
function clearForm() {

  const fields = [
    elements.name,
    elements.age,
    elements.sex,
    elements.mobile,
    elements.height,
    elements.weight,
    elements.pulse,
    elements.bp,
    elements.temp,
    elements.rr,
    elements.sugar,
    elements.complaints,
    elements.investigation,
    elements.followup
  ];

  fields.forEach(el => {
    if (el) el.value = '';
  });

  // reset date to today
  elements.dateInput.value = new Date().toISOString().split('T')[0];
}

// ── Load Patients ──
function loadPatients(){

elements.patientTable.innerHTML="";

const list = getAllPatients();

if(list.length===0){

elements.patientTable.innerHTML =
'<tr><td colspan="4" style="text-align:center;padding:2rem;">No patients found</td></tr>';

return;

}

list.forEach((patient,index)=>{

const row=document.createElement("tr");

row.innerHTML=`

<td>${patient.name}</td>
<td>${patient.mobile}</td>
<td>${patient.date}</td>

<td>
<button onclick="viewPatient(${index})">View</button>
<button onclick="deleteRecord(${index})">Delete</button>
</td>

`;

elements.patientTable.appendChild(row);

});

}

function deleteRecord(index){

if(confirm("Delete this patient record?")){

deletePatient(index);

loadPatients();

getTodayCount();

}

}

function viewPatient(index){

localStorage.setItem("selectedPatient",index);

window.open("patient.html","_blank");

}

// ── Search Patients ──
function searchPatient() {

  const text = elements.searchBox.value.toLowerCase().trim();

  const rows = elements.patientTable.querySelectorAll('tr');

  rows.forEach(row => {
    const rowText = row.textContent.toLowerCase();
    row.style.display = rowText.includes(text) ? '' : 'none';
  });
}

// ── Today's Patient Count ──
function getTodayCount() {

  const today = new Date().toISOString().split('T')[0];

  const all = getAllPatients() || [];

  const todayPatients = all.filter(p => p.date === today).length;

  elements.todayCount.textContent = todayPatients;
}

// ── Optional quick setters ──
function setBP(value) {
  elements.bp.value = value;
}

function setTemp(value) {
  elements.temp.value = value;
}

// ── Init ──
window.addEventListener('load', () => {

  elements.dateInput.value = new Date().toISOString().split('T')[0];

  getTodayCount();

  showForm();
});