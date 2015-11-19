import React from 'react';

class Images extends React.Component {
    
    constructor(props) {
        super(props);
        console.log("Images.props=",this.props);

        this.style = {
            height:'156px',
            width:'156px',
            marginLeft:'18px',
            marginTop:'20px',
            border: '1px solid #E4E4E4',
            display:'inline-block',
            backgroundColor:'white'
        };
    }
    
    render() {
        var imgArray = this.setImages(this.props.currentQuestion, this.props.quantity, this.props.db);
        return  <div>
                    {imgArray.map(function(img){
                        return <img src={img} style={this.style}/>;
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