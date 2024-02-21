import React from 'react';
import {
  HomeOutlined, QuestionCircleOutlined, DatabaseOutlined, RadarChartOutlined,UploadOutlined,BarChartOutlined,DeleteOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, ConfigProvider, Button, Row, Col, Typography, Drawer, Space } from 'antd';
import { useState } from 'react';
import { Routes, Route, NavLink } from "react-router-dom";
import Home from './Home.js';
import About from './About.js'
import DataInput from './DataInput.js';
import RawDataEdit from './RawDataEdit.js';
import ReportDeformasi from './ReportDeformasi.js';
import UploadFile from './UploadFile.js';
import SaranTindakanInput from './SaranTindakanInput.js';
import SaranTindakanEdit from './SaranTindakanEdit.js';
import DocumentationEdit from './DocumentationEdit.js';
import PatokInput from './PatokInput.js';
import PatokEdit from './PatokEdit.js';
import Maps from './Maps.js';
import './index.css';

const { Header, Content, Footer, Sider } = Layout;
const { Text, Link } = Typography;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}


const items = [
  getItem(<NavLink to="/home">Home</NavLink>, '/home', <HomeOutlined />,),
  getItem(<NavLink to="/about">About</NavLink>, '/about', <QuestionCircleOutlined />),
  // getItem(<NavLink to="/datainput">Input Data</NavLink>, '/datainput', <QuestionCircleOutlined />),
  // getItem(<NavLink to="/datamanagement">Data Management</NavLink>, '/datamanagement', <QuestionCircleOutlined />),
  getItem('Input Data', 'szsub1asd', <DatabaseOutlined />, [
    getItem(<NavLink to="/datainput">Input RawData</NavLink>, '/datainput'),
    getItem(<NavLink to="/inputsarantindakan">Input SaranTindakan</NavLink>, '/inputsarantindakan'),
    getItem(<NavLink to="/uploadfile">Input Documentation</NavLink>, '/uploadfile'),
    getItem(<NavLink to="/patokinput">Input PatokBaru</NavLink>, '/patokinput'),
  ]),
  getItem('Delete Data', 'szsub1', <DeleteOutlined />, [
    getItem(<NavLink to="/rawdataedit">Delete RawData</NavLink>, '/rawdataedit'),
    getItem(<NavLink to="/editsarantindakan">Delete SaranTindakan</NavLink>, '/editsarantindakan'),
    getItem(<NavLink to="/documentationedit">Delete Documentation</NavLink>, '/documentationedit'),
    getItem(<NavLink to="/patokedit">Delete Patok</NavLink>, '/patokedit'),
  ]),

  getItem(<NavLink to="/reportdeformasi">Report Deformasi</NavLink>, '/reportdeformasi',<BarChartOutlined />),
  getItem(<NavLink to="/maps">Maps</NavLink>, '/maps', <RadarChartOutlined />),
  

];

const App = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }, } = theme.useToken();

  const [date, setDate] = useState(new Date());


  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'red',
        },

      }}
    >

      <Layout style={{ minHeight: '100vh' }}>
        <Drawer
          title="Riung Mitra Lestari Data Center"
          placement={'left'}
          onClose={onClose}
          open={open}
        >
          <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Drawer>
        <Layout style={{ backgroundColor: '#e1e6ea' }}>

          <Row align='middle' style={{
            marginLeft: '20px', marginRight: '20px', marginBottom: '15px', paddingLeft: '10px', backgroundColor: '#093ea8', borderRadius: '10px',
            height: '40px',
          }}>
            <Col span={10} order={3} offset={6}>
              <Text style={{ color: 'white' }} strong>RML Data Center</Text>
            </Col>
            <Col span={4} order={1}>
              <Button type="primary" style={{backgroundColor:'#040404'}} onClick={showDrawer}>
                Menu
              </Button>
            </Col>

          </Row>
          <Content style={{ width: '94%', marginLeft: '3%', marginRight: '3%', background: 'white', padding: '0px', borderRadius: '5px' }}>

            <React.Fragment>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/datainput" element={<DataInput />} />
                <Route path="/rawdataedit" element={<RawDataEdit />} />
                <Route path="/reportdeformasi" element={<ReportDeformasi />} />
                <Route path="/maps" element={<Maps />} />
                <Route path="/uploadfile" element={<UploadFile />} />
                <Route path="/inputsarantindakan" element={<SaranTindakanInput />} />
                <Route path="/editsarantindakan" element={<SaranTindakanEdit />} />
                <Route path="/documentationedit" element={<DocumentationEdit />} />
                <Route path="/patokinput" element={<PatokInput />} />
                <Route path="/patokedit" element={<PatokEdit />} />
              </Routes>
            </React.Fragment>

          </Content>
          <Footer style={{ textAlign: 'center', padding: 10, backgroundColor: '#e1e6ea' }}>
            ©2024 Riung Mitra Lestari | All Rights Reserved
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default App;