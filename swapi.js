

async function starWars (){
try{
  let response = await fetch('https://swapi.co/api/people/');
  let data = await response.json();
  let allPeople = [];
  let peopleObj = [];

  //loop through all pages to get all characters
  while(data.next){
    peopleObj.push(data.results);
    let person = data.results.map(p => p.name);
    allPeople.push(person);
    response = await fetch(data.next);
    data = await response.json();
  }

    //get all characters in single array
    let people = [];
    allPeople.forEach(el => {
      el.forEach(nm => {
        people.push(nm);
      });
    });

    //displays all characters in list
    let html = people.map(nm => `<li>${nm}</li>`).join('');
    const selector = document.querySelector('ul');
    selector.innerHTML = html;

    //add listeners
    selector.addEventListener('click', (ev) => {
      let personSelect = ev.target.innerHTML;

      const boldSelector = document.getElementsByClassName('bolder');
      if(boldSelector[0]){
        boldSelector[0].className = "";
      }
      ev.target.classList = "bolder";

      peopleObj.forEach((el, idx) => {
        el.forEach(personInfo => {
          if(personInfo.name === personSelect){
            let infoList = Object.keys(personInfo).map(key => `
            <div><b>${key }</b> ${personInfo[key]}</div>`).join("");
            let div = document.getElementById('info');
            div.innerHTML = infoList;
          }
        });
      });


     });
    }
catch{
  console.log('error');
}

}



starWars();
