## Medication Intake Tracker

### Описание на русском (RU)

**Medication Intake Tracker** — это фулстек-приложение, состоящее из мобильного приложения, разработанного на React Native, и бэкенда на Express.

### Установка и запуск клиента

1. Установите все зависимости, выполнив команду: npm install
2. Запустите дебаггер на предпочитаемом устройстве: npm run start

### Описание клиента

Клиентское приложение состоит из трех экранов: **Вход**, **Регистрация** и **Главная страница**.

- **Вход:** Для входа в систему необходимо быть зарегистрированным пользователем. Введите свой email и пароль.

- **Регистрация:** Для регистрации перейдите по соответствующей ссылке и введите данные. Регулярные выражения для валидации:
- Пароль: `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/`
- Email: `/^[\w.-]+@[a-zA-Z\d.-]+.[a-zA-Z]{2,}$/`
  После успешной регистрации вы будете автоматически залогинены в приложение.

- **Главная страница:** После входа в систему ваш список таблеток для приема будет пуст. Нажмите на `+` снизу экрана, чтобы добавить таблетку для приема. Введите данные и сохраните. После успешного сохранения список обновится. Вы можете обновить количество приемов, нажав на кнопку элемента списка или войдя в окно редактирования.

### To Do List

- **Обозначение стилями:** Отметка о достижении введенного количества приемов.
- **Добавить лоадер:** Загрузчик при загрузке сессии, чтобы пользователь не видел экран входа при входе в приложение.
- **Улучшение UI/UX:** Доработка интерфейса и удобства использования.

---

## Medication Intake Tracker

### Description in English (EN)

**Medication Intake Tracker** is a full-stack application consisting of a mobile app developed with React Native and an Express backend.

### Client Setup and Launch

1. Install all dependencies by running: npm install
2. Start the debugger on your preferred device: npm run start

### Client Description

The client application consists of three screens: **Login**, **Register**, and **Main Page**.

- **Login:** To access the system, you must be a registered user. Enter your email and password.

- **Register:** To register, go to the registration link and enter your credentials. Validation regular expressions:
- Password: `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/`
- Email: `/^[\w.-]+@[a-zA-Z\d.-]+.[a-zA-Z]{2,}$/`
  After successful registration, you will be automatically logged into the application.

- **Main Page:** After logging in, your medication intake list will be empty. Tap the `+` at the bottom of the screen to add a medication. Enter the details and save. After successful saving, the list will update. You can update the number of intakes by pressing the button on the list item or by entering the edit screen.

### To Do List

- **Styling:** Indication of reaching the entered number of intakes.
- **Add Loader:** Loader during session loading so the user doesn't see the login screen when entering the app.
- **UI/UX Improvement:** Enhance user interface and experience.
