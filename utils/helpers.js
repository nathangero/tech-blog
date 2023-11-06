module.exports = {
    debug(value) {
        console.log(value);
        console.log(JSON.stringify(value));
    },
    formatDate(date, showTime) {
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
        
        // For 24-hour time, put a 0 before the digit if the digit is less than 10.
        const hour = String(date.getHours()).length < 2 ? `0${date.getHours()}` : date.getHours();
        const minute = String(date.getMinutes()).length < 2 ? `0${date.getMinutes()}` : date.getMinutes();

        return showTime ? `${month} ${day}, ${year} - ${hour}:${minute}` : `${month} ${day}, ${year}`
    },
    canAddPost(isLoggedIn, fromDashboard) {
        return isLoggedIn && fromDashboard;
    },
    canAddComment(isLoggedIn, fromHomepage) {
        return isLoggedIn && fromHomepage;
    }
}