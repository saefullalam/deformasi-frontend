import React from 'react'
import { Descriptions, Space, Typography} from 'antd'
const { Title } = Typography;


const About = () => {

  return (
    <>
      <Space direction="vertical" style={{ width: '100%', marginLeft: '10px', padding: '0' }}>

        <Title style={{ fontSize: '25px', marginTop: '10px' }}> Application Information</Title>
      </Space>


      <Space style={{ width: '100%', margin: '2%' }}>

        <Descriptions>
          <Descriptions.Item label="AppName">Data Center Platform</Descriptions.Item>
          <Descriptions.Item label="Last Update">1 January 2024</Descriptions.Item>
          <Descriptions.Item label="Version">Beta</Descriptions.Item>
          <Descriptions.Item label="Status">Development</Descriptions.Item>
          <Descriptions.Item label="Product By"> Nirwan Ashari </Descriptions.Item>
        </Descriptions>

      </Space>
    </>

  )

}

export default About;

