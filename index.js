//VARIABLES
const container = document.getElementById('container');
let dragged;

//CONSTRUCTOR
function Cat(name, picture, count) {
    this.name = name;
    this.picture = picture;
    this.count = count;


    this.initialise = function () {
        //make a frame to drag drop cat containers into
        this.frame = document.createElement('div');
        container.appendChild(this.frame);

        //make a container to store cat
        this.catDiv = document.createElement('div');
        this.catDiv.classList.add('catDiv');
        this.frame.appendChild(this.catDiv);


        //DRAG OVER
        this.catDiv.addEventListener('dragover', function (e) {
            e.preventDefault(this);
        })

        //DRAG START
        this.catDiv.setAttribute('draggable', true);

        this.catDiv.addEventListener('dragstart', function (e) {
            dragged = e.target;
            e.dataTransfer.setData('text/plain', null);
        })

        //DRAG SWAP AND DROP
        this.catDiv.addEventListener('drop', function (e) {

            e.preventDefault();

            let from = dragged.parentNode;
            let to;
            let target = e.target;

            //if not dropping on catDiv itself, ie. dropping on a 'img', then search another layer deep to its parent
            if (e.target.className == "catDiv") {
                to = e.target.parentNode;
            } else if (e.target.parentNode.className == "catDiv") {
                to = e.target.parentNode.parentNode;
                target = e.target.parentNode;
            } else {
                console.log(e.target);
            }

            // swapping
            from.removeChild(dragged);
            to.appendChild(dragged);

            to.removeChild(target);
            from.appendChild(target);
        })


        //make a div to display name of cat
        this.catName = document.createElement('div');
        this.catDiv.appendChild(this.catName);
        this.catName.innerHTML = this.name;
        this.catName.classList.add('cat-name');

        //make img div to display image of cat
        this.catPic = document.createElement('img');
        this.catDiv.appendChild(this.catPic);
        this.catPic.src = this.picture;
        this.catPic.classList.add('cat-pic');
        this.catPic.setAttribute('draggable', false);

        //make div to display total clicks
        this.heart = document.createElement('div');
        this.catDiv.appendChild(this.heart);
        this.heart.innerHTML = '&#xf004';
        this.heart.classList.add('smallHeart');

        this.scoreBoard = document.createElement('div');
        this.catDiv.appendChild(this.scoreBoard);
        this.scoreBoard.innerHTML = `Total Votes: ${this.count}`
        this.scoreBoard.classList.add('clicks');


        //Need closure with a reference to 'this' Cat object for the click event listener to be able to talk to count/ scoreboard/ the object in general
        this.catPic.addEventListener('click', (function (newCat) {
            return function () {
                newCat.count++;
                newCat.scoreBoard.innerHTML = `Total Votes: ${newCat.count}`;
            };
        })(this));
    }
    this.initialise();
}

//ALL CATS - stored in array for future use
let cats = [];

cats[0] = new Cat('Oscar', './assets/cat.jpg', 0);
cats[1] = new Cat('Fluffy', './assets/cat1.jpg', 0);
cats[2] = new Cat('Lucky', './assets/cat2.jpg', 0);
cats[3] = new Cat('Mr. Squiggle', './assets/cat3.jpg', 0);
cats[4] = new Cat('Ginger', './assets/cat4.jpg', 0);
cats[5] = new Cat('Jerry', './assets/cat5.jpg', 0);