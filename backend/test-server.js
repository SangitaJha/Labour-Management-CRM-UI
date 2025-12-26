const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

app.get('/api/attendance', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        attendance_date: '2024-12-21',
        labour: { labour_name: 'Test Worker', work_type: 'Mason' },
        in_time: '08:00 AM',
        out_time: '05:00 PM',
        total_hours: 9,
        ot_hours: 1,
        wage_per_day: 800,
        materials_cost: 250,
        total_payable: 950,
        work_details: { description: 'Wall Construction', area: 'Building A', units: '50 sq.ft', remarks: 'Quality work' },
        material_details: [{ name: 'Cement', qty: 2, unit: 'bags', cost: 150 }],
        workflow_status: 'draft',
        payment_status: 'pending'
      }
    ]
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✓ Test server running on http://localhost:${PORT}`);
});

process.stdin.resume();
