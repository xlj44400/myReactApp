import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSession,logout} from '../../reducers/authentication';
import {Button} from 'antd'
import './home.scss';

export class Home extends Component {
  static propTypes = {
    account: React.PropTypes.object.isRequired,
    getSession: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.account
    };
  }

  componentWillMount() {
    this.props.getSession();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.account
    });
  }

  handleLogout=()=>{
    this.props.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (

    <div className="panel-box ant-collapse">
      <div className="ant-collapse-item">
        <div className="ant-collapse-header">
          <span>后台管理</span>
        </div>
        <div className="ant-collapse-content ant-collapse-content-active">
          <div className="ant-collapse-content-box">
            <h3>欢迎登录成功
              <Button style={{marginLeft:20}} htmlType="button" onClick={this.handleLogout}>退出登录</Button>
            </h3>
          </div>
        </div>
      </div>
    </div>

    );
  }
}

export default connect(
  store => ({
    account: store.authentication.account,
    isAuthenticated: store.authentication.isAuthenticated
  }),
  { getSession,logout}
)(Home);
