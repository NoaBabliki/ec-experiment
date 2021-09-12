import React from 'react';
import './App.css';
import {createApiClient} from './api'; //connection to server
import ChooseOptions from './components/ChooseOptions';
import StartExperiment from './components/StartExperiment';


export type AppState = {
  flow: number,
  category_index: number,
  client_catigories: object[][],
  categories?: object[][],
}

const api = createApiClient()

export class App extends React.PureComponent<{}, AppState> {

  state: AppState = {
		flow: 1,
    category_index: 0,
    client_catigories: [[],[]]
	}

  /** 
  dataUpdate = async () => {
    this.setState({
			categories: await api.getProperties()
		});
    //console.log(this.state.categories)
	}
  */

  async componentDidMount() {
    this.setState({
			categories: await api.getProperties(this.state.client_catigories)
		});
    //console.log(this.state.categories)
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

  setCategories = async (newCategory: object[]) => {
    var new_client_categories = this.state.client_catigories.slice(0)
    new_client_categories[this.state.category_index] = newCategory
    //console.log('client categories', new_client_categories)
    let add_to_index = 1
    if (this.state.category_index === add_to_index){
      add_to_index = -1
    }
    this.setState({
      category_index: this.state.category_index + add_to_index,
      client_catigories: new_client_categories,
      categories: await api.getProperties(new_client_categories)
    })
    //console.log('client categories after update', this.state.client_catigories)
  }

  setFlow = () => {
    this.setState({flow: this.state.flow + 1})
  }

  render() {
    return( 
    <main>   
      <div>
        {this.state.flow === 1?
        <StartExperiment 
        setFlow={this.setFlow}>
        </StartExperiment> : null}
      </div> 
      <div>  
      {(this.state.categories && this.state.flow === 2)?
      <ChooseOptions key={this.state.category_index} 
        categories={this.state.categories} 
        index={this.state.category_index}
        setCategories={this.setCategories}
        setFlow={this.setFlow}>
      </ChooseOptions> : null}
      </div>
    </main>
    )
  }

}

export default App;
