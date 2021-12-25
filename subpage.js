
const items = document.querySelector(".items");
const dots = document.querySelectorAll(".dot");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const total = items.children.length - 1;
const active = "active";
let current = 0;

const setActiveDot = () => {
  dots.forEach((button, i) => {
    i === current
      ? button.classList.add(active)
      : button.classList.remove(active);
  });
};

const scrollToCurrent = () => {
  items.style.transform = `translateX(${current * -100}%`;
  setActiveDot();
};

const scrollPrev = () => {
  if (current === 0) return;
  current--;
  scrollToCurrent();
};

const scrollNext = () => {
  if (current === total) return;
  current++;
  scrollToCurrent();
};

prev.addEventListener("click", scrollPrev);
next.addEventListener("click", scrollNext);


// forEach function
var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
    }
}

// select all slider parent div.tartist-tiny-slider
var sliders = document.querySelectorAll('.tartist-tiny-slider');

// chunk function to make groups for every slider's childrens
var chunk = function ( array, size ) {
    let arr = [];
    for ( let i = 0; i < array.length; i += size ) {
        let newSlicedArray = Array.prototype.slice.call( array, i, i + size );
        arr.push(newSlicedArray);
    }
    return arr;
}

// applying foreach function to the sliders
forEach(sliders, function (index, value) {

    //selecting childrens
    let childrens = value.querySelectorAll(".tartist-tiny-slider__item");

    //getting chunksize from the parent
    let chunkSize = value.dataset.chunksize;

    //making final arrays for the children with chunk size
    let final = chunk( childrens, parseInt(chunkSize) );

    //wrapping the chunks with div.wrap
    let newHTML = final.map( towrap => towrap.reduce( (acc, el) => (acc.appendChild(el),acc) , document.createElement('div') ) ).forEach( el => {
        el.className ="wrap";
        value.appendChild(el)
    })

    //initialize tiny slider    
    let slider = tns({
        container: value,
        items: 1,
        slideBy: "page",
        autoplay: false,
        autoplayButtonOutput: false,
        loop: true,
        mouseDrag: true,
        gutter: 20,
        controls: false,
        navPosition: "bottom",
        nav: true,
    });

});


//uses classList, setAttribute, and querySelectorAll
//if you want this to work in IE8/9 youll need to polyfill these
(function(){
	var d = document,
	accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
	setAria,
	setAccordionAria,
	switchAccordion,
  touchSupported = ('ontouchstart' in window),
  pointerSupported = ('pointerdown' in window);
  
  skipClickDelay = function(e){
    e.preventDefault();
    e.target.click();
  }

		setAriaAttr = function(el, ariaType, newProperty){
		el.setAttribute(ariaType, newProperty);
	};
	setAccordionAria = function(el1, el2, expanded){
		switch(expanded) {
      case "true":
      	setAriaAttr(el1, 'aria-expanded', 'true');
      	setAriaAttr(el2, 'aria-hidden', 'false');
      	break;
      case "false":
      	setAriaAttr(el1, 'aria-expanded', 'false');
      	setAriaAttr(el2, 'aria-hidden', 'true');
      	break;
      default:
				break;
		}
	};
//function
switchAccordion = function(e) {
  console.log("triggered");
	e.preventDefault();
	var thisAnswer = e.target.parentNode.nextElementSibling;
	var thisQuestion = e.target;
	if(thisAnswer.classList.contains('is-collapsed')) {
		setAccordionAria(thisQuestion, thisAnswer, 'true');
	} else {
		setAccordionAria(thisQuestion, thisAnswer, 'false');
	}
  	thisQuestion.classList.toggle('is-collapsed');
  	thisQuestion.classList.toggle('is-expanded');
		thisAnswer.classList.toggle('is-collapsed');
		thisAnswer.classList.toggle('is-expanded');
 	
  	thisAnswer.classList.toggle('animateIn');
	};
	for (var i=0,len=accordionToggles.length; i<len; i++) {
		if(touchSupported) {
      accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
    }
    if(pointerSupported){
      accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
    }
    accordionToggles[i].addEventListener('click', switchAccordion, false);
  }
})();
