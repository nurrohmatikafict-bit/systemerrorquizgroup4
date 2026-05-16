// ================= AUDIO =================

const clickSound = new Audio("assets/click.mp3");

const errorSound = new Audio("assets/error.mp3");

const glitchSound = new Audio("assets/glitch.mp3");


// volume
clickSound.volume = 0.5;
errorSound.volume = 0.6;
glitchSound.volume = 0.7;

// ================= QUIZ =================

const QuizDatabase = [

    {
        q:"HTML adalah singkatan dari?",
        a:[
            "Hyper Text Markup Language",
            "High Transfer Machine Language",
            "Hyperlink Machine Language",
            "Home Tool Markup Language"
        ],
        right:0
    },

    {
        q:"Fungsi CSS adalah?",
        a:[
            "Mengatur tampilan website",
            "Membuat database",
            "Mengedit audio",
            "Mengatur server"
        ],
        right:0
    },

    {
        q:"JavaScript digunakan untuk?",
        a:[
            "Interaksi website",
            "Menggambar",
            "Membuat hardware",
            "Editing video"
        ],
        right:0
    },

    {
        q:"Format gambar transparan adalah?",
        a:[
            "JPG",
            "PNG",
            "BMP",
            "TIFF"
        ],
        right:1
    },

    {
        q:"Software desain grafis vector adalah?",
        a:[
            "Photoshop",
            "Illustrator",
            "Audacity",
            "Premiere"
        ],
        right:1
    },

    {
        q:"FPS pada game berarti?",
        a:[
            "File Process System",
            "Frames Per Second",
            "Fast Program Scan",
            "Frame Pixel Size"
        ],
        right:1
    },

    {
        q:"Bahasa pemrograman website?",
        a:[
            "HTML",
            "CSS",
            "JavaScript",
            "Semua benar"
        ],
        right:3
    },

    {
        q:"Resolusi Full HD adalah?",
        a:[
            "1280x720",
            "1366x768",
            "1920x1080",
            "2560x1440"
        ],
        right:2
    },

    {
        q:"Audio digital disimpan dalam format?",
        a:[
            "MP3",
            "PNG",
            "SVG",
            "HTML"
        ],
        right:0
    },

    {
        q:"Elemen multimedia pada website meliputi?",
        a:[
            "Audio",
            "Video",
            "Animasi",
            "Semua benar"
        ],
        right:3
    }

];

let currentQuiz = 0;
let score = 0;
let sanity = 100;

// ================= LOADING =================

window.onload = () => {

    let progress = 0;

    let bar = document.getElementById("load-bar-fill");

    let interval = setInterval(() => {

        progress += 10;

        bar.style.width = progress + "%";

        if(progress >= 100){

            clearInterval(interval);

            document.getElementById("boot-prompt").onclick = () => {

                changeScreen("scr-menu");

            };

        }

    },200);

};

// ================= SCREEN =================

function changeScreen(id){

    document.querySelectorAll(".os-screen").forEach(screen => {

        screen.classList.remove("active");

    });

    document.getElementById(id).classList.add("active");

}

// ================= START GAME =================

function startGameWithSound(){

    // reset click
    clickSound.currentTime = 0;

    // play click
    clickSound.play();

    // buka game
    changeScreen("scr-desktop");

    renderQuiz();

}

// ================= QUIZ RENDER =================

function renderQuiz(){

    if(currentQuiz >= QuizDatabase.length){

        alert(`SYSTEM RESTORED
            FINAL SCORE : ${score}
            SANITY LEFT : ${sanity}`
        );

        location.reload();

        return;
    }

    let data = QuizDatabase[currentQuiz];

    document.getElementById("quiz-question").innerText = data.q;

    let options = document.getElementById("quiz-options");

    options.innerHTML = "";

    data.a.forEach((answer,index)=>{

        let btn = document.createElement("button");

        btn.className = "answer-btn";

        btn.innerText = answer;

        btn.onclick = () => {

            checkAnswer(index,data.right);

        };

        options.appendChild(btn);

    });

}

// ================= CHECK ANSWER =================

function checkAnswer(selected,correct){

    clickSound.play();

    if(selected === correct){

        score += 100;

        document.getElementById("score-display").innerText = score;

        currentQuiz++;

        renderQuiz();

    }else{

        errorSound.play();

        glitchSound.currentTime = 0;
        
        glitchSound.play();

        sanity -= 25;

        document.getElementById("sanity-display").innerText = sanity;

        document.body.classList.add("glitch-txt");

        setTimeout(()=>{

            document.body.classList.remove("glitch-txt");

        },300);

        if(sanity <= 0){

            alert("SYSTEM FAILURE");

            location.reload();

        }

    }

}

// ================= HELP =================

function openHelp(){

    alert(
        "Jawab semua soal dengan benar untuk memperbaiki sistem."
    );

}