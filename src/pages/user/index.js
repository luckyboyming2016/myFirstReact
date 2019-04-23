import React, {Component} from 'react'
import axios from './../../jsonp'
import BaseFormSearch from '../../components/BaseSearchForm'
import { Form, Card, Select, Button, message, Table, Modal, Input,Radio} from 'antd'
import { DatePicker } from 'antd';
import Moment from 'moment'
const RadioGroup = Radio.Group
const FormItem = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option
class City extends Component {
  state = {
    showOpenLayer: false
  }
  formList = [
    {
      type: 'INPUT',
      label: '用户名',
      placeholder: '请输入用户名',
      field: 'user_name'
    },
    {
      type: 'SELECT',
      label: '是否已婚',
      initialValue : 1,
      width:100,
      placeholder: '请选择',
      field: 'marry',
      list: [
        {key: 0, value: '已婚'}, 
        {key: 1, value: '未婚'},
        {key: 2, value: '未知'}
      ]
    },
    {
      type: 'DATAPICKER_GROUP',
      label: '订单时间'
    },
    { 
      type: 'DATAPICKER_SINGLE',
      label: '入职时间',
      placeholder: '请选择入职时间',
      field: 'entryTime',
      width: 100
    }
  ]
  params ={
    page: 1
  }
  componentDidMount(){
    this.getPostData()
  }
  getPostData=()=>{
    axios.ajax({
      url: '/user/table/list',
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
  getSearchFormData(val){
    console.log(val);
    message.info('父级搜索值为'+val)
  }
  componentWillUnmount(){
    clearTimeout(this.timer)
  }
  memberDetail=(type)=>{
    let id = this.state.selectedRowKeys
    let item = this.state.selectItem
    console.log(id,item)
   
    if(type === 'create'){
      this.setState({
        type: type,
        title:'创建员工',
        showOpenLayer: true
      })
    }else if(type === "edit" || type === 'detail'){
      if(!id){
        Modal.info({
          title: '提示',
          content: '请选择一条记录'
        })
        return 
      }
      this.setState({
        type: type,
        title: type === 'edit' ? '编辑员工' : '查看详情',
        showOpenLayer: true,
        userInfor: item
      })
    }else{
      if(!id){
        Modal.info({
          title: '提示',
          content: '请选择一条记录'
        })
        return 
      }
      Modal.confirm({
        title: '提示',
        content: '你是否要真的删除此条信息',
        okText: '确认',
        onOk:()=>{
          axios.ajax({
            url: '/user/table/list',
            params: {
              id: item.key
            }
          }).then((res) => {
            console.log(res);
            if (res.code === 0) {
              this.setState({
                showOpenLayer: false
              })
              this.getPostData()
            }
          })
        },
        cancelText: '取消',
      });
    }
    console.log('type ',this.state.type)
  }
  submitDialog=()=>{
    let value = this.cityForm.props.form.getFieldsValue()
    let _this = this
    axios.ajax({
      url: '/user/table/list',
      params: {
        data: {
          ...value
        }
      }
    }).then((res)=>{
      if(res.code === 0){
        //this.cityForm.props.form.resetFields()
        _this.state.userInfor = {}
        _this.state.selectItem = []
        this.setState({
          showOpenLayer: false
        })
        this.getPostData()
      }
    })
  }
  render(){
    const columns = [
      { title: '排序', key: 'sort', dataIndex: 'sort'},
      { title: '用户名', key: 'user_name', dataIndex: 'user_name'},
      { title: '性别', key: 'sex', dataIndex: 'sex', render:(sex)=>{
        return sex === 1? '男': '女'
      }},
      { title: '状态', key: 'status', dataIndex: 'status', render:(status)=>{
        return {
          '1': '才子一枚',
          '2': '风度翩翩',
          '3': '神采飞扬',
          '4': '神清气爽，神采奕奕',
          '5': '气宇轩昂，满面红光',
          '6': '扬眉吐气，心旷神怡'
        }[status]
      }},
      { title: '爱好', key: 'interest', dataIndex: 'interest', render:(interest)=>{
        return {
          '1': '唱歌，看书',
          '2': '旅游',
          '3': '看书，唱歌',
          '4': '乒乓，网球',
          '5': '画画，小说',
          '6': '摄影，音乐 '
        }[interest]
      }},
      { title: '是否已婚', key: 'marry', dataIndex: 'marry', render:(marry)=>{
        return marry === 1? '已婚': '未婚'
      }},
      { title: '生日', key: 'birthday', dataIndex: 'birthday'},
      { title: '联系地址', key: 'address', dataIndex: 'address'},
      { title: '早起时间', key: 'getUp', dataIndex: 'getUp'}
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
    let footer = {}
    if (this.state.type === 'detail') {
      footer = {
        footer: null
      }
    }
    return (
      <div>
        <Card className="cardWarp">
          <BaseFormSearch formList={this.formList} getPostData={this.getSearchFormData} />
        </Card>
        <Card className="btnUser">
          <Button type="primary" onClick={()=>this.memberDetail('create')}>创建员工</Button>
          <Button type="primary" onClick={()=>this.memberDetail('edit')}>编辑员工</Button>
          <Button type="primary" onClick={()=>this.memberDetail('detail')}>员工详情</Button>
          <Button type="danger" onClick={()=>this.memberDetail('delete')}>删除员工</Button>
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
            title={this.state.title}
            onOk={this.submitDialog}
            okText="确定"
            cancelText="取消"
            onCancel={()=>{
             // this.cityForm.props.form.resetFields()
             this.setState({
                showOpenLayer: false,
                userInfor: {}
              })
            }}
            visible={this.state.showOpenLayer}
            {...footer}
          > 
            <OpenCityForm type={this.state.type} userInfor={this.state.userInfor} wrappedComponentRef={(value)=>this.cityForm = value } />
          </Modal>
      </div>
    );
  }
}

export default Form.create()(City)



class OpenCityForm extends Component {
  getState = (status) => {
    return {
      '1': '才子一枚',
      '2': '风度翩翩',
      '3': '神采飞扬',
      '4': '神清气爽，神采奕奕',
      '5': '气宇轩昂，满面红光',
      '6': '扬眉吐气，心旷神怡'
    }[status]
  }
  render(){
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 10
      }
    }
    let type = this.props.type
    let userInfor = this.props.userInfor || {}
    const { getFieldDecorator } = this.props.form
    
    return (
      <Form>
        <FormItem label="用户名" {...formItemLayout}>
          {
            userInfor && type === 'detail'?userInfor.user_name :
            getFieldDecorator('user_name',{
              initialValue: userInfor.user_name
            })(
              <Input type="text" placeholder="请输入用户名" />
            )
          }
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          {
            userInfor && type === 'detail'?userInfor.sex===1?'男':'女' :
            getFieldDecorator('sex', {
                initialValue: userInfor.sex
              })(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            userInfor && type === 'detail' ? this.getState(userInfor.status) :
            getFieldDecorator('status', {
              initialValue: userInfor.status
            })(
              <Select>
                <Option value={1}>才子一枚</Option>
                <Option value={2}>风度翩翩</Option>
                <Option value={3}>神采飞扬</Option>
                <Option value={4}>神清气爽，神采奕奕</Option>
                <Option value={5}>气宇轩昂，满面红光</Option>
                <Option value={5}>扬眉吐气，心旷神怡</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="生日" {...formItemLayout}>
          {
            userInfor && type === 'detail' ?userInfor.birthday:
            getFieldDecorator('birthday', {
                initialValue: Moment(userInfor.birthday)
              })(
              <DatePicker showTime />
            )
          }
        </FormItem>
        <FormItem label="联系地址" {...formItemLayout}>
          {
            userInfor && type === 'detail' ? userInfor.address :
            getFieldDecorator('address', {
                initialValue: userInfor.address
              })(
              <TextArea rows={3} placeholder="请输入联系地址" />
            )
          }
        </FormItem>
      </Form>
    );
  }
}

OpenCityForm = Form.create({})(OpenCityForm)