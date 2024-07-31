function calculateInterest() {
    // Obtener los valores del formulario
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    const time = parseFloat(document.getElementById('time').value);
    const frequency = parseInt(document.getElementById('compound-frequency').value);

    // Calcular el interés simple
    const simpleInterest = principal * rate * time;

    // Calcular el interés compuesto
    const compoundInterest = principal * Math.pow((1 + rate / frequency), frequency * time) - principal;

    // Mostrar los resultados
    document.getElementById('simple-interest').textContent = `Interés Simple: $${simpleInterest.toFixed(2)}`;
    document.getElementById('compound-interest').textContent = `Interés Compuesto: $${compoundInterest.toFixed(2)}`;
}
