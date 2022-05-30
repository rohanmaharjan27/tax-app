import { Col, Form, Row, Select } from 'antd';
import React, { FC, useState } from 'react';
import { StyledButton } from '../../components/Button/Button';
import { CalculatorCard } from '../../components/Card/DivCards';
import { StyledInputNumber } from '../../components/Input/InputNumber';
import { AlignedCol, CenteredCol } from '../../components/Misc';
import { Text18 } from '../../components/Typography/DefaultText';
import { FormLabel } from '../../components/Typography/Labels';
import { calculateTax2021 } from './utils/calculateTax2021';
import { calculateTax2022 } from './utils/calculateTax2022';

interface Props {}

interface Data {
  fiscal_year: string;
  marriage_status: string;
  basic_salary: number;
  no_of_months: number;
  ssf: number;
  cit: number;
}

const MoneyCalculator: FC<Props> = (props) => {
  const [form] = Form.useForm();

  const { Option } = Select;

  const [data, setData] = useState<Data>({
    fiscal_year: '2021/2022',
    marriage_status: 'Unmarried',
    basic_salary: 0,
    no_of_months: 12,
    ssf: 0,
    cit: 0,
  });

  const { marriage_status, basic_salary, no_of_months, ssf, cit } = data;

  const [fiscalYear, setFiscalYear] = useState<string>('2021/2022');

  const [tds, setTds] = useState<string | undefined>('');
  const [cashInHand, setCashInHand] = useState<string | undefined>('');

  const handleSelectChange = (value: string) => {
    setData({ ...data, marriage_status: value });
  };

  const handleInputNumberChange = (value: number | string, name: string) => {
    setData({ ...data, [name]: value });
  };

  const handleFiscalYearChange = (value: string) => {
    setFiscalYear(value);
  };

  // function to convert to Indian rupee format
  const convertToFormat = (number: number | undefined) => {
    return number?.toLocaleString('en-IN');
  };

  // calculate cash in hand
  const handleCalculate = () => {
    let tax;
    switch (fiscalYear) {
      case '2021/2022':
        tax = calculateTax2021(
          marriage_status,
          basic_salary,
          no_of_months,
          cit,
          ssf
        );
        break;

      case '2022/2023':
        tax = calculateTax2022(
          marriage_status,
          basic_salary,
          no_of_months,
          cit,
          ssf
        );
        break;

      default:
        break;
    }

    const annualSalary = basic_salary * no_of_months;

    const cash = annualSalary - Number(tax) - ssf - cit;

    setTds(convertToFormat(tax));
    setCashInHand(convertToFormat(cash));
  };

  return (
    <Row align='middle'>
      <CenteredCol xs={24}>
        <CalculatorCard>
          <Form form={form} layout='vertical' onFinish={handleCalculate}>
            <Row style={{ width: '100%' }} gutter={[16, 16]}>
              <Col xs={24} md={12}>
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
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name='fiscalYear'
                  label={<FormLabel>Fiscal Year</FormLabel>}
                  initialValue='2021/2022'
                >
                  <Select
                    value={fiscalYear}
                    style={{ width: '100%' }}
                    onChange={handleFiscalYearChange}
                  >
                    <Option value='2021/2022'>2021/2022</Option>
                    <Option value='2022/2023'>2022/2023</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name='basic_salary'
                  label={<FormLabel>Salary</FormLabel>}
                  initialValue={0}
                >
                  <StyledInputNumber
                    name='basic_salary'
                    value={basic_salary}
                    min={0}
                    onChange={(value) =>
                      handleInputNumberChange(value, 'basic_salary')
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
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
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name='ssf'
                  label={<FormLabel>SSF</FormLabel>}
                  initialValue={0}
                >
                  <StyledInputNumber
                    name='ssf'
                    value={ssf}
                    onChange={(value) => handleInputNumberChange(value, 'ssf')}
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name='cit'
                  label={<FormLabel>CIT</FormLabel>}
                  initialValue={0}
                >
                  <StyledInputNumber
                    name='cit'
                    value={cit}
                    onChange={(value) => handleInputNumberChange(value, 'cit')}
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item>
                  <StyledButton htmlType='submit' size='large'>
                    Calculate
                  </StyledButton>
                </Form.Item>
              </Col>
            </Row>
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
