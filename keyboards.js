const keyboards = {
    pcMenu: {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Выключить 🙆🏻',
                        callback_data: 'shutdown',
                    }
                ],
                [
                    {
                        text: 'Перезагрузить 👀',
                        callback_data: 'reboot',
                    }
                ],
                [
                    {
                        text: 'Спящий режим 💆🏻',
                        callback_data: 'sleepMode',
                    }
                ],
                [
                    {
                        text: 'Отмена! 🙅🏻',
                        callback_data: 'cancel',
                    }
                ]
            ],
        }
    },
    mainMenuOptions: {
        reply_markup: {
            keyboard: [
                [
                    {text: 'Закрыть клавиатуру 🤓',},
                    {
                        text: 'Открыть меню возможностей 💁🏻',
                        callback_data: 'openMenu',
                    }
                ]
            ],
            one_time_keyboard: true,
        }
    }
}
module.exports = keyboards;