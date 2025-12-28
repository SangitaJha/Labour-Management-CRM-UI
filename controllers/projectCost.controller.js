// Labour Project Cost Calculation Controller (Demo Mode)

exports.calculateProjectCost = (req, res) => {
  // Accepts JSON body with: total_sqft, rate_per_sqft, tds_percentage, milestones[]
  const { total_sqft, rate_per_sqft, tds_percentage, milestones } = req.body;
  if (!total_sqft || !rate_per_sqft || !tds_percentage || !Array.isArray(milestones)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // 1. Gross Total
  const gross_total = total_sqft * rate_per_sqft;
  // 2. TDS Amount
  const tds_amount = gross_total * (tds_percentage / 100);
  // 3. Net Project Value
  const net_total = parseFloat((gross_total - tds_amount).toFixed(2));

  // 4. Calculate milestones
  let percent_sum = 0;
  let amount_sum = 0;
  const milestonesOut = milestones.map(m => {
    percent_sum += m.percent;
    const amount = parseFloat((net_total * (m.percent / 100)).toFixed(2));
    amount_sum += amount;
    return { ...m, calculated_amount: amount };
  });

  // 5. Validation
  const percentValid = Math.abs(percent_sum - 100) < 0.01;
  const amountValid = Math.abs(amount_sum - net_total) < 1;

  res.json({
    project_metadata: {
      sqft: total_sqft,
      rate: rate_per_sqft,
      tds_percent: tds_percentage,
      gross_total,
      tds_amount,
      net_total
    },
    milestones: milestonesOut,
    validation: {
      percent_sum,
      amount_sum,
      percentValid,
      amountValid
    }
  });
};
