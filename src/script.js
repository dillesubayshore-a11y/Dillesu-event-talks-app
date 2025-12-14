document.addEventListener('DOMContentLoaded', () => {
  const scheduleElement = document.getElementById('schedule');
  const searchBar = document.getElementById('search-bar');

  const generateSchedule = (filter = '') => {
    scheduleElement.innerHTML = '';
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0);

    const filteredTalks = talksData.filter(talk => {
      if (!filter) return true;
      return talk.category.some(cat => cat.toLowerCase().includes(filter.toLowerCase()));
    });

    filteredTalks.forEach((talk, index) => {
      const startTime = new Date(currentTime);
      const endTime = new Date(startTime.getTime() + talk.duration * 60000);

      const talkElement = document.createElement('div');
      talkElement.className = 'accordion-item';
      talkElement.innerHTML = `
        <h2 class="accordion-header" id="heading-${index}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" aria-expanded="false" aria-controls="collapse-${index}">
            <span class="me-3">${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <strong>${talk.title}</strong>
          </button>
        </h2>
        <div id="collapse-${index}" class="accordion-collapse collapse" aria-labelledby="heading-${index}" data-bs-parent="#schedule">
          <div class="accordion-body">
            <div class="talk-meta">
              <p><strong>Speakers:</strong> ${talk.speakers.join(', ')}</p>
              <p><strong>Category:</strong> ${talk.category.join(', ')}</p>
            </div>
            <div class="talk-description">
              ${talk.description}
            </div>
          </div>
        </div>
      `;
      scheduleElement.appendChild(talkElement);

      currentTime = new Date(endTime.getTime() + 10 * 60000); // 10-minute break

      if (index === 2) { // After 3rd talk
        const lunchStartTime = new Date(currentTime);
        const lunchEndTime = new Date(lunchStartTime.getTime() + 60 * 60000);
        const lunchElement = document.createElement('div');
        lunchElement.className = 'accordion-item';
        lunchElement.innerHTML = `
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" disabled>
              <span class="me-3">${lunchStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${lunchEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <strong>Lunch Break</strong>
            </button>
          </h2>
        `;
        scheduleElement.appendChild(lunchElement);
        currentTime = lunchEndTime;
      }
    });
  };

  searchBar.addEventListener('input', (e) => {
    generateSchedule(e.target.value);
  });

  generateSchedule();
});
// Add bootstrap bundle so the accordion works
const bootstrapScript = document.createElement('script');
bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
document.body.appendChild(bootstrapScript);
