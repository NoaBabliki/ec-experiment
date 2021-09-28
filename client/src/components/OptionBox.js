import * as constants from '../constants'
import '../App.css'
import Dropdown from './DropDown'
import 'react-slidedown/lib/slidedown.css'


const OptionBox = (props) => {


    const showSlider = (title, index) => {
        let names = []
        const default_msg = {
            id: -1,
            name: props.default_msg,
        }
        names.push(default_msg)
        props.categories[index].map(item => names.push(item))
        //console.log(names)
        return(
            <Dropdown
            categories={names}
            title={title}
            handleSubmit={props.handleSubmit}/>
        )
    }

    const showAttr = (attr, title) => {
        return (
            <label className='option-attr'>{title}: {attr.name}</label>
        )
    }

    const showBox = () => {
        return (
            <div className='box'>
                <label className='option-title'>Option {props.index}</label>
                {props.attr1? showAttr(props.attr1, constants.CATEGORY_1_SINGULAR): showSlider(constants.CATEGORY_1_SINGULAR, 0)}
                {props.attr2? showAttr(props.attr2, constants.CATEGORY_2_SINGULAR): showSlider(constants.CATEGORY_2_SINGULAR, 1)}
                
            </div>
        )
    }


    return (
        <div>
            {showBox()}
        </div>
    )

}

export default OptionBox