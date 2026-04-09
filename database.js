// let patients = JSON.parse(localStorage.getItem("patients")) || [];

// function saveToDB(data){

// patients.push(data);

// localStorage.setItem("patients", JSON.stringify(patients));

// }

// function getAllPatients(){

// return patients;

// }

// function deletePatient(index){

// patients.splice(index,1);

// localStorage.setItem("patients", JSON.stringify(patients));

// }



// database.js - Cloud Database Connection

const SUPABASE_URL = 'https://ixbnfytrtsqpjdprjtbi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4Ym5meXRydHNxcGpkcHJqdGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjA4NDksImV4cCI6MjA5MTI5Njg0OX0.PSkZMOH-CM5HZIOnxuDIAa6lMdB8bcldiTi6MYyr350';

// Initialize Supabase Client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Fetch all patients from the cloud
async function fetchPatients() {
    try {
        const { data, error } = await supabase
            .from('patients')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Cache data locally so patient.html and offline mode still work perfectly
        localStorage.setItem('patients', JSON.stringify(data));
        return data;
    } catch (error) {
        console.error("Cloud fetch failed:", error);
        // Fallback to local storage if internet drops
        return JSON.parse(localStorage.getItem("patients")) || [];
    }
}

// Insert new patient into the cloud
async function addPatient(patientData) {
    try {
        const { data, error } = await supabase
            .from('patients')
            .insert([patientData])
            .select();

        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error("Save failed:", error);
        alert("Failed to save to cloud. Please check your connection.");
        return null;
    }
}