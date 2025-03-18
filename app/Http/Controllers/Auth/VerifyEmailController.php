<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

/**
 * メール検証 コントローラ
 * 
 * __invoke で作ったコントローラは
 * ルートでメソッド名抜きでクラス名だけで呼び出す。
 * 
 * @author breeze
 */
class VerifyEmailController extends Controller
{
    /**
     * 認証されたユーザーの電子メール アドレスを検証済みとしてマーク
     * Mark the authenticated user's email address as verified.
     * 
     * クラスを関数として実行できる。
     * $obj = new VerifyEmailController();
     * echo $obj();
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard', absolute: false) . '?verified=1');
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return redirect()->intended(route('dashboard', absolute: false) . '?verified=1');
    }
}
