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
                    hint: 'Will replace prev',
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
    ],
    config: {wow: {lol: true}},
    result: {
        hint: 'You can use it <b>everywhere</b>!'
    }
}