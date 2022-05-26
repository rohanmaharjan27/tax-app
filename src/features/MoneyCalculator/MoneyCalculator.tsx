import { Col, Form, Row, Select } from 'antd';
import React, { FC, useState } from 'react';
import { StyledButton } from '../../components/Button/Button';
import { CalculatorCard } from '../../components/Card/DivCards';
import { StyledInputNumber } from '../../components/Input/InputNumber';
import { AlignedCol, CenteredCol } from '../../components/Misc';
import { Text18 } from '../../components/Typography/DefaultText';
import { FormLabel } from '../../components/Typography/Labels';

interface Props {}

interface Data {
  marriage_status: string;
  basic_salary: number;
  no_of_months: number;
  cit: number;
}

const MoneyCalculator: FC<Props> = (props) => {
  const [form] = Form.useForm();

  const { Option } = Select;

  const [data, setData] = useState<Data>({
    marriage_status: 'Unmarried',
    basic_salary: 0,
    no_of_months: 12,
    cit: 0,
  });

  const { marriage_status, basic_salary, no_of_months, cit } = data;

  const [tds, setTds] = useState<string | undefined>('');
  const [cashInHand, setCashInHand] = useState<string | undefined>('');

  const handleSelectChange = (value: string) => {
    setData({ ...data, marriage_status: value });
  };

  const handleInputNumberChange = (value: number | string, name: string) => {
    setData({ ...data, [name]: value });
  };

  const calculateTax = () => {
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
    const netAssessable = annualSalary - cit;

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
      const additionalIncome = netAssessable - thirteenOrTwelveAndAHalf;

      if (netAssessable < twentyLakhs) {
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
        calculateAdditionalThirteenLakhs() +
        fifthStepTaxRate * additionalIncome;

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

  // function to convert to Indian rupee format
  const convertToFormat = (number: number | undefined) => {
    return number?.toLocaleString('en-IN');
  };

  // calculate cash in hand
  const handleCalculate = () => {
    const tds = calculateTax();
    const annualSalary = basic_salary * no_of_months;

    const cash = annualSalary - Number(tds) - cit;

    setTds(convertToFormat(tds));
    setCashInHand(convertToFormat(cash));
  };

  return (
    <Row align='middle'>
      <CenteredCol xs={24}>
        <CalculatorCard>
          <Form form={form} layout='vertical' onFinish={handleCalculate}>
            <Form.Item
              name='marriage_status'
              label={<FormLabel>Marriage Status</FormLabel>}
              initialValue='Unmarried'
            >
              <Select
                value={marriage_status}
                style={{ width: '100%' }}
                onChange={handleSelectChange}
              >
                <Option value='Unmarried'>Unmarried</Option>
                <Option value='Married'>Married</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name='basic_salary'
              label={<FormLabel>Salary</FormLabel>}
              initialValue={0}
            >
              <StyledInputNumber
                name='basic_salary'
                value={basic_salary}
                onChange={(value) =>
                  handleInputNumberChange(value, 'basic_salary')
                }
              />
            </Form.Item>
            <Form.Item
              name='no_of_months'
              label={<FormLabel>Months</FormLabel>}
              initialValue={12}
            >
              <StyledInputNumber
                name='no_of_months'
                value={no_of_months}
                min={1}
                max={12}
                onChange={(value) =>
                  handleInputNumberChange(value, 'no_of_months')
                }
              />
            </Form.Item>
            <Form.Item
              name='cit'
              label={<FormLabel>CIT</FormLabel>}
              initialValue={0}
            >
              <StyledInputNumber
                name='cit'
                value={cit}
                onChange={(value) => handleInputNumberChange(value, 'cit')}
              />
            </Form.Item>
            <Form.Item>
              <StyledButton htmlType='submit' size='large'>
                Calculate
              </StyledButton>
            </Form.Item>
          </Form>
          <Col xs={24}>
            <Row justify='space-between'>
              <AlignedCol>
                <FormLabel>TDS</FormLabel>
              </AlignedCol>
              <AlignedCol>
                <Text18>{tds ? `Rs. ${tds}` : '---'}</Text18>
              </AlignedCol>
            </Row>
          </Col>
          <Col xs={24} style={{ marginTop: '20px' }}>
            <Row justify='space-between'>
              <AlignedCol>
                <FormLabel>Cash in hand</FormLabel>
              </AlignedCol>
              <AlignedCol>
                <Text18>{cashInHand ? `Rs. ${cashInHand}` : '---'}</Text18>
              </AlignedCol>
            </Row>
          </Col>
        </CalculatorCard>
      </CenteredCol>
    </Row>
  );
};

export { MoneyCalculator };
