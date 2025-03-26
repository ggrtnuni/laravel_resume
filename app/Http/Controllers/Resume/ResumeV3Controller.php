<?php

namespace App\Http\Controllers\Resume;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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
     * 履歴書一覧
     */
    public function index()
    {
        return view('resume.v3.index')->with($this->_data);
    }

    /**
     * 履歴書作成
     */
    public function create()
    {
        return view('resume.v3.create');
    }

    /**
     * 履歴書保存
     */
    public function store(Request $request) {}

    /**
     * 履歴書表示
     */
    public function show(Request $request)
    {
        return view('resume.v3.show');
    }

    /**
     * 履歴書編集
     */
    public function edit(Request $request)
    {
        return view('resume.v3.edit');
    }

    /**
     * 履歴書更新
     */
    public function update(Request $request) {}

    /**
     * 履歴書削除
     */
    public function destroy(Request $request) {}
}
