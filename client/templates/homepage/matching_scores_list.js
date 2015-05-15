Template.matchingScoresList.onCreated(function () {
	var instance = this;

	instance.selectedLocation = new ReactiveVar(-1);

	instance.autorun(function (){
		var selectedLocation = instance.selectedLocation.get();		
		var subscription = instance.subscribe('matchingscores', selectedLocation);
		//console.log('subscribe matchingscores:' + selectedLocation);
		if (subscription.ready()){
			console.log("> Received matchingscore for cityId " + selectedLocation + "\n\n");
		} else {
			console.log("> Receiving matchingscore for cityId " + selectedLocation + "\n\n");
		}
	});
});

Template.matchingScoresList.helpers({
    matchingScores: function (){
    	var selectedLocation = Number(Session.get('selectedLocation'));
    	if(isNaN(selectedLocation)){
    		selectedLocation = -1
    	}

    	return MatchingScores.find({cityId: selectedLocation}, { sort: { avgMatchingScore: -1 } });
	}
});

Template.matchingScoresList.events({
    "change #selectedLocation": function(event, instance){
        var selectedLocation = instance.selectedLocation.get();
        selectedLocation = $(event.target).find('option:selected').val();
        instance.selectedLocation.set(selectedLocation);
        Session.set('selectedLocation', selectedLocation);
    }
});