local Module = {}
local moduleName = ...

local _tries = 0

local _status = function()
    ip = wifi.sta.getip()
    if ip then
        return true
    else
        return false
    end
end

local _printWifiInfo = function()
    print('IP: ', wifi.sta.getip())
    print('Status: ', wifi.sta.status())
end

local _resultfn = function(callback, result)
    if callback then
        callback(result)
    end
    package.loaded[moduleName] = nil
end

local _wifiConnect = function(cfg)
    wifi.setmode(wifi.STATION, false)
    wifi.sta.config(cfg)
end

local _wifiClear = function()
    wifi.sta.clearconfig()
end

local _init = function(config, callback)
    if _status() then
        return _resultfn(callback, _status())
    end

    _wifiConnect(config)

    tmr.create():alarm(5000, tmr.ALARM_AUTO, function(timer)
        _tries = _tries - (-1)

        if _tries < 5 then
            if not _status() then
                return
            end
        end

        timer:stop()
        timer:unregister()
        timer = nil
        _tries = 0
        _printWifiInfo()
        _resultfn(callback, _status())
    end)
    collectgarbage()
end

Module.init = _init

Module.clear = _wifiClear

Module.status = _status

return Module
