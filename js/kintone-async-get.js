(() => {
    "use strict";

    //追加保存実行前 app.record.create.submit
    //編集保存実行前 app.record.edit.submit
    //追加保存実行後 app.record.create.submit.success
    //編集保存実行後 app.record.edit.submit.success
    kintone.events.on('app.record.create.submit', async (event) => {
        try {
            console.log("Sending GET request...");
            const url = `https://a45c7095-7f6a-463f-86e7-80c13b634920.mock.pstmn.io/test/api/get`;
            const response = await kintone.proxy(url, "GET", {}, {});

            if (response[1] !== 200) { // レスポンスステータスコードが200以外の場合エラーとみなす
                throw new Error(`HTTP error! Status: ${response[1]}`);
            }

            // レスポンスデータはJSON文字列なので、JSON.parseを使ってパースします
            const data = JSON.parse(response[0]);
            // const data = await response.json();

            console.log("Response data:", data);
            await waitLong(5000)
            return event;
        } catch (error) {
            console.error("ERR: An error occurred:", error);
            // alert("An error occurred:", error);
            await waitLong(5000)
            return event;
        }
    });

    function waitLong(sec) {
        const d1 = new Date();
        while (true) {
            const d2 = new Date();
            if (d2 - d1 > sec) {
                break;
            }
        }
    }
})();