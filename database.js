const SUPABASE_URL = 'https://ixbnfytrtsqpjdprjtbi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4Ym5meXRydHNxcGpkcHJqdGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjA4NDksImV4cCI6MjA5MTI5Njg0OX0.PSkZMOH-CM5HZIOnxuDIAa6lMdB8bcldiTi6MYyr350';

var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchPatients() {
    try {
        const { data, error } = await supabase
            .from('patients')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        localStorage.setItem('patients', JSON.stringify(data));
        return data;
    } catch (error) {
        console.error("Cloud fetch failed:", error);
        return JSON.parse(localStorage.getItem("patients")) || [];
    }
}

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
        alert("Failed to save to cloud.");
        return null;
    }
}

async function updatePatientInCloud(id, patientData) {
    try {
        const { error } = await supabase.from('patients').update(patientData).eq('id', id);
        if (error) throw error;
        return true;
    } catch (error) {
        console.error("Update failed:", error);
        return false;
    }
}

async function deletePatientFromCloud(id) {
    try {
        const { error } = await supabase.from('patients').delete().eq('id', id);
        if (error) throw error;
        return true;
    } catch (error) {
        console.error("Delete failed:", error);
        return false;
    }
}