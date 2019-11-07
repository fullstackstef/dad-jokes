import React, { Component } from 'react'
import './Joke.scss'

class Joke extends Component {
    handleUpVote = () => {
        this.props.upVote(this.props.id, 1)
    }
    handleDownVote = () => {
        this.props.downVote(this.props.id, -1)
    }
    getColor = () => {
        if(this.props.jokeVoteCount >= 15) {
            return '#4CAF50'
        } else if(this.props.jokeVoteCount >= 12) {
            return '#8bc34a'
        } else if(this.props.jokeVoteCount >= 9) {
            return '#CDDC39'
        } else if(this.props.jokeVoteCount >= 6) {
            return '#FFEB3B'
        } else if(this.props.jokeVoteCount >= 3) {
            return '#FFC107'
        } else if(this.props.jokeVoteCount >= 0) {
            return '#FF9800'
        } else {
            return '#F44336'
        }
    }
    getEmoji = () => {
        if(this.props.jokeVoteCount >= 15) {
            return 'em em-rolling_on_the_floor_laughing'
        } else if(this.props.jokeVoteCount >= 12) {
            return 'em em-laughing'
        } else if(this.props.jokeVoteCount >= 9) {
            return 'em em-smiley'
        } else if(this.props.jokeVoteCount >= 6) {
            return 'em em-slightly_smiling_face'
        } else if(this.props.jokeVoteCount >= 3) {
            return 'em em-neutral_face'
        } else if(this.props.jokeVoteCount >= 0) {
            return 'em em-confused'
        } else {
            return 'em em-angry'
        }
    }
    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i className="fas fa-arrow-up" onClick={this.handleUpVote} />
                    <span className="Joke-votes" style={{borderColor: this.getColor()}}>{this.props.jokeVoteCount}</span>
                    <i className="fas fa-arrow-down" onClick={this.handleDownVote}/>
                </div>
                <div className="Joke-text">{this.props.jokeText}</div>
                <div className="Joke-smiley">
                    <i className={this.getEmoji()} aria-role="presentation" aria-label="ROLLING ON THE FLOOR LAUGHING"></i>
                </div>
            </div>
        )
    }
}

export default Joke