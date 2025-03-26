<div x-ref="control" class="no-print control">
  <div x-show="resumeVisibility" class="float-right text-indigo-500 cursor-pointer"
    x-on:click="resumeVisibility = !resumeVisibility; $refs.control.classList.add('w-full', 'control-wide')">■</div>
  <div x-show="!resumeVisibility" class="float-right text-indigo-500  cursor-pointer"
    x-on:click="resumeVisibility = !resumeVisibility; $refs.control.classList.remove('w-full', 'control-wide')">×</div>
  <span class="tex-gray-700">コントロール</span>
  <div style="font-size: 9pt;margin-bottom: 6mm;">
    <div style="font-size: 9pt;margin-bottom: 6mm;">
      （コントロールは印刷されません）
    </div>
    <hr />
    <div style="font-size: 9pt;margin-bottom: 6mm;">
      <div>
        <x-resume.control.button x-show="resumeVisibility" x-on:click="print()">印刷</x-resume.control.button>
        <x-resume.control.button
          x-on:click.stop="if ($data.isEmpty()) { alert('未入力です。'); } else { $data.downloadJSON() }">保存
          (JSON)</x-resume.control.button>
        <x-resume.control.button level="danger"
          x-on:click.stop="if (confirm('記載した履歴書の情報を削除しますか？')) { $data.clearAll() }">消去</x-resume.control.button>
      </div>
    </div>

    <hr />
    <div style="font-size: 9pt;margin-bottom: 6mm;">
      <div x-data="{ open: false }" x-init="$watch('resumeVisibility', (value) => { open = !resumeVisibility })">
        <div class="flex items-left">
          <h2 class="text-sm font-bold text-gray-700">読込 (JSON)</h2>
          <div x-show="open" class="text-sm text-indigo-500 cursor-pointer" x-on:click="open = !open">▲</div>
          <div x-show="!open" class="text-sm text-indigo-500 cursor-pointer" x-on:click="open = !open">▼</div>
        </div>
        <div x-show="open" x-transition>
          <input type="file" id="jsonUpload" accept="application/json">
        </div>
      </div>
    </div>

    <hr />
    <div style="font-size: 9pt;margin-bottom: 6mm;">
      <div x-data="{ open: false }" x-init="$watch('resumeVisibility', (value) => { open = !resumeVisibility })">
        <div class="flex items-left">
          <h2 class="text-sm font-bold text-gray-700">オプション</h2>
          <div x-show="open" class="text-sm text-indigo-500 cursor-pointer" x-on:click="open = !open">▲</div>
          <div x-show="!open" class="text-sm text-indigo-500 cursor-pointer" x-on:click="open = !open">▼</div>
        </div>
        <div x-show="open" x-transition>
          <x-resume.control.input-radio model="resumeCalender" id="resume-calender" :items="[['name' => '西暦', 'value' => 'en'], ['name' => '和暦', 'value' => 'jp']]"
            value="1">年表記</x-resume.control.input-radio>
          <x-resume.control.input-checkbox model="resumeContact" id="resume-contact"
            name="表示する">連絡先</x-resume.control.input-checkbox>
          <x-resume.control.input-text model="resumeSaveFilename"
            id="resume-save-filename">保存時のファイル名</x-resume.control.input-text>
        </div>
      </div>
    </div>

    <hr />
    <div style="font-size: 9pt;margin-bottom: 6mm;">
      <div x-data="{ open: false }" x-init="$watch('resumeVisibility', (value) => { open = !resumeVisibility })">
        <div class="flex items-left">
          <h2 class="text-sm font-bold text-gray-700">証明写真</h2>
          <div x-show="open" class="text-sm text-indigo-500 cursor-pointer" x-on:click="open = !open">▲</div>
          <div x-show="!open" class="text-sm text-indigo-500 cursor-pointer" x-on:click="open = !open">▼</div>
        </div>
        <div x-show="open" x-transition>
          <input type="file" id="imageUpload" accept="image/*">
        </div>
      </div>
    </div>

    <hr />
    <div style="font-size: 9pt;margin-bottom: 6mm;">
      <div x-data="{ open: false }" x-init="$watch('resumeVisibility', (value) => { open = !resumeVisibility })">
        <div class="flex items-left">
          <h2 class="text-sm font-bold text-gray-700">基本情報</h2>
          <div x-show="open" class="text-sm text-indigo-500 cursor-pointer" x-on:click="open = !open">▲</div>
          <div x-show="!open" class="text-sm text-indigo-500 cursor-pointer" x-on:click="open = !open">▼</div>
        </div>
        <div x-show="open" x-transition>
          <x-resume.control.input-text model="resumeDate" id="resume-date">記入日</x-resume.control.input-text>
          <x-resume.control.input-text model="resumeNameKana" id="resume-name-kana">氏名ふりがな</x-resume.control.input-text>
          <x-resume.control.input-text model="resumeName" id="resume-name">氏名</x-resume.control.input-text>

          <x-resume.control.input-radio model="resumeGender" id="resume-gender" :items="[
              ['name' => '未回答', 'value' => '0'],
              ['name' => '男', 'value' => '1'],
              ['name' => '女', 'value' => '2'],
          ]"
            value="0">性別</x-resume.control.input-radio>
          <x-resume.control.input-text model="resumeBirthday" id="resume-birthday">生年月日</x-resume.control.input-text>
          <x-resume.control.input-text model="resumePostalcode"
            id="resume-postalcode">郵便番号</x-resume.control.input-text>
          <x-resume.control.input-text model="resumeAddressKana"
            id="resume-address-kana">住所ふりがな</x-resume.control.input-text>
          <x-resume.control.input-text model="resumeAddress" id="resume-address">住所</x-resume.control.input-text>
          <x-resume.control.input-text model="resumeEmail" id="resume-email">E-mail</x-resume.control.input-text>
          <x-resume.control.input-text model="resumeTel" id="resume-tel">自宅電話</x-resume.control.input-text>
          <x-resume.control.input-text model="resumeMobile" id="resume-mobile">携帯電話</x-resume.control.input-text>
          <x-resume.control.input-text model="resumeContactPostalcode"
            id="resume-contact-postalcode">連絡先郵便番号</x-resume.control.input-text>
          <x-resume.control.input-text model="resumeContactAddressKana"
            id="resume-contact-address-kana">連絡先住所ふりがな</x-resume.control.input-text>
          <x-resume.control.input-text model="resumeContactAddress"
            id="resume-contact-address">連絡先住所</x-resume.control.input-text>
          <x-resume.control.input-text model="resumeContactTel"
            id="resume-contact-tel">連絡先電話</x-resume.control.input-text>
        </div>
      </div>
    </div>
  </div>

  <hr />
  <div style="font-size: 9pt;margin-bottom: 6mm;">
    <div x-data="{ open: false }" x-init="$watch('resumeVisibility', (value) => { open = !resumeVisibility })">
      <div class="flex items-left">
        <h2 class="text-sm font-bold text-gray-700">学歴・職歴</h2>
        <div x-show="open" class="text-sm text-indigo-500 cursor-pointer" x-on:click="open = !open">▲</div>
        <div x-show="!open" class="text-sm text-indigo-500 cursor-pointer" x-on:click="open = !open">▼</div>
      </div>
      <div x-show="open" x-transition>
        <x-resume.control.input-text-year-month-text model="resumeHistory"
          id="resume-history"></x-resume.control.input-text-year-month-text>
      </div>
    </div>
  </div>

  <hr />
  <div style="font-size: 9pt;margin-bottom: 6mm;">
    <div x-data="{ open: false }" x-init="$watch('resumeVisibility', (value) => { open = !resumeVisibility })">
      <div class="flex items-left">
        <h2 class="text-sm font-bold text-gray-700">免許・資格</h2>
        <div x-show="open" class="text-sm text-indigo-500 cursor-pointer" x-on:click="open = !open">▲</div>
        <div x-show="!open" class="text-sm text-indigo-500 cursor-pointer" x-on:click="open = !open">▼</div>
      </div>
      <div x-show="open" x-transition>
        <x-resume.control.input-text-year-month-text model="resumeLicense"
          id="resume-license"></x-resume.control.input-text-year-month-text>
      </div>
    </div>
  </div>

  <hr />
  <div style="font-size: 9pt;margin-bottom: 6mm;">
    <div x-data="{ open: false }" x-init="$watch('resumeVisibility', (value) => { open = !resumeVisibility })">
      <div class="flex items-left">
        <h2 class="text-sm font-bold text-gray-700">志望動機</h2>
        <div x-show="open" class="text-sm text-indigo-500 cursor-pointer" x-on:click="open = !open">▲</div>
        <div x-show="!open" class="text-sm text-indigo-500 cursor-pointer" x-on:click="open = !open">▼</div>
      </div>
      <div x-show="open" x-transition>
        <x-resume.control.textarea model="resumeMotivation" id="resume-motivation"></x-resume.control.textarea>
      </div>
    </div>
  </div>

  <hr />
  <div style="font-size: 9pt;margin-bottom: 6mm;">
    <div x-data="{ open: false }" x-init="$watch('resumeVisibility', (value) => { open = !resumeVisibility })">
      <div class="flex items-left">
        <h2 class="text-sm font-bold text-gray-700">本人希望記入欄</h2>
        <div x-show="open" class="text-sm text-indigo-500 cursor-pointer" x-on:click="open = !open">▲</div>
        <div x-show="!open" class="text-sm text-indigo-500 cursor-pointer" x-on:click="open = !open">▼</div>
      </div>
      <div x-show="open" x-transition>
        <x-resume.control.textarea model="resumeWish" id="resume-wish"></x-resume.control.textarea>
      </div>
    </div>
  </div>
</div>
