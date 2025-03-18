<?php

namespace App\Utils;

/**
 * デバッグヘルパ
 * 
 * @author ggrtn
 */
class DebugHelper
{
    /**
     * この関数が呼ばれたときのバックトレースを１次元配列で得る
     */
    public static function backtrace()
    {
        // 0 => array:6 [▼
        //     "file" => "/var/www/html/app/Http/Controllers/Auth/AuthenticatedSessionController.php"
        //     "line" => 24
        //     "function" => "backtrace"
        //     "class" => "App\Utils\DebugHelper"
        //     "type" => "::"
        //     "args" => []
        // ]
        $traces = debug_backtrace();
        $logs = [];
        foreach ($traces as $trace) {
            $log = '';
            $log .= isset($trace['class']) ? $trace['class'] : '';
            $log .= isset($trace['function']) ? " {$trace['function']}()" : '';
            $log .= isset($trace['line']) ? " ({$trace['line']})" : '';
            $logs[] = $log;
        }
        return $logs;
    }
}
