const emoji = require('../emoji.json');
function setemoji(sentiment, emotions) {
    if (getHighestScore(emotions)) {
        setRelevantEmoji(getHighestScore(emotions), emotions)
        if (sentiment.document.label === 'neutral') {
            const getemoji = emoji.neutral;
            //console.log(getemoji)
            return getemoji
        }
        else if (sentiment.document.label === 'positive') {
            const score = sentiment.document.score;
            const joy = emotions.joy;
            //console.log(score, joy)
        }
    } else {
        const getemoji = emoji.neutral;
        return getemoji
    }
}

function getHighestScore(emotions) {
    for (emotion in emotions) {
        if (emotions[emotion] > 0.5) {
            let highest;
            highest = emotion;
            return highest
        }
    }
}

function setRelevantEmoji(emotion, emotions) {
    const score = emotions[emotion];
    console.log(score, emotion)
    let settedemoji;
    if (score > 0.9) {
        settedemoji = emoji.emotion.extreme
        return settedemoji
    }
    else if (score > 0.8) {
        settedemoji = emoji.emotion.medium
        return settedemoji
    }
    else if (score > 0.7) {
        settedemoji = emoji.emotion.slightly
        return settedemoji
    }
    settedemoji = emoji.emotion.neutral;
    return settedemoji


}


module.exports = {
    setemoji
}