function printStudentCards() {
    const printContents = document.querySelector('.student-cards-container').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Student Cards</title>');
    printWindow.document.write('<style>body{font-family:sans-serif;} .student-card{border:1px solid #ccc;padding:10px;margin:10px;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}

function exportData() {
    const students = document.querySelectorAll('.student-card');
    const data = [];

    students.forEach((card, index) => {
        const lrn = card.querySelector('.lrn-value').textContent;
        const lastName = card.querySelector('.last-name-value').textContent;
        const firstName = card.querySelector('.first-name-value').textContent;
        const middleName = card.querySelector('.middle-name-value').textContent;
        const section = card.querySelector('.section-tag').textContent;
        const adviser = card.querySelector('.card-footer').textContent.split('\n')[0];

        data.push([index + 1, lrn, lastName, firstName, middleName, section, adviser]);
    });

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "No,LRN,Last Name,First Name,Middle Name,Section,Adviser\n";
    data.forEach(row => {
        csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function addStudent() {
    const container = document.querySelector('.student-cards-container');
    const newId = document.querySelectorAll('.student-card').length + 1;

    const studentCardHTML = `
        <div class="student-card" data-student-id="${newId}">
            <div class="card-header">
                <span class="lrn-display">#N/A</span>
                <span class="edit-button" onclick="editStudentCard(this.closest('.student-card'), '', '', '', '#N/A', '', '')">✏️</span>
                <span class="close-button" onclick="removeStudentCard(this.closest('.student-card'))">X</span>
            </div>
            <div class="card-content">
                <div class="full-name"></div>
                <div class="section-tag"></div>
                <div class="info"><div class="label">LRN</div><div class="value lrn-value"></div></div>
                <div class="info"><div class="label">Last Name</div><div class="value last-name-value"></div></div>
                <div class="info"><div class="label">First Name</div><div class="value first-name-value"></div></div>
                <div class="info"><div class="label">Middle Name</div><div class="value middle-name-value"></div></div>
            </div>
            <div class="card-footer"><br>ADVISER</div>
            <div class="edit-actions">
                <button class="save-button" onclick="saveStudentData(this.closest('.student-card'))">💾 Save</button>
                <button class="cancel-button" onclick="cancelEdit(this.closest('.student-card'))">✖ Cancel</button>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', studentCardHTML);
    // Initially hide the edit actions for the new card
    const newCardEditActions = container.lastElementChild.querySelector('.edit-actions');
    if (newCardEditActions) {
        newCardEditActions.style.display = 'none';
    }
}

function editStudentCard(card, lastName, firstName, middleName, lrn, section, adviser) {
    // Get current values from the card if they exist
    if (!lastName && card.querySelector('.last-name-value')) {
        lastName = card.querySelector('.last-name-value').textContent || '';
    }
    if (!firstName && card.querySelector('.first-name-value')) {
        firstName = card.querySelector('.first-name-value').textContent || '';
    }
    if (!middleName && card.querySelector('.middle-name-value')) {
        middleName = card.querySelector('.middle-name-value').textContent || '';
    }
    if (!lrn && card.querySelector('.lrn-value')) {
        lrn = card.querySelector('.lrn-value').textContent || '#N/A';
    }
    if (!section && card.querySelector('.section-tag')) {
        section = card.querySelector('.section-tag').textContent || '';
    }
    
    // Save original data in attributes
    card.dataset.originalLrn = lrn;
    card.dataset.originalLastName = lastName;
    card.dataset.originalFirstName = firstName;
    card.dataset.originalMiddleName = middleName;
    card.dataset.originalSection = section;
    
    // Hide display elements
    card.querySelector('.lrn-display').style.display = 'none';
    card.querySelector('.full-name').style.display = 'none';
    const sectionTag = card.querySelector('.section-tag');
    if (sectionTag) {
        sectionTag.style.display = 'none';
    }
    card.querySelectorAll('.info').forEach(info => {
        info.style.display = 'none';
    });
    card.querySelector('.card-footer').style.display = 'none';
    
    // Remove existing edit fields if any
    const existingEditFields = card.querySelector('.edit-fields');
    if (existingEditFields) {
        existingEditFields.remove();
    }
    
    // Create and insert input fields
    const cardContent = card.querySelector('.card-content');
    cardContent.insertAdjacentHTML('afterbegin', `
        <div class="edit-fields">
            <div class="info"><label>LRN</label><input type="text" name="lrn" value="${lrn}"></div>
            <div class="info"><label>Last Name</label><input type="text" name="lastName" value="${lastName}"></div>
            <div class="info"><label>First Name</label><input type="text" name="firstName" value="${firstName}"></div>
            <div class="info"><label>Middle Name</label><input type="text" name="middleName" value="${middleName}"></div>
            <div class="info"><label>Section</label><input type="text" name="section" value="${section}"></div>
        </div>
    `);
    
    // Show the edit actions
    card.querySelector('.edit-actions').style.display = 'flex';
}

function saveStudentData(card) {
    const editFields = card.querySelector('.edit-fields');
    const lrnInput = editFields.querySelector('input[name="lrn"]');
    const lastNameInput = editFields.querySelector('input[name="lastName"]');
    const firstNameInput = editFields.querySelector('input[name="firstName"]');
    const middleNameInput = editFields.querySelector('input[name="middleName"]');
    const sectionInput = editFields.querySelector('input[name="section"]');
    
    // Store the values from inputs
    const lrnValue = lrnInput.value;
    const lastNameValue = lastNameInput.value;
    const firstNameValue = firstNameInput.value;
    const middleNameValue = middleNameInput.value;
    const sectionValue = sectionInput.value;
    
    // Update the displayed values on the card
    card.querySelector('.lrn-display').textContent = lrnValue;
    
    // Update the full name with proper formatting - only if values exist
    const fullNameElement = card.querySelector('.full-name');
    const formattedName = [firstNameValue, middleNameValue, lastNameValue].filter(Boolean).join(' ');
    fullNameElement.textContent = formattedName || '';
    
    // Update individual value fields
    card.querySelector('.lrn-value').textContent = lrnValue;
    card.querySelector('.last-name-value').textContent = lastNameValue;
    card.querySelector('.first-name-value').textContent = firstNameValue;
    card.querySelector('.middle-name-value').textContent = middleNameValue;
    
    // Update section tag
    let sectionTag = card.querySelector('.section-tag');
    if (sectionTag) {
        sectionTag.textContent = sectionValue;
        sectionTag.style.display = sectionValue ? '' : 'none';
    } else if (sectionValue) {
        const cardContent = card.querySelector('.card-content');
        cardContent.insertAdjacentHTML('afterbegin', `<div class="section-tag">${sectionValue}</div>`);
    }
    
    // Show display elements
    card.querySelector('.lrn-display').style.display = '';
    fullNameElement.style.display = '';
    card.querySelectorAll('.info').forEach(info => {
        info.style.display = '';
    });
    card.querySelector('.card-footer').style.display = '';
    
    // Remove input fields
    editFields.remove();
    
    // Hide the edit actions
    card.querySelector('.edit-actions').style.display = 'none';
    
    // Debug - log to console to verify data is being set
    console.log("Saved student data:", {
        lrn: lrnValue,
        lastName: lastNameValue,
        firstName: firstNameValue,
        middleName: middleNameValue,
        section: sectionValue
    });
}

function cancelEdit(card) {
    // Get original data from attributes
    const originalLrn = card.dataset.originalLrn || '#N/A';
    const originalLast = card.dataset.originalLastName || '';
    const originalFirst = card.dataset.originalFirstName || '';
    const originalMiddle = card.dataset.originalMiddleName || '';
    const originalSection = card.dataset.originalSection || ''; // Kunin ang original section

    // Revert the input fields (if they exist)
    const lrnInput = card.querySelector('input[name="lrn"]');
    const lastNameInput = card.querySelector('input[name="lastName"]');
    const firstNameInput = card.querySelector('input[name="firstName"]');
    const middleNameInput = card.querySelector('input[name="middleName"]');
    const sectionInput = card.querySelector('input[name="section"]'); // Kunin ang section input

    if (lrnInput) lrnInput.value = originalLrn;
    if (lastNameInput) lastNameInput.value = originalLast;
    if (firstNameInput) firstNameInput.value = originalFirst;
    if (middleNameInput) middleNameInput.value = originalMiddle;
    if (sectionInput) sectionInput.value = originalSection; // Ibalik ang original section

    // Show display elements
    card.querySelector('.lrn-display').style.display = '';
    card.querySelector('.full-name').style.display = '';
    let sectionTag = card.querySelector('.section-tag');
    if (originalSection) {
        if (sectionTag) {
            sectionTag.textContent = originalSection;
            sectionTag.style.display = '';
        } else {
            const cardContent = card.querySelector('.card-content');
            cardContent.insertAdjacentHTML('afterbegin', `<div class="section-tag">${originalSection}</div>`);
        }
    } else if (sectionTag) {
        sectionTag.style.display = 'none';
    }
    card.querySelectorAll('.info').forEach(info => {
        info.style.display = '';
    });
    card.querySelector('.card-footer').style.display = '';

    // Remove input fields
    const editFields = card.querySelector('.edit-fields');
    if (editFields) {
        editFields.remove();
    }

    // Hide the edit actions
    card.querySelector('.edit-actions').style.display = 'none';
}

function removeStudentCard(card) {
    if (confirm('Are you sure you want to remove this student card?')) {
        card.remove();
    }
}