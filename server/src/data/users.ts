import { faker } from "@faker-js/faker";

export interface User {
    id: string;
    avatar: string;
    first_name: string;
    last_name: string;
    age: number;
    nationality: string;
    hobbies: string[];
}

const NATIONALITIES = [
    "Russian", "French", "German", "British", "American",
    "Spanish", "Italian", "Chinese", "Japanese", "Brazilian",
    "Canadian", "Australian", "Indian", "Mexican", "Dutch",
    "Swedish", "Norwegian", "Polish", "Turkish", "Ukrainian",
    "Portuguese", "Greek", "Swiss", "Belgian", "Austrian",
    "Czech", "Romanian", "Hungarian", "Finnish", "Danish",
];

const HOBBIES = [
    "Reading", "Hiking", "Gaming", "Cooking", "Cycling",
    "Photography", "Painting", "Music", "Swimming", "Yoga",
    "Running", "Chess", "Fishing", "Gardening", "Traveling",
    "Dancing", "Writing", "Drawing", "Surfing", "Climbing",
    "Knitting", "Skiing", "Tennis", "Football", "Volleyball",
    "Meditation", "Archery", "Birdwatching", "Coding", "Pottery",
    "Sculpting", "Origami", "Woodworking", "Baking", "Brewing",
    "Astronomy", "Geocaching", "Parkour", "Boxing", "Fencing",
    "Diving", "Sailing", "Kayaking", "Paragliding", "Rafting",
    "Collecting", "Calligraphy", "Embroidery", "Film-making", "Podcasting",
];

export const ALL_USERS: User[] = Array.from({ length: 500 }, () => ({
    id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 65 }),
    nationality: faker.helpers.arrayElement(NATIONALITIES),
    hobbies: faker.helpers.arrayElements(HOBBIES, {
        min: 0,
        max: 10,
    }),
}));
