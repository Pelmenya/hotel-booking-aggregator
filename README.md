# «Backend Hotel Aggregator»

## [«Fronend Hotel Aggregator»](https://github.com/Pelmenya/hotel-booking-aggregator-front)

## Описание проекта

Проект представляет собой бэкенд-приложение сайта-агрегатора просмотра и бронирования гостиниц на определленный диапазон дат.

## Цели проекта

1. Разработка публичного API.
2. Разработка API пользователя.
3. Разработка API администратора.
4. Разработка API менеджера.
4. Разработка чата консультанта.

## Технологический стек

- Node.js;
- Nest.js;
- MongoDB;
- WebSocket.

## Глоссарий

В документе приводятся описания разных интерфейсов и типов. Для упрощения описания в этом разделе приводятся общие типы.

```ts
type ID = string | ObjectId;
```

## 1. Описание базовых модулей

Базовые модули используются для описания бизнес-логики и хранения данных.

### 1.1. Модуль «Пользователи»

Модуль «Пользователи» предназначен для создания, хранения и поиска профилей пользователей.

Модуль «Пользователи» используется функциональными модулями для регистрации и аутентификации.

Данные пользователя хранятся в MongoDB.

Модель данных `User` пользователя содержит поля:

| Название     |    Тип     | Обязательное | Уникальное | По умолчанию |
| ------------ | :--------: | :----------: | :--------: | :----------: |
| \_id         | `ObjectId` |      да      |     да     |              |
| email        |  `string`  |      да      |     да     |              |
| passwordHash |  `string`  |      да      |    нет     |              |
| name         |  `string`  |      да      |    нет     |              |
| contactPhone |  `string`  |     нет      |    нет     |              |
| role         |  `string`  |      да      |    нет     |   `client`   |

---

Модуль «Пользователи» реализован в виде NestJS-модуля и экспортировать сервисы с интерфейсами:

```ts
interface SearchUserParams {
  limit: number;
  offset: number;
  email: string;
  name: string;
  contactPhone: string;
}
interface IUserService {
    create(dto: CreateUserDto): Promise<IUser>;
    findById(id: ID): Promise<IUser>;
    findByEmail(email: string): Promise<IUser>;
    findAll(params: SearchUserParams): Promise<IUser[]>;
}
```

Поле `role` может принимать одно из значений:

- `client`,
- `admin`,
- `manager`.

При поиске `IUserService.findAll()` поля `email`, `name` и `contactPhone` проверяются на частичное совпадение.

### 1.2. Модуль «Гостиницы»

Модуль «Гостиницы» предназначен для хранения и поиска гостиниц и их номеров.

Модуль «Гостиницы» используется функциональными модулями для показа списка мест для бронирования, а также для их добавления, включения и выключения.

Данные хранятся в MongoDB.

Модель данных `Hotel` содержит поля:

| Название    |    Тип     | Обязательное | Уникальное | По умолчанию |
| ----------- | :--------: | :----------: | :--------: | :----------: |
| \_id        | `ObjectId` |      да      |     да     |              |
| title       | `ObjectId` |      да      |    нет     |              |
| description |  `string`  |     нет      |    нет     |              |
| createdAt   |   `Date`   |      да      |    нет     |              |
| updatedAt   |   `Date`   |      да      |    нет     |              |

Модель данных `HotelRoom` содержит поля:

| Название    |    Тип     | Обязательное | Уникальное | По умолчанию |
| ----------- | :--------: | :----------: | :--------: | :----------: |
| \_id        | `ObjectId` |      да      |     да     |              |
| hotel       | `ObjectId` |      да      |    нет     |              |
| description |  `string`  |     нет      |    нет     |              |
| images      | `string[]` |     нет      |    нет     |     `[]`     |
| createdAt   |   `Date`   |      да      |    нет     |              |
| updatedAt   |   `Date`   |      да      |    нет     |              |
| isEnabled   | `boolean`  |      да      |    нет     |    `true`    |

Свойство `hotel` [ссылается](https://mongoosejs.com/docs/populate.html) на модель `Hotel`.

---

Модуль «Гостиницы» реализован в виде NestJS-модуля и экспортирует сервисы с интерфейсами:

```ts
interface SearchHotelParams {
  limit: number;
  offset: number;
  title: string;
}

interface IUpdateHotelParams {
  title: string;
  description: string;
}

interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: ID): Promise<Hotel>;
  search(params: SearchHotelParams): Promise<Hotel[]>;
  update(id: ID, data: IUpdateHotelParams): Promise<Hotel>;
}

interface SearchRoomsParams {
  limit: number;
  offset: number;
  hotel: ID;
  isEnabled?: boolean;
}

interface IHotelRoomsService {
    create(dto: CreateHotelRoomDto): Promise<HotelRoomDataRes>;
    findOne(id: ID): Promise<HotelRoomDataRes>;
    findById(id: ID): Promise<HotelRoomDataRes>;
    search(query: SearchRoomsParams): Promise<HotelRoomDataRes[]>;
    update(id: ID, dto: Partial<CreateHotelRoomDto>): Promise<HotelRoomDataRes>;
}
```

В методе `search` флаг `isEnabled` может принимать только boolean значения или может быть не передан, тогда должны вернутся все записи:

- `true` — флаг должен использоваться в фильтрации;
- `undefined` — если не передан параметр, флаг должен игнорироваться.

### 1.3. Модуль «Брони»

Модуль «Брони» предназначен для хранения и получения броней гостиниц конкретного пользователя.

Данные хранятся в MongoDB.

Модель данных `Reservation` содержит поля:

| Название  |    Тип     | Обязательное | Уникальное | По умолчанию |
| --------- | :--------: | :----------: | :--------: | :----------: |
| \_id      | `ObjectId` |      да      |     да     |              |
| userId    | `ObjectId` |      да      |    нет     |              |
| hotelId   | `ObjectId` |      да      |    нет     |              |
| roomId    | `ObjectId` |      да      |    нет     |              |
| dateStart |   `Date`   |      да      |    нет     |              |
| dateEnd   |   `Date`   |      да      |    нет     |              |

---

Модуль «Брони» реализован в виде NestJS-модуля и экспортирует сервисы с интерфейсами:

```ts
interface ReservationDto {
  user: ID;
  hotel: ID;
  room: ID;
  startDate: Date;
  endDate: Date;
}

interface SearchReservationsParams {
  user: ID;
  startDate: Date;
  endDate: Date;
}

interface interface IReservationsService {
    addReservation(dto: CreateReservationDto): Promise<Reservation>;
    removeReservation(room: ID, user?: ID): Promise<Reservation>;
    getReservations(query: SearchReservationsParams): Promise<Reservation[]>;
}
```

Метод `IReservation.addReservation` проверяет доступность номера на диапазон дат.

### 1.4. Модуль «Чат техподдержки»

Модуль «Чат техподдержки» предназначен для хранения обращений в техподдержку и сообщений в чате обращения.

Модуль «Чат техподдержки» используется функциональными модулями для реализации возможности общения пользователей с поддержкой.

Данные чатов хранятся в MongoDB.

Модель данных чата `SupportRequest` содержит поля:

| Название  |     Тип     | Обязательное | Уникальное |
| --------- | :---------: | :----------: | :--------: |
| \_id      | `ObjectId`  |      да      |     да     |
| user      | `ObjectId`  |      да      |    нет     |
| createdAt |   `Date`    |      да      |    нет     |
| messages  | `Message[]` |     нет      |    нет     |
| isActive  |   `bool`    |     нет      |    нет     |

Модель сообщения `Message` содержит поля:

| Название |    Тип     | Обязательное | Уникальное |
| -------- | :--------: | :----------: | :--------: |
| \_id     | `ObjectId` |      да      |     да     |
| author   | `ObjectId` |      да      |    нет     |
| sentAt   |   `Date`   |      да      |    нет     |
| text     |  `string`  |      да      |    нет     |
| readAt   |   `Date`   |     нет      |    нет     |

Сообщение считается прочитанным, когда поле `readAt` не пустое.

---

Модуль «Чат техподдержки» должен быть реализован в виде NestJS-модуля и должен экспортировать сервисы с интерфейсами:

```ts
interface CreateSupportRequestDto {
  user: ID;
  text: string;
}

interface SendMessageDto {
  author: ID;
  supportRequest: ID;
  text: string;
}

interface MarkMessagesAsReadDto {
  user: ID;
  supportRequest: ID;
  createdBefore: Date;
}

interface SearchChatListParams {
  user: ID | null;
  isActive: bool;
  _id: ID;
}

interface interface ISupportRequestsService {
    findSupportRequests(
        params: SearchChatListParams,
    ): Promise<ISupportRequest[]>;
    sendMessage(dto: SendMessageDto): Promise<Message>;
    getMessages(supportRequest: ID): Promise<Message[]>;
    subscribe(
        cb: (supportRequest: SupportRequest, message: Message) => void,
    ): () => void;
}

interface ISupportRequestsClientService {
    createSupportRequest(
        dto: CreateSupportRequestDto,
    ): Promise<Partial<ISupportRequestRes>>;
    markMessagesAsRead(dto: MarkMessagesAsReadDto): Promise<TUnreadCountRes>;
    getUnreadCount(supportRequest: ID): Promise<number>;
}

interface ISupportRequestsEmployeeService {
    markMessagesAsRead(
        dto: MarkMessagesAsReadDto,
    ): Promise<{ succes: boolean; unreadCount: number }>;
    getUnreadCount(supportRequest: ID): Promise<number>;
    closeRequest(supportRequest: ID): Promise<void>;
}
```

---

1. Метод `ISupportRequestClientService.getUnreadCount` возвращает количество сообщений, которые были отправлены любым сотрудником поддержки и не отмечены прочитанным.
2. Метод `ISupportRequestClientService.markMessagesAsRead` выставляет текущую дату в поле readAt всем сообщениям, которые не были прочитаны и были отправлены не пользователем.
3. Метод `ISupportRequestEmployeeService.getUnreadCount` возвращает количество сообщений, которые были отправлены пользователем и не отмечены прочитанными.
4. Метод `ISupportRequestEmployeeService.markMessagesAsRead` выставляет текущую дату в поле readAt всем сообщениям, которые не были прочитаны и были отправлены пользователем.
5. Метод `ISupportRequestEmployeeService.closeRequest` меняет флаг `isActive` на `false`.
6. Оповещения реализованы через механизм `EventEmitter`.

## 2. Описание модулей WEB API

## 2.1. API Модуля «Гостиницы»

Оформлено в виде отдельного NestJS-модуля.

### **Ограничения**

Если пользователь не аутентифицирован или его роль `client`, то при поиске всегда используется флаг `isEnabled: true`.

### **2.1.1. Поиск номеров**

#### **Описание**

Основной API для поиска номеров.

#### **Адрес**

```http
GET /api/common/hotel-rooms
```

#### **Query-параметры**

- limit — количество записей в ответе;
- offset — сдвиг от начала списка;
- hotel — ID гостиницы для фильтра.

#### **Формат ответа**

```json
[
  {
    "id": string,
    "description": string,
    "images": [string],
    "hotel": {
      "id": string,
      "title": string
    }
  }
]
```

#### **Доступ**

Доступно всем пользователям, включая неаутентифицированных.

### **2.1.2. Информация о конкретном номере**

#### **Описание**

Получение подробной информации о номере.

#### **Адрес**

```http
GET /api/common/hotel-rooms/:id
```

#### **Query-параметры**

Отсутствуют.

#### **Формат ответа**

```json
{
  "id": string,
  "description": string,
  "images": [string],
  "hotel": {
    "id": string,
    "title": string,
    "description": string
  }
}
```

#### **Доступ**

Доступно всем пользователям, включая неаутентифицированных.

### **2.1.3. Добавление гостиницы**

#### **Описание**

Добавление гостиницы администратором.

#### **Адрес**

```http
POST /api/admin/hotels/
```

#### **Body-параметры**

```json
{
  "title": string,
  "description": string
}
```

#### **Формат ответа**

```json
{
  "id": string,
  "title": string,
  "description": string
}
```

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `admin`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `admin`.

### **2.1.4. Получение списка гостиниц**

#### **Описание**

Получение списка гостиниц администратором.

#### **Адрес**

```http
GET /api/admin/hotels/
```

#### **Query-параметры**

- limit - количество записей в ответе;
- offset - сдвиг от начала списка.

#### **Формат ответа**

```json
{
  "id": string,
  "title": string,
  "description": string
}
```

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `admin`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `admin`.

### **2.1.5. Изменение описания гостиницы**

#### **Описание**

Изменение описания гостиницы администратором.

#### **Адрес**

```http
PUT /api/admin/hotels/:id
```

#### **Body-параметры**

```json
{
  "title": string,
  "description": string
}
```

#### **Формат ответа**

```json
{
  "id": string,
  "title": string,
  "description": string
}
```

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `admin`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `admin`.

### **2.1.6. Добавление номера**

#### **Описание**

Добавление номера гостиницы администратором.

#### **Адрес**

```http
POST /api/admin/hotel-rooms/
```

#### **Body-параметры**

Этот запрос предполагает загрузку файлов и должен использовать формат `multipart/form-data`.

```form-data
description: string
hotelId: string
images[]: File
```

#### **Формат ответа**

```json
{
  "id": string,
  "description": string,
  "images": [string],
  "isEnabled": boolean,
  "hotel": {
    "id": string,
    "title": string,
    "description": string
  }
}
```

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `admin`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `admin`.

### **2.1.7. Изменение описания номера**

#### **Описание**

Изменение описания номера гостиницы администратором.

#### **Адрес**

```http
PUT /api/admin/hotel-rooms/:id
```

#### **Body-параметры**

Этот запрос предполагает загрузку файлов и дожен использовать формат `multipart/form-data`.

```form-data
description: string
hotelId: string
isEnabled: boolean
images[]: File | string
```

При обновлении может быть отправлен одновременно список ссылок на уже загруженные картинки и список файлов с новыми картинками.

При использовании [`multer`](https://docs.nestjs.com/techniques/file-upload) список загруженных файлов можно получить через `@UploadedFiles()`. Тогда список объединяется со списком, который пришёл в `body`.

#### **Формат ответа**

```json
{
  "id": string,
  "description": string,
  "images": [string],
  "isEnabled": boolean,
  "hotel": {
    "id": string,
    "title": string,
    "description": string
  }
}
```

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `admin`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `admin`.

### 2.2. API Модуля «Бронирование»

Должно быть оформлено в виде отдельного NestJS-модуля.

### **2.2.1. Бронирование номера клиентом**

#### **Описание**

Создаёт бронь на номер на выбранную дату для текущего пользователя.

#### **Адрес**

```http
POST /api/client/reservations
```

#### **Body-параметры**

```json
{
  "hotelRoom": string,
  "startDate": string,
  "endDate": string
}
```

#### **Формат ответа**

```json
{
  "startDate": string,
  "endDate": string,
  "hotelRoom": {
    "description": string,
    "images": [string]
  },
  "hotel": {
    "title": string,
    "description": string
  }
}
```

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `client`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `client`;
- `400` - если номера с указанным ID не существует или он отключён.

### **2.2.2. Список броней текущего пользователя**

#### **Описание**

Список броней текущего пользователя.

#### **Адрес**

```http
GET /api/client/reservations
```

#### **Формат ответа**

```json
[
  {
    "startDate": string,
    "endDate": string,
    "hotelRoom": {
      "description": string,
      "images": [string]
    },
    "hotel": {
      "title": string,
      "description": string
    }
  }
]
```

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `client`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `client`.

### **2.2.3. Отмена бронирования клиентом**

#### **Описание**

Отменяет бронь пользователя.

#### **Адрес**

```http
DELETE /api/client/reservations/:id
```

#### **Формат ответа**

Пустой ответ.

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `client`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `client`;
- `403` - если `ID` текущего пользователя не совпадает с `ID` пользователя в брони;
- `400` - если брони с указанным ID не существует.

### **2.2.4. Список броней конкретного пользователя**

#### **Описание**

Список броней конкретного пользователя.

#### **Адрес**

```http
GET /api/manager/reservations/:userId
```

#### **Формат ответа**

```json
[
  {
    "startDate": string,
    "endDate": string,
    "hotelRoom": {
      "description": string,
      "images": [string]
    },
    "hotel": {
      "title": string,
      "description": string
    }
  }
]
```

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `manager`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `manager`.

### **2.2.5. Отмена бронирования менеджером**

#### **Описание**

Отменяет бронь пользователя по id брони.

#### **Адрес**

```http
DELETE /api/manager/reservations/:id
```

#### **Формат ответа**

Пустой ответ.

#### **Доступ**

Доступно только аутентифицированным пользователям с ролью `manager`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `manager`;
- `400` - если брони с указанным ID не существует.

## 2.3. API Модуля «Аутентификация и авторизация»

Оформлено в виде отдельного NestJS-модуля.

Модуль «Аутентификация и авторизация» предназначен для:

- управления сессией пользователя,
- регистрации пользователей.

Хранение сессии реализовано посредством библиотеки passport.js с хранением сессии в памяти приложения.

Аутентификация пользователя производится с помощью модуля «Пользователи». Каждому пользователю назначается одна из ролей - клиент, администратор, консультант. Роль admin и manager назначает администратор БД.

### **2.3.1. Вход**

#### **Описание**

Стартует сессию пользователя и выставляет Cookies.

#### **Адрес**

```http
POST /api/auth/login
```

#### **Body-параметры**

```json
{
  "email": string,
  "password": string
}
```

#### **Формат ответа**

```json
{
  "email": string,
  "name": string,
  "contactPhone": string
}
```

#### **Доступ**

Доступно только не аутентифицированным пользователям.

#### **Ошибки**

- `401` - если пользователя с указанным email не существует или пароль неверный.

### **2.3.2. Выход**

#### **Описание**

Завершает сессию пользователя и удаляет Cookies.

#### **Адрес**

```http
POST /api/auth/logout
```

#### **Формат ответа**

Пустой ответ.

#### **Доступ**

Доступно только аутентифицированным пользователям.

### **2.3.3. Регистрация**

#### **Описание**

Позволяет создать пользователя с ролью `client` в системе.

#### **Адрес**

```http
POST /api/client/register
```

#### **Body-параметры**

```json
{
  "email": string,
  "password": string,
  "name": string,
  "contactPhone": string
}
```

#### **Формат ответа**

```json
{
  "id": string,
  "email": string,
  "name": string
}
```

#### **Доступ**

Доступно только не аутентифицированным пользователям.

#### **Ошибки**

- `400` - если email уже занят.

## 2.4. API Модуля «Управление пользователями»

### **2.4.1. Создание пользователя**

#### **Описание**

Позволяет пользователю с ролью `admin` создать пользователя в системе.

#### **Адрес**

```http
POST /api/admin/users/
```

#### **Body-параметры**

```json
{
  "email": string,
  "password": string,
  "name": string,
  "contactPhone": string,
  "role": string
}
```

#### **Формат ответа**

```json
{
  "id": string,
  "email": string,
  "name": string,
  "contactPhone": string,
  "role": string
}
```

#### **Доступ**

Доступно только пользователям с ролью `admin`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не `admin`.

### **2.4.2. Получение списка пользователей**

#### **Описание**

Позволяет пользователю с ролью `admin` создать пользователя в системе.

#### **Адрес**

```http
GET /api/admin/users/
GET /api/manager/users/
```

#### **Query-параметры**

- limit - количество записей в ответе;
- offset - сдвиг от начала списка;
- name - фильтр по полю;
- email - фильтр по полю;
- contactPhone - фильтр по полю.

#### **Формат ответа**

```json
[
  {
    "id": string,
    "email": string,
    "name": string,
    "contactPhone": string
  }
]
```

#### **Доступ**

```http
GET /api/admin/users/
```

Доступно только пользователям с ролью `admin`.

```http
GET /api/manager/users/
```

Доступно только пользователям с ролью `manager`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не подходит.

## 2.5. API модуля «Чат с техподдрежкой»

### **2.5.1. Создание обращения в поддержку**

#### **Описание**

Позволяет пользователю с ролью `client` создать обращение в техподдержку.

#### **Адрес**

```http
POST /api/client/support-requests/
```

#### **Body-параметры**

```json
{
  "text": string
}
```

#### **Формат ответа**

```json
[
  {
    "id": string,
    "createdAt": string,
    "isActive": boolean,
    "hasNewMessages": boolean
  }
]
```

#### **Доступ**

Доступно только пользователям с ролью `client`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не подходит.

### **2.5.2. Получение списка обращений в поддержку для клиента**

#### **Описание**

Позволяет пользователю с ролью `client` получить список обращений для текущего пользователя.

#### **Адрес**

```http
GET /api/client/support-requests/
```

#### **Query-параметры**

- limit - количество записей в ответе;
- offset - сдвиг от начала списка;
- isActive - фильтр по полю.

#### **Формат ответа**

```json
[
  {
    "id": string,
    "createdAt": string,
    "isActive": boolean,
    "hasNewMessages": boolean
  }
]
```

#### **Доступ**

Доступно только пользователям с ролью `client`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не подходит.

### **2.5.3. Получение списка обращений в поддержку для менеджера**

#### **Описание**

Позволяет пользователю с ролью `manager` получить список обращений от клиентов.

#### **Адрес**

```http
GET /api/manager/support-requests/
```

#### **Query-параметры**

- limit - количество записей в ответе;
- offset - сдвиг от начала списка;
- isActive - фильтр по полю.

#### **Формат ответа**

```json
[
  {
    "id": string,
    "createdAt": string,
    "isActive": boolean,
    "hasNewMessages": boolean,
    "client": {
      "id": string,
      "name": string,
      "email": string,
      "contactPhone": string
    }
  }
]
```

#### **Доступ**

Доступно только пользователям с ролью `manager`.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не подходит.

### **2.5.4. Получение истории сообщений из обращения в техподдержку**

#### **Описание**

Позволяет пользователю с ролью `manager` или `client` получить все сообщения из чата.

#### **Адрес**

```http
GET /api/common/support-requests/:id/messages
```

#### **Формат ответа**

```json
[
  {
    "id": string,
    "createdAt": string,
    "text": string,
    "readAt": string,
    "author": {
      "id": string,
      "name": string
    }
  }
]
```

#### **Доступ**

Доступно только пользователям с ролью `manager` и пользователю с ролью `client`, который создал обращение.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не подходит.

### **2.5.5. Отправка сообщения**

#### **Описание**

Позволяет пользователю с ролью `manager` или `client` отправлять сообщения в чат.

#### **Адрес**

```http
POST /api/common/support-requests/:id/messages
```

#### **Body-параметры**

```json
{
  "text": string
}
```

#### **Формат ответа**

```json
[
  {
    "id": string,
    "createdAt": string,
    "text": string,
    "readAt": string,
    "author": {
      "id": string,
      "name": string
    }
  }
]
```

#### **Доступ**

Доступно только пользователям с ролью `manager` и пользователю с ролью `client`, который создал обращение.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не подходит.

### **2.5.6. Отправка события, что сообщения прочитаны**

#### **Описание**

Позволяет пользователю с ролью `manager` или `client` отправлять отметку, что сообщения прочитаны.

#### **Адрес**

```http
POST /api/common/support-requests/:id/messages/read
```

#### **Body-параметры**

```json
{
  "createdBefore": string
}
```

#### **Формат ответа**

```json
{
  "success": true
}
```

#### **Доступ**

Доступно только пользователям с ролью `manager` и пользователю с ролью `client`, который создал обращение.

#### **Ошибки**

- `401` - если пользователь не аутентифицирован;
- `403` - если роль пользователя не подходит.

### **2.5.7. Подписка на сообщения из чата техподдержки**

#### **Описание**

Позволяет пользователю с ролью `manager` или `client` получать новые сообщения в чате через WebSocket.

#### **Команда**

message: subscribeToChat
payload: chatId

#### **Формат ответа**

```json
{
  "id": string,
  "createdAt": string,
  "text": string,
  "readAt": string,
  "author": {
    "id": string,
    "name": string
  }
}
```

#### **Доступ**

Доступно только пользователям с ролью `manager` и пользователю с ролью `client`, который создал обращение.

## Запуск приложения

Для запуска приложения в корне проекта находятся следующие файлы:

- `package.json` и `package-lock.json` с описанными зависимостями,
- `Dockerfile` для сборки образа приложения,
- `docker-compose.dev.yml` с сервисом приложения и сервисом MondoDB в режиме разработки,
- `docker-compose.yml` с сервисом приложения и сервисом MondoDB,
- `README.me` с описанием проекта и вариантами его запуска.

Настройка приложения производиться через переменные окружения.

Список переменных окружения описан в файле `.env-example`. Этот файл не содержит значений.
Запуск команд в файле `commands.md`.
В Dev-режиме доступен front-end-интерфейс по http://localhost/api/ для тестирования сокета.
В папке postman коллекция запросов к API.
