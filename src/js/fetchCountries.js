export default function fetchCountries(name) {
    const apiUrl = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    return new Promise((resolve, reject) => {
        fetch(apiUrl).then(response => {
            if(response.status === 200){
                resolve(response);
            }else if(response.status === 404){
                reject(response);
            }
        });
    });
}
