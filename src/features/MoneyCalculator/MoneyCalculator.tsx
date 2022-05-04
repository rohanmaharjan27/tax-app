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
  cit: number;
}

const MoneyCalculator: FC<Props> = (props) => {
  const [form] = Form.useForm();

  const { Option } = Select;

  const [data, setData] = useState<Data>({
    marriage_status: 'Unmarried',
    basic_salary: 0,
    cit: 0,
  });

  const [tds, setTds] = useState<number | null>(null);
  const [cashInHand, setCashInHand] = useState<number | null>(null);

  const { marriage_status, basic_salary, cit } = data;

  const handleSelectChange = (value: string) => {
    setData({ ...data, marriage_status: value });
  };

  const handleInputNumberChange = (value: number | string, name: string) => {
    setData({ ...data, [name]: value });
  };

  const calculateTax = () => {
    // const months = 12;

    const oneLakhs = 100000;
    const twoLakhs = 200000;
    const fourLakhs = 400000;
    const fourandAHalfLakhs = 450000;
    const fiveLakhs = 500000;
    const sevenLakhs = 700000;
    const thirteenLakhs = 1300000;
    const twentyLakhs = 2000000;

    const taxRateUptoFourLakhs = 0.01;
    const taxRateForAdditionalOneLakhs = 0.1;
    const taxRateForAdditionalTwoLakhs = 0.2;
    const taxRateForAdditionalThirteenLakhs = 0.3;
    const taxRateForAdditionalTwentyLakhs = 0.36;

    const annualSalary = basic_salary;

    const calculateTaxUptoFourLakhs = () => {
      if (annualSalary < fourLakhs) {
        const tax = taxRateUptoFourLakhs * annualSalary;
        return tax;
      } else {
        const tax = taxRateUptoFourLakhs * fourLakhs;
        return tax;
      }
    };

    const calculateAdditionalOneLakh = () => {
      const additionalIncome = annualSalary - fourLakhs;

      if (annualSalary < fiveLakhs) {
        const tax =
          calculateTaxUptoFourLakhs() +
          taxRateForAdditionalOneLakhs * additionalIncome;

        return tax;
      } else {
        const tax =
          calculateTaxUptoFourLakhs() + taxRateForAdditionalOneLakhs * oneLakhs;

        return tax;
      }
    };

    const calculateAdditionalTwoLakh = () => {
      const additionalIncome = annualSalary - fiveLakhs;

      if (annualSalary < sevenLakhs) {
        const tax =
          calculateAdditionalOneLakh() +
          taxRateForAdditionalTwoLakhs * additionalIncome;
        return tax;
      } else {
        const tax =
          calculateAdditionalOneLakh() +
          taxRateForAdditionalTwoLakhs * twoLakhs;
        return tax;
      }
    };

    const calculateAdditionalThirteenLakhs = () => {
      const additionalIncome = annualSalary - sevenLakhs;

      if (annualSalary < twentyLakhs) {
        const tax =
          calculateAdditionalTwoLakh() +
          taxRateForAdditionalThirteenLakhs * additionalIncome;
        return tax;
      } else {
        const tax =
          calculateAdditionalTwoLakh() +
          taxRateForAdditionalThirteenLakhs * thirteenLakhs;
        return tax;
      }
    };

    const calculateAdditionalAboveTwentyLakhs = () => {
      const additionalIncome = annualSalary - twentyLakhs;

      const tax =
        calculateAdditionalThirteenLakhs() +
        taxRateForAdditionalTwentyLakhs * additionalIncome;

      return tax;
    };

    if (annualSalary <= fourLakhs) {
      const tax = calculateTaxUptoFourLakhs();
      setTds(tax);
    } else if (annualSalary > fourLakhs && annualSalary <= fiveLakhs) {
      const tax = calculateAdditionalOneLakh();
      setTds(tax);
    } else if (annualSalary > fiveLakhs && annualSalary <= sevenLakhs) {
      const tax = calculateAdditionalTwoLakh();
      setTds(tax);
    } else if (annualSalary > sevenLakhs && annualSalary <= twentyLakhs) {
      const tax = calculateAdditionalThirteenLakhs();
      setTds(tax);
    } else if (annualSalary > twentyLakhs) {
      const tax = calculateAdditionalAboveTwentyLakhs();
      setTds(tax);
    }
  };

  const handleCalculate = () => {
    switch (marriage_status) {
      case 'Married':
        calculateTax();
        break;

      case 'Unmarried':
        calculateTax();
        break;
    }

    setCashInHand(100000);
  };

  console.log('data', data);
  console.log('tds', tds);

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
                <Option value='Married'>Married</Option>
                <Option value='Unmarried'>Unmarried</Option>
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
                <Text18>{tds ? `Rs. ${tds.toFixed(3)}` : '---'}</Text18>
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
