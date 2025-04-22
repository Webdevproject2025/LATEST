let students = {}; 
let currentSection = ''; 
const initialRows = 20; 

function renderInteractiveMasterlist() {
    const masterlistBody = document.getElementById('interactive-masterlist-body');

    if (!masterlistBody) {
        console.error("Hindi natagpuan ang interactive masterlist body!");
        return;
    }

    masterlistBody.innerHTML = ''; 

    if (students[currentSection] && students[currentSection].length > 0) {
        students[currentSection].forEach((student, index) => {
            const row = masterlistBody.insertRow();
            const numberCell = row.insertCell();
            const fullnameCell = row.insertCell();
            const lrnCell = row.insertCell();
            const sectionCell = row.insertCell();

            numberCell.textContent = index + 1;

            const fullnameInput = document.createElement('input');
            fullnameInput.type = 'text';
            fullnameInput.value = student.fullname || '';
            fullnameInput.addEventListener('change', (event) => updateStudent(index, 'fullname', event.target.value));
            fullnameCell.appendChild(fullnameInput);

            const lrnInput = document.createElement('input');
            lrnInput.type = 'text';
            lrnInput.value = student.lrn || '';
            lrnInput.addEventListener('change', (event) => updateStudent(index, 'lrn', event.target.value));
            lrnCell.appendChild(lrnInput);

            const sectionInput = document.createElement('input');
            sectionInput.type = 'text';
            sectionInput.value = student.section || currentSection; 
            sectionInput.readOnly = true; 
            sectionCell.appendChild(sectionInput);
        });
    } else {
        const emptyRow = masterlistBody.insertRow();
        const emptyCell = emptyRow.insertCell();
        emptyCell.colSpan = 4;
        emptyCell.textContent = `No students in ${currentSection || 'selected section'}`;
        emptyCell.style.textAlign = 'center';
    }
}

function changeSection(section) {
    currentSection = section; 
    console.log('Current Section:', currentSection);
    if (currentSection) {
        if (!students[currentSection]) {
            students[currentSection] = [];
            for (let i = 0; i < initialRows; i++) {
                students[currentSection].push({ fullname: '', lrn: '', section: currentSection });
            }
            console.log('Students after adding initial rows:', students[currentSection]);
        }
    }
    renderInteractiveMasterlist();
}

function addEmptyRow() {
    if (currentSection) {
        if (!students[currentSection]) {
            students[currentSection] = [];
        }
        students[currentSection].push({ fullname: '', lrn: '', section: currentSection });
        renderInteractiveMasterlist();
    } else {
        alert('Please select a class first.');
    }
}

function updateStudent(index, property, value) {
    if (students[currentSection] && students[currentSection][index]) {
        students[currentSection][index][property] = value;
        console.log('Updated students:', students); 
    }
}

function printMasterlist() {
    window.print();
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('interactive-masterlist-body')) {
            renderInteractiveMasterlist();
        }
    });
} else {
    if (document.getElementById('interactive-masterlist-body')) {
        renderInteractiveMasterlist();
    }
}