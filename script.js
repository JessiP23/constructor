const Adventurer = {
    name: 'Robin',
    health: 10,
    inventory: ['sword', 'potion', 'artifact'],
    companion: {
        name: 'Leo',
        type: 'cat',
        companion: {
            name: 'Frank',
            type: 'Flea',
            belongings: ['small hat', 'sunglasses'],
        }
    },
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}`);
    }
}

class Character {
    static MAX_HEALTH = 100;

    constructor(name) {
        this.name = name;
        this.health = Character.MAX_HEALTH;
        this.inventory = [];
    }
}

const robin = new Character('Robin');
robin.inventory = ['sword', 'potion', 'artifact'];
robin.companion = new Character('Leo');
robin.companion.type = 'Cat';
robin.companion.companion = new Character('Frank');
robin.companion.companion.type = 'Flea';
robin.companion.companion.inventory = ['small', 'hat', 'sunglasses'];

// Child class inherits all properties of its parents, so in this case, we don't account for name, health, inventory, or roll.

class Adventure extends Character {
    static ROLES = ['Fighter', 'Healer', 'Wizard'];

    constructor(name, role) {
        super(name);
        if (!Adventure.ROLES.includes(role)) {
            throw new Error(`Invalid role. Roles must be one of: ${Adventure.ROLES.join(', ')}`);
        }
        this.role = role;
        this.inventory.push('bedroll', '50 gold coins');
    }
    scout() {
        console.log(`${this.name} is scouting ahead...`);
        this.roll();
    }
    duel(opponent) {
        while (this.health > 50 && opponent.health > 50) {
            const thisRoll = Math.floor(Math.random() * 20) + 1;
            const opponentRoll = Math.floor(Math.random() * 20) + 1;
            console.log(`${this.name} rolled a ${thisRoll}`);
            console.log(`${opponent.name} rolled a ${opponentRoll}`);
            if (thisRoll > opponentRoll) {
                opponent.health -= 1;
                console.log(`${opponent.name} lost 1 health. Current health: ${opponent.health}`);
            } else if (thisRoll < opponentRoll) {
                this.health -= 1;
                console.log(`${this.name} lost 1 health. Current health: ${this.health}`);
            } else {
                console.log("It's a tie!");
            }
        }
        if (this.health > 50) {
            console.log(`${this.name} wins the duel with ${this.health} health remaining`);
        } else if (opponent.health > 50) {
            console.log(`${opponent.name} wins the duel with ${opponent.health}`);
        } else {
            console.log("It's a draw");
        }
    }
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}`);
    }
}

class AdventurerFactory {
    constructor(role) {
        this.role = role;
        this.adventurers = [];
    }
    generate(name) {
        const newAdventurer = new Adventure(name, this.role);
        this.adventurers.push(newAdventurer);
        return newAdventurer;
    }
    findByIndex(index) {
        return this.adventurers[index];
    }
    findByName(name) {
        return this.adventurers.find((a) => a.name === name);
    }
}

const healers = new AdventurerFactory('Healer');
const robinAdventurer = healers.generate("Robin");

robinAdventurer.scout();

const anotherAdventurer = new Adventure('Opponent', 'Fighter');
robinAdventurer.duel(anotherAdventurer);
