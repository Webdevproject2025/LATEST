let checklistData = {}; 
let currentChecklistSection = ''; 
const initialChecklistRows = 20; 

function renderEditableChecklist() {
    const checklistBody = document.getElementById('editable-checklist-body');

    if (!checklistBody) {
        console.error("Hindi natagpuan ang editable checklist body!");
        return;
    }

    checklistBody.innerHTML = ''; 

    if (checklistData[currentChecklistSection] && checklistData[currentChecklistSection].length > 0) {
        checklistData[currentChecklistSection].forEach((item, index) => {
            const row = checklistBody.insertRow();

           
            const numberCell = row.insertCell();
            numberCell.textContent = index + 1;

            
            const nameCell = row.insertCell();
            const nameInput = createInput('text', item.name, (value) => updateEditableChecklist(index, 'name', value));
            nameCell.appendChild(nameInput);

         
            const sf10Cell = row.insertCell();
            const sf10Select = createSelect(['', '/', 'X'], item.sf10, (value) => updateEditableChecklist(index, 'sf10', value));
            sf10Cell.appendChild(sf10Select);

           
            const psaNsoCell = row.insertCell();
            const psaNsoSelect = createSelect(['', '/', 'X'], item.psaNso, (value) => updateEditableChecklist(index, 'psaNso', value));
            psaNsoCell.appendChild(psaNsoSelect);

            
            const statusCell = row.insertCell();
            const statusSelect = createSelect(['', 'Completer', 'Incomplete'], item.status, (value) => updateEditableChecklist(index, 'status', value));
            statusCell.appendChild(statusSelect);

          
            const remarksCell = row.insertCell();
            const remarksSelect = createSelect(['', 'Regular', 'Irregular'], item.remarks, (value) => updateEditableChecklist(index, 'remarks', value));
            remarksCell.appendChild(remarksSelect);
        });
    } else {
        const emptyRow = checklistBody.insertRow();
        const emptyCell = emptyRow.insertCell();
        emptyCell.colSpan = 6;
        emptyCell.textContent = `No items in ${currentChecklistSection || 'selected class'} checklist yet.`;
        emptyCell.style.textAlign = 'center';
    }
}

function createInput(type, value, onChangeCallback) {
    const input = document.createElement('input');
    input.type = type;
    input.value = value || '';
    input.addEventListener('change', (event) => onChangeCallback(event.target.value));
    input.style.width = '100%';
    input.style.boxSizing = 'border-box';
    input.style.border = 'none';
    input.style.padding = '6px';
    input.style.fontSize = 'inherit';
    input.style.backgroundColor = 'transparent';
    return input;
}

function createSelect(options, currentValue, onChangeCallback) {
    const select = document.createElement('select');
    select.style.width = '100%';
    select.style.boxSizing = 'border-box';
    select.style.border = 'none';
    select.style.padding = '6px';
    select.style.fontSize = 'inherit';
    select.style.backgroundColor = 'transparent';
    select.addEventListener('change', (event) => onChangeCallback(event.target.value));

    options.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        option.textContent = optionValue === '' ? '' : optionValue; 
        option.selected = optionValue === currentValue;
        select.appendChild(option);
    });

    return select;
}

function changeChecklistSection(section) {
    currentChecklistSection = section;
    if (currentChecklistSection) {
        if (!checklistData[currentChecklistSection]) {
            checklistData[currentChecklistSection] = [];
            for (let i = 0; i < initialChecklistRows; i++) {
                checklistData[currentChecklistSection].push({ name: '', sf10: '', psaNso: '', status: '', remarks: '' });
            }
        }
    }
    renderEditableChecklist();
}

function addEditableChecklistRow() {
    if (currentChecklistSection) {
        if (!checklistData[currentChecklistSection]) {
            checklistData[currentChecklistSection] = [];
        }
        checklistData[currentChecklistSection].push({ name: '', sf10: '', psaNso: '', status: '', remarks: '' });
        renderEditableChecklist();
    } else {
        alert('Please select a class first.');
    }
}

function updateEditableChecklist(index, property, value) {
    if (checklistData[currentChecklistSection] && checklistData[currentChecklistSection][index]) {
        checklistData[currentChecklistSection][index][property] = value;
        console.log('Updated checklist data:', checklistData);
    }
}

function printEditableChecklist() {
    window.print();
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('editable-checklist-body')) {
            renderEditableChecklist();
        }
    });
} else {
    if (document.getElementById('editable-checklist-body')) {
        renderEditableChecklist();
    }
}