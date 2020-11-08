class GameLogic {
    constructor(circlePlName, xPlName) {
        this.fields = document.querySelectorAll(".field")
        this.main = document.querySelector(".main")
        this.circlePlName = circlePlName;
        this.xPlName = xPlName;
        this.whichTurn = Math.floor(Math.random() * 2) + 1;
        this.popupBg;
        this.cells = [];
    }

    drawCircle() {
        const span = document.createElement("span")
        span.classList.add("far")
        span.classList.add("fa-circle")
        return span;
    }
    drawX() {
        const span = document.createElement("span")
        span.classList.add("fas")
        span.classList.add("fa-times")
        return span;
    }

    whichTurnMessage() {
        const div = document.createElement("div")
        div.classList.add("turn-message")
        if (this.whichTurn == 1) {
            div.classList.add("circle-turn")
            div.innerHTML = `<p>Ruch gracza: <span>${this.circlePlName}</span></p>`
        } else {
            div.classList.add("x-turn")
            div.innerHTML = `<p>Ruch gracza: <span>${this.xPlName}</span></p>`
        }
        this.main.appendChild(div)
    }
    game() {
        let turns = 0;
        this.whichTurnMessage()
        this.fields.forEach(field => field.addEventListener("click", () => {
            turns++;
            const index = field.getAttribute("index")
            const message = document.querySelector(".turn-message")
            if (!this.cells[index]) {
                if (this.whichTurn == 1) {
                    field.appendChild(this.drawCircle())
                    this.cells[index] = 'O';
                    this.checkWinnerMsg(turns, 'O')
                    this.whichTurn++;
                } else {
                    field.appendChild(this.drawX())
                    this.cells[index] = 'X';
                    this.checkWinnerMsg(turns, 'X')
                    this.whichTurn--;
                }
                this.whichTurnMessage()
                message.parentNode.removeChild(message);

            }
        }))
    }
    checkWinnerAlg() {
        const cells = this.cells;
        if (cells[0] == 'O' && cells[0] == cells[1] && cells[1] == cells[2] ||
            cells[3] == 'O' && cells[3] == cells[4] && cells[4] == cells[5] ||
            cells[6] == 'O' && cells[6] == cells[7] && cells[7] == cells[8] ||
            cells[0] == 'O' && cells[0] == cells[3] && cells[3] == cells[6] ||
            cells[1] == 'O' && cells[1] == cells[4] && cells[4] == cells[7] ||
            cells[2] == 'O' && cells[2] == cells[5] && cells[5] == cells[8] ||
            cells[0] == 'O' && cells[0] == cells[4] && cells[4] == cells[8] ||
            cells[2] == 'O' && cells[2] == cells[4] && cells[4] == cells[6]) {
            return 'O wins';
        } else if (cells[0] == 'O' && cells[0] == cells[1] && cells[1] == cells[2] ||
            cells[3] == 'X' && cells[3] == cells[4] && cells[4] == cells[5] ||
            cells[6] == 'X' && cells[6] == cells[7] && cells[7] == cells[8] ||
            cells[0] == 'X' && cells[0] == cells[3] && cells[3] == cells[6] ||
            cells[1] == 'X' && cells[1] == cells[4] && cells[4] == cells[7] ||
            cells[2] == 'X' && cells[2] == cells[5] && cells[5] == cells[8] ||
            cells[0] == 'X' && cells[0] == cells[4] && cells[4] == cells[8] ||
            cells[2] == 'X' && cells[2] == cells[4] && cells[4] == cells[6]) {
            return 'X wins';
        } 
    }
    checkWinnerMsg(turns) {
        if (turns >= 5) {
            if (this.checkWinnerAlg()) {
                this.popupBg = document.createElement("div")
                this.popupBg.className = "popup-bg"
                document.body.appendChild(this.popupBg)

                const popup = document.createElement("div")
                popup.className = "popup"
                let winnerName;
                if (this.checkWinnerAlg() === 'O wins') {
                    winnerName = this.circlePlName;
                } else if (this.checkWinnerAlg() === 'X wins') {
                    winnerName = this.xPlName
                } 
                switch (winnerName) {
                    case this.circlePlName:
                        popup.innerHTML = `<p>Zwyciężył gracz <span class='cir'>${this.circlePlName}</span> (kółko). <strong>Gratulacje!</strong></p>`
                        break;
                    case this.xPlName:
                        popup.innerHTML = `<p>Zwyciężył gracz <span class='x'>${this.xPlName}</span> (krzyżyk). <strong>Gratulacje!</strong></p>`
                        break;
                }
                const button = this.revangeButton()
                const img = document.createElement("img")
                img.setAttribute("src", "src/images/medal.png")
                this.popupBg.appendChild(popup)
                popup.appendChild(img)
                popup.appendChild(button)
                this.main.style.filter = "blur(50px)"
            }
        }
    }
    revangeButton() {
        const button = document.createElement("button")
        button.className = "play-again"
        button.textContent = "rewanż"
        button.addEventListener("click", () => {
            this.reset()
        })
        return button
    }
    
    reset() {
            this.popupBg.style.display = "none";
            this.whichTurn = Math.floor(Math.random() * 2) + 1;
            this.cells = []
            this.fields.forEach(field => field.textContent = "")
            this.main.style.filter = "blur(0)"
            const message = document.querySelector(".turn-message")
            message.parentNode.removeChild(message);
            this.game()
    }
    

}
export default GameLogic;