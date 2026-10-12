// --- ELEMEN DOM ---
const brocaForm = document.getElementById("broca-form");
const heightInput = document.getElementById("height-input");
const currentWeightInput = document.getElementById("current-weight");

const resultCard = document.getElementById("result-card");
const idealWeightDisplay = document.getElementById("ideal-weight-display");
const weightRangeDisplay = document.getElementById("weight-range-display");
const statusBox = document.getElementById("status-box");
const statusText = document.getElementById("status-text");

// --- PERHITUNGAN RUMUS BROCA ---
brocaForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const height = parseFloat(heightInput.value);
    const currentWeight = parseFloat(currentWeightInput.value);
    const gender = document.querySelector('input[name="gender"]:checked').value;

    if (isNaN(height) || height < 100) {
        alert("Harap masukkan tinggi badan yang valid (minimal 100 cm)!");
        return;
    }

    // Rumus Broca:
    // Pria: (Tinggi - 100) - ((Tinggi - 100) * 10%)
    // Wanita: (Tinggi - 100) - ((Tinggi - 100) * 15%)
    const baseWeight = height - 100;
    const deductionFactor = gender === "male" ? 0.10 : 0.15;
    const idealWeight = baseWeight - (baseWeight * deductionFactor);

    // Rentang Sehat ±10% dari Ideal Broca
    const minRange = idealWeight * 0.9;
    const maxRange = idealWeight * 1.1;

    // Tampilkan Hasil
    idealWeightDisplay.textContent = `${idealWeight.toFixed(1)} kg`;
    weightRangeDisplay.textContent = `${minRange.toFixed(1)} kg - ${maxRange.toFixed(1)} kg`;

    // Evaluasi Berat Saat Ini jika diisi
    if (!isNaN(currentWeight) && currentWeight > 0) {
        let status = "";
        if (currentWeight < minRange) {
            status = "💡 Berat badanmu berada di bawah kisaran ideal Broca.";
        } else if (currentWeight > maxRange) {
            status = "⚠️ Berat badanmu di atas kisaran ideal Broca.";
        } else {
            status = "🎉 Mantap! Berat badanmu berada dalam rentang ideal Broca!";
        }
        statusText.textContent = status;
        statusBox.classList.remove("hidden");
    } else {
        statusBox.classList.add("hidden");
    }

    resultCard.classList.remove("hidden");
});
