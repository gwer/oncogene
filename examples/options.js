const options = {
    selector: '.oncogene',
    steps: [
        {
            key: 'idOnly',
            hint: 'first general hint',
            variants: [
                {
                    hint: 'first-first hint',
                    code: 'first-first code',
                    value: 'first-first'
                },
                {
                    hint: 'first-second hint',
                    code: 'first-second code',
                    value: 'first-second'
                }
            ]
        },
        {
            hint: 'second general hint',
            variants: [
                {
                    hint: 'second-first hint',
                    code: 'second-first code',
                    value: true
                },
                {
                    hint: 'second-second hint',
                    code: 'second-second code',
                    value: false
                }
            ],
            callback: (config, value) => {
                config.callbackOnly = value
                return config
            }
        },
        {
            key: 'thirdByKey',
            variants: [
                {
                    hint: 'third-first hint',
                    value: null
                },
                {
                    hint: 'third-second hint',
                    value: { mayBeObject: true }
                }
            ],
            callback: (config, value) => {
                config.thirdByCallback = value
                return config
            }
        },
        {
            key: 'many.levels.key',
            variants: [
                {
                    hint: 'forth-first hint',
                    value: 0
                },
                {
                    hint: 'forth-second hint',
                    value: 1
                },
                {
                    hint: 'forth-third hint',
                    value: 2
                }
            ]
        },
        {
            key: 'wow.many.levels.key',
            variants: [
                {
                    hint: 'fifth-first hint',
                    value: 0
                },
                {
                    hint: 'fifth-second hint',
                    value: 1
                },
                {
                    hint: 'fifth-third hint',
                    value: 2
                }
            ]
        },
        {
            key: 'sixthByKey',
            variants: [
                {
                    hint: 'sixth-first hint',
                    value: ["error", 4]
                },
                {
                    hint: 'sixth-second hint',
                    value: ["error",2]
                }
            ]
        },
        {
            key: 'sixthByKey',
            variants: [
                {
                    hint: 'Will replace prev array',
                    code: 'seventh-first code',
                    value: {dummy:true}
                },
                {
                    hint: 'Will append to prev',
                    code: 'seventh-second code',
                    value: {dummy:false},
                    push: true
                }
            ]
        },
        {
            key: 'wow',
            variants: [
                {
                    hint: 'Can push to a object',
                    code: 'eigth-first code',
                    value: {dummy:false},
                    push: true
                },
                {
                    hint: 'Will skip this',
                    code: 'skip code',
                    skip: true
                }
            ]
        },
        {
            key: 'coolKey',
            showIf: function(config){ return typeof config.sixthByKey.dummy !== "undefined" },
            variants: [
                {
                    code: 'first code',
                    value: "ok"
                },
                {
                    code: 'second code',
                    value: "not ok"
                },
            ]
        },
    ],
    config: {wow: {lol: true}},
    result: {
        hint: 'You can use it <b>everywhere</b>!'
    }
}