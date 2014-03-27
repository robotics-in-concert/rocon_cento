m = [20, 120, 20, 120]
w = 1280 - m[1] - m[3]
h = 800 - m[0] - m[2]
i = 0

CARD_SIZE = [250, 100]
CARD_PADDING = [50, 20]


class @TrelloCards


  cardDimen: (col, row)->
    dm = 
      x: col*(CARD_SIZE[0]+CARD_PADDING[0]) + 25
      y: row*(CARD_SIZE[1] + CARD_PADDING[1]) + 50
      width: CARD_SIZE[0]
      height: CARD_SIZE[1]
    dm.cx = dm.x + dm.width/2
    dm.cy = dm.y + dm.height/2
    dm


  connectAB: (col0, row0, col1, row1) ->
    self = @
    dm0 = @cardDimen(col0, row0)
    dm1 = @cardDimen(col1, row1)

    console.log dm0, dm1


    ab = 
      source:
        x: dm0.cy
        y: dm0.x + dm0.width
      target:
        x: dm1.cy
        y: dm1.x

    d = @diagonal(ab)
    console.log d
    path = @rootGroup.append('path').attr
      'fill': 'none'
      'stroke-width': 2
      'stroke': (i)-> self.colors(parseInt(8*Math.random()))
      # 'stroke': '#aaa'
      'd': d
    # path.transition()
      # .duration(1000)
      # .attr('d', d)

        

    
  buildCardGroup: (vis, data, columnIdx)->
    self = @


    g = vis.selectAll('g.card'+columnIdx)
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'card card'+i)
      .attr 'transform', (d, i)->
        dm = self.cardDimen(columnIdx, i)
        "translate(#{dm.x}, #{dm.y})"

    
    g.append('rect')
      .attr 
        'x': (d)-> 0
        'y': (d, i)-> 0
        'width': (d)-> CARD_SIZE[0]
        'height': (d)-> CARD_SIZE[1]
        'fill': 'white'
        # 'fill': (i)-> pastel[ parseInt(8*Math.random())  ]
        'class': 'box'

    
    g.append('text')
      .text (d)->d.name
      .attr
        x: CARD_SIZE[0]/2
        y: 20
        width: CARD_SIZE[0]
        height: 50
        "font-family": "Arial"
        "text-anchor": "middle"
        "font-size": 12


    image_group = g.append('g')
      .attr('class', 'images')
      .attr('transform', "translate(10, 60)")
      .selectAll('image')
      .data (d)-> d.members
      .enter()
      .append('image')
      .attr 
          'fill': 'white'
          'x': (d, i)-> i*(35)
          'y': (d, i)-> 0
          'width': (d)-> 30
          'height': (d)-> 30
          'xlink:href': (d)-> "https://trello-avatars.s3.amazonaws.com/#{d.avatarHash}/30.png"
    g

  render: (grouped, start, end)->


    @buildAxis(@rootGroup, start, end) 



    _.keys(grouped).sort().forEach (dd, i)=>
      colIdx = moment(dd).diff(start, 'days')
      @buildCardGroup(@rootGroup, grouped[dd], colIdx)

    @connectAB(0, 0, 3, 0)
    @connectAB(0, 3, 3, 0)
    @connectAB(0, 4, 3, 0)
    @connectAB(3, 0, 4, 0)
    @connectAB(4, 0, 6, 0)
    @connectAB(4, 0, 6, 1)
    @connectAB(4, 0, 6, 2)
    # vis.attr('transform', 'scale(0.5, 0.5)')

    # link = vis.append('path')
    # link.attr
      # 'fill': 'none'
      # 'stroke-width': 2
      # 'stroke': 'red'
      
    # link.attr "d", (d)->
      # a = [0, 0, 100, 100]
      # dx = a[2] - a[0]
      # dy = a[3] - a[1]
      # dr = Math.sqrt(dx * dx + dy * dy)
      # "M" + a[0] + "," + a[1] + "A" + dr + "," + dr + " 0 0,1 " + a[2] + "," + a[3]

  constructor: (svg)->

    # vis = d3.select("#d3").append("svg:svg")
        # .attr("width", w + m[1] + m[3])
        # .attr("height", h + m[0] + m[2])
      # .append("svg:g")
        # .attr("transform", "translate(" + m[3] + "," + m[0] + ")")
    @diagonal = d3.svg.diagonal().projection (d)-> [d.y, d.x]
    @pastel = ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2"]
    @colors = d3.scale.category20c()
    @svg = d3.select(svg)

    @rootGroup = @svg.append('g')
   
    zoom = => @rootGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    @zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom)
    @svg.call(@zoomListener)

    HTTP.get '/samples/ces.json', (e, r)=>
      data = JSON.parse(r.content)
      console.log data


      grouped = _.groupBy data, (i)->
        moment(i.dateLastActivity).format('YYYY-MM-DD')
      console.log grouped

      
      # lines = vis.selectAll('line')
        # .data([])
        # .enter()
        # .append('line')
        # .style
          # 'stroke': (d, i)-> colors(i)
          # 'stroke-width': 1
      
      sorted = _.keys(grouped).sort()
      start = moment(sorted[0])
      end = moment(_.last(sorted))
      @render(grouped, start, end)



            
      
      
  buildAxis: (svg, start, end)->
    # margin = {top: 250, right: 40, bottom: 250, left: 40}
    # width = 960 - margin.left - margin.right
    # height = 500 - margin.top - margin.bottom
    
    # t1 = new Date(2012, 0, 1)
    # t2 = new Date(2012, 1, 1)
    # t0 = d3.time.day.offset(t1, -1)
    # t3 = d3.time.day.offset(t2, +1)

    cnt = end.diff(start, 'days')
    console.log 'cnt : ', cnt
    
    t1 = start.toDate()
    t2 = end.toDate()
    
    # x = d3.time.scale()
        # .domain([t0, t3])
        # .range([t0, t3].map(d3.time.scale()
          # .domain([t1, t2])
          # .range([0, width])))

    console.log t1, t2
      
    axisScale = d3.time.scale()
        .domain([t1, t2])
        .range([0, cnt*(CARD_SIZE[0]+CARD_PADDING[0])])
    
    
    xAxis = d3.svg.axis()
      .scale(axisScale)
      .ticks(d3.time.days, 1)
      .tickFormat(d3.time.format('day %d'))
      .orient("bottom")
    
    # svg = d3.select("body").append("svg")
        # .attr("width", width + margin.left + margin.right)
        # .attr("height", height + margin.top + margin.bottom)
      # .append("g")
        # .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    axis = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,0)")
        .call(xAxis)
    
    axis.selectAll("text")
        .attr("y", 6)
        .attr("x", 6)
        .style("text-anchor", "start")
    axis
      
    
    
