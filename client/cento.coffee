Deps.autorun (c)->
  console.log 'autorun called'
  unless Session.equals("shouldAlert", true)
    return

  c.stop()
  console.log("Oh no!")

Template.d3.rendered = ->
  console.log 'rendered!'
  svg = @find('#svg')
  console.log svg
  new TrelloCards(svg)

Template.foo.value = ->
  Session.get('foo.value')

Template.foo.value2 = -> Session.get('foo.value2')
Template.foo.events =
  'click .save': (e)->
    v = $('input').val()
    Session.set('foo.value2', v)

