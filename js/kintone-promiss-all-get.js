(() => {
    "use strict";

    //追加保存実行前 app.record.create.submit
    //編集保存実行前 app.record.edit.submit
    //追加保存実行後 app.record.create.submit.success
    //編集保存実行後 app.record.edit.submit.success
    kintone.events.on('app.record.create.submit', async (event) => {
        try {
            console.log("Sending GET request...");
            const urlGet1 = `https://a45c7095-7f6a-463f-86e7-80c13b634920.mock.pstmn.io/test/api/get`;
            const urlGet2 = `https://a45c7095-7f6a-463f-86e7-80c13b634920.mock.pstmn.io/test/api/get`;
            const responseGet1 = kintone.proxy(urlGet1, "GET", {}, {});
            const responseGet2 = kintone.proxy(urlGet2, "GET", {}, {});

            return Promise.all([responseGet1, responseGet2]).then(resps => {
                resps.forEach((resp, idx) => {
                    if (resp[1] !== 200) { // レスポンスステータスコードが200以外の場合エラーとみなす
                        throw new Error(`HTTP error! Status: ${resp[1]}`);
                    }
                    // データにHTTP statusと結果(ok,ng)とJiraステータスを記載
                    const data = JSON.parse(resp[0]);
                    const recordName1 = HTTPステータス + idx
                    const recordName2 = 結果 + idx
                    event.record.recordName1.value = resp[1]
                    event.record.recordName2.value = data
                });
                return event;
            });
        } catch (error) {
            // console.log("LOG: An error occurred:", error);
            console.error("ERR: An error occurred:", error);
            // alert("An error occurred:", error);
            await waitLong(10000)
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

(() => {
    //イベント2つ目
    "use strict";
    // 'event: 一覧と詳細を開いたタイミングでJira状態を取得し、レコード値として同期';
    // 'クローズしたものは取得する必要ない'
    // これを実施するために、recordにはJiraチケットのURLを格納する必要がある
    // app.record.index.show までやると、一覧ごとに取得してJira側に負荷がかかりそうなので詳細だけにする？
    // そうすると、一覧では状態を見せな異様にする必要がある

    kintone.events.on(['app.record.index.show', 'app.record.detail.show'], (event) => {
        console.log("aaa");
        return event;
    });
})();
