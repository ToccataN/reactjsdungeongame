import React, {Component} from 'react';

class Square extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
      if(this.props.val=='false'){  
       return (<div className='squaref' ></div>)
      } else if(this.props.val=='true'){
          return (<div className='squaret'></div>)
      } else if(this.props.val=='health'){
          return (<div className='squareh'></div>)
      } else if(this.props.val=='player'){
          return (<div  className='squarep' ></div>)
      } else if(this.props.val=='enemy'){
          return (<div className='squaree'></div>)
      }else if(this.props.val=='weapon'){
          return (<div className='squarew'></div>)
      }
    }
}

export default Square;