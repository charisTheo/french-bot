// French: fr
const KEY = 'trnsl.1.1.20181105T164937Z.ee522e94c8af9c25.2938b6eb1e9eecf9fcd356cb37a55bcb85964cbd';


async function translate(word) {
    const URL = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${KEY}&text=${word}&lang=en-fr&format=html`;
    fetch(URL).then(function(response) {
        return Promise.resolve(response);
    }).catch(function(error) {
        return Promise.reject(error);
    });
};