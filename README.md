## Getting started
- clone repo
- cd into 'potluck-planner-backend' directory
- run 'npm install'
- run 'npm start' or 'npm run server' for nodemon

## Contributing
- Clone down the 'potluck-planner-backend' repo WITHOUT FORKING.
- Point your terminal to your local folder.
- Checkout a new branch. (Branches should be made for each new feature/subject you're working on.)
- Once you've finished your feature or section, (Remembering to make commits along the way.) push your branch up to Github.
- Make your pull request - a team member will approve it.
- In your terminal, checkout the main branch again. (git checkout main)
- Delete your local copy of your old branch. (EX: git branch -d navbar)
- REMEMBER: Pull down any new changes on the remote repo BEFORE starting work on a new feature/component. This takes two commands: (git fetch --all) & (git pull origin main)
- Checkout a new branch and start work on your new feature


## Potluck Planner App Description
If you have ever tried to organize a potluck through text messages, online to-do lists or spreadsheets, you'll understand why this app is essential. 

In the world of social gatherings and potlucks the "Potluck Planner" is king. This is your place for all things pot luck.

1. As an `organizer` you can create an upcoming `potluck` and invite your friends to attend

2. As an `organizer` you can adjust `date`s, `time`s and `location`s of the potluck

3. As an `organizer` you can use the list feature in my app to add food `items` that you'd like to see at the potluck

4. As a `guest` to a potluck you ca confirm that you're going to the upcoming `event`

5. As a `guest` you can select which `item`s you'd like to be responsible for bringing

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