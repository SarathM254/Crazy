// Basic structure for Space Shooter 3D
class SpaceShooterGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.player = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 50,
            width: 50,
            height: 50,
            speed: 5
        };
        this.bullets = [];
        this.enemies = [];
        this.score = 0;
        this.health = 100;

        this.keys = {};
        window.addEventListener('keydown', (e) => this.keys[e.code] = true);
        window.addEventListener('keyup', (e) => this.keys[e.code] = false);

        this.spawnEnemy();
    }

    update() {
        // Player movement
        if (this.keys['ArrowLeft'] && this.player.x > 0) {
            this.player.x -= this.player.speed;
        }
        if (this.keys['ArrowRight'] && this.player.x < this.canvas.width - this.player.width) {
            this.player.x += this.player.speed;
        }

        // Bullets
        this.bullets.forEach((bullet, index) => {
            bullet.y -= bullet.speed;
            if (bullet.y < 0) {
                this.bullets.splice(index, 1);
            }
        });

        // Enemies
        this.enemies.forEach((enemy, index) => {
            enemy.y += enemy.speed;
            if (enemy.y > this.canvas.height) {
                this.enemies.splice(index, 1);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Player
        this.ctx.fillStyle = 'cyan';
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

        // Bullets
        this.ctx.fillStyle = 'pink';
        this.bullets.forEach(bullet => {
            this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });

        // Enemies
        this.ctx.fillStyle = 'purple';
        this.enemies.forEach(enemy => {
            this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        });
    }

    spawnEnemy() {
        setInterval(() => {
            this.enemies.push({
                x: Math.random() * this.canvas.width,
                y: -50,
                width: 50,
                height: 50,
                speed: 2
            });
        }, 1000);
    }

    shoot() {
        this.bullets.push({
            x: this.player.x + this.player.width / 2,
            y: this.player.y,
            width: 5,
            height: 10,
            speed: 10
        });
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}
