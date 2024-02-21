import React, { useState } from 'react';
import { Button, Card, Form, Input, Modal, DatePicker, Row, Col, Table } from 'antd';
import axios from 'axios'



const DataInput = () => {
  const [open, setOpen] = useState(false);
  const [tanggaldata, setTanggalData] = useState('1900-01-01');
  const [dataform, setDataForm] = useState(
    {
      'Tanggal': '',
      'Patok': '',
      'Northing': '',
      'Easting': '',
      'Elevasi': ''
    }
  )
  const [data, setData] = useState([
    {
      namapatok: '-',
      status   : '-',
    },
  ])
  const [form] = Form.useForm();
  const changeNamaPatok = (value) => {
    form.setFieldsValue({'namapatok':value} );   
    // console.log(form.getFieldValue(['namapatok']) )
  }
  const onChange = (date, dateString) => {
    setTanggalData(dateString)
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/select_patok/"+dateString,
    }).then(res => {
      setData(res.data);
    })

  };
 
  const onFinish = (values) => {
    const data_raw = {
      Tanggal: values['tanggal'].format("YYYY-MM-DD"),
      Patok: values['namapatok'],
      Northing: values['northing'],
      Easting: values['easting'],
      Elevasi: values['elevasi']
    }
    // axios.post(`http://127.0.0.1:5000/insertdata`,data)
    //     .then(res => {
    //       // setDataForm(res.data);
    //       console.log('ok')
    //     })
    
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/insertdata",
      data: data_raw
    }).then(res => {
      setDataForm(res.data);
    })
  };

  const columns = [
    {
      title: 'Nama Patok',
      dataIndex: 'namapatok',
      key: 'namapatok',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          onClick={()=>{
            // setDataForm(dataform['Patok']=record.namapatok)
            changeNamaPatok(record.namapatok)
            
            // console.log()
          }}
        >
          Pilih
        </Button>
      ),
    }
    
  ]


  return (
    <Row>
      <Col span={10}>
        <Form
          labelCol={{ span: 6, }}
          wrapperCol={{ span: 20, }}
          form={form}
          name="control-hooks"
          style={{ minWidth: 280, maxWidth: 430, margin: '30px' }}
          // autoComplete="off"
          onFinish={onFinish}
          initialValues={{ items: [{}], }}
        >

                  <Card
                    title="Form Input Data"
                    bordered={false}
                    style={{
                      maxWidth: 500,
                      borderBlockWidth: '10',
                      backgroundColor: '#DCEBF8'
                    }}
                    headStyle={{ backgroundColor: '#093ea8', color: 'white', }}
                  >
                    <Form.Item label="Tanggal" name={'tanggal'}>
                      <DatePicker onChange={onChange} format={'YYYY-MM-DD'} />
                    </Form.Item>
                    <Form.Item label="Nama Patok" name={'namapatok'}>
                      <Input placeholder='masukkan nama patok' />
                    </Form.Item>
                    <Form.Item label="Northing" name={'northing'}>
                      <Input placeholder='masukkan koordinat northing' />
                    </Form.Item>
                    <Form.Item label="Easting" name={'easting'}>
                      <Input placeholder='masukkan koordinat easting' />
                    </Form.Item>
                    <Form.Item label="Elevasi" name={'elevasi'}>
                      <Input placeholder='masukkan koordinat elevasi' />
                    </Form.Item>




                    <Form.Item>
                      {/* <Button type="primary" htmlType="submit">
                      Submit
                    </Button> */}
                      <>
                        <Button type="primary" style={{ backgroundColor: 'black', color: 'white' }}
                          htmlType="submit" onClick={() => setOpen(true)} >
                          Submit
                        </Button>
                        <Modal
                          title="Request Berhasil Dibuat!"
                          centered
                          noStyle
                          open={open}
                          onOk={() => setOpen(false)}
                          width={500}
                          cancelButtonProps={{ style: { display: 'none' } }}
                        >
                          <Input.TextArea rows="20" value={dataform} >

                          </Input.TextArea>
                        </Modal>
                      </>
                    </Form.Item>
                  </Card>

        </Form>
      </Col>
      <Col span={10} style={{ margin: '30px' }}>
          <Table columns={columns} dataSource={data} style={{ minWidth: 200, maxWidth: 300, }} pagination={false} />
      </Col>
    </Row>
  );
};
export default DataInput;