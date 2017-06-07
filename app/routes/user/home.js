import Ember from 'ember';

export default Ember.Route.extend({
  cellphonesService: Ember.inject.service('cellphones-service'),
  plansServices: Ember.inject.service('plans-service'),

  model: function () {
    this.getCellphones();
    this.getPlans();
    this.getMarks();
  },

  getCellphones: function () {
    var that = this;
    var service = this.get("cellphonesService");
    service.getCellphonesList(
      function(response) {
        that.setCellphones(response);
      }
    );
  },

  setCellphones: function (data) {
    var controller = this.controllerFor('user.home');
    controller.set("cellphones", data);
    controller.set("cellphonesCloned", data);
  },

  getPlans: function () {
    var that = this;
    var service = this.get("plansServices");
    service.getPlans(
      function(response) {
        that.setPlans(response);
      }
    );
  },

  setPlans: function (data) {
    var controller = this.controllerFor('user.home');
    controller.set("plans", data);
  },

  getMarks: function (){
    var that = this;
    var controller = that.controllerFor('user.home');
    var service = this.get("cellphonesService");
    service.getMarks(
      function(response) {
        controller.set("marks", response);
        for (var i = 0; i < controller.marks.length; i++) {
          controller.marks[i].enabled = false;
        }
      }
    );
  }


});
