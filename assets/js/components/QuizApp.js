import React from 'react';
import database from '../database';
import jquery from 'jquery';

let styles = {
    wrapper: {
        position: "relative",
        minHeight: "200px",
        display:'table',
        width: "900px",
        top: "50px",
        margin: "auto",
        backgroundColor: "#F8F8F8",
        border: "1px solid #E4E4E4"
    },
    header: {
        backgroundColor: "white",
        position: "relative",
    	width: "100%",
    	height: "37px",
    	display: "inline-block",
    	textAlign: "center",
    	verticalAlign: "top",
    	borderBottom: "1px solid #E4E4E4"
    },
        info: {
            position:'absolute',
    	    left:'10px',
    	    top:'10px'
        },
        newGame: {
            position:'absolute',
    	    right:'10px',
    	    top:'10px'
        },
        title: {
            display:'inline',
            color:'#125688',
            fontFamily:'Brush Script MT'
        },
    content: {
        position:'relative',
        margin: "20px 0px 20px 0px",
        width:'100%'
    },
        userInput: {
            position:'relative',
            marginLeft: '300px',
            height:'30px',
            width:'300px',
            border:'1px solid #E4E4E4',
            borderRadius:'15px',
            textAlign:'center',
            display:'block'
        },
        imageLine: {
            position:'relative',
            width:'100%',
            marginTop:'20px',
            height:'160px',
            display:'block'
        },
            imageBox: {
                height:'156px',
                width:'156px',
                marginLeft:'18px',
                border: '1px solid #E4E4E4',
                display:'inline-block',
                backgroundColor:'white'
            }
};

// QuizApp (app.js)
//     Header
//         info
//         logo
//         newGame
//     Content
//         Search
//         div
//             image
//             image
//             image
//             image
//             image
//         button

export default class QuizApp extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            currentQuestion: 0,
            rowsVisible: 0,
            totalPoints: 0,
            possiblePoints: 10,
            questionsList: [] //new object array of hashtags and images
        };
    }
    
    // shouldComponentUpdate(nextProps, nextState) {return true;}
    // componentDidMount() {}
    // componentWillUnmount() {}
    
    render() {
        console.info("running QuizApp render function");
        console.log("state: "+this.state);
        return  <div id="wrapper" style={styles.wrapper}>
                    <div id="header" style={styles.header}>
                    	<button name='info' id='info' className='button' style={styles.info}>Info</button>
                    	<h1 style={styles.title}>#Guess</h1>
                    	<input type="button" onClick={this.newGame.bind(this)} id='newGame' className='button' style={styles.newGame} value="New Game"/>
                    </div>
                    <div id="content" style={styles.content}>
                    <input style={styles.userInput} type="text" name="userGuess" id="userGuess" autoComplete="off" placeholder="Guess the #Hashtag"/>
                    <div className="imageLine" style={styles.imageLine}>
                            <div className="imageBox" style={styles.imageBox} />
                            <div className="imageBox" style={styles.imageBox} />
                            <div className="imageBox" style={styles.imageBox} />
                            <div className="imageBox" style={styles.imageBox} />
                            <div className="imageBox" style={styles.imageBox} />
                        </div>
                        <button name='moreImages' id='moreImages' className='moreImages' style={styles.moreImages}><b>MORE IMAGES</b></button>
                    </div>
                </div>;
    }
    
    newGame() {
        console.log("Running new game");
        this.setState({
            currentQuestion: 1,
            rowsVisible: 1,
            totalPoints: 0,
            possiblePoints: 10,
            questionsList: this._genQuestionsList()
        });
    }
    
    _genQuestionsList() {
        var qList = [];
        var tagName;
        for (var q=0; q<10; q++){
            tagName = database.food[q].name;
            qList[q] = {
                tag: tagName,
                images: this._genImageArray(tagName)
            };
        }
        
        var url = 'https://api.instagram.com/v1/tags/'+tagName+'/media/recent?access_token=226066224.1fb234f.90aa19125f2c42bd9a9fbe0e24685e92'
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            contentType: "application/json",
            dataType: 'jsonp'
    	}).done(function( data ) {
            console.log(data);
        });
        
        
        
        return qList;
    }
    
    _genImageArray(tag) {
        for (var i=0; i<9; i++){
            return [];
        }
    }
    
    next(e) {
        this.setState({
            currentQuestion: this.state.currentQuestion+1
        });
    }
}