import React,{Component} from 'react'
import {Card,Table,message,Modal,Button } from 'antd'
import axios from './../../../jsonp/index'
import './index.less'

class TableBasic extends Component {
  state={
    dataSource2: []
  }
  componentDidMount(){
    this.setState({
      dataSource2: this.state.dataSource2
    })
    this.getPostData()
  }
  //获取动态接口数据
  getPostData=()=>{
    axios.ajax({
      url: '/table/list', 
      params: {
        pageSize: 1
      }
    }).then(res=>{
      console.log(res);
      if(res.code === 0){
        this.setState({
          dataSource2: res.result,
          selectedRows: null,
          selectedRowKeys: []
        })
      }else{
        message.info(res.msg)
      }
    })
  }
  onRowClickData=(record,index)=>{
    let selectedKey = [index]
    Modal.info({
      title: '提示',
      content: `你点击的用户名为 ${record.username},年龄为 ${record.age}`
    })
    this.setState({
      selectedRowKeys: selectedKey,
      selectItem: record
    })
    //用id去发请求
    this.getIdRequest(record)
  }
  getIdRequest(item){
    if(item.key){
      console.log(`你选择的行id为：`,item.key);
    }
  }
  handlerDelete=()=>{
    let rows = this.state.selectedRows
    let ids = [];
    rows.map((res)=>{
      ids.push(res.key)
      return res.key
    })
    console.log(typeof(ids));
    
    Modal.confirm({
      title: '提示',
      content: `你确定要删除id为 ${ids.join(',')}`,
      okText: '确认',
      cancelText: '取消',
      onOk:()=>{
        message.success('删除成功')
        this.getPostData()
      // this.request() //请求后台数据
      }
    })
  }
  render(){
    const columns = [
      {title:'姓名', key: 'username', dataIndex: 'username'},
      {title:'年龄', key: 'age', dataIndex: 'age'},
      {title:'性别', key: 'sex', dataIndex: 'sex', render: (sex) => {
        return sex === 1 ? '男' : '女'
      }},
      {title:'爱好', key: 'interest', dataIndex: 'interest', render: interest=>{
        let config = {
          '1': '闲鱼一条',
          '2': '爬山',
          '3': '游泳',
          '4': '唱歌',
          '5': '敲代码',
          '6': '篮球'
        }
        return config[interest]
      }},
      {title:'成绩', key: 'study', dataIndex: 'study'},
      {title:'班级', key: 'className', dataIndex: 'className'},
    ]
    const dataSource = [
      {key:1,username:'张三' ,age:30,sex:1,interest:1,study:120,className:'高一（2）班'},
      {key:2,username:'张李四' ,age:23,sex:2,interest:2,study:120,className:'高一（2）班'},
      {key:3,username:'张三' ,age:30,sex:1,interest:3,study:120,className:'高一（2）班'}
    ]
    const { selectedRowKeys } = this.state
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      }
    }
    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      }
    }
    return (
      <div className="uiButton">
        <Card title="基础表格" className="cardWarp">
            <Table dataSource={dataSource} columns={columns} bordered pagination={false} />
        </Card>
        <Card title="MOCK动态数据渲染表格" className="cardWarp">
            <Table dataSource={this.state.dataSource2} columns={columns} bordered></Table>
        </Card>
        <Card title="MOCK 单选动态表格" className="cardWarp">
            <Table 
              dataSource={this.state.dataSource2} 
              columns={columns} 
              onRow={(record) => {
                return {
                  onClick: (event) => {
                    this.onRowClickData(record,record.key)
                  }  // 点击行
                };
              }}
              rowSelection={rowSelection}
              bordered>
            </Table>
        </Card>
        <Card title="MOCK 复选动态表格" className="cardWarp">
            <Button type="primary" style={{marginBottom:10}} onClick={this.handlerDelete}>删除</Button>
            <Table 
              dataSource={this.state.dataSource2} 
              columns={columns} 
              onRow={(record) => {
                return {
                  onClick: (event) => {
                    this.onRowClickData(record,record.key)
                  }  // 点击行
                };
              }}
              rowSelection={rowCheckSelection}
              bordered>
            </Table>
        </Card>
      </div>
    );
  }
}

export default TableBasic;