
Meteor.saveFile = (file, name, callback)->
  console.log file
  fileReader = new FileReader()
  name = file.name
  
  fileReader.onload = (e)->
    console.log e
    blob = e.srcElement.result
    Meteor.call('saveFile', blob, file.name, file.path, 'binary', callback)

  fileReader.readAsBinaryString(file)
