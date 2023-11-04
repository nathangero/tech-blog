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
            attributes: ["id", "content", "createdAt"],
            include: [ // Get the username of who made the comment
                {
                    model: User,
                    attributes: ["username"]
                }
            ]
        },
    ],
    attributes: {
        include: [
            [
                sequelize.literal(
                    `(SELECT user.username FROM user WHERE post.user_id = user.id)`
                ),
                "post_author",
            ]
        ]
    }
});
```

## Credits

[Sequelize nested eager loading](https://stackoverflow.com/a/33944634)

### Resources

