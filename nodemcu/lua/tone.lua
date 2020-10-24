-- Module usage:
-- buzzer.init(pin)
-- buzzer.tone(freq, duration, count)
-- buzzer.success()
-- buzzer.info()
-- buzzer.error()

local Module = {}

local pin = nil
local timer = nil
local flag = true
local cnt = 0

local function _beep()
    if flag == true then
        pwm.start(pin)
        flag = false
    else
        pwm.stop(pin)
        flag = true
    end
    cnt = cnt - 1
end

local function _tone(freq, duration, count)
    if count > 0 then
        cnt = count + count
    else
        cnt = 2
    end

    pwm.setup(pin, freq, 511)

    timer:register(duration, tmr.ALARM_AUTO, function(t)
        if cnt > 0 then
            _beep()
        else
            t:stop()
        end
    end)

    timer:start()
end

Module.init = function(_pin)
    pin = _pin
    timer = tmr.create()
end

Module.tone = _tone

Module.error = function()
    _tone(392, 200, 3)
end

Module.success = function()
    _tone(987, 50, 1)
end

Module.info = function()
    _tone(987, 100, 2)
end

return Module
