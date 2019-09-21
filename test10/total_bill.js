function total_bill(bill_list) {
  // PUT YOUR CODE HERE
  var total=0;
  for (let bill of bill_list){
    for (let object of bill){
      total+=parseFloat(object['price'].slice(1));
    }
  }
  return total;
}

module.exports = total_bill;
