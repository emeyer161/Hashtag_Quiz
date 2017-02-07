import React from 'react';
import Radium from 'radium';
import data from './database';
import $ from 'jquery';
import Search from './components/Search';
import Images from './components/Images';
import MoreImages from './components/MoreImages';
import FinalScore from './components/FinalScore';

let styles = {
    hide: {
        display: 'none'
    },
    dim: {
      opacity: '.1'  
    },
    wrapper: {
        position: "relative",
        display:'table',
        width: "900px",
        top: "20px",
        margin: "auto",
        border: "1px solid #edeeee"
    },
    header: {
        backgroundColor: "white",
        position: "relative",
        textAlign: "center",
    	width: "100%",
    	height: "40px",
    	display: "inline-block",
    	verticalAlign: "top",
    	borderBottom: "1px solid #edeeee"
    },
        info: {
            position:'absolute',
    	    left:'10px',
    	    top:'10px',
    	    backgroundColor: 'white',
    	    color: '#125688',
            border: 'none',
            fontSize: '12px',
            fontWeight: '600'
        },
        newGame: {
            position:'absolute',
    	    right:'10px',
    	    top:'10px',
    	    backgroundColor: 'white',
    	    color: '#125688',
            border: 'none',
            fontSize: '12px',
            fontWeight: '600'
        },
        title: {
            display:'inline',
            color:'#125688',
            fontFamily:'Brush Script MT'
        },
    potentialPoints: {
        position: 'absolute',
        top: '19px',
        display: 'inline',
        fontSize: 'smaller',
        left: '30px',
        color:'#125688'
    },
    totalPoints: {
        position: 'absolute',
        top: '19px',
        display: 'inline',
        fontSize: 'smaller',
        right: '30px',
        color:'#125688'
    },
    content: {
        position:'relative',
        padding: "20px 0px 20px 0px",
        width:'100%',
        backgroundColor: '#fafafa'
    },
    infoBox: {
        position:'absolute',
        top: '45px',
        padding: "50px 16%",
        width:'68%',
        textAlign: 'center',
        color:'#125688'
    },
    closeInfoBox: {
        background:'none',
        border:'none',
        fontSize:'16px',
        fontWeight:'600',
        color:'#125688'
    }
};

class QuizApp extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            inputPlaceholder: 'Guess the #Hashtag',
            currentQuestion: -1,
            imagesVisible: 0,
            totalPoints: 0,
            possiblePoints: 10,
            infoBoxVisible: false,
            finalScoreVisible: false,
            database: [] //new object array of hashtags and images
        };
    }
    
    render() {
        return  <div style={styles.wrapper}>
                    <header style={styles.header}>
                        <input type="button" id="info" value="Info" style={styles.info} onClick={this.showInfoBox.bind(this)} />
                        <h1 style={styles.title}>#Guess</h1>
                        <input type="button" onClick={this.newGame.bind(this)} value="+New Game" style={styles.newGame}/>
                    </header>
                    {this.state.currentQuestion>=0
                        ?   <section style={[styles.content, this.state.infoBoxVisible && styles.dim]} id='content'>
                                <h2 style={styles.potentialPoints}><b>Current Potential</b>: {this.state.possiblePoints}</h2>
                                <Search placeholder={this.state.inputPlaceholder} onSubmit={this._handleSubmit.bind(this)} />
                                <h2 style={styles.totalPoints}><b>Score</b>: {this.state.totalPoints}</h2>
                                <Images currentQuestion={this.state.currentQuestion} quantity={this.state.imagesVisible} db={this.state.database} />
                                <MoreImages imagesVisible={this.state.imagesVisible} onClick={this._handleMoreImages.bind(this)} />
                            </section>
                        :   null}
                    {this.state.infoBoxVisible
                        ?   <section style={styles.infoBox} id='info'>
                                <h2>Information</h2>
                                <p>This quiz presents a set of Instagram images all containing the same hashtag.
                                The object is to guess the common hashtag between all of the images.
                                Type your guess in the form and press enter to submit your guess.</p>
                                <input type="button" id="closeInfo" value="Close" style={styles.closeInfoBox} onClick={this.closeInfoBox.bind(this)} />
                            </section>
                        :   null}
                    {this.state.finalScoreVisible 
                        ? <div style={[this.state.infoBoxVisible && styles.dim]}><FinalScore score={this.state.totalPoints} /></div>
                        :null}
                </div>;
    }

    showInfoBox(){
        this.setState({
            infoBoxVisible: true
        });
    }
    
    closeInfoBox(){
        this.setState({
            infoBoxVisible: false
        });
    }
    
    _handleSubmit(value) {
        if (value.replace(/\s+/g, '').toUpperCase() === this.state.database[this.state.currentQuestion].tag.toUpperCase()){ // If Correct
            this._handleCorrect();
        } else { // If Incorrect
            this._handleIncorrect();
        }
        setTimeout(function(){this.setState({
            inputPlaceholder: 'Guess the #Hashtag'
        })}.bind(this),1000*1.5);
    }
    
    _handleIncorrect(){
        this.setState({
            inputPlaceholder: 'Sorry, that was INCORRECT.'
        });
        if (this.state.possiblePoints<2){
            this._nextQuestion();
        } else { // If Incorrect
            this.setState({
                possiblePoints: this.state.possiblePoints-1
            });   
        }
    }
    
    _handleCorrect(){
        this.setState({
            inputPlaceholder: 'CORRECT, Nice Job!'
        });
        this._nextQuestion();
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
            this._gameOver();
        }
    }
    
    _gameOver(){
        this.setState({
            totalPoints: this.state.totalPoints+this.state.possiblePoints,
            currentQuestion: -1,
            finalScoreVisible: true
        });
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
                finalScoreVisible: false,
                infoBoxVisible: false,
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
        var url = 'https://api.instagram.com/v1/tags/'+tag+'/media/recent?access_token=226066224.33f29d1.56bf69fa79094b5db22ac301da47b87a';
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

export default Radium(QuizApp);