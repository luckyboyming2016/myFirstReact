import React,{Component} from 'react'
import {Form, Icon, message, Input, Checkbox, Button } from 'antd'
import './index.less'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '创创后台管理系统'
    }
  }
  handlerSubmit=()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.username === 'admin' && values.password === 'admin'){
         this.props.history.push({
           pathname: '/home',
           state: {
             id: 1,
             name: '张三'
           }
         })
        }else{
          message.success('用户名：admin 密码：admin');
        }
      }
    });
  }
  render() {
   const { getFieldDecorator} = this.props.form
    return (
      <div className="loginWrap">
        <div className="content">
          <div style={{textAlign:'center', fontSize:'30px',marginBottom: '20px'}}>{this.state.title}</div>
          <Form onSubmit={this.handlerSubmit}>
            <Form.Item>
              {getFieldDecorator('username',{
                initialValue: 'admin',
                rules: [{required: true, message: '请输入用户名'}]
              })(
                <Input placeholder="请输入用户名" prefix={<Icon type="user" style={{color:'rgba(0,0,0,.5)'}} />} />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password',{
                initialValue: 'admin',
                rules: [{required: true, message: '请输入密码'}]
              })(
                <Input placeholder="请输入密码" type="password" prefix={<Icon type="lock" style={{color:'rgba(0,0,0,.5)'}} />} />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住密码</Checkbox>)}
              <a className="login-forgot" href="###">
                忘记密码
              </a>
              <Button type="primary" htmlType="submit" className="login-button">
                登陆
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login)