const IDLE_TIME = 60 * 60; // How many seconds until a user is logged out when just sitting idle on the website
const COUNTDOWN_INTERVAL = 1000; // 1 second

export function setupIdleTimer() {
    // console.log("setup idle timer for", IDLE_TIME, "seconds");
    // console.log("counds down every", COUNTDOWN_INTERVAL, "milliseconds")

    let count = IDLE_TIME;
    const timer = setInterval(async () => {
        if (count === 0) {
            console.log("idle time reached");
            clearInterval(timer);

            await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            document.location.reload();
            return;
        } else {
            count--;
            // console.log("req.session.idleTimer:", count);
        }

    }, COUNTDOWN_INTERVAL);
}