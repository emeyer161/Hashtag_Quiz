import React from 'react';
import Radium from 'radium';

class FinalScore extends React.Component{
    constructor(props) {
        super(props);
        
        this.styles = { 
            position:'absolute',
            top: '45px',
            padding: "50px 16%",
            width:'68%',
            textAlign: 'center',
            color:'#125688'
        };
    }
    
    render(){
        console.log(this.props.score);
        if (this.props.score < 60){
            return <h2 style={this.styles}>Well...you earned your participation ribbon with a <b>{this.props.score}%</b>...</h2>;
        } else if (this.props.score < 75){
            return <h2 style={this.styles}>Hey! <b>{this.props.score}%</b> is a passing grade, so theres that!</h2>;
        } else if (this.props.score <100){
            return <h2 style={this.styles}>Nice Job! <b>{this.props.score}%</b> is just darn swell!</h2>;
        } else {
            return <h2 style={this.styles}>Whoa, a perfect score!<br />You should donate your brain to science!<br />Throw a party!<br />Revel in your success!</h2>;
        }
    }
    
}

export default Radium(FinalScore);