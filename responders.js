const {get} = require('lodash')

function compileMessage(precompiled, message) {
    return precompiled.replace(/{{([a-zA-Z-_\.]+)}}/g, (match, index, original) => {
        return get(message, index, index)
    })
}

function chatResponder({response, message, client}) {
    return client.sendText(message.from, compileMessage(response.body, message))
}

module.exports = {
    'chat': chatResponder
}
