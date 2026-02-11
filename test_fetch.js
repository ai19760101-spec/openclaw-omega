const net = require("node:net");
if (typeof net.setDefaultAutoSelectFamily === "function") {
    console.log("Setting setDefaultAutoSelectFamily(false)...");
    net.setDefaultAutoSelectFamily(false);
}
const url = "https://api.telegram.org/bot8006204796:AAEwPWDosudQSjYZtW2VSYK7CByzeTPv3nI/getMe";

async function test() {
    console.log("Testing fetch to:", url);
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log("Success:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Fetch failed!");
        console.error("Name:", err.name);
        console.error("Message:", err.message);
        if (err.cause) {
            console.error("Cause:", err.cause);
        } else {
            console.error("No cause provided.");
        }
    }
}

test();
