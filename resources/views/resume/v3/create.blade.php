<x-resume-v3-layout>

  <div x-data="resume" class="flex justify-start">
    <x-resume.article />
    <x-resume.control />
  </div>

  <x-slot name="script">
    <script>
      // 初期化
      document.addEventListener('alpine:init', () => {
        console.log(`Alpine version: ${Alpine.version}`)
        Alpine.data('resume', window.resumeV3.models.resume);

        // 証明写真のオートロード・セーブ
        window.resumeV3.autoLoadFromSession();
        window.resumeV3.autoSaveToSession()
      })
    </script>
    <script type="module">
      // テスト読込
      // let url;
      // url = `/sample/data/resume-v3.json?timestamp=${new Date().getTime()}`;
      // window.resumeV3.loadResumeFromUrl(url);

      // 証明写真画像アップロードの仕込み
      window.resumeV3.prepareForUploadIdPhotoImage();

      // JSON 読込の仕込み
      window.resumeV3.prepareForUploadJson();
    </script>
  </x-slot>

</x-resume-v3-layout>
