let studentDataList = [];
const initialDataEntryRows = 1; 

function addStudentData() {
    const lrnInput = document.getElementById('lrn');
    const lastNameInput = document.getElementById('last-name');
    const firstNameInput = document.getElementById('first-name');
    const middleNameInput = document.getElementById('middle-name');
    const suffixInput = document.getElementById('suffix');
    const birthdateInput = document.getElementById('birthdate');
    const religionInput = document.getElementById('religion');
    const houseNumberInput = document.getElementById('house-number');
    const barangayInput = document.getElementById('barangay');
    const cityInput = document.getElementById('city');
    const provinceInput = document.getElementById('province');
    const fatherNameInput = document.getElementById('father-name');
    const motherNameInput = document.getElementById('mother-name');
    const guardianNameInput = document.getElementById('guardian-name');
    const contactNumberInput = document.getElementById('contact-number');
    const studentDataBody = document.getElementById('student-data-body');

    const newStudent = {
        lrn: lrnInput.value,
        lastName: lastNameInput.value,
        firstName: firstNameInput.value,
        middleName: middleNameInput.value,
        suffix: suffixInput.value,
        birthdate: birthdateInput.value,
        religion: religionInput.value,
        houseNumber: houseNumberInput.value,
        barangay: barangayInput.value,
        city: cityInput.value,
        province: provinceInput.value,
        fatherName: fatherNameInput.value,
        motherName: motherNameInput.value,
        guardianName: guardianNameInput.value,
        contactNumber: contactNumberInput.value
    };

    studentDataList.push(newStudent);
    renderStudentDataList();

  
    lrnInput.value = '';
    lastNameInput.value = '';
    firstNameInput.value = '';
    middleNameInput.value = '';
    suffixInput.value = '';
    birthdateInput.value = '';
    religionInput.value = '';
    houseNumberInput.value = '';
    barangayInput.value = '';
    cityInput.value = '';
    provinceInput.value = '';
    fatherNameInput.value = '';
    motherNameInput.value = '';
    guardianNameInput.value = '';
    contactNumberInput.value = '';
}

function renderStudentDataList() {
    const studentDataBody = document.getElementById('student-data-body');

    if (!studentDataBody) {
        console.error("Hindi natagpuan ang student data body!");
        return;
    }

    studentDataBody.innerHTML = '';

    studentDataList.forEach(student => {
        const row = studentDataBody.insertRow();
        row.insertCell().textContent = student.lrn || '';
        row.insertCell().textContent = student.lastName || '';
        row.insertCell().textContent = student.firstName || '';
        row.insertCell().textContent = student.middleName || '';
        row.insertCell().textContent = student.suffix || '';
        row.insertCell().textContent = student.birthdate || '';
        row.insertCell().textContent = student.religion || '';
        row.insertCell().textContent = student.houseNumber || '';
        row.insertCell().textContent = student.barangay || '';
        row.insertCell().textContent = student.city || '';
        row.insertCell().textContent = student.province || '';
        row.insertCell().textContent = student.fatherName || '';
        row.insertCell().textContent = student.motherName || '';
        row.insertCell().textContent = student.guardianName || '';
        row.insertCell().textContent = student.contactNumber || '';
    });

    
    if (studentDataList.length === 0 && studentDataBody.rows.length === 0) {
        for (let i = 0; i < initialDataEntryRows; i++) {
            const emptyRow = studentDataBody.insertRow();
            for (let j = 0; j < 15; j++) { 
                emptyRow.insertCell().textContent = '';
            }
        }
    } else if (studentDataList.length === 0) {
       
        const emptyRow = studentDataBody.insertRow();
        const emptyCell = emptyRow.insertCell();
        emptyCell.colSpan = 15;
        emptyCell.textContent = 'No student data entered yet.';
        emptyCell.style.textAlign = 'center';
    }
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('student-data-body')) {
            renderStudentDataList();
        }
    });
} else {
    if (document.getElementById('student-data-body')) {
        renderStudentDataList();
    }
}

function printStudentData() {
    window.print();
}