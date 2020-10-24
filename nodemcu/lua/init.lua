print("Waiting for 5 seconds ...")
local timer = tmr.create()
timer:register(5, tmr.ALARM_SINGLE, function(t)
    t:unregister(0);
    print("Starting ...");
    dofile("main.lua")
end)
timer:start()
