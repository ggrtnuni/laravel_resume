<?php

namespace App\Http\Controllers\Resume;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * 履歴書コントローラ
 * 
 * @author ggrtn
 */
class ResumeController extends Controller
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
     * 履歴書一覧
     */
    public function index()
    {
        return view('resume.index')->with($this->_data);
    }
}
