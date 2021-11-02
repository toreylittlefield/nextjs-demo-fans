function ExampleFetch({ data }: any) {
  return <div>{JSON.stringify(data, null, 2)}</div>;
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  console.log();
  const res = await fetch(`${process.env.SERVER}api/hello`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default ExampleFetch;
