let patients = JSON.parse(localStorage.getItem("patients")) || [];

function saveToDB(data){

patients.push(data);

localStorage.setItem("patients", JSON.stringify(patients));

}

function getAllPatients(){

return patients;

}

function deletePatient(index){

patients.splice(index,1);

localStorage.setItem("patients", JSON.stringify(patients));

}