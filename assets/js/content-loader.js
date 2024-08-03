document.addEventListener('DOMContentLoaded', function() {
    let anthropoceneTopics = [];
    let couplets = [];
    let currentTopicIndex = 0;
    let currentCoupletIndex = 0;

    // Load Anthropocene topics
    fetch('anthropocene-topics.json')
        .then(response => response.json())
        .then(data => {
            anthropoceneTopics = data;
            showTopic(currentTopicIndex);
        })
        .catch(error => console.error('Error loading Anthropocene topics:', error));

    // Load couplets
    fetch('couplets.json')
        .then(response => response.json())
        .then(data => {
            couplets = data;
            showCouplet(currentCoupletIndex);
        })
        .catch(error => console.error('Error loading couplets:', error));

    function createStarRating(rating) {
        const maxStars = 10;
        const thresholds = [1, 2, 5, 10, 50, 100, 200, 500, 1000, Infinity];

        let fullStars = 0;
        for (let i = 0; i < thresholds.length; i++) {
            if (rating >= thresholds[i]) {
                fullStars++;
            } else {
                break;
            }
        }

        return '★'.repeat(fullStars) + '☆'.repeat(maxStars - fullStars);
    }

    function showTopic(index) {
        const topicsContainer = document.getElementById('anthropoceneTopics');
        const topic = anthropoceneTopics[index];
        topicsContainer.innerHTML = `
              <div class="topic active">
                <h3 style="text-align: center;">${topic.index}. ${topic.title}</h3>
                <p style="text-align: center;"><strong>${topic.headline}</strong></p>
                <p>${topic.content}</p>
                <div class="rating-container">
                    <span class="star-rating">${createStarRating(topic.rating)}</span>
                    <span class="rating-circle">${topic.rating}</span>
                    <button style="
                        font-size: 0.7rem; /* Adjust as needed */
                        font-family: 'Source Sans Pro', Helvetica, sans-serif; /* Match font-family */
                        font-weight: 900; /* Match font-weight */
                        padding: 4px 8px;
                        margin-top: 10px;
                        height: 30px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        background-color: #ebebeb;
                        color: #000;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        text-align: center;
                        text-decoration: none;
                        cursor: pointer;
                        box-sizing: border-box;
                        line-height: 30px; /* Align text vertically */
                    " onclick="showRatingModal()">Rating Scale ? </button>
                </div>
            </div>
        `;
    }
    
    function showCouplet(index) {
        const coupletsContainer = document.getElementById('couplets');
        const couplet = couplets[index];
        coupletsContainer.innerHTML = `
            <div class="couplet active">
                <h6>${couplet.index}</h6>
                <blockquote>${couplet.text}</blockquote>
                <a href="#" style="
                    font-size: 0.7rem; /* Match font-size */
                    font-family: 'Source Sans Pro', Helvetica, sans-serif; /* Match font-family */
                    font-weight: 900; /* Match font-weight */
                    padding: 4px 8px;
                    margin-top: 10px;
                    height: 30px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #ebebeb;
                    color: #000000;
                    border: 2.3px solid #000000; /* Match border */
                    border-radius: 5px;
                    text-align: center;
                    text-decoration: none;
                    font-weight: bold;
                    cursor: pointer;
                    box-sizing: border-box;
                    line-height: 30px; /* Align text vertically */
                " class="explainCouplet" data-couplet="${index}">Explain</a>
            </div>
        `;
        attachExplainListeners();
    }
    
    

    function attachExplainListeners() {
        const explainButtons = document.querySelectorAll('.explainCouplet');
        explainButtons.forEach(btn => {
            btn.onclick = function(e) {
                e.preventDefault();
                const coupletIndex = this.getAttribute('data-couplet');
                const modal = document.getElementById('coupletModal');
                const explanation = document.getElementById('coupletExplanation');
                explanation.innerHTML = `
                    <h3>${couplets[coupletIndex].author}</h3>
                    <blockquote>${couplets[coupletIndex].text}</blockquote>
                    <p>${couplets[coupletIndex].explanation}</p>
                `;
                modal.style.display = 'block';
            }
        });
    }

    function showRatingModal() {
        const ratingModal = document.getElementById('ratingModal');
        const ratingScale = document.getElementById('ratingScale');
        ratingModal.style.display = 'block';
        ratingScale.innerHTML = `
<div id="ratingScale">
    <div>
        <h3>Welcome to my Unique Rating System!</h3>
        <p>It combines the familiar with the extraordinary:</p>
        <ul>
            <li> [★] Visual star rating (up to 10 stars)</li>
            <li> [㉚] Numerical scale (-1 to ∞)</li>
        </ul>
        <p>Key features:</p>
        <ul>
            <li>Stars increase non-linearly, especially at higher ratings</li>
            <li>-1 rating: Reserved for truly horrible experiences</li>
            <li>Default is Between 2 and 3</li>
        </ul>
        <h4>Rating Interpretation:</h4>
        <ul>
            <li>Up to 10: Good experiences</li>
            <li>11 to 100: Exceptional experiences</li>
            <li>101 to 1000: Life-changing experiences</li>
            <li>Above 1000: Once-in-a-lifetime experiences</li>
        </ul>
    </div>
    
    <div>
        <h4>Rating Examples (For Reference):</h4>
        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>-1:</strong> Worse than gluten for celiacs (Trust me, I know the long-term effects)</p>
        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>0:</strong> As bland as a celiac-friendly menu</p>
        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>1:</strong> Functional addict productivity (Gets things done, but at what cost?)</p>
        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>2:</strong> Basic human decency</p>
        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>3:</strong> A small act of kindness (Like sharing your last pair of cherries)</p>
        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>5:</strong> The serenity under Serena Hotel (Karimabad) wall at sunset</p>
        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>6:</strong> Finding peace after a good fight (Both literal and metaphorical)</p>
        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>10:</strong> Overcoming a personal struggle (Been there, done that)</p>
        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>20:</strong> Mastering a new skill after relentless practice</p>
        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>21:</strong> Reading a book so good you're afraid for it to end in the first third</p>
        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>50:</strong> Selflessness that would make a Hunza elder proud</p>
        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>100:</strong> Transforming past struggles into wisdom that benefits others</p>
        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>200:</strong> Climbing a mountain both physically and metaphorically</p>
        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>500:</strong> Creating a legacy that will be remembered for generations</p>
        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>1000:</strong> Reaching a state of enlightenment and inner peace</p>
        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>∞:</strong> Having a psychedelic trip naturally and reaching a state of perfect harmony with oneself and nature</p>
    </div>
</div>

        `;
    }
    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // Attach event listeners to close modals
    const ratingModal = document.getElementById('ratingModal');
    const coupletModal = document.getElementById('coupletModal');
    const closeButtons = document.querySelectorAll('.close');

    closeButtons.forEach(btn => {
        btn.onclick = function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        }
    });

    window.onclick = function(event) {
        if (event.target === ratingModal || event.target === coupletModal) {
            closeModal(event.target);
        }
    };

    // Expose showRatingModal to global scope
    window.showRatingModal = showRatingModal;

    // Navigation buttons
    document.getElementById('prevTopic').addEventListener('click', function(e) {
        e.preventDefault();
        currentTopicIndex = (currentTopicIndex - 1 + anthropoceneTopics.length) % anthropoceneTopics.length;
        showTopic(currentTopicIndex);
    });

    document.getElementById('nextTopic').addEventListener('click', function(e) {
        e.preventDefault();
        currentTopicIndex = (currentTopicIndex + 1) % anthropoceneTopics.length;
        showTopic(currentTopicIndex);
    });

    document.getElementById('prevCouplet').addEventListener('click', function(e) {
        e.preventDefault();
        currentCoupletIndex = (currentCoupletIndex - 1 + couplets.length) % couplets.length;
        showCouplet(currentCoupletIndex);
    });

    document.getElementById('nextCouplet').addEventListener('click', function(e) {
        e.preventDefault();
        currentCoupletIndex = (currentCoupletIndex + 1) % couplets.length;
        showCouplet(currentCoupletIndex);
    });
});
