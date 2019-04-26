import React,{Component} from 'react'
import moment from 'moment'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider, Card, Form, Input,InputNumber, Button, Checkbox,Radio,DatePicker,TimePicker, Switch,Select,Upload,Icon,message } from 'antd'
import './index.less'

var FormItem= Form.Item
var RadioGroup = Radio.Group
var Option = Select.Option
var TextArea = Input.TextArea
class FormReg extends Component {
  state = {}
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({
        loading: true
      });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        userImg: imageUrl,
        loading: false,
      }));
    }
  }
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handSubmit=()=>{
    let userInfo = this.props.form.getFieldsValue()
    console.log(userInfo);
    this.props.form.validateFields((err,values)=>{
      if(!err){
        message.info(`恭喜你，通过了，账户${userInfo.userName},密码${userInfo.password}`)
      }
    })
    
  }
  onChangeTime=(time)=>{
    this.setState({
      time: moment(time).format('YYYY-MM-DD HH:mm:ss')
    })
  }
  resetSubmit=()=>{
    this.props.form.resetFields()
    message.info('重置成功')
  }
  render(){
    const { getFieldDecorator } = this.props.form;   
    const formItemLayout = {
      labelCol: {
        xs: 24, //当窗口 < 576时， lable占24列中的4列
        sm: 4 //当窗口 > 576时， lable占一行，
      },
      wrapperCol: {
        xs:24,
        sm: 6
      }
    } 
    const offsetLayout = {
      wrapperCol: {
        xs:24,
        sm:{
          span: 12,
          offset: 4
        }
      }
    }
    return (
      <div>
         <Card title="注册表单">
          <Form>
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '用户名不能为空'}
                  ]
                })(
                  <Input placeholder="请输入用户名"></Input>
                )
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('password', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '密码不能为空'}
                  ]
                })(
                  <Input type="password" placeholder="请输入密码"></Input>
                )
              }
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                  initialValue: '1'
                })(
                  <RadioGroup>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: 18
                })(
                  <InputNumber />
                )
              }
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: '3' //一定要字符串
                })(
                  <Select>
                    <Option value="1">风华浪子</Option>
                    <Option value="2">你呀你</Option>
                    <Option value="3">百度FE</Option>
                    <Option value="4">阿里巴巴</Option>
                    <Option value="5">腾讯QQ</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="爱好" {...formItemLayout}>
              {
                getFieldDecorator('interest', {
                  initialValue: ['1','4','7','8'] //一定要字符串
                })(
                  <Select mode="multiple">
                    <Option value="1">游泳</Option>
                    <Option value="2">逛街</Option>
                    <Option value="3">看书</Option>
                    <Option value="4">睡觉</Option>
                    <Option value="5">爬山</Option>
                    <Option value="6">游戏</Option>
                    <Option value="7">乒乓球</Option>
                    <Option value="8">足球</Option>
                    <Option value="9">画画</Option>
                    <Option value="10">电影</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {
                getFieldDecorator('isMarried', {
                  valuePropName: 'checked',
                  initialValue: true 
                })(
                  <Switch />
                )
              }
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {
                getFieldDecorator('birthday')(
                  <LocaleProvider locale={zhCN}>
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                  </LocaleProvider>
                )
              }
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: '上海市长宁区明基广场209号'
                })(
                  <TextArea autosize={{minRows:4}} />
                )
              }
            </FormItem>
            <FormItem label="早起时间" {...formItemLayout}>
              {
                getFieldDecorator('time',{
                  initialValue: moment()
                })(
                  <TimePicker onChange={this.onChangeTime}/>
                )
              }
            </FormItem>
            <FormItem label="头像" {...formItemLayout}>
              {
                getFieldDecorator('userImg')(
                  <Upload listType="picture-card"
                  showUploadList={false}
                  action="//jsonplaceholder.typicode.com/posts/"
                  onChange={this.handleChange}>
                    {this.state.userImg?<img alt="" src={this.state.userImg} /> : <Icon type="plus" />}
                  </Upload>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout} lable="">
              {
                getFieldDecorator('law',{
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Checkbox>我已阅读协议</Checkbox>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout} >
              <Button type="primary" onClick={this.handSubmit}>注册</Button>  
              <Button style={{marginLeft:20}} type="primary" onClick={this.resetSubmit}>重置</Button>  
            </FormItem>
          </Form> 
        </Card>
      </div>
    );
  }
}

export default Form.create()(FormReg);