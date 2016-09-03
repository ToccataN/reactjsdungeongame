import React, {Component} from 'react';

class Fog extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        if (this.props.val=='false'){
            return(<div className='squareb'></div>)
        } else{
             return(<div className='squaret'></div>)
        }
    }
}

export default Fog;