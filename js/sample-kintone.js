
(() => {
    'use strict';

    kintone.events.on('app.record.edit.submit', (event) => {
        const record = event.record;
        // 在庫管理アプリのアプリID
        const zaikoAppId = 123;

        // 在庫管理の在庫を変更する
        const zaikoChange = new kintone.Promise((resolve, reject) => {
            // 商品名が一致する在庫を取得
            kintone.api(kintone.api.url('/k/v1/records', true), 'GET',
                { app: zaikoAppId, query: `商品名 = "${record.商品名.value}"` }, (resp) => {
                    // 在庫から売上数量だけ差し引く
                    const zaiko = resp.records[0].在庫.value - record.売上数量.value;
                    if (zaiko < 0) {
                        resolve('エラー');
                    } else {
                        const body = {
                            'id': resp.records[0].$id.value,
                            'app': zaikoAppId,
                            'record': {
                                '在庫': {
                                    'value': zaiko
                                }
                            }
                        };
                        kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', body, () => {
                            resolve('連携済');
                        });
                    }
                });
        });

        // レコードにコメントを登録する
        const comment = new kintone.Promise((resolve, reject) => {
            const body = {
                'app': kintone.app.getId(),
                'record': kintone.app.record.getId(),
                'comment': {
                    'text': `${record.売上数量.value}個売りました。`
                }
            };
            kintone.api(kintone.api.url('/k/v1/record/comment', true), 'POST', body, () => {
                resolve();
            });
        });

        return kintone.Promise.all([zaikoChange, comment]).then((results) => {
            alert('処理完了！');
            if (results[0] === '連携済') {
                record.在庫連携.value = '連携済';
            } else {
                record.在庫連携.value = 'エラー';
            }
            return event;
        });
    });
})();
