const promises = [];

const url = 'http://localhost:3500/register';

function sendHttpPostRequest(url, data) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject(new Error('HTTP error: ' + response.status));
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}
// create 200 users
for (let i = 0; i < 100 + 100; i++) {
    promises.push(
        sendHttpPostRequest(url, {
            username: 'test' + i,
            password: 'test' + i,
            email: 'test' + i + '@test.com'
        })
    );
}

Promise.all(promises)