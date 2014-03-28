Meteor.methods
  saveFile: (blob, name, path, encoding)->
    fs = Npm.require('fs')

    cleanPath = (str)->
      if str?
        str.replace(/\.\./g,'').replace(/\/+/g,'').replace(/^\/+/,'').replace(/\/+$/,'')

    cleanName = (str)->
      str.replace(/\.\./g,'').replace(/\//g,'')


    # chroot = Meteor.chroot || (process.env['PWD']+'/public')
    chroot = process.env.PWD
    path = chroot + '/.files'


    unless fs.existsSync(path)
      fs.mkdirSync(path)

    encoding = encoding || 'binary'
    # chroot = Meteor.chroot || 'public'
    # path = chroot + (path ? '/' + path + '/' : '/')

    console.log "chroot: ", chroot
    console.log path
    console.log encoding
    
    fs.writeFileSync(path+'/'+name, blob, encoding)
    console.log 'file saved', name, encoding
    Files.insert({name: name, created: new Date()})
 
