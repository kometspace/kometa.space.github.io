PLSpace (комета-подобный UI)
===========================

Это **шаблон сайта** под GitHub Pages:
- index.html (Главная)
- catalog.html (Каталог)
- keys.html (Ключи)
- free-keys.html (Бесплатные ключи)
- activate.html (Активация ключа)
- invite.html (Приглашения)
- profile.html (Профиль)
- changelog.html

Структура
---------
/assets
  /css/style.css
  /js/app.js

ВАЖНО ПРО КЛЮЧИ
---------------
GitHub Pages — статичный хостинг. Он НЕ может:
- создавать файлы на сервере (key.json, key(1).json и т.д.)
- выполнять серверные проверки ключей

Поэтому сейчас "активация" сохраняет ключ в localStorage на устройстве.

Как сделать по-настоящему (рекомендовано)
----------------------------------------
Вариант A: Firebase
- Firebase Auth (вход)
- Firestore (ключи, покупки, профили)
- Cloud Functions (валидация ключа, выдача прав/скинов)

Вариант B: свой backend
- API: /activateKey, /getKeys, /validateKey
- хранение: база данных

Дальше можем добавить Firebase прямо в этот шаблон:
- вставим конфиг
- сделаем страницу логина
- сделаем выдачу/покупку/активацию через Firestore

Как залить на GitHub Pages
--------------------------
1) Создай репозиторий <username>.github.io
2) Залей ВСЕ файлы из архива в корень
3) Settings → Pages → Deploy from branch → main /(root)
