function App() {
	const items = ['el1', 'el2', 'el3', 'el4'];

	return (
		<div>
			<h1>List of elements</h1>
			<ul>
				{items.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
