import {API_PATH, SERVER_API_PORT} from './APIConstants.js'
import express from 'express';
import fs from 'fs'

const INPUT_1 = './inputs/category1.txt'
const INPUT_2 = './inputs/category2.txt'
const OUTPUT_1 = './outputs/client_category1.json'
const OUTPUT_2 = './outputs/client_category2.json'

const app = express();

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });


const data1 = fs.readFileSync(INPUT_1, 'utf8')
let category1_to_send = stringToJson(data1.split('\r\n').filter(s => s))
console.log(category1_to_send)
//const paginatedData1 = textByLine1.slice(textByLine1.length - MAX_CATEGORY_DISPLAY);
const data2 = fs.readFileSync(INPUT_2, 'utf8')
let category2_to_send = stringToJson(data2.split('\r\n').filter(s => s))
//const paginatedData2 = textByLine2.slice(textByLine1.length - MAX_CATEGORY_DISPLAY);


function stringToJson(str_arr){
    let json_array = []
    for (let i = 0; i < str_arr.length; i++){
      let temp_option = {
        id: i,
        name: str_arr[i],
        rating: 0,
      }
      json_array.push(temp_option)
    }
    return json_array
}

//function stringToArray(s){
  //  return (s.replace(/[^a-zA-Z ,0-9]/g, "").split(','))
//}

function save_client_choices(client_categories){
    const files = [OUTPUT_1, OUTPUT_2]
    console.log("client categories length:", client_categories.length)
    for (var i = 0; i < client_categories.length; i++) {
        const category = JSON.parse(client_categories[i])
        console.log(category)
        if (category.length > 1) {
            console.log('writing to file', files[i])
            var logger = fs.createWriteStream(files[i])
            logger.write('[\n')
            var sep = "";
            category.forEach(function(objectToAppend) {
                logger.write(sep + JSON.stringify(objectToAppend))
                if (!sep)
                    sep = ",\n";
            });
            logger.write('\n]')
            logger.close()
        } 
    }
}

function setCategoryInfo(client_categories){
    let category_client_arr1 = JSON.parse(client_categories[0]) 
    let category_client_arr2 = JSON.parse(client_categories[1])
    if (category_client_arr1.length > 1){
        console.log('we are in 1')
        category1_to_send = category_client_arr1
    }
    if (category_client_arr2.length > 1){
        console.log('we are in 2')
        category2_to_send = category_client_arr2
    }
}
/*
app.get('/flow', function(req, res){
    let flow = req.query.flow || 1
    let to_change = req.query.to_change || false
    console.log(to_change)
    if (to_change === 'true'){
        console.log(flow + 1)
        res.send(flow + 1)
    }
    else{
        res.send(flow)
    }
})
*/

app.get(API_PATH, function(req, res){
    const client_categories = req.query.client_categories
    save_client_choices(client_categories)
    console.log('category 1 before changing',category1_to_send)
    setCategoryInfo(client_categories)
    console.log('category 1 after changing',category1_to_send)
    res.send([category1_to_send, category2_to_send])
})

app.listen(SERVER_API_PORT, function(){
    console.log("express server is running...");
})
