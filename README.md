[![npm version](https://badge.fury.io/js/oncogene.svg)](https://badge.fury.io/js/oncogene)

Oncogene (JS**ON** **Co**nfig **Gene**rator) allows to create visual config generators.
[Demo 1](https://gwer.github.io/oncogene/examples/demo.html).
[Demo 2](https://gwer.github.io/oncogene/examples/stylelint.html).
[Custom Progressbar](https://gwer.github.io/oncogene/examples/progressbar.html).

You only need to declare steps.

**Warning!** Oncogene is in active development. Minor versions may contain breaking changes.

### Usage
```
new Oncogene(options)
```
### Options reference
#### options {Object} | required

#### options.selector {String} | required
CSS selector of element which will be Oncogene root.

Example:
```
{
    selector: '.oncogene-root'
    ...
}
```

#### options.steps[] {Object} | required
List of generator's steps

#### options.steps[].key {String}
*required if `options.steps[].callback` not in use. 

Config key for chosen value. May be nested (dot separated).

#### options.steps[].callback {Function}
*required if `options.steps[].key` not in use.

Step callback. You can use it for complicated logic when a key is not enough.

Params:
* config {Object} — current config;
* value — chosen value.

Returns:
* config {Object} — new config.

**Note: You can use key or callback or both**

#### options.steps[].hint {String}
Common hint. Can contain HTML.

#### options.steps[].variants[] {Object}
Array of variants. It should contain at least two items.

#### options.steps[].variants[].hint {String}
Variant hint. Can contain HTML.

#### options.steps[].variants[].code {String}
Code example.

#### options.steps[].variants[].push {Boolean}
Applicable in case of array. Default behaviour, is to replace.  Setting it true will force the value to be pushed instead.

#### options.steps[].variants[].skip {Boolean}
Skip true will not add this key to config

#### options.steps[].variants[].value {Any}
Any value that will be set by `key` or/and will be used in `callback`.

Example:
```
{
    ...
    steps: [
        {
            key: 'someConfigKey',
            hint: 'Common hint',
            variants: [
                {
                    hint: 'first variant hint',
                    code: 'first code example',
                    value: 'first variant value'
                },
                ...
            ],
            callback: (config, value) => {
                config.anotherConfigKey = value
                return config
            }
        },
        ...
    ]
}
```

#### options.config {Object}
Initial config. By default it is empty object (`{}`).

#### options.skipValidation {Boolean}
Options validation skipping. By default it is false.

#### options.result {Object}
Configuring of result step.

#### options.result.hint {String}
Result hint. Can contain HTML.


### In the wild

- [eslint-config-generator](https://github.com/awebdeveloper/eslint-config-generator)
- [stylelint-config](https://github.com/maximgatilin/stylelint-config)
- 
