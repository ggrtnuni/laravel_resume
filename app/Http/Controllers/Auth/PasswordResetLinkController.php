<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\View\View;

/**
 * パスワードリセットリンク コントローラ
 * 
 * @author breeze
 */
class PasswordResetLinkController extends Controller
{
    /**
     * パスワード リセット リンク要求ビューを表示
     * Display the password reset link request view.
     */
    public function create(): View
    {
        return view('auth.forgot-password');
    }

    /**
     * 受信したパスワード リセット リンク要求を処理
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        // このユーザーにパスワード リセット リンクを送信します。
        // リンクの送信を試みたら、応答を調べて、ユーザーに表示する必要があるメッセージを確認します。
        // 最後に、適切な応答を送信します。
        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status == Password::RESET_LINK_SENT
            ? back()->with('status', __($status))
            : back()->withInput($request->only('email'))
            ->withErrors(['email' => __($status)]);
    }
}
