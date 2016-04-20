var Veggies = Veggies || {}

Veggies.GameState = {
	init: function(currentLevel) {
		this.currentLevel = currentLevel ? currentLevel : 'level1';

		this.game.physics.arcade.gravity.y = 0;
	},
	create: function() {
		this.background = this.add.sprite(0, 0, 'background');

		this.bullets = this.add.group();
		this.plants = this.add.group();
		this.zombies = this.add.group();
		this.suns = this.add.group();

		var zombieData = {
			asset: 'zombie',
			healther: 10,
			animationFrames: [0, 1, 2, 1],
			attack: 0.1,
			velocity: -20 
		}

		this.zombie = new Veggies.Zombie(this, 300, 100, zombieData);
		this.zombies.add(this.zombie);

		var plantData = {
			plantAsset: 'plant',
			health: 10
		}

		this.plant = new Veggies.Plant(this, 100, 100, plantData);
		this.plants.add(this.plant);

	},
	update: function() {

	},
	gameOver: function() {
		this.game.state.start('Game');
	}

};