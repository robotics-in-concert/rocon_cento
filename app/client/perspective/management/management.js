Template.management.rendered = function() {
  /*
  var svg = this.find('#svg')
  new TrelloCards(svg)
  */
};

Template.management.workItems = function(status) {
  return Cento.WorkItems.find({ solution: this._id, status: status });
}

Template.workItemSummary.icon = function() {
  switch(this.type) {
    case Cento.WorkItemTypes.IDEA:
      return 'edit';
    case Cento.WorkItemTypes.BUSINESS_MODEL:
      return 'retweet';
  }
}

Template.workItemSummary.events({
  'click .panel-heading.clickable': function(evt) {
    switch(this.type) {
      case Cento.WorkItemTypes.IDEA:
        Router.go('ideation', { _id: this._id });
        break;
      case Cento.WorkItemTypes.BUSINESS_MODEL:
        Router.go('modeling', { _id: this._id });
        break;
    }
  }
});
