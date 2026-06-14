const database = {
    "Class 11th": {
        "Physics": {
            "Kinematics": ["Motion in 1D", "Motion in 2D", "Relative Velocity"],
            "Laws of Motion": ["Newton's First Law", "Friction", "Circular Motion"]
        },
        "Chemistry": {
            "Atomic Structure": ["Bohr Model", "Quantum Numbers", "Electronic Configuration"],
            "Thermodynamics": ["First Law", "Second Law", "Enthalpy"]
        },
        "Maths": {
            "Circles": ["Perimeter", "Area", "Diagonal"],
            "Lines": ["Straight Lines", "Pair of Straight Lines", "Slope"],
            "Planes": ["3D Geometry", "Equation of Plane", "Distance from Point"]
        },
        "Biology": {
            "Cell Biology": ["Cell Structure", "Mitosis", "Meiosis"],
            "Human Physiology": ["Digestion", "Respiration", "Circulation"]
        }
    },
    "Class 12th": {
        "Physics": {
            "Electrostatics": ["Coulomb's Law", "Electric Field", "Gauss's Law"],
            "Optics": ["Reflection", "Refraction", "Wave Optics"]
        },
        "Chemistry": {
            "Electrochemistry": ["Galvanic Cells", "Nernst Equation", "Electrolysis"],
            "Kinetics": ["Rate of Reaction", "Order of Reaction", "Activation Energy"]
        },
        "Maths": {
            "Calculus": ["Limits", "Derivatives", "Integration"],
            "Algebra": ["Matrices", "Determinants", "Probability"]
        },
        "Biology": {
            "Genetics": ["Mendelian Inheritance", "DNA Structure", "Evolution"],
            "Ecology": ["Ecosystems", "Biodiversity", "Environmental Issues"]
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Views
    const landingView = document.getElementById('landing-view');
    const selectionView = document.getElementById('selection-view');
    
    // Buttons
    const startBtn = document.getElementById('start-btn');
    const backBtn = document.getElementById('back-btn');
    const goBtn = document.getElementById('go-btn');
    
    // Selects
    const classSelect = document.getElementById('class-select');
    const subjectSelect = document.getElementById('subject-select');
    const topicSelect = document.getElementById('topic-select');
    const subtopicSelect = document.getElementById('subtopic-select');

    // Navigation
    startBtn.addEventListener('click', () => {
        landingView.classList.remove('active');
        selectionView.classList.add('active');
    });

    backBtn.addEventListener('click', () => {
        selectionView.classList.remove('active');
        landingView.classList.add('active');
        resetSelections();
    });

    // Populate Initial Classes
    function populateClasses() {
        classSelect.innerHTML = '<option value="" disabled selected>Select Class</option>';
        Object.keys(database).forEach(className => {
            const option = document.createElement('option');
            option.value = className;
            option.textContent = className;
            classSelect.appendChild(option);
        });
    }

    // Reset Functions
    function resetSelect(selectElement, defaultText) {
        selectElement.innerHTML = `<option value="" disabled selected>${defaultText}</option>`;
        selectElement.disabled = true;
    }

    function resetSelections() {
        classSelect.value = "";
        resetSelect(subjectSelect, 'Select Subject');
        resetSelect(topicSelect, 'Select Topic');
        resetSelect(subtopicSelect, 'Select Subtopic');
        goBtn.disabled = true;
    }

    // Event Listeners for Selects
    classSelect.addEventListener('change', (e) => {
        const selectedClass = e.target.value;
        
        // Reset downward
        resetSelect(topicSelect, 'Select Topic');
        resetSelect(subtopicSelect, 'Select Subtopic');
        goBtn.disabled = true;

        if (selectedClass && database[selectedClass]) {
            subjectSelect.innerHTML = '<option value="" disabled selected>Select Subject</option>';
            Object.keys(database[selectedClass]).forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                subjectSelect.appendChild(option);
            });
            subjectSelect.disabled = false;
        }
    });

    subjectSelect.addEventListener('change', (e) => {
        const selectedClass = classSelect.value;
        const selectedSubject = e.target.value;
        
        // Reset downward
        resetSelect(subtopicSelect, 'Select Subtopic');
        goBtn.disabled = true;

        if (selectedSubject && database[selectedClass][selectedSubject]) {
            topicSelect.innerHTML = '<option value="" disabled selected>Select Topic</option>';
            Object.keys(database[selectedClass][selectedSubject]).forEach(topic => {
                const option = document.createElement('option');
                option.value = topic;
                option.textContent = topic;
                topicSelect.appendChild(option);
            });
            topicSelect.disabled = false;
        }
    });

    topicSelect.addEventListener('change', (e) => {
        const selectedClass = classSelect.value;
        const selectedSubject = subjectSelect.value;
        const selectedTopic = e.target.value;
        
        goBtn.disabled = true;

        if (selectedTopic && database[selectedClass][selectedSubject][selectedTopic]) {
            subtopicSelect.innerHTML = '<option value="" disabled selected>Select Subtopic</option>';
            database[selectedClass][selectedSubject][selectedTopic].forEach(subtopic => {
                const option = document.createElement('option');
                option.value = subtopic;
                option.textContent = subtopic;
                subtopicSelect.appendChild(option);
            });
            subtopicSelect.disabled = false;
        }
    });

    subtopicSelect.addEventListener('change', () => {
        if (subtopicSelect.value) {
            goBtn.disabled = false;
        } else {
            goBtn.disabled = true;
        }
    });

    goBtn.addEventListener('click', () => {
        alert(`Mind Map Ready!\n\nClass: ${classSelect.value}\nSubject: ${subjectSelect.value}\nTopic: ${topicSelect.value}\nSubtopic: ${subtopicSelect.value}`);
    });

    // Initialize
    populateClasses();
});
