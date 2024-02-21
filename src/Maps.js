import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, Input, Space, Table, Row, Col, Card, Form, DatePicker, Image } from 'antd';
import axios from 'axios'




const App = () => {
  const [form] = Form.useForm();
  const [tanggaldata, setTanggalData] = useState('1900-01-01');
  const [tanggaldatanotes, setTanggalDataNotes] = useState('');
  const [sarantindakan, setSaranTindakan] = useState('-');
  const [imagesource, setImageSource] = useState('http://127.0.0.1:5000/maps/1900-01-01');
  const keteranganindexsrc = 'http://127.0.0.1:5000/select_documentation/1900-01-01/keteranganfix';
  const [doc1source, setDoc1Source] = useState('http://127.0.0.1:5000/select_documentation/1900-01-01/0');
  const [doc2source, setDoc2Source] = useState('http://127.0.0.1:5000/select_documentation/1900-01-01/0');
  const [doc3source, setDoc3Source] = useState('http://127.0.0.1:5000/select_documentation/1900-01-01/0');
  const [doc4source, setDoc4Source] = useState('http://127.0.0.1:5000/select_documentation/1900-01-01/0');

  const onChangeTanggalData = (date, dateString) => {
    setTanggalData(dateString)
  };

  const getSaranTindakan = (tanggaldata) => {
    axios({
      method: "POST",
      url: 'http://127.0.0.1:5000/select_sarantindakan/' + tanggaldata+'/'+tanggaldata,
    }).then(res => {
      try{
      setSaranTindakan(res.data[0]['sarantindakan']);
      }
      catch{
        setSaranTindakan('-');
      }
    })
  }

  const onFinish = (tanggaldata) => {
    setTanggalDataNotes(tanggaldata)
    getSaranTindakan(tanggaldata)
    setImageSource('http://127.0.0.1:5000/maps/' + tanggaldata)
    setDoc1Source('http://127.0.0.1:5000/select_documentation/' + tanggaldata + '/1')
    setDoc2Source('http://127.0.0.1:5000/select_documentation/' + tanggaldata + '/2')
    setDoc3Source('http://127.0.0.1:5000/select_documentation/' + tanggaldata + '/3')
    setDoc4Source('http://127.0.0.1:5000/select_documentation/' + tanggaldata + '/4')
  };

  const onDownload = () => {
    fetch(imagesource)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };
  return (
    <>
      <Row>
        <Col>
          <Card
            title={"Peta Deformasi " + '(' + tanggaldatanotes + ')'}
            bordered={false}
            style={{
              maxWidth: 500,
              borderBlockWidth: '5',
              backgroundColor: '#DCEBF8',
              marginTop: '20px',
              marginLeft: '20px',
              marginBottom: '20px',
            }}
            headStyle={{ backgroundColor: '#093ea8', color: 'white', }}
          >
            <Row>
              <Col>
                <Row>
                  <Image width={200} src={imagesource}
                    preview={{
                      toolbarRender: (
                        _,
                        {
                          transform: { scale },
                          actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                        },
                      ) => (
                        <Space size={12} className="toolbar-wrapper">
                          <DownloadOutlined onClick={onDownload} />
                          <SwapOutlined rotate={90} onClick={onFlipY} />
                          <SwapOutlined onClick={onFlipX} />
                          <RotateLeftOutlined onClick={onRotateLeft} />
                          <RotateRightOutlined onClick={onRotateRight} />
                          <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                          <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                        </Space>
                      ),
                    }}
                  />
                </Row>
                <Row style={{ marginTop: '40px' }}>
                  <Image width={200} src={keteranganindexsrc} />
                </Row>
              </Col>

            </Row>
          </Card>
        </Col>
        <Col>
        <Row>
        <Col>
          <Card
            title="Documentation"
            bordered={false}
            style={{
              maxWidth: 500,
              borderBlockWidth: '5',
              backgroundColor: '#DCEBF8',
              marginTop: '20px',
              marginLeft: '10px',
              marginBottom: '20px',
            }}
            headStyle={{ backgroundColor: '#093ea8', color: 'white', }}
          >
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              <Image height={100} src={doc1source} />
              <Image src={doc2source} style={{ display: 'none' }} />
              <Image src={doc3source} style={{ display: 'none' }} />
              <Image src={doc4source} style={{ display: 'none' }} />
            </Image.PreviewGroup>
          </Card>
        </Col>
        <Col>
          <Row>
            <Form
              labelCol={{ span: 9, }}
              wrapperCol={{ span: 20, }}
              form={form}
              name="dynamic_form_complex"
              style={{ maxWidth: 500 }}
              autoComplete="off"
              onFinish={onFinish}
              initialValues={{ items: [{}], }}
            >
              <Form.List name="items">
                {(fields, { add, remove }) => (
                  <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column', }}>
                    {fields.map((field) => (
                      <Card
                        title="Input Tanggal Data"
                        bordered={false}
                        style={{
                          width: 300,
                          height:200,
                          borderBlockWidth: '10',
                          backgroundColor: '#DCEBF8',
                          marginTop: '20px',
                          marginLeft: '10px',
                          marginBottom: '20px',
                        }}
                        headStyle={{ backgroundColor: '#093ea8', color: 'white', }}
                        extra={
                          <Button type="primary" style={{ backgroundColor: 'black', color: 'white' }} onClick={() => { onFinish(tanggaldata) }}>
                            Apply
                          </Button>}
                      >
                        <Form.Item label="Tanggal Data" name={[field.name, 'Tanggal Data']}>
                          <DatePicker onChange={onChangeTanggalData} />
                        </Form.Item>
                      </Card>
                    ))}
                  </div>
                )}
              </Form.List>
            </Form>
          </Row>
        </Col>
        </Row>
        <Row>
        <Card
            title="Saran Tindakan"
            bordered={false}
            style={{
              maxWidth: 500,
              borderBlockWidth: '5',
              backgroundColor: '#DCEBF8',
              marginLeft: '10px',
              marginBottom: '20px',
              overflow:'auto',
              height: '300px',
            }}
            headStyle={{ backgroundColor: '#093ea8', color: 'white', }}
          >
            <p style={{margin:'0px'}}>
                {sarantindakan}
            </p>
          </Card>
        </Row>
        </Col>
      </Row>
    </>

  );
};
export default App;