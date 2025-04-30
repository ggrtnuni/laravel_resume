<?php

namespace App\Http\Controllers\Resume;

use App\Http\Controllers\Controller;

/**
 * 履歴書 V3 コントローラ
 * 
 * @author ggrtn
 */
class ResumeV3Controller extends Controller
{
    protected $_data = [];

    /**
     * コンストラクタ
     */
    public function __construct()
    {
        //
    }

    /**
     * 履歴書作成
     */
    public function create()
    {
        return view('resume.v3.create');
    }
}
