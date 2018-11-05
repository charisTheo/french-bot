// French: fr
const KEY = 'trnsl.1.1.20181105T164937Z.ee522e94c8af9c25.2938b6eb1e9eecf9fcd356cb37a55bcb85964cbd';
let URL;

URL = `https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=${KEY}&ui=fr`;


function translateListener() {
    fetch(URL).then(function(response) {
        console.log(response);
    });
};