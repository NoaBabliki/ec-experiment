import React from 'react'
import '../App.css'
import * as constants from '../constants.js'

export class ChooseOptions extends React.PureComponent {
    constructor(props){
        super(props)
        //change to fit json format
        const data = this.props.categories[this.props.index].sort(function(){ return Math.random() - 0.5});
        const paginatedData = data.slice(data.length - constants.MAX_CATEGORY_DISPLAY);
        const items_left = data.filter( ( item ) => !paginatedData.includes( item ) );
        this.state = {
            category: this.props.setCategory(),
            category_arr: paginatedData,
            category_to_add: items_left,
            category_catche: []
        }
    }


    setCategoryArray(to_remove){
        console.log(to_remove)
        var to_remove_index = this.state.category_arr.findIndex(item => item === to_remove)
        var new_category_arr = this.state.category_arr.slice(0)
        console.log('category to add 0', this.state.category_to_add[0], '\nto remove index:', to_remove_index)
        new_category_arr[to_remove_index] = this.state.category_to_add[0]
        console.log('after change', new_category_arr)
        this.setState({category_arr: new_category_arr,
        category_catche: this.state.category_catche.concat([[to_remove, to_remove_index]]),
        category_to_add: this.state.category_to_add.slice(1)
        });
    }


    undo(){
        const to_undo = this.state.category_catche.pop()
        var new_category_arr = this.state.category_arr.slice(0)
        var old_value = new_category_arr[to_undo[1]]
        new_category_arr[to_undo[1]] = to_undo[0]
        this.setState({category_arr: new_category_arr,
            category_to_add: [old_value].concat(this.state.category_to_add),
            });     
    }


    undo_button(){
        var disable = false
        if (this.state.category_catche.length === 0){
            disable = true
        }
        return (
            <button onClick={() => {this.undo()}} disabled={disable}>Undo</button>
        )
    }

    removeButtonAction(obj){
        if (this.state.category_to_add.length > 0){
            this.setCategoryArray(obj)
        }
    }


    remove_button(obj){
        return (
            <button onClick={() => {this.removeButtonAction(obj)}}>{obj.name}</button>
        )
    }

    noMoreAlternativesMsg(){
        if (!this.state.category_to_add.length){
            return (<h4>no more alternatives to choose from</h4>)
        }   
    }


    createTable(){
        console.log(this.state.category_arr)
        const n_cols = 4
        var two_d_data = []
        const category_arr_copy = this.state.category_arr.slice(0)
        while(category_arr_copy.length) two_d_data.push(category_arr_copy.splice(0,n_cols));
        //console.log('after copy', this.state.category_arr)
        return (
            <div>
            <table>
                    <tbody>
                {two_d_data.map((d)=> (
                    <tr key={d[0].id}>
                        <td key={d[0].id}>{this.remove_button(d[0])}</td>
                        <td key={d[1].id}>{this.remove_button(d[1])}</td>
                        <td key={d[2].id}>{this.remove_button(d[2])}</td>
                        <td key={d[3].id}>{this.remove_button(d[3])}</td>
                    </tr>))}
                    </tbody>
                </table>
                <div>
                    {this.noMoreAlternativesMsg()}
                </div>
                </div>
        )
    }

    nextButtonAction = () => {
        this.props.setCategories(this.state.category_arr)
        console.log('index:',this.props.index)
        this.props.setFlow()  
    }

   
    render() {
        return (
            <div>
                <h3>These are the options for {this.state.category} you will be asked to rate:</h3>
                {this.props.categories ? this.createTable(): null}
                <h3>Please click on any option you don’t understand 
                    or have no preference for to replace it with a different one. 
                    Press {this.undo_button()} to undo</h3>
                <h3>After replacing options, press enter to continue.</h3>
                <button onClick={()=>{this.nextButtonAction()}}>next</button>
            </div> // concerts should have an underline: css
        )
    }
}

export default ChooseOptions