const menus = {
    Monday: {
        breakfast: "Poha",
        lunch: "Paneer Butter Masala with Rice",
        snacks: "Samosa",
        dinner: "Dal Rice",
    },

    Tuesday: {
        breakfast: "Idli Sambhar",
        lunch: "Rajma Chawal",
        snacks: "Bread Pakora",
        dinner: "Roti Sabzi",
    },

    Wednesday: {
        breakfast: "Upma",
        lunch: "Chole Bhature",
        snacks: "Sandwich",
        dinner: "Khichdi",
    },

    Thursday: {
        breakfast: "Aloo Paratha",
        lunch: "Veg Biryani",
        snacks: "Cutlet",
        dinner: "Dal Tadka",
    },

    Friday: {
        breakfast: "Dosa",
        lunch: "Jeera Rice",
        snacks: "Samosa",
        dinner: "Paneer Curry",
    },

    Saturday: {
        breakfast: "Puri Sabzi",
        lunch: "Fried Rice",
        snacks: "Maggie",
        dinner: "Roti Dal",
    },

    Sunday: {
        breakfast: "Chole Kulche",
        lunch: "Special Thali",
        snacks: "Cookies",
        dinner: "Pulao",
    },
};

function getTodaysMenu() {
    const day = new Date().toLocaleDateString(
        "en-US",
        { weekday: "long" }
    );

    return {
        day,
        ...menus[day],
    };
}

module.exports = { getTodaysMenu };