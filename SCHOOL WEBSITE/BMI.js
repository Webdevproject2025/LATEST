let studentBmiData = []; 
const BMI_STORAGE_KEY = 'studentBMIList'; 

function calculateBMI() {
    const studentNameInput = document.getElementById('student-name');
    const heightInput = document.getElementById('height-cm');
    const weightInput = document.getElementById('weight-kg');
    const bmiValueDisplay = document.getElementById('bmi-value');
    const bmiCategoryDisplay = document.getElementById('bmi-category');

    const name = studentNameInput.value.trim();
    const heightCm = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);

    if (name && !isNaN(heightCm) && !isNaN(weightKg) && heightCm > 0 && weightKg > 0) {
        const heightM = heightCm / 100;
        const bmi = weightKg / (heightM * heightM);
        const roundedBmi = bmi.toFixed(2);

        let category = '';
        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal weight';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
        } else {
            category = 'Obese';
        }

        bmiValueDisplay.textContent = roundedBmi;
        bmiCategoryDisplay.textContent = `Category: ${category}`;

        studentBmiData.push({ name: name, height: heightCm, weight: weightKg, bmi: roundedBmi, category: category });
        renderBMIList();
        saveBMIData(); 

        studentNameInput.value = '';
        heightInput.value = '';
        weightInput.value = '';
    } else {
        alert('Please enter valid student name, height (in cm), and weight (in kg).');
    }
}

function renderBMIList() {
    const bmiBody = document.getElementById('bmi-body');

    if (!bmiBody) {
        console.error("Hindi natagpuan ang bmi body!");
        return;
    }

    bmiBody.innerHTML = '';

    studentBmiData.forEach(data => {
        const row = bmiBody.insertRow();
        row.insertCell().textContent = data.name;
        row.insertCell().textContent = data.height;
        row.insertCell().textContent = data.weight;
        row.insertCell().textContent = data.bmi;
        row.insertCell().textContent = data.category;
    });

    if (studentBmiData.length === 0 && bmiBody.rows.length === 0) {
        const emptyRow = bmiBody.insertRow();
        const emptyCell = emptyRow.insertCell();
        emptyCell.colSpan = 5;
        emptyCell.textContent = 'No student BMI data yet.';
        emptyCell.style.textAlign = 'center';
    }
}

function printBMIList() {
    window.print();
}

function saveBMIData() {
    try {
        localStorage.setItem(BMI_STORAGE_KEY, JSON.stringify(studentBmiData));
        alert('BMI data saved successfully!');
    } catch (error) {
        console.error('Error saving BMI data:', error);
        alert('Failed to save BMI data.');
    }
}

function loadBMIData() {
    try {
        const storedData = localStorage.getItem(BMI_STORAGE_KEY);
        if (storedData) {
            studentBmiData = JSON.parse(storedData);
            renderBMIList();
            alert('BMI data loaded successfully!');
        } else {
            alert('No saved BMI data found.');
        }
    } catch (error) {
        console.error('Error loading BMI data:', error);
        alert('Failed to load BMI data.');
    }
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('bmi-body')) {
            loadBMIData();
            renderBMIList(); 
        }
    });
} else {
    if (document.getElementById('bmi-body')) {
        loadBMIData();
        renderBMIList();
    }
}