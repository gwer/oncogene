class Oncogene {
    constructor(options) {
        this.constructor.checkOptions(options)
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
        const stepInx = this.nextStepInx - 1
        const stepsCount = this.steps.length
        const progress = this.getProgressNode(stepInx, stepsCount)

        step.variants.forEach(addVariant.bind(this))

        hint.innerHTML = step.hint || ''

        root.appendChild(hint)
        root.appendChild(variants)
        root.appendChild(progress)

        this.clearRoot()
        this.root.appendChild(root)

        function addVariant(variant, inx) {
            const item = this.createNode(this.classes.variants.item)
            const hint = this.createNode(this.classes.variants.hint)
            const code = this.createNode(this.classes.variants.code)

            hint.innerHTML = variant.hint || ''
            code.innerHTML = variant.code || ''

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
                this.setVal(step.key, value)
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


    getProgressNode(inx, count) {
        const progress = this.createNode(this.classes.common.progress)

        progress.innerHTML = `${inx + 1} / ${count}`

        return progress
    }


    handleOptions(options) {
        const defaults = {
            config: {},
            classes: {},
            resultCallback: config => JSON.stringify(config, null, 4)
        }
        const classes = options.classes || defaults.classes

        this.root = document.querySelector(options.selector)
        this.steps = options.steps
        this.config = options.config || defaults.config
        this.result = Object.assign({
            callback: defaults.resultCallback
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
        this.nextStepInx = 0

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
