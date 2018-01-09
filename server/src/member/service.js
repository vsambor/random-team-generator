const MemberModel = require('./model')

exports.add = (req, res) => {
  let newMember = new MemberModel({
    teamId: req.body.teamId,
    name: req.body.name,
    email: req.body.email,
    rating: req.body.rating
  })

  newMember.save(newMember)
    .then(() => res.json(201, newMember))
    .catch((err) => {
      console.error('Error saving: ' + err)
      res.end('Error: ' + err)
    })
}

exports.findAll = (req, res) => {
  MemberModel.find({})
    .then(result => res.status(200).send(result))
    .catch(err => console.error('There was an error' + err))
}

exports.findById = (req, res) => {
  MemberModel.findById(req.params.id)
    .then(result => res.status(200).send(result))
    .catch(err => console.error('There was an error' + err))
}

exports.update = (req, res) => {
  MemberModel.findOneAndUpdate(req.params.id, req.body, { upsert: true, new: true })
    .then(result => res.status(202).send(result))
    .catch(err => console.error('There was an error' + err))
}

exports.delete = (req, res) => {
  MemberModel.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).send({ message: 'removed' }))
    .catch(err => console.error('There was an error' + err))
}

exports.getById = (id) => MemberModel.findById(id)
