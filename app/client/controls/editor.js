Template.editor.rendered = function () {
  var e = this.find('.editor');
  console.log(this);
  console.log(e.querySelector);

  // Initialize editor with custom theme and modules
  var fullEditor = new Quill(e, {
    modules: {
      'toolbar': { container: this.find('.toolbar') },
      'link-tooltip': true
    },
    theme: 'snow'
  });
  console.log("editor rendered");

  
};
Template.editor.helpers({
  
});

