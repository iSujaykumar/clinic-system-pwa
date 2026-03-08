// function loadPatients(){

// let table = document.querySelector("#patientTable tbody");

// table.innerHTML="";

// let patients = getAllPatients();

// patients.forEach((p,index)=>{

// let row = document.createElement("tr");

// row.innerHTML=`

// <td>${p.name}</td>
// <td>${p.mobile}</td>
// <td>${p.date}</td>
// <td>
// <button onclick="reprint(${index})">Print</button>
// </td>

// `;

// table.appendChild(row);

// });

// }

// function searchPatient(){

// let search = document.getElementById("searchBox").value.toLowerCase();

// let rows = document.querySelectorAll("#patientTable tbody tr");

// rows.forEach(row=>{

// let text=row.innerText.toLowerCase();

// row.style.display=text.includes(search) ? "" : "none";

// });

// }

// function reprint(index){

// let p = patients[index];

// alert("Open patient record then press print");

// }