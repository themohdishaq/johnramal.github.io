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
        });

    // Load couplets
    fetch('couplets.json')
        .then(response => response.json())
        .then(data => {
            couplets = data;
            showCouplet(currentCoupletIndex);
        });

    function showTopic(index) {
        const topicsContainer = document.getElementById('anthropoceneTopics');
        const topic = anthropoceneTopics[index];
        topicsContainer.innerHTML = `
            <div class="topic active">
                <h3>${topic.title}</h3>
                <p>${topic.content}</p>
            </div>
        `;
    }

    function showCouplet(index) {
        const coupletsContainer = document.getElementById('couplets');
        const couplet = couplets[index];
        coupletsContainer.innerHTML = `
            <div class="couplet active">
                <blockquote>${couplet.text}</blockquote>
                <a href="#" class="button explainCouplet" data-couplet="${index}">Explain</a>
            </div>
        `;
        attachExplainListeners();
    }

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

    // Close modal when clicking on the close button
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(btn => {
        btn.onclick = function() {
            this.closest('.modal').style.display = 'none';
        }
    });

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }
});