function ExampleFetch({ data }) {
  return <div>{JSON.stringify(data, null, 2)}</div>;
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/hello`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default ExampleFetch;
