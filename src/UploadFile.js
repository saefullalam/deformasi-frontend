import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal,DatePicker,message, Upload  } from 'antd';
import axios from 'axios'

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) { message.error('You can only upload JPG/PNG file!'); }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) { message.error('Image must smaller than 2MB!'); }
    return isJpgOrPng && isLt2M;
};

const UploadFile = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [tanggaldata, setTanggalData] = useState('1900-01-01');
    const [open, setOpen] = useState(false);
    const [dataform,setDataForm] = useState(
                                            {'Tanggal':'',
                                             'Image'  : ''
                                            } )
    const [form] = Form.useForm();
    const onChange= (date, dateString) => {setTanggalData(dateString)};
                                        
    const onFinish = (values) => {
      const data = {
                    Tanggal  : values['items'][0]['tanggal'].format("YYYY-MM-DD"),
                    Image    : imageUrl
                    }
        axios({
        method: "POST",
        url:"http://127.0.0.1:5000/insertdocumentation",
        data: data
        }).then(res => {
                setDataForm(res.data);
            })
        };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
                console.log(imageUrl)
            });
        }
    };
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button" >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}> Upload </div>
        </button>
    );
    return (
        <Form
            labelCol={{ span: 6, }}
            wrapperCol={{ span: 20, }}
            form={form}
            name="dynamic_form_complex"
            style={{ minWidth: 280, maxWidth: 430, margin: '30px' }}
            autoComplete="off"
            onFinish={onFinish}
            initialValues={{ items: [{}], }}
        >
            <Form.List name="items">
                {(fields, { add, remove }) => (
                    <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column', }}>
                        {fields.map((field) => (
                            <Card
                                title="Form Upload Documentation"
                                bordered={false}
                                style={{
                                    maxWidth: 500,
                                    borderBlockWidth: '10',
                                    backgroundColor: '#DCEBF8'
                                }}
                                headStyle={{ backgroundColor: '#093ea8', color: 'white', }}
                            >
                                <Form.Item label="Tanggal" name={[field.name, 'tanggal']}>
                                    <DatePicker onChange={onChange} format={'YYYY-MM-DD'} />
                                </Form.Item>
                                <Form.Item label="Image" name={[field.name, 'image']}>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                    >
                                        {imageUrl ? ( <img src={imageUrl} alt="avatar" style={{ width: '100%'}} />) : (uploadButton)}
                                    </Upload>
                                </Form.Item>

                                <Form.Item>
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
                        ))}
                    </div>
                )}
            </Form.List>
        </Form>



    );
};
export default UploadFile;