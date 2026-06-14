const events = [
    {
        id: 1,
        name: "Hackathon 2026",
        date: "2026-06-20",
        location: "Main Auditorium",
    },
    {
        id: 2,
        name: "AI Workshop",
        date: "2026-06-24",
        location: "Lab 3",
    },
    {
        id: 3,
        name: "Coding Contest",
        date: "2026-06-28",
        location: "Computer Center",
    },
    {
        id: 4,
        name: "Startup Networking Night",
        date: "2026-07-02",
        location: "Innovation Center",
    },
];

function getUpcomingEvents() {
    return events;
}

module.exports = { getUpcomingEvents };