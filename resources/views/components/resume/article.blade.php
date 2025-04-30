<article x-show="resumeVisibility" class="resume container">
  <div class="page">
    <div class="page-content relative">
      <div class="resume-photo-img"></div>

      <section class="panel resume-info-meta">
        <h1 class="resume-title">履歴書</h1>
        <div x-text="resumeDateText" class="resume-date">- 年 - 月 - 日 現在</div>
      </section>

      <section class="panel resume-info-general">
        <x-resume.article.card model="resumeNameKana" class="resume-name-kana" label="ふりがな" value="-" />
        <x-resume.article.card model="resumeName" class="resume-name" label="氏名" value="-" />
        <x-resume.article.card model="resumeGenderText" class="resume-gender" label="性別" value="-" />
        <x-resume.article.card model="resumeBirthdayText" class="resume-birthday" label="生年月日" value="-" />
        <x-resume.article.card model="resumeAddressKana" class="resume-address-kana" label="ふりがな" value="-" />
        <x-resume.article.card model="resumeAddressText" class="resume-address" label="現住所" value="-"
          :preLike="true" />
        <x-resume.article.card model="resumeEmail" class="resume-email" label="E-mail" value="-" />
        <x-resume.article.card model="resumeTel" class="resume-tel" label="自宅電話" value="-" />
        <x-resume.article.card model="resumeMobile" class="resume-mobile" label="携帯電話" value="-" />
        <div x-show="resumeContact">
          <x-resume.article.card model="resumeContactAddressKana" class="resume-contact-address-kana" label="ふりがな"
            value="-" />
          <x-resume.article.card model="resumeContactAddressText" class="resume-contact-address" label="連絡先"
            value="-" :preLike="true" />
          <x-resume.article.card model="resumeContactTel" class="resume-contact-tel" label="連絡先電話" value="-" />
        </div>
      </section>

      <section class="panel resume-info-history">
        <x-resume.article.table-year-month-text-contact model="resumeHistory" class="resume-history" :headers="[
            'resume-year' => '年',
            'resume-month' => '月',
            'resume-text' => '学歴・職歴',
        ]"
          maxNumRows="26" top="90" />
      </section>
    </div>
  </div>

  <div class="page">
    <div class="page-content">
      <section class="panel resume-info-license">
        <x-resume.article.table-year-month-text model="resumeLicense" class="resume-license" :headers="[
            'resume-year' => '年',
            'resume-month' => '月',
            'resume-text' => '免許・資格',
        ]"
          maxNumRows="10" top="0" />
      </section>

      <section class="panel resume-info-motivation">
        <x-resume.article.card model="resumeMotivation" class="resume-motivation" label="志望の動機、特技、好きな学科、アピールポイントなど"
          value="-" :preLike="true" />
      </section>

      <section class="panel resume-info-wish">
        <x-resume.article.card model="resumeWish" class="resume-wish"
          label="本人希望記入欄（特に給料・職種・勤務時間・勤務地・その他についての希望などがあれば記入）" value="-" :preLike="true" />
      </section>
    </div>
  </div>
</article>
