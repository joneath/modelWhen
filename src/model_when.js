(function() {
  _.extend(Backbone.Model.prototype, {
    when: function(attr, value) {
      var promise = $.Deferred(),
          actualValue = this.get(attr);

      if (value && actualValue === value) {
        promise.resolve.call(this, this, value);
      } else if (_.isUndefined(value) && actualValue) {
        promise.resolve.call(this, this, actualValue);
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
