if(typeof Cento === 'undefined'){
  Cento = {};
}


Cento.DragAndDrop = function($e){
  var zone = $e;
  var mask = zone.find('.dropmask');
  $e.on('dragenter', function(){
    zone.addClass('dragenter');
    mask.show();
    return false;
  });
  mask.on('dragleave', function(){
    zone.removeClass('dragenter');
    mask.hide();
    return false;
  });
  zone.on('dragover', function(){
    return false;
  });
  mask.on('drop', function(e){
    if(e.originalEvent.dataTransfer.files){
      var files = Session.get('filesToAttach');
      _.each(e.originalEvent.dataTransfer.files, function(f){
        files.push(f);
        Meteor.saveFile(f);
      });
      Session.set('filesToAttach', files);
    }
    zone.removeClass('dragenter');
    mask.hide();
    return false;

  });
  console.log('drag and drop initialized');
}

