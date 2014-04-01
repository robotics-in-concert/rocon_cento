fs = Npm.require('fs')
WebApp.connectHandlers.use (req, res, next)->
  re = /^\/data\/(.*)$/.exec(req.url)
  if re?
    filePath = process.env.PWD + '/.files/' + re[1]
    data = fs.readFileSync(filePath, data)
    res.writeHead(200, {'Content-Type': 'image'})
    res.write(data)
    res.end()
  else
    next()
