import React from 'react';

class Search extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            value: '',
            styles: {
                position:'relative',
                marginLeft: '300px',
                height:'30px',
                width:'300px',
                border:'1px solid #E4E4E4',
                borderRadius:'15px',
                textAlign:'center',
                display:'inline'
            }
        }
    }
    render() {
        return  <div>
                    <input type="text" 
                        value={this.state.value}
                        placeholder={this.props.placeholder}
                        style={this.state.styles}
                        onChange={this._handleChange.bind(this)} 
                        onKeyDown={this._handleKeyDown.bind(this)}/>
                </div>
    }
    
    _handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }
    
    _handleKeyDown(event) {
        if (event.which === 13) {
            console.info('Submit!!!');
            this.props.onSubmit(this.state.value);
            this.setState({
                value: ''
            })
        }
    }
}

Search.propTypes = {
    placeholder: React.PropTypes.string,
    onSubmit: React.PropTypes.func
}

Search.defaultProps = {
    placeholder: 'asdf',
    onSubmit: function(){}
}

export default Search;