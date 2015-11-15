import React from 'react';
import data from './database';
import $ from 'jquery';
import Search from './components/Search';
import Images from './components/Images';
import MoreImages from './components/MoreImages';

let styles = {
    wrapper: {
        position: "relative",
        minHeight: "200px",
        display:'table',
        width: "900px",
        top: "20px",
        margin: "auto",
        backgroundColor: "#F8F8F8",
        border: "1px solid #E4E4E4"
    },
    header: {
        backgroundColor: "white",
        position: "relative",
        textAlign: "center",
    	width: "100%",
    	height: "37px",
    	display: "inline-block",
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
    potentialPoints: {
        position: 'absolute',
        top: '0px',
        display: 'inline',
        fontSize: 'smaller',
        left: '30px',
        color:'#125688'
    },
    totalPoints: {
        position: 'absolute',
        top: '0px',
        display: 'inline',
        fontSize: 'smaller',
        right: '30px',
        color:'#125688'
    },
    content: {
        position:'relative',
        margin: "20px 0px 20px 0px",
        width:'100%'
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

class QuizApp extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            inputPlaceholder: 'Guess the #Hashtag',
            currentQuestion: 0,
            imagesVisible: 0,
            totalPoints: 0,
            possiblePoints: 10,
            database: [] //new object array of hashtags and images
        };
    }
    
    
    render() {
        return  <div style={styles.wrapper}>
                    <header style={styles.header}>
                        <input type="button" value="info" style={styles.info}/>
                        <h1 style={styles.title}>#Guess</h1>
                        <input type="button" onClick={this.newGame.bind(this)} value="New Game" style={styles.newGame}/>
                    </header>
                    <section style={styles.content}>
                        <h2 style={styles.potentialPoints}><b>Current Potential</b>: {this.state.possiblePoints}</h2>
                        <Search placeholder={this.state.inputPlaceholder} onSubmit={this._handleSubmit.bind(this)} />
                        <h2 style={styles.totalPoints}><b>Score</b>: {this.state.totalPoints}</h2>
                        <Images currentQuestion={this.state.currentQuestion} quantity={this.state.imagesVisible} db={this.state.database} />
                        <MoreImages imagesVisible={this.state.imagesVisible} onClick={this._handleMoreImages.bind(this)} />
                    </section>
                </div>;
    }
    
    _handleSubmit(value) {
        if (value.replace(/\s+/g, '').toUpperCase() === this.state.database[this.state.currentQuestion].tag.toUpperCase()){
            this._nextQuestion();
        } else {
            if (this.state.possiblePoints<2){
                this._nextQuestion();
            } else {
                this.setState({
                    possiblePoints: this.state.possiblePoints-1
                });   
            }
        }
    }
    
    _nextQuestion(){
        if (this.state.currentQuestion < 9){
            this.setState({
                currentQuestion: this.state.currentQuestion+1,
                imagesVisible: 5,
                totalPoints: this.state.totalPoints+this.state.possiblePoints,
                possiblePoints: 10
            });   
        } else {
            this.newGame();
        }
    }
    
    _handleMoreImages(){
        if (this.state.possiblePoints<3){
            this._nextQuestion();
        } else {
            this.setState({
                imagesVisible: this.state.imagesVisible+5,
                possiblePoints: this.state.possiblePoints-2
            });   
        }
    }
    
    newGame() {
        console.log("Running new game");
        var tempDB = this._genDatabase('food');
        
        setTimeout(function(){
            this.setState({
                currentQuestion: 0,
                imagesVisible: 5,
                totalPoints: 0,
                possiblePoints: 10,
                database: tempDB
            });
            console.log('Correct answer is: ',this.state.database[this.state.currentQuestion].tag);
        }.bind(this),1000*1);
    }
    
    _genDatabase(dataType) {
        var qList = [];
        var tagName;
        var dBdata = this.shuffle(data[dataType]);
        for (var q=0; q<10; q++){
            tagName = dBdata[q].name;
            qList[q] = {
                tag: tagName,
                images: this._queryIgForURLs(tagName)
            };
        }
        return qList;
    }
    
    _queryIgForURLs(tag) {
        var imgArray = [];
        var url = 'https://api.instagram.com/v1/tags/'+tag+'/media/recent?access_token=226066224.1fb234f.90aa19125f2c42bd9a9fbe0e24685e92';
        $.ajax({type: 'GET', url: url, async: false, contentType: "application/json", dataType: 'jsonp'})
            .done(function(result) {
    	    console.log("Querying IG Database...");
            for (var i=0; i<15; i++){
                imgArray[i]=result.data[i].images.low_resolution.url;
            }
        });
        return imgArray;
    }
    
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };
}

export default QuizApp;