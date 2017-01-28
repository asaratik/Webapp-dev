import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Todos} from '../api/todos.js';
import {Accounts} from 'meteor/accounts-base';
import './main.html';

Accounts.ui.config({
	passwordSignupFields:'USERNAME_ONLY'
});
Template.todolist.helpers({
  title() {
    return 'Quick Todos';
  },
  tasks(){
  		return Todos.find({});
  }
});

Template.todolist.onCreated(function mainOnCreated() {
	Meteor.subscribe('todos');
});


Template.todolist.events({
	'submit .todo-form'(event){
		event.preventDefault();

		const name = event.target.name.value;

		Meteor.call('todos.insert',name);

		event.target.name.value = '';


	}
});

Template.task.events({
	'click .toggle-checked'(event){
		Meteor.call('todos.setChecked',this._id, !this.checked);
	},
	'click .delete'(event){
		Meteor.call('todos.remove',this._id);
	},

	'click .toggle-private'(){
		Meteor.call('todos.setPrivate',this._id,!this.private);
	}
});

Template.task.helpers({
	isOwner(){
		return this.owner === Meteor.userId();
	}
});