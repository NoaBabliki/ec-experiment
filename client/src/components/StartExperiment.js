import React from 'react'
import '../App.css'
import * as constants from '../constants.js'

export class StartExperiment extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            page: 1
        }
    }

    welcomePage = () => {
        return(
            <div>
            <h1>Welcome</h1>
            <h2>Press the 'next' button to continue</h2>
            {this.nextButton()}
            </div>
        )
    }

    titlePage = () => {
        return(
            <div>
                <h1>What do you prefer?</h1>
                {this.nextButton()}
            </div>
        )
    }

    instructionsPage = () => {
        return (
            <div>
                <h1>Instructions</h1>
                <h3>{constants.INSTRUCTIONS}</h3>
                {this.nextButton()}
            </div>
        )
    }

    nextButton = () => {
        return (
            <button onClick={() => {this.nextButtonAction()}}>next</button>
        )
    }

    nextButtonAction = () => {
        this.setState({page: this.state.page + 1})
        if (this.state.page === 3){
            this.props.setFlow()
        }

    }
    
    render(){
        return (
            <div>
                {this.state.page === 1?
                this.welcomePage() : 
                this.state.page === 2?
                this.titlePage() : 
                this.state.page === 3?
                this.instructionsPage() :
                null}
            </div>
        )
    }
}

export default StartExperiment