// import fetch from "node-fetch";
// 
// (async () => {
//     "use strict";
// 
//     async function foo() {
//         try {
//             console.log("aaaaaaaaaaaaa");
//             const data = {};
//             const url = `https://a45c7095-7f6a-463f-86e7-80c13b634920.mock.pstmn.io/test/api/get`;
//             const response = await fetch(url, {
//                 method: "GET",
//                 mode: "cors",
//                 cache: "no-cache",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(data),
//             });
//             console.log(response.json());
//             console.log("bbbbbbbbbbbbb");
//         }
//         catch (error) {
//             console.log("errorrorororororor");
//             console.error(error);
//         }
//     }
// 
//     foo();
// })();

const fetch = require("node-fetch").default;

(async () => {
    "use strict";

    try {
        console.log("Sending GET request...");

        const url = `https://a45c7095-7f6a-463f-86e7-80c13b634920.mock.pstmn.io/test/api/get`;
        const response = await fetch(url); // ここに適切なURLを指定

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response data:", data);
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
