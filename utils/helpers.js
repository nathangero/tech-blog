module.exports = {
    debug(value) {
        console.log(value);
        console.log(JSON.stringify(value));
    },
    formatDate(date) {
        const months = {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "June",
            6: "July",
            7: "Aug",
            8: "Sept",
            9: "Oct",
            10: "Nov",
            11: "Dec"
        }

        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        
        const hour = date.getHours();
        const minute = date.getMinutes();

        return `${month} ${day}, ${year}`
        // return `${month} ${day}, ${year} - ${hour}:${minute}`
    },
    canAddPost(isLoggedIn, fromDashboard) {
        return isLoggedIn && fromDashboard;
    },
    canAddComment(isLoggedIn, fromHomepage) {
        return isLoggedIn && fromHomepage;
    }
}