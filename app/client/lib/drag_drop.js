if(typeof Cento === 'undefined'){
  Cento = {};
}


Cento.DragAndDrop = function($e){
  var bd = $(document.body);
  bd.on('dragenter', '.dropzone', function(e){
    var zone = $(e.target);
    zone.addClass('dragenter');
    zone.find('.dropmask').show();
    return false;
  });
  bd.on('dragleave', '.dropmask', function(e){
    var mask = $(e.target);
    var z = mask.closest('.dropzone');
    z.removeClass('dragenter');
    mask.hide();
    return false;
    // mask.hide();
    // return false;
  });
  bd.on('dragover', '.dropzone', function(){
    return false;
  });
  bd.on('drop', '.dropmask', function(e){
    var mask = $(e.target);
    var zone = mask.closest('.dropzone');
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
  // mask.on('drop', function(e){
    // if(e.originalEvent.dataTransfer.files){
      // var files = Session.get('filesToAttach');
      // _.each(e.originalEvent.dataTransfer.files, function(f){
        // files.push(f);
        // Meteor.saveFile(f);
      // });
      // Session.set('filesToAttach', files);
    // }
    // zone.removeClass('dragenter');
    // mask.hide();
    // return false;

  // });
  console.log('drag and drop initialized');
}

