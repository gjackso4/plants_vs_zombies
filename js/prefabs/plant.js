var Veggies = Veggies || {}

Veggies.Plant = function(state, x, y, data) {
	Phaser.Sprite.call(this, state.game, x, y, data.plantAsset);

	this.state = state;
	this.game = state.game;

	this.bullets = state.bullets;
	this.suns = state.suns;

	this.anchor.setTo(0.5);
	this.game.physics.arcade.enable(this);
	this.body.immovable = true;

	//timers
	this.shootingTimer = this.game.time.create(false);
	this.producingTimer = this.game.time.create(false);

	this.reset(x, y, data);

};

Veggies.Plant.prototype = Object.create(Phaser.Sprite.prototype);
Veggies.Plant.prototype.constructor = Veggies.Plant;



Veggies.Plant.prototype.reset = function(x, y, data) {
	Phaser.Sprite.prototype.reset.call(this, x, y, data.health);

	//change image of the plant if needed
	this.loadTexture(data.plantAsset);

	this.animationName = null;

	if(data.animationFrames) {
		this.animationName = data.plantAsset + 'Anim';
		this.animations.add(this.animationName, data.animationFrames, 6, false);
		this.play(this.animationName);
	}

	//save properties
	this.isShooter = data.isShooter;

	//if is_shooter set timer
	if(this.isShooter) {
		this.shootingTimer.start();
		this.scheduleShooting();
	}
};

Veggies.Plant.prototype.kill = function() {
	Phaser.Sprite.prototype.kill.call(this);

	this.shootingTimer.stop();
	this.producingTimer.stop();
};

Veggies.Plant.prototype.scheduleShooting = function() {
	this.shoot();

	//plants shoot once per second
	this.shootingTimer.add(Phaser.Timer.SECOND, this.scheduleShooting, this);
};

Veggies.Plant.prototype.shoot = function() {
		//play shoot animation if animation Name exsists
		if(this.animations.getAnimation(this.animationName)) {
			this.play(this.animationName);
		}
		//location of y bullet
		var y = this.y - 10;

		var newElement = this.bullets.getFirstDead();

		if(!newElement) {
			newElement = new Veggies.Bullet(this, this.x, y);
			this.bullets.add(newElement);
		} else {
			newElement.reset(this.x, y);		
		}

		newElement.body.velocity.x = 100;

}