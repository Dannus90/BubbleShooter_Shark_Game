class Game {
    constructor() {
        this.init();
        this.startBtnEl.addEventListener("click", () => this.startGame());
    }

    startGame() {
        this.backgroundMusic.load();
        this.backgroundMusic.play();
        this.startBtnEl.removeEventListener("click", this.startGame);
        this.startBtnEl.remove();
        this.gameInformationEl.classList.add("game-info-hide");

        for (let i = 0; i < this.sharkCount; i++) {
            if (this.gameOver === false) {
                const sharkEl = this.createShark();
                const topPos = this.getRandomNo(this.containerHeight - 103);
                const endPos = this.containerWidth + 50;

                let intervalTimeShark = this.getRandomNo(100) + i * 1000;

                const intervalShark = setInterval(() => {
                    this.moveShark(sharkEl, topPos, endPos, this.sharkSpeed);
                    clearInterval(intervalShark);
                }, intervalTimeShark);
            } else {
                return;
            }
        }

        //Looping shark and increase difficulty gradually

        let loopTimingShark = 3250;

        const loopShark = () => {
            if (this.totalFailsCount < 30) {
                for (let i = 0; i < this.sharkCount; i++) {
                    if (this.totalFailsCount < 30) {
                        const sharkEl = this.createShark();
                        const topPos = this.getRandomNo(
                            this.containerHeight - 103
                        );
                        const endPos = this.containerWidth + 50;

                        let intervalTimeShark =
                            this.getRandomNo(100) + i * 1000;

                        const intervalShark = setInterval(() => {
                            this.moveShark(
                                sharkEl,
                                topPos,
                                endPos,
                                this.sharkSpeed
                            );
                            clearInterval(intervalShark);
                        }, intervalTimeShark);
                    } else {
                        return;
                    }
                }
                if (loopTimingShark > 1000) {
                    loopTimingShark -= 20;
                }

                if (this.sharkSpeed > 0.3) {
                    this.sharkSpeed -= 0.1;
                }
                window.setTimeout(loopShark, loopTimingShark);
            } else {
                return;
            }
        };

        //Looping ball and increase difficulty gradually
        let loopTimingBall = 3250;

        const loopBall = () => {
            if (this.totalFailsCount < 30) {
                for (let i = 0; i < this.ballCount; i++) {
                    if (this.totalFailsCount < 30) {
                        const ballEl = this.createBall();
                        const leftPos = this.getRandomNo(
                            this.containerWidth - 103
                        );
                        const endPos = this.containerHeight + 50;
                        let intervalTimeBall = this.getRandomNo(100) + i * 1000;

                        const intervalBall = setInterval(() => {
                            this.dropBall(
                                ballEl,
                                leftPos,
                                endPos,
                                this.dropBallSpeed
                            );

                            clearInterval(intervalBall);
                        }, intervalTimeBall);
                    } else {
                        return;
                    }
                }
                if (loopTimingBall > 1000) {
                    loopTimingBall -= 20;
                }

                if (this.dropBallSpeed > 0.3) {
                    this.dropBallSpeed -= 0.1;
                }

                window.setTimeout(loopBall, loopTimingBall);
            } else {
                this.gameEnded();
                return;
            }
        };

        loopBall();
        loopShark();
    }

    init() {
        this.container = document.getElementById("container");
        this.scoreEl = document.getElementById("score");
        this.totalFailsEl = document.getElementById("total-fails");
        this.missedScoreEl = document.getElementById("missed-score");
        this.hitBySharkEl = document.getElementById("hit-by-shark");
        this.gameInformationEl = document.getElementById("game-info");
        this.containerHeight = this.container.offsetHeight;
        this.containerWidth = this.container.offsetWidth;
        // Variation of it
        // this.shootingAudio = new Audio("./sound/shooting.mp3");
        this.shootingAudio = document.getElementById("shooting-audio");
        this.missedAudio = document.getElementById("lost-audio");
        this.backgroundMusic = document.getElementById("game-background");
        this.startBtnEl = document.getElementById("start-game");
        this.sharkCount = 3;
        this.sharkSpeed = 10;
        this.score = 0;
        this.missedCount = 0;
        this.hitBySharkCount = 0;
        this.totalFailsCount = 0;
        this.ballCount = 3;
        this.dropBallSpeed = 10;
        this.gameOver = false;
    }

    //Checking if game over
    gameEnded() {
        this.container.innerHTML = `<div class="background">
        <div class="modal">
            <p class="lost-game-text">
                You lost the game! Please try again!
            </p>
            <p class="final-score">
                Final score: <span class="score">${this.score}</span>
            </p>
        </div>
    </div>`;
        this.container.appendChild(this.startBtnEl);
        this.startBtnEl.addEventListener("click", () =>
            this.gameEndedRemover()
        );
        this.gameInformationEl.classList.remove("game-info-hide");

        // this.shootingAudio.pause();
        // this.missedAudio.pause();
        this.backgroundMusic.pause();
    }

    gameEndedRemover() {
        document.querySelector(".background").remove();

        this.startBtnEl.remove();
        this.missedCount = 0;
        this.hitBySharkCount = 0;
        this.totalFailsCount = 0;
        this.score = 0;
        this.hitBySharkEl.textContent = this.hitBySharkCount.toString();
        this.totalFailsEl.textContent = this.totalFailsCount.toString();
        this.missedScoreEl.textContent = this.missedCount.toString();
        this.scoreEl.textContent = this.score.toString();

        this.startGame();
    }

    // SHARK EVENTS
    // Creating shark with random position and picture
    createShark() {
        const sharkEl = document.createElement("div");

        sharkEl.classList.add(`shark-${Math.floor(Math.random() * 3)}`);

        sharkEl.addEventListener("mouseover", (event) =>
            this.removeShark(event)
        );

        this.container.appendChild(sharkEl);

        return sharkEl;
    }

    // Remove Shark and add hit by shark and total fails.
    removeShark(event) {
        const targetSharkEl = event.target;
        this.hitBySharkCount += 1;
        this.totalFailsCount += 1;
        this.hitBySharkEl.textContent = this.hitBySharkCount.toString();
        this.totalFailsEl.textContent = this.totalFailsCount.toString();

        this.missedAudio.play();
        targetSharkEl.remove();
    }

    // Move Shark
    moveShark(sharkEl, topPos, endPos, speed) {
        let currentLeft = 0;

        sharkEl.style.top = topPos + "px";

        const interval = setInterval(() => {
            if (endPos === currentLeft) {
                clearInterval();
                sharkEl.remove();
            } else {
                currentLeft += 2;
                sharkEl.style.left = currentLeft + "px";
            }
        }, speed);
    }

    // Ball Events
    createBall() {
        const ballEl = document.createElement("div");

        const points = this.getRandomNo(99);

        ballEl.classList.add("ball");

        ballEl.textContent = points.toString();

        //SET AND GET ATTRIBUTE TO GRAB POINTS
        ballEl.setAttribute("data-points", points);

        ballEl.addEventListener("click", (event) => this.shotBall(event));

        this.container.appendChild(ballEl);

        return ballEl;
    }

    dropBall(ballEl, leftPos, endPos, speed) {
        let currentTop = 0;

        ballEl.style.left = leftPos + "px";
        ballEl.style.backgroundColor = "#" + this.getRandomNo(999);

        //Doing like this to clear the intervall
        const interval = setInterval(() => {
            if (endPos <= currentTop) {
                clearInterval(interval);
                this.missedAudio.play();
                ballEl.remove();
                this.missedCount += 1;
                this.missedScoreEl.textContent = this.missedCount.toString();
                this.totalFailsCount += 1;
                this.totalFailsEl.textContent = this.totalFailsCount.toString();
            } else {
                currentTop += 2;
                ballEl.style.top = currentTop + "px";
            }
        }, speed);
        // Binding the inteval to this particular ball
        ballEl.setAttribute("data-interval-id", interval);
    }

    shotBall(event) {
        const targetEl = event.target;
        const points = targetEl.getAttribute("data-points");
        const intervalId = parseInt(targetEl.getAttribute("data-interval-id"));

        clearInterval(intervalId);
        this.addScore(points);
        this.shootingAudio.play();
        targetEl.remove();
    }

    addScore(points) {
        this.score += parseInt(points);
        this.scoreEl.textContent = this.score.toString();
    }

    getRandomNo(range) {
        return Math.floor(Math.random() * range) + 1;
    }
}

new Game();
