function sum(list) {
  // console.log(list)
  // PUT YOUR CODE HERE
  var sum=0;
  for (i in list){
    // console.log(i)
    sum+=parseInt(list[i]);
  }
  return sum;
}

module.exports = sum;
