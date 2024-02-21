import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Row, Col, Card, Form, DatePicker   } from 'antd';
import React,{ useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import axios from 'axios';


const PatokEdit = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [data,setData] = useState([
                                      {
                                        id: '-',
                                        patok: '-',
                                    
                                      },
                                    
                                    ])


  const getData = () => {
    axios.post(`http://127.0.0.1:5000/select_patokm`)
      .then(res => {
        setData(res.data);
      })
  }

  const deleteData = (rec) => {
    const data = {
      ID       : rec.id,
      Patok  : rec.patok,
    }

    axios({
      method: "POST",
      url:"http://127.0.0.1:5000/delete_patokm",
      data: data
    })

    getData();
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
      title: 'Nama Patok',
      dataIndex: 'patok',
      key: 'patok',
      ...getColumnSearchProps('patok'),
      sorter: (a, b) => a.source.length - b.source.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          onClick={()=>{deleteData(record)}}
        >
          Delete
        </Button>
      ),
    }
  ];

  return <>
  <Row>
  <Col span={2} style={{marginTop:'30px',marginLeft:'30px'}}>
  <Button type="primary" style={{backgroundColor: 'black',color:'white'}} onClick={getData}>
                          Refresh Data
                        </Button>
                        </Col>
  <Col span={15} style={{margin:'30px'}}>
        <Table columns={columns} dataSource={data} style={{ minWidth:300,maxWidth: 700, }} scroll={{ x: 100 }} />
  </Col>
  </Row>
  </>

}

export default PatokEdit;