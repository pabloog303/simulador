function calculateMortgage() {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const downPayment = parseFloat(document.getElementById('down-payment').value);
    const totalLoanAmount = loanAmount - downPayment;

    const loanTerm = parseInt(document.getElementById('loan-term').value);
    const termUnit = document.getElementById('term-unit').value;
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;

    let numberOfPayments;

    switch (termUnit) {
        case 'meses':
            numberOfPayments = loanTerm;
            break;
        case 'años':
            numberOfPayments = loanTerm * 12;
            break;
        case 'trimestres':
            numberOfPayments = loanTerm * 3;
            break;
        case 'semestres':
            numberOfPayments = loanTerm * 6;
            break;
        case 'cuatrimestres':
            numberOfPayments = loanTerm * 4;
            break;
        default:
            numberOfPayments = loanTerm;
    }

    const monthlyPayment = (totalLoanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -numberOfPayments));

    document.getElementById('monthly-payment').textContent = `Pago mensual: ${monthlyPayment.toFixed(2)} USD`;

    // Generar tabla de amortización
    const amortizationSchedule = document.querySelector('#amortization-schedule tbody');
    amortizationSchedule.innerHTML = '';

    let balance = totalLoanAmount;
    for (let i = 1; i <= numberOfPayments; i++) {
        const interestPayment = balance * interestRate;
        const principalPayment = monthlyPayment - interestPayment;
        balance -= principalPayment;

        const row = amortizationSchedule.insertRow();
        row.insertCell(0).textContent = i;
        row.insertCell(1).textContent = principalPayment.toFixed(2);
        row.insertCell(2).textContent = interestPayment.toFixed(2);
        row.insertCell(3).textContent = monthlyPayment.toFixed(2);
        row.insertCell(4).textContent = balance.toFixed(2);
    }
}
