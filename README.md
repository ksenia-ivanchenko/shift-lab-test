# Тестовое задание Шифтлаб

Стек: React, TypeScript, Redux Toolkit, Jest, SCSS

## Структура проекта

- `src/` — исходные файлы проекта
- `src/components/` — React компоненты
- `src/components/ui/` — компоненты отображения
- `src/pages/` — страницы приложения
- `stc/services/` - работа с апи и куками
- `src/styles/` - глобальные стили и переменные
- `src/utils/` - утилитарные функции
- `App.tsx` - основной компонент приложения с роутингом

## Особенности архитектуры

Было решено реализовать страницу для ввода номера телефона `AuthPhonePage` и страницу для ввода отп-кода `AuthOtpPage`. Также для удобства добавлена главная страница, на которой можно разлогиниться и заново пройти путь авторизации. На нее пользователь попадает после проверки отп кода.

Каждая страница обернута в компонент `ProtectedRoute`: неавторизованный пользователь не может попасть на главную страницу, а авторизованный не может попасть на страницы авторизации.

Из компонентов логики было решено реализовать общий компонент формы, принимающий в качестве дочерних элементов инпуты, необходимые для каждой страницы. В папке с UI-компонентами - компоненты кнопки, инпута и прелоадера. Кнопка и инпут реализованы по макету ui-kit.

Глобальный стейт реализован при помощи Redux Toolkit и, в соответствии с требуемым функционалом, состоит из одного слайса `userSlice`.

## Примечания

В целях улучшения пользовательского опыта было принято решение незначительно отойти от макета, а именно:

1. По макету кнопки сабмита форм по дефолту активны. Я их задизейблила до тех пор, пока юзер не введет валидные данные. Соответственно валидация форм проходит во время заполнения инпутов.
2. При попадании на страницу на инпут ставится фокус
3. На странице с отп кодом инпут с номером телефона сделан нередактируемым (по макету поведение при изменении его значения не было очевидно). Зато добавлена кнопочка, возвращающая пользователя на страницу назад, чтоб он не пугался и мог изменить ошибочно введенный номер))

## Установка и запуск

1. Создайте в корне проекта файл `.env` с содержимым файла `.env.example`
2. Установите зависимости и запустите проект:

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
