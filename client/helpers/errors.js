Errors = new Mongo.Collection(null);

throwError = function(message, errorClass, errorType){
	Errors.insert({message: message, errorClass: errorClass, errorType: errorType});
}

cleanError = function(errorType){
	Errors.remove({errorType: errorType});
}