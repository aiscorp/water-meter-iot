local Module = {}

local serverUrl = "http://ais-code.ru/"
local serverUrl2 = "http://192.168.0.159:5000/"
local apiInit = "api/init?"
local apiReading = "api/reading?"

local _send = function(meter)
    local time, u = rtctime.get() -- get current datetime

    local body = 'id=' .. meter.id .. '&time=' .. time .. '&delta=' .. meter.delta .. '&value=' .. meter.value
    local url = serverUrl2 .. apiReading .. body
    print(url)

    http.get(url, nil, function(code, data)
        if (code < 0) then
            print("HTTP request failed")
            print(data)
        else
            print(code, data)
        end
    end)
end

local _init = function(meter)
    local raw, reset_reason, exc = node.bootreason()
    local status = raw .. '_' .. reset_reason .. '_' .. exc

    local body = 'id=' .. meter.id .. '&type=' .. meter.type .. '&status=' .. status
    local url = serverUrl2 .. apiInit .. body
    print(url)

    http.get(url, nil, function(code, data)
        if (code < 0) then
            print("HTTP request failed")
            print(data)
        else
            print(code, data)
            local res = sjson.decode(data)
            if res.value then
                print('Value to update:', res.value)
            end
        end
    end)
end

Module.send = _send
Module.init = _init
return Module


--local i1 = data:find('value":')
--local s1 = data:sub(i1+7)
--local i2 = s1:find('}')
--local s2 = s1:sub(0, i2-1)
--print(s2)
