import Ember from 'ember';

export default Ember.Controller.extend({
  cellphones: null,
  cellphonesCloned: null,
  plans: null,
  marks: null,
  showFilters: true,
  showCellphones: false,
  showPlanFilters: false,
  colors: [{color: "white", hex: "#fff"}, {color: "black", hex: "#000"}, {color: "rosegold", hex: "#b76e79"}, {color: "silver", hex: "#c0c0c0"}, {color: "gold", hex:"#ffad00"}],

  actions:{
    toggleFilters: function (filter) {
      this.set(filter, !this.get(filter));
    },

    filterByMark: function (mark) {
      var enabledMarks = this.getSelectedMarks(mark);
      var filteredCellphones = [];
      for (var j = 0; j < this.cellphonesCloned.length; j++) {
        if (enabledMarks.indexOf(this.cellphonesCloned[j].mark) !== -1) {
          filteredCellphones.push(this.cellphonesCloned[j]);
        }
      }
      if (filteredCellphones.length > 0 ) {
        this.set("cellphones", filteredCellphones);
      } else {
        this.set("cellphones", this.cellphonesCloned);
      }
    },

    showAvailablesInPlan: function () {
      var lastState = this.lastState || this.cellphones;
      this.set("lastState", lastState);
      var phones = this.cellphones;
      var filteredCellphones = [];
      if(Ember.$('#showAvailables').is(':checked')) {
        for (var j = 0; j < phones.length; j++) {
          if (phones[j].avaliableInPlan) {
            filteredCellphones.push(phones[j]);
          }
        }
        this.set("cellphones", filteredCellphones);
      } else {
        this.set("cellphones", this.lastState);
        this.set("lastState", null);
      }
    },

    filterByPrice: function (min,max) {
      console.log(min, max);
    }

  },

  getSelectedMarks: function (mark) {
    var enabledMarks = [];
    for (var i = 0; i < this.marks.length; i++) {
      if (Ember.isPresent(mark)) {
        if(this.marks[i].name === mark.name){ this.marks[i].enabled = !this.marks[i].enabled; }
      }
      if (this.marks[i].enabled) {
        enabledMarks.push(this.marks[i].name);
      }
    }
    return enabledMarks;
  },
});
