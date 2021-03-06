Meteor.publish('matchingscores', function (city, sortField, loadAllowed) {
	if(city == 'null' || city == 'undefined' || city == 0){
		city = -1;
	}
	city = parseInt(city, 10);

	if(loadAllowed == 'null' || loadAllowed == 'undefined' || loadAllowed == 0){
		loadAllowed = 6;
	}
	loadAllowed = parseInt(loadAllowed);

	curDate = new Date();
	curDate.setMinutes(curDate.getMinutes() - Meteor.settings.private.matchingScoreDataOutDate);

	var filter = {sort: {}};
	filter.sort[sortField] = -1;
	filter.limit = loadAllowed;
	
	var result = MatchingScores.find({cityId: city, updateDate: {$gt: curDate}}, filter);
	if(result.count() == 0){
		debuger('No data found, pulling new data from API!', 1);
		pullMatchingScores(city, Meteor.settings.private.matchingScoreDataTimeRange);
		result = MatchingScores.find({cityId: city, updateDate: {$gt: curDate}}, filter);
	}
	return result;
});

Meteor.publish('msquicksearch', function (city, industry) {
	if(city == 'null' || city == 'undefined'){
		city = 0;
	}
	city = parseInt(city, 10);

	if(industry == 'null' || industry == 'undefined'){
		industry = 0;
	}
	industry = parseInt(industry, 10);

	if(CurrentViewCities.find({cityId: city}).count() == 0) {
		insertCurrentViewCity(city);
	}

	pullSearchMatchingScore(city);
	
	return getSearchMatchingScore(city, industry);
});

Meteor.publish('callmebackusers', function () {
    return callMeBackUsers.find();
});

// Publish master categories data collection
Meteor.publish('masterdata', function(){
    return MasterData.find();
});