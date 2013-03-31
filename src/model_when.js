(function() {
  _.extend(Backbone.Model.prototype, {
    when: function(attr, value) {
      var promise = $.Deferred();

      if (value && this.get(attr) === value) {
        promise.resolve(this);
      } else if (_.isUndefined(value) && this.get(attr)) {
        promise.resolve(this);
      }
      this.on("change:" + attr, function(model, newValue) {
        if ((_.isUndefined(value) && newValue) || newValue === value) {
          promise.resolve.apply(this, arguments);
        }
      });

      return promise;
    }
  });
}( ));
