import React, { useState } from 'react';
import { Button, Card, Form, Input, Modal,DatePicker  } from 'antd';
import axios from 'axios'



const PatokInput = () => {
  const [open, setOpen] = useState(false);
  const [tanggaldata, setTanggalData] = useState('1900-01-01');
  const [dataform,setDataForm] = useState(
                                          {'ID':'',
                                            'Patok':'',}
                                          
                                          )
  const [form] = Form.useForm();
  const onChange= (date, dateString) => {
    setTanggalData(dateString)
  };

  const onFinish = (values) => {
    const data = {
                  Patok    : values['items'][0]['patok']
                }
    console.log(data)
    axios({
          method: "POST",
          url:"http://127.0.0.1:5000/insertpatokm",
          data: data
        }).then(res => {
                setDataForm(res.data);
              })
  };
  return (
    <Form
    labelCol={{span: 6,}}
    wrapperCol={{span: 20,}}
    form={form}
    name="dynamic_form_complex"
    style={{minWidth:280,maxWidth: 430,margin:'30px'}}
    autoComplete="off"
    onFinish={onFinish}
    initialValues={{items: [{}],}}
>
<Form.List name="items">
    {(fields, { add, remove }) => (
              <div style={{display: 'flex',rowGap: 16,flexDirection: 'column',}}>
      {fields.map((field) => (
        <Card
        title="Form Patok Baru"
        bordered={false}
        style={{
          maxWidth: 500,
          borderBlockWidth: '10',
          backgroundColor: '#DCEBF8'
        }}
        headStyle={{ backgroundColor: '#093ea8', color: 'white', }}
      >
          <Form.Item label="Nama Patok" name={[field.name, 'patok']}>
            <Input placeholder='masukkan nama patok'/>
          </Form.Item>

          <Form.Item>
                    <>
                        <Button type="primary"  style={{backgroundColor: 'black',color:'white'}} 
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
                            cancelButtonProps={{style: { display: 'none' }}}
                        >
                          <Input.TextArea rows="20" value={dataform} >

                          </Input.TextArea>
                        </Modal>
                        </>
                </Form.Item>
        </Card>
      ))}
    </div>
  )}
</Form.List>
</Form>
  );
};
export default PatokInput;