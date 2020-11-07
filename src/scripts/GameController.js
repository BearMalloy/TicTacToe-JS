import GameLogic from "./GameLogic.js";

class GameController{
    
    constructor() {
        this.form = document.querySelector(".main__form");
        this.area = document.querySelector(".main__area");
        this.fields = document.querySelectorAll(".field")
        this.circlePlName;
        this.xPlName;
        this.gameInit()

    }

    assignNames() {
        const inputCircle = document.querySelector(".form__input--circle")
        const inputX = document.querySelector(".form__input--x")

        if (inputCircle && inputX) {
            this.circlePlName = inputCircle.value;
            this.xPlName = inputX.value;
            this.clear()
        }
    }
    clear() {
        this.form.style.display = "none";
        this.fields.forEach(field => field.textContent = "")
    }

  
    gameInit() {
        this.form.addEventListener("submit",(e) => {
            e.preventDefault();
            this.assignNames()
            this.logic = new GameLogic(this.circlePlName, this.xPlName);
        })
    }

}

document.addEventListener("DOMContentLoaded", () =>  new GameController())