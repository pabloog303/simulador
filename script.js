function calculateMortgage() {
    const propertyValue = parseFloat(document.getElementById('property-value').value);
    const downPayment = parseFloat(document.getElementById('down-payment').value);
    const loanTerm = parseInt(document.querySelector('input[name="loan-term"]:checked').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;

    const loanAmount = propertyValue - downPayment;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -numberOfPayments));

    document.getElementById('monthly-payment').textContent = `Pago mensual: ${monthlyPayment.toFixed(2)} USD`;
}
