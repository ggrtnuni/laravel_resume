<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

/**
 * 検証済みメールの確認 コントローラ
 * 
 * __invoke で作ったコントローラは
 * ルートでメソッド名抜きでクラス名だけで呼び出す。
 * 
 * @author breeze
 */
class EmailVerificationPromptController extends Controller
{
    /**
     * 電子メールの確認プロンプトを表示
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|View
    {
        return $request->user()->hasVerifiedEmail()
            ? redirect()->intended(route('dashboard', absolute: false))
            : view('auth.verify-email');
    }
}
