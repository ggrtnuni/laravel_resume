/**
 * 履歴書 V3
 * 
 * @author ggrtn
 */

import { Alpine } from "alpinejs";

// ======================================================================
// 非公開 API
// ======================================================================

/**
 * 今年の誕生日を計算する
 * @param {*} birthDate 
 * @param {*} now 
 * @returns 
 */
function getThisYearBirthday(birthDate, now = null) {
    if (now === null) {
        now = new Date();
    }
    const month = birthDate.getMonth();
    const day = birthDate.getDate();
    const currentYear = now.getFullYear();

    return new Date(currentYear, month, day);
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

// ======================================================================
// 公開 API
// ======================================================================

const resume = {
    version: 3,
    // モデル
    models: {
        // --------------------------------------------------------------
        // Alpine 管理の DOM 要素から呼ばれる変数や API
        // --------------------------------------------------------------
        resume: () => ({
            // 履歴書の項目
            'resumeDate': Alpine.$persist('').using(sessionStorage),
            resumeDateText() {
                let result = '';
                if (validator.date(this.resumeDate)) {
                    const date = new Date(this.resumeDate);
                    result = this.getYearWithCalenderType(this.resumeCalender, date.getFullYear());
                    result += ' 年';
                    result += ' ' + (date.getMonth() + 1) + ' 月';
                    result += ' ' + date.getDate() + ' 日 現在';

                }
                return result;
            },
            'resumeNameKana': Alpine.$persist('').using(sessionStorage),
            'resumeName': Alpine.$persist('').using(sessionStorage),
            'resumeGender': Alpine.$persist('0').using(sessionStorage),
            resumeGenderText() {
                return this.resumeGender === '1' ? '男' : (this.resumeGender === '2' ? '女' : '-');
            },
            'resumeBirthday': Alpine.$persist('').using(sessionStorage),
            resumeBirthdayText() {
                let result = '';
                if (validator.date(this.resumeBirthday)) {
                    const now = validator.date(this.resumeDate) ? new Date(this.resumeDate) : new Date();
                    const date = new Date(this.resumeBirthday);
                    const thisYearBirthday = getThisYearBirthday(date, now);
                    const age = now.getFullYear() - date.getFullYear() - 1 + (now.getTime() >= thisYearBirthday.getTime() ? 1 : 0);
                    result = this.getYearWithCalenderType(this.resumeCalender, date.getFullYear()) + ' 年';
                    result += ' ' + (date.getMonth() + 1) + ' 月';
                    result += ' ' + date.getDate() + ' 日';
                    result += ' ( 満 ' + age + ' 歳 )';
                }
                return result;
            },
            'resumePostalcode': Alpine.$persist('').using(sessionStorage),
            'resumeAddressKana': Alpine.$persist('').using(sessionStorage),
            'resumeAddress': Alpine.$persist('').using(sessionStorage),
            resumeAddressText() {
                let result = '';
                if (validator.postalcode(this.resumePostalcode)) {
                    result = '〒 ' + this.resumePostalcode;
                }
                if (validator.string(this.resumeAddress)) {
                    if (result.length > 0) {
                        result += "\n";
                    }
                    result += this.resumeAddress;
                }
                return result;
            },
            'resumeEmail': Alpine.$persist('').using(sessionStorage),
            'resumeTel': Alpine.$persist('').using(sessionStorage),
            'resumeMobile': Alpine.$persist('').using(sessionStorage),
            'resumeContactPostalcode': Alpine.$persist('').using(sessionStorage),
            'resumeContactAddressKana': Alpine.$persist('').using(sessionStorage),
            'resumeContactAddress': Alpine.$persist('').using(sessionStorage),
            resumeContactAddressText() {
                let result = '';
                if (validator.postalcode(this.resumeContactPostalcode)) {
                    result = '〒 ' + this.resumeContactPostalcode;
                }
                if (validator.string(this.resumeContactAddress)) {
                    if (result.length > 0) {
                        result += "\n";
                    }
                    result += this.resumeContactAddress;
                }
                return result;
            },
            'resumeContactTel': Alpine.$persist('').using(sessionStorage),
            'resumeHistory': Alpine.$persist({ rows: [] }).using(sessionStorage),
            'resumeLicense': Alpine.$persist({ rows: [] }).using(sessionStorage),
            'resumeMotivation': Alpine.$persist('').using(sessionStorage),
            'resumeWish': Alpine.$persist('').using(sessionStorage),
            // コントロール
            'resumeCalender': Alpine.$persist('en').using(sessionStorage),
            'resumeContact': Alpine.$persist(false).using(sessionStorage),
            'resumeVisibility': Alpine.$persist(true).using(sessionStorage),
            'resumeSaveFilename': Alpine.$persist('').using(sessionStorage),
            // ユーティリティ

            /**
             * 西暦・和暦変換
             * @param {*} type 
             * @param {*} year 
             * @returns 
             */
            getYearWithCalenderType(type, year) {
                // TODO 最初の入力は数字で、追加で書いたら文字列になってしまっている
                if (year) {
                    if (type === 'jp') {
                        if (year <= 1988) {
                            year = `昭和 ${year - 1988 + 63}`;
                        } else if (year <= 2018) {
                            year = `平成 ${year - 2018 + 30}`;
                        } else {
                            year = `令和 ${year - 2018}`
                        }
                    }
                }
                return year;
            },

            /**
             * 空かどうか
             */
            isEmpty() {
                return this.resumeDate.length === 0
                    && this.resumeNameKana.length === 0
                    && this.resumeName.length === 0
                    && this.resumeGender == '0'
                    && this.resumeBirthday.length === 0
                    && this.resumePostalcode.length === 0
                    && this.resumeAddressKana.length === 0
                    && this.resumeAddress.length === 0
                    && this.resumeEmail.length === 0
                    && this.resumeTel.length === 0
                    && this.resumeMobile.length === 0
                    && this.resumeContactPostalcode.length === 0
                    && this.resumeContactAddressKana.length === 0
                    && this.resumeContactAddress.length === 0
                    && this.resumeContactTel.length === 0
                    && this.resumeHistory.rows.length === 0
                    && this.resumeLicense.rows.length === 0
                    && this.resumeMotivation.length === 0
                    && this.resumeWish.length === 0;
            },

            /**
             * 履歴書の情報をクリアする
             */
            clearAll() {
                const now = new Date();
                this.resumeDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
                this.resumeNameKana = '';
                this.resumeName = '';
                this.resumeGender = '0';
                this.resumeBirthday = '';
                this.resumePostalcode = '';
                this.resumeAddressKana = '';
                this.resumeAddress = '';
                this.resumeEmail = '';
                this.resumeTel = '';
                this.resumeMobile = '';
                this.resumeContactPostalcode = '';
                this.resumeContactAddressKana = '';
                this.resumeContactAddress = '';
                this.resumeContactTel = '';
                while (this.resumeHistory.rows.pop());
                while (this.resumeLicense.rows.pop());
                this.resumeMotivation = '';
                this.resumeWish = '';

                const imagePreview = document.querySelector('.resume-photo-img');
                imagePreview.innerHTML = '';

                sessionStorage.removeItem('_x_resumeIdPhoto');
            },

            /**
             * 証明写真を data URI スキームで取得
             */
            getIdPhotoByDataUriScheme() {
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
                return resumeIdPhoto;
            },

            /**
             * JSON 文字列化
             * @param {*} jsonData 
             */
            getJSONString() {
                const data = {
                    'resumeDate': this.resumeDate,
                    'resumeNameKana': this.resumeNameKana,
                    'resumeName': this.resumeName,
                    'resumeGender': this.resumeGender,
                    'resumeBirthday': this.resumeBirthday,
                    'resumePostalcode': this.resumePostalcode,
                    'resumeAddressKana': this.resumeAddressKana,
                    'resumeAddress': this.resumeAddress,
                    'resumeEmail': this.resumeEmail,
                    'resumeTel': this.resumeTel,
                    'resumeMobile': this.resumeMobile,
                    'resumeContactPostalcode': this.resumeContactPostalcode,
                    'resumeContactAddressKana': this.resumeContactAddressKana,
                    'resumeContactAddress': this.resumeContactAddress,
                    'resumeContactTel': this.resumeContactTel,
                    'resumeHistory': this.resumeHistory,
                    'resumeLicense': this.resumeLicense,
                    'resumeMotivation': this.resumeMotivation,
                    'resumeWish': this.resumeWish,
                    // オプション
                    'resumeCalender': this.resumeCalender,
                    'resumeContact': this.resumeContact,
                    'resumeSaveFilename': this.resumeSaveFilename,
                    // 証明写真
                    'resumeIdPhoto': this.getIdPhotoByDataUriScheme(),
                }

                return JSON.stringify(data, null, 2); // JSON 文字列に変換 (整形オプション付き)
            },

            /**
             * 履歴書の情報を JSON としてダウンロードする
             */
            downloadJSON() {
                const now = new Date();
                const saveFilename = this.resumeSaveFilename.length > 0 ? this.resumeSaveFilename : 'resume-v3';
                const filename = String(now.getFullYear()) + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0')
                    + '-' + String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0') + String(now.getSeconds()).padStart(2, '0')
                    + '-' + saveFilename + '.json';

                const json = this.getJSONString();
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
        })
    },

    // -----------------------------------------------------------------
    // Alpine 管理外から呼ばれる API
    // -----------------------------------------------------------------

    /**
     * 履歴書データを json からロードする
     * @param {*} jsonData 
     */
    loadResumeFromJson(jsonData) {
        // 最初に現在の内容を削除
        const element = document.querySelector('[x-data]');
        Alpine.$data(element).clearAll();

        // コントロール DOM への参照を取得
        const control = document.querySelector('.control');

        // テキスト値の更新
        let inputs;
        inputs = control.querySelectorAll('input[x-model^="resume"][type="text"], textarea[x-model^="resume"]');
        inputs.forEach((input) => {
            const key = input.getAttribute('x-model');
            if (key in jsonData) {
                input.value = jsonData[key];
                input.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });

        // ラジオボタンの更新
        inputs = control.querySelectorAll('input[name^="resume"][type="radio"]');
        inputs.forEach((input) => {
            const key = input.getAttribute('x-model');
            if (key in jsonData) {
                if (input.value === jsonData[key]) {
                    input.checked = true;
                }
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });

        // チェックボックスの更新
        inputs = control.querySelectorAll('input[x-model^="resume"][type="checkbox"]');
        inputs.forEach((input) => {
            const key = input.getAttribute('x-model');
            if (key in jsonData) {
                input.checked = jsonData[key];
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });

        // 配列の値の更新
        jsonData.resumeHistory.rows.forEach((value, index) => {
            const item = {
                'resume-year': value['resume-year'] || '',
                'resume-month': value['resume-month'] || '',
                'resume-text': value['resume-text'] || '',
            }
            if ('right' in value) {
                item.right = value['right'];
            }
            Alpine.$data(element).resumeHistory.rows.push(item);
        });
        jsonData.resumeLicense.rows.forEach((value, index) => {
            const item = {
                'resume-year': value['resume-year'] || '',
                'resume-month': value['resume-month'] || '',
                'resume-text': value['resume-text'] || '',
            }
            if ('right' in value) {
                item.right = value['right'];
            }
            Alpine.$data(element).resumeLicense.rows.push(item);
        });

        // 証明写真の更新
        if (jsonData.resumeIdPhoto) {
            const imagePreview = document.querySelector('.resume-photo-img');
            imagePreview.innerHTML = '';
            const photoImage = document.createElement('img');
            photoImage.src = jsonData.resumeIdPhoto;
            imagePreview.append(photoImage);


        }
    },

    /**
     * 履歴書データを URL 指定でロードする
     * 基本的にテスト用、実用するには CORS 設定が必要
     * @param {*} url 
     */
    loadResumeFromUrl(url) {
        // Alpine.start() が呼ばれたあとか、alpine:init イベントのハンドラ内でなら
        // axios が使えるようになっている。
        window.axios.get(url)
            .then((response) => {
                if (response.status === 200) {
                    this.loadResumeFromJson(response.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    },

    // テーブル操作
    addRow(array) {
        array.push({ 'resume-year': '', 'resume-month': '', 'resume-text': '', 'right': false });
    },
    swapRow(array, index1, index2) {
        if (index1 >= 0 && index1 < array.length && index2 >= 0 && index2 < array.length) {
            let temp = array.splice(index1, 1, array[index2]);
            array.splice(index2, 1, temp[0]);
        }
    },
    deleteRow(array, index) {
        if (confirm('削除しますか？')) {
            array.splice(index, 1);
        }
    },
    deleteAllRow(array) {
        if (confirm('削除しますか？')) {
            while (array.pop());
        }
    },

    /**
     * 指定した URL の画像を Data URI スキームとして取得
     * 基本的にテスト用、実用するには CORS 設定が必要
     * @param {*} imageUrl 
     * @param {*} mimeType 
     * @returns 
     */
    async fetchImageAsDataUri(imageUrl, mimeType = 'image/png') {
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error('画像の取得または変換に失敗しました:', error);
            return null;
        }

        // sample
        // 他のサイトからの取得する場合は CORS の設定が必要
        // const imageUrl = '/sample/images/20250313-id-photo.jpg';
        // window.resumeV3.fetchImageAsDataUri(imageUrl, 'image/jpeg')
        //     .then(dataUri => {
        //         if (dataUri) {
        //             const container = document.querySelector('.resume-photo-img');
        //             container.innerHTML = '';
        //             const photoImage = document.createElement('img');
        //             photoImage.src = dataUri;
        //             container.append(photoImage);

        //             // console.log(dataUri);
        //             // dataUri を<img>要素のsrc属性などに設定して表示できます
        //             // document.getElementById('remotePreview').src = dataUri;
        //         }
        //     });
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
                        self.loadResumeFromJson(jsonData);

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

    /**
     * セッションにデータがある場合は自動ロード
     * 値は alpine/persist が管理するので証明写真だけ
     */
    autoLoadFromSession() {
        // 最初に現在の内容を削除

        const resumeIdPhoto = sessionStorage.getItem('_x_resumeIdPhoto');
        if (resumeIdPhoto) {
            const imagePreview = document.querySelector('.resume-photo-img');
            imagePreview.innerHTML = '';

            const photoImage = document.createElement('img');
            photoImage.src = resumeIdPhoto;
            imagePreview.append(photoImage);
        }
    },

    /**
     * ページから抜けたり、リロードされたときにセッションに保存
     * 値は alpine/persist が管理するので証明写真だけ
     */
    autoSaveToSession() {
        window.addEventListener('beforeunload', (ev) => {
            const element = document.querySelector('[x-data]');
            const resumeIdPhoto = Alpine.$data(element).getIdPhotoByDataUriScheme();
            if (resumeIdPhoto) {
                sessionStorage.setItem('_x_resumeIdPhoto', resumeIdPhoto);
            }
        })
    }
}

export default resume;
