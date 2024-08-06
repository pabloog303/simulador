function calcularCredito() {
    const tipoCredito = document.getElementById('tipo-credito').value;
    const montoSolicitado = parseFloat(document.getElementById('monto-solicitado').value);
    const pagoInicial = parseFloat(document.getElementById('pago-inicial').value);
    const montoTotalCredito = montoSolicitado - pagoInicial;

    const plazo = parseInt(document.getElementById('plazo').value);
    const unidadPlazo = document.getElementById('unidad-plazo').value;
    const tasaInteres = parseFloat(document.getElementById('tasa-interes').value) / 100 / 12;

    let numeroPagos;

    switch (unidadPlazo) {
        case 'meses':
            numeroPagos = plazo;
            break;
        case 'años':
            numeroPagos = plazo * 12;
            break;
        case 'trimestres':
            numeroPagos = plazo * 3;
            break;
        case 'semestres':
            numeroPagos = plazo * 6;
            break;
        case 'cuatrimestres':
            numeroPagos = plazo * 4;
            break;
        default:
            numeroPagos = plazo;
    }

    const pagoMensual = (montoTotalCredito * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -numeroPagos));

    document.getElementById('pago-mensual').textContent = `Pago mensual: ${pagoMensual.toFixed(2)}`;

    // TABLOIDE SIUUUUUUUUUUU
    const tablaAmortizacion = document.querySelector('#tabla-amortizacion tbody');
    tablaAmortizacion.innerHTML = '';

    let saldo = montoTotalCredito;
    let totalPrincipal = 0;
    let totalInteres = 0;
    let totalPago = 0;

    for (let i = 1; i <= numeroPagos; i++) {
        const pagoInteres = saldo * tasaInteres;
        const pagoPrincipal = pagoMensual - pagoInteres;
        saldo -= pagoPrincipal;

        const fila = tablaAmortizacion.insertRow();
        fila.insertCell(0).textContent = i;
        fila.insertCell(1).textContent = pagoPrincipal.toFixed(2);
        fila.insertCell(2).textContent = pagoInteres.toFixed(2);
        fila.insertCell(3).textContent = pagoMensual.toFixed(2);
        fila.insertCell(4).textContent = saldo.toFixed(2);

        totalPrincipal += pagoPrincipal;
        totalInteres += pagoInteres;
        totalPago += pagoMensual;
    }

    // Insertar fila de totales
    const filaTotales = tablaAmortizacion.insertRow();
    filaTotales.insertCell(0).textContent = 'Totales';
    filaTotales.insertCell(1).textContent = totalPrincipal.toFixed(2);
    filaTotales.insertCell(2).textContent = totalInteres.toFixed(2);
    filaTotales.insertCell(3).textContent = totalPago.toFixed(2);
    filaTotales.insertCell(4).textContent = ''; // Dejar en blanco
}
