

// Fetching data from the JSON file
let json = []
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    }).then(data => {
        json=data// Aquí se guarda el JSON en la variable json
        filter('all')
        console.log(json)// Aquí se itera
      })
      .catch(error => {
        console.error('Error:', error);
      });




function remove(item) {
    console.log(item)
    const cards = json.filter(card => card.name !== item);
    console.log(cards)
    json = [...cards]
    const card = document.getElementsByClassName(item);
    console.log(card)
    card[0].remove()
    // renderData(cards)
}


function filter(isActive) {
    document.getElementById('all').classList.remove("bg-[#de473f]","text-[#FCFDFF]")
    document.getElementById('active').classList.remove("bg-[#de473f]","text-[#FCFDFF]")
    document.getElementById('inactive').classList.remove("bg-[#de473f]","text-[#FCFDFF]")
    switch (isActive) {
        case 'all':
            document.getElementById('all').classList.add("bg-[#de473f]","text-[#FCFDFF]")// Clear the existing cards
            break;
        case true:
            document.getElementById('active').classList.add("bg-[#de473f]","text-[#FCFDFF]")
            break;
        case false:
            document.getElementById('inactive').classList.add("bg-[#de473f]","text-[#FCFDFF]")
            break
            default:
            isActive = 'all';
    }

    console.log(isActive) 
    if (isActive === 'all') {
        document.getElementById('cards').innerHTML = ''; // Clear the existing cards
        renderData(json); // Render all cards
        return;
    }
    const cards = json.filter(card => card.isActive === isActive);
    console.log("cards filter",cards)
    document.getElementById('cards').innerHTML = ''; // Clear the existing cards
    renderData(cards); // Render the filtered cards
    
}




function renderData(data) {
    
    data.forEach(item => {
        const isActive = item.isActive ? 'checked' : 'unchecked';
        const card = document.createElement('div');
        card.className = `${item.name} shadow-sm grid grid-cols-1 gap-10 bg-[#FCFDFF] border border-[#ededed] rounded-2xl p-4`;
        card.innerHTML = `
            <div class="grid grid-cols-[auto_1fr] gap-4">
                <img src="${item.logo}" alt="">
                <div class="grid grid-cols-1 gap-2">
                <h3 class="text-[#212636] font-bold text-lg">${item.name}</h3>
                <p class="text-[#545969] text-base leading-5">${item.description}</p>
                </div>
            </div>
            <!-- end Card Header -->
            <!-- Butons -->
            <div class="grid grid-cols-2 gap-4">
                <button id="remove" class="focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 leading-none w-20 py-1 focus:border-none border rounded-full border-gray-400 text-[#212636] font-medium text-sm hover:bg-[#c7221a] hover:text-[#ededed] hover:border-none cursor-pointer ">Remove</button>
                <label class="inline-flex items-center cursor-pointer justify-self-end ">
                <input type="checkbox" value="" class="sr-only peer" ${isActive}>
                <div tabindex="0" class="focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 hover:peer-checked:bg-[#de473f] relative w-9 h-5 bg-[#c7221a] rounded-full  dark:bg-[#c7c7c7] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#c7221a] dark:peer-checked:bg-[#c7221a]"></div>
                </label>
            </div>
        `;
        const removeBtn = card.querySelector('#remove');
        removeBtn.addEventListener('click', () => remove(item.name));
        document.getElementById('cards').appendChild(card);

    });
}


