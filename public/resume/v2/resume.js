export const message = 'Hello from module!';

export function sayHello(name) {
    console.log(`Hello, ${name}!`);
}

const gridWidth = 6;

// 連絡先情報を表示するかどうか
const showContact = false;
let contactMaxRows = 0;
if (showContact) {
    contactMaxRows = 3;
}
const contactClasses = ['resume-contact-address-kana', 'resume-contact-address', 'resume-contact-tel'];

const contentWidth = 29; // 174mm
const titleWidth = 23; // 138mm
const labelWidth = 4; // 24mm
const nameWidth = 17; // 102mm
const monthWidth = 2; // 12mm
const historyMaxCount = 29 - contactMaxRows; // １行 gridWidth mm とした場合丁度いい行数
const licenseMaxCount = 8;
const motivationMaxRows = 10;
const wishMaxRows = 5;
const maxRows = 42; // １ページの最大行数

const layout = {
    // 1ページ目
    // '.resume-title>h1': { left: 0, top: 0, width: titleWidth, height: 2 },
    '.resume-date>div': { left: 0, top: 2, width: titleWidth, height: 1, 'text-align': 'right', 'border': 0 },

    '.resume-name-kana>h2': { left: 0, top: 3, width: labelWidth, height: 1, 'border-top': 'black solid 2px', 'border-left': 'black solid 2px' },
    '.resume-name-kana>div': { left: labelWidth, top: 3, width: nameWidth, height: 1, 'border-left': 'none', 'text-align': 'center', 'border-top': 'black solid 2px' },
    '.resume-name>h2': { left: 0, top: 4, width: labelWidth, height: 2, 'border-left': 'black solid 2px', 'letter-spacing': '6mm' },
    '.resume-name>div': { left: labelWidth, top: 4, width: nameWidth, height: 2, 'border-top': 'black dashed 1px', 'border-left': 'none', 'text-align': 'center', 'padding-top': '2mm', 'font-size': '12pt' },

    '.resume-gender>h2': { left: (labelWidth + nameWidth), top: 3, width: 2, height: 1, 'text-align': 'center', 'border-top': 'black solid 2px', 'border-right': 'black solid 2px' },
    '.resume-gender>div': { left: (labelWidth + nameWidth), top: 4, width: 2, height: 2, 'text-align': 'center', 'padding-top': (gridWidth / 2) + 'mm', 'border-right': 'black solid 2px' },

    '.resume-birthday>h2': { left: 0, top: 6, width: labelWidth, height: 1, 'border-left': 'black solid 2px' },
    '.resume-birthday>div': { left: labelWidth, top: 6, width: (titleWidth - labelWidth), height: 1, 'white-space': 'nowrap', 'border-right': 'black solid 2px' },

    '.resume-address-kana>h2': { left: 0, top: 7, width: labelWidth, height: 1, 'border-left': 'black solid 2px' },
    '.resume-address-kana>div': { left: labelWidth, top: 7, width: (titleWidth - labelWidth), height: 1, 'white-space': 'nowrap', 'border-left': 'none' },
    '.resume-address>h2': { left: 0, top: 8, width: labelWidth, height: 2, 'border-top': 'black dashed 1px', 'border-left': 'black solid 2px', 'letter-spacing': '1.2mm' },
    '.resume-address>div': { left: labelWidth, top: 8, width: (titleWidth - labelWidth), height: 2, 'white-space': 'nowrap', 'border-top': 'black dashed 1px', 'border-left': 'none' },

    '.resume-email>h2': { left: 0, top: 10, width: labelWidth, height: 1, 'border-left': 'black solid 2px', 'border-bottom': 'black solid 2px' },
    '.resume-email>div': { left: labelWidth, top: 10, width: (titleWidth - labelWidth), height: 1, 'white-space': 'nowrap', 'border-bottom': 'black solid 2px' },
    '.resume-tel>h2': { left: titleWidth, top: 7, width: (contentWidth - titleWidth), height: 1, 'text-align': 'center', 'border-top': 'black solid 2px', 'border-right': 'black solid 2px' },
    '.resume-tel>div': { left: titleWidth, top: 8, width: (contentWidth - titleWidth), height: 1, 'border-right': 'black solid 2px' },
    '.resume-mobile>h2': { left: titleWidth, top: 9, width: (contentWidth - titleWidth), height: 1, 'text-align': 'center', 'border-right': 'black solid 2px' },
    '.resume-mobile>div': { left: titleWidth, top: 10, width: (contentWidth - titleWidth), height: 1, 'border-right': 'black solid 2px', 'border-bottom': 'black solid 2px' },

    '.resume-contact-address-kana>h2': { left: 0, top: 11, width: labelWidth, height: 1, 'border-left': 'black solid 2px' },
    '.resume-contact-address-kana>div': { left: labelWidth, top: 11, width: (titleWidth - labelWidth), height: 1, 'border-left': 'none', 'white-space': 'nowrap', 'font-size': '8pt' },
    '.resume-contact-address>h2': { left: 0, top: 12, width: labelWidth, height: 2, 'border-top': 'black dashed 1px', 'border-bottom': 'black solid 2px', 'border-left': 'black solid 2px', 'letter-spacing': '1.2mm' },
    '.resume-contact-address>div': { left: labelWidth, top: 12, width: (titleWidth - labelWidth), height: 2, 'border-top': 'black dashed 1px', 'border-bottom': 'black solid 2px', 'border-left': 'none' },
    '.resume-contact-tel>h2': { left: titleWidth, top: 11, width: (contentWidth - titleWidth), height: 1, 'border-right': 'black solid 2px' },
    '.resume-contact-tel>div': { left: titleWidth, top: 12, width: (contentWidth - titleWidth), height: 2, 'border-bottom': 'black solid 2px', 'border-right': 'black solid 2px' },

    '.resume-history': { top: 12 + contactMaxRows },
    '.resume-year': { left: 0, width: labelWidth, 'text-align': 'center' },
    '.resume-month': { left: labelWidth, width: monthWidth, 'text-align': 'center' },
    '.resume-text': { left: labelWidth + monthWidth, width: contentWidth - labelWidth - monthWidth },

    // 2ページ目
    '.resume-license': { top: 0 },
    '.resume-year': { left: 0, width: labelWidth, 'text-align': 'center' },
    '.resume-month': { left: labelWidth, width: monthWidth, 'text-align': 'center' },
    '.resume-text': { left: labelWidth + monthWidth, width: contentWidth - labelWidth - monthWidth },

    '.resume-motivation>h2': { left: 0, top: 10, width: contentWidth, height: 1, 'border-top': 'black solid 2px', 'border-left': 'black solid 2px', 'border-right': 'black solid 2px' },
    '.resume-motivation>div': { left: 0, top: 11, width: contentWidth, height: motivationMaxRows, 'border-left': 'black solid 2px', 'border-right': 'black solid 2px', 'border-bottom': 'black solid 2px' },

    '.resume-wish>h2': { left: 0, top: 22, width: contentWidth, height: 1, 'border-top': 'black solid 2px', 'border-left': 'black solid 2px', 'border-right': 'black solid 2px' },
    '.resume-wish>div': { left: 0, top: 23, width: contentWidth, height: wishMaxRows, 'border-left': 'black solid 2px', 'border-right': 'black solid 2px', 'border-bottom': 'black solid 2px' },
}

if (showContact) {
    // 連絡先の上の下部ボーダーを 1px にする
    delete layout['.resume-email>h2']['border-bottom'];
    delete layout['.resume-email>div']['border-bottom'];
    delete layout['.resume-mobile>div']['border-bottom'];

    console.log(layout);
}

export async function fetchJSON(url) {
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
}

export function applyLayout(pageContent, data) {
    const sections = pageContent.querySelectorAll('section.panel');
    sections.forEach(section => {
        // カード
        const cards = section.querySelectorAll('.card');
        if (cards && cards.length !== 0) {
            cards.forEach(card => {
                const resumeClass = card.classList.values().filter(value => value.match(/^resume-/));
                if (resumeClass.length !== 0) {
                    const selector = resumeClass.toArray()[0];
                    // ラベル
                    const labelSelector = `.${selector}>h2`;
                    if (labelSelector in layout) {
                        const elem = card.querySelector('h2');
                        if (elem) {
                            elem.classList.add('cell');
                            Object.keys(layout[labelSelector]).forEach(key => {
                                if (key.match(/^(left|top|width||height)$/)) {
                                    elem.style[key] = (layout[labelSelector][key] * gridWidth) + 'mm';
                                } else {
                                    elem.style[key] = layout[labelSelector][key];
                                }
                            })
                        }
                    }
                    // 値
                    const valueSelector = `.${selector}>div`;
                    if (valueSelector in layout) {
                        const elem = card.querySelector('div');
                        if (elem) {
                            elem.classList.add('cell');
                            Object.keys(layout[valueSelector]).forEach(key => {
                                if (key.match(/^(left|top|width||height)$/)) {
                                    elem.style[key] = (layout[valueSelector][key] * gridWidth) + 'mm';
                                } else {
                                    elem.style[key] = layout[valueSelector][key];
                                }
                            })
                        }
                        if (valueSelector in data) {
                            if (Array.isArray(data[valueSelector])) {
                                elem.innerHtml = '';
                                elem.innerText = '';
                                data[valueSelector].forEach(item => {
                                    const lineElem = document.createElement('div');
                                    lineElem.innerText = item;
                                    elem.appendChild(lineElem);
                                })
                            } else {
                                elem.innerText = data[valueSelector];
                            }
                        }
                    }
                }
            })
        }

        // テーブル
        const tables = section.querySelectorAll('.table');
        if (tables && tables.length !== 0) {
            tables.forEach(table => {
                // 縦位置
                const resumeClass = table.classList.values().filter(value => value.match(/^resume-/));
                if (resumeClass.length !== 0) {
                    const selector = resumeClass.toArray()[0];
                    const tableSelector = `.${selector}`;
                    if (tableSelector in layout) {
                        const top = layout[tableSelector].top;
                        const headerSelectors = [];

                        // ヘッダー
                        const headers = table.querySelectorAll('.table-header>div');
                        let numCols = 0;
                        headers.forEach(elem => {
                            // 横位置
                            const resumeClass = elem.classList.values().filter(value => value.match(/^resume-/));
                            if (resumeClass.length !== 0) {
                                const selector = resumeClass.toArray()[0];
                                const headerSelector = `.${selector}`;
                                if (headerSelector in layout) {
                                    elem.classList.add('cell');
                                    elem.style['text-align'] = 'center';
                                    elem.style.top = (top * gridWidth) + 'mm';
                                    elem.style.height = gridWidth + 'mm';
                                    elem.style['border-top'] = 'black solid 2px';

                                    if (headers.length === 1) {
                                        elem.style['border-left'] = 'black solid 2px';
                                        elem.style['border-right'] = 'black solid 2px';
                                    } else if (numCols === 0) {
                                        elem.style['border-left'] = 'black solid 2px';
                                    } else if (numCols === headers.length - 1) {
                                        elem.style['border-right'] = 'black solid 2px';
                                    }
                                    numCols++;

                                    Object.keys(layout[headerSelector]).forEach(key => {
                                        if (key.match(/^(left|width)$/)) {
                                            elem.style[key] = (layout[headerSelector][key] * gridWidth) + 'mm';
                                        } else {
                                            elem.style[key] = layout[headerSelector][key];
                                        }
                                    })
                                    headerSelectors.push(headerSelector);
                                }
                            }
                        })

                        // ボディ
                        if (tableSelector in data) {
                            let numRows = 0;
                            let offset = 1;
                            const header = table.querySelector('.table-header');
                            for (var i = 0; i < data[tableSelector]['max-num-rows']; i++) {
                                let numCols = 0;
                                headerSelectors.forEach((headerSelector) => {
                                    const elem = document.createElement('div');
                                    elem.classList.add('cell');
                                    elem.style.top = ((top + offset) * gridWidth) + 'mm';
                                    elem.style.height = gridWidth + 'mm';

                                    if (numRows === data[tableSelector]['max-num-rows'] - 1) {
                                        elem.style['border-bottom'] = 'black solid 2px';
                                    }

                                    if (headerSelectors.length === 1) {
                                        elem.style['border-left'] = 'black solid 2px';
                                        elem.style['border-right'] = 'black solid 2px';
                                    } else if (numCols === 0) {
                                        elem.style['border-left'] = 'black solid 2px';
                                    } else if (numCols === headerSelectors.length - 1) {
                                        elem.style['border-right'] = 'black solid 2px';
                                    }
                                    numCols++;

                                    Object.keys(layout[headerSelector]).forEach(key => {
                                        if (key.match(/^(left|width)$/)) {
                                            elem.style[key] = (layout[headerSelector][key] * gridWidth) + 'mm';
                                        } else {
                                            elem.style[key] = layout[headerSelector][key];
                                        }
                                    })

                                    if (data[tableSelector]['rows'].length > i) {
                                        // 値
                                        if (headerSelector in data[tableSelector]['rows'][i]) {
                                            elem.innerText = data[tableSelector]['rows'][i][headerSelector];
                                        } else {
                                            elem.innerHTML = '&nbsp;';
                                        }

                                        // 個別スタイル
                                        if ('styles' in data[tableSelector]['rows'][i]) {
                                            Object.keys(data[tableSelector]['rows'][i]['styles']).forEach(key => {
                                                elem.style[key] = data[tableSelector]['rows'][i]['styles'][key];
                                            })
                                        }
                                    }
                                    header.append(elem);
                                })
                                offset++;
                                numRows++;
                            }
                        }
                    }
                }
            })
        }
    })

    if (showContact) {
        contactClasses.forEach((contactClass, index) => {
            const elem = pageContent.querySelector(`.${contactClass}`);
            if (elem) {
                elem.hidden = false;
            }
        })
    }
}