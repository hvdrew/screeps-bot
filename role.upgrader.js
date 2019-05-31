module.exports = {
	run: function(creep) {

		creep.memory.working = creep.memory.working || false;
	
	
		// Determine if we need to switch working state in this tick
		if (creep.memory.working == true && creep.carry.energy == 0) {
			creep.say('Mining');
			creep.memory.working = false;
		}
		else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
			creep.say('Upgrading');
			creep.memory.working = true;
		}
	
	
		// Do stuff based on working state
		if (creep.memory.working == true) {
			if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller);
			}
		}
		else {
			let source = creep.pos.findClosestByPath(FIND_SOURCES);
			
			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source);
			}
		}
	
	}
};