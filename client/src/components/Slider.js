import React from 'react'
import * as constants from '../constants.js'
import ReactSlider from "react-slider";

export class Slider extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            current_rating: this.defaultRating(),
        }
        //console.log('slider constructor',this.state.current_rating)
    }

    defaultRating(){
        return (this.props.default_rating)
    }

    sliderChange(value) {
      //  console.log('value:',value)
        if (this.state.current_rating !== value){
            this.setState({
                current_rating: value,
            })
            if (this.props.index){
            //console.log('index from slider', this.props.index)
            this.props.getValue(value, this.props.index)
            }
            else{
                this.props.getValue(value) // make a props to recieve value
            } 
        }   
    }

    render() {
        return (
            <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        disabled={this.props.disabled} //create disable prop or state
                        marks
                        min={constants.MIN_RATING}
                        max={constants.MAX_RATING}
                        value={this.state.current_rating}
                        renderThumb={(props, state) => <div {...props} onChange={this.sliderChange(state.valueNow)}>{state.valueNow}</div>}
                        //renderTrack={(props, state) => <div {...props} />}//custom track
                    />
        )
    }
    
}

export default Slider