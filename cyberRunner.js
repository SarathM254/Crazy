// Basic structure for Cyber Runner
class CyberRunnerGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.player = {
            x: 50,
            y: this.canvas.height - 50,
            width: 50,
            height: 50,
            speedY: 0,
            gravity: 0.5,
            jumpForce: -12,
            grounded: true
        };
        this.obstacles = [];
        this.score = 0;
        this.gameOver = false;

        this.keys = {};
        window.addEventListener('keydown', (e) => this.keys[e.code] = true);
        window.addEventListener('keyup', (e) => this.keys[e.code] = false);

        this.spawnObstacle();
    }

    update() {
        if (this.gameOver) return;

        // Player jump
        if (this.keys['Space'] && this.player.grounded) {
            this.player.speedY = this.player.jumpForce;
            this.player.grounded = false;
        }

        this.player.speedY += this.player.gravity;
        this.player.y += this.player.speedY;

        // Ground collision
        if (this.player.y > this.canvas.height - this.player.height) {
            this.player.y = this.canvas.height - this.player.height;
            this.player.speedY = 0;
            this.player.grounded = true;
        }

        // Obstacles
        this.obstacles.forEach((obstacle, index) => {
            obstacle.x -= 5;
            if (obstacle.x < -obstacle.width) {
                this.obstacles.splice(index, 1);
                this.score++;
            }

            // Collision detection
            if (
                this.player.x < obstacle.x + obstacle.width &&
                this.player.x + this.player.width > obstacle.x &&
                this.player.y < obstacle.y + obstacle.height &&
                this.player.y + this.player.height > obstacle.y
            ) {
                this.gameOver = true;
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Player
        this.ctx.fillStyle = 'cyan';
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

        // Obstacles
        this.ctx.fillStyle = 'purple';
        this.obstacles.forEach(obstacle => {
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });

        // Score
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Orbitron';
        this.ctx.fillText(`Score: ${this.score}`, 10, 20);

        if (this.gameOver) {
            this.ctx.fillStyle = 'red';
            this.ctx.font = '50px Orbitron';
            this.ctx.fillText('Game Over', this.canvas.width / 2 - 150, this.canvas.height / 2);
        }
    }

    spawnObstacle() {
        setInterval(() => {
            if (!this.gameOver) {
                this.obstacles.push({
                    x: this.canvas.width,
                    y: this.canvas.height - 50,
                    width: 20,
                    height: 50
                });
            }
        }, 2000);
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}
