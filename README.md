## Base Url: https://ft-potluck-planner-backend.herokuapp.com/
| AUTH | URL                | Requires                                  | Restrictions | Returns                                                 |
|------|--------------------|-------------------------------------------|--------------|---------------------------------------------------------|
| POST | /api/auth/register | -username<br>-password                    | None         | Newly created user with <br>auto-generated userId       |
| POST | /api/auth/login    | -username<br>-password                    | None         | Welcome message and <br>JWT token for authorization     |
---
## Potluck End-Points
| Users  | URL                       | Requires                                                                        | Restrictions | Returns                                               |
|--------|---------------------------|---------------------------------------------------------------------------------|--------------|-------------------------------------------------------|
| GET    | /api/potlucks/            | N/A                                                                             | -Valid Token | Object Array of all potlucks <br> including items and guests
| GET    | /api/potlucks/:id         | N/A                                                                             | -Valid Token | Individual potluck object<br>including items and guests|
| POST   | /api/potlucks/            | { potluck_name: string }<br> optional -<br> potluck_date: date,<br> potluck_time: time,<br> potluck_location: string| -Valid Token | Object of newly<br>created potluck|
| PUT    | /api/potlucks/:id         | -Any of the<br>keys (ex. potluck_name)                                      | -Valid Token | Single object of updated potluck<br>including items and guests|
| DELETE | /api/potlucks/:id         | N/A                                                                             | -Valid Token | Deleted potluck                                       |

## Items End-Points
| Classes | URL                          | Requires                                 | Restrictions                            | Returns                                                         |
|---------|------------------------------|------------------------------------------|-----------------------------------------|-----------------------------------------------------------------|
| POST    | /api/potlucks/:id/items      | { item_name: string }                    | -Valid Token and<br>is_organizer (creator) of potluck| item_id and item_name                              |
| PUT     | /api/potlucks/items/:itemId  | updated key value pair (ex. { item_name: string}<br>or { select_item: true } to have user select item to bring)| -Valid Token | updated item (if user_id is not null, item is taken) |

## Guests End-Points
| Classes | URL                          | Requires                                           | Restrictions                        | Returns                                                     |
|---------|------------------------------|----------------------------------------------------|-------------------------------------|-------------------------------------------------------------|
| POST    | /api/potlucks/:id/guests     | { username: string }                               | -Valid Token and<br>is_organizer (creator) of potluck<br> and username exists in database | success message |
| PUT     | /api/potlucks/:id/guests     | N/A                                                | -Valid Token                        | success message (changes is_going key to true for user)     |