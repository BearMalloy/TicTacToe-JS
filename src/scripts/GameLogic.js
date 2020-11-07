class GameLogic {
    constructor(circlePlName, xPlName) {
        this.fields = document.querySelectorAll(".field")
        this.main = document.querySelector(".main")
        this.circlePlName = circlePlName;
        this.xPlName = xPlName;
        this.whoStart = Math.floor(Math.random() * 2) + 1;
        
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
        
        this.whichTurnMessage()
        this.fields.forEach(field => field.addEventListener("click", () => {
            const message = document.querySelector(".turn-message")
            if (this.whoStart == 1) {
                field.appendChild(this.drawCircle())
                this.whoStart++;
                this.whichTurnMessage()  
            } else {
                field.appendChild(this.drawX())
                this.whoStart--;
                this.whichTurnMessage()
            }
            
            message.parentNode.removeChild(message);
        }))
    }    
   

}
export default GameLogic;