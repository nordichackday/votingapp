// model.js
// ========

var _ = require('underscore');

var aggregateVotes = [];

module.exports = {
	
	countVote: function(id) {
		if (aggregateVotes[id] == undefined) {
			aggregateVotes[id] = 1;
		} else {
			aggregateVotes[id] = aggregateVotes[id] + 1;		
		}
	},

	get: function() {
		var result = [];

		for (var name in aggregateVotes) {
			if (aggregateVotes.hasOwnProperty(name)) {
				result.push({name: name, votes: aggregateVotes[name]});
			}
		}		
		
		return result;
	},

	reset: function() {
		aggregateVotes = [];
	}
};