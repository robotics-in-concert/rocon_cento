
Template.management.rendered = function(){
  var svg = this.find('#svg')
  new TrelloCards(svg)
};
