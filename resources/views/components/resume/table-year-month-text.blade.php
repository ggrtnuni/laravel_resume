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
    'maxNumRows': {{ $maxNumRows }}
}">
  <div class="table-header">
    @foreach ($headers as $headerClass => $headerName)
      <div class="{{ $headerClass }}" :style="{ 'top': top + unit }">
        {{ $headerName }}
      </div>
    @endforeach
  </div>

  <div class="table-body">
    <template x-for="(row, index) in {{ $model }}.rows">
      <div class="row">
        <div
          x-text="getYearWithCalenderType(resumeCalender, row['resume-year']) + (String(row['resume-year']).length > 0 ? ' 年' : '')"
          class="resume-year" :style="{ 'top': (top + step + index * step) + unit }">
        </div>
        <div x-text="row['resume-month']" class="resume-month" :style="{ 'top': (top + step + index * step) + unit }">
        </div>
        <div x-text="row['resume-text']" class="resume-text"
          :style="{
              'top': (top + step + index * step) + unit,
              'text-align': row.right ? 'right' : 'inherit'
          }">
        </div>
      </div>
    </template>
    <template x-for="index in (maxNumRows - {{ $model }}.rows.length)">
      <div class="row">
        @foreach ($headers as $headerClass => $headerName)
          <div class="{{ $headerClass }}"
            :style="{
                'top': (top + step + ({{ $model }}.rows.length + index - 1) * step) + unit
            }">
          </div>
        @endforeach
      </div>
    </template>
  </div>
</div>
