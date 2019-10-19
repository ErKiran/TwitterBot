const emoji = require('../emoji.json');
const sutiable_emoji = {}
function setemoji(sentiment, emotions) {
    if (getHighestScore(emotions)) {
        setRelevantEmoji(getHighestScore(emotions), emotions)
        const getemoji = sutiable_emoji.emo;
        return getemoji
    }
    const getemoji = 'neutral.neutral';
    return getemoji
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
    if (score > 0.9) {
        sutiable_emoji.emo = `${emotion}.extreme`
    }
    else if (score > 0.8) {
        sutiable_emoji.emo = `${emotion}.medium`
    }
    else if (score > 0.7) {
        sutiable_emoji.emo = `${emotion}.slightly`
    }
    sutiable_emoji.emo = `${emotion}.neutral`
}


module.exports = {
    setemoji
}