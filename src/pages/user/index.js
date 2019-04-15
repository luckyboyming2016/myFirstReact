import React, {Component} from 'react'
import axios from './../../jsonp'
import BaseFormSearch from '../../components/BaseSearchForm'
import { Form, Card, Select, Button, message, Table, Modal} from 'antd'
const FormItem = Form.Item
const Option = Select.Option
class City extends Component {
  state = { }
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
  getSearchFormData(val){
    console.log(val);
    message.info('父级搜索值为'+val)
  }
  componentWillUnmount(){
    clearTimeout(this.timer)
  }
  memberDetail=(type)=>{
    console.log(type);
    
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
      { title: '爱好', key: 'interest', dataIndex: 'interest', render:(status)=>{
        return {
          '1': '唱歌，看书',
          '2': '旅游',
          '3': '看书，唱歌',
          '4': '乒乓，网球',
          '5': '画画，小说',
          '6': '摄影，音乐 '
        }[status]
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
            getFieldDecorator('name')(
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