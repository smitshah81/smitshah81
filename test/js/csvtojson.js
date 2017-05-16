
function tsvJSON(tsv){
 
  var lines=tsv.split("\n");
 
  var result = [];
 
  var headers=lines[0].split("\t");
 
  for(var i=1;i<lines.length;i++){
 
    var obj = {};
    var currentline=lines[i].split("\t");
 
    for(var j=0;j<headers.length;j++){
      obj[headers[j].trim().substr(0,1).toUpperCase()+headers[j].trim().substr(1)] = currentline[j].trim().substr(0,1).toUpperCase()+currentline[j].trim().substr(1);
    }
 
    result.push(obj);
 
  }
  
  //return result; //JavaScript object
  return result; //JSON
}