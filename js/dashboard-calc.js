// dashboard-calc.js
// Handles all calculations and reactivity for the Construction CRM Dashboard

// --- Module 1: Rate Analysis ---
function addMaterialRow() {
    const tbody = document.getElementById('materials-body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" placeholder="Material"></td>
        <td><input type="number" min="0" value="0" onchange="updateAll()"></td>
        <td><input type="number" min="0" value="0" onchange="updateAll()"></td>
        <td class="amount">0</td>
    `;
    tbody.appendChild(row);
}

function addLabourRow() {
    const tbody = document.getElementById('labour-body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" placeholder="Type"></td>
        <td><input type="number" min="0" value="0" onchange="updateAll()"></td>
        <td><input type="number" min="0" value="0" onchange="updateAll()"></td>
        <td class="amount">0</td>
    `;
    tbody.appendChild(row);
}

function addMilestoneRow() {
    const tbody = document.getElementById('milestone-body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" placeholder="Stage"></td>
        <td><input type="number" min="0" max="100" value="0" onchange="updateAll()"></td>
        <td class="milestone-amount">0</td>
    `;
    tbody.appendChild(row);
}

function getTableSum(tbodyId) {
    const tbody = document.getElementById(tbodyId);
    let sum = 0;
    for (const row of tbody.rows) {
        const qty = parseFloat(row.cells[1].querySelector('input').value) || 0;
        const rate = parseFloat(row.cells[2].querySelector('input').value) || 0;
        const amount = qty * rate;
        row.cells[3].textContent = amount.toFixed(2);
        sum += amount;
    }
    return sum;
}


function updateAll() {
    // Materials
    const materialCost = getTableSum('materials-body');
    // Labour
    const labourCost = getTableSum('labour-body');
    // Machine Charges
    const machineCharges = parseFloat(document.getElementById('machine-charges').value) || 0;
    // Direct Net
    const directNet = materialCost + labourCost + machineCharges;
    document.getElementById('direct-net').textContent = directNet.toFixed(2);
    // Contingencies (3%)
    const contingencies = 0.03 * directNet;
    document.getElementById('contingencies').textContent = contingencies.toFixed(2);
    // Water & Electricity (1% of subtotal)
    const subtotal1 = directNet + contingencies;
    const waterElectricity = 0.01 * subtotal1;
    document.getElementById('water-electricity').textContent = waterElectricity.toFixed(2);
    // Contractor Profit (10% of subtotal)
    const subtotal2 = subtotal1 + waterElectricity;
    const contractorProfit = 0.10 * subtotal2;
    document.getElementById('contractor-profit').textContent = contractorProfit.toFixed(2);
    // Final Unit Rate
    const finalUnitRate = subtotal2 + contractorProfit;
    document.getElementById('final-unit-rate').textContent = finalUnitRate.toFixed(2);
    // Area (SQFT)
    const area = parseFloat(document.getElementById('area-sqft').value) || 0;
    // Project Total (Gross)
    const projectTotal = area * finalUnitRate;
    document.getElementById('project-total').textContent = projectTotal.toFixed(2);
    // TDS (1%)
    const tds = 0.01 * projectTotal;
    document.getElementById('tds').textContent = tds.toFixed(2);
    // Net Project Value
    const netProjectValue = projectTotal - tds;
    document.getElementById('net-project-value').textContent = netProjectValue.toFixed(2);
    // Milestones (now based on Net Project Value)
    const milestoneTbody = document.getElementById('milestone-body');
    let percentSum = 0;
    for (const row of milestoneTbody.rows) {
        const percent = parseFloat(row.cells[1].querySelector('input').value) || 0;
        percentSum += percent;
        const amount = (percent / 100) * netProjectValue;
        row.cells[2].textContent = amount.toFixed(2);
    }
    // Validation for 100% stage sum
    let indicator = document.getElementById('percent-indicator');
    if (!indicator) {
        indicator = document.createElement('span');
        indicator.id = 'percent-indicator';
        indicator.style.marginLeft = '16px';
        document.getElementById('module-milestones').querySelector('h2').appendChild(indicator);
    }
    if (Math.abs(percentSum - 100) < 0.01) {
        indicator.innerHTML = '<span style="color:green;font-size:1.5em;vertical-align:middle;">&#10003; 100%</span>';
    } else {
        indicator.innerHTML = '<span style="color:red;font-size:1.2em;vertical-align:middle;">' + percentSum.toFixed(2) + '%</span>';
    }
}

// Initial rows for demo
window.onload = function() {
    for (let i = 0; i < 3; i++) addMaterialRow();
    for (let i = 0; i < 2; i++) addLabourRow();
    addMilestoneRow();
    updateAll();
};
