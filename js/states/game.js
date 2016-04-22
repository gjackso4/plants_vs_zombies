var Veggies = Veggies || {}

Veggies.GameState = {
	init: function(currentLevel) {
		this.currentLevel = currentLevel ? currentLevel : 'level1';

		this.HOUSE_X = 60;

		this.game.physics.arcade.gravity.y = 0;
	},
	create: function() {
		this.background = this.add.sprite(0, 0, 'background');

		this.bullets = this.add.group();
		this.plants = this.add.group();
		this.zombies = this.add.group();
		this.suns = this.add.group();

		this.numSuns = 100;

		//create user interface
		this.createGui();

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
			health: 10,
			isShooter: true,
			animationFrames: [1, 2, 1, 0]
		}

		this.sun = new Veggies.Sun(this, 200, 100);
		this.suns.add(this.sun);

		this.plant = new Veggies.Plant(this, 100, 100, plantData);
		this.plants.add(this.plant);

		// this.bullet = new Veggies.Bullet(this, 100, 200);
		// this.bullets.add(this.bullet);


	},
	update: function() {
		this.game.physics.arcade.collide(this.plants, this.zombies, this.attackPlant, null, this);

		this.zombies.forEachAlive(function(zombie){
			zombie.body.velocity.x = zombie.defaultVelocity;

			//Game Over if Zobmie reached House
			if(zombie.x <= this.HOUSE_X) {
				this.gameOver();
			}
		}, this);
	},
	gameOver: function() {
		this.game.state.start('Game');
	}, 
	attackPlant: function(plant, zombie) {
		plant.damage(zombie.attack);
	},
	createZombie: function(x, y, data) {
		//look for dead element
		var newElement = this.zombies.getFirstDead();

		if(!newElement) {
			newElement = new Veggies.Zombie(this, x, y, data);
			this.zombies.add(newElement);
		} else {
			newElement.reset(x, y, data);		
		}
		return newElement;
	},
	createPlant: function(x, y, data) {
		//look for dead element
		var newElement = this.plants.getFirstDead();
		
		if(!newElement) {
			newElement = new Veggies.Plant(this, x, y, data);
			this.plants.add(newElement);
		} else {
			newElement.reset(x, y, data);		
		}
		return newElement;
	},
	createGui: function() {
		//show sun stats
		var sun = this.add.sprite(10, this.game.height - 20, 'sun');
		sun.anchor.setTo(0.5);
		sun.scale.setTo(0.5);
		var style = {font: '14px Arial', fill: '#fff'};
		this.sunLabel = this.add.text(22, this.game.height - 28, '', style);
		this.updateStats();
	},
	updateStats: function() {
		this.sunLabel.text = this.numSuns;
	},
	increaseSun: function(amount) {
		this.numSuns += amount;
		this.updateStats();
	}

};