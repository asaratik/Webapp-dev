const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url,function(err, db) {
	if(err){
		return console.dir(err);
	}
	console.log('Connected to mongodb');
	
	/*InsertDocuments(db,function(){
		db.close();
	});*/

	RemoveDocument(db,function(){
		db.close();
	});
});


const InsertDocument = function(db, callback){
	//get collection
	const collection = db.collection('users');
	collection.insert({
		name: 'Ashok',
		email: 'ashok@protonmail.com'
	},function(err,result){
		if(err){
			return console.dir(err);
		}
		console.log('Inserted document');
		console.log(result);
		callback(result);
	});

}


const InsertDocuments = function(db, callback){
	const collection = db.collection('users');
	collection.insertMany([
	{
		name:'sam1',
		email:'sam1@test.com'
	},{
		name:'sam1',
		email:'sam1@test.com'
	},{
		name:'sam1',
		email:'sam1@test.com'
	}
		],function(err,result){
			if(err){
			return console.dir(err);
			}	
		console.log('Inserted '+result.ops.length+' documents');
		callback(result);
		});
	
}

const FindDocuments = function(db, callback){
	const collection = db.collection('users');
	collection.find({}).toArray(function(err,docs){
		if(err){
			return console.dir(err);
			}
			console.log('Found following records');
			console.log(docs);
			callback(docs);
	});
}


const QueryDocuments = function(db, callback){
	const collection = db.collection('users');
	
	collection.find({'name':'ashok'}).toArray(function(err,docs){
		if(err){
			return console.dir(err);
			}
			console.log('Found following records');
			console.log(docs);
			callback(docs);
	});
}


const UpdateDocument = function(db, callback){
	const collection = db.collection('users');
	
	collection.updateOne({'name':'sam1'},{$set : {email:'sam1@gmail.com'}},function(err,result){
		if(err){
			return console.dir(err);
			}
			console.log('Updated document');
			callback(result);
	});
}



const RemoveDocument = function(db, callback){
	const collection = db.collection('users');
	
	collection.deleteOne({name:'sam1'},function(err,result){
		if(err){
			return console.dir(err);
		}
		console.log('Removed document');
		console.log(result);
		callback(result);
	});
}


