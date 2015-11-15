import React from 'react';

class MoreImages extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {
            styles: {
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
                color:'#125688'
            },
            showButton: false
        };
    }
    
    render() {
        if (this.state.showButton) {
            return  <div>
                        <input type="button" 
                        value="More Images"
                        onClick={this._handleClick.bind(this)}
                        style={this.state.styles} />
                    </div>;
        } else {
            return <div />
        }
    }
    
     _handleClick(event) {
        this.props.onClick();
    }
    
    componentWillReceiveProps(nextProps){
        // Not called for the initial render
        // Previous props can be accessed by this.props
        // Calling setState here does not trigger an an additional re-render
        
        if (nextProps.imagesVisible < 15){
            this.setState({
                showButton: true
            });
        } else {
            this.setState({
                showButton: false
            });
        }
    }
    
}

export default MoreImages;