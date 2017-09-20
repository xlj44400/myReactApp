import React, { Component, PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { browserHistory } from 'react-router';

const SubMenu = Menu.SubMenu;
import './header.scss';

export default class Header extends Component {
 /* static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };*/

  constructor(props) {
    super(props);
  }

  handleClick=(e)=> {
    console.log('click', e);
    switch (e.key){
      case '0':
        browserHistory.push("/index");
        break;
      case '1':
        browserHistory.push("/admin/audits")
        break;
      case '2':
        browserHistory.push("/articleList")
        break;
      case '4':
        browserHistory.push("/invalidWordPage")
        break;
      case '3':
        browserHistory.push("/tag/view")
        break;
      case '5':
        browserHistory.push("/accountListPage")
        break;
      default:
        window.location.href="#";
    }
  }


  render() {
    const {isAuthenticated} = this.props;

    if (isAuthenticated) { // 已经登录

    }

    return (
      <div style={{ marginBottom:20}}>
        <Menu onClick={this.handleClick}  mode="horizontal" theme="dark">
          <SubMenu key="sub1" title={<span><Icon type="home" /><span>首页</span></span>}>
            <Menu.Item key="0">首页</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="mail" /><span>Audits</span></span>}>
            <Menu.Item key="1">Audits</Menu.Item>
            <Menu.Item key="4">无效词管理</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>公众号管理</span></span>}>
            <Menu.Item key="5">公众号列表</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
