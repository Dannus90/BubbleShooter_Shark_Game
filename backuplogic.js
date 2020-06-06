for (let i = 0; i < this.SharkCount; i++) {
    const sharkEl = this.createShark();
    const topPos = this.getRandomNo(this.containerHeight);
    const endPos = this.containerWidth + 50;
    let intervalTimeShark = this.getRandomNo(100) + i * 2000;

    const intervalShark = setInterval(() => {
        this.moveShark(sharkEl, topPos, endPos, this.sharkSpeed);
        clearInterval(intervalShark);
    }, intervalTimeShark);
}

// for (let i = 0; i < this.ballCount; i++) {
//     const ballEl = this.createBall();
//     const leftPos = this.getRandomNo(this.containerWidth - 103);
//     const endPos = this.containerHeight + 50;
//     let intervalTimeBall = this.getRandomNo(100) + i * 1000;

//     const intervalBall = setInterval(() => {
//         this.dropBall(ballEl, leftPos, endPos, this.dropBallSpeed);
//         clearInterval(intervalBall);
//     }, intervalTimeBall);
// }

// setInterval(() => {
//     let intervalTimeBall =
//         this.getRandomNo(100) + Math.floor(Math.random() * 5) * 1000;
//     const ballEl = this.createBall();
//     const leftPos = this.getRandomNo(this.containerWidth - 103);
//     const endPos = this.containerHeight + 50;

//     if (this.gameOver === true) {
//         clearInterval(intervalTime);
//     } else if (this.gameOver === false) {
//         this.dropBall(ballEl, leftPos, endPos, this.dropBallSpeed);
//     }
// }, intervalTimeBall);

// setInterval(() => {
//     let intervalTimeShark =
//         this.getRandomNo(100) + Math.floor(Math.random() * 5) * 1000;
//     const sharkEl = this.createShark();
//     const topPos = this.getRandomNo(this.containerHeight);
//     const endPos = this.containerWidth + 50;

//     if (this.gameOver === true) {
//         clearInterval(intervalTime);
//     } else if (this.gameOver === false) {
//         this.moveShark(sharkEl, topPos, endPos, this.sharkSpeed);
//     }
// }, intervalTimeShark);
