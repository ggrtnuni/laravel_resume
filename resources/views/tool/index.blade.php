<x-tool-layout>

  <div x-data="{
      items: [{
              name: '履歴書 V5',
              desc: 'next15 + typescript + tailwindcss + redux',
              href: '/dist/resume_v5/resume.html',
              items: [],
          },
          {
              name: '履歴書 V4',
              desc: 'nuxt3 + typescript + tailwindcss',
              href: '/dist/resume_v4/resume/',
              items: [],
          },
          {
              name: '履歴書 V3',
              desc: 'blade + tailwindcss + alpinejs',
              href: '../resume/v3/create',
              items: [
                  { name: '履歴書 V3 サンプルデータの JSON ファイル', desc: '生成 AI で作った仮想の人', href: '../resume/sample/resume-v3-example.json', items: [] },
                  { name: '履歴書 V3 サンプルデータから印刷した PDF', desc: '', href: '../resume/sample/resume-v3-example.pdf', items: [] },
              ],
          },
          {
              name: '履歴書 V2',
              desc: 'html + css + javascript',
              href: '../resume/v2/resume.html',
              items: [],
          }, {
              name: '履歴書 V1',
              desc: 'html + css',
              href: '../resume/v1/resume.html',
              items: [],
          },
      ]
  }">
    <div class="max-w-7xl pl-6">
      <div class="flex flex-row flex-wrap items-center gap-4">
        <template x-for="(item, index) in items">
          <div class="size-fit min-w-64 min-h-48 border rounded text-left py-6 px-6">
            <div>
              <a :href="item.href" target="_blank">
                <span x-text="item.name" class="text-green-500 hover:text-green-300 active:text-green-800"></span>
              </a>
            </div>
            <div>
              <span x-text="item.desc" class="text-sm text-gray-400"></span>
            </div>
            <div>
              <template x-for="(item2, index2) in item.items">
                <div>
                  <div>
                    <a :href="item2.href" target="_blank">
                      <span x-text="item2.name"
                        class="text-xs text-green-500 hover:text-green-300 active:text-green-800"></span>
                    </a>
                  </div>
                  <div>
                    <span x-text="item2.desc" class="text-xs text-gray-400"></span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>


  <x-slot name="script">
  </x-slot>

</x-tool-layout>
