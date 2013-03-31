# Backbone model.when
modelWhen adds promise based attribute changes to Backbone.Model. It will call any added callbacks through the done or then methods when the watched attribute is truthy or equal to a specified value.

## Usage
		myModel.when("modelAttribute","optionalEqualityValue").then(myCallback);
#### When truthy
		var model = new Backbone.Model({
			"foo": false		
		});
		
		model.when("foo").then(function(model, value) {
			console.log("model is now truthy with: " + value);
		});
		
		// calls then callback
		model.set("foo", true);
		// also calls then callback
		model.set("foo", "bar");
		// doesn't call then callback
		model.set("foo", "");
#### When equal to value
		var model = new Backbone.Model({
			"foo": false		
		});
		
		model.when("foo", "bar").then(function(model, value) {
			console.log("model is now equal to bar);
		});
		
		// doesn't call then callback
		model.set("foo", true);
		// calls then callback
		model.set("foo", "bar");
		