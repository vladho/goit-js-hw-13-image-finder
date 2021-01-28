const apiKey = '20058045-402601a29cd896992a9fb1581';
const inputRef = document.querySelector('[name="query"]');

export default {
  page: 1,
  fetchData() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputRef.value}&page=${this.page}&per_page=12&key=${apiKey}`;
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        this.page += 1;
        return data;
      });
  },
};
