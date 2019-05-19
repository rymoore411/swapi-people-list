

async function starWars (){
  const response = await fetch('https://swapi.co/api/people/');
  const data = await response.json();
  const peopleObj = data.results;

  const person = peopleObj.map(p => p.name);

  const html = person.map(nm => `<li>${nm}</li>`).join('');

  const selector = document.querySelector('ul');

  selector.innerHTML = html;
}

starWars();
