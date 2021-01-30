
//Build HTML card component 
function buildFrame(){

  //Get frame template and copy to root index.HTML location
  fs.copyFile("./html/frame.HTML", "./index.HTML", (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
  });
  
}
//End function buildHTML()


//Build HTML card component 
function buildCard(){

//Get writeable copy of card template
fs.copyFile("./html/card.html", "./card.html", (err) => {
  if (err) throw err;
});




//Open and append example
fs.open('message.txt', 'a', (err, fd) => {
  if (err) throw err;
  fs.appendFile(fd, 'data to append', 'utf8', (err) => {
    fs.close(fd, (err) => {
      if (err) throw err;
    });
    if (err) throw err;
  });
});


  //What is the file descriptor???? XXLC
let fd = "";
fs.open("./index.html", 'w', function(err, fd) {
    if (err) {
        throw 'could not open file: ' + err;
    }

  
    


fs.write(fd, buffer, 0, buffer.length, null, function(err) {
  if (err) throw 'error writing file: ' + err;
  fs.close(fd, function() {
      console.log('wrote the file successfully');
  });
});


  
}
//End function buildHTML()