class GameLogic {
    constructor(circlePlName, xPlName) {
        this.fields = document.querySelectorAll(".field")
        this.main = document.querySelector(".main")
        this.circlePlName = circlePlName;
        this.xPlName = xPlName;
        this.whoStart = Math.floor(Math.random() * 2) + 1;
        this.cells = [];   
        this.nextTurn();
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
        if (this.whoStart == 1) {
            div.classList.add("circle-turn")
            div.innerHTML = `<p>Ruch gracza: <span>${this.circlePlName}</span></p>`
        } else {
            div.classList.add("x-turn")
            div.innerHTML = `<p>Ruch gracza: <span>${this.xPlName}</span></p>`
        }
        this.main.appendChild(div)
    } 
    nextTurn() {
        let turns = 0;
        
        this.whichTurnMessage()
        this.fields.forEach(field => field.addEventListener("click", () => {
            turns++;
            const index = field.getAttribute("index")
            const message = document.querySelector(".turn-message")
            if (this.whoStart == 1) {
                field.appendChild(this.drawCircle())
                this.cells[index] = 'O';
                this.checkWinnerMsg(turns, 'O')
                this.whoStart++;
            } else {
                field.appendChild(this.drawX())
                this.cells[index] = 'X';
                this.checkWinnerMsg(turns, 'X')
                this.whoStart--;
            }
            this.whichTurnMessage()
            
            message.parentNode.removeChild(message);
        }))
    } 
    checkWinnerAlg(sign) {
        const cells = this.cells;
        if (cells[0] == sign && cells[0] == cells[1] && cells[1] == cells[2]){
            return `${sign} wins`
        } else if (cells[3] == sign && cells[3] == cells[4] && cells[4] == cells[5]){
            return `${sign} wins`
        } else if (cells[6] == sign && cells[6] == cells[7] && cells[7] == cells[8]){
            return `${sign} wins`
        } else if (cells[0] == sign && cells[0] == cells[3] && cells[3] == cells[6]){
            return `${sign} wins`
        } else if (cells[1] == sign && cells[1] == cells[4] && cells[4] == cells[7]){
            return `${sign} wins`
        } else if (cells[2] == sign && cells[2] == cells[5] && cells[5] == cells[8]){
            return `${sign} wins`
        } else if (cells[0] == sign && cells[0] == cells[4] && cells[4] == cells[8]){
            return `${sign} wins`
        } else if (cells[2] == sign && cells[2] == cells[4] && cells[4] == cells[6]){
            return `${sign} wins`
        }
       
    }
    checkWinnerMsg(turns, sign) {
        if (turns >= 5) {
            switch(this.checkWinnerAlg(sign)) {
                case `${sign} wins` :
                    console.log(`${sign} wins`)
                    break;
            }
        }
    }   
   

}
export default GameLogic;