let patientsList = [];
let currentEditId = null;

window.elements = {
    name: document.getElementById('name'), date: document.getElementById('date'),
    mobile: document.getElementById('mobile'), weight: document.getElementById('weight'),
    age: document.getElementById('age'), sex: document.getElementById('sex'),
    height: document.getElementById('height'), rr: document.getElementById('rr'),
    pulse: document.getElementById('pulse'), bp: document.getElementById('bp'),
    temp: document.getElementById('temp'), sugar: document.getElementById('sugar'),
    complaints: document.getElementById('complaints'), rx: document.getElementById('rx'),
    investigation: document.getElementById('investigation'), followup: document.getElementById('followup')
};

// --- AUTH LOGIC ---
async function login() {
    const loginId = document.getElementById('loginId').value.trim().toLowerCase();
    const pass = document.getElementById('loginPassword').value;
    const email = loginId.includes('@') ? loginId : `${loginId}@clinic.com`;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) alert("Invalid Credentials");
    else checkAuth();
}

async function logout() {
    await supabase.auth.signOut();
    checkAuth();
}

async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('appSection').style.display = 'block';
        elements.date.valueAsDate = new Date();
        await loadHistory();
    } else {
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('appSection').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', checkAuth);

// --- APP LOGIC ---
async function savePatient() {
    const patientData = {};
    for (let key in elements) { patientData[key] = elements[key].value || null; }

    const saveBtn = document.querySelector('button[onclick="savePatient()"]');
    saveBtn.disabled = true;

    const success = currentEditId ? await updatePatientInCloud(currentEditId, patientData) : await addPatient(patientData);
    
    if (success) {
        alert("Saved Successfully");
        currentEditId = null;
        saveBtn.innerText = "Save Patient";
        Object.values(elements).forEach(el => { if(el.id !== 'date') el.value = ''; });
        await loadHistory();
    }
    saveBtn.disabled = false;
}

async function loadHistory() {
    patientsList = await fetchPatients();
    const tableBody = document.getElementById('patientTable');
    tableBody.innerHTML = '';
    patientsList.forEach((p, index) => {
        tableBody.innerHTML += `
            <tr>
                <td><b>${p.name}</b></td>
                <td>${p.mobile}</td>
                <td>${p.date}</td>
                <td>
                    <button onclick="editRecord('${p.id}')">Edit</button>
                    <button onclick="deleteRecord('${p.id}')" style="background:#dc2626;color:white">Delete</button>
                    <button onclick="viewPatient(${index})">View</button>
                </td>
            </tr>`;
    });
    updateTodayCount();
}

function editRecord(id) {
    const p = patientsList.find(x => x.id === id);
    currentEditId = id;
    for (let key in elements) { elements[key].value = p[key] || ''; }
    document.querySelector('button[onclick="savePatient()"]').innerText = "Update Patient";
    showForm();
}

async function deleteRecord(id) {
    if (confirm("Delete permanently?")) {
        await deletePatientFromCloud(id);
        await loadHistory();
    }
}

function viewPatient(index) {
    localStorage.setItem("selectedPatient", index);
    window.open('patient.html', '_blank');
}

function updateTodayCount() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('todayCount').innerText = patientsList.filter(p => p.date === today).length;
}

function showForm() { document.getElementById('formSection').style.display='block'; document.getElementById('historySection').style.display='none'; }
function showHistory() { document.getElementById('formSection').style.display='none'; document.getElementById('historySection').style.display='block'; }