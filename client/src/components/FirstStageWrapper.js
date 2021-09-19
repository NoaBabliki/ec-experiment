import React from 'react'
import * as constants from '../constants.js'
import ChooseOptions from './ChooseOptions';
import AddCustomItems from './AddCustomItems';
import RateOptions from './RateOptions';
import OverallRatings from './OverallRatings.js';
//import OverallRatings from './components/OverallRatings';

export class FirstStageWrapper extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            flow: 1,
            category_index: 0,
        }
        this.setFlow = this.setFlow.bind(this)
    }

    setFlow(){
        this.setState({flow: this.state.flow + 1})
        //console.log('flow for first segment', this.state.flow)
    }

    setCategoryIndex(){
        if (this.state.category_index + 1 < this.props.categories.length){
            this.setState({
                category_index: this.state.category_index + 1,
                flow: 1,
            })
            this.props.setCategoryIndex()
           // console.log('index for first segment', this.state.category_index)
            //console.log('flow for first segment', this.state.flow)
        }
        else{
            this.props.setFlow()
        }
    }

    setCategory = () => {
        const names = [constants.CATEGORY_1, constants.CATEGORY_2]
        return (names[this.state.category_index])     
    }
    

    render() {
        return(
        <main>
        <div>  
      {(this.props.categories && this.state.flow === 1)?
      <ChooseOptions key={this.state.category_index} 
        categories={this.props.categories} 
        index={this.state.category_index}
        setCategories={this.props.setCategories}
        setCategory={this.setCategory}
        setFlow={this.setFlow}>
      </ChooseOptions> : null}
      </div>
      <div>
        {this.state.flow === 2?
        <AddCustomItems
        key={this.state.category_index}
        index={this.state.category_index}
        setCategory={this.setCategory}
        addParticipentOptions={this.props.addParticipentOptions}
        numCategories={this.props.categories.length}
        maxId={this.props.max_id}
        setFlow={this.setFlow}>
        </AddCustomItems> : null}
      </div>
      <div>{(this.state.flow === 3 && this.props.categories)?
      <RateOptions
      key={this.state.category_index}
      index={this.state.category_index}
      max_id={this.props.max_id}
      categories={this.props.categories}
      setCategories={this.props.setCategories}
      setFlow={this.setFlow} >
      </RateOptions> : null}
      </div>
      <div>
        {(this.state.flow === 4 && this.props.categories)?
       <OverallRatings
       key={this.state.category_index}
       index={this.state.category_index}
       categories={this.props.categories}
       setCategories={this.props.setCategories}
       client_categories={this.props.client_categories}
       setFlow={this.setFlow}>
       </OverallRatings>: null}
      </div>
      <div>
          {this.state.flow === 5? this.setCategoryIndex(): null}
      </div>
        </main>)
    }
}

export default FirstStageWrapper