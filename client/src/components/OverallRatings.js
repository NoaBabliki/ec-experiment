import React from 'react'
import Slider from './Slider.js'

export class OverallRatings extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            ratings: this.createRatingArray()
        }
        this.sliderChange = this.sliderChange.bind(this)
    }

    createRatingArray(){
        const options = this.props.client_categories[this.props.index]
        console.log("options from create array:",options)
        const num_options = options.length
        let ratings = new Array(num_options + 1).fill(0)
        for (let i = 1; i<num_options+1; i++){
            ratings[i] = options[i-1].rating
        }
        console.log("ratings from createRating",ratings)
        return (ratings)
    }

    sliderChange(value, index){
        if (value !== this.state.ratings[index]){
            let newRatings = this.state.ratings.slice(0)
            newRatings[index] = value
            this.setState({
                ratings: newRatings
            }) 
        }
    }

    showAllOptions(){
        const options = this.props.client_categories[this.props.index]
        return(
            <div>
                {options.map((option, index) => this.showOption(option, index + 1))}
            </div>
        )
        
    }

    showOption(option, index){
        //console.log("current option", option)
        return(
        <div>
            <h4>{option.name}:</h4>
            {option? 
            <Slider
                key={index}
                index={index}
                disabled={false}
                default_rating={option.rating}
                getValue={this.sliderChange}>
            </Slider>: null}
        </div>            
        )
    }

    nextButtonAction(){
        const options = this.props.client_categories[this.props.index]
        console.log('client categories from next button:', options)
        const num_options = options.length
        let newOptions = options.slice(0)
        for (let i = 0; i < num_options; i++){
            newOptions[i].rating = this.state.ratings[i+1]
            console.log('rating at index', i+1, 'is', this.state.ratings[i+1])
            console.log('category:', newOptions[i], 'new rating:', this.state.ratings[i+1])
        }
        this.props.setCategories(newOptions)
        this.props.setFlow()
    }
    

    render() {
        return(
            <div>
                {this.props.categories? this.showAllOptions() : null}
                <button onClick={()=>{this.nextButtonAction()}}>next</button>
            </div>
        )
    }
}

export default OverallRatings