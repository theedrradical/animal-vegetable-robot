const heads = [
    { src: "heads/AVR_head_0001.png", name: "Dog" },
    { src: "heads/AVR_head_0002.png", name: "Carrot" },
    { src: "heads/AVR_head_0003.png", name: "Robot" },
    { src: "heads/AVR_head_0004.png", name: "Cat" },
    { src: "heads/AVR_head_0005.png", name: "Brocolli" },
    { src: "heads/AVR_head_0006.png", name: "Robot" },
]
const bodies = [
    { src: "bodies/AVR_body_0001.png", name: "Dog" },
    { src: "bodies/AVR_body_0002.png", name: "Carrot" },
    { src: "bodies/AVR_body_0003.png", name: "Robot" },
    { src: "bodies/AVR_body_0004.png", name: "Cat" },
    { src: "bodies/AVR_body_0005.png", name: "Brocolli" },
    { src: "bodies/AVR_body_0006.png", name: "Robot" },
]
const legs = [
    { src: "legs/AVR_legs_0001.png", name: "Dog" },
    { src: "legs/AVR_legs_0002.png", name: "Carrot" },
    { src: "legs/AVR_legs_0003.png", name: "Robot" },
    { src: "legs/AVR_legs_0004.png", name: "Cat" },
    { src: "legs/AVR_legs_0051.png", name: "Brocolli" },
    { src: "legs/AVR_legs_0006.png", name: "Robot" },
]
const firstNames = [
  "Charlize", "Antony", "Piper", "Denzel", "Natalie", "Leonardo", "Kurt", 
]
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function generateThing() {
  // First, add drop-out animation to existing elements
  const elements = ['head', 'body', 'legs'];
  const nameElements = ['first-name', 'the-word', 'component-name'];
  
  elements.forEach(id => {
    const element = document.getElementById(id);
    element.classList.remove(`drop-${id}`);
    element.classList.add('drop-out');
  });
  
  // Handle name elements - make them all drop out vertically
  nameElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.remove(`slide-${id}`);
      element.classList.remove(`slide-first-name`);
      element.classList.remove(`slide-the`);
      element.classList.remove(`slide-component-name`);
      element.classList.add('drop-out');
    }
  });

  // After drop-out completes, hide elements and update content
  setTimeout(() => {
    // Hide all elements to create blank canvas
    elements.forEach(id => {
      const element = document.getElementById(id);
      element.classList.remove('drop-out');
      element.classList.add('hidden');
    });
    
    nameElements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.classList.remove('drop-out');
        element.classList.add('hidden');
      }
    });

    // Update content while hidden
    const selectedHead = randomItem(heads);
    const selectedBody = randomItem(bodies);
    const selectedLegs = randomItem(legs);
    
    document.getElementById("head").src = selectedHead.src;
    document.getElementById("body").src = selectedBody.src;
    document.getElementById("legs").src = selectedLegs.src;
    
    // Generate name
    const firstName = randomItem(firstNames);
    const components = [selectedHead.name, selectedBody.name, selectedLegs.name];
    const uniqueComponents = [...new Set(components)];
    const componentName = uniqueComponents.join('-');
    
    // Create separate spans for first name, "the", and component name
    const nameElement = document.getElementById("name");
    nameElement.innerHTML = `<span id="first-name">${firstName}</span> <span id="the-word">the</span> <span id="component-name">${componentName}</span>`;

    // Brief pause for blank canvas, then start drop-in animations
    setTimeout(() => {
      elements.forEach(id => {
        const element = document.getElementById(id);
        element.classList.remove('hidden');
        element.classList.add(`drop-${id}`);
      });
      
      // Add slide animations for name parts
      const firstNameEl = document.getElementById('first-name');
      const theWordEl = document.getElementById('the-word');
      const componentNameEl = document.getElementById('component-name');
      
      if (firstNameEl) {
        firstNameEl.classList.remove('hidden');
        firstNameEl.classList.add('slide-first-name');
      }
      
      if (theWordEl) {
        theWordEl.classList.remove('hidden');
        theWordEl.classList.add('slide-the');
      }
      
      if (componentNameEl) {
        componentNameEl.classList.remove('hidden');
        componentNameEl.classList.add('slide-component-name');
      }
    }, 200); // 200ms blank canvas period
  }, 300); // Wait for drop-out animation to complete
}

// generate one on load
generateThing();
document.getElementById("create").addEventListener("click", generateThing);