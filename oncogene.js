class Oncogene {
    constructor(options) {
        this.checkOptions(options)
        this.handleOptions(options)

        this.root.classList.add(this.classes.common.root)

        this.nextStep()
    }

    nextStep() {
        if (this.nextStepInx >= this.steps.length) return this.showResults()

        this.renderStep(this.steps[this.nextStepInx++])
    }

    renderStep(step) {
        const root = document.createDocumentFragment()
        const hint = this.createNode(this.classes.common.hint)
        const variants = this.createNode(this.classes.variants.root)

        step.variants.forEach(addVariant.bind(this))

        hint.innerHTML = step.hint || ''

        root.appendChild(hint)
        root.appendChild(variants)

        this.clearRoot()
        this.root.appendChild(root)

        function addVariant(variant, inx) {
            const item = this.createNode(this.classes.variants.item)
            const hint = this.createNode(this.classes.variants.hint)
            const code = this.createNode(this.classes.variants.code)

            hint.innerHTML = variant.hint || ''
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
                this.config = step.callback(this.config, value)
            }

            this.nextStep()
        }
    }

    showResults() {
        this.renderResult()
    }

    renderResult() {
        const result = this.createNode(this.classes.result.root)
        const hint = this.createNode(this.classes.result.hint)
        const config = this.createNode(this.classes.result.config)

        result.appendChild(hint)
        result.appendChild(config)

        hint.innerHTML = this.result.hint || ''
        config.textContent = this.result.callback(this.config)

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
        const objects = ['result', 'classes']

        // Will be true for function. It's little wrong, but not scary
        const isObject = val => val === Object(val)
        const isUndefined = val => typeof val === 'undefined'

        if (!options) throw new Error('You should specify options')

        required.forEach(field => {
            if (!options.hasOwnProperty(field)) {
                throw new Error(`You should specify ${field}`)
            }
        })

        objects.forEach(field => {
            if (!isUndefined(options[field]) && !isObject(options[field])) {
                throw new Error(`options.${field} should be an object`)
            }
        })

        if (!(options.steps instanceof Array))
            throw new Error('Steps should be an array')
    }

    handleOptions(options) {
        const classes = options.classes || {}

        this.root = document.querySelector(options.selector)
        this.steps = options.steps
        this.config = options.config || {}
        this.result = Object.assign({
            callback: (config) => JSON.stringify(config, 0, 4)
        }, options.result)
        this.classes = {
            common: Object.assign({
                root: 'oncogene',
                hint: 'oncogene__hint'
            }, classes.common),
            variants: Object.assign({
                root: 'oncogene-variants',
                hint: 'oncogene-variants__hint',
                item: 'oncogene-variants__item',
                code: 'oncogene-variants__code'
            }, classes.variants),
            result: Object.assign({
                root: 'oncogene-result',
                hint: 'oncogene-result__hint',
                config: 'oncogene-result__config'
            }, classes.result)
        }
        this.nextStepInx = 0

        if (!this.root) throw new Error('Can\'t find element by selector')
    }
}
