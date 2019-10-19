function sethashtags(keywords) {
    let tags = []
    const keyword = keywords.forEach((i) => {
        if (i.relevance > 0.50) {
            if (i.text.indexOf(' ') >= 0) {
                const tagges = i.text.split(' ').join('_')
                tags.push(`#${tagges}`)
            } else {
                tags.push(`#${i.text}`)
            }
        }
    })
    return tags
}

module.exports = {
    sethashtags
}