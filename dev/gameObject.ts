
class GameObject {

    protected div : HTMLElement
    protected x : number
    protected y: number

    constructor() {

        console.log("I am a gameobject")
    }


    public getRectangle() : DOMRect {
        return this.div.getBoundingClientRect()
    }

    public update() : void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}