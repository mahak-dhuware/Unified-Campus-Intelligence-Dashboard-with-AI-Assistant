const books = [
    {
        id: 1,
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        category: "Computer Science",
        available: true,
    },
    {
        id: 2,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Programming",
        available: true,
    },
    {
        id: 3,
        title: "Operating System Concepts",
        author: "Abraham Silberschatz",
        category: "Computer Science",
        available: false,
    },
    {
        id: 4,
        title: "Database System Concepts",
        author: "Abraham Silberschatz",
        category: "Database",
        available: true,
    },
    {
        id: 5,
        title: "Computer Networks",
        author: "Andrew S. Tanenbaum",
        category: "Networking",
        available: true,
    },
    {
        id: 6,
        title: "System Design Interview",
        author: "Alex Xu",
        category: "Software Engineering",
        available: false,
    },
    {
        id: 7,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self Help",
        available: true,
    },
    {
        id: 8,
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        category: "Programming",
        available: true,
    },
];

function getBooks() {
    return books;
}

module.exports = {
    getBooks,
};