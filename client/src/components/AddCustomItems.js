import React from 'react'
import '../App.css'
import * as constants from '../constants.js'


export class AddCustomItems extends React.PureComponent {

    constructor(props){
        super(props)
        this.state = {
            current_option_index = 0,
            options_added = [],
        }
    }

    //get input
    addOption(){

    }
    //submit the option
    //check if we need to add another option or go to next experiment stage
    submitOptionButton(){

    }

    //participent types the option in the box in addOption
    //participent rates the option in the slider
    //submit option with rating and continue
    render(){
        return (null)
    }
}

export default ChooseOptions