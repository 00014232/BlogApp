const path = require('path')
const fs = require('fs')

getData = () =>{
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../../database/articles.json'), 'utf8'));
}
saveData = data => {
  fs.writeFile(path.join(__dirname, '../../database/articles.json'), JSON.stringify(data, null, 2), (e) => {
      if (e) {
        console.log('There is an error, please check it out', e);
        return;}
    });
}
module.exports = {
    getData, 
    saveData
}