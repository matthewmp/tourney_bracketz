var txt = document.getElementById('txtArea');
var back = document.getElementById('backDrop');
var text;
// Create Span
// const mkSpan = (value) => {
//   return `<span>${value}</span><br>`;
// }

// // Create Span with 'match' class
// const mkMatchedSpan = (value) => {
//   return `<span class="match">${value}</span><br>`;
// }

txt.addEventListener('keyup', function(e){

  text =  txt.value.split('\n').map(el => {
      return `<span>${el}</span><br>`
  });
  
var indexes = [];
  
for(let i = 0; i < text.length; i++){
  for(let j = i+1; j < text.length; j++){
    if(text[i] === text[j]){
      indexes.push(i,j)
    }
  }
}


// Array to dedupe index array
ind = [];

// If index is not in ind push it to ind array
indexes.forEach((el) => {
  if(ind.indexOf(el) === -1){ind.push(el)}
});
  
// Add 'match' class to every index (ind) of text array
ind.forEach(index => {
  let snippet = text[index].slice(6);
  text[index] = '<span class="match">' + snippet; 
});
    
// Add all spans to name list div

back.innerHTML = text.join('')
// Clear indexes of matches
ind.length = 0;
  
  
  
  
});