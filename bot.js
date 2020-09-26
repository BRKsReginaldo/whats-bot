const venom = require('venom-bot')
const {Query} = require('./mingo')
const responders = require('./responders')

venom.create()
    .then(start)
    .catch(console.error)

const rules = [
    {
        query: {
            from: '554197730230@c.us',
            type: 'chat',
            body: {
                $regex: '^o+i+(!+)?',
                $options: 'i'
            }
        },
        response: {
            type: 'chat',
            body: 'Coé {{sender.name}}'
        }
    },
    {
        query: {
            from: '554197730230@c.us',
            type: 'image',
            caption: {
                $regex: '^o+i+(!+)?',
                $options: 'i'
            }
        },
        response: {
            type: 'chat',
            body: 'Que doidera bixo'
        }
    },
    {
        query: {
            'sender.name': 'Rafael',
            body: {
                $regex: '^o+i+(!+)?',
                $options: 'i'
            }
        },
        response: {
            type: 'chat',
            body: 'porra {{sender.name}}, ta maluco? kkkkkk'
        }
    }
]

async function respond({response, message, client}) {
    const responder = responders[response.type]

    if (responder) {
        await responder({
            response,
            message,
            client
        })
    }
}

function start(client) {
    const compiled = rules.map(({query, response}) => ({
        query: new Query(query),
        response
    }))

    client.onMessage(message => {
        const match = compiled.find(rule => rule.query.test(message))

        if (match) {
            respond({
                response: match.response,
                message,
                client
            })
        }
    })
}
