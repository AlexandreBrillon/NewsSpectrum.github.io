// import outputJson from './output.json' assert { type: 'json' };

document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener for the 'keyup' event on the input field
    document.getElementById("keyword").addEventListener("keyup", function (event) {
        // Check if the pressed key is 'Enter' (key code 13)
        if (event.key === "Enter") {
            // Prevent the default form submission behavior
            event.preventDefault();

            // Trigger the fetchHeadlines function
            fetchHeadlines();
        }
    });

    // Add an event listener for the 'click' event on the Home button
    document.getElementById("homeButton").addEventListener("click", function () {
        // Call the resetPage function
        resetPage();
    });
});


function resetPage() {
    // Reload the page
    location.reload();
}


function fetchHeadlines() {
    const keyword = document.getElementById("keyword").value.trim();

    if (!keyword) {
        alert("Please enter a keyword.");
        return;
    }

    // Show loading indicator
    showLoadingIndicator();

    fetch('http://127.0.0.1:8000/output.json', {
        method: 'GET', // or 'GET' depending on your backend
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(json => console.log(json))


    fetch('http://127.0.0.1:5000/api/data', {
        method: 'POST', // or 'GET' depending on your backend
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: keyword }),
    })
    .then(response => response.json())
    .then(headlinesData => {
        hideLoadingIndicator();
        displayHeadlines(headlinesData);
    })
    .catch(error => {
        console.error('Error fetching headlines:', error);
        hideLoadingIndicator();
        alert('Error fetching headlines. Please try again.');
    });

    // Simulate a delay (replace with actual fetch call)
    
        // Placeholder: Simulate receiving headlines from the Python program
        const headlinesData = getSampleHeadlinesData();

        hideLoadingIndicator();
        displayHeadlines(headlinesData);
      // Adjust the duration as needed
}

function getSampleHeadlinesData() {
    // Placeholder: Simulate headlines data from the Python program
    const headlines = Array.from({ length: 3 }, (_, i) => `Headline ${i + 1}`);

    const jsonText = `{
        "Fox News": [
            [
                [
                    70,
                    30
                ],
                [
                    50,
                    50
                ],
                [
                    0,
                    0
                ]
            ],
            [
                "Trump team made ‘early on’ attempts to recruit RFK Jr. as former president's running mate: report",
                "Victor Davis Hanson: $83M 'embarrassing farce' just a taste of what awaits Trump",
                "$83M verdict in E. Jean Carroll case against Trump ignites firestorm: 'Democrats are using the system'"
            ],
            [
                "content1",
                "content2",
                "content3"
            ],
            [
                "link1",
                "link2",
                "link3"
            ]
        ],
        "ABC": [
            [
                [
                    90,
                    10
                ],
                [
                    60,
                    40
                ],
                [
                    0,
                    0
                ]
            ],
            [
                "Jury orders Trump to pay $83.3 million in defamation case",
                "Trump campaigns in Nevada ahead of primary",
                "Trump praises Texas governor as state clashes with White House over immigration"
            ],
            [
                "content1",
                "content2",
                "content3"
            ],
            [
                "link1",
                "link2",
                "link3"
            ]
        ],
        "New York Times": [
            [
                [
                    90,
                    10
                ],
                [
                    60,
                    40
                ],
                [
                    0,
                    0
                ]
            ],
            [
                "Trump and Biden Get Ready for the Very Long Haul",
                "As Biden Judicial Confirmations Slow, Senate Gains Ground on Red-State Judges",
                "Arizona G.O.P. Picks New Leader After Scandal Creates a Vacancy"
            ],
            [
                "content1",
                "content2",
                "content3"
            ],
            [
                "link1",
                "link2",
                "link3"
            ]
        ],
        "New York Post": [
            [
                [
                    20,
                    80
                ],
                [
                    0,
                    0
                ],
                [
                    0,
                    0
                ]
            ],
            [
                "Trump’s team reached out to RFK Jr. ‘early on’ about serving as VP: ‘Wouldn’t write it off’",
                "Georgia rep moves to impeach DA Fani Willis, accuses her of 'Trump Derangement Syndrome'",
                "Trump accuser's case: Letters to the Editor — Jan. 22, 2024"
            ],
            [
                "content1",
                "content2",
                "content3"
            ],
            [
                "link1",
                "link2",
                "link3"
            ]
        ]
    }`;
    
    const data = JSON.parse(jsonText);

    

    return {
        "Fox News": headlines.map((_, index) => {
            const bias = data["Fox News"][0][index];
            const content = data["Fox News"];
            const percentage = getRandomPercentage();
            const color = getTextColorFromBias(percentage);
            return [`${color} Title ${content[1][index]} (${percentage}%)`, `${color} Content ${content[2][index]}`, `${color} href link ${content[3][index]}`];
        }),
        "ABC": headlines.map((_, index) => {
            const bias = data["ABC"][0][index];
            const content = data["ABC"];
            const percentage = getRandomPercentage();
            const color = getTextColorFromBias(percentage);
            return [`${color} Title1 ${content[1][index]} (${percentage}%)`, `${color} Content1 ${content[2][index]}`, `${color} href link1 ${content[3][index]}`];
        }),
        "New York Times": headlines.map((_, index) => {
            const bias = data["New York Times"][0][index];
            const content = data["New York Times"];
            const percentage = getRandomPercentage();
            const color = getTextColorFromBias(percentage);
            return [`${color} Title2 ${content[1][index]} (${percentage}%)`, `${color} Content2 ${content[2][index]}`, `${color} href link2 ${content[3][index]}`];
        }),
        "New York Post": headlines.map((_, index) => {
            const bias = data["New York Post"][0][index];
            const content = data["New York Post"];
            const percentage = getRandomPercentage();
            const color = getTextColorFromBias(percentage);
            return [`${color} Title3 ${content[1][index]} (${percentage}%)`, `${color} Content3 ${content[2][index]}`, `${color} href link3 ${content[3][index]}`];
        })
        
        
        
    };
}

function getRandomPercentage() {
    return Math.floor(Math.random() * 100);
}

function getTextColorFromBias(percentage) {
    if (percentage > 55) {
        return "red"; // Biased towards Republicans
    } else if (percentage < 45) {
        return "blue"; // Biased towards Democrats
    } else {
        return "grey"; // Likelihood/not biased
    }
}



function getColorFromBias(bias) {
    const [republican, democrat] = bias;
    if (republican > democrat) {
        return "red"; // Biased towards Republicans
    } else if (democrat > republican) {
        return "blue"; // Biased towards Democrats
    } else {
        return "grey"; // Likelihood/not biased
    }
}

function displayHeadlines(data) {
    const foxList = document.getElementById("foxList");
    const abcList = document.getElementById("abcList");
    const nytList = document.getElementById("nytList");
    const nypList = document.getElementById("nypList");

    // Clear previous headlines
    foxList.innerHTML = "";
    abcList.innerHTML = "";
    nytList.innerHTML = "";
    nypList.innerHTML = "";

    // Display Fox News headlines
    if (data["Fox News"]) {
        data["Fox News"].forEach((headline, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${headline[0]}`;
            listItem.style.color = headline[0].split(' ')[0]; // Set text color based on bias
            foxList.appendChild(listItem);
        });
    } else {
        foxList.innerHTML = "<li>No headlines found</li>";
    }

    // Display ABC headlines
    if (data["ABC"]) {
        data["ABC"].forEach((headline, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${headline[0]}`;
            listItem.style.color = headline[0].split(' ')[0]; // Set text color based on bias
            abcList.appendChild(listItem);
        });
    } else {
        abcList.innerHTML = "<li>No headlines found</li>";
    }

    // Display New York Times headlines
    if (data["New York Times"]) {
        data["New York Times"].forEach((headline, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${headline[0]}`;
            listItem.style.color = headline[0].split(' ')[0]; // Set text color based on bias
            nytList.appendChild(listItem);
        });
    } else {
        nytList.innerHTML = "<li>No headlines found</li>";
    }

    // Display New York Post headlines
    if (data["New York Post"]) {
        data["New York Post"].forEach((headline, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${headline[0]}`;
            listItem.style.color = headline[0].split(' ')[0]; // Set text color based on bias
            nypList.appendChild(listItem);
        });
    } else {
        nypList.innerHTML = "<li>No headlines found</li>";
    }

    // Scroll to the headlines section
    scrollToHeadlines();
}

function scrollToHeadlines() {
    const headlinesSection = document.getElementById("resultContainer");
    headlinesSection.scrollIntoView({ behavior: "smooth" });
}

function showLoadingIndicator() {
    const loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = "block";
}

function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = "none";
}
