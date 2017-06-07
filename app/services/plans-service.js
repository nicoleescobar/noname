import Ember from 'ember';

export default Ember.Service.extend({
  getPlans: function (success, error) {
    Ember.$.ajax({
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      type: 'GET',
      dataType: "json",
      url: "https://alophone-17b6a.firebaseio.com/plans.json",
      cache: false,
      success: success,
      error: error
    });
  }
});
