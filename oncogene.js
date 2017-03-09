class Oncogene {
    constructor(options) {
        this.constructor.checkOptions(options)
        this.handleOptions(options)

        this.root.classList.add(this.classes.common.root)

        this.nextStep()
    }

    nextStep() {
        if (++this.stepInx >= this.steps.length) return this.renderResults()

        this.step = this.steps[this.stepInx]
        this.renderStep()
    }

    prevStep() {
        if (--this.stepInx < 0) throw new Error('Previous step is not exists')

        this.step = this.steps[this.stepInx]
        this.renderStep()
    }

    renderStep() {
        const stepNode = this.getStepNode()

        this.clearRoot()
        this.root.appendChild(stepNode)
    }

    renderResults() {
        const result = this.getResultNode()

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

    setVal(key, value) {
        const path = key.split('.')
        let cur = this.config

        while (path.length > 1) {
            const subKey = path.shift()

            if (!cur.hasOwnProperty(subKey)) cur[subKey] = {}

            if (!this.constructor.isObject(cur[subKey])) {
                throw new Error(`Part of path ${key} is not an object`)
            }

            cur = cur[subKey]
        }

        cur[path.shift()] = value
    }


    getStepNode() {
        const root = document.createDocumentFragment()
        const hint = this.createNode(this.classes.common.hint)
        const variants = this.createNode(this.classes.variants.root)
        const progress = this.getProgressNode()

        this.step.variants.forEach((variant, inx) => {
            const variantNode = this.getVariantNode(variant, inx)

            variants.appendChild(variantNode)
        })

        hint.innerHTML = this.step.hint || ''

        root.appendChild(hint)
        root.appendChild(variants)
        root.appendChild(progress)

        return root
    }

    getVariantNode(variant, inx) {
        const item = this.createNode(this.classes.variants.item)
        const hint = this.createNode(this.classes.variants.hint)
        const code = this.createNode(this.classes.variants.code)

        hint.innerHTML = variant.hint || ''
        code.innerHTML = variant.code || ''

        item.dataset.inx = inx
        item.appendChild(hint)
        item.appendChild(code)
        item.addEventListener('click', this.variantClickHandler.bind(this))

        return item
    }

    getProgressNode() {
        const progress = this.createNode(this.classes.common.progress)

        progress.innerHTML = `${this.stepInx + 1} / ${this.steps.length}`

        return progress
    }

    getResultNode() {
        const resultNode = this.createNode(this.classes.result.root)
        const hintNode = this.createNode(this.classes.result.hint)
        const configNode = this.createNode(this.classes.result.config)

        resultNode.appendChild(hintNode)
        resultNode.appendChild(configNode)

        hintNode.innerHTML = this.result.hint
        configNode.textContent = this.getResult()

        return resultNode
    }


    variantClickHandler(e) {
        const inx = e.currentTarget.dataset.inx
        const value = this.step.variants[inx].value

        if (this.step.key) {
            this.setVal(this.step.key, value)
        }

        if (this.step.callback) {
            this.config = this.step.callback(this.config, value)
        }

        this.nextStep()
    }

    getResult() {
        return JSON.stringify(this.config, null, 4)
    }

    handleOptions(options) {
        const defaults = {
            config: {},
            classes: {}
        }
        const classes = options.classes || defaults.classes

        this.root = document.querySelector(options.selector)
        this.steps = options.steps
        this.config = options.config || defaults.config
        this.result = Object.assign({
            hint: ''
        }, options.result)
        this.classes = {
            common: Object.assign({
                root: 'oncogene',
                hint: 'oncogene__hint',
                progress: 'oncogene__progress'
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
        this.stepInx = -1

        if (!this.root) throw new Error('Can\'t find element by selector')
    }


    static checkOptions(options) {
        const required = ['selector', 'steps']
        const objects = ['result', 'classes']

        if (!options) throw new Error('You should specify options')

        required.forEach(field => {
            if (!options.hasOwnProperty(field)) {
                throw new Error(`You should specify ${field}`)
            }
        })

        objects.forEach(field => {
            if (true
                && !this.isUndefined(options[field])
                && !this.isObject(options[field])) {
                throw new Error(`options.${field} should be an object`)
            }
        })

        if (!(options.steps instanceof Array))
            throw new Error('Steps should be an array')
    }

    static isObject(val) {
        return (val === Object(val)) && !this.isFunction(val)
    }

    static isUndefined(val) {
        return typeof val === 'undefined'
    }

    static isFunction(val) {
        return typeof val === 'function'
    }
}
