do
    initwifi = require("initwifi")
    deb = require("debm")
    buzzer = require("tone")
    server = require("server")

    meters = {
        { id = 'Itrjmxn47z', type = 'Hot_water_meter', delta = 0.1, value = 0 },
        { id = 'Isz9hfpmzk', type = 'Cold_water_meter', delta = 0.1, value = 0 }
    }

    pin = {
        hot = 1, cool = 2, buzzer = 5, button = 6
    }

    wifiConfig = { ssid = "BlackHouse", pwd = "adiospirata" }

    local _send = function(delay, callback)
        timer = tmr.create()
        timer:register(delay, tmr.ALARM_SINGLE, callback)
        timer:start()
    end

    local _button = function()
        print("Clearing wifi config")
        initwifi.clear()
        _send(50, buzzer.info)
    end

    local _meterEvent = function(meter)
        return function()
            meters[meter].value = meters[meter].value + meters[meter].delta
            print("Reading " .. meters[meter].type .. ", " .. meters[meter].value .. "m3.")
            server.send(meters[meter])
        end
    end

    local _initMeters = function()
        _send(50, function()
            server.init(meters[1])
            _send(2000, function()
                server.init(meters[2])
                _send(3500, buzzer.success)
            end)
        end)
    end

    local _afterWifiInit = function(status)
        if status then
            -- time sync
            sntp.sync("pool.ntp.org", function(sec, us, server, info)
                print("Seconds: " .. sec .. " Server: " .. server .. " Stratum: " .. info.stratum)
                _initMeters()
            end, function(errorcode, info)
                print("SNTP errorcode: " .. errorcode .. " Info: " .. info)
            end, true)

            -- callbacks with debounce for input gpio
            deb.set(pin.cool, _meterEvent(1))
            deb.set(pin.hot, _meterEvent(2))
            deb.set(pin.button, _button)
        else
            print("Wifi connection ERROR")
            _send(50, buzzer.error)
        end
    end


    -- Main part --
    buzzer.init(pin.buzzer)
    _send(50, buzzer.info)
    -- Wi-fi
    print("Starting wifi ... it can take up to 20 seconds")
    initwifi.init(wifiConfig, _afterWifiInit)
end



--for i=1, #meters do
--  print(meters[i].type)
--  for key, val in pairs(meters[i]) do
--    print(key.." : "..val)
--  end
--end

--function cooladd()
--    -- callback для пина 3
--    meters.cool = meters.cool + 0.01
--    print("Cool got " .. meters.cool .. " m3.")
--
--    --api_sun.send('cool', 0.01, water.cool)
--    server.send('cool', 0.01, meters.cool)
--end

--function hotadd()
--    -- callback для пина 4
--    meters.hot = meters.hot + 0.01
--    print("Hot got " .. meters.hot .. " m3.")
--    --api_sun.send('hot', 0.01, water.hot)
--    server.send('hot', 0.01, meters.hot)
--end
