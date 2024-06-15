document.getElementById('create').addEventListener('click', showModal);
document.getElementById('submitCounterName').addEventListener('click', handleCounterNameSubmit);
document.querySelector('.close').addEventListener('click', hideModal);

let CounterNum = 0;

function showModal() {
    document.getElementById('nameModal').style.display = 'block';
}

function hideModal() {
    document.getElementById('nameModal').style.display = 'none';
}

function handleCounterNameSubmit() {
    const counterName = document.getElementById('counterNameInput').value;
    createCounter(counterName);
    document.getElementById('counterNameInput').value = '';
    hideModal();
}

function updateCount(counterId) {
    let counterElement = document.getElementById(counterId);
    let count = parseInt(counterElement.textContent, 10);
    count++;
    counterElement.innerText = count;
    saveCounters();
}

function decreaseCount(counterId) {
    let counterElement = document.getElementById(counterId);
    let count = parseInt(counterElement.textContent, 10);
    if (count > 0) count--;
    counterElement.innerText = count;
    saveCounters();
}

function resetCount(counterId) {
    let counterElement = document.getElementById(counterId);
    counterElement.innerText = '0';
    saveCounters();
}

function createCounter(counterName) {
    if (CounterNum < 6) {
        CounterNum++;
        let counterContainer = document.getElementById("counterContainer");
        let clonedCounterContainer = document.createElement('div');

        let counterNameElement = document.createElement('h2');
        counterNameElement.innerText = counterName;
        clonedCounterContainer.appendChild(counterNameElement);

        let clonedCounter = document.createElement('div');
        clonedCounter.innerText = '0';
        clonedCounter.style.fontSize = '55px';
        let uniqueId = 'Counter' + new Date().getTime();
        clonedCounter.id = uniqueId;
        clonedCounterContainer.appendChild(clonedCounter);

        let incrementButton = document.createElement('button');
        incrementButton.innerText = '+';
        incrementButton.addEventListener('click', function() {
            updateCount(uniqueId);
        });

        let decrementButton = document.createElement('button');
        decrementButton.innerText = '-';
        decrementButton.addEventListener('click', function() {
            decreaseCount(uniqueId);
        });

        let resetButton = document.createElement('button');
        resetButton.innerText = 'Reset';
        resetButton.addEventListener('click', function() {
            resetCount(uniqueId);
        });

        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function() {
            clonedCounterContainer.remove();
            CounterNum--;
            saveCounters();
        });

        clonedCounterContainer.appendChild(incrementButton);
        clonedCounterContainer.appendChild(decrementButton);
        clonedCounterContainer.appendChild(resetButton);
        clonedCounterContainer.appendChild(deleteButton);

        counterContainer.appendChild(clonedCounterContainer);
        clonedCounterContainer.classList.add('counter-container');
        saveCounters();
    } else {
        alert("You cannot add any more counters!");
    }
}

function saveCounters() {
    let counters = [];
    document.querySelectorAll(".counter-container").forEach(counterContainer => {
        let counterName = counterContainer.querySelector('h2').innerText;
        let counter = counterContainer.querySelector('div');
        let count = counter.innerText;
        let id = counter.id;
        counters.push({ id, count, counterName });
    });
    localStorage.setItem('counters', JSON.stringify(counters));
}

function loadCounters() {
    let savedCounters = localStorage.getItem('counters');
    if (savedCounters) {
        savedCounters = JSON.parse(savedCounters);
        savedCounters.forEach(savedCounter => {
            CounterNum++;
            let counterContainer = document.getElementById("counterContainer");
            let clonedCounterContainer = document.createElement('div');

            let counterName = document.createElement('h2');
            counterName.innerText = savedCounter.counterName;
            clonedCounterContainer.appendChild(counterName);

            let clonedCounter = document.createElement('div');
            clonedCounter.innerText = savedCounter.count;
            clonedCounter.style.fontSize = '55px';
            clonedCounter.id = savedCounter.id;
            clonedCounterContainer.appendChild(clonedCounter);

            let incrementButton = document.createElement('button');
            incrementButton.innerText = '+';
            incrementButton.addEventListener('click', function() {
                updateCount(savedCounter.id);
            });

            let decrementButton = document.createElement('button');
            decrementButton.innerText = '-';
            decrementButton.addEventListener('click', function() {
                decreaseCount(savedCounter.id);
            });

            let resetButton = document.createElement('button');
            resetButton.innerText = 'Reset';
            resetButton.addEventListener('click', function() {
                resetCount(savedCounter.id);
            });

            let deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', function() {
                clonedCounterContainer.remove();
                CounterNum--;
                saveCounters();
            });

            clonedCounterContainer.appendChild(incrementButton);
            clonedCounterContainer.appendChild(decrementButton);
            clonedCounterContainer.appendChild(resetButton);
            clonedCounterContainer.appendChild(deleteButton);

            counterContainer.appendChild(clonedCounterContainer);
            clonedCounterContainer.classList.add('counter-container');
        });
    }
}

window.addEventListener('load', loadCounters);
