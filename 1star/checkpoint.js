class CollisionRect {
    #x;
    #y;
    #w;
    #h;

    constructor(x = 0, y = 0, w = 0, h = 0) {
        this.#x = x;
        this.#y = y;
        this.#w = w;
        this.#h = h;
    }

    getX() { return this.#x; }
    getY() { return this.#y; }
    getWidth() { return this.#w; }
    getHeight() { return this.#h; }

    setPosition(x, y) {
        this.#x = x;
        this.#y = y;
    }

    setDimensions(width, height) {
        this.#w = width;
        this.#h = height;
    }

    containsPoint(x, y) {
        return x >= this.#x && x <= this.#x + this.#w &&
               y >= this.#y && y <= this.#y + this.#h;
    }
}

class Checkbox extends CollisionRect {

    static DISABLED = "disabled";
    static ENABLED = "enabled";
    static HOVER = "hover";
    static PRESSED = "pressed";

    #state = Checkbox.ENABLED;
    #label;
    #eventHandler;
    #checkboxElement;

    constructor(x, y, w, h, label, eventHandler) {
        super(x, y, w, h);

        this.#label = label;
        this.#eventHandler = eventHandler;

        this.#checkboxElement = createCheckbox(label, false);
        this.#checkboxElement.position(this.getX(), this.getY());

        this.#checkboxElement.changed(() => {
            if (this.#eventHandler) {
                this.#eventHandler();
            }
        });
    }

    draw() {
        this.#checkboxElement.position(this.getX(), this.getY());
    }

    checkHover(x, y) {
        if (this.#state !== Checkbox.DISABLED) {
            if (this.containsPoint(x, y)) {
                this.#state = Checkbox.HOVER;
            } else {
                this.#state = Checkbox.ENABLED;
            }
        }
    }

    checkClick(x, y) {
        if (this.#state !== Checkbox.DISABLED && this.containsPoint(x, y)) {
            this.#state = Checkbox.PRESSED;

            if (this.#eventHandler) {
                this.#eventHandler();
            }
        }
    }

    disable() {
        this.#state = Checkbox.DISABLED;
        this.#checkboxElement.attribute("disabled", "");
    }

    enable() {
        if (this.#state === Checkbox.DISABLED) {
            this.#state = Checkbox.ENABLED;
            this.#checkboxElement.removeAttribute("disabled");
        }
    }
}
