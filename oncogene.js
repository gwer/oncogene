class Oncogene {
    constructor({
        selector,
        steps,
        config = {},
        callback = c => c
    } = {}) {
        const options = {
            selector,
            steps,
            config,
            callback
        }

        this.checkOptions(options)
        this.handleOptions(options)

        this.root.classList.add(this.classes.root)

        this.nextStep()
    }

    nextStep() {
        if (this.nextStepInx >= this.steps.length) return this.showResults()

        this.renderStep(this.steps[this.nextStepInx++])
    }

    renderStep(step) {
        const root = document.createDocumentFragment()
        const hint = this.createNode(this.classes.commonHint)
        const variants = this.createNode(this.classes.variants)

        step.variants.forEach(addVariant.bind(this))

        hint.textContent = step.hint

        root.appendChild(hint)
        root.appendChild(variants)

        this.clearRoot()
        this.root.appendChild(root)

        function addVariant(variant, inx) {
            const item = this.createNode(this.classes.variant)
            const hint = this.createNode(this.classes.hint)
            const code = this.createNode(this.classes.code)

            hint.innerHTML = variant.hint
            code.textContent = variant.code

            item.dataset.inx = inx
            item.appendChild(hint)
            item.appendChild(code)
            item.addEventListener('click', clickHandler.bind(this))

            variants.appendChild(item)
        }

        function clickHandler(e) {
            const inx = e.currentTarget.dataset.inx
            const value = step.variants[inx].value

            if (step.key) {
                this.config[step.key] = value
            }

            if (step.callback) {
                this.config = step.callback(config, value)
            }

            console.log(this.config)
            this.nextStep()
        }
    }

    showResults() {
        this.renderResult()
    }

    renderResult() {
        const result = this.createNode(this.classes.result)
        const config = this.callback(this.config)

        result.textContent = JSON.stringify(this.config, 0, 4)

        this.clearRoot()
        this.root.appendChild(result)
    }

    createNode(className) {
        const node = document.createElement('div')

        node.className = className

        return node
    }

    clearRoot() {
        while (this.root.firstChild) {
            this.root.removeChild(this.root.firstChild)
        }
    }

    checkOptions(options) {
        const required = ['selector', 'steps']

        if (!options) throw new Error('You should specify options')

        required.forEach(field => {
            if (!options.hasOwnProperty(field)) {
                throw new Error(`You should specify ${field}`)
            }
        })

        if (!(options.steps instanceof Array))
            throw new Error('Steps should be an array')
    }

    handleOptions(options) {
        this.root = document.querySelector(options.selector)
        this.steps = options.steps
        this.config = options.config
        this.callback = options.callback
        this.nextStepInx = 0

        this.classes = {
            root: 'oncogene',
            commonHint: 'oncogene__hint',
            variants: 'oncogene-variants',
            variant: 'oncogene-variant',
            hint: 'oncogene-variant__hint',
            code: 'oncogene-variant__code',
            result: 'oncogene__result'
        }

        if (!this.root) throw new Error('Can\'t find element by selector')
    }
}
