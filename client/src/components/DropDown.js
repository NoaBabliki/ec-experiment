import React from 'react'

export class DropDown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.categories[0].id,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const int_value = parseInt(event.target.value)
    this.setState({value: int_value});
    const chosen_category_array = this.props.categories.filter(item => item.id === int_value)
    this.props.handleSubmit(chosen_category_array[0])
  }

  render() {
    return (
      <form>
        <label className='option-attr'>
          {this.props.title}:
          <select className='dropdown-slidedown' value={this.state.value} onChange={this.handleChange}>
            {this.props.categories.map((category, index)=>
            <option key={index} value={category.id}>{category.name}</option>)}
          </select>
        </label>
      </form>
    );
  }
}

export default DropDown