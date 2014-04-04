"""
This file adds some test fixtures to allow experimenting with the data model
and the user interface.
In order to use them, make sure to start with a fresh database.
You can wipe your current Meteor database with: meteor reset
"""
Meteor.startup ->
  if Cento.Solutions.find().count() == 0
    console.log 'Inserting fixture: Solutions'
    Cento.Solutions.insert
      name: 'Additional product offer'
      description: 'Offer additional products when the robot delivers a product'
      notifications:
        length: 2
    Cento.Solutions.insert
      name: 'Robot questinnaire'
      description: 'Use robots to deliver and collect a quality-of-service questionnaire'
      notifications:
        length: 9

  if Cento.WorkItems.find().count() == 0
    console.log 'Inserting fixture: WorkItems'
    solution1 = Cento.Solutions.findOne name: 'Additional product offer'
    Cento.WorkItems.insert
      name: 'High-level goal definition'
      type: Cento.WorkItemTypes.IDEA
      solution: solution1._id
      status: Cento.WorkItemStatus.DOING
      artifacts: []
    Cento.WorkItems.insert
      name: 'Define workflow'
      type: Cento.WorkItemTypes.BUSINESS_MODEL
      solution: solution1._id
      status: Cento.WorkItemStatus.TODO
      artifacts: []
