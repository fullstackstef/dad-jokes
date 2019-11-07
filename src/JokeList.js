import React, { Component } from 'react'
import axios from 'axios'
import Joke from './Joke'
import './JokeList.scss'

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props) {
        super(props)
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            isLoading: false
        }
        this.seenJokes = new Set(this.state.jokes.map(joke => joke.id))
    }
    componentDidMount() {
        if(this.state.jokes.length === 0) this.getJokes()
    }
    getJokes = async () => {
        try {
            let jokes = []
            while(jokes.length < this.props.numJokesToGet) {
                let joke = await axios.get('https://icanhazdadjoke.com/', {headers: {accept: 'application/json'}})
                let jokeRes = joke.data
                let isUnique = this.seenJokes.has(jokeRes.id)
                if(!isUnique) {
                    jokes.push({id: jokeRes.id, joke: jokeRes.joke, votes: 0})
                    this.seenJokes.add(jokeRes.id)
                } else {
                    console.log('Found a duplicate')
                }
            }
            this.setState(st => ({
                jokes: [...st.jokes, ...jokes],
                isLoading: false
            }), () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)
            ))
            window.localStorage.setItem("jokes", JSON.stringify(jokes))
        } catch(e) {
            alert(e)
            this.setState({isLoading: false})
        }
    }
    handeClick = () => {
        this.setState({ isLoading: true}, this.getJokes)
    }
    handleVote = (id, delta) => {
        this.setState(st => ({
            jokes: st.jokes.map(joke => joke.id === id ? {...joke, votes: joke.votes + delta} : joke)
        }),
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        )
    }
    render() {
        if(this.state.isLoading) {
            return (
                <div className="JokeList-spinner">
                    <i className="far fa-8x fa-laugh fa-spin" />
                    <h1 className="JokesList-title">Loading. . .</h1>
                </div>
            )
        }
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="laughing"/>
                    <button className="JokeList-button" onClick={this.handeClick}>New Jokes</button>
                </div>
                <div className="JokesList-jokes">
                    {
                        this.state.jokes.sort((a, b) => b.votes - a.votes).map(joke => 
                            <Joke 
                                key={joke.id} 
                                id={joke.id}
                                jokeText={joke.joke} 
                                jokeVoteCount={joke.votes} 
                                upVote={this.handleVote} 
                                downVote={this.handleVote}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}

export default JokeList