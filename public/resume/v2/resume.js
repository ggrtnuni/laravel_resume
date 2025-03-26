/**
 * 履歴書 V2
 * 
 * @author ggrtn
 */

// ======================================================================
// 非公開 API
// ======================================================================

/**
 * ケバブケースからキャメルケースに変換
 * @param {} str 
 * @returns 
 */
const kebabToCamel = (str) => {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

// バリデータ
const validator = {
    /**
     * YYYY-MM-DD かどうかチェック
     * @param {*} date 
     * @returns 
     */
    date(date) {
        return date && date.length > 0 && date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
    },
    /**
     * NNN-NNNN かどうかチェック
     * @param {*} code 
     * @returns 
     */
    postalcode(code) {
        return code && code.length > 0 && code.match(/^[0-9]{3}-[0-9]{4}$/);
    },
    /**
     * 有効な文字列かどうかチェック
     * @param {} text 
     * @returns 
     */
    string(text) {
        return text && text.length > 0;
    }
}

/**
 * 今年の誕生日を計算する
 * @param {*} birthDate 
 * @param {*} now 
 * @returns 
 */
const getThisYearBirthday = (birthDate, now = null) => {
    if (now === null) {
        now = new Date();
    }
    const month = birthDate.getMonth();
    const day = birthDate.getDate();
    const currentYear = now.getFullYear();

    return new Date(currentYear, month, day);
}

/**
 * 生年月日のテキストを生成
 * @param {} resumeDate 
 * @param {*} resumeBirthday 
 * @returns 
 */
const resumeBirthdayText = (resumeDate, resumeBirthday) => {
    let result = '';
    if (validator.date(resumeBirthday)) {
        const now = validator.date(resumeDate) ? new Date(resumeDate) : new Date();
        const date = new Date(resumeBirthday);
        const thisYearBirthday = getThisYearBirthday(date, now);
        const age = now.getFullYear() - date.getFullYear() - 1 + (now.getTime() >= thisYearBirthday.getTime() ? 1 : 0);
        result = String(date.getFullYear()) + ' 年';
        result += ' ' + String(date.getMonth() + 1) + ' 月';
        result += ' ' + String(date.getDate()) + ' 日';
        result += ' ( 満 ' + age + ' 歳 )';
    }
    return result;
}


// ======================================================================
// 公開 API
// ======================================================================

/**
 * 指定した URL の json データを取得
 * @param {*} url 
 * @returns 
 */
export default {
    async fetchJSON(url) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('JSONファイルの取得に失敗しました:', error);
            return null; // またはエラーハンドリングに応じた値を返す
        }
    },

    /**
     * 履歴書の情報を JSON としてダウンロードする
     * @param {*} json 文字列化したもの
     * @param {*} saveFilename 
     */
    downloadJSON(saveFilename = 'resume-v2') {
        const now = new Date();
        const filename = String(now.getFullYear()) + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0')
            + '-' + String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0') + String(now.getSeconds()).padStart(2, '0')
            + '-' + saveFilename + '.json';

        const keys = [
            'resume-date',
            'resume-name-kana',
            'resume-name',
            // 'resume-gender',
            'resume-birthday',
            'resume-postalcode',
            'resume-address-kana',
            'resume-address',
            'resume-email',
            'resume-tel',
            'resume-mobile',
            'resume-contact-postalcode',
            'resume-contact-address-kana',
            'resume-contact-address',
            'resume-contact-tel',
            'resume-motivation',
            'resume-wish',
        ];
        const data = {};

        // text
        keys.forEach((key) => {
            const selector = `.control input#${key}[type="text"], .control textarea#${key}`;
            const input = document.querySelector(selector);
            if (input) {
                data[kebabToCamel(key)] = input.value;
            }
        });

        // radio
        data[kebabToCamel('resume-gender')] = document.querySelector('.control input[name="resume-gender"][type="radio"]:checked').value;

        // table
        ['resume-history', 'resume-license'].forEach((key) => {
            const dataKey = kebabToCamel(key);
            data[dataKey] = { rows: [] };

            document.querySelectorAll(`.control div#${key}>.rows>.row`).forEach((row) => {
                data[dataKey].rows.push({
                    'resume-year': row.querySelector('input[name="resume-year"]').value,
                    'resume-month': row.querySelector('input[name="resume-month"]').value,
                    'resume-text': row.querySelector('input[name="resume-text"]').value,
                    'right': row.querySelector('button[role="textAlignRight"]').dataset.right == 'true',
                });
            });
        });

        // 証明写真
        let resumeIdPhoto = null;
        const imgElement = document.querySelector('.resume-photo-img>img');
        if (imgElement) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (imgElement.complete) {
                const mimeType = 'image/png';
                // canvas のサイズを画像のサイズに設定
                canvas.width = imgElement.naturalWidth;
                canvas.height = imgElement.naturalHeight;

                // canvas に画像を描画
                ctx.drawImage(imgElement, 0, 0);

                // Data URI スキームを取得
                resumeIdPhoto = canvas.toDataURL(mimeType);
            }
        }
        data[kebabToCamel('resume-id-photo')] = resumeIdPhoto;

        const json = JSON.stringify(data, null, 2); // JSON 文字列に変換 (整形オプション付き)
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // メモリリークを防ぐ
    },

    /**
     * 読み込んだデータを反映する (フォーム経由)
     * @param {} data 
     */
    applyData(data) {
        // 反映先一覧 (テーブル以外)
        const elems = {
            'resume-date': document.querySelector('.resume .resume-date'),
            'resume-name-kana': document.querySelector('.resume .resume-name-kana>div'),
            'resume-name': document.querySelector('.resume .resume-name>div'),
            'resume-gender': document.querySelector('.resume .resume-gender>div'),
            'resume-birthday': document.querySelector('.resume .resume-birthday>div'),
            'resume-address-kana': document.querySelector('.resume .resume-address-kana>div'),
            'resume-address': document.querySelector('.resume .resume-address>div'),
            'resume-email': document.querySelector('.resume .resume-email>div'),
            'resume-tel': document.querySelector('.resume .resume-tel>div'),
            'resume-mobile': document.querySelector('.resume .resume-mobile>div'),
            'resume-contact-address-kana': document.querySelector('.resume .resume-contact-address-kana>div'),
            'resume-contact-address': document.querySelector('.resume .resume-contact-address>div'),
            'resume-contact-tel': document.querySelector('.resume .resume-contact-tel>div'),
            'resume-motivation': document.querySelector('.resume .resume-motivation>div'),
            'resume-wish': document.querySelector('.resume .resume-wish>div'),
        };

        // イベントリスナー登録
        Object.keys(elems).forEach((key) => {
            if (key === 'resume-gender') {
                // radio
                const selector = `.control input[name="${key}"][type="radio"]`;
                const forms = document.querySelectorAll(selector)
                const handler = (ev) => {
                    if (ev.target.checked) {
                        elems[key].innerText = ev.target.value == '1' ? '男' : (ev.target.value == '2' ? '女' : '');
                    }
                }
                forms.forEach((form) => {
                    form.removeEventListener('change', handler);
                    form.addEventListener('change', handler);
                });
            } else {
                // input, textarea
                const selector = `.control input#${key}[type="text"], .control textarea#${key}`;
                const form = document.querySelector(selector);
                if (form) {
                    let handler;
                    if (key === 'resume-date') {
                        // 記入日
                        handler = (ev) => {
                            let text = '';
                            if (ev.target.value.length > 0) {
                                let date = new Date(ev.target.value);
                                if (!Number.isNaN(date.getTime())) {
                                    text = String(date.getFullYear()) + ' 年'
                                        + ' ' + String(date.getMonth() + 1) + ' 月'
                                        + ' ' + String(date.getDate()) + ' 日'
                                        + ' 現在';
                                }
                            }
                            elems[key].innerText = text;
                        }
                    } else if (key === 'resume-address') {
                        // 現住所
                        const formPostalCode = document.querySelector('.control input#resume-postalcode');
                        const formAddress = document.querySelector('.control input#resume-address');
                        handler = (ev) => {
                            let text = '';
                            const postalCode = formPostalCode.value;
                            if (postalCode && postalCode.length > 0) {
                                text = `〒 ${postalCode}\n`;
                            }
                            text += formAddress.value;
                            elems[key].innerText = text;
                        }
                        formPostalCode.removeEventListener('input', handler);
                        formPostalCode.addEventListener('input', handler);
                    } else if (key === 'resume-contact-address') {
                        // 連絡先
                        const formPostalCode = document.querySelector('.control input#resume-contact-postalcode');
                        const formAddress = document.querySelector('.control input#resume-contact-address');
                        handler = (ev) => {
                            let text = '';
                            const postalCode = formPostalCode.value;
                            if (postalCode && postalCode.length > 0) {
                                text = `〒 ${postalCode}\n`;
                            }
                            text += formAddress.value;
                            elems[key].innerText = text;
                        }
                        formPostalCode.removeEventListener('input', handler);
                        formPostalCode.addEventListener('input', handler);
                    } else if (key === 'resume-birthday') {
                        // 生年月日
                        const formDate = document.querySelector('.control input#resume-date');
                        handler = (ev) => {
                            elems[key].innerText = resumeBirthdayText(FormData.value, ev.target.value);
                        }
                    } else {
                        handler = (ev) => {
                            elems[key].innerText = ev.target.value;
                        }
                    }
                    form.removeEventListener('input', handler);
                    form.addEventListener('input', handler);
                }
            }
        });

        // 反映
        Object.keys(elems).forEach((key) => {
            if (key === 'resume-gender') {
                // radio
                const selector = `.control input[name^=${key}][type="radio"]`;
                const inputs = document.querySelectorAll(selector);
                inputs.forEach((input) => {
                    const dataKey = kebabToCamel(key);
                    if (dataKey in data) {
                        input.checked = input.value == data[dataKey];
                    }
                    input.dispatchEvent(new Event('change', { bubbles: true }))
                });
            } else {
                const selector = `.control input#${key}[type="text"], .control textarea#${key}`;
                const input = document.querySelector(selector);
                const dataKey = kebabToCamel(key);
                if (dataKey in data) {
                    if (key === 'resume-address') {
                        // 郵便番号もセットする
                        if ('resumePostalcode' in data) {
                            document.querySelector('.control input#resume-postalcode').value = data['resumePostalcode'];
                        }
                    } else if (key === 'resume-contact-address') {
                        // 連絡先郵便番号もセットする
                        if ('resumeContactPostalcode' in data) {
                            document.querySelector('.control input#resume-contact-postalcode').value = data['resumeContactPostalcode'];
                        }
                    }
                    input.value = data[dataKey];
                    input.dispatchEvent(new Event('input', { bubbles: true }))
                }
            }
        });

        // テーブル
        ['resume-history', 'resume-license'].forEach((key) => {
            // 読込
            const dataKey = kebabToCamel(key);
            if (dataKey in data) {
                const table = document.querySelector(`.control div#${key}`);

                // 格納先の準備
                const rows = table.querySelector('.rows');
                rows.innerHTML = '';

                // テンプレートの準備
                const template = table.querySelector('template');

                data[dataKey].rows.forEach((rowData) => {
                    const row = template.content.cloneNode(true);
                    row.querySelector('input[name="resume-year"]').value = rowData['resume-year'];
                    row.querySelector('input[name="resume-month"]').value = rowData['resume-month'];
                    row.querySelector('input[name="resume-text"]').value = rowData['resume-text'];
                    row.querySelector('button[role="textAlignRight"]').dataset.right = rowData['right'] ? 'true' : 'false';
                    rows.appendChild(row);
                });
            }

            // 反映
            this.applyTableData(key);
        });

        // 証明写真
        if (data.resumeIdPhoto && data.resumeIdPhoto.length > 0) {
            const imagePreview = document.querySelector('.resume .resume-photo-img');
            imagePreview.innerHTML = '';
            const photoImage = document.createElement('img');
            photoImage.src = data.resumeIdPhoto;
            imagePreview.append(photoImage);
        }
    },

    /**
     * テーブルデータの更新
     * @param {} resumeClass 
     */
    applyTableData(resumeClass) {
        // 現在の内容を空にする
        document.querySelectorAll(`.resume .${resumeClass}>.table-body>.row`).forEach((targetRow) => {
            targetRow.querySelector('.resume-year').innerText = '';
            targetRow.querySelector('.resume-month').innerText = '';
            targetRow.querySelector('.resume-text').innerText = '';
            targetRow.querySelector('.resume-text').style['text-align'] = 'left';
        });

        // 反映
        let targetRow = document.querySelector(`.resume .${resumeClass}>.table-body>.row`);
        document.querySelectorAll(`.control div#${resumeClass}>.rows>.row`).forEach((row) => {
            if (targetRow) {
                const resumeYear = row.querySelector('input[name="resume-year"]').value;
                targetRow.querySelector('.resume-year').innerText = resumeYear.length > 0 ? resumeYear + ' 年' : '';
                targetRow.querySelector('.resume-month').innerText = row.querySelector('input[name="resume-month"]').value;
                targetRow.querySelector('.resume-text').innerText = row.querySelector('input[name="resume-text"]').value;
                targetRow.querySelector('.resume-text').style['text-align'] = row.querySelector('button[role="textAlignRight"]').dataset.right == 'true' ? 'right' : 'inherit';

                targetRow = targetRow.nextElementSibling;
            }
        });
    },

    clearAll() {
        const keys = [
            'resume-date',
            'resume-name-kana',
            'resume-name',
            // 'resume-gender',
            'resume-birthday',
            'resume-postalcode',
            'resume-address-kana',
            'resume-address',
            'resume-email',
            'resume-tel',
            'resume-mobile',
            'resume-contact-postalcode',
            'resume-contact-address-kana',
            'resume-contact-address',
            'resume-contact-tel',
            'resume-motivation',
            'resume-wish',
        ];

        // text
        keys.forEach((key) => {
            const selector = `.control input#${key}[type="text"], .control textarea#${key}`;
            const input = document.querySelector(selector);
            if (input) {
                input.value = '';
                input.dispatchEvent(new Event('input', { bubbles: true }))
            }
        });

        // radio
        document.querySelectorAll('.control input[name="resume-gender"][type="radio"]').forEach((input) => {
            if (input.value == '0') {
                input.checked = true;
            } else {
                input.checked = false;
            }
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });

        // table
        ['resume-history', 'resume-license'].forEach((key) => {
            document.querySelector(`.control div#${key}>.rows`).innerHTML = '';
            this.applyTableData(key);
        });

        // 証明写真
        const imagePreview = document.querySelector('.resume .resume-photo-img');
        imagePreview.innerHTML = '';
    },

    /**
     * アップロードされた画像を Data URI スキームとして取得する準備
     */
    prepareForUploadIdPhotoImage() {
        const imageUpload = document.getElementById('imageUpload');
        const imagePreview = document.querySelector('.resume-photo-img');

        imageUpload.addEventListener('change', function (event) {
            const file = event.target.files[0]; // 選択された最初のファイルを取得
            if (file) {
                // ファイルが存在する場合、FileReader を使って Data URI を読み込む
                const reader = new FileReader();

                reader.onload = function (e) {
                    // 読み込みが完了したら、e.target.result に Data URI が格納される
                    const dataUri = e.target.result;

                    // console.log("Data URI:", dataUri);

                    // アスペクト比を 3:4 としてトリミング
                    const img = new Image();
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    img.style.display = 'none';
                    canvas.style.display = 'none';
                    document.body.appendChild(img);
                    document.body.appendChild(canvas);

                    img.onload = function () {
                        const mimeType = 'image/png';
                        // canvas.width = img.naturalWidth;
                        // canvas.height = img.naturalHeight;

                        let offsetWidth = 0;
                        let offsetHeight = 0;
                        let cropedWidth = img.naturalWidth;
                        let cropedHeight = img.naturalHeight;
                        if (img.naturalWidth / img.naturalHeight >= (3 / 4)) {
                            // 3/4よりも横長 or 長方形
                            cropedWidth = Math.ceil(img.naturalHeight * (3 / 4));
                            offsetWidth = Math.ceil((img.naturalWidth - cropedWidth) / 2);
                        } else {
                            // 3/4よりも縦長
                            cropedHeight = Math.ceil(img.naturalWidth * (4 / 3));
                            offsetHeight = Math.ceil((img.naturalHeight - cropedHeight) / 2);
                        }

                        // console.log([offsetWidth, offsetHeight, cropedWidth, cropedHeight]);

                        // 354 x 472 で保存する (dataUri が長くなりすぎないように)
                        canvas.width = 354;
                        canvas.height = 472;
                        ctx.drawImage(img, offsetWidth, offsetHeight, cropedWidth, cropedHeight, 0, 0, 354, 472);
                        const dataUri = canvas.toDataURL(mimeType);

                        imagePreview.innerHTML = '';
                        const photoImage = document.createElement('img');
                        photoImage.src = dataUri;
                        imagePreview.append(photoImage);

                        // 不要になった要素を削除
                        document.body.removeChild(img);
                        document.body.removeChild(canvas);
                    }

                    img.src = dataUri;
                }

                reader.onerror = function (error) {
                    console.error("Error reading file:", error);
                }

                // ファイルを Data URI スキームとして読み込む
                reader.readAsDataURL(file);
            } else {
                // ファイルが選択されなかった場合の処理
                imagePreview.innerHTML = '';
            }
        });
    },

    /**
     * アップロードされた JSON を読み込む準備
     */
    prepareForUploadJson() {
        const self = this;
        const jsonUpload = document.getElementById('jsonUpload');

        jsonUpload.addEventListener('change', function (event) {
            const file = event.target.files[0]; // 選択された最初のファイルを取得

            if (file) {
                // ファイルが存在する場合、FileReader を使ってテキストとして読み込む
                const reader = new FileReader();

                reader.onload = function (e) {
                    try {
                        // 読み込んだテキストを JSON としてパースする
                        const jsonData = JSON.parse(e.target.result);
                        // console.log("展開された JSON データ:", Object.keys(jsonData));
                        self.applyData(jsonData);

                    } catch (error) {
                        console.error("JSON ファイルのパースに失敗しました:", error);
                        // outputDiv.textContent = "有効な JSON ファイルを選択してください。";
                    }
                }

                reader.onerror = function (error) {
                    console.error("ファイルの読み込みに失敗しました:", error);
                    // outputDiv.textContent = "ファイルの読み込みに失敗しました。";
                }

                // ファイルをテキストとして読み込む
                reader.readAsText(file);
            } else {
                // outputDiv.textContent = "ファイルが選択されていません。";
            }
        });
    },
}