local Module = {}

local function setnew()
    return {}
end

-- принимает номер ноги и callback для исполнения
Module.set = function(pin, callback)
-- Устанавливаем ногу на прием
  gpio.mode(pin, gpio.INPUT, gpio.PULLUP)

  local o = setnew ()  
  o.buttonPin = pin -- Нога 
  o.cicle = 0  -- Счетчик опроса ноги
  o.gotpress = false -- нажатие или нет
  o.doshort = callback -- callback
  o.catch = 0 -- Состояние ноги 
  
  o.startpin = function(self) -- Функция работы с ногой
    -- Установка события - прерывание на обвал ноги в ноль
    gpio.trig(self.buttonPin) -- Очищаем прерывание
    gpio.trig(self.buttonPin, "down",function (level) -- Устанавливаем заново
      -- Первый ноль - отключаем дальнейшую реакцию на прерывания
      if self.gotpress == false then
        self.gotpress = true            
        local function exitnow(buf) -- Функция срабатывания геркона          
          buf:stop()
          buf:unregister()
          buf = nil          
          self.doshort() -- Выполняем callback
          self.cicle, self.gotpress = 0, false -- сброс состояния
        end
        -- На первое прерывание устанавливаем таймер на 50 мс
        tmr.create():alarm(50, 1, function(buf)
          -- Который читает ногу и считает результаты считывания
          -- в зависимости от состояния o.catch, сначала ловит ноль,
          -- а потом единицу - то есть геркон размкнулся
          if gpio.read(self.buttonPin) == o.catch then
            self.cicle = self.cicle + 1
          end
          
          if self.cicle >=5 then -- задержка 5 х 50 = 250 мс            
            if o.catch == 0 then -- если геркон еще разомкнут
              -- сработка произошла через 20х50 = 2500 (2,5 секунды)              
              self.cicle = -15
              o.catch = 1 -- меняем результат считывания на единицу            
            else -- если геркон замкнулся
              self.cicle = 0 -- счетчик в ноль
              o.catch = 0 -- данные для отлова в ноль
              exitnow(buf) -- выполняем callback
            end
          end
        end)
      end
    end)
  end

  return o:startpin()
end

return Module