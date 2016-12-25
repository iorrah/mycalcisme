import Ember from 'ember';

export default Ember.Mixin.create({
  toggleClassEffect: function(classToToggle) {
    var elem = Ember.$('.mcim-struc-table');
    elem.addClass(classToToggle);

    setTimeout(function() {
      elem.removeClass(classToToggle);
    }, 200);
  },

  actions: {
    mcimSuccessMode: function() {
      this.toggleClassEffect("mcim-struc-table-success");
    },

    mcimDangerMode: function() {
      this.toggleClassEffect("mcim-struc-table-danger");
    }
  }
});
