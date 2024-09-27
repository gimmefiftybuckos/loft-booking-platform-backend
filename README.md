# loft-radar-project-backend

Проект представляет собой backend-сервер для работы с пользователями, авторизацией, токенами и избранными элементами. Основные технологии: Node.js, Express, PostgreSQL, JWT.

### ToDo:
1. Users DB ✓
2. JWT generate and verify methods ✓
3. Token refresh ✓
4. Error catching ✓
5. Favorites DB ✓
6. Comments DB
7. Refactoring
8. Tests (?)

<br />
  
### Для запуска проекта необходимо:

**Значения из .env.example совпадают с .env!**

#### Установка зависимостей

1. Установить зависимости

```shell
npm i
```

2. Скопировать файл с переменными окружения:

```shell
cp .env.example .env
```

3. Запустить dev-сервер:

```shell
npm run dev
```

#### Создание базы данных

SQL-запросы:

```sql
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255),
    login VARCHAR(255),
    password VARCHAR(255),
    registrTime TIMESTAMP
);

CREATE TABLE tokens (
    user_id VARCHAR(255) UNIQUE,
    refresh_token VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE favorites (
    user_id VARCHAR(255) UNIQUE,
    ids TEXT[],
    FOREIGN KEY (user_id) REFERENCES users (id)
);
```

#### Настройка подключения к базе данных

```typescript
import { Pool } from 'pg';

const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'loft_radar',
   password: 'root',
   port: 5432,
});

export default pool;
```

#### Переменные окружения

Скопируйте файл `.env.example` и создайте `.env`. Убедитесь, что все переменные окружения настроены корректно. Пример `.env` файла:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=loft_radar
DB_PASSWORD=root
DB_PORT=5432
```
