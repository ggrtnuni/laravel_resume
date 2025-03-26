@php
  $step = isset($step) ? $step : 6;
  $top = isset($top) ? $top : 0;
  $unit = isset($unit) ? $unit : 'mm';
  $maxNumRows = isset($maxNumRows) ? $maxNumRows : 0;
@endphp
<div class="table {{ $class }}" x-data="{
    top: {{ $top }},
    step: {{ $step }},
    unit: '{{ $unit }}',
    maxNumRows: {{ $maxNumRows }}
}" x-init="const toggleContact = function(value) {
    if (value) {
        document.querySelector('.resume-email>h2').classList.remove('card-without-contact');
        document.querySelector('.resume-email>div').classList.remove('card-without-contact');
        document.querySelector('.resume-mobile>div').classList.remove('card-without-contact');
    } else {
        document.querySelector('.resume-email>h2').classList.add('card-without-contact');
        document.querySelector('.resume-email>div').classList.add('card-without-contact');
        document.querySelector('.resume-mobile>div').classList.add('card-without-contact');
    }
};
toggleContact(resumeContact);
$watch('resumeContact', (value) => {
    toggleContact(value);
})">
  <div class="table-header">
    @foreach ($headers as $headerClass => $headerName)
      <div class="{{ $headerClass }}" :style="{ 'top': (top + ((resumeContact ? 0 : -3) * step)) + unit }"">
        {{ $headerName }}
      </div>
    @endforeach
  </div>

  <div class="table-body">
    <template x-for="(row, index) in {{ $model }}.rows">
      <div class="row">
        <div
          x-text="getYearWithCalenderType(resumeCalender, row['resume-year']) + (String(row['resume-year']).length > 0 ? ' 年' : '')"
          class="resume-year"
          :style="{
              'top': ((top + ((resumeContact ? 0 : -3) * step) + step) + index * step) + unit,
          }">
        </div>
        <div x-text="row['resume-month']" class="resume-month"
          :style="{
              'top': ((top + ((resumeContact ? 0 : -3) * step) + step) + index * step) + unit,
          }">
        </div>
        <div x-text="row['resume-text']" class="resume-text"
          :style="{
              'top': ((top + ((resumeContact ? 0 : -3) * step) + step) + index * step) + unit,
              'text-align': row.right ? 'right' : 'inherit'
          }">
        </div>
      </div>
    </template>
    <template x-for="index in ((maxNumRows + (resumeContact ? 0 : 3)) - {{ $model }}.rows.length)">
      <div class="row">
        @foreach ($headers as $headerClass => $headerName)
          <div class="{{ $headerClass }}"
            :style="{
                'top': ((top + ((resumeContact ? 0 : -3) * step) + step) +
                    ({{ $model }}.rows.length + index - 1) *
                    step) + unit
            }">
          </div>
        @endforeach
      </div>
    </template>
  </div>
</div>
