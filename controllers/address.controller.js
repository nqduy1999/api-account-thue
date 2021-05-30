const city = require('../models/address/city.model');
const district = require('../models/address/district.model');
const ward = require('../models/address/ward.model');

exports.findAllCity = (req, res) => {
  city.find()
    .then((cities) => {
      res.status(200).send(cities);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Something wrong while retrieving products.',
      });
    });
};
exports.findAllDistrictByCity = (req, res) => {
  district.find({ city_id: req.params.id })
    .then((districts) => {
      res.status(200).send(districts);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Something wrong while retrieving products.',
      });
    });
};

exports.findAllWardByDistrict = (req, res) => {
  ward.find({ district_id: req.params.id })
    .then((districts) => {
      res.status(200).send(districts);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Something wrong while retrieving products.',
      });
    });
};
