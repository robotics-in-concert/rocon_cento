fs = Npm.require('fs')
WebApp.connectHandlers.use (req, res, next)->
  console.log "req url : ", req.url
  re = /^\/data\/(.*)$/.exec(req.url)
  if re?
    fn = decodeURI(re[1])
    filePath = process.env.PWD + '/.files/' + fn
    # console.log decodeURI(re[1])
    data = fs.readFileSync(filePath, data)
    res.writeHead(200, {'Content-Type': 'image'})
    res.write(data)
    res.end()
  else
    next()
