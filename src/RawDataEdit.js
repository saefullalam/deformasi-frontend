import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Row, Col, Card, Form, DatePicker   } from 'antd';
import React,{ useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import axios from 'axios';


const RawDataEdit = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [dataform, setDataForm] = useState(false);
  const [start_date, setStartDate] = useState('1900-01-01');
  const [end_date, setEndDate] = useState('1900-01-01');
  const [form] = Form.useForm();
  const [data,setData] = useState([
                                      {
                                        id: '-',
                                        tanggal: '-',
                                        namapatok: '-',
                                        northing: '-',
                                        easting: '-',
                                        elevasi: '-',
                                    
                                      },
                                    
                                    ])


  const onChangeStartDate = (date, dateString) => {
    setStartDate(dateString)
  };
  const onChangeEndDate = (date, dateString) => {
    setEndDate(dateString)
  };

  const getData = (startDateParam,endDateParam) => {
    axios.post(`http://127.0.0.1:5000/select/${startDateParam}/${endDateParam}`)
      .then(res => {
        setData(res.data);
      })
  }

  const onFinish = (start_date,end_date) => {
    getData(start_date,end_date);
  };

  const deleteData = (rec,start_date,end_date) => {
    const data = {
      ID       : rec.id,
      Tanggal  : rec.tanggal,
      Patok    : rec.namapatok,
      Northing : rec.northing,
      Easting  : rec.easting,
      Elevasi  : rec.northing
    }

    axios({
      method: "POST",
      url:"http://127.0.0.1:5000/deletedata",
      data: data
    })

    getData(start_date,end_date);
  };

  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Tanggal',
      dataIndex: 'tanggal',
      key: 'tanggal',
      ...getColumnSearchProps('tanggal'),
    },
    {
      title: 'Nama Patok',
      dataIndex: 'namapatok',
      key: 'namapatok',
      ...getColumnSearchProps('namapatok'),
      sorter: (a, b) => a.source.length - b.source.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Northing',
      dataIndex: 'northing',
      key: 'northing',
      ...getColumnSearchProps('northing'),
    },
    {
      title: 'Easting',
      dataIndex: 'easting',
      key: 'easting',
      ...getColumnSearchProps('easting'),
    },
    {
      title: 'Elevasi',
      dataIndex: 'elevasi',
      key: 'elevasi',
      ...getColumnSearchProps('elevasi')
    },
    {
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          onClick={()=>{deleteData(record,start_date,end_date)}}
        >
          Delete
        </Button>
      ),
    }
  ];

  return <>
    <Row>
      <Col span={5} style={{margin:'30px'}}>
        <Form
          labelCol={{ span: 8, }}
          wrapperCol={{ span: 13, }}
          form={form}
          name="dynamic_form_complex"
          style={{ width: 280, }}
          autoComplete="off"
          onFinish={onFinish}
          initialValues={{ items: [{}], }}
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column', }}>
                {fields.map((field) => (
                <Card
                title="Filter Date"
                bordered={false}
                style={{
                  width:280,
                  // borderBlockWidth: '10',
                  backgroundColor: '#DCEBF8'
                }}
                headStyle={{ backgroundColor: '#093ea8', color: 'white', }}
                extra={
                        <Button type="primary" style={{backgroundColor: 'black',color:'white'}} onClick={()=>{onFinish(start_date,end_date)}}>
                          Apply
                        </Button>}
              >
                    <Form.Item label="Start Date" name={[field.name, 'Start Date']} >
                      <DatePicker onChange={onChangeStartDate} />
                    </Form.Item>
                    <Form.Item label="End Date" name={[field.name, 'End Date']}>
                      <DatePicker onChange={onChangeEndDate} />
                    </Form.Item>

                    {/* <Form.Item>
                      <Button type="primary"  onClick={()=>{onFinish(start_date,end_date)}}>
                      Submit
                    </Button>
                    </Form.Item> */}
                  </Card>
                ))}

                {/* <Button type="dashed" onClick={() => add()} block>
        + Add Item
      </Button> */}
              </div>
            )}
          </Form.List>
        </Form>
      </Col>
      <Col span={15} style={{margin:'30px'}}>
        <Table columns={columns} dataSource={data} style={{ minWidth:300,maxWidth: 700, }} scroll={{ x: 100 }} />
      </Col>
    </Row>
  </>

}

export default RawDataEdit;