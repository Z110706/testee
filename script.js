document.addEventListener('DOMContentLoaded', () => {
    const saltData = [
      {
        "name": "Sodium Chloride",
        "formula": "NaCl",
        "color": "Colorless or White",
        "solubility_in_water": "Soluble"
      },
      {
        "name": "Magnesium Sulfate",
        "formula": "MgSO4",
        "color": "Colorless or White",
        "solubility_in_water": "Soluble"
      },
      {
        "name": "Ammonium Chloride",
        "formula": "NH4Cl",
        "color": "White",
        "solubility_in_water": "Soluble"
      },
      {
        "name": "Magnesium Chloride",
        "formula": "MgCl2",
        "color": "White",
        "solubility_in_water": "Soluble"
      },
      {
        "name": "Sodium Sulfate",
        "formula": "Na2SO4",
        "color": "White",
        "solubility_in_water": "Soluble"
      },
      {
        "name": "Potassium Nitrate",
        "formula": "KNO3",
        "color": "White",
        "solubility_in_water": "Soluble"
      },
      {
        "name": "Sodium Carbonate",
        "formula": "Na2CO3",
        "color": "White",
        "solubility_in_water": "Soluble"
      },
      {
        "name": "Potassium Carbonate",
        "formula": "K2CO3",
        "color": "White",
        "solubility_in_water": "Soluble"
      },
      {
        "name": "Ammonium Carbonate",
        "formula": "(NH4)2CO3",
        "color": "White",
        "solubility_in_water": "Soluble"
      },
      {
        "name": "Barium Sulfate",
        "formula": "BaSO4",
        "color": "White",
        "solubility_in_water": "Insoluble"
      },
      {
        "name": "Calcium Sulfate",
        "formula": "CaSO4",
        "color": "White",
        "solubility_in_water": "Slightly Soluble"
      },
      {
        "name": "Lead(II) Sulfate",
        "formula": "PbSO4",
        "color": "White",
        "solubility_in_water": "Insoluble"
      },
      {
        "name": "Sodium Acetate",
        "formula": "CH3COONa",
        "color": "White",
        "solubility_in_water": "Soluble"
      },
      {
        "name": "Copper(II) Sulfate Pentahydrate",
        "formula": "CuSO4·5H2O",
        "color": "Blue",
        "solubility_in_water": "Soluble"
      },
      {
        "name": "Potassium Permanganate",
        "formula": "KMnO4",
        "color": "Violet",
        "solubility_in_water": "Soluble"
      }
    ];

    let currentSalt = null;

    const saltNameElement = document.querySelector('.salt-name');
    const saltFormulaElement = document.querySelector('.salt-formula');
    const colorOptions = document.querySelectorAll('input[name="color"]');
    const solubilityOptions = document.querySelectorAll('input[name="solubility"]');
    const checkAnswerBtn = document.getElementById('check-answer-btn');
    const feedbackArea = document.getElementById('feedback-area');

    function getRandomSalt() {
        const randomIndex = Math.floor(Math.random() * saltData.length);
        return saltData[randomIndex];
    }

    function displaySalt(salt) {
        currentSalt = salt;
        saltNameElement.textContent = salt.name;
        saltFormulaElement.textContent = salt.formula;
        clearSelections();
        clearFeedback();
    }

    function clearSelections() {
        colorOptions.forEach(option => option.checked = false);
        solubilityOptions.forEach(option => option.checked = false);
    }

    function clearFeedback() {
        feedbackArea.textContent = '';
        feedbackArea.className = 'feedback-area'; // Reset class
    }

    function getSelectedValue(radioButtons) {
        for (const button of radioButtons) {
            if (button.checked) {
                return button.value;
            }
        }
        return null;
    }

    function checkAnswer() {
        if (!currentSalt) return;

        const selectedColor = getSelectedValue(colorOptions);
        const selectedSolubility = getSelectedValue(solubilityOptions);

        if (!selectedColor || !selectedSolubility) {
            feedbackArea.textContent = 'Please select both color and solubility.';
            feedbackArea.className = 'feedback-area incorrect';
            return;
        }

        const isColorCorrect = selectedColor === currentSalt.color || (selectedColor === "Colorless or White" && currentSalt.color === "Colorless or White");
        const isSolubilityCorrect = selectedSolubility === currentSalt.solubility_in_water;

        if (isColorCorrect && isSolubilityCorrect) {
            feedbackArea.textContent = 'Correct!';
            feedbackArea.className = 'feedback-area correct';
        } else {
            let feedbackMessage = 'Incorrect. ';
            if (!isColorCorrect) {
                feedbackMessage += `Correct color is ${currentSalt.color}. `;
            }
            if (!isSolubilityCorrect) {
                feedbackMessage += `Correct solubility is ${currentSalt.solubility_in_water}.`;
            }
            feedbackArea.textContent = feedbackMessage.trim();
            feedbackArea.className = 'feedback-area incorrect';
        }

        // Load next salt automatically after a short delay
        setTimeout(() => {
            displaySalt(getRandomSalt());
        }, 2000); // 2-second delay
    }

    checkAnswerBtn.addEventListener('click', checkAnswer);

    // Initial load
    displaySalt(getRandomSalt());
});
