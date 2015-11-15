import React from 'react';

class Images extends React.Component {
    
    constructor(props) {
        super(props);
        console.log("Images.props=",this.props);
        
        this.state = {
            currentImages: [],
            styles: {
                height:'156px',
                width:'156px',
                marginLeft:'18px',
                marginTop:'20px',
                border: '1px solid #E4E4E4',
                display:'inline-block',
                backgroundColor:'white'
            }
        };
        console.log("Images Constructor Finished");
    }
    
    componentWillReceiveProps(nextProps){
        // Not called for the initial render
        // Previous props can be accessed by this.props
        // Calling setState here does not trigger an an additional re-render
        
        console.log("Images recieved updated DB: ",nextProps.db);
        this.setState({
            currentImages: this.setImages(nextProps.currentQuestion, nextProps.quantity, nextProps.db)
        });
    }
    
    render() {
        console.log("Images rendering, this.state=",this.state);
        return  <div>
                    {this.state.currentImages.map(function(img){
                        return <img src={img} style={this.state.styles}/>;
                    },this)}
                </div>;
    };
    
    setImages(currentQuestion, quantity, db) {
        var imgArray = [];
        if (db.length > 0){
            for (var i=0; i<quantity; i++){
                imgArray[i] = db[currentQuestion].images[i];
            }
        }
        return imgArray;
    }
}

export default Images;