import React, {Component} from 'react'
import axios from './../../jsonp'
import moment from 'moment'
import {Form, Card, Select,Button,message,Table, Modal } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
class City extends Component {
  state = {
    dataSource: [],
    showOpenLayer: false
  }
  componentDidMount(){
    this.setState({
      dataSource: this.state.dataSource
    })
    this.getPostData()
  }
  getPostData=()=>{
    axios.ajax({
      url: '/country/table/list',
      params: {
        page: 1
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
  //开通城市
  openCountry=()=>{
    this.setState({
      showOpenLayer: true
    })
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
  searchForm(data){
    console.log(data);
    
    message.info(`父级搜索结果为 ${data}`)
  }
  render(){
    const columns = [
      { title: '城市Id', key: 'key', dataIndex: 'key'},
      { title: '城市名称', key: 'name', dataIndex: 'name'},
      { title: '用车模式', key: 'mode', dataIndex: 'mode',render: (mode)=>{
        return mode === 1 ? '停车点' : '禁停区' 
      }},
      { title: '营运模式', key: 'op_mode', dataIndex: 'op_mode',render: (op_mode)=>{
        return op_mode === 1 ? '加盟' : '自营' 
      }},
      { title: '授权加盟商', key: 'franchisee_name', dataIndex: 'franchisee_name'},
      { title: '城市管理员', key: 'country_admin', dataIndex: 'country_admin'},
      { title: '开通时间', key: 'open_time', dataIndex: 'open_time'},
      { title: '更新时间', key: 'update_time', dataIndex: 'update_time',render:(update_time)=>{
        return moment(update_time).format('YYYY-MM-DD HH:mm:ss')
      }},
      { title: '操作人', key: 'operation', dataIndex: 'operation'}
    ]
    return (
      <div>
        <Card className="cardWarp">
          <SearchForm getFormData={this.searchForm} />
          {/* <Form layout="inline" onSubmit={this.handleSearchSubmit}>
            <FormItem label="城市">
              {
                getFieldDecorator('country', {
                  initialValue: 'sh'
                })(
                  <Select style={{ width: 100 }}>
                    <Option value="sh">上海</Option>
                    <Option value="bj">北京</Option>
                    <Option value="gz">广州</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="用车模式">
              {
                getFieldDecorator('userCar', {
                  initialValue: '1'
                })(
                  <Select style={{ width: 120 }} placeholder="全部">
                    <Option value="1">停车点</Option>
                    <Option value="2">禁停区</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="营运模式">
              {
                getFieldDecorator('mode', {
                  initialValue: '1'
                })(
                  <Select style={{ width: 120 }} placeholder="全部">
                    <Option value="1">自营</Option>
                    <Option value="2">加盟</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="加盟商授权状态">
              {
                getFieldDecorator('state', {
                  initialValue: '1'
                })(
                  <Select style={{ width: 220 }} placeholder="全部">
                    <Option value="1">创创运营</Option>
                    <Option value="2">阿里运营</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">确定</Button>
              <Button style={{marginLeft:15}} type="default">重置</Button>
            </FormItem>
          </Form> */}
        </Card>
        <Card>
          <Button type="primary" onClick={this.openCountry}>开通城市</Button>
        </Card>
        <div style={{marginTop:-1}}>
          <Table
            columns={columns}
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
  handleSearchSubmit = (e) => {
    e.preventDefault();
    let val = this.props.form.getFieldsValue()
    this.props.getFormData(val)
  }
  resetSearch = () => {
    this.props.form.resetFields()
    message.info(`重置成功`)
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout="inline" onSubmit={this.handleSearchSubmit}>
            <FormItem label="城市">
              {
                getFieldDecorator('country')(
                  <Select style={{ width: 100 }} placeholder="全部">
                    <Option value="">全部</Option>
                    <Option value="sh">上海</Option>
                    <Option value="bj">北京</Option>
                    <Option value="gz">广州</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="用车模式">
              {
                getFieldDecorator('userCar', {
                  initialValue: '1'
                })(
                  <Select style={{ width: 120 }} placeholder="全部">
                    <Option value="1">停车点</Option>
                    <Option value="2">禁停区</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="营运模式">
              {
                getFieldDecorator('mode')(
                  <Select style={{ width: 120 }} placeholder="全部">
                    <Option value="">全部</Option>
                    <Option value="1">自营</Option>
                    <Option value="2">加盟</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="加盟商授权状态">
              {
                getFieldDecorator('state')(
                  <Select style={{ width: 120 }} placeholder="全部">
                    <Option value="">全部</Option>
                    <Option value="1">已授权</Option>
                    <Option value="2">未授权</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">确定</Button>
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