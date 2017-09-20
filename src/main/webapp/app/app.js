import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getSession, logout } from './reducers/authentication';
import Header from './shared/components/header/header';
import Footer from './shared/components/footer/footer';
export class App extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    currentLocale: PropTypes.string.isRequired,
    getSession: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    isAuthenticated: false,
    children: null
  };

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const {location} = this.props;
    console.log(666666+ location.pathname);
    if(this.props.isAuthenticated){

    }
    this.props.getSession();
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    return (

    <div>
      <Header />
      <div className="container-fluid">
        {this.props.children}
      </div>
      <Footer />
    </div>
    );
  }
}

export default connect(
  store => ({ isAuthenticated: store.authentication.isAuthenticated, currentLocale: store.locale.currentLocale }),
  { getSession, logout }
)(App);
