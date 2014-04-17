
Meteor.saveFile = (file, callback)->
  fileReader = new FileReader()
  name = file.name
  
  fileReader.onload = (e)->
    blob = e.srcElement.result
    Meteor.call('saveFile', blob, file.name, file.path, 'binary', callback)

  fileReader.readAsBinaryString(file)
