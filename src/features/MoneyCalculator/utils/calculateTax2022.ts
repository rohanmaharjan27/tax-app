export const calculateTax2022 = (
  marriage_status: string,
  basic_salary: number,
  no_of_months: number,
  cit: number,
  ssf: number
) => {
  // constants for amounts
  const twoLakhs = 200000;
  const threeLakhs = 300000;
  const fiveLakhs = 500000;
  const sixLakhs = 600000;
  const sevenLakhs = 700000;
  const eightLakhs = 800000;
  const tenLakhs = 1000000;
  const elevenLakhs = 1100000;
  const twentyLakhs = 2000000;

  // tax rates for every step of annual income
  const firstStepTaxRate = 0.01;
  const secondStepTaxRate = 0.1;
  const thirdStepTaxRate = 0.2;
  const fourthStepTaxRate = 0.3;
  const fifthStepTaxRate = 0.36;

  // calculate annual salary
  const annualSalary = basic_salary * no_of_months;

  // calculate net assessable amount
  const netAssessable = annualSalary - cit - ssf;

  const fiveOrSixLakhs = marriage_status === 'Married' ? sixLakhs : fiveLakhs;

  const sevenOrEightLakhs =
    marriage_status === 'Married' ? eightLakhs : sevenLakhs;

  const tenOrElevenLakhs =
    marriage_status === 'Married' ? elevenLakhs : tenLakhs;

  // calculate tax up to five (Unmarried) or six (married) lakhs;
  const calculateTaxUptoFiveorSixLakhs = () => {
    if (netAssessable < fiveOrSixLakhs) {
      const tax = firstStepTaxRate * netAssessable;
      return tax;
    } else {
      const tax = firstStepTaxRate * fiveOrSixLakhs;
      return tax;
    }
  };

  // calculate tax for additional two lakhs
  const calculateAdditionalTwoLakhs = () => {
    const additionalIncome = netAssessable - fiveOrSixLakhs;

    if (netAssessable < sevenOrEightLakhs) {
      const tax =
        calculateTaxUptoFiveorSixLakhs() + secondStepTaxRate * additionalIncome;

      return tax;
    } else {
      const tax =
        calculateTaxUptoFiveorSixLakhs() + secondStepTaxRate * twoLakhs;

      return tax;
    }
  };

  // calculate tax for additional two lakhs
  const calculateAdditionalThreeLakhs = () => {
    const additionalIncome = netAssessable - sevenOrEightLakhs;

    if (netAssessable < tenOrElevenLakhs) {
      const tax =
        calculateAdditionalTwoLakhs() + thirdStepTaxRate * additionalIncome;
      return tax;
    } else {
      const tax = calculateAdditionalTwoLakhs() + thirdStepTaxRate * threeLakhs;
      return tax;
    }
  };

  // calculate tax for additional thirteen or twelve and a half lakhs
  const calculateAdditionalTenLakhs = () => {
    const additionalIncome = netAssessable - tenLakhs;

    if (netAssessable < twentyLakhs) {
      const tax =
        calculateAdditionalThreeLakhs() + fourthStepTaxRate * additionalIncome;
      return tax;
    } else {
      const tax =
        calculateAdditionalThreeLakhs() + fourthStepTaxRate * tenLakhs;
      return tax;
    }
  };

  // calculate tax for additional twenty lakhs
  const calculateAdditionalAboveTwentyLakhs = () => {
    const additionalIncome = netAssessable - twentyLakhs;

    const tax =
      calculateAdditionalTenLakhs() + fifthStepTaxRate * additionalIncome;

    return tax;
  };

  if (netAssessable <= fiveOrSixLakhs) {
    const tax = calculateTaxUptoFiveorSixLakhs();
    return tax;
  } else if (
    netAssessable > fiveOrSixLakhs &&
    netAssessable <= sevenOrEightLakhs
  ) {
    const tax = calculateAdditionalTwoLakhs();
    return tax;
  } else if (
    netAssessable > sevenOrEightLakhs &&
    netAssessable <= tenOrElevenLakhs
  ) {
    const tax = calculateAdditionalThreeLakhs();
    return tax;
  } else if (netAssessable > tenOrElevenLakhs && netAssessable <= twentyLakhs) {
    const tax = calculateAdditionalTenLakhs();
    return tax;
  } else if (netAssessable > twentyLakhs) {
    const tax = calculateAdditionalAboveTwentyLakhs();
    return tax;
  }
};
