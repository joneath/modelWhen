describe("modelWhen", function() {
  it("should add a when method to the Backbone.Model prototype", function() {
    expect(Backbone.Model.prototype.when).toBeDefined();
    expect(_.isFunction(Backbone.Model.prototype.when)).toEqual(true);
  });

  describe("when calling when on a model", function() {
    var model;

    beforeEach(function() {
      model = new Backbone.Model({
        foo: "bar"
      });
    });

    it("should return a jQuery promise object", function() {
      var promise = $.Deferred(),
          returnedPromise = model.when();

      _.each(promise, function(value, key) {
        expect(returnedPromise[key]).toBeDefined();
      });
    });

    describe("when passing a single attribute parameter", function() {
      var spy;

      beforeEach(function() {
        spy = jasmine.createSpy('whenThruty');
      });

      describe("when the model's attribute is truthy", function() {
        it("should resolve the promise immediately", function() {
          expect(model.when("foo").then(spy));
          expect(spy).toHaveBeenCalled();
        });
      });

      describe("when the model's attribute is not yet truthy", function() {
        describe("when the model's attribute changes to truthy", function() {
          it("should resolve the promise", function() {
            model.set("foo", false);
            expect(model.when("foo").then(spy));
            expect(spy).not.toHaveBeenCalled();

            model.set("foo", true);
            expect(spy).toHaveBeenCalled();
          });
        });
      });
    });

    describe("when passing a attribute and value parameters", function() {
      var spy;

      beforeEach(function() {
        spy = jasmine.createSpy('whenEqual');
      });

      describe("when the model's attribute is equal to the value", function() {
        it("should resolve the promise immediately", function() {
          expect(model.when("foo", "bar").then(spy));
          expect(spy).toHaveBeenCalled();
        });
      });

      describe("when the model's attribute is not yet equal to the value", function() {
        describe("when the model's attribute changes to equal the value", function() {
          it("should resolve the promise", function() {
            model.set("foo", true);
            expect(model.when("foo", "bar").then(spy));
            expect(spy).not.toHaveBeenCalled();

            model.set("foo", "bar");
            expect(spy).toHaveBeenCalled();
          });
        });
      });
    });
  });
});
