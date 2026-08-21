const stages = [
    {
        title: "Stage 1. 반찬 크기를 맞춰라!",

        description:
            "width와 height를 사용해 점선 영역을 정확하게 채우세요.",

        defaultCSS:
`width: 100px;
height: 80px;`,

        allowedProperties: [
            "width",
            "height"
        ],

        hint:
`사용 가능한 속성<br><br>
<code>width</code><br>
<code>height</code>`,

        setup() {

            foodAnchor.style.display = "none";

            target.style.width = "220px";
            target.style.height = "140px";

            target.style.left = "126px";
            target.style.top = "91px";

            food.style.left = "126px";
            food.style.top = "91px";

            food.style.width = "100px";
            food.style.height = "80px";

            resetMargins();
        },

        check() {

            const style = getComputedStyle(food);

            const width =
                parseFloat(style.width);

            const height =
                parseFloat(style.height);

            message.innerHTML =
                `현재 반찬 크기<br>
                width : ${width}px<br>
                height : ${height}px`;

            return (
                Math.abs(width - 220) < 0.1 &&
                Math.abs(height - 140) < 0.1
            );
        }
    },

    {
        title: "Stage 2. 반찬 사이의 간격을 맞춰라!",

        description:
            "margin-left를 사용해 계란말이를 목표 위치까지 이동하세요.",

        defaultCSS:
`margin-left: 0px;`,

        allowedProperties: [
            "margin",
            "margin-left",
            "margin-right",
            "margin-top",
            "margin-bottom"
        ],

        hint:
`두 Box 사이의 외부 공간은
<code>margin</code>입니다.<br><br>

이번 Stage에서는
<code>margin-left</code>를 사용해보세요.`,

        setup() {

            foodAnchor.style.display = "flex";

            foodAnchor.style.left = "70px";
            foodAnchor.style.top = "110px";

            food.style.width = "100px";
            food.style.height = "100px";

            food.style.left = "170px";
            food.style.top = "110px";

            target.style.width = "100px";
            target.style.height = "100px";

            target.style.left = "270px";
            target.style.top = "110px";

            resetMargins();
        },

        check() {

            const foodRect =
                food.getBoundingClientRect();

            const targetRect =
                target.getBoundingClientRect();

            const leftDifference =
                Math.abs(
                    foodRect.left -
                    targetRect.left
                );

            const topDifference =
                Math.abs(
                    foodRect.top -
                    targetRect.top
                );

            const style =
                getComputedStyle(food);

            message.innerHTML =
                `현재 margin-left :
                ${style.marginLeft}<br><br>
                목표 위치까지 이동시켜보세요.`;

            return (
                leftDifference < 1 &&
                topDifference < 1
            );
        }
    }
];

const food =
    document.getElementById("food");

const foodAnchor =
    document.getElementById("foodAnchor");

const target =
    document.getElementById("target");

const cssInput =
    document.getElementById("cssInput");

const runButton =
    document.getElementById("runButton");

const nextButton =
    document.getElementById("nextButton");

const message =
    document.getElementById("message");

const missionTitle =
    document.getElementById("missionTitle");

const missionDescription =
    document.getElementById("missionDescription");

const levelText =
    document.getElementById("levelText");

const hint =
    document.getElementById("hint");


let currentStage = 0;


function loadStage() {

    const stage = stages[currentStage];

    levelText.textContent =
        `Level ${currentStage + 1} / ${stages.length}`;

    missionTitle.textContent =
        stage.title;

    missionDescription.textContent =
        stage.description;

    cssInput.value =
        stage.defaultCSS;

    hint.innerHTML =
        stage.hint;

    message.innerHTML =
        "CSS를 수정하고 Run CSS를 눌러보세요.";

    nextButton.style.display =
        "none";

    stage.setup();
}


function runCSS() {

    const stage =
        stages[currentStage];

    const css =
        cssInput.value;


    stage.allowedProperties.forEach(
        property => {
            food.style[property] = "";
        }
    );


    const declarations =
        css.split(";");

    let hasError = false;


    declarations.forEach(
        declaration => {

            declaration =
                declaration.trim();

            if (declaration === "") {
                return;
            }


            const colonIndex =
                declaration.indexOf(":");

            if (colonIndex === -1) {

                hasError = true;

                return;
            }


            const property =
                declaration
                    .slice(0, colonIndex)
                    .trim();

            const value =
                declaration
                    .slice(colonIndex + 1)
                    .trim();


            if (
                !stage.allowedProperties
                    .includes(property)
            ) {

                hasError = true;

                return;
            }


            food.style[property] =
                value;
        }
    );


    if (hasError) {

        message.innerHTML =
            `<span class="error">
                이 Stage에서는 사용할 수 없는 CSS 속성이 있습니다.
            </span>`;

        return;
    }


    const success =
        stage.check();


    if (success) {
        stageClear();
    }
}


function stageClear() {

    if (
        currentStage ===
        stages.length - 1
    ) {

        message.innerHTML =
            `<span class="success">
                🎉 모든 Stage 완료!
            </span>`;

        nextButton.style.display =
            "none";

        return;
    }


    message.innerHTML =
        `<span class="success">
            🎉 Stage Clear!
        </span>`;


    nextButton.style.display =
        "block";
}


nextButton.addEventListener(
    "click",
    function () {

        currentStage++;

        loadStage();
    }
);


runButton.addEventListener(
    "click",
    runCSS
);


function resetMargins() {

    food.style.margin = "0";
    food.style.marginLeft = "0";
    food.style.marginRight = "0";
    food.style.marginTop = "0";
    food.style.marginBottom = "0";
}


loadStage();