/**
 * Spadeworks Automation - Corporate Finance ROI Engine
 * Calculates labor savings, close time reduction, and audit risk mitigation.
 */

function initRoiCalculator() {
  const volumeSlider = document.getElementById('calc-volume');
  const teamSlider = document.getElementById('calc-team');
  const closeDaysSlider = document.getElementById('calc-close-days');
  const salarySlider = document.getElementById('calc-salary');

  const volumeDisplay = document.getElementById('calc-volume-val');
  const teamDisplay = document.getElementById('calc-team-val');
  const closeDaysDisplay = document.getElementById('calc-close-days-val');
  const salaryDisplay = document.getElementById('calc-salary-val');

  const annualSavingsEl = document.getElementById('res-annual-savings');
  const hoursSavedEl = document.getElementById('res-hours-saved');
  const newCloseCycleEl = document.getElementById('res-new-close');
  const roiPercentEl = document.getElementById('res-roi-percent');

  if (!volumeSlider || !annualSavingsEl) return;

  function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
  }

  function formatCurrency(num) {
    return '$' + new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(num);
  }

  function calculate() {
    const volume = parseInt(volumeSlider.value, 10);
    const team = parseInt(teamSlider.value, 10);
    const closeDays = parseInt(closeDaysSlider.value, 10);
    const salary = parseInt(salarySlider.value, 10);

    // Update label displays
    if (volumeDisplay) volumeDisplay.textContent = formatNumber(volume);
    if (teamDisplay) teamDisplay.textContent = team + (team === 1 ? ' person' : ' people');
    if (closeDaysDisplay) closeDaysDisplay.textContent = closeDays + ' days';
    if (salaryDisplay) salaryDisplay.textContent = formatCurrency(salary);

    // Industry benchmark calculation:
    // Manual processing time: 0.12 hrs/invoice (matching, coding, routing, dispute)
    // Month-end reconciliation toil: 35 hrs per finance team member per month
    const manualApHoursMonthly = volume * 0.11;
    const manualCloseHoursMonthly = team * 32;
    const totalManualHours = manualApHoursMonthly + manualCloseHoursMonthly;

    // Spadeworks automation eliminates ~84% of repetitive manual effort
    const hoursSavedMonthly = Math.round(totalManualHours * 0.84);

    // Fully loaded hourly rate (salary * 1.25 for overhead / 2080 working hours)
    const hourlyRate = (salary * 1.22) / 2080;
    const directLaborSavingsAnnual = hoursSavedMonthly * 12 * hourlyRate;

    // Direct error avoidance / discount capture / audit prep efficiency bonus (approx 15% of labor value)
    const riskAndDiscountSavings = (volume * 12 * 0.45) + (directLaborSavingsAnnual * 0.12);
    const totalAnnualSavings = Math.round(directLaborSavingsAnnual + riskAndDiscountSavings);

    // Projected close cycle (80% reduction, floor at 1.5 days)
    const newCloseDays = Math.max(1.5, Math.round((closeDays * 0.22) * 10) / 10);

    // Estimated Spadeworks platform tier investment for ROI calculation
    const estimatedCost = Math.max(36000, volume * 1.8 + team * 2400);
    const netReturn = totalAnnualSavings - estimatedCost;
    const roiPercent = Math.max(220, Math.round((netReturn / estimatedCost) * 100));

    // Update result elements
    annualSavingsEl.textContent = formatCurrency(totalAnnualSavings);
    hoursSavedEl.textContent = formatNumber(hoursSavedMonthly) + ' hrs/mo';
    newCloseCycleEl.textContent = newCloseDays + ' days';
    roiPercentEl.textContent = '+' + roiPercent + '%';
  }

  // Bind event listeners
  [volumeSlider, teamSlider, closeDaysSlider, salarySlider].forEach(slider => {
    if (slider) {
      slider.addEventListener('input', calculate);
    }
  });

  // Initial calculation
  calculate();
}

window.addEventListener('DOMContentLoaded', initRoiCalculator);
