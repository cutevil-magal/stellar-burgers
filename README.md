# Stellar Burgers - Космическая бургерная

**React-приложение для заказа космических бургеров с интерактивным конструктором**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)

---

## 📖 О проекте

Stellar Burgers - это современное веб-приложение для заказа космических бургеров с уникальным интерактивным конструктором. Пользователи могут создавать собственные бургеры, отслеживать заказы в реальном времени и управлять своим профилем.

### 🎯 Ключевые особенности

- **🍔 Интерактивный конструктор** бургеров с drag-and-drop функциональностью
- **🔐 Полная система аутентификации** с защищенными маршрутами
- **⚡ Real-time обновления** через WebSocket соединения
- **📱 Адаптивный интерфейс** с современным дизайном
- **📊 История заказов** с отслеживанием статусов

### 🛠 Технологический стек

**Frontend:**
- React 18 с функциональными компонентами и хуками
- TypeScript для строгой типизации
- Redux Toolkit для управления состоянием
- CSS Modules для изолированных стилей

**Инструменты разработки:**
- Webpack для сборки проекта
- ESLint для проверки кода
- Prettier для форматирования
- Storybook для документации компонентов

---

## 🚀 Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Настройка окружения

Создайте файл `.env` на основе `.env.example` и укажите переменные окружения:

```bash
BURGER_API_URL=ваш_адрес_api
```

### Запуск в режиме разработки

```bash
npm run start
```

### Сборка production-версии

```bash
npm run build
```

### Запуск Storybook

```bash
npm run storybook
```

### Системные требования
- Node.js 16+
- Современный браузер с поддержкой ES6+
- Доступ к API Stellar Burgers

---

## 📁 Структура проекта

```
src/
├── components/          # Компоненты приложения
│   ├── app-header/     # Шапка приложения
│   ├── burger-constructor/ # Конструктор бургеров
│   ├── burger-ingredients/ # Ингредиенты
│   ├── modal/          # Модальные окна
│   ├── order-card/     # Карточка заказа
│   ├── order-info/     # Информация о заказе
│   ├── protected-route/ # Защищенные маршруты
│   └── ui/            # Базовые UI компоненты
├── pages/              # Страницы приложения
│   ├── constructor-page/ # Главная страница
│   ├── feed/           # Лента заказов
│   ├── login/          # Страница входа
│   ├── profile/        # Профиль пользователя
│   ├── register/       # Страница регистрации
│   └── ...            # Другие страницы
├── services/           # Сервисы и хранилище
│   ├── slices/         # Слайсы Redux
│   └── store.ts        # Настройка хранилища
├── utils/              # Вспомогательные утилиты
│   ├── burger-api.ts   # API функции
│   ├── cookie.ts       # Работа с cookies
│   └── types.ts        # TypeScript типы
└── styles/             # Стили и ресурсы
    ├── fonts/          # Шрифты
    ├── images/         # Изображения
    └── index.css       # Глобальные стили
```

---

## 🎨 Особенности реализации

### Управление состоянием с Redux Toolkit

```typescript
// Пример слайса для ингредиентов
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<IIngredient[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});
```

### Защищенные маршруты

```tsx
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
```

### WebSocket соединение для real-time обновлений

```typescript
// Подключение к WebSocket для ленты заказов
export const createSocketConnection = () => {
  return new WebSocket('wss://norma.nomoreparties.space/orders/all');
};
```

---

## 🎯 Результаты реализации

**Достигнутые цели:**
- ✅ Полнофункциональный конструктор бургеров
- ✅ Real-time обновление ленты заказов
- ✅ Защищенные маршруты и авторизация
- ✅ Адаптивный интерфейс для всех устройств
- ✅ TypeScript для типобезопасности

**Технические преимущества:**
- Чистая архитектура компонентов
- Оптимизированное управление состоянием
- Модульные стили с CSS Modules
- Высокая производительность

---

## 🔮 Планы по развитию

- [ ] **PWA-функциональность** - оффлайн работа и установка на устройство
- [ ] **Интеграция с платежными системами** - расширение способов оплаты
- [ ] **Панель администратора** - управление заказами и ингредиентами
- [ ] **Мобильное приложение** - на React Native
- [ ] **Система рекомендаций** - персональные предложения

---

## 👩‍💻 Разработчик

**Анна Хвостикова** - Frontend Developer

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/cutevil-magal)
[![Email](https://img.shields.io/badge/Email-ana.magal@yandex.by-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ana.magal@yandex.by)

---

## 📄 Лицензия

Проект разработан для демонстрации современных подходов к разработке React-приложений с использованием TypeScript, Redux Toolkit и современных инструментов разработки.

[Макет](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)

---



