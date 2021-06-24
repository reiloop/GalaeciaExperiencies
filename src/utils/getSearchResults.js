async function getSearchResults(searched, price, date, city) {
  const res = await fetch(
    `http://localhost:4000/experiences/?search=${searched}&precio=${price}&fecha=${date}&ciudad=${city}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const body = await res.json();
  const results = body.data;

  return results;
}

export default getSearchResults;
