import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'
import {Mongo} from 'meteor/mongo'

export const Todos = new Mongo.Collection('todos');

if(Meteor.isServer){
	Meteor.publish('todos',function tasksPublication() {
		return Todos.find({
			$or:[
			{private:{$ne: true}},
			{owner: this.userId}
			]
		});
	});
}

Meteor.methods({
	'todos.insert'(text){
		check(text,String);
		if(! this.userId){
			throw new Meteor.Error('Unauthorized');
		}

		Todos.insert({
			text,
			createdAt : new Date(),
			owner: this.userId,
			username: Meteor.users.findOne(this.userId).username
		});
	},

	'todos.remove'(taskId){
		check(taskId, String);
		const task = Todos.findOne(taskId);
		if(task.private && task.owner !== this.userId){
			throw new Meteor.Error('Unauthorized');
			}
		Todos.remove(taskId);

	},

	'todos.setChecked'(taskId,setChecked){
		check(taskId,String);
		check(setChecked,Boolean);
		const task = Todos.findOne(taskId);
		if(task.private && task.owner !== this.userId){
			throw new Meteor.Error('Unauthorized');
			}
			Todos.update(taskId, {
				$set:{checked:setChecked}
			});
	},

	'todos.setPrivate'(taskId, setToPrivate){
		check(taskId, String);
		check(setToPrivate, Boolean);


		const task = Todos.findOne(taskId);
		if(task.owner !== this.userId){
			throw new Meteor.Error('Unauthorized');
			}
		Todos.update(taskId,{$set:{private:setToPrivate}});
	}
});