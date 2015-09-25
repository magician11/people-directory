var $ = require('jquery');

var findById = function (id) {
  var deferred = $.Deferred();
  var person = null;
  var l = people.length;
  for (var i = 0; i < l; i++) {
    if (people[i].id == id) {
      person = people[i];
      break;
    }
  }
  deferred.resolve(person);
  return deferred.promise();
},

findByName = function (searchKey) {
  var deferred = $.Deferred();
  var results = people.filter(function (element) {
    var fullName = element.firstName + " " + element.lastName;
    return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
  });
  deferred.resolve(results);
  return deferred.promise();
},

init = function () {

  var deferred = $.Deferred();
  var peopleDataUrl = '/assets/data/test-data.json';

  $.ajax({
    url: peopleDataUrl,
    dataType: 'json',
    cache: false,
    success: function(data) {
      people = data;
      deferred.resolve(people);
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(peopleDataUrl, status, err.toString());
    }.bind(this)
  });

  return deferred.promise();
},

people = [];

// The public API
module.exports = {
  findById: findById,
  findByName: findByName,
  init: init
};
