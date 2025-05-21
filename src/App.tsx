import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Button, Space, Typography, Layout, Switch, Input } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import {
  GithubOutlined,
  SunOutlined,
  MoonOutlined
} from '@ant-design/icons';

import { useTheme } from './contexts/ThemeContext.tsx';

const { Header: AntHeader } = Layout;
const { Title, Paragraph, Text } = Typography;

const App = () => {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("Alterem");
  const { currentTheme, toggleTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  const headerStyle = {
    background: isDark ? '#001529' : "#73EC4F",
  };

  const greet = async () => {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className={`text-center h-screen w-screen flex flex-col ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <AntHeader style={headerStyle} className="flex items-center">
        <div className="flex items-center mr-auto">
          <Title level={4} className="text-white m-0">
            Tauri React Template
          </Title>
        </div>
        <Space size="middle">
          <a
            href="https://github.com/alterem/tauri-react-template"
            target="_blank"
          >
            <GithubOutlined className="text-xl"  />
          </a>
          <Switch
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            checked={isDark}
            onChange={toggleTheme}
          />
        </Space>
      </AntHeader>

      <Title level={2}>
        Welcome {name}
      </Title>

      <Title level={4}>Welcome to Tauri + React + Vite + Tailwind + Ant Design!</Title>

      <div className="flex space-x-4 mb-8 justify-center">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo vite w-20 h-20" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react w-20 h-20" alt="React logo" />
        </a>
        <a href="https://tauri.app" target="_blank" rel="noreferrer">
          <img src="/tauri.svg" className="logo tauri w-20 h-20" alt="Tauri logo" />
        </a>
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" className="logo antd w-20 h-20" alt="Ant Design logo" />
      </div>

      <Paragraph className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Click the Ant Design button below!</Paragraph>

      <div className="mx-auto">
        <Space size="large">
          <Button type="primary" size="large" icon={<HomeOutlined />}>
            Ant Design Button
          </Button>
          <Button type="default" size="large">
            This's a Button
          </Button>
        </Space>
      </div>

      <div className="flex justify-center mt-4">
        <Input style={{ width: '192px' }}
          id="greet-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name..."
        />
        <Button
          type="primary"
          onClick={() => greet()}
        >
          Greet
        </Button>
      </div>
      <Text className={`mt-4 ${isDark ? 'text-green-400' : 'text-green-600'}`}>{greetMsg}</Text>
    </div>
  );
}

export default App;
