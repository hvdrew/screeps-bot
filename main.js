const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    // Clear Memory
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }

    const minimumNumberOfHarvesters = 10;
    const numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    let name = undefined;
    let role = undefined;

    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], null, { role: 'harvester', working: false });
        role = 'Harvester';
    }
    else {
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], null, { role: 'upgrader', working: false });
        role = 'Upgrader';
    }

    if (!(name < 0)) {
        console.log(`Spawned new creep: ${name} | ${role}`);
    }

}