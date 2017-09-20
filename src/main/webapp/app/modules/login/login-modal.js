import React, { Component, PropTypes } from 'react';

import { Row ,Card,Col,Table,Button,Form, Input,Alert} from 'antd';
import 'antd/dist/antd.css';
import $ from 'jquery'

class LoginModal extends Component {

  static propTypes = {
    authenticationError: PropTypes.bool,
    handleLogin: PropTypes.func.isRequired,
  };

  static defaultProps = {
    authenticationError: false
  };

  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      username: null,
      password: null,
      isOk:false,
    };
  }

  handleSubmit() {
    const { handleLogin } = this.props;
    const { username, password } = this.state;
    if(!username || !password || $.trim(username)=='' || $.trim(password)==''){
      this.setState({isOk:true});
      return;
    }
    handleLogin(username, password, false);  // FIXME remember me value must be passed
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleClose=()=>{
    this.setState({isOk:false});
  }

  render() {
    const { authenticationError} = this.props;
    let alert;
    if(this.state.isOk){
      alert=<Alert message="请填写用户名或密码" type="error" showIcon onClose={this.alertClose} closeText="不再提醒"/>;
    }

    return (
      <div  style={{ width:'100%',padding:'200px 0 400px 0',background: '#ddd'}}>
        <div style={{margin:"0 auto"}}>
          <Card title="用户登录"  bordered={true}  style={{width:500,margin:'0 auto'}}>
            <Form inline  autoComplete='off'>
              <Row style={{lineHeight:'45px'}}>
                <Col span='3'>账号：</Col>
                <Col span='20'>
                  <Input id="username"
                         name="username"
                         size="large"
                         defaultValue=""
                         placeholder="请输入账户名"
                         autoComplete='off'
                         onChange={this.handleUsernameChange}
                         style={{height:40}}/>
                </Col>
              </Row >
              <Row  style={{margin:"20px 0",lineHeight:'45px'}}>
                <Col span='3'>密码：</Col>
                <Col span='20'>
                  <Input id="password"
                         name="password"
                         size="large" defaultValue=""
                         type={this.state.passwordType}
                         placeholder="请输入密码"
                         onChange={this.handlePasswordChange}
                         autoComplete='off' style={{height:40}} />
                </Col>
              </Row >
              <Row>{alert}</Row>
              <Row>
                <Button size="large"  onClick={this.handleSubmit} type="primary" htmlType="button" className='pull-right' style={{marginRight:'20px',marginLeft:'370px'}}>登录</Button>
              </Row>

            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default LoginModal;
