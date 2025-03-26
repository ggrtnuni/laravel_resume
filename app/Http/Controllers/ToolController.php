<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;

/**
 * ツール コントローラ
 * 
 * @author ggrtn
 */
class ToolController extends Controller
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
        return view('tool.index')->with($this->_data);
    }
}
