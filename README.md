# Tech Blog

## Description


## Database Breakdown


## Usage


## Learning Points

* Establishing relationships between tables and their columns in Sequelize is a little tricky. Even though I know a User has many Comments, I still had to establish that a Comment belongs to a User. This allowed nested eager loading possible as seen [below](#nested-eager-loading)

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

## Credits

[Sequelize nested eager loading](https://stackoverflow.com/a/33944634)

[Passing in a parameter in event listener](https://plainenglish.io/blog/passing-arguments-to-event-listeners-in-javascript-1a81bc397ecb)

### Resources

[cookie secure help](https://stackoverflow.com/questions/40324121/express-session-secure-true)

[Potential heroku cookie secure](https://stackoverflow.com/a/63105481)