// a-grades.js
function loadGradesData() {
    const gradesTableBody = document.getElementById('grades-data-body');

  
    const studentGrades = [
        { no: 1, name: 'Student One', gender: 'Male', oralCom: '', komPan: '', genMath: '', earthSci: '', personalDev: '', eTech: '', hope: '', breadPastryQ1: '', breadPastryQ2: '' },
        { no: 2, name: 'Student Two', gender: 'Female', oralCom: '', komPan: '', genMath: '', earthSci: '', personalDev: '', eTech: '', hope: '', breadPastryQ1: '', breadPastryQ2: '' },
       
    ];

    if (gradesTableBody && studentGrades) {
        studentGrades.forEach(student => {
            const row = gradesTableBody.insertRow();
            row.insertCell().textContent = student.no;
            row.insertCell().classList.add('learners-name');
            row.insertCell().textContent = student.name;
            row.insertCell().textContent = student.gender;
            row.insertCell().textContent = student.oralCom;
            row.insertCell().textContent = student.komPan;
            row.insertCell().textContent = student.genMath;
            row.insertCell().textContent = student.earthSci;
            row.insertCell().textContent = student.personalDev;
            row.insertCell().textContent = student.eTech;
            row.insertCell().textContent = student.hope;
            row.insertCell().textContent = student.breadPastryQ1;
            row.insertCell().textContent = student.breadPastryQ2;
        });
    } else {
        console.error("Grades table body not found or no data to load.");
    }
}


function calculateRowAverage(row) {
    const gradeInputs = row.querySelectorAll('.grade-input');
    let total = 0;
    let count = 0;

    gradeInputs.forEach(input => {
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
            total += value;
            count++;
        }
    });

    const averageField = row.querySelector('.average-output');
    const statusField = row.querySelector('.pass-or-fail');

    if (count > 0) {
        const average = (total / count).toFixed(2);
        averageField.value = average;

        // Determine Pass or Fail (assuming passing is >= 75)
        if (average >= 75) {
            statusField.textContent = 'Passed';
            statusField.style.color = 'green';
        } else {
            statusField.textContent = 'Failed';
            statusField.style.color = 'red';
        }
    } else {
        averageField.value = '';
        statusField.textContent = '';
    }
}


function addNewStudentRow() {
    const gradesTableBody = document.getElementById('grades-data-body');
    const newRow = gradesTableBody.insertRow();
    const rowNumber = gradesTableBody.rows.length;

    newRow.insertCell().textContent = rowNumber;
    newRow.insertCell().innerHTML = '<input type="text" class="name-input" placeholder="Student Name">';
    newRow.insertCell().innerHTML = `
        <select class="gender-select">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>
    `;
    for (let i = 0; i < 7; i++) { 
        newRow.insertCell().innerHTML = '<input type="number" class="grade-input" min="0" max="100" oninput="calculateRowAverage(this.parentNode.parentNode)">';
    }
    newRow.insertCell().innerHTML = '<input type="number" class="grade-input bread-pastry-q1" min="0" max="100" oninput="calculateRowAverage(this.parentNode.parentNode)">';
    newRow.insertCell().innerHTML = '<input type="number" class="grade-input bread-pastry-q2" min="0" max="100" oninput="calculateRowAverage(this.parentNode.parentNode)">';
    newRow.insertCell().classList.add('semestral-average');
}

function calculateRowAverage(row) {
    const gradeInputs = Array.from(row.querySelectorAll('.grade-input'));
    let total = 0;
    let validGradeCount = 0;

    gradeInputs.forEach(input => {
        const value = parseFloat(input.value);
        if (!isNaN(value) && value >= 0 && value <= 100) {
            total += value;
            validGradeCount++;
        }
    });

    const averageOutput = row.querySelector('.average-output');
    const passOrFailSpan = row.querySelector('.pass-or-fail');

    if (validGradeCount > 0) {
        const average = (total / validGradeCount).toFixed(2);
        averageOutput.value = average;

        if (average >= 75) {
            passOrFailSpan.textContent = 'Passed';
            passOrFailSpan.style.color = 'green';
        } else {
            passOrFailSpan.textContent = 'Failed';
            passOrFailSpan.style.color = 'red';
        }
    } else {
        averageOutput.value = '';
        passOrFailSpan.textContent = '';
    }
}

function addNewStudentRow() {
    const gradesTableBody = document.getElementById('grades-data-body');
    const newRow = gradesTableBody.insertRow();
    const rowNumber = gradesTableBody.rows.length;
    const numberOfGradeInputs = 9; 

    newRow.insertCell().textContent = rowNumber;
    newRow.insertCell().innerHTML = '<input type="text" class="name-input" placeholder="Student Name">';
    newRow.insertCell().innerHTML = `
        <select class="gender-select">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>
    `;
    for (let i = 0; i < numberOfGradeInputs - 2; i++) { 
        newRow.insertCell().innerHTML = '<input type="number" class="grade-input" min="0" max="100" oninput="calculateRowAverage(this.closest(\'tr\'))">';
    }
    newRow.insertCell().innerHTML = '<input type="number" class="grade-input bread-pastry-q1" min="0" max="100" oninput="calculateRowAverage(this.closest(\'tr\'))">';
    newRow.insertCell().innerHTML = '<input type="number" class="grade-input bread-pastry-q2" min="0" max="100" oninput="calculateRowAverage(this.closest(\'tr\'))">';
    newRow.insertCell().innerHTML = '<input type="text" class="average-output" readonly>';
    newRow.insertCell().innerHTML = '<span class="pass-or-fail"></span>';
}


function saveGradesData() {
    const tableRows = document.getElementById('grades-data-body').rows;
    const gradesData = [];

    for (let i = 0; i < tableRows.length; i++) {
        const rowData = {};
        rowData.name = tableRows[i].querySelector('.name-input')?.value;
        rowData.gender = tableRows[i].querySelector('.gender-select')?.value;
        const gradeInputs = tableRows[i].querySelectorAll('.grade-input');
        rowData.oralCommunication = gradeInputs[0]?.value;
        rowData.komPan = gradeInputs[1]?.value;
        rowData.generalMath = gradeInputs[2]?.value;
        rowData.earthSci = gradeInputs[3]?.value;
        rowData.personalDev = gradeInputs[4]?.value;
        rowData.eTech = gradeInputs[5]?.value;
        rowData.hope = gradeInputs[6]?.value;
        rowData.breadPastryQ1 = tableRows[7]?.value; 
        rowData.breadPastryQ2 = tableRows[8]?.value; 
        rowData.semestralAverage = tableRows[i].querySelector('.average-output')?.value;
        gradesData.push(rowData);
    }

    console.log("Grades Data:", gradesData);
    alert("Grades data saved (check console for output)!");
}

function printGradesRecord() {
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.value) {
            input.setAttribute('value', input.value);
        }
    });
    
   
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        const selectedOption = select.options[select.selectedIndex];
        if (selectedOption) {
            selectedOption.setAttribute('selected', 'selected');
        }
    });
    
    window.print();
}