<?php

namespace App\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * 履歴書 V3 レイアウト
 * 
 * @author ggrtn
 */
class ResumeV3Layout extends Component
{
    /**
     * Get the view / contents that represents the component.
     */
    public function render(): View
    {
        return view('layouts.resume-v3');
    }
}
