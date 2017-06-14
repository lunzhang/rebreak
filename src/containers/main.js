import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = function(state){
  return {
      state:state
  };
};

class Main extends Component{

  render(){
    return(
      <div id="main">
        {this.props.state.message}
      </div>
    );
  }

};

export default connect(mapStateToProps)(Main);