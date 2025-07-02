const TestPage = () => {
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold text-blue-600 mb-8">
					Tailwind Test Page
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="bg-white p-6 rounded-lg shadow-md">
						<div className="h-48 bg-red-500 rounded mb-4"></div>
						<h2 className="text-xl font-semibold mb-2">Test Card 1</h2>
						<p className="text-gray-600">This should be styled with Tailwind</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md">
						<div className="h-48 bg-green-500 rounded mb-4"></div>
						<h2 className="text-xl font-semibold mb-2">Test Card 2</h2>
						<p className="text-gray-600">
							If you see colors and layout, Tailwind works!
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md">
						<div className="h-48 bg-blue-500 rounded mb-4"></div>
						<h2 className="text-xl font-semibold mb-2">Test Card 3</h2>
						<p className="text-gray-600">h-48 should make this 192px tall</p>
					</div>
				</div>

				<div className="mt-8 p-4 bg-yellow-100 border border-yellow-400 rounded">
					<p className="text-yellow-800">
						If this page looks styled, Tailwind is working. If not, there&apos;s
						a configuration issue.
					</p>
				</div>
			</div>
		</div>
	);
};

export default TestPage;
