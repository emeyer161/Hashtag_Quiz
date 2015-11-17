import React from 'react';
import Radium from 'radium';

class MoreImages extends React.Component{
    constructor(props) {
        super(props);
        
        this.styles = { 
            main: {
                position:'relative',
                marginTop: "20px",
                marginLeft: '395px',
                height:'110px',
                width:'110px',
                border:'2px solid #125688',
                borderRadius:'55px',
                textAlign:'center',
                backgroundColor:'white',
                display:'block',
                color:'#125688',
                fontSize: '14px',
                fontWeight: '500'
            },
            hide: {
                display: 'none'  
            }
        };
        
        // this.state = {
        //     hideButton: true
        // };
    }
    
    render() {
        return  <div>
                    <input type="button" 
                    value="LOAD MORE"
                    onClick={this._handleClick.bind(this)}
                    style={[this.styles.main, this.props.imagesVisible>=15 && this.styles.hide]} />
                </div>;
    }
    
     _handleClick(event) {
        this.props.onClick();
    }
    
    // componentWillReceiveProps(nextProps){
    //     // Not called for the initial render
    //     // Previous props can be accessed by this.props
    //     // Calling setState here does not trigger an an additional re-render
        
    //     if (nextProps.imagesVisible < 15){
    //         this.setState({
    //             hideButton: false
    //         });
    //     } else {
    //         this.setState({
    //             hideButton: true
    //         });
    //     }
    // }
    
}

export default Radium(MoreImages);