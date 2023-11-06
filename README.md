# Tech Blog

## Description


## Database Breakdown


## Usage


## Learning Points

* Establishing relationships between tables and their columns in Sequelize is a little tricky. Even though I know a User has many Comments, I still had to establish that a Comment belongs to a User. This allowed nested eager loading possible as seen [below](#nested-eager-loading)
* Using Bulma was easier to work with than Bootstrap surprisingly enough.
* If two elements share the same HTML id, they can**NOT** share the same event listener. Only the first one delcared in the HTML will get the listener attached. So, I had to create two different ids for the Logout button.
* Using `role="button"` tag for a `<a>` tag is really helpful for navigation bars. It let me keep the style of the nav bar elements but giving me the attributes of a button like `.addEventListener`

## Code Snippets

### Nested Eager Loading

Nested `findAll()` call to get all Posts with their Comments, and the Comments with the User that created them.
```js
const data = await Post.findAll({
    include: [
        {
            model: Comment,
            attributes: [
                "id",
                "content",
                "createdAt",
                [sequelize.literal(
                    `(SELECT user.username FROM user WHERE comments.user_id = user.id)`
                ), "comment_author"],
            ]
        },
    ],
    attributes: [
        "id",
        "title",
        "content",
        "createdAt",
        "updatedAt",
        [sequelize.literal(
            `(SELECT user.username FROM user WHERE post.user_id = user.id)`
        ), "post_author"],
    ]
});
```

## Future Ideas

- Adding a click count to each post. So, adding a new column in the db to account for the amount of times a blog has been clicked on.
- Showing how many comments a blog post has on the Homepage and Dashboard

## Credits

[Sequelize nested eager loading](https://stackoverflow.com/a/33944634)

[Passing in a parameter in event listener](https://plainenglish.io/blog/passing-arguments-to-event-listeners-in-javascript-1a81bc397ecb)

### Resources

[cookie secure help](https://stackoverflow.com/questions/40324121/express-session-secure-true)

[Potential heroku cookie secure](https://stackoverflow.com/a/63105481)

[Bulma colors](https://bulma.io/documentation/helpers/color-helpers/)