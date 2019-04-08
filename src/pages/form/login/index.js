import React,{Component} from 'react'
import {Card, Form, Input, Button,message, Icon, Checkbox } from 'antd'
import './index.less'
var FormItem= Form.Item
class FormLogin extends Component {
  sumbitHandler=()=>{
    let submitVal = this.props.form.getFieldsValue()
    console.log(submitVal);
    this.props.form.validateFields((err,values)=>{
      if(!err){
        message.success(`恭喜你，你通过验证了，你的账号是${submitVal.userName},密码为${submitVal.password}`)
      }
    })
    
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="uiButton">
        <Card title="登录行内表单" className="cardWarp">
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem>
              <Input type="password" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary">登录</Button>
            </FormItem>
          </Form> 
        </Card>
         <Card title="登录水平表单" className="cardWarp">
          <Form style={{width:300}}>
            <FormItem>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {required: true, message: '用户名不能为空'},
                    {min:5, max:10, message: '长度为5至10之内'}
                  ]
                })(
                  <Input prefix={<Icon type="user" />} placeholder="请输入用户名"></Input>
                )
              }
              
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('password', {
                  initialValue: '',
                  rules: [
                    {required: true, message: '密码不能为空'},
                    // {pattern: /^\d*$/g, message: '密码必须为数字'}
                    {pattern: new RegExp('^\\d*$','g'), message: '密码必须为数字'}

                  ]
                })(
                  <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码"></Input>
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>记住密码</Checkbox>
                )
              }
              <a style={{float:'right'}} href="##">忘记密码</a>
            </FormItem>
            <FormItem>
              <Button block type="primary" onClick={this.sumbitHandler}>登录</Button>
            </FormItem>
          </Form> 
        </Card>
      </div>
    );
  }
}

export default Form.create()(FormLogin);