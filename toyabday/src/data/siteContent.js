export const siteContent = {
    siteTitle: "Happy Birthday Sumedha",
    colors: {
        bg: "bg-blush-pink",
        text: "text-deep-maroon",
        accent: "text-rose-accent"
    },
    sections: [
        {
            id: "intro",
            type: "intro",
            duration: 12000, // Increased to 12s
            content: {
                greeting: "Hi Sumedha...",
                subgreeting: "I made something small for you.",
                heading: "Happy Birthday.",
                note: "Please read this patiently... take your time."
            }
        },
        {
            id: "wish",
            type: "wish",
            duration: 16000, // Increased to 16s for reading
            content: {
                title: "Today is your day.",
                lines: [
                    "I hope life keeps you protected from the things you never deserved.",
                    "I hope you always stay this soft, kind, beautiful soul.",
                    "And I hope you get the kind of happiness that feels calm... not temporary.",
                    "You deserve that, Dr. Madam."
                ]
            }
        },
        {
            id: "photo",
            type: "photo",
            duration: 14000,
            image: "/sumedha1.png",
            caption: "This is you.",
            content: {
                lines: [
                    "The same you... who can make a normal moment feel better.",
                    "The same you... who somehow feels like peace.",
                    "I'm really glad you exist."
                ]
            }
        },
        {
            id: "doctor",
            type: "doctor",
            duration: 15000,
            image: "/sumedha_doctor.png",
            caption: "And this is you... very soon.",
            content: {
                heading: "Doctor Sumedha.",
                lines: [
                    "Not just successful... but the kind of doctor people will remember for being kind.",
                    "I know you'll make your parents proud.",
                    "And honestly... you'll make yourself proud too."
                ]
            }
        },
        {
            id: "final",
            type: "final",
            duration: 0, // No auto advance, stays here
            content: {
                heading: "Happy Birthday, Doctor  Madam.",
                wishes: [
                    "May your life feel lighter.",
                    "May your dreams become real... one by one.",
                    "May you always be surrounded by people who choose you.",
                    "And even on your worst days... may you still feel loved."
                ],
                signature: "From someone who genuinely smiles a little more...",
                footer: "Made with care"
            },
            buttons: {
                replay: "Replay",
                end: "End"
            }
        }
    ]
};
