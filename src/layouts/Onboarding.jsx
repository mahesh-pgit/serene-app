const Onboarding = ({ setShowOnboarding }) => {
	return (
		<div className="w-screen h-screen flex justify-center items-center bg-[url('../assets/backgrounds/gradient-blue.jpg')] bg-cover bg-center max-md:max-h-[calc(100vh-4rem)]">
			<div className="w-3xl p-16 text-center max-sm:w-11/12 max-sm:p-10">
				<h1 className="text-4xl font-light mb-5">Welcome to 🍁Serene</h1>

				<p className="text-xl font-light mb-5">
					Escape from chaos and unleash your productivity in calm and peaceful environment
					with Serene 🌿🤍
				</p>

				<button
					className="px-8 py-4 rounded-xl bg-[url('../assets/backgrounds/gradient-blue.jpg')] bg-cover bg-center cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
					onClick={() => setShowOnboarding(false)}>
					🌊 Launch Serene
				</button>
			</div>
		</div>
	);
};

export default Onboarding;
