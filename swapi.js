

async function starWars (){
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

    console.log(peopleObj[0]);
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
    console.log(selector);
    selector.innerHTML = html;

    //add listeners
    let personInfo;

    selector.addEventListener('click', (ev) => {
      let personSelect = ev.target.innerHTML;

      peopleObj.forEach((el, idx) => {
        el.forEach(personInfo => {
          if(personInfo.name === personSelect){
            ev.target.style.fontWeight = 'bold';
            console.log(personInfo);
            let infoList = Object.keys(personInfo).map(key => `
            <div><b>${key }</b> ${personInfo[key]}</div>`).join("");
            let div = document.getElementById('info');
            div.innerHTML = infoList;
          }
        });
      });
     });

}



starWars();
