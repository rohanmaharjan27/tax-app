import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Row, Switch } from 'antd';
import { MoneyCalculator } from './features/MoneyCalculator/MoneyCalculator';
import { darkTheme, GlobalStyles, lightTheme } from './themes';
import './App.css';

function App() {
  const [theme, setTheme] = useState(false);

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked);
  };

  return (
    <ThemeProvider theme={theme ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Row style={{ padding: 16 }} justify='end'>
        <Switch checked={theme} onChange={handleThemeToggle} />
      </Row>
      <MoneyCalculator />
    </ThemeProvider>
  );
}

export default App;
