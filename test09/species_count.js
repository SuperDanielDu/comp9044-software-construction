function species_count(target_species, whale_list) {
  var sum=0;
  // PUT YOUR CODE HERE
  whale_list.forEach(element => {
    if (target_species===element["species"]){
      sum+=element["how_many"];
    }
  })
  return sum;
}

module.exports = species_count;
