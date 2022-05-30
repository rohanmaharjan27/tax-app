export const calculateTax2021 = (
  marriage_status: string,
  basic_salary: number,
  no_of_months: number,
  cit: number,
  ssf: number
) => {
  // constants for amounts
  const oneLakhs = 100000;
  const twoLakhs = 200000;
  const fourLakhs = 400000;
  const fourAndAHalfLakhs = 450000;
  const fiveLakhs = 500000;
  const fiveAndAHalfLakhs = 550000;
  const sevenLakhs = 700000;
  const sevenAndAHalfLakhs = 750000;
  const twelveAndAHalfLakhs = 1250000;
  const thirteenLakhs = 1300000;
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

  const fourOrFourAndAHalf =
    marriage_status === 'Married' ? fourAndAHalfLakhs : fourLakhs;

  const fiveOrFiveAndAHalf =
    marriage_status === 'Married' ? fiveAndAHalfLakhs : fiveLakhs;

  const sevenOrSevenAndAHalf =
    marriage_status === 'Married' ? sevenAndAHalfLakhs : sevenLakhs;

  const thirteenOrTwelveAndAHalf =
    marriage_status === 'Married' ? twelveAndAHalfLakhs : thirteenLakhs;

  // calculate tax up to four or four and a half lakhs
  const calculateTaxUptoFourLakhs = () => {
    if (netAssessable < fourOrFourAndAHalf) {
      const tax = firstStepTaxRate * netAssessable;
      return tax;
    } else {
      const tax = firstStepTaxRate * fourOrFourAndAHalf;
      return tax;
    }
  };

  // calculate tax for additional one lakh
  const calculateAdditionalOneLakh = () => {
    const additionalIncome = netAssessable - fourOrFourAndAHalf;

    if (netAssessable < fiveOrFiveAndAHalf) {
      const tax =
        calculateTaxUptoFourLakhs() + secondStepTaxRate * additionalIncome;

      return tax;
    } else {
      const tax = calculateTaxUptoFourLakhs() + secondStepTaxRate * oneLakhs;

      return tax;
    }
  };

  // calculate tax for additional two lakhs
  const calculateAdditionalTwoLakh = () => {
    const additionalIncome = netAssessable - fiveOrFiveAndAHalf;

    if (netAssessable < sevenOrSevenAndAHalf) {
      const tax =
        calculateAdditionalOneLakh() + thirdStepTaxRate * additionalIncome;
      return tax;
    } else {
      const tax = calculateAdditionalOneLakh() + thirdStepTaxRate * twoLakhs;
      return tax;
    }
  };

  // calculate tax for additional thirteen or twelve and a half lakhs
  const calculateAdditionalThirteenLakhs = () => {
    const additionalIncome = netAssessable - sevenOrSevenAndAHalf;

    if (netAssessable < thirteenOrTwelveAndAHalf) {
      const tax =
        calculateAdditionalTwoLakh() + fourthStepTaxRate * additionalIncome;
      return tax;
    } else {
      const tax =
        calculateAdditionalTwoLakh() +
        fourthStepTaxRate * thirteenOrTwelveAndAHalf;
      return tax;
    }
  };

  // calculate tax for additional twenty lakhs
  const calculateAdditionalAboveTwentyLakhs = () => {
    const additionalIncome = netAssessable - twentyLakhs;

    const tax =
      calculateAdditionalThirteenLakhs() + fifthStepTaxRate * additionalIncome;

    return tax;
  };

  if (netAssessable <= fourOrFourAndAHalf) {
    const tax = calculateTaxUptoFourLakhs();
    return tax;
  } else if (
    netAssessable > fourOrFourAndAHalf &&
    netAssessable <= fiveOrFiveAndAHalf
  ) {
    const tax = calculateAdditionalOneLakh();
    return tax;
  } else if (
    netAssessable > fiveOrFiveAndAHalf &&
    netAssessable <= sevenOrSevenAndAHalf
  ) {
    const tax = calculateAdditionalTwoLakh();
    return tax;
  } else if (
    netAssessable > sevenOrSevenAndAHalf &&
    netAssessable <= twentyLakhs
  ) {
    const tax = calculateAdditionalThirteenLakhs();
    return tax;
  } else if (netAssessable > twentyLakhs) {
    const tax = calculateAdditionalAboveTwentyLakhs();
    return tax;
  }
};
