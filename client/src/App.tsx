import React from 'react';
import './App.css';
import {createApiClient, createApiClientChoices} from './api'; //connection to server
import StartExperiment from './components/StartExperiment';
import * as constants from './constants.js'
import FirstStageWrapper from './components/FirstStageWrapper';
import SecondStageWrapper from './components/SecondStageWrapper';


const FIRST_TITLE = 'Welcome'
const SECOND_TITLE_PART_1 = 'What do you prefer?'
const SECOND_TITLE_PART_2 = 'Make the two options equal'
const INSTRUCTIONS_PART_1 = 'In this task, we ask you to rate your preferences in a given category. You will see different options in a given category. Please rate them one by one on a scale of 1-1000.'
const INSTRUCTIONS_PART_2 = 'In this task, we ask you to compare between two options, each including a ' + constants.CATEGORY_1_SINGULAR + ' and a ' + constants.CATEGORY_2_SINGULAR + '. At each screen, you will see two options and their attributes, with one attribute value missing. Please type in an attribute value that will make the two options equally preferred, from the pools of the first task.'

// for testing perpuses:
const CATEGPRIES = [
  [
    {
      id: 0,
      name: "very long band name 0",
      rating: 100
    },
    {
      id: 1,
      name: "long band name 1",
      rating: 200
    },
    {
      id: 2,
      name: "long band name 2",
      rating: 900
    },
    {
      id: 3,
      name: "long band name 3",
      rating: 800
    }
  ],
  [
    {
      id: 0,
      name: "work0",
      rating: 150
    },
    {
      id: 1,
      name: "work1",
      rating: 250
    },
    {
      id: 2,
      name: "work2",
      rating: 950
    },
    {
      id: 3,
      name: "work3",
      rating: 850
    }
  ]
]



export type AppState = {
  flow: number,
  category_index: number,
  max_id: number,
  client_catigories: object[][],
  categories?: object[][],
  choices?: object[][]
}

const api = createApiClient()
const apiChoices = createApiClientChoices()

export class App extends React.PureComponent<{}, AppState> {

  state: AppState = {
    flow: 0, //changed to 0 for text purpuses! change back to 1 when running
    category_index: 0,
    max_id: 0,
    client_catigories: [[],[]]
	}

  async componentDidMount() {
    this.setState({
			categories: await api.getProperties(this.state.client_catigories),
		});
    this.setState({max_id: this.setMaxCategoryId()})
  }

  //from strig array to json array ---> save client data as json
  createOptions = (str_arr: string[], id_inc: number) => {
    let options_array = []
    for (let i = 0; i < str_arr.length; i++){
      let temp_option = {
        id: i + id_inc,
        name: str_arr[i],
        rating: 0,
      }
      options_array.push(temp_option)
    }
    return options_array
  }

  setCategoryIndex = () => {
    let add_to_index = 1
    if (this.state.category_index === add_to_index){
      add_to_index = -1
    }
    this.setState({
      category_index: this.state.category_index + add_to_index
    })
  }

  setCategories = async (newCategory: object[]) => {
    var new_client_categories = this.state.client_catigories.slice(0)
    new_client_categories[this.state.category_index] = newCategory
    this.setState({
      client_catigories: new_client_categories,
      categories: await api.getProperties(new_client_categories)
    })
  }

  setFlow = () => {
    this.setState({
      flow: this.state.flow + 1
    })
  }

  addParticipentOptions = async (new_caterories: object[]) => {
    var new_client_categories = this.state.client_catigories.slice(0)
    new_client_categories[this.state.category_index] = new_client_categories[this.state.category_index].concat(new_caterories)
    this.setState({
      client_catigories: new_client_categories,
      categories: await api.getProperties(new_client_categories)
    })
    console.log("categories after adding option:",this.state.categories)
  }

setMaxCategoryId(){
  let max_id = constants.MAX_CATEGORY_DISPLAY
  if (this.state.categories){
    for (let category of this.state.categories){
      let temp_id = category.length
      if (temp_id > max_id){
        max_id = temp_id
      }
    }
  }
  return max_id
}

setChoices = async (choices: object[][]) => {
  console.log(choices)
  this.setState({
    choices: await apiChoices.getProperties(choices)
  })
}

  render() {
    let title_2 = SECOND_TITLE_PART_1
    let instructions = INSTRUCTIONS_PART_1
    if (this.state.flow === 3){
      title_2 = SECOND_TITLE_PART_2
      instructions = INSTRUCTIONS_PART_2
    }
    return( 
    <main>
      <div>
        {(this.state.flow === 1 || this.state.flow === 3)?
        <StartExperiment 
        first_title={FIRST_TITLE}
        second_title={title_2}
        instructions={instructions}
        flow={this.state.flow}
        setFlow={this.setFlow}>
        </StartExperiment> : null}
      </div> 
      <div>
        {(this.state.flow === 2 && this.state.categories)?
        <FirstStageWrapper
        categories={this.state.categories}
        client_categories={this.state.client_catigories}
        max_id={this.state.max_id}
        setCategories={this.setCategories}
        addParticipentOptions={this.addParticipentOptions}
        setCategoryIndex={this.setCategoryIndex}
        setFlow={this.setFlow}>
        </FirstStageWrapper> : null}
      </div>
      <div>
      {this.state.flow === 0? //changes to 0 for test perpuses!!! change back to 4 when running
       <SecondStageWrapper
       categories={CATEGPRIES}
       setChoices={this.setChoices}>
       </SecondStageWrapper>
       :null}
      </div>   
    </main>
    )
  }

}

export default App;
