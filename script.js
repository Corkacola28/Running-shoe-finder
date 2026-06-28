const goalSelect = document.getElementById('goal');
const widthSelect = document.getElementById('width');
const focusSelect = document.getElementById('focus');
const resetBtn = document.getElementById('reset');
const resultsDiv = document.getElementById('results');

// Map focus areas to scoring categories
const focusMap = {
    cushion: 'cushion',
    speed: 'speed',
    stability: 'stability',
    value: 'value'
};

// Map training goals to scoring categories
const goalMap = {
    daily: 'daily',
    speed: 'tempo',
    longrun: 'longrun',
    recovery: 'recovery',
    race: 'race'
};

function filterShoes() {
    const selectedGoal = goalSelect.value;
    const selectedWidth = widthSelect.value;
    const selectedFocus = focusSelect.value;

    let filteredShoes = shoes.filter(shoe => {
        // Filter by width
        if (selectedWidth && shoe.width !== selectedWidth) {
            return false;
        }

        // Filter by goal - check if goal is in tags
        if (selectedGoal && !shoe.tags.includes(selectedGoal)) {
            return false;
        }

        // Filter by focus - check if focus is in tags
        if (selectedFocus && !shoe.tags.includes(selectedFocus)) {
            return false;
        }

        return true;
    });

    // Sort by relevance
    filteredShoes.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

        // Give priority to goal match
        if (selectedGoal) {
            const goalCategory = goalMap[selectedGoal];
            scoreA += a.scores[goalCategory] || 0;
            scoreB += b.scores[goalCategory] || 0;
        }

        // Give priority to focus match
        if (selectedFocus) {
            const focusCategory = focusMap[selectedFocus];
            scoreA += a.scores[focusCategory] || 0;
            scoreB += b.scores[focusCategory] || 0;
        }

        return scoreB - scoreA;
    });

    displayShoes(filteredShoes);
}

function displayShoes(shoesToDisplay) {
    resultsDiv.innerHTML = '';

    if (shoesToDisplay.length === 0) {
        resultsDiv.innerHTML = '<div class="no-results">No shoes match your filters. Try adjusting your selection.</div>';
        return;
    }

    shoesToDisplay.forEach(shoe => {
        const card = document.createElement('div');
        card.className = 'shoe-card';
        
        const scoresHtml = `
            <div class="score-grid">
                <div class="score-item">
                    <span class="label">Width</span>
                    <span class="value">${shoe.scores.width}/10</span>
                </div>
                <div class="score-item">
                    <span class="label">Cushion</span>
                    <span class="value">${shoe.scores.cushion}/10</span>
                </div>
                <div class="score-item">
                    <span class="label">Speed</span>
                    <span class="value">${shoe.scores.speed}/10</span>
                </div>
                <div class="score-item">
                    <span class="label">Stability</span>
                    <span class="value">${shoe.scores.stability}/10</span>
                </div>
                <div class="score-item">
                    <span class="label">Value</span>
                    <span class="value">${shoe.scores.value}/10</span>
                </div>
                <div class="score-item">
                    <span class="label">Long Run</span>
                    <span class="value">${shoe.scores.longrun}/10</span>
                </div>
                <div class="score-item">
                    <span class="label">Daily</span>
                    <span class="value">${shoe.scores.daily}/10</span>
                </div>
                <div class="score-item">
                    <span class="label">Recovery</span>
                    <span class="value">${shoe.scores.recovery}/10</span>
                </div>
                <div class="score-item">
                    <span class="label">Tempo</span>
                    <span class="value">${shoe.scores.tempo}/10</span>
                </div>
                <div class="score-item">
                    <span class="label">Race</span>
                    <span class="value">${shoe.scores.race}/10</span>
                </div>
            </div>
        `;

        const tagsHtml = shoe.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        card.innerHTML = `
            <h3>${shoe.name}</h3>
            <p class="brand">${shoe.brand}</p>
            ${scoresHtml}
            <div class="tags">${tagsHtml}</div>
        `;

        resultsDiv.appendChild(card);
    });
}

function resetFilters() {
    goalSelect.value = '';
    widthSelect.value = '';
    focusSelect.value = '';
    filterShoes();
}

// Event listeners
goalSelect.addEventListener('change', filterShoes);
widthSelect.addEventListener('change', filterShoes);
focusSelect.addEventListener('change', filterShoes);
resetBtn.addEventListener('click', resetFilters);

// Initial display
filterShoes();