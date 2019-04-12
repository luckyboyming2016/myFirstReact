import React, {Component} from 'react'
import axios from './../../jsonp'
import {Form, Card, Select,Button,message,Table, Modal, DatePicker } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
class City extends Component {
  state = { }
  params ={
    page: 1
  }
  componentDidMount(){
    this.getPostData()
  }
  getPostData=()=>{
    axios.ajax({
      url: '/order/table/list',
      params: {
        page: this.params.page
      }
    }).then((res)=>{
      console.log(res);
      if(res.code === 0){
        this.setState({
          dataSource: res.result
        })
      }
    })
  }
  //订单详情 
  orderDetail=()=>{
    let id = this.state.selectedRowKeys
    if(!id){
      Modal.error({
        title: '提示',
        okText: '确定',
        content: '请选择一条数据'
      })
      return
    }
    window.location.href = `/#/common/order/detail/${id}`
  }
  //结束订单
  overOrder=()=>{

  }
  //开通城市提交
  sumbitOpenCoutry=()=>{
    console.log('提交');
    let sumbitVal = this.cityForm.props.form.getFieldsValue()
    console.log('发请求调接口',sumbitVal)
    this.setState({
      showOpenLayer: false
    })
  }
 
  onRowClickData = (selectedRows, id) => {
    let selectedKey = [id]
    this.setState({
      selectedRowKeys: selectedKey,
      selectItem: selectedRows
    })
    this.timer = setTimeout(() => {
      this.getNextPage(this.state.selectedRowKeys);
    }, 500);
  }
  getNextPage=(rowId)=>{
    console.log('结果',rowId);
    
  }
  componentWillUnmount(){
    clearTimeout(this.timer)
  }
  render(){
    const columns = [
      { title: '订单编号', key: 'order_sn', dataIndex: 'order_sn'},
      { title: '车辆编号', key: 'bike_sn', dataIndex: 'bike_sn'},
      { title: '用户名', key: 'user_name', dataIndex: 'user_name'},
      { title: '手机号', key: 'mobile', dataIndex: 'mobile'},
      { title: '里程', key: 'distance', dataIndex: 'distance'},
      { title: '行驶时长', key: 'total_time', dataIndex: 'total_time'},
      { title: '状态', key: 'status', dataIndex: 'status'},
      { title: '开始时间', key: 'start_time', dataIndex: 'start_time'},
      { title: '结束时间', key: 'end_time', dataIndex: 'end_time'},
      { title: '订单金额', key: 'total_fee', dataIndex: 'total_fee'},
      { title: '实付金额', key: 'user_pay', dataIndex: 'user_pay'},
    ]
    const { selectedRowKeys } = this.state
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: ((selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        })
        this.timer = setTimeout(() => {
          this.getNextPage(this.state.selectedRowKeys);
        }, 500);
      })
    }
    return (
      <div>
        <Card className="cardWarp">
          <SearchForm />
        </Card>
        <Card>
          <Button type="primary" onClick={this.orderDetail}>订单详情</Button>
          <Button style={{marginLeft:15}} type="danger" onClick={this.overOrder}>结束订单</Button>
        </Card>
        <div style={{marginTop:-1}}>
          <Table
            columns={columns}
            rowSelection={rowSelection}
            onRow = {(record) => {
                return {
                  onClick: () => {
                    this.onRowClickData(record,record.key)
                  } // 点击行
                }
              }
            }
            dataSource={this.state.dataSource}
            bordered
          ></Table>
        </div>
          <Modal
            title="开通城市"
            onOk={this.sumbitOpenCoutry}
            okText="确定"
            cancelText="取消"
            onCancel={()=>{this.setState({
              showOpenLayer: false
            })}}
            visible={this.state.showOpenLayer}
          >
            <OpenCityForm wrappedComponentRef={(value)=>{this.cityForm = value} } />
          </Modal>
      </div>
    );
  }
}

export default Form.create()(City)

class SearchForm extends Component {
  //顶部搜索
  handleSearchSubmit = () => {
    let val = this.props.form.getFieldsValue()
    console.log(val)
    message.info(`搜索结果为${val}`)
  }
  resetSearch = () => {
    this.props.form.resetFields()
    message.info(`重置成功`)
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout="inline">
            <FormItem label="城市">
              {
                getFieldDecorator('country')(
                  <Select style={{ width: 100 }} placeholder="全部">
                    <Option value="">全部</Option>
                    <Option value="1">上海</Option>
                    <Option value="2">北京</Option>
                    <Option value="3">广州</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="订单时间">
              {
                getFieldDecorator('start_time')(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                )
              } 
            </FormItem>
            <FormItem label="">
              {
                getFieldDecorator('end_time')( 
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                )
              }
            </FormItem>
            <FormItem label="订单状态">
              {
                getFieldDecorator('status')(
                  <Select style={{ width: 120 }} placeholder="全部">
                    <Option value="">全部</Option>
                    <Option value="1">进行中</Option>
                    <Option value="2">结束行程</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.handleSearchSubmit}>确定</Button>
              <Button style={{marginLeft:15}} type="default" onClick={this.resetSearch}>重置</Button>
            </FormItem>
          </Form>
    );
  }
}

SearchForm = Form.create({})(SearchForm)

class OpenCityForm extends Component {
  render(){
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 10
      }
    }
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <FormItem label="选择城市" {...formItemLayout}>
          {
            getFieldDecorator('name',{
              initialValue: ''
            })(
              <Select>
                <Option value="sh">上海</Option>
                <Option value="bj">北京</Option>
                <Option value="gz">广州</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="营运模式" {...formItemLayout}>
          {
            getFieldDecorator('op_mode',{
              initialValue: ''
            })(
              <Select>
                <Option value="1">自营</Option>
                <Option value="2">加盟</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="用车模式" {...formItemLayout}>
          {
            getFieldDecorator('mode', {
              initialValue: ''
            })(
              <Select>
                <Option value="1">停车点</Option>
                <Option value="2">禁停区</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    );
  }
}

OpenCityForm = Form.create({})(OpenCityForm)