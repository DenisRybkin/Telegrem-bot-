export const keyboards = {
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
                        text: 'Отмена! 🙅🏻 ',
                        callback_data: 'cancel',
                    }
                ],
            ],
        }
    },
    mainMenuOptions: {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: 'Закрыть клавиатуру 🤓'
                    },
                    {
                        text: 'Меню возможностей 💁🏻',
                    }
                ],
                [
                    {
                        text: 'Меню блокнота мотивашек 🌍',
                    }
                ]
            ],
            one_time_keyboard: true,
        }
    },
    confirmation: {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Да! 👍🏻',
                        callback_data: 'confirmMindSave',
                    },
                    {
                        text: 'Нет 🙅🏻',
                        callback_data: 'unConfirmMindSave',
                    }
                ],
            ],
            one_time_keyboard: true,
        }
    },
    mindsMenu: {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Вывести все мои мотивашки 📂',
                        callback_data: 'readMinds',
                    }
                ],
                [
                    {
                        text: 'Добавить мотивашку 🖋',
                        callback_data: 'addMind',
                    }
                ],
                [
                    {
                        text: 'Удалить мотивашку ✂️',
                        callback_data: 'deleteMind',
                    }
                ],
                [
                    {
                        text: 'Удалить все мотивашки 📛',
                        callback_data: 'deleteAllMinds',
                    }
                ],
                [
                    {
                        text: 'Отмена! 🙅🏻 ',
                        callback_data: 'cancel',
                    }
                ],
            ],
        }
    },
    numbersMenu: {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: '1',
                        callback_data: 'id',
                    },
                    {
                        text: '2',
                        callback_data: 'id',
                    },
                        {
                        text: '3',
                        callback_data: 'id',
                    },
                ],
                [
                    {
                        text: '4',
                        callback_data: 'id',
                    },
                    {
                        text: '5',
                        callback_data: 'id',
                    },
                    {
                        text: '6',
                        callback_data: 'id',
                    },
                ],
                [
                    {
                        text: '7',
                        callback_data: 'id',
                    },
                    {
                        text: '8',
                        callback_data: 'id',
                    },
                    {
                        text: '9',
                        callback_data: 'id',
                    }
                ],
                [
                    {
                        text: '0',
                        callback_data: 'id',
                    }
                ]
            ],
        }
    }
}